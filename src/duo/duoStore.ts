/**
 * Walk with a friend: the phone's side of the walk's live connection.
 *
 * Keeps one WebSocket to the walk's room open (reconnecting with back-off if
 * the signal drops), works out how far this phone's clock is from the
 * server's (so both phones can start narration at the same instant), and
 * holds what the screens show: the walk's state, the friend's position, chat
 * and reactions. Chat, reactions and other actions made while offline wait
 * in an outbox for up to 2 minutes and are sent on reconnect.
 */
import { create } from "zustand";
import { getIdentity } from "../social/api";
import { socketUrl } from "./duoApi";
import type { ChatMessage, ClientMessage, DuoMember, DuoState, Reaction, ServerMessage } from "./protocol";

export interface FriendPosition {
  /** Null when the friend shares distance only. */
  lat: number | null;
  lng: number | null;
  meters: number | null;
  /** When it arrived (local ms). */
  at: number;
}

export type ChatEntry = ChatMessage & { pending?: boolean };

interface DuoStore {
  code: string | null;
  myId: string | null;
  state: DuoState | null;
  connected: boolean;
  /** Server clock minus this phone's clock (ms). */
  offset: number;
  friend: FriendPosition | null;
  /** When the friend's phone was last heard from (local ms). */
  friendSeenAt: number;
  chat: ChatEntry[];
  reactions: Reaction[];
  /** The latest reaction, for the pop-up on the map. */
  lastReaction: Reaction | null;
  unread: number;
  chatOpen: boolean;
  /** Share distance only, not my position. */
  anon: boolean;
  /** Couldn't connect at all (e.g. not part of this walk any more). */
  failed: string | null;

  connect: (code: string) => Promise<void>;
  disconnect: () => void;
  send: (msg: ClientMessage) => void;
  sendChat: (text: string) => void;
  react: (emoji: string) => void;
  shareLocation: (lat: number, lng: number) => void;
  setAnon: (anon: boolean) => void;
  setChatOpen: (open: boolean) => void;
}

const PING_EVERY_MS = 20_000;
/** Not heard from the friend's phone for this long: it has dropped, even if the server hasn't noticed. */
export const FRIEND_SILENT_MS = 65_000;

/** Location goes out at most this often. */
const LOCATION_EVERY_MS = 5_000;
/** Queued messages older than this are dropped rather than sent late. */
const OUTBOX_MAX_AGE_MS = 2 * 60_000;
const QUEUED: ClientMessage["t"][] = ["chat", "react", "arrive", "ready", "complete", "rate", "leave", "goto", "guide"];

let socket: WebSocket | null = null;
let wanted = false;
let retryTimer: ReturnType<typeof setTimeout> | null = null;
let retryDelay = 1_000;
let pingTimer: ReturnType<typeof setInterval> | null = null;
let outbox: { msg: ClientMessage; at: number }[] = [];
let bestRtt = Infinity;
let lastLocationAt = 0;

const newId = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

/** Server time now. */
export const serverNow = () => Date.now() + useDuoStore.getState().offset;
/** A server time as this phone's clock. */
export const toLocal = (serverMs: number) => serverMs - useDuoStore.getState().offset;

/** Me and my friend in the walk. */
export function duoPeople(state: DuoState | null, myId: string | null): { me: DuoMember | null; friend: DuoMember | null } {
  if (!state || !myId) return { me: null, friend: null };
  const iAmHost = state.host.uid === myId;
  return { me: iAmHost ? state.host : state.guest, friend: iAmHost ? state.guest : state.host };
}

export const useDuoStore = create<DuoStore>((set, get) => {
  const transmit = (msg: ClientMessage): boolean => {
    if (socket?.readyState !== WebSocket.OPEN) return false;
    socket.send(JSON.stringify(msg));
    return true;
  };

  const flushOutbox = () => {
    const now = Date.now();
    const waiting = outbox.filter((item) => now - item.at < OUTBOX_MAX_AGE_MS);
    outbox = [];
    for (const item of waiting) if (!transmit(item.msg)) outbox.push(item);
  };

  const ping = () => transmit({ t: "ping", c: Date.now() });

  const handle = (msg: ServerMessage) => {
    switch (msg.t) {
      case "pong": {
        // The server's clock was read halfway through the round trip (near enough).
        // The quickest round trip gives the truest reading (a busy phone answers late), so only
        // a sample about as quick as the best so far moves the clock.
        const now = Date.now();
        const rtt = now - msg.c;
        if (rtt <= bestRtt + 20) {
          bestRtt = Math.min(bestRtt, rtt);
          set({ offset: msg.s - (msg.c + now) / 2 });
        }
        return;
      }
      case "state": {
        const { friend } = duoPeople(msg.state, get().myId);
        const wasOnline = duoPeople(get().state, get().myId).friend?.online;
        set({ state: msg.state, ...(friend?.online && !wasOnline ? { friendSeenAt: Date.now() } : {}) });
        return;
      }
      case "seen":
        if (msg.uid !== get().myId) set({ friendSeenAt: Date.now() });
        return;
      case "history": {
        const pending = get().chat.filter((c) => c.pending && !msg.chat.some((m) => m.id === c.id));
        set({ chat: [...msg.chat, ...pending], reactions: msg.reactions });
        return;
      }
      case "chat": {
        const { chat, chatOpen, myId } = get();
        const others = chat.filter((c) => c.id !== msg.msg.id);
        set({
          ...(msg.msg.uid !== myId ? { friendSeenAt: Date.now() } : {}),
          chat: [...others, msg.msg].sort((a, b) => a.at - b.at),
          unread: !chatOpen && msg.msg.uid !== myId ? get().unread + 1 : get().unread,
        });
        return;
      }
      case "react":
        set({ reactions: [...get().reactions.filter((r) => r.id !== msg.r.id), msg.r], lastReaction: msg.r });
        return;
      case "friend":
        set({ friend: { lat: msg.lat, lng: msg.lng, meters: msg.meters, at: Date.now() }, friendSeenAt: Date.now() });
        return;
      case "error":
        console.warn("[duo]", msg.message);
        return;
    }
  };

  const open = async () => {
    const { code } = get();
    if (!wanted || !code) return;
    const identity = await getIdentity();
    if (!identity) {
      set({ failed: "account" });
      return;
    }
    set({ myId: identity.userId });
    const ws = new WebSocket(socketUrl(code, identity));
    socket = ws;
    let opened = false;
    ws.onopen = () => {
      opened = true;
      retryDelay = 1_000;
      bestRtt = Infinity;
      // Give the friend a fresh minute: their check-ins weren't reaching this phone while it was away.
      set({ connected: true, failed: null, friendSeenAt: Date.now() });
      // Several pings spread over the first few seconds (the page may be busy loading), then one
      // every 20 seconds: they keep the clock right and tell the friend's phone this one is still here.
      for (let i = 0; i < 8; i++) setTimeout(ping, i * 700);
      if (pingTimer) clearInterval(pingTimer);
      pingTimer = setInterval(ping, PING_EVERY_MS);
      flushOutbox();
    };
    ws.onmessage = (e) => {
      try {
        handle(JSON.parse(String(e.data)) as ServerMessage);
      } catch {
        // ignore anything unreadable
      }
    };
    ws.onclose = () => {
      if (socket !== ws) return;
      socket = null;
      set({ connected: false });
      if (pingTimer) clearInterval(pingTimer);
      if (!wanted) return;
      // Refused before it opened more than a few times: probably not ours any more.
      if (!opened && retryDelay >= 16_000) set({ failed: "connect" });
      retryTimer = setTimeout(() => void open(), retryDelay);
      retryDelay = Math.min(retryDelay * 2, 20_000);
    };
  };

  return {
    code: null,
    myId: null,
    state: null,
    connected: false,
    offset: 0,
    friend: null,
    friendSeenAt: Date.now(),
    chat: [],
    reactions: [],
    lastReaction: null,
    unread: 0,
    chatOpen: false,
    anon: false,
    failed: null,

    connect: async (code) => {
      if (get().code === code && wanted) return;
      get().disconnect();
      wanted = true;
      outbox = [];
      set({ code, state: null, friend: null, friendSeenAt: Date.now(), chat: [], reactions: [], lastReaction: null, unread: 0, failed: null });
      await open();
    },

    disconnect: () => {
      wanted = false;
      if (retryTimer) clearTimeout(retryTimer);
      if (pingTimer) clearInterval(pingTimer);
      const ws = socket;
      socket = null;
      ws?.close();
      set({ connected: false, code: null, state: null, friend: null });
    },

    send: (msg) => {
      if (transmit(msg)) return;
      if (QUEUED.includes(msg.t)) outbox.push({ msg, at: Date.now() });
    },

    sendChat: (text) => {
      const trimmed = text.trim();
      const { myId, state } = get();
      if (!trimmed || !myId) return;
      const id = newId();
      const me = duoPeople(state, myId).me;
      set({ chat: [...get().chat, { id, uid: myId, name: me?.name ?? "", text: trimmed, at: serverNow(), pending: true }] });
      get().send({ t: "chat", id, text: trimmed });
    },

    react: (emoji) => get().send({ t: "react", id: newId(), emoji }),

    shareLocation: (lat, lng) => {
      const now = Date.now();
      if (now - lastLocationAt < LOCATION_EVERY_MS) return;
      if (transmit({ t: "loc", lat, lng, anon: get().anon })) lastLocationAt = now;
    },

    setAnon: (anon) => {
      set({ anon });
      lastLocationAt = 0;
    },

    setChatOpen: (open) => set(open ? { chatOpen: true, unread: 0 } : { chatOpen: false }),
  };
});

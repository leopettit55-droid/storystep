/**
 * One "Walk with a friend" session: a Cloudflare Durable Object that both
 * phones keep a live WebSocket to. It is the walk's single source of truth:
 *
 * - the lobby (invite, accept, both ready) and the start time;
 * - which stop is playing and the server time its narration started, so both
 *   phones play the same second of audio (each corrects for its own clock);
 * - waiting for both walkers at a stop when they're walking together, or
 *   letting the one on the route lead when the other is somewhere else;
 * - chat, emoji reactions, presence, and the summary at the end.
 *
 * Privacy: positions are only passed on to the partner and kept in memory,
 * never saved. Chat and reactions are saved only so a phone that reconnects
 * can catch up, and are deleted when the walk finishes. Everything is deleted
 * 24 hours after the walk ends, and sessions close 4 hours after they're made.
 */
import { DurableObject } from "cloudflare:workers";
import type {
  ChatMessage,
  ClientMessage,
  DuoMember,
  DuoState,
  DuoSummary,
  Reaction,
  ServerMessage,
} from "../src/duo/protocol";
import { metersBetween, type LatLng } from "../server/geo";
import { tourById } from "../server/social";

export interface DuoEnv {
  DB: D1Database;
}

const SESSION_HOURS = 4;
const CLEANUP_AFTER_MS = 24 * 3600_000;
const COUNTDOWN_MS = 10_000;
/** Lead time for a new stop, so both phones have the file loaded before it starts. */
const PLAY_LEAD_MS = 1_500;
/** How long the first walker at a stop waits for the other before it plays anyway. */
const WAIT_FOR_FRIEND_MS = 5 * 60_000;
/** Someone this far from every stop isn't walking the route with you (e.g. joining from another city). */
const ON_ROUTE_METERS = 1_000;
/** A position older than this doesn't count. */
const FRESH_MS = 60_000;
const NEAR_EACH_OTHER_METERS = 10;
const FASTEST_WALK_M_PER_S = 2.2;
const SLOWEST_RUN_S = 12 * 3600;
const MAX_CHAT = 200;
const MAX_TEXT = 500;
const EMOJI = new Set(["😂", "❤️", "🤔", "😮", "👏"]);

interface Attachment {
  uid: string;
  name: string;
  loc: LatLng | null;
  locAt: number;
  anon: boolean;
}

interface Stats {
  distSum: number;
  distN: number;
  closest: { meters: number; stop: number } | null;
  nearStops: number;
  messages: number;
  lastSampleAt: number;
}

const emptyStats = (): Stats => ({ distSum: 0, distN: 0, closest: null, nearStops: 0, messages: 0, lastSampleAt: 0 });

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

export class DuoRoom extends DurableObject<DuoEnv> {
  private s: DuoState | null = null;
  private stats: Stats = emptyStats();
  /** When everything about this walk is deleted. */
  private cleanupAt = 0;

  constructor(ctx: DurableObjectState, env: DuoEnv) {
    super(ctx, env);
    void ctx.blockConcurrencyWhile(async () => {
      this.s = (await ctx.storage.get<DuoState>("s")) ?? null;
      this.stats = (await ctx.storage.get<Stats>("stats")) ?? emptyStats();
      this.cleanupAt = (await ctx.storage.get<number>("cleanupAt")) ?? 0;
    });
  }

  // --- requests from the website's /api/duo functions ---------------------------

  async fetch(req: Request): Promise<Response> {
    const url = new URL(req.url);
    const body = req.method === "POST" ? await req.json<Record<string, string>>().catch(() => ({}) as Record<string, string>) : {};
    switch (url.pathname) {
      case "/create":
        return this.create(body.code, body.tour, body.guide || null, body.uid, body.name);
      case "/info":
        return this.live() ? json(this.publicInfo()) : json({ error: "This invite has expired" }, 404);
      case "/join":
        return this.join(body.uid, body.name);
      case "/socket":
        return this.socket(req, url.searchParams.get("uid") ?? "", url.searchParams.get("name") ?? "");
    }
    return json({ error: "Not found" }, 404);
  }

  private live(): boolean {
    return !!this.s && Date.now() < this.cleanupAt;
  }

  private publicInfo() {
    const s = this.s!;
    return { code: s.code, tour: s.tour, host: s.host.name, hostId: s.host.uid, guest: s.guest?.name ?? null, guestId: s.guest?.uid ?? null, status: s.status };
  }

  private async create(code: string, tour: string, guide: string | null, uid: string, name: string) {
    if (this.live()) return json({ error: "taken" }, 409);
    await this.ctx.storage.deleteAll();
    const now = Date.now();
    const member = (u: string, n: string): DuoMember => ({ uid: u, name: n, online: false, since: now, ready: false, reached: -1 });
    this.s = {
      code,
      tour,
      guide,
      host: member(uid, name),
      guest: null,
      status: "waiting",
      startAt: null,
      stop: null,
      pending: null,
      endedBy: null,
      skipped: false,
      summary: null,
      expiresAt: now + SESSION_HOURS * 3600_000,
    };
    this.stats = emptyStats();
    this.cleanupAt = this.s.expiresAt + CLEANUP_AFTER_MS;
    await this.save();
    return json(this.publicInfo());
  }

  private async join(uid: string, name: string) {
    const s = this.live() ? this.s! : null;
    if (!s || s.status === "ended" || Date.now() >= s.expiresAt) return json({ error: "This invite has expired" }, 404);
    if (s.host.uid === uid || s.guest?.uid === uid) return json(this.publicInfo());
    if (s.guest) return json({ error: "This walk already has two people" }, 409);
    s.guest = { uid, name, online: false, since: Date.now(), ready: false, reached: -1 };
    s.status = "lobby";
    await this.save();
    this.broadcastState();
    return json(this.publicInfo());
  }

  private socket(req: Request, uid: string, name: string): Response {
    if (req.headers.get("upgrade") !== "websocket") return json({ error: "Expected a WebSocket" }, 426);
    if (!this.live()) return json({ error: "This invite has expired" }, 404);
    const member = this.member(uid);
    if (!member) return json({ error: "You're not part of this walk" }, 403);
    const { 0: client, 1: server } = new WebSocketPair();
    this.ctx.acceptWebSocket(server, [uid]);
    const attachment: Attachment = { uid, name: name || member.name, loc: null, locAt: 0, anon: false };
    server.serializeAttachment(attachment);
    this.setOnline(member, true);
    void this.save();
    // Catch up: the walk as it is now, then the chat so far.
    this.send(server, { t: "state", state: this.s! });
    void this.history().then((h) => this.send(server, h));
    this.broadcastState();
    return new Response(null, { status: 101, webSocket: client });
  }

  // --- messages from the phones ------------------------------------------------------

  async webSocketMessage(ws: WebSocket, raw: string | ArrayBuffer): Promise<void> {
    if (!this.live() || typeof raw !== "string") return;
    let msg: ClientMessage;
    try {
      msg = JSON.parse(raw) as ClientMessage;
    } catch {
      return;
    }
    const me = ws.deserializeAttachment() as Attachment;
    const s = this.s!;
    const member = this.member(me.uid);
    if (!member) return;
    const now = Date.now();

    switch (msg.t) {
      case "ping": {
        this.send(ws, { t: "pong", c: msg.c, s: now });
        const partner = this.partnerOf(me.uid);
        if (partner) for (const other of this.socketsOf(partner.uid)) this.send(other, { t: "seen", uid: me.uid });
        return;
      }

      case "ready": {
        if (s.status !== "lobby") return;
        member.ready = true;
        if (s.host.ready && s.guest?.ready) {
          s.status = "active";
          s.startAt = now + COUNTDOWN_MS;
          s.stop = { i: 0, at: s.startAt, paused: false, pos: 0, seq: 1 };
        }
        break;
      }

      case "loc": {
        if (!Number.isFinite(msg.lat) || !Number.isFinite(msg.lng)) return;
        me.loc = { lat: msg.lat, lng: msg.lng };
        me.locAt = now;
        me.anon = !!msg.anon;
        ws.serializeAttachment(me);
        this.passOnLocation(me);
        return;
      }

      case "arrive": {
        if (s.status !== "active" || !s.stop) return;
        member.reached = Math.max(member.reached, msg.i);
        const route = tourById(s.tour)?.stops ?? [];
        if (msg.i <= s.stop.i || msg.i >= route.length) break;
        const partner = this.partnerOf(me.uid);
        const waitForPartner = partner && partner.online && partner.reached < msg.i && this.onRoute(partner.uid);
        if (waitForPartner) {
          if (!s.pending || s.pending.i !== msg.i) s.pending = { i: msg.i, by: me.uid, since: now, deadline: now + WAIT_FOR_FRIEND_MS };
        } else {
          this.playStop(msg.i);
        }
        break;
      }

      case "goto": {
        const count = tourById(s.tour)?.stops.length ?? 0;
        if (s.status !== "active" || msg.i < 0 || msg.i >= count) return;
        if (msg.skip) s.skipped = true;
        this.playStop(msg.i);
        break;
      }

      case "pause": {
        if (s.status !== "active" || !s.stop || s.stop.paused) return;
        s.stop = { ...s.stop, paused: true, pos: Math.max(0, Number(msg.pos) || 0), seq: s.stop.seq + 1 };
        break;
      }

      case "resume": {
        if (s.status !== "active" || !s.stop || !s.stop.paused) return;
        const pos = Math.max(0, Number(msg.pos) || s.stop.pos);
        s.stop = { ...s.stop, paused: false, at: now + PLAY_LEAD_MS - pos * 1000, pos, seq: s.stop.seq + 1 };
        break;
      }

      case "guide": {
        if (s.status === "complete" || s.status === "ended" || typeof msg.guide !== "string") return;
        s.guide = msg.guide.slice(0, 40);
        break;
      }

      case "chat": {
        const text = String(msg.text ?? "").trim().slice(0, MAX_TEXT);
        if (!text || s.status === "complete" || s.status === "ended") return;
        const chat = (await this.ctx.storage.get<ChatMessage[]>("chat")) ?? [];
        if (chat.some((c) => c.id === msg.id)) return; // resent after a reconnect
        const message: ChatMessage = { id: String(msg.id).slice(0, 40), uid: me.uid, name: member.name, text, at: now };
        chat.push(message);
        this.stats.messages++;
        await this.ctx.storage.put({ chat: chat.slice(-MAX_CHAT), stats: this.stats });
        this.broadcast({ t: "chat", msg: message });
        return;
      }

      case "react": {
        if (!EMOJI.has(msg.emoji) || s.status !== "active") return;
        const reactions = (await this.ctx.storage.get<Reaction[]>("reactions")) ?? [];
        if (reactions.some((r) => r.id === msg.id)) return;
        const reaction: Reaction = { id: String(msg.id).slice(0, 40), uid: me.uid, name: member.name, emoji: msg.emoji, stop: s.stop?.i ?? 0, at: now };
        reactions.push(reaction);
        await this.ctx.storage.put("reactions", reactions.slice(-MAX_CHAT));
        this.broadcast({ t: "react", r: reaction });
        return;
      }

      case "complete":
        if (s.status === "active") await this.finish();
        break;

      case "rate": {
        const stars = Math.round(Number(msg.stars));
        if (s.status !== "complete" || !s.summary || stars < 1 || stars > 5) return;
        s.summary.ratings[me.uid] = stars;
        const [a] = [s.host.uid, s.guest!.uid].sort();
        await this.env.DB.prepare(`UPDATE duo_completions SET ${me.uid === a ? "rating_a" : "rating_b"} = ? WHERE id = ?`)
          .bind(stars, this.completionId())
          .run();
        break;
      }

      case "leave": {
        if (s.status === "complete" || s.status === "ended") return;
        s.status = "ended";
        s.endedBy = me.uid;
        await this.end();
        break;
      }

      default:
        return;
    }
    await this.save();
    this.broadcastState();
  }

  async webSocketClose(ws: WebSocket, code: number, reason: string): Promise<void> {
    try {
      ws.close(code, reason);
    } catch {
      // already closed
    }
    await this.disconnected(ws);
  }

  async webSocketError(ws: WebSocket): Promise<void> {
    await this.disconnected(ws);
  }

  private async disconnected(ws: WebSocket) {
    if (!this.live()) return;
    const { uid } = ws.deserializeAttachment() as Attachment;
    const member = this.member(uid);
    if (!member || this.socketsOf(uid).some((w) => w !== ws)) return;
    this.setOnline(member, false);
    await this.save();
    this.broadcastState();
  }

  // --- timers: a stop that waited long enough, the 4-hour limit, clean-up ---------------

  async alarm(): Promise<void> {
    if (!this.s) return;
    const s = this.s;
    const now = Date.now();
    if (now >= this.cleanupAt) {
      for (const ws of this.ctx.getWebSockets()) ws.close(1000, "Session closed");
      await this.ctx.storage.deleteAll();
      this.s = null;
      return;
    }
    if (s.pending && now >= s.pending.deadline && s.status === "active") this.playStop(s.pending.i);
    if (now >= s.expiresAt && s.status !== "complete" && s.status !== "ended") await this.end();
    await this.save();
    this.broadcastState();
  }

  // --- the walk ------------------------------------------------------------------------

  /** Both phones play stop i, starting a moment from now. */
  private playStop(i: number) {
    const s = this.s!;
    const now = Date.now();
    s.pending = null;
    s.stop = { i, at: now + PLAY_LEAD_MS, paused: false, pos: 0, seq: (s.stop?.seq ?? 0) + 1 };
    const [a, b] = this.freshLocations();
    if (a && b && metersBetween(a, b) <= NEAR_EACH_OTHER_METERS) this.stats.nearStops++;
  }

  private async finish() {
    const s = this.s!;
    const now = Date.now();
    const tour = tourById(s.tour);
    let seconds: number | null = s.startAt && !s.skipped ? Math.round((now - s.startAt) / 1000) : null;
    if (seconds !== null && tour && (seconds < (tour.distanceKm * 1000) / FASTEST_WALK_M_PER_S || seconds > SLOWEST_RUN_S)) seconds = null;

    const reactions = (await this.ctx.storage.get<Reaction[]>("reactions")) ?? [];
    const laughsByStop = new Map<number, Set<string>>();
    for (const r of reactions.filter((r) => r.emoji === "😂")) {
      laughsByStop.set(r.stop, (laughsByStop.get(r.stop) ?? new Set()).add(r.uid));
    }
    const laughs = [...laughsByStop.values()].filter((who) => who.size >= 2).length;

    let toursTogether = 1;
    if (s.guest) {
      const [first, second] = [s.host, s.guest].sort((x, y) => (x.uid < y.uid ? -1 : 1));
      await this.env.DB.prepare(
        `INSERT OR IGNORE INTO duo_completions (id, tour, uid_a, name_a, uid_b, name_b, sec, at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
      )
        .bind(this.completionId(), s.tour, first.uid, first.name, second.uid, second.name, seconds, now)
        .run();
      const row = await this.env.DB.prepare("SELECT COUNT(DISTINCT tour) AS n FROM duo_completions WHERE uid_a = ? AND uid_b = ?")
        .bind(first.uid, second.uid)
        .first<{ n: number }>();
      toursTogether = row?.n ?? 1;
    }

    const summary: DuoSummary = {
      seconds,
      avgMeters: this.stats.distN > 0 ? Math.round(this.stats.distSum / this.stats.distN) : null,
      closest: this.stats.closest,
      laughs,
      reactions: reactions.length,
      messages: this.stats.messages,
      points: this.stats.nearStops * 5,
      toursTogether,
      ratings: {},
    };
    s.summary = summary;
    s.status = "complete";
    await this.end();
  }

  /** Over (finished, left or timed out): the chat isn't kept, and the rest goes in 24 hours. */
  private async end() {
    const s = this.s!;
    if (s.status !== "complete") s.status = "ended";
    s.pending = null;
    this.cleanupAt = Date.now() + CLEANUP_AFTER_MS;
    await this.ctx.storage.delete(["chat", "reactions"]);
  }

  private completionId() {
    return `${this.s!.code}-${this.s!.startAt}`;
  }

  // --- location ------------------------------------------------------------------------

  /** Sends my position (or only the distance, in anonymous mode) to my partner, and samples the distance for the summary. */
  private passOnLocation(me: Attachment) {
    const partner = this.partnerOf(me.uid);
    if (!partner) return;
    const theirs = this.latestLocation(partner.uid);
    const meters = me.loc && theirs ? Math.round(metersBetween(me.loc, theirs)) : null;
    const now = Date.now();
    for (const ws of this.socketsOf(partner.uid)) {
      this.send(ws, { t: "friend", lat: me.anon ? null : me.loc!.lat, lng: me.anon ? null : me.loc!.lng, meters, at: now });
    }
    // Tell me the distance too, so both phones show it (without passing on any position).
    for (const ws of this.socketsOf(me.uid)) {
      const partnerAnon = this.socketsOf(partner.uid).some((w) => (w.deserializeAttachment() as Attachment).anon);
      const loc = partnerAnon ? null : theirs;
      if (theirs) this.send(ws, { t: "friend", lat: loc?.lat ?? null, lng: loc?.lng ?? null, meters, at: now });
    }
    if (meters !== null && this.s!.status === "active" && now - this.stats.lastSampleAt >= 4_000) {
      this.stats.lastSampleAt = now;
      this.stats.distSum += meters;
      this.stats.distN++;
      if (!this.stats.closest || meters < this.stats.closest.meters) this.stats.closest = { meters, stop: (this.s!.stop?.i ?? 0) + 1 };
      void this.ctx.storage.put("stats", this.stats);
    }
  }

  private latestLocation(uid: string): LatLng | null {
    let best: Attachment | null = null;
    for (const ws of this.socketsOf(uid)) {
      const a = ws.deserializeAttachment() as Attachment;
      if (a.loc && Date.now() - a.locAt < FRESH_MS && (!best || a.locAt > best.locAt)) best = a;
    }
    return best?.loc ?? null;
  }

  private freshLocations(): [LatLng | null, LatLng | null] {
    const s = this.s!;
    return [this.latestLocation(s.host.uid), s.guest ? this.latestLocation(s.guest.uid) : null];
  }

  /** Is this person walking the route (near any stop), rather than joining from somewhere else? */
  private onRoute(uid: string): boolean {
    const loc = this.latestLocation(uid);
    const stops = tourById(this.s!.tour)?.stops ?? [];
    return !!loc && stops.some((stop) => metersBetween(loc, stop) <= ON_ROUTE_METERS);
  }

  // --- helpers -------------------------------------------------------------------------

  private member(uid: string): DuoMember | null {
    const s = this.s;
    if (!s) return null;
    return s.host.uid === uid ? s.host : s.guest?.uid === uid ? s.guest : null;
  }

  private partnerOf(uid: string): DuoMember | null {
    const s = this.s!;
    return s.host.uid === uid ? s.guest : s.host;
  }

  private socketsOf(uid: string): WebSocket[] {
    return this.ctx.getWebSockets(uid).filter((ws) => ws.readyState === WebSocket.OPEN);
  }

  private setOnline(member: DuoMember, online: boolean) {
    if (member.online !== online) {
      member.online = online;
      member.since = Date.now();
    }
  }

  private async history(): Promise<ServerMessage> {
    const [chat, reactions] = await Promise.all([
      this.ctx.storage.get<ChatMessage[]>("chat"),
      this.ctx.storage.get<Reaction[]>("reactions"),
    ]);
    return { t: "history", chat: chat ?? [], reactions: reactions ?? [] };
  }

  private send(ws: WebSocket, msg: ServerMessage) {
    try {
      ws.send(JSON.stringify(msg));
    } catch {
      // closing
    }
  }

  private broadcast(msg: ServerMessage) {
    const text = JSON.stringify(msg);
    for (const ws of this.ctx.getWebSockets()) {
      try {
        ws.send(text);
      } catch {
        // closing
      }
    }
  }

  private broadcastState() {
    if (this.s) this.broadcast({ t: "state", state: this.s });
  }

  private async save() {
    const s = this.s;
    if (!s) return;
    await this.ctx.storage.put({ s, stats: this.stats, cleanupAt: this.cleanupAt });
    // The next thing that has to happen on its own: a waiting stop, the 4-hour limit, or clean-up.
    const finished = s.status === "complete" || s.status === "ended";
    const due = [s.pending?.deadline, finished ? undefined : s.expiresAt, this.cleanupAt].filter((t): t is number => !!t);
    await this.ctx.storage.setAlarm(Math.min(...due));
  }
}

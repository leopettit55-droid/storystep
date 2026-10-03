/**
 * Walk with a friend: the messages the app and the duo server (duo/room.ts)
 * exchange over the walk's live connection. Plain types only, so both sides
 * can share them.
 */

export type DuoStatus =
  /** Invite made; waiting for the friend to accept. */
  | "waiting"
  /** Both are in; waiting for both to press Ready. */
  | "lobby"
  /** Walking (or counting down to `startAt`). */
  | "active"
  | "complete"
  /** Someone left, or the 4-hour limit passed. */
  | "ended";

export interface DuoMember {
  uid: string;
  name: string;
  online: boolean;
  /** When `online` last changed (ms). */
  since: number;
  ready: boolean;
  /** The furthest stop (index) this person has reached by GPS, -1 for none. */
  reached: number;
}

/** The stop both phones are playing: narration position 0 is at server time `at`. */
export interface DuoStop {
  i: number;
  at: number;
  paused: boolean;
  /** Position (seconds) it was paused at. */
  pos: number;
  /** Changes whenever play/pause/seek changes, so phones can tell a new instruction from an old one. */
  seq: number;
}

/** One person reached the next stop and the other hasn't yet. */
export interface DuoPending {
  i: number;
  by: string;
  since: number;
  /** When it plays anyway (server time). */
  deadline: number;
}

export interface DuoSummary {
  /** Start-to-finish seconds, null if a stop was skipped. */
  seconds: number | null;
  /** Average distance between the two while walking, when both shared location. */
  avgMeters: number | null;
  closest: { meters: number; stop: number } | null;
  /** Stops where both reacted 😂. */
  laughs: number;
  reactions: number;
  messages: number;
  /** +5 for each stop the two reached within 10 m of each other. */
  points: number;
  /** Tours this pair has finished together, including this one. */
  toursTogether: number;
  /** Stars (1-5) each person gave the walk, by uid. */
  ratings: Record<string, number>;
}

export interface DuoState {
  code: string;
  tour: string;
  /** The tour guide whose recordings both hear (both must hear the same files to stay in sync). */
  guide: string | null;
  host: DuoMember;
  guest: DuoMember | null;
  status: DuoStatus;
  /** When stop 1 starts (server time). */
  startAt: number | null;
  stop: DuoStop | null;
  pending: DuoPending | null;
  /** Who left, when status is "ended" because someone left. */
  endedBy: string | null;
  /** A stop was skipped, so the walk's time doesn't count for the duo leaderboard. */
  skipped: boolean;
  summary: DuoSummary | null;
  /** The session closes at this time (4 hours after it was made). */
  expiresAt: number;
}

export interface ChatMessage {
  id: string;
  uid: string;
  name: string;
  text: string;
  at: number;
}

export interface Reaction {
  id: string;
  uid: string;
  name: string;
  emoji: string;
  /** The stop (index) it was about. */
  stop: number;
  at: number;
}

export type ClientMessage =
  | { t: "ping"; c: number }
  | { t: "ready" }
  | { t: "loc"; lat: number; lng: number; anon: boolean }
  | { t: "arrive"; i: number }
  /** Play stop i now: a skip (counts against the time) or "don't wait for my friend" (doesn't). */
  | { t: "goto"; i: number; skip: boolean }
  | { t: "pause"; pos: number }
  | { t: "resume"; pos: number }
  | { t: "chat"; id: string; text: string }
  | { t: "react"; id: string; emoji: string }
  | { t: "guide"; guide: string }
  | { t: "complete" }
  | { t: "rate"; stars: number }
  | { t: "leave" };

export type ServerMessage =
  | { t: "pong"; c: number; s: number }
  /** The friend's phone checked in (sent on each of their pings), so a silent drop can be noticed. */
  | { t: "seen"; uid: string }
  | { t: "state"; state: DuoState }
  | { t: "history"; chat: ChatMessage[]; reactions: Reaction[] }
  | { t: "chat"; msg: ChatMessage }
  | { t: "react"; r: Reaction }
  /** The friend's position (null in their anonymous mode) and how far apart you are. */
  | { t: "friend"; lat: number | null; lng: number | null; meters: number | null; at: number }
  | { t: "error"; message: string };

export const REACTION_EMOJI = ["😂", "❤️", "🤔", "😮", "👏"] as const;

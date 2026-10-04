import AsyncStorage from "@react-native-async-storage/async-storage";
import { api, savedIdentity } from "./api";

export type Board = "overall" | "tour" | "most" | "duo" | "distance" | "steps";
export type Period = "week" | "month" | "all";

export interface BoardRow {
  rank: number;
  uid: string;
  name: string;
  /** Seconds for "overall" and "tour"; tours finished for "most". */
  value: number;
  tour?: string;
  tourName?: string;
  secondsPerKm?: number;
  /** "duo": the two walkers (uid is the pair). */
  uids?: string[];
  at: number;
}

export interface BoardResult {
  board: Board;
  period: Period;
  tour: string | null;
  total: number;
  rows: BoardRow[];
  me: BoardRow | null;
  /** The signed-in user's id, to highlight their row. */
  myId: string | null;
  updatedAt: number;
}

const cacheKey = (board: Board, period: Period, tour: string | null) =>
  `storystep.board.${board}.${period}.${tour ?? ""}`;

/** The last copy seen of a board, to show straight away while it refreshes. */
export async function cachedBoard(board: Board, period: Period, tour: string | null): Promise<BoardResult | null> {
  try {
    return JSON.parse((await AsyncStorage.getItem(cacheKey(board, period, tour))) ?? "null");
  } catch {
    return null;
  }
}

export async function fetchBoard(board: Board, period: Period, tour: string | null): Promise<BoardResult> {
  const identity = await savedIdentity();
  const params = new URLSearchParams({ board, period });
  if (tour) params.set("tour", tour);
  if (identity) params.set("me", identity.userId);
  const result = await api<Omit<BoardResult, "myId">>(`/api/leaderboard?${params}`);
  const withMe: BoardResult = { ...result, myId: identity?.userId ?? null };
  void AsyncStorage.setItem(cacheKey(board, period, tour), JSON.stringify(withMe)).catch(() => {});
  return withMe;
}

/** 25:04 / 1:02:09 */
export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}

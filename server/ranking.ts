/**
 * Leaderboard rankings, worked out on request from the finished tours in the
 * chosen period (and cached for 15 seconds), so new finishes show up within
 * seconds.
 */
import { TOURS, tourById } from "./social";

export interface Completion {
  uid: string;
  name: string;
  tour: string;
  /** Start-to-finish seconds, or null when the run doesn't count for speed. */
  sec: number | null;
  at: number;
}

export type Board = "overall" | "tour" | "most" | "duo";
export type Period = "week" | "month" | "all";

export interface Row {
  rank: number;
  uid: string;
  name: string;
  /** Seconds for "overall" and "tour", number of tours for "most". */
  value: number;
  /** "overall": the tour the best pace was set on, and its pace in s/km. */
  tour?: string;
  tourName?: string;
  secondsPerKm?: number;
  /** "duo": the two walkers (uid is the pair). */
  uids?: string[];
  at: number;
}

const PERIOD_MS: Record<Period, number> = { week: 7 * 24 * 3600_000, month: 30 * 24 * 3600_000, all: Infinity };

/** The earliest finish that counts for a period. */
export const periodStart = (period: Period) => (period === "all" ? 0 : Date.now() - PERIOD_MS[period]);

/** Shared places for equal values (1, 2, 2, 4). */
function rankRows(rows: Omit<Row, "rank">[], better: (a: Omit<Row, "rank">, b: Omit<Row, "rank">) => number): Row[] {
  const sorted = [...rows].sort(better);
  let rank = 0;
  return sorted.map((row, i) => {
    if (i === 0 || better(sorted[i - 1], row) !== 0) rank = i + 1;
    return { ...row, rank };
  });
}

/** `recent` is the period's finishes (just one tour's for the "tour" board). */
export function computeBoard(board: Board, recent: Completion[]): Row[] {
  if (board === "most") {
    const byUser = new Map<string, { name: string; tours: Set<string>; at: number }>();
    for (const c of recent) {
      const entry = byUser.get(c.uid) ?? { name: c.name, tours: new Set<string>(), at: 0 };
      entry.tours.add(c.tour);
      entry.at = Math.max(entry.at, c.at);
      entry.name = c.name;
      byUser.set(c.uid, entry);
    }
    return rankRows(
      [...byUser].map(([uid, e]) => ({ uid, name: e.name, value: e.tours.size, at: e.at })),
      (a, b) => b.value - a.value
    );
  }

  const best = new Map<string, Omit<Row, "rank">>();
  for (const c of recent) {
    if (c.sec === null) continue;
    const tour = tourById(c.tour);
    if (!tour) continue;
    const secondsPerKm = c.sec / tour.distanceKm;
    const score = board === "overall" ? secondsPerKm : c.sec;
    const current = best.get(c.uid);
    const currentScore = current ? (board === "overall" ? current.secondsPerKm! : current.value) : Infinity;
    if (score < currentScore) {
      best.set(c.uid, {
        uid: c.uid,
        name: c.name,
        value: c.sec,
        tour: c.tour,
        tourName: tour.name,
        secondsPerKm: Math.round(secondsPerKm),
        at: c.at,
      });
    }
  }
  return rankRows([...best.values()], (a, b) =>
    board === "overall" ? a.secondsPerKm! - b.secondsPerKm! : a.value - b.value
  );
}

/** A tour two people finished together (duo_completions). */
export interface DuoCompletion {
  tour: string;
  uid_a: string;
  name_a: string;
  uid_b: string;
  name_b: string;
  sec: number;
  at: number;
}

/** Fastest pairs by pace (time per km), each pair's best walk. */
export function computeDuoBoard(recent: DuoCompletion[]): Row[] {
  const best = new Map<string, Omit<Row, "rank">>();
  for (const c of recent) {
    const tour = tourById(c.tour);
    if (!tour) continue;
    const pair = `${c.uid_a}+${c.uid_b}`;
    const secondsPerKm = c.sec / tour.distanceKm;
    const current = best.get(pair);
    if (!current || secondsPerKm < current.secondsPerKm!) {
      best.set(pair, {
        uid: pair,
        uids: [c.uid_a, c.uid_b],
        name: `${c.name_a} & ${c.name_b}`,
        value: c.sec,
        tour: c.tour,
        tourName: tour.name,
        secondsPerKm: Math.round(secondsPerKm),
        at: c.at,
      });
    }
  }
  return rankRows([...best.values()], (a, b) => a.secondsPerKm! - b.secondsPerKm!);
}

export const knownTour = (id: string) => TOURS.some((t) => t.id === id);

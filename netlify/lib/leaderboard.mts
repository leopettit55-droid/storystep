/**
 * Leaderboard data and rankings. Every finished tour is one entry in a single
 * shared record; boards are worked out from it on request (and cached briefly
 * by Netlify's CDN), so new finishes show up within seconds.
 */
import { TOURS, tourById } from "./social.mts";

export const LEADERBOARD_KEY = "leaderboard";

export interface Completion {
  uid: string;
  name: string;
  tour: string;
  /** Start-to-finish seconds, or null when the run doesn't count for speed. */
  sec: number | null;
  at: number;
}

export interface Leaderboard {
  completions: Completion[];
}

export type Board = "overall" | "tour" | "most";
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
  at: number;
}

const PERIOD_MS: Record<Period, number> = { week: 7 * 24 * 3600_000, month: 30 * 24 * 3600_000, all: Infinity };

/** Shared places for equal values (1, 2, 2, 4). */
function rankRows(rows: Omit<Row, "rank">[], better: (a: Omit<Row, "rank">, b: Omit<Row, "rank">) => number): Row[] {
  const sorted = [...rows].sort(better);
  let rank = 0;
  return sorted.map((row, i) => {
    if (i === 0 || better(sorted[i - 1], row) !== 0) rank = i + 1;
    return { ...row, rank };
  });
}

export function computeBoard(board: Board, period: Period, tourId: string | null, data: Leaderboard): Row[] {
  const since = Date.now() - PERIOD_MS[period];
  const recent = data.completions.filter((c) => c.at >= since);

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

  const timed = recent.filter((c) => c.sec !== null && (board === "overall" || c.tour === tourId));
  const best = new Map<string, Omit<Row, "rank">>();
  for (const c of timed) {
    const tour = tourById(c.tour);
    if (!tour) continue;
    const secondsPerKm = (c.sec as number) / tour.distanceKm;
    const score = board === "overall" ? secondsPerKm : (c.sec as number);
    const current = best.get(c.uid);
    const currentScore = current ? (board === "overall" ? current.secondsPerKm! : current.value) : Infinity;
    if (score < currentScore) {
      best.set(c.uid, {
        uid: c.uid,
        name: c.name,
        value: c.sec as number,
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

export const knownTour = (id: string) => TOURS.some((t) => t.id === id);

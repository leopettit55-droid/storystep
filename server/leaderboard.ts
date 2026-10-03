/**
 * GET /api/leaderboard?board=overall|tour|most|duo&period=week|month|all&tour=<id>&me=<userId>
 *
 * The top 100, plus the asking user's own row if they're further down. The
 * full ranking is kept in Cloudflare's cache for 15 seconds, so opening the
 * board doesn't read the database every time yet new finishes appear quickly.
 */
import { computeBoard, computeDuoBoard, knownTour, periodStart, type Board, type Completion, type DuoCompletion, type Period, type Row } from "./ranking";
import { error, json, type Env } from "./social";

const BOARDS: Board[] = ["overall", "tour", "most", "duo"];
const PERIODS: Period[] = ["week", "month", "all"];
const LIMIT = 100;
const CACHE_SECONDS = 15;

interface Ranking {
  rows: Row[];
  updatedAt: number;
}

async function ranking(env: Env, board: Board, period: Period, tour: string | null): Promise<Ranking> {
  const since = periodStart(period);
  if (board === "duo") {
    const { results } = await env.DB.prepare(
      "SELECT tour, uid_a, name_a, uid_b, name_b, sec, at FROM duo_completions WHERE at >= ? AND sec IS NOT NULL"
    )
      .bind(since)
      .all<DuoCompletion>();
    return { rows: computeDuoBoard(results), updatedAt: Date.now() };
  }
  const query =
    board === "tour"
      ? env.DB.prepare("SELECT uid, name, tour, sec, at FROM completions WHERE at >= ? AND tour = ?").bind(since, tour)
      : env.DB.prepare("SELECT uid, name, tour, sec, at FROM completions WHERE at >= ?").bind(since);
  const { results } = await query.all<Completion>();
  return { rows: computeBoard(board, results), updatedAt: Date.now() };
}

export async function getLeaderboard(env: Env, req: Request, waitUntil: (p: Promise<unknown>) => void): Promise<Response> {
  const url = new URL(req.url);
  const board = (url.searchParams.get("board") ?? "overall") as Board;
  const period = (url.searchParams.get("period") ?? "all") as Period;
  const tour = board === "tour" ? url.searchParams.get("tour") : null;
  const me = url.searchParams.get("me");
  if (!BOARDS.includes(board) || !PERIODS.includes(period)) return error(400, "Unknown board or period");
  if (board === "tour" && (!tour || !knownTour(tour))) return error(400, "Pick a tour");

  // Cached without `me`, so everyone looking at the same board shares one copy.
  const cacheKey = new Request(`${url.origin}/api/leaderboard?board=${board}&period=${period}&tour=${tour ?? ""}`);
  const cache = (caches as unknown as { default: Cache }).default;
  let data = (await (await cache.match(cacheKey))?.json<Ranking>()) ?? null;
  if (!data) {
    data = await ranking(env, board, period, tour);
    const copy = new Response(JSON.stringify(data), {
      headers: { "content-type": "application/json", "cache-control": `public, max-age=${CACHE_SECONDS}` },
    });
    waitUntil(cache.put(cacheKey, copy));
  }

  const mine = me ? data.rows.find((r) => r.uid === me || r.uids?.includes(me)) ?? null : null;
  return json(
    { board, period, tour, total: data.rows.length, rows: data.rows.slice(0, LIMIT), me: mine, updatedAt: data.updatedAt },
    200,
    { "cache-control": "no-store" }
  );
}

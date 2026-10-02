/**
 * GET /api/leaderboard?board=overall|tour|most&period=week|month|all&tour=<id>&me=<userId>
 *
 * The top 100, plus the asking user's own row if they're further down.
 * Cached at Netlify's edge for 15 seconds (and served stale for a minute
 * while refreshing), so opening the board doesn't hit storage every time
 * yet new finishes appear within seconds.
 */
import type { Config } from "@netlify/functions";
import { error, json, preflight, read } from "../lib/social.mts";
import { computeBoard, knownTour, LEADERBOARD_KEY, type Board, type Leaderboard, type Period } from "../lib/leaderboard.mts";

const BOARDS: Board[] = ["overall", "tour", "most"];
const PERIODS: Period[] = ["week", "month", "all"];
const LIMIT = 100;

export default async (req: Request) => {
  if (req.method === "OPTIONS") return preflight();
  if (req.method !== "GET") return error(405, "Use GET");
  const url = new URL(req.url);
  const board = (url.searchParams.get("board") ?? "overall") as Board;
  const period = (url.searchParams.get("period") ?? "all") as Period;
  const tour = url.searchParams.get("tour");
  const me = url.searchParams.get("me");
  if (!BOARDS.includes(board) || !PERIODS.includes(period)) return error(400, "Unknown board or period");
  if (board === "tour" && (!tour || !knownTour(tour))) return error(400, "Pick a tour");

  const data = await read<Leaderboard>(LEADERBOARD_KEY, { completions: [] });
  const rows = computeBoard(board, period, tour, data);
  const mine = me ? rows.find((r) => r.uid === me) ?? null : null;

  return json(
    { board, period, tour, total: rows.length, rows: rows.slice(0, LIMIT), me: mine, updatedAt: Date.now() },
    200,
    {
      "cache-control": "public, max-age=0, must-revalidate",
      "netlify-cdn-cache-control": "public, durable, s-maxage=15, stale-while-revalidate=60",
    }
  );
};

export const config: Config = { path: "/api/leaderboard" };

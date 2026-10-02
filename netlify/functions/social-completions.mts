/**
 * POST /api/completions  { tourId, seconds?, completedAt }   (signed in)
 *
 * Records a finished tour for the leaderboards. `seconds` is the walk's time
 * from tapping Start to the last stop; the app leaves it out for runs that
 * don't count for speed (skipped stops, resumed later). A time faster than a
 * brisk walk means the tour wasn't really walked, so it isn't recorded at
 * all; one over 12 hours counts as finished but isn't ranked for speed.
 */
import type { Config } from "@netlify/functions";
import { authUser, error, json, preflight, tourById, update } from "../lib/social.mts";
import { LEADERBOARD_KEY, type Leaderboard } from "../lib/leaderboard.mts";

/** About 8 km/h: faster than this means stops were skipped or the GPS was off. */
const FASTEST_WALK_M_PER_S = 2.2;
const SLOWEST_RUN_S = 12 * 60 * 60;
/** The same tour finished twice within this long is the same walk. */
const DUPLICATE_WINDOW_MS = 10 * 60 * 1000;

export default async (req: Request) => {
  if (req.method === "OPTIONS") return preflight();
  if (req.method !== "POST") return error(405, "Use POST");
  const user = await authUser(req);
  if (!user) return error(401, "Sign in to record tours");

  const body = await req.json().catch(() => null);
  const tour = tourById(String(body?.tourId ?? ""));
  if (!tour) return error(400, "Unknown tour");

  const now = Date.now();
  const at = Number(body?.completedAt);
  // A finish recorded offline is sent later; accept it if it's plausible.
  const completedAt = Number.isFinite(at) && at <= now + 60_000 && at > now - 30 * 24 * 3600_000 ? at : now;

  let seconds: number | null = body?.seconds == null ? null : Number(body.seconds);
  const fastest = (tour.distanceKm * 1000) / FASTEST_WALK_M_PER_S;
  if (seconds !== null && Number.isFinite(seconds) && seconds < fastest) {
    return error(422, "That's faster than the tour can be walked");
  }
  if (seconds === null || !Number.isFinite(seconds) || seconds > SLOWEST_RUN_S) seconds = null;

  let duplicate = false;
  await update<Leaderboard>(LEADERBOARD_KEY, { completions: [] }, (board) => {
    duplicate = board.completions.some(
      (c) => c.uid === user.id && c.tour === tour.id && Math.abs(c.at - completedAt) < DUPLICATE_WINDOW_MS
    );
    if (!duplicate) {
      board.completions.push({ uid: user.id, name: user.name, tour: tour.id, sec: seconds === null ? null : Math.round(seconds), at: completedAt });
    }
    return board;
  });
  return json({ recorded: !duplicate, duplicate, ranked: !duplicate && seconds !== null });
};

export const config: Config = { path: "/api/completions" };

/**
 * POST /api/completions  { tourId, seconds?, completedAt }   (signed in)
 *
 * Records a finished tour for the leaderboards. `seconds` is the walk's time
 * from tapping Start to the last stop; the app leaves it out for runs that
 * don't count for speed (skipped stops, resumed later). A time faster than a
 * brisk walk means the tour wasn't really walked, so it isn't recorded at
 * all; one over 12 hours counts as finished but isn't ranked for speed.
 */
import { authUser, error, json, tourById, type Env } from "./social";

/** About 8 km/h: faster than this means stops were skipped or the GPS was off. */
const FASTEST_WALK_M_PER_S = 2.2;
const SLOWEST_RUN_S = 12 * 60 * 60;
/** The same tour finished twice within this long is the same walk. */
const DUPLICATE_WINDOW_MS = 10 * 60 * 1000;

export async function recordCompletion(env: Env, req: Request): Promise<Response> {
  const user = await authUser(env, req);
  if (!user) return error(401, "Sign in to record tours");

  const body = await req.json<Record<string, unknown>>().catch(() => null);
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
  const sec = seconds === null ? null : Math.round(seconds);

  // One statement, so two copies of the same finish arriving at once still count once.
  const result = await env.DB.prepare(
    `INSERT INTO completions (uid, name, tour, sec, at)
     SELECT ?1, ?2, ?3, ?4, ?5
     WHERE NOT EXISTS (SELECT 1 FROM completions WHERE uid = ?1 AND tour = ?3 AND at > ?6 AND at < ?7)`
  )
    .bind(user.id, user.name, tour.id, sec, completedAt, completedAt - DUPLICATE_WINDOW_MS, completedAt + DUPLICATE_WINDOW_MS)
    .run();
  const duplicate = result.meta.changes === 0;
  return json({ recorded: !duplicate, duplicate, ranked: !duplicate && sec !== null });
}

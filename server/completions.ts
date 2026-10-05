/**
 * POST /api/completions  { tourId, seconds?, completedAt, meters?, steps?, stepsFromHealth?, duo? }   (signed in)
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
/** More than this many times the route's length isn't one tour's walk. */
const MAX_ROUTE_MULTIPLE = 3;
/** Fewer metres per step than this isn't walking (a long stride is about 0.9 m; this allows shuffling crowds). */
const MIN_METERS_PER_STEP = 0.3;
/** Walking pace step length used when the phone sent no steps. */
const METERS_PER_STEP = 0.75;
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

  const duo = body?.duo === true;
  let seconds: number | null = body?.seconds == null || duo ? null : Number(body.seconds);
  const fastest = (tour.distanceKm * 1000) / FASTEST_WALK_M_PER_S;
  if (seconds !== null && Number.isFinite(seconds) && seconds < fastest) {
    return error(422, "That's faster than the tour can be walked");
  }
  if (seconds === null || !Number.isFinite(seconds) || seconds > SLOWEST_RUN_S) seconds = null;
  const sec = seconds === null ? null : Math.round(seconds);

  // Distance and steps: kept to what one walk of this tour could be.
  const routeMeters = tour.distanceKm * 1000;
  const sentMeters = Number(body?.meters);
  const meters = Number.isFinite(sentMeters) && sentMeters > 0 ? Math.round(Math.min(sentMeters, routeMeters * MAX_ROUTE_MULTIPLE)) : 0;
  const sentSteps = Number(body?.steps);
  const fromHealth = body?.stepsFromHealth === true && Number.isFinite(sentSteps) && sentSteps > 0;
  const steps = fromHealth
    ? Math.round(Math.min(sentSteps, (meters || routeMeters * MAX_ROUTE_MULTIPLE) / MIN_METERS_PER_STEP))
    : Math.round(meters / METERS_PER_STEP);

  // One statement, so two copies of the same finish arriving at once still count once.
  const result = await env.DB.prepare(
    `INSERT INTO completions (uid, name, tour, sec, at, meters, steps, steps_health, duo)
     SELECT ?1, ?2, ?3, ?4, ?5, ?8, ?9, ?10, ?11
     WHERE NOT EXISTS (SELECT 1 FROM completions WHERE uid = ?1 AND tour = ?3 AND at > ?6 AND at < ?7)`
  )
    .bind(
      user.id, user.name, tour.id, sec, completedAt, completedAt - DUPLICATE_WINDOW_MS, completedAt + DUPLICATE_WINDOW_MS,
      meters, steps, fromHealth ? 1 : 0, duo ? 1 : 0
    )
    .run();
  const duplicate = result.meta.changes === 0;
  return json({ recorded: !duplicate, duplicate, ranked: !duplicate && sec !== null });
}

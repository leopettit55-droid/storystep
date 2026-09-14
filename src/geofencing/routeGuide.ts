import type { Coordinates } from "../content";
import { bearingDegrees, distanceMeters } from "./proximityTracker";

/** How far ahead along the path to look when deciding "which way to walk
 * right now" — short enough to hug the path's actual shape through bends,
 * long enough not to jitter on GPS noise. */
const LOOKAHEAD_M = 10;
/** How far ahead to scan for the next sharp turn in the path. */
const TURN_SCAN_WINDOW_M = 40;
/** A path bend sharper than this (degrees) counts as a real turn to call out,
 * rather than just the path's natural street-following wobble. */
const TURN_THRESHOLD_DEG = 28;

export interface UpcomingTurn {
  distanceMeters: number;
  /** Signed turn angle: positive = right, negative = left. */
  turnAngleDeg: number;
}

export interface RouteGuidance {
  /** True-north bearing to walk right now, following the path's actual shape. */
  walkBearing: number;
  /** The next sharp bend in the path within the scan window, if any. */
  upcomingTurn: UpcomingTurn | null;
  /** Walking distance along the path from the user's position to `target`. */
  pathDistanceTo: (target: Coordinates) => number;
}

function nearestIndex(path: Coordinates[], point: Coordinates): number {
  let best = 0;
  let bestDist = Infinity;
  for (let i = 0; i < path.length; i++) {
    const d = distanceMeters(point, path[i]);
    if (d < bestDist) {
      bestDist = d;
      best = i;
    }
  }
  return best;
}

/** Signed smallest angle from `a` to `b`, in -180..180. */
function angleDelta(a: number, b: number): number {
  return ((b - a + 540) % 360) - 180;
}

/** Walks forward along the path from `fromIndex` by `meters`, returning the
 * point reached (snapped to the nearest path vertex — the dense routing-
 * service polylines here have points every few meters, so this is plenty
 * precise for a walking guide without needing segment interpolation). */
function walkForward(path: Coordinates[], fromIndex: number, meters: number): Coordinates {
  let remaining = meters;
  let i = fromIndex;
  while (i < path.length - 1 && remaining > 0) {
    remaining -= distanceMeters(path[i], path[i + 1]);
    i += 1;
  }
  return path[i];
}

/**
 * Projects the user's live GPS position onto the tour's real street-following
 * path (the same polyline used for the map) and derives: the true walking
 * bearing right now (not a straight line to a waypoint that might be 200m
 * away through buildings), the next sharp turn coming up, and walking
 * distance along the path to any target coordinate. This is what lets the AR
 * guide's ribbon and turn prompts actually track the tour's real route.
 */
export function computeRouteGuidance(path: Coordinates[], userCoords: Coordinates): RouteGuidance | null {
  if (path.length < 2) return null;

  const startIdx = nearestIndex(path, userCoords);
  const lookaheadPoint = walkForward(path, startIdx, LOOKAHEAD_M);
  const walkBearing = bearingDegrees(userCoords, lookaheadPoint);

  let upcomingTurn: UpcomingTurn | null = null;
  let cumulative = distanceMeters(userCoords, path[startIdx]);
  for (let i = startIdx; i < path.length - 2 && cumulative < TURN_SCAN_WINDOW_M; i++) {
    const bIn = bearingDegrees(path[i], path[i + 1]);
    const bOut = bearingDegrees(path[i + 1], path[i + 2]);
    const delta = angleDelta(bIn, bOut);
    cumulative += distanceMeters(path[i], path[i + 1]);
    if (Math.abs(delta) >= TURN_THRESHOLD_DEG) {
      upcomingTurn = { distanceMeters: cumulative, turnAngleDeg: delta };
      break;
    }
  }

  return {
    walkBearing,
    upcomingTurn,
    pathDistanceTo: (target: Coordinates) => {
      const targetIdx = nearestIndex(path, target);
      const lo = Math.min(startIdx, targetIdx);
      const hi = Math.max(startIdx, targetIdx);
      let dist = distanceMeters(userCoords, path[startIdx]);
      for (let j = lo; j < hi; j++) dist += distanceMeters(path[j], path[j + 1]);
      dist += distanceMeters(path[targetIdx], target);
      return dist;
    },
  };
}

import type { Coordinates, Waypoint } from "../content";
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
/** Routing-service polylines are dense; hand-drawn ones (inside colleges,
 * where no routing service reaches) aren't — insert points so nearest-vertex
 * projection stays accurate to a few metres. */
const MAX_SEGMENT_M = 5;
/** Progress along the path can only move within this many vertices of the
 * last fix unless a far closer vertex elsewhere says the walker jumped. This
 * is what stops a route that doubles back on itself (out to the Old Kitchen
 * and back, say) from snapping to the wrong pass. */
const WINDOW_BACK = 12;
const WINDOW_FORWARD = 80;

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
  /** Index (into the tour's route) of the stop the walker is heading to. */
  targetIndex: number;
  /** Walking distance along the path from the walker to that stop. */
  distanceToTarget: number;
}

/** Signed smallest angle from `a` to `b`, in -180..180. */
function angleDelta(a: number, b: number): number {
  return ((b - a + 540) % 360) - 180;
}

function densify(path: Coordinates[]): Coordinates[] {
  const out: Coordinates[] = [];
  for (let i = 0; i < path.length - 1; i++) {
    const a = path[i];
    const b = path[i + 1];
    out.push(a);
    const steps = Math.floor(distanceMeters(a, b) / MAX_SEGMENT_M);
    for (let s = 1; s <= steps; s++) {
      const f = s / (steps + 1);
      out.push({ lat: a.lat + (b.lat - a.lat) * f, lng: a.lng + (b.lng - a.lng) * f });
    }
  }
  out.push(path[path.length - 1]);
  return out;
}

/**
 * Tracks a walker's progress along a tour's real path and derives, from their
 * live GPS position: the true walking bearing right now (not a straight line
 * to a stop that might be around a corner), the next sharp turn coming up,
 * which stop they're heading to, and the walking distance to it.
 *
 * The target is chosen by progress along the path, not by the tour store's
 * "current waypoint" — that one is simply the last stop whose narration
 * started, which is still the stop you just walked away from.
 */
export class RouteProgress {
  private path: Coordinates[];
  /** Cumulative walking distance from the start to each path vertex. */
  private cumulative: number[];
  /** Path vertex nearest each stop, searched forward so out-and-back routes work. */
  private stopIndex: number[];
  private lastIndex = -1;
  /** Targets only ever move forward, so jittery GPS can't flip between neighbouring stops. */
  private lastTarget = 0;

  constructor(path: Coordinates[], private route: Waypoint[]) {
    this.path = densify(path);
    this.cumulative = [0];
    for (let i = 1; i < this.path.length; i++) {
      this.cumulative.push(this.cumulative[i - 1] + distanceMeters(this.path[i - 1], this.path[i]));
    }
    this.stopIndex = [];
    let from = 0;
    for (const stop of route) {
      let best = from;
      let bestDist = Infinity;
      for (let i = from; i < this.path.length; i++) {
        const d = distanceMeters(stop.coordinates, this.path[i]);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      }
      this.stopIndex.push(best);
      from = best;
    }
  }

  private locate(user: Coordinates, visitedIds: string[]): number {
    if (this.lastIndex < 0) {
      // A tour begins at the start of its path. A route that loops back past
      // its own start (Magdalen does) would otherwise snap to the far end, so
      // begin at the start — or just after the last stop already narrated,
      // if the tour is being resumed.
      let seed = 0;
      for (let i = this.route.length - 1; i >= 0; i--) {
        if (visitedIds.includes(this.route[i].id)) {
          seed = this.stopIndex[i];
          break;
        }
      }
      this.lastIndex = seed;
    }
    const globalBest = this.nearest(user, 0, this.path.length - 1);
    const lo = Math.max(0, this.lastIndex - WINDOW_BACK);
    const hi = Math.min(this.path.length - 1, this.lastIndex + WINDOW_FORWARD);
    const local = this.nearest(user, lo, hi);
    // Trust the window unless the walker is clearly much closer to somewhere else.
    if (globalBest !== local) {
      const dLocal = distanceMeters(user, this.path[local]);
      const dGlobal = distanceMeters(user, this.path[globalBest]);
      if (dGlobal + 25 < dLocal) return globalBest;
    }
    return local;
  }

  private nearest(user: Coordinates, lo: number, hi: number): number {
    let best = lo;
    let bestDist = Infinity;
    for (let i = lo; i <= hi; i++) {
      const d = distanceMeters(user, this.path[i]);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    }
    return best;
  }

  update(user: Coordinates, visitedIds: string[]): RouteGuidance {
    const idx = this.locate(user, visitedIds);
    this.lastIndex = idx;

    // Head for the first stop that hasn't been narrated and hasn't been walked
    // past. A narrated stop is done for good, whatever the GPS does next.
    let targetIndex = this.route.length - 1;
    for (let i = this.lastTarget; i < this.route.length; i++) {
      const passed = this.stopIndex[i] < idx - 3;
      const done = visitedIds.includes(this.route[i].id);
      if (!passed && !done) {
        targetIndex = i;
        break;
      }
    }
    this.lastTarget = targetIndex;

    let ahead = idx;
    let remaining = LOOKAHEAD_M;
    while (ahead < this.path.length - 1 && remaining > 0) {
      remaining -= distanceMeters(this.path[ahead], this.path[ahead + 1]);
      ahead += 1;
    }
    const walkBearing = bearingDegrees(user, this.path[ahead]);

    let upcomingTurn: UpcomingTurn | null = null;
    let cumulative = distanceMeters(user, this.path[idx]);
    for (let i = idx; i < this.path.length - 2 && cumulative < TURN_SCAN_WINDOW_M; i++) {
      const bIn = bearingDegrees(this.path[i], this.path[i + 1]);
      const bOut = bearingDegrees(this.path[i + 1], this.path[i + 2]);
      const delta = angleDelta(bIn, bOut);
      cumulative += distanceMeters(this.path[i], this.path[i + 1]);
      if (Math.abs(delta) >= TURN_THRESHOLD_DEG) {
        upcomingTurn = { distanceMeters: cumulative, turnAngleDeg: delta };
        break;
      }
    }

    const targetAt = this.stopIndex[targetIndex];
    const along = Math.max(0, this.cumulative[targetAt] - this.cumulative[idx]);
    const distanceToTarget = along + distanceMeters(user, this.path[idx]);

    return { walkBearing, upcomingTurn, targetIndex, distanceToTarget };
  }
}

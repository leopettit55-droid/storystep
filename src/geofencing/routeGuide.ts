import type { Coordinates, Waypoint } from "../content";
import { distanceMeters } from "./proximityTracker";

/** How far ahead along the path to look when deciding "which way to walk
 * right now" — short enough to hug the path's actual shape through bends,
 * long enough not to jitter on GPS noise. Measured from the walker's
 * position ON the path, so it always points along the path itself. */
const LOOKAHEAD_M = 8;
/** Phone GPS is routinely 5-15m out between college walls and tall buildings.
 * Within this distance of the path the walker is treated as being ON it, and
 * the guide follows the path's own direction — aiming from the raw GPS fix
 * instead is what points the guide diagonally into walls and hedges. */
const SNAP_RADIUS_M = 15;
/** How much of the path ahead the ground ribbon draws. */
const RIBBON_LENGTH_M = 16;
const RIBBON_STEP_M = 0.75;
/** How far ahead to scan for the next sharp turn in the path. */
const TURN_SCAN_WINDOW_M = 40;
/** A path bend sharper than this (degrees) counts as a real turn to call out,
 * rather than just the path's natural street-following wobble. */
const TURN_THRESHOLD_DEG = 28;
/** Routing-service polylines are dense; hand-drawn ones (inside colleges,
 * where no routing service reaches) aren't — insert points so turn detection
 * and the stop-matching below stay accurate to a few metres. */
const MAX_SEGMENT_M = 5;
/** Progress along the path can only move within this many segments of the
 * last fix unless a far closer segment elsewhere says the walker jumped. This
 * is what stops a route that doubles back on itself (out to the Old Kitchen
 * and back, say) from snapping to the wrong pass. */
const WINDOW_BACK = 12;
const WINDOW_FORWARD = 80;
/** Moving backwards along the route by more than a metre between fixes
 * costs this many metres of "distance from the path" per metre — GPS noise
 * alone rarely justifies it, so progress sticks to the pass being walked. */
const BACKTRACK_FREE_M = 1;
const BACKTRACK_COST = 1;
/** Leaping far ahead along the route is also suspect (e.g. to the far end of
 * a loop that passes close by), just less so than going backwards. */
const SKIP_AHEAD_FREE_M = 25;
const SKIP_AHEAD_COST = 0.3;

export interface UpcomingTurn {
  distanceMeters: number;
  /** Signed turn angle: positive = right, negative = left. */
  turnAngleDeg: number;
}

/** A point relative to the guide's origin, in metres east and north. */
export interface LocalOffset {
  east: number;
  north: number;
}

export interface RouteGuidance {
  /** True-north bearing to walk right now, following the path's actual shape. */
  walkBearing: number;
  /** The path ahead, as offsets from the walker (snapped onto the path when
   * they're within GPS error of it) — what the AR ribbon and penguin follow,
   * so they bend round corners instead of cutting through them. */
  pathAhead: LocalOffset[];
  /** How far the walker's GPS position is from the path. */
  offPathMeters: number;
  /** True when the walker is further from the path than GPS error explains. */
  offPath: boolean;
  /** The next sharp bend in the path within the scan window, if any. */
  upcomingTurn: UpcomingTurn | null;
  /** Index (into the tour's route) of the stop the walker is heading to. */
  targetIndex: number;
  /** Walking distance along the path from the walker to that stop. */
  distanceToTarget: number;
}

interface Projection {
  /** Segment index (path[seg] → path[seg + 1]). */
  seg: number;
  /** Local metres of the closest point on the path. */
  x: number;
  y: number;
  /** Distance from the walker to that point. */
  dist: number;
  /** Walking distance from the path's start to that point. */
  along: number;
}

/** Signed smallest angle from `a` to `b`, in -180..180. */
function angleDelta(a: number, b: number): number {
  return ((b - a + 540) % 360) - 180;
}

/** Compass bearing of a local east/north vector. */
function localBearing(dx: number, dy: number): number {
  return ((Math.atan2(dx, dy) * 180) / Math.PI + 360) % 360;
}

function densify(raw: Coordinates[]): Coordinates[] {
  // Several tour paths repeat a point; a zero-length step reads as "heading
  // due north" to the turn detector and triggers a phantom turn prompt.
  const path = raw.filter((p, i) => i === 0 || distanceMeters(raw[i - 1], p) > 0.05);
  if (path.length < 2) return path.length === 1 ? [path[0], path[0]] : raw;
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
 * to a stop that might be around a corner), the shape of the path just ahead,
 * the next sharp turn coming up, which stop they're heading to, and the
 * walking distance to it.
 *
 * The target is chosen by progress along the path, not by the tour store's
 * "current waypoint" — that one is simply the last stop whose narration
 * started, which is still the stop you just walked away from.
 */
export class RouteProgress {
  private path: Coordinates[];
  /** The path in local metres (east, north) from its first point. Over a
   * walking tour's few km a flat projection is accurate to centimetres. */
  private xy: Array<[number, number]>;
  /** Cumulative walking distance from the start to each path vertex. */
  private cumulative: number[];
  /** Path vertex nearest each stop, searched forward so out-and-back routes work. */
  private stopIndex: number[];
  private lastSeg = -1;
  private lastAlong: number | null = null;
  /** Targets only ever move forward, so jittery GPS can't flip between neighbouring stops. */
  private lastTarget = 0;
  private originLat: number;
  private originLng: number;
  private metersPerDegLat = 111320;
  private metersPerDegLng: number;

  constructor(path: Coordinates[], private route: Waypoint[]) {
    this.path = densify(path);
    this.originLat = this.path[0].lat;
    this.originLng = this.path[0].lng;
    this.metersPerDegLng = 111320 * Math.cos((this.originLat * Math.PI) / 180);
    this.xy = this.path.map((p) => this.toLocal(p));
    this.cumulative = [0];
    for (let i = 1; i < this.xy.length; i++) {
      const [ax, ay] = this.xy[i - 1];
      const [bx, by] = this.xy[i];
      this.cumulative.push(this.cumulative[i - 1] + Math.hypot(bx - ax, by - ay));
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

  private toLocal(p: Coordinates): [number, number] {
    return [(p.lng - this.originLng) * this.metersPerDegLng, (p.lat - this.originLat) * this.metersPerDegLat];
  }

  /** Closest point on segments lo..hi (inclusive) to local point (ux, uy).
   * With `fromAlong`, sliding backwards along the route costs extra, so on a
   * street walked out and back the walker stays on the pass they're actually
   * on instead of flipping to the other one and the guide pointing backwards. */
  private project(ux: number, uy: number, lo: number, hi: number, fromAlong?: number): Projection {
    let best: Projection = { seg: lo, x: this.xy[lo][0], y: this.xy[lo][1], dist: Infinity, along: 0 };
    let bestCost = Infinity;
    for (let i = lo; i <= hi && i < this.xy.length - 1; i++) {
      const [ax, ay] = this.xy[i];
      const [bx, by] = this.xy[i + 1];
      const dx = bx - ax;
      const dy = by - ay;
      const len2 = dx * dx + dy * dy;
      const t = len2 > 0 ? Math.max(0, Math.min(1, ((ux - ax) * dx + (uy - ay) * dy) / len2)) : 0;
      const x = ax + t * dx;
      const y = ay + t * dy;
      const dist = Math.hypot(ux - x, uy - y);
      const along = this.cumulative[i] + t * Math.sqrt(len2);
      const cost =
        fromAlong == null
          ? dist
          : dist +
            BACKTRACK_COST * Math.max(0, fromAlong - along - BACKTRACK_FREE_M) +
            SKIP_AHEAD_COST * Math.max(0, along - fromAlong - SKIP_AHEAD_FREE_M);
      if (cost < bestCost) {
        bestCost = cost;
        best = { seg: i, x, y, dist, along };
      }
    }
    return best;
  }

  /** The local point `along` metres from the path's start. */
  private pointAt(along: number): [number, number] {
    const total = this.cumulative[this.cumulative.length - 1];
    const a = Math.max(0, Math.min(total, along));
    let lo = 0;
    let hi = this.cumulative.length - 1;
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      if (this.cumulative[mid] <= a) lo = mid;
      else hi = mid;
    }
    const segLen = this.cumulative[hi] - this.cumulative[lo];
    const t = segLen > 0 ? (a - this.cumulative[lo]) / segLen : 0;
    return [this.xy[lo][0] + t * (this.xy[hi][0] - this.xy[lo][0]), this.xy[lo][1] + t * (this.xy[hi][1] - this.xy[lo][1])];
  }

  private locate(ux: number, uy: number, visitedIds: string[]): Projection {
    const lastSegIndex = this.xy.length - 2;
    if (this.lastSeg < 0) {
      // A tour begins at the start of its path. A route that loops back past
      // its own start (Magdalen does) would otherwise snap to the far end, so
      // begin at the start — or just after the last stop already narrated,
      // if the tour is being resumed.
      let seed = 0;
      for (let i = this.route.length - 1; i >= 0; i--) {
        if (visitedIds.includes(this.route[i].id)) {
          seed = Math.min(this.stopIndex[i], lastSegIndex);
          break;
        }
      }
      this.lastSeg = seed;
    }
    const lo = Math.max(0, this.lastSeg - WINDOW_BACK);
    const hi = Math.min(lastSegIndex, this.lastSeg + WINDOW_FORWARD);
    const local = this.project(ux, uy, lo, hi, this.lastAlong ?? this.cumulative[this.lastSeg]);
    const global = this.project(ux, uy, 0, lastSegIndex);
    // Trust the window unless the walker is clearly much closer to somewhere else.
    if (global.seg !== local.seg && global.dist + 25 < local.dist) return global;
    return local;
  }

  update(user: Coordinates, visitedIds: string[]): RouteGuidance {
    const [ux, uy] = this.toLocal(user);
    const proj = this.locate(ux, uy, visitedIds);
    this.lastSeg = proj.seg;
    this.lastAlong = proj.along;
    const offPath = proj.dist > SNAP_RADIUS_M;

    // Head for the first stop that hasn't been narrated and hasn't been walked
    // past. A narrated stop is done for good, whatever the GPS does next.
    let targetIndex = this.route.length - 1;
    for (let i = this.lastTarget; i < this.route.length; i++) {
      const passed = this.stopIndex[i] < proj.seg - 3;
      const done = visitedIds.includes(this.route[i].id);
      if (!passed && !done) {
        targetIndex = i;
        break;
      }
    }
    this.lastTarget = targetIndex;

    // Within GPS error of the path: stand the walker on it, so direction comes
    // from the path's own shape. Genuinely off it: aim back at a point far
    // enough ahead that they rejoin at a gentle angle rather than head-on.
    const [ox, oy] = offPath ? [ux, uy] : [proj.x, proj.y];
    const lookahead = offPath ? Math.max(LOOKAHEAD_M, proj.dist) : LOOKAHEAD_M;
    const [lx, ly] = this.pointAt(proj.along + lookahead);
    const walkBearing = localBearing(lx - ox, ly - oy);

    const pathAhead: LocalOffset[] = [];
    if (offPath) pathAhead.push({ east: 0, north: 0 });
    const startAlong = offPath ? proj.along + lookahead : proj.along;
    const total = this.cumulative[this.cumulative.length - 1];
    for (let d = 0; d <= RIBBON_LENGTH_M && startAlong + d <= total; d += RIBBON_STEP_M) {
      const [px, py] = this.pointAt(startAlong + d);
      pathAhead.push({ east: px - ox, north: py - oy });
    }

    let upcomingTurn: UpcomingTurn | null = null;
    for (let i = proj.seg + 1; i < this.xy.length - 1; i++) {
      const ahead = this.cumulative[i] - proj.along;
      if (ahead > TURN_SCAN_WINDOW_M) break;
      const bIn = localBearing(this.xy[i][0] - this.xy[i - 1][0], this.xy[i][1] - this.xy[i - 1][1]);
      const bOut = localBearing(this.xy[i + 1][0] - this.xy[i][0], this.xy[i + 1][1] - this.xy[i][1]);
      const delta = angleDelta(bIn, bOut);
      if (Math.abs(delta) >= TURN_THRESHOLD_DEG) {
        upcomingTurn = { distanceMeters: Math.max(0, ahead), turnAngleDeg: delta };
        break;
      }
    }

    const targetAt = this.stopIndex[targetIndex];
    const along = Math.max(0, this.cumulative[targetAt] - proj.along);
    const distanceToTarget = along + (offPath ? proj.dist : 0);

    return {
      walkBearing,
      pathAhead,
      offPathMeters: proj.dist,
      offPath,
      upcomingTurn,
      targetIndex,
      distanceToTarget,
    };
  }
}

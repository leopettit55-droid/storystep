import * as Location from "expo-location";
import { Platform } from "react-native";
import type { Coordinates, Waypoint } from "../content";

const EARTH_RADIUS_M = 6371000;

export function distanceMeters(a: Coordinates, b: Coordinates): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_M * Math.asin(Math.min(1, Math.sqrt(h)));
}

const COMPASS_LABELS = [
  "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
  "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW",
];

/** Compass bearing in degrees (0-360) from `a` to `b`. */
export function bearingDegrees(a: Coordinates, b: Coordinates): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const toDeg = (rad: number) => (rad * 180) / Math.PI;
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const dLng = toRad(b.lng - a.lng);
  const y = Math.sin(dLng) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}

export function compassLabel(bearing: number): string {
  const index = Math.round(bearing / 22.5) % 16;
  return COMPASS_LABELS[index];
}

/** Fixes vaguer than this (Wi-Fi / cell-tower positions, often 50-150m out)
 * are ignored once a better fix has been seen — they're what makes the guide
 * suddenly swing towards a wall. */
const MAX_ACCEPTED_ACCURACY_M = 35;
/** Assumed walking-pace uncertainty growth for the smoother (m/s). */
const WALKER_SPEED_NOISE_MS = 2.5;
/** A fix implying faster than this since the last one is a GPS jump, not walking. */
const MAX_PLAUSIBLE_SPEED_MS = 8;
/** After this many rejected fixes in a row, accept anyway — the walker may
 * really have moved (e.g. left the tour and came back), and the guide should
 * recover rather than stay frozen on a stale position. */
const MAX_CONSECUTIVE_REJECTS = 4;

/**
 * Smooths raw GPS fixes into a steadier walking position: a 1-D Kalman
 * filter per axis, weighted by each fix's reported accuracy, with poor-accuracy
 * fixes and impossible jumps thrown away. Between tall college walls a phone's
 * raw fixes wander 5-20m side to side; smoothing them is what keeps the
 * penguin and ribbon on the path instead of zig-zagging into buildings.
 */
export class LocationSmoother {
  private lat = 0;
  private lng = 0;
  /** Position variance in m². Negative = no fix yet. */
  private variance = -1;
  private lastTime = 0;
  private rejects = 0;

  /** Returns the smoothed position, or null if this fix was rejected. */
  add(coords: Coordinates, accuracyM: number | null | undefined, timeMs: number): Coordinates | null {
    const acc = Math.max(3, accuracyM ?? 20);
    if (this.variance < 0) {
      this.lat = coords.lat;
      this.lng = coords.lng;
      this.variance = acc * acc;
      this.lastTime = timeMs;
      return { lat: this.lat, lng: this.lng };
    }

    const dt = Math.max(0, (timeMs - this.lastTime) / 1000);
    const current = { lat: this.lat, lng: this.lng };
    const jump = distanceMeters(current, coords);
    const tooVague = acc > MAX_ACCEPTED_ACCURACY_M && acc * acc > this.variance;
    const tooFast = jump - acc > MAX_PLAUSIBLE_SPEED_MS * Math.max(dt, 1);
    if ((tooVague || tooFast) && this.rejects < MAX_CONSECUTIVE_REJECTS) {
      this.rejects += 1;
      return null;
    }
    if (this.rejects >= MAX_CONSECUTIVE_REJECTS) {
      // Forced acceptance after a run of rejects: start afresh from this fix.
      this.rejects = 0;
      this.variance = -1;
      return this.add(coords, accuracyM, timeMs);
    }
    this.rejects = 0;

    this.variance += dt * WALKER_SPEED_NOISE_MS * WALKER_SPEED_NOISE_MS;
    const k = this.variance / (this.variance + acc * acc);
    this.lat += k * (coords.lat - this.lat);
    this.lng += k * (coords.lng - this.lng);
    this.variance = (1 - k) * this.variance;
    this.lastTime = timeMs;
    return { lat: this.lat, lng: this.lng };
  }
}

/** Beyond this distance from the nearest waypoint, treat the walker as off-route. */
const OFF_ROUTE_THRESHOLD_M = 120;
const POLL_INTERVAL_MS = 3000;
const MIN_DISTANCE_INTERVAL_M = 5;

interface ProximityCallbacks {
  onNearWaypoint: (waypoint: Waypoint) => void;
  onOffRoute: (isOffRoute: boolean) => void;
  onLocationUpdate: (coords: Coordinates) => void;
}

/**
 * Foreground high-accuracy polling used only while the active-tour screen is
 * open. It complements the OS-level geofences in geofenceManager.ts: tighter
 * update cadence smooths over GPS jitter between tall buildings, catches
 * waypoints the user walked past without a background Enter event firing,
 * and drives off-route detection (distance to the nearest waypoint on the
 * remaining route exceeds OFF_ROUTE_THRESHOLD_M).
 */
export class ProximityTracker {
  private subscription: Location.LocationSubscription | null = null;
  private webWatchId: number | null = null;
  private triggeredIds = new Set<string>();
  private smoother = new LocationSmoother();

  constructor(
    private route: Waypoint[],
    private callbacks: ProximityCallbacks
  ) {}

  async start(): Promise<void> {
    // expo-location's web shim has a watch-id mismatch bug: its
    // watchPositionImplAsync reassigns the id it emits update events under
    // to the browser's own native watchPosition id, while the callback
    // registry it's matched against is keyed by Expo's own separate id
    // counter. The two only coincide by chance for the very first watch
    // created anywhere on the page; every watch after that (e.g. this one,
    // started after GetToStartScreen already created its own) gets its
    // updates silently misrouted and the watch auto-torn-down on the very
    // first position event. Bypassing the wrapper and using the browser's
    // geolocation API directly sidesteps it entirely. Native platforms use
    // the real expo-location module, which doesn't have this bug.
    if (Platform.OS === "web") {
      this.webWatchId = navigator.geolocation.watchPosition(
        (position) =>
          this.handleRawFix(
            { lat: position.coords.latitude, lng: position.coords.longitude },
            position.coords.accuracy,
            position.timestamp
          ),
        (err) => console.warn("[ProximityTracker] web geolocation error:", err.message),
        { enableHighAccuracy: true, maximumAge: 1000, timeout: 15000 }
      );
      return;
    }

    this.subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: POLL_INTERVAL_MS,
        distanceInterval: MIN_DISTANCE_INTERVAL_M,
      },
      (location) =>
        this.handleRawFix(
          { lat: location.coords.latitude, lng: location.coords.longitude },
          location.coords.accuracy,
          location.timestamp
        )
    );
  }

  stop(): void {
    this.subscription?.remove();
    this.subscription = null;
    if (this.webWatchId != null) {
      navigator.geolocation.clearWatch(this.webWatchId);
      this.webWatchId = null;
    }
  }

  /** Call after a manual replay so the same waypoint can re-trigger if the user backtracks into it. */
  resetTriggeredWaypoint(waypointId: string): void {
    this.triggeredIds.delete(waypointId);
  }

  private handleRawFix(coords: Coordinates, accuracy: number | null, timestamp: number): void {
    const smoothed = this.smoother.add(coords, accuracy, timestamp || Date.now());
    if (smoothed) this.handleUpdate(smoothed);
  }

  private handleUpdate(coords: Coordinates): void {
    this.callbacks.onLocationUpdate(coords);

    let nearestDistance = Infinity;
    for (const waypoint of this.route) {
      const distance = distanceMeters(coords, waypoint.coordinates);
      nearestDistance = Math.min(nearestDistance, distance);

      if (
        distance <= waypoint.triggerRadiusMeters &&
        !this.triggeredIds.has(waypoint.id)
      ) {
        this.triggeredIds.add(waypoint.id);
        this.callbacks.onNearWaypoint(waypoint);
      }
    }

    this.callbacks.onOffRoute(nearestDistance > OFF_ROUTE_THRESHOLD_M);
  }
}

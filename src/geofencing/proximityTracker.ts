import * as Location from "expo-location";
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
  private triggeredIds = new Set<string>();

  constructor(
    private route: Waypoint[],
    private callbacks: ProximityCallbacks
  ) {}

  async start(): Promise<void> {
    this.subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: POLL_INTERVAL_MS,
        distanceInterval: MIN_DISTANCE_INTERVAL_M,
      },
      (location) =>
        this.handleUpdate({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        })
    );
  }

  stop(): void {
    this.subscription?.remove();
    this.subscription = null;
  }

  /** Call after a manual replay so the same waypoint can re-trigger if the user backtracks into it. */
  resetTriggeredWaypoint(waypointId: string): void {
    this.triggeredIds.delete(waypointId);
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

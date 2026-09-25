import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { Platform } from "react-native";
import type { Waypoint } from "../content";

/**
 * OS-level region monitoring. This is the reliability backbone: it can wake
 * the app (or fire a background task) even when StoryStep isn't in the
 * foreground, which is what lets narration keep triggering with the phone
 * locked. On its own it's not precise enough for dense central London blocks
 * (GPS drift off tall buildings), so `proximityTracker.ts` layers a tighter
 * foreground check on top whenever the active-tour screen is open.
 */
export const GEOFENCE_TASK_NAME = "storystep-waypoint-geofence";

type GeofenceEnterHandler = (waypointId: string) => void;

let enterHandler: GeofenceEnterHandler | null = null;

if (!TaskManager.isTaskDefined(GEOFENCE_TASK_NAME)) {
  TaskManager.defineTask(GEOFENCE_TASK_NAME, async ({ data, error }) => {
    if (error) {
      console.warn("[geofenceManager] task error:", error.message);
      return;
    }
    const payload = data as {
      eventType?: Location.GeofencingEventType;
      region?: Location.LocationRegion;
    } | null;

    if (
      payload?.eventType === Location.GeofencingEventType.Enter &&
      payload.region?.identifier
    ) {
      enterHandler?.(payload.region.identifier);
    }
  });
}

/** Register the callback invoked when a background geofence fires an Enter event. */
export function setGeofenceEnterHandler(handler: GeofenceEnterHandler | null): void {
  enterHandler = handler;
}

export async function requestLocationPermissions(): Promise<{
  foreground: boolean;
  background: boolean;
}> {
  const fg = await Location.requestForegroundPermissionsAsync();
  if (fg.status !== "granted") {
    return { foreground: false, background: false };
  }
  const bg = await Location.requestBackgroundPermissionsAsync();
  return { foreground: true, background: bg.status === "granted" };
}

/**
 * OS-level geofencing (and the TaskManager it depends on) has no web
 * implementation — expo-location's web shim throws rather than no-oping.
 * Skipping it on web still leaves narration working via the foreground
 * ProximityTracker polling in ActiveTourScreen; only the "keeps triggering
 * with the app backgrounded" behavior is native-only.
 */
export async function startWaypointGeofencing(waypoints: Waypoint[]): Promise<void> {
  if (Platform.OS === "web") return;

  const regions: Location.LocationRegion[] = waypoints.map((waypoint) => ({
    identifier: waypoint.id,
    latitude: waypoint.coordinates.lat,
    longitude: waypoint.coordinates.lng,
    radius: waypoint.triggerRadiusMeters,
    notifyOnEnter: true,
    notifyOnExit: false,
  }));

  if (regions.length === 0) return;
  await Location.startGeofencingAsync(GEOFENCE_TASK_NAME, regions);
}

export async function stopWaypointGeofencing(): Promise<void> {
  if (Platform.OS === "web") return;

  const isRegistered = await TaskManager.isTaskRegisteredAsync(GEOFENCE_TASK_NAME);
  if (isRegistered) {
    await Location.stopGeofencingAsync(GEOFENCE_TASK_NAME);
  }
}

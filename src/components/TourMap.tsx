import type { StyleProp, ViewStyle } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import type { Area, Coordinates, Waypoint } from "../content";

export interface TourMapProps {
  area: Area;
  currentWaypointIndex: number;
  visitedWaypointIds: string[];
  /** Smoothed walker position from the tour's ProximityTracker. */
  userLocation: Coordinates | null;
  /** Tapped a stop marker (reached or not — the screen decides what to do). */
  onWaypointPress?: (waypoint: Waypoint) => void;
  /** A line for the avatar to say in a speech bubble (web). `id` is when it was said (ms), so a repeat re-shows. */
  speech?: AvatarLine | null;
  /** Compass bearing for the avatar to face, e.g. towards the next stop (web). */
  faceBearing?: number | null;
  /** Open with a cinematic swoop down from high above the start (web). */
  flyIn?: boolean;
  /** A stop to dive down to at street level and slowly circle (web); null returns to the walker. */
  focusStop?: Waypoint | null;
  style?: StyleProp<ViewStyle>;
}

export interface AvatarLine {
  id: number;
  text: string;
  durationMs: number;
}

const STOP_COLOR = "#2F9BFF";
const VISITED_COLOR = "#9B6BDF";

/** Native tour map — plain react-native-maps. The Pokemon Go look is web-only (TourMap.web.tsx). */
export default function TourMap({
  area,
  visitedWaypointIds,
  userLocation,
  onWaypointPress,
  style,
}: TourMapProps) {
  const center = userLocation ?? area.route[0]?.coordinates ?? area.startingPoint;
  const line = area.path && area.path.length > 1 ? area.path : area.route.map((w) => w.coordinates);

  return (
    <MapView
      style={style}
      showsUserLocation
      followsUserLocation
      initialRegion={{
        latitude: center.lat,
        longitude: center.lng,
        latitudeDelta: 0.004,
        longitudeDelta: 0.004,
      }}
    >
      {area.route.map((waypoint) => {
        const visited = visitedWaypointIds.includes(waypoint.id);
        return (
          <Marker
            key={waypoint.id}
            coordinate={{ latitude: waypoint.coordinates.lat, longitude: waypoint.coordinates.lng }}
            title={waypoint.name}
            pinColor={visited ? VISITED_COLOR : STOP_COLOR}
            onPress={() => onWaypointPress?.(waypoint)}
          />
        );
      })}
      <Polyline
        coordinates={line.map((p) => ({ latitude: p.lat, longitude: p.lng }))}
        strokeColor={STOP_COLOR}
        strokeWidth={5}
      />
    </MapView>
  );
}

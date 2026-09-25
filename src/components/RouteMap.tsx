import type { StyleProp, ViewStyle } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";

export interface MapPin {
  id: string;
  lat: number;
  lng: number;
  color: string;
  title?: string;
}

export interface RouteMapRegion {
  lat: number;
  lng: number;
  latDelta: number;
  lngDelta: number;
}

export interface RouteMapProps {
  region: RouteMapRegion;
  pins: MapPin[];
  polyline?: { lat: number; lng: number }[];
  dashedPolyline?: boolean;
  style?: StyleProp<ViewStyle>;
}

/** Native map — the real react-native-maps rendering used on iOS/Android. */
export default function RouteMap({ region, pins, polyline, dashedPolyline, style }: RouteMapProps) {
  return (
    <MapView
      style={style}
      initialRegion={{
        latitude: region.lat,
        longitude: region.lng,
        latitudeDelta: region.latDelta,
        longitudeDelta: region.lngDelta,
      }}
    >
      {pins.map((pin) => (
        <Marker
          key={pin.id}
          coordinate={{ latitude: pin.lat, longitude: pin.lng }}
          title={pin.title}
          pinColor={pin.color}
        />
      ))}
      {polyline && polyline.length > 1 && (
        <Polyline
          coordinates={polyline.map((p) => ({ latitude: p.lat, longitude: p.lng }))}
          strokeColor="#4F8CFF"
          strokeWidth={dashedPolyline ? 3 : 4}
          lineDashPattern={dashedPolyline ? [6, 6] : undefined}
        />
      )}
    </MapView>
  );
}

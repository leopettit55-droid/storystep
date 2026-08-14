import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { getAreaById } from "../content";
import { bearingDegrees, compassLabel, distanceMeters } from "../geofencing/proximityTracker";
import { requestLocationPermissions } from "../geofencing/geofenceManager";
import type { RootStackParamList } from "../navigation/types";
import { useTourStore } from "../state/tourStore";

type Nav = NativeStackNavigationProp<RootStackParamList, "GetToStart">;
type RouteProp = { params: { areaId: string } };

export default function GetToStartScreen() {
  const navigation = useNavigation<Nav>();
  const { params } = useRoute() as unknown as RouteProp;
  const area = getAreaById(params.areaId);
  const arrivedAtStart = useTourStore((s) => s.arrivedAtStart);

  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setPermissionDenied(true);
        return;
      }
      subscription = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.Balanced, timeInterval: 4000, distanceInterval: 5 },
        (loc) =>
          setCurrentLocation({
            lat: loc.coords.latitude,
            lng: loc.coords.longitude,
          })
      );
    })();

    return () => subscription?.remove();
  }, []);

  if (!area) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Area not found</Text>
      </SafeAreaView>
    );
  }

  const start = { lat: area.startingPoint.lat, lng: area.startingPoint.lng };
  const distance = currentLocation ? distanceMeters(currentLocation, start) : null;
  const bearing = currentLocation ? bearingDegrees(currentLocation, start) : null;

  const handleStartTour = async () => {
    setStarting(true);
    const { background } = await requestLocationPermissions();
    if (!background) {
      // MVP behaviour: proceed anyway using foreground-only tracking. Background
      // geofencing (narration continuing with the phone locked) won't work
      // until the user grants "Always" location — flagged for follow-up.
      console.warn(
        "[GetToStartScreen] background location not granted; narration will only trigger while the app is in the foreground"
      );
    }
    arrivedAtStart();
    setStarting(false);
    navigation.replace("ActiveTour", { areaId: area.id });
  };

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: start.lat,
          longitude: start.lng,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        <Marker
          coordinate={{ latitude: start.lat, longitude: start.lng }}
          title="Tour start"
          description={area.startingPoint.label}
          pinColor="#4F8CFF"
        />
        {currentLocation && (
          <>
            <Marker
              coordinate={{
                latitude: currentLocation.lat,
                longitude: currentLocation.lng,
              }}
              title="You"
              pinColor="#34C759"
            />
            <Polyline
              coordinates={[
                { latitude: currentLocation.lat, longitude: currentLocation.lng },
                { latitude: start.lat, longitude: start.lng },
              ]}
              strokeColor="#4F8CFF"
              strokeWidth={3}
              lineDashPattern={[6, 6]}
            />
          </>
        )}
      </MapView>

      <View style={styles.sheet}>
        <Text style={styles.title}>Get to the start</Text>
        <Text style={styles.destination}>{area.startingPoint.label}</Text>

        {permissionDenied && (
          <Text style={styles.warning}>
            Location permission was denied — enable it in Settings to see live
            directions.
          </Text>
        )}

        {!permissionDenied && currentLocation === null && (
          <View style={styles.loadingRow}>
            <ActivityIndicator color="#4F8CFF" />
            <Text style={styles.loadingText}>Finding you…</Text>
          </View>
        )}

        {distance !== null && bearing !== null && (
          <Text style={styles.directions}>
            About {Math.round(distance)}m to go, heading {compassLabel(bearing)}.
          </Text>
        )}

        <Pressable
          style={[styles.cta, starting && styles.ctaDisabled]}
          disabled={starting}
          onPress={handleStartTour}
        >
          <Text style={styles.ctaText}>
            {starting ? "Starting…" : "I've arrived — start the tour"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F1115" },
  map: { flex: 1 },
  sheet: {
    padding: 20,
    backgroundColor: "#1A1D24",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  title: { fontSize: 22, fontWeight: "700", color: "#fff" },
  destination: { fontSize: 14, color: "#9AA1AC", marginTop: 4 },
  warning: { fontSize: 13, color: "#FF9F4F", marginTop: 12 },
  loadingRow: { flexDirection: "row", alignItems: "center", marginTop: 12, gap: 8 },
  loadingText: { color: "#9AA1AC", fontSize: 13 },
  directions: { fontSize: 15, color: "#C4C9D2", marginTop: 12 },
  cta: {
    marginTop: 16,
    backgroundColor: "#4F8CFF",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  ctaDisabled: { opacity: 0.6 },
  ctaText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});

import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { getAreaById } from "../content";
import type { RootStackParamList } from "../navigation/types";
import { useTourStore } from "../state/tourStore";

type Nav = NativeStackNavigationProp<RootStackParamList, "TourPreview">;
type RouteProp = { params: { areaId: string } };

export default function TourPreviewScreen() {
  const navigation = useNavigation<Nav>();
  const { params } = useRoute() as unknown as RouteProp;
  const area = getAreaById(params.areaId);
  const selectArea = useTourStore((s) => s.selectArea);

  if (!area) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Area not found</Text>
      </SafeAreaView>
    );
  }

  const routeCoords = area.route.map((w) => ({
    latitude: w.coordinates.lat,
    longitude: w.coordinates.lng,
  }));

  const handleGetToStart = () => {
    selectArea(area.id);
    navigation.navigate("GetToStart", { areaId: area.id });
  };

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: area.startingPoint.lat,
          longitude: area.startingPoint.lng,
          latitudeDelta: 0.012,
          longitudeDelta: 0.012,
        }}
      >
        <Marker
          coordinate={{
            latitude: area.startingPoint.lat,
            longitude: area.startingPoint.lng,
          }}
          title="Start"
          description={area.startingPoint.label}
          pinColor="#4F8CFF"
        />
        {area.route.map((w) => (
          <Marker
            key={w.id}
            coordinate={{
              latitude: w.coordinates.lat,
              longitude: w.coordinates.lng,
            }}
            title={`${w.order}. ${w.name}`}
          />
        ))}
        <Polyline
          coordinates={routeCoords}
          strokeColor="#4F8CFF"
          strokeWidth={4}
        />
      </MapView>

      <View style={styles.sheet}>
        <Text style={styles.title}>{area.name}</Text>
        <Text style={styles.meta}>
          {area.estimatedDurationMin} min · {area.estimatedDistanceKm} km ·{" "}
          {area.route.length} stops
        </Text>
        <Text style={styles.startLabel}>
          Starts at {area.startingPoint.label}
        </Text>
        <Pressable style={styles.cta} onPress={handleGetToStart}>
          <Text style={styles.ctaText}>Get me to the start</Text>
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
  title: { fontSize: 24, fontWeight: "700", color: "#fff" },
  meta: { fontSize: 14, color: "#9AA1AC", marginTop: 6 },
  startLabel: { fontSize: 13, color: "#7B8798", marginTop: 4 },
  cta: {
    marginTop: 16,
    backgroundColor: "#4F8CFF",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  ctaText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});

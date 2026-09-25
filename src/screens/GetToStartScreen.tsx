import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Linking, Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";
import BackButton from "../components/BackButton";
import PressScale from "../components/PressScale";
import RouteMap from "../components/RouteMap";
import { getAreaById } from "../content";
import { bearingDegrees, compassLabel, distanceMeters } from "../geofencing/proximityTracker";
import { requestLocationPermissions } from "../geofencing/geofenceManager";
import { tapMedium } from "../haptics";
import { useLanguage } from "../i18n/LanguageContext";
import type { RootStackParamList } from "../navigation/types";
import { useTourStore } from "../state/tourStore";
import { useTheme } from "../ThemeContext";
import type { ThemeColors } from "../theme";

type Nav = NativeStackNavigationProp<RootStackParamList, "GetToStart">;
type RouteProp = { params: { areaId: string } };

export default function GetToStartScreen() {
  const navigation = useNavigation<Nav>();
  const { params } = useRoute() as unknown as RouteProp;
  const area = getAreaById(params.areaId);
  const arrivedAtStart = useTourStore((s) => s.arrivedAtStart);
  const { t } = useLanguage();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;
    let webWatchId: number | null = null;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setPermissionDenied(true);
        return;
      }

      const handleLocation = (lat: number, lng: number) => setCurrentLocation({ lat, lng });

      // expo-location's web shim has a watch-id routing bug — see the
      // matching comment in proximityTracker.ts — so live position updates
      // on web go through the browser's geolocation API directly instead.
      if (Platform.OS === "web") {
        webWatchId = navigator.geolocation.watchPosition(
          (pos) => handleLocation(pos.coords.latitude, pos.coords.longitude),
          (err) => console.warn("[GetToStartScreen] web geolocation error:", err.message),
          { enableHighAccuracy: true, maximumAge: 1000, timeout: 15000 }
        );
        return;
      }

      subscription = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.Balanced, timeInterval: 4000, distanceInterval: 5 },
        (loc) => handleLocation(loc.coords.latitude, loc.coords.longitude)
      );
    })();

    return () => {
      subscription?.remove();
      if (webWatchId != null) navigator.geolocation.clearWatch(webWatchId);
    };
  }, []);

  if (!area) {
    return (
      <SafeAreaView style={styles.container}>
        <BackButton variant="inline" style={styles.notFoundBack} />
        <Text style={styles.title}>{t("getToStart.areaNotFound")}</Text>
      </SafeAreaView>
    );
  }

  const start = { lat: area.startingPoint.lat, lng: area.startingPoint.lng };
  const distance = currentLocation ? distanceMeters(currentLocation, start) : null;
  const bearing = currentLocation ? bearingDegrees(currentLocation, start) : null;

  const handleOpenMaps = () => {
    tapMedium();
    const url = `https://www.google.com/maps/dir/?api=1&destination=${start.lat},${start.lng}&travelmode=walking`;
    Linking.openURL(url);
  };

  const handleStartTour = async () => {
    tapMedium();
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
      <BackButton />
      <RouteMap
        style={styles.map}
        region={{ lat: start.lat, lng: start.lng, latDelta: 0.02, lngDelta: 0.02 }}
        pins={[
          { id: "start", lat: start.lat, lng: start.lng, color: colors.primary, title: t("common.start") },
          ...(currentLocation
            ? [{ id: "you", lat: currentLocation.lat, lng: currentLocation.lng, color: colors.success, title: t("common.you") }]
            : []),
        ]}
        polyline={currentLocation ? [currentLocation, start] : undefined}
        dashedPolyline
      />

      <View style={styles.sheet}>
        <Text style={styles.title}>{t("getToStart.title")}</Text>
        <Text style={styles.destination}>{area.startingPoint.label}</Text>

        {permissionDenied && <Text style={styles.warning}>{t("getToStart.permissionDenied")}</Text>}

        {!permissionDenied && currentLocation === null && (
          <View style={styles.loadingRow}>
            <ActivityIndicator color={colors.primary} />
            <Text style={styles.loadingText}>{t("getToStart.findingYou")}</Text>
          </View>
        )}

        {distance !== null && bearing !== null && (
          <Text style={styles.directions}>
            {t("getToStart.directions", { distance: Math.round(distance), bearing: compassLabel(bearing) })}
          </Text>
        )}

        <PressScale style={styles.mapsButton} scaleTo={0.96} onPress={handleOpenMaps}>
          <Ionicons name="navigate" size={18} color={colors.onPrimary} />
          <Text style={styles.mapsButtonText}>{t("getToStart.openInMaps")}</Text>
        </PressScale>

        <PressScale
          style={[styles.cta, starting && styles.ctaDisabled]}
          scaleTo={0.96}
          disabled={starting}
          onPress={handleStartTour}
        >
          <Text style={styles.ctaText}>{starting ? t("getToStart.starting") : t("getToStart.startButton")}</Text>
        </PressScale>
      </View>
    </SafeAreaView>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  notFoundBack: { margin: 16 },
  map: { flex: 1 },
  sheet: {
    padding: 20,
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderColor: colors.border,
  },
  title: { fontSize: 22, fontWeight: "700", color: colors.text },
  destination: { fontSize: 14, color: colors.textMid, marginTop: 4 },
  warning: { fontSize: 13, color: colors.warnText, marginTop: 12 },
  loadingRow: { flexDirection: "row", alignItems: "center", marginTop: 12, gap: 8 },
  loadingText: { color: colors.textMid, fontSize: 13 },
  directions: { fontSize: 15, color: colors.textMid, marginTop: 12 },
  mapsButton: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
  },
  mapsButtonText: { color: colors.onPrimary, fontSize: 16, fontWeight: "700" },
  cta: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  ctaDisabled: { opacity: 0.6 },
  ctaText: { color: colors.textMid, fontSize: 15, fontWeight: "600" },
  });
}

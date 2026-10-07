import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import { Map as MapLibreMap, NavigationControl } from "maplibre-gl";
import { useEffect, useMemo, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import BackButton from "../components/BackButton";
import Skeleton from "../components/Skeleton";
import { getFoodStepCity, getFoodStepCuisine, type FoodStepCity } from "../content/foodStep";
import { FOODSTEP_GREEN } from "../content/sisterProducts";
import { useLanguage } from "../i18n/LanguageContext";
import { EXPLORE_MAP_CREDIT, exploreMapStyle } from "../map/exploreMapStyle";
import type { MainTabParamList, TabScreenNav } from "../navigation/types";
import { useTheme } from "../ThemeContext";
import type { ThemeColors } from "../theme";

type Nav = TabScreenNav<"FoodStepMap">;

// Close enough for the 3D buildings (they appear from zoom 14), tilted like
// StoryStep's Explore Map.
function cameraFor(city: FoodStepCity) {
  return { center: city.center, zoom: 15.5, pitch: 60, bearing: -20 };
}

/** A FoodStep cuisine in a city: StoryStep's 3D explore map, centred on the
 * city's food scene. Restaurants aren't on it yet. */
export default function FoodStepMapScreen() {
  const navigation = useNavigation<Nav>();
  const { params } = useRoute<RouteProp<MainTabParamList, "FoodStepMap">>();
  const { t } = useLanguage();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [mapLoadIssue, setMapLoadIssue] = useState(false);

  const city = getFoodStepCity(params.cityId);
  const cuisine = city && getFoodStepCuisine(city, params.cuisineId);

  // Initialize the map once; it stays mounted while people move between cities.
  useEffect(() => {
    if (!containerRef.current || mapRef.current || !city) return;
    let cancelled = false;
    const map = new MapLibreMap({
      container: containerRef.current,
      style: exploreMapStyle(),
      ...cameraFor(city),
      attributionControl: false,
      maxPitch: 75,
    });
    mapRef.current = map;
    // Zoom buttons and a compass that also shows the tilt; drag it to rotate.
    map.addControl(new NavigationControl({ visualizePitch: true }), "top-right");
    map.on("error", (e) => {
      // eslint-disable-next-line no-console
      console.error("FoodStep map error:", e.error?.message ?? e.error ?? e);
    });

    let loaded = false;
    map.on("load", () => {
      loaded = true;
      setMapReady(true);
      setMapLoadIssue(false);
    });
    setTimeout(() => {
      if (!cancelled && !loaded) setMapLoadIssue(true);
    }, 10000);

    return () => {
      cancelled = true;
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!city]);

  // Coming back for another city flies over to it.
  useEffect(() => {
    if (city) mapRef.current?.flyTo({ ...cameraFor(city), duration: 1400 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city?.id]);

  const toCities = () => navigation.navigate("FoodStep");
  const toCuisines = () => city && navigation.navigate("FoodStepCity", { cityId: city.id });

  return (
    <View style={styles.container}>
      <View style={styles.overlayTop}>
        <View style={styles.crumbRow}>
          <BackButton variant="inline" onPress={city ? toCuisines : toCities} />
          {/* FoodStep › Manchester › Mexican: each step back is a tap away. */}
          <View style={styles.crumbs}>
            <Pressable onPress={toCities}>
              <Text style={styles.crumbLink}>{t("foodStep.title")}</Text>
            </Pressable>
            {city && (
              <>
                <Text style={styles.crumbSep}>›</Text>
                <Pressable onPress={toCuisines}>
                  <Text style={styles.crumbLink}>{city.name}</Text>
                </Pressable>
              </>
            )}
            {cuisine && (
              <>
                <Text style={styles.crumbSep}>›</Text>
                <Text style={styles.crumbCurrent}>{cuisine.name}</Text>
              </>
            )}
          </View>
        </View>
        <Text style={styles.title}>
          {city && cuisine
            ? t("foodStep.mapTitle", { cuisine: cuisine.name, city: city.name })
            : t("foodStep.cityNotFound")}
        </Text>
        {city && <Text style={styles.subtitle}>{t("foodStep.mapSubtitle")}</Text>}
      </View>

      <View style={styles.mapWrap}>
        <div ref={containerRef} style={{ position: "absolute", inset: 0 }} />

        {city && !mapReady && !mapLoadIssue && (
          <View style={styles.mapStatusOverlay} pointerEvents="none">
            <Skeleton style={StyleSheet.absoluteFill} borderRadius={0} />
          </View>
        )}

        {mapLoadIssue && (
          <View style={styles.mapStatusOverlay}>
            <Text style={styles.mapIssueTitle}>{t("map.loadIssueTitle")}</Text>
            <Text style={styles.mapIssueBody}>{t("map.loadIssueBody")}</Text>
          </View>
        )}

        <Text style={styles.attribution} pointerEvents="none">
          {EXPLORE_MAP_CREDIT}
        </Text>
      </View>
    </View>
  );
}

// Matches ExploreMapScreen's chrome, in FoodStep green.
function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    mapWrap: { flex: 1, position: "relative" },
    overlayTop: {
      padding: 20,
      paddingBottom: 12,
      gap: 8,
      backgroundColor: colors.background,
      borderBottomWidth: 1,
      borderColor: colors.border,
      zIndex: 1,
    },
    crumbRow: { flexDirection: "row", alignItems: "center", gap: 12 },
    crumbs: { flexDirection: "row", alignItems: "center", flexWrap: "wrap", gap: 6, flexShrink: 1 },
    crumbLink: { fontSize: 13, fontWeight: "700", color: FOODSTEP_GREEN },
    crumbSep: { fontSize: 13, color: colors.textDim },
    crumbCurrent: { fontSize: 13, fontWeight: "700", color: colors.textMid },
    title: { fontSize: 22, fontWeight: "800", color: colors.text },
    subtitle: { fontSize: 12.5, color: colors.textDim },
    mapStatusOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.mapStreet,
      gap: 6,
      padding: 24,
    },
    mapIssueTitle: { fontSize: 15, fontWeight: "700", color: colors.text, textAlign: "center" },
    mapIssueBody: { fontSize: 12.5, color: colors.textMid, textAlign: "center" },
    attribution: {
      position: "absolute",
      bottom: 6,
      right: 10,
      fontSize: 9.5,
      color: "rgba(255,255,255,0.75)",
      textShadowColor: "rgba(0,0,0,0.6)",
      textShadowRadius: 3,
    },
  });
}

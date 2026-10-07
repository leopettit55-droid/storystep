import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LngLatBounds, Map as MapLibreMap, Marker, NavigationControl } from "maplibre-gl";
import { useEffect, useMemo, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import BackButton from "../components/BackButton";
import FoodStepGuide from "../components/FoodStepGuide";
import Skeleton from "../components/Skeleton";
import { getFoodStepCity, getFoodStepCuisine, type FoodStepCity } from "../content/foodStep";
import { restaurantsFor, type FoodStepRestaurant } from "../content/foodStepRestaurants";
import { FOODSTEP_GREEN } from "../content/sisterProducts";
import { useLanguage } from "../i18n/LanguageContext";
import { EXPLORE_MAP_CREDIT, exploreMapStyle } from "../map/exploreMapStyle";
import type { MainTabParamList, TabScreenNav } from "../navigation/types";
import { useTheme } from "../ThemeContext";
import { DESKTOP_BREAKPOINT, type ThemeColors } from "../theme";

type Nav = TabScreenNav<"FoodStepMap">;

// Close enough for the 3D buildings (they appear from zoom 14), tilted like
// StoryStep's Explore Map.
function cameraFor(city: FoodStepCity) {
  return { center: city.center, zoom: 15.5, pitch: 60, bearing: -20 };
}

/** A restaurant's pin: a FoodStep-green dot. MapLibre owns the outer
 * element's transform (to place it), so the dot inside is what grows when
 * it's picked. */
function makePin(restaurant: FoodStepRestaurant): { root: HTMLDivElement; dot: HTMLDivElement } {
  const root = document.createElement("div");
  root.style.cursor = "pointer";
  root.style.padding = "6px";
  root.title = restaurant.name;
  root.setAttribute("role", "button");
  root.setAttribute("aria-label", restaurant.name);
  const dot = document.createElement("div");
  dot.style.width = "18px";
  dot.style.height = "18px";
  dot.style.borderRadius = "50%";
  dot.style.background = FOODSTEP_GREEN;
  dot.style.border = "3px solid #FFFFFF";
  dot.style.boxShadow = "0 2px 6px rgba(0,0,0,0.45)";
  dot.style.transition = "transform 150ms ease";
  root.appendChild(dot);
  return { root, dot };
}

/** A FoodStep cuisine in a city: StoryStep's 3D explore map with a pin for
 * each restaurant (only Manchester's Mexican so far), and Scout to welcome the
 * visitor and answer questions. */
export default function FoodStepMapScreen() {
  const navigation = useNavigation<Nav>();
  const { params } = useRoute<RouteProp<MainTabParamList, "FoodStepMap">>();
  const { t } = useLanguage();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const compact = useWindowDimensions().width < DESKTOP_BREAKPOINT;
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [mapLoadIssue, setMapLoadIssue] = useState(false);

  const city = getFoodStepCity(params.cityId);
  const cuisine = city && getFoodStepCuisine(city, params.cuisineId);
  const restaurants = useMemo(
    () => (city && cuisine ? restaurantsFor(city.id, cuisine.id) : []),
    [city, cuisine]
  );
  const [selected, setSelected] = useState<FoodStepRestaurant | null>(null);
  const dotsRef = useRef<Record<string, HTMLDivElement>>({});

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

  // Frame the restaurants (leaving room for Scout at the bottom), or the
  // city's food area if there aren't any yet; again for each city or cuisine.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !city || !mapReady) return;
    if (restaurants.length === 0) {
      map.flyTo({ ...cameraFor(city), duration: 1400 });
      return;
    }
    // Fitted flat, then tilted: MapLibre's own fit allows for the tilt and
    // zooms right out to keep the far edge in view. Padding keeps the pins
    // clear of the header and of Scout.
    const padding = { top: 40, left: 40, right: 60, bottom: compact ? 200 : 170 };
    const { width, height } = map.getContainer().getBoundingClientRect();
    const x = (lng: number) => (lng + 180) / 360;
    const y = (lat: number) => (1 - Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360)) / Math.PI) / 2;
    const xs = restaurants.map((r) => x(r.lng));
    const ys = restaurants.map((r) => y(r.lat));
    const spanX = Math.max(...xs) - Math.min(...xs) || 1e-6;
    const spanY = Math.max(...ys) - Math.min(...ys) || 1e-6;
    const fitZoom = Math.log2(
      Math.min(
        (width - padding.left - padding.right) / (spanX * 512),
        (height - padding.top - padding.bottom) / (spanY * 512)
      )
    );
    const bounds = new LngLatBounds();
    restaurants.forEach((r) => bounds.extend([r.lng, r.lat]));
    map.flyTo({
      center: bounds.getCenter(),
      zoom: Math.min(fitZoom, 16.5),
      pitch: 55,
      bearing: -20,
      padding,
      duration: 1400,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city?.id, cuisine?.id, mapReady]);

  // The restaurants' pins; tapping one opens its details.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;
    setSelected(null);
    const markers = restaurants.map((r) => {
      const { root, dot } = makePin(r);
      root.addEventListener("click", (e) => {
        e.stopPropagation();
        setSelected(r);
      });
      dotsRef.current[r.id] = dot;
      return new Marker({ element: root }).setLngLat([r.lng, r.lat]).addTo(map);
    });
    return () => {
      markers.forEach((m) => m.remove());
      dotsRef.current = {};
    };
  }, [restaurants, mapReady]);

  // The picked restaurant's pin stands out.
  useEffect(() => {
    Object.entries(dotsRef.current).forEach(([id, dot]) => {
      dot.style.transform = selected?.id === id ? "scale(1.45)" : "scale(1)";
    });
  }, [selected]);

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
        {city && (
          <Text style={styles.subtitle}>
            {t(restaurants.length ? "foodStep.mapSubtitlePins" : "foodStep.mapSubtitle")}
          </Text>
        )}
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

        {city && cuisine && mapReady && <FoodStepGuide city={city} cuisine={cuisine} compact={compact} />}

        {/* The picked restaurant, over the top of the map; the rest of the map still moves. */}
        {selected && (
          <View style={[styles.place, compact && styles.placeCompact]}>
            <View style={styles.placeHeader}>
              <Text style={styles.placeName}>{selected.name}</Text>
              <Pressable onPress={() => setSelected(null)} hitSlop={10} aria-label={t("askGuide.close")}>
                <Ionicons name="close" size={20} color={colors.textMid} />
              </Pressable>
            </View>
            <Text style={styles.placeStyle}>
              {selected.style}
              {selected.rating
                ? ` · ★ ${selected.rating.score}/${selected.rating.outOf} (${selected.rating.source})`
                : ""}
            </Text>
            <View style={styles.placeAddressRow}>
              <Ionicons name="location" size={14} color={FOODSTEP_GREEN} />
              <Text style={styles.placeAddress}>{selected.address}</Text>
            </View>
            <Text style={styles.placeDescription}>{selected.description}</Text>
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
    place: {
      position: "absolute",
      top: 12,
      left: 12,
      width: 330,
      backgroundColor: colors.background,
      borderRadius: 16,
      borderLeftWidth: 5,
      borderLeftColor: FOODSTEP_GREEN,
      padding: 14,
      gap: 6,
      shadowColor: "#000",
      shadowOpacity: 0.25,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 4 },
    },
    // Leaves room for the zoom buttons on the right.
    placeCompact: { width: undefined, right: 60 },
    placeHeader: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 10 },
    placeName: { flex: 1, fontSize: 18, fontWeight: "800", color: colors.text },
    placeStyle: { fontSize: 12.5, fontWeight: "700", color: FOODSTEP_GREEN },
    placeAddressRow: { flexDirection: "row", alignItems: "center", gap: 4 },
    placeAddress: { flex: 1, fontSize: 12.5, color: colors.textMid },
    placeDescription: { fontSize: 13.5, lineHeight: 19, color: colors.text },
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

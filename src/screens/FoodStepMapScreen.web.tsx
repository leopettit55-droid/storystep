import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
  LngLatBounds,
  Map as MapLibreMap,
  Marker,
  NavigationControl,
  type ExpressionSpecification,
  type GeoJSONSource,
} from "maplibre-gl";
import { useEffect, useMemo, useRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import AskGuideModal from "../components/AskGuideModal";
import BackButton from "../components/BackButton";
import FoodStepGuide from "../components/FoodStepGuide";
import Skeleton from "../components/Skeleton";
import { getFoodStepCity, getFoodStepCuisine, type FoodStepCity } from "../content/foodStep";
import { restaurantsFor, type FoodStepRestaurant } from "../content/foodStepRestaurants";
import { zoneContains, zonesFor, type FoodStepZone } from "../content/foodStepZones";
import { FOODSTEP_GREEN } from "../content/sisterProducts";
import { useLanguage } from "../i18n/LanguageContext";
import { EXPLORE_MAP_CREDIT, exploreMapStyle } from "../map/exploreMapStyle";
import { distanceKm, makeUserMarker, useUserLocation, type UserLocation } from "../map/userLocation.web";
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

const ZONE_SOURCE = "foodstep-zones";

/** How the zones are drawn. Faint everywhere, fading out as you zoom in to
 * street level; the picked one (if any) gets a solid green outline at every zoom. */
function zonePaint(zoneId: string | null) {
  const picked: ExpressionSpecification = ["==", ["get", "id"], zoneId ?? ""];
  const byZoom = (far: number, near: number, street: number, pickedValue: number): ExpressionSpecification => [
    "interpolate", ["linear"], ["zoom"],
    13, ["case", picked, pickedValue, far],
    15.5, ["case", picked, pickedValue, near],
    17, ["case", picked, pickedValue, street],
  ];
  return {
    fill: { "fill-opacity": byZoom(0.1, 0.06, 0, 0.16) },
    line: {
      "line-color": ["case", picked, FOODSTEP_GREEN, "#CFF5D6"] as ExpressionSpecification,
      "line-width": ["case", picked, 3, 1.2] as ExpressionSpecification,
      "line-opacity": byZoom(0.75, 0.45, 0, 0.95),
    },
    label: { "text-opacity": byZoom(1, 0.85, 0, 0.85) },
  };
}

/** Where "you" are in demo mode (?demo=1), for trying the GPS features from
 * outside the city: Piccadilly Gardens (inside a zone, unlike Albert Square
 * just west of it), or the city's food area elsewhere. */
function demoLocationFor(city: FoodStepCity): UserLocation {
  if (city.id === "manchester") return { latitude: 53.481, longitude: -2.237, heading: 0 };
  return { latitude: city.center[1], longitude: city.center[0], heading: 0 };
}

/** "350 m" up to a kilometre, then "1.2 km". */
function formatDistance(km: number, t: ReturnType<typeof useLanguage>["t"]): string {
  return km < 1
    ? t("foodStep.distanceM", { m: Math.max(10, Math.round((km * 1000) / 10) * 10) })
    : t("foodStep.distanceKm", { km: km.toFixed(1) });
}

/** Points to frame: a zone's outline, or the restaurants. */
function pointsOf(zone: FoodStepZone | null, restaurants: FoodStepRestaurant[]): [number, number][] {
  return zone ? zone.outline : restaurants.map((r) => [r.lng, r.lat]);
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
  /** The restaurant whose card's "Ask Scout" was tapped. */
  const [askingAbout, setAskingAbout] = useState<FoodStepRestaurant | null>(null);
  const dotsRef = useRef<Record<string, HTMLDivElement>>({});
  // Neighbourhoods: always faintly on the map; picking one shows only its restaurants.
  const zones = useMemo(() => (city ? zonesFor(city.id) : []), [city]);
  const [zoneId, setZoneId] = useState<string | null>(null);
  const zone = zones.find((z) => z.id === zoneId) ?? null;
  const shown = useMemo(
    () => (zone ? restaurants.filter((r) => zoneContains(zone, r.lng, r.lat)) : restaurants),
    [zone, restaurants]
  );
  const zoneName = (id: string) => zones.find((z) => z.id === id)?.name;

  // Where the visitor is: live GPS, or a fixed spot in demo mode (?demo=1).
  const demo = params.demo === "1";
  const gps = useUserLocation(!demo);
  const here = demo && city ? demoLocationFor(city) : gps.location;
  const hereZone = here ? zones.find((z) => zoneContains(z, here.longitude, here.latitude)) : undefined;
  const userMarkerRef = useRef<{ marker: Marker; arrow: HTMLDivElement } | null>(null);

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

  // Frame the picked zone, or the restaurants (leaving room for Scout at the
  // bottom), or the city's food area if there aren't any; again for each
  // city, cuisine or zone.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !city || !mapReady) return;
    const points = pointsOf(zone, restaurants);
    if (points.length === 0) {
      map.flyTo({ ...cameraFor(city), duration: 1400 });
      return;
    }
    // Fitted flat, then tilted: MapLibre's own fit allows for the tilt and
    // zooms right out to keep the far edge in view. Padding keeps the pins
    // clear of the header and of Scout.
    const padding = { top: 40, left: 40, right: 60, bottom: compact ? 250 : 290 };
    const { width, height } = map.getContainer().getBoundingClientRect();
    const x = (lng: number) => (lng + 180) / 360;
    const y = (lat: number) => (1 - Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360)) / Math.PI) / 2;
    const xs = points.map(([lng]) => x(lng));
    const ys = points.map(([, lat]) => y(lat));
    const spanX = Math.max(...xs) - Math.min(...xs) || 1e-6;
    const spanY = Math.max(...ys) - Math.min(...ys) || 1e-6;
    const fitZoom = Math.log2(
      Math.min(
        (width - padding.left - padding.right) / (spanX * 512),
        (height - padding.top - padding.bottom) / (spanY * 512)
      )
    );
    const bounds = new LngLatBounds();
    points.forEach((p) => bounds.extend(p));
    map.flyTo({
      center: bounds.getCenter(),
      zoom: Math.min(fitZoom, 16.5),
      pitch: 55,
      bearing: -20,
      padding,
      duration: 1400,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city?.id, cuisine?.id, zoneId, mapReady]);

  // A new city or cuisine starts with every zone showing.
  useEffect(() => setZoneId(null), [city?.id, cuisine?.id]);

  // The zones' outlines and names, under the 3D buildings so they don't hide them.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;
    const data: GeoJSON.FeatureCollection = {
      type: "FeatureCollection",
      features: zones.map((z) => ({
        type: "Feature",
        properties: { id: z.id, name: z.name },
        geometry: { type: "Polygon", coordinates: [[...z.outline, z.outline[0]]] },
      })),
    };
    const source = map.getSource<GeoJSONSource>(ZONE_SOURCE);
    if (source) {
      source.setData(data);
      return;
    }
    map.addSource(ZONE_SOURCE, { type: "geojson", data });
    const paint = zonePaint(null);
    map.addLayer(
      { id: "foodstep-zones-fill", type: "fill", source: ZONE_SOURCE, paint: { "fill-color": FOODSTEP_GREEN, ...paint.fill } },
      "storystep-3d-buildings"
    );
    map.addLayer({ id: "foodstep-zones-line", type: "line", source: ZONE_SOURCE, layout: { "line-join": "round" }, paint: paint.line });
    map.addLayer({
      id: "foodstep-zones-label",
      type: "symbol",
      source: ZONE_SOURCE,
      // Names are for the wider view; at street level the map's own labels are enough.
      maxzoom: 16,
      layout: {
        "text-field": ["get", "name"],
        "text-font": ["Noto Sans Regular"],
        "text-size": 12,
        "text-letter-spacing": 0.04,
      },
      paint: { "text-color": "#DDF8E2", "text-halo-color": "rgba(10,40,20,0.8)", "text-halo-width": 1.4, ...paint.label },
    });
  }, [zones, mapReady]);

  // The picked zone stands out.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady || !map.getLayer("foodstep-zones-fill")) return;
    type PaintName = Parameters<MapLibreMap["setPaintProperty"]>[1];
    type PaintValue = Parameters<MapLibreMap["setPaintProperty"]>[2];
    const apply = (layer: string, props: Record<string, PaintValue>) =>
      Object.entries(props).forEach(([name, value]) => map.setPaintProperty(layer, name as PaintName, value));
    const paint = zonePaint(zoneId);
    apply("foodstep-zones-fill", paint.fill);
    apply("foodstep-zones-line", paint.line);
    apply("foodstep-zones-label", paint.label);
  }, [zoneId, mapReady, zones]);

  // The restaurants' pins (only the picked zone's, if one is); tapping one opens its details.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;
    setSelected((s) => (s && shown.some((r) => r.id === s.id) ? s : null));
    const markers = shown.map((r) => {
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
  }, [shown, mapReady]);

  // The picked restaurant's pin stands out.
  useEffect(() => {
    Object.entries(dotsRef.current).forEach(([id, dot]) => {
      dot.style.transform = selected?.id === id ? "scale(1.45)" : "scale(1)";
    });
  }, [selected, shown]);

  // "You are here": a blue dot (with an arrow once you're walking) that follows the GPS.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady || !here) return;
    if (!userMarkerRef.current) {
      const { root, arrow } = makeUserMarker();
      const marker = new Marker({ element: root, rotationAlignment: "map", pitchAlignment: "viewport" }).setLngLat([here.longitude, here.latitude]).addTo(map);
      userMarkerRef.current = { marker, arrow };
    }
    const { marker, arrow } = userMarkerRef.current;
    marker.setLngLat([here.longitude, here.latitude]);
    marker.setRotation(here.heading ?? 0);
    arrow.style.display = here.heading === undefined ? "none" : "block";
  }, [here?.latitude, here?.longitude, here?.heading, mapReady]);

  useEffect(
    () => () => {
      userMarkerRef.current?.marker.remove();
      userMarkerRef.current = null;
    },
    []
  );

  const flyToHere = () => {
    if (here) mapRef.current?.flyTo({ center: [here.longitude, here.latitude], zoom: 16.5, duration: 1200 });
  };

  // Walking directions in Google Maps, from where you are when we know it.
  const getThere = (r: FoodStepRestaurant) => {
    const params = new URLSearchParams({
      api: "1",
      destination: `${r.name}, ${r.address}, ${city?.name ?? ""}`,
      travelmode: "walking",
    });
    if (here) params.set("origin", `${here.latitude},${here.longitude}`);
    window.open(`https://www.google.com/maps/dir/?${params.toString()}`, "_blank", "noopener");
  };

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

        {/* Zones: tap one to see just its restaurants, again (or "All areas") for all of them. */}
        {zones.length > 0 && (
          <>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.zoneChips}>
              <Pressable
                style={[styles.zoneChip, !zone && styles.zoneChipActive]}
                onPress={() => setZoneId(null)}
                aria-selected={!zone}
              >
                <Text style={[styles.zoneChipText, !zone && styles.zoneChipTextActive]}>
                  {t("foodStep.allAreas", { count: restaurants.length })}
                </Text>
              </Pressable>
              {zones.map((z) => {
                const active = z.id === zoneId;
                const count = restaurants.filter((r) => zoneContains(z, r.lng, r.lat)).length;
                return (
                  <Pressable
                    key={z.id}
                    style={[styles.zoneChip, active && styles.zoneChipActive]}
                    onPress={() => setZoneId(active ? null : z.id)}
                    aria-selected={active}
                  >
                    <Text style={[styles.zoneChipText, active && styles.zoneChipTextActive]}>
                      {z.name} · {count}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
            {zone && (
              <View style={styles.zoneInfo}>
                <Text style={styles.zoneInfoText} numberOfLines={2}>
                  {shown.length ? zone.description : t("foodStep.zoneEmpty", { cuisine: cuisine?.name ?? "" })}
                </Text>
                <Pressable onPress={() => setZoneId(null)} hitSlop={8}>
                  <Text style={styles.zoneReset}>{t("foodStep.showAll")}</Text>
                </Pressable>
              </View>
            )}
          </>
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
            {zoneName(selected.zone) && (
              <View style={styles.placeAddressRow}>
                <Ionicons name="walk" size={14} color={FOODSTEP_GREEN} />
                <Text style={styles.placeAddress}>{zoneName(selected.zone)}</Text>
              </View>
            )}
            <View style={styles.placeAddressRow}>
              <Ionicons name="location" size={14} color={FOODSTEP_GREEN} />
              <Text style={styles.placeAddress}>{selected.address}</Text>
            </View>
            <Text style={styles.placeDescription}>{selected.description}</Text>
            {here && (
              <Text style={styles.placeDistance}>
                {formatDistance(distanceKm(here, { latitude: selected.lat, longitude: selected.lng }), t)}
              </Text>
            )}
            <View style={styles.cardActions}>
              <Pressable
                style={({ pressed, hovered }: { pressed: boolean; hovered?: boolean }) => [
                  styles.cardButton,
                  styles.getThere,
                  (pressed || hovered) && styles.getThereActive,
                ]}
                onPress={() => getThere(selected)}
              >
                <Ionicons name="navigate" size={16} color="#FFFFFF" />
                <Text style={styles.getThereText}>{t("foodStep.getThere")}</Text>
              </Pressable>
              {/* Scout answers about this restaurant (orange, like StoryStep's own guide). */}
              <Pressable
                style={({ pressed, hovered }: { pressed: boolean; hovered?: boolean }) => [
                  styles.cardButton,
                  { backgroundColor: colors.primary },
                  (pressed || hovered) && styles.askActive,
                ]}
                onPress={() => setAskingAbout(selected)}
              >
                <Ionicons name="chatbubble-ellipses" size={16} color="#FFFFFF" />
                <Text style={styles.getThereText}>{t("foodStep.askScout")}</Text>
              </Pressable>
            </View>
          </View>
        )}

        {askingAbout && city && cuisine && (
          <AskGuideModal
            foodStep={{ city, cuisine, restaurant: askingAbout }}
            guide="scout"
            guideIds={["scout"]}
            onClose={() => setAskingAbout(null)}
          />
        )}

        {/* Which zone you're in; tap to fly to yourself. */}
        {mapReady && (here || gps.error) && !(compact && selected) && (
          <Pressable style={[styles.herePill, compact ? styles.herePillCompact : styles.herePillWide]} onPress={flyToHere} disabled={!here}>
            <Ionicons name={here ? "locate" : "location-outline"} size={14} color={here ? "#0084FF" : colors.textDim} />
            <Text style={styles.herePillText}>
              {!here
                ? t("foodStep.locationOff")
                : hereZone
                  ? t("foodStep.youAreIn", { zone: hereZone.name })
                  : t("foodStep.outsideZones")}
              {demo ? ` (${t("foodStep.demoLocation")})` : ""}
            </Text>
          </Pressable>
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
    zoneChips: { flexDirection: "row", gap: 8, paddingTop: 4 },
    zoneChip: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: "rgba(60,185,79,0.45)",
      backgroundColor: "rgba(60,185,79,0.08)",
    },
    zoneChipActive: { backgroundColor: FOODSTEP_GREEN, borderColor: FOODSTEP_GREEN },
    zoneChipText: { fontSize: 12.5, fontWeight: "600", color: colors.textMid },
    zoneChipTextActive: { color: "#FFFFFF" },
    zoneInfo: { flexDirection: "row", alignItems: "center", gap: 10 },
    zoneInfoText: { flex: 1, fontSize: 12.5, color: colors.textMid },
    zoneReset: { fontSize: 12.5, fontWeight: "700", color: FOODSTEP_GREEN, textDecorationLine: "underline" },
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
    placeDistance: { fontSize: 12.5, fontWeight: "700", color: colors.textMid },
    cardActions: { flexDirection: "row", gap: 8, marginTop: 4 },
    cardButton: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderRadius: 8,
    },
    getThere: { backgroundColor: FOODSTEP_GREEN },
    getThereActive: { backgroundColor: "#2DA03E" },
    askActive: { opacity: 0.85 },
    getThereText: { color: "#FFFFFF", fontSize: 14, fontWeight: "600" },
    herePill: {
      position: "absolute",
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      maxWidth: 230,
      paddingVertical: 7,
      paddingHorizontal: 12,
      borderRadius: 18,
      backgroundColor: colors.background,
      shadowColor: "#000",
      shadowOpacity: 0.25,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
    },
    // On a phone Scout fills the bottom, so it sits top-left (hidden while a card is open there).
    herePillCompact: { top: 12, left: 12 },
    herePillWide: { right: 12, bottom: 26 },
    herePillText: { flexShrink: 1, fontSize: 12.5, fontWeight: "600", color: colors.text },
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

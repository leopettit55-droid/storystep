import { useNavigation } from "@react-navigation/native";
import {
  addProtocol,
  LngLatBounds,
  Map as MapLibreMap,
  Marker,
  setWorkerUrl,
  type StyleSpecification,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Protocol as PMTilesProtocol } from "pmtiles";
import { useEffect, useMemo, useRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Skeleton from "../components/Skeleton";
import { areas } from "../content";
import { COMING_SOON_CITIES } from "../content/comingSoonCities";
import type { Area } from "../content/schema";
import { localizedAreaText } from "../i18n/areaTranslations";
import { localizedCityName } from "../i18n/cityNames";
import { useLanguage } from "../i18n/LanguageContext";
import type { TabScreenNav } from "../navigation/types";
import { useTheme } from "../ThemeContext";
import type { ThemeColors } from "../theme";

// Metro (the RN bundler) can't route MapLibre's dynamically-constructed
// module-worker request, so point it at a CDN copy of the exact same
// version's worker bundle instead of letting it resolve locally.
setWorkerUrl("https://unpkg.com/maplibre-gl@6.4.1/dist/maplibre-gl-worker.mjs");

// OpenFreeMap serves its vector data as one PMTiles archive rather than
// individual {z}/{x}/{y} tile URLs, so MapLibre needs this protocol
// registered before it can decode tiles out of it.
addProtocol("pmtiles", new PMTilesProtocol().tile);

type Nav = TabScreenNav<"Map">;
type City = "London" | "Paris" | "Oxford";

// Fallback if a city ever has zero content-complete tours to frame around.
const CITY_FALLBACK_CENTER: Record<City, [number, number]> = {
  London: [-0.13, 51.507],
  Paris: [2.335, 48.86],
  Oxford: [-1.258, 51.752],
};

// Pins previously appeared to fly off-screen under any pitch, but that was
// the missing MapLibre marker CSS (fixed elsewhere), not the tilt itself —
// fitBounds correctly accounts for pitch/bearing when it's given upfront.
const FIT_OPTIONS = { padding: 80, pitch: 55, bearing: -15, maxZoom: 16 };

/** Bounds tight around each tour's real starting point, so the camera frames
 * exactly where the neighborhoods are instead of a fixed, arbitrary city view. */
function boundsForAreas(cityAreas: Area[], city: City): LngLatBounds {
  if (cityAreas.length === 0) {
    const [lng, lat] = CITY_FALLBACK_CENTER[city];
    return new LngLatBounds([lng, lat], [lng, lat]);
  }
  const bounds = new LngLatBounds(
    [cityAreas[0].startingPoint.lng, cityAreas[0].startingPoint.lat],
    [cityAreas[0].startingPoint.lng, cityAreas[0].startingPoint.lat]
  );
  cityAreas.slice(1).forEach((a) => bounds.extend([a.startingPoint.lng, a.startingPoint.lat]));
  return bounds;
}

// OpenFreeMap's vector tiles give us real road/building/place geometry to lay
// over the satellite imagery. We don't use its prebuilt "liberty" style
// wholesale (that paints opaque land/water fills that would hide the imagery)
// — just its font glyphs and the underlying planet PMTiles archive.
const VECTOR_STYLE_URL = "https://tiles.openfreemap.org/styles/liberty";

// Esri's World Imagery service — free, no API key, global aerial/satellite
// coverage down to street level in major cities like London and Paris.
const SATELLITE_TILE_URL =
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";

// The outer element becomes MapLibre's Marker root, which owns its `transform`
// entirely for positioning (translate to the projected lng/lat). Hover scaling
// must be applied to an inner element instead — writing to the root's own
// transform would overwrite MapLibre's positioning and snap the pin to (0,0).
function makeMarkerElement(pinColor: string): { root: HTMLDivElement; dot: HTMLDivElement } {
  const el = document.createElement("div");
  el.style.cursor = "pointer";
  el.style.display = "flex";
  el.style.flexDirection = "column";
  el.style.alignItems = "center";

  const pin = document.createElement("div");
  pin.style.width = "16px";
  pin.style.height = "16px";
  pin.style.borderRadius = "50%";
  pin.style.background = pinColor;
  pin.style.border = "3px solid #FFFFFF";
  pin.style.boxShadow = "0 2px 6px rgba(32,22,19,0.4)";
  pin.style.transition = "transform 120ms ease";
  pin.style.transform = "scale(1)";
  el.appendChild(pin);

  return { root: el, dot: pin };
}

export default function ExploreMapScreen() {
  const navigation = useNavigation<Nav>();
  const { language, t } = useLanguage();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markersRef = useRef<Record<string, Marker>>({});
  const markerDotsRef = useRef<Record<string, HTMLDivElement>>({});
  const [city, setCity] = useState<City>("London");
  const [hoveredArea, setHoveredArea] = useState<Area | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [mapLoadIssue, setMapLoadIssue] = useState(false);

  const complete = areas.filter((a) => a.isContentComplete);

  // Initialize map once.
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    let cancelled = false;

    (async () => {
      // Borrow the vector planet archive + font glyphs from OpenFreeMap's
      // hosted style, but build our own layer stack on top of real satellite
      // imagery instead of using their opaque vector basemap fills.
      const vectorStyle: StyleSpecification = await fetch(VECTOR_STYLE_URL).then((r) => r.json());
      const planetUrl = vectorStyle.sources?.openmaptiles;
      const vectorUrl =
        planetUrl && "url" in planetUrl && planetUrl.url ? `pmtiles://${planetUrl.url}` : undefined;
      if (cancelled || !containerRef.current || !vectorUrl) return;

      const style: StyleSpecification = {
        version: 8,
        glyphs: vectorStyle.glyphs,
        sources: {
          satellite: {
            type: "raster",
            tiles: [SATELLITE_TILE_URL],
            tileSize: 256,
            maxzoom: 19,
            attribution: "Imagery © Esri, Maxar, Earthstar Geographics",
          },
          openmaptiles: { type: "vector", url: vectorUrl },
        },
        layers: [
          { id: "satellite", type: "raster", source: "satellite" },
          {
            id: "storystep-roads",
            type: "line",
            source: "openmaptiles",
            "source-layer": "transportation",
            filter: ["all", ["!=", ["get", "class"], "path"], ["!=", ["get", "brunnel"], "tunnel"]],
            layout: { "line-join": "round", "line-cap": "round" },
            paint: {
              "line-color": "#FFFFFF",
              "line-opacity": 0.5,
              "line-width": ["interpolate", ["linear"], ["zoom"], 12, 0.5, 16, 2.2, 18, 4.5],
            },
          },
          {
            id: "storystep-3d-buildings",
            type: "fill-extrusion",
            source: "openmaptiles",
            "source-layer": "building",
            minzoom: 14,
            paint: {
              "fill-extrusion-color": "#E8DCC8",
              "fill-extrusion-height": ["coalesce", ["get", "render_height"], 8],
              "fill-extrusion-base": ["coalesce", ["get", "render_min_height"], 0],
              "fill-extrusion-opacity": 0.5,
            },
          },
          {
            id: "storystep-place-labels",
            type: "symbol",
            source: "openmaptiles",
            "source-layer": "place",
            filter: [
              "match",
              ["get", "class"],
              ["suburb", "neighbourhood", "quarter", "city", "town"],
              true,
              false,
            ],
            layout: {
              "text-field": ["coalesce", ["get", "name_en"], ["get", "name"]],
              "text-font": ["Noto Sans Regular"],
              "text-size": ["interpolate", ["linear"], ["zoom"], 11, 11, 15, 14],
              "text-transform": "uppercase",
              "text-letter-spacing": 0.08,
            },
            paint: {
              "text-color": "#FFFFFF",
              "text-halo-color": "rgba(0,0,0,0.65)",
              "text-halo-width": 1.4,
            },
          },
        ],
      };

      const map = new MapLibreMap({
        container: containerRef.current,
        style,
        bounds: boundsForAreas(
          complete.filter((a) => a.city === "London"),
          "London"
        ),
        fitBoundsOptions: { ...FIT_OPTIONS, duration: 0 },
        attributionControl: false,
        maxPitch: 75,
      });
      mapRef.current = map;
      map.on("error", (e) => {
        // eslint-disable-next-line no-console
        console.error("StoryStep map error:", e.error?.message ?? e.error ?? e);
      });

      let loaded = false;
      map.on("load", () => {
        loaded = true;
        setMapReady(true);
        setMapLoadIssue(false);
      });

      // A slow/blocked network (imagery/tile hosts unreachable) leaves the
      // map stuck loading with only a console error — surface that visibly
      // instead of showing a silent blank map.
      setTimeout(() => {
        if (!cancelled && !loaded) setMapLoadIssue(true);
      }, 10000);
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // Keep markers in sync with the completed tours list for the selected city
  // only — otherwise the other city's pins get added too, off-screen but
  // still there, and collapse toward the horizon under the tilted camera.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    complete
      .filter((area) => area.city === city)
      .forEach((area) => {
        const { root, dot } = makeMarkerElement(colors.primary);
        root.addEventListener("mouseenter", () => setHoveredArea(area));
        root.addEventListener("mouseleave", () => setHoveredArea(null));
        root.addEventListener("click", () => navigation.navigate("TourPreview", { areaId: area.id }));

        const marker = new Marker({ element: root })
          .setLngLat([area.startingPoint.lng, area.startingPoint.lat])
          .addTo(map);
        markersRef.current[area.id] = marker;
        markerDotsRef.current[area.id] = dot;
      });

    return () => {
      Object.values(markersRef.current).forEach((m) => m.remove());
      markersRef.current = {};
      markerDotsRef.current = {};
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapReady, city]);

  // Reflect hover state by scaling the inner dot only — the marker root's own
  // transform is owned by MapLibre for positioning and must not be touched.
  useEffect(() => {
    complete.forEach((area) => {
      const dot = markerDotsRef.current[area.id];
      if (dot) {
        dot.style.transform = hoveredArea?.id === area.id ? "scale(1.12)" : "scale(1)";
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hoveredArea]);

  const flyToCity = (c: City) => {
    setCity(c);
    const map = mapRef.current;
    if (!map) return;
    map.fitBounds(boundsForAreas(complete.filter((a) => a.city === c), c), {
      ...FIT_OPTIONS,
      duration: 1400,
    });
  };

  const cityAreas = complete.filter((a) => a.city === city);

  return (
    <View style={styles.container}>
      <View style={styles.overlayTop}>
        <Text style={styles.title}>{t("map.title")}</Text>
        <Text style={styles.subtitle}>{t("map.subtitle")}</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cityToggle}
        >
          {(["London", "Paris", "Oxford"] as City[]).map((c) => (
            <Pressable
              key={c}
              style={[styles.cityButton, city === c && styles.cityButtonActive]}
              onPress={() => flyToCity(c)}
            >
              <Text style={[styles.cityButtonText, city === c && styles.cityButtonTextActive]}>
                {localizedCityName(c, language)}
              </Text>
            </Pressable>
          ))}
          {COMING_SOON_CITIES.map((c) => (
            <Pressable
              key={c.id}
              style={[styles.cityButton, styles.cityButtonSoon]}
              onPress={() => navigation.navigate("ComingSoon", { cityName: c.name })}
            >
              <Text style={styles.cityButtonSoonText}>{localizedCityName(c.name, language)}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <View style={styles.mapWrap}>
        <div ref={containerRef} style={{ position: "absolute", inset: 0 }} />

        {!mapReady && !mapLoadIssue && (
          <View style={styles.mapStatusOverlay} pointerEvents="none">
            <Skeleton style={StyleSheet.absoluteFill} borderRadius={0} />
            <Skeleton style={[styles.skeletonPin, { top: "30%", left: "35%" }]} borderRadius={7} />
            <Skeleton style={[styles.skeletonPin, { top: "48%", left: "58%" }]} borderRadius={7} />
            <Skeleton style={[styles.skeletonPin, { top: "62%", left: "42%" }]} borderRadius={7} />
          </View>
        )}

        {mapLoadIssue && (
          <View style={styles.mapStatusOverlay}>
            <Text style={styles.mapIssueTitle}>{t("map.loadIssueTitle")}</Text>
            <Text style={styles.mapIssueBody}>{t("map.loadIssueBody")}</Text>
          </View>
        )}

        {hoveredArea && (
          <View style={styles.hoverCard} pointerEvents="none">
            <Text style={styles.hoverCardTitle}>
              {localizedAreaText(hoveredArea.id, language, hoveredArea).name}
            </Text>
            <Text style={styles.hoverCardMeta}>
              {t("common.from")} £{hoveredArea.price.singleTour.toFixed(2)}
            </Text>
          </View>
        )}

        <Text style={styles.attribution} pointerEvents="none">
          Imagery © Esri, Maxar, Earthstar Geographics
        </Text>
      </View>

      <View style={styles.legendWrap}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.legend}>
          {cityAreas.map((area) => (
            <Pressable
              key={area.id}
              style={[styles.legendChip, hoveredArea?.id === area.id && styles.legendChipActive]}
              onPress={() => navigation.navigate("TourPreview", { areaId: area.id })}
              onHoverIn={() => setHoveredArea(area)}
              onHoverOut={() => setHoveredArea(null)}
            >
              <Text
                style={[
                  styles.legendChipText,
                  hoveredArea?.id === area.id && styles.legendChipTextActive,
                ]}
              >
                {localizedAreaText(area.id, language, area).name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  mapWrap: { flex: 1, position: "relative" },
  overlayTop: {
    padding: 20,
    paddingBottom: 8,
    gap: 8,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderColor: colors.border,
    zIndex: 1,
  },
  title: { fontSize: 22, fontWeight: "800", color: colors.text },
  subtitle: { fontSize: 12.5, color: colors.textDim },
  cityToggle: { flexDirection: "row", gap: 8, marginTop: 4 },
  cityButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cityButtonActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  cityButtonText: { fontSize: 13, fontWeight: "700", color: colors.textMid },
  cityButtonTextActive: { color: colors.onPrimary },
  cityButtonSoon: { backgroundColor: "transparent", borderStyle: "dashed", borderColor: colors.textFaint },
  cityButtonSoonText: { fontSize: 13, fontWeight: "600", color: colors.textFaint },
  hoverCard: {
    // Always a dark scrim regardless of theme — this floats over map
    // imagery, not app chrome, so it needs consistent contrast with its
    // hardcoded white text either way.
    position: "absolute",
    top: 16,
    left: 16,
    backgroundColor: "rgba(20,12,10,0.85)",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  hoverCardTitle: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
  hoverCardMeta: { color: "#FFFFFF", fontSize: 11, opacity: 0.85, marginTop: 2 },
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
  skeletonPin: { position: "absolute", width: 14, height: 14 },
  attribution: {
    position: "absolute",
    bottom: 6,
    right: 10,
    fontSize: 9.5,
    color: "rgba(255,255,255,0.75)",
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowRadius: 3,
  },
  legendWrap: {
    borderTopWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  legend: { padding: 14, gap: 8 },
  legendChip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  legendChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  legendChipText: { fontSize: 12.5, fontWeight: "600", color: colors.textMid },
  legendChipTextActive: { color: colors.onPrimary },
  });
}

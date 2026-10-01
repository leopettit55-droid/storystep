import { Ionicons } from "@expo/vector-icons";
import {
  AttributionControl,
  LngLatBounds,
  Map as MapLibreMap,
  Marker,
  setWorkerUrl,
  type StyleSpecification,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { Pressable, StyleSheet, View } from "react-native";
import type { Coordinates, Waypoint } from "../content";
import { useLanguage } from "../i18n/LanguageContext";
import { bearingDegrees, distanceMeters } from "../geofencing/proximityTracker";
import { DEFAULT_GUIDE, guideSvg } from "../guides/guides";
import type { TourMapProps } from "./TourMap";

// Same worker setup as the Explore map (see ExploreMapScreen.web.tsx).
// The live site serves the map engine itself (copied in by
// scripts/build-tour-pages.ts), so it's saved with downloaded tours and works
// offline; the dev server uses the CDN copy of the same version.
setWorkerUrl(__DEV__ ? "https://unpkg.com/maplibre-gl@6.4.1/dist/maplibre-gl-worker.mjs" : "/vendor/maplibre/maplibre-gl-worker.mjs");

// OpenFreeMap supplies the vector data (roads, water, parks, buildings) and
// font glyphs as a plain TileJSON feed; the colours are all ours, in a bright
// Pokemon Go-style palette.
const VECTOR_TILES_URL = "https://tiles.openfreemap.org/planet";
const GLYPHS_URL = "https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf";

const PALETTE = {
  ground: "#A6E6A0",
  grass: "#8EDC8C",
  park: "#72D07F",
  wood: "#5FC271",
  water: "#58C7F0",
  building: "#D4F0CC",
  road: "#FFF8D6",
  roadEdge: "#7CC98A",
  path: "#F2FBE4",
  label: "#35604A",
  route: "#2F9BFF",
  stop: "#2F9BFF",
  visited: "#9B6BDF",
};

const FOLLOW_ZOOM = 17.6;
const FOLLOW_PITCH = 55;
const MAX_PITCH = 65;
/** The intro swoop: from a flat, high view of the city down to street level. */
const FLY_IN_FROM_ZOOM = 13;
const FLY_IN_MS = 3200;
/** Street-level view of a focused stop: low and close. */
const DETAIL_ZOOM = 18.6;
const DETAIL_PITCH = 74;
const DETAIL_MAX_PITCH = 78;
/** Switching between the map and a stop view: fade out, cut the camera, fade in. */
const FADE_OUT_MS = 300;
const FADE_IN_MS = 400;
/** Buildings rise out of the ground between these zooms, then keep growing
 * (x1.3 per zoom level past 16) so close-up views feel dramatically 3D. */
const BUILDINGS_APPEAR_ZOOM = 15;
const BUILDINGS_FULL_ZOOM = 16;
/** The avatar grows subtly as you zoom in (x0.15 per zoom level past 16). */
function avatarScale(zoom: number): number {
  return Math.min(1.5, Math.max(0.7, 1 + (zoom - 16) * 0.15));
}
/** Shortest turn from angle a to b, in degrees (-180..180). */
function angleDelta(a: number, b: number): number {
  return ((b - a + 540) % 360) - 180;
}
/** How long the avatar takes to glide from one GPS fix to the next. */
const GLIDE_MS = 900;
/** Moving at least this far between fixes counts as walking (and updates the heading). */
const WALK_STEP_M = 1.2;
/** Walking direction is measured over at least this distance, so GPS wobble
 * while standing still doesn't spin the ring (and the camera) around. */
const HEADING_BASELINE_M = 5;
/** Stop the walking animation once no movement has come in for this long. */
const WALK_IDLE_MS = 2500;

/** A building's height scaled by zoom: flat at BUILDINGS_APPEAR_ZOOM, true
 * height at BUILDINGS_FULL_ZOOM, then exaggerated further as you zoom in. */
function buildingHeight(prop: string, fallback: number) {
  const h = ["coalesce", ["get", prop], fallback];
  return [
    "interpolate", ["linear"], ["zoom"],
    BUILDINGS_APPEAR_ZOOM, 0,
    BUILDINGS_FULL_ZOOM, h,
    19, ["*", 1 + (19 - BUILDINGS_FULL_ZOOM) * 0.3, h],
  ] as unknown as number;
}

function buildStyle(): StyleSpecification {
  const zoomWidth = (a: number, b: number, c: number) =>
    ["interpolate", ["exponential", 1.6], ["zoom"], 13, a, 16, b, 19, c] as unknown as number;

  return {
    version: 8,
    glyphs: GLYPHS_URL,
    sky: {
      "sky-color": "#8FD6FF",
      "horizon-color": "#E2F7FF",
      "fog-color": "#E2F7FF",
      "sky-horizon-blend": 0.6,
      "horizon-fog-blend": 0.6,
      "fog-ground-blend": 0.8,
    },
    sources: {
      openmaptiles: {
        type: "vector",
        url: VECTOR_TILES_URL,
        attribution: "© OpenFreeMap © OpenMapTiles © OpenStreetMap contributors",
      },
    },
    layers: [
      { id: "ground", type: "background", paint: { "background-color": PALETTE.ground } },
      {
        id: "landcover",
        type: "fill",
        source: "openmaptiles",
        "source-layer": "landcover",
        paint: {
          "fill-color": ["match", ["get", "class"], "wood", PALETTE.wood, PALETTE.grass],
          "fill-opacity": 0.9,
        },
      },
      {
        id: "park",
        type: "fill",
        source: "openmaptiles",
        "source-layer": "park",
        paint: { "fill-color": PALETTE.park },
      },
      {
        id: "water",
        type: "fill",
        source: "openmaptiles",
        "source-layer": "water",
        paint: { "fill-color": PALETTE.water },
      },
      {
        id: "waterway",
        type: "line",
        source: "openmaptiles",
        "source-layer": "waterway",
        paint: { "line-color": PALETTE.water, "line-width": zoomWidth(1, 3, 8) },
      },
      {
        id: "road-edge",
        type: "line",
        source: "openmaptiles",
        "source-layer": "transportation",
        filter: ["all", ["!=", ["get", "class"], "path"], ["!=", ["get", "brunnel"], "tunnel"]],
        layout: { "line-join": "round", "line-cap": "round" },
        paint: { "line-color": PALETTE.roadEdge, "line-width": zoomWidth(2, 9, 30) },
      },
      {
        id: "road",
        type: "line",
        source: "openmaptiles",
        "source-layer": "transportation",
        filter: ["all", ["!=", ["get", "class"], "path"], ["!=", ["get", "brunnel"], "tunnel"]],
        layout: { "line-join": "round", "line-cap": "round" },
        paint: { "line-color": PALETTE.road, "line-width": zoomWidth(1.2, 7, 26) },
      },
      {
        id: "path",
        type: "line",
        source: "openmaptiles",
        "source-layer": "transportation",
        filter: ["==", ["get", "class"], "path"],
        layout: { "line-join": "round", "line-cap": "round" },
        paint: { "line-color": PALETTE.path, "line-width": zoomWidth(0.6, 2.5, 8), "line-opacity": 0.9 },
      },
      {
        id: "buildings",
        type: "fill-extrusion",
        source: "openmaptiles",
        "source-layer": "building",
        minzoom: BUILDINGS_APPEAR_ZOOM,
        paint: {
          "fill-extrusion-color": PALETTE.building,
          "fill-extrusion-height": buildingHeight("render_height", 8),
          "fill-extrusion-base": buildingHeight("render_min_height", 0),
          "fill-extrusion-opacity": 0.85,
        },
      },
      {
        id: "street-names",
        type: "symbol",
        source: "openmaptiles",
        "source-layer": "transportation_name",
        minzoom: 15,
        layout: {
          "symbol-placement": "line",
          "text-field": ["coalesce", ["get", "name_en"], ["get", "name"]],
          "text-font": ["Noto Sans Regular"],
          "text-size": 11,
        },
        paint: { "text-color": PALETTE.label, "text-halo-color": "#FFFFFF", "text-halo-width": 1.4 },
      },
    ],
  };
}

// Marker styling lives in one injected stylesheet (keyframes can't be inline styles).
const CSS = `
.ss-stop, .ss-avatar, .ss-ring { transition: opacity 0.4s ease; }
/* !important: MapLibre writes each marker's opacity inline. */
.ss-detail .ss-stop, .ss-detail .ss-avatar, .ss-detail .ss-ring { opacity: 0 !important; pointer-events: none !important; }
.ss-avatar { position: relative; width: 56px; height: 68px; pointer-events: none; }
.ss-avatar svg { overflow: visible; transform: scale(var(--ss-scale, 1)); transform-origin: 50% 100%; }
.ss-avatar .ss-body { transform-box: view-box; transform-origin: 50px 110px; }
.ss-avatar .ss-leg { transform-box: fill-box; transform-origin: 50% 0%; }
.ss-avatar.idle .ss-body { animation: ss-breathe 2.4s ease-in-out infinite; }
.ss-avatar.walking .ss-body { animation: ss-bob 0.5s ease-in-out infinite; }
.ss-avatar.walking .ss-leg-l { animation: ss-step 0.5s ease-in-out infinite; }
.ss-avatar.walking .ss-leg-r { animation: ss-step 0.5s ease-in-out infinite; animation-delay: -0.25s; }
@keyframes ss-breathe { 0%, 100% { transform: scale(1, 1); } 50% { transform: scale(1.02, 0.98); } }
@keyframes ss-bob { 0%, 100% { transform: translateY(0) rotate(-3deg); } 50% { transform: translateY(-5px) rotate(3deg); } }
@keyframes ss-step { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }

.ss-ring { width: 64px; height: 64px; pointer-events: none; }
.ss-ring svg { transform: scale(var(--ss-scale, 1)); }

.ss-bubble {
  position: absolute; left: 50%; bottom: calc(var(--ss-scale, 1) * 68px + 10px);
  transform: translateX(-50%); width: max-content; max-width: 210px;
  animation: ss-bubble-in 0.35s ease-out;
}
.ss-bubble.fade-out { animation: ss-bubble-out 0.3s ease-in forwards; }
.ss-bubble-inner {
  position: relative; background: #FFFFFF; border: 2px solid ${PALETTE.route}; border-radius: 14px;
  padding: 9px 13px; box-shadow: 0 4px 12px rgba(0,0,0,0.18); text-align: center;
  color: #201613; font: 600 14px/1.35 system-ui, sans-serif;
}
.ss-bubble-inner::after {
  content: ""; position: absolute; left: 50%; bottom: -9px; transform: translateX(-50%);
  border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 9px solid ${PALETTE.route};
}
@keyframes ss-bubble-in { from { opacity: 0; transform: translateX(-50%) translateY(8px) scale(0.9); } to { opacity: 1; transform: translateX(-50%); } }
@keyframes ss-bubble-out { to { opacity: 0; transform: translateX(-50%) translateY(-8px); } }
.ss-ring .ss-ring-pulse { transform-box: fill-box; transform-origin: center; animation: ss-ring 2.2s ease-out infinite; }
@keyframes ss-ring { 0% { transform: scale(0.6); opacity: 0.7; } 100% { transform: scale(1.35); opacity: 0; } }

.ss-stop { display: flex; flex-direction: column; align-items: center; cursor: pointer; }
.ss-stop-label {
  margin-bottom: 4px; padding: 3px 8px; border-radius: 10px; background: #FFFFFF;
  color: #201613; font: 600 12px/1.3 system-ui, sans-serif; white-space: nowrap;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2); display: none;
}
.ss-stop.labelled .ss-stop-label { display: block; }
.ss-stop-disc {
  position: relative; width: 30px; height: 30px; border-radius: 50%;
  border: 3px solid #FFFFFF; box-shadow: 0 3px 8px rgba(0,0,0,0.3);
  display: flex; align-items: center; justify-content: center;
  color: #FFFFFF; font: 700 13px/1 system-ui, sans-serif;
  background: radial-gradient(circle at 35% 30%, #8FD0FF, ${PALETTE.stop} 70%);
  animation: ss-float 2.6s ease-in-out infinite;
}
.ss-stop.visited .ss-stop-disc { background: radial-gradient(circle at 35% 30%, #CDB3F2, ${PALETTE.visited} 70%); }
.ss-stop.next .ss-stop-disc::after {
  content: ""; position: absolute; inset: -3px; border-radius: 50%;
  animation: ss-pulse 1.8s ease-out infinite;
}
.ss-stop-pole { width: 3px; height: 14px; background: #FFFFFF; box-shadow: 0 1px 3px rgba(0,0,0,0.25); }
.ss-stop-base { width: 14px; height: 5px; border-radius: 50%; background: rgba(0,0,0,0.2); }
@keyframes ss-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
@keyframes ss-pulse {
  0% { box-shadow: 0 0 0 0 rgba(47,155,255,0.7); }
  70% { box-shadow: 0 0 0 14px rgba(47,155,255,0); }
  100% { box-shadow: 0 0 0 0 rgba(47,155,255,0); }
}
`;

function injectCss() {
  if (document.getElementById("ss-tour-map-css")) return;
  const el = document.createElement("style");
  el.id = "ss-tour-map-css";
  el.textContent = CSS;
  document.head.appendChild(el);
}


/** The ground ring under the avatar; the arrow points the way the walker is heading. */
const RING_SVG = `
<svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true">
  <circle class="ss-ring-pulse" cx="32" cy="32" r="22" fill="none" stroke="#FFFFFF" stroke-width="3"/>
  <circle cx="32" cy="32" r="20" fill="rgba(47,155,255,0.25)" stroke="#FFFFFF" stroke-width="2.5"/>
  <path d="M32 4 L40 16 L32 13 L24 16 Z" fill="#FFFFFF" stroke="${PALETTE.stop}" stroke-width="1.5" stroke-linejoin="round"/>
</svg>`;

function makeStopElement(waypoint: Waypoint): HTMLDivElement {
  const root = document.createElement("div");
  root.className = "ss-stop";
  const label = document.createElement("div");
  label.className = "ss-stop-label";
  label.textContent = waypoint.name;
  const disc = document.createElement("div");
  disc.className = "ss-stop-disc";
  disc.textContent = String(waypoint.order);
  const pole = document.createElement("div");
  pole.className = "ss-stop-pole";
  const base = document.createElement("div");
  base.className = "ss-stop-base";
  root.append(label, disc, pole, base);
  return root;
}

/** Shows a speech bubble above the avatar for `durationMs`; returns a cleanup that removes it early. */
function showBubble(avatarEl: HTMLDivElement, text: string, durationMs: number): () => void {
  avatarEl.querySelectorAll(".ss-bubble").forEach((b) => b.remove());
  const bubble = document.createElement("div");
  bubble.className = "ss-bubble";
  const inner = document.createElement("div");
  inner.className = "ss-bubble-inner";
  inner.textContent = text;
  bubble.appendChild(inner);
  avatarEl.appendChild(bubble);
  const fade = window.setTimeout(() => bubble.classList.add("fade-out"), Math.max(0, durationMs - 300));
  const remove = window.setTimeout(() => bubble.remove(), durationMs);
  return () => {
    window.clearTimeout(fade);
    window.clearTimeout(remove);
    bubble.remove();
  };
}

/**
 * Pokemon Go-style tour map for the web build: a bright game-board basemap,
 * the StoryStep mascot walking on a heading ring at the walker's position, and
 * floating stop markers (blue ahead, purple once heard). Position comes from
 * the tour's own ProximityTracker via the tour store, so there's only ever one
 * GPS watch running and narration triggering is untouched.
 */
export default function TourMap({
  area,
  currentWaypointIndex,
  visitedWaypointIds,
  userLocation,
  onWaypointPress,
  speech,
  faceBearing,
  flyIn,
  focusStop,
  guide = DEFAULT_GUIDE,
  style,
}: TourMapProps) {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const avatarRef = useRef<{ figure: Marker; ring: Marker; el: HTMLDivElement; ringEl: HTMLDivElement } | null>(null);
  const speechRef = useRef(speech);
  speechRef.current = speech;
  const stopsRef = useRef<Record<string, HTMLDivElement>>({});
  const followRef = useRef(true);
  /** True while a stop is focused: the camera belongs to the stop view, not the walker. */
  const focusRef = useRef(false);
  const fadeTimer = useRef(0);
  const [following, setFollowing] = useState(true);
  const [mapReady, setMapReady] = useState(false);

  // Latest callback without rebuilding marker listeners.
  const onPressRef = useRef(onWaypointPress);
  onPressRef.current = onWaypointPress;
  const visitedRef = useRef(visitedWaypointIds);
  visitedRef.current = visitedWaypointIds;

  // Glide state: the avatar eases from `from` to `to` over GLIDE_MS.
  const glide = useRef({
    from: null as Coordinates | null,
    to: null as Coordinates | null,
    shown: null as Coordinates | null,
    start: 0,
    frame: 0,
    heading: 0,
    bearingFrom: 0,
    headingAnchor: null as Coordinates | null,
    lastStepAt: 0,
  });

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    injectCss();

    {
      const start = userLocation ?? area.route[0]?.coordinates ?? area.startingPoint;
      const map = new MapLibreMap({
        container: containerRef.current,
        style: buildStyle(),
        center: [start.lng, start.lat],
        zoom: flyIn ? FLY_IN_FROM_ZOOM : FOLLOW_ZOOM,
        pitch: flyIn ? 0 : FOLLOW_PITCH,
        maxPitch: MAX_PITCH,
        attributionControl: false,
      });
      map.addControl(new AttributionControl({ compact: true }), "bottom-left");
      mapRef.current = map;

      // The container can still be settling its size when the map is created
      // (e.g. on the first frame of a full-screen page); keep the canvas matched.
      const resizeObserver = new ResizeObserver(() => map.resize());
      resizeObserver.observe(containerRef.current);
      map.once("remove", () => resizeObserver.disconnect());

      // Any manual pan/rotate hands the camera to the walker until they tap re-centre.
      const stopFollowing = (e: { originalEvent?: unknown }) => {
        if (!e.originalEvent) return;
        if (focusRef.current) return;
        followRef.current = false;
        setFollowing(false);
      };
      map.on("dragstart", stopFollowing);
      map.on("rotatestart", stopFollowing);

      map.on("zoom", () => {
        const avatar = avatarRef.current;
        if (!avatar) return;
        const scale = String(avatarScale(map.getZoom()));
        avatar.el.style.setProperty("--ss-scale", scale);
        avatar.ringEl.style.setProperty("--ss-scale", scale);
      });

      map.on("load", () => {
        // Start the credits collapsed to their small "i" button (MapLibre opens them on wide screens).
        const attrib = containerRef.current?.querySelector(".maplibregl-ctrl-attrib");
        attrib?.classList.remove("maplibregl-compact-show");
        attrib?.removeAttribute("open");

        const line = area.path && area.path.length > 1 ? area.path : area.route.map((w) => w.coordinates);
        map.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: { type: "LineString", coordinates: line.map((p) => [p.lng, p.lat]) },
          },
        });
        map.addLayer({
          id: "route-glow",
          type: "line",
          source: "route",
          layout: { "line-join": "round", "line-cap": "round" },
          paint: { "line-color": "#FFFFFF", "line-width": 10, "line-opacity": 0.8, "line-blur": 2 },
        });
        map.addLayer({
          id: "route-line",
          type: "line",
          source: "route",
          layout: { "line-join": "round", "line-cap": "round" },
          paint: { "line-color": PALETTE.route, "line-width": 5, "line-dasharray": [2, 1.5] },
        });

        for (const waypoint of area.route) {
          const el = makeStopElement(waypoint);
          el.addEventListener("click", (ev) => {
            ev.stopPropagation();
            onPressRef.current?.(waypoint);
            el.classList.add("labelled");
            window.setTimeout(() => el.classList.remove("labelled"), 3000);
          });
          new Marker({ element: el, anchor: "bottom" })
            .setLngLat([waypoint.coordinates.lng, waypoint.coordinates.lat])
            .addTo(map);
          stopsRef.current[waypoint.id] = el;
        }

        if (flyIn) {
          map.flyTo({
            center: [start.lng, start.lat],
            zoom: FOLLOW_ZOOM,
            pitch: FOLLOW_PITCH,
            bearing: -20,
            duration: FLY_IN_MS,
            curve: 1.2,
            essential: true,
          });
        } else if (!userLocation && line.length > 1) {
          // Before the first GPS fix, show the whole route instead of an empty spot.
          const bounds = line.reduce(
            (b, p) => b.extend([p.lng, p.lat]),
            new LngLatBounds([line[0].lng, line[0].lat], [line[0].lng, line[0].lat])
          );
          map.fitBounds(bounds, { padding: 60, pitch: FOLLOW_PITCH, duration: 0 });
        }
        setMapReady(true);
      });
    }

    return () => {
      cancelAnimationFrame(glide.current.frame);
      window.clearTimeout(fadeTimer.current);
      mapRef.current?.remove();
      mapRef.current = null;
      avatarRef.current = null;
      stopsRef.current = {};
    };
    // Built once per tour; later changes flow through the effects below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [area.id]);

  // Stop colours: purple once heard, pulsing + labelled for the one to walk to next.
  useEffect(() => {
    if (!mapReady) return;
    const lastHeard = visitedWaypointIds.includes(area.route[currentWaypointIndex]?.id ?? "");
    const nextIndex = lastHeard ? currentWaypointIndex + 1 : Math.max(0, currentWaypointIndex);
    area.route.forEach((waypoint, i) => {
      const el = stopsRef.current[waypoint.id];
      if (!el) return;
      el.classList.toggle("visited", visitedWaypointIds.includes(waypoint.id));
      el.classList.toggle("next", i === nextIndex);
      if (i === nextIndex) el.classList.add("labelled");
      else if (!el.matches(":hover")) el.classList.remove("labelled");
    });
  }, [mapReady, area, currentWaypointIndex, visitedWaypointIds]);

  // Walker position: glide the avatar to each new fix, one animation frame at a time.
  useEffect(() => {
    const map = mapRef.current;
    if (!mapReady || !map || !userLocation) return;
    const g = glide.current;

    if (!avatarRef.current) {
      const ringEl = document.createElement("div");
      ringEl.className = "ss-ring";
      ringEl.innerHTML = RING_SVG;
      const figureEl = document.createElement("div");
      figureEl.className = "ss-avatar idle";
      figureEl.innerHTML = guideSvg(guide, 56);
      const at: [number, number] = [userLocation.lng, userLocation.lat];
      avatarRef.current = {
        // Lies flat on the ground and turns with the map, like a compass on the floor.
        ring: new Marker({ element: ringEl, pitchAlignment: "map", rotationAlignment: "map" })
          .setLngLat(at)
          .addTo(map),
        // Stands upright facing the camera, feet on the ring's centre.
        figure: new Marker({ element: figureEl, anchor: "bottom", offset: [0, 6] }).setLngLat(at).addTo(map),
        el: figureEl,
        ringEl,
      };
      const scale = String(avatarScale(map.getZoom()));
      figureEl.style.setProperty("--ss-scale", scale);
      ringEl.style.setProperty("--ss-scale", scale);
      // A line said before the first GPS fix (e.g. the greeting) still gets shown.
      const pending = speechRef.current;
      if (pending && Date.now() - pending.id < pending.durationMs) {
        showBubble(figureEl, pending.text, pending.durationMs - (Date.now() - pending.id));
      }
      g.shown = userLocation;
      g.to = userLocation;
      if (followRef.current && !focusRef.current) map.easeTo({ center: at, zoom: FOLLOW_ZOOM, pitch: FOLLOW_PITCH, duration: 800 });
      return;
    }

    const avatar = avatarRef.current;
    const from = g.shown ?? userLocation;
    if (distanceMeters(from, userLocation) >= WALK_STEP_M) {
      g.lastStepAt = performance.now();
      avatar.el.classList.replace("idle", "walking");
    }
    const anchor = g.headingAnchor ?? from;
    if (distanceMeters(anchor, userLocation) >= HEADING_BASELINE_M) {
      g.heading = bearingDegrees(anchor, userLocation);
      avatar.ring.setRotation(g.heading);
      g.headingAnchor = userLocation;
    } else if (!g.headingAnchor) {
      g.headingAnchor = anchor;
    }
    g.bearingFrom = map.getBearing();
    g.from = from;
    g.to = userLocation;
    g.start = performance.now();

    cancelAnimationFrame(g.frame);
    const tick = (now: number) => {
      if (!g.from || !g.to) return;
      const t = Math.min(1, (now - g.start) / GLIDE_MS);
      const e = t * (2 - t); // ease-out
      const pos = {
        lat: g.from.lat + (g.to.lat - g.from.lat) * e,
        lng: g.from.lng + (g.to.lng - g.from.lng) * e,
      };
      g.shown = pos;
      avatar.ring.setLngLat([pos.lng, pos.lat]);
      avatar.figure.setLngLat([pos.lng, pos.lat]);
      // Following turns the map with the walker, so "ahead" is always up the screen.
      if (followRef.current && !focusRef.current) {
        map.jumpTo({
          center: [pos.lng, pos.lat],
          bearing: g.bearingFrom + angleDelta(g.bearingFrom, g.heading) * e,
        });
      }

      if (t < 1) {
        g.frame = requestAnimationFrame(tick);
      } else if (now - g.lastStepAt > WALK_IDLE_MS) {
        avatar.el.classList.replace("walking", "idle");
      }
    };
    g.frame = requestAnimationFrame(tick);

    // No further fix may arrive while standing still, so settle to idle on a timer too.
    const idleTimer = window.setTimeout(() => avatar.el.classList.replace("walking", "idle"), WALK_IDLE_MS);
    return () => window.clearTimeout(idleTimer);
  }, [mapReady, userLocation]);

  // Speech bubble above the avatar: each new line replaces the one showing.
  useEffect(() => {
    const avatar = avatarRef.current;
    if (!speech || !avatar) return;
    return showBubble(avatar.el, speech.text, speech.durationMs);
  }, [speech]);

  // Turn the avatar (and the camera, when following) to face the next stop.
  useEffect(() => {
    const map = mapRef.current;
    const avatar = avatarRef.current;
    if (faceBearing == null || !map || !avatar) return;
    const g = glide.current;
    g.heading = faceBearing;
    avatar.ring.setRotation(faceBearing);
    if (followRef.current && !focusRef.current) map.easeTo({ bearing: faceBearing, duration: 1200 });
  }, [faceBearing]);

  // Stop view: a quick crossfade (no camera fly or spin) to a street-level
  // view of the stop, and the same back to the walker when it's cleared.
  useEffect(() => {
    const map = mapRef.current;
    const root = containerRef.current;
    if (!mapReady || !map || !root) return;

    const crossfade = (cut: () => void) => {
      window.clearTimeout(fadeTimer.current);
      root.style.transition = `opacity ${FADE_OUT_MS}ms ease, transform ${FADE_OUT_MS}ms ease`;
      root.style.opacity = "0";
      root.style.transform = "scale(0.95)";
      fadeTimer.current = window.setTimeout(() => {
        cut();
        root.style.transition = `opacity ${FADE_IN_MS}ms ease, transform ${FADE_IN_MS}ms ease`;
        root.style.opacity = "1";
        root.style.transform = "scale(1)";
      }, FADE_OUT_MS);
    };

    if (focusStop) {
      focusRef.current = true;
      const { lat, lng } = focusStop.coordinates;
      crossfade(() => {
        root.classList.add("ss-detail");
        map.setMaxPitch(DETAIL_MAX_PITCH);
        map.jumpTo({ center: [lng, lat], zoom: DETAIL_ZOOM, pitch: DETAIL_PITCH });
      });
      return;
    }

    if (focusRef.current) {
      focusRef.current = false;
      followRef.current = true;
      setFollowing(true);
      const at = glide.current.shown ?? userLocation;
      crossfade(() => {
        root.classList.remove("ss-detail");
        map.jumpTo({
          ...(at ? { center: [at.lng, at.lat] as [number, number] } : {}),
          zoom: FOLLOW_ZOOM,
          pitch: FOLLOW_PITCH,
          bearing: glide.current.heading,
        });
        map.setMaxPitch(MAX_PITCH);
      });
    }
    // Keyed on the stop, not the object, so re-renders don't restart it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapReady, focusStop?.id]);

  // A different guide chosen (or loaded) after the avatar was drawn.
  useEffect(() => {
    const avatar = avatarRef.current;
    const drawing = avatar?.el.querySelector("svg");
    // Replace only the drawing, so a speech bubble showing stays put.
    if (drawing) drawing.outerHTML = guideSvg(guide, 56);
  }, [guide]);

  const recentre = () => {
    const map = mapRef.current;
    const at = glide.current.shown ?? userLocation;
    followRef.current = true;
    setFollowing(true);
    if (map && at) {
      map.easeTo({ center: [at.lng, at.lat], zoom: FOLLOW_ZOOM, pitch: FOLLOW_PITCH, bearing: glide.current.heading, duration: 600 });
    }
  };

  return (
    <View style={[styles.container, style as StyleProp<ViewStyle>]}>
      <div ref={containerRef} style={{ position: "absolute", inset: 0, background: PALETTE.ground }} />
      {!following && !focusStop && userLocation && (
        <Pressable style={styles.recentre} onPress={recentre} aria-label={t("activeTour.recentre")}>
          <Ionicons name="locate" size={22} color={PALETTE.route} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { overflow: "hidden", position: "relative" },
  recentre: {
    // Bottom-right, above the tour's play controls and subtitles (the top is the tour's HUD).
    position: "absolute",
    bottom: 250,
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
});

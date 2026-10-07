import { setWorkerUrl, type StyleSpecification } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

// Metro (the RN bundler) can't route MapLibre's dynamically-constructed
// module-worker request, so point it at a CDN copy of the exact same
// version's worker bundle instead of letting it resolve locally.
// The live site serves the map engine itself (copied in by
// scripts/build-tour-pages.ts), so it's saved with downloaded tours and works
// offline; the dev server uses the CDN copy of the same version.
setWorkerUrl(__DEV__ ? "https://unpkg.com/maplibre-gl@6.4.1/dist/maplibre-gl-worker.mjs" : "/vendor/maplibre/maplibre-gl-worker.mjs");

// OpenFreeMap's vector tiles give us real road/building/place geometry to lay
// over the satellite imagery (the same feed the tour map uses). It's a
// TileJSON address that MapLibre reads directly.
const VECTOR_TILES_URL = "https://tiles.openfreemap.org/planet";
const GLYPHS_URL = "https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf";

// Esri's World Imagery service — free, no API key, global aerial/satellite
// coverage down to street level in major cities like London and Paris.
const SATELLITE_TILE_URL =
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";

export const EXPLORE_MAP_CREDIT = "Imagery © Esri, Maxar, Earthstar Geographics";

/** The 3D explore map's look: satellite imagery, faint roads, 3D buildings and
 * neighbourhood names. Shared by StoryStep's Explore Map and FoodStep's. */
export function exploreMapStyle(): StyleSpecification {
  return {
    version: 8,
    glyphs: GLYPHS_URL,
    sources: {
      satellite: {
        type: "raster",
        tiles: [SATELLITE_TILE_URL],
        tileSize: 256,
        maxzoom: 19,
        attribution: EXPLORE_MAP_CREDIT,
      },
      openmaptiles: { type: "vector", url: VECTOR_TILES_URL },
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
}

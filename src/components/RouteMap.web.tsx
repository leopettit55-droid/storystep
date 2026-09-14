import { Map as MapLibreMap, LngLatBounds, Marker, type StyleSpecification } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { StyleSheet, View } from "react-native";
import type { RouteMapProps } from "./RouteMap";

// Same free, no-key Esri World Imagery used on the Explore map — real aerial
// photography instead of a schematic grid.
const SATELLITE_TILE_URL =
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";

const SATELLITE_STYLE: StyleSpecification = {
  version: 8,
  sources: {
    satellite: {
      type: "raster",
      tiles: [SATELLITE_TILE_URL],
      tileSize: 256,
      maxzoom: 19,
      attribution: "Imagery © Esri, Maxar, Earthstar Geographics",
    },
  },
  layers: [{ id: "satellite", type: "raster", source: "satellite" }],
};

function makePinElement(color: string): HTMLDivElement {
  const el = document.createElement("div");
  el.style.width = "14px";
  el.style.height = "14px";
  el.style.borderRadius = "50%";
  el.style.background = color;
  el.style.border = "2px solid #FFFFFF";
  el.style.boxShadow = "0 2px 5px rgba(0,0,0,0.45)";
  return el;
}

/** Real satellite map for the web build — MapLibre + Esri imagery, same as the Explore tab. */
export default function RouteMap({ region, pins, polyline, dashedPolyline, style }: RouteMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new MapLibreMap({
      container: containerRef.current,
      style: SATELLITE_STYLE,
      center: [region.lng, region.lat],
      zoom: 15,
      attributionControl: false,
    });
    mapRef.current = map;

    map.on("load", () => {
      pins.forEach((pin) => {
        new Marker({ element: makePinElement(pin.color) })
          .setLngLat([pin.lng, pin.lat])
          .addTo(map);
      });

      if (polyline && polyline.length > 1) {
        map.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: polyline.map((p) => [p.lng, p.lat]),
            },
          },
        });
        map.addLayer({
          id: "route-line",
          type: "line",
          source: "route",
          layout: { "line-join": "round", "line-cap": "round" },
          paint: {
            "line-color": "#4F8CFF",
            "line-width": dashedPolyline ? 3 : 4,
            ...(dashedPolyline ? { "line-dasharray": [2, 2] } : {}),
          },
        });
      }

      const points = polyline && polyline.length > 1 ? polyline : pins.map((p) => ({ lat: p.lat, lng: p.lng }));
      if (points.length > 1) {
        const bounds = points.reduce(
          (b, p) => b.extend([p.lng, p.lat]),
          new LngLatBounds([points[0].lng, points[0].lat], [points[0].lng, points[0].lat])
        );
        map.fitBounds(bounds, { padding: 48, maxZoom: 17, duration: 0 });
      }
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
    // Map is built once from the initial region/pins/polyline; the screens that
    // use this all mount fresh per tour rather than mutating props in place.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={[styles.container, style as StyleProp<ViewStyle>]}>
      <div ref={containerRef} style={{ position: "absolute", inset: 0 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { overflow: "hidden", position: "relative" },
});

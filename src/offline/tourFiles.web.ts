import { Asset } from "expo-asset";
import type { Area, Coordinates } from "../content";
import type { DownloadProgress, DownloadResult } from "./tourFiles";

/**
 * Web offline storage, using the browser's Cache Storage (the same place the
 * service worker in public/sw.js reads from). Each tour gets its own cache, so
 * its size can be measured and it can be deleted on its own; the app itself
 * (page, scripts, fonts, map engine) goes in one shared cache.
 */

const TOUR_CACHE_PREFIX = "storystep-tour-";
const SHELL_CACHE = "storystep-shell";
const tourCache = (areaId: string) => `${TOUR_CACHE_PREFIX}${areaId}`;

/** Map data (vector tiles + label fonts) for Harry's tour map — see TourMap.web.tsx. */
const TILEJSON_URL = "https://tiles.openfreemap.org/planet";
const GLYPHS = "https://tiles.openfreemap.org/fonts/Noto%20Sans%20Regular";
/** Latin, Latin Extended and general punctuation: enough for street and place names. */
const GLYPH_RANGES = ["0-255", "256-511", "8192-8447"];
/** Self-hosted map engine (copied into dist by scripts/build-tour-pages.ts). */
const MAP_WORKER_FILES = ["/vendor/maplibre/maplibre-gl-worker.mjs", "/vendor/maplibre/maplibre-gl-shared.mjs"];
/** Tiles cover the route plus about a kilometre around it (the intro flies in from above). */
const TILE_MARGIN_DEG = 0.01;
/** Typical size of one vector tile, until it's actually downloaded. */
const TILE_SIZE_ESTIMATE = 250_000;
// Two at a time: each file finishes (and is kept if the download is paused or
// the app closes) sooner on a slow connection than if all shared it.
const PARALLEL = 2;

/** On the web nothing ships with the page: tours are fetched as they play. */
export function isBundledTour(_area: Area): boolean {
  return false;
}

export function offlineDownloadsSupported(): boolean {
  return typeof caches !== "undefined" && typeof fetch !== "undefined";
}

const absolute = (url: string) => new URL(url, window.location.origin).href;

function assetUrl(source: number | string | null): string | null {
  if (source == null) return null;
  if (typeof source === "string") return absolute(source);
  try {
    return absolute(Asset.fromModule(source).uri);
  } catch {
    return null;
  }
}

function tileXY(lat: number, lng: number, z: number): [number, number] {
  const n = 2 ** z;
  const x = Math.floor(((lng + 180) / 360) * n);
  const r = (lat * Math.PI) / 180;
  const y = Math.floor(((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * n);
  return [Math.min(n - 1, Math.max(0, x)), Math.min(n - 1, Math.max(0, y))];
}

async function mapTileUrls(points: Coordinates[]): Promise<string[]> {
  const res = await fetch(TILEJSON_URL);
  if (!res.ok) throw new Error(`map index ${res.status}`);
  const tilejson = (await res.json()) as { tiles: string[]; maxzoom?: number };
  const template = tilejson.tiles[0];
  const maxZoom = Math.min(tilejson.maxzoom ?? 14, 14);
  const lats = points.map((p) => p.lat);
  const lngs = points.map((p) => p.lng);
  const north = Math.max(...lats) + TILE_MARGIN_DEG;
  const south = Math.min(...lats) - TILE_MARGIN_DEG;
  const west = Math.min(...lngs) - TILE_MARGIN_DEG;
  const east = Math.max(...lngs) + TILE_MARGIN_DEG;
  const urls: string[] = [];
  for (let z = 0; z <= maxZoom; z++) {
    const [x0, y0] = tileXY(north, west, z);
    const [x1, y1] = tileXY(south, east, z);
    for (let x = x0; x <= x1; x++) {
      for (let y = y0; y <= y1; y++) {
        urls.push(template.replace("{z}", String(z)).replace("{x}", String(x)).replace("{y}", String(y)));
      }
    }
  }
  return urls;
}

/** Everything a tour needs offline, other than the app itself. */
async function tourUrls(area: Area): Promise<{ sameOrigin: string[]; map: string[] }> {
  const sameOrigin = new Set<string>();
  for (const stop of area.route) {
    const url = assetUrl(stop.narration.audioSource);
    if (url) sameOrigin.add(url);
  }
  const image = assetUrl(area.image);
  if (image) sameOrigin.add(image);
  sameOrigin.add(absolute(`/tour/${area.id}/`));

  const points = area.path?.length ? area.path : [area.startingPoint, ...area.route.map((w) => w.coordinates)];
  const map = [TILEJSON_URL, ...GLYPH_RANGES.map((r) => `${GLYPHS}/${r}.pbf`)];
  try {
    map.push(...(await mapTileUrls(points)));
  } catch (e) {
    // Without the map index the tiles can't be listed; narration still works.
    console.warn("[offline] couldn't list map tiles:", e);
  }
  return { sameOrigin: [...sameOrigin], map };
}

/** The app itself: this page, its scripts, styles and fonts, and the map engine. */
function shellUrls(): string[] {
  const urls = new Set<string>([absolute("/"), ...MAP_WORKER_FILES.map(absolute), absolute("/models/penguin.glb")]);
  document.querySelectorAll<HTMLScriptElement>("script[src]").forEach((s) => urls.add(absolute(s.src)));
  document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"][href], link[rel="icon"][href]').forEach((l) =>
    urls.add(absolute(l.href))
  );
  for (const entry of performance.getEntriesByType("resource")) {
    const url = new URL(entry.name);
    if (url.origin === window.location.origin && /^\/(_expo|assets)\//.test(url.pathname) && !/\.(mp3|m4a)$/i.test(url.pathname)) {
      urls.add(url.href);
    }
  }
  return [...urls];
}

async function sizeOf(response: Response): Promise<number> {
  const header = Number(response.headers.get("content-length"));
  if (header > 0) return header;
  return (await response.clone().blob()).size;
}

async function headSize(url: string): Promise<number> {
  try {
    const res = await fetch(url, { method: "HEAD" });
    return Number(res.headers.get("content-length")) || 0;
  } catch {
    return 0;
  }
}

/** Saves the app's own files so it can reopen without a connection. Refreshed on every download. */
export async function saveAppShell(): Promise<void> {
  const cache = await caches.open(SHELL_CACHE);
  await Promise.all(
    shellUrls().map(async (url) => {
      try {
        const res = await fetch(url, { cache: "reload" });
        if (res.ok) await cache.put(url, res);
      } catch {
        // Already saved from an earlier download, or simply unavailable; not fatal.
      }
    })
  );
}

export async function downloadTourFiles(
  area: Area,
  onProgress: (p: DownloadProgress) => void,
  signal: AbortSignal
): Promise<DownloadResult> {
  if (navigator.storage?.persist) void navigator.storage.persist();
  const cache = await caches.open(tourCache(area.id));
  const { sameOrigin, map } = await tourUrls(area);
  const all = [...sameOrigin, ...map];

  // Sizes up front, so progress and time left mean something. Files already
  // saved (a resumed download) count as done straight away.
  const sizes = new Map<string, number>();
  const done = new Set<string>();
  let bytesDone = 0;
  await Promise.all(
    all.map(async (url) => {
      const cached = await cache.match(url);
      if (cached) {
        const size = await sizeOf(cached);
        sizes.set(url, size);
        done.add(url);
        bytesDone += size;
      } else {
        sizes.set(url, map.includes(url) ? TILE_SIZE_ESTIMATE : await headSize(url));
      }
    })
  );
  const total = () => [...sizes.values()].reduce((a, b) => a + b, 0);
  /** Bytes received so far for files still downloading, so the bar moves
   * smoothly instead of jumping a whole (~1 MB) audio file at a time. */
  const partial = new Map<string, number>();
  const inFlight = () => [...partial.values()].reduce((a, b) => a + b, 0);
  let lastReport = 0;
  const report = (force = true) => {
    const now = Date.now();
    if (!force && now - lastReport < 250) return;
    lastReport = now;
    onProgress({ bytesDone: bytesDone + inFlight(), bytesTotal: total(), filesDone: done.size, filesTotal: all.length });
  };
  report();

  const queue = all.filter((url) => !done.has(url));
  const failed: string[] = [];
  const worker = async () => {
    while (queue.length) {
      if (signal.aborted) throw new DOMException("Download paused", "AbortError");
      const url = queue.shift()!;
      try {
        const res = await fetch(url, { signal, cache: "reload" });
        if (!res.ok) throw new Error(String(res.status));
        // Read the body as it arrives to report progress within the file.
        const chunks: BlobPart[] = [];
        const reader = res.body?.getReader();
        if (reader) {
          let received = 0;
          for (;;) {
            const { done: finished, value } = await reader.read();
            if (finished) break;
            chunks.push(value);
            received += value.byteLength;
            partial.set(url, received);
            report(false);
          }
        } else {
          chunks.push(await res.blob());
        }
        partial.delete(url);
        const blob = new Blob(chunks, { type: res.headers.get("content-type") ?? undefined });
        if (blob.size === 0) throw new Error("empty file");
        // Only the type and true size: the body is already decoded, so the
        // server's compression headers would no longer be accurate.
        await cache.put(
          url,
          new Response(blob, {
            headers: {
              "content-type": res.headers.get("content-type") ?? "application/octet-stream",
              "content-length": String(blob.size),
            },
          })
        );
        sizes.set(url, blob.size);
        bytesDone += blob.size;
        done.add(url);
      } catch (e) {
        partial.delete(url);
        if ((e as Error).name === "AbortError") throw e;
        failed.push(url);
      }
      report();
    }
  };
  await Promise.all(Array.from({ length: PARALLEL }, worker));
  if (signal.aborted) throw new DOMException("Download paused", "AbortError");

  await saveAppShell();
  const missingAudio = failed.some((url) => sameOrigin.includes(url));
  return { sizeBytes: bytesDone, complete: !missingAudio, bundled: false };
}

/** Tours with files saved on this device, and how much space each uses.
 * The saved files are the source of truth: the downloads list kept in
 * AsyncStorage can be lost (a crash, or site data cleared) while they stay. */
export async function listSavedTours(): Promise<{ areaId: string; sizeBytes: number }[]> {
  if (!offlineDownloadsSupported()) return [];
  const names = (await caches.keys()).filter((n) => n.startsWith(TOUR_CACHE_PREFIX));
  return Promise.all(
    names.map(async (name) => {
      const cache = await caches.open(name);
      let sizeBytes = 0;
      for (const request of await cache.keys()) {
        const res = await cache.match(request);
        if (res) sizeBytes += await sizeOf(res);
      }
      return { areaId: name.slice(TOUR_CACHE_PREFIX.length), sizeBytes };
    })
  );
}

export async function removeTourFiles(area: Area): Promise<void> {
  await caches.delete(tourCache(area.id));
}

/**
 * The saved copy of a narration file, as an in-memory link the audio player
 * can seek within, or null if it isn't saved (or is empty, i.e. damaged).
 */
export async function savedAudioUrl(source: string): Promise<string | null> {
  if (!offlineDownloadsSupported()) return null;
  try {
    const res = await caches.match(absolute(source));
    if (!res) return null;
    const blob = await res.blob();
    if (blob.size === 0) return null;
    return URL.createObjectURL(blob);
  } catch {
    return null;
  }
}

/** Whether every narration file for a tour is saved and non-empty. */
export async function tourAudioSaved(area: Area): Promise<boolean> {
  if (!offlineDownloadsSupported()) return false;
  const cache = await caches.open(tourCache(area.id));
  for (const stop of area.route) {
    const url = assetUrl(stop.narration.audioSource);
    if (!url) continue;
    const res = await cache.match(url);
    if (!res || (await sizeOf(res)) === 0) return false;
  }
  return true;
}

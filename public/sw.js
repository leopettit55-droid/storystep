/*
 * StoryStep service worker: lets downloaded tours work with no connection.
 *
 * It never saves anything by itself. The app saves files into caches named
 * "storystep-*" when someone downloads a tour (src/offline/tourFiles.web.ts);
 * this only serves those saved copies:
 *
 * - Pages: the live site when there's a connection, otherwise the saved page
 *   (a tour's own page if saved, else the app's home page).
 * - The map index (OpenFreeMap TileJSON): live first, saved copy offline, so
 *   it points at the tile set that was actually saved.
 * - Everything else saved (scripts, fonts, the map engine, tiles, images):
 *   the saved copy first, the network otherwise. Requests for part of a file
 *   (audio seeking) always go to the network; saved narration is played from
 *   memory by the app instead.
 */
const PREFIX = "storystep-";
const MAP_INDEX = "https://tiles.openfreemap.org/planet";

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));

async function fromCache(request, options) {
  const keys = await caches.keys();
  for (const key of keys) {
    if (!key.startsWith(PREFIX)) continue;
    const hit = await (await caches.open(key)).match(request, options);
    if (hit) return hit;
  }
  return undefined;
}

async function page(request) {
  try {
    return await fetch(request);
  } catch (error) {
    const saved =
      (await fromCache(request, { ignoreSearch: true })) ||
      (await fromCache(new URL("/", self.location.origin).href));
    if (saved) return saved;
    throw error;
  }
}

async function networkFirst(request) {
  try {
    return await fetch(request);
  } catch (error) {
    const saved = await fromCache(request);
    if (saved) return saved;
    throw error;
  }
}

async function cacheFirst(request) {
  return (await fromCache(request)) || fetch(request);
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  // The app's own downloads ask for a fresh copy ("reload"): let them through.
  if (request.method !== "GET" || request.headers.has("range") || request.cache === "reload") return;
  const url = new URL(request.url);

  if (request.mode === "navigate") {
    event.respondWith(page(request));
  } else if (url.href === MAP_INDEX) {
    event.respondWith(networkFirst(request));
  } else if (url.origin === self.location.origin || url.hostname === "tiles.openfreemap.org") {
    event.respondWith(cacheFirst(request));
  }
});

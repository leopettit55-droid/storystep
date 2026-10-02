/**
 * Tour photos.
 *
 *   GET    /api/photos?tour=<id>        a tour's gallery: public photos, newest first
 *   GET    /api/photos?mine=1           your own photos, public and private  (signed in)
 *   POST   /api/photos                  share one                            (signed in)
 *          { tourId, stopId, isPublic, seconds?, completedAt, image: base64 JPEG/PNG/WebP }
 *   GET    /api/photos/<id>/image       the picture (private ones only for their owner)
 *   POST   /api/photos/<id>/report      { reason }                            (signed in)
 *   DELETE /api/photos/<id>             your own photo                       (signed in)
 *
 * The location saved with a photo is the stop's location from the server's
 * own tour list, not anything the phone sends. A photo reported by three
 * different people is hidden from galleries until someone reviews it.
 *
 * Missing photos answer 410 and refusals 400, not 404/403: Netlify can treat
 * those as "not handled here" and fall through to the website.
 */
import type { Config } from "@netlify/functions";
import { randomBytes } from "node:crypto";
import { authUser, error, json, photoFiles, preflight, read, tourById, update, type User } from "../lib/social.mts";

const INDEX_KEY = "photos-index";
const MAX_BYTES = 4 * 1024 * 1024;
const PER_DAY = 20;
const HIDE_AFTER_REPORTS = 3;
const GALLERY_LIMIT = 60;

interface Photo {
  id: string;
  uid: string;
  name: string;
  tour: string;
  tourName: string;
  stop: string;
  stopName: string;
  lat: number;
  lng: number;
  isPublic: boolean;
  /** The walk's start-to-finish time, if it counted. */
  seconds: number | null;
  completedAt: number;
  createdAt: number;
  contentType: string;
  reports: { uid: string; reason: string; at: number }[];
  hidden: boolean;
}

interface Index {
  photos: Photo[];
}

const TYPES: Record<string, string> = { "/9j/": "image/jpeg", iVBORw0K: "image/png", UklGR: "image/webp" };

/** What other people see: no reports, no owner-only details. */
function publicView(p: Photo, viewer: User | null) {
  return {
    id: p.id,
    name: p.name,
    tour: p.tour,
    tourName: p.tourName,
    stop: p.stop,
    stopName: p.stopName,
    lat: p.lat,
    lng: p.lng,
    isPublic: p.isPublic,
    seconds: p.seconds,
    completedAt: p.completedAt,
    createdAt: p.createdAt,
    mine: viewer?.id === p.uid,
    hidden: viewer?.id === p.uid ? p.hidden : undefined,
    imageUrl: `/api/photos/${p.id}/image`,
  };
}

async function share(req: Request, user: User) {
  const body = await req.json().catch(() => null);
  const tour = tourById(String(body?.tourId ?? ""));
  if (!tour) return error(400, "Unknown tour");
  const stop = tour.stops.find((s) => s.id === body?.stopId) ?? tour.stops[tour.stops.length - 1];
  const base64 = typeof body?.image === "string" ? body.image.replace(/^data:[^,]+,/, "") : "";
  const contentType = Object.entries(TYPES).find(([sig]) => base64.startsWith(sig))?.[1];
  if (!contentType) return error(400, "Send a JPEG, PNG or WebP photo");
  const bytes = Buffer.from(base64, "base64");
  if (bytes.length === 0 || bytes.length > MAX_BYTES) return error(413, "That photo is too large");

  const now = Date.now();
  const id = randomBytes(9).toString("base64url");
  const seconds = Number.isFinite(Number(body?.seconds)) ? Math.round(Number(body.seconds)) : null;
  const completedAt = Number.isFinite(Number(body?.completedAt)) ? Number(body.completedAt) : now;
  const photo: Photo = {
    id,
    uid: user.id,
    name: user.name,
    tour: tour.id,
    tourName: tour.name,
    stop: stop.id,
    stopName: stop.name,
    lat: stop.lat,
    lng: stop.lng,
    isPublic: body?.isPublic !== false,
    seconds,
    completedAt,
    createdAt: now,
    contentType,
    reports: [],
    hidden: false,
  };

  let tooMany = false;
  await update<Index>(INDEX_KEY, { photos: [] }, (index) => {
    const today = index.photos.filter((p) => p.uid === user.id && now - p.createdAt < 24 * 3600_000).length;
    tooMany = today >= PER_DAY;
    if (!tooMany) index.photos.unshift(photo);
    return index;
  });
  if (tooMany) return error(429, "That's the most photos for one day. Try again tomorrow.");
  const file = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
  await photoFiles().set(id, file, { metadata: { contentType } });
  return json({ photo: publicView(photo, user) }, 201);
}

async function report(req: Request, user: User, id: string) {
  const body = await req.json().catch(() => null);
  const reason = String(body?.reason ?? "").slice(0, 200);
  let found = false;
  await update<Index>(INDEX_KEY, { photos: [] }, (index) => {
    const photo = index.photos.find((p) => p.id === id);
    found = !!photo;
    if (photo && photo.uid !== user.id && !photo.reports.some((r) => r.uid === user.id)) {
      photo.reports.push({ uid: user.id, reason, at: Date.now() });
      if (photo.reports.length >= HIDE_AFTER_REPORTS) photo.hidden = true;
    }
    return index;
  });
  return found ? json({ reported: true }) : error(410, "Photo not found");
}

async function remove(user: User, id: string) {
  let allowed = false;
  await update<Index>(INDEX_KEY, { photos: [] }, (index) => {
    const photo = index.photos.find((p) => p.id === id);
    allowed = !!photo && photo.uid === user.id;
    if (allowed) index.photos = index.photos.filter((p) => p.id !== id);
    return index;
  });
  if (!allowed) return error(400, "You can only delete your own photos");
  await photoFiles().delete(id);
  return json({ deleted: true });
}

async function image(req: Request, id: string) {
  const index = await read<Index>(INDEX_KEY, { photos: [] });
  const photo = index.photos.find((p) => p.id === id);
  if (!photo) return error(410, "Photo not found");
  const visible = photo.isPublic && !photo.hidden;
  if (!visible) {
    const user = await authUser(req);
    if (user?.id !== photo.uid) return error(410, "Photo not found");
  }
  const bytes = await photoFiles().get(id, { type: "arrayBuffer" });
  if (!bytes) return error(410, "Photo not found");
  return new Response(bytes, {
    headers: {
      "content-type": photo.contentType,
      "access-control-allow-origin": "*",
      // Public pictures never change, so browsers can keep them; private ones aren't cached.
      "cache-control": visible ? "public, max-age=31536000, immutable" : "private, no-store",
    },
  });
}

export default async (req: Request) => {
  if (req.method === "OPTIONS") return preflight();
  const url = new URL(req.url);
  const [, , , id, action] = url.pathname.split("/"); // /api/photos/<id>/<action>

  if (id && action === "image" && req.method === "GET") return image(req, id);

  const user = await authUser(req);
  if (req.method === "GET" && !id) {
    const index = await read<Index>(INDEX_KEY, { photos: [] });
    if (url.searchParams.get("mine")) {
      if (!user) return error(401, "Sign in to see your photos");
      return json({ photos: index.photos.filter((p) => p.uid === user.id).map((p) => publicView(p, user)) });
    }
    const tour = url.searchParams.get("tour");
    if (!tour || !tourById(tour)) return error(400, "Pick a tour");
    const photos = index.photos.filter((p) => p.tour === tour && p.isPublic && !p.hidden).slice(0, GALLERY_LIMIT);
    return json({ photos: photos.map((p) => publicView(p, user)) });
  }

  if (!user) return error(401, "Sign in first");
  if (req.method === "POST" && !id) return share(req, user);
  if (req.method === "POST" && id && action === "report") return report(req, user, id);
  if (req.method === "DELETE" && id && !action) return remove(user, id);
  return error(405, "Not supported");
};

export const config: Config = { path: ["/api/photos", "/api/photos/:id", "/api/photos/:id/:action"] };

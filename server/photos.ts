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
 */
import { authUser, CORS, error, json, randomId, tourById, type Env, type User } from "./social";

const MAX_BYTES = 4 * 1024 * 1024;
const PER_DAY = 20;
const HIDE_AFTER_REPORTS = 3;
const GALLERY_LIMIT = 60;

interface PhotoRow {
  id: string;
  uid: string;
  name: string;
  tour: string;
  tour_name: string;
  stop: string;
  stop_name: string;
  lat: number;
  lng: number;
  is_public: number;
  /** The walk's start-to-finish time, if it counted. */
  seconds: number | null;
  completed_at: number;
  created_at: number;
  content_type: string;
  hidden: number;
}

const TYPES: Record<string, string> = { "/9j/": "image/jpeg", iVBORw0K: "image/png", UklGR: "image/webp" };

/** What other people see: no reports, no owner-only details. */
function publicView(p: PhotoRow, viewer: User | null) {
  const mine = viewer?.id === p.uid;
  return {
    id: p.id,
    name: p.name,
    tour: p.tour,
    tourName: p.tour_name,
    stop: p.stop,
    stopName: p.stop_name,
    lat: p.lat,
    lng: p.lng,
    isPublic: p.is_public === 1,
    seconds: p.seconds,
    completedAt: p.completed_at,
    createdAt: p.created_at,
    mine,
    hidden: mine ? p.hidden === 1 : undefined,
    imageUrl: `/api/photos/${p.id}/image`,
  };
}

function decodeBase64(base64: string): Uint8Array {
  const fromBase64 = (Uint8Array as unknown as { fromBase64?: (s: string) => Uint8Array }).fromBase64;
  if (fromBase64) return fromBase64(base64);
  const text = atob(base64);
  const bytes = new Uint8Array(text.length);
  for (let i = 0; i < text.length; i++) bytes[i] = text.charCodeAt(i);
  return bytes;
}

async function share(env: Env, req: Request, user: User): Promise<Response> {
  const body = await req.json<Record<string, unknown>>().catch(() => null);
  const tour = tourById(String(body?.tourId ?? ""));
  if (!tour) return error(400, "Unknown tour");
  const stop = tour.stops.find((s) => s.id === body?.stopId) ?? tour.stops[tour.stops.length - 1];
  const base64 = typeof body?.image === "string" ? body.image.replace(/^data:[^,]+,/, "").replace(/\s/g, "") : "";
  const contentType = Object.entries(TYPES).find(([sig]) => base64.startsWith(sig))?.[1];
  if (!contentType) return error(400, "Send a JPEG, PNG or WebP photo");
  if (base64.length > Math.ceil(MAX_BYTES / 3) * 4) return error(413, "That photo is too large");
  let bytes: Uint8Array;
  try {
    bytes = decodeBase64(base64);
  } catch {
    return error(400, "Send a JPEG, PNG or WebP photo");
  }
  if (bytes.length === 0 || bytes.length > MAX_BYTES) return error(413, "That photo is too large");

  const now = Date.now();
  const id = randomId(9);
  const seconds = body?.seconds != null && Number.isFinite(Number(body.seconds)) ? Math.round(Number(body.seconds)) : null;
  const completedAt = Number.isFinite(Number(body?.completedAt)) ? Number(body?.completedAt) : now;

  // The file first, so a listed photo always has a picture; it's removed again if the day's limit is reached.
  await env.PHOTOS.put(id, bytes, { metadata: { contentType } });
  // One statement, so several uploads at once can't get past the daily limit.
  const result = await env.DB.prepare(
    `INSERT INTO photos (id, uid, name, tour, tour_name, stop, stop_name, lat, lng, is_public, seconds, completed_at, created_at, content_type)
     SELECT ?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14
     WHERE (SELECT COUNT(*) FROM photos WHERE uid = ?2 AND created_at > ?15) < ?16`
  )
    .bind(
      id, user.id, user.name, tour.id, tour.name, stop.id, stop.name, stop.lat, stop.lng,
      body?.isPublic === false ? 0 : 1, seconds, completedAt, now, contentType,
      now - 24 * 3600_000, PER_DAY
    )
    .run();
  if (result.meta.changes === 0) {
    await env.PHOTOS.delete(id);
    return error(429, "That's the most photos for one day. Try again tomorrow.");
  }
  const photo = await env.DB.prepare("SELECT * FROM photos WHERE id = ?").bind(id).first<PhotoRow>();
  return json({ photo: publicView(photo!, user) }, 201);
}

async function report(env: Env, req: Request, user: User, id: string): Promise<Response> {
  const photo = await env.DB.prepare("SELECT uid FROM photos WHERE id = ?").bind(id).first<{ uid: string }>();
  if (!photo) return error(404, "Photo not found");
  if (photo.uid !== user.id) {
    const body = await req.json<Record<string, unknown>>().catch(() => null);
    const reason = String(body?.reason ?? "").slice(0, 200);
    await env.DB.batch([
      env.DB.prepare("INSERT OR IGNORE INTO photo_reports (photo_id, uid, reason, at) VALUES (?, ?, ?, ?)").bind(id, user.id, reason, Date.now()),
      env.DB.prepare(
        "UPDATE photos SET hidden = 1 WHERE id = ?1 AND (SELECT COUNT(*) FROM photo_reports WHERE photo_id = ?1) >= ?2"
      ).bind(id, HIDE_AFTER_REPORTS),
    ]);
  }
  return json({ reported: true });
}

async function remove(env: Env, user: User, id: string): Promise<Response> {
  const result = await env.DB.prepare("DELETE FROM photos WHERE id = ? AND uid = ?").bind(id, user.id).run();
  if (result.meta.changes === 0) return error(403, "You can only delete your own photos");
  await env.DB.prepare("DELETE FROM photo_reports WHERE photo_id = ?").bind(id).run();
  await env.PHOTOS.delete(id);
  return json({ deleted: true });
}

async function image(env: Env, req: Request, id: string): Promise<Response> {
  const photo = await env.DB.prepare("SELECT uid, is_public, hidden, content_type FROM photos WHERE id = ?")
    .bind(id)
    .first<Pick<PhotoRow, "uid" | "is_public" | "hidden" | "content_type">>();
  if (!photo) return error(404, "Photo not found");
  const visible = photo.is_public === 1 && photo.hidden === 0;
  if (!visible) {
    const user = await authUser(env, req);
    if (user?.id !== photo.uid) return error(404, "Photo not found");
  }
  const bytes = await env.PHOTOS.get(id, "arrayBuffer");
  if (!bytes) return error(404, "Photo not found");
  return new Response(bytes, {
    headers: {
      "content-type": photo.content_type,
      "access-control-allow-origin": CORS["access-control-allow-origin"],
      // Public pictures never change, so browsers can keep them; private ones aren't cached.
      "cache-control": visible ? "public, max-age=31536000, immutable" : "private, no-store",
    },
  });
}

/** `parts` is the path after /api/photos: [] or [id] or [id, action]. */
export async function handlePhotos(env: Env, req: Request, parts: string[]): Promise<Response> {
  const [id, action] = parts;
  if (parts.length > 2) return error(404, "Not found");
  if (id && action === "image" && req.method === "GET") return image(env, req, id);

  const user = await authUser(env, req);
  if (req.method === "GET" && !id) {
    const url = new URL(req.url);
    if (url.searchParams.get("mine")) {
      if (!user) return error(401, "Sign in to see your photos");
      const { results } = await env.DB.prepare("SELECT * FROM photos WHERE uid = ? ORDER BY created_at DESC")
        .bind(user.id)
        .all<PhotoRow>();
      return json({ photos: results.map((p) => publicView(p, user)) });
    }
    const tour = url.searchParams.get("tour");
    if (!tour || !tourById(tour)) return error(400, "Pick a tour");
    const { results } = await env.DB.prepare(
      "SELECT * FROM photos WHERE tour = ? AND is_public = 1 AND hidden = 0 ORDER BY created_at DESC LIMIT ?"
    )
      .bind(tour, GALLERY_LIMIT)
      .all<PhotoRow>();
    return json({ photos: results.map((p) => publicView(p, user)) });
  }

  if (!user) return error(401, "Sign in first");
  if (req.method === "POST" && !id) return share(env, req, user);
  if (req.method === "POST" && id && action === "report") return report(env, req, user, id);
  if (req.method === "DELETE" && id && !action) return remove(env, user, id);
  return error(405, "Not supported");
}

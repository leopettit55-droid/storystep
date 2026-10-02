/**
 * Shared server code for StoryStep's social features (Netlify Functions +
 * Netlify Blobs): who's who, safe updates to shared records, and the tour
 * list the server trusts (generated at build time from src/content, so the
 * phone can't invent a tour, a stop or a location).
 */
import { getStore } from "@netlify/blobs";
import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import tours from "./tours.generated.json" with { type: "json" };

export interface TourMeta {
  id: string;
  name: string;
  city: string;
  distanceKm: number;
  stops: { id: string; name: string; lat: number; lng: number }[];
}

export const TOURS = tours as TourMeta[];
export const tourById = (id: string) => TOURS.find((t) => t.id === id);

/** Leaderboard, users and the photo list. */
export const db = () => getStore({ name: "social", consistency: "strong" });
/** The photo files themselves. */
export const photoFiles = () => getStore({ name: "photos" });

// --- responses --------------------------------------------------------------

const CORS = {
  "access-control-allow-origin": "*",
  "access-control-allow-headers": "authorization, content-type",
  "access-control-allow-methods": "GET, POST, DELETE, OPTIONS",
};

export function json(body: unknown, status = 200, extra: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", ...CORS, ...extra },
  });
}

export const error = (status: number, message: string) => json({ error: message }, status);
export const preflight = () => new Response(null, { status: 204, headers: CORS });

// --- safe read-modify-write ---------------------------------------------------

/**
 * Applies `change` to a shared JSON record, retrying if someone else saved it
 * in between (so two people finishing at once can't overwrite each other).
 */
export async function update<T>(key: string, empty: T, change: (current: T) => T): Promise<T> {
  const store = db();
  for (let attempt = 0; attempt < 8; attempt++) {
    const found = await store.getWithMetadata(key, { type: "json" });
    const current = (found?.data as T | undefined) ?? structuredClone(empty);
    const next = change(current);
    const result = found
      ? await store.setJSON(key, next, { onlyIfMatch: found.etag })
      : await store.setJSON(key, next, { onlyIfNew: true });
    if (result.modified) return next;
    await new Promise((r) => setTimeout(r, 40 + Math.random() * 120));
  }
  throw new Error(`busy: ${key}`);
}

export async function read<T>(key: string, empty: T): Promise<T> {
  return ((await db().get(key, { type: "json" })) as T | null) ?? empty;
}

// --- users --------------------------------------------------------------------

export interface User {
  id: string;
  name: string;
  /** SHA-256 of the user's secret key; the key itself is never stored. */
  keyHash: string;
  createdAt: number;
}

const hash = (s: string) => createHash("sha256").update(s).digest("hex");

export function cleanName(name: unknown): string | null {
  if (typeof name !== "string") return null;
  const trimmed = name.replace(/\s+/g, " ").trim().slice(0, 40);
  return trimmed.length >= 1 ? trimmed : null;
}

export async function createUser(name: string): Promise<{ user: User; key: string }> {
  const id = randomBytes(9).toString("base64url");
  const key = randomBytes(24).toString("base64url");
  const user: User = { id, name, keyHash: hash(key), createdAt: Date.now() };
  await db().setJSON(`users/${id}`, user);
  return { user, key };
}

/** The signed-in user, from "Authorization: Bearer <userId>.<key>". */
export async function authUser(req: Request): Promise<User | null> {
  const header = req.headers.get("authorization") ?? "";
  const match = /^Bearer ([\w-]{6,40})\.([\w-]{20,80})$/.exec(header);
  if (!match) return null;
  const user = (await db().get(`users/${match[1]}`, { type: "json" })) as User | null;
  if (!user) return null;
  const given = Buffer.from(hash(match[2]), "hex");
  const stored = Buffer.from(user.keyHash, "hex");
  return given.length === stored.length && timingSafeEqual(given, stored) ? user : null;
}

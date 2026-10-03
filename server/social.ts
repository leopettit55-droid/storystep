/**
 * Shared server code for StoryStep's social features (Cloudflare Pages
 * Functions + D1 + KV): who's who, responses, and the tour list the server
 * trusts (generated at build time from src/content, so the phone can't invent
 * a tour, a stop or a location).
 */
import tours from "./tours.generated.json";

export interface Env {
  /** Users, finished tours, photo details and reports (migrations/). */
  DB: D1Database;
  /** The photo files themselves, keyed by photo id. */
  PHOTOS: KVNamespace;
  /** "Walk with a friend" rooms (duo/room.ts, deployed as the storystep-duo Worker). */
  DUO: DurableObjectNamespace;
}

export interface TourMeta {
  id: string;
  name: string;
  city: string;
  distanceKm: number;
  stops: { id: string; name: string; lat: number; lng: number }[];
}

export const TOURS = tours as TourMeta[];
export const tourById = (id: string) => TOURS.find((t) => t.id === id);

// --- responses --------------------------------------------------------------

export const CORS = {
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

// --- ids and hashing ----------------------------------------------------------

function base64url(bytes: Uint8Array): string {
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export const randomId = (bytes: number) => base64url(crypto.getRandomValues(new Uint8Array(bytes)));

async function sha256Hex(s: string): Promise<string> {
  const digest = new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s)));
  return [...digest].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** Compares without stopping at the first difference, so timing gives nothing away. */
function sameText(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

// --- users --------------------------------------------------------------------

export interface User {
  id: string;
  name: string;
}

export function cleanName(name: unknown): string | null {
  if (typeof name !== "string") return null;
  const trimmed = name.replace(/\s+/g, " ").trim().slice(0, 40);
  return trimmed.length >= 1 ? trimmed : null;
}

export async function createUser(env: Env, name: string): Promise<{ user: User; key: string }> {
  const id = randomId(9);
  const key = randomId(24);
  await env.DB.prepare("INSERT INTO users (id, name, key_hash, created_at) VALUES (?, ?, ?, ?)")
    .bind(id, name, await sha256Hex(key), Date.now())
    .run();
  return { user: { id, name }, key };
}

/** The signed-in user, from "Authorization: Bearer <userId>.<key>". */
export async function authUser(env: Env, req: Request): Promise<User | null> {
  const header = req.headers.get("authorization") ?? "";
  const match = /^Bearer ([\w-]{6,40})\.([\w-]{20,80})$/.exec(header);
  if (!match) return null;
  const row = await env.DB.prepare("SELECT id, name, key_hash FROM users WHERE id = ?")
    .bind(match[1])
    .first<{ id: string; name: string; key_hash: string }>();
  if (!row) return null;
  return sameText(await sha256Hex(match[2]), row.key_hash) ? { id: row.id, name: row.name } : null;
}

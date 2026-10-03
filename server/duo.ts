/**
 * Walk with a friend: the website's side of the duo rooms (duo/room.ts).
 *
 *   POST /api/duo                 { tourId, guide? }  start an invite -> { code, ... }   (signed in)
 *   GET  /api/duo/<code>          what the invite is: tour, who sent it, status
 *   POST /api/duo/<code>/join     accept it                                       (signed in)
 *   GET  /api/duo/<code>/socket?auth=<userId>.<key>   the walk's live connection (WebSocket)
 *   GET  /api/duo/stats?tour=<id> how many pairs have finished a tour together
 *
 * Browsers can't send headers when opening a WebSocket, so the socket's
 * sign-in comes in the address; it's checked here and only the user's id and
 * name are passed to the room.
 */
import { authUser, error, json, tourById, type Env } from "./social";

/** No 0/O or 1/I/L, so a code read out loud or off a screen can't be mistaken. */
const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
const CODE_RE = /^[A-HJKMNP-Z2-9]{6}$/;

function newCode(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  return [...bytes].map((b) => CODE_ALPHABET[b % CODE_ALPHABET.length]).join("");
}

const room = (env: Env, code: string) => env.DUO.get(env.DUO.idFromName(code));

/** Calls the room and passes its answer on, with the usual headers. */
async function ask(env: Env, code: string, path: string, body?: unknown): Promise<Response> {
  const res = await room(env, code).fetch(`https://duo${path}`, {
    method: body ? "POST" : "GET",
    headers: body ? { "content-type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  return json(await res.json(), res.status);
}

async function create(env: Env, req: Request): Promise<Response> {
  const user = await authUser(env, req);
  if (!user) return error(401, "Sign in to walk with a friend");
  const body = await req.json<Record<string, unknown>>().catch(() => null);
  const tour = tourById(String(body?.tourId ?? ""));
  if (!tour) return error(400, "Unknown tour");
  const guide = typeof body?.guide === "string" ? body.guide.slice(0, 40) : "";
  // A code still in use answers 409; try another.
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = newCode();
    const res = await room(env, code).fetch("https://duo/create", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ code, tour: tour.id, guide, uid: user.id, name: user.name }),
    });
    if (res.status !== 409) return json(await res.json(), res.status === 200 ? 201 : res.status);
  }
  return error(503, "Couldn't make an invite. Please try again.");
}

async function stats(env: Env, req: Request): Promise<Response> {
  const tour = new URL(req.url).searchParams.get("tour") ?? "";
  if (!tourById(tour)) return error(400, "Pick a tour");
  const row = await env.DB.prepare("SELECT COUNT(*) AS n FROM duo_completions WHERE tour = ?").bind(tour).first<{ n: number }>();
  return json({ tour, duos: row?.n ?? 0 }, 200, { "cache-control": "public, max-age=60" });
}

/** `parts` is the path after /api/duo. */
export async function handleDuo(env: Env, req: Request, parts: string[]): Promise<Response> {
  const [code, action] = parts;
  if (!code) return req.method === "POST" ? create(env, req) : error(405, "Use POST");
  if (code === "stats" && !action && req.method === "GET") return stats(env, req);

  const upper = code.toUpperCase();
  if (!CODE_RE.test(upper)) return error(404, "That code isn't right. Check it and try again.");

  if (!action && req.method === "GET") return ask(env, upper, "/info");

  if (action === "join" && req.method === "POST") {
    const user = await authUser(env, req);
    if (!user) return error(401, "Sign in to join the walk");
    return ask(env, upper, "/join", { uid: user.id, name: user.name });
  }

  if (action === "socket" && req.method === "GET") {
    const url = new URL(req.url);
    const signedIn = new Request(req.url, { headers: { authorization: `Bearer ${url.searchParams.get("auth") ?? ""}` } });
    const user = await authUser(env, signedIn);
    if (!user) return error(401, "Sign in to join the walk");
    const target = `https://duo/socket?uid=${encodeURIComponent(user.id)}&name=${encodeURIComponent(user.name)}`;
    return room(env, upper).fetch(new Request(target, req));
  }

  return error(405, "Not supported");
}

/**
 * StoryStep's social server: every /api/* request on the website lands here
 * (Cloudflare Pages Functions) and is handed to the code in server/.
 *
 *   POST /api/register       server/social.ts
 *   POST /api/completions    server/completions.ts
 *   GET  /api/leaderboard    server/leaderboard.ts
 *   *    /api/photos/...     server/photos.ts
 *   *    /api/duo/...        server/duo.ts (Walk with a friend)
 */
import { recordCompletion } from "../../server/completions";
import { handleDuo } from "../../server/duo";
import { getLeaderboard } from "../../server/leaderboard";
import { handlePhotos } from "../../server/photos";
import { cleanName, createUser, error, json, preflight, type Env } from "../../server/social";

async function register(env: Env, req: Request): Promise<Response> {
  const body = await req.json<Record<string, unknown>>().catch(() => null);
  const name = cleanName(body?.name);
  if (!name) return error(400, "A name is needed");
  const { user, key } = await createUser(env, name);
  return json({ userId: user.id, key });
}

export const onRequest: PagesFunction<Env> = async ({ request, env, waitUntil }) => {
  if (request.method === "OPTIONS") return preflight();
  const [route, ...rest] = new URL(request.url).pathname.split("/").filter(Boolean).slice(1);
  try {
    if (route === "register" && rest.length === 0) {
      return request.method === "POST" ? register(env, request) : error(405, "Use POST");
    }
    if (route === "completions" && rest.length === 0) {
      return request.method === "POST" ? recordCompletion(env, request) : error(405, "Use POST");
    }
    if (route === "leaderboard" && rest.length === 0) {
      return request.method === "GET" ? getLeaderboard(env, request, waitUntil) : error(405, "Use GET");
    }
    if (route === "photos") return handlePhotos(env, request, rest);
    if (route === "duo") return handleDuo(env, request, rest);
    return error(404, "Not found");
  } catch (e) {
    console.error(e);
    return error(500, "Something went wrong");
  }
};

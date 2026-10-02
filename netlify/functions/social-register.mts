/**
 * POST /api/register  { name }  ->  { userId, key }
 *
 * Gives an account on a device its identity on the leaderboard and in the
 * photo galleries. The key is shown once and kept on the device; the server
 * only stores its hash.
 */
import type { Config } from "@netlify/functions";
import { cleanName, createUser, error, json, preflight } from "../lib/social.mts";

export default async (req: Request) => {
  if (req.method === "OPTIONS") return preflight();
  if (req.method !== "POST") return error(405, "Use POST");
  const body = await req.json().catch(() => null);
  const name = cleanName(body?.name);
  if (!name) return error(400, "A name is needed");
  const { user, key } = await createUser(name);
  return json({ userId: user.id, key });
};

export const config: Config = { path: "/api/register" };

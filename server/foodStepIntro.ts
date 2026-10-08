/**
 * Scout's spoken welcome on a FoodStep map ("Hi there. Welcome to Oxford. Let
 * me show you some Mexican options in Oxford."), in his tour voice. The words
 * are the speech bubble's (foodStep.welcome), so the two always match.
 *
 *   POST /api/foodstep-intro  { cityId, cuisineId }
 *     -> { text, audioUrl, duration, cached }
 *
 * Only known cities and cuisines are spoken, so there's a fixed, small set of
 * clips: each is made once per Scout voice and kept in KV (PHOTOS, "food:intro:" keys).
 * Secret: GOOGLE_TTS_API_KEY. Without it, or if it fails, audioUrl is null.
 */
import { getFoodStepCity, getFoodStepCuisine } from "../src/content/foodStep";
import en from "../src/i18n/translations/en";
import { reply, speak, voiceTag, type Cached } from "./guideAnswer";
import { error, json, type Env } from "./social";

export async function foodStepIntro(env: Env, req: Request, waitUntil: (p: Promise<unknown>) => void): Promise<Response> {
  const body = await req.json<Record<string, unknown>>().catch(() => null);
  const city = typeof body?.cityId === "string" ? getFoodStepCity(body.cityId) : undefined;
  const cuisine = city && typeof body?.cuisineId === "string" ? getFoodStepCuisine(city, body.cuisineId) : undefined;
  if (!city || !cuisine) return error(404, "Unknown city or cuisine");

  const text = en.foodStep.welcome.replaceAll("{{city}}", city.name).replaceAll("{{cuisine}}", cuisine.name);
  const cacheKey = `food:intro:${voiceTag("scout", "en")}:${city.id}:${cuisine.id}`;
  const log: Record<string, unknown> = { event: "foodstep-intro", city: city.id, cuisine: cuisine.id };

  const cached = await env.PHOTOS.get<Cached>(cacheKey, "json").catch(() => null);
  if (cached?.transcript === text) return json({ text, ...introOf(cached), cached: true });

  const audio = await speak(env, text, "scout", "en", log);
  if (!audio) console.log(JSON.stringify(log));
  else waitUntil(env.PHOTOS.put(cacheKey, JSON.stringify({ transcript: text, audio } satisfies Cached)).catch(() => {}));
  return json({ text, ...introOf({ transcript: text, audio }), cached: false });
}

function introOf(clip: Cached) {
  const { audioUrl, duration } = reply(clip, "claude", false);
  return { audioUrl, duration };
}

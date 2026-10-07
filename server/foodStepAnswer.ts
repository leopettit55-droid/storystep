/**
 * FoodStep's "Ask your guide": on a city's cuisine map, a visitor types a
 * question and Scout answers it as a food guide; Google Cloud Text-to-Speech
 * reads the answer out. The same set-up as Ask your guide on tours
 * (server/guideAnswer.ts), whose voice, cache and limit code this reuses.
 *
 *   POST /api/foodstep-question  { question, cityId, cuisineId, guideId, language? }
 *     -> { audioUrl, transcript, duration, source, cached }
 *
 * Secrets: ANTHROPIC_API_KEY, GOOGLE_TTS_API_KEY (the same ones). Answers are
 * cached for a month and questions limited to 5 per visitor per city and
 * cuisine per hour, in KV (PHOTOS, "qa:food:" keys). Every question logs one
 * "foodstep-answer" line for latency and cost (`wrangler pages deployment tail`).
 */
import Anthropic from "@anthropic-ai/sdk";
import { getFoodStepCity, getFoodStepCuisine, type FoodStepCity, type FoodStepCuisine } from "../src/content/foodStep";
import { restaurantsFor } from "../src/content/foodStepRestaurants";
import { zonesFor } from "../src/content/foodStepZones";
import { isNarrationLanguage } from "../src/guides/voices";
import { GUIDES, hash, normalise, reply, speak, type Cached, type Source } from "./guideAnswer";
import { error, json, type Env } from "./social";

/** Haiku for speed and cost, like Ask your guide on tours: answers are short. */
const MODEL = "claude-haiku-4-5";
/** Answers are spoken, so keep them short enough to listen to on the spot. */
const MAX_WORDS = 70;
const MAX_QUESTION_CHARS = 300;
/** Questions per visitor (IP) per city and cuisine, per hour. */
const PER_PLACE_LIMIT = 5;
const RATE_WINDOW_S = 60 * 60;
/** The same question about the same cuisine in the same city is reused for a month. */
const CACHE_TTL_S = 30 * 24 * 60 * 60;

export async function answerFoodStepQuestion(
  env: Env,
  req: Request,
  waitUntil: (p: Promise<unknown>) => void
): Promise<Response> {
  const body = await req.json<Record<string, unknown>>().catch(() => null);
  const question = typeof body?.question === "string" ? body.question.trim().slice(0, MAX_QUESTION_CHARS) : "";
  const city = typeof body?.cityId === "string" ? getFoodStepCity(body.cityId) : undefined;
  const cuisine = city && typeof body?.cuisineId === "string" ? getFoodStepCuisine(city, body.cuisineId) : undefined;
  const guideId = typeof body?.guideId === "string" && body.guideId in GUIDES ? body.guideId : "scout";
  const language = typeof body?.language === "string" && isNarrationLanguage(body.language) ? body.language : "en";
  if (question.length < 3) return error(400, "Ask a question first");
  if (!city || !cuisine) return error(404, "Unknown city or cuisine");

  const log: Record<string, unknown> = { event: "foodstep-answer", city: city.id, cuisine: cuisine.id, guide: guideId, language, question };
  const ip = req.headers.get("cf-connecting-ip") ?? "unknown";
  const rateKey = `qa:food:rate:${ip}:${city.id}:${cuisine.id}`;
  try {
    const asked = Number((await env.PHOTOS.get(rateKey)) ?? 0);
    if (asked >= PER_PLACE_LIMIT) {
      console.log(JSON.stringify({ ...log, limited: true }));
      return json({ error: "That's all the questions for now. Try again in an hour!", code: "limit" }, 429);
    }
    await env.PHOTOS.put(rateKey, String(asked + 1), { expirationTtl: RATE_WINDOW_S });
  } catch (e) {
    // The limit is a guard, not the feature: if the store is down, still answer.
    log.rateLimitError = e instanceof Error ? e.message : String(e);
  }

  const cacheKey = `qa:food:answer:${city.id}:${cuisine.id}:${guideId}${language === "en" ? "" : `:${language}`}:${await hash(normalise(question))}`;
  const cached = await env.PHOTOS.get<Cached>(cacheKey, "json").catch((e: unknown) => {
    log.cacheError = e instanceof Error ? e.message : String(e);
    return null;
  });
  if (cached) {
    const answer = reply(cached, "claude", true);
    console.log(JSON.stringify({ ...log, cached: true, answer: cached.transcript, voiceSeconds: answer.duration }));
    return json(answer);
  }

  const started = Date.now();
  const { text: transcript, source } = await writeAnswer(env, city, cuisine, guideId, language, question, log);
  log.claudeMs = Date.now() - started;
  const ttsStarted = Date.now();
  const audio = await speak(env, transcript, guideId, language, log);
  log.ttsMs = Date.now() - ttsStarted;
  log.ttsChars = audio ? transcript.length : 0;
  const answer = reply({ transcript, audio }, source, false);
  console.log(JSON.stringify({ ...log, cached: false, source, answer: transcript, voiceSeconds: answer.duration }));

  // Only keep real answers that came with their audio.
  if (source === "claude" && audio) {
    waitUntil(
      env.PHOTOS.put(cacheKey, JSON.stringify({ transcript, audio } satisfies Cached), { expirationTtl: CACHE_TTL_S }).catch(
        (e: unknown) => console.warn("foodstep-answer: couldn't save the answer", e)
      )
    );
  }
  return json(answer);
}

async function writeAnswer(
  env: Env,
  city: FoodStepCity,
  cuisine: FoodStepCuisine,
  guideId: string,
  language: string,
  question: string,
  log: Record<string, unknown>
): Promise<{ text: string; source: Source }> {
  const guide = GUIDES[guideId];
  if (!env.ANTHROPIC_API_KEY) {
    log.claudeError = "no key";
    return { text: fallbackAnswer(city, cuisine, language), source: "fallback" };
  }
  const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY, maxRetries: 1, timeout: 30_000 });
  const restaurants = restaurantsFor(city.id, cuisine.id);
  // Where the map has restaurant pins, Scout can recommend those, and only those.
  const places = restaurants.length
    ? `The map shows these restaurants, which you may recommend by name:\n\n<restaurants>\n` +
      restaurants
        .map((r) => {
          const area = zonesFor(city.id).find((z) => z.id === r.zone)?.name;
          return `${r.name} (${r.style})${area ? `, in ${area}` : ""}, ${r.address}: ${r.description}`;
        })
        .join("\n") +
      `\n</restaurants>\n\nDon't name any other restaurants, cafes or addresses, and don't invent details about these beyond what's above. `
    : `Don't name specific restaurants, cafes or addresses; FoodStep doesn't have its restaurant listings here yet, ` +
      `so talk about areas, dishes and habits instead, and if they ask for a particular place, say you'll be able to show them soon. `;
  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 400,
      system:
        `You are ${guide.name}, ${guide.persona}, a food guide on FoodStep, StoryStep's food exploring app. ` +
        `The visitor is looking at a 3D map of ${city.name}, ${city.country}, and has chosen ${cuisine.name} ` +
        `(${cuisine.description.toLowerCase()}). Answer their question about ${cuisine.name} food and eating out in ${city.name} ` +
        `in your distinctive voice: the dishes to try, how and when locals eat it, what to expect when ordering, ` +
        `dietary needs, and how it fits ${city.name}'s food culture. ` +
        places +
        `Keep answers under ${MAX_WORDS} words: answer the question first, in two to four short sentences, and let your ` +
        `character come through in how you say it rather than in extra lines. They're read aloud, so write plain spoken sentences with no lists, headings, ` +
        `markdown or emoji. Only give a fact, date or price if you're certain of it; if you're not sure, say so plainly rather than guess. ` +
        (language === "es" ? `Answer in Spanish as spoken in Spain, using informal tú, whatever language the question is in. ` : "") +
        `If the question has nothing to do with food or eating out in ${city.name}, or isn't suitable for a family audience, ` +
        `gently bring them back to ${cuisine.name} food.`,
      messages: [{ role: "user", content: `${question}\n\nCity: ${city.name}. Cuisine: ${cuisine.name}.` }],
    });
    log.inputTokens = response.usage.input_tokens;
    log.outputTokens = response.usage.output_tokens;
    log.model = response.model;
    const text = response.content
      .flatMap((block) => (block.type === "text" ? [block.text] : []))
      .join(" ")
      // It's spoken and shown as plain text: drop any markdown emphasis that slips through.
      .replace(/[*_#`]+/g, "")
      .trim();
    if (response.stop_reason === "refusal" || !text) {
      log.claudeError = response.stop_reason === "refusal" ? "refusal" : "empty";
      return { text: fallbackAnswer(city, cuisine, language), source: "fallback" };
    }
    return { text, source: "claude" };
  } catch (e) {
    if (e instanceof Anthropic.RateLimitError) log.claudeError = "rate limited";
    else if (e instanceof Anthropic.AuthenticationError) log.claudeError = "bad key";
    else if (e instanceof Anthropic.APIError) log.claudeError = `api ${e.status}`;
    else log.claudeError = e instanceof Error ? e.message : String(e);
    return { text: fallbackAnswer(city, cuisine, language), source: "fallback" };
  }
}

/** When Claude can't answer: a friendly line about the cuisine. */
function fallbackAnswer(city: FoodStepCity, cuisine: FoodStepCuisine, language = "en"): string {
  if (language === "es") {
    return `¡Buena pregunta! Ahora mismo no puedo comprobarlo, pero en ${city.name} la cocina ${cuisine.name} va de esto: ${cuisine.description.toLowerCase()}.`;
  }
  return `Good question! I can't look that up right now, but ${cuisine.name} in ${city.name} is all about ${cuisine.description.toLowerCase()}.`;
}

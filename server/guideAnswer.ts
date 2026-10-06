/**
 * "Ask your guide" (test feature, Magdalen College only): a visitor types a
 * question at a stop, Claude answers in the chosen guide's voice from that
 * stop's script, and Google Cloud Text-to-Speech reads the answer out.
 *
 *   POST /api/guide-answer  { question, currentStop, tourId, guideId }
 *     -> { audioUrl, transcript, duration, source, cached }
 *
 * Only tours with `enableInteractiveGuide` (src/content) are answered: the
 * build writes those tours' stop scripts into tours.generated.json.
 *
 * Secrets (wrangler pages secret put …): ANTHROPIC_API_KEY, GOOGLE_TTS_API_KEY.
 * Without Claude the guide gives a pre-written reply; without text-to-speech
 * the answer comes back as text only (audioUrl null). Every answer logs one
 * "guide-answer" line with timings and usage, for latency and cost
 * (`wrangler pages deployment tail`).
 */
import Anthropic from "@anthropic-ai/sdk";
import { error, json, tourById, type Env, type TourMeta } from "./social";

const MODEL = "claude-opus-5-5";
/** One neutral British voice for every guide for now. */
const VOICE = { languageCode: "en-GB", name: "en-GB-Neural2-B" };
const MAX_QUESTION_CHARS = 300;
/** Questions per visitor (IP) per stop, per hour. */
const PER_STOP_LIMIT = 5;
const RATE_WINDOW_S = 60 * 60;
/** Answers to the same question at the same stop are reused for a month. */
const CACHE_TTL_S = 30 * 24 * 60 * 60;

const GUIDES: Record<string, { name: string; persona: string }> = {
  scout: { name: "Scout", persona: "the StoryStep original: friendly, upbeat and always up for a walk" },
  pip: { name: "Pip", persona: "a cheerful penguin who never gets lost: warm, bright and encouraging" },
  hoot: { name: "Professor Hoot", persona: "a wise old owl with a head full of history: thoughtful and precise" },
  ollie: { name: "Ollie", persona: "a cheeky young explorer who knows every shortcut: playful and quick" },
};

type Stop = TourMeta["stops"][number];
type Source = "claude" | "fallback";
interface Cached {
  transcript: string;
  audio: string | null;
}

export async function answerGuideQuestion(
  env: Env,
  req: Request,
  waitUntil: (p: Promise<unknown>) => void
): Promise<Response> {
  const body = await req.json<Record<string, unknown>>().catch(() => null);
  const question = typeof body?.question === "string" ? body.question.trim().slice(0, MAX_QUESTION_CHARS) : "";
  const tour = typeof body?.tourId === "string" ? tourById(body.tourId) : undefined;
  const guideId = typeof body?.guideId === "string" && body.guideId in GUIDES ? body.guideId : "scout";
  const stopNumber = Number(body?.currentStop);
  if (question.length < 3) return error(400, "Ask a question first");
  if (!tour?.interactiveGuide) return error(404, "Ask your guide isn't available on this tour");
  const stop = Number.isInteger(stopNumber) ? tour.stops[stopNumber - 1] : undefined;
  if (!stop?.script) return error(400, "Unknown stop");

  const ip = req.headers.get("cf-connecting-ip") ?? "unknown";
  const rateKey = `qa:rate:${ip}:${tour.id}:${stop.id}`;
  const asked = Number((await env.PHOTOS.get(rateKey)) ?? 0);
  if (asked >= PER_STOP_LIMIT) {
    return json({ error: "That's all the questions for this stop. Try again at the next one!", code: "limit" }, 429);
  }
  await env.PHOTOS.put(rateKey, String(asked + 1), { expirationTtl: RATE_WINDOW_S });

  const log: Record<string, unknown> = { event: "guide-answer", tour: tour.id, stop: stop.id, guide: guideId };
  const cacheKey = `qa:answer:${tour.id}:${stop.id}:${guideId}:${await hash(normalise(question))}`;
  const cached = await env.PHOTOS.get<Cached>(cacheKey, "json");
  if (cached) {
    console.log(JSON.stringify({ ...log, cached: true }));
    return json(reply(cached, "claude", true));
  }

  const started = Date.now();
  const { text: transcript, source } = await writeAnswer(env, tour, stop, guideId, question, log);
  log.claudeMs = Date.now() - started;
  const ttsStarted = Date.now();
  const audio = await speak(env, transcript, log);
  log.ttsMs = Date.now() - ttsStarted;
  log.ttsChars = transcript.length;
  console.log(JSON.stringify({ ...log, cached: false, source, audio: !!audio }));

  // Only keep real answers that came with their audio.
  if (source === "claude" && audio) {
    waitUntil(env.PHOTOS.put(cacheKey, JSON.stringify({ transcript, audio } satisfies Cached), { expirationTtl: CACHE_TTL_S }));
  }
  return json(reply({ transcript, audio }, source, false));
}

function reply({ transcript, audio }: Cached, source: Source, cached: boolean) {
  return {
    audioUrl: audio ? `data:audio/mpeg;base64,${audio}` : null,
    transcript,
    duration: audio ? mp3Seconds(audio) : 0,
    source,
    cached,
  };
}

async function writeAnswer(
  env: Env,
  tour: TourMeta,
  stop: Stop,
  guideId: string,
  question: string,
  log: Record<string, unknown>
): Promise<{ text: string; source: Source }> {
  const guide = GUIDES[guideId];
  if (!env.ANTHROPIC_API_KEY) {
    log.claudeError = "no key";
    return { text: fallbackAnswer(stop), source: "fallback" };
  }
  const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY, maxRetries: 1, timeout: 20_000 });
  const stopNumber = tour.stops.indexOf(stop) + 1;
  try {
    const response = await client.beta.messages.create({
      model: MODEL,
      max_tokens: 2000,
      output_config: { effort: "low" },
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system:
        `You are ${guide.name}, ${guide.persona}, guiding a visitor around StoryStep's walking tour of ${tour.name}, ${tour.city}. ` +
        `They're at stop ${stopNumber} of ${tour.stops.length}: ${stop.name}. This is what you've just told them here:\n\n` +
        `<stop_script>\n${stop.script}\n</stop_script>\n\n` +
        `Answer their question in character. Your words are read aloud, so write 2 to 4 short spoken sentences ` +
        `(under 80 words) with no lists, headings, markdown or emoji. Use what the stop script says and well-established facts; ` +
        `if you're not sure, say so plainly rather than guess. If the question has nothing to do with the tour, or isn't ` +
        `suitable for a family audience, gently bring them back to what's around them.`,
      messages: [{ role: "user", content: question }],
    });
    log.inputTokens = response.usage.input_tokens;
    log.outputTokens = response.usage.output_tokens;
    log.model = response.model;
    const text = response.content
      .flatMap((block) => (block.type === "text" ? [block.text] : []))
      .join(" ")
      .trim();
    if (response.stop_reason === "refusal" || !text) {
      log.claudeError = response.stop_reason === "refusal" ? "refusal" : "empty";
      return { text: fallbackAnswer(stop), source: "fallback" };
    }
    return { text, source: "claude" };
  } catch (e) {
    if (e instanceof Anthropic.RateLimitError) log.claudeError = "rate limited";
    else if (e instanceof Anthropic.AuthenticationError) log.claudeError = "bad key";
    else if (e instanceof Anthropic.APIError) log.claudeError = `api ${e.status}`;
    else log.claudeError = e instanceof Error ? e.message : String(e);
    return { text: fallbackAnswer(stop), source: "fallback" };
  }
}

/** When Claude can't answer: a friendly line plus the stop's opening fact. */
function fallbackAnswer(stop: Stop): string {
  const opening = (stop.script ?? "").split(/(?<=[.!?])\s+/)[0] ?? "";
  return `Good question! I can't look that up right now, but here's something about ${stop.name}: ${opening}`.trim();
}

/** The answer as MP3 (base64), or null if text-to-speech isn't set up or fails. */
async function speak(env: Env, text: string, log: Record<string, unknown>): Promise<string | null> {
  if (!env.GOOGLE_TTS_API_KEY) {
    log.ttsError = "no key";
    return null;
  }
  try {
    const res = await fetch("https://texttospeech.googleapis.com/v1/text:synthesize", {
      method: "POST",
      headers: { "content-type": "application/json", "x-goog-api-key": env.GOOGLE_TTS_API_KEY },
      body: JSON.stringify({ input: { text }, voice: VOICE, audioConfig: { audioEncoding: "MP3" } }),
    });
    if (!res.ok) {
      log.ttsError = `google ${res.status}: ${(await res.text()).slice(0, 200)}`;
      return null;
    }
    const data = await res.json<{ audioContent?: string }>();
    return data.audioContent ?? null;
  } catch (e) {
    log.ttsError = e instanceof Error ? e.message : String(e);
    return null;
  }
}

/** Length of a constant-bitrate MP3, from its first frame header. */
function mp3Seconds(base64: string): number {
  const bytes = Uint8Array.from(atob(base64.slice(0, 4096)), (c) => c.charCodeAt(0));
  const total = Math.floor((base64.length * 3) / 4);
  // MPEG-2/2.5 Layer III bitrates (kbps), which is what 24 kHz speech uses; MPEG-1 for 32–48 kHz.
  const V2 = [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160];
  const V1 = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320];
  for (let i = 0; i + 2 < bytes.length; i++) {
    if (bytes[i] !== 0xff || (bytes[i + 1] & 0xe0) !== 0xe0) continue;
    const mpeg1 = (bytes[i + 1] & 0x18) === 0x18;
    const kbps = (mpeg1 ? V1 : V2)[bytes[i + 2] >> 4];
    if (kbps) return Math.round(((total - i) * 8) / (kbps * 1000) * 10) / 10;
  }
  return 0;
}

const normalise = (q: string) => q.toLowerCase().replace(/[^a-z0-9 ]+/g, "").replace(/\s+/g, " ").trim();

async function hash(text: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(digest).slice(0, 12)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Records every stop's narration in each guide's voice, in each narration
 * language (voices in src/guides/voices.ts; guides with recordsTours there),
 * with Google Cloud Text-to-Speech, plus each guide's short "hello" for the
 * guide picker. English has no suffix; other languages add theirs:
 *
 *   public/audio/<tour id>-stop<n>-<guide>.mp3        (English)
 *   public/audio/<tour id>-stop<n>-<guide>.es.mp3     (Spanish)
 *   public/audio/guide-preview-<guide>[.es].mp3
 *
 * Other languages record from the translated scripts
 * (src/content/narration/scripts, made by scripts/translate-scripts.ts);
 * stops not yet translated are skipped.
 *
 * The app plays a guide's recording whenever one exists (see
 * scripts/build-narration-cues.ts, which times the subtitles — run it after
 * this). A recording is only remade when its script or voice changes
 * (public/audio/guide-voices.json), so re-running costs only what's new.
 *
 *   npx tsx scripts/build-guide-voices.ts               every tour
 *   npx tsx scripts/build-guide-voices.ts oxford-magdalen   one tour
 *   npx tsx scripts/build-guide-voices.ts oxford-magdalen --stop=1   one stop
 *   npx tsx scripts/build-guide-voices.ts --lang=es     one language
 *   npx tsx scripts/build-guide-voices.ts --dry-run     list what would be made
 *
 * Needs GOOGLE_TTS_API_KEY, from the environment or .dev.vars (git-ignored).
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { GUIDES } from "../src/guides/guides";
import { scriptIn } from "../src/content/narration/scripts";
import { GUIDE_PREVIEW_LINES, GUIDE_VOICES, NARRATION_LANGUAGES, type NarrationLanguage } from "../src/guides/voices";

// The tour files `require()` images and audio for the bundler; here a require of an asset returns its path.
for (const ext of [".jpg", ".jpeg", ".png", ".webp", ".mp3", ".m4a", ".wav", ".glb"]) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require.extensions[ext] = (module, filename) => {
    module.exports = filename;
  };
}
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { areas } = require("../src/content") as typeof import("../src/content");

const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public/audio");
const MANIFEST = path.join(OUT_DIR, "guide-voices.json");
const PARALLEL = 4;

interface Job {
  file: string;
  text: string;
  language: NarrationLanguage;
  guide: (typeof GUIDES)[number]["id"];
}

function apiKey(): string {
  if (process.env.GOOGLE_TTS_API_KEY) return process.env.GOOGLE_TTS_API_KEY;
  const vars = path.join(ROOT, ".dev.vars");
  const line = fs.existsSync(vars)
    ? fs.readFileSync(vars, "utf8").split("\n").find((l) => l.startsWith("GOOGLE_TTS_API_KEY="))
    : undefined;
  const key = line?.slice("GOOGLE_TTS_API_KEY=".length).trim().replace(/^["']|["']$/g, "");
  if (!key) throw new Error("No GOOGLE_TTS_API_KEY: add it to .dev.vars (see wrangler.toml).");
  return key;
}

/** What a recording was made from: when this changes, it's remade. */
function fingerprint(job: Job): string {
  const voice = GUIDE_VOICES[job.language][job.guide];
  return crypto.createHash("sha256").update(`${voice.name}|${voice.speakingRate}|${job.text}`).digest("hex").slice(0, 16);
}

async function synthesize(key: string, job: Job): Promise<Buffer> {
  const voice = GUIDE_VOICES[job.language][job.guide];
  for (let attempt = 1; ; attempt++) {
    const res = await fetch("https://texttospeech.googleapis.com/v1/text:synthesize", {
      method: "POST",
      headers: { "content-type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        input: { text: job.text },
        voice: { languageCode: voice.languageCode, name: voice.name },
        audioConfig: { audioEncoding: "MP3", speakingRate: voice.speakingRate },
      }),
    });
    if (res.ok) {
      const { audioContent } = (await res.json()) as { audioContent?: string };
      if (!audioContent) throw new Error(`${job.file}: no audio in the response`);
      return Buffer.from(audioContent, "base64");
    }
    // Rate limits and hiccups are worth a few retries; anything else isn't.
    if ((res.status === 429 || res.status >= 500) && attempt < 4) {
      await new Promise((r) => setTimeout(r, attempt * 2000));
      continue;
    }
    throw new Error(`${job.file}: Google ${res.status} ${(await res.text()).slice(0, 200)}`);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const only = args.find((a) => !a.startsWith("--"));
  const stopArg = args.find((a) => a.startsWith("--stop="));
  const onlyStop = stopArg ? Number(stopArg.slice("--stop=".length)) : null;
  const langArg = args.find((a) => a.startsWith("--lang="))?.slice("--lang=".length);
  const languages = NARRATION_LANGUAGES.filter((l) => !langArg || l === langArg);

  const jobs: Job[] = [];
  let untranslated = 0;
  for (const language of languages) {
    const suffix = language === "en" ? "" : `.${language}`;
    const recorded = GUIDES.filter((g) => GUIDE_VOICES[language][g.id].recordsTours);
    for (const area of areas) {
      if (only && area.id !== only) continue;
      for (const waypoint of area.route) {
        if (onlyStop != null && waypoint.order !== onlyStop) continue;
        const text = scriptIn(waypoint, language);
        if (!text) {
          untranslated += 1;
          continue;
        }
        for (const guide of recorded) {
          jobs.push({ file: `${area.id}-stop${waypoint.order}-${guide.id}${suffix}.mp3`, text, language, guide: guide.id });
        }
      }
    }
    if (!only) {
      for (const guide of recorded) {
        jobs.push({ file: `guide-preview-${guide.id}${suffix}.mp3`, text: GUIDE_PREVIEW_LINES[language][guide.id], language, guide: guide.id });
      }
    }
  }
  if (untranslated) console.log(`${untranslated} stops skipped: not translated yet (scripts/translate-scripts.ts).`);

  const manifest: Record<string, string> = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, "utf8")) : {};
  const todo = jobs.filter((j) => manifest[j.file] !== fingerprint(j) || !fs.existsSync(path.join(OUT_DIR, j.file)));
  const chars = todo.reduce((n, j) => n + j.text.length, 0);
  console.log(`${jobs.length} recordings, ${todo.length} to make (${chars.toLocaleString()} characters).`);
  if (dryRun || todo.length === 0) return;

  const key = apiKey();
  fs.mkdirSync(OUT_DIR, { recursive: true });
  let done = 0;
  let failed = 0;
  const queue = [...todo];
  const save = () => fs.writeFileSync(MANIFEST, JSON.stringify(Object.fromEntries(Object.entries(manifest).sort()), null, 2) + "\n");
  await Promise.all(
    Array.from({ length: PARALLEL }, async () => {
      for (let job = queue.shift(); job; job = queue.shift()) {
        try {
          fs.writeFileSync(path.join(OUT_DIR, job.file), await synthesize(key, job));
          manifest[job.file] = fingerprint(job);
          done += 1;
          if (done % 20 === 0) {
            save();
            console.log(`  ${done}/${todo.length}`);
          }
        } catch (e) {
          failed += 1;
          console.warn(`  ${e instanceof Error ? e.message : e}`);
        }
      }
    })
  );
  save();
  console.log(`Made ${done} recordings${failed ? `, ${failed} failed (re-run to retry)` : ""}. Now run: npx tsx scripts/build-narration-cues.ts`);
  if (failed) process.exitCode = 1;
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});

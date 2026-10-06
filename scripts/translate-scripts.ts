/**
 * Translates every stop's narration script into another language with
 * Claude, for the guides to record (scripts/build-guide-voices.ts) and the
 * subtitles to show. Writes src/content/narration/scripts/<language>.ts.
 *
 * Each translation remembers a fingerprint of the English it came from, so
 * re-running only translates stops that are new or whose English changed.
 *
 *   npx tsx scripts/translate-scripts.ts es               every tour
 *   npx tsx scripts/translate-scripts.ts es mayfair       one tour
 *   npx tsx scripts/translate-scripts.ts es --dry-run     list what would be translated
 *
 * Needs ANTHROPIC_API_KEY, from the environment or .dev.vars (git-ignored).
 * Have a fluent speaker read the result before it goes live: these are facts.
 */
import Anthropic from "@anthropic-ai/sdk";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import type { TranslatedScript } from "../src/content/narration/scripts";

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
const MODEL = "claude-opus-5-5";
const PARALLEL = 4;

/** How each language is written for listeners. */
const LANGUAGES: Record<string, string> = {
  es: "Spanish as spoken in Spain (castellano), using informal tú",
};

export const fingerprint = (english: string) => crypto.createHash("sha256").update(english).digest("hex").slice(0, 16);
const paragraphs = (text: string) => text.split(/\n\s*\n/).filter((p) => p.trim()).length;

function apiKey(): string {
  if (process.env.ANTHROPIC_API_KEY) return process.env.ANTHROPIC_API_KEY;
  const vars = path.join(ROOT, ".dev.vars");
  const line = fs.existsSync(vars)
    ? fs.readFileSync(vars, "utf8").split("\n").find((l) => l.startsWith("ANTHROPIC_API_KEY="))
    : undefined;
  const key = line?.slice("ANTHROPIC_API_KEY=".length).trim().replace(/^["']|["']$/g, "");
  if (!key) throw new Error("No ANTHROPIC_API_KEY: add it to .dev.vars.");
  return key;
}

async function translate(client: Anthropic, language: string, tourName: string, city: string, stopName: string, english: string) {
  const want = paragraphs(english);
  for (let attempt = 1; attempt <= 2; attempt++) {
    const response = await client.beta.messages.create({
      model: MODEL,
      max_tokens: 8000,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system:
        `You translate the narration of StoryStep walking tours into ${LANGUAGES[language]}. ` +
        `The text is read aloud by a tour guide and shown as subtitles, so it must sound natural spoken, warm and clear. ` +
        `Keep every fact, date, number and name exactly as in the English; don't add, drop or explain anything. ` +
        `Keep proper names of places and people in their usual form for this language (keep English names that have no ` +
        `common translation). Where the English explains English spelling or pronunciation, keep that explanation so it ` +
        `still makes sense to this listener. Keep exactly the same paragraphs, separated by a blank line. ` +
        `Reply with only the translation.`,
      messages: [
        {
          role: "user",
          content: `Tour: ${tourName}, ${city}. Stop: ${stopName}. Translate:\n\n${english}`,
        },
      ],
    });
    if (response.stop_reason === "refusal") throw new Error(`${stopName}: refused`);
    const text = response.content
      .flatMap((b) => (b.type === "text" ? [b.text] : []))
      .join("")
      .trim();
    if (text && paragraphs(text) === want) return text;
    console.warn(`  ${stopName}: ${paragraphs(text)} paragraphs, wanted ${want}${attempt === 1 ? " — retrying" : ""}`);
  }
  throw new Error(`${stopName}: couldn't keep the paragraphs`);
}

async function main() {
  const args = process.argv.slice(2);
  const [language, only] = args.filter((a) => !a.startsWith("--"));
  const dryRun = args.includes("--dry-run");
  if (!language || !LANGUAGES[language]) throw new Error(`Say which language: ${Object.keys(LANGUAGES).join(", ")}`);

  const file = path.join(ROOT, "src/content/narration/scripts", `${language}.ts`);
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const existing: Record<string, TranslatedScript> = fs.existsSync(file) ? { ...require(file)[language] } : {};

  const jobs = areas
    .filter((a) => !only || a.id === only)
    .flatMap((a) => a.route.map((w) => ({ area: a, waypoint: w, english: w.narration.scriptText })))
    .filter(({ waypoint, english }) => existing[waypoint.id]?.from !== fingerprint(english));
  const chars = jobs.reduce((n, j) => n + j.english.length, 0);
  console.log(`${jobs.length} stops to translate into ${language} (${chars.toLocaleString()} characters of English).`);
  if (dryRun || jobs.length === 0) return;

  const client = new Anthropic({ apiKey: apiKey() });
  const results = { ...existing };
  let done = 0;
  let failed = 0;
  const write = () => {
    const body = Object.keys(results)
      .sort()
      .map((id) => `  ${JSON.stringify(id)}: ${JSON.stringify(results[id])},`)
      .join("\n");
    fs.writeFileSync(
      file,
      `// Made by scripts/translate-scripts.ts. Hand fixes are kept until that stop's English changes.\n` +
        `import type { TranslatedScript } from ".";\n\nexport const ${language}: Record<string, TranslatedScript> = {\n${body}\n};\n`
    );
  };
  const queue = [...jobs];
  await Promise.all(
    Array.from({ length: PARALLEL }, async () => {
      for (let job = queue.shift(); job; job = queue.shift()) {
        try {
          const text = await translate(client, language, job.area.name, job.area.city, job.waypoint.name, job.english);
          results[job.waypoint.id] = { from: fingerprint(job.english), text };
          done += 1;
          if (done % 10 === 0) {
            write();
            console.log(`  ${done}/${jobs.length}`);
          }
        } catch (e) {
          failed += 1;
          console.warn(`  ${e instanceof Error ? e.message : e}`);
        }
      }
    })
  );
  write();
  console.log(`Translated ${done} stops${failed ? `, ${failed} failed (re-run to retry)` : ""} into ${path.relative(ROOT, file)}.`);
  if (failed) process.exitCode = 1;
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});

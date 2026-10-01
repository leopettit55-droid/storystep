/**
 * Times the narration subtitles against the recorded audio.
 *
 * There are no timestamps for when each sentence is spoken, so this decodes
 * each stop's recording, finds the narrator's pauses, and picks the pauses
 * that best fit the sentence breaks: each sentence's share of the words sets
 * roughly how long it should last, and paragraph breaks line up with the
 * recording's long pauses. The result is each sentence's start time, written
 * to src/content/narration/cues.ts for the app's subtitles.
 *
 * Guides can also have their own voice for a stop: an mp3 in public/audio/
 * named <tour id>-stop<stop number>-<guide id>.mp3 (e.g.
 * oxford-harry-potter-stop1-pip.mp3, guides being scout, pip, hoot, ollie). Each
 * one found is timed too and listed in GUIDE_RECORDINGS, which the app uses
 * instead of the standard recording when that guide is chosen.
 *
 * Re-run after a recording or script changes, or a tour is added:
 *   npx tsx scripts/build-narration-cues.ts
 */
import fs from "node:fs";
import path from "node:path";
import { MPEGDecoder } from "mpg123-decoder";
import { paragraphStarts, splitSentences } from "../src/content/narration/sentences";

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "src/content/narration/cues.ts");
const GUIDE_AUDIO_DIR = path.join(ROOT, "public/audio");
const GUIDE_FILE = /^(.+)-stop(\d+)-(scout|pip|hoot|ollie)\.mp3$/;

// The tour files `require()` images and audio for the bundler. Here we only
// need to know which file each one is, so a require of an asset returns its path.
for (const ext of [".jpg", ".jpeg", ".png", ".webp", ".mp3", ".m4a", ".wav", ".glb"]) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require.extensions[ext] = (module, filename) => {
    module.exports = filename;
  };
}
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { areas } = require("../src/content") as typeof import("../src/content");

/** Analysis window, and how quiet/long a stretch must be to count as a pause. */
const WINDOW_S = 0.02;
const MIN_PAUSE_S = 0.15;
/** Pauses at least this long are the gaps between paragraphs. */
const PARAGRAPH_PAUSE_S = 1.2;
/** Cost of putting a paragraph break on a short pause, or a mid-paragraph break on a long one. */
const PARAGRAPH_MISMATCH_COST = 25;

interface Pause {
  /** When speech resumes — the moment the next sentence's subtitle should appear. */
  end: number;
  length: number;
}

function findPauses(samples: Float32Array, sampleRate: number): { pauses: Pause[]; duration: number } {
  const win = Math.round(sampleRate * WINDOW_S);
  const levels: number[] = [];
  for (let i = 0; i + win <= samples.length; i += win) {
    let sum = 0;
    for (let j = i; j < i + win; j++) sum += samples[j] * samples[j];
    levels.push(Math.sqrt(sum / win));
  }
  // "Quiet" is relative to the recording's own noise floor.
  const floor = [...levels].sort((a, b) => a - b)[Math.floor(levels.length * 0.1)];
  const threshold = Math.max(floor * 3, 0.01);
  const pauses: Pause[] = [];
  let start = -1;
  levels.forEach((level, i) => {
    if (level < threshold) {
      if (start < 0) start = i;
    } else if (start >= 0) {
      const length = (i - start) * WINDOW_S;
      if (length >= MIN_PAUSE_S) pauses.push({ end: i * WINDOW_S, length });
      start = -1;
    }
  });
  return { pauses, duration: samples.length / sampleRate };
}

/**
 * Chooses one pause per sentence break (in order) to minimise how far each
 * sentence's length strays from what its word count predicts.
 */
function alignSentences(sentences: string[], paragraphs: Set<number>, pauses: Pause[], duration: number): number[] {
  const n = sentences.length;
  if (n <= 1) return [0];
  // Leading silence isn't a sentence break.
  const speechStart = pauses[0] && pauses[0].end - pauses[0].length < 0.05 ? pauses[0].end : 0;
  const candidates = pauses.filter((p) => p.end > speechStart + 0.3 && p.end < duration - 0.3);
  const chars = sentences.map((s) => s.length);
  const longPauses = candidates.filter((p) => p.length >= PARAGRAPH_PAUSE_S).reduce((t, p) => t + p.length, 0);
  const secondsPerChar = (duration - speechStart - longPauses) / chars.reduce((a, b) => a + b, 0);
  const expected = (k: number) =>
    chars[k] * secondsPerChar + (paragraphs.has(k + 1) ? longPauses / Math.max(1, paragraphs.size - 1) : 0.3);
  const fit = (k: number, from: number, to: number) => {
    const want = expected(k);
    return ((to - from - want) ** 2) / want;
  };
  const breakCost = (k: number, p: Pause) =>
    paragraphs.has(k) !== p.length >= PARAGRAPH_PAUSE_S ? PARAGRAPH_MISMATCH_COST : 0;

  // cost[k][j]: best cost with sentence k starting at candidate j.
  const G = candidates.length;
  const cost: number[][] = Array.from({ length: n }, () => new Array(G).fill(Infinity));
  const prev: number[][] = Array.from({ length: n }, () => new Array(G).fill(-1));
  for (let j = 0; j < G; j++) cost[1][j] = fit(0, speechStart, candidates[j].end) + breakCost(1, candidates[j]);
  for (let k = 2; k < n; k++) {
    for (let j = k - 1; j < G; j++) {
      for (let i = k - 2; i < j; i++) {
        if (cost[k - 1][i] === Infinity) continue;
        const c = cost[k - 1][i] + fit(k - 1, candidates[i].end, candidates[j].end) + breakCost(k, candidates[j]);
        if (c < cost[k][j]) {
          cost[k][j] = c;
          prev[k][j] = i;
        }
      }
    }
  }
  let best = -1;
  let bestCost = Infinity;
  for (let j = 0; j < G; j++) {
    const c = cost[n - 1][j] + fit(n - 1, candidates[j]?.end ?? 0, duration);
    if (c < bestCost) {
      bestCost = c;
      best = j;
    }
  }
  // Not enough pauses to separate every sentence: spread them by length instead.
  if (best < 0) {
    let t = speechStart;
    return chars.map((c) => {
      const at = t;
      t += c * secondsPerChar;
      return at;
    });
  }
  const starts = new Array<number>(n).fill(0);
  for (let k = n - 1, j = best; k >= 1; k--) {
    starts[k] = candidates[j].end;
    j = prev[k][j];
  }
  return starts.map((t) => Math.round(t * 10) / 10);
}

async function timeRecording(file: string, script: string): Promise<number[]> {
  // A fresh decoder per file: reusing one across files fails partway through.
  const decoder = new MPEGDecoder();
  await decoder.ready;
  const { channelData, sampleRate } = decoder.decode(new Uint8Array(fs.readFileSync(file)));
  decoder.free();
  const { pauses, duration } = findPauses(channelData[0], sampleRate);
  return alignSentences(splitSentences(script), paragraphStarts(script), pauses, duration);
}

async function main() {
  /** Keyed by waypoint id for the standard recording, or "<waypoint id>@<guide>" for a guide's own. */
  const cues: Record<string, number[]> = {};
  for (const area of areas) {
    for (const waypoint of area.route) {
      const audio = waypoint.narration.audioSource;
      if (typeof audio !== "string" || !audio.endsWith(".mp3")) continue;
      cues[waypoint.id] = await timeRecording(audio, waypoint.narration.scriptText);
      console.log(`${area.id}/${waypoint.id}: ${cues[waypoint.id].length} sentences`);
    }
  }

  const guideRecordings: Record<string, Record<string, string>> = {};
  const files = fs.existsSync(GUIDE_AUDIO_DIR) ? fs.readdirSync(GUIDE_AUDIO_DIR).sort() : [];
  for (const file of files) {
    const match = GUIDE_FILE.exec(file);
    if (!match) continue;
    const [, areaId, stopNumber, guide] = match;
    const waypoint = areas.find((a) => a.id === areaId)?.route.find((w) => w.order === Number(stopNumber));
    if (!waypoint) {
      console.warn(`  public/audio/${file}: no stop ${stopNumber} in a tour called "${areaId}" — skipped`);
      continue;
    }
    cues[`${waypoint.id}@${guide}`] = await timeRecording(path.join(GUIDE_AUDIO_DIR, file), waypoint.narration.scriptText);
    (guideRecordings[waypoint.id] ??= {})[guide] = `/audio/${file}`;
    console.log(`${areaId} stop ${stopNumber}, ${guide}'s voice: timed`);
  }

  const body = Object.entries(cues)
    .map(([id, starts]) => `  ${JSON.stringify(id)}: [${starts.join(", ")}],`)
    .join("\n");
  const recordings = Object.entries(guideRecordings)
    .map(([id, byGuide]) => `  ${JSON.stringify(id)}: ${JSON.stringify(byGuide)},`)
    .join("\n");
  fs.writeFileSync(
    OUT,
    `// Generated by scripts/build-narration-cues.ts — do not edit by hand.\n` +
      `/** When each subtitle sentence starts in its stop's recording (seconds): keyed by waypoint id,\n` +
      ` * or "<waypoint id>@<guide id>" for a guide's own recording. */\n` +
      `export const NARRATION_CUES: Record<string, number[]> = {\n${body}\n};\n\n` +
      `/** Guides' own recordings of a stop (web paths, served from public/audio), keyed by waypoint id then guide id. */\n` +
      `export const GUIDE_RECORDINGS: Record<string, Partial<Record<string, string>>> = {\n${recordings}\n};\n`
  );
  console.log(
    `Wrote ${Object.keys(cues).length} recordings (${Object.keys(guideRecordings).length} stops with guide voices) to ${path.relative(ROOT, OUT)}`
  );

  // Translated subtitles need exactly one line per English sentence, or the
  // app falls back to English for that stop.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { SUBTITLE_TRANSLATIONS } = require("../src/content/narration") as typeof import("../src/content/narration");
  const scripts = new Map(areas.flatMap((a) => a.route.map((w) => [w.id, w.narration.scriptText] as const)));
  let problems = 0;
  for (const [language, stops] of Object.entries(SUBTITLE_TRANSLATIONS)) {
    for (const [id, lines] of Object.entries(stops)) {
      const script = scripts.get(id);
      const want = script ? splitSentences(script).length : 0;
      if (lines.length !== want) {
        problems += 1;
        console.warn(`  ${language}/${id}: ${lines.length} lines, but the English has ${want} sentences`);
      }
    }
  }
  console.log(problems ? `${problems} subtitle translation(s) out of step (shown in English until fixed)` : "All subtitle translations line up.");
}

void main();

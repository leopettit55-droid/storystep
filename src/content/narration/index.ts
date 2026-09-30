import type { Waypoint } from "../schema";
import { NARRATION_CUES } from "./cues";
import { splitSentences } from "./sentences";
import { es } from "./subtitles/es";
import { fr } from "./subtitles/fr";
import { zh } from "./subtitles/zh";

/**
 * Subtitles for the recorded (English) narration. Each stop's script is split
 * into sentences, timed against its recording (cues.ts, generated), and shown
 * in the walker's language where a translation exists — otherwise in English.
 * Add a language by adding a file to subtitles/ with one line per sentence.
 */
export const SUBTITLE_TRANSLATIONS: Record<string, Record<string, string[]>> = { es, fr, zh };

export interface SubtitleTrack {
  /** Seconds into the recording at which each line starts. */
  starts: number[];
  lines: string[];
}

export function subtitleTrack(waypoint: Waypoint, language: string): SubtitleTrack | null {
  const starts = NARRATION_CUES[waypoint.id];
  if (!starts) return null;
  const english = splitSentences(waypoint.narration.scriptText);
  const translated = SUBTITLE_TRANSLATIONS[language]?.[waypoint.id];
  // A translation that's fallen out of step with the script (lines added or
  // removed) would caption the wrong sentence — show English instead.
  const lines = translated && translated.length === english.length ? translated : english;
  return starts.length === lines.length ? { starts, lines } : null;
}

/** The line being spoken `seconds` into the recording. */
export function subtitleIndexAt(track: SubtitleTrack, seconds: number): number {
  let index = 0;
  // A touch early reads better than late: the line lands as the voice starts.
  while (index + 1 < track.starts.length && track.starts[index + 1] <= seconds + 0.2) index += 1;
  return index;
}

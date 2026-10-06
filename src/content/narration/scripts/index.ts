import type { Waypoint } from "../../schema";
import { es } from "./es";

/**
 * The stops' narration scripts in other languages, made by
 * scripts/translate-scripts.ts from the English (`from` is a fingerprint of
 * the English it was translated from, so a changed stop is re-translated).
 * They're what the guides record in that language
 * (scripts/build-guide-voices.ts) and the subtitles shown with it.
 */
export interface TranslatedScript {
  from: string;
  text: string;
}

export const TRANSLATED_SCRIPTS: Record<string, Record<string, TranslatedScript>> = { es };

/** The stop's script in `language` (English is the stop's own), or null if it hasn't been translated. */
export function scriptIn(waypoint: Waypoint, language: string): string | null {
  if (language === "en") return waypoint.narration.scriptText;
  return TRANSLATED_SCRIPTS[language]?.[waypoint.id]?.text ?? null;
}

import type { GuideId } from "./guides";

/**
 * Each guide's Google Cloud Text-to-Speech voice, per narration language. One
 * place for both the recorded tour narration (scripts/build-guide-voices.ts)
 * and "Ask your guide" answers (server/guideAnswer.ts), so a guide sounds
 * the same in both. Changing a voice here means re-running the build script.
 *
 * A guide with recordsTours false has no recordings of their own in that
 * language, so the stops play the standard narration for them (Professor Hoot
 * in English keeps the original recorded voice).
 */
export interface GuideVoice {
  languageCode: string;
  name: string;
  speakingRate: number;
  /** Semitones up (+) or down (-). Chirp voices don't take one. */
  pitch?: number;
  recordsTours: boolean;
}

/** Languages the guides narrate in. Others fall back to English. */
export const NARRATION_LANGUAGES = ["en", "es"] as const;
export type NarrationLanguage = (typeof NARRATION_LANGUAGES)[number];

export const GUIDE_VOICES: Record<NarrationLanguage, Record<GuideId, GuideVoice>> = {
  en: {
    // Picked by ear from Google's voices (October 2026): brighter and younger than before.
    scout: { languageCode: "en-AU", name: "en-AU-Chirp3-HD-Callirrhoe", speakingRate: 1.1, recordsTours: true },
    pip: { languageCode: "en-AU", name: "en-AU-News-E", speakingRate: 1.1, pitch: 2, recordsTours: true },
    // Tours: the original narration voice. This one is only for his "Ask your guide" answers.
    hoot: { languageCode: "en-GB", name: "en-GB-Standard-A", speakingRate: 1, recordsTours: false },
    ollie: { languageCode: "en-GB", name: "en-GB-Wavenet-B", speakingRate: 1.1, recordsTours: true },
  },
  // Spain Spanish, mirroring the English set: Scout and Ollie share a male voice (Ollie a touch quicker), Pip female.
  es: {
    scout: { languageCode: "es-ES", name: "es-ES-Wavenet-E", speakingRate: 1, recordsTours: true },
    pip: { languageCode: "es-ES", name: "es-ES-Wavenet-F", speakingRate: 1, recordsTours: true },
    hoot: { languageCode: "es-ES", name: "es-ES-Wavenet-H", speakingRate: 1, recordsTours: true },
    ollie: { languageCode: "es-ES", name: "es-ES-Wavenet-E", speakingRate: 1.1, recordsTours: true },
  },
};

export function isNarrationLanguage(language: string): language is NarrationLanguage {
  return (NARRATION_LANGUAGES as readonly string[]).includes(language);
}

/** The guide's voice in `language`, or in English if they don't narrate in it. */
export function guideVoice(language: string, guide: GuideId): GuideVoice {
  return (isNarrationLanguage(language) ? GUIDE_VOICES[language] : GUIDE_VOICES.en)[guide];
}

/** What each guide says in the picker's voice preview. */
export const GUIDE_PREVIEW_LINES: Record<NarrationLanguage, Record<GuideId, string>> = {
  en: {
    scout: "Hi, I'm Scout! I'd love to show you round today. Shall we go exploring?",
    pip: "Hello, I'm Pip! I never get lost, so stick with me and we'll have a brilliant walk.",
    hoot: "Good day. I am Professor Hoot, and every stone here has a story. Allow me to tell you a few.",
    ollie: "Alright? I'm Ollie, and I know all the shortcuts. Ready for an adventure?",
  },
  es: {
    scout: "¡Hola, soy Scout! Me encantaría enseñarte todo esto hoy. ¿Nos vamos de exploración?",
    pip: "¡Hola, soy Pip! Nunca me pierdo, así que quédate conmigo y daremos un paseo genial.",
    hoot: "Buenos días. Soy el profesor Hoot, y cada piedra de este lugar tiene una historia. Permíteme contarte algunas.",
    ollie: "¿Qué tal? Soy Ollie y me sé todos los atajos. ¿Listo para la aventura?",
  },
};

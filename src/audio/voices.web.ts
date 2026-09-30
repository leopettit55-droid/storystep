/** The device's built-in text-to-speech voices (used for the short spoken prompts between stops). */

/** Apple's older "Eloquence" voices: available everywhere but robotic-sounding. */
const ROBOTIC = /^(eddy|flo|grandma|grandpa|reed|rocko|sandy|shelley)\b/i;
/** Joke/novelty voices some systems ship (mostly macOS) — never a default. */
const NOVELTY = /\b(albert|bad news|bahh|bells|boing|bubbles|cellos|good news|jester|organ|superstar|trinoids|whisper|wobble|zarvox|deranged|hysterical)\b/i;

function baseLang(code: string): string {
  return code.toLowerCase().replace("_", "-").split("-")[0];
}

/** The best-sounding voice the device has for a language code like "es", if any. */
export function preferredVoice(language: string): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
  const want = baseLang(language);
  const score = (v: SpeechSynthesisVoice) => {
    let s = 0;
    if (/(premium|enhanced|natural|neural|siri)/i.test(v.name)) s += 3;
    if (/google/i.test(v.name)) s += 2;
    if (v.localService) s += 1;
    if (ROBOTIC.test(v.name)) s -= 2;
    if (NOVELTY.test(v.name)) s -= 10;
    return s;
  };
  const voices = speechSynthesis.getVoices().filter((v) => baseLang(v.lang) === want);
  return voices.sort((a, b) => score(b) - score(a))[0] ?? null;
}

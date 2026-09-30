import { preferredVoice } from "./voices";

/**
 * Short spoken prompts between stops ("Now proceed to stop 3…"), using the
 * browser's built-in text-to-speech so they work in every language without
 * recorded audio.
 */

/** iOS Safari only lets a page speak after it has spoken once inside a tap.
 * Call this straight from the tap that starts (or continues) a tour. */
export function unlockSpeech(): void {
  if (typeof speechSynthesis === "undefined") return;
  const silent = new SpeechSynthesisUtterance(" ");
  silent.volume = 0;
  speechSynthesis.speak(silent);
}

export function speakPrompt(text: string, language: string): void {
  if (typeof speechSynthesis === "undefined") return;
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = language;
  const voice = preferredVoice(language);
  if (voice) utterance.voice = voice;
  utterance.rate = 0.9;
  speechSynthesis.speak(utterance);
}

export function stopSpeaking(): void {
  if (typeof speechSynthesis === "undefined") return;
  speechSynthesis.cancel();
}

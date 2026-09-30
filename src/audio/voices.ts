// Native builds have no text-to-speech module yet (expo-speech would add one); see voices.web.ts.
export function preferredVoice(_language: string): SpeechSynthesisVoice | null {
  return null;
}

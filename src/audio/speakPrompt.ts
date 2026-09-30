// Native builds have no text-to-speech module installed yet (expo-speech would
// add it), so spoken prompts are web-only; the on-screen card still shows.
export function unlockSpeech(): void {}
export function speakPrompt(_text: string, _language: string): void {}
export function stopSpeaking(): void {}

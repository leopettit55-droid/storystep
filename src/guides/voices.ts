import type { GuideId } from "./guides";

/**
 * Each guide's Google Cloud Text-to-Speech voice (British English). One
 * place for both the recorded tour narration (scripts/build-guide-voices.ts)
 * and "Ask your guide" answers (server/guideAnswer.ts), so a guide sounds
 * the same in both. Changing a voice here means re-running the build script.
 * A guide with recordsTours false has no recordings of their own, so the
 * stops play the standard narration for them.
 */
export const GUIDE_VOICES: Record<GuideId, { name: string; speakingRate: number; recordsTours: boolean }> = {
  scout: { name: "en-GB-Wavenet-B", speakingRate: 1, recordsTours: true },
  pip: { name: "en-GB-Wavenet-C", speakingRate: 1, recordsTours: true },
  // Professor Hoot narrates tours in the original (standard) narration voice;
  // this Google voice is only for his "Ask your guide" answers.
  hoot: { name: "en-GB-Standard-A", speakingRate: 1, recordsTours: false },
  ollie: { name: "en-GB-Wavenet-B", speakingRate: 1.1, recordsTours: true },
};

/** What each guide says in the picker's voice preview. */
export const GUIDE_PREVIEW_LINES: Record<GuideId, string> = {
  scout: "Hi, I'm Scout! I'd love to show you round today. Shall we go exploring?",
  pip: "Hello, I'm Pip! I never get lost, so stick with me and we'll have a brilliant walk.",
  hoot: "Good day. I am Professor Hoot, and every stone here has a story. Allow me to tell you a few.",
  ollie: "Alright? I'm Ollie, and I know all the shortcuts. Ready for an adventure?",
};

import { createAudioPlayer, type AudioPlayer, type AudioStatus } from "expo-audio";
import { Platform } from "react-native";
import { GUIDE_PREVIEWS } from "../content/narration/cues";
import type { GuideId } from "../guides/guides";
import { guideVoice } from "../guides/voices";

/**
 * The guide picker's voice previews: a short "hello" from each guide. One
 * player, so starting one guide's preview stops whichever was playing.
 * Web only for now — the clips are served from public/audio, like the
 * guides' own stop recordings. A guide who narrates in the tour's own voice
 * (Professor Hoot) previews with the opening of the tour's first stop.
 */
export type PreviewState = "loading" | "playing";
/** A stretch of a tour's own narration, for guides who narrate in that voice (e.g. Professor Hoot). */
export interface NarrationSample {
  source: number | string;
  /** Stop here (seconds): the end of the opening sentence or two. */
  endAt: number;
}
type Listener = (guide: GuideId | null, state: PreviewState | null) => void;

let player: AudioPlayer | null = null;
let current: GuideId | null = null;
let state: PreviewState | null = null;
let stopAt: number | null = null;
const listeners = new Set<Listener>();

function set(guide: GuideId | null, next: PreviewState | null) {
  current = guide;
  state = next;
  listeners.forEach((l) => l(current, state));
}

/** The guide's recorded hello in `language`, or in English. */
function ownPreview(guide: GuideId, language: string): string | undefined {
  return GUIDE_PREVIEWS[language]?.[guide] ?? GUIDE_PREVIEWS.en?.[guide];
}

/** Whether the guide narrates in the tour's own voice (no recordings of their own) in `language`. */
const usesTourVoice = (guide: GuideId, language: string) => !guideVoice(language, guide).recordsTours;

export function hasGuidePreview(guide: GuideId, language: string, sample?: NarrationSample | null): boolean {
  return Platform.OS === "web" && !!((sample && usesTourVoice(guide, language)) || ownPreview(guide, language));
}

/** Follows which guide's preview is loading or playing. */
export function subscribeGuidePreview(listener: Listener): () => void {
  listeners.add(listener);
  listener(current, state);
  return () => listeners.delete(listener);
}

/** Plays the guide's hello — or, for a guide who uses the tour's narration voice, the `sample` of it. */
export function playGuidePreview(guide: GuideId, language: string, sample?: NarrationSample | null): void {
  const useSample = !!sample && usesTourVoice(guide, language);
  const source = useSample ? sample.source : ownPreview(guide, language);
  if (source == null || Platform.OS !== "web") return;
  stopAt = useSample ? sample!.endAt : null;
  if (!player) {
    player = createAudioPlayer(source, { updateInterval: 100 });
    player.addListener("playbackStatusUpdate", (status: AudioStatus) => {
      if (!current) return;
      if (status.didJustFinish || (stopAt != null && status.currentTime >= stopAt)) {
        player?.pause();
        set(null, null);
      } else if (status.playing && state === "loading") set(current, "playing");
    });
  } else {
    player.pause();
    player.replace(source);
  }
  set(guide, "loading");
  void player.seekTo(0);
  player.play();
}

export function stopGuidePreview(): void {
  if (!current) return;
  player?.pause();
  set(null, null);
}

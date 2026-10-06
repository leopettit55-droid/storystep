import { createAudioPlayer, type AudioPlayer, type AudioStatus } from "expo-audio";
import { Platform } from "react-native";
import { GUIDE_PREVIEWS } from "../content/narration/cues";
import type { GuideId } from "../guides/guides";
import { GUIDE_VOICES } from "../guides/voices";

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

export function hasGuidePreview(guide: GuideId, sample?: NarrationSample | null): boolean {
  return Platform.OS === "web" && !!(GUIDE_PREVIEWS[guide] || (sample && !GUIDE_VOICES[guide].recordsTours));
}

/** Follows which guide's preview is loading or playing. */
export function subscribeGuidePreview(listener: Listener): () => void {
  listeners.add(listener);
  listener(current, state);
  return () => listeners.delete(listener);
}

/** Plays the guide's hello — or, for a guide who uses the tour's narration voice, the `sample` of it. */
export function playGuidePreview(guide: GuideId, sample?: NarrationSample | null): void {
  const own = GUIDE_PREVIEWS[guide];
  const useSample = !own && sample && !GUIDE_VOICES[guide].recordsTours;
  const source = own ?? (useSample ? sample.source : null);
  if (source == null || Platform.OS !== "web") return;
  stopAt = useSample ? sample.endAt : null;
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

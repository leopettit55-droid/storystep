import { createAudioPlayer, type AudioPlayer, type AudioStatus } from "expo-audio";
import { Platform } from "react-native";
import { GUIDE_PREVIEWS } from "../content/narration/cues";
import type { GuideId } from "../guides/guides";

/**
 * The guide picker's voice previews: a short "hello" from each guide. One
 * player, so starting one guide's preview stops whichever was playing.
 * Web only for now — the clips are served from public/audio, like the
 * guides' own stop recordings.
 */
export type PreviewState = "loading" | "playing";
type Listener = (guide: GuideId | null, state: PreviewState | null) => void;

let player: AudioPlayer | null = null;
let current: GuideId | null = null;
let state: PreviewState | null = null;
const listeners = new Set<Listener>();

function set(guide: GuideId | null, next: PreviewState | null) {
  current = guide;
  state = next;
  listeners.forEach((l) => l(current, state));
}

export function hasGuidePreview(guide: GuideId): boolean {
  return Platform.OS === "web" && !!GUIDE_PREVIEWS[guide];
}

/** Follows which guide's preview is loading or playing. */
export function subscribeGuidePreview(listener: Listener): () => void {
  listeners.add(listener);
  listener(current, state);
  return () => listeners.delete(listener);
}

export function playGuidePreview(guide: GuideId): void {
  const source = GUIDE_PREVIEWS[guide];
  if (!source || Platform.OS !== "web") return;
  if (!player) {
    player = createAudioPlayer(source, { updateInterval: 100 });
    player.addListener("playbackStatusUpdate", (status: AudioStatus) => {
      if (!current) return;
      if (status.didJustFinish) set(null, null);
      else if (status.playing && state === "loading") set(current, "playing");
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

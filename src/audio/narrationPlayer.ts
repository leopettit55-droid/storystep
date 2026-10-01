import { createAudioPlayer, setAudioModeAsync, type AudioPlayer, type AudioStatus } from "expo-audio";
import type { Waypoint } from "../content";
import { Platform } from "react-native";
import { GUIDE_RECORDINGS } from "../content/narration/cues";
import { resolveAudioSource } from "./audioCache";

let player: AudioPlayer | null = null;
let endedHandler: (() => void) | null = null;

/** The walker's tour guide: a stop the guide has recorded plays in their voice (web). */
let narrationGuide: string | null = null;
export function setNarrationGuide(guide: string): void {
  narrationGuide = guide;
}

/** What's playing: which stop, and which recording of it — the waypoint id for
 * the standard one, or "<waypoint id>@<guide>" for a guide's own (matching the
 * keys in content/narration/cues). */
export interface NarrationPlaying {
  waypointId: string;
  recording: string;
}
/** The recording loaded, for subtitles (null once it has finished or stopped). */
let current: NarrationPlaying | null = null;
/** Kept after it ends, so a replay gets its subtitles back. */
let loaded: NarrationPlaying | null = null;
type ProgressListener = (playing: NarrationPlaying | null, seconds: number, duration: number) => void;
const progressListeners = new Set<ProgressListener>();

/** Follows the narration's position — which recording, how far in, how long — for subtitles and progress. */
export function subscribeNarrationProgress(listener: ProgressListener): () => void {
  progressListeners.add(listener);
  return () => progressListeners.delete(listener);
}

function emitProgress(seconds: number, duration = 0): void {
  progressListeners.forEach((listener) => listener(current, seconds, duration));
}

// While the landmark scanner is speaking, tour narration must not start over
// it. A waypoint that fires meanwhile is parked here and played when released.
let held = false;
let pendingWaypoint: Waypoint | null = null;

export function holdWaypointNarration(): void {
  held = true;
}

/** Ends the hold; returns a waypoint that fired during it, if any (not yet played). */
export function releaseWaypointNarration(): Waypoint | null {
  held = false;
  const parked = pendingWaypoint;
  pendingWaypoint = null;
  return parked;
}

export function isNarrationPlaying(): boolean {
  return !!player?.playing;
}

export async function setupAudioPlayback(): Promise<void> {
  await setAudioModeAsync({
    playsInSilentMode: true,
    shouldPlayInBackground: true,
    interruptionMode: "doNotMix",
  });
}

/** Fires once the current narration segment finishes playing on its own (not via pause/skip). */
export function setNarrationEndedHandler(handler: (() => void) | null): void {
  endedHandler = handler;
}

/** Resolves the waypoint's narration (bundled or cached-remote) and starts playback. */
export async function playWaypointNarration(waypoint: Waypoint): Promise<void> {
  if (held) {
    pendingWaypoint = waypoint;
    return;
  }
  // The guide's own recording, if they've made one (served from public/, so web only).
  const guideFile = narrationGuide && Platform.OS === "web" ? GUIDE_RECORDINGS[waypoint.id]?.[narrationGuide] : undefined;
  const source = guideFile ?? (await resolveAudioSource(waypoint.id, waypoint.narration.audioSource));
  if (source == null) {
    console.warn(
      `[narrationPlayer] no narration audio for waypoint "${waypoint.id}" yet`
    );
    return;
  }

  if (!player) {
    // Frequent updates keep subtitles in step with the voice.
    player = createAudioPlayer(source, { updateInterval: 250 });
    player.addListener("playbackStatusUpdate", (status: AudioStatus) => {
      if (status.didJustFinish) {
        current = null;
        emitProgress(0);
        endedHandler?.();
        return;
      }
      emitProgress(status.currentTime, status.duration);
    });
  } else {
    player.replace(source);
  }
  current = loaded = {
    waypointId: waypoint.id,
    recording: guideFile ? `${waypoint.id}@${narrationGuide}` : waypoint.id,
  };
  emitProgress(0);

  // Only one player can hold the lock screen at a time; doNotMix (set in
  // setupAudioPlayback) is required for the OS to associate it correctly.
  player.setActiveForLockScreen(true, {
    title: waypoint.name,
    artist: "StoryStep",
  });
  player.play();
}

export function pauseNarration(): void {
  player?.pause();
}

export function resumeNarration(): void {
  player?.play();
}

export function replayCurrentNarration(): void {
  if (!player) return;
  current = loaded;
  void player.seekTo(0);
  player.play();
}

export function stopNarration(): void {
  current = null;
  emitProgress(0);
  if (!player) return;
  player.pause();
  void player.seekTo(0);
}

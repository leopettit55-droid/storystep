import { createAudioPlayer, setAudioModeAsync, type AudioPlayer, type AudioStatus } from "expo-audio";
import type { Waypoint } from "../content";
import { Platform } from "react-native";
import { isOnline } from "../offline/connectivity";
import { savedAudioUrl } from "../offline/tourFiles";
import { resolveAudioSource } from "./audioCache";

let player: AudioPlayer | null = null;
let endedHandler: (() => void) | null = null;

/** Which stop's recording is loaded, for subtitles (null once it has finished or stopped). */
let currentWaypointId: string | null = null;
/** The stop whose recording is in the player, so a replay after it ends gets its subtitles back. */
let loadedWaypointId: string | null = null;
type ProgressListener = (waypointId: string | null, seconds: number) => void;

/** Why a stop's narration couldn't play: not saved and no connection, or the file wouldn't load. */
export type NarrationProblem = "offline" | "unplayable";
type ErrorListener = (waypoint: Waypoint, problem: NarrationProblem) => void;
const errorListeners = new Set<ErrorListener>();

/** Hears about narration that couldn't play, so the screen can say so; the tour carries on. */
export function subscribeNarrationErrors(listener: ErrorListener): () => void {
  errorListeners.add(listener);
  return () => errorListeners.delete(listener);
}

/** A file that hasn't loaded after this long counts as broken (or the connection dropped). */
const LOAD_TIMEOUT_MS = 15_000;
let loadWatchdog: ReturnType<typeof setTimeout> | null = null;
/** The in-memory link for a saved narration file, released when replaced. */
let blobUrl: string | null = null;

function clearWatchdog() {
  if (loadWatchdog) clearTimeout(loadWatchdog);
  loadWatchdog = null;
}

/** Reports the problem and moves the tour on as if the stop had finished,
 * so a bad file never leaves a tour (especially a sequential one) stuck. */
function narrationFailed(waypoint: Waypoint, problem: NarrationProblem) {
  clearWatchdog();
  console.warn(`[narrationPlayer] couldn't play "${waypoint.id}" (${problem})`);
  currentWaypointId = null;
  emitProgress(0);
  errorListeners.forEach((l) => l(waypoint, problem));
  endedHandler?.();
}

/**
 * Where to play a stop's narration from: on the web, a saved (downloaded)
 * copy if there is one, so tours work offline and keep working if the
 * signal drops; otherwise the bundled or online file as before.
 */
async function narrationSource(waypoint: Waypoint): Promise<number | string | null> {
  const original = waypoint.narration.audioSource;
  if (Platform.OS === "web" && typeof original === "string") {
    const saved = await savedAudioUrl(original);
    if (saved) {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
      blobUrl = saved;
      return saved;
    }
    if (!isOnline()) return null;
  }
  return resolveAudioSource(waypoint.id, original);
}
const progressListeners = new Set<ProgressListener>();

/** Follows the narration's position — which stop, and how far in — to time its subtitles. */
export function subscribeNarrationProgress(listener: ProgressListener): () => void {
  progressListeners.add(listener);
  return () => progressListeners.delete(listener);
}

function emitProgress(seconds: number): void {
  progressListeners.forEach((listener) => listener(currentWaypointId, seconds));
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
  let source: number | string | null;
  try {
    source = await narrationSource(waypoint);
  } catch {
    source = null;
  }
  if (source == null) {
    if (waypoint.narration.audioSource == null) {
      console.warn(`[narrationPlayer] no narration audio for waypoint "${waypoint.id}" yet`);
      return;
    }
    narrationFailed(waypoint, isOnline() ? "unplayable" : "offline");
    return;
  }

  if (!player) {
    // Frequent updates keep subtitles in step with the voice.
    player = createAudioPlayer(source, { updateInterval: 250 });
    player.addListener("playbackStatusUpdate", (status: AudioStatus) => {
      if (status.isLoaded && status.duration > 0) clearWatchdog();
      if (status.didJustFinish) {
        currentWaypointId = null;
        emitProgress(0);
        endedHandler?.();
        return;
      }
      emitProgress(status.currentTime);
    });
  } else {
    player.replace(source);
  }
  currentWaypointId = loadedWaypointId = waypoint.id;
  emitProgress(0);

  // Only one player can hold the lock screen at a time; doNotMix (set in
  // setupAudioPlayback) is required for the OS to associate it correctly.
  player.setActiveForLockScreen(true, {
    title: waypoint.name,
    artist: "StoryStep",
  });
  player.play();

  // If the file never loads (damaged, or the connection dropped mid-fetch),
  // say so and move on rather than waiting forever.
  clearWatchdog();
  loadWatchdog = setTimeout(() => {
    if (currentWaypointId === waypoint.id && !(player?.isLoaded && (player?.duration ?? 0) > 0)) {
      player?.pause();
      narrationFailed(waypoint, isOnline() ? "unplayable" : "offline");
    }
  }, LOAD_TIMEOUT_MS);
}

export function pauseNarration(): void {
  player?.pause();
}

export function resumeNarration(): void {
  player?.play();
}

export function replayCurrentNarration(): void {
  if (!player) return;
  currentWaypointId = loadedWaypointId;
  void player.seekTo(0);
  player.play();
}

export function stopNarration(): void {
  clearWatchdog();
  currentWaypointId = null;
  emitProgress(0);
  if (!player) return;
  player.pause();
  void player.seekTo(0);
}

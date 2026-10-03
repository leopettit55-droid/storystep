import { createAudioPlayer, setAudioModeAsync, type AudioPlayer, type AudioStatus } from "expo-audio";
import type { Waypoint } from "../content";
import { Platform } from "react-native";
import { GUIDE_RECORDINGS } from "../content/narration/cues";
import { isOnline } from "../offline/connectivity";
import { savedAudioUrl } from "../offline/tourFiles";
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
  current = null;
  emitProgress(0);
  errorListeners.forEach((l) => l(waypoint, problem));
  endedHandler?.();
}

/**
 * Where to play a stop's narration from: on the web, a saved (downloaded)
 * copy if there is one, so tours work offline and keep working if the
 * signal drops; otherwise the bundled or online file as before. The chosen
 * guide's own recording comes first when it's saved or there's a connection;
 * otherwise the standard narrator plays, so offline tours never break.
 */
async function narrationSource(waypoint: Waypoint): Promise<{ source: number | string | null; guideVoice: boolean }> {
  const guideFile = narrationGuide && Platform.OS === "web" ? GUIDE_RECORDINGS[waypoint.id]?.[narrationGuide] : undefined;
  if (guideFile) {
    const saved = await savedAudioUrl(guideFile);
    if (saved) {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
      blobUrl = saved;
      return { source: saved, guideVoice: true };
    }
    if (isOnline()) return { source: guideFile, guideVoice: true };
  }
  return { source: await standardSource(waypoint), guideVoice: false };
}

async function standardSource(waypoint: Waypoint): Promise<number | string | null> {
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

/**
 * Walk with a friend: a start that's been scheduled for an exact moment. Each
 * new play/pause/sync bumps the token, so an older scheduled start never fires.
 */
let syncToken = 0;
let syncTimer: ReturnType<typeof setTimeout> | null = null;

function cancelScheduledStart() {
  syncToken++;
  if (syncTimer) clearTimeout(syncTimer);
  syncTimer = null;
}

/** iPhone and iPad browsers only load audio once it has been played. */
const PLAY_TO_LOAD =
  Platform.OS === "web" &&
  typeof navigator !== "undefined" &&
  (/iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1));

/** Off by more than this (seconds) just after starting: seek again. */
const START_TOLERANCE_S = 0.2;

/**
 * Plays the loaded narration so that second 0 is at `startAt` (local clock,
 * ms): waits if that's still to come, or jumps ahead if it has passed. Some
 * browsers (iPhone Safari) won't load audio until it's played, so a file that
 * hasn't started loading is nudged with a play and an immediate pause. Seeking
 * can land a little late, so the position is checked once more just after.
 */
async function startInSync(startAt: number): Promise<void> {
  if (!player) return;
  const token = ++syncToken;
  if (syncTimer) clearTimeout(syncTimer);
  const p = player;
  if (p.playing) p.pause();
  if (PLAY_TO_LOAD && !p.isLoaded) {
    p.play();
    p.pause();
  }
  const giveUpAt = Date.now() + LOAD_TIMEOUT_MS;
  while (token === syncToken && !(p.isLoaded && p.duration > 0) && Date.now() < giveUpAt) {
    await new Promise((r) => setTimeout(r, 50));
  }
  if (token !== syncToken) return;
  const expected = () => (Date.now() - startAt) / 1000;
  const begin = async () => {
    if (token !== syncToken) return;
    const position = Math.max(0, expected());
    if (p.duration > 0 && position >= p.duration - 0.25) {
      // That part's already over for the friend: finish it here too.
      current = null;
      emitProgress(0);
      endedHandler?.();
      return;
    }
    await p.seekTo(position);
    if (token !== syncToken) return;
    p.play();
    syncTimer = setTimeout(() => {
      if (token !== syncToken || !p.playing) return;
      const off = p.currentTime - expected();
      if (Math.abs(off) > START_TOLERANCE_S) void p.seekTo(Math.max(0, expected()));
    }, 1_500);
  };
  const wait = startAt - Date.now();
  if (wait > 30) {
    await p.seekTo(0);
    syncTimer = setTimeout(() => void begin(), wait);
  } else {
    await begin();
  }
}

/** Walk with a friend: line the loaded narration up with `startAt` again (resume, re-sync). */
export function syncNarration(startAt: number): void {
  void startInSync(startAt);
}

/** Where the narration is (seconds), and how long it is. */
export function narrationPosition(): { seconds: number; duration: number; loaded: boolean } {
  return { seconds: player?.currentTime ?? 0, duration: player?.duration ?? 0, loaded: !!player?.isLoaded };
}

/** Which stop's narration is loaded (playing or not). */
export function loadedNarration(): NarrationPlaying | null {
  return loaded;
}

/**
 * Resolves the waypoint's narration (bundled or cached-remote) and starts
 * playback, now or (Walk with a friend) so that it starts at `startAt`.
 */
export async function playWaypointNarration(waypoint: Waypoint, options: { startAt?: number } = {}): Promise<void> {
  cancelScheduledStart();
  if (held) {
    pendingWaypoint = waypoint;
    return;
  }
  let source: number | string | null;
  let guideVoice = false;
  try {
    ({ source, guideVoice } = await narrationSource(waypoint));
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
        current = null;
        emitProgress(0);
        endedHandler?.();
        return;
      }
      emitProgress(status.currentTime, status.duration);
    });
  } else {
    // A synced start pauses first, so the new file doesn't start by itself (replace resumes a playing player).
    if (options.startAt != null) player.pause();
    player.replace(source);
  }
  current = loaded = {
    waypointId: waypoint.id,
    recording: guideVoice ? `${waypoint.id}@${narrationGuide}` : waypoint.id,
  };
  emitProgress(0);

  // Only one player can hold the lock screen at a time; doNotMix (set in
  // setupAudioPlayback) is required for the OS to associate it correctly.
  player.setActiveForLockScreen(true, {
    title: waypoint.name,
    artist: "StoryStep",
  });
  if (options.startAt == null) player.play();
  else void startInSync(options.startAt);

  // If the file never loads (damaged, or the connection dropped mid-fetch),
  // say so and move on rather than waiting forever.
  clearWatchdog();
  loadWatchdog = setTimeout(() => {
    if (current?.waypointId === waypoint.id && !(player?.isLoaded && (player?.duration ?? 0) > 0)) {
      player?.pause();
      narrationFailed(waypoint, isOnline() ? "unplayable" : "offline");
    }
  }, LOAD_TIMEOUT_MS);
}

export function pauseNarration(): void {
  cancelScheduledStart();
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
  cancelScheduledStart();
  clearWatchdog();
  current = null;
  emitProgress(0);
  if (!player) return;
  player.pause();
  void player.seekTo(0);
}

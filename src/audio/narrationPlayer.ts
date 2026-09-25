import { createAudioPlayer, setAudioModeAsync, type AudioPlayer, type AudioStatus } from "expo-audio";
import type { Waypoint } from "../content";
import { resolveAudioSource } from "./audioCache";

let player: AudioPlayer | null = null;
let endedHandler: (() => void) | null = null;

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
  const source = await resolveAudioSource(
    waypoint.id,
    waypoint.narration.audioSource
  );
  if (source == null) {
    console.warn(
      `[narrationPlayer] no narration audio for waypoint "${waypoint.id}" yet`
    );
    return;
  }

  if (!player) {
    player = createAudioPlayer(source);
    player.addListener("playbackStatusUpdate", (status: AudioStatus) => {
      if (status.didJustFinish) endedHandler?.();
    });
  } else {
    player.replace(source);
  }

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
  void player.seekTo(0);
  player.play();
}

export function stopNarration(): void {
  if (!player) return;
  player.pause();
  void player.seekTo(0);
}

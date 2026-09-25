import { createAudioPlayer, type AudioPlayer, type AudioStatus } from "expo-audio";
import { Platform } from "react-native";
import { create } from "zustand";
import { resolveAudioSource } from "../audio/audioCache";
import {
  holdWaypointNarration,
  isNarrationPlaying,
  pauseNarration,
  playWaypointNarration,
  releaseWaypointNarration,
  resumeNarration,
} from "../audio/narrationPlayer";
import { useTourStore } from "../state/tourStore";

interface LandmarkSpeechState {
  speaking: boolean;
  title: string | null;
}

/** Drives the "now speaking" card and its stop button. */
export const useLandmarkSpeech = create<LandmarkSpeechState>(() => ({ speaking: false, title: null }));

export interface SpeakRequest {
  id: string;
  title: string;
  /** Pre-recorded narration, when there is one. */
  audioSource?: number | string | null;
  /** Spoken by the browser's voice when there's no recording. */
  text: string;
}

// A tiny silent clip. Browsers only let a page start audio/speech from inside
// a tap, and a scan involves network calls before anything is ready to say, so
// the scan button primes both channels synchronously while the tap is fresh.
const SILENT_WAV =
  "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAAAA";

let player: AudioPlayer | null = null;
/** Bumped for every request; anything from an older one is ignored. */
let session = 0;
/** True only while a real landmark recording (not the silent primer) is playing. */
let clipPlaying = false;
/** Whether the tour is currently held (paused) on this feature's behalf. */
let holding = false;
let tourWasPlaying = false;
let tourWasTouring = false;

function ensurePlayer(): AudioPlayer {
  if (!player) {
    player = createAudioPlayer(SILENT_WAV);
    player.addListener("playbackStatusUpdate", (status: AudioStatus) => {
      if (status.didJustFinish && clipPlaying) {
        clipPlaying = false;
        endSpeech(session);
      }
    });
  }
  return player;
}

/** Call synchronously from the scan button's press handler. */
export function primeLandmarkAudio(): void {
  // If a landmark is mid-sentence the channels are already unlocked — leave it alone.
  if (useLandmarkSpeech.getState().speaking) return;
  try {
    const p = ensurePlayer();
    p.replace(SILENT_WAV);
    p.play();
  } catch {
    // Priming is best-effort.
  }
  if (Platform.OS === "web" && typeof window !== "undefined" && "speechSynthesis" in window) {
    try {
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(""));
    } catch {
      // ignore
    }
  }
}

function pickBritishVoice(): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((v) => v.lang === "en-GB" && /male|daniel|oliver|arthur/i.test(v.name)) ??
    voices.find((v) => v.lang === "en-GB") ??
    voices.find((v) => v.lang.startsWith("en"))
  );
}

/** Pauses the tour and its narration, speaks the landmark, then resumes. Returns false if nothing could be spoken. */
export async function speakLandmark(req: SpeakRequest): Promise<boolean> {
  const mySession = ++session;
  clipPlaying = false;

  if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
  player?.pause();

  // Scanning again mid-speech keeps the original "was the tour playing" record
  // instead of mistaking the paused tour for one that was never playing.
  if (!holding) {
    holding = true;
    tourWasPlaying = isNarrationPlaying();
    tourWasTouring = useTourStore.getState().status === "touring";
    if (tourWasTouring) useTourStore.getState().pause();
    pauseNarration();
    holdWaypointNarration();
  }
  useLandmarkSpeech.setState({ speaking: true, title: req.title });

  try {
    if (req.audioSource != null) {
      const source = await resolveAudioSource(`landmark-${req.id}`, req.audioSource);
      if (mySession !== session) return true;
      if (source != null) {
        const p = ensurePlayer();
        p.replace(source);
        clipPlaying = true;
        p.play();
        return true;
      }
    }

    if (Platform.OS === "web" && typeof window !== "undefined" && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(req.text);
      utterance.lang = "en-GB";
      const voice = pickBritishVoice();
      if (voice) utterance.voice = voice;
      utterance.onend = () => endSpeech(mySession);
      utterance.onerror = () => endSpeech(mySession);
      window.speechSynthesis.speak(utterance);
      return true;
    }
  } catch (e) {
    console.warn("[landmarkSpeech] couldn't speak landmark:", e);
  }

  endSpeech(mySession);
  return false;
}

function endSpeech(forSession: number): void {
  if (forSession !== session) return;
  finish();
}

function finish(): void {
  clipPlaying = false;
  player?.pause();
  if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
  useLandmarkSpeech.setState({ speaking: false, title: null });
  if (!holding) return;
  holding = false;

  const parked = releaseWaypointNarration();
  if (tourWasTouring && useTourStore.getState().status === "paused") useTourStore.getState().resume();
  if (parked) void playWaypointNarration(parked);
  else if (tourWasPlaying) resumeNarration();
  tourWasPlaying = false;
  tourWasTouring = false;
}

/** Stops the landmark speech and hands the tour back its audio. Safe to call any time. */
export function stopLandmarkSpeech(): void {
  session += 1;
  finish();
}

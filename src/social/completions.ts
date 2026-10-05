import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAreaById, type Coordinates } from "../content";
import { isDemoWalk } from "../demo/demoWalk";
import { distanceMeters } from "../geofencing/proximityTracker";
import { saveWalkToHealth, walkFromHealth } from "../health/appleHealth";
import { useHealthStore } from "../health/healthPreference";
import { estimateSteps, type WalkActivity } from "../health/types";
import { isOnline, subscribeOnline } from "../offline/connectivity";
import { api, getIdentity } from "./api";

/**
 * Timing a walk for the leaderboards, and sending finished tours to the
 * server. A run is timed from tapping Start to the last stop; skipping stops
 * or continuing it later means it doesn't count for speed (it still counts
 * as a finished tour). Demo walks never count. Finishes made offline, or
 * before signing in, wait on the device and are sent when possible.
 *
 * Each walk also records its distance (measured from GPS as the walker
 * moves) and steps: from Apple Health when it's connected on iPhone,
 * otherwise estimated from the distance. These feed the Distance and Steps
 * leaderboards, which count every walk, solo or with a friend.
 */

interface Run {
  startedAt: number;
  skipped: boolean;
  resumed: boolean;
  /** Metres walked so far, from GPS. */
  meters?: number;
}

interface Pending {
  tourId: string;
  seconds: number | null;
  completedAt: number;
  meters?: number;
  steps?: number;
  stepsFromHealth?: boolean;
  /** Walked with a friend: counts for distance and steps, not the solo speed boards. */
  duo?: boolean;
}

/** The walk's numbers, as sent with the finish. */
export interface Finish {
  seconds: number | null;
  completedAt: number;
  activity: WalkActivity;
}

const runKey = (areaId: string) => `storystep.run.${areaId}`;
const PENDING_KEY = "storystep.social.pending";

async function readRun(areaId: string): Promise<Run | null> {
  try {
    return JSON.parse((await AsyncStorage.getItem(runKey(areaId))) ?? "null");
  } catch {
    return null;
  }
}

const writeRun = (areaId: string, run: Run) => AsyncStorage.setItem(runKey(areaId), JSON.stringify(run)).catch(() => {});

/** Start tapped on a fresh tour: the clock starts. */
export function startRun(areaId: string): void {
  track = { areaId, anchor: null, meters: 0, savedMeters: 0 };
  void writeRun(areaId, { startedAt: Date.now(), skipped: false, resumed: false, meters: 0 });
}

// --- distance walked -------------------------------------------------------------

/** GPS wobbles a few metres while standing still; only movement beyond this counts. */
const MIN_STEP_M = 8;
/** A jump this big between two fixes is a GPS glitch, not walking. */
const MAX_JUMP_M = 250;
/** How often (metres) the running total is saved, so a closed app loses little. */
const SAVE_EVERY_M = 50;

let track: { areaId: string; anchor: Coordinates | null; meters: number; savedMeters: number } | null = null;

/** Follows the walker's position during a tour and adds up the distance walked. */
export function trackRunPosition(areaId: string, point: Coordinates): void {
  if (!track || track.areaId !== areaId) {
    // Continuing a walk (or the app was reopened): carry on from the saved total.
    track = { areaId, anchor: null, meters: 0, savedMeters: 0 };
    void readRun(areaId).then((run) => {
      if (track?.areaId === areaId && run?.meters) {
        track.meters += run.meters;
        track.savedMeters = track.meters;
      }
    });
  }
  if (!track.anchor) {
    track.anchor = point;
    return;
  }
  const step = distanceMeters(track.anchor, point);
  if (step < MIN_STEP_M) return;
  track.anchor = point;
  if (step > MAX_JUMP_M) return;
  track.meters += step;
  if (track.meters - track.savedMeters >= SAVE_EVERY_M) {
    track.savedMeters = track.meters;
    const meters = Math.round(track.meters);
    void readRun(areaId).then((run) => run && writeRun(areaId, { ...run, meters }));
  }
}

/** Steps and distance for a finished walk: Apple Health when connected, otherwise GPS and an estimate. */
async function walkActivity(areaId: string, run: Run | null, end: number): Promise<WalkActivity> {
  const gps = Math.max(track?.areaId === areaId ? track.meters : 0, run?.meters ?? 0);
  const routeMeters = (getAreaById(areaId)?.estimatedDistanceKm ?? 0) * 1000;
  // No usable GPS (e.g. a laptop) on a walk that wasn't skipped: credit the route itself.
  const fair = !!run && !run.skipped && !run.resumed;
  const meters = Math.round(gps >= 50 ? gps : fair ? routeMeters : gps);

  if (run && useHealthStore.getState().connected) {
    const health = await walkFromHealth(run.startedAt, end);
    if (health) return { ...health, meters: health.meters > 0 ? health.meters : meters };
  }
  return { meters, steps: estimateSteps(meters), source: "estimate" };
}

/** Skipping forward or back means the time doesn't reflect a full walk. */
export async function markRunSkipped(areaId: string): Promise<void> {
  const run = await readRun(areaId);
  if (run && !run.skipped) await writeRun(areaId, { ...run, skipped: true });
}

/** Continued later: the clock kept running in between, so it isn't a fair time. */
export async function markRunResumed(areaId: string): Promise<void> {
  const run = await readRun(areaId);
  if (run && !run.resumed) await writeRun(areaId, { ...run, resumed: true });
}

/** The walk just finished on each tour, for the photo shared after it and the completion screen. */
const lastFinish = new Map<string, Finish>();
export const getLastFinish = (areaId: string) => lastFinish.get(areaId);

/**
 * The finished walk: its time in seconds (null if it doesn't count for
 * speed), distance and steps. With Apple Health connected, the walk is also
 * saved to Health as a walking workout.
 */
export async function finishRun(areaId: string): Promise<Finish> {
  const run = await readRun(areaId);
  await AsyncStorage.removeItem(runKey(areaId)).catch(() => {});
  const completedAt = Date.now();
  const fair = run && !run.skipped && !run.resumed;
  const activity = await walkActivity(areaId, run, completedAt);
  if (track?.areaId === areaId) track = null;
  const finish: Finish = { seconds: fair ? Math.round((completedAt - run.startedAt) / 1000) : null, completedAt, activity };
  lastFinish.set(areaId, finish);
  if (run && !isDemoWalk() && useHealthStore.getState().connected) {
    void saveWalkToHealth({ start: run.startedAt, end: completedAt, meters: activity.meters, tourName: getAreaById(areaId)?.name ?? "StoryStep tour" });
  }
  return finish;
}

async function readPending(): Promise<Pending[]> {
  try {
    return JSON.parse((await AsyncStorage.getItem(PENDING_KEY)) ?? "[]");
  } catch {
    return [];
  }
}

/** Sends waiting finishes; anything that can't go yet stays for next time. */
export async function flushCompletions(): Promise<void> {
  const pending = await readPending();
  if (pending.length === 0 || !isOnline()) return;
  const identity = await getIdentity();
  if (!identity) return;
  const left: Pending[] = [];
  for (const item of pending) {
    try {
      await api("/api/completions", { method: "POST", body: JSON.stringify(item) }, identity);
    } catch (e) {
      // Rejected outright (e.g. impossibly fast): drop it. Network trouble: keep it.
      const status = (e as { status?: number }).status ?? 0;
      if (!(status >= 400 && status < 500)) left.push(item);
    }
  }
  await AsyncStorage.setItem(PENDING_KEY, JSON.stringify(left)).catch(() => {});
}

/** Records a finished tour for the leaderboards (sent now, or when possible). */
export async function submitCompletion(tourId: string, finish: Finish, options: { duo?: boolean } = {}): Promise<void> {
  if (isDemoWalk()) return;
  const pending = await readPending();
  pending.push({
    tourId,
    seconds: options.duo ? null : finish.seconds,
    completedAt: finish.completedAt,
    meters: finish.activity.meters,
    steps: finish.activity.steps,
    stepsFromHealth: finish.activity.source === "health",
    duo: options.duo || undefined,
  });
  await AsyncStorage.setItem(PENDING_KEY, JSON.stringify(pending)).catch(() => {});
  await flushCompletions();
}

let started = false;
/** Sends anything left from earlier, and again whenever the connection returns. */
export function startCompletionSync(): void {
  if (started) return;
  started = true;
  void flushCompletions();
  subscribeOnline((online) => {
    if (online) void flushCompletions();
  });
}

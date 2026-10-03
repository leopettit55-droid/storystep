import AsyncStorage from "@react-native-async-storage/async-storage";
import { isDemoWalk } from "../demo/demoWalk";
import { isOnline, subscribeOnline } from "../offline/connectivity";
import { api, getIdentity } from "./api";

/**
 * Timing a walk for the leaderboards, and sending finished tours to the
 * server. A run is timed from tapping Start to the last stop; skipping stops
 * or continuing it later means it doesn't count for speed (it still counts
 * as a finished tour). Demo walks never count. Finishes made offline, or
 * before signing in, wait on the device and are sent when possible.
 */

interface Run {
  startedAt: number;
  skipped: boolean;
  resumed: boolean;
}

interface Pending {
  tourId: string;
  seconds: number | null;
  completedAt: number;
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
  void writeRun(areaId, { startedAt: Date.now(), skipped: false, resumed: false });
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

/** The walk just finished on each tour, for the photo shared after it. */
const lastFinish = new Map<string, { seconds: number | null; completedAt: number }>();
export const getLastFinish = (areaId: string) => lastFinish.get(areaId);

/** The finished walk's time in seconds, or null if it doesn't count for speed. */
export async function finishRun(areaId: string): Promise<{ seconds: number | null; completedAt: number }> {
  const run = await readRun(areaId);
  await AsyncStorage.removeItem(runKey(areaId)).catch(() => {});
  const completedAt = Date.now();
  const fair = run && !run.skipped && !run.resumed;
  const finish = { seconds: fair ? Math.round((completedAt - run.startedAt) / 1000) : null, completedAt };
  lastFinish.set(areaId, finish);
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
export async function submitCompletion(tourId: string, seconds: number | null, completedAt: number): Promise<void> {
  if (isDemoWalk()) return;
  const pending = await readPending();
  pending.push({ tourId, seconds, completedAt });
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

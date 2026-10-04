/**
 * Apple Health on iPhone: once someone connects it (Account → Apple Health,
 * offered right after creating an account), each tour's steps and distance
 * come from Health, which counts them with the phone's motion sensors (and an
 * Apple Watch if they wear one), and the walk is saved to Health as a walking
 * workout with its distance.
 *
 * Needs the StoryStep app built with the HealthKit plugin (app.json); the
 * website can't reach Apple Health.
 */
import HealthKit, { WorkoutActivityType } from "@kingstinct/react-native-healthkit";
import type { WalkActivity } from "./types";

const READ = ["HKQuantityTypeIdentifierStepCount", "HKQuantityTypeIdentifierDistanceWalkingRunning"] as const;
const WRITE = ["HKWorkoutTypeIdentifier", "HKQuantityTypeIdentifierDistanceWalkingRunning"] as const;

export const healthAvailable = (): boolean => {
  try {
    return HealthKit.isHealthDataAvailable();
  } catch {
    return false;
  }
};

/**
 * Shows Apple's Health permission sheet. Apple never tells apps whether
 * reading was allowed (for privacy), so this returns true once the sheet has
 * been answered; a walk with no Health data simply falls back to estimates.
 */
export async function connectHealth(): Promise<boolean> {
  if (!healthAvailable()) return false;
  try {
    return await HealthKit.requestAuthorization({ toRead: READ, toShare: WRITE });
  } catch (e) {
    console.warn("[appleHealth] permission request failed", e);
    return false;
  }
}

async function sum(identifier: (typeof READ)[number], unit: string, start: number, end: number): Promise<number> {
  const result = await HealthKit.queryStatisticsForQuantity(identifier, ["cumulativeSum"], {
    unit: unit as never,
    filter: { date: { startDate: new Date(start), endDate: new Date(end) } },
  });
  return result.sumQuantity?.quantity ?? 0;
}

/** Steps and distance Health recorded between two times, or null if it has none. */
export async function walkFromHealth(start: number, end: number): Promise<WalkActivity | null> {
  if (!healthAvailable()) return null;
  try {
    const [steps, meters] = await Promise.all([
      sum("HKQuantityTypeIdentifierStepCount", "count", start, end),
      sum("HKQuantityTypeIdentifierDistanceWalkingRunning", "m", start, end),
    ]);
    if (steps <= 0) return null;
    return { steps: Math.round(steps), meters: Math.round(meters), source: "health" };
  } catch (e) {
    console.warn("[appleHealth] couldn't read the walk", e);
    return null;
  }
}

/** Adds the tour to Health as a walking workout, so it counts towards their activity. */
export async function saveWalkToHealth(walk: { start: number; end: number; meters: number; tourName: string }): Promise<void> {
  if (!healthAvailable() || walk.end - walk.start < 60_000) return;
  try {
    await HealthKit.saveWorkoutSample(
      WorkoutActivityType.walking,
      [],
      new Date(walk.start),
      new Date(walk.end),
      walk.meters > 0 ? { distance: walk.meters } : undefined,
      { HKWorkoutBrandName: "StoryStep", StoryStepTour: walk.tourName }
    );
  } catch (e) {
    console.warn("[appleHealth] couldn't save the walk", e);
  }
}

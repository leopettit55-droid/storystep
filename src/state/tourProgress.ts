import AsyncStorage from "@react-native-async-storage/async-storage";

/** How long saved progress is offered as "Continue from stop N". */
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
const KEY_PREFIX = "storystep.progress.";

export interface SavedProgress {
  /** Index into the tour's route of the stop the walker was on. */
  currentIndex: number;
  /** Stops whose narration has started. */
  visitedIds: string[];
  /** When this was saved (ms since epoch). */
  savedAt: number;
}

/** Saved progress for a tour, or null if there's none or it's over 7 days old. */
export async function loadTourProgress(areaId: string): Promise<SavedProgress | null> {
  try {
    const raw = await AsyncStorage.getItem(KEY_PREFIX + areaId);
    if (!raw) return null;
    const saved = JSON.parse(raw) as SavedProgress;
    if (
      typeof saved.currentIndex !== "number" ||
      !Array.isArray(saved.visitedIds) ||
      typeof saved.savedAt !== "number" ||
      Date.now() - saved.savedAt > MAX_AGE_MS
    ) {
      await AsyncStorage.removeItem(KEY_PREFIX + areaId);
      return null;
    }
    return saved;
  } catch {
    return null;
  }
}

export async function saveTourProgress(areaId: string, currentIndex: number, visitedIds: string[]): Promise<void> {
  if (currentIndex < 0) return;
  const saved: SavedProgress = { currentIndex, visitedIds, savedAt: Date.now() };
  try {
    await AsyncStorage.setItem(KEY_PREFIX + areaId, JSON.stringify(saved));
  } catch (e) {
    console.warn("[tourProgress] couldn't save progress:", e);
  }
}

export async function clearTourProgress(areaId: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(KEY_PREFIX + areaId);
  } catch (e) {
    console.warn("[tourProgress] couldn't clear progress:", e);
  }
}

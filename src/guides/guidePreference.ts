import AsyncStorage from "@react-native-async-storage/async-storage";
import { getGuide, type GuideId } from "./guides";

/** The guide chosen for a tour is remembered per tour, on this device. */
const key = (areaId: string) => `storystep.guide.${areaId}`;

export async function loadGuide(areaId: string): Promise<GuideId | null> {
  try {
    const saved = await AsyncStorage.getItem(key(areaId));
    return saved ? getGuide(saved).id : null;
  } catch {
    return null;
  }
}

export function saveGuide(areaId: string, guide: GuideId): void {
  AsyncStorage.setItem(key(areaId), guide).catch(() => {});
}

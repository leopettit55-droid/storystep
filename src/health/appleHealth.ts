/**
 * Apple Health only exists on iPhone (see appleHealth.ios.ts). Everywhere
 * else (the website, Android) these do nothing, and steps are estimated from
 * the distance walked instead.
 */
import type { WalkActivity } from "./types";

export const healthAvailable = (): boolean => false;

export async function connectHealth(): Promise<boolean> {
  return false;
}

export async function walkFromHealth(_start: number, _end: number): Promise<WalkActivity | null> {
  return null;
}

export async function saveWalkToHealth(_walk: { start: number; end: number; meters: number; tourName: string }): Promise<void> {}

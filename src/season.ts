import { Platform } from "react-native";

/**
 * Seasonal looks. A season is on from `start` up to (not including) `end`, by
 * the phone's own date. To switch one off early, delete it or set `enabled` to
 * false; to add another (Christmas, say), give it an id, dates and a palette in
 * theme.ts. Outside every season the app looks exactly as it normally does.
 *
 * On the website, `?season=off` or `?season=halloween` forces a look for testing.
 */
export type SeasonId = "halloween";

interface Season {
  id: SeasonId;
  enabled: boolean;
  /** YYYY-MM-DD, local time. */
  start: string;
  /** YYYY-MM-DD, local time; the season has ended by the start of this day. */
  end: string;
}

const SEASONS: Season[] = [{ id: "halloween", enabled: true, start: "2026-10-28", end: "2026-11-01" }];

function localDay(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function forcedSeason(): SeasonId | null | undefined {
  if (Platform.OS !== "web" || typeof window === "undefined") return undefined;
  const value = new URLSearchParams(window.location.search).get("season");
  if (value === "off") return null;
  return SEASONS.find((s) => s.id === value)?.id;
}

export function activeSeason(now: Date = new Date()): SeasonId | null {
  const forced = forcedSeason();
  if (forced !== undefined) return forced;
  const today = localDay(now);
  return SEASONS.find((s) => s.enabled && s.start <= today && today < s.end)?.id ?? null;
}

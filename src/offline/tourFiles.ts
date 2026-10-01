import { File } from "expo-file-system";
import { getCachedOrDownload, isNarrationCached } from "../audio/audioCache";
import type { Area } from "../content";

/**
 * Native (iOS/Android) offline storage. Narration that ships inside the app
 * (a bundled `require(...)`, a number here) is already on the phone, so a
 * tour made only of those is ready offline straight away. Narration served
 * from a URL is saved to the app's documents folder (see audioCache).
 *
 * The web version, which saves everything with the browser's Cache Storage,
 * is tourFiles.web.ts.
 */

export interface DownloadProgress {
  bytesDone: number;
  bytesTotal: number;
  filesDone: number;
  filesTotal: number;
}

export interface DownloadResult {
  /** Bytes saved for this tour (0 when it all ships with the app). */
  sizeBytes: number;
  /** Every narration file is saved and playable. */
  complete: boolean;
  /** Nothing needed downloading: the tour is part of the app. */
  bundled: boolean;
}

export function offlineDownloadsSupported(): boolean {
  return true;
}

const remoteAudio = (area: Area) =>
  area.route
    .map((w) => ({ id: w.id, source: w.narration.audioSource }))
    .filter((a): a is { id: string; source: string } => typeof a.source === "string" && /^https?:\/\//i.test(a.source));

/** Every narration file ships inside the app, so the tour already works offline. */
export function isBundledTour(area: Area): boolean {
  return remoteAudio(area).length === 0;
}

export async function saveAppShell(): Promise<void> {
  // The app itself is installed on the phone.
}

export async function downloadTourFiles(
  area: Area,
  onProgress: (p: DownloadProgress) => void,
  signal: AbortSignal
): Promise<DownloadResult> {
  const files = remoteAudio(area);
  if (files.length === 0) {
    onProgress({ bytesDone: 0, bytesTotal: 0, filesDone: 0, filesTotal: 0 });
    return { sizeBytes: 0, complete: true, bundled: true };
  }
  let bytesDone = 0;
  let filesDone = 0;
  let failed = false;
  for (const file of files) {
    if (signal.aborted) throw new Error("AbortError");
    try {
      const uri = await getCachedOrDownload(file.id, file.source);
      bytesDone += new File(uri).size ?? 0;
    } catch {
      failed = true;
    }
    filesDone += 1;
    onProgress({ bytesDone, bytesTotal: 0, filesDone, filesTotal: files.length });
  }
  return { sizeBytes: bytesDone, complete: !failed, bundled: false };
}

/** Native keeps its list in AsyncStorage only (bundled tours need none). */
export async function listSavedTours(): Promise<{ areaId: string; sizeBytes: number }[]> {
  return [];
}

export async function removeTourFiles(area: Area): Promise<void> {
  for (const file of remoteAudio(area)) {
    // Only files that are saved: never start a download while deleting.
    if (!isNarrationCached(file.id, file.source)) continue;
    try {
      const uri = await getCachedOrDownload(file.id, file.source);
      new File(uri).delete();
    } catch {
      // Already gone.
    }
  }
}

/** Native plays saved files through audioCache already; nothing extra to look up. */
export async function savedAudioUrl(_source: string): Promise<string | null> {
  return null;
}

export async function tourAudioSaved(area: Area): Promise<boolean> {
  return remoteAudio(area).every((f) => isNarrationCached(f.id, f.source));
}

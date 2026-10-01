import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { getAreaById } from "../content";
import {
  downloadTourFiles,
  listSavedTours,
  offlineDownloadsSupported,
  removeTourFiles,
  tourAudioSaved,
  type DownloadProgress,
} from "./tourFiles";

/**
 * Which tours are saved for offline use, how big they are, and any download
 * in progress. The list itself is kept in AsyncStorage; the files live in the
 * browser's Cache Storage (web) or the app's documents folder (native).
 */

const MANIFEST_KEY = "storystep.offline.tours";

export type OfflineStatus = "downloading" | "paused" | "ready" | "incomplete";

export interface OfflineTour {
  status: OfflineStatus;
  /** Bytes saved on this device for the tour. */
  sizeBytes: number;
  /** The tour ships inside the app (native), so nothing was downloaded. */
  bundled: boolean;
  updatedAt: number;
}

export interface LiveProgress extends DownloadProgress {
  /** 0-1. */
  fraction: number;
  /** Estimated seconds left, once there's enough to go on. */
  secondsLeft: number | null;
}

interface OfflineState {
  ready: boolean;
  tours: Record<string, OfflineTour>;
  progress: Record<string, LiveProgress>;
  load: () => Promise<void>;
  download: (areaId: string) => Promise<OfflineStatus>;
  pause: (areaId: string) => void;
  remove: (areaId: string) => Promise<void>;
}

const controllers = new Map<string, AbortController>();

async function persist(tours: Record<string, OfflineTour>) {
  try {
    await AsyncStorage.setItem(MANIFEST_KEY, JSON.stringify(tours));
  } catch (e) {
    console.warn("[offline] couldn't save the downloads list:", e);
  }
}

export const useOfflineStore = create<OfflineState>((set, get) => ({
  ready: false,
  tours: {},
  progress: {},

  load: async () => {
    let tours: Record<string, OfflineTour> = {};
    try {
      tours = JSON.parse((await AsyncStorage.getItem(MANIFEST_KEY)) ?? "{}");
    } catch {
      tours = {};
    }
    // Rebuild from what's actually saved: the list can be lost while the
    // files survive, and a downloaded tour must never show as missing.
    for (const { areaId, sizeBytes } of await listSavedTours()) {
      const area = getAreaById(areaId);
      if (!area || tours[areaId]?.status === "ready") continue;
      const complete = await tourAudioSaved(area);
      tours[areaId] = {
        status: complete ? "ready" : "paused",
        sizeBytes,
        bundled: false,
        updatedAt: tours[areaId]?.updatedAt ?? Date.now(),
      };
    }
    // A download cut off by the app closing picks up where it stopped.
    for (const [id, tour] of Object.entries(tours)) {
      if (tour.status === "downloading") tours[id] = { ...tour, status: "paused" };
    }
    // A "ready" tour whose files were cleared (e.g. browser storage wiped)
    // shouldn't claim to work offline.
    await Promise.all(
      Object.entries(tours).map(async ([id, tour]) => {
        const area = getAreaById(id);
        if (!area) {
          delete tours[id];
          return;
        }
        if (tour.status === "ready" && !tour.bundled && !(await tourAudioSaved(area))) {
          tours[id] = { ...tour, status: "incomplete" };
        }
      })
    );
    set({ ready: true, tours });
    await persist(tours);
  },

  download: async (areaId) => {
    const area = getAreaById(areaId);
    if (!area || !offlineDownloadsSupported()) return "incomplete";
    if (controllers.has(areaId)) return "downloading";
    const controller = new AbortController();
    controllers.set(areaId, controller);

    const startedAt = Date.now();
    let startBytes: number | null = null;
    const update = (tour: OfflineTour) => {
      const tours = { ...get().tours, [areaId]: tour };
      set({ tours });
      void persist(tours);
    };
    const previous = get().tours[areaId];
    update({ status: "downloading", sizeBytes: previous?.sizeBytes ?? 0, bundled: false, updatedAt: Date.now() });

    try {
      const result = await downloadTourFiles(
        area,
        (p) => {
          // Time left from this session's own speed (bytes already saved
          // before a resume don't count towards it).
          if (startBytes === null) startBytes = p.bytesDone;
          const elapsed = (Date.now() - startedAt) / 1000;
          const fetched = p.bytesDone - startBytes;
          const rate = elapsed > 1 && fetched > 0 ? fetched / elapsed : 0;
          const fraction =
            p.bytesTotal > 0 ? Math.min(1, p.bytesDone / p.bytesTotal) : p.filesTotal > 0 ? p.filesDone / p.filesTotal : 0;
          const secondsLeft = rate > 0 && p.bytesTotal > 0 ? Math.max(0, (p.bytesTotal - p.bytesDone) / rate) : null;
          set({ progress: { ...get().progress, [areaId]: { ...p, fraction, secondsLeft } } });
        },
        controller.signal
      );
      const status: OfflineStatus = result.complete ? "ready" : "incomplete";
      update({ status, sizeBytes: result.sizeBytes, bundled: result.bundled, updatedAt: Date.now() });
      return status;
    } catch (e) {
      const paused = controller.signal.aborted || (e as Error).name === "AbortError";
      const bytes = get().progress[areaId]?.bytesDone ?? previous?.sizeBytes ?? 0;
      update({ status: paused ? "paused" : "incomplete", sizeBytes: bytes, bundled: false, updatedAt: Date.now() });
      if (!paused) console.warn("[offline] download failed:", e);
      return paused ? "paused" : "incomplete";
    } finally {
      controllers.delete(areaId);
      const { [areaId]: _done, ...rest } = get().progress;
      set({ progress: rest });
    }
  },

  pause: (areaId) => {
    controllers.get(areaId)?.abort();
  },

  remove: async (areaId) => {
    controllers.get(areaId)?.abort();
    const area = getAreaById(areaId);
    if (area) await removeTourFiles(area);
    const { [areaId]: _gone, ...tours } = get().tours;
    set({ tours });
    await persist(tours);
  },
}));

/** Ready to walk with no connection. */
export function isTourOffline(tour: OfflineTour | undefined): boolean {
  return tour?.status === "ready";
}

/** "12.3 MB" style sizes. */
export function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(bytes < 10 * 1024 * 1024 ? 1 : 0)} MB`;
}


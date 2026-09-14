import { Directory, File, Paths } from "expo-file-system";

const CACHE_DIR_NAME = "narration-cache";

function getCacheDirectory(): Directory {
  const dir = new Directory(Paths.document, CACHE_DIR_NAME);
  if (!dir.exists) {
    dir.create({ intermediates: true, idempotent: true });
  }
  return dir;
}

function cacheFileName(waypointId: string, remoteUrl: string): string {
  const ext = remoteUrl.split(".").pop()?.split("?")[0] ?? "mp3";
  return `${waypointId}.${ext}`;
}

/** Returns a local file:// URI, downloading the narration file only if it isn't already cached. */
export async function getCachedOrDownload(
  waypointId: string,
  remoteUrl: string
): Promise<string> {
  const file = new File(getCacheDirectory(), cacheFileName(waypointId, remoteUrl));
  if (file.exists) return file.uri;

  const downloaded = await File.downloadFileAsync(remoteUrl, file, {
    idempotent: true,
  });
  return downloaded.uri;
}

export function isNarrationCached(waypointId: string, remoteUrl: string): boolean {
  const file = new File(getCacheDirectory(), cacheFileName(waypointId, remoteUrl));
  return file.exists;
}

/** Pre-download an entire tour's narration up front, so it plays over a spotty signal. */
export async function predownloadArea(
  segments: { waypointId: string; remoteUrl: string }[],
  onProgress?: (done: number, total: number) => void
): Promise<void> {
  let done = 0;
  for (const segment of segments) {
    await getCachedOrDownload(segment.waypointId, segment.remoteUrl);
    done += 1;
    onProgress?.(done, segments.length);
  }
}

/**
 * `audioSource` is either a bundled `require(...)` result — a numeric asset
 * id on native, but a plain (already-local) URL string on web, where Metro
 * resolves bundled assets to strings instead — or a genuine remote
 * http(s) URL that needs caching to disk first. Only the latter touches the
 * native-only file-system caching path.
 */
export async function resolveAudioSource(
  waypointId: string,
  audioSource: number | string | null
): Promise<number | string | null> {
  if (audioSource == null) return null;
  if (typeof audioSource === "number") return audioSource;
  if (!/^https?:\/\//i.test(audioSource)) return audioSource;
  return getCachedOrDownload(waypointId, audioSource);
}

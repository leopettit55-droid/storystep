import { areas, getAreaById, type Area, type Coordinates } from "../content";
import { speakLandmark } from "./landmarkSpeech";
import {
  analyzeImage,
  landmarksForArea,
  recognize,
  type LandmarkMatch,
  type Recognition,
  type VisionSignals,
} from "./recognize";

export interface ScanOutcome {
  recognition: Recognition;
  /** Set when the picture couldn't be analysed (offline, no key…) and position alone was used. */
  visionError: string | null;
  /** What ended up on screen and being spoken. */
  shown: { title: string; body: string; note?: string } | null;
}

/** The area whose landmarks to scan: the given one, else every completed tour's stops. */
function landmarksToScan(areaId: string | undefined) {
  const area: Area | undefined = areaId ? getAreaById(areaId) : undefined;
  if (area) return landmarksForArea(area);
  return areas.filter((a) => a.isContentComplete).flatMap(landmarksForArea);
}

/** What a scanned landmark says on screen. */
export function describeMatch(match: LandmarkMatch): NonNullable<ScanOutcome["shown"]> {
  return {
    title: match.landmark.name,
    body: match.landmark.spokenText,
    note: match.landmark.notOpenToVisitors ? "Not open to visitors" : undefined,
  };
}

/** Speaks one match — pausing the tour and its audio first, resuming after. */
export function speakMatch(match: LandmarkMatch): Promise<boolean> {
  return speakLandmark({
    id: match.landmark.id,
    title: match.landmark.name,
    audioSource: match.landmark.audioSource,
    text: match.landmark.spokenText,
  });
}

/**
 * The whole scan: read the picture, blend it with GPS position and compass
 * heading, and speak the answer. If the picture can't be read (offline, no
 * key) it still answers from position alone; if nothing in our catalogue
 * fits it falls back to Google's own best name for what it saw.
 */
export async function scanLandmark(opts: {
  base64: string;
  areaId?: string;
  user: Coordinates | null;
  headingDeg: number | null;
}): Promise<ScanOutcome> {
  let vision: VisionSignals | null = null;
  let visionError: string | null = null;
  try {
    vision = await analyzeImage(opts.base64);
  } catch (e) {
    visionError = e instanceof Error ? e.message : "Couldn't read the picture.";
  }

  const recognition = recognize(landmarksToScan(opts.areaId), vision, opts.user, opts.headingDeg);

  let shown: ScanOutcome["shown"] = null;
  if (recognition.best) {
    shown = describeMatch(recognition.best);
    void speakMatch(recognition.best);
  } else if (recognition.visionName) {
    const text = `This looks like ${recognition.visionName}.`;
    shown = { title: recognition.visionName, body: text };
    void speakLandmark({ id: "vision-guess", title: recognition.visionName, text });
  }

  return { recognition, visionError, shown };
}

import Constants from "expo-constants";
import type { Area, Coordinates, Landmark } from "../content";
import { bearingDegrees, distanceMeters } from "../geofencing/proximityTracker";

export const GOOGLE_VISION_API_KEY: string | undefined =
  Constants.expoConfig?.extra?.googleVisionApiKey;

interface Signal {
  text: string;
  score: number;
  /** How much this kind of signal is trusted: a detected landmark name beats a generic label. */
  weight: number;
}

export interface VisionSignals {
  signals: Signal[];
  /** Best single name Google offered, used when nothing in our catalogue matches. */
  topName: string | null;
}

export interface LandmarkMatch {
  landmark: Landmark;
  /** 0..1 blend of picture evidence and position/heading evidence. */
  score: number;
}

export interface Recognition {
  best: LandmarkMatch | null;
  /** Next-best candidates, offered to the visitor if the top guess is wrong. */
  alternatives: LandmarkMatch[];
  /** Google's own best name for the picture, when our catalogue had no answer. */
  visionName: string | null;
  usedPicture: boolean;
  usedPosition: boolean;
}

/** Sends one picture to Google Cloud Vision for landmark, web-entity and label
 * detection together — three signals, because a lone landmark result rarely
 * covers a quad, a tree or a doorway inside a college. */
export async function analyzeImage(base64Image: string): Promise<VisionSignals> {
  if (!GOOGLE_VISION_API_KEY) throw new Error("No Google Vision API key configured.");

  const response = await fetch(
    `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_VISION_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requests: [
          {
            image: { content: base64Image },
            features: [
              { type: "LANDMARK_DETECTION", maxResults: 3 },
              { type: "WEB_DETECTION", maxResults: 10 },
              { type: "LABEL_DETECTION", maxResults: 12 },
            ],
          },
        ],
      }),
    }
  );

  const json = await response.json();
  if (!response.ok) {
    throw new Error(json?.error?.message ?? `Vision API error (${response.status})`);
  }

  const r = json?.responses?.[0] ?? {};
  const signals: Signal[] = [];
  for (const a of r.landmarkAnnotations ?? []) {
    signals.push({ text: String(a.description).toLowerCase(), score: a.score ?? 0.5, weight: 1 });
  }
  for (const e of r.webDetection?.webEntities ?? []) {
    if (e.description) signals.push({ text: String(e.description).toLowerCase(), score: Math.min(1, (e.score ?? 0.5) / 2), weight: 0.9 });
  }
  for (const g of r.webDetection?.bestGuessLabels ?? []) {
    if (g.label) signals.push({ text: String(g.label).toLowerCase(), score: 0.8, weight: 0.8 });
  }
  for (const l of r.labelAnnotations ?? []) {
    signals.push({ text: String(l.description).toLowerCase(), score: l.score ?? 0.5, weight: 0.6 });
  }

  const topName =
    r.landmarkAnnotations?.[0]?.description ??
    r.webDetection?.bestGuessLabels?.[0]?.label ??
    r.webDetection?.webEntities?.find((e: { description?: string }) => e.description)?.description ??
    null;

  return { signals, topName };
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** How strongly the picture points at this landmark, 0..1. */
export function pictureScore(landmark: Landmark, vision: VisionSignals): number {
  let best = 0;
  const names = [landmark.name.toLowerCase(), ...landmark.aliases];
  for (const raw of names) {
    const generic = raw.startsWith("~");
    const alias = generic ? raw.slice(1) : raw;
    const re = new RegExp(`\\b${escapeRegExp(alias)}s?\\b`, "i");
    for (const s of vision.signals) {
      if (!re.test(s.text)) continue;
      const strength = (generic ? 0.4 : 1) * s.weight * Math.max(0.35, Math.min(1, s.score));
      if (strength > best) best = strength;
    }
  }
  return best;
}

function normalizeAngle(deg: number): number {
  let d = deg % 360;
  if (d > 180) d -= 360;
  if (d < -180) d += 360;
  return d;
}

/**
 * How well the visitor's position and compass heading point at this
 * landmark, 0..1: close enough to see it, and facing roughly toward it.
 * GPS in a walled college is only good to ~5–15 m, so this is a strong hint,
 * never proof — which is why it's blended with what the camera sees.
 */
export function positionScore(landmark: Landmark, user: Coordinates, headingDeg: number | null): number {
  const d = distanceMeters(user, landmark.coordinates);
  const r = landmark.radiusMeters;
  const near = d <= r ? 1 : Math.exp(-(((d - r) / Math.max(r, 15)) ** 2));
  if (headingDeg == null || d < 8) return near * 0.6;
  const diff = Math.abs(normalizeAngle(bearingDegrees(user, landmark.coordinates) - headingDeg));
  return near * Math.exp(-((diff / 30) ** 2));
}

/** Landmarks for scanning: the area's own catalogue, or — for tours without
 * one — each stop, played back as its existing narration. */
export function landmarksForArea(area: Area): Landmark[] {
  if (area.landmarks?.length) return area.landmarks;
  return area.route.map((w) => ({
    id: w.id,
    name: w.name,
    category: "building" as const,
    aliases: w.name
      .toLowerCase()
      .split(/&|,| and | - /)
      .map((p) => p.trim())
      .filter((p) => p.length > 3),
    coordinates: w.coordinates,
    radiusMeters: Math.max(45, w.triggerRadiusMeters * 1.5),
    spokenText: w.narration.scriptText,
    audioSource: w.narration.audioSource,
  }));
}

const TREE_WORDS = /\b(tree|trees|plant|woody plant|oak|willow|elm|plane|leaf|branch|trunk|forest|woodland|foliage|deciduous|mulberry)\b/;
const BUILDING_WORDS = /\b(building|tower|spire|arch|facade|church|chapel|architecture|castle|gothic|cloister|courtyard|quadrangle|column|colonnade|window|stone|house|gate|steeple|belfry)\b/;

/** How strongly the picture's labels say "this is a tree/plant" or "this is a building", 0..1. */
function categoryCue(vision: VisionSignals, words: RegExp): number {
  let best = 0;
  for (const sig of vision.signals) {
    if (words.test(sig.text)) best = Math.max(best, Math.min(1, sig.score) * sig.weight);
  }
  return best;
}

export function recognize(
  landmarks: Landmark[],
  vision: VisionSignals | null,
  user: Coordinates | null,
  headingDeg: number | null
): Recognition {
  // A picture that's clearly all foliage shouldn't be answered with a
  // building just because you happen to be standing near one, and the reverse.
  const treeCue = vision ? categoryCue(vision, TREE_WORDS) : 0;
  const buildingCue = vision ? categoryCue(vision, BUILDING_WORDS) : 0;
  const treeOnly = treeCue >= 0.5 && buildingCue < 0.35;
  const buildingOnly = buildingCue >= 0.5 && treeCue < 0.35;

  const scored: LandmarkMatch[] = landmarks.map((landmark) => {
    const pic = vision ? pictureScore(landmark, vision) : 0;
    const pos = user ? positionScore(landmark, user, headingDeg) : 0;
    let score: number;
    if (vision && user) score = 0.5 * pic + 0.5 * pos;
    else if (user) score = pos;
    else score = pic;
    if (treeOnly) score *= landmark.category === 'tree' ? 1.2 : landmark.category === 'building' ? 0.45 : 0.8;
    else if (buildingOnly) score *= landmark.category === 'tree' ? 0.5 : 1;
    return { landmark, score: Math.min(1, score) };
  });
  scored.sort((a, b) => b.score - a.score);

  let best: LandmarkMatch | null = scored[0] && scored[0].score >= 0.2 ? scored[0] : null;
  // A picture of foliage with no notable tree in view (or one that only
  // matched a nearby building by position) gets the area's general tree
  // narration rather than a wrong building or nothing.
  if (treeOnly && (!best || best.landmark.category === "building")) {
    const generic = landmarks.find((l) => l.treeFallback);
    // Only inside (or right beside) the place the narration is about.
    if (generic && user && distanceMeters(user, generic.coordinates) <= 350) {
      best = { landmark: generic, score: 0.3 };
    }
  }
  const alternatives = scored
    .filter((m) => m.landmark.id !== best?.landmark.id)
    .slice(0, 3)
    .filter((m) => m.score >= 0.1);

  return {
    best,
    alternatives,
    visionName: best ? null : vision?.topName ?? null,
    usedPicture: !!vision,
    usedPosition: !!user,
  };
}

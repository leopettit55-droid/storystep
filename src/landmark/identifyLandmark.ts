import Constants from "expo-constants";
import { areas } from "../content";

export interface LandmarkResult {
  name: string;
  score: number;
  /** Rich local facts, if this landmark matches one of our own waypoints. */
  ourScript: string | null;
}

export const GOOGLE_VISION_API_KEY: string | undefined =
  Constants.expoConfig?.extra?.googleVisionApiKey;

/**
 * Finds a loose name match against our own waypoint content across every
 * area, so a recognized landmark can surface our richer narration instead of
 * just the bare label the Vision API returns.
 */
function findOurFacts(landmarkName: string): string | null {
  const needle = landmarkName.toLowerCase();
  for (const area of areas) {
    for (const waypoint of area.route) {
      const haystack = waypoint.name.toLowerCase();
      if (haystack.includes(needle) || needle.includes(haystack)) {
        return waypoint.narration.scriptText;
      }
    }
  }
  return null;
}

export async function identifyLandmark(base64Image: string): Promise<LandmarkResult[]> {
  if (!GOOGLE_VISION_API_KEY) {
    throw new Error("No Google Vision API key configured.");
  }

  const response = await fetch(
    `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_VISION_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requests: [
          {
            image: { content: base64Image },
            features: [{ type: "LANDMARK_DETECTION", maxResults: 3 }],
          },
        ],
      }),
    }
  );

  const json = await response.json();
  if (!response.ok) {
    const message = json?.error?.message ?? `Vision API error (${response.status})`;
    throw new Error(message);
  }

  const annotations = json?.responses?.[0]?.landmarkAnnotations ?? [];
  return annotations.map((a: { description: string; score: number }) => ({
    name: a.description,
    score: a.score,
    ourScript: findOurFacts(a.description),
  }));
}

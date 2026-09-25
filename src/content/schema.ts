export interface Coordinates {
  lat: number;
  lng: number;
}

export interface NarrationSegment {
  /** Source text — kept alongside the audio so scripts can be edited/regenerated. */
  scriptText: string;
  /** Local asset module (require(...)) or a remote URL once tours are served from a backend. */
  audioSource: number | string | null;
  durationSec: number;
}

export interface Waypoint {
  id: string;
  order: number;
  name: string;
  coordinates: Coordinates;
  /** Radius in meters at which this waypoint's narration triggers. */
  triggerRadiusMeters: number;
  narration: NarrationSegment;
}

/** Something a visitor might point the landmark scanner at — a building, a
 * tree, a garden or a named feature. Recognition combines the camera image
 * (label/alias matching), GPS position and compass heading, so `coordinates`
 * and `radiusMeters` matter as much as `aliases`. */
export interface Landmark {
  id: string;
  name: string;
  category: "building" | "tree" | "garden" | "feature";
  /** Lowercase words/phrases the image-recognition labels may use for this landmark. */
  aliases: string[];
  coordinates: Coordinates;
  /** Roughly how far away you'd stand to look at it — used to weigh GPS proximity. */
  radiusMeters: number;
  /** What the narrator says when this landmark is scanned. */
  spokenText: string;
  audioSource: number | string | null;
  /** Visible from public areas but not open to visitors — the narration says so. */
  notOpenToVisitors?: boolean;
  /** The general "trees of this place" entry, used when a picture is clearly
   * foliage but no specific notable tree is in view. */
  treeFallback?: boolean;
}

export type PriceTier = {
  /** One-off price in GBP for this single tour. */
  singleTour: number;
};

export interface Area {
  id: string;
  name: string;
  city: "London" | "Paris" | "Oxford";
  description: string;
  estimatedDurationMin: number;
  estimatedDistanceKm: number;
  difficulty: "easy" | "moderate" | "hard";
  /** Where the tour actually begins — the app routes the user here first. */
  startingPoint: Coordinates & { label: string };
  route: Waypoint[];
  /** Real street-following walking path from startingPoint through each waypoint
   * in order (from a routing service) — used for the map polyline so the line
   * follows actual roads/paths instead of cutting straight through buildings.
   * Falls back to straight waypoint-to-waypoint segments when absent. */
  path?: Coordinates[];
  /** Everything the landmark scanner can identify in this area. */
  landmarks?: Landmark[];
  /** When true the landmark scanner is offered on the tour page without buying the tour. */
  freeLandmarkScanner?: boolean;
  /** Shown on the tour page — e.g. a separate entry ticket the visitor needs. */
  accessNote?: string;
  /** Stops only trigger in order, and never cut off narration that's still playing.
   * For compact routes where stops sit closer together than GPS can separate. */
  sequentialStops?: boolean;
  /** false for areas that only have a route stub so far (no narration content yet). */
  isContentComplete: boolean;
  /** Local asset module (require(...)) shown as the card thumbnail. */
  image: number | null;
  price: PriceTier;
}

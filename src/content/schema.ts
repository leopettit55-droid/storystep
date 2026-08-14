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

export interface Area {
  id: string;
  name: string;
  description: string;
  estimatedDurationMin: number;
  estimatedDistanceKm: number;
  difficulty: "easy" | "moderate" | "hard";
  /** Where the tour actually begins — the app routes the user here first. */
  startingPoint: Coordinates & { label: string };
  route: Waypoint[];
  /** false for areas that only have a route stub so far (no narration content yet). */
  isContentComplete: boolean;
}

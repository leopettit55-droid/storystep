/** Steps and distance for one walk. */
export interface WalkActivity {
  meters: number;
  steps: number;
  /** "health": counted by the iPhone or Apple Watch (Apple Health). "estimate": worked out from the distance. */
  source: "health" | "estimate";
}

/** An average walking step, used to estimate steps when Apple Health isn't connected. */
export const METERS_PER_STEP = 0.75;

export const estimateSteps = (meters: number) => Math.round(meters / METERS_PER_STEP);

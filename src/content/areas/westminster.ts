import type { Area } from "../schema";

/** Route/content stub — no waypoints yet. Shape matches mayfair.ts so this can be filled in later. */
export const westminster: Area = {
  id: "westminster",
  name: "Westminster",
  description: "Coming soon: Parliament, the Abbey, and the seat of British government on foot.",
  estimatedDurationMin: 0,
  estimatedDistanceKm: 0,
  difficulty: "moderate",
  isContentComplete: false,
  startingPoint: { lat: 51.501, lng: -0.1254, label: "Westminster Underground Station" },
  route: [],
};

import type { Area } from "../schema";

/** Route/content stub — no waypoints yet. Shape matches mayfair.ts so this can be filled in later. */
export const marylebone: Area = {
  id: "marylebone",
  name: "Marylebone",
  description: "Coming soon: Sherlock Holmes's street, Regency townhouses, and Marylebone High Street.",
  estimatedDurationMin: 0,
  estimatedDistanceKm: 0,
  difficulty: "easy",
  isContentComplete: false,
  startingPoint: { lat: 51.5226, lng: -0.1571, label: "Baker Street Underground Station" },
  route: [],
};

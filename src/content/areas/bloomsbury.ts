import type { Area } from "../schema";

/** Route/content stub — no waypoints yet. Shape matches mayfair.ts so this can be filled in later. */
export const bloomsbury: Area = {
  id: "bloomsbury",
  name: "Bloomsbury",
  description: "Coming soon: the British Museum, the Bloomsbury Group, and London's university quarter.",
  estimatedDurationMin: 0,
  estimatedDistanceKm: 0,
  difficulty: "easy",
  isContentComplete: false,
  startingPoint: { lat: 51.523, lng: -0.1244, label: "Russell Square Underground Station" },
  route: [],
};

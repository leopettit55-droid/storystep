import type { Area } from "../schema";

/** Route/content stub — no waypoints yet. Shape matches mayfair.ts so this can be filled in later. */
export const belgravia: Area = {
  id: "belgravia",
  name: "Belgravia",
  city: "London",
  description: "Coming soon: white stucco terraces, embassies, and London's most exclusive garden squares.",
  estimatedDurationMin: 0,
  estimatedDistanceKm: 0,
  difficulty: "easy",
  isContentComplete: false,
  startingPoint: { lat: 51.4924, lng: -0.1565, label: "Sloane Square Underground Station" },
  route: [],
  image: null,
  price: { singleTour: 4.99 },
};

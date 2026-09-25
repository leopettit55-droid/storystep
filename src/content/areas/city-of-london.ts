import type { Area } from "../schema";

/** Route/content stub — no waypoints yet. Shape matches mayfair.ts so this can be filled in later. */
export const cityOfLondon: Area = {
  id: "city-of-london",
  name: "The City of London",
  city: "London",
  description: "Coming soon: Roman walls, livery companies, St Paul's, and two thousand years of history in one square mile.",
  estimatedDurationMin: 0,
  estimatedDistanceKm: 0,
  difficulty: "moderate",
  isContentComplete: false,
  startingPoint: { lat: 51.5133, lng: -0.0886, label: "Bank Underground Station" },
  route: [],
  image: null,
  price: { singleTour: 4.99 },
};

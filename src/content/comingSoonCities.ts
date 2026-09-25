export interface ComingSoonCity {
  id: string;
  name: string;
  country: string;
  /** Approximate city-centre coordinates, from general knowledge — used only
   * to frame the 3D map, not for any real tour content yet. */
  lat: number;
  lng: number;
}

/** Major world capitals and top tourism cities StoryStep doesn't have tours
 * for yet. Shown as "coming soon" on the Tours list and the 3D map so people
 * can see what's next and register interest by browsing what's live today. */
export const COMING_SOON_CITIES: ComingSoonCity[] = [
  // Europe
  { id: "rome", name: "Rome", country: "Italy", lat: 41.9028, lng: 12.4964 },
  { id: "venice", name: "Venice", country: "Italy", lat: 45.4408, lng: 12.3155 },
  { id: "florence", name: "Florence", country: "Italy", lat: 43.7696, lng: 11.2558 },
  { id: "milan", name: "Milan", country: "Italy", lat: 45.4642, lng: 9.19 },
  { id: "barcelona", name: "Barcelona", country: "Spain", lat: 41.3874, lng: 2.1686 },
  { id: "madrid", name: "Madrid", country: "Spain", lat: 40.4168, lng: -3.7038 },
  { id: "lisbon", name: "Lisbon", country: "Portugal", lat: 38.7223, lng: -9.1393 },
  { id: "berlin", name: "Berlin", country: "Germany", lat: 52.52, lng: 13.405 },
  { id: "munich", name: "Munich", country: "Germany", lat: 48.1351, lng: 11.582 },
  { id: "amsterdam", name: "Amsterdam", country: "Netherlands", lat: 52.3676, lng: 4.9041 },
  { id: "brussels", name: "Brussels", country: "Belgium", lat: 50.8503, lng: 4.3517 },
  { id: "vienna", name: "Vienna", country: "Austria", lat: 48.2082, lng: 16.3738 },
  { id: "zurich", name: "Zurich", country: "Switzerland", lat: 47.3769, lng: 8.5417 },
  { id: "prague", name: "Prague", country: "Czechia", lat: 50.0755, lng: 14.4378 },
  { id: "budapest", name: "Budapest", country: "Hungary", lat: 47.4979, lng: 19.0402 },
  { id: "warsaw", name: "Warsaw", country: "Poland", lat: 52.2297, lng: 21.0122 },
  { id: "copenhagen", name: "Copenhagen", country: "Denmark", lat: 55.6761, lng: 12.5683 },
  { id: "stockholm", name: "Stockholm", country: "Sweden", lat: 59.3293, lng: 18.0686 },
  { id: "oslo", name: "Oslo", country: "Norway", lat: 59.9139, lng: 10.7522 },
  { id: "dublin", name: "Dublin", country: "Ireland", lat: 53.3498, lng: -6.2603 },
  { id: "edinburgh", name: "Edinburgh", country: "United Kingdom", lat: 55.9533, lng: -3.1883 },
  { id: "athens", name: "Athens", country: "Greece", lat: 37.9838, lng: 23.7275 },
  { id: "istanbul", name: "Istanbul", country: "Türkiye", lat: 41.0082, lng: 28.9784 },
  { id: "moscow", name: "Moscow", country: "Russia", lat: 55.7558, lng: 37.6173 },

  // Americas
  { id: "new-york", name: "New York", country: "United States", lat: 40.7128, lng: -74.006 },
  { id: "washington-dc", name: "Washington, D.C.", country: "United States", lat: 38.9072, lng: -77.0369 },
  { id: "san-francisco", name: "San Francisco", country: "United States", lat: 37.7749, lng: -122.4194 },
  { id: "los-angeles", name: "Los Angeles", country: "United States", lat: 34.0522, lng: -118.2437 },
  { id: "chicago", name: "Chicago", country: "United States", lat: 41.8781, lng: -87.6298 },
  { id: "toronto", name: "Toronto", country: "Canada", lat: 43.6532, lng: -79.3832 },
  { id: "mexico-city", name: "Mexico City", country: "Mexico", lat: 19.4326, lng: -99.1332 },
  { id: "rio-de-janeiro", name: "Rio de Janeiro", country: "Brazil", lat: -22.9068, lng: -43.1729 },
  { id: "buenos-aires", name: "Buenos Aires", country: "Argentina", lat: -34.6037, lng: -58.3816 },
  { id: "lima", name: "Lima", country: "Peru", lat: -12.0464, lng: -77.0428 },

  // Asia
  { id: "tokyo", name: "Tokyo", country: "Japan", lat: 35.6762, lng: 139.6503 },
  { id: "kyoto", name: "Kyoto", country: "Japan", lat: 35.0116, lng: 135.7681 },
  { id: "seoul", name: "Seoul", country: "South Korea", lat: 37.5665, lng: 126.978 },
  { id: "beijing", name: "Beijing", country: "China", lat: 39.9042, lng: 116.4074 },
  { id: "shanghai", name: "Shanghai", country: "China", lat: 31.2304, lng: 121.4737 },
  { id: "hong-kong", name: "Hong Kong", country: "China", lat: 22.3193, lng: 114.1694 },
  { id: "singapore", name: "Singapore", country: "Singapore", lat: 1.3521, lng: 103.8198 },
  { id: "bangkok", name: "Bangkok", country: "Thailand", lat: 13.7563, lng: 100.5018 },
  { id: "dubai", name: "Dubai", country: "UAE", lat: 25.2048, lng: 55.2708 },
  { id: "mumbai", name: "Mumbai", country: "India", lat: 19.076, lng: 72.8777 },
  { id: "delhi", name: "Delhi", country: "India", lat: 28.7041, lng: 77.1025 },

  // Africa & Oceania
  { id: "cairo", name: "Cairo", country: "Egypt", lat: 30.0444, lng: 31.2357 },
  { id: "marrakech", name: "Marrakech", country: "Morocco", lat: 31.6295, lng: -7.9811 },
  { id: "cape-town", name: "Cape Town", country: "South Africa", lat: -33.9249, lng: 18.4241 },
  { id: "sydney", name: "Sydney", country: "Australia", lat: -33.8688, lng: 151.2093 },
  { id: "melbourne", name: "Melbourne", country: "Australia", lat: -37.8136, lng: 144.9631 },
  { id: "auckland", name: "Auckland", country: "New Zealand", lat: -36.8485, lng: 174.7633 },
];

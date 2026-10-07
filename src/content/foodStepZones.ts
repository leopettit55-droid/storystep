/** Neighbourhood zones on FoodStep's maps, so walkers can see what's near
 * what. Only Manchester so far: copy its shape for other cities.
 *
 * Outlines are approximate, drawn along the main streets that bound each
 * area (these neighbourhoods have no official edges). Points are [lng, lat]. */

export interface FoodStepZone {
  id: string;
  name: string;
  description: string;
  outline: [number, number][];
}

const ZONES: Record<string, FoodStepZone[]> = {
  manchester: [
    {
      id: "northern-quarter",
      name: "Northern Quarter",
      description: "Indie cafes, bars and street food from Oldham Street down to Dale Street",
      outline: [
        [-2.238, 53.485], [-2.2318, 53.485], [-2.229, 53.483], [-2.23, 53.4804],
        [-2.2348, 53.4814], [-2.2366, 53.4822], [-2.238, 53.4826],
      ],
    },
    {
      id: "mackie-mayor",
      name: "Mackie Mayor & Smithfield",
      description: "Food halls in the old market buildings around Swan Street",
      outline: [[-2.238, 53.4868], [-2.2305, 53.4866], [-2.2318, 53.485], [-2.238, 53.485]],
    },
    {
      id: "city-centre",
      name: "City Centre",
      description: "The shopping streets around the Arndale, Exchange Square, King Street and Spring Gardens",
      outline: [
        [-2.2465, 53.4865], [-2.238, 53.4858], [-2.238, 53.4826], [-2.24, 53.4812], [-2.2385, 53.4797],
        [-2.2412, 53.4797], [-2.244, 53.4808], [-2.2462, 53.483],
      ],
    },
    {
      id: "piccadilly",
      name: "Piccadilly",
      description: "The gardens, Portland Street and the station approach",
      outline: [
        [-2.24, 53.4812], [-2.238, 53.4826], [-2.2366, 53.4822], [-2.2348, 53.4814], [-2.23, 53.4804],
        [-2.2296, 53.48], [-2.23, 53.4768], [-2.234, 53.479], [-2.2368, 53.4776], [-2.2385, 53.4797],
      ],
    },
    {
      id: "chinatown",
      name: "Chinatown",
      description: "Dim sum, noodle bars and Asian supermarkets under the arch",
      outline: [[-2.2412, 53.4797], [-2.2385, 53.4797], [-2.2368, 53.4776], [-2.24, 53.477]],
    },
    {
      id: "the-village",
      name: "The Village",
      description: "Canal Street's bars and the new Kampus neighbourhood",
      outline: [[-2.2368, 53.4776], [-2.234, 53.479], [-2.23, 53.4768], [-2.2335, 53.4752], [-2.2372, 53.476]],
    },
    {
      id: "deansgate-st-peters",
      name: "Deansgate & St Peter's",
      description: "Big-name restaurants and grand old halls along Deansgate",
      outline: [
        [-2.2465, 53.4865], [-2.2462, 53.483], [-2.244, 53.4808], [-2.2412, 53.4797], [-2.24, 53.477],
        [-2.2445, 53.4765], [-2.25, 53.477], [-2.2497, 53.4778], [-2.2486, 53.48], [-2.2478, 53.483], [-2.2478, 53.486],
      ],
    },
    {
      id: "spinningfields",
      name: "Spinningfields",
      description: "Smart restaurants and bars between Deansgate and the river",
      outline: [[-2.2478, 53.483], [-2.2486, 53.48], [-2.2497, 53.4778], [-2.253, 53.479], [-2.2545, 53.4825], [-2.2505, 53.484]],
    },
    {
      id: "oxford-street",
      name: "Oxford Street",
      description: "Quick, student-friendly eats along Oxford Street and Oxford Road",
      outline: [[-2.2445, 53.4765], [-2.24, 53.477], [-2.2372, 53.476], [-2.238, 53.472], [-2.243, 53.4715], [-2.2455, 53.4745]],
    },
  ],
};

export function zonesFor(cityId: string): FoodStepZone[] {
  return ZONES[cityId] ?? [];
}

/** Whether a point is inside a zone's outline (ray casting). */
export function zoneContains(zone: FoodStepZone, lng: number, lat: number): boolean {
  let inside = false;
  const pts = zone.outline;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const [xi, yi] = pts[i];
    const [xj, yj] = pts[j];
    if (yi > lat !== yj > lat && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

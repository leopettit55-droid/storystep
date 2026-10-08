/** Neighbourhood zones on FoodStep's maps, so walkers can see what's near
 * what. Manchester, Oxford and Buenos Aires so far: copy their shape for other cities.
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
        [-2.2384, 53.485], [-2.2318, 53.485], [-2.229, 53.483], [-2.23, 53.4804],
        [-2.2348, 53.4814], [-2.2366, 53.4822], [-2.2384, 53.4826],
      ],
    },
    {
      id: "mackie-mayor",
      name: "Mackie Mayor & Smithfield",
      description: "Food halls in the old market buildings around Swan Street",
      outline: [[-2.2384, 53.4868], [-2.2305, 53.4866], [-2.2318, 53.485], [-2.2384, 53.485]],
    },
    {
      id: "city-centre",
      name: "City Centre",
      description: "The shopping streets around the Arndale, Exchange Square, King Street and Spring Gardens",
      outline: [
        [-2.2465, 53.4865], [-2.2384, 53.4858], [-2.2384, 53.4826], [-2.24, 53.4812], [-2.2385, 53.4797],
        [-2.2412, 53.4797], [-2.244, 53.4808], [-2.2462, 53.483],
      ],
    },
    {
      id: "piccadilly",
      name: "Piccadilly",
      description: "The gardens, Portland Street and the station approach",
      outline: [
        [-2.24, 53.4812], [-2.2384, 53.4826], [-2.2366, 53.4822], [-2.2348, 53.4814], [-2.23, 53.4804],
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
      outline: [[-2.2368, 53.4776], [-2.234, 53.479], [-2.23, 53.4768], [-2.2335, 53.4752], [-2.2372, 53.476], [-2.24, 53.477]],
    },
    {
      id: "deansgate-st-peters",
      name: "Deansgate & St Peter's",
      description: "Big-name restaurants and grand old halls along Deansgate",
      outline: [
        [-2.2465, 53.4865], [-2.2462, 53.483], [-2.244, 53.4808], [-2.2412, 53.4797], [-2.24, 53.477],
        [-2.2445, 53.4765], [-2.2515, 53.4757], [-2.2508, 53.4783], [-2.2486, 53.48], [-2.2478, 53.483],
        [-2.2505, 53.484], [-2.2498, 53.4862],
      ],
    },
    {
      id: "spinningfields",
      name: "Spinningfields",
      description: "Smart restaurants and bars between Deansgate and the river",
      outline: [[-2.2478, 53.483], [-2.2486, 53.48], [-2.2508, 53.4783], [-2.253, 53.479], [-2.2545, 53.4825], [-2.2505, 53.484]],
    },
    {
      id: "oxford-street",
      name: "Oxford Street",
      description: "Quick, student-friendly eats along Oxford Street and Oxford Road",
      outline: [[-2.2445, 53.4765], [-2.24, 53.477], [-2.2372, 53.476], [-2.238, 53.472], [-2.243, 53.4715], [-2.2465, 53.475]],
    },
    {
      id: "curry-mile",
      name: "Curry Mile (Rusholme)",
      description: "Wilmslow Road's famous strip of curry houses, grills and sweet shops, a bus ride south",
      outline: [[-2.2275, 53.4595], [-2.2235, 53.4595], [-2.2225, 53.452], [-2.2265, 53.452]],
    },
  ],
  oxford: [
    {
      id: "cornmarket",
      name: "Cornmarket & St Giles",
      description: "The main shopping street, Carfax, Beaumont Street and St Giles",
      // The notch on the east side is the Covered Market.
      outline: [
        [-1.26, 51.748], [-1.26, 51.7528], [-1.2598, 51.7548], [-1.264, 51.755], [-1.264, 51.7575],
        [-1.2574, 51.7575], [-1.2574, 51.7531], [-1.2582, 51.7531], [-1.2582, 51.7523], [-1.2574, 51.7523], [-1.2574, 51.746],
      ],
    },
    {
      id: "covered-market",
      name: "Covered Market",
      description: "Oxford's 18th-century market hall of butchers, bakers, cafés and food counters",
      outline: [[-1.2582, 51.7523], [-1.2556, 51.7523], [-1.2556, 51.7531], [-1.2582, 51.7531]],
    },
    {
      id: "high-street",
      name: "High Street & Broad Street",
      description: "Colleges, old coffee houses and historic pubs from Broad Street down to Magdalen Bridge",
      // The notch on the west side is the Covered Market.
      outline: [
        [-1.2574, 51.746], [-1.2574, 51.7523], [-1.2556, 51.7523], [-1.2556, 51.7531], [-1.2574, 51.7531],
        [-1.2574, 51.7575], [-1.251, 51.7575], [-1.247, 51.7522], [-1.247, 51.75], [-1.2545, 51.749], [-1.255, 51.7458],
      ],
    },
    {
      id: "george-street",
      name: "George Street & Gloucester Green",
      description: "Busy restaurants, theatres and the open-air market at Gloucester Green",
      outline: [[-1.2598, 51.7548], [-1.264, 51.755], [-1.264, 51.7528], [-1.26, 51.7528]],
    },
    {
      id: "westgate",
      name: "Westgate & Castle",
      description: "The Westgate centre's rooftop and food court, Oxford Castle and the streets towards the station",
      outline: [[-1.26, 51.7528], [-1.264, 51.7528], [-1.2685, 51.7535], [-1.2685, 51.748], [-1.26, 51.748]],
    },
    {
      id: "jericho",
      name: "Jericho & North Parade",
      description: "Neighbourhood bistros and canal-side pubs along Walton Street, up to North Parade",
      outline: [
        [-1.264, 51.7575], [-1.259, 51.7575], [-1.259, 51.766], [-1.264, 51.766], [-1.2725, 51.763],
        [-1.272, 51.757], [-1.264, 51.757],
      ],
    },
    {
      id: "summertown",
      name: "Summertown & North Oxford",
      description: "North Oxford's village high street and the river at the Cherwell Boathouse",
      outline: [[-1.2725, 51.766], [-1.252, 51.766], [-1.252, 51.7815], [-1.2725, 51.7815]],
    },
    {
      id: "cowley-road",
      name: "Cowley Road & St Clement's",
      description: "Oxford's independent high street east of Magdalen Bridge, full of cafés, bars and global food",
      outline: [
        [-1.2465, 51.7525], [-1.238, 51.7522], [-1.2265, 51.7455], [-1.2265, 51.7395], [-1.239, 51.7395],
        [-1.244, 51.746], [-1.2468, 51.7495],
      ],
    },
  ],
  "buenos-aires": [
    {
      id: "palermo",
      name: "Palermo",
      description: "Soho, Hollywood and Botánico: Buenos Aires' busiest food neighbourhood, from parrillas to bakeries",
      outline: [[-58.448, -34.562], [-58.4, -34.57], [-58.414, -34.599], [-58.448, -34.599]],
    },
    {
      id: "recoleta",
      name: "Recoleta & Barrio Norte",
      description: "Grand avenues, old-school empanada houses and the famous cemetery",
      outline: [
        [-58.4, -34.57], [-58.378, -34.578], [-58.38, -34.582], [-58.3935, -34.599], [-58.3935, -34.6],
        [-58.4145, -34.6], [-58.414, -34.599],
      ],
    },
    {
      id: "centro",
      name: "Centro & Retiro",
      description: "Downtown: Avenida Corrientes, the Obelisco and classic city-centre spots",
      outline: [[-58.38, -34.582], [-58.37, -34.582], [-58.369, -34.613], [-58.3935, -34.613], [-58.3935, -34.599]],
    },
    {
      id: "puerto-madero",
      name: "Puerto Madero",
      description: "Restored docks with waterside restaurants",
      outline: [[-58.3688, -34.595], [-58.359, -34.595], [-58.359, -34.623], [-58.3688, -34.623]],
    },
    {
      id: "san-telmo",
      name: "San Telmo",
      description: "Cobbled streets, antiques and the city's oldest bodegones and parrillas",
      // The notch, reached by a hair-thin channel from the east edge, is the Mercado de San Telmo.
      outline: [
        [-58.379, -34.613], [-58.369, -34.613], [-58.369, -34.6191], [-58.3718, -34.6191], [-58.3718, -34.61865],
        [-58.3733, -34.61865], [-58.3733, -34.6196], [-58.3718, -34.6196], [-58.3718, -34.61911], [-58.369, -34.61911],
        [-58.369, -34.626], [-58.379, -34.626],
      ],
    },
    {
      id: "mercado-san-telmo",
      name: "Mercado de San Telmo",
      description: "The 1897 iron-and-glass market hall: choripán, empanadas, grills and pastries under one roof",
      outline: [[-58.3733, -34.61865], [-58.3718, -34.61865], [-58.3718, -34.6196], [-58.3733, -34.6196]],
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

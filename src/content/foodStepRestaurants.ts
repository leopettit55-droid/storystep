/** Restaurants on FoodStep's maps, per city and cuisine. Only Manchester's
 * Mexican so far, as the pattern to copy for the rest.
 *
 * Picked in October 2026 from what TripAdvisor, The Manc (June 2026) and
 * That's Up (March 2026) rank highest, kept to the city centre so they all
 * fit on the map. Positions and addresses are from OpenStreetMap where it has
 * the restaurant, otherwise the restaurant's published address. Descriptions
 * are our own. No ratings yet: TripAdvisor's and Google's can only be shown
 * through their licensed APIs. */

export interface FoodStepRestaurant {
  id: string;
  name: string;
  /** Shown under the name, e.g. "Mexican" or "Mexican & Japanese". */
  style: string;
  address: string;
  lat: number;
  lng: number;
  description: string;
  /** From a licensed source, with its name for the credit line. */
  rating?: { score: number; outOf: number; source: string };
}

const RESTAURANTS: Record<string, FoodStepRestaurant[]> = {
  "manchester/mexican": [
    {
      id: "don-tacos",
      name: "Don Tacos",
      style: "Mexican",
      address: "45–50 Portland Street, Piccadilly, M1 4AJ",
      lat: 53.48018,
      lng: -2.23641,
      description: "Says it brought the birria taco to the UK. Come for slow-cooked birria tacos with consommé for dunking, and cheesy quesadillas.",
    },
    {
      id: "ocasa",
      name: "OCASA",
      style: "Mexican",
      address: "1 The Avenue, Spinningfields, M3 3AP",
      lat: 53.4802,
      lng: -2.2502,
      description: "A Tulum-inspired Mexican restaurant and tequila bar, with modern takes on Mexico City street food.",
    },
    {
      id: "madre",
      name: "Madre",
      style: "Mexican",
      address: "47 Chorlton Street, M1 3FY",
      lat: 53.47737,
      lng: -2.23542,
      description: "A modern Mexican kitchen and cocktail bar. Crispy pork belly and tacos are the favourites.",
    },
    {
      id: "birria-brothers",
      name: "Birria Brothers",
      style: "Mexican",
      address: "Koffee Pot, 80–82 Oldham Street, Northern Quarter",
      lat: 53.48414,
      lng: -2.23325,
      description: "Takes over the Koffee Pot every evening: fried birria tacos with spiced consommé, plus birria ramen. A pop-up that once drew four-hour queues.",
    },
    {
      id: "picos-tacos",
      name: "Pico's Tacos",
      style: "Mexican",
      address: "Mackie Mayor, 1 Eagle Street, M4 5BU",
      lat: 53.48549,
      lng: -2.23486,
      description: "A taco counter in the Mackie Mayor food hall, known for its creative tacos, loaded nachos and margaritas.",
    },
    {
      id: "panchos-burritos",
      name: "Pancho's Burritos",
      style: "Mexican",
      address: "Arndale Food Market, 49 High Street, M4 3AH",
      lat: 53.4834,
      lng: -2.2393,
      description: "An award-winning market stall making burritos, tacos and enchiladas from family recipes.",
    },
    {
      id: "listo-burrito",
      name: "Listo Burrito",
      style: "Mexican",
      address: "91–93 Oxford Street, M1 6ET",
      lat: 53.47534,
      lng: -2.24152,
      description: "Quick, build-your-own burritos and bowls, popular for being filling and good value.",
    },
    {
      id: "peter-street-kitchen",
      name: "Peter Street Kitchen",
      style: "Mexican & Japanese",
      address: "Free Trade Hall, Peter Street, M2 5GP",
      lat: 53.4779,
      lng: -2.2473,
      description: "An upmarket restaurant in the historic Free Trade Hall, pairing Mexican and Japanese cooking.",
    },
    {
      id: "las-iguanas",
      name: "Las Iguanas",
      style: "Latin American",
      address: "84 Deansgate, M3 2ER",
      lat: 53.48247,
      lng: -2.24713,
      description: "A lively Latin American chain with Mexican favourites like sizzling fajitas, and a long cocktail list.",
    },
    {
      id: "casa-mexica",
      name: "Casa Mexica",
      style: "Tex-Mex",
      address: "Chester Street, M1 5QS",
      lat: 53.47242,
      lng: -2.2402,
      description: "A colourful, casual spot for burritos and Tex-Mex classics, with bright murals on the walls.",
    },
  ],
};

export function restaurantsFor(cityId: string, cuisineId: string): FoodStepRestaurant[] {
  return RESTAURANTS[`${cityId}/${cuisineId}`] ?? [];
}

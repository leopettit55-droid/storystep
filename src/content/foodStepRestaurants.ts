/** Restaurants on FoodStep's maps, per city and cuisine. Only Manchester's
 * Mexican so far, as the pattern to copy for the rest.
 *
 * Checked in October 2026 against TripAdvisor's Mexican list, Manchester's
 * Finest (March 2026), The Manc (June 2026) and That's Up (March 2026), and
 * kept to places with 2026 evidence that they're open (closed ones like
 * El Taquero and Liquor & Burn left out). City centre only, so they all sit
 * in a zone (foodStepZones.ts); at most 6 per zone. Positions and addresses
 * are from OpenStreetMap where it has the restaurant, otherwise the
 * restaurant's published address; the Arndale and Kampus ones are placed by
 * hand inside their building. Descriptions are our own. No ratings yet:
 * TripAdvisor's and Google's can only be shown through their licensed APIs. */

export interface FoodStepRestaurant {
  id: string;
  name: string;
  /** Its neighbourhood: an id from foodStepZones.ts. */
  zone: string;
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
    // Northern Quarter
    {
      id: "birria-brothers",
      zone: "northern-quarter",
      name: "Birria Brothers",
      style: "Mexican",
      address: "Koffee Pot, 84–86 Oldham Street, M4 1LE",
      lat: 53.48414,
      lng: -2.23325,
      description: "Takes over the Koffee Pot from 4pm every day: fried birria tacos with spiced consommé, plus birria ramen. A pop-up that once drew four-hour queues.",
    },
    {
      id: "boogalu",
      zone: "northern-quarter",
      name: "Boogalú",
      style: "Mexican & Latin",
      address: "12 Tariff Street, M1 2FF",
      lat: 53.48125,
      lng: -2.23211,
      description: "A rum and tequila bar with a taqueria: tacos, nachos and grilled prawns, and a lively bottomless brunch at weekends.",
    },
    {
      id: "el-jefe-birria",
      zone: "northern-quarter",
      name: "El Jefe Birria",
      style: "Mexican",
      address: "MALA, 8 Dale Street, M1 1JA",
      lat: 53.48201,
      lng: -2.23498,
      description: "Messy, many-napkin birria quesadillas stuffed with slow-braised meat, stretchy cheese and properly spicy salsa.",
    },
    // Mackie Mayor & Smithfield
    {
      id: "picos-tacos",
      zone: "mackie-mayor",
      name: "Pico's Tacos",
      style: "Mexican",
      address: "Mackie Mayor, 1 Eagle Street, M4 5BU",
      lat: 53.48549,
      lng: -2.23486,
      description: "A taco counter in the Mackie Mayor food hall, pressing its own corn tortillas, with creative fillings, loaded nachos and margaritas.",
    },
    // City Centre
    {
      id: "panchos-burritos",
      zone: "city-centre",
      name: "Pancho's Burritos",
      style: "Mexican",
      address: "Arndale Food Market, 49 High Street, M4 3AH",
      lat: 53.4834,
      lng: -2.2393,
      description: "A market stall making burritos, tacos and enchiladas from family recipes since 2009. Cheap, quick and much loved.",
    },
    {
      id: "barburrito-arndale",
      zone: "city-centre",
      name: "Barburrito (Arndale)",
      style: "Mexican",
      address: "Manchester Arndale, M4 3AQ",
      lat: 53.4838,
      lng: -2.2414,
      description: "The Manchester-born burrito chain's big Arndale branch: quick, filling burritos and bowls built to order.",
    },
    {
      id: "tortilla-arndale",
      zone: "city-centre",
      name: "Tortilla (Arndale)",
      style: "Mexican",
      address: "Manchester Arndale, M4 3AQ",
      lat: 53.483,
      lng: -2.2407,
      description: "Fast-casual burritos, tacos and nachos you build yourself, handy for a shopping break.",
    },
    {
      id: "taco-bell-market-street",
      zone: "city-centre",
      name: "Taco Bell",
      style: "Tex-Mex",
      address: "32 Market Street, M2 1NP",
      lat: 53.48248,
      lng: -2.24315,
      description: "The American fast-food chain's crunchy tacos, burritos and quesadillas, open late.",
    },
    {
      id: "sandinista",
      zone: "city-centre",
      name: "Sandinista",
      style: "Mexican & Latin",
      address: "2 Old Bank Street, M2 7PF",
      lat: 53.48215,
      lng: -2.24491,
      description: "A late-night dive bar off St Ann's Square serving tacos and Latin street food with tequila cocktails.",
    },
    // Piccadilly
    {
      id: "don-tacos",
      zone: "piccadilly",
      name: "Don Tacos",
      style: "Mexican",
      address: "Unit E3, One Piccadilly Gardens, M1 1RG",
      lat: 53.48018,
      lng: -2.23641,
      description: "Says it brought the birria taco to the UK. Come for slow-cooked birria tacos with consommé for dunking, and cheesy quesadillas.",
    },
    {
      id: "barburrito-piccadilly",
      zone: "piccadilly",
      name: "Barburrito (Piccadilly Gardens)",
      style: "Mexican",
      address: "One Piccadilly Gardens, M1 1RG",
      lat: 53.48055,
      lng: -2.23675,
      description: "Where Barburrito started in 2005: build-your-own burritos, bowls and tacos, fast.",
    },
    {
      id: "zambrero-piccadilly",
      zone: "piccadilly",
      name: "Zambrero (Piccadilly)",
      style: "Mexican",
      address: "7–9 Piccadilly, M1 1LZ",
      lat: 53.48177,
      lng: -2.23781,
      description: "An Australian chain doing casual counter-service burritos, tacos and quesadillas.",
    },
    {
      id: "tortilla-piccadilly",
      zone: "piccadilly",
      name: "Tortilla (Piccadilly Station)",
      style: "Mexican",
      address: "Piccadilly Station Approach, M1 2GH",
      lat: 53.47756,
      lng: -2.23107,
      description: "Burritos and tacos to go, right by the station: good for a bite before a train.",
    },
    // The Village
    {
      id: "madre",
      zone: "the-village",
      name: "Madre",
      style: "Mexican",
      address: "Minshull House, 47 Chorlton Street, M1 3FY",
      lat: 53.47737,
      lng: -2.23542,
      description: "A modern Mexican kitchen and cocktail bar: antojitos, oysters, the grill and creative tacos. Crispy pork belly is a favourite.",
    },
    {
      id: "salon-madre",
      zone: "the-village",
      name: "Salón Madre",
      style: "Mexican",
      address: "49 Chorlton Street, Kampus, M1 3FY",
      lat: 53.47758,
      lng: -2.23515,
      description: "Madre's laid-back sibling: a tequila bar and pool hall with Mexican street food, tucked into Kampus.",
    },
    // Deansgate & St Peter's
    {
      id: "peter-street-kitchen",
      zone: "deansgate-st-peters",
      name: "Peter Street Kitchen",
      style: "Mexican & Japanese",
      address: "Free Trade Hall, Peter Street, M2 5GP",
      lat: 53.4779,
      lng: -2.2473,
      description: "An upmarket restaurant in the historic Free Trade Hall, pairing Mexican and Japanese cooking.",
    },
    {
      id: "las-iguanas",
      zone: "deansgate-st-peters",
      name: "Las Iguanas",
      style: "Latin American",
      address: "84 Deansgate, M3 2ER",
      lat: 53.48247,
      lng: -2.24713,
      description: "A lively Latin American chain with Mexican favourites like sizzling fajitas, and a long cocktail list.",
    },
    {
      id: "zambrero-cross-street",
      zone: "deansgate-st-peters",
      name: "Zambrero (Cross Street)",
      style: "Mexican",
      address: "59 Cross Street, M2 4JW",
      lat: 53.48028,
      lng: -2.24497,
      description: "Zambrero's second city-centre counter: quick burritos, bowls and quesadillas near the Town Hall.",
    },
    {
      id: "revolucion-de-cuba",
      zone: "deansgate-st-peters",
      name: "Revolución de Cuba",
      style: "Cuban & Latin",
      address: "11 Peter Street, M2 5QR",
      lat: 53.47832,
      lng: -2.24895,
      description: "A big, noisy rum bar with live music and Latin plates, including burritos, tacos and loaded nachos.",
    },
    // Spinningfields
    {
      id: "ocasa",
      zone: "spinningfields",
      name: "OCASA",
      style: "Mexican",
      address: "1 The Avenue, Spinningfields, M3 3AP",
      lat: 53.4802,
      lng: -2.2502,
      description: "A Tulum-inspired Mexican restaurant and tequila bar, with modern takes on Mexico City street food.",
    },
    // Oxford Street
    {
      id: "listo-burrito",
      zone: "oxford-street",
      name: "Listo Burrito",
      style: "Mexican",
      address: "91–93 Oxford Street, M1 6ET",
      lat: 53.47534,
      lng: -2.24152,
      description: "Quick, build-your-own burritos and bowls, popular for being filling and good value.",
    },
    {
      id: "tortilla-oxford-street",
      zone: "oxford-street",
      name: "Tortilla (Oxford Street)",
      style: "Mexican",
      address: "50 Oxford Street, M1 5EJ",
      lat: 53.476,
      lng: -2.24215,
      description: "Build-your-own burritos, tacos and nachos on the way between St Peter's Square and the universities.",
    },
    {
      id: "casa-mexica",
      zone: "oxford-street",
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

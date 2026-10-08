/** FoodStep's cities and the cuisines to explore in each. No restaurants yet:
 * picking a cuisine opens the city's 3D map. */

export interface FoodStepCuisine {
  id: string;
  name: string;
  description: string;
}

export interface FoodStepCity {
  /** Used in the web address: /foodstep/manchester */
  id: string;
  name: string;
  country: string;
  /** Under the city's name on its card. */
  description: string;
  /** Where the 3D map opens, [lng, lat]: the heart of the city's food scene. */
  center: [number, number];
  /** Only this city's; every city also has SHARED_CUISINES, unless ownCuisinesOnly. */
  cuisines: FoodStepCuisine[];
  /** Just this city's own cuisines, without the shared ones. */
  ownCuisinesOnly?: boolean;
}

/** Every city has these. */
const SHARED_CUISINES: FoodStepCuisine[] = [
  { id: "mexican", name: "Mexican", description: "Tacos, burritos and mezcal" },
  { id: "italian", name: "Italian", description: "Pizza, pasta and trattorias" },
  { id: "tapas", name: "Tapas", description: "Small plates to share" },
  { id: "uk-gastro", name: "UK Gastro", description: "Roast dinners and British classics" },
];

export const FOODSTEP_CITIES: FoodStepCity[] = [
  {
    id: "manchester",
    name: "Manchester",
    country: "United Kingdom",
    description: "Street food, curry, Mexican and Italian",
    center: [-2.2374, 53.4826],
    cuisines: [
      { id: "curry", name: "Curry", description: "The Curry Mile and beyond" },
      { id: "street-food", name: "Street Food", description: "Food halls and market stalls" },
    ],
  },
  {
    id: "oxford",
    name: "Oxford",
    country: "United Kingdom",
    description: "Old pubs, seasonal British and historic dining rooms",
    center: [-1.2577, 51.752],
    cuisines: [
      { id: "pub-food", name: "Pub Food", description: "Pies and pints in centuries-old inns" },
      { id: "seasonal-british", name: "Seasonal British", description: "What's fresh from the countryside" },
      { id: "vintage-dining", name: "Vintage Dining", description: "Historic rooms and old-school menus" },
    ],
  },
  {
    id: "london",
    name: "London",
    country: "United Kingdom",
    description: "Asian fusion, Mediterranean and fine dining",
    center: [-0.1337, 51.5136],
    cuisines: [
      { id: "asian-fusion", name: "Asian Fusion", description: "Where East meets West" },
      { id: "mediterranean", name: "Mediterranean", description: "Greek, Turkish and Levantine" },
      { id: "fine-dining", name: "Fine Dining", description: "Tasting menus and white tablecloths" },
    ],
  },
  {
    id: "buenos-aires",
    name: "Buenos Aires",
    country: "Argentina",
    description: "Parrillas, empanadas, helado and sweet treats",
    center: [-58.4322, -34.5883],
    // Buenos Aires' own food, without the shared cuisines.
    ownCuisinesOnly: true,
    cuisines: [
      { id: "empanadas", name: "Empanadas", description: "Baked or fried, in every province's style" },
      { id: "milanesa", name: "Milanesa", description: "Breaded, golden and topped napolitana-style" },
      { id: "gelato", name: "Gelato", description: "Helado, the Italian-Argentine way" },
      { id: "parrilla", name: "Parrilla", description: "The asado, grilled over wood and charcoal" },
      { id: "panaderia", name: "Panadería", description: "Sweet treats: medialunas, facturas and cakes" },
      { id: "fish", name: "Fish Restaurants", description: "Seafood from the Atlantic and the River Plate" },
    ],
  },
];

export function getFoodStepCity(id: string): FoodStepCity | undefined {
  return FOODSTEP_CITIES.find((c) => c.id === id);
}

/** Shared ones first, then the city's own (or just the city's own). */
export function cuisinesFor(city: FoodStepCity): FoodStepCuisine[] {
  return city.ownCuisinesOnly ? city.cuisines : [...SHARED_CUISINES, ...city.cuisines];
}

export function getFoodStepCuisine(city: FoodStepCity, id: string): FoodStepCuisine | undefined {
  return cuisinesFor(city).find((c) => c.id === id);
}

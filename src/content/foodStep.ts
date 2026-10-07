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
  /** Only this city's; every city also has SHARED_CUISINES. */
  cuisines: FoodStepCuisine[];
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
    description: "Street food, curry and modern British",
    center: [-2.2374, 53.4826],
    cuisines: [
      { id: "curry", name: "Curry", description: "The Curry Mile and beyond" },
      { id: "street-food", name: "Street Food", description: "Food halls and market stalls" },
      { id: "modern-british", name: "Modern British", description: "Northern produce, new ideas" },
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
    description: "Steakhouses, empanadas and Latin fusion",
    center: [-58.4322, -34.5883],
    cuisines: [
      { id: "steakhouse", name: "Argentine Steakhouse", description: "Parrillas and the asado" },
      { id: "empanadas", name: "Empanadas", description: "Baked, fried and filled every way" },
      { id: "latin-fusion", name: "Fusion Latin", description: "Nikkei, criollo and new Latin cooking" },
    ],
  },
];

export function getFoodStepCity(id: string): FoodStepCity | undefined {
  return FOODSTEP_CITIES.find((c) => c.id === id);
}

/** Shared ones first, then the city's own. */
export function cuisinesFor(city: FoodStepCity): FoodStepCuisine[] {
  return [...SHARED_CUISINES, ...city.cuisines];
}

export function getFoodStepCuisine(city: FoodStepCity, id: string): FoodStepCuisine | undefined {
  return cuisinesFor(city).find((c) => c.id === id);
}

/** StoryStep's sister products, not live yet. Shown either side of the podium
 * on the landing page and next to the logo in the desktop top bar; the colour
 * fills their "Coming soon" buttons and their letter circles. */
export const FOODSTEP_GREEN = "#3CB94F";

/** route: the tab a product opens, once it has a page. */
export const SISTER_PRODUCTS = [
  { name: "FoodStep", letter: "F", color: FOODSTEP_GREEN, route: "FoodStep" as const },
  { name: "BeerStep", letter: "B", color: "#C6AE82", route: undefined },
];

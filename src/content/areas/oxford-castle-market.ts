import type { Area } from "../schema";

/** Coordinates are approximate, drawn from general knowledge — verify against real GPS before field use.
 * Every stop is a free public street, market, or green space — no paid attraction admission required. */
export const oxfordCastleMarket: Area = {
  id: "oxford-castle-market",
  name: "Oxford Castle & the Covered Market",
  city: "Oxford",
  description:
    "Oxford's working, everyday side, on foot: the crossroads that gives the city its centre, a Victorian market still trading after two centuries, and a Norman mound that's older than any college in town.",
  estimatedDurationMin: 35,
  estimatedDistanceKm: 0.9,
  difficulty: "easy",
  isContentComplete: true,
  image: require("../../../assets/tours/oxford-castle.jpg"),
  price: { singleTour: 4.99 },
  startingPoint: {
    lat: 51.7519,
    lng: -1.2578,
    label: "Carfax Tower, city centre crossroads",
  },
  route: [
    {
      id: "carfax-tower",
      order: 1,
      name: "Carfax Tower",
      coordinates: { lat: 51.7519, lng: -1.2578 },
      triggerRadiusMeters: 30,
      narration: {
        durationSec: 69,
        audioSource: require("../../../assets/audio/oxford-castle-market/01-carfax-tower.mp3"),
        scriptText: `You're standing at Carfax — the name comes from the French "quatre voies," or four ways, marking the crossroads where Oxford's four main streets meet and have met for nearly a thousand years.

The tower itself is all that survives of St Martin's Church, demolished in 1896 to widen the road, though the tower was kept as a historic landmark. A city ordinance from the 1770s still technically caps building heights nearby so nothing blocks the view of it — one of the reasons central Oxford's skyline has stayed so low and dominated by college spires rather than modern towers.

You can view the tower and its two quarter-jack figures — mechanical soldiers that strike the hours — freely from the street; climbing the tower itself does charge a small admission fee, but that's optional.

Ahead, one of England's oldest surviving covered markets.`,
      },
    },
    {
      id: "covered-market",
      order: 2,
      name: "The Covered Market",
      coordinates: { lat: 51.7514, lng: -1.2566 },
      triggerRadiusMeters: 30,
      narration: {
        durationSec: 67,
        audioSource: require("../../../assets/audio/oxford-castle-market/02-covered-market.mp3"),
        scriptText: `Step inside the Covered Market, opened in 1774 to move Oxford's butchers and traders off the crowded open streets and into one purpose-built hall — and it's been trading continuously ever since, making it one of the oldest covered markets still operating in England.

It's completely free to walk through and browse, whether or not you buy anything — independent butchers, bakers, a barber that's been here for generations, and stalls selling everything from fresh flowers to handmade chocolates share the same Georgian ironwork and skylights that have topped the market for two and a half centuries.

It's a genuinely local spot, not a tourist recreation — this is where a lot of Oxford still does its actual daily shopping.

Ahead, we're heading west to Oxford's oldest surviving structure.`,
      },
    },
    {
      id: "oxford-castle-mound",
      order: 3,
      name: "Oxford Castle Mound",
      coordinates: { lat: 51.7509, lng: -1.2618 },
      triggerRadiusMeters: 35,
      narration: {
        durationSec: 76,
        audioSource: require("../../../assets/audio/oxford-castle-market/03-oxford-castle-mound.mp3"),
        scriptText: `This grass-covered mound is the motte of Oxford Castle, built in 1071 by the Norman baron Robert D'Oyly — making it older than any of Oxford's colleges by a full two centuries. The stone tower at its top, St George's Tower, may actually predate the mound itself, possibly built as a standalone defensive structure before the earthwork was raised around it.

The castle saw real military history in 1142, when the Empress Matilda, besieged here during a civil war against King Stephen, is said to have escaped across the frozen River Thames camouflaged in a white cloak against the snow.

The mound and surrounding green are open and free to walk around at any time — the tower climb and the separate "Oxford Castle Unlocked" museum experience nearby do charge admission, but simply seeing the mound and grounds costs nothing.

Ahead, our last stop, just beside the mound.`,
      },
    },
    {
      id: "castle-mill-stream",
      order: 4,
      name: "Castle Mill Stream",
      coordinates: { lat: 51.7513, lng: -1.2625 },
      triggerRadiusMeters: 30,
      narration: {
        durationSec: 47,
        audioSource: require("../../../assets/audio/oxford-castle-market/04-castle-mill-stream.mp3"),
        scriptText: `Last stop: the Castle Mill Stream, one of the many small channels of the River Thames that thread through Oxford here on its way toward the larger river beyond the city centre. Mills have stood along this stretch of water since medieval times, grinding grain for the castle and the growing town around it.

It's a quieter, greener corner of the centre, free to walk along, and a good spot to pause before heading back into the crowds around Carfax.

That's the tour. Carfax Tower, where we started, is about five minutes back along Castle Street.`,
      },
    },
  ],
  path: [
    { lat: 51.751931, lng: -1.257801 },
    { lat: 51.751866, lng: -1.257711 },
    { lat: 51.751897, lng: -1.257566 },
    { lat: 51.751888, lng: -1.257536 },
    { lat: 51.751874, lng: -1.257535 },
    { lat: 51.751239, lng: -1.257175 },
    { lat: 51.751262, lng: -1.257048 },
    { lat: 51.751315, lng: -1.256571 },
    { lat: 51.751262, lng: -1.257048 },
    { lat: 51.751239, lng: -1.257175 },
    { lat: 51.751874, lng: -1.257535 },
    { lat: 51.751888, lng: -1.257536 },
    { lat: 51.751897, lng: -1.257566 },
    { lat: 51.751866, lng: -1.257711 },
    { lat: 51.751793, lng: -1.257662 },
    { lat: 51.751831, lng: -1.257688 },
    { lat: 51.751841, lng: -1.257778 },
    { lat: 51.751765, lng: -1.258286 },
    { lat: 51.751649, lng: -1.258842 },
    { lat: 51.751556, lng: -1.25957 },
    { lat: 51.7515, lng: -1.260158 },
    { lat: 51.751588, lng: -1.260527 },
    { lat: 51.751626, lng: -1.26064 },
    { lat: 51.751626, lng: -1.26073 },
    { lat: 51.750897, lng: -1.261481 },
    { lat: 51.750939, lng: -1.261584 },
    { lat: 51.750964, lng: -1.261551 },
    { lat: 51.750995, lng: -1.261628 },
    { lat: 51.750892, lng: -1.261773 },
    { lat: 51.750854, lng: -1.261837 },
    { lat: 51.750816, lng: -1.26184 },
    { lat: 51.750775, lng: -1.26257 },
    { lat: 51.750779, lng: -1.262732 },
    { lat: 51.750894, lng: -1.262997 },
    { lat: 51.751075, lng: -1.262833 },
    { lat: 51.751019, lng: -1.262758 },
    { lat: 51.751017, lng: -1.262615 },
    { lat: 51.751089, lng: -1.262528 },
    { lat: 51.75121, lng: -1.262449 },
  ],
};

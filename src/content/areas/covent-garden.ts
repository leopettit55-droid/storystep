import type { Area } from "../schema";

/** Coordinates are approximate, drawn from general knowledge — verify against real GPS before field use. */
export const coventGarden: Area = {
  id: "covent-garden",
  name: "Covent Garden",
  city: "London",
  description:
    "The old fruit and veg market turned street-performance stage, on foot: opera, actors' history, a hidden courtyard, and the maze of Seven Dials.",
  estimatedDurationMin: 45,
  estimatedDistanceKm: 2.0,
  difficulty: "easy",
  isContentComplete: true,
  image: require("../../../assets/tours/covent-garden.jpg"),
  price: { singleTour: 4.99 },
  startingPoint: {
    lat: 51.5129,
    lng: -0.1243,
    label: "Covent Garden Underground Station",
  },
  route: [
    {
      id: "covent-garden-piazza",
      order: 1,
      name: "Covent Garden Piazza & Market",
      coordinates: { lat: 51.5117, lng: -0.124 },
      triggerRadiusMeters: 40,
      narration: {
        durationSec: 61,
        audioSource: require("../../../assets/audio/covent-garden/01-covent-garden-piazza.mp3"),
        scriptText: `Welcome to Covent Garden Piazza. This was London's principal fruit, vegetable, and flower market for over 300 years, from the 1650s until 1974, when the market finally became too congested for the trucks trying to reach it and relocated south of the river.

The name "Covent Garden" is a corruption of "Convent Garden" — this land originally belonged to Westminster Abbey as a walled monastic garden, before Henry VIII seized church property in the 1530s and it eventually passed to the Bedford family, who developed it into London's first planned square in the 1630s.

The elegant market building in front of you dates from 1830, and after standing empty for a few years post-1974, it reopened as the boutique shopping and dining hall it is today. Street performers audition for official pitches around the piazza — the "cobblestones" pitch right outside is one of the most competitive performance slots in London.

When you're ready, head toward the church on the west side of the piazza.`,
      },
    },
    {
      id: "st-pauls-actors-church",
      order: 2,
      name: "St Paul's, the Actors' Church",
      coordinates: { lat: 51.5106, lng: -0.125 },
      triggerRadiusMeters: 35,
      narration: {
        durationSec: 51,
        audioSource: require("../../../assets/audio/covent-garden/02-st-pauls-actors-church.mp3"),
        scriptText: `This is St Paul's Church, designed by Inigo Jones in the 1630s as part of his original piazza design — deliberately plain, in a Tuscan style, because the Earl of Bedford apparently told Jones he wanted something no better than a barn. Jones is said to have replied he'd give him "the handsomest barn in England."

It's known as the Actors' Church because of its centuries-long connection to London's theatre community — the walls inside are covered with memorial plaques to actors, playwrights, and entertainers, including Charlie Chaplin, Vivien Leigh, and Boris Karloff.

The churchyard, round the side facing away from the piazza, is a quiet green space that most tourists walk straight past — worth a look if you want a moment of calm.

Ahead, we're heading north to Neal's Yard, one of the most photographed hidden spots in London.`,
      },
    },
    {
      id: "neals-yard",
      order: 3,
      name: "Neal's Yard",
      coordinates: { lat: 51.5147, lng: -0.1265 },
      triggerRadiusMeters: 30,
      narration: {
        durationSec: 50,
        audioSource: require("../../../assets/audio/covent-garden/03-neals-yard.mp3"),
        scriptText: `Tucked behind ordinary-looking shopfronts, Neal's Yard is a small courtyard that most people miss entirely unless they know the narrow entrance to look for. Through most of the twentieth century this was a working warehouse yard, fairly grim and industrial.

It was transformed in the late 1970s and 80s by an influx of health food shops, therapists, and independent businesses — Neal's Yard Remedies, the natural skincare brand, takes its name directly from this courtyard, where it was founded in 1981.

The brightly painted buildings, hanging plants, and clock tower you can see were added gradually as the yard's identity as a countercultural, wellness-focused space developed — a deliberate contrast to the market commerce surrounding it.

When you're ready, we'll head to Seven Dials, a genuinely unusual piece of London street planning.`,
      },
    },
    {
      id: "seven-dials",
      order: 4,
      name: "Seven Dials",
      coordinates: { lat: 51.514, lng: -0.1276 },
      triggerRadiusMeters: 35,
      narration: {
        durationSec: 53,
        audioSource: require("../../../assets/audio/covent-garden/04-seven-dials.mp3"),
        scriptText: `You're at Seven Dials, where seven streets meet at a single point — a genuinely unusual piece of 1690s urban planning designed to maximise the number of expensive corner-facing properties, since corner plots commanded higher rents.

The sundial column in the centre is a replica; the original was removed in 1773 after a rumour spread that a large sum of money was buried beneath it, and treasure hunters dug up the area so aggressively that the column had to come down. It sat in storage for over a century before a copy was eventually reinstalled here in 1989.

Despite the name, the column only has six sundial faces, not seven — the seventh "dial" is the column itself, which acts as the gnomon, the pointer, for one more sundial reading across the paving.

Ahead, we're heading back toward the piazza via Bow Street, home to a rather important police history.`,
      },
    },
    {
      id: "royal-opera-house",
      order: 5,
      name: "Royal Opera House, Bow Street",
      coordinates: { lat: 51.5129, lng: -0.1223 },
      triggerRadiusMeters: 40,
      narration: {
        durationSec: 55,
        audioSource: require("../../../assets/audio/covent-garden/05-royal-opera-house.mp3"),
        scriptText: `This is the Royal Opera House on Bow Street — the third theatre built on this site, this one dating from 1858, after the previous two both burned down.

Bow Street itself has a significant place in policing history: the Bow Street Runners, founded here in 1749 by the novelist and magistrate Henry Fielding, are widely considered London's first organised police force, decades before the Metropolitan Police were formally established in 1829. The old Bow Street Magistrates' Court, just along the street, tried everyone from suffragettes to Oscar Wilde over its long history before closing in 2006.

The Royal Opera House itself is home to both The Royal Opera and The Royal Ballet, and its distinctive glass Paul Hamlyn Hall extension, added in the late 1990s, is visible if you look toward the market side of the building.

When you're ready, we'll return to the piazza to finish where we started.`,
      },
    },
    {
      id: "piazza-return",
      order: 6,
      name: "Back to the Piazza",
      coordinates: { lat: 51.5121, lng: -0.1233 },
      triggerRadiusMeters: 35,
      narration: {
        durationSec: 40,
        audioSource: require("../../../assets/audio/covent-garden/06-piazza-return.mp3"),
        scriptText: `Last stop — back at the piazza where we began, but hopefully looking at it a little differently now. This small patch of London has been a monastery garden, England's first planned public square, the country's biggest fruit and veg market, and is now one of its busiest stages for street performance, all in the same few hundred metres.

If you have time, the London Transport Museum sits in the southeast corner of the piazza, housed in the former flower market building — worth a visit if you're curious about the Underground's design history.

That's the tour. Covent Garden Underground station is right where you started, or Leicester Square is a short walk west if you'd rather exit that way.`,
      },
    },
  ],
  path: [
    { lat: 51.513082, lng: -0.124246 },
    { lat: 51.513101, lng: -0.124273 },
    { lat: 51.513173, lng: -0.124125 },
    { lat: 51.512257, lng: -0.1231 },
    { lat: 51.512041, lng: -0.123599 },
    { lat: 51.511992, lng: -0.123587 },
    { lat: 51.511956, lng: -0.123623 },
    { lat: 51.5119, lng: -0.123607 },
    { lat: 51.51186, lng: -0.123576 },
    { lat: 51.511801, lng: -0.123509 },
    { lat: 51.511544, lng: -0.124117 },
    { lat: 51.511571, lng: -0.124145 },
    { lat: 51.511422, lng: -0.123984 },
    { lat: 51.51108, lng: -0.124747 },
    { lat: 51.510833, lng: -0.124462 },
    { lat: 51.51081, lng: -0.124408 },
    { lat: 51.510794, lng: -0.124391 },
    { lat: 51.510757, lng: -0.124476 },
    { lat: 51.510723, lng: -0.124523 },
    { lat: 51.51062, lng: -0.124784 },
    { lat: 51.510723, lng: -0.124523 },
    { lat: 51.510952, lng: -0.12479 },
    { lat: 51.511253, lng: -0.125112 },
    { lat: 51.511322, lng: -0.125028 },
    { lat: 51.511357, lng: -0.125122 },
    { lat: 51.51141, lng: -0.125008 },
    { lat: 51.511493, lng: -0.124802 },
    { lat: 51.511964, lng: -0.125376 },
    { lat: 51.511956, lng: -0.125435 },
    { lat: 51.512154, lng: -0.125684 },
    { lat: 51.512246, lng: -0.125798 },
    { lat: 51.512312, lng: -0.12584 },
    { lat: 51.512701, lng: -0.126298 },
    { lat: 51.512853, lng: -0.126201 },
    { lat: 51.51296, lng: -0.125994 },
    { lat: 51.513245, lng: -0.126364 },
    { lat: 51.513252, lng: -0.126387 },
    { lat: 51.513285, lng: -0.126428 },
    { lat: 51.513317, lng: -0.126408 },
    { lat: 51.513346, lng: -0.126358 },
    { lat: 51.513434, lng: -0.126498 },
    { lat: 51.513635, lng: -0.126781 },
    { lat: 51.51368, lng: -0.126854 },
    { lat: 51.51371, lng: -0.126833 },
    { lat: 51.513713, lng: -0.126808 },
    { lat: 51.513726, lng: -0.126787 },
    { lat: 51.513777, lng: -0.126799 },
    { lat: 51.513788, lng: -0.126817 },
    { lat: 51.513833, lng: -0.126845 },
    { lat: 51.513861, lng: -0.126881 },
    { lat: 51.513881, lng: -0.126894 },
    { lat: 51.513891, lng: -0.126921 },
    { lat: 51.513906, lng: -0.126935 },
    { lat: 51.514072, lng: -0.126915 },
    { lat: 51.514087, lng: -0.126898 },
    { lat: 51.514246, lng: -0.126871 },
    { lat: 51.514608, lng: -0.126821 },
    { lat: 51.514626, lng: -0.126811 },
    { lat: 51.514614, lng: -0.126643 },
    { lat: 51.514626, lng: -0.126811 },
    { lat: 51.514608, lng: -0.126821 },
    { lat: 51.514246, lng: -0.126871 },
    { lat: 51.514087, lng: -0.126898 },
    { lat: 51.514072, lng: -0.126915 },
    { lat: 51.513924, lng: -0.126934 },
    { lat: 51.513912, lng: -0.127046 },
    { lat: 51.513879, lng: -0.127056 },
    { lat: 51.513818, lng: -0.127186 },
    { lat: 51.513877, lng: -0.127265 },
    { lat: 51.514046, lng: -0.127521 },
    { lat: 51.513877, lng: -0.127265 },
    { lat: 51.513818, lng: -0.127186 },
    { lat: 51.513836, lng: -0.127148 },
    { lat: 51.513804, lng: -0.127086 },
    { lat: 51.51382, lng: -0.127061 },
    { lat: 51.51383, lng: -0.127029 },
    { lat: 51.51383, lng: -0.126972 },
    { lat: 51.513817, lng: -0.126935 },
    { lat: 51.513842, lng: -0.126882 },
    { lat: 51.513841, lng: -0.126847 },
    { lat: 51.513788, lng: -0.126817 },
    { lat: 51.513958, lng: -0.125389 },
    { lat: 51.513973, lng: -0.125295 },
    { lat: 51.513982, lng: -0.125273 },
    { lat: 51.514002, lng: -0.125258 },
    { lat: 51.514001, lng: -0.125243 },
    { lat: 51.513887, lng: -0.125089 },
    { lat: 51.513908, lng: -0.125035 },
    { lat: 51.513888, lng: -0.124998 },
    { lat: 51.513261, lng: -0.124076 },
    { lat: 51.513207, lng: -0.124164 },
    { lat: 51.512336, lng: -0.123186 },
    { lat: 51.512685, lng: -0.122394 },
    { lat: 51.512689, lng: -0.122367 },
    { lat: 51.512721, lng: -0.122358 },
    { lat: 51.512689, lng: -0.122367 },
    { lat: 51.512685, lng: -0.122394 },
    { lat: 51.512336, lng: -0.123186 },
    { lat: 51.512257, lng: -0.1231 },
    { lat: 51.512087, lng: -0.123493 },
    { lat: 51.512021, lng: -0.123418 },
    { lat: 51.512083, lng: -0.12328 },
  ],
};

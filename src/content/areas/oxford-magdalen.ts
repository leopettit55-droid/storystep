import type { Area, Coordinates } from "../schema";
import { magdalenLandmarks } from "../landmarks/magdalen";

/**
 * Coordinates come from OpenStreetMap (buildings, footpaths and the
 * Addison's Walk loop, which is mapped as a single footway) — accurate to a
 * few metres, not surveyed. Walk the route once with a phone and nudge any
 * stop that fires early or late before promoting this tour.
 *
 * UNLIKE the other Oxford tours, this one goes INSIDE a paid-entry site: the
 * visitor needs a Magdalen College ticket (see accessNote). That is a
 * deliberate product decision for this tour — every stop stays on the areas
 * the college opens to ticketed visitors (Lodge, St John's Quad, Chapel,
 * Chaplain's Quad, Cloister, New Building and the Water Walks), never a
 * staircase, private garden or the Longwall Quad. The final stop is Magdalen
 * Bridge, which is free public ground.
 *
 * The narrator says "Maudlin" — the Oxford pronunciation — so the audio was
 * generated from these scripts with "Magdalen" respelled that way.
 */

/** Street-following walking path: Lodge → St John's Quad → Chapel → Chaplain's
 * Quad and back → Founder's Tower → Cloister → New Building → the Addison's
 * Walk loop (OpenStreetMap geometry) → back through the college → High
 * Street → Magdalen Bridge. */
const path: Coordinates[] = [
  { lat: 51.7519, lng: -1.24742 },
  { lat: 51.75198, lng: -1.24735 },
  { lat: 51.7521, lng: -1.24727 },
  { lat: 51.75221, lng: -1.24718 },
  { lat: 51.75212, lng: -1.24702 },
  { lat: 51.75201, lng: -1.24696 },
  { lat: 51.7519, lng: -1.2469 },
  { lat: 51.75182, lng: -1.2468 },
  { lat: 51.75183, lng: -1.2465 },
  { lat: 51.75184, lng: -1.24622 },
  { lat: 51.75183, lng: -1.2465 },
  { lat: 51.75182, lng: -1.2468 },
  { lat: 51.75201, lng: -1.24692 },
  { lat: 51.75213, lng: -1.2469 },
  { lat: 51.75214, lng: -1.2465 },
  { lat: 51.75247, lng: -1.24633 },
  { lat: 51.75268, lng: -1.2466 },
  { lat: 51.75274, lng: -1.24666 },
  { lat: 51.75295, lng: -1.2459 },
  { lat: 51.75276, lng: -1.2454 },
  { lat: 51.7528, lng: -1.24504 },
  { lat: 51.75296, lng: -1.245 },
  { lat: 51.75314, lng: -1.24506 },
  { lat: 51.75334, lng: -1.24514 },
  { lat: 51.75363, lng: -1.24522 },
  { lat: 51.75386, lng: -1.24525 },
  { lat: 51.75416, lng: -1.24529 },
  { lat: 51.75425, lng: -1.24518 },
  { lat: 51.75444, lng: -1.24462 },
  { lat: 51.75451, lng: -1.24442 },
  { lat: 51.7545, lng: -1.24423 },
  { lat: 51.75448, lng: -1.24387 },
  { lat: 51.7544, lng: -1.24286 },
  { lat: 51.75435, lng: -1.24232 },
  { lat: 51.75431, lng: -1.24174 },
  { lat: 51.75428, lng: -1.24143 },
  { lat: 51.75423, lng: -1.24086 },
  { lat: 51.75418, lng: -1.24034 },
  { lat: 51.75413, lng: -1.2403 },
  { lat: 51.7539, lng: -1.24034 },
  { lat: 51.75369, lng: -1.24047 },
  { lat: 51.75352, lng: -1.24064 },
  { lat: 51.75336, lng: -1.24081 },
  { lat: 51.7532, lng: -1.24116 },
  { lat: 51.75304, lng: -1.24153 },
  { lat: 51.75288, lng: -1.24183 },
  { lat: 51.75269, lng: -1.24219 },
  { lat: 51.75252, lng: -1.24249 },
  { lat: 51.7523, lng: -1.24287 },
  { lat: 51.75206, lng: -1.24327 },
  { lat: 51.75193, lng: -1.24351 },
  { lat: 51.75173, lng: -1.24433 },
  { lat: 51.75163, lng: -1.24474 },
  { lat: 51.75153, lng: -1.24516 },
  { lat: 51.75137, lng: -1.24583 },
  { lat: 51.75141, lng: -1.24599 },
  { lat: 51.75151, lng: -1.24595 },
  { lat: 51.75167, lng: -1.24577 },
  { lat: 51.75184, lng: -1.24559 },
  { lat: 51.75204, lng: -1.2455 },
  { lat: 51.75228, lng: -1.24537 },
  { lat: 51.75234, lng: -1.24563 },
  { lat: 51.75205, lng: -1.246 },
  { lat: 51.75184, lng: -1.24622 },
  { lat: 51.75182, lng: -1.2468 },
  { lat: 51.75201, lng: -1.24696 },
  { lat: 51.7521, lng: -1.24727 },
  { lat: 51.75198, lng: -1.24735 },
  { lat: 51.7519, lng: -1.24742 },
  { lat: 51.7516, lng: -1.2469 },
  { lat: 51.75125, lng: -1.2464 },
  { lat: 51.75087, lng: -1.24564 },
];

export const oxfordMagdalen: Area = {
  id: "oxford-magdalen",
  name: "Magdalen College",
  city: "Oxford",
  description:
    "Inside one of Oxford's most beautiful colleges, on foot: a medieval cloister with carved beasts, a chapel and a tower with a dawn choir, a deer park, the ancient trees, the riverside walk where C. S. Lewis talked with Tolkien, and the fritillary meadow.",
  estimatedDurationMin: 60,
  estimatedDistanceKm: 1.9,
  difficulty: "easy",
  isContentComplete: true,
  image: require("../../../assets/tours/oxford-magdalen.jpg"),
  price: { singleTour: 4.99 },
  freeLandmarkScanner: true,
  sequentialStops: true,
  accessNote:
    "This tour goes inside the college grounds, so you'll also need a Magdalen College visitor ticket (bought separately from the college, online or on the day, card only). Opening hours vary and the college closes on some days, so check magd.ox.ac.uk before you go. Please keep to the paths, stay off the grass, and don't enter staircases or areas marked private.",
  startingPoint: {
    lat: 51.75198,
    lng: -1.24735,
    label: "Magdalen College Lodge, High Street",
  },
  landmarks: magdalenLandmarks,
  route: [
    {
      id: "lodge-and-welcome",
      order: 1,
      name: "The Lodge and the college",
      coordinates: { lat: 51.75198, lng: -1.24735 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 85,
        audioSource: require("../../../assets/audio/oxford-magdalen/01-lodge-and-welcome.mp3"),
        scriptText: `Welcome to Magdalen College. It's spelled M-A-G-D-A-L-E-N, and it's pronounced "Maudlin" — one of those Oxford quirks you'll never guess from the spelling.

The college was founded in 1458 by William Waynflete, Bishop of Winchester and Lord Chancellor of England, on the site of a medieval hospital, the Hospital of St John the Baptist, dissolved the year before. Its alumni include Oscar Wilde, who studied here in the 1870s, and C. S. Lewis, who was a fellow and tutor for twenty-nine years, from 1925 to 1954. The poet Seamus Heaney, a Nobel laureate, was a fellow here too.

A few ground rules before we go in. You'll need a college visitor ticket, bought on the day or online. Please stay on the paths and keep off the grass, don't go up any staircases or into anything marked private, and leave your drone at home — only guide dogs are allowed.

When you're through the Lodge, walk into the first courtyard, St John's Quad.`,
      },
    },
    {
      id: "st-johns-quad",
      order: 2,
      name: "St John's Quad",
      coordinates: { lat: 51.75221, lng: -1.24718 },
      triggerRadiusMeters: 20,
      narration: {
        durationSec: 57,
        audioSource: require("../../../assets/audio/oxford-magdalen/02-st-johns-quad.mp3"),
        scriptText: `You're standing in St John's Quad, an irregularly shaped first courtyard, and it's named for the Hospital of St John the Baptist that stood on this ground before the college.

Look around and you'll spot the old Grammar Hall, recalling the school Waynflete founded alongside his college — Magdalen College School, which began in 1480. And there's something rather unusual: a stone pulpit built to be used outdoors. By tradition a sermon is preached from it in the open air around the feast of St John the Baptist in June, a custom that echoes the hospital which once stood here.

Founder's Tower, right here, is the way through to the Cloister, but first, the heart of the college. Turn to the Chapel.`,
      },
    },
    {
      id: "chapel",
      order: 3,
      name: "The Chapel",
      coordinates: { lat: 51.75201, lng: -1.24696 },
      triggerRadiusMeters: 20,
      narration: {
        durationSec: 63,
        audioSource: require("../../../assets/audio/oxford-magdalen/03-chapel.mp3"),
        scriptText: `This is the college Chapel, built between 1474 and 1480, and it has been the centre of Magdalen life ever since. The choir is world-famous, and it sings a service at six most evenings in term — and everyone is welcome, even outside visiting hours. The Chapel may close for services or rehearsals, so if the door is shut, this stop works just as well from the doorway.

If you can go in, look for three things. Behind the altar is a great stone screen called a reredos, designed by Lewis Cottingham in the 1830s, with three tiers of thirteen niches, filled with figures carved by Thomas Earp in 1864 and 1865. Above you is a ceiling that looks like stone vaulting but is really plaster, put up by James Wyatt in 1790. And look for the window by Francis Eginton, from 1792, showing the Last Judgement in shades of grey.

Please be quiet and respectful, since it's a place of worship. When you're ready, head out into Chaplain's Quad.`,
      },
    },
    {
      id: "chaplains-quad-and-tower",
      order: 4,
      name: "Chaplain's Quad, the Hall and the Great Tower",
      coordinates: { lat: 51.75182, lng: -1.2468 },
      triggerRadiusMeters: 22,
      narration: {
        durationSec: 78,
        audioSource: require("../../../assets/audio/oxford-magdalen/04-chaplains-quad-and-tower.mp3"),
        scriptText: `You're in Chaplain's Quad, a roughly triangular courtyard running along the side of the Chapel and the Hall down to the Great Tower. That triangular shape was formed once the tower was completed.

The Great Tower is the college's most famous landmark. It's a hundred and forty-four feet tall. Building began in 1492, when Dr Richard Mayew laid the foundation stone on the ninth of August, and it was finished in 1509 under the master mason William Raynold. Ten bells hang inside, the heaviest of them cast in 1623. Every first of May, at six in the morning, the choir sings from the very top — we'll come back to that at the end of the tour.

To your side is the Hall, where the college dines, and the Old Kitchen Bar, in what were the hospital's kitchens. Both are normally open to visitors, though the Hall can close around lunchtime.

Next, back through Founder's Tower to the Cloister.`,
      },
    },
    {
      id: "cloister",
      order: 5,
      name: "Founder's Tower and the Cloister",
      coordinates: { lat: 51.75214, lng: -1.2465 },
      triggerRadiusMeters: 22,
      narration: {
        durationSec: 67,
        audioSource: require("../../../assets/audio/oxford-magdalen/05-cloister.mp3"),
        scriptText: `Through Founder's Tower, with its carvings, pinnacles and richly carved vault, you come out into the Cloister, sometimes called the Great Quad. It was built between 1474 and 1480 by the mason William Orchard, and it's the classic picture of medieval Oxford: a covered stone walkway around a square of lawn.

Now look up. Small carved figures perch along the stonework, and they date from 1508. They're nicknamed the hieroglyphics, and each one stands for a virtue or a vice. There's a lion for courage, a pelican for affection, a manticore for pride, a pair of boxers for contention, and a lamia for lust. See how many you can spot.

One curious fact: the entire north side was pulled down in 1822, on the grounds that it was in disrepair, and rebuilt soon afterwards.

Head out through the north side of the Cloister, and look for a very big tree.`,
      },
    },
    {
      id: "magdalen-plane",
      order: 6,
      name: "The Magdalen Plane",
      coordinates: { lat: 51.75274, lng: -1.24666 },
      triggerRadiusMeters: 20,
      narration: {
        durationSec: 40,
        audioSource: require("../../../assets/audio/oxford-magdalen/06-magdalen-plane.mp3"),
        scriptText: `Here's the first of the college's famous trees: the Magdalen Plane. It's a London plane, planted in 1801, so it is more than two hundred years old.

London planes are a hybrid, and they're known for flaking bark that helps them shed city pollution — which is why they line so many old streets. This one is among the finest trees in the college, and it stands behind the main buildings.

Keep going, and you'll come to a long, classical façade: the New Building.`,
      },
    },
    {
      id: "new-building",
      order: 7,
      name: "The New Building",
      coordinates: { lat: 51.75298, lng: -1.24592 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 49,
        audioSource: require("../../../assets/audio/oxford-magdalen/07-new-building.mp3"),
        scriptText: `This long, classical building is called the New Building, though it's nearly three hundred years old. Building began in 1733, following designs by Edward Holdsworth from 1731, in the grand Palladian style, with a colonnade along the front.

It was meant to be one side of a huge new quadrangle, but the rest was never built, and the ends were tidied up in 1824 by Thomas Harrison. Today it houses students and fellows — and the college's wine cellar.

From here, we leave the buildings behind and take the path to the water. Follow the signs to Addison's Walk.`,
      },
    },
    {
      id: "addisons-walk",
      order: 8,
      name: "Addison's Walk",
      coordinates: { lat: 51.7528, lng: -1.24504 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 51,
        audioSource: require("../../../assets/audio/oxford-magdalen/08-addisons-walk.mp3"),
        scriptText: `You've reached Addison's Walk, a loop of about one point two kilometres around a small island in the River Cherwell.

It was once simply called the Water Walk. The path may date back to the fifteen hundreds, but it took its name in the nineteenth century from Joseph Addison, a fellow of the college who loved to walk here and wrote about landscape gardening in The Spectator. It became a circuit in the nineteenth century.

Look at the trees lining it. The grounds hold numerous trees a hundred and fifty to two hundred years old, planted thickly around the edge of the meadow. Take your time, keep to the path, and follow it clockwise, with the Deer Park on your left.`,
      },
    },
    {
      id: "deer-park-and-mulberry",
      order: 9,
      name: "The Deer Park and the Mulberry",
      coordinates: { lat: 51.75345, lng: -1.24518 },
      triggerRadiusMeters: 30,
      narration: {
        durationSec: 74,
        audioSource: require("../../../assets/audio/oxford-magdalen/09-deer-park-and-mulberry.mp3"),
        scriptText: `On your left is the Grove, Magdalen's deer park. Magdalen has the most extensive private grounds of any Oxford college, and a herd of fallow deer has lived here since at least the early eighteenth century — around sixty animals today. Visitors can't enter the park, but you can watch the deer from the path.

The Grove was once full of great trees. A huge oak blew down in 1789. A famous hybrid elm, photographed around 1900, was reportedly over forty metres tall — among the biggest trees in Britain — until it blew down in 1911. Then Dutch elm disease swept through in the 1970s and took most of the rest.

Somewhere in the park is a black mulberry that was blown over long ago but still fruits. Nobody knows quite how old it is, but a drawing from 1783 shows a mulberry at Magdalen, and it may be the same tree.

Keep walking to the corner of the loop.`,
      },
    },
    {
      id: "holywell-ford-and-lewis",
      order: 10,
      name: "C. S. Lewis's walk",
      coordinates: { lat: 51.75416, lng: -1.24529 },
      triggerRadiusMeters: 30,
      narration: {
        durationSec: 78,
        audioSource: require("../../../assets/audio/oxford-magdalen/10-holywell-ford-and-lewis.mp3"),
        scriptText: `This corner of the loop, near the Holywell Ford gate, belongs to C. S. Lewis. He was a fellow of Magdalen and English tutor here from 1925 to 1954, and he walked this path often with friends, including J. R. R. Tolkien and Hugo Dyson, as part of the group of writers known as the Inklings.

He wrote a poem about this very walk, and a plaque along the route commemorates it. And on the night of the nineteenth of September, 1931, a long conversation with Tolkien and Dyson, partly on this walk, helped push Lewis from believing in God toward Christianity — a turning point in the life of the man who'd go on to write The Chronicles of Narnia.

Look out for the plaque as you go. Then follow the path east along the river.`,
      },
    },
    {
      id: "bat-willow-meadow",
      order: 11,
      name: "Bat Willow Meadow and Y",
      coordinates: { lat: 51.7539, lng: -1.24034 },
      triggerRadiusMeters: 35,
      narration: {
        durationSec: 51,
        audioSource: require("../../../assets/audio/oxford-magdalen/11-bat-willow-meadow.mp3"),
        scriptText: `Across the water is Bat Willow Meadow. Its name comes from its willows — the kind whose wood is used to make cricket bats. The old trees were cut down in 2018 because they were so old and had honey fungus, and they've been replanted. Some of the wood was used to make cricket bats, as the name promised.

The tall branching sculpture is called Y, by the artist Mark Wallinger. It's about ten metres high, shaped like a tree, and it was commissioned in 2008 for the college's five hundred and fiftieth anniversary.

Beyond the meadow, along the riverbank, is the Fellows' Garden — private, so we can only imagine it. Now turn back along the far side of the loop.`,
      },
    },
    {
      id: "water-meadow",
      order: 12,
      name: "The Water Meadow",
      coordinates: { lat: 51.75252, lng: -1.24249 },
      triggerRadiusMeters: 35,
      narration: {
        durationSec: 46,
        audioSource: require("../../../assets/audio/oxford-magdalen/12-water-meadow.mp3"),
        scriptText: `The open field you're walking beside is the Water Meadow, a flood meadow enclosed by the loop and the River Cherwell. In wet winters it floods, and in spring it becomes one of the most famous sights in Oxford.

That's because of the snake's head fritillaries: purple-and-white chequered flowers shaped like little bells. They've been recorded here since around 1785, and this is one of the few places in Britain where they grow wild. If you're here in spring, please stay on the path and never pick them.

The landscape designer Humphry Repton once proposed flooding the meadow more deliberately, but the college turned that idea down in 1801. You may catch sight of the Great Tower above the trees ahead. Follow the path back into the college.`,
      },
    },
    {
      id: "magdalen-bridge",
      order: 13,
      name: "Magdalen Bridge and May Morning",
      coordinates: { lat: 51.7509, lng: -1.24566 },
      triggerRadiusMeters: 35,
      narration: {
        durationSec: 88,
        audioSource: require("../../../assets/audio/oxford-magdalen/13-magdalen-bridge.mp3"),
        scriptText: `You've left the college and you're standing at Magdalen Bridge, on the free public High Street — look back and you'll see the Great Tower we've been talking about.

Every first of May, at six in the morning, the college choir, including the boy choristers, climbs to the top of that tower and sings a Latin hymn, the Hymnus Eucharisticus, from up there. It's a tradition said to go back to the time of Henry the Seventh. Large crowds gather on the High Street and on this bridge to listen, and when the singing finishes, the bells ring out. The painter William Holman Hunt captured the ceremony in a famous picture in 1890.

The stone bridge dates from the late eighteenth century. In recent years it has been closed on the morning to discourage the traditional leap into the river, which has sent people to hospital — so if you're here on the first of May, listen, but don't jump.

That's the tour. Thank you for walking Magdalen with me. You can hire a punt from the boathouse right beside the bridge, if you fancy seeing the college from the water.`,
      },
    },
  ],
  path,
};

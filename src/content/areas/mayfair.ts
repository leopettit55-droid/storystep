import type { Area } from "../schema";

/**
 * Coordinates below are approximate (drawn from general knowledge of the area,
 * not a GPS survey). Before real-world field testing, walk the route with a
 * phone and correct each waypoint to the actual pavement position — see
 * AGENTS.md / project notes for the flag on this.
 */
export const mayfair: Area = {
  id: "mayfair",
  name: "Mayfair",
  description:
    "London's grandest neighbourhood, on foot: Georgian squares, a hidden village, a rockstar's flat next door to a composer's, and the world's first shopping arcade.",
  estimatedDurationMin: 55,
  estimatedDistanceKm: 2.7,
  difficulty: "easy",
  isContentComplete: true,
  startingPoint: {
    lat: 51.5067,
    lng: -0.1428,
    label: "Green Park Underground Station (Piccadilly exit)",
  },
  route: [
    {
      id: "shepherd-market",
      order: 1,
      name: "Shepherd Market",
      coordinates: { lat: 51.5074, lng: -0.1469 },
      triggerRadiusMeters: 40,
      narration: {
        durationSec: 75,
        audioSource: require("../../../assets/audio/mayfair/01-shepherd-market.wav"),
        scriptText: `Alright, we're in. This little cluster of narrow streets and low buildings is Shepherd Market — and it's easy to miss, because it doesn't look anything like the rest of Mayfair. That's the point.

Back in the early 1700s, this whole area was open fields on the edge of London, and every May a rowdy fortnight-long fair took over the ground — the May Fair, which is where the entire neighbourhood gets its name. Think livestock, prize-fighting, gambling, a fair bit of public drunkenness. The wealthy residents who eventually built Mayfair's grand squares around it were, frankly, embarrassed by it and got it shut down by 1764.

An architect named Edward Shepherd redeveloped this patch shortly after with a proper market building and these tight little streets — which is why, uniquely for Mayfair, it feels like a village dropped in the middle of the city rather than a grid of aristocratic terraces.

Take a moment and look around — low Georgian shopfronts, a few pubs that have barely changed in a century. Locals still just call it "the Market." When you're ready, we'll head north up towards Curzon Street.`,
      },
    },
    {
      id: "curzon-street",
      order: 2,
      name: "Curzon Street",
      coordinates: { lat: 51.5081, lng: -0.1489 },
      triggerRadiusMeters: 35,
      narration: {
        durationSec: 63,
        audioSource: require("../../../assets/audio/mayfair/02-curzon-street.wav"),
        scriptText: `You're now on Curzon Street, and this is a good stretch to slow down and look up at the buildings rather than straight ahead.

This street has always attracted a particular kind of resident — old money, but also the kind of person who wanted to be talked about. Disraeli, the future prime minister, lived and died just along this road. Later, in the twentieth century, this became one of the most fashionable addresses for private members' clubs and discreet townhouses — the sort of places with no sign on the door, because if you need to ask, you're not meant to be going in.

Keep an eye out on your right for the grander stone-fronted buildings set back very slightly from the street — that set-back was a deliberate Georgian status symbol. The bigger the gap between you and the pavement, the more important you were.

Just ahead, the road opens out. That's Berkeley Square coming up on your left — one of the most famous garden squares in London, and our next stop.`,
      },
    },
    {
      id: "berkeley-square",
      order: 3,
      name: "Berkeley Square",
      coordinates: { lat: 51.509, lng: -0.1467 },
      triggerRadiusMeters: 45,
      narration: {
        durationSec: 77,
        audioSource: require("../../../assets/audio/mayfair/03-berkeley-square.wav"),
        scriptText: `This is Berkeley Square — and yes, if you're humming "A Nightingale Sang in Berkeley Square" right now, you're not the first. The 1939 song made this patch of grass one of the most romanticised addresses in London, even though nightingales haven't nested in central London for a very long time, if ever.

What's real, and still standing, are the plane trees in front of you. Several of these were planted in 1789 and are now among the oldest and tallest plane trees in London. They've outlived nearly every building that originally stood around this square.

Number 44, on the west side, is considered one of the finest surviving Georgian terraced houses in London — architectural historians rate its staircase as one of the best in the country. You likely can't get inside, it's private, but it's worth glancing over.

This square has also housed a rotating cast of British power over three centuries: prime ministers, press barons, and — during the Second World War — General Eisenhower had his London headquarters just off the square, planning D-Day a short walk from where you're standing.

When you're ready, we'll cut west towards Mount Street.`,
      },
    },
    {
      id: "mount-street",
      order: 4,
      name: "Mount Street",
      coordinates: { lat: 51.5087, lng: -0.1503 },
      triggerRadiusMeters: 35,
      narration: {
        durationSec: 76,
        audioSource: require("../../../assets/audio/mayfair/04-mount-street.wav"),
        scriptText: `Notice the change in the buildings around you — this is Mount Street, and it looks different from everything you've walked past so far. That warm reddish terracotta and red brick is late Victorian, from the 1880s and 90s, when much of this stretch was rebuilt in what's sometimes called "Mayfair Gothic" — ornate, confident, a little theatrical.

Mount Street today is one of the most expensive retail streets in the world per square foot — you're probably walking past at least one or two flagship stores for brands you'd recognise, tucked behind very understated shopfronts. Mayfair retail doesn't shout. If a window display looks minimal and there's no price tag in sight, that's usually a sign you can't afford what's inside — which, for our purposes, is completely fine. It's still worth looking at the architecture over the awnings.

The street takes its name from a long-vanished landmark: a mount, or raised bank, that was part of the old fortifications built here during the English Civil War in the 1640s, long before any of these buildings existed.

Ahead, we're heading toward Grosvenor Square — once nicknamed "Little America."`,
      },
    },
    {
      id: "grosvenor-square",
      order: 5,
      name: "Grosvenor Square",
      coordinates: { lat: 51.5107, lng: -0.152 },
      triggerRadiusMeters: 50,
      narration: {
        durationSec: 83,
        audioSource: require("../../../assets/audio/mayfair/05-grosvenor-square.wav"),
        scriptText: `Welcome to Grosvenor Square — pronounced "Grove-nor," and for a long stretch of the twentieth century, this was practically American soil.

The US Embassy stood on the west side of this square from 1938 until 2018, and the surrounding streets earned the nickname "Little America." Eisenhower's wartime HQ was nearby, and post-war, this became the symbolic heart of the US presence in London — including a very large statue of Franklin D. Roosevelt that still stands in the garden, and a more recent memorial to those killed on September 11th, tucked into the northeast corner.

The Embassy has since moved south of the river to a striking glass cube in Nine Elms, and the old building here is being converted into a hotel — a strange, quiet coda for a building that spent eighty years as one of the most heavily secured addresses in London.

The square itself was laid out in the 1720s by Sir Richard Grosvenor, whose family — now the Dukes of Westminster — still own a huge portion of Mayfair and Belgravia today. This entire neighbourhood you've been walking through is, technically, still their land.

Next, we're heading up to Brook Street — home to two very different musicians, who happened to live next door to each other two centuries apart.`,
      },
    },
    {
      id: "brook-street",
      order: 6,
      name: "Handel & Hendrix House, Brook Street",
      coordinates: { lat: 51.5127, lng: -0.1466 },
      triggerRadiusMeters: 30,
      narration: {
        durationSec: 74,
        audioSource: require("../../../assets/audio/mayfair/06-brook-street.wav"),
        scriptText: `Here's one of the best coincidences in London. The composer George Frideric Handel lived at 25 Brook Street, just ahead of you, from 1723 until his death in 1759 — he wrote Messiah in that house. You're standing where the Water Music and the Coronation Anthems were composed.

Now here's the part people love: in 1968, two hundred years later, the flat next door at number 23 was rented by Jimi Hendrix. He reportedly didn't know about his neighbour's history at first, then found out and apparently loved the idea — he even bought a couple of Handel records from a shop on nearby Oxford Street once he found out.

Both buildings are now combined into a single museum, Handel & Hendrix in London, where you can see a faithful recreation of both a Georgian composer's study and a psychedelic-era rock star's bedroom, separated by a single wall. If you have time after the tour, it's genuinely worth the entry fee.

For now, take a second to look at the blue heritage plaques on the front of the building marking both of them, then we'll continue east toward Savile Row.`,
      },
    },
    {
      id: "savile-row",
      order: 7,
      name: "Savile Row",
      coordinates: { lat: 51.5112, lng: -0.1409 },
      triggerRadiusMeters: 35,
      narration: {
        durationSec: 68,
        audioSource: require("../../../assets/audio/mayfair/07-savile-row.wav"),
        scriptText: `You're on Savile Row now — the street that gave the English language the word "bespoke." Tailors have worked this street since the early 1800s, and several of the houses ahead of you have been cutting suits by hand, for the same families across generations, for well over a century. Look through the windows and you'll usually see tailors actually working at their benches — this isn't a recreation for tourists, it's a working street.

A quick bit of trivia: the word "bespoke" itself comes from the cloth being "spoken for" by a specific customer before it was cut — as opposed to buying something ready-made off a rack.

There's also a rock and roll footnote here: at number 3, the Beatles' company Apple Corps had its headquarters, and the rooftop of that building is where the band played their famous final live performance in January 1969, until police shut it down for causing a disturbance. Look up as you pass — there's a small plaque marking the spot.

Ahead, we're heading to our final stop: the Burlington Arcade, just off Piccadilly.`,
      },
    },
    {
      id: "burlington-arcade",
      order: 8,
      name: "Burlington Arcade",
      coordinates: { lat: 51.509, lng: -0.1421 },
      triggerRadiusMeters: 30,
      narration: {
        durationSec: 77,
        audioSource: require("../../../assets/audio/mayfair/08-burlington-arcade.wav"),
        scriptText: `Last stop. This covered walkway is the Burlington Arcade, opened in 1819 — it's one of the oldest shopping arcades in the world, and it was built for a wonderfully petty reason: the owner of Burlington House next door was fed up with people throwing oyster shells and rubbish over his garden wall, so he built this elegant, enclosed row of shops to seal off the alley for good.

Look for the uniformed guards patrolling in top hats and frock coats — they're called Beadles, and the role dates back to the arcade's opening. Historically they enforced arcade rules that sound almost comic now: no whistling, no singing, no running, no opening umbrellas, no prams. Some of those rules are still technically in force today, whistling included.

The Beadles are also, unofficially, the reason the phrase "read the riot act" has a Mayfair footnote — the arcade employed some of London's smallest police force, tasked only with keeping order in these 200 yards of shops.

That's the tour. You're two minutes from Green Park station if you need it, or feel free to just linger here — the arcade's jewellers and shops are worth a browse either way. Thanks for walking Mayfair with me.`,
      },
    },
  ],
};

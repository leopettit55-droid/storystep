import type { Area } from "../schema";

/** Coordinates are approximate, drawn from general knowledge — verify against real GPS before field use.
 * Every stop is a free public street or courtyard — no paid library or college admission required. */
export const oxfordBodleian: Area = {
  id: "oxford-bodleian",
  name: "Bodleian & Radcliffe Camera",
  city: "Oxford",
  description:
    "Oxford's academic heart, on foot: a theatre modelled on ancient Rome, a printing house turned university office, the most photographed library in England, and the college that guards one of Britain's great private book collections.",
  estimatedDurationMin: 35,
  estimatedDistanceKm: 0.9,
  difficulty: "easy",
  isContentComplete: true,
  image: require("../../../assets/tours/oxford-radcliffe.jpg"),
  price: { singleTour: 4.99 },
  startingPoint: {
    lat: 51.7538,
    lng: -1.2549,
    label: "Broad Street, outside the Sheldonian Theatre",
  },
  route: [
    {
      id: "sheldonian-theatre",
      order: 1,
      name: "The Sheldonian Theatre",
      coordinates: { lat: 51.7538, lng: -1.2545 },
      triggerRadiusMeters: 35,
      narration: {
        durationSec: 75,
        audioSource: require("../../../assets/audio/oxford-bodleian/01-sheldonian-theatre.mp3"),
        scriptText: `You're standing in front of the Sheldonian Theatre, completed in 1669 to a design by Christopher Wren — his first major architectural commission, finished years before he'd go on to design St Paul's Cathedral in London.

Wren modelled the building on the ancient Theatre of Marcellus in Rome, and it still serves the university's ceremonial purposes today — graduation ceremonies are held here, along with concerts and public lectures, exactly as intended over 350 years ago.

Ringing the building outside are the Emperor Heads — a row of stern, bearded stone busts on plinths along Broad Street, whose exact identity has never been settled. Nobody knows for certain who they're meant to represent; they've simply been called the Emperor Heads for centuries, and the current versions are twentieth-century replacements for weathered originals.

You can see all of this from the free public street — the theatre's interior does charge for entry to visitors.

Ahead, the Clarendon Building, just next door.`,
      },
    },
    {
      id: "clarendon-building",
      order: 2,
      name: "The Clarendon Building",
      coordinates: { lat: 51.7539, lng: -1.2549 },
      triggerRadiusMeters: 30,
      narration: {
        durationSec: 73,
        audioSource: require("../../../assets/audio/oxford-bodleian/02-clarendon-building.mp3"),
        scriptText: `This solid, columned building is the Clarendon Building, completed in 1715 and originally built to house Oxford University Press — funded partly by the runaway success of one particular book, Edward Hyde's history of the English Civil War, whose profits gave the building its name.

The Press eventually outgrew this site and moved to a much larger building elsewhere in the city, and the Clarendon Building is now used for university administration — its grand exterior, with statues of the Muses along the roofline, is really the whole show for a visitor passing through.

It sits directly on the free public route between Broad Street and Radcliffe Square, so there's no detour needed to take it in.

Ahead, Radcliffe Square and the building most people picture when they picture Oxford.`,
      },
    },
    {
      id: "radcliffe-camera",
      order: 3,
      name: "Radcliffe Camera & Radcliffe Square",
      coordinates: { lat: 51.7534, lng: -1.254 },
      triggerRadiusMeters: 40,
      narration: {
        durationSec: 70,
        audioSource: require("../../../assets/audio/oxford-bodleian/03-radcliffe-camera.mp3"),
        scriptText: `This is the Radcliffe Camera — "camera" here simply means "room" in Latin, not anything to do with photography. Completed in 1749, it was funded by a bequest from the physician John Radcliffe and built to house a science library, though it's now part of the Bodleian's reading rooms and closed to casual visitors.

It's widely considered one of the most beautiful library buildings in the world, and the domed, circular design was genuinely unusual for its era — most English buildings of the period were rectangular and classical, not round.

Radcliffe Square itself, the open space around it, is free and open to the public at any time, and this exact view — the dome framed by the spires of All Souls and St Mary's Church — is the single most photographed scene in Oxford.

Ahead, All Souls College, just across the square.`,
      },
    },
    {
      id: "all-souls-college",
      order: 4,
      name: "All Souls College",
      coordinates: { lat: 51.753, lng: -1.2533 },
      triggerRadiusMeters: 35,
      narration: {
        durationSec: 69,
        audioSource: require("../../../assets/audio/oxford-bodleian/04-all-souls-college.mp3"),
        scriptText: `Last stop: All Souls College, founded in 1438 and one of Oxford's more unusual colleges — it has no undergraduate students at all. It exists purely as a research institution for graduate fellows, chosen through what's widely considered one of the hardest academic exams in the world.

The twin towers you can see rising above the walls were added in the 1710s and 1720s, designed by Nicholas Hawksmoor in a deliberately old-fashioned Gothic style to match the college's medieval origins, even though they were brand new at the time.

The exterior and gate are freely visible from Radcliffe Square and the High Street — the college itself has very limited public access, being a working research institution rather than a tourist site.

That's the tour. Broad Street, where we started, is a two-minute walk back past the Bodleian.`,
      },
    },
  ],
  path: [
    { lat: 51.754023, lng: -1.254934 },
    { lat: 51.754023, lng: -1.254934 },
    { lat: 51.754157, lng: -1.254968 },
    { lat: 51.754188, lng: -1.254757 },
    { lat: 51.75436, lng: -1.254816 },
    { lat: 51.754364, lng: -1.254785 },
    { lat: 51.754406, lng: -1.254503 },
    { lat: 51.754271, lng: -1.254451 },
    { lat: 51.754195, lng: -1.254422 },
    { lat: 51.754219, lng: -1.254262 },
    { lat: 51.754172, lng: -1.254244 },
    { lat: 51.75418, lng: -1.254186 },
    { lat: 51.754183, lng: -1.254167 },
    { lat: 51.754132, lng: -1.254147 },
    { lat: 51.75409, lng: -1.254131 },
    { lat: 51.754054, lng: -1.254117 },
    { lat: 51.754, lng: -1.254096 },
    { lat: 51.753988, lng: -1.254174 },
    { lat: 51.753935, lng: -1.254153 },
    { lat: 51.753911, lng: -1.254315 },
    { lat: 51.753837, lng: -1.254287 },
    { lat: 51.75379, lng: -1.254262 },
    { lat: 51.753759, lng: -1.254468 },
    { lat: 51.753759, lng: -1.254468 },
    { lat: 51.753759, lng: -1.254468 },
    { lat: 51.75379, lng: -1.254262 },
    { lat: 51.753837, lng: -1.254287 },
    { lat: 51.753911, lng: -1.254315 },
    { lat: 51.753935, lng: -1.254153 },
    { lat: 51.753988, lng: -1.254174 },
    { lat: 51.754, lng: -1.254096 },
    { lat: 51.754054, lng: -1.254117 },
    { lat: 51.75409, lng: -1.254131 },
    { lat: 51.754132, lng: -1.254147 },
    { lat: 51.754183, lng: -1.254167 },
    { lat: 51.75418, lng: -1.254186 },
    { lat: 51.754172, lng: -1.254244 },
    { lat: 51.754219, lng: -1.254262 },
    { lat: 51.754195, lng: -1.254422 },
    { lat: 51.754271, lng: -1.254451 },
    { lat: 51.754406, lng: -1.254503 },
    { lat: 51.754364, lng: -1.254785 },
    { lat: 51.75436, lng: -1.254816 },
    { lat: 51.754188, lng: -1.254757 },
    { lat: 51.754157, lng: -1.254968 },
    { lat: 51.754023, lng: -1.254934 },
    { lat: 51.754023, lng: -1.254934 },
    { lat: 51.754157, lng: -1.254968 },
    { lat: 51.754188, lng: -1.254757 },
    { lat: 51.75436, lng: -1.254816 },
    { lat: 51.754364, lng: -1.254785 },
    { lat: 51.754406, lng: -1.254503 },
    { lat: 51.754453, lng: -1.254179 },
    { lat: 51.754319, lng: -1.254128 },
    { lat: 51.754322, lng: -1.254105 },
    { lat: 51.754149, lng: -1.254038 },
    { lat: 51.754106, lng: -1.254022 },
    { lat: 51.754107, lng: -1.254017 },
    { lat: 51.754127, lng: -1.253909 },
    { lat: 51.753919, lng: -1.253843 },
    { lat: 51.753855, lng: -1.253849 },
    { lat: 51.753729, lng: -1.253796 },
    { lat: 51.753651, lng: -1.253759 },
    { lat: 51.753103, lng: -1.253519 },
    { lat: 51.75306, lng: -1.253831 },
    { lat: 51.753097, lng: -1.253847 },
    { lat: 51.753287, lng: -1.253933 },
    { lat: 51.753293, lng: -1.253936 },
    { lat: 51.753293, lng: -1.253936 },
    { lat: 51.753287, lng: -1.253933 },
    { lat: 51.753097, lng: -1.253847 },
    { lat: 51.75306, lng: -1.253831 },
    { lat: 51.753103, lng: -1.253519 },
    { lat: 51.753067, lng: -1.2535 },
    { lat: 51.752969, lng: -1.253444 },
  ],
};

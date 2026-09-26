import type { Area } from "../schema";

/** Coordinates are approximate, drawn from general knowledge — verify against real GPS before field use.
 * Every stop is a free public street, meadow, shop, or pub — no paid college admission required. */
export const oxfordInklings: Area = {
  id: "oxford-inklings",
  name: "Inklings Oxford: Tolkien & C.S. Lewis",
  city: "Oxford",
  description:
    "The Oxford that shaped Middle-earth and Narnia, on foot: the pub where the Inklings met every week, a bookshop with a room the size of a small library, a cobbled street lined with quiet colleges, and the meadow where both writers walked to think.",
  estimatedDurationMin: 45,
  estimatedDistanceKm: 1.8,
  difficulty: "moderate",
  isContentComplete: true,
  image: require("../../../assets/tours/oxford-inklings.jpg"),
  price: { singleTour: 4.99 },
  startingPoint: {
    lat: 51.7566,
    lng: -1.2601,
    label: "St Giles', outside The Eagle and Child",
  },
  route: [
    {
      id: "eagle-and-child",
      order: 1,
      name: "The Eagle and Child",
      coordinates: { lat: 51.7566, lng: -1.2601 },
      triggerRadiusMeters: 30,
      narration: {
        durationSec: 73,
        audioSource: require("../../../assets/audio/oxford-inklings/01-eagle-and-child.mp3"),
        scriptText: `You're outside The Eagle and Child — known to generations of regulars simply as "the Bird and Baby." From the 1930s through the 1960s, this pub hosted the weekly meetings of the Inklings, an informal writers' group that included J.R.R. Tolkien and C.S. Lewis, who would read drafts of their work aloud to each other over pints in the back room.

Chapters of both The Lord of the Rings and the Chronicles of Narnia were first heard right here, tested on friends before the wider world ever saw them. The group's own name was a pun — inklings meaning both faint ideas and, loosely, people who dabble in ink.

Free to step inside and look, like any pub — the historic back parlour has changed hands and layout over the years, but the building and its literary connection are the real draw.

Ahead, a bookshop built for exactly the kind of people who'd start a group like this.`,
      },
    },
    {
      id: "blackwells-bookshop",
      order: 2,
      name: "Blackwell's Bookshop",
      coordinates: { lat: 51.7541, lng: -1.2559 },
      triggerRadiusMeters: 41,
      narration: {
        durationSec: 66,
        audioSource: require("../../../assets/audio/oxford-inklings/02-blackwells-bookshop.mp3"),
        scriptText: `This is Blackwell's, founded in 1879 and still one of Britain's great independent bookshops. From the outside it looks modest — a fairly ordinary shopfront on Broad Street — but underneath is the Norrington Room, a vast underground extension opened in 1966, once listed in the Guinness Book of Records as the largest single room selling books anywhere in the world.

Tolkien and Lewis, along with generations of Oxford writers and academics, shopped and browsed here for decades — it's the kind of shop that shaped what an entire city's worth of readers were reading.

It's completely free to walk in and browse, upstairs or down, whether or not you buy anything.

Ahead, we're heading south to a quieter, older stretch of the university.`,
      },
    },
    {
      id: "merton-street",
      order: 3,
      name: "Merton Street & Merton College",
      coordinates: { lat: 51.7495, lng: -1.2523 },
      triggerRadiusMeters: 35,
      narration: {
        durationSec: 63,
        audioSource: require("../../../assets/audio/oxford-inklings/03-merton-street.mp3"),
        scriptText: `You're now on Merton Street, one of the last stretches of genuinely cobbled road left in central Oxford — a rougher, older surface than the smooth pavements around the shopping streets, and a good reminder of what most of the city sounded and felt like on foot centuries ago.

Merton College, along the street to your right, was founded in 1264 and is one of Oxford's oldest colleges. C.S. Lewis was a fellow here for nearly thirty years, teaching English literature and writing much of his academic and fiction work while based at Merton, before eventually moving to Cambridge late in his career.

The street itself, and the college's exterior walls and gate, are freely visible — Merton's interior, like most colleges, charges visitors for entry.

Ahead, the meadow both writers are said to have walked for inspiration.`,
      },
    },
    {
      id: "christ-church-meadow",
      order: 4,
      name: "Christ Church Meadow",
      coordinates: { lat: 51.7477, lng: -1.254 },
      triggerRadiusMeters: 45,
      narration: {
        durationSec: 47,
        audioSource: require("../../../assets/audio/oxford-inklings/04-christ-church-meadow.mp3"),
        scriptText: `Last stop: Christ Church Meadow, a broad expanse of open grazing land and walking paths right in the heart of the city, bordered by the River Cherwell on one side and the Thames — known locally as the Isis — on the other.

The meadow has been open, undeveloped land for centuries, grazed by cattle to this day, and it's exactly the kind of quiet green space that both Tolkien and Lewis are known to have walked through regularly while thinking through their work — a five-minute escape from college rooms and lecture halls into something closer to countryside.

It's free and open to the public every day, dawn until dusk.

That's the tour. St Giles' and The Eagle and Child, where we started, are about a fifteen-minute walk back north through the city centre.`,
      },
    },
  ],
  path: [
    { lat: 51.756611, lng: -1.26004 },
    { lat: 51.756611, lng: -1.26004 },
    { lat: 51.756578, lng: -1.260024 },
    { lat: 51.756344, lng: -1.259893 },
    { lat: 51.756272, lng: -1.259851 },
    { lat: 51.756226, lng: -1.259824 },
    { lat: 51.755955, lng: -1.259683 },
    { lat: 51.755859, lng: -1.259646 },
    { lat: 51.75576, lng: -1.259609 },
    { lat: 51.755489, lng: -1.259506 },
    { lat: 51.755427, lng: -1.259483 },
    { lat: 51.755295, lng: -1.259434 },
    { lat: 51.75528, lng: -1.259441 },
    { lat: 51.755278, lng: -1.259454 },
    { lat: 51.755217, lng: -1.259428 },
    { lat: 51.755166, lng: -1.259406 },
    { lat: 51.755151, lng: -1.259341 },
    { lat: 51.755093, lng: -1.25932 },
    { lat: 51.755098, lng: -1.259269 },
    { lat: 51.755103, lng: -1.259187 },
    { lat: 51.755107, lng: -1.259127 },
    { lat: 51.755111, lng: -1.259075 },
    { lat: 51.75505, lng: -1.259066 },
    { lat: 51.755074, lng: -1.258893 },
    { lat: 51.755078, lng: -1.258867 },
    { lat: 51.755083, lng: -1.258832 },
    { lat: 51.755091, lng: -1.258777 },
    { lat: 51.755094, lng: -1.258753 },
    { lat: 51.754731, lng: -1.258525 },
    { lat: 51.754267, lng: -1.258408 },
    { lat: 51.754258, lng: -1.258387 },
    { lat: 51.754261, lng: -1.258345 },
    { lat: 51.754213, lng: -1.258362 },
    { lat: 51.754182, lng: -1.258315 },
    { lat: 51.754191, lng: -1.258221 },
    { lat: 51.754207, lng: -1.258001 },
    { lat: 51.754211, lng: -1.257752 },
    { lat: 51.754204, lng: -1.257601 },
    { lat: 51.754199, lng: -1.257301 },
    { lat: 51.754191, lng: -1.257095 },
    { lat: 51.754193, lng: -1.256941 },
    { lat: 51.754193, lng: -1.256919 },
    { lat: 51.754207, lng: -1.256743 },
    { lat: 51.754213, lng: -1.256694 },
    { lat: 51.754228, lng: -1.256608 },
    { lat: 51.754324, lng: -1.256005 },
    { lat: 51.754324, lng: -1.256005 },
    { lat: 51.754335, lng: -1.255945 },
    { lat: 51.754379, lng: -1.255693 },
    { lat: 51.754423, lng: -1.255518 },
    { lat: 51.75445, lng: -1.255438 },
    { lat: 51.754505, lng: -1.255291 },
    { lat: 51.754537, lng: -1.255197 },
    { lat: 51.754532, lng: -1.255189 },
    { lat: 51.754544, lng: -1.255136 },
    { lat: 51.754548, lng: -1.255114 },
    { lat: 51.754499, lng: -1.255094 },
    { lat: 51.754502, lng: -1.255004 },
    { lat: 51.75449, lng: -1.254947 },
    { lat: 51.754467, lng: -1.254906 },
    { lat: 51.754417, lng: -1.25484 },
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
    { lat: 51.753067, lng: -1.2535 },
    { lat: 51.752709, lng: -1.253297 },
    { lat: 51.752692, lng: -1.253288 },
    { lat: 51.752679, lng: -1.253359 },
    { lat: 51.752614, lng: -1.253331 },
    { lat: 51.752561, lng: -1.253308 },
    { lat: 51.752549, lng: -1.253304 },
    { lat: 51.752529, lng: -1.253447 },
    { lat: 51.752392, lng: -1.253398 },
    { lat: 51.752065, lng: -1.253288 },
    { lat: 51.751932, lng: -1.253245 },
    { lat: 51.751645, lng: -1.2531 },
    { lat: 51.751223, lng: -1.252933 },
    { lat: 51.751194, lng: -1.253069 },
    { lat: 51.751154, lng: -1.253053 },
    { lat: 51.750951, lng: -1.252982 },
    { lat: 51.75043, lng: -1.252953 },
    { lat: 51.750307, lng: -1.252916 },
    { lat: 51.750283, lng: -1.252911 },
    { lat: 51.750049, lng: -1.252878 },
    { lat: 51.749888, lng: -1.25287 },
    { lat: 51.749306, lng: -1.252873 },
    { lat: 51.749318, lng: -1.252291 },
    { lat: 51.749306, lng: -1.252873 },
    { lat: 51.749274, lng: -1.253032 },
    { lat: 51.749219, lng: -1.253127 },
    { lat: 51.749158, lng: -1.253181 },
    { lat: 51.749148, lng: -1.25363 },
    { lat: 51.749129, lng: -1.254439 },
    { lat: 51.74769, lng: -1.254324 },
  ],
};

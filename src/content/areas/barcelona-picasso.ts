import type { Area } from "../schema";

/**
 * Picasso's Barcelona: La Llotja and the Porxos d'en Xifré, La Mercè (the family
 * flat), Carrer de la Plata (first studio), Carrer d'Avinyó, Carrer Nou de la
 * Rambla 10, the Sala Parés, the Col·legi d'Arquitectes frieze, Els Quatre Gats,
 * the lost Riera de Sant Joan (Via Laietana), Carrer del Comerç 28 and the Museu
 * Picasso. Researched October 2026.
 *
 * Sources: Museu Picasso de Barcelona, "Virtual tour of Picasso's Barcelona"
 * (every address, the arrival date of 21 September 1895, the Plata 4/5 dispute,
 * Escudellers Blancs, Nou de la Rambla, Riera de Sant Joan and La Vie, Comerç 28,
 * Quatre Gats, Sala Parés 1901, the frieze, the museum's history and donations,
 * Olga at the Hotel Ranzini 1917); museupicassobcn.cat on Science and Charity and
 * on Casagemas; Wikipedia (Pablo Picasso, Museu Picasso, Science and Charity,
 * Carles Casagemas); Met Museum and Sotheby's notes (the February 1900 Quatre
 * Gats show); NY Review of Books and others (the 1934 last visit and the vow);
 * Ara / Museu Picasso on the Riera de Sant Joan's route.
 *
 * Corrections and flags:
 *  - The entrance exam: "one day" (popular) vs "a week" (Wikipedia): both given.
 *  - First studio: Carrer de la Plata 5 (plaque, tradition) or 4 (Palau i Fabre):
 *    both given; the stop is on the street.
 *  - The Riera de Sant Joan no longer exists (demolished for Via Laietana from
 *    1907): the stop is on Via Laietana roughly where it ran, between the
 *    cathedral and Santa Caterina; location approximate.
 *  - The family flat at Mercè 3 was demolished to enlarge Plaça de la Mercè.
 *  - The frieze's date: 1960 (Museu Picasso) vs 1962 (often cited): "around 1960".
 *  - The father-hands-over-his-brushes story is told as possibly embellished.
 *  - The Demoiselles title was not Picasso's (usually credited to André Salmon).
 *  - Eleven stops rather than 12-15: these are the documented sites within a
 *    compact walk; Horta de Sant Joan and Gósol are far outside the city.
 *  - Picasso's own artworks are not reproduced (in copyright until 2043).
 *
 * Stops and the walking path come from OpenStreetMap (Overpass and Nominatim; the
 * path routed along OSM footways by the FOSSGIS foot router). Accurate to a few
 * metres, not surveyed: walk the route once before promoting it.
 *
 * Narration: these recordings are TEMPORARY, made with Google text-to-speech in
 * Professor Hoot's "Ask your guide" voice (en-GB-Standard-A). Replace them with the
 * original narrator's ElevenLabs voice, same file names.
 *
 * Cover: Ramon Casas, "Ramon Casas and Pere Romeu on a Tandem" (1897), painted
 * for Els Quatre Gats; MNAC, via Google Art Project (Wikimedia Commons, public
 * domain), cropped.
 */

/**
 * Passeig d'Isabel II -> Passeig de Colom -> Carrer de la Mercè -> Carrer de la
 * Plata -> Carrer d'Avinyó -> La Rambla -> Carrer Nou de la Rambla -> Carrer de
 * Petritxol -> Plaça Nova -> Carrer de Montsió -> Via Laietana -> Carrer del Comerç
 * -> Carrer de Montcada. About 3.8 km.
 */
const path = [
  { lat: 41.381949, lng: 2.182902 },
  { lat: 41.381744, lng: 2.182729 },
  { lat: 41.381731, lng: 2.182718 },
  { lat: 41.381696, lng: 2.182687 },
  { lat: 41.381716, lng: 2.182649 },
  { lat: 41.381728, lng: 2.182626 },
  { lat: 41.381745, lng: 2.182593 },
  { lat: 41.381759, lng: 2.182567 },
  { lat: 41.381772, lng: 2.182543 },
  { lat: 41.381788, lng: 2.182512 },
  { lat: 41.381803, lng: 2.182484 },
  { lat: 41.381814, lng: 2.182463 },
  { lat: 41.38159, lng: 2.182276 },
  { lat: 41.381596, lng: 2.182267 },
  { lat: 41.381605, lng: 2.182253 },
  { lat: 41.38157, lng: 2.1822 },
  { lat: 41.381571, lng: 2.18215 },
  { lat: 41.38164, lng: 2.182006 },
  { lat: 41.381604, lng: 2.181967 },
  { lat: 41.381593, lng: 2.181954 },
  { lat: 41.381551, lng: 2.181908 },
  { lat: 41.381535, lng: 2.18189 },
  { lat: 41.381519, lng: 2.18187 },
  { lat: 41.381498, lng: 2.181843 },
  { lat: 41.381256, lng: 2.181927 },
  { lat: 41.381149, lng: 2.181842 },
  { lat: 41.381168, lng: 2.181756 },
  { lat: 41.381154, lng: 2.181744 },
  { lat: 41.381114, lng: 2.181717 },
  { lat: 41.381062, lng: 2.181682 },
  { lat: 41.38104, lng: 2.181665 },
  { lat: 41.381019, lng: 2.181656 },
  { lat: 41.380831, lng: 2.181484 },
  { lat: 41.380756, lng: 2.181414 },
  { lat: 41.380624, lng: 2.181279 },
  { lat: 41.380466, lng: 2.181149 },
  { lat: 41.380203, lng: 2.180954 },
  { lat: 41.380164, lng: 2.18092 },
  { lat: 41.379779, lng: 2.180604 },
  { lat: 41.379682, lng: 2.180522 },
  { lat: 41.379642, lng: 2.18049 },
  { lat: 41.379665, lng: 2.180447 },
  { lat: 41.379833, lng: 2.180128 },
  { lat: 41.379843, lng: 2.180109 },
  { lat: 41.379827, lng: 2.180095 },
  { lat: 41.379653, lng: 2.17995 },
  { lat: 41.379525, lng: 2.179848 },
  { lat: 41.379451, lng: 2.179794 },
  { lat: 41.379424, lng: 2.179773 },
  { lat: 41.379352, lng: 2.17972 },
  { lat: 41.379266, lng: 2.179656 },
  { lat: 41.379148, lng: 2.17957 },
  { lat: 41.379266, lng: 2.179656 },
  { lat: 41.379352, lng: 2.17972 },
  { lat: 41.379424, lng: 2.179773 },
  { lat: 41.379451, lng: 2.179794 },
  { lat: 41.379525, lng: 2.179848 },
  { lat: 41.379653, lng: 2.17995 },
  { lat: 41.379827, lng: 2.180095 },
  { lat: 41.379843, lng: 2.180109 },
  { lat: 41.380387, lng: 2.18054 },
  { lat: 41.380377, lng: 2.180564 },
  { lat: 41.380361, lng: 2.180601 },
  { lat: 41.380377, lng: 2.180564 },
  { lat: 41.380387, lng: 2.18054 },
  { lat: 41.380402, lng: 2.180506 },
  { lat: 41.38056, lng: 2.18014 },
  { lat: 41.380572, lng: 2.180114 },
  { lat: 41.380057, lng: 2.179674 },
  { lat: 41.380068, lng: 2.179649 },
  { lat: 41.380248, lng: 2.179238 },
  { lat: 41.38037, lng: 2.178903 },
  { lat: 41.380614, lng: 2.178025 },
  { lat: 41.380577, lng: 2.178005 },
  { lat: 41.380478, lng: 2.177738 },
  { lat: 41.380434, lng: 2.17761 },
  { lat: 41.380286, lng: 2.177174 },
  { lat: 41.380269, lng: 2.177105 },
  { lat: 41.380246, lng: 2.177059 },
  { lat: 41.380216, lng: 2.177025 },
  { lat: 41.379975, lng: 2.176751 },
  { lat: 41.379922, lng: 2.17668 },
  { lat: 41.379664, lng: 2.17641 },
  { lat: 41.379945, lng: 2.175892 },
  { lat: 41.379983, lng: 2.175837 },
  { lat: 41.380094, lng: 2.175395 },
  { lat: 41.379915, lng: 2.175034 },
  { lat: 41.379695, lng: 2.174738 },
  { lat: 41.379681, lng: 2.174704 },
  { lat: 41.379663, lng: 2.174666 },
  { lat: 41.379633, lng: 2.174594 },
  { lat: 41.379538, lng: 2.17467 },
  { lat: 41.379497, lng: 2.17459 },
  { lat: 41.379482, lng: 2.17456 },
  { lat: 41.379469, lng: 2.17454 },
  { lat: 41.379405, lng: 2.174554 },
  { lat: 41.379386, lng: 2.174523 },
  { lat: 41.379042, lng: 2.174163 },
  { lat: 41.379386, lng: 2.174523 },
  { lat: 41.379405, lng: 2.174554 },
  { lat: 41.379469, lng: 2.17454 },
  { lat: 41.379482, lng: 2.17456 },
  { lat: 41.379497, lng: 2.17459 },
  { lat: 41.3796, lng: 2.174502 },
  { lat: 41.380089, lng: 2.174081 },
  { lat: 41.380127, lng: 2.174048 },
  { lat: 41.380166, lng: 2.174015 },
  { lat: 41.380219, lng: 2.173969 },
  { lat: 41.380613, lng: 2.17363 },
  { lat: 41.381046, lng: 2.173278 },
  { lat: 41.381082, lng: 2.173344 },
  { lat: 41.381142, lng: 2.173294 },
  { lat: 41.381183, lng: 2.173365 },
  { lat: 41.3812, lng: 2.173393 },
  { lat: 41.381222, lng: 2.173431 },
  { lat: 41.38123, lng: 2.173444 },
  { lat: 41.381333, lng: 2.173355 },
  { lat: 41.381369, lng: 2.173321 },
  { lat: 41.381408, lng: 2.1734 },
  { lat: 41.381421, lng: 2.173436 },
  { lat: 41.381487, lng: 2.173405 },
  { lat: 41.381535, lng: 2.173397 },
  { lat: 41.381643, lng: 2.17339 },
  { lat: 41.381745, lng: 2.173397 },
  { lat: 41.381852, lng: 2.173416 },
  { lat: 41.381916, lng: 2.173439 },
  { lat: 41.381974, lng: 2.173468 },
  { lat: 41.382232, lng: 2.173655 },
  { lat: 41.38224, lng: 2.173661 },
  { lat: 41.382405, lng: 2.173441 },
  { lat: 41.382487, lng: 2.173349 },
  { lat: 41.382539, lng: 2.173287 },
  { lat: 41.382649, lng: 2.173156 },
  { lat: 41.382728, lng: 2.17305 },
  { lat: 41.382798, lng: 2.172956 },
  { lat: 41.382925, lng: 2.172787 },
  { lat: 41.383049, lng: 2.172644 },
  { lat: 41.383323, lng: 2.172436 },
  { lat: 41.383402, lng: 2.172618 },
  { lat: 41.383502, lng: 2.172857 },
  { lat: 41.383601, lng: 2.173096 },
  { lat: 41.383729, lng: 2.173468 },
  { lat: 41.383801, lng: 2.173646 },
  { lat: 41.383894, lng: 2.173882 },
  { lat: 41.383961, lng: 2.174084 },
  { lat: 41.383991, lng: 2.174185 },
  { lat: 41.384108, lng: 2.174498 },
  { lat: 41.384285, lng: 2.174871 },
  { lat: 41.384359, lng: 2.174954 },
  { lat: 41.384403, lng: 2.175003 },
  { lat: 41.384493, lng: 2.174812 },
  { lat: 41.384515, lng: 2.174766 },
  { lat: 41.384562, lng: 2.174681 },
  { lat: 41.384558, lng: 2.174676 },
  { lat: 41.384628, lng: 2.17456 },
  { lat: 41.38463, lng: 2.174562 },
  { lat: 41.384758, lng: 2.174343 },
  { lat: 41.384827, lng: 2.174242 },
  { lat: 41.384794, lng: 2.174191 },
  { lat: 41.384762, lng: 2.174132 },
  { lat: 41.384826, lng: 2.174065 },
  { lat: 41.384854, lng: 2.174035 },
  { lat: 41.384856, lng: 2.174032 },
  { lat: 41.384915, lng: 2.173954 },
  { lat: 41.384999, lng: 2.173891 },
  { lat: 41.38523, lng: 2.173689 },
  { lat: 41.385262, lng: 2.173661 },
  { lat: 41.385357, lng: 2.173538 },
  { lat: 41.385388, lng: 2.173498 },
  { lat: 41.385419, lng: 2.173458 },
  { lat: 41.385529, lng: 2.173315 },
  { lat: 41.385543, lng: 2.1733 },
  { lat: 41.385706, lng: 2.173645 },
  { lat: 41.38571, lng: 2.173657 },
  { lat: 41.385738, lng: 2.173746 },
  { lat: 41.385906, lng: 2.174318 },
  { lat: 41.386009, lng: 2.174668 },
  { lat: 41.386056, lng: 2.174707 },
  { lat: 41.386394, lng: 2.175333 },
  { lat: 41.386408, lng: 2.175402 },
  { lat: 41.386455, lng: 2.175419 },
  { lat: 41.386332, lng: 2.175583 },
  { lat: 41.386297, lng: 2.175628 },
  { lat: 41.386327, lng: 2.175685 },
  { lat: 41.386334, lng: 2.175698 },
  { lat: 41.386346, lng: 2.17572 },
  { lat: 41.386283, lng: 2.175802 },
  { lat: 41.386297, lng: 2.175836 },
  { lat: 41.386417, lng: 2.17607 },
  { lat: 41.386527, lng: 2.176362 },
  { lat: 41.386396, lng: 2.176492 },
  { lat: 41.386162, lng: 2.176784 },
  { lat: 41.386005, lng: 2.176769 },
  { lat: 41.385861, lng: 2.176976 },
  { lat: 41.385821, lng: 2.177037 },
  { lat: 41.385877, lng: 2.177117 },
  { lat: 41.386273, lng: 2.177643 },
  { lat: 41.386318, lng: 2.177702 },
  { lat: 41.386284, lng: 2.177748 },
  { lat: 41.386271, lng: 2.17777 },
  { lat: 41.386568, lng: 2.178137 },
  { lat: 41.386652, lng: 2.178261 },
  { lat: 41.386671, lng: 2.178288 },
  { lat: 41.386685, lng: 2.178321 },
  { lat: 41.386699, lng: 2.178335 },
  { lat: 41.386722, lng: 2.17836 },
  { lat: 41.386777, lng: 2.178419 },
  { lat: 41.386947, lng: 2.178548 },
  { lat: 41.386995, lng: 2.178655 },
  { lat: 41.387125, lng: 2.178904 },
  { lat: 41.387162, lng: 2.178924 },
  { lat: 41.387224, lng: 2.179345 },
  { lat: 41.387242, lng: 2.179378 },
  { lat: 41.387277, lng: 2.179444 },
  { lat: 41.387308, lng: 2.179502 },
  { lat: 41.387515, lng: 2.179773 },
  { lat: 41.387588, lng: 2.179867 },
  { lat: 41.387611, lng: 2.179898 },
  { lat: 41.38789, lng: 2.180209 },
  { lat: 41.387868, lng: 2.180257 },
  { lat: 41.387792, lng: 2.180429 },
  { lat: 41.387766, lng: 2.180558 },
  { lat: 41.387912, lng: 2.180583 },
  { lat: 41.387922, lng: 2.180659 },
  { lat: 41.387945, lng: 2.180919 },
  { lat: 41.388059, lng: 2.18154 },
  { lat: 41.388178, lng: 2.181501 },
  { lat: 41.388059, lng: 2.18154 },
  { lat: 41.387881, lng: 2.181602 },
  { lat: 41.387742, lng: 2.181648 },
  { lat: 41.387, lng: 2.181886 },
  { lat: 41.386921, lng: 2.181913 },
  { lat: 41.386889, lng: 2.181928 },
  { lat: 41.386843, lng: 2.181949 },
  { lat: 41.38678, lng: 2.181986 },
  { lat: 41.386671, lng: 2.182062 },
  { lat: 41.386649, lng: 2.18206 },
  { lat: 41.386458, lng: 2.181819 },
  { lat: 41.386425, lng: 2.181774 },
  { lat: 41.386294, lng: 2.181593 },
  { lat: 41.386255, lng: 2.181551 },
  { lat: 41.386241, lng: 2.181535 },
  { lat: 41.386209, lng: 2.181557 },
  { lat: 41.386185, lng: 2.181577 },
  { lat: 41.386179, lng: 2.181569 },
  { lat: 41.385955, lng: 2.18127 },
  { lat: 41.385945, lng: 2.181256 },
  { lat: 41.38537, lng: 2.18053 },
  { lat: 41.385359, lng: 2.180513 },
  { lat: 41.385197, lng: 2.180706 },
  { lat: 41.385159, lng: 2.18077 },
  { lat: 41.385085, lng: 2.180878 },
  { lat: 41.385033, lng: 2.180961 },
];

export const barcelonaPicasso: Area = {
  id: "barcelona-picasso",
  name: "Picasso's Barcelona",
  city: "Barcelona",
  description:
    "Follow the teenage Pablo Picasso through the old town where he learned to paint, from the art school at La Llotja and his first studio to Els Quatre Gats, the Blue Period and the grief that shaped it, ending at the museum his oldest friend founded: how Barcelona made the twentieth century's greatest artist.",
  estimatedDurationMin: 95,
  estimatedDistanceKm: 3.8,
  difficulty: "easy",
  accessNote:
    "A flat walk through the narrow streets of the Gothic Quarter, La Mercè and La Ribera. The Museu Picasso and the Sala Parés keep their own opening hours; the museum is closed on Mondays.",
  isContentComplete: true,
  enableInteractiveGuide: true,
  image: require("../../../assets/tours/barcelona-picasso.jpg"),
  price: { singleTour: 4.99 },
  startingPoint: {
    lat: 41.38195,
    lng: 2.1829,
    label: "La Llotja, on Passeig d'Isabel II",
  },
  route: [
    {
      id: "pic-llotja",
      order: 1,
      name: "La Llotja: a thirteen-year-old at art school",
      coordinates: { lat: 41.38195, lng: 2.1829 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 72,
        audioSource: require("../../../assets/audio/barcelona-picasso/01-llotja.mp3"),
        scriptText: `Bon dia, and welcome. On this walk we'll follow Pablo Picasso through the nine years he spent growing up in Barcelona, from a gifted teenager in an academic art school to a young painter about to change art for ever.

He arrived by train on the 21st of September 1895, aged thirteen, with his parents and his younger sister Lola. The family was grieving: earlier that year, his little sister Conchita had died of diphtheria in A Coruña, in Galicia. His father, José Ruiz Blasco, a painter and art teacher, had found a job here, at the Fine Arts School on the top floor of this grand neoclassical building, La Llotja, Barcelona's old stock exchange.

The family's first lodgings were right opposite, in the arcaded blocks called the Porxos d'en Xifré.

Pablo sat the entrance exam for the school's advanced classes. Candidates normally had a month to prepare their drawings. The legend says he finished in a single day; other sources say a week. Either way, he was admitted. And here, among the plaster casts and life models, he met his first friends among Barcelona's young artists.

Now walk west along Passeig de Colom, and turn into the old streets of La Mercè.`,
      },
    },
    {
      id: "pic-merce",
      order: 2,
      name: "La Mercè: the family home",
      coordinates: { lat: 41.37921, lng: 2.17942 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 70,
        audioSource: require("../../../assets/audio/barcelona-picasso/02-merce.mp3"),
        scriptText: `In the summer of 1896, the family moved to a second-floor flat at number 3 Carrer de la Mercè, close to this church of the Mercè, dedicated to Barcelona's patron saint. It was home for the rest of Picasso's Barcelona years, and his parents stayed on after he left for Paris.

The building itself has gone. It stood on the corner of a tiny alley, and was demolished to make this square in front of the church.

His father, José, was a careful, academic painter, best known for pictures of pigeons. Pablo later told a story, perhaps embellished, that his father handed him his own brushes and palette and swore he would never paint again, because his son had surpassed him. Whether it happened quite like that or not, the boy's talent was obvious. Even later, after he became famous, he chose to sign his work with his mother's surname, Picasso, rather than his father's, Ruiz.

In 1917 he came back to this flat with a Russian ballerina from the Ballets Russes, Olga Khokhlova, who stayed at a hotel round the corner on Passeig de Colom. The following year, she became his first wife.

Now walk a few steps to Carrer de la Plata, Silver Street.`,
      },
    },
    {
      id: "pic-plata",
      order: 3,
      name: "Carrer de la Plata: the first studio",
      coordinates: { lat: 41.38036, lng: 2.1806 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 67,
        audioSource: require("../../../assets/audio/barcelona-picasso/03-carrer-de-la-plata.mp3"),
        scriptText: `In 1896, when Pablo was just fourteen, his father rented him his first studio, here on Carrer de la Plata. He shared it with a friend from the art school, Manuel Pallarès.

Nobody is quite sure which building it was. Tradition, and a plaque, say number 5. The Picasso scholar Josep Palau i Fabre believed it was the attic of number 4.

It was here that he painted Science and Charity, in 1897. It's a big, serious, academic picture: a sick woman in bed, a doctor taking her pulse, a nun holding a child. His father posed as the doctor. It won an honourable mention at the national fine arts exhibition in Madrid, and a gold medal in Málaga. You can see it today in the Picasso Museum, at the end of our walk.

It's the work of a fifteen-year-old who could already do everything his teachers asked. That autumn he went off to the Royal Academy in Madrid, the most prestigious art school in Spain. He soon got bored, stopped attending, and spent his time copying the old masters in the Prado instead.

Now walk west to Carrer d'Avinyó.`,
      },
    },
    {
      id: "pic-avinyo",
      order: 4,
      name: "Carrer d'Avinyó: the Demoiselles",
      coordinates: { lat: 41.38045, lng: 2.1776 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 70,
        audioSource: require("../../../assets/audio/barcelona-picasso/04-carrer-davinyo.mp3"),
        scriptText: `In 1899, after a long stay in the countryside at his friend Pallarès's village of Horta, Picasso came back to Barcelona and took a studio nearby, in Carrer dels Escudellers Blancs, lent by friends. He was seventeen, and this warren of narrow streets near the port was his playground.

Barcelona's old town was full of taverns, music halls and brothels, and young Picasso explored them all. One of the brothels was here, on Carrer d'Avinyó.

Years later, in Paris in 1907, he painted five naked women staring straight out at the viewer, their bodies broken into sharp, flat planes, some of their faces like African or ancient Iberian masks. Even his friends were shocked. The painting became known as Les Demoiselles d'Avignon: the young ladies of Avinyó, named after this street. The title wasn't Picasso's own; it was given by a friend, and the painter himself apparently disliked it.

Many art historians see it as the first step towards Cubism, the movement Picasso created with Georges Braque, which broke the rules of painting that had held since the Renaissance. And it has its roots right here.

Now cross La Rambla to Carrer Nou de la Rambla.`,
      },
    },
    {
      id: "pic-nou-de-la-rambla",
      order: 5,
      name: "Nou de la Rambla: a studio above the rooftops",
      coordinates: { lat: 41.37905, lng: 2.17415 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 71,
        audioSource: require("../../../assets/audio/barcelona-picasso/05-nou-de-la-rambla.mp3"),
        scriptText: `In 1902, between trips to Paris, Picasso shared a studio at number 10 Carrer Nou de la Rambla, a few doors from Gaudí's Palau Güell, with the sculptor Àngel Fernández de Soto and the painter Josep Rocarol.

It was at the top of the building, stifling in summer, with changeable light. But it was a stone's throw from La Rambla, and right next door was the Edén Concert, a popular music hall, where Picasso sketched the singers.

From the window, he painted the rooftops and terraces of this poor, crowded quarter. By now his palette had turned almost entirely blue. This was his Blue Period, roughly 1901 to 1904. He painted beggars, blind men, mothers and children, prisoners and the lonely, all in cold, mournful blues.

Why blue? Partly grief, which we'll come to. Partly poverty and the hard lives he saw around him, here and in Paris. And partly the influence of the Symbolist painters he admired, who used colour to express a mood rather than to describe the world.

Blue Period pictures didn't sell well then. Today they're among the most valuable paintings on earth.

Now walk back across La Rambla, to Carrer de Petritxol.`,
      },
    },
    {
      id: "pic-sala-pares",
      order: 6,
      name: "Sala Parés: Ramon Casas and the modernistes",
      coordinates: { lat: 41.38272, lng: 2.17304 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 66,
        audioSource: require("../../../assets/audio/barcelona-picasso/06-sala-pares.mp3"),
        scriptText: `This narrow street, famous for its chocolate shops, is also home to the Sala Parés, one of the oldest art galleries in Spain, founded in the nineteenth century. In 1901 it showed a series of pastel drawings by the young Picasso, together with portraits by Ramon Casas.

Casas was the star of Barcelona's art world: rich, stylish and a brilliant painter and poster designer. He and his friend Santiago Rusiñol led the modernistes, the Catalan artists, architects and writers who wanted to make Barcelona a modern, European capital of culture, looking to Paris rather than to Madrid.

For a teenager from Málaga, these men were heroes. Picasso absorbed their ideas, and their love of Paris. But he was also competitive. He studied Casas's elegant portrait drawings and set out to do the same thing better, and faster.

Picasso learned to speak Catalan and made Catalan friends who stayed loyal all his life. In times of sadness or nostalgia, he would think of Barcelona as his true home.

Now walk north up Carrer dels Arcs to the Plaça Nova, opposite the cathedral.`,
      },
    },
    {
      id: "pic-colegi-arquitectes",
      order: 7,
      name: "The architects' frieze: Picasso's gift to the street",
      coordinates: { lat: 41.3844, lng: 2.175 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 73,
        audioSource: require("../../../assets/audio/barcelona-picasso/07-collegi-darquitectes.mp3"),
        scriptText: `Look up at the modern building across from the cathedral: the Col·legi d'Arquitectes de Catalunya, the College of Architects. Along its walls run long, childlike line drawings, sandblasted into the concrete: giants and dancers, children playing, people carrying palm branches and flags.

They're by Picasso: his best-known public work in the city. He made the designs, and the Norwegian artist Carl Nesjar transferred them to the walls, around 1960. They show Catalan festivals and traditions, the life of the streets he remembered from his youth.

Here's the remarkable thing. At the time, Spain was ruled by General Franco. Picasso hated the regime, whose allies had bombed the Basque town of Guernica in 1937, the subject of his most famous anti-war painting. After a last visit in 1934, he vowed never to return to Spain while Franco was in power, and he never did. He died in France in 1973; Franco died two years later.

So he sent his art instead. This frieze is a love letter to Barcelona from an exile who couldn't come home.

Now walk up the wide shopping street, Portal de l'Àngel, and turn right into Carrer de Montsió.`,
      },
    },
    {
      id: "pic-quatre-gats",
      order: 8,
      name: "Els Quatre Gats: the first exhibition",
      coordinates: { lat: 41.38574, lng: 2.17364 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 70,
        audioSource: require("../../../assets/audio/barcelona-picasso/08-els-quatre-gats.mp3"),
        scriptText: `This handsome building by the modernista architect Josep Puig i Cadafalch housed the most famous café in Barcelona's art history: Els Quatre Gats, the Four Cats.

It opened in 1897, modelled on the Chat Noir cabaret in Paris, founded by Pere Romeu with Ramon Casas, Santiago Rusiñol and Miquel Utrillo. Artists and writers met here to drink and argue. There were concerts, puppet shows and shadow plays, and magazines were published from here.

Young Picasso became a regular, and he designed the café's menu card. And here, in February 1900, he held his first public exhibition. He pinned around a hundred and fifty drawings straight onto the walls, mostly portraits of his friends from the café, a challenge to Casas, whose portraits of the same crowd were famous.

Among those friends were Jaume Sabartés, who became his secretary and lifelong companion, and Carles Casagemas, a sensitive young painter and poet who was Picasso's closest friend.

The original café closed in 1903. The restaurant here today uses the old name, and its look, as a tribute.

Now walk east, across Via Laietana.`,
      },
    },
    {
      id: "pic-riera-sant-joan",
      order: 9,
      name: "The lost street: Casagemas and the Blue Period",
      coordinates: { lat: 41.3859, lng: 2.17662 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 74,
        audioSource: require("../../../assets/audio/barcelona-picasso/09-riera-de-sant-joan.mp3"),
        scriptText: `Somewhere around here, between the cathedral and Santa Caterina market, ran a narrow street called the Riera de Sant Joan. It vanished when this great avenue, the Via Laietana, was driven through the old town from 1907.

In 1900, Picasso and Carles Casagemas shared a bare studio at number 17. The story goes that, too poor for furniture, they painted it onto the walls: shelves of books, a table loaded with food, a sideboard of fruit, even a maid and a manservant.

That autumn the two friends went to Paris together, Picasso's first visit. Casagemas fell desperately in love with a young woman there, who did not return his love. In February 1901, in a Paris café, he shot at her, missed, and then killed himself. He was twenty.

Picasso was back in Spain when he heard. The grief lingered for years. Later that year he painted his friend's death, and gradually his whole world turned blue.

In 1903, back in this street, in his old studio, Picasso painted La Vie, Life: a great Blue Period canvas in which the young man has Casagemas's face. It's now in Cleveland, in the United States.

Now continue east to Carrer del Comerç.`,
      },
    },
    {
      id: "pic-comerc",
      order: 10,
      name: "Carrer del Comerç: the last studio",
      coordinates: { lat: 41.38817, lng: 2.18146 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 62,
        audioSource: require("../../../assets/audio/barcelona-picasso/10-carrer-del-comerc.mp3"),
        scriptText: `At the beginning of 1904, Picasso took what would be his last studio in Barcelona, on the top floor of this building, number 28 Carrer del Comerç. It was lent to him by the sculptor Pau Gargallo, and the painter Isidre Nonell had a studio here too: three great artists, under one roof.

Picasso was twenty-two. He'd been to Paris three times, and each time he came back to Barcelona. Barcelona had made him: the academic training of the Llotja, the modernista circle of the Quatre Gats, Catalan friends who believed in him, and streets full of the poverty that filled his Blue Period canvases.

But Paris was the capital of the art world. In April 1904 he left for Paris, for good. He moved into a ramshackle building in Montmartre, the Bateau-Lavoir, and within a few years he had painted the Demoiselles and begun Cubism with Braque.

He came back to visit his family several times, the last in 1934. But he never lived here again.

Now walk down to Carrer de Montcada and the Picasso Museum.`,
      },
    },
    {
      id: "pic-museu",
      order: 11,
      name: "The Picasso Museum: a gift to the city",
      coordinates: { lat: 41.38505, lng: 2.18098 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 72,
        audioSource: require("../../../assets/audio/barcelona-picasso/11-museu-picasso.mp3"),
        scriptText: `Our walk ends on Carrer de Montcada, a street of medieval merchants' palaces. Five of them now form the Museu Picasso.

It opened on the 9th of March 1963, the first museum devoted to Picasso, and the only one created in his lifetime. The idea came from his old friend from the Quatre Gats, Jaume Sabartés, who gave his own collection of more than five hundred works. Because Franco's government disliked Picasso, it was officially called the Sabartés Collection at first.

After Sabartés died in 1968, Picasso gave the museum his series of fifty-eight paintings based on Velázquez's Las Meninas. Then, in 1970, he gave more than nine hundred works that his family had kept in Barcelona: school drawings, sketchbooks, Science and Charity, and early paintings. It's why this museum is the best place in the world to see how Picasso became Picasso.

He never saw it. He kept his vow not to return to Spain under Franco, and died in 1973.

Inside, you can follow the journey we've just walked: from a thirteen-year-old's plaster-cast drawings to the boldest artist of the twentieth century.

Thank you for walking with me. Adéu!`,
      },
    },
  ],
  path,
};

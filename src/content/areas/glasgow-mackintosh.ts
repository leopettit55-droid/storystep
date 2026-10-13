import type { Area } from "../schema";

/**
 * Mackintosh's Glasgow: the Necropolis (McCall monument), Martyrs' Public School
 * and Parson Street, Miss Cranston's Buchanan Street tea rooms, the Lighthouse
 * (Glasgow Herald building), the Daily Record building, Blythswood Square (Glasgow
 * Art Club and the Lady Artists' Club door), the Willow Tea Rooms, the Glasgow
 * School of Art, Kelvingrove and the Hunterian's Mackintosh House. Researched
 * October 2026.
 *
 * Sources: Wikipedia (Charles Rennie Mackintosh, Martyrs' Public School, The
 * Lighthouse, Willow Tearooms, Catherine Cranston, Glasgow School of Art, Scotland
 * Street School), Historic Environment Scotland listing LB33099 (Daily Record
 * building), Glasgow Heritage / the Lady Artists' Club minutes (1908 doorway),
 * Glasgow Art Club (1893 gallery and frieze; women admitted 1983), geograph and Art
 * UK (McCall memorial), Art Fund / V&A Dundee (the Oak Room), the Hunterian and
 * Victorian Web (Mackintosh House), Open University design blog (Kelvingrove's
 * Glasgow Style gallery), Dezeen, Project Scotland and the Glasgow Guardian (the
 * GSA's July 2026 decision on the Mackintosh Building), the NTS (2024 purchase and
 * February 2026 renaming of the tea rooms).
 *
 * Corrections and flags:
 *  - The brief asked for 12-15 stops. There are ten: the Mackintosh buildings
 *    within walking distance of each other. Queen's Cross Church (Maryhill),
 *    Scotland Street School (south side), The Hill House (Helensburgh) and House
 *    for an Art Lover (Bellahouston) are recommended in the last stop.
 *  - "There is hope in honest error..." is usually credited to Mackintosh; it is
 *    John D. Sedding's line, which Mackintosh copied out in 1901. Told that way.
 *  - The McCall cross is "thought to be" his first commission; that his father's
 *    police job brought the work is suggested, not proven ("may help explain").
 *  - The Herald tower's water tank is widely repeated but not in the sources
 *    above: told as "is said to have held".
 *  - The Lighthouse has been closed since 2020 (leased in 2025 for a clean-tech
 *    hub). The GSA Mackintosh Building is a fire-damaged shell; in July 2026 the
 *    GSA said full reinstatement (~GBP 265m) is unaffordable. Re-check both before
 *    promoting the tour.
 *  - The McCall memorial itself is up the Necropolis hill; the stop is at the
 *    gates. The Art Club (185 Bath St) and 5 Blythswood Square share one stop,
 *    as they are 45 m apart.
 *
 * Stops and the walking path come from OpenStreetMap (Overpass and Nominatim; the
 * path routed along OSM footways by the FOSSGIS foot router). Accurate to a few
 * metres, not surveyed: walk the route once before promoting it.
 *
 * Narration: these recordings are TEMPORARY, made with Google text-to-speech in
 * Professor Hoot's "Ask your guide" voice (en-GB-Standard-A). Replace them with the
 * original narrator's ElevenLabs voice, same file names.
 *
 * Cover: the Willow Tea Rooms, Sauchiehall Street, photographed by James Craig
 * Annan, c. 1903 (Wikimedia Commons, public domain), cropped.
 */

/**
 * Cathedral Square -> Parson Street -> Buchanan Street -> Mitchell Lane -> Renfield
 * Lane -> West George Street -> Blythswood Square -> Sauchiehall Street -> Renfrew
 * Street -> Park district -> Kelvingrove Park -> Gilmorehill. About 6.5 km.
 */
const path = [
  { lat: 55.86233, lng: -4.234582 },
  { lat: 55.862335, lng: -4.234626 },
  { lat: 55.862345, lng: -4.234746 },
  { lat: 55.862349, lng: -4.234795 },
  { lat: 55.862353, lng: -4.234855 },
  { lat: 55.862391, lng: -4.235585 },
  { lat: 55.8624, lng: -4.23573 },
  { lat: 55.862503, lng: -4.235856 },
  { lat: 55.862553, lng: -4.235917 },
  { lat: 55.86295, lng: -4.236084 },
  { lat: 55.862941, lng: -4.236214 },
  { lat: 55.862922, lng: -4.236486 },
  { lat: 55.862921, lng: -4.236522 },
  { lat: 55.862923, lng: -4.23655 },
  { lat: 55.862928, lng: -4.236631 },
  { lat: 55.86293, lng: -4.236661 },
  { lat: 55.862937, lng: -4.236787 },
  { lat: 55.862949, lng: -4.23692 },
  { lat: 55.862999, lng: -4.236917 },
  { lat: 55.863082, lng: -4.236927 },
  { lat: 55.8631, lng: -4.23695 },
  { lat: 55.863118, lng: -4.236973 },
  { lat: 55.863132, lng: -4.236991 },
  { lat: 55.863152, lng: -4.236941 },
  { lat: 55.863168, lng: -4.236931 },
  { lat: 55.863551, lng: -4.237007 },
  { lat: 55.863568, lng: -4.237011 },
  { lat: 55.863586, lng: -4.237045 },
  { lat: 55.863592, lng: -4.23709 },
  { lat: 55.863601, lng: -4.23709 },
  { lat: 55.863633, lng: -4.237087 },
  { lat: 55.863674, lng: -4.237085 },
  { lat: 55.863723, lng: -4.237134 },
  { lat: 55.864251, lng: -4.23754 },
  { lat: 55.864151, lng: -4.237822 },
  { lat: 55.864208, lng: -4.237888 },
  { lat: 55.86429, lng: -4.237669 },
  { lat: 55.864313, lng: -4.237607 },
  { lat: 55.864385, lng: -4.237685 },
  { lat: 55.864709, lng: -4.237676 },
  { lat: 55.864983, lng: -4.23756 },
  { lat: 55.865374, lng: -4.237816 },
  { lat: 55.865433, lng: -4.237582 },
  { lat: 55.865374, lng: -4.237816 },
  { lat: 55.865295, lng: -4.238138 },
  { lat: 55.86583, lng: -4.238543 },
  { lat: 55.86601, lng: -4.23868 },
  { lat: 55.866112, lng: -4.238902 },
  { lat: 55.866088, lng: -4.239062 },
  { lat: 55.866086, lng: -4.239384 },
  { lat: 55.866037, lng: -4.239518 },
  { lat: 55.866025, lng: -4.240035 },
  { lat: 55.866092, lng: -4.240213 },
  { lat: 55.866119, lng: -4.240397 },
  { lat: 55.86611, lng: -4.240702 },
  { lat: 55.866057, lng: -4.241038 },
  { lat: 55.865932, lng: -4.241892 },
  { lat: 55.865893, lng: -4.24227 },
  { lat: 55.865858, lng: -4.242556 },
  { lat: 55.865854, lng: -4.242816 },
  { lat: 55.865822, lng: -4.243275 },
  { lat: 55.865696, lng: -4.24348 },
  { lat: 55.865688, lng: -4.243799 },
  { lat: 55.865681, lng: -4.244046 },
  { lat: 55.865619, lng: -4.244478 },
  { lat: 55.865591, lng: -4.244671 },
  { lat: 55.86557, lng: -4.244813 },
  { lat: 55.865509, lng: -4.24527 },
  { lat: 55.865432, lng: -4.245763 },
  { lat: 55.86541, lng: -4.245916 },
  { lat: 55.865313, lng: -4.24659 },
  { lat: 55.865208, lng: -4.246948 },
  { lat: 55.865152, lng: -4.247295 },
  { lat: 55.865046, lng: -4.248003 },
  { lat: 55.864915, lng: -4.248338 },
  { lat: 55.864871, lng: -4.248586 },
  { lat: 55.864858, lng: -4.248629 },
  { lat: 55.864639, lng: -4.248709 },
  { lat: 55.864391, lng: -4.248811 },
  { lat: 55.864402, lng: -4.248873 },
  { lat: 55.86441, lng: -4.248944 },
  { lat: 55.864418, lng: -4.249094 },
  { lat: 55.864412, lng: -4.249093 },
  { lat: 55.86436, lng: -4.249099 },
  { lat: 55.864089, lng: -4.2492 },
  { lat: 55.864048, lng: -4.249287 },
  { lat: 55.864009, lng: -4.249268 },
  { lat: 55.863956, lng: -4.249265 },
  { lat: 55.863585, lng: -4.249407 },
  { lat: 55.863538, lng: -4.249452 },
  { lat: 55.863496, lng: -4.2495 },
  { lat: 55.863374, lng: -4.249553 },
  { lat: 55.863339, lng: -4.24953 },
  { lat: 55.863309, lng: -4.249536 },
  { lat: 55.863272, lng: -4.249553 },
  { lat: 55.863257, lng: -4.249589 },
  { lat: 55.863174, lng: -4.249617 },
  { lat: 55.863199, lng: -4.249959 },
  { lat: 55.863228, lng: -4.250332 },
  { lat: 55.863323, lng: -4.251468 },
  { lat: 55.863332, lng: -4.251827 },
  { lat: 55.863338, lng: -4.251892 },
  { lat: 55.863435, lng: -4.252861 },
  { lat: 55.863438, lng: -4.252891 },
  { lat: 55.863452, lng: -4.253017 },
  { lat: 55.863409, lng: -4.253036 },
  { lat: 55.863237, lng: -4.253103 },
  { lat: 55.862713, lng: -4.25333 },
  { lat: 55.862403, lng: -4.25344 },
  { lat: 55.862131, lng: -4.253542 },
  { lat: 55.862076, lng: -4.253566 },
  { lat: 55.861888, lng: -4.253626 },
  { lat: 55.86158, lng: -4.253738 },
  { lat: 55.861166, lng: -4.253885 },
  { lat: 55.860717, lng: -4.25405 },
  { lat: 55.8605, lng: -4.254131 },
  { lat: 55.86033, lng: -4.254193 },
  { lat: 55.860209, lng: -4.254238 },
  { lat: 55.859996, lng: -4.254317 },
  { lat: 55.859914, lng: -4.254347 },
  { lat: 55.859718, lng: -4.254419 },
  { lat: 55.859779, lng: -4.254995 },
  { lat: 55.859868, lng: -4.255774 },
  { lat: 55.859726, lng: -4.255789 },
  { lat: 55.859868, lng: -4.255774 },
  { lat: 55.859964, lng: -4.255757 },
  { lat: 55.860014, lng: -4.255738 },
  { lat: 55.860409, lng: -4.255578 },
  { lat: 55.860486, lng: -4.255547 },
  { lat: 55.860494, lng: -4.255709 },
  { lat: 55.860518, lng: -4.256252 },
  { lat: 55.860556, lng: -4.256964 },
  { lat: 55.860633, lng: -4.256968 },
  { lat: 55.860679, lng: -4.25697 },
  { lat: 55.860705, lng: -4.256965 },
  { lat: 55.860939, lng: -4.256897 },
  { lat: 55.861066, lng: -4.258012 },
  { lat: 55.861124, lng: -4.258524 },
  { lat: 55.861249, lng: -4.258481 },
  { lat: 55.861334, lng: -4.258452 },
  { lat: 55.861569, lng: -4.258369 },
  { lat: 55.861684, lng: -4.258329 },
  { lat: 55.862098, lng: -4.258172 },
  { lat: 55.862407, lng: -4.25805 },
  { lat: 55.862435, lng: -4.258039 },
  { lat: 55.862505, lng: -4.258011 },
  { lat: 55.862522, lng: -4.258146 },
  { lat: 55.862579, lng: -4.258605 },
  { lat: 55.862712, lng: -4.259585 },
  { lat: 55.863062, lng: -4.259457 },
  { lat: 55.863428, lng: -4.259325 },
  { lat: 55.863594, lng: -4.260697 },
  { lat: 55.863608, lng: -4.260813 },
  { lat: 55.86362, lng: -4.260915 },
  { lat: 55.863782, lng: -4.262269 },
  { lat: 55.863823, lng: -4.262602 },
  { lat: 55.863782, lng: -4.262269 },
  { lat: 55.864139, lng: -4.262161 },
  { lat: 55.864437, lng: -4.262057 },
  { lat: 55.864503, lng: -4.262034 },
  { lat: 55.864582, lng: -4.262004 },
  { lat: 55.864869, lng: -4.261897 },
  { lat: 55.865131, lng: -4.261773 },
  { lat: 55.865201, lng: -4.261745 },
  { lat: 55.865196, lng: -4.261531 },
  { lat: 55.865111, lng: -4.260827 },
  { lat: 55.865196, lng: -4.261531 },
  { lat: 55.865252, lng: -4.261595 },
  { lat: 55.865292, lng: -4.261699 },
  { lat: 55.865317, lng: -4.261894 },
  { lat: 55.865453, lng: -4.263051 },
  { lat: 55.865468, lng: -4.263172 },
  { lat: 55.866132, lng: -4.262936 },
  { lat: 55.866228, lng: -4.263758 },
  { lat: 55.866303, lng: -4.264408 },
  { lat: 55.866102, lng: -4.26448 },
  { lat: 55.866025, lng: -4.264508 },
  { lat: 55.865829, lng: -4.264579 },
  { lat: 55.865642, lng: -4.264636 },
  { lat: 55.865671, lng: -4.264882 },
  { lat: 55.865826, lng: -4.266195 },
  { lat: 55.865855, lng: -4.266438 },
  { lat: 55.866005, lng: -4.267712 },
  { lat: 55.866073, lng: -4.268303 },
  { lat: 55.866114, lng: -4.268658 },
  { lat: 55.866132, lng: -4.268817 },
  { lat: 55.866197, lng: -4.269374 },
  { lat: 55.866321, lng: -4.270454 },
  { lat: 55.866345, lng: -4.270531 },
  { lat: 55.866371, lng: -4.270612 },
  { lat: 55.866403, lng: -4.270675 },
  { lat: 55.866383, lng: -4.270721 },
  { lat: 55.866364, lng: -4.270784 },
  { lat: 55.866352, lng: -4.270824 },
  { lat: 55.866352, lng: -4.270856 },
  { lat: 55.866354, lng: -4.270996 },
  { lat: 55.866355, lng: -4.271055 },
  { lat: 55.866371, lng: -4.271599 },
  { lat: 55.866379, lng: -4.271693 },
  { lat: 55.866393, lng: -4.271827 },
  { lat: 55.866423, lng: -4.27186 },
  { lat: 55.866455, lng: -4.271899 },
  { lat: 55.866464, lng: -4.271962 },
  { lat: 55.866501, lng: -4.27205 },
  { lat: 55.866497, lng: -4.272114 },
  { lat: 55.866464, lng: -4.272143 },
  { lat: 55.866458, lng: -4.272223 },
  { lat: 55.866503, lng: -4.272213 },
  { lat: 55.866863, lng: -4.272288 },
  { lat: 55.866584, lng: -4.276438 },
  { lat: 55.866973, lng: -4.27652 },
  { lat: 55.866966, lng: -4.276638 },
  { lat: 55.866812, lng: -4.278986 },
  { lat: 55.86689, lng: -4.279195 },
  { lat: 55.866948, lng: -4.279357 },
  { lat: 55.866933, lng: -4.279388 },
  { lat: 55.866926, lng: -4.279441 },
  { lat: 55.866921, lng: -4.279587 },
  { lat: 55.866873, lng: -4.280222 },
  { lat: 55.866854, lng: -4.280639 },
  { lat: 55.866849, lng: -4.280846 },
  { lat: 55.866849, lng: -4.280943 },
  { lat: 55.866849, lng: -4.281267 },
  { lat: 55.866848, lng: -4.281715 },
  { lat: 55.866855, lng: -4.282304 },
  { lat: 55.866863, lng: -4.282656 },
  { lat: 55.866872, lng: -4.282925 },
  { lat: 55.866882, lng: -4.283101 },
  { lat: 55.866904, lng: -4.283333 },
  { lat: 55.866933, lng: -4.283497 },
  { lat: 55.866984, lng: -4.283606 },
  { lat: 55.867013, lng: -4.28371 },
  { lat: 55.867039, lng: -4.283798 },
  { lat: 55.867064, lng: -4.283894 },
  { lat: 55.867085, lng: -4.283988 },
  { lat: 55.867101, lng: -4.284074 },
  { lat: 55.867115, lng: -4.284171 },
  { lat: 55.867133, lng: -4.284284 },
  { lat: 55.867156, lng: -4.284425 },
  { lat: 55.867232, lng: -4.284862 },
  { lat: 55.867263, lng: -4.285015 },
  { lat: 55.867296, lng: -4.285161 },
  { lat: 55.867329, lng: -4.285296 },
  { lat: 55.867509, lng: -4.285974 },
  { lat: 55.867532, lng: -4.286037 },
  { lat: 55.867553, lng: -4.286081 },
  { lat: 55.867582, lng: -4.286125 },
  { lat: 55.8676, lng: -4.286145 },
  { lat: 55.867618, lng: -4.286161 },
  { lat: 55.867617, lng: -4.286243 },
  { lat: 55.867618, lng: -4.286317 },
  { lat: 55.867621, lng: -4.286384 },
  { lat: 55.86763, lng: -4.286485 },
  { lat: 55.867648, lng: -4.286627 },
  { lat: 55.867665, lng: -4.286739 },
  { lat: 55.86769, lng: -4.286883 },
  { lat: 55.867781, lng: -4.287294 },
  { lat: 55.867845, lng: -4.287601 },
  { lat: 55.867884, lng: -4.287805 },
  { lat: 55.868269, lng: -4.289037 },
  { lat: 55.86828, lng: -4.289086 },
  { lat: 55.868287, lng: -4.289132 },
  { lat: 55.868292, lng: -4.289188 },
  { lat: 55.86829, lng: -4.289232 },
  { lat: 55.868283, lng: -4.289281 },
  { lat: 55.86827, lng: -4.28933 },
  { lat: 55.868253, lng: -4.289377 },
  { lat: 55.868229, lng: -4.289436 },
  { lat: 55.868208, lng: -4.289474 },
  { lat: 55.868125, lng: -4.28965 },
  { lat: 55.86794, lng: -4.290147 },
  { lat: 55.867838, lng: -4.29042 },
  { lat: 55.867988, lng: -4.290602 },
  { lat: 55.868367, lng: -4.291061 },
  { lat: 55.868399, lng: -4.291095 },
  { lat: 55.868431, lng: -4.29113 },
  { lat: 55.868849, lng: -4.291569 },
  { lat: 55.868877, lng: -4.2916 },
  { lat: 55.868937, lng: -4.291668 },
  { lat: 55.869009, lng: -4.291731 },
  { lat: 55.869065, lng: -4.291819 },
  { lat: 55.869181, lng: -4.291958 },
  { lat: 55.869191, lng: -4.29197 },
  { lat: 55.869234, lng: -4.292003 },
  { lat: 55.869288, lng: -4.292029 },
  { lat: 55.869276, lng: -4.292168 },
  { lat: 55.869265, lng: -4.29231 },
  { lat: 55.869282, lng: -4.2925 },
  { lat: 55.869304, lng: -4.292642 },
  { lat: 55.869397, lng: -4.293115 },
  { lat: 55.869416, lng: -4.2932 },
  { lat: 55.869423, lng: -4.293231 },
  { lat: 55.869434, lng: -4.293275 },
  { lat: 55.869445, lng: -4.293309 },
  { lat: 55.869454, lng: -4.29333 },
  { lat: 55.869467, lng: -4.293353 },
  { lat: 55.869485, lng: -4.293373 },
  { lat: 55.8695, lng: -4.293389 },
  { lat: 55.869926, lng: -4.293697 },
  { lat: 55.870067, lng: -4.293746 },
  { lat: 55.870158, lng: -4.293811 },
  { lat: 55.87025, lng: -4.293894 },
  { lat: 55.870345, lng: -4.293971 },
  { lat: 55.87044, lng: -4.2937 },
  { lat: 55.870604, lng: -4.293486 },
  { lat: 55.870815, lng: -4.293261 },
  { lat: 55.870932, lng: -4.293129 },
  { lat: 55.87107, lng: -4.292893 },
  { lat: 55.87115, lng: -4.292631 },
  { lat: 55.871186, lng: -4.292259 },
  { lat: 55.871204, lng: -4.291851 },
  { lat: 55.871222, lng: -4.291571 },
  { lat: 55.87121, lng: -4.291318 },
  { lat: 55.871407, lng: -4.290973 },
  { lat: 55.872054, lng: -4.290701 },
  { lat: 55.872176, lng: -4.29065 },
  { lat: 55.872231, lng: -4.290536 },
  { lat: 55.872196, lng: -4.290461 },
  { lat: 55.872185, lng: -4.290393 },
  { lat: 55.872169, lng: -4.290274 },
  { lat: 55.872141, lng: -4.290212 },
  { lat: 55.87208, lng: -4.289733 },
  { lat: 55.872064, lng: -4.289615 },
  { lat: 55.872035, lng: -4.289388 },
  { lat: 55.872052, lng: -4.289247 },
  { lat: 55.872113, lng: -4.289219 },
  { lat: 55.872102, lng: -4.289146 },
  { lat: 55.872371, lng: -4.289017 },
  { lat: 55.872395, lng: -4.289005 },
  { lat: 55.872404, lng: -4.289069 },
  { lat: 55.872465, lng: -4.289027 },
  { lat: 55.872572, lng: -4.288956 },
  { lat: 55.872846, lng: -4.288776 },
  { lat: 55.872973, lng: -4.288682 },
];

export const glasgowMackintosh: Area = {
  id: "glasgow-mackintosh",
  name: "Mackintosh's Glasgow",
  city: "Glasgow",
  description:
    "Follow Charles Rennie Mackintosh from his first design in the Necropolis to the tea rooms, newspaper offices and art school that made him famous, and the white rooms he and Margaret Macdonald made their home: a young architect's style growing building by building.",
  estimatedDurationMin: 115,
  estimatedDistanceKm: 6.5,
  difficulty: "moderate",
  accessNote:
    "City pavements with some steep streets around Blythswood Hill, Garnethill and Gilmorehill. The Mackintosh Tearooms, Kelvingrove and the Hunterian's Mackintosh House keep their own opening hours; the House usually needs a ticket. The Lighthouse and the Glasgow School of Art's Mackintosh Building are seen from outside.",
  isContentComplete: true,
  enableInteractiveGuide: true,
  image: require("../../../assets/tours/glasgow-mackintosh.jpg"),
  price: { singleTour: 4.99 },
  startingPoint: {
    lat: 55.86228,
    lng: -4.2346,
    label: "Cathedral Square, by the bridge into the Necropolis",
  },
  route: [
    {
      id: "mack-necropolis",
      order: 1,
      name: "The Necropolis: a first commission",
      coordinates: { lat: 55.86228, lng: -4.2346 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 73,
        audioSource: require("../../../assets/audio/glasgow-mackintosh/01-necropolis.mp3"),
        scriptText: `Good day, and welcome. On this walk we'll follow Charles Rennie Mackintosh through his own city, from his very first design to the rooms he and his wife, the artist Margaret Macdonald, made their home. As we go, watch his style grow, from old Scottish stone into something startlingly new.

Behind the cathedral rises the Necropolis, Glasgow's great Victorian city of the dead, reached across the little bridge in front of you. High on that hill stands a tall Celtic cross to Alexander McCall, Glasgow's Chief Constable, who died in 1888. It's thought to be Mackintosh's first real commission, designed when he was about twenty and still learning his trade. His own father was a police superintendent, which may help explain how the job came his way.

Look at the cathedral, too. As a young man, Mackintosh filled sketchbooks with old Scottish churches, castles and tower houses. He never stopped loving them. Even his most modern buildings have a touch of the castle about them.

One more clue: in those days he spelled his name McIntosh. Around 1893, like his father, he changed it to Mackintosh.

Now walk up past the cathedral to Parson Street, where he was born.`,
      },
    },
    {
      id: "mack-martyrs",
      order: 2,
      name: "Martyrs' Public School: born across the road",
      coordinates: { lat: 55.86548, lng: -4.23762 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 70,
        audioSource: require("../../../assets/audio/glasgow-mackintosh/02-martyrs-school.mp3"),
        scriptText: `Charles Rennie Mackintosh was born on the 7th of June 1868 at 70 Parson Street, one of eleven children. The tenement has gone, but this red sandstone school stands right beside where he grew up.

At sixteen he was apprenticed to an architect, John Hutchison, and in the evenings he studied at the Glasgow School of Art, winning prize after prize. In 1889 he joined the firm of Honeyman and Keppie as a draughtsman.

That firm designed Martyrs' Public School, built between 1895 and 1898, and Mackintosh did much of the work. It's a plain board school on the outside, built for working-class children of Townhead. But look at the details: the curving stone over the doorways, the little carved roofs, the ironwork. Inside, a bright central hall rises to the roof, with galleries leading to the classrooms, and timber roof beams that end in curious, almost Japanese shapes.

Here, a young man was quietly trying out ideas, in a building where nobody had asked him to.

Our next stop is about a mile and a half away, down in the city centre. Follow the route down to Buchanan Street, and look for number 91.`,
      },
    },
    {
      id: "mack-buchanan-tearooms",
      order: 3,
      name: "Miss Cranston's tea rooms",
      coordinates: { lat: 55.86, lng: -4.25435 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 71,
        audioSource: require("../../../assets/audio/glasgow-mackintosh/03-buchanan-street.mp3"),
        scriptText: `This building at 91 Buchanan Street was once one of Miss Cranston's tea rooms, and to understand Mackintosh, you need to meet Kate Cranston.

Glasgow in the 1890s was a hard-drinking city, and the temperance movement wanted somewhere respectable for people to meet without alcohol. Kate Cranston opened her first tea room on Argyle Street in 1878, and she had a genius for making them fashionable. She hired the most daring young designers in town.

When this building opened in 1897, its architect was George Washington Browne and its interiors were by George Walton, but Mackintosh painted the stencilled murals: tall, pale women, standing in pairs among stylised roses. Some visitors found them very strange.

Next, for her Argyle Street rooms, Mackintosh designed the furniture, and there, for the first time, appeared his famous high-backed chair. Later he remade whole rooms for her at Ingram Street. One of them, the Oak Room, was saved when that building was demolished in 1971, packed away in eight hundred numbered pieces, and rebuilt decades later at the V&A in Dundee.

Now walk into Mitchell Lane, right beside this building, and look up at the tower.`,
      },
    },
    {
      id: "mack-lighthouse",
      order: 4,
      name: "The Lighthouse: a tower he didn't sign",
      coordinates: { lat: 55.85972, lng: -4.2556 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 70,
        audioSource: require("../../../assets/audio/glasgow-mackintosh/04-lighthouse.mp3"),
        scriptText: `This tall building with its corner tower was built in 1895 as an extension for the Glasgow Herald newspaper. The tower is said to have held a great water tank, ready in case of fire, a real fear in a building full of paper.

The design came from Honeyman and Keppie, and inside the firm, Mackintosh did much of the drawing. You can see his hand in the tower, which swells outward near the top like a stone flower bud. But the buildings went out under the partners' names. Around this time he wrote in a letter that he hoped one day to "work for myself entirely, and claim my work as mine."

A century later, the building was given his name in all but title. It reopened in 1999 as The Lighthouse, Scotland's Centre for Architecture and Design, the year Glasgow was the UK's City of Architecture and Design, with a Mackintosh exhibition and a viewing platform high over the rooftops.

It closed during the pandemic in 2020 and hasn't reopened to visitors since. In 2025 the council leased it to a company planning a hub for green technology businesses, with some public access promised.

Now head round to Renfield Street, and into the narrow lane behind it.`,
      },
    },
    {
      id: "mack-daily-record",
      order: 5,
      name: "The Daily Record: light in a dark lane",
      coordinates: { lat: 55.8611, lng: -4.258 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 61,
        audioSource: require("../../../assets/audio/glasgow-mackintosh/05-daily-record.mp3"),
        scriptText: `This is one of the hardest Mackintosh buildings to see properly, because it stands in a narrow service lane. That was exactly the problem he had to solve.

Built between 1900 and 1904 for the Daily Record newspaper, it has printing presses below and offices above. In a lane this dark, the windows would get very little sunlight. So Mackintosh covered the walls in glazed brick, mostly white with touches of blue, to bounce what light there was back into the rooms, and set it off with carved yellow sandstone. Stand back as far as the lane allows and look up: it's a building designed for people craning their necks.

These were his best years. In 1900 he married Margaret Macdonald, a gifted artist he'd met at the School of Art. That same year the couple showed a room at the Secession exhibition in Vienna, and the Viennese loved them. In 1901 he became a partner in the firm.

The ground floor is now a cafe and music venue, so you can see some of the inside.

Now walk west up West George Street to Blythswood Square.`,
      },
    },
    {
      id: "mack-blythswood",
      order: 6,
      name: "Blythswood: two clubs and a front door",
      coordinates: { lat: 55.86388, lng: -4.26258 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 73,
        audioSource: require("../../../assets/audio/glasgow-mackintosh/06-blythswood.mp3"),
        scriptText: `Blythswood Square was one of the smartest addresses in Victorian Glasgow, and here two clubs tell a story about the city's artists.

Just behind the north side of the square, at 185 Bath Street, is the Glasgow Art Club. When it moved in, in 1893, Mackintosh helped decorate its new gallery and painted a frieze that was later plastered over and lost. Experts have since recreated it. But for most of its history the Art Club didn't admit women as members. That only changed in 1983.

So the women made their own. Number 5, on the square, was the home of the Glasgow Society of Lady Artists, which bought it in 1895: the first residential club in Scotland run by and for women. In 1908 they hired Mackintosh to design them a new front door. Look for its tall, narrow doorway, a quietly modern frame squeezed into a Georgian terrace.

Women were at the heart of the Glasgow Style: Margaret Macdonald, her sister Frances, and dozens of others who trained at the School of Art.

And just off the square, on Blythswood Street, was the Mackintoshes' first married home, a flat they painted almost entirely white.

Now walk north to Sauchiehall Street.`,
      },
    },
    {
      id: "mack-willow",
      order: 7,
      name: "The Willow Tea Rooms",
      coordinates: { lat: 55.86505, lng: -4.26085 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 74,
        audioSource: require("../../../assets/audio/glasgow-mackintosh/07-willow.mp3"),
        scriptText: `This white front, with its curving windows, is the Willow Tea Rooms, which Mackintosh designed for Kate Cranston and opened in October 1903. It was the only one of her tea rooms he designed from top to bottom, outside and in.

The theme comes from the street's name. Sauchiehall is said to come from old Scots words meaning a meadow of willows. So willows appear everywhere: in the shape of the leaded glass, in the chairs and screens, in a high-backed chair for the manageress shaped like a stylised willow tree.

Mackintosh designed the menus, the cutlery, even the waitresses' uniforms. Upstairs was the Room de Luxe, decorated in grey, purple and white, where ladies could pay a little more for tea. Above the fireplace hung Margaret's gesso panel, O ye, all ye that walk in Willowwood, from a sonnet by Rossetti. The original is in Kelvingrove now.

After Miss Cranston retired, the rooms became part of a department store. They were saved in 2014, restored, and reopened as working tea rooms in 2018. The National Trust for Scotland now looks after them, and in 2026 they were renamed the Mackintosh Tearooms.

Now walk up the steep little hill behind them, to Renfrew Street.`,
      },
    },
    {
      id: "mack-gsa",
      order: 8,
      name: "The Glasgow School of Art",
      coordinates: { lat: 55.86625, lng: -4.26375 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 89,
        audioSource: require("../../../assets/audio/glasgow-mackintosh/08-glasgow-school-of-art.mp3"),
        scriptText: `In 1896, the Glasgow School of Art held a competition for a new building on this steep, awkward site. The governors wanted something practical, on a tight budget. The headmaster, Fra Newbery, backed a design from Honeyman and Keppie, drawn by a young man not yet thirty: Mackintosh.

The money only stretched to half the building. The eastern half went up from 1897 to 1899. The western half, with its tall library windows and a far more daring design, followed from 1907 to 1909. Many architects call it his masterpiece: a working art school of great north-facing windows for painting light, iron brackets like flowers, and a library of dark timber that felt like a forest.

On the 23rd of May 2014, a fire caused by foam used in a student project destroyed the library. Restoration was nearly finished when, on the 15th of June 2018, a far worse fire gutted the whole building. Its cause has never been established.

In July 2026, the School of Art said a full rebuild would cost around 265 million pounds, far more than it could afford, and that it would make the shell safe first. What you see is a building waiting to learn its future.

Mackintosh liked a line from the designer John Sedding, which he copied out by hand in 1901: "There is hope in honest error, none in the icy perfections of the mere stylist."

Now head west, a longer walk of a mile or so, to Kelvingrove.`,
      },
    },
    {
      id: "mack-kelvingrove",
      order: 9,
      name: "Kelvingrove: the Glasgow Style",
      coordinates: { lat: 55.8679, lng: -4.2901 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 70,
        audioSource: require("../../../assets/audio/glasgow-mackintosh/09-kelvingrove.mp3"),
        scriptText: `This red sandstone palace is Kelvingrove Art Gallery and Museum. It opened for the Glasgow International Exhibition of 1901, held in the park around you, which drew more than eleven million visits in six months.

Mackintosh entered the competition to design the exhibition's buildings, and lost. He ended up designing four stands instead. But Glasgow's artists were everywhere at the show, and the rest of Europe was beginning to talk about a Glasgow Style.

Inside, there is a gallery devoted to Mackintosh and the Glasgow Style, and it's worth the visit. You'll find furniture from Miss Cranston's tea rooms, panelling rescued from Ingram Street in 1971, and Margaret Macdonald's gesso panel from the Willow. Look at the chairs: they're not really made for comfort. Mackintosh treated a chair as part of the architecture of a room, a tall black line against a white wall.

By around 1910, though, the commissions were drying up. Tastes were changing, he could be difficult, and he was said to be drinking. In 1913 he left the firm.

Now cross the River Kelvin, and climb up to the University, to the Hunterian Art Gallery on Hillhead Street.`,
      },
    },
    {
      id: "mack-house",
      order: 10,
      name: "The Mackintosh House",
      coordinates: { lat: 55.873, lng: -4.2888 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 84,
        audioSource: require("../../../assets/audio/glasgow-mackintosh/10-mackintosh-house.mp3"),
        scriptText: `Our last stop is home. From 1906 to 1914, Charles and Margaret lived at 6 Florentine Terrace, just along this hill, in an ordinary Victorian end-terrace that they transformed. They took down walls to make an L-shaped drawing room and studio, painted it white and filled it with light from a new long window: a room that still looks modern today.

In 1963 the University demolished the terrace. But the fittings had been saved, and in 1981 the main rooms were rebuilt here inside the Hunterian, facing the same way, so the light falls just as it did. You can visit them, with the Mackintoshes' own furniture.

In 1914 the couple left Glasgow for good. In the Suffolk village of Walberswick, in wartime, the Scotsman with the strange accent and letters from Vienna was briefly arrested on suspicion of being a spy. They moved to London, then to the south of France, where he painted watercolours of the coast. He died in London on the 10th of December 1928, largely forgotten.

To see more, visit Queen's Cross Church, his only church to be built, and Scotland Street School. Out at Helensburgh stands The Hill House, which since 2019 has sheltered inside a giant mesh box while it dries out. And in Bellahouston Park, his House for an Art Lover, designed in 1901, was finally built in the 1990s.

Thank you for walking with me.`,
      },
    },
  ],
  path,
};

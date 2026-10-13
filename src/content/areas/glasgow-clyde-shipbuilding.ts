import type { Area } from "../schema";

/**
 * Shipbuilding on the Clyde: the Broomielaw (Clyde Navigation Trust building and
 * Henry Bell's Comet), Lancefield Quay (Robert Napier), the Finnieston Crane,
 * Pacific Quay (Prince's Dock, the Garden Festival, the Waverley), the Govan
 * Graving Docks, Govan Cross (Mary Barbour), the Fairfield offices, Elder Park
 * (John and Isabella Elder), the Govan-Partick Bridge (Clydebank and the UCS
 * work-in) and the Riverside Museum with the Glenlee. Researched October 2026.
 *
 * Sources: Historic Environment Scotland listing LB33113 (Clyde Navigation Trust
 * building); Wikipedia (Henry Bell, Robert Napier and Sons, Finnieston Crane, Pacific
 * Quay incl. graving dock dates and operators, Riverside Park (Glasgow), Fairfield
 * Shipbuilding and Engineering Company, Fairfield Offices, Isabella Elder, Jimmy
 * Reid, Riverside Museum, Glenlee, PS Waverley, Titan Clydebank, the Lusitania
 * and Queens); Grace's Guide (Napier, Lancefield, Cunard engines); History Hit
 * (Finnieston Crane, the four surviving cantilever cranes; 23% of world tonnage
 * in 1913); Glasgow City Council (Govan-Partick Bridge opening, 6-7 September
 * 2024); Building Design / Architects' Journal (March 2025 approval of ~300 homes
 * at the graving docks); International Women's Day / Church of Scotland (Mary
 * Barbour statue, 8 March 2018); BAE Systems / Royal Navy (Type 26, HMS Glasgow).
 *
 * Corrections and flags:
 *  - The brief mentioned the QE2 at Clydebank: ~10 km downriver, so John Brown's
 *    yard, its ships and the Titan crane are described from the bridge.
 *  - The Govan Graving Docks' future has changed several times (an 800-home plan
 *    refused and dropped in 2020; ship-repair reopening proposed; ~300 homes
 *    approved March 2025; Riverside Park opened 27 March 2026). The script gives
 *    the 2025 approval and the 2026 park only. Re-check before promoting.
 *  - The Waverley broke down in October 2025; her 2026 status is not confirmed,
 *    so the script doesn't promise she'll be sailing.
 *  - Mary Barbour's flour-throwing army is the popular story: "the story goes".
 *  - Mackintosh's part in the Queen Margaret medical building: "much of the work".
 *  - The Graving Docks stop is on the path by the park entrance (Govan Road side),
 *    not inside the dock area; the park's own paths may not yet be in OSM.
 *
 * Stops and the walking path come from OpenStreetMap (Overpass and Nominatim; the
 * path routed along OSM footways by the FOSSGIS foot router). Accurate to a few
 * metres, not surveyed: walk the route once before promoting it.
 *
 * Narration: these recordings are TEMPORARY, made with Google text-to-speech in
 * Professor Hoot's "Ask your guide" voice (en-GB-Standard-A). Replace them with the
 * original narrator's ElevenLabs voice, same file names.
 *
 * Cover: "The 'Aquitania' (1914) before launch", John Brown & Co, Clydebank, April
 * 1913, Royal Museums Greenwich G10708 (Wikimedia Commons, public domain).
 */

/**
 * Broomielaw -> Clyde Walkway -> Lancefield Quay -> Finnieston Crane -> Bell's
 * Bridge -> Pacific Quay -> Govan Road -> Govan Cross -> Fairfield -> Elder Park ->
 * Water Row -> Govan-Partick Bridge -> Riverside Museum. About 7.1 km.
 */
const path = [
  { lat: 55.856897, lng: -4.26058 },
  { lat: 55.856906, lng: -4.260352 },
  { lat: 55.856976, lng: -4.260269 },
  { lat: 55.856977, lng: -4.25973 },
  { lat: 55.856899, lng: -4.25973 },
  { lat: 55.856674, lng: -4.25973 },
  { lat: 55.856623, lng: -4.259731 },
  { lat: 55.856629, lng: -4.259931 },
  { lat: 55.856589, lng: -4.259935 },
  { lat: 55.856591, lng: -4.260024 },
  { lat: 55.856546, lng: -4.260026 },
  { lat: 55.856494, lng: -4.26003 },
  { lat: 55.856504, lng: -4.260087 },
  { lat: 55.856507, lng: -4.260138 },
  { lat: 55.85648, lng: -4.260142 },
  { lat: 55.856388, lng: -4.260149 },
  { lat: 55.856301, lng: -4.260159 },
  { lat: 55.856277, lng: -4.260163 },
  { lat: 55.856329, lng: -4.261111 },
  { lat: 55.85642, lng: -4.262386 },
  { lat: 55.856477, lng: -4.263041 },
  { lat: 55.856481, lng: -4.26308 },
  { lat: 55.856488, lng: -4.263142 },
  { lat: 55.856489, lng: -4.263152 },
  { lat: 55.856516, lng: -4.263143 },
  { lat: 55.856519, lng: -4.263166 },
  { lat: 55.856533, lng: -4.263322 },
  { lat: 55.856553, lng: -4.26352 },
  { lat: 55.856641, lng: -4.264433 },
  { lat: 55.856641, lng: -4.264581 },
  { lat: 55.856613, lng: -4.265082 },
  { lat: 55.856605, lng: -4.265229 },
  { lat: 55.856491, lng: -4.266357 },
  { lat: 55.856522, lng: -4.266502 },
  { lat: 55.856517, lng: -4.267043 },
  { lat: 55.856463, lng: -4.267809 },
  { lat: 55.856459, lng: -4.268033 },
  { lat: 55.856456, lng: -4.26824 },
  { lat: 55.856442, lng: -4.268277 },
  { lat: 55.856431, lng: -4.268729 },
  { lat: 55.856421, lng: -4.269349 },
  { lat: 55.856433, lng: -4.269408 },
  { lat: 55.856426, lng: -4.2697 },
  { lat: 55.856429, lng: -4.270157 },
  { lat: 55.856433, lng: -4.270604 },
  { lat: 55.856449, lng: -4.27134 },
  { lat: 55.856506, lng: -4.271457 },
  { lat: 55.856541, lng: -4.27252 },
  { lat: 55.856504, lng: -4.272601 },
  { lat: 55.856505, lng: -4.272815 },
  { lat: 55.856544, lng: -4.273867 },
  { lat: 55.856545, lng: -4.273975 },
  { lat: 55.856547, lng: -4.274073 },
  { lat: 55.85659, lng: -4.27417 },
  { lat: 55.856621, lng: -4.274618 },
  { lat: 55.856737, lng: -4.275669 },
  { lat: 55.856826, lng: -4.276447 },
  { lat: 55.857114, lng: -4.27864 },
  { lat: 55.857157, lng: -4.278696 },
  { lat: 55.857205, lng: -4.279039 },
  { lat: 55.857283, lng: -4.27908 },
  { lat: 55.857336, lng: -4.279058 },
  { lat: 55.857392, lng: -4.279031 },
  { lat: 55.857416, lng: -4.279217 },
  { lat: 55.857462, lng: -4.279518 },
  { lat: 55.857547, lng: -4.280069 },
  { lat: 55.857581, lng: -4.280278 },
  { lat: 55.857732, lng: -4.281193 },
  { lat: 55.857764, lng: -4.281394 },
  { lat: 55.857773, lng: -4.281444 },
  { lat: 55.857806, lng: -4.28163 },
  { lat: 55.857868, lng: -4.28185 },
  { lat: 55.857941, lng: -4.282117 },
  { lat: 55.857875, lng: -4.282177 },
  { lat: 55.857914, lng: -4.282285 },
  { lat: 55.858105, lng: -4.282981 },
  { lat: 55.858227, lng: -4.28344 },
  { lat: 55.858183, lng: -4.283485 },
  { lat: 55.858118, lng: -4.283542 },
  { lat: 55.858156, lng: -4.283701 },
  { lat: 55.858216, lng: -4.283948 },
  { lat: 55.858273, lng: -4.28418 },
  { lat: 55.858298, lng: -4.284282 },
  { lat: 55.858273, lng: -4.28418 },
  { lat: 55.858216, lng: -4.283948 },
  { lat: 55.858156, lng: -4.283701 },
  { lat: 55.858118, lng: -4.283542 },
  { lat: 55.858183, lng: -4.283485 },
  { lat: 55.858227, lng: -4.28344 },
  { lat: 55.858251, lng: -4.283523 },
  { lat: 55.858293, lng: -4.283643 },
  { lat: 55.858347, lng: -4.283745 },
  { lat: 55.858391, lng: -4.283818 },
  { lat: 55.858442, lng: -4.283884 },
  { lat: 55.858553, lng: -4.28401 },
  { lat: 55.858592, lng: -4.284082 },
  { lat: 55.858627, lng: -4.284164 },
  { lat: 55.858655, lng: -4.284249 },
  { lat: 55.85868, lng: -4.284341 },
  { lat: 55.858693, lng: -4.284434 },
  { lat: 55.8587, lng: -4.284544 },
  { lat: 55.85869, lng: -4.28534 },
  { lat: 55.85867, lng: -4.285435 },
  { lat: 55.858545, lng: -4.286022 },
  { lat: 55.858567, lng: -4.28612 },
  { lat: 55.858564, lng: -4.286163 },
  { lat: 55.858828, lng: -4.287261 },
  { lat: 55.858853, lng: -4.287306 },
  { lat: 55.85919, lng: -4.2888 },
  { lat: 55.859175, lng: -4.288811 },
  { lat: 55.85813, lng: -4.289573 },
  { lat: 55.858113, lng: -4.289597 },
  { lat: 55.858592, lng: -4.291698 },
  { lat: 55.858487, lng: -4.291915 },
  { lat: 55.858392, lng: -4.29234 },
  { lat: 55.858362, lng: -4.292474 },
  { lat: 55.858305, lng: -4.292775 },
  { lat: 55.85812, lng: -4.292933 },
  { lat: 55.85808, lng: -4.293238 },
  { lat: 55.858067, lng: -4.293325 },
  { lat: 55.858005, lng: -4.293324 },
  { lat: 55.85798, lng: -4.293334 },
  { lat: 55.857946, lng: -4.293347 },
  { lat: 55.857896, lng: -4.293389 },
  { lat: 55.857858, lng: -4.29345 },
  { lat: 55.857846, lng: -4.29347 },
  { lat: 55.857788, lng: -4.293593 },
  { lat: 55.857737, lng: -4.293677 },
  { lat: 55.857714, lng: -4.293749 },
  { lat: 55.857701, lng: -4.293835 },
  { lat: 55.8577, lng: -4.293862 },
  { lat: 55.857699, lng: -4.293906 },
  { lat: 55.857703, lng: -4.293992 },
  { lat: 55.857712, lng: -4.294053 },
  { lat: 55.857763, lng: -4.294327 },
  { lat: 55.857774, lng: -4.294378 },
  { lat: 55.857757, lng: -4.294394 },
  { lat: 55.857713, lng: -4.294423 },
  { lat: 55.857736, lng: -4.294522 },
  { lat: 55.857247, lng: -4.294852 },
  { lat: 55.857212, lng: -4.294876 },
  { lat: 55.857195, lng: -4.294888 },
  { lat: 55.85712, lng: -4.294938 },
  { lat: 55.857197, lng: -4.295297 },
  { lat: 55.856644, lng: -4.29566 },
  { lat: 55.8567, lng: -4.295917 },
  { lat: 55.856368, lng: -4.29615 },
  { lat: 55.856555, lng: -4.297008 },
  { lat: 55.856766, lng: -4.297957 },
  { lat: 55.856887, lng: -4.298655 },
  { lat: 55.856964, lng: -4.299119 },
  { lat: 55.856707, lng: -4.29926 },
  { lat: 55.856739, lng: -4.299467 },
  { lat: 55.857134, lng: -4.299309 },
  { lat: 55.857273, lng: -4.299236 },
  { lat: 55.857424, lng: -4.299156 },
  { lat: 55.857538, lng: -4.299532 },
  { lat: 55.857661, lng: -4.299417 },
  { lat: 55.858026, lng: -4.29923 },
  { lat: 55.8582, lng: -4.29914 },
  { lat: 55.858368, lng: -4.299104 },
  { lat: 55.858446, lng: -4.299111 },
  { lat: 55.858663, lng: -4.299242 },
  { lat: 55.858674, lng: -4.299278 },
  { lat: 55.858682, lng: -4.299371 },
  { lat: 55.858739, lng: -4.29936 },
  { lat: 55.858838, lng: -4.299425 },
  { lat: 55.858865, lng: -4.299513 },
  { lat: 55.858907, lng: -4.29976 },
  { lat: 55.859192, lng: -4.299707 },
  { lat: 55.859242, lng: -4.299857 },
  { lat: 55.859321, lng: -4.300117 },
  { lat: 55.859457, lng: -4.300562 },
  { lat: 55.859495, lng: -4.30069 },
  { lat: 55.859716, lng: -4.301443 },
  { lat: 55.860081, lng: -4.302665 },
  { lat: 55.860773, lng: -4.302255 },
  { lat: 55.86079, lng: -4.30234 },
  { lat: 55.860831, lng: -4.302312 },
  { lat: 55.861654, lng: -4.301734 },
  { lat: 55.861905, lng: -4.301558 },
  { lat: 55.861885, lng: -4.301458 },
  { lat: 55.861789, lng: -4.30096 },
  { lat: 55.861635, lng: -4.300454 },
  { lat: 55.861521, lng: -4.300543 },
  { lat: 55.861635, lng: -4.300454 },
  { lat: 55.861789, lng: -4.30096 },
  { lat: 55.861885, lng: -4.301458 },
  { lat: 55.861905, lng: -4.301558 },
  { lat: 55.861654, lng: -4.301734 },
  { lat: 55.860831, lng: -4.302312 },
  { lat: 55.86079, lng: -4.30234 },
  { lat: 55.860809, lng: -4.30243 },
  { lat: 55.861453, lng: -4.305521 },
  { lat: 55.861522, lng: -4.305812 },
  { lat: 55.861678, lng: -4.305644 },
  { lat: 55.861737, lng: -4.305894 },
  { lat: 55.861744, lng: -4.306221 },
  { lat: 55.861765, lng: -4.306339 },
  { lat: 55.861794, lng: -4.306426 },
  { lat: 55.861836, lng: -4.306556 },
  { lat: 55.861834, lng: -4.306656 },
  { lat: 55.8618, lng: -4.306763 },
  { lat: 55.861837, lng: -4.306955 },
  { lat: 55.861851, lng: -4.307147 },
  { lat: 55.861856, lng: -4.307226 },
  { lat: 55.861865, lng: -4.307456 },
  { lat: 55.861902, lng: -4.307596 },
  { lat: 55.861965, lng: -4.307904 },
  { lat: 55.861984, lng: -4.308046 },
  { lat: 55.861957, lng: -4.308172 },
  { lat: 55.862076, lng: -4.308516 },
  { lat: 55.86213, lng: -4.308666 },
  { lat: 55.862097, lng: -4.309081 },
  { lat: 55.862106, lng: -4.309131 },
  { lat: 55.862108, lng: -4.309165 },
  { lat: 55.862131, lng: -4.309242 },
  { lat: 55.862234, lng: -4.309575 },
  { lat: 55.862301, lng: -4.309795 },
  { lat: 55.862317, lng: -4.309846 },
  { lat: 55.862376, lng: -4.310023 },
  { lat: 55.862362, lng: -4.31019 },
  { lat: 55.862473, lng: -4.310403 },
  { lat: 55.86243, lng: -4.310529 },
  { lat: 55.862407, lng: -4.310637 },
  { lat: 55.862417, lng: -4.310645 },
  { lat: 55.862397, lng: -4.310742 },
  { lat: 55.862365, lng: -4.310887 },
  { lat: 55.862527, lng: -4.310999 },
  { lat: 55.86251, lng: -4.311079 },
  { lat: 55.862635, lng: -4.311358 },
  { lat: 55.86276, lng: -4.31118 },
  { lat: 55.862825, lng: -4.31109 },
  { lat: 55.862916, lng: -4.311279 },
  { lat: 55.863055, lng: -4.311566 },
  { lat: 55.86314, lng: -4.311891 },
  { lat: 55.86321, lng: -4.312137 },
  { lat: 55.863298, lng: -4.31241 },
  { lat: 55.863526, lng: -4.313358 },
  { lat: 55.863676, lng: -4.314165 },
  { lat: 55.863761, lng: -4.314633 },
  { lat: 55.863828, lng: -4.315082 },
  { lat: 55.863898, lng: -4.315629 },
  { lat: 55.863931, lng: -4.316088 },
  { lat: 55.863935, lng: -4.317095 },
  { lat: 55.863925, lng: -4.317558 },
  { lat: 55.863917, lng: -4.317769 },
  { lat: 55.863988, lng: -4.317708 },
  { lat: 55.864016, lng: -4.317708 },
  { lat: 55.864029, lng: -4.318827 },
  { lat: 55.864068, lng: -4.318878 },
  { lat: 55.864068, lng: -4.318966 },
  { lat: 55.864044, lng: -4.319135 },
  { lat: 55.864034, lng: -4.319206 },
  { lat: 55.86404, lng: -4.319537 },
  { lat: 55.863968, lng: -4.319541 },
  { lat: 55.863978, lng: -4.320098 },
  { lat: 55.863995, lng: -4.321063 },
  { lat: 55.864011, lng: -4.321949 },
  { lat: 55.863778, lng: -4.321961 },
  { lat: 55.863739, lng: -4.321966 },
  { lat: 55.862894, lng: -4.322041 },
  { lat: 55.862886, lng: -4.321942 },
  { lat: 55.862863, lng: -4.321878 },
  { lat: 55.862827, lng: -4.321829 },
  { lat: 55.862786, lng: -4.321807 },
  { lat: 55.862735, lng: -4.321816 },
  { lat: 55.862714, lng: -4.321839 },
  { lat: 55.862685, lng: -4.321871 },
  { lat: 55.862661, lng: -4.321933 },
  { lat: 55.862649, lng: -4.322034 },
  { lat: 55.862493, lng: -4.322034 },
  { lat: 55.862362, lng: -4.322007 },
  { lat: 55.862304, lng: -4.321948 },
  { lat: 55.861986, lng: -4.321343 },
  { lat: 55.861763, lng: -4.321344 },
  { lat: 55.861737, lng: -4.321326 },
  { lat: 55.861647, lng: -4.321394 },
  { lat: 55.861634, lng: -4.321313 },
  { lat: 55.861647, lng: -4.320557 },
  { lat: 55.861646, lng: -4.320144 },
  { lat: 55.861661, lng: -4.320005 },
  { lat: 55.861784, lng: -4.319412 },
  { lat: 55.861845, lng: -4.319068 },
  { lat: 55.861898, lng: -4.318798 },
  { lat: 55.862057, lng: -4.318039 },
  { lat: 55.862108, lng: -4.317791 },
  { lat: 55.862156, lng: -4.317396 },
  { lat: 55.862217, lng: -4.317223 },
  { lat: 55.862294, lng: -4.317062 },
  { lat: 55.862334, lng: -4.316965 },
  { lat: 55.862269, lng: -4.316828 },
  { lat: 55.862242, lng: -4.316731 },
  { lat: 55.86224, lng: -4.316653 },
  { lat: 55.862349, lng: -4.315857 },
  { lat: 55.862432, lng: -4.315839 },
  { lat: 55.862437, lng: -4.315771 },
  { lat: 55.862539, lng: -4.315568 },
  { lat: 55.862623, lng: -4.315333 },
  { lat: 55.862703, lng: -4.315014 },
  { lat: 55.862788, lng: -4.314691 },
  { lat: 55.86287, lng: -4.314376 },
  { lat: 55.862906, lng: -4.314291 },
  { lat: 55.862981, lng: -4.31419 },
  { lat: 55.863059, lng: -4.314116 },
  { lat: 55.863111, lng: -4.314069 },
  { lat: 55.863191, lng: -4.313996 },
  { lat: 55.863238, lng: -4.313203 },
  { lat: 55.86324, lng: -4.313082 },
  { lat: 55.863219, lng: -4.312779 },
  { lat: 55.863188, lng: -4.312503 },
  { lat: 55.86318, lng: -4.312325 },
  { lat: 55.86321, lng: -4.312137 },
  { lat: 55.86314, lng: -4.311891 },
  { lat: 55.863055, lng: -4.311566 },
  { lat: 55.863124, lng: -4.311509 },
  { lat: 55.863428, lng: -4.311218 },
  { lat: 55.863442, lng: -4.311203 },
  { lat: 55.863555, lng: -4.311074 },
  { lat: 55.863666, lng: -4.310947 },
  { lat: 55.863799, lng: -4.310752 },
  { lat: 55.863868, lng: -4.310651 },
  { lat: 55.86408, lng: -4.310262 },
  { lat: 55.864222, lng: -4.309955 },
  { lat: 55.864466, lng: -4.309431 },
  { lat: 55.864608, lng: -4.309156 },
  { lat: 55.864899, lng: -4.30859 },
  { lat: 55.864972, lng: -4.308449 },
  { lat: 55.865041, lng: -4.308278 },
  { lat: 55.864898, lng: -4.307842 },
  { lat: 55.864647, lng: -4.306897 },
  { lat: 55.864566, lng: -4.306779 },
  { lat: 55.864507, lng: -4.306588 },
  { lat: 55.864706, lng: -4.306239 },
  { lat: 55.864789, lng: -4.306057 },
  { lat: 55.864821, lng: -4.30592 },
];

export const glasgowClydeShipbuilding: Area = {
  id: "glasgow-clyde-shipbuilding",
  name: "Shipbuilding on the Clyde",
  city: "Glasgow",
  description:
    "Follow the Clyde downstream from the Broomielaw to Govan and Pointhouse: Henry Bell's Comet, Robert Napier's engines, the Finnieston Crane, the graving docks, Mary Barbour's rent strikers, the Fairfield yard that still builds warships, the UCS work-in, and a Clyde-built tall ship.",
  estimatedDurationMin: 120,
  estimatedDistanceKm: 7.1,
  difficulty: "moderate",
  accessNote:
    "A long, flat riverside walk, mostly on the Clyde Walkway and Govan Road, crossing the river twice by footbridge (Bell's Bridge and the Govan-Partick Bridge, which opens for ships now and then). The Riverside Museum and the Fairfield Heritage Centre keep their own opening hours. Partick subway and train station is a short walk from the finish.",
  isContentComplete: true,
  enableInteractiveGuide: true,
  image: require("../../../assets/tours/glasgow-clyde-shipbuilding.jpg"),
  price: { singleTour: 4.99 },
  startingPoint: {
    lat: 55.8569,
    lng: -4.26058,
    label: "The Broomielaw, at the corner of Robertson Street",
  },
  route: [
    {
      id: "ship-broomielaw",
      order: 1,
      name: "The Broomielaw: where steam began",
      coordinates: { lat: 55.8569, lng: -4.26058 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 72,
        audioSource: require("../../../assets/audio/glasgow-clyde-shipbuilding/01-broomielaw.mp3"),
        scriptText: `Good day, and welcome. On this walk we'll follow the River Clyde downstream, from the city's old quay to the shipyards of Govan, and discover how this modest river came to build ships for the whole world.

Look at the grand building on the corner of Robertson Street, with ships' prows beside its door and a great figure of Neptune on top. It was built between 1883 and 1908 for the Clyde Navigation Trust, the body that ran the river. High on its walls are statues of three heroes: James Watt, Thomas Telford and Henry Bell.

Henry Bell earned his place here. In August 1812, his little paddle steamer Comet set off from this quay for Greenock: the first commercial steamboat service in Europe. It took nearly five hours, against a headwind.

That small, smoky boat launched an industry. A century later, in 1913, the Clyde launched almost a quarter of all the new shipping tonnage in the world, roughly a ship a day. "Clyde-built" became a mark of quality from Buenos Aires to Bombay.

Before all that, though, the river had to be dredged and deepened, until ocean-going ships could reach the city.

Now follow the Clyde Walkway west, downstream, to Lancefield Quay.`,
      },
    },
    {
      id: "ship-lancefield",
      order: 2,
      name: "Lancefield Quay: Robert Napier",
      coordinates: { lat: 55.8575, lng: -4.2795 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 65,
        audioSource: require("../../../assets/audio/glasgow-clyde-shipbuilding/02-lancefield-quay.mp3"),
        scriptText: `Here at Lancefield Quay stood the engine works of Robert Napier, often called the father of Clyde shipbuilding.

Napier was a blacksmith's son who became a brilliant marine engineer. In 1835 he set up a large works here, with its own dock, building steam engines for ships. His great chance came in 1840, when a Canadian businessman, Samuel Cunard, set up a steamship line to carry the mail across the Atlantic. Napier helped raise the money, and built the engines for Cunard's first four ships, including the Britannia.

Regular, reliable steam crossings of the Atlantic changed the world. And Napier saw what came next: ships made of iron instead of wood. In 1841 he opened a shipyard in Govan, across the river, designed especially for building iron ships.

Just as important, Napier trained people. Many of the engineers and managers who went on to found the great Clyde yards learned their trade with him. The river's skill passed from workshop to workshop, and from generation to generation.

Now continue along the river to the giant crane.`,
      },
    },
    {
      id: "ship-finnieston-crane",
      order: 3,
      name: "The Finnieston Crane",
      coordinates: { lat: 55.8583, lng: -4.28428 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 65,
        audioSource: require("../../../assets/audio/glasgow-clyde-shipbuilding/03-finnieston-crane.mp3"),
        scriptText: `This is the Finnieston Crane, or the Stobcross Crane, and it's become a symbol of Glasgow.

It was ordered in 1928, completed in 1931, and in full use by 1932. It stands about fifty metres high, with an arm seventy-seven metres long, and it could lift a hundred and seventy-five tons. Its main job wasn't building ships, but loading them. Railway lines ran right up to it, bringing heavy machinery and steam locomotives built in Glasgow's railway works at Springburn. The crane swung them aboard ships bound for countries around the world. It also lifted boilers and engines into new ships.

It's the largest of four giant cantilever cranes still standing along the Clyde. The others are at Clydebank, at Whiteinch and at Greenock.

Behind it, where the concert halls of the Scottish Event Campus stand now, was Queen's Dock, one of the river's great harbours, later filled in. The shipyards and docks have gone, but the crane was kept as a reminder of what once happened here.

Now cross Bell's Bridge, the footbridge over the river, to the Science Centre.`,
      },
    },
    {
      id: "ship-pacific-quay",
      order: 4,
      name: "Pacific Quay: a dock turned into a festival",
      coordinates: { lat: 55.858, lng: -4.2935 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 67,
        audioSource: require("../../../assets/audio/glasgow-clyde-shipbuilding/04-pacific-quay.mp3"),
        scriptText: `You're standing on Pacific Quay, the site of Prince's Dock. When the Clyde Navigation Trust opened it in 1900, it was the largest dock basin on the river, crowded with ships.

As shipping changed, and containers moved to deep-water ports downriver, the docks here fell silent and were filled in. In 1988 this land was transformed for the Glasgow Garden Festival, which drew millions of visitors and helped change how the city saw itself. Today it holds the Science Centre, with its tower, and the headquarters of BBC Scotland.

Watch the river for a very special ship. The Waverley, the last seagoing passenger-carrying paddle steamer in the world, was launched on the Clyde in 1946 and has spent decades taking passengers on summer cruises. She was built at the A. and J. Inglis yard at Pointhouse, where our walk will end.

Look across the river at the narrow, straight-sided channel. Over two centuries, engineers narrowed and deepened the Clyde to make it a highway for big ships. It's almost as much a man-made river as a natural one.

Now walk west along Govan Road, to the old graving docks.`,
      },
    },
    {
      id: "ship-graving-docks",
      order: 5,
      name: "The Govan Graving Docks",
      coordinates: { lat: 55.86152, lng: -4.30054 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 74,
        audioSource: require("../../../assets/audio/glasgow-clyde-shipbuilding/05-govan-graving-docks.mp3"),
        scriptText: `Beyond the railings are the Govan Graving Docks: three huge stone-lined dry docks, opened in 1875, 1886 and 1898. The last was eight hundred and eighty feet long.

A graving dock was a kind of giant bath for ships. A vessel floated in at high tide, the gates were closed, and the water was pumped out, leaving the ship standing high and dry, propped up on blocks. Then workers could scrape and paint its hull, which is what "graving" originally meant, and repair anything below the waterline.

The docks were busy for more than a century, run by the Clyde Navigation Trust and later by private firms, until they closed in 1987. Then they lay abandoned for nearly forty years, slowly turning green, while local people campaigned to save them. They're protected now as a category A listed site.

There have been many plans. In 2025 the council approved around three hundred homes on part of the site, with most of the land to be handed to the community. And in March 2026, a new riverside park opened here, giving the public its first access to these docks in nearly four decades.

Now head west along Govan Road to Govan Cross, and look for a statue of a woman leading a crowd.`,
      },
    },
    {
      id: "ship-govan-cross",
      order: 6,
      name: "Govan Cross: Mrs Barbour's Army",
      coordinates: { lat: 55.86255, lng: -4.311 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 73,
        audioSource: require("../../../assets/audio/glasgow-clyde-shipbuilding/06-govan-cross.mp3"),
        scriptText: `Govan was a shipbuilding town in its own right, and here at Govan Cross stands a statue of one of its heroes: Mary Barbour, leading a crowd of men, women and children.

In 1915, during the First World War, thousands of workers had poured into Glasgow to build ships and munitions, and landlords raised the rents on the crowded tenements. Many families had men away fighting, and those who couldn't pay faced eviction.

Mary Barbour, a Govan housewife, organised the women of the tenements. When a bailiff came to evict a family, women would gather and drive him away. The story goes that some even pelted the bailiffs with flour. By November 1915 as many as twenty thousand tenants were on rent strike. People called the women Mrs Barbour's Army.

Shipyard workers came out in support, and the government acted fast. Within weeks, Parliament passed the Rent Restriction Act of 1915, freezing rents. Mary Barbour went on to become one of Glasgow's first women councillors.

The statue, by Andrew Brown, was unveiled on International Women's Day, 2018.

Now continue west along Govan Road to the Fairfield offices, the grand building on the right.`,
      },
    },
    {
      id: "ship-fairfield",
      order: 7,
      name: "Fairfield: the yard that still builds ships",
      coordinates: { lat: 55.86395, lng: -4.3201 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 72,
        audioSource: require("../../../assets/audio/glasgow-clyde-shipbuilding/07-fairfield.mp3"),
        scriptText: `This handsome building was built in 1889 to 1891 as the offices of the Fairfield Shipbuilding and Engineering Company. Its architect was John Keppie, the senior partner of the firm where Charles Rennie Mackintosh worked.

The company's great engineer was John Elder. In the 1850s he developed the compound marine engine, which used steam twice over and burned far less coal, making long ocean voyages much cheaper. In 1864 the firm moved here, to a site called Fairfield Farm. Elder died young, in 1869, and his successor, William Pearce, made Fairfield famous for fast liners, including Cunard's Campania and Lucania, which both won the Blue Riband for crossing the Atlantic.

Across the road, behind the walls, the shipyard is still working. Through the decline of the twentieth century, it passed through many owners, and today it belongs to BAE Systems, which builds warships here. Its newest are the Type 26 frigates for the Royal Navy, and the first of the class is named HMS Glasgow.

Inside the old offices, the Fairfield Heritage Centre tells the story of the yard and its workers.

Now walk a little further west to Elder Park.`,
      },
    },
    {
      id: "ship-elder-park",
      order: 8,
      name: "Elder Park: Isabella Elder",
      coordinates: { lat: 55.8627, lng: -4.3218 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 72,
        audioSource: require("../../../assets/audio/glasgow-clyde-shipbuilding/08-elder-park.mp3"),
        scriptText: `This park, and the statue of John Elder that stands in it, are the gifts of a remarkable woman: his widow, Isabella Elder.

When John Elder died in 1869, Isabella inherited his fortune, and she spent much of it on Govan and on education. She bought this land and gave it to the people as a public park, which opened in 1885. She paid for a library, a cottage hospital, a school of domestic economy and a training home for nurses.

But her greatest cause was education for women. In 1883 she bought a mansion in the West End, North Park House, for Queen Margaret College, the first college in Scotland to offer women higher education. In 1890 she funded its medical school. When the college joined the University of Glasgow, women could take the same degrees as men, and in 1894 Marion Gilchrist became the first woman in Scotland to graduate in medicine.

The medical school building was designed by Honeyman and Keppie, with much of the work by the young Mackintosh. Isabella's own statue stands at the far side of the park, unveiled in 1906, the year after her death.

Now walk back east to Water Row, and out onto the new bridge across the Clyde.`,
      },
    },
    {
      id: "ship-govan-bridge",
      order: 9,
      name: "The Govan-Partick Bridge: looking downriver",
      coordinates: { lat: 55.86461, lng: -4.30916 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 81,
        audioSource: require("../../../assets/audio/glasgow-clyde-shipbuilding/09-govan-partick-bridge.mp3"),
        scriptText: `For centuries, a ferry crossed the Clyde here, between Govan and Partick. Since September 2024 you can walk across instead, on this bridge: one of the longest opening footbridges in Europe. It opens to let ships pass.

Stop in the middle and look downriver. In the distance are the cranes of the BAE yards. Beyond them, out of sight, lay yard after yard: Linthouse, Scotstoun, Yoker, and at Clydebank the great John Brown yard. There, they built the Lusitania, launched in 1906, the Queen Mary in 1934, the Queen Elizabeth in 1938, the royal yacht Britannia, and finally the QE2, launched in 1967. Their giant Titan crane still stands.

By then the industry was in trouble, facing competition from Japan, Europe and elsewhere. In 1971 the government refused to keep supporting Upper Clyde Shipbuilders, which ran several yards, including Fairfield and John Brown. Instead of striking, the workers occupied the yards and kept working. Their leader, Jimmy Reid, told them: "There will be no hooliganism, there will be no vandalism, there will be no bevvying, because the world is watching us." By February 1972 the government had backed down.

Now cross to the north bank, and the zigzag building of the Riverside Museum.`,
      },
    },
    {
      id: "ship-riverside",
      order: 10,
      name: "The Riverside Museum and the Glenlee",
      coordinates: { lat: 55.86482, lng: -4.30592 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 66,
        audioSource: require("../../../assets/audio/glasgow-clyde-shipbuilding/10-riverside-museum.mp3"),
        scriptText: `We end at Pointhouse, where the River Kelvin meets the Clyde. This was the yard of A. and J. Inglis, which built more than five hundred ships here, including the paddle steamer Waverley.

Today it's the Riverside Museum, designed by Zaha Hadid, opened in 2011 and named European Museum of the Year in 2013. Inside are trams, locomotives, cars and beautiful ship models, many of them Clyde-built.

And moored beside it is a real Clyde-built ship: the Glenlee, a steel three-masted barque, launched in 1896 at Port Glasgow. She carried cargoes around the world, was renamed more than once, and then spent seventy years in the Spanish Navy as a training ship called the Galatea. In 1993 a Glasgow charity bought her rusting hull at auction for about forty thousand pounds and brought her home. She's one of only four Clyde-built sailing ships still afloat.

Most of the yards have gone now, and the river is quieter. But Clyde-built ships still sail, and in Govan and Scotstoun, ships are still being built.

Thank you for walking with me.`,
      },
    },
  ],
  path,
};

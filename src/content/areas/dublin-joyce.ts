import type { Area } from "../schema";

/**
 * James Joyce's Dublin, and Leopold Bloom's: 7 Eccles Street, Belvedere College,
 * the James Joyce Centre, James Joyce Street (Nighttown), the North Earl Street
 * statue, O'Connell Bridge (and the Ormond Hotel upriver), Trinity College, Davy
 * Byrne's, the National Library, Finn's Hotel, Sweny's and Newman House (MoLI).
 * Researched October 2026.
 *
 * Quotations from Project Gutenberg texts: Ulysses (#4300, complete download
 * checked: Calypso's opening, "turned into Eccles street", Conmee and Belvedere,
 * Maginni, the Mabbot street entrance of nighttown, O'Connell bridge and the
 * gulls, "Bronze by gold", "Trinity's surly front", Davy Byrne's, Haines and the
 * national library, "striding past Finn's hotel", Sweny's and the soap, the last
 * words and "Trieste-Zurich-Paris 1914-1921") and A Portrait of the Artist as a
 * Young Man (#4217: Belvedere and the moves, "silence, exile and cunning", "the
 * smithy of my soul"). Other sources: James Joyce Centre (the house, Maginni, the
 * Eccles Street door), Wikipedia (7 Eccles Street and J. F. Byrne, Nora Barnacle,
 * North Earl Street statue, James Joyce Street, Museum of Literature Ireland,
 * Monto), Dublin Inquirer (the street's names), Irish Times / Hospitality
 * Ireland (the Ormond Hotel site sale, September 2026), Open Culture and others
 * (the first Bloomsday, 1954), dublin.ie (Sweny's), Joyce chronologies (Clongowes
 * and Belvedere).
 *
 * Corrections and flags:
 *  - The brief listed Trinity College as Joyce's: he studied at the Catholic
 *    University (UCD) at Newman House; the Trinity stop says so.
 *  - Sandycove's Martello tower is ~12 km away: mentioned, not a stop. The Ormond
 *    Hotel (vacant, sold 2026) is described from O'Connell Bridge, not visited.
 *  - UCD start year: 1898 or 1899 depending on source ("the early 1900s").
 *  - When 7 Eccles Street was demolished differs between sources: no date given.
 *  - Monto as "Europe's largest" red-light district is a common claim: told as
 *    "one of the biggest".
 *
 * Stops and the walking path come from OpenStreetMap (Overpass and Nominatim; the
 * path routed along OSM footways by the FOSSGIS foot router). Accurate to a few
 * metres, not surveyed: walk the route once before promoting it.
 *
 * Narration: these recordings are TEMPORARY, made with Google text-to-speech in
 * Professor Hoot's "Ask your guide" voice (en-GB-Standard-A). Replace them with the
 * original narrator's ElevenLabs voice, same file names.
 *
 * Cover: "Sackville Street & O'Connell Bridge, Dublin", photochrom, c. 1890-1900,
 * Library of Congress (public domain).
 */

/**
 * Eccles Street -> Great Denmark Street -> North Great George's Street -> Railway
 * Street and James Joyce Street -> North Earl Street -> O'Connell Bridge -> College
 * Green -> Grafton Street and Duke Street -> Kildare Street -> Leinster Street South
 * -> Lincoln Place -> Merrion Square -> St Stephen's Green. About 4.8 km.
 */
const path = [
  { lat: 53.357924, lng: -6.265321 },
  { lat: 53.357811, lng: -6.264937 },
  { lat: 53.357752, lng: -6.264733 },
  { lat: 53.357588, lng: -6.26406 },
  { lat: 53.357574, lng: -6.264002 },
  { lat: 53.357541, lng: -6.263864 },
  { lat: 53.357499, lng: -6.263752 },
  { lat: 53.357465, lng: -6.263665 },
  { lat: 53.3574, lng: -6.263747 },
  { lat: 53.357312, lng: -6.263452 },
  { lat: 53.357193, lng: -6.263421 },
  { lat: 53.357122, lng: -6.26337 },
  { lat: 53.357069, lng: -6.263323 },
  { lat: 53.357002, lng: -6.263257 },
  { lat: 53.356972, lng: -6.263215 },
  { lat: 53.356954, lng: -6.263215 },
  { lat: 53.356933, lng: -6.263165 },
  { lat: 53.356905, lng: -6.263099 },
  { lat: 53.356865, lng: -6.262973 },
  { lat: 53.356853, lng: -6.262893 },
  { lat: 53.356847, lng: -6.262819 },
  { lat: 53.356845, lng: -6.262755 },
  { lat: 53.356845, lng: -6.262664 },
  { lat: 53.356849, lng: -6.2626 },
  { lat: 53.356679, lng: -6.262328 },
  { lat: 53.356346, lng: -6.261891 },
  { lat: 53.3563, lng: -6.261802 },
  { lat: 53.356282, lng: -6.261767 },
  { lat: 53.356233, lng: -6.261698 },
  { lat: 53.355862, lng: -6.261173 },
  { lat: 53.35585, lng: -6.261164 },
  { lat: 53.355824, lng: -6.26116 },
  { lat: 53.355802, lng: -6.261167 },
  { lat: 53.35579, lng: -6.261194 },
  { lat: 53.355574, lng: -6.261662 },
  { lat: 53.355441, lng: -6.261949 },
  { lat: 53.355418, lng: -6.261998 },
  { lat: 53.355318, lng: -6.262206 },
  { lat: 53.355272, lng: -6.262146 },
  { lat: 53.355235, lng: -6.262093 },
  { lat: 53.355282, lng: -6.262007 },
  { lat: 53.355292, lng: -6.26196 },
  { lat: 53.355348, lng: -6.261841 },
  { lat: 53.355392, lng: -6.261748 },
  { lat: 53.35537, lng: -6.261753 },
  { lat: 53.354901, lng: -6.261127 },
  { lat: 53.354641, lng: -6.260785 },
  { lat: 53.354141, lng: -6.260122 },
  { lat: 53.354127, lng: -6.260103 },
  { lat: 53.353844, lng: -6.259727 },
  { lat: 53.353742, lng: -6.259603 },
  { lat: 53.353579, lng: -6.259429 },
  { lat: 53.353657, lng: -6.259172 },
  { lat: 53.353777, lng: -6.258781 },
  { lat: 53.353839, lng: -6.258592 },
  { lat: 53.353782, lng: -6.25855 },
  { lat: 53.353734, lng: -6.258514 },
  { lat: 53.353792, lng: -6.258283 },
  { lat: 53.353788, lng: -6.258272 },
  { lat: 53.353775, lng: -6.258239 },
  { lat: 53.353201, lng: -6.257908 },
  { lat: 53.353172, lng: -6.257889 },
  { lat: 53.353194, lng: -6.257789 },
  { lat: 53.353064, lng: -6.257712 },
  { lat: 53.352968, lng: -6.257654 },
  { lat: 53.352912, lng: -6.257621 },
  { lat: 53.352765, lng: -6.257534 },
  { lat: 53.352717, lng: -6.257506 },
  { lat: 53.352745, lng: -6.257377 },
  { lat: 53.352686, lng: -6.257342 },
  { lat: 53.35273, lng: -6.257135 },
  { lat: 53.352943, lng: -6.256151 },
  { lat: 53.352941, lng: -6.256139 },
  { lat: 53.352921, lng: -6.256125 },
  { lat: 53.35295, lng: -6.255988 },
  { lat: 53.352345, lng: -6.255571 },
  { lat: 53.352375, lng: -6.255441 },
  { lat: 53.352346, lng: -6.255424 },
  { lat: 53.352463, lng: -6.254921 },
  { lat: 53.352611, lng: -6.254151 },
  { lat: 53.352614, lng: -6.254135 },
  { lat: 53.352003, lng: -6.253786 },
  { lat: 53.35196, lng: -6.253761 },
  { lat: 53.351392, lng: -6.253406 },
  { lat: 53.351021, lng: -6.253174 },
  { lat: 53.350984, lng: -6.253404 },
  { lat: 53.350933, lng: -6.253694 },
  { lat: 53.350836, lng: -6.254249 },
  { lat: 53.350776, lng: -6.254218 },
  { lat: 53.350726, lng: -6.254192 },
  { lat: 53.35072, lng: -6.254228 },
  { lat: 53.350691, lng: -6.254375 },
  { lat: 53.350662, lng: -6.254522 },
  { lat: 53.350505, lng: -6.255443 },
  { lat: 53.350389, lng: -6.256201 },
  { lat: 53.350287, lng: -6.256869 },
  { lat: 53.350201, lng: -6.257453 },
  { lat: 53.350204, lng: -6.257519 },
  { lat: 53.350206, lng: -6.257579 },
  { lat: 53.350129, lng: -6.258109 },
  { lat: 53.350152, lng: -6.258118 },
  { lat: 53.350147, lng: -6.258147 },
  { lat: 53.350133, lng: -6.258212 },
  { lat: 53.350124, lng: -6.258264 },
  { lat: 53.349979, lng: -6.25912 },
  { lat: 53.349866, lng: -6.25983 },
  { lat: 53.349841, lng: -6.259987 },
  { lat: 53.34911, lng: -6.25967 },
  { lat: 53.348932, lng: -6.259592 },
  { lat: 53.348894, lng: -6.259572 },
  { lat: 53.348869, lng: -6.259558 },
  { lat: 53.348852, lng: -6.259549 },
  { lat: 53.348521, lng: -6.259412 },
  { lat: 53.348528, lng: -6.259365 },
  { lat: 53.348499, lng: -6.259353 },
  { lat: 53.348474, lng: -6.259343 },
  { lat: 53.348436, lng: -6.259327 },
  { lat: 53.348408, lng: -6.259316 },
  { lat: 53.348392, lng: -6.259309 },
  { lat: 53.348374, lng: -6.259302 },
  { lat: 53.348328, lng: -6.25932 },
  { lat: 53.347711, lng: -6.259032 },
  { lat: 53.347695, lng: -6.259108 },
  { lat: 53.347685, lng: -6.259152 },
  { lat: 53.347666, lng: -6.259243 },
  { lat: 53.347651, lng: -6.259243 },
  { lat: 53.347641, lng: -6.259249 },
  { lat: 53.34763, lng: -6.259265 },
  { lat: 53.347625, lng: -6.259294 },
  { lat: 53.347544, lng: -6.259256 },
  { lat: 53.347497, lng: -6.259231 },
  { lat: 53.347469, lng: -6.259215 },
  { lat: 53.347457, lng: -6.259209 },
  { lat: 53.347271, lng: -6.259106 },
  { lat: 53.347076, lng: -6.258999 },
  { lat: 53.347063, lng: -6.258992 },
  { lat: 53.347017, lng: -6.258968 },
  { lat: 53.346968, lng: -6.258941 },
  { lat: 53.346931, lng: -6.258922 },
  { lat: 53.346892, lng: -6.258917 },
  { lat: 53.34687, lng: -6.258924 },
  { lat: 53.346796, lng: -6.258928 },
  { lat: 53.346734, lng: -6.25891 },
  { lat: 53.34673, lng: -6.258908 },
  { lat: 53.34672, lng: -6.258931 },
  { lat: 53.346707, lng: -6.258951 },
  { lat: 53.346688, lng: -6.258966 },
  { lat: 53.346614, lng: -6.258963 },
  { lat: 53.346129, lng: -6.258952 },
  { lat: 53.345943, lng: -6.258946 },
  { lat: 53.345908, lng: -6.258927 },
  { lat: 53.345865, lng: -6.258925 },
  { lat: 53.345817, lng: -6.258923 },
  { lat: 53.345799, lng: -6.258944 },
  { lat: 53.345372, lng: -6.258939 },
  { lat: 53.345361, lng: -6.25894 },
  { lat: 53.345316, lng: -6.258945 },
  { lat: 53.345274, lng: -6.25895 },
  { lat: 53.345244, lng: -6.258953 },
  { lat: 53.345109, lng: -6.25894 },
  { lat: 53.345095, lng: -6.258918 },
  { lat: 53.345065, lng: -6.258874 },
  { lat: 53.345041, lng: -6.258839 },
  { lat: 53.344966, lng: -6.25897 },
  { lat: 53.344895, lng: -6.259072 },
  { lat: 53.344741, lng: -6.2592 },
  { lat: 53.344656, lng: -6.259271 },
  { lat: 53.344604, lng: -6.259314 },
  { lat: 53.344547, lng: -6.259338 },
  { lat: 53.344474, lng: -6.259343 },
  { lat: 53.344421, lng: -6.259348 },
  { lat: 53.344374, lng: -6.259323 },
  { lat: 53.344329, lng: -6.259303 },
  { lat: 53.344294, lng: -6.259274 },
  { lat: 53.34426, lng: -6.259243 },
  { lat: 53.344222, lng: -6.25921 },
  { lat: 53.344177, lng: -6.259173 },
  { lat: 53.34415, lng: -6.259163 },
  { lat: 53.344069, lng: -6.259145 },
  { lat: 53.344004, lng: -6.259134 },
  { lat: 53.343904, lng: -6.259134 },
  { lat: 53.343787, lng: -6.259143 },
  { lat: 53.343602, lng: -6.259165 },
  { lat: 53.343482, lng: -6.259186 },
  { lat: 53.343415, lng: -6.259191 },
  { lat: 53.343367, lng: -6.259183 },
  { lat: 53.343359, lng: -6.259262 },
  { lat: 53.343357, lng: -6.259291 },
  { lat: 53.343354, lng: -6.259318 },
  { lat: 53.343351, lng: -6.259358 },
  { lat: 53.343346, lng: -6.259405 },
  { lat: 53.343325, lng: -6.259407 },
  { lat: 53.343309, lng: -6.259416 },
  { lat: 53.34328, lng: -6.259449 },
  { lat: 53.34327, lng: -6.259426 },
  { lat: 53.343244, lng: -6.259386 },
  { lat: 53.343227, lng: -6.259366 },
  { lat: 53.343209, lng: -6.259362 },
  { lat: 53.343197, lng: -6.259361 },
  { lat: 53.343166, lng: -6.259379 },
  { lat: 53.343112, lng: -6.25941 },
  { lat: 53.342711, lng: -6.259578 },
  { lat: 53.342588, lng: -6.259607 },
  { lat: 53.342575, lng: -6.259547 },
  { lat: 53.342535, lng: -6.259563 },
  { lat: 53.342532, lng: -6.259544 },
  { lat: 53.342487, lng: -6.259561 },
  { lat: 53.342359, lng: -6.259629 },
  { lat: 53.342117, lng: -6.259768 },
  { lat: 53.341994, lng: -6.25984 },
  { lat: 53.341931, lng: -6.259328 },
  { lat: 53.341908, lng: -6.259147 },
  { lat: 53.341881, lng: -6.258896 },
  { lat: 53.341811, lng: -6.258182 },
  { lat: 53.341782, lng: -6.258191 },
  { lat: 53.341717, lng: -6.258211 },
  { lat: 53.341702, lng: -6.258215 },
  { lat: 53.341692, lng: -6.25812 },
  { lat: 53.341692, lng: -6.258119 },
  { lat: 53.341686, lng: -6.258064 },
  { lat: 53.341685, lng: -6.258057 },
  { lat: 53.341678, lng: -6.25799 },
  { lat: 53.341611, lng: -6.258021 },
  { lat: 53.341381, lng: -6.258087 },
  { lat: 53.341359, lng: -6.258074 },
  { lat: 53.34135, lng: -6.258048 },
  { lat: 53.341247, lng: -6.257111 },
  { lat: 53.341241, lng: -6.257058 },
  { lat: 53.34123, lng: -6.256997 },
  { lat: 53.341216, lng: -6.256923 },
  { lat: 53.341192, lng: -6.256873 },
  { lat: 53.341097, lng: -6.256376 },
  { lat: 53.341027, lng: -6.256006 },
  { lat: 53.340911, lng: -6.255391 },
  { lat: 53.340911, lng: -6.255352 },
  { lat: 53.340928, lng: -6.255327 },
  { lat: 53.340947, lng: -6.25532 },
  { lat: 53.340945, lng: -6.255307 },
  { lat: 53.340933, lng: -6.255246 },
  { lat: 53.340918, lng: -6.255164 },
  { lat: 53.340912, lng: -6.255134 },
  { lat: 53.341027, lng: -6.255076 },
  { lat: 53.341188, lng: -6.254995 },
  { lat: 53.341219, lng: -6.25498 },
  { lat: 53.341354, lng: -6.254907 },
  { lat: 53.34211, lng: -6.254501 },
  { lat: 53.3421, lng: -6.254441 },
  { lat: 53.342148, lng: -6.254416 },
  { lat: 53.342184, lng: -6.254398 },
  { lat: 53.342211, lng: -6.254383 },
  { lat: 53.342231, lng: -6.254373 },
  { lat: 53.34222, lng: -6.25432 },
  { lat: 53.342219, lng: -6.254284 },
  { lat: 53.341982, lng: -6.253197 },
  { lat: 53.34197, lng: -6.253139 },
  { lat: 53.341957, lng: -6.253094 },
  { lat: 53.341942, lng: -6.253034 },
  { lat: 53.341929, lng: -6.252982 },
  { lat: 53.341918, lng: -6.25289 },
  { lat: 53.341914, lng: -6.25279 },
  { lat: 53.341915, lng: -6.252769 },
  { lat: 53.341915, lng: -6.25266 },
  { lat: 53.341918, lng: -6.252603 },
  { lat: 53.341921, lng: -6.252554 },
  { lat: 53.341932, lng: -6.252454 },
  { lat: 53.341948, lng: -6.25237 },
  { lat: 53.341981, lng: -6.252259 },
  { lat: 53.342025, lng: -6.252137 },
  { lat: 53.342072, lng: -6.252023 },
  { lat: 53.342109, lng: -6.251929 },
  { lat: 53.342143, lng: -6.251854 },
  { lat: 53.342171, lng: -6.251793 },
  { lat: 53.3422, lng: -6.251741 },
  { lat: 53.342252, lng: -6.251647 },
  { lat: 53.342254, lng: -6.251573 },
  { lat: 53.342247, lng: -6.251496 },
  { lat: 53.342241, lng: -6.25144 },
  { lat: 53.342218, lng: -6.251333 },
  { lat: 53.342192, lng: -6.251207 },
  { lat: 53.342158, lng: -6.25105 },
  { lat: 53.342117, lng: -6.250862 },
  { lat: 53.342098, lng: -6.250782 },
  { lat: 53.342085, lng: -6.250718 },
  { lat: 53.342084, lng: -6.250678 },
  { lat: 53.342036, lng: -6.250639 },
  { lat: 53.342012, lng: -6.250618 },
  { lat: 53.341989, lng: -6.250588 },
  { lat: 53.34196, lng: -6.250606 },
  { lat: 53.341934, lng: -6.250622 },
  { lat: 53.341921, lng: -6.250562 },
  { lat: 53.341909, lng: -6.250519 },
  { lat: 53.341878, lng: -6.25041 },
  { lat: 53.341847, lng: -6.250376 },
  { lat: 53.341821, lng: -6.250374 },
  { lat: 53.341798, lng: -6.250372 },
  { lat: 53.34173, lng: -6.250425 },
  { lat: 53.341685, lng: -6.250469 },
  { lat: 53.341659, lng: -6.250492 },
  { lat: 53.341491, lng: -6.250644 },
  { lat: 53.341446, lng: -6.250686 },
  { lat: 53.341349, lng: -6.250775 },
  { lat: 53.341281, lng: -6.250836 },
  { lat: 53.341282, lng: -6.250855 },
  { lat: 53.341224, lng: -6.250908 },
  { lat: 53.341171, lng: -6.250959 },
  { lat: 53.341147, lng: -6.250972 },
  { lat: 53.341125, lng: -6.250955 },
  { lat: 53.340363, lng: -6.251662 },
  { lat: 53.34034, lng: -6.251684 },
  { lat: 53.34006, lng: -6.25195 },
  { lat: 53.339941, lng: -6.252059 },
  { lat: 53.339846, lng: -6.252147 },
  { lat: 53.339787, lng: -6.252197 },
  { lat: 53.33974, lng: -6.252246 },
  { lat: 53.339735, lng: -6.252251 },
  { lat: 53.339723, lng: -6.252261 },
  { lat: 53.339652, lng: -6.252325 },
  { lat: 53.339548, lng: -6.25242 },
  { lat: 53.339526, lng: -6.252461 },
  { lat: 53.339483, lng: -6.252494 },
  { lat: 53.339367, lng: -6.252596 },
  { lat: 53.339216, lng: -6.252727 },
  { lat: 53.339155, lng: -6.252787 },
  { lat: 53.339057, lng: -6.252891 },
  { lat: 53.339027, lng: -6.252917 },
  { lat: 53.339001, lng: -6.252942 },
  { lat: 53.338967, lng: -6.252993 },
  { lat: 53.338623, lng: -6.253301 },
  { lat: 53.338547, lng: -6.25337 },
  { lat: 53.338527, lng: -6.253385 },
  { lat: 53.338477, lng: -6.253424 },
  { lat: 53.338218, lng: -6.253632 },
  { lat: 53.338236, lng: -6.253706 },
  { lat: 53.338385, lng: -6.254268 },
  { lat: 53.338449, lng: -6.254508 },
  { lat: 53.33863, lng: -6.255191 },
  { lat: 53.338697, lng: -6.255471 },
  { lat: 53.338644, lng: -6.25551 },
  { lat: 53.338609, lng: -6.255538 },
  { lat: 53.338584, lng: -6.25556 },
  { lat: 53.338597, lng: -6.25565 },
  { lat: 53.338575, lng: -6.255699 },
  { lat: 53.338556, lng: -6.255747 },
  { lat: 53.338545, lng: -6.255773 },
  { lat: 53.338566, lng: -6.255805 },
  { lat: 53.338581, lng: -6.255848 },
  { lat: 53.338594, lng: -6.255891 },
  { lat: 53.338606, lng: -6.255941 },
  { lat: 53.338587, lng: -6.256018 },
  { lat: 53.338576, lng: -6.256054 },
  { lat: 53.338562, lng: -6.256092 },
  { lat: 53.33854, lng: -6.256148 },
  { lat: 53.338519, lng: -6.25619 },
  { lat: 53.338492, lng: -6.256223 },
  { lat: 53.338459, lng: -6.256248 },
  { lat: 53.338426, lng: -6.256268 },
  { lat: 53.338418, lng: -6.256272 },
  { lat: 53.33841, lng: -6.256272 },
  { lat: 53.338364, lng: -6.256243 },
  { lat: 53.338323, lng: -6.256401 },
  { lat: 53.338288, lng: -6.256458 },
  { lat: 53.338244, lng: -6.256541 },
  { lat: 53.338222, lng: -6.256611 },
  { lat: 53.338198, lng: -6.256669 },
  { lat: 53.338139, lng: -6.256757 },
  { lat: 53.338086, lng: -6.256849 },
  { lat: 53.338058, lng: -6.256939 },
  { lat: 53.338036, lng: -6.257064 },
  { lat: 53.338013, lng: -6.257077 },
  { lat: 53.337987, lng: -6.257085 },
  { lat: 53.337948, lng: -6.257081 },
  { lat: 53.33792, lng: -6.257075 },
  { lat: 53.337922, lng: -6.257119 },
  { lat: 53.337932, lng: -6.257179 },
  { lat: 53.337946, lng: -6.257238 },
  { lat: 53.337987, lng: -6.257337 },
  { lat: 53.338114, lng: -6.257631 },
  { lat: 53.338125, lng: -6.257699 },
  { lat: 53.338131, lng: -6.257769 },
  { lat: 53.338132, lng: -6.258087 },
  { lat: 53.338134, lng: -6.258284 },
  { lat: 53.338133, lng: -6.258327 },
  { lat: 53.338072, lng: -6.258336 },
  { lat: 53.338033, lng: -6.258363 },
  { lat: 53.338006, lng: -6.258382 },
  { lat: 53.337974, lng: -6.258402 },
  { lat: 53.337895, lng: -6.258502 },
  { lat: 53.33785, lng: -6.258623 },
  { lat: 53.337838, lng: -6.258724 },
  { lat: 53.33783, lng: -6.258855 },
  { lat: 53.337838, lng: -6.258975 },
  { lat: 53.337866, lng: -6.259164 },
  { lat: 53.337892, lng: -6.259306 },
  { lat: 53.33787, lng: -6.259321 },
  { lat: 53.337854, lng: -6.259333 },
  { lat: 53.33782, lng: -6.259354 },
  { lat: 53.337546, lng: -6.259545 },
  { lat: 53.337146, lng: -6.259851 },
  { lat: 53.337058, lng: -6.259916 },
  { lat: 53.337027, lng: -6.259942 },
  { lat: 53.336989, lng: -6.259983 },
  { lat: 53.336949, lng: -6.260012 },
  { lat: 53.336933, lng: -6.260025 },
  { lat: 53.33692, lng: -6.260035 },
  { lat: 53.336941, lng: -6.260115 },
  { lat: 53.336932, lng: -6.260122 },
  { lat: 53.336891, lng: -6.260154 },
  { lat: 53.336852, lng: -6.26018 },
  { lat: 53.336871, lng: -6.260249 },
  { lat: 53.336887, lng: -6.26031 },
];

export const dublinJoyce: Area = {
  id: "dublin-joyce",
  name: "James Joyce's Dublin",
  city: "Dublin",
  description:
    "James Joyce's Dublin and Leopold Bloom's: from 7 Eccles Street and Nighttown to Davy Byrne's, Sweny's and the hotel where Joyce met Nora Barnacle, the real city behind Ulysses, and the young man who left it for good and wrote about nothing else.",
  estimatedDurationMin: 85,
  estimatedDistanceKm: 4.8,
  difficulty: "easy",
  accessNote:
    "A flat city walk. Sweny's, the James Joyce Centre and the Museum of Literature Ireland keep their own opening hours. The Martello tower where Ulysses begins is at Sandycove, about 12 km south: a separate trip by DART.",
  isContentComplete: true,
  enableInteractiveGuide: true,
  image: require("../../../assets/tours/dublin-joyce.jpg"),
  price: { singleTour: 4.99 },
  startingPoint: {
    lat: 53.35795,
    lng: -6.2653,
    label: "Eccles Street, by the Mater Private Hospital",
  },
  route: [
    {
      id: "eccles-street",
      order: 1,
      name: "7 Eccles Street: Bloom's front door",
      coordinates: { lat: 53.35795, lng: -6.2653 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 71,
        audioSource: require("../../../assets/audio/dublin-joyce/01-eccles-street.mp3"),
        scriptText: `Good day, and welcome to James Joyce's Dublin. On this walk we'll follow two Dubliners: James Joyce himself, who grew up here, fled, and never came back to live, and Leopold Bloom, the ordinary man whose single day in this city, the 16th of June 1904, became Ulysses, one of the most famous novels ever written.

We begin where Bloom's day begins. Number 7 Eccles Street was Bloom's home. "Mr Leopold Bloom ate with relish the inner organs of beasts and fowls," the chapter opens, and soon he's out of the door to buy a pork kidney for breakfast.

Joyce chose this house for a reason. A few years later it was the home of his close friend J. F. Byrne, and on a visit in 1909 Joyce came back here late at night with Byrne, who had forgotten his key and climbed over the railings into the basement. Joyce gave that moment to Bloom.

The house itself has gone. The Mater Private Hospital stands where it was. But its front door survives, and we'll meet it in a few minutes. And it's in this house, in bed, that the novel ends, with Molly Bloom's famous last words: "yes I said yes I will Yes."

Now walk east to Great Denmark Street, and Belvedere College.`,
      },
    },
    {
      id: "belvedere-college",
      order: 2,
      name: "Belvedere College: a Jesuit schoolboy",
      coordinates: { lat: 53.35548, lng: -6.262 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 68,
        audioSource: require("../../../assets/audio/dublin-joyce/02-belvedere-college.mp3"),
        scriptText: `This Georgian building is Belvedere College, a Jesuit school, and James Joyce was a pupil here from 1893, aged eleven, until 1898.

He came here because his family was falling apart financially. His father, John Joyce, was a charming, witty man, but he drank and ran up debts, and the family had to leave its comfortable home in the south of the city. Joyce had been taken out of his expensive boarding school, Clongowes Wood, because the fees couldn't be paid. The Jesuits here took him at reduced fees.

The Joyces kept moving, from one rented house to another, each a little shabbier than the last. In A Portrait of the Artist as a Young Man, Joyce's alter ego Stephen Dedalus remembers how a boy at Belvedere "had often asked him with a silly laugh why they moved so often."

He was a brilliant pupil, winning prizes for his essays, and Belvedere and its priests are all over his books. In Ulysses, the real Jesuit Father John Conmee walks through the city, and stops to ask a lady whether her boys are "getting on well at Belvedere."

Now walk round the corner to North Great George's Street, and the James Joyce Centre.`,
      },
    },
    {
      id: "joyce-centre",
      order: 3,
      name: "The James Joyce Centre and the Eccles Street door",
      coordinates: { lat: 53.35419, lng: -6.25997 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 70,
        audioSource: require("../../../assets/audio/dublin-joyce/03-joyce-centre.mp3"),
        scriptText: `This elegant townhouse, number 35 North Great George's Street, was built in 1784. By the late twentieth century it was nearly derelict, until it was saved by Joyce enthusiasts and opened as the James Joyce Centre in 1996.

Joyce never lived here. But a real man who appears in Ulysses did work here: Denis J. Maginni, a flamboyant dancing master, who ran a dance academy in this house. Bloom notices his advertisements around town.

Inside is a real treasure: the front door of 7 Eccles Street, Bloom's door, which we stood outside a few minutes ago. When the house was being demolished, the door was rescued by Dublin literary figures, among them the poet Patrick Kavanagh and the novelist Flann O'Brien.

Kavanagh and O'Brien were also among the men who, on the 16th of June 1954, the fiftieth anniversary of the day in Ulysses, set out by horse cab to retrace Bloom's route. They meant to cover the whole day. They got as far as a pub. But that day began a tradition: Bloomsday, now celebrated every June, all over the world.

Now walk east, towards Gardiner Street, to the streets where Joyce set Nighttown.`,
      },
    },
    {
      id: "nighttown",
      order: 4,
      name: "James Joyce Street: the entrance to Nighttown",
      coordinates: { lat: 53.352, lng: -6.2538 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 71,
        audioSource: require("../../../assets/audio/dublin-joyce/04-nighttown.mp3"),
        scriptText: `This is James Joyce Street. In Joyce's day it was called Mabbot Street, and it was the way into the area Dubliners called Monto, after Montgomery Street, now Foley Street. From the 1860s until the 1920s this was one of the biggest red-light districts in Europe, full of brothels just a few minutes' walk from the city's main street.

Joyce knew the district as a young man, and he sent Bloom and Stephen here late at night in the wildest chapter of Ulysses, Circe, written like a nightmarish play. It opens with a stage direction: "The Mabbot street entrance of nighttown, before which stretches an uncobbled tramsiding set with skeleton tracks, red and green will-o'-the-wisps and danger signals. Rows of grimy houses with gaping doors."

Monto didn't last. In March 1925 the police raided it, with volunteers from a Catholic organisation, the Legion of Mary, who marched through the streets with a crucifix and pinned holy pictures to the brothel doors.

The street was renamed James Joyce Street in 2001. Twenty years on, some locals still called it Corporation Street, its name in between.

Now head back west, and along North Earl Street, towards O'Connell Street.`,
      },
    },
    {
      id: "joyce-statue",
      order: 5,
      name: "The statue on North Earl Street",
      coordinates: { lat: 53.34991, lng: -6.25985 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 67,
        audioSource: require("../../../assets/audio/dublin-joyce/05-joyce-statue.mp3"),
        scriptText: `Here he is: James Joyce in bronze, leaning on his cane, hat tipped back, gazing up at the sky with a look of amused superiority. The statue, by Marjorie FitzGibbon, was unveiled on Bloomsday, the 16th of June 1990.

Dubliners being Dubliners, he was quickly given a rhyming nickname, which I'll leave you to discover. Joyce, who loved puns and rude jokes, might well have approved.

The real Joyce would have known this street well. O'Connell Street, just ahead, was then Sackville Street, the city's grand main avenue, with Nelson's Pillar standing in the middle. Bloom and his friends pass along it on their way to a funeral, and a whole chapter is set in a newspaper office close by.

Joyce's great idea was to treat a single ordinary day in an ordinary city with the seriousness of an ancient epic. Ulysses follows the pattern of Homer's Odyssey, but Joyce's hero isn't a warrior king. He's a Jewish advertising salesman, worrying about his wife, his lunch and his bowels. Joyce thought that was every bit as worthy of art.

Now walk down to the river, onto O'Connell Bridge.`,
      },
    },
    {
      id: "oconnell-bridge",
      order: 6,
      name: "O'Connell Bridge: Bloom and the gulls",
      coordinates: { lat: 53.34727, lng: -6.25911 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 69,
        audioSource: require("../../../assets/audio/dublin-joyce/06-oconnell-bridge.mp3"),
        scriptText: `Stand on O'Connell Bridge and look at the Liffey. Bloom crosses here at lunchtime in Ulysses. "As he set foot on O'Connell bridge a puffball of smoke plumed up from the parapet. Brewery barge with export stout." In 1904, Guinness barges still carried porter down the river.

Bloom feels sorry for the hungry gulls. He buys two Banbury cakes for a penny from an old applewoman, breaks them up and throws the pieces "down into the Liffey. See that? The gulls swooped silently, two, then all from their heights, pouncing on prey."

Now look upriver, to the west. On the quay upriver, on the north bank, is the Ormond Hotel, where one of the novel's most musical chapters, Sirens, takes place in the afternoon. It opens with the two barmaids: "Bronze by gold, Miss Kennedy's head by Miss Douce's head, appeared above the crossblind of the Ormond hotel." Joyce wrote the whole chapter to sound like music. The real hotel has stood empty for years, though in 2026 the site was sold to new owners with plans to bring it back to life.

Now cross to the south side, and walk up to the front gate of Trinity College.`,
      },
    },
    {
      id: "trinity-college",
      order: 7,
      name: "Trinity College: Trinity's surly front",
      coordinates: { lat: 53.34465, lng: -6.25925 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 64,
        audioSource: require("../../../assets/audio/dublin-joyce/07-trinity-college.mp3"),
        scriptText: `This is the front gate of Trinity College, Dublin's oldest university, home of the Book of Kells. You may read that Joyce studied here. He didn't.

In Joyce's day Trinity was a Protestant institution, and the Catholic bishops of Ireland discouraged Catholics from going to it. Joyce, educated by the Jesuits, went instead to the Catholic University, now University College Dublin, on St Stephen's Green, where our walk will end.

That divide runs right through Ulysses. As Bloom walks past here, a cloud covers the sun: "a heavy cloud hiding the sun slowly, shadowing Trinity's surly front." Bloom, at that moment, is gloomy, thinking that things go on the same, day after day, "squads of police marching out, back: trams in, out."

Joyce was fascinated by Dublin's divisions of religion, politics and class, and by the way an ordinary man like Bloom, a Jewish Dubliner never quite accepted as Irish by some of his neighbours, moves through all of them.

Now walk up Grafton Street, and turn left into Duke Street, to Davy Byrne's.`,
      },
    },
    {
      id: "davy-byrnes",
      order: 8,
      name: "Davy Byrne's: a gorgonzola sandwich",
      coordinates: { lat: 53.34184, lng: -6.25936 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 69,
        audioSource: require("../../../assets/audio/dublin-joyce/08-davy-byrnes.mp3"),
        scriptText: `This pub on Duke Street is Davy Byrne's, and it's where Leopold Bloom has lunch.

He first tries another restaurant, but is disgusted by the men wolfing their food. "Every fellow for his own, tooth and nail. Gulp. Grub. Gulp." So he comes here instead: "He entered Davy Byrne's. Moral pub. He doesn't chat. Stands a drink now and then."

And he orders: "I'll take a glass of burgundy and... let me see." "A cheese sandwich, then. Gorgonzola, have you?" A modest, thoughtful lunch, eaten while he daydreams about food, love, and the past.

Ever since, Joyce fans have come here on Bloomsday to order the same: a gorgonzola sandwich and a glass of burgundy. The pub has been modernised since 1904, but it's still trading, and still proud of its walk-on part in literature.

Lunch matters in Ulysses. Joyce wanted his book to include everything a human being does in a day, eating, worrying, remembering, wanting, as well as thinking great thoughts, and it shocked many readers that he did.

Now walk to the end of Duke Street, and left down Kildare Street to the National Library.`,
      },
    },
    {
      id: "national-library",
      order: 9,
      name: "The National Library",
      coordinates: { lat: 53.34118, lng: -6.25495 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 61,
        audioSource: require("../../../assets/audio/dublin-joyce/09-national-library.mp3"),
        scriptText: `This grand building on Kildare Street is the National Library of Ireland, opened in 1890. Joyce read here as a student, and he set a whole chapter of Ulysses inside it.

On the morning of the novel, the young Englishman Haines says: "I have to visit your national library today." That afternoon, Joyce's alter ego, Stephen Dedalus, holds forth in the library to a group of Dublin literary men, spinning a dazzling and deliberately outrageous theory about Shakespeare and Hamlet. The chapter is called Scylla and Charybdis, after the two sea monsters Odysseus had to steer between.

It's a portrait of the Dublin literary scene of 1904, the world of the Irish Literary Revival, of Yeats and his circle, and of a young, proud, penniless Joyce who wanted to be part of it and also to mock it.

The library holds a large collection of Joyce papers today, which is a nice irony, since Joyce felt Dublin had never valued him.

Now walk on to the end of Kildare Street, turn right, and look along Leinster Street South for the site of Finn's Hotel.`,
      },
    },
    {
      id: "finns-hotel",
      order: 10,
      name: "Finn's Hotel: Nora Barnacle",
      coordinates: { lat: 53.3419, lng: -6.2526 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 66,
        audioSource: require("../../../assets/audio/dublin-joyce/10-finns-hotel.mp3"),
        scriptText: `On this short street, beside the back wall of Trinity, stood Finn's Hotel, and in 1904 a young woman from Galway named Nora Barnacle worked here as a chambermaid.

On the 10th of June 1904, Joyce, then twenty-two, saw her walking on Nassau Street, just round the corner, and stopped her. She agreed to meet him again, and on the 16th of June they went walking together. That is why Ulysses takes place on the 16th of June 1904. Joyce set his whole masterpiece on the day of their first date.

Finn's Hotel even makes a cameo in the novel. A local eccentric, in the chapter called Wandering Rocks, goes "striding past Finn's hotel."

Within four months, Joyce and Nora had left Ireland together, for good. They didn't marry until 1931, but they stayed together for the rest of his life, through poverty, illness and exile. Nora never read Ulysses all the way through, or so the story goes. But she is everywhere in it, above all in Molly Bloom.

Now walk a few steps further to Lincoln Place, and the old chemist's shop on the corner.`,
      },
    },
    {
      id: "swenys",
      order: 11,
      name: "Sweny's: lemon soap",
      coordinates: { lat: 53.34187, lng: -6.25055 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 64,
        audioSource: require("../../../assets/audio/dublin-joyce/11-swenys.mp3"),
        scriptText: `This little shop is Sweny's, a pharmacy that first opened in 1847, and it appears in Ulysses almost exactly as you see it.

On his morning errands, Bloom thinks: "Better get that lotion made up. Where is this? Ah yes, the last time. Sweny's in Lincoln place. Chemists rarely move." Inside, he orders a skin lotion for Molly, and buys a cake of lemon soap, which he then carries round Dublin all day in his pocket.

That soap becomes a running joke. In the hallucinatory Nighttown chapter, it rises in the sky like a sun and sings: "We're a capital couple are Bloom and I. He brightens the earth. I polish the sky."

Sweny's stopped being a working pharmacy in 2009. Since then, volunteers have kept it open, much as it was in Joyce's day, holding regular readings from his books, and selling lemon soap to visitors. It's a lovely example of how Joyce's Dublin has been kept alive by the people who love his books.

Now follow the route along Merrion Square and round to St Stephen's Green, to Newman House.`,
      },
    },
    {
      id: "newman-house",
      order: 12,
      name: "Newman House: silence, exile and cunning",
      coordinates: { lat: 53.3369, lng: -6.2603 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 79,
        audioSource: require("../../../assets/audio/dublin-joyce/12-newman-house.mp3"),
        scriptText: `We end at Newman House, on St Stephen's Green. This was the home of the Catholic University, later University College Dublin, where Joyce studied languages in the early 1900s. Today it's the Museum of Literature Ireland, and it holds Joyce's own copy number one of Ulysses.

Here Joyce became the arrogant, brilliant young man of A Portrait of the Artist, who decides he must leave. Stephen Dedalus says he will no longer serve his home, his fatherland or his church, and will defend himself with "silence, exile and cunning." At the book's end he goes off "to forge in the smithy of my soul the uncreated conscience of my race."

Joyce did leave. In October 1904 he and Nora sailed from Dublin. He lived in Trieste, Zurich and Paris, made only brief visits home, the last in 1912, and never lived here again. Yet he wrote about almost nothing but Dublin. Ulysses was published in Paris on his fortieth birthday, the 2nd of February 1922, and he signed it off: "Trieste-Zurich-Paris, 1914-1921." He died in Zurich in 1941.

The novel itself begins far from here, in a Martello tower at Sandycove, where Joyce once stayed. It's well worth a trip.

Thank you for walking with me. Yes.`,
      },
    },
  ],
  path,
};

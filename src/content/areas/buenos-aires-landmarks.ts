import type { Area } from "../schema";

/**
 * Buenos Aires from colony to capital: Parque Lezama (Mendoza's 1536 founding),
 * Plaza Dorrego and San Telmo (the 1871 yellow fever, conventillos, immigration),
 * Santo Domingo (the British invasions of 1806-07), San Francisco (the June 1955
 * bombing and church burnings), San Ignacio and the Manzana de las Luces, the
 * Pirámide de Mayo, the Cabildo (May 1810), the Metropolitan Cathedral (San Martín,
 * Pope Francis), the Casa Rosada, Avenida de Mayo and the Café Tortoni, the
 * Palacio Barolo, Congress, the Teatro Colón, Recoleta Cemetery and the National
 * Library. Researched October 2026.
 *
 * Sources: Wikipedia (Cabildo of Buenos Aires: arches removed 1889 and 1931, 1940
 * restoration; Palacio Barolo; Teatro Colón; National Library of Argentina);
 * Buenos Aires city heritage pages (buenosaires.gob.ar casco histórico: Santo
 * Domingo's tower marks and captured flags, Belgrano's mausoleum; San Ignacio
 * 1686-1722, consecrated 1734; San Francisco's 1907-11 façade by Ernesto Sackmann
 * and the 1955 fire, reopened 1967 per ACI Prensa / CONICET); turismo.buenosaires.gob.ar
 * (Teatro Colón, Biblioteca Nacional, Recoleta); argentina.gob.ar (Biblioteca
 * Nacional opened 10 April 1992 on the Palacio Unzué site); Conclusión / La Nación
 * (16 June 1955 bombing, "more than 300" dead; churches burned that night).
 *
 * Corrections and flags:
 *  - Caminito (in the brief) is not a stop: it's 2 km south of the route, and
 *    it's the centrepiece of the Tango tour (buenos-aires-tango). Parque Lezama,
 *    the traditional site of the 1536 founding, starts the walk instead.
 *  - The exact site of Mendoza's 1536 settlement is unknown: said as "traditional".
 *  - Casa Rosada colour: both the Sarmiento red-and-white story and the cattle
 *    blood story are given as stories, not fact.
 *  - Casualties of the 1955 bombing vary by source (308 identified to 364+):
 *    "more than three hundred". Responsibility for the church burnings is
 *    contested: "widely blamed on Perón's supporters".
 *  - Santo Domingo's tower marks: some sources say the originals were later
 *    replaced by replicas, so the script says they "recall" the shots.
 *  - Gardel at the Tortoni: only his figure at the table is claimed, not that he
 *    performed there.
 *  - The route is ~10.3 km: the 1.8 km (Congress to Colón) and 2.4 km (Colón to
 *    Recoleta, routed via the French Embassy on Cerrito) legs are the long ones.
 *  - sequentialStops: the path from San Ignacio to the Pirámide passes the
 *    Cabildo first.
 *
 * Stops and the walking path come from OpenStreetMap (Nominatim and Overpass; the
 * path routed along OSM footways by the FOSSGIS foot router). Accurate to a few
 * metres, not surveyed: walk the route once before promoting it.
 *
 * Narration: these recordings are TEMPORARY, made with Google text-to-speech in
 * Professor Hoot's "Ask your guide" voice (en-GB-Standard-A). Replace them with the
 * original narrator's ElevenLabs voice, same file names.
 *
 * Cover: "Avenida de Mayo", c. 1900, Mitchell's Book Stores, Buenos Aires (Circe
 * library collection, Wikimedia Commons, public domain), cropped.
 */

/** Walking path, stop to stop, about 10.3 km. */
const path = [
  { lat: -34.625709, lng: -58.370576 },
  { lat: -34.625689, lng: -58.370555 },
  { lat: -34.625542, lng: -58.370761 },
  { lat: -34.625512, lng: -58.370898 },
  { lat: -34.625431, lng: -58.370985 },
  { lat: -34.625403, lng: -58.370987 },
  { lat: -34.625363, lng: -58.371052 },
  { lat: -34.625362, lng: -58.371094 },
  { lat: -34.625301, lng: -58.371138 },
  { lat: -34.624227, lng: -58.371193 },
  { lat: -34.624123, lng: -58.371209 },
  { lat: -34.623035, lng: -58.371273 },
  { lat: -34.622919, lng: -58.37128 },
  { lat: -34.622676, lng: -58.371291 },
  { lat: -34.62227, lng: -58.371309 },
  { lat: -34.621974, lng: -58.371322 },
  { lat: -34.62184, lng: -58.371329 },
  { lat: -34.62173, lng: -58.37134 },
  { lat: -34.620689, lng: -58.371432 },
  { lat: -34.620276, lng: -58.371457 },
  { lat: -34.620291, lng: -58.371793 },
  { lat: -34.62049, lng: -58.37178 },
  { lat: -34.620291, lng: -58.371793 },
  { lat: -34.620276, lng: -58.371457 },
  { lat: -34.620239, lng: -58.37146 },
  { lat: -34.619515, lng: -58.371523 },
  { lat: -34.619157, lng: -58.371552 },
  { lat: -34.618467, lng: -58.371608 },
  { lat: -34.617849, lng: -58.371638 },
  { lat: -34.617187, lng: -58.371673 },
  { lat: -34.617129, lng: -58.371676 },
  { lat: -34.616712, lng: -58.371694 },
  { lat: -34.616652, lng: -58.371695 },
  { lat: -34.616603, lng: -58.371696 },
  { lat: -34.616007, lng: -58.371727 },
  { lat: -34.614812, lng: -58.371781 },
  { lat: -34.614731, lng: -58.371786 },
  { lat: -34.61368, lng: -58.371856 },
  { lat: -34.613616, lng: -58.37186 },
  { lat: -34.613562, lng: -58.371863 },
  { lat: -34.612711, lng: -58.371909 },
  { lat: -34.6127, lng: -58.3716 },
  { lat: -34.612711, lng: -58.371909 },
  { lat: -34.612591, lng: -58.371916 },
  { lat: -34.612452, lng: -58.371918 },
  { lat: -34.612281, lng: -58.371928 },
  { lat: -34.611303, lng: -58.371989 },
  { lat: -34.610616, lng: -58.372019 },
  { lat: -34.61061, lng: -58.37181 },
  { lat: -34.610616, lng: -58.372019 },
  { lat: -34.610131, lng: -58.372041 },
  { lat: -34.610246, lng: -58.373461 },
  { lat: -34.610263, lng: -58.373766 },
  { lat: -34.61045, lng: -58.37375 },
  { lat: -34.610263, lng: -58.373766 },
  { lat: -34.610246, lng: -58.373461 },
  { lat: -34.609354, lng: -58.373511 },
  { lat: -34.609257, lng: -58.373516 },
  { lat: -34.609178, lng: -58.373482 },
  { lat: -34.609147, lng: -58.373458 },
  { lat: -34.609118, lng: -58.373433 },
  { lat: -34.609097, lng: -58.3734 },
  { lat: -34.609085, lng: -58.373326 },
  { lat: -34.609037, lng: -58.373327 },
  { lat: -34.608993, lng: -58.373329 },
  { lat: -34.608947, lng: -58.373331 },
  { lat: -34.608916, lng: -58.373301 },
  { lat: -34.608863, lng: -58.373246 },
  { lat: -34.608824, lng: -58.37321 },
  { lat: -34.608812, lng: -58.373198 },
  { lat: -34.608786, lng: -58.373172 },
  { lat: -34.608448, lng: -58.372834 },
  { lat: -34.608424, lng: -58.372417 },
  { lat: -34.608467, lng: -58.372406 },
  { lat: -34.608508, lng: -58.372384 },
  { lat: -34.608544, lng: -58.372352 },
  { lat: -34.608574, lng: -58.372311 },
  { lat: -34.608585, lng: -58.372288 },
  { lat: -34.608406, lng: -58.372165 },
  { lat: -34.608585, lng: -58.372288 },
  { lat: -34.608574, lng: -58.372311 },
  { lat: -34.608544, lng: -58.372352 },
  { lat: -34.608508, lng: -58.372384 },
  { lat: -34.608467, lng: -58.372406 },
  { lat: -34.608424, lng: -58.372417 },
  { lat: -34.608448, lng: -58.372834 },
  { lat: -34.608786, lng: -58.373172 },
  { lat: -34.608812, lng: -58.373198 },
  { lat: -34.608824, lng: -58.37321 },
  { lat: -34.608863, lng: -58.373246 },
  { lat: -34.608819, lng: -58.373294 },
  { lat: -34.608804, lng: -58.373307 },
  { lat: -34.6088, lng: -58.3733 },
  { lat: -34.608804, lng: -58.373307 },
  { lat: -34.608819, lng: -58.373294 },
  { lat: -34.608863, lng: -58.373246 },
  { lat: -34.608824, lng: -58.37321 },
  { lat: -34.608812, lng: -58.373198 },
  { lat: -34.608786, lng: -58.373172 },
  { lat: -34.60876, lng: -58.373207 },
  { lat: -34.608728, lng: -58.373236 },
  { lat: -34.608701, lng: -58.373254 },
  { lat: -34.608673, lng: -58.373267 },
  { lat: -34.608637, lng: -58.373279 },
  { lat: -34.608603, lng: -58.373291 },
  { lat: -34.608476, lng: -58.373307 },
  { lat: -34.608342, lng: -58.373313 },
  { lat: -34.6083, lng: -58.373302 },
  { lat: -34.608269, lng: -58.373288 },
  { lat: -34.608238, lng: -58.37327 },
  { lat: -34.608197, lng: -58.373234 },
  { lat: -34.608172, lng: -58.373278 },
  { lat: -34.608132, lng: -58.373339 },
  { lat: -34.608094, lng: -58.373299 },
  { lat: -34.60806, lng: -58.373256 },
  { lat: -34.608022, lng: -58.373188 },
  { lat: -34.607991, lng: -58.373139 },
  { lat: -34.607933, lng: -58.372992 },
  { lat: -34.607918, lng: -58.372777 },
  { lat: -34.607806, lng: -58.37279 },
  { lat: -34.607587, lng: -58.372813 },
  { lat: -34.6076, lng: -58.373 },
  { lat: -34.607587, lng: -58.372813 },
  { lat: -34.607806, lng: -58.37279 },
  { lat: -34.607918, lng: -58.372777 },
  { lat: -34.607912, lng: -58.372687 },
  { lat: -34.607882, lng: -58.372254 },
  { lat: -34.607876, lng: -58.372181 },
  { lat: -34.607873, lng: -58.372121 },
  { lat: -34.607862, lng: -58.371918 },
  { lat: -34.607858, lng: -58.371856 },
  { lat: -34.607856, lng: -58.3718 },
  { lat: -34.607854, lng: -58.371743 },
  { lat: -34.607851, lng: -58.37166 },
  { lat: -34.607843, lng: -58.371464 },
  { lat: -34.607841, lng: -58.37139 },
  { lat: -34.607831, lng: -58.371287 },
  { lat: -34.607819, lng: -58.371232 },
  { lat: -34.607802, lng: -58.371181 },
  { lat: -34.607786, lng: -58.371147 },
  { lat: -34.60776, lng: -58.371094 },
  { lat: -34.607804, lng: -58.371068 },
  { lat: -34.607823, lng: -58.371059 },
  { lat: -34.607843, lng: -58.371021 },
  { lat: -34.6081, lng: -58.371002 },
  { lat: -34.6081, lng: -58.371 },
  { lat: -34.6081, lng: -58.371002 },
  { lat: -34.608342, lng: -58.370984 },
  { lat: -34.608672, lng: -58.370966 },
  { lat: -34.608678, lng: -58.371072 },
  { lat: -34.608681, lng: -58.371136 },
  { lat: -34.608705, lng: -58.371166 },
  { lat: -34.608728, lng: -58.371213 },
  { lat: -34.608743, lng: -58.371279 },
  { lat: -34.608798, lng: -58.372065 },
  { lat: -34.608803, lng: -58.372139 },
  { lat: -34.608809, lng: -58.372211 },
  { lat: -34.608851, lng: -58.372963 },
  { lat: -34.608848, lng: -58.373052 },
  { lat: -34.608835, lng: -58.373096 },
  { lat: -34.608814, lng: -58.373135 },
  { lat: -34.608786, lng: -58.373172 },
  { lat: -34.608812, lng: -58.373198 },
  { lat: -34.608824, lng: -58.37321 },
  { lat: -34.608863, lng: -58.373246 },
  { lat: -34.608916, lng: -58.373301 },
  { lat: -34.608947, lng: -58.373331 },
  { lat: -34.608948, lng: -58.373377 },
  { lat: -34.608945, lng: -58.373438 },
  { lat: -34.608946, lng: -58.3735 },
  { lat: -34.608946, lng: -58.373549 },
  { lat: -34.608991, lng: -58.373548 },
  { lat: -34.609017, lng: -58.373558 },
  { lat: -34.609039, lng: -58.373572 },
  { lat: -34.609063, lng: -58.373604 },
  { lat: -34.609074, lng: -58.373642 },
  { lat: -34.609076, lng: -58.373665 },
  { lat: -34.609104, lng: -58.373702 },
  { lat: -34.609146, lng: -58.374325 },
  { lat: -34.609185, lng: -58.374883 },
  { lat: -34.609196, lng: -58.375055 },
  { lat: -34.609215, lng: -58.375309 },
  { lat: -34.60929, lng: -58.37634 },
  { lat: -34.609384, lng: -58.377681 },
  { lat: -34.609389, lng: -58.377746 },
  { lat: -34.609332, lng: -58.377749 },
  { lat: -34.608797, lng: -58.377784 },
  { lat: -34.60869, lng: -58.377789 },
  { lat: -34.608708, lng: -58.378108 },
  { lat: -34.60869, lng: -58.37811 },
  { lat: -34.608708, lng: -58.378108 },
  { lat: -34.608722, lng: -58.378348 },
  { lat: -34.60873, lng: -58.378494 },
  { lat: -34.608752, lng: -58.37885 },
  { lat: -34.608772, lng: -58.379196 },
  { lat: -34.608887, lng: -58.379189 },
  { lat: -34.609431, lng: -58.37917 },
  { lat: -34.609489, lng: -58.379168 },
  { lat: -34.609494, lng: -58.379229 },
  { lat: -34.609596, lng: -58.380541 },
  { lat: -34.609606, lng: -58.380665 },
  { lat: -34.609694, lng: -58.38066 },
  { lat: -34.609699, lng: -58.380734 },
  { lat: -34.609703, lng: -58.380746 },
  { lat: -34.609721, lng: -58.380928 },
  { lat: -34.609732, lng: -58.380968 },
  { lat: -34.609745, lng: -58.381051 },
  { lat: -34.609757, lng: -58.381142 },
  { lat: -34.609758, lng: -58.381189 },
  { lat: -34.609761, lng: -58.381262 },
  { lat: -34.609764, lng: -58.381358 },
  { lat: -34.609762, lng: -58.381516 },
  { lat: -34.609761, lng: -58.381612 },
  { lat: -34.609765, lng: -58.38169 },
  { lat: -34.60977, lng: -58.381838 },
  { lat: -34.609772, lng: -58.381912 },
  { lat: -34.609777, lng: -58.382016 },
  { lat: -34.609692, lng: -58.382022 },
  { lat: -34.609695, lng: -58.382103 },
  { lat: -34.609703, lng: -58.382284 },
  { lat: -34.60975, lng: -58.383371 },
  { lat: -34.609752, lng: -58.38342 },
  { lat: -34.609759, lng: -58.383516 },
  { lat: -34.609845, lng: -58.38476 },
  { lat: -34.60985, lng: -58.384829 },
  { lat: -34.60986, lng: -58.384926 },
  { lat: -34.609869, lng: -58.385026 },
  { lat: -34.609915, lng: -58.385704 },
  { lat: -34.60966, lng: -58.38573 },
  { lat: -34.609915, lng: -58.385704 },
  { lat: -34.609949, lng: -58.386195 },
  { lat: -34.609952, lng: -58.386234 },
  { lat: -34.609956, lng: -58.386331 },
  { lat: -34.610006, lng: -58.387433 },
  { lat: -34.609964, lng: -58.387578 },
  { lat: -34.609969, lng: -58.387657 },
  { lat: -34.609936, lng: -58.387644 },
  { lat: -34.609919, lng: -58.38764 },
  { lat: -34.609922, lng: -58.387691 },
  { lat: -34.609935, lng: -58.387882 },
  { lat: -34.609951, lng: -58.388088 },
  { lat: -34.610002, lng: -58.388947 },
  { lat: -34.609992, lng: -58.388965 },
  { lat: -34.60996, lng: -58.388983 },
  { lat: -34.609967, lng: -58.389066 },
  { lat: -34.609978, lng: -58.389188 },
  { lat: -34.609888, lng: -58.389299 },
  { lat: -34.609941, lng: -58.390172 },
  { lat: -34.609983, lng: -58.390323 },
  { lat: -34.610007, lng: -58.390917 },
  { lat: -34.610035, lng: -58.391237 },
  { lat: -34.609992, lng: -58.391294 },
  { lat: -34.610019, lng: -58.391345 },
  { lat: -34.610049, lng: -58.391413 },
  { lat: -34.609998, lng: -58.391449 },
  { lat: -34.609969, lng: -58.391462 },
  { lat: -34.609701, lng: -58.391497 },
  { lat: -34.6096, lng: -58.391504 },
  { lat: -34.6096, lng: -58.3915 },
  { lat: -34.6096, lng: -58.391504 },
  { lat: -34.609517, lng: -58.39151 },
  { lat: -34.609479, lng: -58.391503 },
  { lat: -34.609411, lng: -58.391474 },
  { lat: -34.609436, lng: -58.391349 },
  { lat: -34.609406, lng: -58.391311 },
  { lat: -34.609382, lng: -58.390982 },
  { lat: -34.609348, lng: -58.390472 },
  { lat: -34.609329, lng: -58.390225 },
  { lat: -34.60928, lng: -58.389414 },
  { lat: -34.609306, lng: -58.389364 },
  { lat: -34.609253, lng: -58.389322 },
  { lat: -34.60922, lng: -58.389297 },
  { lat: -34.60922, lng: -58.389271 },
  { lat: -34.609218, lng: -58.389168 },
  { lat: -34.609216, lng: -58.389045 },
  { lat: -34.609088, lng: -58.389052 },
  { lat: -34.609076, lng: -58.388766 },
  { lat: -34.609068, lng: -58.388639 },
  { lat: -34.608973, lng: -58.38827 },
  { lat: -34.608919, lng: -58.387732 },
  { lat: -34.608908, lng: -58.387621 },
  { lat: -34.608874, lng: -58.387456 },
  { lat: -34.608782, lng: -58.386381 },
  { lat: -34.608773, lng: -58.38628 },
  { lat: -34.608737, lng: -58.386282 },
  { lat: -34.608625, lng: -58.386286 },
  { lat: -34.608428, lng: -58.386294 },
  { lat: -34.607669, lng: -58.386323 },
  { lat: -34.607604, lng: -58.386325 },
  { lat: -34.607558, lng: -58.386327 },
  { lat: -34.606511, lng: -58.38638 },
  { lat: -34.606429, lng: -58.386384 },
  { lat: -34.606425, lng: -58.38632 },
  { lat: -34.606363, lng: -58.385467 },
  { lat: -34.606341, lng: -58.385113 },
  { lat: -34.606334, lng: -58.385008 },
  { lat: -34.606288, lng: -58.385016 },
  { lat: -34.605695, lng: -58.385032 },
  { lat: -34.605229, lng: -58.385048 },
  { lat: -34.605176, lng: -58.385049 },
  { lat: -34.60513, lng: -58.385052 },
  { lat: -34.604028, lng: -58.385126 },
  { lat: -34.603932, lng: -58.385133 },
  { lat: -34.603861, lng: -58.38514 },
  { lat: -34.603795, lng: -58.385146 },
  { lat: -34.603691, lng: -58.385155 },
  { lat: -34.602792, lng: -58.38523 },
  { lat: -34.602772, lng: -58.385232 },
  { lat: -34.602675, lng: -58.385212 },
  { lat: -34.602592, lng: -58.385199 },
  { lat: -34.602585, lng: -58.385117 },
  { lat: -34.602546, lng: -58.385087 },
  { lat: -34.602477, lng: -58.385034 },
  { lat: -34.602312, lng: -58.384797 },
  { lat: -34.602163, lng: -58.384639 },
  { lat: -34.602122, lng: -58.384602 },
  { lat: -34.601989, lng: -58.384481 },
  { lat: -34.601782, lng: -58.384371 },
  { lat: -34.601687, lng: -58.38434 },
  { lat: -34.601605, lng: -58.384279 },
  { lat: -34.601598, lng: -58.384126 },
  { lat: -34.601591, lng: -58.384026 },
  { lat: -34.601537, lng: -58.384017 },
  { lat: -34.601468, lng: -58.384017 },
  { lat: -34.601363, lng: -58.384013 },
  { lat: -34.601188, lng: -58.384001 },
  { lat: -34.600581, lng: -58.384012 },
  { lat: -34.600585, lng: -58.383964 },
  { lat: -34.600417, lng: -58.383975 },
  { lat: -34.600406, lng: -58.383853 },
  { lat: -34.600323, lng: -58.382526 },
  { lat: -34.600436, lng: -58.382509 },
  { lat: -34.600446, lng: -58.38257 },
  { lat: -34.600513, lng: -58.382566 },
  { lat: -34.600535, lng: -58.383122 },
  { lat: -34.600538, lng: -58.383203 },
  { lat: -34.6006, lng: -58.3832 },
  { lat: -34.600538, lng: -58.383203 },
  { lat: -34.600535, lng: -58.383122 },
  { lat: -34.600513, lng: -58.382566 },
  { lat: -34.600446, lng: -58.38257 },
  { lat: -34.600436, lng: -58.382509 },
  { lat: -34.600423, lng: -58.382433 },
  { lat: -34.600417, lng: -58.382362 },
  { lat: -34.600386, lng: -58.382154 },
  { lat: -34.600384, lng: -58.38214 },
  { lat: -34.600283, lng: -58.382151 },
  { lat: -34.600182, lng: -58.38216 },
  { lat: -34.600171, lng: -58.382151 },
  { lat: -34.600158, lng: -58.382139 },
  { lat: -34.600152, lng: -58.382041 },
  { lat: -34.600145, lng: -58.38192 },
  { lat: -34.600143, lng: -58.381879 },
  { lat: -34.600137, lng: -58.381787 },
  { lat: -34.600077, lng: -58.381796 },
  { lat: -34.599407, lng: -58.381827 },
  { lat: -34.599259, lng: -58.381861 },
  { lat: -34.599163, lng: -58.381868 },
  { lat: -34.599042, lng: -58.381877 },
  { lat: -34.598905, lng: -58.38189 },
  { lat: -34.598733, lng: -58.381877 },
  { lat: -34.598041, lng: -58.381916 },
  { lat: -34.597987, lng: -58.381903 },
  { lat: -34.597878, lng: -58.381903 },
  { lat: -34.597778, lng: -58.381908 },
  { lat: -34.597715, lng: -58.381912 },
  { lat: -34.597578, lng: -58.381871 },
  { lat: -34.597443, lng: -58.381883 },
  { lat: -34.597321, lng: -58.381897 },
  { lat: -34.597254, lng: -58.381937 },
  { lat: -34.597178, lng: -58.381981 },
  { lat: -34.596903, lng: -58.382013 },
  { lat: -34.59685, lng: -58.382048 },
  { lat: -34.596825, lng: -58.382053 },
  { lat: -34.59674, lng: -58.382068 },
  { lat: -34.596671, lng: -58.382076 },
  { lat: -34.596636, lng: -58.382069 },
  { lat: -34.596594, lng: -58.382075 },
  { lat: -34.59577, lng: -58.382159 },
  { lat: -34.595665, lng: -58.382166 },
  { lat: -34.595589, lng: -58.382156 },
  { lat: -34.595406, lng: -58.382147 },
  { lat: -34.595281, lng: -58.382142 },
  { lat: -34.59529, lng: -58.382323 },
  { lat: -34.595309, lng: -58.382472 },
  { lat: -34.595327, lng: -58.382743 },
  { lat: -34.595282, lng: -58.382746 },
  { lat: -34.594791, lng: -58.382771 },
  { lat: -34.594374, lng: -58.382726 },
  { lat: -34.59438, lng: -58.382831 },
  { lat: -34.594386, lng: -58.382942 },
  { lat: -34.59432, lng: -58.382944 },
  { lat: -34.594254, lng: -58.382949 },
  { lat: -34.594219, lng: -58.382842 },
  { lat: -34.594216, lng: -58.38273 },
  { lat: -34.593087, lng: -58.382756 },
  { lat: -34.59292, lng: -58.382751 },
  { lat: -34.592913, lng: -58.382954 },
  { lat: -34.592828, lng: -58.382953 },
  { lat: -34.59274, lng: -58.382955 },
  { lat: -34.592742, lng: -58.38283 },
  { lat: -34.591995, lng: -58.382878 },
  { lat: -34.591727, lng: -58.382892 },
  { lat: -34.591698, lng: -58.382896 },
  { lat: -34.591668, lng: -58.382907 },
  { lat: -34.591645, lng: -58.382921 },
  { lat: -34.591619, lng: -58.38294 },
  { lat: -34.591597, lng: -58.382964 },
  { lat: -34.59158, lng: -58.382991 },
  { lat: -34.591577, lng: -58.382885 },
  { lat: -34.591571, lng: -58.382755 },
  { lat: -34.59165, lng: -58.38275 },
  { lat: -34.591571, lng: -58.382755 },
  { lat: -34.591577, lng: -58.382885 },
  { lat: -34.59158, lng: -58.382991 },
  { lat: -34.591496, lng: -58.383153 },
  { lat: -34.591453, lng: -58.383237 },
  { lat: -34.591409, lng: -58.383321 },
  { lat: -34.591297, lng: -58.383525 },
  { lat: -34.591083, lng: -58.383889 },
  { lat: -34.590877, lng: -58.384233 },
  { lat: -34.590827, lng: -58.384309 },
  { lat: -34.590473, lng: -58.384842 },
  { lat: -34.59043, lng: -58.384906 },
  { lat: -34.589813, lng: -58.38587 },
  { lat: -34.589779, lng: -58.385922 },
  { lat: -34.58972, lng: -58.386011 },
  { lat: -34.589129, lng: -58.386913 },
  { lat: -34.589063, lng: -58.387003 },
  { lat: -34.589001, lng: -58.387104 },
  { lat: -34.588744, lng: -58.387495 },
  { lat: -34.588596, lng: -58.387723 },
  { lat: -34.588409, lng: -58.388011 },
  { lat: -34.588329, lng: -58.388135 },
  { lat: -34.588263, lng: -58.388238 },
  { lat: -34.58795, lng: -58.388724 },
  { lat: -34.587686, lng: -58.389129 },
  { lat: -34.587637, lng: -58.38921 },
  { lat: -34.587724, lng: -58.389308 },
  { lat: -34.587169, lng: -58.390144 },
  { lat: -34.587157, lng: -58.390162 },
  { lat: -34.587294, lng: -58.39033 },
  { lat: -34.58761, lng: -58.390704 },
  { lat: -34.587687, lng: -58.390795 },
  { lat: -34.587723, lng: -58.390838 },
  { lat: -34.587745, lng: -58.390866 },
  { lat: -34.587949, lng: -58.391111 },
  { lat: -34.587994, lng: -58.391164 },
  { lat: -34.587935, lng: -58.391272 },
  { lat: -34.58814, lng: -58.391525 },
  { lat: -34.588108, lng: -58.391727 },
  { lat: -34.58807, lng: -58.391977 },
  { lat: -34.588053, lng: -58.39209 },
  { lat: -34.5881, lng: -58.3921 },
  { lat: -34.588053, lng: -58.39209 },
  { lat: -34.588043, lng: -58.392157 },
  { lat: -34.58803, lng: -58.392236 },
  { lat: -34.587982, lng: -58.392233 },
  { lat: -34.587939, lng: -58.392231 },
  { lat: -34.587825, lng: -58.39218 },
  { lat: -34.587733, lng: -58.392138 },
  { lat: -34.587603, lng: -58.39208 },
  { lat: -34.587481, lng: -58.392025 },
  { lat: -34.587049, lng: -58.391831 },
  { lat: -34.58678, lng: -58.391709 },
  { lat: -34.586698, lng: -58.391672 },
  { lat: -34.58667, lng: -58.39166 },
  { lat: -34.586501, lng: -58.391584 },
  { lat: -34.586304, lng: -58.391495 },
  { lat: -34.586046, lng: -58.391379 },
  { lat: -34.586001, lng: -58.39132 },
  { lat: -34.585964, lng: -58.39139 },
  { lat: -34.585953, lng: -58.391468 },
  { lat: -34.585935, lng: -58.391464 },
  { lat: -34.585928, lng: -58.391463 },
  { lat: -34.585877, lng: -58.391454 },
  { lat: -34.585864, lng: -58.391452 },
  { lat: -34.585772, lng: -58.391435 },
  { lat: -34.585701, lng: -58.392055 },
  { lat: -34.585684, lng: -58.392045 },
  { lat: -34.585665, lng: -58.392042 },
  { lat: -34.585642, lng: -58.392058 },
  { lat: -34.585623, lng: -58.392096 },
  { lat: -34.585615, lng: -58.392135 },
  { lat: -34.585628, lng: -58.392179 },
  { lat: -34.585652, lng: -58.392225 },
  { lat: -34.585679, lng: -58.392245 },
  { lat: -34.585619, lng: -58.392766 },
  { lat: -34.585613, lng: -58.392821 },
  { lat: -34.585453, lng: -58.392813 },
  { lat: -34.585422, lng: -58.39281 },
  { lat: -34.585366, lng: -58.392804 },
  { lat: -34.585322, lng: -58.392794 },
  { lat: -34.585271, lng: -58.392777 },
  { lat: -34.585283, lng: -58.392802 },
  { lat: -34.58525, lng: -58.392929 },
  { lat: -34.585234, lng: -58.392989 },
  { lat: -34.585198, lng: -58.39312 },
  { lat: -34.585171, lng: -58.393192 },
  { lat: -34.585156, lng: -58.393226 },
  { lat: -34.585136, lng: -58.393258 },
  { lat: -34.585112, lng: -58.393291 },
  { lat: -34.585089, lng: -58.393312 },
  { lat: -34.585119, lng: -58.393364 },
  { lat: -34.585136, lng: -58.393424 },
  { lat: -34.585138, lng: -58.393487 },
  { lat: -34.585126, lng: -58.393548 },
  { lat: -34.585099, lng: -58.393605 },
  { lat: -34.585059, lng: -58.39365 },
  { lat: -34.58501, lng: -58.393678 },
  { lat: -34.584956, lng: -58.393689 },
  { lat: -34.584905, lng: -58.393847 },
  { lat: -34.584801, lng: -58.394179 },
  { lat: -34.584754, lng: -58.394326 },
  { lat: -34.58473, lng: -58.394438 },
  { lat: -34.584671, lng: -58.394707 },
  { lat: -34.5846, lng: -58.394987 },
  { lat: -34.584604, lng: -58.395043 },
  { lat: -34.584612, lng: -58.395161 },
  { lat: -34.584639, lng: -58.395325 },
  { lat: -34.584637, lng: -58.395498 },
  { lat: -34.584584, lng: -58.395936 },
  { lat: -34.5846, lng: -58.396028 },
  { lat: -34.584623, lng: -58.396119 },
  { lat: -34.584622, lng: -58.396182 },
  { lat: -34.584602, lng: -58.39625 },
  { lat: -34.584554, lng: -58.39628 },
  { lat: -34.584493, lng: -58.396369 },
  { lat: -34.584452, lng: -58.396403 },
  { lat: -34.584435, lng: -58.396416 },
  { lat: -34.584337, lng: -58.396475 },
  { lat: -34.58431, lng: -58.396529 },
  { lat: -34.584252, lng: -58.396721 },
  { lat: -34.584172, lng: -58.396982 },
  { lat: -34.58409, lng: -58.396878 },
  { lat: -34.584056, lng: -58.39691 },
  { lat: -34.58394, lng: -58.397018 },
  { lat: -34.583997, lng: -58.397084 },
  { lat: -34.584066, lng: -58.397167 },
  { lat: -34.584105, lng: -58.397214 },
  { lat: -34.584121, lng: -58.397246 },
  { lat: -34.584132, lng: -58.397285 },
  { lat: -34.584132, lng: -58.397335 },
  { lat: -34.584124, lng: -58.397381 },
  { lat: -34.584112, lng: -58.397418 },
  { lat: -34.584098, lng: -58.397444 },
  { lat: -34.583976, lng: -58.397603 },
  { lat: -34.58399, lng: -58.397622 },
  { lat: -34.583996, lng: -58.397631 },
  { lat: -34.584029, lng: -58.397677 },
  { lat: -34.584089, lng: -58.397759 },
  { lat: -34.584155, lng: -58.397681 },
  { lat: -34.584164, lng: -58.397692 },
  { lat: -34.584388, lng: -58.397973 },
  { lat: -34.58439, lng: -58.39797 },
];

export const buenosAiresLandmarks: Area = {
  id: "buenos-aires-landmarks",
  name: "Buenos Aires: From Colony to the Paris of South America",
  city: "Buenos Aires",
  description:
    "From the spot where Buenos Aires was first founded, and failed, to the Plaza de Mayo, the Cabildo and the Casa Rosada, then up the Parisian boulevards to Congress, the Teatro Colón and Recoleta: discover how a Spanish colonial outpost became the grand, immigrant-built capital they called the Paris of South America.",
  estimatedDurationMin: 180,
  estimatedDistanceKm: 10.3,
  difficulty: "moderate",
  accessNote:
    "About 10 km, all on flat city streets, from Parque Lezama in San Telmo to the National Library in Recoleta. The Teatro Colón, the Cabildo and Recoleta Cemetery have their own opening hours and tickets for going inside. A bus or taxi can shorten the walk from the Teatro Colón to Recoleta.",
  isContentComplete: true,
  enableInteractiveGuide: true,
  sequentialStops: true,
  image: require("../../../assets/tours/buenos-aires-landmarks.jpg"),
  price: { singleTour: 0.99 },
  startingPoint: {
    lat: -34.625709,
    lng: -58.370576,
    label: "Monument to Pedro de Mendoza, Parque Lezama, San Telmo",
  },
  route: [
    {
      id: "ba-hist-lezama",
      order: 1,
      name: "Parque Lezama: the city that failed",
      coordinates: { lat: -34.625709, lng: -58.370576 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 76,
        audioSource: require("../../../assets/audio/buenos-aires-landmarks/01-parque-lezama.mp3"),
        scriptText: `Buen día, and welcome to Buenos Aires. On this walk we'll follow the city from a failed Spanish settlement to the grand capital people came to call the Paris of South America, through its churches, its revolutions and its palaces.

We begin with a failure. Tradition places the first Buenos Aires here, on the high ground of what is now Parque Lezama, above the old riverbank. In 1536 the Spanish nobleman Pedro de Mendoza arrived with a fleet of more than a dozen ships, and founded a settlement he called Santa María del Buen Ayre: Our Lady of the Fair Winds.

It went terribly. Supplies ran out, and relations with the local Querandí people turned to war. The settlers starved; one of them, a German soldier called Ulrich Schmidl, later wrote that people were reduced to eating leather, and worse. Mendoza, already ill, sailed for Spain and died at sea. By 1541 the last survivors had abandoned the place and gone upriver to Asunción.

Nobody knows exactly where that first settlement stood. This park is the traditional site, not a proven one. The monument here honours Mendoza, and the red building across the park is the National Historical Museum.

Now walk north along Calle Defensa, into San Telmo, to Plaza Dorrego.`,
      },
    },
    {
      id: "ba-hist-dorrego",
      order: 2,
      name: "Plaza Dorrego: fever and the immigrant city",
      coordinates: { lat: -34.62049, lng: -58.37178 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 76,
        audioSource: require("../../../assets/audio/buenos-aires-landmarks/02-plaza-dorrego.mp3"),
        scriptText: `Plaza Dorrego is the heart of San Telmo, one of the oldest neighbourhoods in the city. Buenos Aires was founded a second time, for good, in 1580, a few blocks north of here, and for most of the colonial period it was a modest port town of low, whitewashed houses built around patios, living on trade through the River Plate, and quite a lot of smuggling.

By the mid-nineteenth century, San Telmo was home to wealthy families. Then, in 1871, yellow fever struck. In a few months it killed around fourteen thousand people, something like one in every thirteen people in the city, and it hit the low, crowded south hardest. Those who could afford to fled north, to higher ground in Barrio Norte and Recoleta, where our walk will end.

Their grand houses here were split up into conventillos: tenements where immigrant families rented a single room each, around a shared courtyard.

And the immigrants kept coming, above all from Italy and Spain. Millions of Europeans arrived in Argentina between the 1880s and the First World War, and by 1914 around half the people of Buenos Aires had been born abroad.

On Sundays this plaza fills with the San Telmo antiques fair. Now continue north along Defensa to the church on the corner of Avenida Belgrano.`,
      },
    },
    {
      id: "ba-hist-santo-domingo",
      order: 3,
      name: "Santo Domingo: the British invasions",
      coordinates: { lat: -34.6127, lng: -58.3716 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 78,
        audioSource: require("../../../assets/audio/buenos-aires-landmarks/03-santo-domingo.mp3"),
        scriptText: `This is the Basilica of Our Lady of the Rosary and the Convent of Santo Domingo, the church of the Dominican friars, built in the second half of the 1700s. And in 1807, it was a battlefield.

In 1806 a small British force sailed up the river and captured Buenos Aires. The Spanish viceroy fled. Within weeks, local militias led by a French-born officer, Santiago de Liniers, had driven the British out. In 1807 a much larger British army returned under General Whitelocke, and this time the whole city fought. People fired from rooftops and windows, and threw whatever they had down into the streets.

Some British troops barricaded themselves inside this convent and fired from its tower. Look up at the tower on the left: the marks in it recall the shots fired at them by the defenders. Whitelocke surrendered, and back in Britain he was court-martialled and dismissed from the army.

Inside, the church still displays flags captured from the British. And the people of Buenos Aires had learned something important in those two years: they could defend themselves, without Spain.

In the atrium lies Manuel Belgrano, one of the heroes of independence, and the creator of the Argentine flag.

Now walk one block north on Defensa, to the Basilica of San Francisco.`,
      },
    },
    {
      id: "ba-hist-san-francisco",
      order: 4,
      name: "San Francisco: the night the churches burned",
      coordinates: { lat: -34.61061, lng: -58.37181 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 78,
        audioSource: require("../../../assets/audio/buenos-aires-landmarks/04-san-francisco.mp3"),
        scriptText: `The Franciscans were among the first religious orders in Buenos Aires, and they've had a church on this corner since the early colonial years. The church itself dates from the 1700s, but look at its front: that isn't colonial at all. Around 1911 the German architect Ernesto Sackmann rebuilt the façade in the ornate Baroque style of Bavaria, a sign of how much Buenos Aires was looking to Europe. High up, Saint Francis stands with Dante, Giotto and Christopher Columbus.

This church carries a darker memory too. On the 16th of June 1955, navy and air force planes bombed and machine-gunned the Plaza de Mayo, a few blocks from here, in an attempt to kill President Juan Perón, who had fallen out with the Catholic Church and with much of the military. More than three hundred people died, most of them civilians.

That night, in revenge, crowds widely blamed on Perón's supporters set fire to churches across the centre, among them this one and Santo Domingo, which you've just seen. Here the main altar was destroyed, and much of the church's art and archive was lost. It only reopened for worship in 1967.

Three months later, Perón was overthrown by the military.

Now walk west along Calle Alsina, one block, to the corner of Bolívar and the church of San Ignacio.`,
      },
    },
    {
      id: "ba-hist-san-ignacio",
      order: 5,
      name: "San Ignacio and the Block of Enlightenment",
      coordinates: { lat: -34.61045, lng: -58.37375 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 70,
        audioSource: require("../../../assets/audio/buenos-aires-landmarks/05-san-ignacio.mp3"),
        scriptText: `This is San Ignacio, the oldest church still standing in Buenos Aires. The Jesuits built it between 1686 and 1722, on the model of their mother church in Rome, the Gesù, and it was consecrated in 1734. Its architects were Jesuit brothers from Central Europe and Italy, working in a city that was still little more than a frontier port.

The church is part of a whole city block known as the Manzana de las Luces, the Block of Enlightenment. This was the Jesuits' college. In 1767 the Spanish king expelled the Jesuits from all his lands, and the buildings passed to the state. Over the following decades, this block housed a school of medicine, the public library, the city's most famous secondary school, the Colegio Nacional, which is still next door, and, from 1821, the new University of Buenos Aires.

In other words, many of the people who would lead Argentina were educated right here. Beneath the block run old tunnels, and historians still argue about what they were for: defence, storage, or smuggling.

Now walk north along Bolívar to the Plaza de Mayo, and stand by the white obelisk in the middle of the square.`,
      },
    },
    {
      id: "ba-hist-plaza-de-mayo",
      order: 6,
      name: "Plaza de Mayo: the heart of the nation",
      coordinates: { lat: -34.608406, lng: -58.372165 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 76,
        audioSource: require("../../../assets/audio/buenos-aires-landmarks/06-plaza-de-mayo.mp3"),
        scriptText: `Welcome to the Plaza de Mayo, the political heart of Argentina. In 1580 Juan de Garay came down the river from Asunción and founded Buenos Aires for the second time, and for good. He laid out a grid of streets, and this was the main square at its centre, with the town council on one side and the church on another, as in every Spanish colonial town.

This white obelisk is the Pirámide de Mayo. It was put up in 1811, for the first anniversary of the May Revolution, and it's the oldest national monument in the city. In the 1850s it was rebuilt and enlarged, with the original hidden inside.

The plaza has seen almost every great moment in Argentine history: revolutions and celebrations, protests and massacres. Look at the ground around the obelisk. Those painted white headscarves recall the Mothers of the Plaza de Mayo. In 1977, during the military dictatorship, when thousands of people were being kidnapped and 'disappeared' by the state, a group of mothers began meeting here to demand to know where their children were. Soon they were walking around this pyramid every Thursday afternoon, in white headscarves. They kept walking for decades.

Now walk over to the long white building with arches, on the west side of the plaza: the Cabildo.`,
      },
    },
    {
      id: "ba-hist-cabildo",
      order: 7,
      name: "The Cabildo: the May Revolution",
      coordinates: { lat: -34.6088, lng: -58.3733 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 79,
        audioSource: require("../../../assets/audio/buenos-aires-landmarks/07-cabildo.mp3"),
        scriptText: `This is the Cabildo, the colonial town hall, where the city council of Spanish Buenos Aires met, and where the region's independence began.

In May 1810, news arrived that Napoleon's armies had overrun Spain. With the Spanish king a prisoner of the French, the leading men of the city met here, in an open council, a cabildo abierto, on the 22nd of May, and argued about whether the viceroy still had any authority at all. Three days later, on the 25th of May, the viceroy was replaced by a local governing council, the Primera Junta. That was the May Revolution, and it's why this is the Plaza de Mayo. Formal independence was declared six years later, in 1816, in the city of Tucumán, in the north.

Now look at the building itself. It once had eleven arches across its front. In 1889 three were demolished on the north side to open Avenida de Mayo, and in 1931 three more went on the south side, for a new diagonal avenue. What you see now, with five arches and its tower restored, is a reconstruction of its colonial look, finished in 1940.

It's the whole story of the city in one building: the colonial past, cut back to make way for the new Buenos Aires.

Now walk north across the plaza to the building with columns, like a Greek temple. It's the cathedral.`,
      },
    },
    {
      id: "ba-hist-catedral",
      order: 8,
      name: "The Metropolitan Cathedral: the Liberator and the Pope",
      coordinates: { lat: -34.6076, lng: -58.373 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 72,
        audioSource: require("../../../assets/audio/buenos-aires-landmarks/08-catedral.mp3"),
        scriptText: `This doesn't look much like a church, does it? The Metropolitan Cathedral of Buenos Aires hides behind a front of twelve columns, like a Greek temple, or the Panthéon in Paris. The church behind is older; the neoclassical front was begun in the 1820s, soon after independence, by French architects. Even here, the young republic was turning its face towards France.

Inside lies the man Argentines call the Liberator: General José de San Martín. He led an army across the Andes to free Chile from Spain, and went on to Peru. Then he spent his last decades in exile in France, where he died in 1850. His remains were brought home in 1880 and placed in a mausoleum here, guarded by soldiers of the regiment he founded, the Mounted Grenadiers.

There's a more recent story too. For years, the Archbishop of Buenos Aires said Mass in this cathedral. His name was Jorge Mario Bergoglio. In 2013 he became Pope Francis, the first pope from the Americas, and he led the Catholic Church until his death in April 2025.

Next, walk east across the plaza to the pink palace at the far end: the Casa Rosada.`,
      },
    },
    {
      id: "ba-hist-casa-rosada",
      order: 9,
      name: "The Casa Rosada: the Pink House",
      coordinates: { lat: -34.6081, lng: -58.371 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 70,
        audioSource: require("../../../assets/audio/buenos-aires-landmarks/09-casa-rosada.mp3"),
        scriptText: `This is the Casa Rosada, the Pink House, the office of Argentina's president. It stands where the Spanish built their fort beside the river; the water came almost up to here until the new port and docks were built out into the river in the 1890s.

The palace joined two older buildings together, and took its final form in 1898, with that great arch in the middle. Why pink? The favourite story is that President Domingo Sarmiento, in the 1870s, chose a colour mixing the red of one political faction and the white of its rivals, as a symbol of unity. Another explanation is more practical: in the old days, whitewash was often mixed with cattle blood. Nobody knows for certain.

From that balcony, on the plaza side, Juan Perón and his wife Eva addressed vast crowds. Diego Maradona held up the World Cup there in 1986. And in 1996 Madonna stood on it to sing, playing Evita for the film.

It was this building the planes were trying to hit in June 1955.

Now head back west along Avenida de Mayo, the city's first great boulevard, to number 825, and the Café Tortoni.`,
      },
    },
    {
      id: "ba-hist-tortoni",
      order: 10,
      name: "Avenida de Mayo and the Café Tortoni",
      coordinates: { lat: -34.60869, lng: -58.37811 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 75,
        audioSource: require("../../../assets/audio/buenos-aires-landmarks/10-cafe-tortoni.mp3"),
        scriptText: `In 1880 Buenos Aires became the federal capital, and Argentina was getting rich, fast, exporting beef and grain to Europe. The city's leaders wanted a capital to match, and they looked to Paris, which had just been rebuilt with wide, straight boulevards. Avenida de Mayo, opened in 1894, was the first: a straight line from the Casa Rosada to Congress, lined with elegant buildings, hotels and cafés, many of them run by Spanish immigrants.

The Café Tortoni was founded in 1858, named after a famous café in Paris, and it gave itself a grand new front on this avenue soon after it opened. Inside, under the stained glass and the dark wood, writers, artists and musicians have met for more than a century. You'll find figures of three of them sitting at a table: the writer Jorge Luis Borges, the poet Alfonsina Storni, and the tango singer Carlos Gardel. Upstairs is the National Academy of Tango.

It's one of the city's bares notables, historic cafés protected as part of its heritage. Go in if the queue allows.

Then continue west along Avenida de Mayo, across the enormous Avenida 9 de Julio, to an extraordinary tower at number 1370: the Palacio Barolo.`,
      },
    },
    {
      id: "ba-hist-barolo",
      order: 11,
      name: "Palacio Barolo: Dante's skyscraper",
      coordinates: { lat: -34.60966, lng: -58.38573 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 68,
        audioSource: require("../../../assets/audio/buenos-aires-landmarks/11-palacio-barolo.mp3"),
        scriptText: `This is the Palacio Barolo, and it may be the strangest office building in the world. It was commissioned by Luis Barolo, an Italian immigrant who made his fortune in textiles, and designed by the Italian architect Mario Palanti. It opened in 1923, and at a hundred metres high it was then the tallest building in South America.

Palanti designed it as a tribute to Dante's Divine Comedy. The building is divided like the poem: the basement and ground floor are Hell, the floors above are Purgatory, and the top floors, rising into the dome, are Heaven. It's said the hundred metres stand for the hundred cantos of the poem. At the very top is a lighthouse.

Across the River Plate, in Montevideo, Palanti built a near-twin, the Palacio Salvo, and the two towers were meant to greet each other, like gateposts at the mouth of the estuary.

Buildings like this show the confidence of Buenos Aires in the 1920s. Argentina was then one of the richest countries in the world, and its immigrants wanted monuments as grand as anything in Europe.

Now continue to the end of Avenida de Mayo, to the great green dome of the National Congress.`,
      },
    },
    {
      id: "ba-hist-congreso",
      order: 12,
      name: "The National Congress: kilometre zero",
      coordinates: { lat: -34.6096, lng: -58.3915 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 69,
        audioSource: require("../../../assets/audio/buenos-aires-landmarks/12-congreso.mp3"),
        scriptText: `At the western end of Avenida de Mayo stands the Palace of the National Congress, home of the Senate and the Chamber of Deputies. It was designed by the Italian architect Vittorio Meano in a grand Greco-Roman style, under a bronze-covered dome about eighty metres high. It was inaugurated in 1906, although work on its details went on for decades.

In the square in front, look for a stone monument marking Kilometre Zero. Distances on Argentina's national roads are measured from that point.

The building completed the plan: the president at one end of the avenue, the legislature at the other, and between them a boulevard worthy of Paris.

And the immigrant city wanted a voice in it. In 1912 a new law brought in secret and compulsory voting for men, and in 1916 it carried Hipólito Yrigoyen, of the Radical party, to the presidency, with strong support from the sons of immigrants and the growing middle classes. Women had to wait until 1947 for the vote, and first voted in a national election in 1951.

From here, walk north-east to the Plaza Lavalle and the Teatro Colón. It's about twenty minutes.`,
      },
    },
    {
      id: "ba-hist-colon",
      order: 13,
      name: "Teatro Colón: the Belle Époque",
      coordinates: { lat: -34.6006, lng: -58.3832 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 76,
        audioSource: require("../../../assets/audio/buenos-aires-landmarks/13-teatro-colon.mp3"),
        scriptText: `This is the Teatro Colón, one of the great opera houses of the world. It opened on the 25th of May 1908 with Verdi's Aida, after nearly twenty years of delays. Its first architect, Francesco Tamburini, who also shaped the Casa Rosada, died in 1891. His partner Vittorio Meano took over, and was murdered in 1904. The Belgian Jules Dormal finished the job, and gave it its French-style decoration.

Inside, the horseshoe-shaped auditorium seats around two and a half thousand people, with room for hundreds more standing. Singers and conductors rank its acoustics among the very best in the world. Caruso, Toscanini, Maria Callas and Pavarotti all performed here.

The Colón was the crown of Belle Époque Buenos Aires. The beef and grain fortunes paid for it, and the city's elite, many of whom spent months of every year in Paris, filled its boxes.

Just around the corner, on Avenida 9 de Julio, stands the Obelisco, built in 1936 for the four hundredth anniversary of Mendoza's first founding.

Now walk north into Retiro, past the French Embassy, a mansion from the days when wealthy families built Parisian palaces here, and on up to Recoleta and the gates of its famous cemetery.`,
      },
    },
    {
      id: "ba-hist-recoleta",
      order: 14,
      name: "Recoleta Cemetery: a city of the dead",
      coordinates: { lat: -34.5881, lng: -58.3921 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 71,
        audioSource: require("../../../assets/audio/buenos-aires-landmarks/14-recoleta.mp3"),
        scriptText: `These walls enclose the Recoleta Cemetery, opened in 1822 in the old garden of the Recollect friars, whose white church, the Basílica del Pilar, from the 1730s, stands beside it.

After the yellow fever of 1871, the city's elite moved up here to this high, healthy northern district, and Recoleta became the place to be buried. Families competed to build the most magnificent tombs: Greek temples, Gothic chapels, Art Nouveau angels, in marble shipped from Italy. It's a city of the dead with its own streets and avenues, and nearly five thousand vaults, dozens of them national historic monuments.

Here lie presidents, generals, writers and scientists, among them Domingo Sarmiento, the president who may have given the Casa Rosada its pink. But the most visited grave belongs to a woman the old elite despised: Eva Perón, in the Duarte family vault. Her long journey to it is a story of its own, told in our Evita tour.

People here like to say that it's cheaper to live in luxury all your life than to be buried in Recoleta.

For the last stop, walk around the cemetery and across the gardens to the huge concrete building raised up on pillars: the National Library.`,
      },
    },
    {
      id: "ba-hist-biblioteca",
      order: 15,
      name: "The National Library: the modern city",
      coordinates: { lat: -34.58439, lng: -58.39797 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 74,
        audioSource: require("../../../assets/audio/buenos-aires-landmarks/15-biblioteca-nacional.mp3"),
        scriptText: `We end in modern Buenos Aires. This massive concrete building, held up on great pillars like a giant table, is the National Library, named after Mariano Moreno, a leader of the May Revolution, who founded the city's public library in 1810.

The design, by Clorindo Testa, Francisco Bullrich and Alicia Cazzaniga, won a competition in 1961, in the style known as brutalism. But the troubles of the following decades, coups, economic crises and dictatorship, meant that it took around thirty years to build. It finally opened in 1992.

This land once held the Palacio Unzué, the presidential residence where Eva Perón died in 1952. After Perón was overthrown, the military had it demolished. And one of the library's most famous directors, before the move here, was Jorge Luis Borges, appointed in 1955 when he had already lost his sight. Borges once wrote that he had always imagined paradise as a kind of library.

So, from a starving settlement by the river, to a colonial port, to a revolution, to a European-style capital built by immigrants, and to the modern city around you: Buenos Aires has reinvented itself again and again.

Thank you for walking with me. ¡Chau!`,
      },
    },
  ],
  path,
};

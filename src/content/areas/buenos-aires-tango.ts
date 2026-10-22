import type { Area } from "../schema";

/**
 * Tango's story: La Boca (the Vuelta de Rocha and Caminito), Plaza Dorrego (the
 * origins debate), El Viejo Almacén (the 1913 Paris craze), the Café Tortoni
 * (Academia Nacional del Tango, lunfardo, "Mi noche triste"), Corrientes 348 ("A
 * media luz"), Luna Park (Gardel's wake, 5-6 February 1936), the Confitería Ideal
 * (milonga codes), the Obelisco (the Golden Age, Piazzolla, the 1980s revival) and
 * the Abasto (the market, the Gardel statue, the Museo Casa Carlos Gardel).
 * Researched October 2026.
 *
 * Sources: Wikipedia (Carlos Gardel: Toulouse 11 Dec 1890, arrival 11 March 1893,
 * the Tacuarembó claim; Caminito and the song; History of the tango); todotango.com
 * (Coria Peñaloza, academias); buenosaires.gob.ar (Calle Museo Caminito inaugurated
 * 18 October 1959; El Viejo Almacén opened by Edmundo Rivero in May 1969, the
 * 1844 ether operation); turismo.buenosaires.gob.ar (Confitería La Ideal: 1912,
 * milonga upstairs from the 1970s, closed 2017, restored and reopened Nov 2022;
 * the Gardel monument by Mariano Pagés, 2000); La Nación (Law 24.931 placing the
 * statue in the Abasto); Canal 26 / Tiempo Argentino / BAE Negocios (Gardel's body
 * in Buenos Aires 5 February 1936, Luna Park, Chacarita on the 6th); UNESCO (2009
 * inscription, Argentina and Uruguay).
 *
 * Corrections and flags:
 *  - The brief's "La Boca brothels" origin: historians dispute it; the script
 *    gives the brothel story as one strand among dance halls, patios and cafés,
 *    and the candombe / habanera / milonga mix as the broad consensus.
 *  - The brief's "Casa Rosada Gardel connection": none found, so no stop.
 *  - The Gardel Museum is in the Abasto, not La Boca (about 6 km apart): the walk
 *    ends there, with Subte line B (Carlos Pellegrini to Carlos Gardel) offered
 *    for the 3 km Obelisco-to-Abasto leg.
 *  - Gardel's birthplace: Toulouse per French records; the Uruguayan claim is
 *    mentioned. "To get round French military service" is the usual explanation,
 *    given as "probably".
 *  - El Viejo Almacén's building date is uncertain (1769 and 1798 both given by
 *    city pages): "probably late colonial".
 *  - The "sad thought that is danced" line is "usually credited" to Discépolo.
 *  - The ship-paint origin of La Boca's colours is told as "so the story goes".
 *  - Lyrics are described, not quoted (copyright), apart from the address.
 *  - Safety: the Caminito-to-San Telmo leg leaves the tourist area; the script and
 *    the access note say to stay on main streets in daylight.
 *  - sequentialStops: the path to the Abasto market passes the Gardel statue first.
 *
 * Stops and the walking path come from OpenStreetMap (Nominatim and Overpass; the
 * path routed along OSM footways by the FOSSGIS foot router). Accurate to a few
 * metres, not surveyed: walk the route once before promoting it.
 *
 * Narration: these recordings are TEMPORARY, made with Google text-to-speech in
 * Professor Hoot's "Ask your guide" voice (en-GB-Standard-A). Replace them with the
 * original narrator's ElevenLabs voice, same file names.
 *
 * Cover: "Orquesta típica Julio De Caro", c. 1920s, unknown studio (as
 * reproduced in R. Daus, "El Tango / Medio siglo en imágenes", via Wikimedia
 * Commons, public domain), cropped.
 */

/** Walking path, stop to stop, about 11.5 km. */
const path = [
  { lat: -34.63935, lng: -58.36125 },
  { lat: -34.639342, lng: -58.361167 },
  { lat: -34.639334, lng: -58.361168 },
  { lat: -34.63927, lng: -58.361176 },
  { lat: -34.639155, lng: -58.361192 },
  { lat: -34.639183, lng: -58.361252 },
  { lat: -34.639199, lng: -58.361281 },
  { lat: -34.639216, lng: -58.36131 },
  { lat: -34.639241, lng: -58.36134 },
  { lat: -34.63928, lng: -58.361376 },
  { lat: -34.63933, lng: -58.361416 },
  { lat: -34.639316, lng: -58.361501 },
  { lat: -34.639312, lng: -58.361534 },
  { lat: -34.639314, lng: -58.361566 },
  { lat: -34.639318, lng: -58.361597 },
  { lat: -34.639327, lng: -58.361627 },
  { lat: -34.639397, lng: -58.361799 },
  { lat: -34.639397, lng: -58.361806 },
  { lat: -34.639387, lng: -58.362258 },
  { lat: -34.639383, lng: -58.362376 },
  { lat: -34.639359, lng: -58.36257 },
  { lat: -34.63936, lng: -58.36257 },
  { lat: -34.639359, lng: -58.36257 },
  { lat: -34.639348, lng: -58.362655 },
  { lat: -34.639299, lng: -58.362903 },
  { lat: -34.639243, lng: -58.363076 },
  { lat: -34.639171, lng: -58.363239 },
  { lat: -34.639131, lng: -58.363299 },
  { lat: -34.639251, lng: -58.36359 },
  { lat: -34.639265, lng: -58.363639 },
  { lat: -34.639279, lng: -58.363681 },
  { lat: -34.638473, lng: -58.364104 },
  { lat: -34.637595, lng: -58.364582 },
  { lat: -34.636787, lng: -58.365051 },
  { lat: -34.636796, lng: -58.365082 },
  { lat: -34.636727, lng: -58.365125 },
  { lat: -34.635105, lng: -58.366044 },
  { lat: -34.635101, lng: -58.366013 },
  { lat: -34.634887, lng: -58.366132 },
  { lat: -34.634835, lng: -58.366189 },
  { lat: -34.634723, lng: -58.366309 },
  { lat: -34.634421, lng: -58.366455 },
  { lat: -34.634113, lng: -58.366555 },
  { lat: -34.633858, lng: -58.366643 },
  { lat: -34.633516, lng: -58.366756 },
  { lat: -34.633262, lng: -58.366823 },
  { lat: -34.633025, lng: -58.366905 },
  { lat: -34.632853, lng: -58.366949 },
  { lat: -34.632746, lng: -58.36699 },
  { lat: -34.632641, lng: -58.367001 },
  { lat: -34.632422, lng: -58.366987 },
  { lat: -34.632173, lng: -58.366963 },
  { lat: -34.631803, lng: -58.366925 },
  { lat: -34.631504, lng: -58.366897 },
  { lat: -34.631275, lng: -58.366884 },
  { lat: -34.631066, lng: -58.366852 },
  { lat: -34.63087, lng: -58.366824 },
  { lat: -34.630684, lng: -58.366801 },
  { lat: -34.630554, lng: -58.366783 },
  { lat: -34.630423, lng: -58.36673 },
  { lat: -34.630178, lng: -58.36662 },
  { lat: -34.630057, lng: -58.366573 },
  { lat: -34.630003, lng: -58.366576 },
  { lat: -34.62993, lng: -58.366598 },
  { lat: -34.629907, lng: -58.366658 },
  { lat: -34.629356, lng: -58.367445 },
  { lat: -34.629239, lng: -58.367482 },
  { lat: -34.629341, lng: -58.367579 },
  { lat: -34.629566, lng: -58.368617 },
  { lat: -34.629572, lng: -58.368712 },
  { lat: -34.629524, lng: -58.368743 },
  { lat: -34.629465, lng: -58.368777 },
  { lat: -34.628468, lng: -58.369384 },
  { lat: -34.628363, lng: -58.369451 },
  { lat: -34.628297, lng: -58.369492 },
  { lat: -34.62822, lng: -58.369527 },
  { lat: -34.62825, lng: -58.369559 },
  { lat: -34.628124, lng: -58.369624 },
  { lat: -34.628114, lng: -58.369572 },
  { lat: -34.628091, lng: -58.369525 },
  { lat: -34.628058, lng: -58.369489 },
  { lat: -34.628018, lng: -58.369467 },
  { lat: -34.627974, lng: -58.369461 },
  { lat: -34.62793, lng: -58.369471 },
  { lat: -34.627891, lng: -58.369497 },
  { lat: -34.62786, lng: -58.369537 },
  { lat: -34.627733, lng: -58.369423 },
  { lat: -34.627729, lng: -58.369437 },
  { lat: -34.627722, lng: -58.369449 },
  { lat: -34.627711, lng: -58.369457 },
  { lat: -34.627698, lng: -58.369461 },
  { lat: -34.627686, lng: -58.36946 },
  { lat: -34.627674, lng: -58.369453 },
  { lat: -34.627609, lng: -58.369534 },
  { lat: -34.627622, lng: -58.369557 },
  { lat: -34.627563, lng: -58.369594 },
  { lat: -34.62751, lng: -58.36959 },
  { lat: -34.627348, lng: -58.369601 },
  { lat: -34.627302, lng: -58.369447 },
  { lat: -34.627177, lng: -58.369504 },
  { lat: -34.627053, lng: -58.369573 },
  { lat: -34.626916, lng: -58.369669 },
  { lat: -34.626833, lng: -58.369738 },
  { lat: -34.626802, lng: -58.369789 },
  { lat: -34.626776, lng: -58.369813 },
  { lat: -34.626713, lng: -58.369808 },
  { lat: -34.626642, lng: -58.369821 },
  { lat: -34.626609, lng: -58.369853 },
  { lat: -34.626586, lng: -58.369888 },
  { lat: -34.626548, lng: -58.369902 },
  { lat: -34.626462, lng: -58.369915 },
  { lat: -34.626382, lng: -58.369926 },
  { lat: -34.626265, lng: -58.369948 },
  { lat: -34.626154, lng: -58.369965 },
  { lat: -34.626141, lng: -58.370222 },
  { lat: -34.625911, lng: -58.370471 },
  { lat: -34.625633, lng: -58.370831 },
  { lat: -34.625617, lng: -58.370852 },
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
  { lat: -34.617791, lng: -58.370194 },
  { lat: -34.617759, lng: -58.369712 },
  { lat: -34.617751, lng: -58.369521 },
  { lat: -34.617721, lng: -58.369615 },
  { lat: -34.617669, lng: -58.369654 },
  { lat: -34.617292, lng: -58.369809 },
  { lat: -34.617143, lng: -58.36987 },
  { lat: -34.617147, lng: -58.369995 },
  { lat: -34.617148, lng: -58.370036 },
  { lat: -34.61705, lng: -58.37004 },
  { lat: -34.617148, lng: -58.370036 },
  { lat: -34.617147, lng: -58.369995 },
  { lat: -34.617143, lng: -58.36987 },
  { lat: -34.617042, lng: -58.369913 },
  { lat: -34.616593, lng: -58.370104 },
  { lat: -34.616599, lng: -58.370273 },
  { lat: -34.615863, lng: -58.370247 },
  { lat: -34.615889, lng: -58.370568 },
  { lat: -34.614779, lng: -58.370672 },
  { lat: -34.614808, lng: -58.371641 },
  { lat: -34.614812, lng: -58.371781 },
  { lat: -34.614731, lng: -58.371786 },
  { lat: -34.61368, lng: -58.371856 },
  { lat: -34.613616, lng: -58.37186 },
  { lat: -34.613562, lng: -58.371863 },
  { lat: -34.612591, lng: -58.371916 },
  { lat: -34.612452, lng: -58.371918 },
  { lat: -34.612281, lng: -58.371928 },
  { lat: -34.611303, lng: -58.371989 },
  { lat: -34.610131, lng: -58.372041 },
  { lat: -34.610246, lng: -58.373461 },
  { lat: -34.610308, lng: -58.374542 },
  { lat: -34.610244, lng: -58.37461 },
  { lat: -34.610207, lng: -58.374668 },
  { lat: -34.610189, lng: -58.374655 },
  { lat: -34.610118, lng: -58.374739 },
  { lat: -34.610052, lng: -58.374811 },
  { lat: -34.609955, lng: -58.374865 },
  { lat: -34.60926, lng: -58.374898 },
  { lat: -34.609185, lng: -58.374883 },
  { lat: -34.609196, lng: -58.375055 },
  { lat: -34.609215, lng: -58.375309 },
  { lat: -34.60929, lng: -58.37634 },
  { lat: -34.609384, lng: -58.377681 },
  { lat: -34.609389, lng: -58.377746 },
  { lat: -34.609332, lng: -58.377749 },
  { lat: -34.608797, lng: -58.377784 },
  { lat: -34.60869, lng: -58.377789 },
  { lat: -34.60871, lng: -58.378138 },
  { lat: -34.60869, lng: -58.37814 },
  { lat: -34.60871, lng: -58.378138 },
  { lat: -34.60869, lng: -58.377789 },
  { lat: -34.608246, lng: -58.377808 },
  { lat: -34.608197, lng: -58.37781 },
  { lat: -34.608117, lng: -58.377814 },
  { lat: -34.607409, lng: -58.377845 },
  { lat: -34.607042, lng: -58.377861 },
  { lat: -34.605908, lng: -58.377949 },
  { lat: -34.605888, lng: -58.377481 },
  { lat: -34.605875, lng: -58.37734 },
  { lat: -34.605828, lng: -58.376638 },
  { lat: -34.60582, lng: -58.376538 },
  { lat: -34.605814, lng: -58.376451 },
  { lat: -34.605727, lng: -58.37513 },
  { lat: -34.605726, lng: -58.375112 },
  { lat: -34.605134, lng: -58.375137 },
  { lat: -34.604558, lng: -58.37517 },
  { lat: -34.604458, lng: -58.373794 },
  { lat: -34.604352, lng: -58.372402 },
  { lat: -34.603278, lng: -58.37246 },
  { lat: -34.603156, lng: -58.372469 },
  { lat: -34.603146, lng: -58.372374 },
  { lat: -34.603106, lng: -58.371781 },
  { lat: -34.60322, lng: -58.37177 },
  { lat: -34.603106, lng: -58.371781 },
  { lat: -34.603071, lng: -58.371263 },
  { lat: -34.603063, lng: -58.371108 },
  { lat: -34.603051, lng: -58.370997 },
  { lat: -34.60302, lng: -58.370513 },
  { lat: -34.603113, lng: -58.370516 },
  { lat: -34.603113, lng: -58.37049 },
  { lat: -34.60311, lng: -58.370413 },
  { lat: -34.603109, lng: -58.370357 },
  { lat: -34.603107, lng: -58.370296 },
  { lat: -34.603105, lng: -58.370224 },
  { lat: -34.603103, lng: -58.370156 },
  { lat: -34.603102, lng: -58.370092 },
  { lat: -34.603098, lng: -58.370015 },
  { lat: -34.603084, lng: -58.369997 },
  { lat: -34.602995, lng: -58.369998 },
  { lat: -34.602962, lng: -58.369681 },
  { lat: -34.602956, lng: -58.369611 },
  { lat: -34.602907, lng: -58.369132 },
  { lat: -34.6029, lng: -58.369037 },
  { lat: -34.602802, lng: -58.369046 },
  { lat: -34.602408, lng: -58.369093 },
  { lat: -34.6024, lng: -58.369 },
  { lat: -34.602408, lng: -58.369093 },
  { lat: -34.601897, lng: -58.369154 },
  { lat: -34.601807, lng: -58.369166 },
  { lat: -34.601737, lng: -58.369178 },
  { lat: -34.601741, lng: -58.369237 },
  { lat: -34.601745, lng: -58.369292 },
  { lat: -34.601753, lng: -58.369303 },
  { lat: -34.601759, lng: -58.369315 },
  { lat: -34.601763, lng: -58.36933 },
  { lat: -34.601765, lng: -58.369364 },
  { lat: -34.60182, lng: -58.370128 },
  { lat: -34.60182, lng: -58.370137 },
  { lat: -34.601818, lng: -58.370148 },
  { lat: -34.601824, lng: -58.370195 },
  { lat: -34.601803, lng: -58.370201 },
  { lat: -34.601805, lng: -58.370263 },
  { lat: -34.601805, lng: -58.370332 },
  { lat: -34.601807, lng: -58.370387 },
  { lat: -34.60181, lng: -58.370516 },
  { lat: -34.601815, lng: -58.370564 },
  { lat: -34.601872, lng: -58.370563 },
  { lat: -34.601899, lng: -58.370561 },
  { lat: -34.601944, lng: -58.371176 },
  { lat: -34.602033, lng: -58.372533 },
  { lat: -34.60212, lng: -58.373911 },
  { lat: -34.60221, lng: -58.375274 },
  { lat: -34.602255, lng: -58.375962 },
  { lat: -34.602293, lng: -58.376703 },
  { lat: -34.602373, lng: -58.378117 },
  { lat: -34.602449, lng: -58.37955 },
  { lat: -34.603457, lng: -58.379486 },
  { lat: -34.603573, lng: -58.379475 },
  { lat: -34.603663, lng: -58.379469 },
  { lat: -34.603878, lng: -58.379455 },
  { lat: -34.60389, lng: -58.37973 },
  { lat: -34.603878, lng: -58.379455 },
  { lat: -34.603663, lng: -58.379469 },
  { lat: -34.603573, lng: -58.379475 },
  { lat: -34.603577, lng: -58.379544 },
  { lat: -34.603583, lng: -58.379663 },
  { lat: -34.603591, lng: -58.379797 },
  { lat: -34.603597, lng: -58.379906 },
  { lat: -34.603608, lng: -58.380104 },
  { lat: -34.603631, lng: -58.380534 },
  { lat: -34.603728, lng: -58.380527 },
  { lat: -34.603739, lng: -58.380794 },
  { lat: -34.603746, lng: -58.380819 },
  { lat: -34.603757, lng: -58.380849 },
  { lat: -34.603771, lng: -58.38086 },
  { lat: -34.603807, lng: -58.380912 },
  { lat: -34.60387, lng: -58.380908 },
  { lat: -34.603871, lng: -58.380932 },
  { lat: -34.603813, lng: -58.380937 },
  { lat: -34.60376, lng: -58.380941 },
  { lat: -34.603718, lng: -58.380944 },
  { lat: -34.603719, lng: -58.380979 },
  { lat: -34.603722, lng: -58.38102 },
  { lat: -34.603725, lng: -58.381102 },
  { lat: -34.603763, lng: -58.381767 },
  { lat: -34.603706, lng: -58.381772 },
  { lat: -34.603698, lng: -58.381631 },
  { lat: -34.60371, lng: -58.38163 },
  { lat: -34.603698, lng: -58.381631 },
  { lat: -34.603706, lng: -58.381772 },
  { lat: -34.603763, lng: -58.381767 },
  { lat: -34.603725, lng: -58.381102 },
  { lat: -34.603722, lng: -58.38102 },
  { lat: -34.603719, lng: -58.380979 },
  { lat: -34.603718, lng: -58.380944 },
  { lat: -34.603491, lng: -58.380962 },
  { lat: -34.603491, lng: -58.380955 },
  { lat: -34.603447, lng: -58.380958 },
  { lat: -34.603421, lng: -58.380959 },
  { lat: -34.603404, lng: -58.38096 },
  { lat: -34.603403, lng: -58.380925 },
  { lat: -34.603391, lng: -58.380926 },
  { lat: -34.603342, lng: -58.380929 },
  { lat: -34.603312, lng: -58.380931 },
  { lat: -34.603392, lng: -58.381077 },
  { lat: -34.603465, lng: -58.381219 },
  { lat: -34.603463, lng: -58.381249 },
  { lat: -34.603462, lng: -58.381302 },
  { lat: -34.603464, lng: -58.381379 },
  { lat: -34.603488, lng: -58.381377 },
  { lat: -34.603502, lng: -58.381846 },
  { lat: -34.603504, lng: -58.381945 },
  { lat: -34.603522, lng: -58.382154 },
  { lat: -34.603527, lng: -58.382318 },
  { lat: -34.603488, lng: -58.382321 },
  { lat: -34.603366, lng: -58.382336 },
  { lat: -34.603289, lng: -58.382468 },
  { lat: -34.603342, lng: -58.382507 },
  { lat: -34.603233, lng: -58.382721 },
  { lat: -34.603129, lng: -58.382919 },
  { lat: -34.602995, lng: -58.383051 },
  { lat: -34.60269, lng: -58.383692 },
  { lat: -34.602643, lng: -58.383693 },
  { lat: -34.602634, lng: -58.383696 },
  { lat: -34.602619, lng: -58.383816 },
  { lat: -34.602484, lng: -58.38413 },
  { lat: -34.602493, lng: -58.384424 },
  { lat: -34.602453, lng: -58.384428 },
  { lat: -34.602477, lng: -58.385034 },
  { lat: -34.602546, lng: -58.385087 },
  { lat: -34.602585, lng: -58.385117 },
  { lat: -34.602592, lng: -58.385199 },
  { lat: -34.602675, lng: -58.385212 },
  { lat: -34.60269, lng: -58.385309 },
  { lat: -34.60274, lng: -58.386459 },
  { lat: -34.602742, lng: -58.386504 },
  { lat: -34.602749, lng: -58.386645 },
  { lat: -34.602763, lng: -58.386775 },
  { lat: -34.60281, lng: -58.38721 },
  { lat: -34.602829, lng: -58.387391 },
  { lat: -34.602882, lng: -58.387879 },
  { lat: -34.60289, lng: -58.387958 },
  { lat: -34.602896, lng: -58.388039 },
  { lat: -34.602997, lng: -58.389364 },
  { lat: -34.603006, lng: -58.38948 },
  { lat: -34.603009, lng: -58.389549 },
  { lat: -34.603067, lng: -58.390751 },
  { lat: -34.603078, lng: -58.390865 },
  { lat: -34.603094, lng: -58.391195 },
  { lat: -34.603124, lng: -58.391554 },
  { lat: -34.603131, lng: -58.391747 },
  { lat: -34.603146, lng: -58.39212 },
  { lat: -34.603153, lng: -58.392284 },
  { lat: -34.603158, lng: -58.392404 },
  { lat: -34.603163, lng: -58.392538 },
  { lat: -34.603213, lng: -58.393919 },
  { lat: -34.603215, lng: -58.393967 },
  { lat: -34.60322, lng: -58.394108 },
  { lat: -34.603268, lng: -58.395342 },
  { lat: -34.603271, lng: -58.395421 },
  { lat: -34.603274, lng: -58.395554 },
  { lat: -34.603284, lng: -58.396026 },
  { lat: -34.603287, lng: -58.396175 },
  { lat: -34.603291, lng: -58.396369 },
  { lat: -34.603297, lng: -58.396667 },
  { lat: -34.603302, lng: -58.39685 },
  { lat: -34.603295, lng: -58.396917 },
  { lat: -34.603299, lng: -58.397035 },
  { lat: -34.603296, lng: -58.398312 },
  { lat: -34.603298, lng: -58.398369 },
  { lat: -34.603302, lng: -58.39851 },
  { lat: -34.603312, lng: -58.398824 },
  { lat: -34.603319, lng: -58.399069 },
  { lat: -34.603327, lng: -58.399355 },
  { lat: -34.603329, lng: -58.399502 },
  { lat: -34.603333, lng: -58.399565 },
  { lat: -34.603342, lng: -58.399663 },
  { lat: -34.603431, lng: -58.400826 },
  { lat: -34.603435, lng: -58.400905 },
  { lat: -34.603432, lng: -58.401027 },
  { lat: -34.603426, lng: -58.401633 },
  { lat: -34.603428, lng: -58.401809 },
  { lat: -34.603427, lng: -58.402021 },
  { lat: -34.603423, lng: -58.40216 },
  { lat: -34.603423, lng: -58.402231 },
  { lat: -34.603419, lng: -58.402347 },
  { lat: -34.603392, lng: -58.403558 },
  { lat: -34.60339, lng: -58.403638 },
  { lat: -34.603386, lng: -58.403739 },
  { lat: -34.603345, lng: -58.405028 },
  { lat: -34.603334, lng: -58.405163 },
  { lat: -34.603312, lng: -58.405335 },
  { lat: -34.603267, lng: -58.405633 },
  { lat: -34.603217, lng: -58.405981 },
  { lat: -34.603173, lng: -58.406256 },
  { lat: -34.60316, lng: -58.406327 },
  { lat: -34.603147, lng: -58.406432 },
  { lat: -34.603026, lng: -58.40729 },
  { lat: -34.603019, lng: -58.407346 },
  { lat: -34.603011, lng: -58.407413 },
  { lat: -34.603002, lng: -58.407499 },
  { lat: -34.602967, lng: -58.408287 },
  { lat: -34.602964, lng: -58.408383 },
  { lat: -34.602958, lng: -58.408459 },
  { lat: -34.603013, lng: -58.408474 },
  { lat: -34.603542, lng: -58.408685 },
  { lat: -34.60327, lng: -58.410047 },
  { lat: -34.603192, lng: -58.410019 },
  { lat: -34.603107, lng: -58.410083 },
  { lat: -34.60303, lng: -58.410465 },
  { lat: -34.60303, lng: -58.410465 },
  { lat: -34.60295, lng: -58.41069 },
  { lat: -34.60303, lng: -58.410465 },
  { lat: -34.603107, lng: -58.410083 },
  { lat: -34.603192, lng: -58.410019 },
  { lat: -34.60327, lng: -58.410047 },
  { lat: -34.603283, lng: -58.409982 },
  { lat: -34.60331, lng: -58.40999 },
  { lat: -34.603283, lng: -58.409982 },
  { lat: -34.603542, lng: -58.408685 },
  { lat: -34.603013, lng: -58.408474 },
  { lat: -34.602958, lng: -58.408459 },
  { lat: -34.602875, lng: -58.408427 },
  { lat: -34.602028, lng: -58.408123 },
  { lat: -34.601976, lng: -58.408103 },
  { lat: -34.601628, lng: -58.407969 },
  { lat: -34.60167, lng: -58.40781 },
];

export const buenosAiresTango: Area = {
  id: "buenos-aires-tango",
  name: "Tango: From La Boca to the World",
  city: "Buenos Aires",
  description:
    "From the painted tenements of La Boca to the cafés of Avenida de Mayo, the dance halls of Corrientes and Carlos Gardel's own barrio, follow tango from immigrant street music to Argentina's national art form, and find out why the whole world still dances it.",
  estimatedDurationMin: 180,
  estimatedDistanceKm: 11.5,
  difficulty: "moderate",
  accessNote:
    "About 11.5 km, flat, from Caminito in La Boca to the Gardel Museum in the Abasto. Walk in daylight and stay on the main streets between La Boca and San Telmo. Subte line B (Carlos Pellegrini to Carlos Gardel) can replace the last 3 km along Corrientes.",
  isContentComplete: true,
  enableInteractiveGuide: true,
  sequentialStops: true,
  image: require("../../../assets/tours/buenos-aires-tango.jpg"),
  price: { singleTour: 0.99 },
  startingPoint: {
    lat: -34.63935,
    lng: -58.36125,
    label: "Vuelta de Rocha, by Caminito, La Boca",
  },
  route: [
    {
      id: "ba-tango-vuelta-de-rocha",
      order: 1,
      name: "Vuelta de Rocha: the immigrants' port",
      coordinates: { lat: -34.63935, lng: -58.36125 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 69,
        audioSource: require("../../../assets/audio/buenos-aires-tango/01-vuelta-de-rocha.mp3"),
        scriptText: `Buen día, and welcome to La Boca. On this walk we'll follow tango, from the immigrant neighbourhoods by the river to the dance halls of the city centre, and finally to the barrio where its greatest voice, Carlos Gardel, grew up.

This bend in the river is the Vuelta de Rocha, on the Riachuelo, the little river that flows into the River Plate. In the late nineteenth century this was the city's port, and La Boca was where many immigrants landed and stayed, above all Italians from around Genoa, who worked in the shipyards, the warehouses and the meat-salting plants.

They built their houses from what they could find, planks and corrugated iron, and, so the story goes, painted them with paint left over from the ships. That's why the colours around you are so bright. Families crammed into conventillos, tenements where a whole family lived in one room, and everyone shared one courtyard, one washroom and one kitchen.

In a city where men far outnumbered women, where people from a dozen countries were thrown together, and where the old creole music of the countryside met the songs of Italy and Spain, a new kind of music was taking shape.

Now walk a few steps into the narrow, colourful lane just behind you: Caminito.`,
      },
    },
    {
      id: "ba-tango-caminito",
      order: 2,
      name: "Caminito: the street named after a tango",
      coordinates: { lat: -34.63936, lng: -58.36257 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 85,
        audioSource: require("../../../assets/audio/buenos-aires-tango/02-caminito.mp3"),
        scriptText: `This is Caminito, the Little Path, a short, crooked lane where an old railway branch line once ran. It's named after a tango of 1926, with music by Juan de Dios Filiberto, a son of La Boca, and words by the poet Gabino Coria Peñaloza. Funnily enough, the words were inspired by a country path far away, in the province of La Rioja. But Filiberto's music was about a path here in his own neighbourhood, and La Boca claimed the song.

Later, La Boca's most famous painter, Benito Quinquela Martín, who had been left as a baby at an orphanage and adopted by a family here, led his neighbours in clearing this rubbish-strewn strip and turning it into an open-air museum. The Calle Museo Caminito was inaugurated in October 1959.

You'll see couples dancing tango here for the visitors. It's a show, of course, but the roots are real. Early tango lived in the courtyards of the conventillos, on street corners, and in cheap cafés and dance halls on the edge of the city, played by little groups of flute, violin and guitar, and later by the bandoneón, a squeezebox invented in Germany.

The next stretch is the longest, about two and a half kilometres. Stay on the main streets and keep your bag close, as La Boca outside the tourist area isn't the safest part of the city. Head north to Parque Lezama, then up Calle Defensa to Plaza Dorrego, in San Telmo.`,
      },
    },
    {
      id: "ba-tango-plaza-dorrego",
      order: 3,
      name: "Plaza Dorrego: where did tango come from?",
      coordinates: { lat: -34.62049, lng: -58.37178 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 80,
        audioSource: require("../../../assets/audio/buenos-aires-tango/03-plaza-dorrego.mp3"),
        scriptText: `Plaza Dorrego, in San Telmo. On Sunday evenings, once the antiques fair packs up, there's often dancing here, and if you're lucky you'll catch an open-air milonga.

So where did tango come from? The honest answer is that nobody knows exactly, and historians still argue. Most agree that it came together on the poorer edges of Buenos Aires, and across the river in Montevideo, in the 1880s and 90s. Into the mix went the habanera, from Cuba; the milonga, a quick creole song and dance from the countryside; and candombe, the drumming and dancing of Afro-Argentines. These southern neighbourhoods, San Telmo and Monserrat, were home to much of the city's Black community, and some scholars think the very word tango first meant the places where people of African descent gathered to dance.

You'll often hear that tango was born in brothels. Some early tango was certainly played in brothels, and some of the early lyrics were very rude indeed. But many historians now think that story has been exaggerated, and that tango grew just as much in dance halls, cafés, courtyards and street corners. In those early days, men often practised the steps with each other before they dared to dance with women.

Now walk north along Defensa, then turn right along Avenida Independencia to the corner of Balcarce, and the old white building of El Viejo Almacén.`,
      },
    },
    {
      id: "ba-tango-viejo-almacen",
      order: 4,
      name: "El Viejo Almacén: tango goes to Paris",
      coordinates: { lat: -34.61705, lng: -58.37004 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 77,
        audioSource: require("../../../assets/audio/buenos-aires-tango/04-viejo-almacen.mp3"),
        scriptText: `This old corner building, El Viejo Almacén, the Old Store, has had many lives. It probably dates from the late colonial period, though nobody knows exactly when. It's said to have begun as a general store on what was then the edge of town, and in the 1840s it served as a British hospital, where one of the first operations under ether in Buenos Aires was carried out.

But it's famous for tango. In 1969 the singer Edmundo Rivero, known for his deep, dark voice, fell in love with the building and opened it as a tango house, naming it after an old store in the lyrics of a tango. It became one of the best-known tango show venues in the city, and it still is.

Places like this keep tango alive as a spectacle. Some purists turn up their noses, but tango has always been partly a performance, and it was the stage, and above all Paris, that first made it respectable. Around 1913, Paris went mad for tango: there were tango teas, tango fashions, even a shade of orange called tango. Only then did many wealthy families in Buenos Aires, who had looked down on this music of the poor outskirts, decide that it was acceptable after all.

Now walk north towards the Plaza de Mayo, and on along Avenida de Mayo to number 825, the Café Tortoni.`,
      },
    },
    {
      id: "ba-tango-tortoni",
      order: 5,
      name: "Café Tortoni: tango finds its voice",
      coordinates: { lat: -34.60869, lng: -58.37814 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 82,
        audioSource: require("../../../assets/audio/buenos-aires-tango/05-cafe-tortoni.mp3"),
        scriptText: `The Café Tortoni, opened in 1858, is the most famous of the old cafés of Buenos Aires, and cafés matter enormously in the story of tango. They were where musicians played, where lyricists wrote, and where poets met their audiences.

Inside you'll find figures of three regulars sitting at a table: the writer Jorge Luis Borges, the poet Alfonsina Storni, and the singer Carlos Gardel. Down in the old cellar there are tango shows. And upstairs is the National Academy of Tango, founded in 1990 by the poet Horacio Ferrer, who wrote lyrics for Astor Piazzolla. It studies tango's history, and its language.

That language is lunfardo, the slang of the old Buenos Aires underworld and its immigrants, full of Italian words, and words turned back to front. Tango lyrics are full of it. A woman might be a mina; a friend, a gomía, which is amigo backwards; and the city itself is Baires.

Around 1917, tango changed for ever. Gardel recorded 'Mi noche triste', My Sad Night, with words by Pascual Contursi, about a man whose lover has left him. It's often called the first tango-canción: a tango written to be sung and listened to, not just danced. Tango had found its voice.

Now walk north to Avenida Corrientes, and turn right, to number 348.`,
      },
    },
    {
      id: "ba-tango-corrientes-348",
      order: 6,
      name: "Corrientes 348: a sad thought, danced",
      coordinates: { lat: -34.60322, lng: -58.37177 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 76,
        audioSource: require("../../../assets/audio/buenos-aires-tango/06-corrientes-348.mp3"),
        scriptText: `Corrientes 348, second floor, take the lift. If you know your tango, you know that address. It comes from 'A media luz', By Half Light, a tango from 1924, with music by Edgardo Donato and words by Carlos César Lenzi. The song describes a secret love nest at this address, a little flat with soft cushions, a gramophone playing tangos, and the lights kept low. The address is real enough; the love nest, as far as anyone knows, was invented.

'A media luz' became one of the most recorded tangos of all. And it's a rare cheerful one. Most tango songs aren't about happy love at all. They're full of longing: lost loves, lost youth, the old barrio that has disappeared, the mother left behind, the immigrant who will never go home. A famous definition, usually credited to the composer Enrique Santos Discépolo, calls tango 'a sad thought that is danced'.

By the 1920s Buenos Aires had radio, records and cinema, and tango spread through all of them. The orchestras grew bigger, with piano, double bass, violins and a row of bandoneones.

Now walk east down Corrientes, towards the river, to the big arena on the corner: Luna Park.`,
      },
    },
    {
      id: "ba-tango-luna-park",
      order: 7,
      name: "Luna Park: goodbye to Gardel",
      coordinates: { lat: -34.6024, lng: -58.369 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 78,
        audioSource: require("../../../assets/audio/buenos-aires-tango/07-luna-park.mp3"),
        scriptText: `This is Luna Park, an indoor arena opened in the early 1930s for boxing, and later home to concerts and political rallies. It was here, as our Evita tour tells, that Eva Duarte met Juan Perón. But for tango, Luna Park means a funeral.

By the 1930s Carlos Gardel was the biggest star in Latin America, making films for Paramount in France and New York, and singing songs like 'Volver' and 'Por una cabeza'. On the 24th of June 1935, while on tour, his plane collided with another on the runway at Medellín, in Colombia, as it was taking off. Gardel was killed, at the age of forty-four.

His body took months to come home, by sea and over land through several countries. On the 5th of February 1936 it reached Buenos Aires, where huge crowds met it at the port. The coffin was brought here, to Luna Park, and tens of thousands of people filed past through the night. The next day, the funeral procession travelled the length of Corrientes, the tango street, to the Chacarita cemetery.

It was the moment Gardel stopped being a man and became a myth. We'll meet the young Gardel at the end of this walk.

Now walk back west along Corrientes, past the theatres, and turn left into Calle Suipacha, to the Confitería Ideal.`,
      },
    },
    {
      id: "ba-tango-ideal",
      order: 8,
      name: "Confitería Ideal: the milonga",
      coordinates: { lat: -34.60389, lng: -58.37973 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 74,
        audioSource: require("../../../assets/audio/buenos-aires-tango/08-confiteria-ideal.mp3"),
        scriptText: `The Confitería Ideal opened in 1912, founded by a Spanish immigrant as an elegant tea room, all marble, stained glass and polished wood. From the 1970s, its upstairs hall became one of the best-known milongas in Buenos Aires. After years of decline it closed in 2017, was carefully restored, and reopened in 2022.

A milonga is two things: a lively, quick dance in the tango family, and a place, an evening where people come to dance tango socially. And milongas have their own unwritten rules. You don't usually walk up and ask a stranger to dance. Instead you catch their eye across the room and give a little nod, and if they nod back, it's agreed. That's the cabeceo. The music comes in sets of three or four tangos, called tandas, separated by a short burst of different music, the cortina, or curtain, when everyone leaves the floor. And the couples travel around the room anticlockwise, like a slow river.

The dance itself is improvised. The two partners move inside an embrace, the abrazo, one proposing each step, the other answering, a conversation without words.

Now go back to Corrientes and walk west to the great white needle: the Obelisco.`,
      },
    },
    {
      id: "ba-tango-obelisco",
      order: 9,
      name: "The Obelisco: the Golden Age, and Piazzolla",
      coordinates: { lat: -34.60371, lng: -58.38163 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 89,
        audioSource: require("../../../assets/audio/buenos-aires-tango/09-obelisco-corrientes.mp3"),
        scriptText: `The Obelisco went up in 1936, the same year Avenida Corrientes was opened up into a broad avenue. Corrientes was the street that never slept, the heart of theatres, cinemas and nightlife, and in tango's Golden Age, from the late 1930s to the mid-1950s, it was lined with cabarets, cafés and dance halls where the great orchestras played.

The orchestras were the stars. In the mid-1930s Juan D'Arienzo, the King of the Beat, brought back a fast, driving rhythm that sent dancers flooding back onto the floor. Then came Aníbal Troilo, the beloved Pichuco, on bandoneón; the smooth, elegant Carlos Di Sarli; and Osvaldo Pugliese, dramatic and powerful.

From the late 1950s tango faded, as young people turned to rock and the big orchestras became too expensive. And Astor Piazzolla, who had played bandoneón for Troilo, mixed tango with jazz and classical music into what became known as nuevo tango. Traditionalists hated it. Today pieces like 'Adiós Nonino' and 'Libertango' are played all over the world. Then, in 1983, a stage show called 'Tango Argentino' opened in Paris, and later on Broadway, and the world fell in love with tango all over again.

From here it's three kilometres west along Corrientes to the Abasto. You can walk, or take Subte line B from Carlos Pellegrini station to Carlos Gardel station. Head for the huge market building on the corner of Anchorena.`,
      },
    },
    {
      id: "ba-tango-abasto",
      order: 10,
      name: "The Abasto: the boy from the market",
      coordinates: { lat: -34.60295, lng: -58.41069 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 76,
        audioSource: require("../../../assets/audio/buenos-aires-tango/10-mercado-de-abasto.mp3"),
        scriptText: `This enormous Art Deco building was the Mercado de Abasto, the city's central wholesale market for fruit and vegetables. This building opened in 1934, replacing an older market here from the 1890s. Today it's a shopping centre, but for decades the market made the whole barrio, the Abasto, a place of porters, traders, cafés and all-night bars.

Carlos Gardel grew up here. He was born in Toulouse, in France, in 1890, the son of an unmarried laundress, Berthe Gardès, who brought him to Buenos Aires in 1893, when he was two. Years later, Gardel registered himself as born in Uruguay, probably to get round French military service, and many Uruguayans still claim him as their own. But the French records point firmly to Toulouse.

Berthe worked ironing clothes, and young Carlos ran about these streets, sang in the cafés and at parties, and earned the nickname that stuck to him all his life: El Morocho del Abasto, the dark-haired boy from the Abasto.

By the 1910s he was singing folk songs in a duo with José Razzano, and then came 'Mi noche triste', and tango.

Now walk back east along Corrientes, a few steps, to the pedestrian lane called the Pasaje Carlos Gardel, and his bronze statue.`,
      },
    },
    {
      id: "ba-tango-pasaje-gardel",
      order: 11,
      name: "Pasaje Carlos Gardel: the smile",
      coordinates: { lat: -34.60331, lng: -58.40999 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 67,
        audioSource: require("../../../assets/audio/buenos-aires-tango/11-pasaje-carlos-gardel.mp3"),
        scriptText: `Here he is: Carlos Gardel, in bronze, with that famous smile, by the sculptor Mariano Pagés. The statue went up in 2000, and Congress even passed a law to settle where it should stand. The answer, of course, was here, in his old barrio.

Gardel was far more than a singer. He was one of the first great stars of Spanish-language sound films. In the early 1930s he made films in France and the United States, and the songs he wrote with his lyricist, Alfredo Le Pera, who died with him at Medellín, are still sung everywhere: 'Mi Buenos Aires querido', 'Volver', 'Por una cabeza', 'El día que me quieras'. 'Volver' is about coming home after twenty years away, and it speaks for a whole continent of migrants.

People in Buenos Aires say 'Gardel canta cada día mejor': Gardel sings better every day. And if someone does something brilliantly, you might hear 'sos Gardel', you're Gardel.

Finally, walk a couple of blocks east to Calle Jean Jaurès, and up it to number 735, the house where Gardel lived with his mother.`,
      },
    },
    {
      id: "ba-tango-museo-gardel",
      order: 12,
      name: "Museo Casa Carlos Gardel: why tango endures",
      coordinates: { lat: -34.60167, lng: -58.40781 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 70,
        audioSource: require("../../../assets/audio/buenos-aires-tango/12-museo-casa-gardel.mp3"),
        scriptText: `This modest house, at Jean Jaurès 735, is where Carlos Gardel lived with his mother. He bought it in 1927, when he was already famous, and it was their home until his travels took him abroad. Berthe stayed on. Today it's the Museo Casa Carlos Gardel, opened in 2003, with his records, photographs and belongings.

Gardel never came back here. Berthe was in Buenos Aires when the news of Medellín arrived, in June 1935, and she outlived her son by eight years.

So why has tango lasted? Perhaps because it began as the music of people who had lost something: the immigrant far from home, the country boy in the big city, the lover left behind. That's a feeling everyone knows. And the dance is an embrace, two people improvising together, step by step.

In 2009 UNESCO added tango to its list of the Intangible Cultural Heritage of Humanity, nominated jointly by Argentina and Uruguay, a reminder that it was born on both banks of the river. Today there are milongas from Tokyo to Berlin to Istanbul, and it all began in streets like these.

Thank you for walking with me. ¡Chau!`,
      },
    },
  ],
  path,
};

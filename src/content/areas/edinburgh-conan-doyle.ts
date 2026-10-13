import type { Area } from "../schema";

/**
 * Arthur Conan Doyle's Edinburgh, and the real teacher behind Sherlock Holmes:
 * his birthplace and the Holmes statue at Picardy Place, his first published
 * story (Chambers's Journal, 339 High Street), the medical school, Joseph
 * Bell's out-patient clinic, the family homes, and on to A Study in Scarlet.
 * Researched October 2026.
 *
 * Conan Doyle's own words come from his memoir, Memories and Adventures
 * (1924; Internet Archive "memoriesadventur0000doyl", text checked against
 * the scan's OCR): Picardy Place and the Huguenots; Bell's appearance, the
 * out-patient clerkship and the Barbados diagnosis ("To his audience of
 * Watsons..."); Rutherford as Professor Challenger; Turner and the snowball
 * fight; "three guineas" from Chambers's; the whaler Hope ("a big, straggling
 * youth..."). His letter to Bell of 4 May 1892 from the Arthur Conan Doyle
 * Encyclopedia. "You have been in Afghanistan, I perceive" from A Study in
 * Scarlet (Project Gutenberg #244). Other sources: Wikipedia (Arthur Conan
 * Doyle, Joseph Bell, Deerstalker, William Chambers), the Arthur Conan Doyle
 * Encyclopedia (his Edinburgh homes), City of Edinburgh Council and STV (the
 * statue's return, 13 Sept 2023), the Royal College of Surgeons of Edinburgh
 * (Bell's fellowship and presidency, the museum), Historic Environment
 * Scotland (the Chambers statue), Lothian Health Services Archive (the
 * infirmary's move in 1879), Guinness World Records (most portrayed human
 * literary character, 2012), Surgeons' Hall Museums (opening hours).
 *
 * Where sources disagree, the scripts avoid the disputed detail or say so:
 *  - When he became Bell's clerk: 1877 or 1878, so at the old infirmary on
 *    Infirmary Street or the new one at Lauriston Place (moved 1879). Both
 *    sites are stops; the script says the date is uncertain.
 *  - 3 Sciennes Hill Place (from 1867 or 1868) is left out of the route.
 *  - W. & R. Chambers's 339 High Street: the number isn't mapped; 343 is, so
 *    the stop is beside it on the north side of the street.
 *  - "Royal Mile connections" beyond Chambers's are thin; the tour doesn't
 *    invent any.
 *
 * Stops and the walking path come from OpenStreetMap (the statue and plaque
 * are mapped there; addresses via Nominatim; the path routed along OSM
 * footways by the FOSSGIS foot router). Accurate to a few metres, not
 * surveyed: walk the route once before promoting it.
 *
 * Narration: these recordings are TEMPORARY, made with Google text-to-speech
 * in Professor Hoot's "Ask your guide" voice (en-GB-Standard-A). Replace them
 * with the original narrator's ElevenLabs voice, same file names.
 *
 * Cover: Sidney Paget's illustration for "Silver Blaze" (The Strand, 1892),
 * public domain.
 */

/** Picardy Place → St Mary's Cathedral → Little King Street and Cockburn
 * Street → the High Street → down to the Cowgate and Infirmary Street → South
 * Bridge and Nicolson Street (Surgeons' Hall) → Old College → Chambers Street
 * → Forrest Road and Middle Meadow Walk → George Square → Lauriston Place →
 * the old infirmary grounds and the Meadows → Lonsdale Terrace. About 4 km. */
const path = [
  { lat: 55.956595, lng: -3.186946 },
  { lat: 55.956593, lng: -3.186945 },
  { lat: 55.956591, lng: -3.186946 },
  { lat: 55.95659, lng: -3.186949 },
  { lat: 55.956589, lng: -3.186952 },
  { lat: 55.956447, lng: -3.18686 },
  { lat: 55.956324, lng: -3.186828 },
  { lat: 55.956255, lng: -3.186831 },
  { lat: 55.956009, lng: -3.186784 },
  { lat: 55.956008, lng: -3.186846 },
  { lat: 55.956003, lng: -3.186933 },
  { lat: 55.956032, lng: -3.186992 },
  { lat: 55.956031, lng: -3.187039 },
  { lat: 55.956023, lng: -3.187109 },
  { lat: 55.956014, lng: -3.187167 },
  { lat: 55.956007, lng: -3.187208 },
  { lat: 55.955996, lng: -3.187241 },
  { lat: 55.955973, lng: -3.187279 },
  { lat: 55.955904, lng: -3.187374 },
  { lat: 55.955929, lng: -3.187429 },
  { lat: 55.955938, lng: -3.187448 },
  { lat: 55.95595, lng: -3.187474 },
  { lat: 55.955973, lng: -3.187525 },
  { lat: 55.95595, lng: -3.187474 },
  { lat: 55.955938, lng: -3.187448 },
  { lat: 55.955929, lng: -3.187429 },
  { lat: 55.955904, lng: -3.187374 },
  { lat: 55.955973, lng: -3.187279 },
  { lat: 55.955996, lng: -3.187241 },
  { lat: 55.956007, lng: -3.187208 },
  { lat: 55.956014, lng: -3.187167 },
  { lat: 55.956023, lng: -3.187109 },
  { lat: 55.955963, lng: -3.187028 },
  { lat: 55.955825, lng: -3.186979 },
  { lat: 55.955724, lng: -3.18698 },
  { lat: 55.955646, lng: -3.186986 },
  { lat: 55.955558, lng: -3.186988 },
  { lat: 55.95525, lng: -3.187076 },
  { lat: 55.955008, lng: -3.18716 },
  { lat: 55.954839, lng: -3.187192 },
  { lat: 55.95475, lng: -3.187248 },
  { lat: 55.954626, lng: -3.187356 },
  { lat: 55.954529, lng: -3.187449 },
  { lat: 55.954412, lng: -3.187604 },
  { lat: 55.954298, lng: -3.187756 },
  { lat: 55.954069, lng: -3.18818 },
  { lat: 55.953999, lng: -3.188324 },
  { lat: 55.953958, lng: -3.188402 },
  { lat: 55.953921, lng: -3.188461 },
  { lat: 55.953856, lng: -3.188547 },
  { lat: 55.953784, lng: -3.18861 },
  { lat: 55.953686, lng: -3.188639 },
  { lat: 55.953642, lng: -3.188651 },
  { lat: 55.953634, lng: -3.188654 },
  { lat: 55.953615, lng: -3.188657 },
  { lat: 55.953595, lng: -3.188663 },
  { lat: 55.953579, lng: -3.188669 },
  { lat: 55.95356, lng: -3.188677 },
  { lat: 55.953539, lng: -3.18869 },
  { lat: 55.953524, lng: -3.188698 },
  { lat: 55.953513, lng: -3.188712 },
  { lat: 55.953502, lng: -3.188733 },
  { lat: 55.953493, lng: -3.18876 },
  { lat: 55.953484, lng: -3.188791 },
  { lat: 55.953445, lng: -3.189014 },
  { lat: 55.953414, lng: -3.189133 },
  { lat: 55.953387, lng: -3.189299 },
  { lat: 55.953369, lng: -3.189415 },
  { lat: 55.953337, lng: -3.189613 },
  { lat: 55.953335, lng: -3.18963 },
  { lat: 55.953318, lng: -3.18972 },
  { lat: 55.953317, lng: -3.189768 },
  { lat: 55.953316, lng: -3.189789 },
  { lat: 55.953093, lng: -3.191049 },
  { lat: 55.953063, lng: -3.191112 },
  { lat: 55.953042, lng: -3.191185 },
  { lat: 55.953003, lng: -3.191176 },
  { lat: 55.952987, lng: -3.191168 },
  { lat: 55.952934, lng: -3.19114 },
  { lat: 55.952905, lng: -3.191123 },
  { lat: 55.952885, lng: -3.191114 },
  { lat: 55.952876, lng: -3.191165 },
  { lat: 55.952861, lng: -3.191257 },
  { lat: 55.952833, lng: -3.191423 },
  { lat: 55.952819, lng: -3.191505 },
  { lat: 55.952786, lng: -3.1917 },
  { lat: 55.952751, lng: -3.191813 },
  { lat: 55.952741, lng: -3.191855 },
  { lat: 55.95273, lng: -3.191885 },
  { lat: 55.95272, lng: -3.191908 },
  { lat: 55.952706, lng: -3.191933 },
  { lat: 55.952691, lng: -3.191954 },
  { lat: 55.952674, lng: -3.191972 },
  { lat: 55.952659, lng: -3.191985 },
  { lat: 55.952645, lng: -3.191993 },
  { lat: 55.952634, lng: -3.191998 },
  { lat: 55.952622, lng: -3.191999 },
  { lat: 55.952614, lng: -3.191999 },
  { lat: 55.952592, lng: -3.191995 },
  { lat: 55.952577, lng: -3.19199 },
  { lat: 55.952562, lng: -3.191984 },
  { lat: 55.952443, lng: -3.191925 },
  { lat: 55.952382, lng: -3.191894 },
  { lat: 55.952338, lng: -3.191872 },
  { lat: 55.952273, lng: -3.19184 },
  { lat: 55.952156, lng: -3.191782 },
  { lat: 55.951927, lng: -3.191673 },
  { lat: 55.951746, lng: -3.191588 },
  { lat: 55.951534, lng: -3.191487 },
  { lat: 55.951141, lng: -3.191301 },
  { lat: 55.951011, lng: -3.191237 },
  { lat: 55.950999, lng: -3.191384 },
  { lat: 55.950966, lng: -3.191375 },
  { lat: 55.9509, lng: -3.191355 },
  { lat: 55.950808, lng: -3.191294 },
  { lat: 55.950791, lng: -3.191282 },
  { lat: 55.950762, lng: -3.191259 },
  { lat: 55.950736, lng: -3.191228 },
  { lat: 55.950694, lng: -3.191179 },
  { lat: 55.950672, lng: -3.191145 },
  { lat: 55.950653, lng: -3.191105 },
  { lat: 55.950619, lng: -3.191013 },
  { lat: 55.950575, lng: -3.191015 },
  { lat: 55.950528, lng: -3.190995 },
  { lat: 55.950214, lng: -3.190861 },
  { lat: 55.950143, lng: -3.190831 },
  { lat: 55.950137, lng: -3.190866 },
  { lat: 55.950129, lng: -3.190862 },
  { lat: 55.950057, lng: -3.19083 },
  { lat: 55.95005, lng: -3.190827 },
  { lat: 55.950048, lng: -3.190848 },
  { lat: 55.950028, lng: -3.190995 },
  { lat: 55.949987, lng: -3.19106 },
  { lat: 55.94998, lng: -3.191077 },
  { lat: 55.949975, lng: -3.191088 },
  { lat: 55.949966, lng: -3.191109 },
  { lat: 55.949896, lng: -3.191073 },
  { lat: 55.949816, lng: -3.191032 },
  { lat: 55.949731, lng: -3.190985 },
  { lat: 55.949755, lng: -3.190809 },
  { lat: 55.949761, lng: -3.190766 },
  { lat: 55.949786, lng: -3.190531 },
  { lat: 55.949814, lng: -3.190281 },
  { lat: 55.949826, lng: -3.190157 },
  { lat: 55.949839, lng: -3.190046 },
  { lat: 55.949876, lng: -3.189749 },
  { lat: 55.949893, lng: -3.189618 },
  { lat: 55.949926, lng: -3.189366 },
  { lat: 55.949787, lng: -3.1893 },
  { lat: 55.949777, lng: -3.189295 },
  { lat: 55.949684, lng: -3.18925 },
  { lat: 55.949676, lng: -3.189246 },
  { lat: 55.949582, lng: -3.189198 },
  { lat: 55.949567, lng: -3.18919 },
  { lat: 55.949425, lng: -3.189117 },
  { lat: 55.949383, lng: -3.189113 },
  { lat: 55.949264, lng: -3.189058 },
  { lat: 55.949253, lng: -3.189036 },
  { lat: 55.949202, lng: -3.189009 },
  { lat: 55.949209, lng: -3.188958 },
  { lat: 55.949182, lng: -3.188876 },
  { lat: 55.949164, lng: -3.188784 },
  { lat: 55.949177, lng: -3.188704 },
  { lat: 55.949129, lng: -3.188675 },
  { lat: 55.94909, lng: -3.188652 },
  { lat: 55.949002, lng: -3.188604 },
  { lat: 55.948891, lng: -3.188273 },
  { lat: 55.948853, lng: -3.188255 },
  { lat: 55.948826, lng: -3.188242 },
  { lat: 55.948852, lng: -3.188013 },
  { lat: 55.948631, lng: -3.187918 },
  { lat: 55.948655, lng: -3.187625 },
  { lat: 55.948672, lng: -3.187317 },
  { lat: 55.948682, lng: -3.187283 },
  { lat: 55.9487, lng: -3.187081 },
  { lat: 55.948756, lng: -3.186727 },
  { lat: 55.948792, lng: -3.186484 },
  { lat: 55.94884, lng: -3.186164 },
  { lat: 55.948463, lng: -3.185948 },
  { lat: 55.948087, lng: -3.185844 },
  { lat: 55.948029, lng: -3.185826 },
  { lat: 55.948043, lng: -3.185767 },
  { lat: 55.948102, lng: -3.185603 },
  { lat: 55.948043, lng: -3.185767 },
  { lat: 55.948029, lng: -3.185826 },
  { lat: 55.948006, lng: -3.185939 },
  { lat: 55.947982, lng: -3.186071 },
  { lat: 55.947962, lng: -3.18619 },
  { lat: 55.94794, lng: -3.186325 },
  { lat: 55.947922, lng: -3.186434 },
  { lat: 55.947869, lng: -3.186404 },
  { lat: 55.947657, lng: -3.186294 },
  { lat: 55.947585, lng: -3.186257 },
  { lat: 55.947516, lng: -3.186221 },
  { lat: 55.947189, lng: -3.186056 },
  { lat: 55.947143, lng: -3.186036 },
  { lat: 55.947045, lng: -3.18598 },
  { lat: 55.946892, lng: -3.185882 },
  { lat: 55.946809, lng: -3.185825 },
  { lat: 55.946725, lng: -3.185759 },
  { lat: 55.946662, lng: -3.1857 },
  { lat: 55.946704, lng: -3.18556 },
  { lat: 55.946711, lng: -3.185537 },
  { lat: 55.946719, lng: -3.185512 },
  { lat: 55.946725, lng: -3.185496 },
  { lat: 55.946666, lng: -3.185432 },
  { lat: 55.946557, lng: -3.185325 },
  { lat: 55.946499, lng: -3.185276 },
  { lat: 55.946514, lng: -3.185226 },
  { lat: 55.946614, lng: -3.184903 },
  { lat: 55.946625, lng: -3.184911 },
  { lat: 55.946636, lng: -3.184913 },
  { lat: 55.946648, lng: -3.184908 },
  { lat: 55.946657, lng: -3.184897 },
  { lat: 55.946665, lng: -3.184881 },
  { lat: 55.946669, lng: -3.184861 },
  { lat: 55.94667, lng: -3.184841 },
  { lat: 55.946687, lng: -3.184804 },
  { lat: 55.94667, lng: -3.184841 },
  { lat: 55.946669, lng: -3.184861 },
  { lat: 55.946665, lng: -3.184881 },
  { lat: 55.946657, lng: -3.184897 },
  { lat: 55.946648, lng: -3.184908 },
  { lat: 55.946636, lng: -3.184913 },
  { lat: 55.946625, lng: -3.184911 },
  { lat: 55.946614, lng: -3.184903 },
  { lat: 55.946514, lng: -3.185226 },
  { lat: 55.946499, lng: -3.185276 },
  { lat: 55.946557, lng: -3.185325 },
  { lat: 55.946666, lng: -3.185432 },
  { lat: 55.946725, lng: -3.185496 },
  { lat: 55.946719, lng: -3.185512 },
  { lat: 55.946711, lng: -3.185537 },
  { lat: 55.946704, lng: -3.18556 },
  { lat: 55.946662, lng: -3.1857 },
  { lat: 55.946725, lng: -3.185759 },
  { lat: 55.946809, lng: -3.185825 },
  { lat: 55.946892, lng: -3.185882 },
  { lat: 55.947045, lng: -3.18598 },
  { lat: 55.947143, lng: -3.186036 },
  { lat: 55.947189, lng: -3.186056 },
  { lat: 55.947516, lng: -3.186221 },
  { lat: 55.947496, lng: -3.186347 },
  { lat: 55.94749, lng: -3.186386 },
  { lat: 55.947465, lng: -3.186534 },
  { lat: 55.947455, lng: -3.186594 },
  { lat: 55.947441, lng: -3.186681 },
  { lat: 55.947438, lng: -3.186703 },
  { lat: 55.94739, lng: -3.186679 },
  { lat: 55.947379, lng: -3.186675 },
  { lat: 55.947373, lng: -3.186675 },
  { lat: 55.947367, lng: -3.186676 },
  { lat: 55.94736, lng: -3.18668 },
  { lat: 55.947353, lng: -3.186686 },
  { lat: 55.947348, lng: -3.186693 },
  { lat: 55.947343, lng: -3.186703 },
  { lat: 55.947338, lng: -3.186717 },
  { lat: 55.947335, lng: -3.186733 },
  { lat: 55.947297, lng: -3.186953 },
  { lat: 55.947214, lng: -3.187442 },
  { lat: 55.947178, lng: -3.187654 },
  { lat: 55.947178, lng: -3.187674 },
  { lat: 55.947181, lng: -3.187693 },
  { lat: 55.947187, lng: -3.187712 },
  { lat: 55.947193, lng: -3.187724 },
  { lat: 55.947199, lng: -3.187734 },
  { lat: 55.94719, lng: -3.187788 },
  { lat: 55.947188, lng: -3.187794 },
  { lat: 55.947177, lng: -3.187843 },
  { lat: 55.947142, lng: -3.188017 },
  { lat: 55.947132, lng: -3.188082 },
  { lat: 55.947365, lng: -3.188213 },
  { lat: 55.9474, lng: -3.188233 },
  { lat: 55.947643, lng: -3.188363 },
  { lat: 55.947553, lng: -3.188837 },
  { lat: 55.947613, lng: -3.188879 },
  { lat: 55.947409, lng: -3.189805 },
  { lat: 55.947389, lng: -3.189896 },
  { lat: 55.947334, lng: -3.189857 },
  { lat: 55.947102, lng: -3.190948 },
  { lat: 55.947037, lng: -3.191247 },
  { lat: 55.946861, lng: -3.191134 },
  { lat: 55.946788, lng: -3.191088 },
  { lat: 55.946649, lng: -3.191039 },
  { lat: 55.946616, lng: -3.191029 },
  { lat: 55.946582, lng: -3.19102 },
  { lat: 55.946527, lng: -3.191011 },
  { lat: 55.946461, lng: -3.191012 },
  { lat: 55.946376, lng: -3.191013 },
  { lat: 55.94633, lng: -3.191013 },
  { lat: 55.946267, lng: -3.191 },
  { lat: 55.946187, lng: -3.191019 },
  { lat: 55.946004, lng: -3.191062 },
  { lat: 55.945591, lng: -3.19116 },
  { lat: 55.945557, lng: -3.191157 },
  { lat: 55.945526, lng: -3.191148 },
  { lat: 55.945498, lng: -3.191133 },
  { lat: 55.945475, lng: -3.191116 },
  { lat: 55.945453, lng: -3.191094 },
  { lat: 55.945438, lng: -3.191075 },
  { lat: 55.945426, lng: -3.191091 },
  { lat: 55.945378, lng: -3.191155 },
  { lat: 55.945354, lng: -3.19114 },
  { lat: 55.945325, lng: -3.19112 },
  { lat: 55.94529, lng: -3.191117 },
  { lat: 55.945281, lng: -3.191116 },
  { lat: 55.945269, lng: -3.191198 },
  { lat: 55.945243, lng: -3.19121 },
  { lat: 55.944993, lng: -3.191232 },
  { lat: 55.9449, lng: -3.191241 },
  { lat: 55.944627, lng: -3.191262 },
  { lat: 55.944195, lng: -3.191295 },
  { lat: 55.943947, lng: -3.191314 },
  { lat: 55.943957, lng: -3.191054 },
  { lat: 55.943957, lng: -3.190999 },
  { lat: 55.944012, lng: -3.190544 },
  { lat: 55.943438, lng: -3.190257 },
  { lat: 55.94339, lng: -3.190231 },
  { lat: 55.943438, lng: -3.190257 },
  { lat: 55.944012, lng: -3.190544 },
  { lat: 55.943957, lng: -3.190999 },
  { lat: 55.943957, lng: -3.191054 },
  { lat: 55.943947, lng: -3.191314 },
  { lat: 55.944195, lng: -3.191295 },
  { lat: 55.944627, lng: -3.191262 },
  { lat: 55.944632, lng: -3.191542 },
  { lat: 55.944668, lng: -3.191538 },
  { lat: 55.944691, lng: -3.191538 },
  { lat: 55.944693, lng: -3.191507 },
  { lat: 55.944888, lng: -3.191569 },
  { lat: 55.945104, lng: -3.191651 },
  { lat: 55.945164, lng: -3.191672 },
  { lat: 55.945172, lng: -3.191676 },
  { lat: 55.945164, lng: -3.191741 },
  { lat: 55.945045, lng: -3.192724 },
  { lat: 55.944792, lng: -3.192631 },
  { lat: 55.945045, lng: -3.192724 },
  { lat: 55.94502, lng: -3.192944 },
  { lat: 55.944994, lng: -3.193172 },
  { lat: 55.944891, lng: -3.194106 },
  { lat: 55.944876, lng: -3.19423 },
  { lat: 55.944753, lng: -3.194201 },
  { lat: 55.944719, lng: -3.194666 },
  { lat: 55.944542, lng: -3.194634 },
  { lat: 55.944518, lng: -3.195042 },
  { lat: 55.944334, lng: -3.194998 },
  { lat: 55.944062, lng: -3.194933 },
  { lat: 55.944029, lng: -3.194925 },
  { lat: 55.944025, lng: -3.195015 },
  { lat: 55.944015, lng: -3.195187 },
  { lat: 55.943736, lng: -3.195126 },
  { lat: 55.943724, lng: -3.195306 },
  { lat: 55.94343, lng: -3.195237 },
  { lat: 55.943399, lng: -3.195714 },
  { lat: 55.943344, lng: -3.195703 },
  { lat: 55.943315, lng: -3.195698 },
  { lat: 55.943307, lng: -3.195817 },
  { lat: 55.943251, lng: -3.196474 },
  { lat: 55.943223, lng: -3.196833 },
  { lat: 55.943211, lng: -3.197044 },
  { lat: 55.943248, lng: -3.197053 },
  { lat: 55.943239, lng: -3.197178 },
  { lat: 55.942574, lng: -3.19683 },
  { lat: 55.942478, lng: -3.196778 },
  { lat: 55.94238, lng: -3.196762 },
  { lat: 55.942336, lng: -3.197702 },
  { lat: 55.94228, lng: -3.198545 },
  { lat: 55.942368, lng: -3.198584 },
  { lat: 55.942412, lng: -3.198609 },
  { lat: 55.942443, lng: -3.198281 },
];

export const edinburghConanDoyle: Area = {
  id: "edinburgh-conan-doyle",
  name: "Sherlock Holmes & Conan Doyle",
  city: "Edinburgh",
  description:
    "Arthur Conan Doyle's Edinburgh and the real man behind Sherlock Holmes: his birthplace and the Holmes statue, his first published story, the medical school, and the surgeon Joseph Bell, whose dazzling deductions he watched as a student.",
  estimatedDurationMin: 75,
  estimatedDistanceKm: 4.1,
  difficulty: "moderate",
  accessNote:
    "Surgeons' Hall Museums are open daily with a ticket. The route has steep closes between the High Street and the Cowgate.",
  isContentComplete: true,
  enableInteractiveGuide: true,
  image: require("../../../assets/tours/edinburgh-conan-doyle.jpg"),
  price: { singleTour: 4.99 },
  startingPoint: {
    lat: 55.956594,
    lng: -3.186953,
    label: "Picardy Place, by the Sherlock Holmes statue",
  },
  route: [
    {
      id: "picardy-place",
      order: 1,
      name: "Picardy Place: where it began",
      coordinates: { lat: 55.956594, lng: -3.186953 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 72,
        audioSource: require("../../../assets/audio/edinburgh-conan-doyle/01-picardy-place.mp3"),
        scriptText: `Good day, and welcome. On this walk we'll follow Arthur Conan Doyle, the Edinburgh doctor who created the most famous detective in the world, and find the real man in this city who taught him how Sherlock Holmes should think.

We start with Holmes himself. This bronze statue, by the sculptor Gerald Laing, has stood near this spot since 1991. It was taken away in 2018 while the tram line was built, restored, and brought back to this new island in 2023. And there's a joke hidden in it: Conan Doyle never actually wrote the word "deerstalker." Holmes's famous hat came from the illustrator Sidney Paget.

Look for a plaque nearby, too. Conan Doyle was born close to this spot, on the 22nd of May 1859, at 11 Picardy Place. The house was demolished long ago, but in his memoirs he remembered that the street was "so named because in old days a colony of French Huguenots had settled there."

He grew up in a loving but struggling family, and in an Edinburgh that would give him almost everything Holmes needed: a sharp eye, a scientific training, and a teacher who seemed to read minds.

Now walk round to St Mary's Cathedral, the Catholic cathedral just beside you.`,
      },
    },
    {
      id: "st-marys-cathedral",
      order: 2,
      name: "St Mary's Cathedral: a Catholic family in Edinburgh",
      coordinates: { lat: 55.95601, lng: -3.1877 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 73,
        audioSource: require("../../../assets/audio/edinburgh-conan-doyle/02-st-marys-cathedral.mp3"),
        scriptText: `This is St Mary's, Edinburgh's Roman Catholic cathedral, and it's where the baby was baptised. The register records him as "Arthur Ignatius Conan," with plain "Doyle" as his surname. Conan Doyle as one name came later.

His family were Irish Catholics. His grandfather, John Doyle, was a celebrated London caricaturist who signed his work "H.B." His father, Charles Altamont Doyle, came to Edinburgh as a young man to work for the Office of Works, and was a gifted, dreamy artist. But Charles drank heavily, his health broke down, and he spent his last years in institutions, dying in a hospital in Dumfries in 1893.

That left the family short of money, and moving from flat to flat across the Southside of the city. It was Arthur's mother, Mary, who held them together. She was a great teller of stories, and he adored her.

At nine he was sent away to Jesuit boarding schools in England, and then for a year to Austria. He came home to Edinburgh at seventeen, to study medicine, and to help support his mother and sisters.

Now we head south into the Old Town. Follow the route down to Cockburn Street, and up through the closes to the High Street.`,
      },
    },
    {
      id: "chambers-journal",
      order: 3,
      name: "339 High Street: the first story",
      coordinates: { lat: 55.94985, lng: -3.19085 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 69,
        audioSource: require("../../../assets/audio/edinburgh-conan-doyle/03-chambers-journal.mp3"),
        scriptText: `We're now on the Royal Mile, and along this side of the High Street, at number 339, stood the offices of W. and R. Chambers, one of Edinburgh's great publishers. They were here from 1841, and their weekly magazine was Chambers's Journal.

In 1879, a medical student sent them an adventure story, The Mystery of Sasassa Valley. It was Arthur Conan Doyle's first published story, and it appeared that September. In his memoirs he wrote: "To my great joy and surprise it was accepted by Chambers' Journal, and I received three guineas."

Three guineas mattered. The family was always short, and Arthur was trying to earn his way through university. The same month, he had his first scientific article published, in the British Medical Journal, on a plant drug called gelsemium, which he had tested by taking increasing doses himself. Even as a student, he was a man who wanted to find things out by experiment.

It would be years before he wrote about Sherlock Holmes. But he'd discovered that he could be paid to write, and he never stopped.

Now follow the route down through the closes to the Cowgate, and up to Infirmary Street.`,
      },
    },
    {
      id: "old-infirmary",
      order: 4,
      name: "Infirmary Street: the old Royal Infirmary",
      coordinates: { lat: 55.9481, lng: -3.1856 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 79,
        audioSource: require("../../../assets/audio/edinburgh-conan-doyle/04-old-infirmary.mp3"),
        scriptText: `The name of this street is the clue. Until 1879, Edinburgh's Royal Infirmary, the hospital where the city's medical students learned their trade, stood here, around Infirmary Street and the old High School Yards.

And it was in the infirmary that Conan Doyle met the most important teacher of his life: Joseph Bell, a surgeon. In his memoirs, he described him as "thin, wiry, dark, with a high-nosed acute face, penetrating grey eyes." Bell's real gift was diagnosis, "not only of disease, but of occupation and character."

To his surprise, Bell picked him out. "For some reason which I have never understood," he wrote, "he singled me out from the drove of students who frequented his wards and made me his out-patient clerk." His job was to line up Bell's out-patients, take simple notes, and show them in one by one to a big room where Bell sat surrounded by students.

And there, he watched Bell work. Again and again, he noticed that Bell "often learned more of the patient by a few quick glances than I had done by my questions."

Sources differ on exactly when he started, in 1877 or 1878, and so whether it was here or at the new infirmary. But this is where Edinburgh's medical school was taught to look.

Now walk up to South Bridge, and along Nicolson Street to Surgeons' Hall.`,
      },
    },
    {
      id: "surgeons-hall",
      order: 5,
      name: "Surgeons' Hall",
      coordinates: { lat: 55.94675, lng: -3.1849 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 73,
        audioSource: require("../../../assets/audio/edinburgh-conan-doyle/05-surgeons-hall.mp3"),
        scriptText: `This grand classical building, with its row of columns, is Surgeons' Hall, home of the Royal College of Surgeons of Edinburgh. It was designed by William Playfair and opened in 1832. Joseph Bell was a fellow of the college, and from 1887 to 1889, its president.

Inside, Surgeons' Hall Museums tell the story of Edinburgh's extraordinary medical history. The museums are open daily, with a ticket, and include objects linked to Bell, given by his family. The college also keeps a letter in which Conan Doyle thanked Bell for Sherlock Holmes. We'll hear from that letter later.

Why Edinburgh? In the nineteenth century, this was one of the great medical cities of the world. Students came from everywhere to learn here, and the teaching put huge weight on careful observation and evidence, reading the body like a text. That is exactly the habit of mind Holmes would turn on crime.

Bell spent his whole working life in Edinburgh, teaching and operating, and lived until 1911, long enough to see his old clerk become one of the most famous writers in the world.

Now walk back up Nicolson Street to South Bridge, and the great domed gateway of Old College, the heart of the University of Edinburgh.`,
      },
    },
    {
      id: "old-college",
      order: 6,
      name: "Old College: Professor Challenger and the snowball fight",
      coordinates: { lat: 55.94742, lng: -3.18651 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 75,
        audioSource: require("../../../assets/audio/edinburgh-conan-doyle/06-old-college.mp3"),
        scriptText: `Through this arch is the quadrangle of Old College, the historic heart of the University of Edinburgh. Conan Doyle studied medicine here from 1876, graduating in 1881, and later earning a doctorate in 1885.

He was not a starry student, but he loved his teachers' eccentricities, and he remembered them vividly. There was Professor William Rutherford, the physiologist, with "his Assyrian beard, his prodigious voice, his enormous chest and his singular manner." Rutherford would start lecturing before he reached the classroom, so the students would hear a booming voice announce "There are valves in the veins" to an empty desk. Years later, Conan Doyle wrote: "I have endeavoured to reproduce some of his peculiarities in the fictitious character of Professor Challenger," the explorer hero of The Lost World.

He also remembered the day the "sacred quadrangle" was invaded by snowballing roughs. The anatomy professor, William Turner, heard the battle outside, and told his fidgeting class: "I think, gentlemen, your presence may be more useful outside than here." They flocked out, as Conan Doyle put it, "with a whoop, and soon had the quadrangle clear."

Now walk west along Chambers Street to the bronze statue in the middle of the road.`,
      },
    },
    {
      id: "chambers-street",
      order: 7,
      name: "Chambers Street: the student who went whaling",
      coordinates: { lat: 55.947391, lng: -3.189792 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 70,
        audioSource: require("../../../assets/audio/edinburgh-conan-doyle/07-chambers-street.mp3"),
        scriptText: `This statue is William Chambers, the publisher whose firm ran Chambers's Journal, the magazine that took Conan Doyle's first story. He was also Lord Provost of Edinburgh, and this whole street, laid out after his Improvement Act of 1867, is named after him. If you did our Harry Potter tour, you've met him before: he paid for Greyfriars Bobby's dog licence.

Opposite is the National Museum of Scotland, and all around you is the student quarter Conan Doyle knew.

Money was always tight, so he packed his medical course into as little time as he could and worked in the gaps. He spent spells as an assistant to doctors in Sheffield, Shropshire and Birmingham. And in 1880, at twenty, he signed on as ship's surgeon on an Arctic whaler called the Hope, and spent seven months in the Arctic seas. As he put it: "I went on board the whaler a big, straggling youth, I came off it a powerful, well-grown man."

That restless, adventurous streak is in Holmes's world too: the boxing, the disguises, the stories that range from London fog to the far corners of the Empire.

Now follow the route south, past Greyfriars and along Forrest Road, to George Square.`,
      },
    },
    {
      id: "doyle-george-square",
      order: 8,
      name: "23 George Square",
      coordinates: { lat: 55.94337, lng: -3.19035 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 66,
        audioSource: require("../../../assets/audio/edinburgh-conan-doyle/08-doyle-george-square.mp3"),
        scriptText: `From 1877, while Arthur was a medical student, the Doyle family lived here, at number 23 George Square. It was a big step up from the cramped flats of their earlier years, made possible by Dr Bryan Charles Waller, a young pathologist who had first lodged with the family and now leased the house, with the Doyles living in it.

Look two doors along. Number 25 was the childhood home of Sir Walter Scott. If you've done our Walter Scott tour, you've stood there already. Two of Edinburgh's most famous writers grew up within a few steps of each other, nearly a century apart.

It was from this house that Conan Doyle walked to his lectures, his clerking for Joseph Bell, and his first attempts at stories. His home life was difficult. His father was by now very ill, and the household depended on his mother, his sisters' earnings, and Dr Waller.

But Edinburgh was giving him what he would later use. He was learning to look at a person and ask: what does their hat, their hands, their walk, their sunburn tell me?

Now follow the route along Middle Meadow Walk to Lauriston Place, and the grand old hospital buildings there.`,
      },
    },
    {
      id: "royal-infirmary",
      order: 9,
      name: "The Royal Infirmary: Joseph Bell's deductions",
      coordinates: { lat: 55.9448, lng: -3.19256 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 86,
        audioSource: require("../../../assets/audio/edinburgh-conan-doyle/09-royal-infirmary.mp3"),
        scriptText: `This handsome building on Lauriston Place was the new Royal Infirmary, opened in 1879 to designs by David Bryce, and laid out in separate pavilions, following the ideas of Florence Nightingale. It was called probably the best-planned hospital in Britain. Today it's part of the university again, as the Edinburgh Futures Institute.

This is where Joseph Bell's clinic dazzled his students. Conan Doyle remembered one of his best cases. Bell looked at a patient he'd never met, and said: "Well, my man, you've served in the army." "Aye, sir." "Not long discharged?" "No, sir." "A Highland regiment?" "Aye, sir." "A non-com. officer?" "Aye, sir." "Stationed at Barbados?" "Aye, sir."

Then Bell explained. The man was respectful, but kept his hat on, as soldiers do; he had an air of authority, and he was obviously Scottish; and his illness was one found in the West Indies, not in Britain. "To his audience of Watsons," Conan Doyle wrote, "it all seemed very miraculous until it was explained."

In 1892, already famous, he wrote to Bell: "It is most certainly to you that I owe Sherlock Holmes." Round the "deduction and inference and observation" Bell taught, he said, "I have tried to build up a man who pushed the thing as far as it would go."

Now follow the route through the old hospital grounds and along the edge of the Meadows to Lonsdale Terrace.`,
      },
    },
    {
      id: "lonsdale-terrace",
      order: 10,
      name: "Lonsdale Terrace: from Edinburgh to Baker Street",
      coordinates: { lat: 55.94254, lng: -3.19831 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 73,
        audioSource: require("../../../assets/audio/edinburgh-conan-doyle/10-lonsdale-terrace.mp3"),
        scriptText: `We end here, by the Meadows. In 1881, the year he qualified as a doctor, the Doyle family were living at number 15, Lonsdale Terrace. It was one of his last Edinburgh homes.

Soon after, he left to make his way as a doctor: first as a ship's surgeon on a voyage to West Africa, then briefly in Plymouth, and then in his own practice in Southsea, near Portsmouth. Patients were slow to come, so he wrote while he waited.

In 1886, aged twenty-seven, he finished a novel about a consulting detective, and in 1887 it was published: A Study in Scarlet. In its opening chapter, a young army doctor, Dr Watson, is introduced to a strange, brilliant man in a hospital laboratory, who shakes his hand and says: "You have been in Afghanistan, I perceive."

It's Joseph Bell's trick, straight from the out-patient room in Edinburgh.

The rest is history. Guinness World Records lists Sherlock Holmes as the most portrayed human literary character in film and television. And all of it grew from a student in this city, watching a surgeon notice what everyone else had missed.

Thank you for walking with me. Keep your eyes open on the way home. You never know what you'll deduce.`,
      },
    },
  ],
  path,
};

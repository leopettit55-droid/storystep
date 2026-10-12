import type { Area } from "../schema";

/**
 * Sir Walter Scott's Edinburgh: the house he grew up in, his lost birthplace
 * and school, the courts where he worked, the prison he named a novel after,
 * the crown jewels he found, the house where "that hand" wrote Waverley, the
 * dinner where he owned up to being the Great Unknown, and his monument.
 * Researched October 2026.
 *
 * Scott's own words come from The Journal of Sir Walter Scott (Project
 * Gutenberg #14860), each checked for its date: 22 Jan 1826 ("My own right
 * hand shall do it"); 15 Mar 1826 ("So farewell, poor 39"); 13 Jul 1826
 * (Mrs Brown's lodgings, "the insects were voracious", the farewell verse);
 * 22 and 24 Feb 1827 (the Theatrical Fund dinner: 300 tickets, "Meadowbank
 * taxed me with the novels ... I pleaded guilty", £280 raised). The "hand in
 * the window" is from Lockhart's Memoirs of the Life of Sir Walter Scott,
 * vol. 4 (Project Gutenberg #42062), June 1814. Marmion (1808), Canto IV,
 * from Project Gutenberg #4010. Scott on meeting Burns: the Walter Scott Club.
 * Other sources: Wikipedia (Walter Scott, Scott Monument, Old Tolbooth,
 * Parliament House), the University of Edinburgh's Walter Scott Digital
 * Archive (his homes) and plaques pages, the Walter Scott Club's walking tour
 * (locations, Mrs Brown's lodgings, 39 Castle Street, the Assembly Rooms),
 * National Library of Scotland (George IV's visit, the Parliament Hall
 * banquet), History Scotland (the Honours, 4 Feb 1818), Edinburgh News (the
 * Writers' Museum's Scott objects).
 *
 * Where sources disagree, the scripts avoid the disputed detail or say so:
 *  - 39 North Castle Street: from 1801 (Wikipedia, Edinburgh University) or
 *    1802 (Walter Scott Club); "the early 1800s".
 *  - George Square: the family moved there in 1778 (Edinburgh University,
 *    Wikipedia); some guides say 1774. The script gives no year.
 *  - His 1826 debts: £121,000 to £130,000 depending on source; "well over a
 *    hundred thousand pounds".
 *  - The Scott Monument is often called the largest monument to a writer; it
 *    is the second largest, after the José Martí memorial in Havana (the
 *    script says so).
 *  - His father's grave in Greyfriars is left out: its death year differs
 *    between sources (1799 or 1801) and the grave isn't mapped.
 *  - The Writers' Museum rocking horse's uneven stirrups and the printing
 *    press come from one source each; told as "said to" and "believed".
 *
 * Stops and the walking path come from OpenStreetMap (addresses via its
 * Nominatim search; the path routed along OSM footways by the FOSSGIS foot
 * router). Accurate to a few metres, not surveyed: walk the route once. No. 6
 * North St David Street isn't mapped as an address, so that stop is on the
 * street itself.
 *
 * Narration: these recordings are TEMPORARY, made with Google text-to-speech
 * in Professor Hoot's "Ask your guide" voice (en-GB-Standard-A). Replace them
 * with the original narrator's ElevenLabs voice, same file names.
 *
 * Cover: "Edinburgh. The Scott Monument", Hill & Adamson, 1843-47,
 * The Metropolitan Museum of Art (CC0).
 */

/** George Square → Chambers Street and the top of Guthrie Street → High School
 * Yards → the Cowgate and Old Fishmarket Close → Parliament Square → the
 * High Street and Lawnmarket → Lady Stair's Close → Castle Esplanade → Milne's
 * Court and the Playfair Steps → the Mound → Princes Street → North Castle
 * Street → George Street → North St David Street → the Scott Monument.
 * About 4.7 km. */
const path = [
  { lat: 55.943194, lng: -3.190125 },
  { lat: 55.943438, lng: -3.190257 },
  { lat: 55.944012, lng: -3.190544 },
  { lat: 55.943957, lng: -3.190999 },
  { lat: 55.943957, lng: -3.191054 },
  { lat: 55.943947, lng: -3.191314 },
  { lat: 55.944195, lng: -3.191295 },
  { lat: 55.944627, lng: -3.191262 },
  { lat: 55.9449, lng: -3.191241 },
  { lat: 55.944993, lng: -3.191232 },
  { lat: 55.945243, lng: -3.19121 },
  { lat: 55.945269, lng: -3.191198 },
  { lat: 55.945281, lng: -3.191116 },
  { lat: 55.945305, lng: -3.190945 },
  { lat: 55.945423, lng: -3.190354 },
  { lat: 55.945563, lng: -3.189528 },
  { lat: 55.945628, lng: -3.189392 },
  { lat: 55.945718, lng: -3.189204 },
  { lat: 55.945868, lng: -3.188987 },
  { lat: 55.945906, lng: -3.188928 },
  { lat: 55.945963, lng: -3.188847 },
  { lat: 55.946011, lng: -3.188783 },
  { lat: 55.946028, lng: -3.188753 },
  { lat: 55.946039, lng: -3.18872 },
  { lat: 55.946093, lng: -3.188551 },
  { lat: 55.946127, lng: -3.188556 },
  { lat: 55.946152, lng: -3.188532 },
  { lat: 55.946173, lng: -3.188495 },
  { lat: 55.946193, lng: -3.188473 },
  { lat: 55.94622, lng: -3.188457 },
  { lat: 55.946306, lng: -3.188473 },
  { lat: 55.946365, lng: -3.188383 },
  { lat: 55.946408, lng: -3.188304 },
  { lat: 55.946443, lng: -3.188216 },
  { lat: 55.946457, lng: -3.188165 },
  { lat: 55.946468, lng: -3.18811 },
  { lat: 55.946472, lng: -3.188057 },
  { lat: 55.946472, lng: -3.188002 },
  { lat: 55.946506, lng: -3.188 },
  { lat: 55.946678, lng: -3.18798 },
  { lat: 55.946846, lng: -3.187955 },
  { lat: 55.946882, lng: -3.187935 },
  { lat: 55.946899, lng: -3.18797 },
  { lat: 55.947132, lng: -3.188082 },
  { lat: 55.947365, lng: -3.188213 },
  { lat: 55.9474, lng: -3.188233 },
  { lat: 55.947643, lng: -3.188363 },
  { lat: 55.947698, lng: -3.188392 },
  { lat: 55.947757, lng: -3.188432 },
  { lat: 55.947758, lng: -3.188423 },
  { lat: 55.947792, lng: -3.188234 },
  { lat: 55.947899, lng: -3.187639 },
  { lat: 55.947995, lng: -3.18712 },
  { lat: 55.948045, lng: -3.186813 },
  { lat: 55.948059, lng: -3.186741 },
  { lat: 55.948068, lng: -3.186685 },
  { lat: 55.947968, lng: -3.186637 },
  { lat: 55.947995, lng: -3.186477 },
  { lat: 55.947965, lng: -3.186459 },
  { lat: 55.947922, lng: -3.186434 },
  { lat: 55.94794, lng: -3.186325 },
  { lat: 55.947962, lng: -3.18619 },
  { lat: 55.947982, lng: -3.186071 },
  { lat: 55.948006, lng: -3.185939 },
  { lat: 55.948029, lng: -3.185826 },
  { lat: 55.948043, lng: -3.185767 },
  { lat: 55.948137, lng: -3.185507 },
  { lat: 55.948401, lng: -3.184789 },
  { lat: 55.948595, lng: -3.185 },
  { lat: 55.948656, lng: -3.184812 },
  { lat: 55.948681, lng: -3.184736 },
  { lat: 55.948656, lng: -3.184812 },
  { lat: 55.948595, lng: -3.185 },
  { lat: 55.948745, lng: -3.185221 },
  { lat: 55.948882, lng: -3.185398 },
  { lat: 55.948969, lng: -3.185511 },
  { lat: 55.948958, lng: -3.185604 },
  { lat: 55.948944, lng: -3.185694 },
  { lat: 55.948923, lng: -3.185791 },
  { lat: 55.948896, lng: -3.185924 },
  { lat: 55.948883, lng: -3.185986 },
  { lat: 55.94884, lng: -3.186164 },
  { lat: 55.948792, lng: -3.186484 },
  { lat: 55.948756, lng: -3.186727 },
  { lat: 55.9487, lng: -3.187081 },
  { lat: 55.948682, lng: -3.187283 },
  { lat: 55.948672, lng: -3.187317 },
  { lat: 55.948655, lng: -3.187625 },
  { lat: 55.948631, lng: -3.187918 },
  { lat: 55.94861, lng: -3.188193 },
  { lat: 55.948574, lng: -3.188658 },
  { lat: 55.948556, lng: -3.188884 },
  { lat: 55.94855, lng: -3.188945 },
  { lat: 55.948521, lng: -3.189245 },
  { lat: 55.948727, lng: -3.18934 },
  { lat: 55.948861, lng: -3.189402 },
  { lat: 55.949124, lng: -3.189524 },
  { lat: 55.94916, lng: -3.189541 },
  { lat: 55.949191, lng: -3.189512 },
  { lat: 55.949206, lng: -3.189591 },
  { lat: 55.9492, lng: -3.189638 },
  { lat: 55.949184, lng: -3.189752 },
  { lat: 55.94934, lng: -3.189838 },
  { lat: 55.949429, lng: -3.189879 },
  { lat: 55.949427, lng: -3.189894 },
  { lat: 55.949412, lng: -3.190005 },
  { lat: 55.949384, lng: -3.190075 },
  { lat: 55.949371, lng: -3.190185 },
  { lat: 55.949294, lng: -3.190309 },
  { lat: 55.94928, lng: -3.190475 },
  { lat: 55.949294, lng: -3.190309 },
  { lat: 55.949371, lng: -3.190185 },
  { lat: 55.949518, lng: -3.190054 },
  { lat: 55.949536, lng: -3.190049 },
  { lat: 55.949554, lng: -3.19005 },
  { lat: 55.949572, lng: -3.190057 },
  { lat: 55.949826, lng: -3.190157 },
  { lat: 55.949814, lng: -3.190281 },
  { lat: 55.949786, lng: -3.190531 },
  { lat: 55.949761, lng: -3.190766 },
  { lat: 55.949731, lng: -3.190985 },
  { lat: 55.949697, lng: -3.191181 },
  { lat: 55.949639, lng: -3.191487 },
  { lat: 55.949637, lng: -3.191495 },
  { lat: 55.949626, lng: -3.191549 },
  { lat: 55.949587, lng: -3.191533 },
  { lat: 55.949555, lng: -3.191527 },
  { lat: 55.949587, lng: -3.191533 },
  { lat: 55.949626, lng: -3.191549 },
  { lat: 55.949551, lng: -3.191909 },
  { lat: 55.949544, lng: -3.191943 },
  { lat: 55.949534, lng: -3.192004 },
  { lat: 55.949491, lng: -3.192245 },
  { lat: 55.949452, lng: -3.192517 },
  { lat: 55.949427, lng: -3.192678 },
  { lat: 55.949391, lng: -3.192923 },
  { lat: 55.949374, lng: -3.193036 },
  { lat: 55.949363, lng: -3.193109 },
  { lat: 55.949349, lng: -3.193212 },
  { lat: 55.949318, lng: -3.193419 },
  { lat: 55.949383, lng: -3.193492 },
  { lat: 55.949396, lng: -3.193501 },
  { lat: 55.949408, lng: -3.19351 },
  { lat: 55.949423, lng: -3.193521 },
  { lat: 55.949499, lng: -3.193565 },
  { lat: 55.949497, lng: -3.193576 },
  { lat: 55.949536, lng: -3.193598 },
  { lat: 55.949545, lng: -3.193603 },
  { lat: 55.949554, lng: -3.193609 },
  { lat: 55.949563, lng: -3.193617 },
  { lat: 55.949573, lng: -3.193632 },
  { lat: 55.949579, lng: -3.193643 },
  { lat: 55.949584, lng: -3.193653 },
  { lat: 55.949587, lng: -3.193664 },
  { lat: 55.94959, lng: -3.193677 },
  { lat: 55.949591, lng: -3.193691 },
  { lat: 55.949592, lng: -3.193702 },
  { lat: 55.949594, lng: -3.193712 },
  { lat: 55.949598, lng: -3.193723 },
  { lat: 55.949604, lng: -3.193733 },
  { lat: 55.949612, lng: -3.193739 },
  { lat: 55.949619, lng: -3.193743 },
  { lat: 55.949632, lng: -3.193669 },
  { lat: 55.949633, lng: -3.19367 },
  { lat: 55.949636, lng: -3.193658 },
  { lat: 55.94964, lng: -3.193655 },
  { lat: 55.949644, lng: -3.193651 },
  { lat: 55.949655, lng: -3.193656 },
  { lat: 55.949657, lng: -3.193669 },
  { lat: 55.9497, lng: -3.193693 },
  { lat: 55.949657, lng: -3.193669 },
  { lat: 55.949655, lng: -3.193656 },
  { lat: 55.949644, lng: -3.193651 },
  { lat: 55.94964, lng: -3.193655 },
  { lat: 55.949636, lng: -3.193658 },
  { lat: 55.949633, lng: -3.19367 },
  { lat: 55.949632, lng: -3.193669 },
  { lat: 55.949619, lng: -3.193743 },
  { lat: 55.949612, lng: -3.193739 },
  { lat: 55.949604, lng: -3.193733 },
  { lat: 55.949598, lng: -3.193723 },
  { lat: 55.949594, lng: -3.193712 },
  { lat: 55.949592, lng: -3.193702 },
  { lat: 55.949591, lng: -3.193691 },
  { lat: 55.94959, lng: -3.193677 },
  { lat: 55.949587, lng: -3.193664 },
  { lat: 55.949584, lng: -3.193653 },
  { lat: 55.949579, lng: -3.193643 },
  { lat: 55.949573, lng: -3.193632 },
  { lat: 55.949563, lng: -3.193617 },
  { lat: 55.949554, lng: -3.193609 },
  { lat: 55.949545, lng: -3.193603 },
  { lat: 55.949536, lng: -3.193598 },
  { lat: 55.949497, lng: -3.193576 },
  { lat: 55.949499, lng: -3.193565 },
  { lat: 55.949423, lng: -3.193521 },
  { lat: 55.949408, lng: -3.19351 },
  { lat: 55.949396, lng: -3.193501 },
  { lat: 55.949383, lng: -3.193492 },
  { lat: 55.949318, lng: -3.193419 },
  { lat: 55.949283, lng: -3.19362 },
  { lat: 55.949274, lng: -3.193666 },
  { lat: 55.949264, lng: -3.193714 },
  { lat: 55.949213, lng: -3.193954 },
  { lat: 55.949201, lng: -3.194011 },
  { lat: 55.949194, lng: -3.194048 },
  { lat: 55.94918, lng: -3.1941 },
  { lat: 55.949164, lng: -3.194159 },
  { lat: 55.949148, lng: -3.194208 },
  { lat: 55.949134, lng: -3.194246 },
  { lat: 55.94912, lng: -3.194277 },
  { lat: 55.949102, lng: -3.194311 },
  { lat: 55.949052, lng: -3.19443 },
  { lat: 55.949053, lng: -3.194542 },
  { lat: 55.949049, lng: -3.194632 },
  { lat: 55.949046, lng: -3.194677 },
  { lat: 55.949038, lng: -3.194729 },
  { lat: 55.949023, lng: -3.194801 },
  { lat: 55.948955, lng: -3.195113 },
  { lat: 55.948932, lng: -3.195235 },
  { lat: 55.948909, lng: -3.195363 },
  { lat: 55.948897, lng: -3.195424 },
  { lat: 55.948886, lng: -3.195563 },
  { lat: 55.948871, lng: -3.195753 },
  { lat: 55.94885, lng: -3.196063 },
  { lat: 55.948829, lng: -3.196404 },
  { lat: 55.948828, lng: -3.196423 },
  { lat: 55.948825, lng: -3.196444 },
  { lat: 55.948698, lng: -3.197403 },
  { lat: 55.948825, lng: -3.196444 },
  { lat: 55.948828, lng: -3.196423 },
  { lat: 55.948829, lng: -3.196404 },
  { lat: 55.94885, lng: -3.196063 },
  { lat: 55.948871, lng: -3.195753 },
  { lat: 55.948886, lng: -3.195563 },
  { lat: 55.948897, lng: -3.195424 },
  { lat: 55.948909, lng: -3.195363 },
  { lat: 55.948932, lng: -3.195235 },
  { lat: 55.948955, lng: -3.195113 },
  { lat: 55.949023, lng: -3.194801 },
  { lat: 55.949038, lng: -3.194729 },
  { lat: 55.949046, lng: -3.194677 },
  { lat: 55.949049, lng: -3.194632 },
  { lat: 55.949053, lng: -3.194542 },
  { lat: 55.949052, lng: -3.19443 },
  { lat: 55.949102, lng: -3.194311 },
  { lat: 55.94912, lng: -3.194277 },
  { lat: 55.949134, lng: -3.194246 },
  { lat: 55.949181, lng: -3.194286 },
  { lat: 55.949188, lng: -3.194293 },
  { lat: 55.949203, lng: -3.194305 },
  { lat: 55.949313, lng: -3.194405 },
  { lat: 55.949322, lng: -3.194413 },
  { lat: 55.949403, lng: -3.194486 },
  { lat: 55.949457, lng: -3.194531 },
  { lat: 55.949471, lng: -3.194533 },
  { lat: 55.949586, lng: -3.194623 },
  { lat: 55.949722, lng: -3.19471 },
  { lat: 55.949731, lng: -3.194715 },
  { lat: 55.949954, lng: -3.19487 },
  { lat: 55.949966, lng: -3.194833 },
  { lat: 55.949983, lng: -3.194808 },
  { lat: 55.950004, lng: -3.194793 },
  { lat: 55.95003, lng: -3.194784 },
  { lat: 55.950093, lng: -3.194778 },
  { lat: 55.950116, lng: -3.194769 },
  { lat: 55.950136, lng: -3.194754 },
  { lat: 55.950152, lng: -3.194734 },
  { lat: 55.95056, lng: -3.194974 },
  { lat: 55.951318, lng: -3.195405 },
  { lat: 55.951325, lng: -3.195409 },
  { lat: 55.951318, lng: -3.19545 },
  { lat: 55.951362, lng: -3.195475 },
  { lat: 55.951323, lng: -3.195692 },
  { lat: 55.951295, lng: -3.19585 },
  { lat: 55.951246, lng: -3.196128 },
  { lat: 55.951207, lng: -3.196349 },
  { lat: 55.951275, lng: -3.196388 },
  { lat: 55.951306, lng: -3.196405 },
  { lat: 55.951418, lng: -3.195773 },
  { lat: 55.951575, lng: -3.195861 },
  { lat: 55.951943, lng: -3.196069 },
  { lat: 55.951974, lng: -3.196086 },
  { lat: 55.952003, lng: -3.195923 },
  { lat: 55.95205, lng: -3.195938 },
  { lat: 55.952031, lng: -3.196041 },
  { lat: 55.952075, lng: -3.196061 },
  { lat: 55.952091, lng: -3.196071 },
  { lat: 55.9521, lng: -3.196076 },
  { lat: 55.952134, lng: -3.196094 },
  { lat: 55.952156, lng: -3.196106 },
  { lat: 55.952185, lng: -3.196123 },
  { lat: 55.952202, lng: -3.196132 },
  { lat: 55.952161, lng: -3.196406 },
  { lat: 55.952154, lng: -3.196447 },
  { lat: 55.952126, lng: -3.196612 },
  { lat: 55.952102, lng: -3.196754 },
  { lat: 55.952095, lng: -3.196828 },
  { lat: 55.952029, lng: -3.197239 },
  { lat: 55.951804, lng: -3.198514 },
  { lat: 55.951666, lng: -3.199298 },
  { lat: 55.951647, lng: -3.199407 },
  { lat: 55.951738, lng: -3.199461 },
  { lat: 55.952298, lng: -3.199796 },
  { lat: 55.952272, lng: -3.199948 },
  { lat: 55.952248, lng: -3.200088 },
  { lat: 55.952801, lng: -3.200436 },
  { lat: 55.952824, lng: -3.200454 },
  { lat: 55.952846, lng: -3.200537 },
  { lat: 55.952831, lng: -3.200638 },
  { lat: 55.952879, lng: -3.200663 },
  { lat: 55.952997, lng: -3.200726 },
  { lat: 55.953037, lng: -3.20075 },
  { lat: 55.95261, lng: -3.203314 },
  { lat: 55.952605, lng: -3.203345 },
  { lat: 55.952626, lng: -3.203433 },
  { lat: 55.952665, lng: -3.203455 },
  { lat: 55.95278, lng: -3.203518 },
  { lat: 55.952665, lng: -3.203455 },
  { lat: 55.952626, lng: -3.203433 },
  { lat: 55.952605, lng: -3.203345 },
  { lat: 55.95261, lng: -3.203314 },
  { lat: 55.953037, lng: -3.20075 },
  { lat: 55.952997, lng: -3.200726 },
  { lat: 55.952879, lng: -3.200663 },
  { lat: 55.952831, lng: -3.200638 },
  { lat: 55.952846, lng: -3.200537 },
  { lat: 55.952824, lng: -3.200454 },
  { lat: 55.952801, lng: -3.200436 },
  { lat: 55.952824, lng: -3.200293 },
  { lat: 55.952851, lng: -3.200136 },
  { lat: 55.952875, lng: -3.200151 },
  { lat: 55.952908, lng: -3.200116 },
  { lat: 55.952929, lng: -3.200045 },
  { lat: 55.953105, lng: -3.199063 },
  { lat: 55.953064, lng: -3.199039 },
  { lat: 55.95305, lng: -3.199032 },
  { lat: 55.952758, lng: -3.198869 },
  { lat: 55.952745, lng: -3.198862 },
  { lat: 55.952708, lng: -3.198842 },
  { lat: 55.952745, lng: -3.198862 },
  { lat: 55.952758, lng: -3.198869 },
  { lat: 55.95305, lng: -3.199032 },
  { lat: 55.953064, lng: -3.199039 },
  { lat: 55.953105, lng: -3.199063 },
  { lat: 55.953337, lng: -3.197598 },
  { lat: 55.953388, lng: -3.197625 },
  { lat: 55.953446, lng: -3.197655 },
  { lat: 55.953467, lng: -3.197533 },
  { lat: 55.953524, lng: -3.197562 },
  { lat: 55.953543, lng: -3.197448 },
  { lat: 55.953565, lng: -3.197434 },
  { lat: 55.953584, lng: -3.197413 },
  { lat: 55.953601, lng: -3.197385 },
  { lat: 55.953614, lng: -3.197352 },
  { lat: 55.953622, lng: -3.197316 },
  { lat: 55.953627, lng: -3.197282 },
  { lat: 55.953627, lng: -3.197242 },
  { lat: 55.953683, lng: -3.197277 },
  { lat: 55.953701, lng: -3.197185 },
  { lat: 55.953686, lng: -3.197176 },
  { lat: 55.953661, lng: -3.197109 },
  { lat: 55.953683, lng: -3.196982 },
  { lat: 55.953948, lng: -3.19542 },
  { lat: 55.954118, lng: -3.194418 },
  { lat: 55.954171, lng: -3.194343 },
  { lat: 55.954444, lng: -3.194497 },
  { lat: 55.954668, lng: -3.194624 },
  { lat: 55.954746, lng: -3.194669 },
  { lat: 55.954768, lng: -3.19454 },
  { lat: 55.954796, lng: -3.194555 },
  { lat: 55.954945, lng: -3.194632 },
  { lat: 55.954796, lng: -3.194555 },
  { lat: 55.954768, lng: -3.19454 },
  { lat: 55.954746, lng: -3.194669 },
  { lat: 55.954668, lng: -3.194624 },
  { lat: 55.954444, lng: -3.194497 },
  { lat: 55.954171, lng: -3.194343 },
  { lat: 55.954118, lng: -3.194418 },
  { lat: 55.954073, lng: -3.194397 },
  { lat: 55.954014, lng: -3.194366 },
  { lat: 55.953943, lng: -3.194329 },
  { lat: 55.953893, lng: -3.19428 },
  { lat: 55.953865, lng: -3.19424 },
  { lat: 55.953606, lng: -3.1941 },
  { lat: 55.953337, lng: -3.193935 },
  { lat: 55.953297, lng: -3.193912 },
  { lat: 55.952745, lng: -3.19363 },
  { lat: 55.952716, lng: -3.193614 },
  { lat: 55.952678, lng: -3.193608 },
  { lat: 55.952654, lng: -3.193641 },
  { lat: 55.952628, lng: -3.193758 },
  { lat: 55.952596, lng: -3.193738 },
  { lat: 55.952575, lng: -3.193726 },
  { lat: 55.952547, lng: -3.193711 },
  { lat: 55.952513, lng: -3.193693 },
  { lat: 55.952492, lng: -3.193682 },
  { lat: 55.952448, lng: -3.193659 },
  { lat: 55.952424, lng: -3.193645 },
  { lat: 55.95239, lng: -3.193834 },
  { lat: 55.952365, lng: -3.193821 },
  { lat: 55.952178, lng: -3.193718 },
  { lat: 55.952234, lng: -3.193391 },
];

export const edinburghScott: Area = {
  id: "edinburgh-scott",
  name: "Walter Scott's Edinburgh",
  city: "Edinburgh",
  description:
    "Sir Walter Scott's Edinburgh, from the house where he grew up to the monument the city built him: the prison he named a novel after, the crown jewels he found, the window where \"that hand\" wrote Waverley, and the dinner where the Great Unknown finally owned up.",
  estimatedDurationMin: 90,
  estimatedDistanceKm: 4.7,
  difficulty: "moderate",
  accessNote:
    "A longer walk across the Old and New Towns, with steep steps at Old Fishmarket Close and the Playfair Steps. Parliament Hall is usually open on weekdays; the Writers' Museum is free but keeps opening hours.",
  isContentComplete: true,
  enableInteractiveGuide: true,
  image: require("../../../assets/tours/edinburgh-scott.jpg"),
  price: { singleTour: 4.99 },
  startingPoint: {
    lat: 55.94319,
    lng: -3.19015,
    label: "25 George Square",
  },
  route: [
    {
      id: "george-square",
      order: 1,
      name: "25 George Square: where Scott grew up",
      coordinates: { lat: 55.94319, lng: -3.19015 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 77,
        audioSource: require("../../../assets/audio/edinburgh-scott/01-george-square.mp3"),
        scriptText: `Good day, and welcome. This walk follows Sir Walter Scott, the man who invented the historical novel, and who did more than anyone to shape how the world imagines Scotland. And we start at the house where he grew up: number 25, George Square, marked with a plaque.

Scott was born in 1771, a few streets north of here, the son of an Edinburgh lawyer. As a toddler, an illness, almost certainly polio, left him lame in one leg for life. He was sent to recover on his grandparents' farm at Sandyknowe, in the Borders, and there, as a small boy, he soaked up the ballads and old stories of the Border country that would fill his books.

When he came back to Edinburgh, his family were living here in George Square, then a fashionable new square on the edge of town. He lived here for nearly twenty years, through school, university and his early years as a lawyer, until his marriage in 1797.

And just south of here, at a professor's house in Sciennes, the fifteen-year-old Scott met Robert Burns, in their one real encounter. Years later he remembered that Burns "rewarded me with a look and a word, which, though of mere civility, I then received and still recollect, with very great pleasure."

Now head north, through the square and across to Chambers Street, to the place where he was born.`,
      },
    },
    {
      id: "college-wynd",
      order: 2,
      name: "College Wynd: the birthplace that vanished",
      coordinates: { lat: 55.94782, lng: -3.18825 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 70,
        audioSource: require("../../../assets/audio/edinburgh-scott/02-college-wynd.mp3"),
        scriptText: `Look for the plaque at the top of Guthrie Street. It marks the spot where, on the 15th of August 1771, Walter Scott was born, in a third-floor flat in a narrow lane called College Wynd.

You won't find the wynd now. Within a few years, Scott's birthplace was pulled down to make room for the University of Edinburgh's grand new building, Old College, whose front you can see along the street. There's a neat irony in that, because the university would soon claim him. In November 1783, aged just twelve, Scott began his studies at the university.

The Edinburgh he was born into was an extraordinary place. The Old Town was packed onto its ridge, rich and poor living on top of one another in tall tenements, while the city's thinkers, the philosophers, doctors and scientists of the Scottish Enlightenment, were making it one of the most brilliant cities in Europe. Scott grew up among their sons and daughters.

But he was never much of a scholar in the classroom. He was a reader and a listener, hungry for old songs, legends and history, and above all, for stories.

Now walk east along Chambers Street, cross South Bridge, and follow Infirmary Street down to High School Yards.`,
      },
    },
    {
      id: "high-school-yards",
      order: 3,
      name: "The Royal High School",
      coordinates: { lat: 55.9486, lng: -3.18465 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 65,
        audioSource: require("../../../assets/audio/edinburgh-scott/03-high-school-yards.mp3"),
        scriptText: `This handsome building in High School Yards was once the Royal High School, Edinburgh's ancient grammar school, and young Walter Scott was a pupil here from 1779, aged eight. A plaque beside the main entrance records it.

The boys were drilled hard in Latin, and Scott was a bright but uneven pupil. What he did have was a gift for stories, and an appetite for old tales that school never satisfied.

After Scott's time, the High School moved to a grand new building on Calton Hill, a Greek temple of a school designed by Thomas Hamilton, the architect of the Burns Monument. This old building became a surgical hospital, and later part of the university.

It's worth pausing here to think about how unlikely Scott's career was. The lame boy who couldn't run with the others, who spent his childhood listening to old women's ballads on a Borders farm, became one of the best-selling writers in the world. Edinburgh trained him as a lawyer, but the Borders made him a storyteller.

Now follow the route down to the Cowgate and up Old Fishmarket Close to the High Street, and into Parliament Square, behind St Giles' Cathedral.`,
      },
    },
    {
      id: "parliament-hall",
      order: 4,
      name: "Parliament Hall: the lawyer and the King",
      coordinates: { lat: 55.94926, lng: -3.19047 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 73,
        audioSource: require("../../../assets/audio/edinburgh-scott/04-parliament-hall.mp3"),
        scriptText: `The building on the south side of this square is Parliament House. Its great hall, finished in 1639, was home to the Parliament of Scotland until the Union of 1707, and ever since it has been the home of Scotland's highest courts. On weekdays you can often step inside, under its dark oak roof.

This was Scott's workplace for most of his life. He became an advocate in 1792, and from 1806 he served as one of the Principal Clerks of the Court of Session, sitting below the judges, day after day, for almost a quarter of a century. Inside the hall stands a statue of him, by the sculptor John Greenshields.

The hall saw one of Scott's grandest moments, too. In August 1822, King George the Fourth came to Edinburgh, the first reigning monarch to visit Scotland since Charles the Second, and Scott stage-managed the whole thing. He filled the city with Highland chiefs and tartan pageantry, and on the 24th of August the King was given a great banquet here, in Parliament Hall.

It's thanks in large part to Scott's show that the kilt and tartan became symbols of all of Scotland, not just the Highlands.

Now walk round the cathedral to the High Street, and find a heart set into the cobbles near its west door.`,
      },
    },
    {
      id: "scott-tolbooth",
      order: 5,
      name: "The Heart of Midlothian",
      coordinates: { lat: 55.949552, lng: -3.191578 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 67,
        audioSource: require("../../../assets/audio/edinburgh-scott/05-scott-tolbooth.mp3"),
        scriptText: `That heart in the cobbles marks the doorway of the Old Tolbooth, Edinburgh's grim old prison, which stood right here, in the middle of the street. It was known as the Heart of Midlothian.

In 1817 the city pulled it down, and Scott went to watch. He came away with a souvenir: the Tolbooth's great iron door and its key, which he carried off to his country house at Abbotsford.

A year later, in 1818, he published one of his finest novels, and named it after the prison: The Heart of Mid-Lothian. It opens with a real event, the Porteous riot of 1736, when an Edinburgh mob broke into this jail and lynched the captain of the city guard. And its heroine, Jeanie Deans, is a poor, honest Scottish girl who refuses to lie to save her sister from the gallows, and instead walks all the way to London to beg the Queen for her sister's life.

It was a new kind of hero: not a knight or a king, but an ordinary, principled woman. Readers loved her.

You may see people spit on the heart for luck. You don't have to. Instead, walk on up the Lawnmarket and turn right into Lady Stair's Close, for the Writers' Museum.`,
      },
    },
    {
      id: "scott-writers-museum",
      order: 6,
      name: "The Writers' Museum: the Great Unknown",
      coordinates: { lat: 55.949691, lng: -3.193742 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 76,
        audioSource: require("../../../assets/audio/edinburgh-scott/06-scott-writers-museum.mp3"),
        scriptText: `The Writers' Museum, here in Lady Stair's House, is free to visit, and it has a whole collection devoted to Scott. Among his things is the rocking horse he rode as a child. Its stirrups are said to sit at different heights, to suit the boy's uneven legs. There's also his chessboard, and a printing press believed to have printed some of his novels.

Those novels began with a mystery. In the summer of 1814, a novel called Waverley appeared, a tale of a young Englishman caught up in the Jacobite rising of 1745. It had no author's name on it. It was a sensation, and it was followed by a stream of others: Guy Mannering, Rob Roy, The Heart of Mid-Lothian, Ivanhoe, all "by the author of Waverley."

Scott was already famous as a poet, and for years he refused to admit that he had written them. Readers called the mystery author "the Great Unknown." Plenty of people guessed, but Scott never confirmed it, partly, perhaps, because a senior court official writing popular novels was not quite respectable, and partly, it seems, because he enjoyed the game.

Keep the secret in mind. We'll find out where it finally came out.

Now walk back out to the Lawnmarket, turn right, and climb Castlehill to the Castle Esplanade.`,
      },
    },
    {
      id: "scott-castle",
      order: 7,
      name: "Edinburgh Castle and the lost Honours of Scotland",
      coordinates: { lat: 55.94869, lng: -3.1974 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 66,
        audioSource: require("../../../assets/audio/edinburgh-scott/07-scott-castle.mp3"),
        scriptText: `Here on the Castle Esplanade, Scott solved one of Scotland's great mysteries.

The Honours of Scotland, the crown, the sceptre and the sword of state, are the oldest crown jewels in the British Isles. They were used together at the coronation of Mary, Queen of Scots, and last used to crown Charles the Second in 1651. But after the Union of 1707, they were locked away in a chest in the castle's Crown Room, and for over a hundred years nobody saw them. Many people believed they had been secretly taken to London.

Scott was determined to find out. With permission from the Prince Regent, the future George the Fourth, he and a group of officials had the Crown Room opened, and on the 4th of February 1818 they had the great chest forced open. Inside lay the crown, the sceptre and the sword, exactly where they had been left.

They're on show in the castle today, in the same Crown Room, and it's largely thanks to Scott that they are.

The castle needs a ticket, but the Esplanade is free. When you're ready, head back down Castlehill, turn left through Milne's Court, and take the Playfair Steps down to the Mound.`,
      },
    },
    {
      id: "the-mound",
      order: 8,
      name: "The Mound: mine own romantic town",
      coordinates: { lat: 55.95155, lng: -3.196 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 70,
        audioSource: require("../../../assets/audio/edinburgh-scott/08-the-mound.mp3"),
        scriptText: `Stop here on the Mound and look back up at the castle and the crowded ridge of the Old Town.

This is the view Scott celebrated in his long poem Marmion, published in 1808, as his hero Marmion looks down on Edinburgh from Blackford Hill:

"Such dusky grandeur clothed the height,
Where the huge castle holds its state,
And all the steep slope down,
Whose ridgy back heaves to the sky,
Piled deep and massy, close and high,
Mine own romantic town!"

Mine own romantic town. That phrase has stuck to Edinburgh ever since.

The Mound itself joins two Edinburghs. Behind you is the Old Town, where Scott was born and went to school, with its closes and tenements. Ahead is the New Town, the orderly Georgian streets that were still being built when he was young, where he would live as a successful man. This great bank of earth between them was built up from the soil dug out for the New Town's foundations.

Scott belonged to both worlds: the romantic, ancient one he wrote about, and the modern, polite one he lived in.

Now follow the route down to Princes Street, and along it, westwards, to Castle Street. Then cross George Street to number 39, North Castle Street.`,
      },
    },
    {
      id: "castle-street",
      order: 9,
      name: "39 North Castle Street: the hand in the window",
      coordinates: { lat: 55.9528, lng: -3.2034 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 86,
        audioSource: require("../../../assets/audio/edinburgh-scott/09-castle-street.mp3"),
        scriptText: `This tall grey house, number 39, North Castle Street, was Scott's Edinburgh home for a quarter of a century, from the early 1800s until 1826. It's private now, so please admire it from the pavement. Here, he wrote Waverley and many of the novels that followed.

His son-in-law and biographer, John Gibson Lockhart, told a wonderful story about it. In June 1814, Lockhart was at a dinner in a house on George Street whose back window looked across to this one. His young host grew uneasy, and asked to change seats, because there was "a confounded hand" in a window opposite. "It never stops," he said. Page after page was finished and thrown on a heap, "and still it goes on unwearied." The host knew exactly whose hand it was: "'tis Walter Scott's." It was writing the last two volumes of Waverley.

That tireless hand would soon be needed. In January 1826, Scott's publisher and printers collapsed, and he found himself responsible for debts of well over a hundred thousand pounds. He refused bankruptcy, and wrote in his journal: "My own right hand shall do it." He would write his way out.

In March 1826 he left this house for the last time, and wrote: "So farewell, poor 39, and may you never harbour worse people than those who now leave you!"

Now walk back to George Street, turn left, and head east to the Assembly Rooms.`,
      },
    },
    {
      id: "assembly-rooms",
      order: 10,
      name: "The Assembly Rooms: the secret comes out",
      coordinates: { lat: 55.95275, lng: -3.1986 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 65,
        audioSource: require("../../../assets/audio/edinburgh-scott/10-assembly-rooms.mp3"),
        scriptText: `This grand building on George Street is the Assembly Rooms, where Edinburgh society came to dance, dine and be seen. And it's where the Great Unknown finally gave himself up.

On the 23rd of February 1827, a year after his ruin, Scott chaired a charity dinner here for the Theatrical Fund, which helped old and struggling actors. Three hundred tickets were given out. During the toasts, Lord Meadowbank, a judge, raised his glass to the author of the Waverley novels, and to Scott. The room waited.

Scott owned up. The next day he wrote in his journal, with typical understatement: "Meadowbank taxed me with the novels, and to end that farce at once I pleaded guilty, so that splore is ended." A splore is a Scots word for a bit of fun, a lark.

Thirteen years after Waverley, the whole world knew for certain what most of Edinburgh had long suspected.

He was less pleased with the collection for the actors, noting that it raised only two hundred and eighty pounds, and that some guests had put in mere shillings.

Now continue east along George Street, and follow the route to North St David Street.`,
      },
    },
    {
      id: "mrs-browns",
      order: 11,
      name: "Mrs Brown's lodgings: writing his way out",
      coordinates: { lat: 55.95495, lng: -3.1946 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 73,
        audioSource: require("../../../assets/audio/edinburgh-scott/11-mrs-browns.mp3"),
        scriptText: `After losing his house on Castle Street, Scott, now in his fifties, took rooms here in North St David Street, in a lodging house kept by a Mrs Brown, at number 6. He stayed for two months in the summer of 1826, from May to July. It was a terrible time. His wife Charlotte had just died, and he owed a fortune.

So he worked. Here he pushed on with a novel, Woodstock, and a vast Life of Napoleon, writing every day to pay his creditors. When he left, on the 13th of July, he wrote in his journal: "I have done a monstrous sight of work here." He also complained that "the insects were voracious," and added a comic farewell poem:

"So good-by, Mrs. Brown,
I am going out of town,
Over dale, over down,
Where bugs bite not,
Where lodgers fight not."

That mix of grief, grit and good humour is very Scott. He wrote relentlessly for the rest of his life, and it wore him down. He died at Abbotsford in September 1832, aged sixty-one. His debts were finally cleared after his death, largely from the sale of his copyrights.

Now head south, back towards Princes Street, and the great Gothic spire you can't miss.`,
      },
    },
    {
      id: "scott-monument",
      order: 12,
      name: "The Scott Monument",
      coordinates: { lat: 55.95225, lng: -3.1934 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 80,
        audioSource: require("../../../assets/audio/edinburgh-scott/12-scott-monument.mp3"),
        scriptText: `And here we end, beneath the Scott Monument, the great Gothic spire in Princes Street Gardens. Seated inside it, in white marble, is Scott himself, with his dog Maida at his side, carved by John Steell.

The monument was designed by George Meikle Kemp, a self-taught joiner who entered the design competition under a false name. Its foundation stone was laid on the 15th of August 1840, Scott's birthday. Sadly, Kemp never saw it finished: he drowned in the Union Canal in 1844. The monument is just over sixty-one metres tall, with two hundred and eighty-seven steps to the top, and sixty-four figures of characters from Scott's books. You'll often hear it called the largest monument to a writer in the world. It's actually the second largest, after the memorial to José Martí in Havana.

And just beyond the gardens is Edinburgh's main railway station, named Waverley, after his first novel.

That's Scott's legacy all around you. He invented the historical novel, which inspired writers across Europe and America. He found Scotland's lost crown jewels, and helped give the country its tartan image. And he made millions of people want to come and see this city for themselves.

Thank you for walking with me. If you have the legs for it, the Monument's steps are well worth the climb.`,
      },
    },
  ],
  path,
};

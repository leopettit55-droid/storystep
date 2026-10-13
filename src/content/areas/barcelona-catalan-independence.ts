import type { Area } from "../schema";

/**
 * Catalonia and Spain: Plaça del Rei (the Counts of Barcelona), the Fossar de les
 * Moreres (1714), El Born (the buried Ribera and the Nueva Planta decrees), the
 * Parliament (Ciutadella arsenal; 2017), the Arc de Triomf (1888, the Renaixença,
 * August 2024), the Palau de la Música (the 1960 Fets del Palau), Via Laietana 43
 * (Franco's political police), Plaça de Sant Felip Neri (the 1938 bombing;
 * Companys), Plaça de Sant Jaume (1931, 1934, 1977, 2006/2010) and Rambla de
 * Catalunya 19 (20 September 2017 to October 2026). Researched October 2026.
 *
 * Sources: Wikipedia (Siege of Barcelona 1713-14, Generalitat de Catalunya, Palau
 * del Parlament, 2017 Catalan independence referendum incl. official results and
 * the Catalan Health Service injury report, 2017 demonstration against Catalan
 * independence, 2012 in Catalonia, Events of the Palau de la Música, Fossar de les
 * Moreres, 2024 Spanish Amnesty Law, Jordi Cuixart, Jordi Sànchez); Ajuntament de
 * Barcelona democratic-memory pages (Via Laietana 43, Plaça de Sant Felip Neri);
 * Ara (July 2025 "site of democratic memory" declaration); meet.barcelona.cat and
 * Catalan News (El Born); Al Jazeera, Euronews, France 24, Catalan News (6 October
 * 2026 Constitutional Court ruling and lifted warrant; 8 August 2024 Arc de Triomf
 * appearance); CEO barometer July 2026 via VilaWeb/Nació Digital (45% for, 51%
 * against); Euronews / Catalan News (sedition repealed, January 2023 charges).
 *
 * Corrections, balance and flags:
 *  - The brief's "medieval Catalan kingdoms": Catalonia was a principality (the
 *    County of Barcelona and others) within the Crown of Aragon, never a kingdom.
 *  - The brief frames the story as a "democratic struggle for self-determination".
 *    The script presents that view and the opposing ones (the dynastic reading
 *    of 1714, the 1978 Constitution's "indissoluble unity", the Constitutional
 *    Court rulings, the 8 October 2017 unionist march, the 2026 polling) and
 *    attributes contested figures to their sources: the 2012 Diada (1.5m city
 *    police / 600,000 Spanish government), the 8 October 2017 march (350,000
 *    city police / ~950,000 organisers), and the 1 October results as "reported
 *    by the Catalan government".
 *  - The 1 October injury figures are disputed and are not given.
 *  - Brief listed Montjuïc castle and the Sagrada Família: Montjuïc (Companys's
 *    execution) is told from Sant Felip Neri; the Sagrada Família is not a
 *    political site and is left out. A Civil War shelter (Refugi 307, Poble-sec)
 *    is off-route; Sant Felip Neri tells the bombing story instead.
 *  - Puigdemont had not returned as of 13 October 2026; the script says only that
 *    the courts "cleared the way". Spain's general election is 29 November 2026.
 *    Re-check the last stop before promoting: it will date quickly.
 *  - Ten stops rather than 12-15, to keep the walk at ~5 km.
 *
 * Stops and the walking path come from OpenStreetMap (Overpass and Nominatim; the
 * path routed along OSM footways by the FOSSGIS foot router). Accurate to a few
 * metres, not surveyed: walk the route once before promoting it.
 *
 * Narration: these recordings are TEMPORARY, made with Google text-to-speech in
 * Professor Hoot's "Ask your guide" voice (en-GB-Standard-A). Replace them with the
 * original narrator's ElevenLabs voice, same file names.
 *
 * Cover: "Barcino Magna Parens" (the bombardment of Barcelona, 1714), engraving
 * printed by J. van Ghelen, Vienna, 1716 (Wikimedia Commons, public domain),
 * cropped.
 */

/**
 * Plaça del Rei -> Via Laietana -> Santa Maria del Mar -> Passeig del Born ->
 * Parc de la Ciutadella -> Passeig de Lluís Companys -> Sant Pere -> Via Laietana ->
 * the cathedral -> Sant Felip Neri -> Plaça de Sant Jaume -> Portal de l'Àngel ->
 * Plaça de Catalunya -> Rambla de Catalunya. About 5.2 km.
 */
const path = [
  { lat: 41.3841, lng: 2.177297 },
  { lat: 41.384044, lng: 2.177226 },
  { lat: 41.383981, lng: 2.177149 },
  { lat: 41.383926, lng: 2.177077 },
  { lat: 41.383911, lng: 2.177059 },
  { lat: 41.383826, lng: 2.177174 },
  { lat: 41.3838, lng: 2.177226 },
  { lat: 41.383749, lng: 2.177322 },
  { lat: 41.383627, lng: 2.177528 },
  { lat: 41.383525, lng: 2.177685 },
  { lat: 41.383501, lng: 2.177738 },
  { lat: 41.383644, lng: 2.17793 },
  { lat: 41.383885, lng: 2.178231 },
  { lat: 41.38391, lng: 2.178257 },
  { lat: 41.38406, lng: 2.178458 },
  { lat: 41.384004, lng: 2.178533 },
  { lat: 41.384056, lng: 2.178602 },
  { lat: 41.384092, lng: 2.178652 },
  { lat: 41.384111, lng: 2.178677 },
  { lat: 41.384056, lng: 2.178753 },
  { lat: 41.384057, lng: 2.178784 },
  { lat: 41.384029, lng: 2.178821 },
  { lat: 41.384003, lng: 2.178854 },
  { lat: 41.383965, lng: 2.178898 },
  { lat: 41.383878, lng: 2.179009 },
  { lat: 41.383893, lng: 2.17905 },
  { lat: 41.383863, lng: 2.179213 },
  { lat: 41.383837, lng: 2.179354 },
  { lat: 41.383743, lng: 2.179838 },
  { lat: 41.383707, lng: 2.180138 },
  { lat: 41.383666, lng: 2.180409 },
  { lat: 41.383632, lng: 2.180589 },
  { lat: 41.383621, lng: 2.180659 },
  { lat: 41.383582, lng: 2.180881 },
  { lat: 41.383533, lng: 2.18149 },
  { lat: 41.383523, lng: 2.181518 },
  { lat: 41.383465, lng: 2.181681 },
  { lat: 41.383394, lng: 2.181826 },
  { lat: 41.38335, lng: 2.181917 },
  { lat: 41.383412, lng: 2.182025 },
  { lat: 41.383429, lng: 2.182048 },
  { lat: 41.383621, lng: 2.182181 },
  { lat: 41.383768, lng: 2.182285 },
  { lat: 41.38391, lng: 2.182385 },
  { lat: 41.383988, lng: 2.182424 },
  { lat: 41.383981, lng: 2.182444 },
  { lat: 41.383972, lng: 2.182471 },
  { lat: 41.383981, lng: 2.182477 },
  { lat: 41.384026, lng: 2.182503 },
  { lat: 41.384067, lng: 2.18253 },
  { lat: 41.384089, lng: 2.182543 },
  { lat: 41.384195, lng: 2.182609 },
  { lat: 41.384201, lng: 2.182613 },
  { lat: 41.384218, lng: 2.182625 },
  { lat: 41.384241, lng: 2.182637 },
  { lat: 41.384361, lng: 2.182707 },
  { lat: 41.384564, lng: 2.182833 },
  { lat: 41.384673, lng: 2.1829 },
  { lat: 41.384694, lng: 2.182911 },
  { lat: 41.38471, lng: 2.182922 },
  { lat: 41.384876, lng: 2.183023 },
  { lat: 41.384922, lng: 2.183054 },
  { lat: 41.38497, lng: 2.183079 },
  { lat: 41.385043, lng: 2.183127 },
  { lat: 41.385054, lng: 2.18313 },
  { lat: 41.385084, lng: 2.183141 },
  { lat: 41.385101, lng: 2.183165 },
  { lat: 41.385097, lng: 2.183174 },
  { lat: 41.384811, lng: 2.183659 },
  { lat: 41.384816, lng: 2.183664 },
  { lat: 41.384961, lng: 2.183859 },
  { lat: 41.385044, lng: 2.183953 },
  { lat: 41.385059, lng: 2.183872 },
  { lat: 41.385188, lng: 2.183698 },
  { lat: 41.385579, lng: 2.183172 },
  { lat: 41.385188, lng: 2.183698 },
  { lat: 41.385059, lng: 2.183872 },
  { lat: 41.385044, lng: 2.183953 },
  { lat: 41.385022, lng: 2.184069 },
  { lat: 41.385041, lng: 2.184217 },
  { lat: 41.385179, lng: 2.184401 },
  { lat: 41.385219, lng: 2.184454 },
  { lat: 41.385256, lng: 2.184504 },
  { lat: 41.385334, lng: 2.184607 },
  { lat: 41.385378, lng: 2.184665 },
  { lat: 41.385411, lng: 2.184709 },
  { lat: 41.385488, lng: 2.184812 },
  { lat: 41.38554, lng: 2.184882 },
  { lat: 41.38559, lng: 2.184948 },
  { lat: 41.385647, lng: 2.185024 },
  { lat: 41.385693, lng: 2.185085 },
  { lat: 41.385781, lng: 2.185202 },
  { lat: 41.385812, lng: 2.185254 },
  { lat: 41.385623, lng: 2.185508 },
  { lat: 41.385658, lng: 2.185554 },
  { lat: 41.38574, lng: 2.185661 },
  { lat: 41.385776, lng: 2.185706 },
  { lat: 41.385789, lng: 2.185723 },
  { lat: 41.385824, lng: 2.185764 },
  { lat: 41.38585, lng: 2.185767 },
  { lat: 41.385877, lng: 2.185798 },
  { lat: 41.385899, lng: 2.185796 },
  { lat: 41.385946, lng: 2.185854 },
  { lat: 41.38608, lng: 2.186035 },
  { lat: 41.38622, lng: 2.186226 },
  { lat: 41.386251, lng: 2.186268 },
  { lat: 41.386365, lng: 2.186113 },
  { lat: 41.386386, lng: 2.18614 },
  { lat: 41.386563, lng: 2.186367 },
  { lat: 41.386575, lng: 2.186382 },
  { lat: 41.386592, lng: 2.186403 },
  { lat: 41.386643, lng: 2.186472 },
  { lat: 41.386686, lng: 2.18653 },
  { lat: 41.386706, lng: 2.186558 },
  { lat: 41.386727, lng: 2.186587 },
  { lat: 41.386922, lng: 2.186854 },
  { lat: 41.386967, lng: 2.186792 },
  { lat: 41.386993, lng: 2.186836 },
  { lat: 41.387021, lng: 2.186877 },
  { lat: 41.387075, lng: 2.186974 },
  { lat: 41.387158, lng: 2.187105 },
  { lat: 41.387181, lng: 2.187145 },
  { lat: 41.387202, lng: 2.187189 },
  { lat: 41.38723, lng: 2.187223 },
  { lat: 41.387379, lng: 2.187531 },
  { lat: 41.387403, lng: 2.187579 },
  { lat: 41.387427, lng: 2.187633 },
  { lat: 41.387457, lng: 2.1877 },
  { lat: 41.387511, lng: 2.187814 },
  { lat: 41.387567, lng: 2.187929 },
  { lat: 41.387511, lng: 2.187814 },
  { lat: 41.387457, lng: 2.1877 },
  { lat: 41.387427, lng: 2.187633 },
  { lat: 41.387403, lng: 2.187579 },
  { lat: 41.387734, lng: 2.187297 },
  { lat: 41.387714, lng: 2.187258 },
  { lat: 41.387386, lng: 2.186566 },
  { lat: 41.387366, lng: 2.186534 },
  { lat: 41.387323, lng: 2.186453 },
  { lat: 41.387304, lng: 2.186412 },
  { lat: 41.387292, lng: 2.186365 },
  { lat: 41.387412, lng: 2.186208 },
  { lat: 41.387434, lng: 2.186179 },
  { lat: 41.387412, lng: 2.186149 },
  { lat: 41.387252, lng: 2.185937 },
  { lat: 41.387231, lng: 2.185909 },
  { lat: 41.387497, lng: 2.185552 },
  { lat: 41.387747, lng: 2.185228 },
  { lat: 41.387766, lng: 2.185203 },
  { lat: 41.387787, lng: 2.185175 },
  { lat: 41.388036, lng: 2.184848 },
  { lat: 41.388281, lng: 2.184527 },
  { lat: 41.388297, lng: 2.184505 },
  { lat: 41.388312, lng: 2.184487 },
  { lat: 41.388405, lng: 2.18436 },
  { lat: 41.388519, lng: 2.184208 },
  { lat: 41.388499, lng: 2.184179 },
  { lat: 41.38848, lng: 2.184156 },
  { lat: 41.388442, lng: 2.184105 },
  { lat: 41.388527, lng: 2.183985 },
  { lat: 41.388541, lng: 2.183967 },
  { lat: 41.388701, lng: 2.183749 },
  { lat: 41.38875, lng: 2.183678 },
  { lat: 41.38879, lng: 2.183621 },
  { lat: 41.388831, lng: 2.183565 },
  { lat: 41.388847, lng: 2.183544 },
  { lat: 41.388858, lng: 2.183531 },
  { lat: 41.388894, lng: 2.183487 },
  { lat: 41.38894, lng: 2.183429 },
  { lat: 41.388961, lng: 2.183403 },
  { lat: 41.388971, lng: 2.18339 },
  { lat: 41.38898, lng: 2.18338 },
  { lat: 41.389014, lng: 2.183342 },
  { lat: 41.389032, lng: 2.183366 },
  { lat: 41.389052, lng: 2.183326 },
  { lat: 41.389056, lng: 2.183281 },
  { lat: 41.3894, lng: 2.182829 },
  { lat: 41.389719, lng: 2.182405 },
  { lat: 41.389787, lng: 2.182313 },
  { lat: 41.390114, lng: 2.181872 },
  { lat: 41.39019, lng: 2.181774 },
  { lat: 41.390513, lng: 2.181358 },
  { lat: 41.390574, lng: 2.181276 },
  { lat: 41.39069, lng: 2.181115 },
  { lat: 41.390996, lng: 2.180705 },
  { lat: 41.391011, lng: 2.180684 },
  { lat: 41.391071, lng: 2.180605 },
  { lat: 41.391116, lng: 2.180546 },
  { lat: 41.391235, lng: 2.180391 },
  { lat: 41.391277, lng: 2.180338 },
  { lat: 41.391314, lng: 2.180305 },
  { lat: 41.391326, lng: 2.180287 },
  { lat: 41.391355, lng: 2.180252 },
  { lat: 41.391406, lng: 2.18031 },
  { lat: 41.391431, lng: 2.180315 },
  { lat: 41.391462, lng: 2.180314 },
  { lat: 41.391484, lng: 2.180303 },
  { lat: 41.391497, lng: 2.180294 },
  { lat: 41.391484, lng: 2.180303 },
  { lat: 41.391462, lng: 2.180314 },
  { lat: 41.391431, lng: 2.180315 },
  { lat: 41.391406, lng: 2.18031 },
  { lat: 41.391355, lng: 2.180252 },
  { lat: 41.391326, lng: 2.180287 },
  { lat: 41.391314, lng: 2.180305 },
  { lat: 41.391277, lng: 2.180338 },
  { lat: 41.391112, lng: 2.180141 },
  { lat: 41.391103, lng: 2.18013 },
  { lat: 41.391094, lng: 2.180116 },
  { lat: 41.391084, lng: 2.180104 },
  { lat: 41.391075, lng: 2.18009 },
  { lat: 41.391067, lng: 2.180078 },
  { lat: 41.39106, lng: 2.180067 },
  { lat: 41.391049, lng: 2.180043 },
  { lat: 41.391037, lng: 2.180022 },
  { lat: 41.390991, lng: 2.179967 },
  { lat: 41.390949, lng: 2.179911 },
  { lat: 41.390936, lng: 2.179893 },
  { lat: 41.390959, lng: 2.179853 },
  { lat: 41.390948, lng: 2.179803 },
  { lat: 41.390725, lng: 2.179199 },
  { lat: 41.390706, lng: 2.17915 },
  { lat: 41.390696, lng: 2.179122 },
  { lat: 41.390593, lng: 2.178825 },
  { lat: 41.390517, lng: 2.178626 },
  { lat: 41.390476, lng: 2.178526 },
  { lat: 41.39047, lng: 2.178496 },
  { lat: 41.390457, lng: 2.178468 },
  { lat: 41.390125, lng: 2.177558 },
  { lat: 41.390105, lng: 2.177533 },
  { lat: 41.390078, lng: 2.177533 },
  { lat: 41.39007, lng: 2.177542 },
  { lat: 41.390034, lng: 2.177483 },
  { lat: 41.390008, lng: 2.177447 },
  { lat: 41.389978, lng: 2.177408 },
  { lat: 41.389983, lng: 2.177394 },
  { lat: 41.389955, lng: 2.177323 },
  { lat: 41.389717, lng: 2.177001 },
  { lat: 41.389375, lng: 2.176545 },
  { lat: 41.389354, lng: 2.176518 },
  { lat: 41.389044, lng: 2.17609 },
  { lat: 41.388867, lng: 2.175854 },
  { lat: 41.388814, lng: 2.175808 },
  { lat: 41.388804, lng: 2.175803 },
  { lat: 41.388798, lng: 2.175784 },
  { lat: 41.388423, lng: 2.175283 },
  { lat: 41.388139, lng: 2.174901 },
  { lat: 41.388122, lng: 2.174922 },
  { lat: 41.38799, lng: 2.175097 },
  { lat: 41.387533, lng: 2.1757 },
  { lat: 41.387394, lng: 2.175534 },
  { lat: 41.387363, lng: 2.175503 },
  { lat: 41.387205, lng: 2.175344 },
  { lat: 41.387148, lng: 2.175283 },
  { lat: 41.387112, lng: 2.175243 },
  { lat: 41.387086, lng: 2.175221 },
  { lat: 41.387057, lng: 2.175196 },
  { lat: 41.387032, lng: 2.175183 },
  { lat: 41.386999, lng: 2.175173 },
  { lat: 41.386931, lng: 2.175155 },
  { lat: 41.386884, lng: 2.175135 },
  { lat: 41.386844, lng: 2.175107 },
  { lat: 41.386828, lng: 2.175094 },
  { lat: 41.386743, lng: 2.175199 },
  { lat: 41.38673, lng: 2.175183 },
  { lat: 41.386725, lng: 2.175176 },
  { lat: 41.386716, lng: 2.175164 },
  { lat: 41.386685, lng: 2.175118 },
  { lat: 41.386656, lng: 2.175078 },
  { lat: 41.38665, lng: 2.175069 },
  { lat: 41.386639, lng: 2.17505 },
  { lat: 41.386623, lng: 2.17507 },
  { lat: 41.386578, lng: 2.175133 },
  { lat: 41.386555, lng: 2.175149 },
  { lat: 41.386463, lng: 2.175248 },
  { lat: 41.386438, lng: 2.175285 },
  { lat: 41.386416, lng: 2.175316 },
  { lat: 41.386394, lng: 2.175333 },
  { lat: 41.38638, lng: 2.175365 },
  { lat: 41.386178, lng: 2.175462 },
  { lat: 41.386181, lng: 2.175513 },
  { lat: 41.385886, lng: 2.175619 },
  { lat: 41.385764, lng: 2.175671 },
  { lat: 41.385685, lng: 2.175705 },
  { lat: 41.385375, lng: 2.175832 },
  { lat: 41.385248, lng: 2.175887 },
  { lat: 41.385099, lng: 2.175952 },
  { lat: 41.385055, lng: 2.175971 },
  { lat: 41.384963, lng: 2.176103 },
  { lat: 41.384724, lng: 2.17654 },
  { lat: 41.384719, lng: 2.176554 },
  { lat: 41.384423, lng: 2.176325 },
  { lat: 41.384389, lng: 2.176314 },
  { lat: 41.384315, lng: 2.176221 },
  { lat: 41.384317, lng: 2.176211 },
  { lat: 41.384272, lng: 2.176154 },
  { lat: 41.384228, lng: 2.176098 },
  { lat: 41.38422, lng: 2.176101 },
  { lat: 41.384162, lng: 2.176026 },
  { lat: 41.384139, lng: 2.175997 },
  { lat: 41.38413, lng: 2.175998 },
  { lat: 41.384027, lng: 2.17587 },
  { lat: 41.383926, lng: 2.175748 },
  { lat: 41.383858, lng: 2.175648 },
  { lat: 41.383848, lng: 2.175634 },
  { lat: 41.383734, lng: 2.175778 },
  { lat: 41.383721, lng: 2.17576 },
  { lat: 41.383659, lng: 2.175667 },
  { lat: 41.383559, lng: 2.175517 },
  { lat: 41.38358, lng: 2.175424 },
  { lat: 41.383581, lng: 2.175404 },
  { lat: 41.383549, lng: 2.175321 },
  { lat: 41.383532, lng: 2.175186 },
  { lat: 41.383516, lng: 2.175125 },
  { lat: 41.383486, lng: 2.175112 },
  { lat: 41.383455, lng: 2.175105 },
  { lat: 41.383424, lng: 2.175102 },
  { lat: 41.383394, lng: 2.175105 },
  { lat: 41.383382, lng: 2.175109 },
  { lat: 41.383369, lng: 2.175113 },
  { lat: 41.383344, lng: 2.175125 },
  { lat: 41.38332, lng: 2.17514 },
  { lat: 41.383296, lng: 2.175159 },
  { lat: 41.383087, lng: 2.175375 },
  { lat: 41.383181, lng: 2.175506 },
  { lat: 41.383295, lng: 2.175654 },
  { lat: 41.383022, lng: 2.176043 },
  { lat: 41.382956, lng: 2.176104 },
  { lat: 41.382886, lng: 2.176184 },
  { lat: 41.382808, lng: 2.176323 },
  { lat: 41.382765, lng: 2.176434 },
  { lat: 41.382632, lng: 2.176635 },
  { lat: 41.382613, lng: 2.176665 },
  { lat: 41.382571, lng: 2.176617 },
  { lat: 41.382439, lng: 2.176816 },
  { lat: 41.382615, lng: 2.177039 },
  { lat: 41.382767, lng: 2.177231 },
  { lat: 41.382912, lng: 2.177008 },
  { lat: 41.38293, lng: 2.176978 },
  { lat: 41.383107, lng: 2.176694 },
  { lat: 41.383256, lng: 2.176477 },
  { lat: 41.383299, lng: 2.176412 },
  { lat: 41.383433, lng: 2.176204 },
  { lat: 41.383577, lng: 2.175997 },
  { lat: 41.383734, lng: 2.175778 },
  { lat: 41.383848, lng: 2.175634 },
  { lat: 41.383872, lng: 2.175603 },
  { lat: 41.38398, lng: 2.175463 },
  { lat: 41.384004, lng: 2.175434 },
  { lat: 41.384214, lng: 2.175239 },
  { lat: 41.384249, lng: 2.175059 },
  { lat: 41.384359, lng: 2.174954 },
  { lat: 41.384702, lng: 2.174314 },
  { lat: 41.384683, lng: 2.174174 },
  { lat: 41.384669, lng: 2.174066 },
  { lat: 41.384784, lng: 2.174006 },
  { lat: 41.384908, lng: 2.173879 },
  { lat: 41.385109, lng: 2.17371 },
  { lat: 41.385147, lng: 2.173695 },
  { lat: 41.385161, lng: 2.173689 },
  { lat: 41.385197, lng: 2.173643 },
  { lat: 41.385341, lng: 2.173461 },
  { lat: 41.385503, lng: 2.173224 },
  { lat: 41.385596, lng: 2.173089 },
  { lat: 41.38596, lng: 2.17259 },
  { lat: 41.386108, lng: 2.172407 },
  { lat: 41.386339, lng: 2.172121 },
  { lat: 41.386585, lng: 2.171807 },
  { lat: 41.38679, lng: 2.171569 },
  { lat: 41.386865, lng: 2.171494 },
  { lat: 41.386874, lng: 2.171485 },
  { lat: 41.386883, lng: 2.171477 },
  { lat: 41.386919, lng: 2.17144 },
  { lat: 41.386881, lng: 2.171358 },
  { lat: 41.386838, lng: 2.171287 },
  { lat: 41.386813, lng: 2.171256 },
  { lat: 41.386871, lng: 2.171133 },
  { lat: 41.386919, lng: 2.171032 },
  { lat: 41.38694, lng: 2.170981 },
  { lat: 41.38694, lng: 2.170857 },
  { lat: 41.386939, lng: 2.17071 },
  { lat: 41.386942, lng: 2.17069 },
  { lat: 41.386955, lng: 2.170595 },
  { lat: 41.386981, lng: 2.170403 },
  { lat: 41.386984, lng: 2.170358 },
  { lat: 41.387006, lng: 2.170038 },
  { lat: 41.387046, lng: 2.169713 },
  { lat: 41.387048, lng: 2.169694 },
  { lat: 41.387069, lng: 2.169522 },
  { lat: 41.387081, lng: 2.169424 },
  { lat: 41.387106, lng: 2.169224 },
  { lat: 41.38739, lng: 2.168961 },
  { lat: 41.387457, lng: 2.168903 },
  { lat: 41.38749, lng: 2.168807 },
  { lat: 41.387527, lng: 2.168694 },
  { lat: 41.38754, lng: 2.168596 },
  { lat: 41.387555, lng: 2.168472 },
  { lat: 41.387627, lng: 2.16837 },
  { lat: 41.387731, lng: 2.168222 },
  { lat: 41.387901, lng: 2.167998 },
  { lat: 41.38804, lng: 2.167799 },
  { lat: 41.388219, lng: 2.167561 },
  { lat: 41.388329, lng: 2.167417 },
  { lat: 41.388291, lng: 2.167363 },
  { lat: 41.388254, lng: 2.167316 },
  { lat: 41.388277, lng: 2.16729 },
  { lat: 41.388288, lng: 2.167212 },
  { lat: 41.3883, lng: 2.167151 },
  { lat: 41.388316, lng: 2.167111 },
  { lat: 41.388357, lng: 2.167012 },
  { lat: 41.388467, lng: 2.166859 },
  { lat: 41.388498, lng: 2.166817 },
  { lat: 41.388525, lng: 2.166785 },
  { lat: 41.388539, lng: 2.166766 },
  { lat: 41.388657, lng: 2.166606 },
  { lat: 41.388634, lng: 2.166574 },
  { lat: 41.388685, lng: 2.166505 },
  { lat: 41.388713, lng: 2.166467 },
];

export const barcelonaCatalanIndependence: Area = {
  id: "barcelona-catalan-independence",
  name: "Catalonia and Spain: A Divided Story",
  city: "Barcelona",
  description:
    "From the medieval Counts of Barcelona and the fall of the city on 11 September 1714 to Franco's repression, Tarradellas's return and the 2017 referendum: the places where Catalonia's long argument with Spain has played out, told with the voices of both sides.",
  estimatedDurationMin: 120,
  estimatedDistanceKm: 5.2,
  difficulty: "easy",
  accessNote:
    "A flat walk through the Gothic Quarter, La Ribera, the Parc de la Ciutadella and the Eixample. El Born Centre de Cultura i Memòria is free to enter and keeps its own hours. The tour covers war, repression and current politics.",
  isContentComplete: true,
  enableInteractiveGuide: true,
  image: require("../../../assets/tours/barcelona-catalan-independence.jpg"),
  price: { singleTour: 4.99 },
  startingPoint: {
    lat: 41.38416,
    lng: 2.17739,
    label: "Plaça del Rei, behind the cathedral",
  },
  route: [
    {
      id: "ind-placa-del-rei",
      order: 1,
      name: "Plaça del Rei: the Counts of Barcelona",
      coordinates: { lat: 41.38416, lng: 2.17739 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 78,
        audioSource: require("../../../assets/audio/barcelona-catalan-independence/01-placa-del-rei.mp3"),
        scriptText: `Bon dia, and welcome. On this walk we'll explore one of Europe's most passionate political questions: Catalonia's identity, and its long, unresolved relationship with Spain. It's a story people here feel very deeply, on all sides, so we'll try to hear more than one voice.

We start in the Plaça del Rei, the King's Square, beside the medieval royal palace. A thousand years ago, Barcelona was ruled by its own counts. In the twelfth century, a Count of Barcelona, Ramon Berenguer the Fourth, was betrothed to the heiress of the Kingdom of Aragon. Their union created the Crown of Aragon, a Mediterranean power that came to rule Valencia, Mallorca, Sicily, Sardinia and, for a time, Naples.

Catalonia itself was never a kingdom. It was a principality with its own laws, its own language, and its own parliament, the Corts, one of the earliest in Europe. In 1359 the Corts created a permanent body to collect taxes, the Diputació del General. We know it today as the Generalitat, Catalonia's government.

When the crowns of Aragon and Castile were joined by marriage in the late fifteenth century, Catalonia kept those institutions. For two more centuries, it did.

Now walk down to the Gothic church of Santa Maria del Mar.`,
      },
    },
    {
      id: "ind-fossar",
      order: 2,
      name: "Fossar de les Moreres: 11 September 1714",
      coordinates: { lat: 41.38375, lng: 2.18233 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 78,
        audioSource: require("../../../assets/audio/barcelona-catalan-independence/02-fossar-de-les-moreres.mp3"),
        scriptText: `This sloping square beside Santa Maria del Mar is the Fossar de les Moreres, the graveyard of the mulberry trees. It's one of the most emotional places in Catalonia.

In 1700 the King of Spain died without an heir, and Europe went to war over who should succeed him: the French Bourbon, Philip, or the Austrian Habsburg, Archduke Charles. Catalonia backed the Archduke. When Britain and its allies made peace and withdrew, Barcelona fought on alone.

Philip's armies besieged the city for thirteen months. On the 11th of September 1714, after a final assault, Barcelona fell. Thousands had died on each side. Many of the defenders were buried here.

Historians still debate what the war meant. Some see a struggle for Catalan liberties; others stress that it was a European dynastic war, and that many defenders saw themselves as fighting for the rightful King of Spain. Both can be true.

In 1870 the playwright Frederic Soler wrote the lines carved here: "In the graveyard of the mulberries, no traitor is buried." The eternal flame was added in 2001. Every 11th of September, Catalonia's National Day, the Diada, people come to lay flowers.

Now walk along the Passeig del Born, to the great iron market hall at the end.`,
      },
    },
    {
      id: "ind-born",
      order: 3,
      name: "El Born: the buried neighbourhood",
      coordinates: { lat: 41.3856, lng: 2.1832 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 80,
        audioSource: require("../../../assets/audio/barcelona-catalan-independence/03-el-born.mp3"),
        scriptText: `This iron and glass market hall opened in 1876. When work began to turn it into a library in 2002, the builders found something extraordinary beneath the floor: the streets, houses and taverns of a neighbourhood buried since the early eighteenth century.

After 1714, Philip the Fifth punished Barcelona. To control the city, he built a huge star-shaped fortress, the Ciutadella, just east of here, and to make room, a large part of this district, La Ribera, was demolished. Families were forced out, many with little compensation, and the ruins were buried.

Then came the Nueva Planta decrees. For Catalonia, they took effect in 1716, abolishing the Generalitat, the Corts and Catalonia's own system of government, and imposing Castilian rule from Madrid, though Catalan civil law survived. Castilian Spanish became the language of government and the courts.

Inside, you can look down on the excavated streets. The centre opened on the 11th of September 2013, as the three-hundredth anniversary of the siege began, at a time when the movement for independence was growing fast. Some saw it as long-overdue memory; critics saw it as a political symbol. Either way, the ruins are real.

Now walk east to the Parc de la Ciutadella, where that fortress once stood.`,
      },
    },
    {
      id: "ind-parlament",
      order: 4,
      name: "The Parliament: from fortress to assembly",
      coordinates: { lat: 41.3876, lng: 2.1879 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 77,
        audioSource: require("../../../assets/audio/barcelona-catalan-independence/04-parlament.mp3"),
        scriptText: `This elegant building was once the arsenal of the Ciutadella fortress, built in the 1720s. For a century and a half the fortress was a hated symbol of military control over the city. When it was finally pulled down in the late 1860s, the land became this park.

The arsenal survived, and in 1932, under Spain's Second Republic, it became the home of the restored Parliament of Catalonia. Franco abolished it after the Civil War. It returned with democracy, meeting here again from 1980.

In September 2017, this chamber became the centre of a political storm. With most opposition members walking out in protest, the pro-independence majority passed laws for a referendum and for a transition to a Catalan republic. Spain's Constitutional Court suspended them. Then, on the 27th of October 2017, after the referendum, the majority voted for a declaration of independence.

That same day, the Spanish Senate approved Article 155 of the Constitution, which Madrid had never used before. Spain took direct control of the Catalan government, dismissed it, and called fresh elections. No country recognised the declaration.

Now walk up through the park to the red-brick triumphal arch.`,
      },
    },
    {
      id: "ind-arc-de-triomf",
      order: 5,
      name: "The Arc de Triomf: a confident Catalonia",
      coordinates: { lat: 41.3915, lng: 2.1803 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 78,
        audioSource: require("../../../assets/audio/barcelona-catalan-independence/05-arc-de-triomf.mp3"),
        scriptText: `This red-brick arch was the entrance to Barcelona's Universal Exposition of 1888. Its carvings welcome the nations of the world.

By then, Catalonia was the industrial powerhouse of Spain, full of textile mills, and its confident middle class was rediscovering its culture. They called this movement the Renaixença, the Renaissance: a revival of the Catalan language in poetry and theatre, of medieval history, and later of modernista architecture. From culture grew politics, a movement called Catalanism. Most early Catalanists wanted self-government within Spain, not a separate state.

In 1914 the four Catalan provinces were joined into a regional body, the Mancomunitat, which built libraries, schools and roads. The dictatorship of Primo de Rivera abolished it in 1925, and restricted the public use of Catalan.

This avenue has a modern story too. On the 8th of August 2024, the former president Carles Puigdemont, living in Belgium since 2017 and wanted by Spanish courts, appeared on a stage here in front of thousands of supporters, gave a short speech, and vanished before police could arrest him. He was back in Belgium days later.

Now walk west through the streets of Sant Pere, to a building covered in flowers and mosaics.`,
      },
    },
    {
      id: "ind-palau-musica",
      order: 6,
      name: "Palau de la Música: singing in defiance",
      coordinates: { lat: 41.38745, lng: 2.17535 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 79,
        audioSource: require("../../../assets/audio/barcelona-catalan-independence/06-palau-de-la-musica.mp3"),
        scriptText: `This dazzling building is the Palau de la Música Catalana, designed by Lluís Domènech i Montaner and opened in 1908 for the Orfeó Català, a choral society. Look at the sculpture on the corner, with Saint George and Catalan singers: it's a monument to Catalan culture in stone.

After the Civil War, Franco's regime set out to build a single Spanish identity. Catalan was pushed out of schools, government and public life, and Catalan symbols were banned. For years people spoke it mainly at home.

On the 19th of May 1960, Franco was visiting Barcelona, and several of his ministers attended a concert here honouring the Catalan poet Joan Maragall. A Catalan song, the Cant de la Senyera, the song of the flag, had been dropped from the programme. When the moment came, young people in the audience stood up and sang it anyway.

Arrests followed. One of the organisers, a young doctor named Jordi Pujol, was tried and imprisoned. Twenty years later, he became President of Catalonia, and governed for twenty-three years, though his reputation was badly damaged in 2014, when he admitted keeping undeclared family money abroad.

The Fets del Palau, the Palau Events, showed that a culture could survive by being sung.

Now walk a few steps to Via Laietana, to number 43.`,
      },
    },
    {
      id: "ind-via-laietana",
      order: 7,
      name: "Via Laietana 43: a place of repression",
      coordinates: { lat: 41.38645, lng: 2.1753 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 76,
        audioSource: require("../../../assets/audio/barcelona-catalan-independence/07-via-laietana-43.mp3"),
        scriptText: `The building at number 43 is still a Spanish police station. But from 1941 it was the headquarters of Franco's political police, the Brigada Político-Social. People arrested for opposing the dictatorship, trade unionists, students, nationalists and communists, were brought here and interrogated, and many were tortured. Workers had a grim nickname for it.

It's important to remember that Franco's repression was not only against Catalans. It fell on Republicans, the left and trade unionists all over Spain, in every region. In Catalonia it also fell on the language and the culture.

Democracy came after Franco's death in 1975, and Spain's 1978 Constitution recognised its "nationalities and regions," with a right to autonomy. But it also proclaimed "the indissoluble unity of the Spanish nation." Those two phrases sit side by side, and much of what follows grows from the tension between them.

In 2019 the city placed a memorial marker here. In 2025 the Spanish government declared the building a site of democratic memory, but the police remain, and memorial groups continue to campaign for them to leave.

Now walk past the cathedral into the Gothic Quarter, to a small, quiet square.`,
      },
    },
    {
      id: "ind-sant-felip-neri",
      order: 8,
      name: "Sant Felip Neri: the war comes to Barcelona",
      coordinates: { lat: 41.38338, lng: 2.1751 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 70,
        audioSource: require("../../../assets/audio/barcelona-catalan-independence/08-sant-felip-neri.mp3"),
        scriptText: `This is one of the most peaceful squares in Barcelona. Look at the church wall. It's pitted with holes.

During the Civil War, Barcelona, loyal to the Republic, was bombed from the air, above all by Italian aircraft sent by Mussolini to support Franco. On the morning of the 30th of January 1938, bombs fell here. The basement of the church was being used as a shelter, many of them children. Forty-two people were killed.

For decades, under the dictatorship, people were told the marks came from firing squads. Only in recent years has the true story been told on a plaque in the square.

Barcelona fell to Franco's army in January 1939. Hundreds of thousands fled to France. Among them was the President of the Generalitat, Lluís Companys. In 1940 the German Gestapo arrested him in occupied France and handed him to Franco. He was tried by a military court and shot on the 15th of October 1940, in the moat of Montjuïc castle, on the hill you can see from the waterfront. His execution is still remembered with deep emotion here.

Now walk round the corner to Plaça de Sant Jaume.`,
      },
    },
    {
      id: "ind-sant-jaume",
      order: 9,
      name: "Plaça de Sant Jaume: the balcony",
      coordinates: { lat: 41.38265, lng: 2.17699 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 83,
        audioSource: require("../../../assets/audio/barcelona-catalan-independence/09-placa-de-sant-jaume.mp3"),
        scriptText: `On one side of this square is the City Hall. On the other, the Palau de la Generalitat, the seat of the Catalan government since the fifteenth century. From its balcony, history has been announced again and again.

On the 14th of April 1931, as Spain became a republic, Francesc Macià proclaimed a Catalan republic from here. Within days he agreed to accept autonomy within Spain instead, and the Generalitat was reborn. In October 1934, his successor, Companys, proclaimed a Catalan state within a federal Spanish republic; the army put it down within hours.

And on the 23rd of October 1977, after thirty-eight years in exile, the president of the Generalitat in exile, Josep Tarradellas, came out on that balcony and told the crowd: "Ciutadans de Catalunya, ja sóc aquí!" Citizens of Catalonia, I'm back! Two years later Catalonia had a new Statute of Autonomy.

In 2006 a new, wider Statute was approved by both parliaments and by a referendum in Catalonia. In 2010 Spain's Constitutional Court struck down or reinterpreted parts of it, including its description of Catalonia as a nation. Huge protests followed, and support for independence, long a minority view, began to rise.

Now walk up to Plaça de Catalunya and on to Rambla de Catalunya.`,
      },
    },
    {
      id: "ind-rambla-catalunya",
      order: 10,
      name: "Rambla de Catalunya: 2017 and after",
      coordinates: { lat: 41.3887, lng: 2.16645 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 86,
        audioSource: require("../../../assets/audio/barcelona-catalan-independence/10-rambla-de-catalunya.mp3"),
        scriptText: `We end outside the Catalan government's economy department, at number 19 Rambla de Catalunya.

From 2012, every 11th of September brought vast marches for independence; the first was put at a million and a half people by the city police, six hundred thousand by Spain's government. On the 20th of September 2017, Spanish police raided this building as part of an operation against the planned referendum. Thousands gathered outside, led by two civic leaders, Jordi Sànchez and Jordi Cuixart.

On the 1st of October, the referendum went ahead despite the courts. The Catalan government reported ninety per cent yes, on a turnout of about forty-three per cent; most opponents of independence didn't vote. Police tried to stop the voting, and images of injured voters went round the world. A week later, hundreds of thousands marched here in Barcelona for Spanish unity.

In 2019 nine leaders, including the two Jordis, were jailed for sedition. They were pardoned in 2021, sedition was abolished as a crime, and in 2024 Spain passed an amnesty law. On the 6th of October 2026, the courts cleared the way for Puigdemont's return.

Today a pro-union socialist, Salvador Illa, leads Catalonia, and polls show the country split, with slightly more against independence than for it. The story isn't over.

Thank you for walking with me. Adéu!`,
      },
    },
  ],
  path,
};

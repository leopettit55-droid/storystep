import type { Area } from "../schema";

/**
 * Mary Somerville's Edinburgh: the self-taught mathematician and science
 * writer who grew up spending winters here, from her dancing school and
 * Nasmyth's painting academy to John Playfair's monument on Calton Hill and the
 * Scottish Parliament room named after her. A shorter tour: her surviving
 * Edinburgh sites are few, and the tour doesn't invent more.
 * Researched October 2026.
 *
 * Her own words come from Personal Recollections, from Early Life to Old Age,
 * of Mary Somerville (1873, compiled by her daughter Martha; Project Gutenberg
 * #27747): Princes Street; "the injustice of the world"; Strange's dancing
 * school in the George Street assembly rooms; Queen Street's view of the
 * Forth; the algebra in Miss Ogilvie's fashion magazine (at Burntisland); the
 * confiscated candle; Nasmyth on Euclid, and the footnote on "the cleverest
 * young lady he ever taught"; Cymbeline, Mrs Siddons and John Home; Playfair's
 * advice on the Mécanique Céleste; her library at thirty-three; the telescope
 * she never owned; John Couch Adams and Neptune (her account); J. S. Mill.
 * Other sources: Wikipedia (Mary Somerville, Alexander Nasmyth, Theatre Royal,
 * On the Connexion of the Physical Sciences, the RBS £10 note), Historic
 * Environment Scotland and Edinburgh Guide (the Playfair Monument and City
 * Observatory), the Courier and Wikipedia (the Scottish Parliament's Mary
 * Fairfax Somerville Room, 2010), RBS (the note, issued 4 October 2017).
 *
 * Where sources are thin or disagree, the scripts say so or leave it out:
 *  - She was born in Jedburgh and grew up in Burntisland; the algebra story
 *    happened in Burntisland, and the script says so.
 *  - Her adult Edinburgh addresses (1812-1816) aren't recorded in the sources
 *    used, so no home is claimed.
 *  - Nasmyth's teaching rooms were built into 47 York Place in the 1790s; the
 *    script doesn't claim her lessons were in this exact house.
 *  - Neptune: told as her own account of what Adams said, not as settled fact.
 *  - She left Edinburgh in 1816 (her memoir) for London; Wikipedia's 1819
 *    is her husband's later Chelsea Hospital post.
 *
 * Stops and the walking path come from OpenStreetMap (addresses via its
 * Nominatim search; the path routed along OSM footways by the FOSSGIS foot
 * router). Accurate to a few metres, not surveyed: walk the route once.
 *
 * Narration: these recordings are TEMPORARY, made with Google text-to-speech
 * in Professor Hoot's "Ask your guide" voice (en-GB-Standard-A). Replace them
 * with the original narrator's ElevenLabs voice, same file names.
 *
 * Cover: Alexander Nasmyth, "View of the City of Edinburgh", c. 1822, public
 * domain. Nasmyth was her art teacher.
 */

/** Princes Street → Rose Street → the Assembly Rooms on George Street → Queen
 * Street → Thistle Street and St Andrew Square → York Place → St James Quarter
 * and Leith Street → Waterloo Place (the old Theatre Royal site) → Calton Hill
 * → Regent Road, Calton Road and White Horse Close → the Canongate by the
 * Scottish Parliament. About 3.1 km. */
const path = [
  { lat: 55.952081, lng: -3.196915 },
  { lat: 55.952095, lng: -3.196828 },
  { lat: 55.952105, lng: -3.196793 },
  { lat: 55.952121, lng: -3.196758 },
  { lat: 55.952142, lng: -3.196733 },
  { lat: 55.952164, lng: -3.196717 },
  { lat: 55.952185, lng: -3.19672 },
  { lat: 55.952205, lng: -3.19673 },
  { lat: 55.952219, lng: -3.196737 },
  { lat: 55.952771, lng: -3.19701 },
  { lat: 55.952697, lng: -3.197444 },
  { lat: 55.952686, lng: -3.197584 },
  { lat: 55.952587, lng: -3.198168 },
  { lat: 55.952493, lng: -3.198721 },
  { lat: 55.952674, lng: -3.198823 },
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
  { lat: 55.953574, lng: -3.197587 },
  { lat: 55.953611, lng: -3.197481 },
  { lat: 55.953652, lng: -3.197503 },
  { lat: 55.953716, lng: -3.197537 },
  { lat: 55.954218, lng: -3.197809 },
  { lat: 55.9548, lng: -3.198119 },
  { lat: 55.954826, lng: -3.19796 },
  { lat: 55.954854, lng: -3.197805 },
  { lat: 55.954893, lng: -3.197753 },
  { lat: 55.954974, lng: -3.197299 },
  { lat: 55.955004, lng: -3.197133 },
  { lat: 55.955166, lng: -3.19617 },
  { lat: 55.955352, lng: -3.195016 },
  { lat: 55.955342, lng: -3.194984 },
  { lat: 55.954746, lng: -3.194669 },
  { lat: 55.954768, lng: -3.19454 },
  { lat: 55.954796, lng: -3.194555 },
  { lat: 55.955157, lng: -3.194742 },
  { lat: 55.955176, lng: -3.194633 },
  { lat: 55.955189, lng: -3.19458 },
  { lat: 55.955378, lng: -3.194686 },
  { lat: 55.955409, lng: -3.194676 },
  { lat: 55.955425, lng: -3.194642 },
  { lat: 55.955458, lng: -3.194347 },
  { lat: 55.955682, lng: -3.193002 },
  { lat: 55.955698, lng: -3.192897 },
  { lat: 55.955711, lng: -3.192808 },
  { lat: 55.955739, lng: -3.192821 },
  { lat: 55.955746, lng: -3.192773 },
  { lat: 55.956106, lng: -3.190636 },
  { lat: 55.956134, lng: -3.190475 },
  { lat: 55.956331, lng: -3.189321 },
  { lat: 55.956134, lng: -3.190475 },
  { lat: 55.956106, lng: -3.190636 },
  { lat: 55.955949, lng: -3.190553 },
  { lat: 55.955893, lng: -3.190531 },
  { lat: 55.955799, lng: -3.190505 },
  { lat: 55.955756, lng: -3.190499 },
  { lat: 55.955727, lng: -3.190498 },
  { lat: 55.955662, lng: -3.190455 },
  { lat: 55.955249, lng: -3.190252 },
  { lat: 55.955001, lng: -3.190141 },
  { lat: 55.954977, lng: -3.190118 },
  { lat: 55.954953, lng: -3.19008 },
  { lat: 55.954805, lng: -3.189776 },
  { lat: 55.954775, lng: -3.189828 },
  { lat: 55.954766, lng: -3.189811 },
  { lat: 55.954729, lng: -3.189733 },
  { lat: 55.954724, lng: -3.189724 },
  { lat: 55.954717, lng: -3.189712 },
  { lat: 55.954713, lng: -3.189703 },
  { lat: 55.954477, lng: -3.189266 },
  { lat: 55.954529, lng: -3.189187 },
  { lat: 55.954415, lng: -3.188982 },
  { lat: 55.954125, lng: -3.188853 },
  { lat: 55.95401, lng: -3.188803 },
  { lat: 55.953815, lng: -3.188719 },
  { lat: 55.953729, lng: -3.188674 },
  { lat: 55.953686, lng: -3.188639 },
  { lat: 55.953642, lng: -3.188651 },
  { lat: 55.953634, lng: -3.188654 },
  { lat: 55.953615, lng: -3.188657 },
  { lat: 55.953595, lng: -3.188663 },
  { lat: 55.953579, lng: -3.188669 },
  { lat: 55.95356, lng: -3.188677 },
  { lat: 55.953539, lng: -3.18869 },
  { lat: 55.953541, lng: -3.188672 },
  { lat: 55.953558, lng: -3.188552 },
  { lat: 55.953455, lng: -3.188516 },
  { lat: 55.953509, lng: -3.18819 },
  { lat: 55.953424, lng: -3.188149 },
  { lat: 55.953397, lng: -3.188299 },
  { lat: 55.953381, lng: -3.188315 },
  { lat: 55.953336, lng: -3.188319 },
  { lat: 55.953327, lng: -3.188375 },
  { lat: 55.953336, lng: -3.188319 },
  { lat: 55.953381, lng: -3.188315 },
  { lat: 55.953397, lng: -3.188299 },
  { lat: 55.953424, lng: -3.188149 },
  { lat: 55.953509, lng: -3.18819 },
  { lat: 55.953516, lng: -3.188148 },
  { lat: 55.953645, lng: -3.18737 },
  { lat: 55.953698, lng: -3.187057 },
  { lat: 55.953722, lng: -3.186903 },
  { lat: 55.953799, lng: -3.186491 },
  { lat: 55.953898, lng: -3.185923 },
  { lat: 55.95394, lng: -3.185684 },
  { lat: 55.953987, lng: -3.185413 },
  { lat: 55.954005, lng: -3.185292 },
  { lat: 55.954005, lng: -3.185282 },
  { lat: 55.954014, lng: -3.18522 },
  { lat: 55.954027, lng: -3.18505 },
  { lat: 55.954129, lng: -3.185027 },
  { lat: 55.954192, lng: -3.185025 },
  { lat: 55.954214, lng: -3.185026 },
  { lat: 55.954256, lng: -3.18502 },
  { lat: 55.95429, lng: -3.185003 },
  { lat: 55.954331, lng: -3.184989 },
  { lat: 55.954365, lng: -3.184982 },
  { lat: 55.954365, lng: -3.18494 },
  { lat: 55.954363, lng: -3.184745 },
  { lat: 55.95436, lng: -3.184559 },
  { lat: 55.954352, lng: -3.184125 },
  { lat: 55.954348, lng: -3.183838 },
  { lat: 55.954353, lng: -3.18371 },
  { lat: 55.954369, lng: -3.183605 },
  { lat: 55.954392, lng: -3.183537 },
  { lat: 55.954425, lng: -3.183486 },
  { lat: 55.954485, lng: -3.183481 },
  { lat: 55.954705, lng: -3.183482 },
  { lat: 55.954722, lng: -3.183483 },
  { lat: 55.954735, lng: -3.183205 },
  { lat: 55.954722, lng: -3.183483 },
  { lat: 55.954705, lng: -3.183482 },
  { lat: 55.954485, lng: -3.183481 },
  { lat: 55.954425, lng: -3.183486 },
  { lat: 55.954392, lng: -3.183537 },
  { lat: 55.954369, lng: -3.183605 },
  { lat: 55.954353, lng: -3.18371 },
  { lat: 55.954348, lng: -3.183838 },
  { lat: 55.954352, lng: -3.184125 },
  { lat: 55.95436, lng: -3.184559 },
  { lat: 55.954363, lng: -3.184745 },
  { lat: 55.954365, lng: -3.18494 },
  { lat: 55.954365, lng: -3.184982 },
  { lat: 55.954331, lng: -3.184989 },
  { lat: 55.95429, lng: -3.185003 },
  { lat: 55.954256, lng: -3.18502 },
  { lat: 55.954214, lng: -3.185026 },
  { lat: 55.954192, lng: -3.185025 },
  { lat: 55.954129, lng: -3.185027 },
  { lat: 55.954027, lng: -3.18505 },
  { lat: 55.954034, lng: -3.184881 },
  { lat: 55.954036, lng: -3.184781 },
  { lat: 55.954037, lng: -3.184671 },
  { lat: 55.954037, lng: -3.184572 },
  { lat: 55.954029, lng: -3.184341 },
  { lat: 55.953978, lng: -3.184345 },
  { lat: 55.953948, lng: -3.184346 },
  { lat: 55.95391, lng: -3.184329 },
  { lat: 55.953876, lng: -3.184293 },
  { lat: 55.953852, lng: -3.184203 },
  { lat: 55.953828, lng: -3.184092 },
  { lat: 55.95381, lng: -3.183987 },
  { lat: 55.953783, lng: -3.183837 },
  { lat: 55.953755, lng: -3.183674 },
  { lat: 55.953731, lng: -3.183544 },
  { lat: 55.95372, lng: -3.183474 },
  { lat: 55.953713, lng: -3.183404 },
  { lat: 55.953719, lng: -3.18334 },
  { lat: 55.953734, lng: -3.183289 },
  { lat: 55.953768, lng: -3.183241 },
  { lat: 55.95384, lng: -3.183157 },
  { lat: 55.953822, lng: -3.183093 },
  { lat: 55.953808, lng: -3.183041 },
  { lat: 55.953785, lng: -3.182958 },
  { lat: 55.953761, lng: -3.182887 },
  { lat: 55.953746, lng: -3.182844 },
  { lat: 55.953701, lng: -3.182741 },
  { lat: 55.953645, lng: -3.18261 },
  { lat: 55.953612, lng: -3.182552 },
  { lat: 55.953577, lng: -3.182488 },
  { lat: 55.953506, lng: -3.182371 },
  { lat: 55.953439, lng: -3.182254 },
  { lat: 55.953379, lng: -3.182146 },
  { lat: 55.953312, lng: -3.182074 },
  { lat: 55.953271, lng: -3.18198 },
  { lat: 55.953232, lng: -3.181862 },
  { lat: 55.953201, lng: -3.181738 },
  { lat: 55.953188, lng: -3.181644 },
  { lat: 55.953181, lng: -3.181533 },
  { lat: 55.953069, lng: -3.181565 },
  { lat: 55.953059, lng: -3.181564 },
  { lat: 55.953059, lng: -3.181554 },
  { lat: 55.95307, lng: -3.181302 },
  { lat: 55.9531, lng: -3.180886 },
  { lat: 55.953169, lng: -3.180097 },
  { lat: 55.953176, lng: -3.179977 },
  { lat: 55.953179, lng: -3.179819 },
  { lat: 55.953172, lng: -3.179542 },
  { lat: 55.953159, lng: -3.179281 },
  { lat: 55.953149, lng: -3.179145 },
  { lat: 55.953129, lng: -3.179023 },
  { lat: 55.953103, lng: -3.178879 },
  { lat: 55.953076, lng: -3.178733 },
  { lat: 55.953033, lng: -3.178503 },
  { lat: 55.952999, lng: -3.178357 },
  { lat: 55.952963, lng: -3.178202 },
  { lat: 55.952923, lng: -3.178065 },
  { lat: 55.952881, lng: -3.178069 },
  { lat: 55.952872, lng: -3.177891 },
  { lat: 55.952855, lng: -3.177574 },
  { lat: 55.952854, lng: -3.177557 },
  { lat: 55.952853, lng: -3.177466 },
  { lat: 55.952855, lng: -3.177365 },
  { lat: 55.952858, lng: -3.177264 },
  { lat: 55.952864, lng: -3.177171 },
  { lat: 55.95287, lng: -3.177096 },
  { lat: 55.952879, lng: -3.17702 },
  { lat: 55.952889, lng: -3.17695 },
  { lat: 55.952894, lng: -3.176915 },
  { lat: 55.952917, lng: -3.17676 },
  { lat: 55.952939, lng: -3.176622 },
  { lat: 55.952956, lng: -3.176495 },
  { lat: 55.952971, lng: -3.176375 },
  { lat: 55.952983, lng: -3.176263 },
  { lat: 55.952989, lng: -3.176141 },
  { lat: 55.952995, lng: -3.175982 },
  { lat: 55.952957, lng: -3.175952 },
  { lat: 55.95289, lng: -3.175897 },
  { lat: 55.952877, lng: -3.17587 },
  { lat: 55.952851, lng: -3.175849 },
  { lat: 55.952867, lng: -3.175766 },
  { lat: 55.952853, lng: -3.175752 },
  { lat: 55.952569, lng: -3.175461 },
  { lat: 55.952532, lng: -3.175416 },
  { lat: 55.952523, lng: -3.175404 },
  { lat: 55.952515, lng: -3.175392 },
  { lat: 55.952484, lng: -3.175353 },
  { lat: 55.952402, lng: -3.175683 },
];

export const edinburghSomerville: Area = {
  id: "edinburgh-somerville",
  name: "Mary Somerville's Edinburgh",
  city: "Edinburgh",
  description:
    "The self-taught mathematician on the Scottish ten-pound note: a girl who found algebra in a fashion magazine, studied by memory when her candle was taken away, and wrote the book that gave us the word \"scientist\".",
  estimatedDurationMin: 60,
  estimatedDistanceKm: 3.1,
  difficulty: "moderate",
  accessNote:
    "A shorter walk through the New Town and up Calton Hill, with steps up the hill and a steep descent to the Canongate.",
  isContentComplete: true,
  enableInteractiveGuide: true,
  image: require("../../../assets/tours/edinburgh-somerville.jpg"),
  price: { singleTour: 4.99 },
  startingPoint: {
    lat: 55.95215,
    lng: -3.19695,
    label: "Princes Street, at the foot of Hanover Street",
  },
  route: [
    {
      id: "somerville-princes-street",
      order: 1,
      name: "Princes Street: a girl in Georgian Edinburgh",
      coordinates: { lat: 55.95215, lng: -3.19695 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 67,
        audioSource: require("../../../assets/audio/edinburgh-somerville/01-princes-street.mp3"),
        scriptText: `Good day, and welcome. This short walk follows Mary Somerville, the self-taught Scottish mathematician whose book was the reason the word "scientist" was first printed, and whose face is on the Royal Bank of Scotland's ten-pound note.

She was born on the 26th of December 1780, at the manse in Jedburgh, in the Borders, the daughter of a naval officer who would later fight at the Battle of Camperdown. She grew up in Burntisland, across the Forth in Fife, but the family spent winters here in Edinburgh, and the New Town was brand new.

In the memoirs she wrote in old age, she remembered how free the girls were: "We walked together in Princes Street, the fashionable promenade, and were joined by our dancing partners."

But girls of her class were taught to sew, dance, paint and play the piano, and very little else. Science and mathematics were thought unsuitable, even harmful, for women. She never forgot the unfairness. She wrote that she "resented the injustice of the world in denying all those privileges of education to my sex which were so lavishly bestowed on men."

Now walk up to George Street, and the Assembly Rooms.`,
      },
    },
    {
      id: "somerville-assembly-rooms",
      order: 2,
      name: "The Assembly Rooms: dancing school",
      coordinates: { lat: 55.95275, lng: -3.1986 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 67,
        audioSource: require("../../../assets/audio/edinburgh-somerville/02-assembly-rooms.mp3"),
        scriptText: `This is the Assembly Rooms on George Street, the heart of Edinburgh's social life when Mary Fairfax was a girl. If you've done our Walter Scott tour, you'll know this is where Scott finally admitted to writing his novels.

As a girl, Mary was sent to Strange's dancing school, and every Saturday afternoon the pupils came here to practise. She described it vividly: "It was a handsome large hall with benches rising like an amphitheatre." The older girls danced so well that the practices "became a lounge for officers from the Castle, and other young men." The girls always came in full evening dress, learned the minuet, reels and country dances, and their partners gave them gingerbread and oranges.

In the winter of 1796, aged fifteen, she made her first appearance at a ball, in the care of the Countess of Buchan. Her first dancing partner was Gilbert Elliot, later the Earl of Minto.

It all sounds like the start of a conventional life. And for years it was. But privately, something else had caught her imagination: a strange kind of arithmetic.

Now walk north to Queen Street, and look out towards the Forth.`,
      },
    },
    {
      id: "somerville-queen-street",
      order: 3,
      name: "Queen Street: algebra in a fashion magazine",
      coordinates: { lat: 55.9548, lng: -3.1972 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 67,
        audioSource: require("../../../assets/audio/edinburgh-somerville/03-queen-street.mp3"),
        scriptText: `When Mary Somerville was young, Queen Street was the northern edge of Edinburgh. Late in life she wrote that it "was open to the north and commanded a view of the Forth and the mountains beyond." Now it's in the middle of the New Town.

Across that water lies Burntisland, where she grew up, and where her great adventure began in the unlikeliest place. At a tea party, a Miss Ogilvie showed her a fashion magazine, with coloured plates of ladies' dresses, charades and puzzles. On one page were "strange looking lines mixed with letters, chiefly X'es and Y's." "What is that?" Mary asked. "Oh," said Miss Ogilvie, "it is a kind of arithmetic: they call it Algebra; but I can tell you nothing about it."

Mary was determined to find out. She persuaded her brother's tutor to buy her a Euclid and an algebra book in Edinburgh, and studied them at night. The servants complained that "Miss Mary sat up reading till a very late hour," so an order was given to take her candle away. By then she had already worked through six books of Euclid, so she carried on in the dark, from memory.

Now follow the route east to York Place.`,
      },
    },
    {
      id: "york-place",
      order: 4,
      name: "47 York Place: Nasmyth's academy and Euclid",
      coordinates: { lat: 55.9562, lng: -3.18925 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 73,
        audioSource: require("../../../assets/audio/edinburgh-somerville/04-york-place.mp3"),
        scriptText: `This is York Place, and number 47 was the home and studio of Alexander Nasmyth, one of Scotland's finest landscape painters. He's the artist who painted the famous portrait of Robert Burns. Nasmyth ran a painting academy for ladies, and when he built this house in the 1790s, he gave it teaching rooms in the roof.

Mary Fairfax was one of his pupils, and one day she overheard him talking to some other young ladies about perspective. "You should study Euclid's Elements of Geometry," he told them, "the foundation not only of perspective, but of astronomy and all mechanical science."

To Mary, that was a revelation. She had been struggling, all alone, with a book on navigation, and here was the key: geometry was the door to astronomy. It was soon after this that she found her way to Euclid.

Nasmyth noticed her, too. Her daughter recorded that he once told a former pupil that "the cleverest young lady he ever taught was Miss Mary Fairfax."

Just round the corner, at Picardy Place, Arthur Conan Doyle was born in 1859. If you've done our Sherlock Holmes tour, you'll recognise it.

Now walk south, past the St James Quarter, to the east end of Princes Street.`,
      },
    },
    {
      id: "theatre-royal",
      order: 5,
      name: "The Theatre Royal and Mrs Siddons",
      coordinates: { lat: 55.95318, lng: -3.1883 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 72,
        audioSource: require("../../../assets/audio/edinburgh-somerville/05-theatre-royal.mp3"),
        scriptText: `The grand building on this corner, at the east end of Princes Street, was built as the General Post Office. Before it, on this site in Shakespeare Square, stood Edinburgh's Theatre Royal, which opened in 1769 and was pulled down in 1859.

In Mary's youth, going to the theatre was still controversial in Scotland, and strict Calvinists disapproved. Her family didn't. "The first time I had ever been in a theatre," she wrote, "I went with my father to see Cymbeline." And when the greatest actors of the age, Mrs Siddons and her brother John Kemble, came to act in Edinburgh, she said: "I could think of nothing else."

One day, when she was fourteen or fifteen, an old man in her mother's drawing room rose and kissed her, saying: "I am one of your mother's oldest friends." It was John Home, the author of the play Douglas, whose first performance had caused a scandal in the Kirk.

Many years later, she drank tea with Mrs Siddons, by then an old woman, and heard her read Milton and Shakespeare. Mary Somerville would come to know almost everyone, scientists and writers alike. But she never lost her love of art and music.

Now climb the steps up Calton Hill, to the round monument beside the Observatory.`,
      },
    },
    {
      id: "calton-hill-playfair",
      order: 6,
      name: "Calton Hill: Playfair, Laplace and the planets",
      coordinates: { lat: 55.9547, lng: -3.1832 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 87,
        audioSource: require("../../../assets/audio/edinburgh-somerville/06-calton-hill-playfair.mp3"),
        scriptText: `This small temple on Calton Hill is the Playfair Monument, put up in the 1820s by the architect William Playfair in memory of his uncle, John Playfair, professor at the University of Edinburgh. Beside it is the City Observatory, designed by the nephew and finished in 1818.

John Playfair was one of the few people who took Mary's studies seriously. After her first husband died, she was free at last to study, and she took on the hardest mathematics of the age: the French astronomer Laplace's great work on the motions of the planets. Playfair asked how she was getting on. When she admitted that she sometimes got stuck, he told her: "You would do better to read on for a few pages and return to it again, it will then no longer seem so difficult." She always followed his advice.

At thirty-three, she bought her first proper library of mathematics books, and wrote: "It taught me never to despair."

In 1831 she published Mechanism of the Heavens, her version of Laplace, and it was used at Cambridge. Her next book, in 1834, led a reviewer to coin the word "scientist." And by her own account, a passage in a later edition, about irregularities in the orbit of Uranus, set the young astronomer John Couch Adams calculating where an unseen planet might be: Neptune, found in 1846.

Yet she never owned a telescope.

Now follow the route down Regent Road and Calton Road to the Canongate, and the Scottish Parliament.`,
      },
    },
    {
      id: "somerville-parliament",
      order: 7,
      name: "The Scottish Parliament: a room of her own",
      coordinates: { lat: 55.95236, lng: -3.17565 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 79,
        audioSource: require("../../../assets/audio/edinburgh-somerville/07-scottish-parliament.mp3"),
        scriptText: `And we end at the Scottish Parliament. Since 2010, one of its committee rooms has been named the Mary Fairfax Somerville Room, after the girl who wasn't supposed to learn algebra.

She left Edinburgh in 1816, when her second husband, William Somerville, a doctor, was given a post in London. There, and later in Italy, she wrote the books that made her famous across Europe. In 1835, she and the astronomer Caroline Herschel became the first women elected honorary members of the Royal Astronomical Society.

She spoke up for others, too. She admired John Stuart Mill for, as she put it, "daring to show the iniquity and injustice" of the laws against women, and when Mill presented his great petition for women's votes to Parliament in 1866, hers was the first signature on it.

She died in Naples in 1872, aged ninety-one, still working on mathematics. A few years later, a new college for women at Oxford was named after her: Somerville College.

And in 2017, she appeared on the Royal Bank of Scotland's ten-pound note, beside a view of the beach at Burntisland and a line from her own writing, about watching the waves reflect off a riverbank after a steamboat passes.

Thank you for walking with me. The next time you pay with a ten-pound note in Scotland, look for her.`,
      },
    },
  ],
  path,
};

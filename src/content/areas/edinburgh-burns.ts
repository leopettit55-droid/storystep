import type { Area } from "../schema";

/**
 * Robert Burns's Edinburgh, from his first lodging (Baxter's Close, November
 * 1786) through his printer, patrons, masonic lodge and Robert Fergusson's
 * grave, to the Burns Monument and the Scottish Parliament: how an Ayrshire
 * farmer became Scotland's national poet. Researched October 2026.
 *
 * Burns's own words are quoted from his published letters (The Letters of
 * Robert Burns, Project Gutenberg #9863), each checked for date and recipient:
 * to Gavin Hamilton, 7 Dec 1786 (Kempis, Glencairn and Erskine); to John
 * Ballantine, 13 Dec 1786 (the "glare of polite and learned observation";
 * Dugald Stewart and the Lounger; "care of Mr. Creech"); to Mrs Dunlop,
 * 15 Jan 1787 ("I tremble for the consequences"); to Dr Moore, 1787
 * (Fergusson's poems, "strung anew my wildly-sounding lyre"); to Margaret
 * Chalmers, 12 Dec 1787 (the drunken coachman); to Mrs Dunlop, 10 Jul 1788
 * (Smellie). Fergusson's epitaph as printed in the letters; the Peter Hill
 * letter of 5 Feb 1792 ("so he and I are quits") via Edinburgh's Capital
 * Collections. Other sources: Wikipedia (Robert Burns, the Edinburgh Edition,
 * Canongate Kirkyard, Robert Fergusson, Agnes Maclehose, Luckenbooths,
 * Scottish Parliament Building), National Galleries of Scotland (Nasmyth),
 * Historic Environment Scotland (Burns Monument), National Trust for Scotland
 * (the Lounger; the first Burns Supper), Lodge Canongate Kilwinning, the
 * Walter Scott Club (the Sciennes meeting), visitstainedglass.uk (the window).
 *
 * Where sources disagree, the scripts avoid the disputed detail or say so:
 *  - Arrival: 27 or 28 November 1786 ("late November").
 *  - Edinburgh edition: 17 or 21 April 1787 ("April 1787").
 *  - Fergusson's stone: erected 1789 (Burns's letters; Wikipedia's Fergusson
 *    article). Wikipedia's Canongate Kirkyard article says 1828, which
 *    doesn't fit Burns paying for it in 1792. The stone gives his birth as
 *    1751; records say 1750 (the script says so). Death 16 or 17 October 1774.
 *  - The "Poet Laureate" inauguration (1 March 1787): the lodge minute of that
 *    night doesn't mention Burns; told as disputed.
 *  - Clarinda's tomb (Lord Craig's, "East Ground") isn't mapped: the stop is
 *    on the kirkyard's east path and the script says "somewhere in this
 *    kirkyard". Her 1791/92 Jamaica voyage dates conflict, so they're left out.
 *  - The brief's "Globe Tavern" is in Dumfries, and Burns never studied at the
 *    university; the university appears through its professors who backed him.
 *  - Baxter's Close was demolished; the stop is its site on the Lawnmarket.
 *
 * Stops and the walking path come from OpenStreetMap (the Fergusson and Dugald
 * Stewart graves are mapped there; the path is routed along OSM footways by the
 * FOSSGIS foot router). Accurate to a few metres, not surveyed: walk the route
 * once before promoting it, especially the three stops inside the kirkyard.
 *
 * Narration: these recordings are TEMPORARY, made with Google text-to-speech
 * in Professor Hoot's "Ask your guide" voice (en-GB-Standard-A). Replace them
 * with the original narrator's ElevenLabs voice, same file names.
 *
 * Cover: "Burns' Monument, Edinburgh", c. 1858-68, Rijksmuseum (CC0).
 */

/** Lawnmarket → Lady Stair's Close → St Giles' → Parliament Square → Anchor
 * Close → down the High Street and Canongate → St John Street → Canongate
 * Kirkyard → Old Tolbooth Wynd and up to Regent Road → the Burns Monument →
 * down White Horse Close to the Canongate by the Scottish Parliament. About
 * 2.4 km. */
const path = [
  { lat: 55.949358, lng: -3.193149 },
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
  { lat: 55.949349, lng: -3.193212 },
  { lat: 55.949363, lng: -3.193109 },
  { lat: 55.949374, lng: -3.193036 },
  { lat: 55.949391, lng: -3.192923 },
  { lat: 55.949427, lng: -3.192678 },
  { lat: 55.949452, lng: -3.192517 },
  { lat: 55.949491, lng: -3.192245 },
  { lat: 55.949534, lng: -3.192004 },
  { lat: 55.949544, lng: -3.191943 },
  { lat: 55.949551, lng: -3.191909 },
  { lat: 55.949626, lng: -3.191549 },
  { lat: 55.949587, lng: -3.191533 },
  { lat: 55.949526, lng: -3.191522 },
  { lat: 55.949587, lng: -3.191533 },
  { lat: 55.949626, lng: -3.191549 },
  { lat: 55.949637, lng: -3.191495 },
  { lat: 55.949639, lng: -3.191487 },
  { lat: 55.949697, lng: -3.191181 },
  { lat: 55.949731, lng: -3.190985 },
  { lat: 55.949761, lng: -3.190766 },
  { lat: 55.949786, lng: -3.190531 },
  { lat: 55.949814, lng: -3.190281 },
  { lat: 55.949826, lng: -3.190157 },
  { lat: 55.949572, lng: -3.190057 },
  { lat: 55.949554, lng: -3.19005 },
  { lat: 55.949536, lng: -3.190049 },
  { lat: 55.949518, lng: -3.190054 },
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
  { lat: 55.949839, lng: -3.190046 },
  { lat: 55.949876, lng: -3.189749 },
  { lat: 55.949893, lng: -3.189618 },
  { lat: 55.949926, lng: -3.189366 },
  { lat: 55.949937, lng: -3.189283 },
  { lat: 55.94997, lng: -3.189298 },
  { lat: 55.949937, lng: -3.189283 },
  { lat: 55.949957, lng: -3.189132 },
  { lat: 55.949959, lng: -3.189118 },
  { lat: 55.94997, lng: -3.189031 },
  { lat: 55.949972, lng: -3.189018 },
  { lat: 55.949991, lng: -3.188869 },
  { lat: 55.949994, lng: -3.188849 },
  { lat: 55.950009, lng: -3.188734 },
  { lat: 55.950011, lng: -3.188722 },
  { lat: 55.950027, lng: -3.188603 },
  { lat: 55.950036, lng: -3.188534 },
  { lat: 55.950044, lng: -3.188469 },
  { lat: 55.950076, lng: -3.188225 },
  { lat: 55.950082, lng: -3.188178 },
  { lat: 55.950135, lng: -3.18779 },
  { lat: 55.950154, lng: -3.187653 },
  { lat: 55.950168, lng: -3.187548 },
  { lat: 55.950195, lng: -3.187348 },
  { lat: 55.950212, lng: -3.18722 },
  { lat: 55.950249, lng: -3.186948 },
  { lat: 55.950274, lng: -3.186766 },
  { lat: 55.95029, lng: -3.186653 },
  { lat: 55.950318, lng: -3.186449 },
  { lat: 55.950337, lng: -3.186312 },
  { lat: 55.950356, lng: -3.186161 },
  { lat: 55.950378, lng: -3.186013 },
  { lat: 55.950401, lng: -3.185843 },
  { lat: 55.95043, lng: -3.185628 },
  { lat: 55.950446, lng: -3.185505 },
  { lat: 55.950461, lng: -3.185377 },
  { lat: 55.950467, lng: -3.185328 },
  { lat: 55.950476, lng: -3.18524 },
  { lat: 55.950493, lng: -3.185088 },
  { lat: 55.950497, lng: -3.18505 },
  { lat: 55.950501, lng: -3.185018 },
  { lat: 55.950505, lng: -3.184985 },
  { lat: 55.950509, lng: -3.184956 },
  { lat: 55.950513, lng: -3.184924 },
  { lat: 55.950551, lng: -3.184707 },
  { lat: 55.950557, lng: -3.184673 },
  { lat: 55.950575, lng: -3.184557 },
  { lat: 55.950634, lng: -3.184221 },
  { lat: 55.950641, lng: -3.184182 },
  { lat: 55.950657, lng: -3.18408 },
  { lat: 55.950673, lng: -3.183963 },
  { lat: 55.950696, lng: -3.183777 },
  { lat: 55.950712, lng: -3.183639 },
  { lat: 55.95072, lng: -3.183565 },
  { lat: 55.950736, lng: -3.183421 },
  { lat: 55.950747, lng: -3.183323 },
  { lat: 55.950755, lng: -3.183255 },
  { lat: 55.950763, lng: -3.183192 },
  { lat: 55.950782, lng: -3.183039 },
  { lat: 55.950795, lng: -3.182941 },
  { lat: 55.950802, lng: -3.182897 },
  { lat: 55.950808, lng: -3.182856 },
  { lat: 55.950822, lng: -3.182769 },
  { lat: 55.950858, lng: -3.182552 },
  { lat: 55.95088, lng: -3.182431 },
  { lat: 55.950916, lng: -3.182239 },
  { lat: 55.95096, lng: -3.18199 },
  { lat: 55.951043, lng: -3.181494 },
  { lat: 55.950984, lng: -3.181456 },
  { lat: 55.950904, lng: -3.181409 },
  { lat: 55.950984, lng: -3.181456 },
  { lat: 55.951043, lng: -3.181494 },
  { lat: 55.951058, lng: -3.181403 },
  { lat: 55.95109, lng: -3.181208 },
  { lat: 55.951105, lng: -3.181124 },
  { lat: 55.951119, lng: -3.181046 },
  { lat: 55.951131, lng: -3.180981 },
  { lat: 55.951138, lng: -3.180947 },
  { lat: 55.951145, lng: -3.180913 },
  { lat: 55.951163, lng: -3.180836 },
  { lat: 55.95118, lng: -3.180766 },
  { lat: 55.95123, lng: -3.180557 },
  { lat: 55.951259, lng: -3.180435 },
  { lat: 55.951297, lng: -3.180273 },
  { lat: 55.95135, lng: -3.180037 },
  { lat: 55.951359, lng: -3.179993 },
  { lat: 55.951454, lng: -3.179567 },
  { lat: 55.951489, lng: -3.179404 },
  { lat: 55.951551, lng: -3.179447 },
  { lat: 55.951653, lng: -3.179517 },
  { lat: 55.951625, lng: -3.179658 },
  { lat: 55.951662, lng: -3.179737 },
  { lat: 55.951734, lng: -3.179799 },
  { lat: 55.951896, lng: -3.179941 },
  { lat: 55.951866, lng: -3.180082 },
  { lat: 55.951896, lng: -3.179941 },
  { lat: 55.951905, lng: -3.179948 },
  { lat: 55.951914, lng: -3.179951 },
  { lat: 55.951923, lng: -3.17995 },
  { lat: 55.952312, lng: -3.180204 },
  { lat: 55.952326, lng: -3.180121 },
  { lat: 55.952443, lng: -3.180183 },
  { lat: 55.952326, lng: -3.180121 },
  { lat: 55.95238, lng: -3.179815 },
  { lat: 55.952018, lng: -3.179551 },
  { lat: 55.952027, lng: -3.179507 },
  { lat: 55.952063, lng: -3.179336 },
  { lat: 55.95209, lng: -3.179202 },
  { lat: 55.951798, lng: -3.17899 },
  { lat: 55.951766, lng: -3.179142 },
  { lat: 55.951747, lng: -3.179148 },
  { lat: 55.951713, lng: -3.17931 },
  { lat: 55.951705, lng: -3.179347 },
  { lat: 55.951681, lng: -3.179374 },
  { lat: 55.951653, lng: -3.179517 },
  { lat: 55.951489, lng: -3.179404 },
  { lat: 55.951454, lng: -3.179567 },
  { lat: 55.951359, lng: -3.179993 },
  { lat: 55.951413, lng: -3.180033 },
  { lat: 55.951526, lng: -3.18011 },
  { lat: 55.951847, lng: -3.180312 },
  { lat: 55.952137, lng: -3.180496 },
  { lat: 55.952239, lng: -3.180561 },
  { lat: 55.952276, lng: -3.180584 },
  { lat: 55.952665, lng: -3.180825 },
  { lat: 55.952723, lng: -3.180847 },
  { lat: 55.952773, lng: -3.180866 },
  { lat: 55.952911, lng: -3.180884 },
  { lat: 55.952981, lng: -3.180735 },
  { lat: 55.953016, lng: -3.180618 },
  { lat: 55.953035, lng: -3.180554 },
  { lat: 55.953169, lng: -3.180097 },
  { lat: 55.95329, lng: -3.179395 },
  { lat: 55.953383, lng: -3.178857 },
  { lat: 55.953398, lng: -3.178866 },
  { lat: 55.953482, lng: -3.178928 },
  { lat: 55.953536, lng: -3.178673 },
  { lat: 55.953455, lng: -3.178604 },
  { lat: 55.953384, lng: -3.178522 },
  { lat: 55.953363, lng: -3.17847 },
  { lat: 55.953354, lng: -3.178406 },
  { lat: 55.953359, lng: -3.17834 },
  { lat: 55.953354, lng: -3.178406 },
  { lat: 55.953363, lng: -3.17847 },
  { lat: 55.953384, lng: -3.178522 },
  { lat: 55.953455, lng: -3.178604 },
  { lat: 55.953536, lng: -3.178673 },
  { lat: 55.953592, lng: -3.178476 },
  { lat: 55.95366, lng: -3.178281 },
  { lat: 55.953816, lng: -3.177873 },
  { lat: 55.953761, lng: -3.177792 },
  { lat: 55.953719, lng: -3.177708 },
  { lat: 55.953693, lng: -3.177622 },
  { lat: 55.953681, lng: -3.177518 },
  { lat: 55.953683, lng: -3.177403 },
  { lat: 55.9537, lng: -3.177304 },
  { lat: 55.953803, lng: -3.176721 },
  { lat: 55.953535, lng: -3.176564 },
  { lat: 55.953198, lng: -3.176367 },
  { lat: 55.953154, lng: -3.176346 },
  { lat: 55.953082, lng: -3.176312 },
  { lat: 55.953035, lng: -3.176291 },
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

export const edinburghBurns: Area = {
  id: "edinburgh-burns",
  name: "Robert Burns's Edinburgh",
  city: "Edinburgh",
  description:
    "How an Ayrshire farmer became Scotland's national poet in a single Edinburgh winter: his first lodging, his printer and patrons, the grave he paid for, Clarinda, and the song that opened Scotland's parliament, told in his own words from his letters.",
  estimatedDurationMin: 60,
  estimatedDistanceKm: 2.4,
  difficulty: "moderate",
  accessNote:
    "St Giles' and the Writers' Museum are free but keep opening hours. The climb from the Canongate up to Regent Road has steep paths and steps.",
  isContentComplete: true,
  enableInteractiveGuide: true,
  image: require("../../../assets/tours/edinburgh-burns.jpg"),
  price: { singleTour: 4.99 },
  startingPoint: {
    lat: 55.94936,
    lng: -3.19315,
    label: "Lawnmarket, by Lady Stair's Close",
  },
  route: [
    {
      id: "baxters-close",
      order: 1,
      name: "Baxter's Close: a ploughman comes to town",
      coordinates: { lat: 55.94936, lng: -3.19315 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 78,
        audioSource: require("../../../assets/audio/edinburgh-burns/01-baxters-close.mp3"),
        scriptText: `Good day, and welcome. Late in November 1786, a twenty-seven-year-old farmer rode into Edinburgh on a borrowed pony. His name was Robert Burns. That summer, a printer in Kilmarnock had published his first book, Poems, Chiefly in the Scottish Dialect: around six hundred copies, and they had sold fast. Only weeks earlier, Burns had been planning to sail to Jamaica, to work as a book-keeper on a sugar plantation worked by enslaved people. Instead, he came here.

He shared a room with an old friend from Mauchline, John Richmond, in a lodging house in Baxter's Close, at three shillings a week. The close has long gone, but it stood right here on the north side of the Lawnmarket, just east of Lady Stair's Close.

Edinburgh took to him astonishingly fast. A week after he arrived, he wrote home to his friend Gavin Hamilton: "I am in a fair way of becoming as eminent as Thomas à Kempis or John Bunyan." And then: "My Lord Glencairn and the Dean of Faculty, Mr. H. Erskine, have taken me under their wing."

Over the next hour we'll follow him from this lodging to his printer, his masonic lodge and the grave of the poet he loved most, and see how an Ayrshire ploughman became Scotland's national poet.

Turn into Lady Stair's Close, just beside you, and follow it to the Writers' Museum.`,
      },
    },
    {
      id: "writers-museum",
      order: 2,
      name: "The Writers' Museum and the \"heaven-taught ploughman\"",
      coordinates: { lat: 55.949691, lng: -3.193742 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 78,
        audioSource: require("../../../assets/audio/edinburgh-burns/02-writers-museum.mp3"),
        scriptText: `This seventeenth-century house, Lady Stair's House, is now the Writers' Museum, and it's free to go in. It's devoted to three of Scotland's great writers: Sir Walter Scott, Robert Louis Stevenson, and Robert Burns. Among the Burns treasures inside are a writing desk he used in Dumfries in his last years, and a cast of his skull.

It's a good place to meet the real man, because Edinburgh quickly invented a different one. On the 9th of December 1786, less than a fortnight after Burns arrived, the novelist Henry Mackenzie praised his poems in a magazine called The Lounger, and called him a "heaven-taught ploughman." It made him famous overnight, and it stuck.

But it wasn't true. Burns was no untaught genius. His father and some neighbours hired a young teacher, John Murdoch, to teach their children, and Burns grew up reading widely, from the Bible to Shakespeare and Pope, and even learned some French. He chose to write in Scots, the everyday language of the people around him, and he knew exactly what he was doing.

He also knew the fame was fragile. That December he wrote to a friend that he trembled lest he should be ruined "by being dragged too suddenly into the glare of polite and learned observation."

Walk back out to the Royal Mile, turn left, and head down to the great west door of St Giles' Cathedral.`,
      },
    },
    {
      id: "st-giles-burns-window",
      order: 3,
      name: "St Giles' and the Burns window",
      coordinates: { lat: 55.9495, lng: -3.19128 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 76,
        audioSource: require("../../../assets/audio/edinburgh-burns/03-st-giles-burns-window.mp3"),
        scriptText: `This is St Giles' Cathedral, the High Kirk of Edinburgh. If it's open, step inside and turn round: above the west door is the Robert Burns window, made in 1985 by the Icelandic artist Leifur Breiðfjörð. It's built around three themes from his poetry, the love of nature, the love of humanity, and love itself, shown as a rose, with linking chains for the brotherhood of man. Burns stands near the bottom, above a copy of his signature in clear glass.

Now picture this street in 1786. A row of tall buildings called the Luckenbooths stood here, crammed against the north side of the cathedral, right in the middle of the High Street. They were pulled down in the early 1800s. In the Luckenbooths was the bookshop of William Creech, Edinburgh's leading publisher, and a meeting place for lawyers, writers and anyone hoping to spot a poet.

Creech became Burns's publisher, and his shop became Burns's address. In letters that winter, he told friends to write to him "care of Mr. Creech, Bookseller." Burns later grew frustrated at how slowly Creech paid him, and wrote a sharp little verse portrait of him. But Creech's name is on the title page of the book that made Burns a national figure.

Walk round to the south side of the cathedral, into Parliament Square.`,
      },
    },
    {
      id: "burns-parliament-square",
      order: 4,
      name: "Parliament Square: patrons and the Caledonian Hunt",
      coordinates: { lat: 55.94926, lng: -3.19047 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 69,
        audioSource: require("../../../assets/audio/edinburgh-burns/04-parliament-square.mp3"),
        scriptText: `The building on the south side of this square is Parliament House, home of Scotland's highest courts and of the Faculty of Advocates, Edinburgh's lawyers. In 1786 the Dean of the Faculty was Henry Erskine, a witty, generous advocate, and one of the first powerful people in Edinburgh to take Burns up.

The other was James Cunningham, the Earl of Glencairn. Glencairn introduced Burns to the Caledonian Hunt, a club of aristocrats and gentlemen, and they put their names down for a hundred copies of his new edition. Burns dedicated the book to them: "To the Noblemen and Gentlemen of the Caledonian Hunt."

That was how publishing worked then. The new edition was sold largely by subscription, and the printed list of subscribers ran to around fifteen hundred names. A farmer from Ayrshire was suddenly dining in the finest houses in the capital.

Burns enjoyed it, but he didn't lose his head. In January 1787 he wrote to his patron Mrs Dunlop that a "tide of public notice" had borne him to a height his abilities could not support, and admitted: "I tremble for the consequences."

Now cross the High Street and head down a little way to Anchor Close, on the left-hand side.`,
      },
    },
    {
      id: "anchor-close",
      order: 5,
      name: "Anchor Close: the printer and the Crochallan Fencibles",
      coordinates: { lat: 55.94997, lng: -3.1893 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 82,
        audioSource: require("../../../assets/audio/edinburgh-burns/05-anchor-close.mp3"),
        scriptText: `This narrow passage is Anchor Close. In the 1780s it was home to the printing office of William Smellie, the man who had edited the very first Encyclopaedia Britannica. Smellie printed Burns's Edinburgh edition, and Burns spent much of that winter in his untidy office here, correcting the proofs of his poems.

The book came out in April 1787: about three thousand copies of Poems, Chiefly in the Scottish Dialect, with new poems added, including Address to a Haggis. In about a third of the copies, a printer's slip turned the word "skinking," meaning watery, into "stinking." Collectors still call those copies the stinking edition. Within a week, Burns sold his copyright to Creech for a hundred guineas.

Anchor Close had a livelier side, too. In Dawney Douglas's tavern here met a drinking club called the Crochallan Fencibles, founded by Smellie, and he brought Burns along. They sang, argued and swapped bawdy songs, some of which Burns later collected, and which were published, rather scandalously, after his death.

Burns thought the world of Smellie. In a letter of 1788 he called him "a man positively of the first abilities and greatest strength of mind, as well as one of the best hearts and keenest wits that I have ever met with."

Now follow the High Street downhill, into the Canongate, as far as St John Street on your right.`,
      },
    },
    {
      id: "st-john-street",
      order: 6,
      name: "St John's Chapel and the Poet Laureate of the lodge",
      coordinates: { lat: 55.9509, lng: -3.18143 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 77,
        audioSource: require("../../../assets/audio/edinburgh-burns/06-st-john-street.mp3"),
        scriptText: `Here in St John Street is St John's Chapel, home of Lodge Canongate Kilwinning. Built in 1736, it's said to be the oldest purpose-built masonic meeting room in the world. It's a private lodge, so admire it from the street.

Burns was already a Freemason back in Ayrshire, and in Edinburgh the masonic world opened doors for him. The lodge's own minutes record that he joined Canongate Kilwinning on the 1st of February 1787.

Now for a story you'll see everywhere, including in a large and famous painting. It shows Burns standing before the brethren on the 1st of March 1787, being crowned Poet Laureate of the lodge. It's a wonderful scene. But the painting was made about sixty years after the event, and the lodge's minute for that night doesn't mention Burns at all. Historians have argued about it ever since. The lodge itself is certain he was its poet laureate, and its minutes call him that from 1802. But whether that grand ceremony ever happened, nobody can now prove.

What's not in doubt is that Burns found real friends here, and that the Canongate, the old burgh at the bottom of the Royal Mile, was about to show him the side of Edinburgh he cared about most.

Head back up to the Canongate, turn right, and look out for a bronze young man striding along the pavement.`,
      },
    },
    {
      id: "fergusson-statue",
      order: 7,
      name: "Robert Fergusson, the poet who came first",
      coordinates: { lat: 55.951566, lng: -3.179376 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 68,
        audioSource: require("../../../assets/audio/edinburgh-burns/07-fergusson-statue.mp3"),
        scriptText: `Meet Robert Fergusson, striding down the Canongate in bronze. This statue by David Annand was unveiled in 2004, and he's the reason Burns came to this kirkyard.

Fergusson was an Edinburgh poet, born in 1750, who wrote brilliantly in Scots about the city around him: its markets, its taverns, its smoke and its characters. His great poem about the town is called Auld Reekie. Then, in October 1774, at just twenty-four, he died in the city's asylum after a fall, and was buried in the Canongate Kirkyard without even a stone.

Burns idolised him. In a long letter about his own life, written in 1787, he described how, when he had all but given up writing verse, "meeting with Fergusson's Scottish Poems, I strung anew my wildly-sounding lyre with emulating vigour." Without Fergusson, in other words, there might never have been a Burns.

So when Burns came to Edinburgh, one of the first things he did was look for his hero's grave. He found it unmarked.

Walk through the gate into the kirkyard, and follow the path to the left of the church, to a stone with iron railings round it.`,
      },
    },
    {
      id: "fergusson-grave",
      order: 8,
      name: "The stone Burns paid for",
      coordinates: { lat: 55.951859, lng: -3.180127 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 79,
        audioSource: require("../../../assets/audio/edinburgh-burns/08-fergusson-grave.mp3"),
        scriptText: `This is Robert Fergusson's grave, and the stone over it was put up by Robert Burns.

On the 6th of February 1787, barely ten weeks after arriving in Edinburgh, Burns wrote to the managers of the Canongate Kirk, asking permission to lay a simple stone over Fergusson's grave at his own expense. They agreed. He wrote the epitaph himself:

"No sculptured marble here, nor pompous lay,
No storied urn nor animated bust;
This simple stone directs pale Scotia's way
To pour her sorrows o'er her poet's dust."

On the back it says the burial place is to remain forever sacred to Fergusson's memory, by special grant to Robert Burns, who erected the stone. Look closely at the dates, too. The stone gives Fergusson's birth as 1751, though the records say he was born in 1750.

The work went to an architect called Robert Burn, and it wasn't quick. In 1792 Burns finally settled the bill, and joked to a friend: "He was two years in erecting it, after I commissioned him for it; and I have been two years paying him, after he sent me his account; so he and I are quits."

A few steps away lies another giant of that Edinburgh, the economist Adam Smith, who died in 1790.

Now follow the path up the slope, towards the northern side of the kirkyard.`,
      },
    },
    {
      id: "dugald-stewart",
      order: 9,
      name: "Dugald Stewart and the young Walter Scott",
      coordinates: { lat: 55.952469, lng: -3.180216 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 73,
        audioSource: require("../../../assets/audio/edinburgh-burns/09-dugald-stewart.mp3"),
        scriptText: `Here lies Dugald Stewart, professor of moral philosophy at the University of Edinburgh, and one of the stars of the Scottish Enlightenment.

You may hear that Burns studied at the university. He didn't. But its professors were among his warmest supporters. Stewart had already met Burns in Ayrshire, and in a letter that December, Burns told a friend that "Dugald Stewart, and some of my learned friends" had helped get him into The Lounger, the magazine that made his name.

These learned friends' houses gave Burns one of his most famous Edinburgh moments. Early in 1787, at Sciennes Hill House, the home of another professor, Adam Ferguson, Burns was moved by a print of a soldier lying dead, with his widow and child beside him, and asked who had written the lines of verse beneath it. Nobody knew, except a shy, lame boy of fifteen, who told him they were by John Langhorne. The boy was Walter Scott.

Years later, Scott remembered that Burns had "rewarded me with a look and a word, which, though of mere civility, I then received and still recollect, with very great pleasure." Scotland's two greatest writers, meeting for just a moment, in a drawing room on the edge of the Meadows.

Now walk along the path to the east side of the kirkyard.`,
      },
    },
    {
      id: "clarinda",
      order: 10,
      name: "Clarinda",
      coordinates: { lat: 55.95209, lng: -3.1792 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 86,
        audioSource: require("../../../assets/audio/edinburgh-burns/10-clarinda.mp3"),
        scriptText: `Somewhere in this kirkyard, in the tomb of her cousin Lord Craig, lies Agnes Maclehose, the woman Burns called Clarinda.

They met at a tea party on the 4th of December 1787. Burns was back in Edinburgh for the winter, lodging with his friend William Cruikshank in St James Square, at the east end of the New Town. A few days later a carriage accident left him with an injured leg, and he wrote to a friend: "I am here under the care of a surgeon, with a bruised limb extended on a cushion. A drunken coachman was the cause."

Stuck indoors, he wrote to Agnes, and she wrote back. She was married but long separated, her husband away in Jamaica. To keep things discreet, they wrote under pen names: she was Clarinda, and he was Sylvander. In less than three months he wrote her at least thirty letters, full of passion and poetry. But it seems never to have gone beyond letters and a few meetings. She was a devout woman, and the risk of scandal was real.

They met for the last time on the 6th of December 1791. Later that month, he sent her a song: "Ae fond kiss, and then we sever." In her journal, she wrote of that day: "Parted with Burns, in the year 1791, never more to meet in this world." She lived for another fifty years, and died in 1841.

Leave the kirkyard by the Canongate gate, and follow the route up to Regent Road, for the Burns Monument.`,
      },
    },
    {
      id: "burns-monument",
      order: 11,
      name: "The Burns Monument and Burns Night",
      coordinates: { lat: 55.9533, lng: -3.1783 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 78,
        audioSource: require("../../../assets/audio/edinburgh-burns/11-burns-monument.mp3"),
        scriptText: `This little round temple is the Burns Monument, designed by the architect Thomas Hamilton, who also built Victoria Street, and modelled on an ancient monument in Athens, the Choragic Monument of Lysicrates. Its foundation stone was laid in 1831. It was built to hold a marble statue of Burns by John Flaxman, but smoke from the gasworks below began to blacken the marble, and in 1889 the statue was moved to the Scottish National Portrait Gallery.

By then Burns had been dead for more than ninety years. He left Edinburgh in 1788, married Jean Armour, farmed for a time, and then worked full time as an excise officer in Dumfries, where he died on the 21st of July 1796, aged just thirty-seven.

Five years later, nine of his friends met at the cottage in Alloway where he was born, to remember him over a dinner of haggis. That was the first Burns Supper. They planned to meet again on his birthday, but got the date wrong. From 1803 they kept the right day, the 25th of January, and it has been Burns Night ever since, celebrated around the world with haggis, his Address to a Haggis, a toast to his memory, and at the end, his song Auld Lang Syne, now sung at New Year across the globe.

Now follow the route down from Regent Road to the foot of the Canongate, and the Scottish Parliament.`,
      },
    },
    {
      id: "scottish-parliament",
      order: 12,
      name: "The Scottish Parliament: A Man's a Man for A' That",
      coordinates: { lat: 55.95236, lng: -3.17565 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 81,
        audioSource: require("../../../assets/audio/edinburgh-burns/12-scottish-parliament.mp3"),
        scriptText: `And here we end, at the Scottish Parliament, at the foot of the Royal Mile.

On the 1st of July 1999, Scotland's new parliament was officially opened, its first in nearly three hundred years. It met at first in the Church of Scotland's Assembly Hall, up on the Mound, and moved into this building in 2004. During that opening ceremony in 1999, the folk singer Sheena Wellington stood up and sang a song by Robert Burns, written in 1795: A Man's a Man for A' That.

It's a song about equality. Rank and title, Burns says, are just the stamp on a coin. The worth is in the person:

"The rank is but the guinea's stamp,
The man's the gowd for a' that."

And it ends with a hope that, one day, "man to man, the world o'er, shall brothers be for a' that."

That's why Burns still matters. He was a tenant farmer who wrote in the language of ordinary Scots, and made it sing. Edinburgh's lawyers, lords and professors made him a celebrity in a single winter, and he was proud of it, but he never forgot where he came from. Two centuries on, his words are what Scotland chose to open its parliament with, and what much of the world sings at midnight every New Year.

Thank you for walking with me. The Palace of Holyroodhouse is just across the road, and the Royal Mile leads all the way back up to where we began.`,
      },
    },
  ],
  path,
};

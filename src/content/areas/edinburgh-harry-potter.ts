import type { Area } from "../schema";

/**
 * J.K. Rowling's Edinburgh, in order: from the café where she wrote early
 * chapters of the first book (Nicolson Street) to the hotel room where she
 * finished the last (the Balmoral). Researched October 2026.
 *
 * Every Harry Potter claim is checked against Rowling's own words, and the
 * scripts say plainly where the popular stories are unproven or untrue:
 *  - Confirmed: Nicolson's (plaque; Wikipedia), the Elephant House (her 2020
 *    tweet: she wrote there, but it's "not the birthplace"), McGonagall's name
 *    (WBUR "The Connection", 12 October 1999: "very, very, very bad Scottish
 *    poet ... I just loved the name"), the City Chambers handprints (Edinburgh
 *    Award 2008; edinburghguide.com, February 2009), room 552 at the Balmoral
 *    (her inscription, 11 January 2007), the Half-Blood Prince launch at the
 *    castle (16 July 2005).
 *  - Denied by Rowling: Victoria Street as Diagon Alley (2022), Edinburgh's
 *    schools, Heriot's included, as Hogwarts (2020), the Elephant House as the
 *    "birthplace" (2020).
 *  - Unproven: Thomas Riddell's stone and Tom Riddle. She has never confirmed
 *    it; the oft-quoted "subconsciously" line has no traceable source, so the
 *    script doesn't use it.
 *  - No Harry Potter filming happened in Edinburgh (the Scottish scenes were
 *    shot in the Highlands).
 * Edinburgh history: Wikipedia (Greyfriars Kirkyard, Greyfriars Bobby,
 * Grassmarket, George Heriot's School, Balmoral Hotel, City Chambers, Heart of
 * Midlothian, Edinburgh Castle), Historic Environment Scotland and the
 * Scotsman (Victoria Street), UNESCO (City of Literature), Edinburgh Castle
 * (One O'Clock Gun).
 *
 * Stops and the walking path come from OpenStreetMap (both graves are mapped
 * there; the path is routed along OSM footways by the FOSSGIS foot router).
 * Accurate to a few metres, not surveyed: walk the route once with a phone
 * before promoting it, especially the two graves inside the kirkyard.
 *
 * Narration: these recordings are TEMPORARY, made with Google text-to-speech
 * in Professor Hoot's "Ask your guide" voice (en-GB-Standard-A). Replace them
 * with the original narrator's ElevenLabs voice, same file names.
 */

/** Nicolson Street → Candlemaker Row → Greyfriars Kirkyard (kirk, Riddell's
 * stone at the west wall, through the Flodden Wall to McGonagall) → George IV
 * Bridge → down Victoria Street → Grassmarket → Castle Wynd steps → Castle
 * Esplanade → Lawnmarket and Lady Stair's Close → St Giles' → City Chambers →
 * Fleshmarket Close and Cockburn Street → the Balmoral. About 2.9 km. */
const path = [
    { lat: 55.947062, lng: -3.18599 },
    { lat: 55.947143, lng: -3.186036 },
    { lat: 55.947189, lng: -3.186056 },
    { lat: 55.946972, lng: -3.18734 },
    { lat: 55.946882, lng: -3.187935 },
    { lat: 55.946899, lng: -3.18797 },
    { lat: 55.947132, lng: -3.188082 },
    { lat: 55.947365, lng: -3.188213 },
    { lat: 55.9474, lng: -3.188233 },
    { lat: 55.947643, lng: -3.188363 },
    { lat: 55.947553, lng: -3.188837 },
    { lat: 55.947533, lng: -3.188935 },
    { lat: 55.947515, lng: -3.189026 },
    { lat: 55.947487, lng: -3.18916 },
    { lat: 55.94745, lng: -3.189328 },
    { lat: 55.947446, lng: -3.189347 },
    { lat: 55.947382, lng: -3.189639 },
    { lat: 55.947356, lng: -3.189754 },
    { lat: 55.947334, lng: -3.189857 },
    { lat: 55.947102, lng: -3.190948 },
    { lat: 55.947037, lng: -3.191247 },
    { lat: 55.946861, lng: -3.191134 },
    { lat: 55.946842, lng: -3.191203 },
    { lat: 55.946837, lng: -3.19123 },
    { lat: 55.946834, lng: -3.191258 },
    { lat: 55.946836, lng: -3.191286 },
    { lat: 55.94685, lng: -3.191316 },
    { lat: 55.946871, lng: -3.191342 },
    { lat: 55.946898, lng: -3.191372 },
    { lat: 55.946871, lng: -3.191342 },
    { lat: 55.94685, lng: -3.191316 },
    { lat: 55.946836, lng: -3.191286 },
    { lat: 55.946834, lng: -3.191258 },
    { lat: 55.946761, lng: -3.191364 },
    { lat: 55.946719, lng: -3.191494 },
    { lat: 55.946701, lng: -3.191552 },
    { lat: 55.946727, lng: -3.191623 },
    { lat: 55.946755, lng: -3.191784 },
    { lat: 55.946774, lng: -3.191943 },
    { lat: 55.946782, lng: -3.192016 },
    { lat: 55.946786, lng: -3.192093 },
    { lat: 55.946785, lng: -3.19219 },
    { lat: 55.946782, lng: -3.192238 },
    { lat: 55.94677, lng: -3.192462 },
    { lat: 55.94676, lng: -3.192556 },
    { lat: 55.946749, lng: -3.192629 },
    { lat: 55.946741, lng: -3.192677 },
    { lat: 55.946729, lng: -3.192716 },
    { lat: 55.946718, lng: -3.192744 },
    { lat: 55.946697, lng: -3.192762 },
    { lat: 55.946671, lng: -3.19277 },
    { lat: 55.946614, lng: -3.19278 },
    { lat: 55.946511, lng: -3.19308 },
    { lat: 55.946487, lng: -3.193148 },
    { lat: 55.946465, lng: -3.193233 },
    { lat: 55.946433, lng: -3.193358 },
    { lat: 55.946674, lng: -3.193579 },
    { lat: 55.946785, lng: -3.193519 },
    { lat: 55.946971, lng: -3.19366 },
    { lat: 55.946785, lng: -3.193519 },
    { lat: 55.946674, lng: -3.193579 },
    { lat: 55.946433, lng: -3.193358 },
    { lat: 55.946376, lng: -3.193578 },
    { lat: 55.946366, lng: -3.193617 },
    { lat: 55.946376, lng: -3.193578 },
    { lat: 55.946433, lng: -3.193358 },
    { lat: 55.946465, lng: -3.193233 },
    { lat: 55.946487, lng: -3.193148 },
    { lat: 55.946511, lng: -3.19308 },
    { lat: 55.946614, lng: -3.19278 },
    { lat: 55.946671, lng: -3.19277 },
    { lat: 55.946697, lng: -3.192762 },
    { lat: 55.946718, lng: -3.192744 },
    { lat: 55.946729, lng: -3.192716 },
    { lat: 55.946741, lng: -3.192677 },
    { lat: 55.946749, lng: -3.192629 },
    { lat: 55.94676, lng: -3.192556 },
    { lat: 55.94677, lng: -3.192462 },
    { lat: 55.946785, lng: -3.19219 },
    { lat: 55.946786, lng: -3.192093 },
    { lat: 55.946782, lng: -3.192016 },
    { lat: 55.946774, lng: -3.191943 },
    { lat: 55.946755, lng: -3.191784 },
    { lat: 55.946727, lng: -3.191623 },
    { lat: 55.946701, lng: -3.191552 },
    { lat: 55.946719, lng: -3.191494 },
    { lat: 55.946761, lng: -3.191364 },
    { lat: 55.946834, lng: -3.191258 },
    { lat: 55.946837, lng: -3.19123 },
    { lat: 55.946842, lng: -3.191203 },
    { lat: 55.946861, lng: -3.191134 },
    { lat: 55.947037, lng: -3.191247 },
    { lat: 55.947093, lng: -3.191283 },
    { lat: 55.947164, lng: -3.19132 },
    { lat: 55.947222, lng: -3.191355 },
    { lat: 55.947576, lng: -3.19157 },
    { lat: 55.947653, lng: -3.191617 },
    { lat: 55.947747, lng: -3.191673 },
    { lat: 55.947961, lng: -3.191801 },
    { lat: 55.94801, lng: -3.191831 },
    { lat: 55.94814, lng: -3.191909 },
    { lat: 55.948248, lng: -3.191974 },
    { lat: 55.948349, lng: -3.192034 },
    { lat: 55.94848, lng: -3.192112 },
    { lat: 55.948674, lng: -3.192229 },
    { lat: 55.948658, lng: -3.192304 },
    { lat: 55.948643, lng: -3.192383 },
    { lat: 55.948633, lng: -3.192449 },
    { lat: 55.948629, lng: -3.192506 },
    { lat: 55.948631, lng: -3.192572 },
    { lat: 55.948641, lng: -3.192635 },
    { lat: 55.948664, lng: -3.192733 },
    { lat: 55.948691, lng: -3.19284 },
    { lat: 55.948719, lng: -3.192996 },
    { lat: 55.948728, lng: -3.193089 },
    { lat: 55.948731, lng: -3.19318 },
    { lat: 55.94873, lng: -3.193269 },
    { lat: 55.948723, lng: -3.193359 },
    { lat: 55.948712, lng: -3.193452 },
    { lat: 55.9487, lng: -3.193537 },
    { lat: 55.948686, lng: -3.193607 },
    { lat: 55.948673, lng: -3.193673 },
    { lat: 55.948649, lng: -3.193777 },
    { lat: 55.94862, lng: -3.193891 },
    { lat: 55.948538, lng: -3.194169 },
    { lat: 55.948508, lng: -3.194274 },
    { lat: 55.948468, lng: -3.194399 },
    { lat: 55.94844, lng: -3.194469 },
    { lat: 55.948411, lng: -3.194512 },
    { lat: 55.948386, lng: -3.194533 },
    { lat: 55.948356, lng: -3.194544 },
    { lat: 55.948332, lng: -3.194543 },
    { lat: 55.948284, lng: -3.194541 },
    { lat: 55.94822, lng: -3.194529 },
    { lat: 55.948139, lng: -3.194506 },
    { lat: 55.948076, lng: -3.194466 },
    { lat: 55.947965, lng: -3.194384 },
    { lat: 55.94794, lng: -3.194529 },
    { lat: 55.947922, lng: -3.194642 },
    { lat: 55.947874, lng: -3.194831 },
    { lat: 55.947843, lng: -3.194953 },
    { lat: 55.94769, lng: -3.195504 },
    { lat: 55.947611, lng: -3.195846 },
    { lat: 55.947513, lng: -3.196288 },
    { lat: 55.947572, lng: -3.196324 },
    { lat: 55.94771, lng: -3.1964 },
    { lat: 55.947964, lng: -3.196541 },
    { lat: 55.948036, lng: -3.196137 },
    { lat: 55.948119, lng: -3.196183 },
    { lat: 55.948185, lng: -3.196217 },
    { lat: 55.948278, lng: -3.196258 },
    { lat: 55.948359, lng: -3.196275 },
    { lat: 55.948605, lng: -3.196345 },
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
    { lat: 55.949148, lng: -3.194208 },
    { lat: 55.949164, lng: -3.194159 },
    { lat: 55.94918, lng: -3.1941 },
    { lat: 55.949194, lng: -3.194048 },
    { lat: 55.949201, lng: -3.194011 },
    { lat: 55.949213, lng: -3.193954 },
    { lat: 55.949264, lng: -3.193714 },
    { lat: 55.949274, lng: -3.193666 },
    { lat: 55.949283, lng: -3.19362 },
    { lat: 55.949318, lng: -3.193419 },
    { lat: 55.949383, lng: -3.193492 },
    { lat: 55.949396, lng: -3.193501 },
    { lat: 55.949408, lng: -3.19351 },
    { lat: 55.949423, lng: -3.193521 },
    { lat: 55.949499, lng: -3.193565 },
    { lat: 55.949547, lng: -3.193591 },
    { lat: 55.949626, lng: -3.193634 },
    { lat: 55.949651, lng: -3.193412 },
    { lat: 55.94967, lng: -3.193246 },
    { lat: 55.949593, lng: -3.193216 },
    { lat: 55.94948, lng: -3.193176 },
    { lat: 55.949392, lng: -3.193126 },
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
    { lat: 55.949555, lng: -3.191527 },
    { lat: 55.949587, lng: -3.191533 },
    { lat: 55.949626, lng: -3.191549 },
    { lat: 55.949637, lng: -3.191495 },
    { lat: 55.949639, lng: -3.191487 },
    { lat: 55.949697, lng: -3.191181 },
    { lat: 55.949731, lng: -3.190985 },
    { lat: 55.949761, lng: -3.190766 },
    { lat: 55.949786, lng: -3.190531 },
    { lat: 55.949814, lng: -3.190281 },
    { lat: 55.949903, lng: -3.190306 },
    { lat: 55.949958, lng: -3.190327 },
    { lat: 55.950002, lng: -3.190343 },
    { lat: 55.949958, lng: -3.190327 },
    { lat: 55.949903, lng: -3.190306 },
    { lat: 55.949814, lng: -3.190281 },
    { lat: 55.949826, lng: -3.190157 },
    { lat: 55.949839, lng: -3.190046 },
    { lat: 55.949876, lng: -3.189749 },
    { lat: 55.949893, lng: -3.189618 },
    { lat: 55.949926, lng: -3.189366 },
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
    { lat: 55.950123, lng: -3.188496 },
    { lat: 55.950214, lng: -3.188527 },
    { lat: 55.950433, lng: -3.188601 },
    { lat: 55.950523, lng: -3.188628 },
    { lat: 55.950492, lng: -3.188517 },
    { lat: 55.95055, lng: -3.188433 },
    { lat: 55.950631, lng: -3.188317 },
    { lat: 55.950653, lng: -3.188173 },
    { lat: 55.950682, lng: -3.187974 },
    { lat: 55.950688, lng: -3.187938 },
    { lat: 55.951011, lng: -3.188097 },
    { lat: 55.951183, lng: -3.188184 },
    { lat: 55.951195, lng: -3.18819 },
    { lat: 55.95266, lng: -3.188914 },
    { lat: 55.95318, lng: -3.189165 },
    { lat: 55.95321, lng: -3.189219 },
    { lat: 55.953194, lng: -3.189319 },
    { lat: 55.953185, lng: -3.189373 },
    { lat: 55.953146, lng: -3.189618 },
];

export const edinburghHarryPotter: Area = {
  id: "edinburgh-harry-potter",
  name: "Harry Potter Edinburgh",
  city: "Edinburgh",
  description:
    "J.K. Rowling's Edinburgh, from the café where she wrote early chapters to the hotel room where she finished the final book: Greyfriars Kirkyard's famous names, Victoria Street, the castle and her handprints on the Royal Mile, with the true stories told apart from the myths.",
  estimatedDurationMin: 75,
  estimatedDistanceKm: 2.9,
  difficulty: "moderate",
  accessNote:
    "Greyfriars Kirkyard is open roughly from dawn to dusk, so walk this tour in daylight. There are steep steps at Castle Wynd and Fleshmarket Close.",
  isContentComplete: true,
  enableInteractiveGuide: true,
  image: require("../../../assets/tours/edinburgh-harry-potter.jpg"),
  price: { singleTour: 4.99 },
  startingPoint: {
    lat: 55.9471,
    lng: -3.18578,
    label: "Nicolson Street, at the corner of Drummond Street",
  },
  route: [
    {
      id: "nicolsons",
      order: 1,
      name: "Nicolson's: where the early chapters were written",
      coordinates: { lat: 55.9471, lng: -3.18578 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 69,
        audioSource: require("../../../assets/audio/edinburgh-harry-potter/01-nicolsons.mp3"),
        scriptText: `Good day, and welcome. Over the next couple of miles, I'll walk you through J.K. Rowling's Edinburgh, from the café where she wrote early chapters of the very first book to the hotel room where she finished the very last. Along the way I'll do something a little unusual for a Harry Potter tour: I'll tell you which stories are true, and which ones the author herself has put to rest.

Find the green building on the corner of Drummond Street, and the black plaque on its wall. It reads: "J.K. Rowling wrote some of the early chapters of Harry Potter in the rooms on the first floor of this building." That was Nicolson's café, part-owned by her brother-in-law. Rowling had moved to Edinburgh in late 1993, a single mother with very little money, and in her suitcase was a draft of a book about a boy wizard.

The café closed long ago, and the rooms have changed hands several times since, but the plaque has stayed.

One thing worth knowing from the start: Harry wasn't born in Edinburgh. The idea came to Rowling on a delayed train from Manchester to London in 1990. Edinburgh is where he grew up.

Now follow the route west, towards Candlemaker Row, to meet a very loyal little dog.`,
      },
    },
    {
      id: "greyfriars-bobby",
      order: 2,
      name: "Greyfriars Bobby",
      coordinates: { lat: 55.946922, lng: -3.191304 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 73,
        audioSource: require("../../../assets/audio/edinburgh-harry-potter/02-greyfriars-bobby.mp3"),
        scriptText: `The bronze terrier on top of this drinking fountain is Greyfriars Bobby, and his is Edinburgh's favourite story. Bobby belonged to John Gray, a night watchman with the city police, who died in 1858 and was buried in the kirkyard just behind this corner. Bobby, the story goes, would not leave, and kept watch by his master's grave for fourteen years, until his own death in January 1872. In 1867 the Lord Provost, William Chambers, paid for the dog's licence himself, and Bobby's collar is now in the Museum of Edinburgh.

The statue was put up in 1873, made by the sculptor William Brodie and paid for by the philanthropist Angela Burdett-Coutts.

In fairness, historians argue about the details. One of them, Jan Bondeson, has suggested that the first Bobby may have died earlier and been quietly replaced by a younger dog, because by then he was bringing the visitors in. A loyal dog, either way.

And that shiny nose? Visitors rub it for luck, and it wears the bronze away. The council has had to restore it, so a photograph is kinder than a pat.

Walk up through the gates on Candlemaker Row into Greyfriars Kirkyard. Bobby's own headstone is just inside.`,
      },
    },
    {
      id: "greyfriars-kirk",
      order: 3,
      name: "Greyfriars Kirk and Kirkyard",
      coordinates: { lat: 55.94668, lng: -3.19222 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 81,
        audioSource: require("../../../assets/audio/edinburgh-harry-potter/03-greyfriars-kirk.mp3"),
        scriptText: `Welcome to Greyfriars Kirkyard. Its name comes from the Franciscan friars, the grey friars, whose land this was before the Reformation. The town council made it a burial ground in 1562, when the churchyard at St Giles' was full, and the kirk in front of you followed in 1620.

Some great moments in Scottish history happened right here. In February 1638 the National Covenant, a protest against King Charles the First's changes to worship in the Scottish church, was signed in this kirkyard. Some forty years later, after the Battle of Bothwell Bridge, more than a thousand Covenanter prisoners were held in an enclosure at its southern edge.

Look out, too, for iron cages over some of the graves. They're mortsafes, from the early eighteen-hundreds, when body snatchers, the so-called resurrection men, dug up the newly buried to sell to the city's anatomy schools.

Now, Harry Potter. You'll hear that Rowling wandered these paths collecting names for her characters. In 2022 she said she knew this graveyard mainly because one of her children had gone on a Potter walking tour here for a laugh, and come home with "a ton of information that was news to me." So let's look at the stones themselves, and judge fairly.

This is still a working graveyard, so please keep to the paths. Keep right of the kirk and head west, to the far boundary wall.`,
      },
    },
    {
      id: "thomas-riddell",
      order: 4,
      name: "Thomas Riddell's stone",
      coordinates: { lat: 55.94699, lng: -3.193579 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 79,
        audioSource: require("../../../assets/audio/edinburgh-harry-potter/04-thomas-riddell.mp3"),
        scriptText: `Look along the wall tombs here for a tall, dark slate panel set into the western boundary wall. It reads: "Sacred to the memory of Thomas Riddell, Esquire," of an estate in Berwickshire, "who died in Edinburgh on the 24th of November 1806, aged 72." Below him is his son, another Thomas Riddell, a captain in the 14th Regiment, who died in Trinidad in 1802, aged just 26.

Two Thomas Riddells, father and son. If you've read the books, you'll feel the shiver: Lord Voldemort was born Tom Marvolo Riddle, the son of a Muggle who was also called Tom Riddle.

So is this where the name came from? The honest answer is that nobody can show it. Rowling has never said so, and when she was asked about this kirkyard's graves in 2022, she said much of what's told about them was news to her. Even the spelling is different: Riddell here, and in the books, Riddle, like a puzzle, which rather suits a villain built on secrets. It may be a coincidence, or a name half remembered from a walk. What is certain is that this stone stood here for nearly two hundred years before Harry did.

People have left notes here for Voldemort. Please don't. It's somebody's grave.

Now go back along the path, and through the arch in the old Flodden Wall into the lower kirkyard.`,
      },
    },
    {
      id: "mcgonagall-heriots",
      order: 5,
      name: "William McGonagall, and the school over the wall",
      coordinates: { lat: 55.946319, lng: -3.193578 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 85,
        audioSource: require("../../../assets/audio/edinburgh-harry-potter/05-mcgonagall-and-heriots.mp3"),
        scriptText: `You've just come through the Flodden Wall, built in a hurry to defend the town after Scotland's terrible defeat at the Battle of Flodden in 1513. And here, on a flat stone laid in 1999, is a name every Hogwarts student knows: William McGonagall, "Poet and Tragedian."

McGonagall was a weaver from Dundee who became famous as perhaps the worst poet in the English language. He died poor in Edinburgh in 1902 and was buried in this kirkyard in a pauper's grave. No one knows the exact spot, so this stone is a memorial rather than a marker.

And here, at last, we have the author's own word. In a radio interview in 1999, asked about Minerva McGonagall, Rowling said: "McGonagall, very, very, very bad Scottish poet. I just loved the name." She later wrote that she liked the idea of such a brilliant witch being a distant relative of the buffoonish poet.

Now look over the wall at the turreted building beyond. That's George Heriot's School, founded with the fortune of George Heriot, goldsmith to King James the Sixth, and begun in 1628. You'll hear that it inspired Hogwarts, and that its four houses became Gryffindor and the rest. Rowling's answer, in 2020, was that the idea is "100% false": Hogwarts was created long before she clapped eyes on any of Edinburgh's schools.

Head back to the gates, and out to George IV Bridge.`,
      },
    },
    {
      id: "elephant-house",
      order: 6,
      name: "The Elephant House",
      coordinates: { lat: 55.94757, lng: -3.1916 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 62,
        audioSource: require("../../../assets/audio/edinburgh-harry-potter/06-elephant-house.mp3"),
        scriptText: `This is the Elephant House, the café that calls itself "the birthplace of Harry Potter." Rowling did write here, but she has been clear about the birthplace part. In 2020 she wrote: "I'd been writing Potter for several years before I ever set foot in this café, so it's not the birthplace, but I did write in there, so we'll let them off!"

If you want the real birthplaces, she gave those too. The idea arrived on that delayed train from Manchester to London in 1990, and the first words were written in a rented room in a flat above a sports shop in Clapham Junction, in London.

Still, this café has earned its place in the story. In August 2021 a fire tore through the building, and it stayed shut for more than four years while its future hung in the balance. It finally reopened at the turn of 2026, and the café says that inside is a table Rowling used to write at, saved from the wreckage.

If it's open, it's worth a look. Then carry on north along George IV Bridge to the top of Victoria Street, which curves away on your left.`,
      },
    },
    {
      id: "victoria-street",
      order: 7,
      name: "Victoria Street",
      coordinates: { lat: 55.94848, lng: -3.19211 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 71,
        audioSource: require("../../../assets/audio/edinburgh-harry-potter/07-victoria-street.mp3"),
        scriptText: `Here's the street on a thousand postcards: Victoria Street, curving down in a sweep of brightly painted shopfronts, with a terrace walkway running above them.

It's younger than it looks. Before the 1830s, the way down from here to the Grassmarket was the West Bow, a steep, narrow, zigzagging lane. Between 1829 and 1834 the architect Thomas Hamilton laid out this gentler curve in its place, as part of a plan to improve the roads into the Old Town. It was first called Bow Street, and was renamed for the young Queen Victoria when she came to the throne in 1837. Its old Flemish style borrows details from Heriot's, the school you saw over the kirkyard wall.

You'll hear this called the real Diagon Alley, and the shops here have happily leaned into it. But in 2022 Rowling put it plainly: "No real street inspired Diagon Alley, I'm afraid. It came out of my head!" She added that she had never seen Victoria Street when she created it. If anything, that says something lovely about Edinburgh: it built its own Diagon Alley without any help from a wizard.

Walk down the curve to the bottom, and out into the Grassmarket.`,
      },
    },
    {
      id: "grassmarket",
      order: 8,
      name: "The Grassmarket and Half-Hangit Maggie",
      coordinates: { lat: 55.947808, lng: -3.194777 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 68,
        audioSource: require("../../../assets/audio/edinburgh-harry-potter/08-grassmarket.mp3"),
        scriptText: `This broad, open square is the Grassmarket, one of Edinburgh's main market places since the 1400s, where livestock was traded below the castle rock.

It had a darker job too. For centuries this was where the town carried out public executions. The round memorial set into the paving near the eastern end remembers the Covenanters: more than a hundred of them were executed here between 1661 and 1688, in the years known as the Killing Time.

But the Grassmarket story I like best belongs to Maggie Dickson. In 1724 she was hanged here, aged about twenty-two. Her body was put in a coffin and taken away for burial, and on the way, she was found to be alive. Under Scots law her sentence had already been carried out, so it couldn't be carried out again. She went free, and lived for around forty more years, known ever after as Half-Hangit Maggie. That's her name on the pub along the square. It's a tale that would sit very comfortably in a wizarding history book.

Now for a climb. Head west along the Grassmarket, and take the steep steps of Castle Wynd up towards the castle. Take your time. They're worth it.`,
      },
    },
    {
      id: "castle-esplanade",
      order: 9,
      name: "Edinburgh Castle Esplanade",
      coordinates: { lat: 55.94869, lng: -3.1974 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 77,
        audioSource: require("../../../assets/audio/edinburgh-harry-potter/09-castle-esplanade.mp3"),
        scriptText: `Catch your breath. You're on the Castle Esplanade, the parade ground in front of Edinburgh Castle. The rock beneath you is the plug of an extinct volcano that rose some 350 million years ago. Up inside the walls is the oldest building in the whole city, St Margaret's Chapel, built in the twelfth century by King David the First in memory of his mother.

Be here at one o'clock on any day but Sunday, Good Friday or Christmas Day, and you'll jump. The One O'Clock Gun has been fired from the castle since 1861, first as a time signal for ships.

The gardens far below, to the north, were once a loch, the Nor' Loch, made in the Middle Ages as a defence and drained in stages from the 1750s. A castle on a crag above a lake. Sound familiar? But the films never came here. Their Scottish scenery was shot in the Highlands.

Here's this spot's real Harry Potter moment. At midnight on the 16th of July 2005, the world launch of Harry Potter and the Half-Blood Prince was held inside these walls, and Rowling read from it to seventy young reporters, aged eight to sixteen, from all over the world.

The castle needs a ticket, but the Esplanade is free, though in summer it fills with grandstands for the Military Tattoo. When you're ready, head back down the Royal Mile.`,
      },
    },
    {
      id: "makars-court",
      order: 10,
      name: "Makars' Court",
      coordinates: { lat: 55.949658, lng: -3.193414 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 66,
        audioSource: require("../../../assets/audio/edinburgh-harry-potter/10-makars-court.mp3"),
        scriptText: `Step into Lady Stair's Close, and look down. The flagstones of Makars' Court are carved with lines from Scotland's writers. Makar is an old Scots word for a poet. The lines cover more than six hundred years of writing, from John Barbour in the fourteenth century to Muriel Spark, in English, Scots and Gaelic. The house beside you is the Writers' Museum, devoted to three great names: Robert Burns, Sir Walter Scott and Robert Louis Stevenson.

It's a good place to remember that Harry Potter arrived in a city of storytellers. Scott is often credited with inventing the historical novel. Stevenson gave the world Treasure Island and Jekyll and Hyde. Arthur Conan Doyle, who created Sherlock Holmes, was born in Edinburgh too. And in 2004, Edinburgh became the world's first UNESCO City of Literature.

So when Rowling settled here in the 1990s and wrote in the city's cafés, she was joining a long Edinburgh tradition of turning grey mornings into stories.

Walk back out to the Royal Mile, turn left, and head down towards the crowned spire of St Giles' Cathedral.`,
      },
    },
    {
      id: "heart-of-midlothian",
      order: 11,
      name: "The Heart of Midlothian",
      coordinates: { lat: 55.949552, lng: -3.191578 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 64,
        audioSource: require("../../../assets/audio/edinburgh-harry-potter/11-heart-of-midlothian.mp3"),
        scriptText: `Look down at the cobbles beside St Giles' for a heart picked out in coloured stone. This is the Heart of Midlothian, and it marks the doorway of the Old Tolbooth, the town's prison, which stood here until it was pulled down in 1817.

The next year, Sir Walter Scott named a novel after it, The Heart of Midlothian, and Edinburgh's football club, Heart of Midlothian, later took the name and the crest. You may see locals spit on it. It's said to bring good luck, though the custom probably began as a sign of contempt for the prison, and you're under no obligation to join in.

Behind you rises St Giles' Cathedral, the High Kirk of Edinburgh, with its crown-shaped spire. And the street beneath your feet is the Royal Mile, running downhill from the castle to the Palace of Holyroodhouse: roughly one old Scots mile, which was a little longer than an English one.

A heart set in stone, a prison long gone, and good luck for anyone who spits on it. Edinburgh has never needed magic to feel magical.

Now cross the High Street to the arches opposite, and step into the courtyard of the City Chambers.`,
      },
    },
    {
      id: "city-chambers",
      order: 12,
      name: "The City Chambers and Rowling's handprints",
      coordinates: { lat: 55.949995, lng: -3.190404 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 70,
        audioSource: require("../../../assets/audio/edinburgh-harry-potter/12-city-chambers-handprints.mp3"),
        scriptText: `This courtyard belongs to the City Chambers, home of Edinburgh's council. It was built in the 1750s as the Royal Exchange, a trading hall for merchants designed by John Adam, and the council moved in bit by bit, owning the whole building by 1893. Hidden beneath it are the old streets it was built over, among them Mary King's Close, which you can still visit underground.

The bronze in the middle is Alexander the Great taming his horse Bucephalus, by Sir John Steell.

Now look in the paving for a set of handprints in Caithness stone. These are J.K. Rowling's, made after she received the Edinburgh Award in 2008, the city's honour for one of its own. When they were unveiled, Rowling said she was "deeply honoured to have my keyboard-chipped fingernails, not to mention my pen-induced friction callous, commemorated in the place where I produced Harry Potter." Other winners' hands are set here too, starting with the first, the crime writer Ian Rankin.

Go on, compare hand sizes. Everyone does.

Our last stop is the hotel where the story ended. Head down the High Street, and follow the route down through the closes towards Waverley Station and Princes Street.`,
      },
    },
    {
      id: "balmoral",
      order: 13,
      name: "The Balmoral Hotel, room 552",
      coordinates: { lat: 55.95315, lng: -3.18962 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 77,
        audioSource: require("../../../assets/audio/edinburgh-harry-potter/13-balmoral-hotel.mp3"),
        scriptText: `And here we are, at the end of the story. This grand hotel with the tall clock tower opened in 1902 as the North British Station Hotel, built by a railway company beside Waverley Station. It was renamed the Balmoral in 1991.

Check your watch against that clock. It runs three minutes fast, so that travellers don't miss their trains, every day except Hogmanay, New Year's Eve, when it tells the right time for the bells.

Somewhere up there is room 552. Rowling checked in here to finish the final Harry Potter book in peace. On the 11th of January 2007 she finished it, and then, on a marble bust of Hermes in the room, she wrote: "J.K. Rowling finished writing Harry Potter and the Deathly Hallows in this room, 552, on 11th January 2007." The room is now the J.K. Rowling Suite, and the bust sits safely in a glass case.

So that's the arc of it. Just south of here, in a café on Nicolson Street, a young writer with very little money wrote early chapters of the first book. Here, thirteen years and seven books later, she finished the last. Edinburgh didn't invent Hogwarts, or Diagon Alley. But it's where Harry grew up.

Thank you for walking with me. Waverley Station is right beside you.`,
      },
    },
  ],
  path,
};

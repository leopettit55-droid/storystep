import type { Area } from "../schema";

/**
 * The Tobacco Lords' Glasgow: St Andrew's in the Square, the Gallowgate (the
 * Smeals and Frederick Douglass), Glasgow Cross and the plainstanes, Glassford
 * Street (Shawfield Mansion and the Glassford portrait), the Ramshorn graveyard,
 * 42 Miller Street and Virginia Street, Cochrane Street and the City Chambers, the
 * Cunninghame Mansion (GoMA), Jamaica Street and the Broomielaw. Researched
 * October 2026.
 *
 * Sources: Stephen Mullen, "Glasgow, Slavery and Atlantic Commerce: An Audit of
 * Historic Connections and Modern Legacies" (Glasgow City Council, 2022) and his
 * It Wisnae Us (it.wisnae.us: tobacco lords and industry, St Andrew's, Jamaica
 * Street); T. M. Devine, The Tobacco Lords (1975) as summarised in reviews;
 * Glasgow Life museum blogs (Glassford portrait, 42 Miller Street, Glasgow and the
 * campaign to end slavery) and the 22 July 2026 trail launch release; Wikipedia
 * (Tobacco Lords incl. Jefferson's complaint, William Cunninghame, Gallery of
 * Modern Art, Malt tax riots, The Ramshorn, David Dale, Henry Bell, Glasgow
 * Bridge); TheGlasgowStory (38 firms and over half of Britain's trade by 1773;
 * population figures); Grace's Guide / Scape (Golborne and the Clyde).
 *
 * Corrections and flags:
 *  - The brief framed the Tobacco Lords as "rags to riches". Most came from
 *    established merchant or landed families (Devine): the script says so, and
 *    names David Dale as the real exception.
 *  - Brief asked for 10-12 stops: ten.
 *  - The Smeals' house: 38 Gallowgate (Glasgow City Council trail, 2026) or 161
 *    Gallowgate (Glasgow Life blog). The stop is on the Gallowgate near the Cross
 *    and gives no number.
 *  - The plainstanes etiquette (lesser folk stepping into the mire) is local
 *    tradition: told as "local tradition says".
 *  - The Cunninghame Mansion is dated 1778 (GoMA) or 1780 (Cunninghame):
 *    "around 1780".
 *  - Wading across the Clyde: "it's said". Shawfield death toll varies by source
 *    (the script says only that people were killed).
 *  - Glasgow-based slave voyages: ~27 recorded from Scottish ports plus 4
 *    Scottish-funded (Mullen): "a few dozen".
 *
 * Stops and the walking path come from OpenStreetMap (Overpass and Nominatim; the
 * path routed along OSM footways by the FOSSGIS foot router). Accurate to a few
 * metres, not surveyed: walk the route once before promoting it.
 *
 * Narration: these recordings are TEMPORARY, made with Google text-to-speech in
 * Professor Hoot's "Ask your guide" voice (en-GB-Standard-A). Replace them with the
 * original narrator's ElevenLabs voice, same file names.
 *
 * Cover: "Trongate, Glasgow, Looking West from Glasgow Cross" (after the Foulis
 * Academy), c. 1770, Glasgow Museums (Wikimedia Commons / Art UK, public domain).
 */

/**
 * St Andrew's Square -> Gallowgate -> Glasgow Cross -> Trongate -> Glassford Street
 * -> Candleriggs -> Ingram Street -> Virginia Street and Miller Street -> Cochrane
 * Street -> Queen Street -> Buchanan Street -> Argyle Street -> Jamaica Street ->
 * Broomielaw. About 3.2 km.
 */
const path = [
  { lat: 55.854964, lng: -4.243382 },
  { lat: 55.854971, lng: -4.243371 },
  { lat: 55.855045, lng: -4.243248 },
  { lat: 55.855054, lng: -4.243265 },
  { lat: 55.855095, lng: -4.243345 },
  { lat: 55.855112, lng: -4.243449 },
  { lat: 55.855158, lng: -4.243372 },
  { lat: 55.85529, lng: -4.243149 },
  { lat: 55.85567, lng: -4.242528 },
  { lat: 55.855727, lng: -4.242435 },
  { lat: 55.855595, lng: -4.242201 },
  { lat: 55.855553, lng: -4.242124 },
  { lat: 55.855535, lng: -4.241415 },
  { lat: 55.855848, lng: -4.241934 },
  { lat: 55.85599, lng: -4.242502 },
  { lat: 55.856033, lng: -4.242497 },
  { lat: 55.856079, lng: -4.242478 },
  { lat: 55.856141, lng: -4.242408 },
  { lat: 55.856194, lng: -4.242347 },
  { lat: 55.856251, lng: -4.24227 },
  { lat: 55.856398, lng: -4.242692 },
  { lat: 55.856647, lng: -4.243467 },
  { lat: 55.856684, lng: -4.243588 },
  { lat: 55.856738, lng: -4.243798 },
  { lat: 55.856761, lng: -4.243947 },
  { lat: 55.856849, lng: -4.244505 },
  { lat: 55.856858, lng: -4.244554 },
  { lat: 55.85689, lng: -4.244677 },
  { lat: 55.856924, lng: -4.24488 },
  { lat: 55.856935, lng: -4.244981 },
  { lat: 55.856951, lng: -4.24514 },
  { lat: 55.856976, lng: -4.245331 },
  { lat: 55.857081, lng: -4.246139 },
  { lat: 55.857094, lng: -4.246236 },
  { lat: 55.857101, lng: -4.246293 },
  { lat: 55.85712, lng: -4.246442 },
  { lat: 55.857203, lng: -4.247077 },
  { lat: 55.857272, lng: -4.247606 },
  { lat: 55.857293, lng: -4.247764 },
  { lat: 55.857322, lng: -4.247988 },
  { lat: 55.857386, lng: -4.24848 },
  { lat: 55.857454, lng: -4.248999 },
  { lat: 55.857468, lng: -4.249113 },
  { lat: 55.857497, lng: -4.249334 },
  { lat: 55.857523, lng: -4.249329 },
  { lat: 55.857497, lng: -4.249334 },
  { lat: 55.857468, lng: -4.249113 },
  { lat: 55.857454, lng: -4.248999 },
  { lat: 55.857386, lng: -4.24848 },
  { lat: 55.857322, lng: -4.247988 },
  { lat: 55.857293, lng: -4.247764 },
  { lat: 55.857272, lng: -4.247606 },
  { lat: 55.8578, lng: -4.247386 },
  { lat: 55.857922, lng: -4.247464 },
  { lat: 55.857981, lng: -4.247437 },
  { lat: 55.85778, lng: -4.246084 },
  { lat: 55.857764, lng: -4.24598 },
  { lat: 55.858247, lng: -4.245751 },
  { lat: 55.858355, lng: -4.245699 },
  { lat: 55.858607, lng: -4.24558 },
  { lat: 55.858652, lng: -4.245558 },
  { lat: 55.85878, lng: -4.245498 },
  { lat: 55.859096, lng: -4.245348 },
  { lat: 55.859486, lng: -4.245177 },
  { lat: 55.85948, lng: -4.245117 },
  { lat: 55.859486, lng: -4.245177 },
  { lat: 55.859507, lng: -4.245373 },
  { lat: 55.85953, lng: -4.245587 },
  { lat: 55.859564, lng: -4.245986 },
  { lat: 55.8596, lng: -4.246342 },
  { lat: 55.85965, lng: -4.246839 },
  { lat: 55.85966, lng: -4.246953 },
  { lat: 55.859725, lng: -4.247664 },
  { lat: 55.859745, lng: -4.247879 },
  { lat: 55.859788, lng: -4.248352 },
  { lat: 55.859796, lng: -4.248445 },
  { lat: 55.859808, lng: -4.248569 },
  { lat: 55.859822, lng: -4.24873 },
  { lat: 55.859827, lng: -4.248784 },
  { lat: 55.859864, lng: -4.249197 },
  { lat: 55.859462, lng: -4.249345 },
  { lat: 55.859433, lng: -4.24936 },
  { lat: 55.859418, lng: -4.249388 },
  { lat: 55.859405, lng: -4.249424 },
  { lat: 55.859401, lng: -4.249473 },
  { lat: 55.859429, lng: -4.249767 },
  { lat: 55.859228, lng: -4.249819 },
  { lat: 55.859175, lng: -4.249833 },
  { lat: 55.859021, lng: -4.249872 },
  { lat: 55.858878, lng: -4.249909 },
  { lat: 55.858714, lng: -4.249957 },
  { lat: 55.858719, lng: -4.250029 },
  { lat: 55.858732, lng: -4.250208 },
  { lat: 55.858734, lng: -4.250271 },
  { lat: 55.858749, lng: -4.250589 },
  { lat: 55.858769, lng: -4.250758 },
  { lat: 55.858785, lng: -4.250827 },
  { lat: 55.858817, lng: -4.251089 },
  { lat: 55.858702, lng: -4.251134 },
  { lat: 55.858817, lng: -4.251089 },
  { lat: 55.858851, lng: -4.251077 },
  { lat: 55.859023, lng: -4.251014 },
  { lat: 55.859996, lng: -4.250645 },
  { lat: 55.85992, lng: -4.24981 },
  { lat: 55.859895, lng: -4.24954 },
  { lat: 55.859884, lng: -4.249423 },
  { lat: 55.859967, lng: -4.24939 },
  { lat: 55.860508, lng: -4.249178 },
  { lat: 55.860542, lng: -4.249163 },
  { lat: 55.860627, lng: -4.249166 },
  { lat: 55.860607, lng: -4.249012 },
  { lat: 55.860627, lng: -4.249166 },
  { lat: 55.860542, lng: -4.249163 },
  { lat: 55.860508, lng: -4.249178 },
  { lat: 55.859967, lng: -4.24939 },
  { lat: 55.859884, lng: -4.249423 },
  { lat: 55.859895, lng: -4.24954 },
  { lat: 55.85992, lng: -4.24981 },
  { lat: 55.859996, lng: -4.250645 },
  { lat: 55.860105, lng: -4.251867 },
  { lat: 55.860085, lng: -4.251875 },
  { lat: 55.859902, lng: -4.251945 },
  { lat: 55.859976, lng: -4.252606 },
  { lat: 55.860016, lng: -4.252962 },
  { lat: 55.860029, lng: -4.253077 },
  { lat: 55.860035, lng: -4.253132 },
  { lat: 55.860042, lng: -4.253161 },
  { lat: 55.86005, lng: -4.253185 },
  { lat: 55.860059, lng: -4.253208 },
  { lat: 55.860078, lng: -4.253232 },
  { lat: 55.860094, lng: -4.253246 },
  { lat: 55.860121, lng: -4.253476 },
  { lat: 55.860124, lng: -4.253512 },
  { lat: 55.860209, lng: -4.254238 },
  { lat: 55.859914, lng: -4.254347 },
  { lat: 55.859718, lng: -4.254419 },
  { lat: 55.859563, lng: -4.254476 },
  { lat: 55.85904, lng: -4.25467 },
  { lat: 55.858951, lng: -4.254703 },
  { lat: 55.858679, lng: -4.254803 },
  { lat: 55.858173, lng: -4.254993 },
  { lat: 55.858181, lng: -4.255041 },
  { lat: 55.858261, lng: -4.25584 },
  { lat: 55.858328, lng: -4.256544 },
  { lat: 55.858329, lng: -4.256578 },
  { lat: 55.858341, lng: -4.256843 },
  { lat: 55.858272, lng: -4.256869 },
  { lat: 55.85758, lng: -4.257138 },
  { lat: 55.85741, lng: -4.257204 },
  { lat: 55.857163, lng: -4.257294 },
  { lat: 55.856579, lng: -4.257505 },
  { lat: 55.856543, lng: -4.257518 },
  { lat: 55.856508, lng: -4.257531 },
  { lat: 55.856418, lng: -4.25756 },
  { lat: 55.856443, lng: -4.257767 },
  { lat: 55.85638, lng: -4.257791 },
  { lat: 55.85639, lng: -4.257861 },
  { lat: 55.85635, lng: -4.257883 },
  { lat: 55.856393, lng: -4.258201 },
  { lat: 55.856398, lng: -4.258247 },
  { lat: 55.856282, lng: -4.258308 },
  { lat: 55.856249, lng: -4.258394 },
  { lat: 55.856257, lng: -4.258498 },
];

export const glasgowTobaccoLords: Area = {
  id: "glasgow-tobacco-lords",
  name: "The Tobacco Lords' Glasgow",
  city: "Glasgow",
  description:
    "How tobacco made eighteenth-century Glasgow rich, and who paid for it: scarlet-cloaked merchants on the plainstanes, mansions and street names in the Merchant City, the enslaved people whose labour created the wealth, the Glaswegians who campaigned against slavery, and the river that carried the city into the industrial age.",
  estimatedDurationMin: 75,
  estimatedDistanceKm: 3.2,
  difficulty: "easy",
  accessNote:
    "A short, flat walk through the Merchant City on city pavements. The Gallery of Modern Art and St Andrew's in the Square keep their own opening hours. The tour talks frankly about slavery.",
  isContentComplete: true,
  enableInteractiveGuide: true,
  image: require("../../../assets/tours/glasgow-tobacco-lords.jpg"),
  price: { singleTour: 4.99 },
  startingPoint: {
    lat: 55.855,
    lng: -4.24345,
    label: "St Andrew's in the Square, off the Saltmarket",
  },
  route: [
    {
      id: "tob-st-andrews",
      order: 1,
      name: "St Andrew's in the Square: the merchants' church",
      coordinates: { lat: 55.855, lng: -4.24345 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 73,
        audioSource: require("../../../assets/audio/glasgow-tobacco-lords/01-st-andrews-in-the-square.mp3"),
        scriptText: `Good day, and welcome. On this walk we'll explore how eighteenth-century Glasgow grew rich on tobacco, who those merchants were, and who really paid for their fortunes.

Look at this church. St Andrew's in the Square was built between 1739 and 1756, modelled on St Martin-in-the-Fields in London, and it cost somewhere between fifteen and twenty thousand pounds, a vast sum. Inside, the woodwork is Spanish mahogany, brought home by the city's merchants. By 1787 the square around it was one of the most fashionable addresses in Glasgow.

Where did the money come from? The Union of 1707 opened England's American colonies to Scottish traders, and Glasgow, on the Atlantic side of Britain, was perfectly placed. Its merchants came to dominate the trade in tobacco from Virginia and Maryland.

You'll often hear the Tobacco Lords described as poor boys who made good. Mostly they weren't. Historians have found that most came from established merchant or landowning families, bound together by marriage and partnership.

And the tobacco they traded was grown by enslaved Africans and their descendants. We'll keep that in mind as we walk.

Now head north to the Gallowgate.`,
      },
    },
    {
      id: "tob-gallowgate",
      order: 2,
      name: "The Gallowgate: Glasgow's other voices",
      coordinates: { lat: 55.8564, lng: -4.24269 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 66,
        audioSource: require("../../../assets/audio/glasgow-tobacco-lords/02-gallowgate.mp3"),
        scriptText: `Before we meet the merchants, let's hear from the people who fought against the system that made them rich.

Here on the Gallowgate lived William and Jane Smeal, Quakers and founders of Glasgow's anti-slavery society. William kept a grocer's shop with the family home above it.

In 1846 the Smeals welcomed a remarkable guest: Frederick Douglass, who had escaped from slavery in Maryland and become one of the greatest speakers of his age. He used their home as his base while touring Scotland. In the City Hall on Candleriggs, which we'll pass shortly, some fifteen hundred people crowded in to hear him.

Douglass had come with a campaign. The new Free Church of Scotland had raised thousands of pounds from churches in the slaveholding American South. His slogan, printed on placards and shouted at meetings, was "Send back the money." The Free Church never did. But his tour gave new life to Scotland's anti-slavery movement.

Glasgow was both: a city that profited from slavery, and a city where many people campaigned hard against it.

Now walk west to Glasgow Cross, and the old Tolbooth Steeple.`,
      },
    },
    {
      id: "tob-cross",
      order: 3,
      name: "Glasgow Cross: the plainstanes",
      coordinates: { lat: 55.85698, lng: -4.24533 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 70,
        audioSource: require("../../../assets/audio/glasgow-tobacco-lords/03-glasgow-cross.mp3"),
        scriptText: `This tall tower is the Tolbooth Steeple, built in 1626, and this crossroads was the heart of old Glasgow.

Along the Trongate, just here, stood the Tontine, with a famous coffee room where merchants read the papers and made their deals. In front of it ran the plainstanes: a paved walkway, rare in a muddy town. Local tradition says this was the Tobacco Lords' own promenade. They paced up and down in scarlet cloaks, black three-cornered hats and powdered wigs, carrying gold-topped canes, and lesser folk were expected to step aside into the street.

Their wealth was astonishing. By 1773 there were thirty-eight tobacco firms in the city, and more than half of Britain's tobacco trade passed through Glasgow. Much of it was sold on again, to France.

Their method was called the store system. Glasgow firms opened stores in the colonies, selling cloth, tools and luxuries to planters on credit, against next year's crop. Planters fell deeper into debt. Thomas Jefferson complained that the merchants gave "good prices and credit to the planter till they got him more immersed in debt than he could pay."

Now follow the Trongate west, to the corner of Glassford Street.`,
      },
    },
    {
      id: "tob-shawfield",
      order: 4,
      name: "Glassford Street: the man in the portrait",
      coordinates: { lat: 55.85752, lng: -4.24928 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 74,
        audioSource: require("../../../assets/audio/glasgow-tobacco-lords/04-glassford-street.mp3"),
        scriptText: `This street is named after John Glassford, one of the greatest of the Tobacco Lords, and it runs over the site of his mansion.

Shawfield Mansion was built here in 1711 for Daniel Campbell, a merchant and Member of Parliament. In 1725 he voted for a hated new tax on malt, and an angry Glasgow crowd broke in and wrecked the house. Soldiers opened fire, and people were killed. Campbell received thousands of pounds in compensation.

In 1760 John Glassford bought the mansion. A few years later, around 1767, he had his family painted here. In the shadows behind him stands a Black boy, almost certainly enslaved. For years a story went round that the boy had been deliberately painted out, to hide Glasgow's shame. When the picture was cleaned, conservators found the truth: he'd simply been hidden under darkened varnish. The figure that really had been painted over was Glassford's second wife, replaced by his third.

The portrait now hangs in Kelvingrove, with a new label that tells the boy's story as well as the merchant's.

Now walk north up Glassford Street and along Ingram Street. On Candleriggs, look out for the City Halls, where Frederick Douglass spoke.`,
      },
    },
    {
      id: "tob-ramshorn",
      order: 5,
      name: "The Ramshorn graveyard: where the Lords lie",
      coordinates: { lat: 55.85953, lng: -4.2451 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 74,
        audioSource: require("../../../assets/audio/glasgow-tobacco-lords/05-ramshorn.mp3"),
        scriptText: `Behind these railings is the Ramshorn graveyard, opened in 1719, the burial place of choice for the city's merchant elite. John Glassford is buried here, along with members of the Buchanan family and other tobacco merchants. The church itself, built in the 1820s, now belongs to the University of Strathclyde.

Look for one more name: David Dale. He began as a herd boy and a weaver's apprentice, one of the few genuinely self-made men in this story, and became a merchant and banker. In 1785, with the inventor Richard Arkwright, he founded the great cotton mills at New Lanark, up the Clyde valley. Cotton was the future, and it, too, was bound up with slavery, since much of the raw cotton was picked by enslaved people.

The tobacco fortunes didn't just sit in mansions. Tobacco merchants helped found Glasgow's first banks, the Ship Bank and the Arms Bank in 1750 and the Thistle Bank in 1761, and they put money into tanneries, glassworks, breweries, rope works and ironworks, many making goods to sell to the plantations.

That money helped turn a merchant town into an industrial city.

Now walk west along Ingram Street to Virginia Street and Miller Street.`,
      },
    },
    {
      id: "tob-miller-street",
      order: 6,
      name: "42 Miller Street: the last tobacco merchant's house",
      coordinates: { lat: 55.8587, lng: -4.25112 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 72,
        audioSource: require("../../../assets/audio/glasgow-tobacco-lords/06-miller-street.mp3"),
        scriptText: `Look for number 42. Built in 1775 by John Craig, it's the last survivor of the Georgian villas where Glasgow's tobacco merchants once lived in this part of town.

In 1782 it was bought by the family of Robert Findlay, a tobacco importer. As a boy of sixteen, Findlay had sailed to Virginia to join two uncles who already owned plantations worked by enslaved people. Cash from the business was kept in the house, behind an iron door. Some of the original iron safes are still inside.

The next street along is Virginia Street, named after the colony. Its grandest house, the Virginia Mansion, was bought in 1770 by Alexander Speirs, one of the biggest traders of all.

Think about what made all this possible. In Virginia and Maryland, enslaved men, women and children grew and cured the tobacco. It was hard, endless work, and they were bought and sold with the land. Glasgow's merchants extended credit to the planters, and the credit bought more enslaved people to grow more tobacco.

The house is now home to the Scottish Civic Trust. Now walk up to Ingram Street and turn left, then turn right to Cochrane Street, beside the City Chambers.`,
      },
    },
    {
      id: "tob-city-chambers",
      order: 7,
      name: "Cochrane Street and the City Chambers: a city's reckoning",
      coordinates: { lat: 55.86061, lng: -4.24901 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 73,
        audioSource: require("../../../assets/audio/glasgow-tobacco-lords/07-city-chambers.mp3"),
        scriptText: `The great building beside you is Glasgow City Chambers, opened in 1888, when Glasgow called itself the Second City of the Empire. This street is named after Andrew Cochrane, a tobacco merchant and Lord Provost, who was in office in 1745 when Bonnie Prince Charlie's army demanded money from the city.

For a long time, few people asked about the names on Glasgow's street signs. That has changed. In 2022 the council published an audit by the historian Stephen Mullen. It found sixty-two streets with links to Atlantic slavery, including Buchanan, Glassford, Ingram, Cochrane and Speirs. It found that forty of the city's seventy-nine Lord Provosts, between 1636 and 1834, were connected to slavery, some while owning enslaved people.

In March 2022 the city issued a formal apology. In July 2026 it launched a walking trail, the Legacy of Slavery and Colonialism Trail, which takes in some of the places we've visited today.

So far, rather than renaming the streets, the focus has been on explaining them, so that when you read a sign, you know the story behind it.

Now walk round to Queen Street and the columns of the Gallery of Modern Art.`,
      },
    },
    {
      id: "tob-goma",
      order: 8,
      name: "The Cunninghame Mansion: a fortune from a war",
      coordinates: { lat: 55.8601, lng: -4.252 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 71,
        audioSource: require("../../../assets/audio/glasgow-tobacco-lords/08-gallery-of-modern-art.mp3"),
        scriptText: `This grand building, now the Gallery of Modern Art, began as the town house of William Cunninghame of Lainshaw, a Tobacco Lord whose wealth came from tobacco and sugar.

Cunninghame made his greatest fortune by betting on a war. As the American colonies moved towards revolution in the mid-1770s, he bought up tobacco at low prices, guessing that supplies would soon be cut off. He was right. The price soared, and he sold.

With the money he built this mansion, around 1780, at a cost of ten thousand pounds, on a country lane called the Cow Loan, which he renamed Queen Street. Later it became the Royal Bank, then the Royal Exchange, where the columns and the hall behind were added, then a library, and in 1996, a gallery. The statue in front is the Duke of Wellington, usually wearing a traffic cone.

For most of his rivals, the war was a disaster. Planters' debts of around a million pounds went largely unpaid, and several big firms collapsed. Andrew Buchanan, whose family name is on Buchanan Street just ahead, was a partner in firms that failed in 1777.

Now walk down Buchanan Street to Argyle Street, then right to Jamaica Street.`,
      },
    },
    {
      id: "tob-jamaica",
      order: 9,
      name: "Jamaica Street: from tobacco to sugar",
      coordinates: { lat: 55.8576, lng: -4.2573 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 72,
        audioSource: require("../../../assets/audio/glasgow-tobacco-lords/09-jamaica-street.mp3"),
        scriptText: `After the American war, Glasgow's merchants didn't give up on the Atlantic. They turned south, to the Caribbean, and to sugar, rum and cotton.

This street tells you so. Jamaica Street opened in 1763, named after Britain's largest slave-plantation island. Just to the west, Oswald Street recalls James Oswald, one of the owners of Bance Island, a slave-trading fort off the coast of Sierra Leone. And Gordon Street and Robertson Street, a few blocks north, are named after so-called West India merchants, the sugar men who became the city's new elite.

Very few slave ships sailed from Glasgow itself. Historians have counted only a few dozen slaving voyages from all of Scotland, compared with thousands from Liverpool and Bristol. But Glasgow's prosperity rested on what enslaved people produced, and many Glasgow merchants owned plantations, and people, outright.

Britain abolished its slave trade in 1807, and slavery itself in most of its colonies from 1834. When it did, slave owners, not the enslaved, received compensation, and many of those owners lived in and around Glasgow.

Now walk down to the river, at the Broomielaw.`,
      },
    },
    {
      id: "tob-broomielaw",
      order: 10,
      name: "The Broomielaw: a river made for industry",
      coordinates: { lat: 55.85625, lng: -4.2585 },
      triggerRadiusMeters: 25,
      narration: {
        durationSec: 72,
        audioSource: require("../../../assets/audio/glasgow-tobacco-lords/10-broomielaw.mp3"),
        scriptText: `Here at the Broomielaw, Glasgow's old quay, our story turns from trade to industry.

In the Tobacco Lords' day, the Clyde here was so shallow that, it's said, you could wade across it in summer, and big ships had to unload far downriver at Port Glasgow. In 1768 the engineer John Golborne proposed narrowing the river with stone jetties, so the current would scour out a deeper channel. Work began in 1770, and within a few years the river was far deeper. Ocean-going ships could at last come right into the city.

Tobacco money had already flowed into banks, mills and works. Now cotton boomed, then iron, coal and engineering. Glasgow's population grew from about thirty-two thousand in 1750 to more than a hundred and forty-seven thousand by 1821.

And in August 1812, a little paddle steamer called the Comet left this quay for Greenock: the first commercial steamboat service in Europe. On the Clyde, a new age of ships and shipyards was beginning.

So when you see the old merchants' names around Glasgow, remember the whole story: the enterprise and ambition, and the enslaved people whose labour paid for so much of it.

Thank you for walking with me.`,
      },
    },
  ],
  path,
};

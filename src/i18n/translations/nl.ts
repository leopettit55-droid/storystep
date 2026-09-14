import type { TranslationDict } from "./en";

const nl: TranslationDict = {
  nav: { home: "Home", map: "3D-kaart", tours: "Tours", account: "Account", help: "Help" },

  common: {
    min: "min",
    km: "km",
    stops: "stops",
    from: "vanaf",
    easy: "makkelijk",
    moderate: "gemiddeld",
    hard: "moeilijk",
    comingSoon: "Binnenkort",
    start: "Start",
    you: "Jij",
  },

  language: {
    picker: "Taal",
    title: "Kies een taal",
  },

  landing: {
    exploreButton: "Ontdekken",
  },

  home: {
    heroSubtitle: "Jouw AI-verteld wandelgids voor Londen, Parijs, Oxford en meer — koptelefoon op, ontdek de wereld.",
    statsTours: "tours",
    statsCities: "steden",
    statsFrom: "vanaf",
    browseTours: "Bekijk tours",
    exploreIn3D: "Ontdek in 3D →",
    whoWeAreTitle: "Wie we zijn",
    whoWeAreBody:
      "We zijn een klein team dat geobsedeerd is door de verhalen achter gewone straten. StoryStep bestaat zodat je door een stad kunt lopen en écht begrijpt wat je ziet — de gids in je zak, niet je neus in een reisgids.",
    whyTitle: "Waarom StoryStep",
    featureGpsTitle: "Verhaal wordt gestart via gps",
    featureGpsBody: "Niets tikken tijdens het lopen. Je telefoon weet wanneer je bij een stop bent en speelt automatisch het volgende deel af.",
    featureNarratorTitle: "Een echte verteller, geen robot",
    featureNarratorBody: "Elke tour wordt van begin tot eind ingesproken door één natuurlijke Britse stem — geen synthetische spraak.",
    featureScanTitle: "Scan een bezienswaardigheid",
    featureScanBody: "Richt je camera op een gebouw dat je niet herkent en StoryStep probeert het direct te identificeren.",
    featureOfflineTitle: "Werkt offline tijdens het lopen",
    featureOfflineBody: "Het verhaal wordt van tevoren gedownload, zodat een zwakke verbinding onder een brug je niet in de steek laat.",
    scanCardTitle: "Scan een bezienswaardigheid",
    scanCardBody: "Richt je camera op een gebouw en StoryStep probeert je te vertellen wat het is.",
    featuredToursTitle: "Uitgelichte tours",
    howItWorksTitle: "Hoe het werkt",
    step1: "Kies een tour op het tabblad Tours.",
    step2: "Loop naar het gemarkeerde startpunt.",
    step3: "Gewoon lopen — het verhaal start vanzelf bij elke stop.",
    pricingTitle: "Prijzen",
    singleTourTitle: "Losse tour",
    singleTourBody: "Eén tour voor altijd bezitten. Geen abonnement.",
    weeklyBadge: "MEEST FLEXIBEL",
    weeklyTitle: "Wekelijks onbeperkt",
    weeklyBody: "Alle tours, onbeperkt, 7 dagen lang.",
    monthlyTitle: "Maandelijks onbeperkt",
    monthlyBody: "Alle tours, onbeperkt, 30 dagen lang.",
    ctaTitle: "Klaar om de stad anders te zien?",
    ctaBody: "Kies een straat. Koptelefoon op. Gewoon lopen.",
    ctaButton: "Bekijk tours →",
    footerPrivacy: "Privacybeleid",
    footerTerms: "Gebruiksvoorwaarden",
    footerHelp: "Help",
    footerCopy: "© 2026 StoryStep. Alle rechten voorbehouden.",
  },

  tours: {
    title: "Tours",
    subtitle: "Kies een buurt. Koptelefoon op, lopen, en laat je leiden.",
    moreCitiesTitle: "Meer steden",
  },

  map: {
    title: "Ontdek in 3D",
    subtitle: "Echte straten, echte gebouwen — sleep om te verschuiven, scroll om te zoomen, rechtermuisknop-sleep om te kantelen",
    loadIssueTitle: "Kaartbeelden laden niet",
    loadIssueBody: "Controleer je verbinding — tours werken ook zonder de 3D-kaart.",
  },

  account: {
    title: "Account",
    darkMode: "Donkere modus",
    unlimitedTours: "Onbeperkte tours",
    planActive: "{{plan}}-abonnement actief — verlengt of vervalt op {{date}}.",
    planWeekly: "Wekelijkse",
    planMonthly: "Maandelijkse",
    skipPaying: "Niet per tour betalen — onbeperkte toegang zolang je abonnement actief is.",
    weekly: "Wekelijks",
    monthly: "Maandelijks",
    manageOrCancel: "Abonnement beheren of opzeggen",
    cancelFallback: "Om op te zeggen, mail ons vanaf het adres waarmee je je hebt aangemeld.",
    createAccountTitle: "Account aanmaken",
    storedLocally: "Wordt voorlopig alleen op dit apparaat opgeslagen — er is nog geen server, dus het synchroniseert niet tussen telefoons.",
    namePlaceholder: "Naam",
    emailPlaceholder: "E-mail",
    passwordPlaceholder: "Wachtwoord",
    errorFillIn: "Vul je naam, e-mail en een wachtwoord in.",
    errorInvalidEmail: "Dat lijkt geen geldig e-mailadres.",
    createAccountButton: "Account aanmaken",
    signOut: "Uitloggen",
    downloadedTours: "Gedownloade tours",
    downloadedToursBody: "Mayfair — verhaal is meegeleverd met de app",
    aboutTitle: "Over",
    aboutBody: "StoryStep · versie 1.0.0 (prototype)",
    paymentsNotSetTitle: "Betalingen nog niet ingesteld",
    paymentsNotSetBodySub: "Voeg je Stripe Payment Link-URL toe in src/purchases/stripeConfig.ts om abonnementen te activeren.",
  },

  tourPreview: {
    getMeToStart: "Breng me naar de start",
    buyTour: "Tour kopen — {{price}}",
    startsAt: "Start bij {{label}}",
    paymentsNotSetTitle: "Betalingen nog niet ingesteld",
    paymentsNotSetBody: "Voeg je Stripe Payment Link-URL toe in src/purchases/stripeConfig.ts om aankopen te activeren.",
    areaNotFound: "Tour niet gevonden",
  },

  getToStart: {
    title: "Naar het startpunt",
    permissionDenied: "Locatietoestemming geweigerd — zet deze aan in Instellingen voor live routebeschrijving.",
    findingYou: "Jouw locatie zoeken…",
    directions: "Nog ongeveer {{distance}} m, richting {{bearing}}.",
    openInMaps: "Openen in Google Maps",
    startButton: "Ik ben er — start de tour",
    starting: "Starten…",
    areaNotFound: "Tour niet gevonden",
  },

  activeTour: {
    stopOf: "Stop {{current}} van {{total}}",
    walkingToFirst: "Op weg naar de eerste stop…",
    back: "Terug",
    skip: "Volgende",
    scanLandmarks: "Bezienswaardigheden scannen",
    replayLink: "Dit gedeelte opnieuw afspelen",
    offRoute: "Het lijkt erop dat je van de route bent afgeweken — ga terug richting {{waypoint}} zodra je kunt.",
    offRouteFallback: "de vorige stop",
    tourComplete: "Tour voltooid",
    tourCompleteBody: "Je hebt heel {{area}} gelopen. Hopelijk heb je genoten.",
    backToAreas: "Terug naar tours",
    areaNotFound: "Tour niet gevonden",
  },

  camera: {
    permissionTitle: "Cameratoegang nodig",
    permissionBody: "Richt je telefoon op een bezienswaardigheid en StoryStep probeert het te identificeren. Hiervoor is eerst cameratoegang nodig.",
    allowCamera: "Camera toestaan",
    back: "Terug",
    close: "Sluiten",
    noKey: "Geen Vision API-sleutel ingesteld — stel extra.googleVisionApiKey in app.json in.",
    hint: "Kon hier niets herkennen — probeer het hele gebouw in beeld te krijgen en stil te houden.",
    matchPercent: "{{percent}}% overeenkomst",
    noScriptFallback: "Herkend via Google's database van bezienswaardigheden — hiervoor is nog geen eigen tekst.",
    scanButton: "Scan wat ik zie",
    errorCouldntCapture: "Kon geen foto maken.",
    errorGeneric: "Er ging iets mis.",
  },

  help: {
    title: "Help",
    subtitle: "Veelgestelde vragen over het lopen van een tour.",
    faqs: [
      {
        q: "Hoe weet het verhaal waar ik ben?",
        a: "StoryStep houdt je gps-locatie in de gaten tijdens het lopen en speelt automatisch het volgende deel af zodra je bij een stop in de buurt komt — je hoeft nergens op te tikken.",
      },
      {
        q: "Het verhaal startte niet — wat nu?",
        a: "Tik op Volgende of Opnieuw afspelen op het scherm van de actieve tour. Hoge gebouwen in het centrum van Londen kunnen gps-afwijkingen veroorzaken, dus het is normaal dat een deel iets vroeger of later start.",
      },
      {
        q: "Werkt het met een vergrendelde telefoon?",
        a: "Ja — de audio blijft op de achtergrond spelen en locatie-updates blijven delen starten, ook met het scherm uit, zolang je \"Altijd\" locatietoegang hebt gegeven.",
      },
      {
        q: "Heb ik de hele wandeling bereik nodig?",
        a: "Nee. De audio van het verhaal wordt van tevoren gedownload, dus blijft werken bij een zwakke verbinding — onderweg is alleen gps nodig.",
      },
      {
        q: "Waarom heeft \"Scan een bezienswaardigheid\" toestemming nodig?",
        a: "Cameratoegang is nodig om te zien waar je op richt en dit te proberen herkennen. Er wordt niets opgeslagen — de foto wordt alleen voor die ene zoekopdracht gebruikt.",
      },
    ],
    stillStuck: "Kom je er niet uit?",
    stillStuckBody: "Stuur ons een bericht en we reageren.",
    contactUs: "Contact",
    privacyPolicy: "Privacybeleid",
  },

  errorBoundary: {
    title: "Er ging iets mis",
    body: "Sorry daarvoor — dit scherm liep tegen een onverwachte fout aan. Probeer het opnieuw, en als het blijft gebeuren, laat het ons weten.",
    tryAgain: "Opnieuw proberen",
  },

  comingSoonScreen: {
    title: "{{city}} — binnenkort",
    body: "We werken nog aan de StoryStep-wandeltour voor {{city}}. Kom snel terug — ondertussen staan Londen, Parijs en Oxford klaar om te ontdekken.",
    browseAvailable: "Bekijk beschikbare tours",
    back: "Terug",
  },

  contact: {
    title: "Neem contact op",
    subtitle: "Vertel ons wat er aan de hand is, dan reageren we.",
    messagePlaceholder: "Wat is er aan de hand?",
    sendButton: "Bericht versturen",
    errorEmptyMessage: "Schrijf een bericht voordat je verstuurt.",
    errorBody: "Versturen mislukt — controleer je verbinding en probeer opnieuw.",
    successBody: "Bedankt — je bericht is verstuurd. We reageren snel.",
    notConfigured: "Het contactformulier is nog niet ingesteld — mail ons rechtstreeks.",
  },

  legal: {
    englishOnlyNote:
      "Dit juridische document is voorlopig alleen in het Engels beschikbaar, om de nauwkeurigheid te waarborgen — de rest van de app is vertaald.",
  },

  purchase: {
    completeTitle: "Aankoop voltooid",
    completeBody: "Je hebt nu volledige toegang tot {{name}}.",
    thisTour: "deze tour",
    subscriptionActiveTitle: "Abonnement actief",
    weeklyActiveBody: "Onbeperkte tours voor de komende 7 dagen.",
    monthlyActiveBody: "Onbeperkte tours voor de komende 30 dagen.",
  },
};

export default nl;

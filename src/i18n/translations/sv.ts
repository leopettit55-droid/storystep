import type { TranslationDict } from "./en";

const sv: TranslationDict = {
  nav: { home: "Hem", map: "3D-karta", tours: "Turer", account: "Konto", help: "Hjälp" },

  common: {
    min: "min",
    km: "km",
    stops: "stopp",
    from: "från",
    easy: "lätt",
    moderate: "medel",
    hard: "svår",
    comingSoon: "Kommer snart",
    start: "Start",
    you: "Du",
  },

  language: {
    picker: "Språk",
    title: "Välj ett språk",
  },

  landing: {
    exploreButton: "Utforska",
  },

  home: {
    heroSubtitle: "Din AI-berättade promenadguide till London, Paris, Oxford och fler städer — sätt på hörlurarna och utforska världen.",
    statsTours: "turer",
    statsCities: "städer",
    statsFrom: "från",
    browseTours: "Bläddra bland turer",
    exploreIn3D: "Utforska i 3D →",
    whoWeAreTitle: "Vilka vi är",
    whoWeAreBody:
      "Vi är ett litet team besatta av historierna som gömmer sig bakom vanliga gator. StoryStep finns så att du kan gå genom en stad och verkligen förstå vad du ser — guiden i fickan, inte näsan i en reseguide.",
    whyTitle: "Varför StoryStep",
    featureGpsTitle: "GPS-styrd berättelse",
    featureGpsBody: "Inga tryck under promenaden. Telefonen vet när du når ett stopp och spelar automatiskt upp nästa avsnitt.",
    featureNarratorTitle: "En riktig berättare, ingen robot",
    featureNarratorBody: "Varje tur berättas från början till slut av en enda naturlig brittisk röst — ingen syntetisk text-till-tal.",
    featureScanTitle: "Skanna ett landmärke",
    featureScanBody: "Rikta kameran mot en byggnad du inte känner igen så försöker StoryStep identifiera den på plats.",
    featureOfflineTitle: "Fungerar offline under promenaden",
    featureOfflineBody: "Ljudberättelsen laddas ner i förväg, så en dålig anslutning under en bro stänger inte av dig.",
    scanCardTitle: "Skanna ett landmärke",
    scanCardBody: "Rikta kameran mot en byggnad, så försöker StoryStep berätta vad det är.",
    featuredToursTitle: "Utvalda turer",
    howItWorksTitle: "Så fungerar det",
    step1: "Välj en tur under fliken Turer.",
    step2: "Gå till den markerade startpunkten.",
    step3: "Bara gå — berättelsen startar av sig själv vid varje stopp.",
    pricingTitle: "Priser",
    singleTourTitle: "Enskild tur",
    singleTourBody: "Ägo en tur för alltid. Ingen prenumeration.",
    weeklyBadge: "MEST FLEXIBEL",
    weeklyTitle: "Veckovis obegränsat",
    weeklyBody: "Alla turer, obegränsat, i 7 dagar.",
    monthlyTitle: "Månadsvis obegränsat",
    monthlyBody: "Alla turer, obegränsat, i 30 dagar.",
    ctaTitle: "Redo att se staden på ett nytt sätt?",
    ctaBody: "Välj en gata. Sätt på hörlurarna. Bara gå.",
    ctaButton: "Bläddra bland turer →",
    footerPrivacy: "Integritetspolicy",
    footerTerms: "Användarvillkor",
    footerHelp: "Hjälp",
    footerCopy: "© 2026 StoryStep. Alla rättigheter förbehållna.",
  },

  tours: {
    title: "Turer",
    subtitle: "Välj ett område. Sätt på hörlurarna, gå, och låt dig guidas.",
    moreCitiesTitle: "Fler städer",
  },

  map: {
    title: "Utforska i 3D",
    subtitle: "Riktiga gator, riktiga byggnader — dra för att panorera, scrolla för att zooma, högerklick-dra för att luta",
    loadIssueTitle: "Kartbilderna laddas inte",
    loadIssueBody: "Kontrollera din anslutning — turerna fungerar ändå utan 3D-kartan.",
  },

  account: {
    title: "Konto",
    darkMode: "Mörkt läge",
    unlimitedTours: "Obegränsade turer",
    planActive: "{{plan}}-plan aktiv — förnyas eller upphör {{date}}.",
    planWeekly: "Veckovis",
    planMonthly: "Månadsvis",
    skipPaying: "Slipp betala per tur — obegränsad åtkomst så länge planen är aktiv.",
    weekly: "Veckovis",
    monthly: "Månadsvis",
    manageOrCancel: "Hantera eller avsluta prenumeration",
    cancelFallback: "För att avsluta, mejla oss från adressen du prenumererade med.",
    createAccountTitle: "Skapa ett konto",
    storedLocally: "Sparas just nu bara på den här enheten — det finns ingen server ännu, så det synkas inte mellan telefoner.",
    namePlaceholder: "Namn",
    emailPlaceholder: "E-post",
    passwordPlaceholder: "Lösenord",
    errorFillIn: "Fyll i namn, e-post och ett lösenord.",
    errorInvalidEmail: "Det ser inte ut som en giltig e-postadress.",
    createAccountButton: "Skapa konto",
    signOut: "Logga ut",
    downloadedTours: "Nedladdade turer",
    downloadedToursBody: "Mayfair — berättelse ingår i appen",
    aboutTitle: "Om",
    aboutBody: "StoryStep · version 1.0.0 (prototyp)",
    paymentsNotSetTitle: "Betalningar är inte inställda än",
    paymentsNotSetBodySub: "Lägg till din Stripe Payment Link-URL i src/purchases/stripeConfig.ts för att aktivera prenumerationer.",
  },

  tourPreview: {
    useScanner: "Använd vår sevärdhetsskanner",
    scannerFree: "Gratis – ingen turköp krävs",
    getMeToStart: "Ta mig till starten",
    buyTour: "Köp tur — {{price}}",
    startsAt: "Start vid {{label}}",
    paymentsNotSetTitle: "Betalningar är inte inställda än",
    paymentsNotSetBody: "Lägg till din Stripe Payment Link-URL i src/purchases/stripeConfig.ts för att aktivera köp.",
    areaNotFound: "Turen hittades inte",
  },

  getToStart: {
    title: "Ta dig till start",
    permissionDenied: "Platsbehörighet nekades — aktivera den i Inställningar för att se vägbeskrivningar i realtid.",
    findingYou: "Hittar din position…",
    directions: "Cirka {{distance}} m kvar, riktning {{bearing}}.",
    openInMaps: "Öppna i Google Maps",
    startButton: "Jag är framme — starta turen",
    starting: "Startar…",
    areaNotFound: "Turen hittades inte",
  },

  activeTour: {
    stopOf: "Stopp {{current}} av {{total}}",
    walkingToFirst: "På väg till första stoppet…",
    back: "Tillbaka",
    skip: "Hoppa över",
    scanLandmarks: "Skanna landmärken",
    replayLink: "Spela upp det här avsnittet igen",
    offRoute: "Det ser ut som att du har lämnat rutten — gå tillbaka mot {{waypoint}} när du kan.",
    offRouteFallback: "senaste stoppet",
    tourComplete: "Turen är klar",
    tourCompleteBody: "Du har gått hela {{area}}. Vi hoppas att du gillade det.",
    backToAreas: "Tillbaka till turer",
    areaNotFound: "Turen hittades inte",
  },

  camera: {
    permissionTitle: "Kameraåtkomst krävs",
    permissionBody: "Rikta telefonen mot ett landmärke, så försöker StoryStep identifiera det. Det kräver kameraåtkomst först.",
    allowCamera: "Tillåt kamera",
    back: "Tillbaka",
    close: "Stäng",
    noKey: "Ingen Vision API-nyckel konfigurerad — ställ in extra.googleVisionApiKey i app.json.",
    hint: "Kunde inte känna igen något här — försök centrera hela byggnaden och håll telefonen stilla.",
    matchPercent: "{{percent}} % matchning",
    noScriptFallback: "Identifierad via Googles landmärkesdatabas — det finns ingen egen text för den här ännu.",
    scanButton: "Skanna det jag tittar på",
    errorCouldntCapture: "Kunde inte ta ett foto.",
    errorGeneric: "Något gick fel.",
  },

  help: {
    title: "Hjälp",
    subtitle: "Vanliga frågor om att gå en tur.",
    faqs: [
      {
        q: "Hur vet berättelsen var jag är?",
        a: "StoryStep bevakar din GPS-position medan du går och spelar automatiskt upp nästa avsnitt när du närmar dig en punkt — du behöver inte trycka på något.",
      },
      {
        q: "Berättelsen startade inte — vad gör jag?",
        a: "Tryck på Hoppa över eller Spela upp igen på skärmen för aktiv tur. Höga byggnader i centrala London kan orsaka GPS-avvikelser, så det är normalt att ett avsnitt startar lite tidigt eller sent.",
      },
      {
        q: "Fungerar det med låst telefon?",
        a: "Ja — bakgrundsljudet fortsätter spela och positionsuppdateringar fortsätter utlösa avsnitt även med skärmen av, så länge du gett platsåtkomst \"Alltid\".",
      },
      {
        q: "Behöver jag signal under hela promenaden?",
        a: "Nej. Berättelsens ljud laddas ner i förväg, så det fortsätter spela vid svag anslutning — bara GPS behövs under promenaden.",
      },
      {
        q: "Varför behöver \"Skanna ett landmärke\" behörighet?",
        a: "Kameraåtkomst behövs för att se vad du riktar mot och försöka identifiera det. Inget sparas — fotot används bara för den enskilda sökningen.",
      },
    ],
    stillStuck: "Fortfarande fast?",
    stillStuckBody: "Skicka oss ett meddelande så återkommer vi.",
    contactUs: "Kontakta oss",
    privacyPolicy: "Integritetspolicy",
  },

  errorBoundary: {
    title: "Något gick fel",
    body: "Vi beklagar — den här skärmen stötte på ett oväntat fel. Försök igen, och hör av dig till oss om det fortsätter hända.",
    tryAgain: "Försök igen",
  },

  comingSoonScreen: {
    title: "{{city}} — kommer snart",
    body: "Vi håller fortfarande på att bygga StoryStep-promenadturen för {{city}}. Kom tillbaka snart — under tiden är London, Paris och Oxford redo att utforskas.",
    browseAvailable: "Bläddra bland tillgängliga turer",
    back: "Tillbaka",
  },

  contact: {
    title: "Kontakta oss",
    subtitle: "Berätta vad som händer så hör vi av oss.",
    messagePlaceholder: "Vad har hänt?",
    sendButton: "Skicka meddelande",
    errorEmptyMessage: "Skriv ett meddelande innan du skickar.",
    errorBody: "Det gick inte att skicka — kontrollera din anslutning och försök igen.",
    successBody: "Tack — ditt meddelande har skickats. Vi hör av oss snart.",
    notConfigured: "Kontaktformuläret är inte inställt än — mejla oss direkt istället.",
  },

  legal: {
    englishOnlyNote:
      "Det här juridiska dokumentet finns just nu bara på engelska för att hålla det korrekt — resten av appen är översatt.",
  },

  purchase: {
    completeTitle: "Köpet är klart",
    completeBody: "Du har nu full tillgång till {{name}}.",
    thisTour: "den här turen",
    subscriptionActiveTitle: "Prenumeration aktiv",
    weeklyActiveBody: "Obegränsade turer i 7 dagar till.",
    monthlyActiveBody: "Obegränsade turer i 30 dagar till.",
  },
};

export default sv;

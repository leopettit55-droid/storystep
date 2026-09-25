const en = {
  nav: { home: "Home", map: "Explore Map", tours: "Tours", account: "Account", help: "Help" },

  common: {
    min: "min",
    km: "km",
    stops: "stops",
    from: "from",
    easy: "easy",
    moderate: "moderate",
    hard: "hard",
    comingSoon: "Coming soon",
    start: "Start",
    you: "You",
  },

  language: {
    picker: "Language",
    title: "Choose a language",
  },

  landing: {
    exploreButton: "Explore",
  },

  home: {
    heroSubtitle: "Your AI-narrated walking guide to London, Paris, Oxford and more — headphones in, explore the world.",
    statsTours: "tours",
    statsCities: "cities",
    statsFrom: "from",
    browseTours: "Browse tours",
    exploreIn3D: "Explore in 3D →",
    whoWeAreTitle: "Who we are",
    whoWeAreBody:
      "We're a small team obsessed with the stories hiding behind ordinary streets. StoryStep exists so you can walk through a city and actually understand what you're looking at — the guide in your pocket, not your face in a guidebook.",
    whyTitle: "Why StoryStep",
    featureGpsTitle: "GPS-triggered narration",
    featureGpsBody: "No taps mid-walk. Your phone knows when you've reached a stop and plays the next segment automatically.",
    featureNarratorTitle: "A real narrator, not a robot",
    featureNarratorBody: "Every tour is voiced end-to-end by a single natural British narrator — not synthesized text-to-speech.",
    featureScanTitle: "Scan a landmark",
    featureScanBody: "Point your camera at a building you don't recognise and StoryStep will try to identify it on the spot.",
    featureOfflineTitle: "Works offline mid-walk",
    featureOfflineBody: "Narration audio downloads in advance, so a patchy connection under a bridge won't cut you off.",
    scanCardTitle: "Scan a landmark",
    scanCardBody: "Point your camera at a building and StoryStep will try to tell you what it is.",
    featuredToursTitle: "Featured tours",
    howItWorksTitle: "How it works",
    step1: "Pick a tour on the Tours tab.",
    step2: "Walk to the marked starting point.",
    step3: "Just walk — narration triggers itself as you pass each stop.",
    pricingTitle: "Pricing",
    singleTourTitle: "Single tour",
    singleTourBody: "Own one tour forever. No subscription.",
    weeklyBadge: "MOST FLEXIBLE",
    weeklyTitle: "Weekly unlimited",
    weeklyBody: "Every tour, unlimited, for 7 days.",
    monthlyTitle: "Monthly unlimited",
    monthlyBody: "Every tour, unlimited, for 30 days.",
    ctaTitle: "Ready to see it differently?",
    ctaBody: "Pick a street. Put your headphones in. Just walk.",
    ctaButton: "Browse tours →",
    footerPrivacy: "Privacy Policy",
    footerTerms: "Terms of Service",
    footerHelp: "Help",
    footerCopy: "© 2026 StoryStep. All rights reserved.",
  },

  tours: {
    title: "Tours",
    subtitle: "Pick a neighbourhood. Put your headphones in, walk, and let it guide you.",
    moreCitiesTitle: "More cities",
  },

  map: {
    title: "Explore in 3D",
    subtitle: "Real streets, real buildings — drag to pan, scroll to zoom, right-click-drag to tilt",
    loadIssueTitle: "Map imagery isn't loading",
    loadIssueBody: "Check your connection — tours still work without the 3D map.",
  },

  account: {
    title: "Account",
    darkMode: "Dark mode",
    unlimitedTours: "Unlimited tours",
    planActive: "{{plan}} plan active — renews or expires {{date}}.",
    planWeekly: "Weekly",
    planMonthly: "Monthly",
    skipPaying: "Skip paying per tour — unlimited access to every tour while your plan is active.",
    weekly: "Weekly",
    monthly: "Monthly",
    manageOrCancel: "Manage or cancel subscription",
    cancelFallback: "To cancel, email us with the address you subscribed with.",
    createAccountTitle: "Create an account",
    storedLocally: "Stored on this device only for now — there's no server behind this yet, so it won't sync across phones.",
    namePlaceholder: "Name",
    emailPlaceholder: "Email",
    passwordPlaceholder: "Password",
    errorFillIn: "Fill in your name, email, and a password.",
    errorInvalidEmail: "That doesn't look like a valid email address.",
    createAccountButton: "Create account",
    signOut: "Sign out",
    downloadedTours: "Downloaded tours",
    downloadedToursBody: "Mayfair — narration bundled with the app",
    aboutTitle: "About",
    aboutBody: "StoryStep · version 1.0.0 (prototype)",
    paymentsNotSetTitle: "Payments not set up yet",
    paymentsNotSetBodySub: "Add your Stripe Payment Link URL to src/purchases/stripeConfig.ts to enable subscriptions.",
  },

  tourPreview: {
    useScanner: "Use our landmark scanner",
    scannerFree: "Free — no tour purchase needed",
    getMeToStart: "Get me to the start",
    buyTour: "Buy tour — {{price}}",
    startsAt: "Starts at {{label}}",
    paymentsNotSetTitle: "Payments not set up yet",
    paymentsNotSetBody: "Add your Stripe Payment Link URL to src/purchases/stripeConfig.ts to enable purchases.",
    areaNotFound: "Area not found",
  },

  getToStart: {
    title: "Get to the start",
    permissionDenied: "Location permission was denied — enable it in Settings to see live directions.",
    findingYou: "Finding you…",
    directions: "About {{distance}}m to go, heading {{bearing}}.",
    openInMaps: "Open in Google Maps",
    startButton: "I've arrived — start the tour",
    starting: "Starting…",
    areaNotFound: "Area not found",
  },

  activeTour: {
    stopOf: "Stop {{current}} of {{total}}",
    walkingToFirst: "Walking to the first stop…",
    back: "Back",
    skip: "Skip",
    scanLandmarks: "Scan landmarks",
    replayLink: "Replay this segment",
    offRoute: "Looks like you've wandered off the route — head back toward {{waypoint}} when you can.",
    offRouteFallback: "the last stop",
    tourComplete: "Tour complete",
    tourCompleteBody: "You've walked all of {{area}}. Hope you enjoyed it.",
    backToAreas: "Back to areas",
    areaNotFound: "Area not found",
  },

  camera: {
    permissionTitle: "Camera access needed",
    permissionBody: "Point your phone at a landmark and StoryStep will try to identify it. This needs camera access first.",
    allowCamera: "Allow camera",
    back: "Back",
    close: "Close",
    noKey: "No Vision API key configured — set extra.googleVisionApiKey in app.json.",
    hint: "Couldn't recognise anything there — try centring the whole building and holding steady.",
    matchPercent: "{{percent}}% match",
    noScriptFallback: "Recognised by Google's landmark database — no local script for this one yet.",
    scanButton: "Scan what I'm looking at",
    errorCouldntCapture: "Couldn't capture a photo.",
    errorGeneric: "Something went wrong.",
  },

  help: {
    title: "Help",
    subtitle: "Common questions about walking a tour.",
    faqs: [
      {
        q: "How does narration know where I am?",
        a: "StoryStep watches your GPS location as you walk and automatically plays the next segment when you get close to a waypoint — no need to tap anything.",
      },
      {
        q: "The narration didn't trigger — what do I do?",
        a: "Tap Skip or Replay on the active tour screen. Tall buildings in central London can cause GPS drift, so it's normal for a segment to fire a little early or late.",
      },
      {
        q: "Does it work with my phone locked?",
        a: "Yes — background audio keeps playing and location updates keep triggering segments even with the screen off, as long as you granted \"Always\" location access.",
      },
      {
        q: "Do I need signal for the whole walk?",
        a: "No. Narration audio is downloaded in advance, so it keeps playing over a spotty connection — only GPS is needed mid-walk.",
      },
      {
        q: "What does \"Scan a landmark\" need permission for?",
        a: "Camera access, so it can look at what you're pointing at and try to identify it. Nothing is stored — the photo is only used for that one lookup.",
      },
    ],
    stillStuck: "Still stuck?",
    stillStuckBody: "Send us a message and we'll get back to you.",
    contactUs: "Contact us",
    privacyPolicy: "Privacy Policy",
  },

  errorBoundary: {
    title: "Something went wrong",
    body: "Sorry about that — this screen hit an unexpected error. Try again, and if it keeps happening, let us know.",
    tryAgain: "Try again",
  },

  comingSoonScreen: {
    title: "{{city}} — coming soon",
    body: "We're still building StoryStep's walking tour for {{city}}. Check back soon — in the meantime, London, Paris, and Oxford are ready to explore.",
    browseAvailable: "Browse available tours",
    back: "Back",
  },

  contact: {
    title: "Contact us",
    subtitle: "Tell us what's going on and we'll get back to you.",
    messagePlaceholder: "What's going on?",
    sendButton: "Send message",
    errorEmptyMessage: "Please write a message before sending.",
    errorBody: "Couldn't send that — check your connection and try again.",
    successBody: "Thanks — your message has been sent. We'll get back to you soon.",
    notConfigured: "The contact form isn't set up yet — email us directly instead.",
  },

  legal: {
    englishOnlyNote:
      "This legal document is available in English only for now, to keep it accurate — the rest of the app is translated.",
  },

  purchase: {
    completeTitle: "Purchase complete",
    completeBody: "You now have full access to {{name}}.",
    thisTour: "this tour",
    subscriptionActiveTitle: "Subscription active",
    weeklyActiveBody: "Unlimited tours for the next 7 days.",
    monthlyActiveBody: "Unlimited tours for the next 30 days.",
  },
};

export default en;
export type TranslationDict = typeof en;

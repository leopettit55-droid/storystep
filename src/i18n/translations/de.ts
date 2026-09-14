import type { TranslationDict } from "./en";

const de: TranslationDict = {
  nav: { home: "Start", map: "3D-Karte", tours: "Touren", account: "Konto", help: "Hilfe" },

  common: {
    min: "Min.",
    km: "km",
    stops: "Stopps",
    from: "ab",
    easy: "leicht",
    moderate: "mittel",
    hard: "schwer",
    comingSoon: "Demnächst",
    start: "Start",
    you: "Du",
  },

  language: {
    picker: "Sprache",
    title: "Sprache wählen",
  },

  landing: {
    exploreButton: "Entdecken",
  },

  home: {
    heroSubtitle: "Dein KI-erzählter Spaziergangsguide durch London, Paris, Oxford und mehr — Kopfhörer rein, die Welt entdecken.",
    statsTours: "Touren",
    statsCities: "Städte",
    statsFrom: "ab",
    browseTours: "Touren ansehen",
    exploreIn3D: "In 3D entdecken →",
    whoWeAreTitle: "Wer wir sind",
    whoWeAreBody:
      "Wir sind ein kleines Team, das von den Geschichten hinter ganz normalen Straßen fasziniert ist. StoryStep gibt es, damit du durch eine Stadt gehen und wirklich verstehen kannst, was du siehst — der Guide in deiner Tasche, nicht dein Gesicht im Reiseführer.",
    whyTitle: "Warum StoryStep",
    featureGpsTitle: "GPS-gesteuerte Erzählung",
    featureGpsBody: "Kein Tippen unterwegs nötig. Dein Handy weiß, wann du an einer Station bist, und spielt automatisch den nächsten Abschnitt ab.",
    featureNarratorTitle: "Ein echter Erzähler, kein Roboter",
    featureNarratorBody: "Jede Tour wird komplett von einer echten britischen Stimme erzählt — keine synthetische Sprachausgabe.",
    featureScanTitle: "Sehenswürdigkeit scannen",
    featureScanBody: "Richte die Kamera auf ein Gebäude, das du nicht kennst, und StoryStep versucht, es sofort zu erkennen.",
    featureOfflineTitle: "Funktioniert unterwegs auch offline",
    featureOfflineBody: "Die Audiodateien werden vorab heruntergeladen — eine schwache Verbindung unter einer Brücke unterbricht dich nicht.",
    scanCardTitle: "Sehenswürdigkeit scannen",
    scanCardBody: "Richte die Kamera auf ein Gebäude, und StoryStep versucht dir zu sagen, was es ist.",
    featuredToursTitle: "Empfohlene Touren",
    howItWorksTitle: "So funktioniert's",
    step1: "Wähle eine Tour im Tab „Touren“.",
    step2: "Geh zum markierten Startpunkt.",
    step3: "Einfach losgehen — die Erzählung startet automatisch an jeder Station.",
    pricingTitle: "Preise",
    singleTourTitle: "Einzeltour",
    singleTourBody: "Eine Tour für immer besitzen. Kein Abo.",
    weeklyBadge: "AM FLEXIBELSTEN",
    weeklyTitle: "Wöchentlich unbegrenzt",
    weeklyBody: "Alle Touren, unbegrenzt, für 7 Tage.",
    monthlyTitle: "Monatlich unbegrenzt",
    monthlyBody: "Alle Touren, unbegrenzt, für 30 Tage.",
    ctaTitle: "Bereit, die Stadt anders zu sehen?",
    ctaBody: "Wähle eine Straße. Kopfhörer rein. Einfach losgehen.",
    ctaButton: "Touren ansehen →",
    footerPrivacy: "Datenschutz",
    footerTerms: "Nutzungsbedingungen",
    footerHelp: "Hilfe",
    footerCopy: "© 2026 StoryStep. Alle Rechte vorbehalten.",
  },

  tours: {
    title: "Touren",
    subtitle: "Wähle ein Viertel. Kopfhörer rein, losgehen, und lass dich führen.",
    moreCitiesTitle: "Weitere Städte",
  },

  map: {
    title: "In 3D entdecken",
    subtitle: "Echte Straßen, echte Gebäude — ziehen zum Verschieben, scrollen zum Zoomen, rechte Maustaste halten zum Neigen",
    loadIssueTitle: "Kartenbilder laden nicht",
    loadIssueBody: "Prüfe deine Verbindung — die Touren funktionieren auch ohne die 3D-Karte.",
  },

  account: {
    title: "Konto",
    darkMode: "Dunkelmodus",
    unlimitedTours: "Unbegrenzte Touren",
    planActive: "{{plan}}-Abo aktiv — verlängert sich oder endet am {{date}}.",
    planWeekly: "Wöchentliches",
    planMonthly: "Monatliches",
    skipPaying: "Kein Bezahlen pro Tour — unbegrenzter Zugriff, solange dein Abo aktiv ist.",
    weekly: "Wöchentlich",
    monthly: "Monatlich",
    manageOrCancel: "Abo verwalten oder kündigen",
    cancelFallback: "Zum Kündigen schreib uns eine E-Mail mit der Adresse, mit der du dich angemeldet hast.",
    createAccountTitle: "Konto erstellen",
    storedLocally: "Wird derzeit nur auf diesem Gerät gespeichert — es gibt noch keinen Server, daher keine Synchronisierung zwischen Geräten.",
    namePlaceholder: "Name",
    emailPlaceholder: "E-Mail",
    passwordPlaceholder: "Passwort",
    errorFillIn: "Bitte Name, E-Mail und Passwort eingeben.",
    errorInvalidEmail: "Das sieht nicht nach einer gültigen E-Mail-Adresse aus.",
    createAccountButton: "Konto erstellen",
    signOut: "Abmelden",
    downloadedTours: "Heruntergeladene Touren",
    downloadedToursBody: "Mayfair — Erzählung in der App enthalten",
    aboutTitle: "Über",
    aboutBody: "StoryStep · Version 1.0.0 (Prototyp)",
    paymentsNotSetTitle: "Zahlungen noch nicht eingerichtet",
    paymentsNotSetBodySub: "Füge deine Stripe-Payment-Link-URL in src/purchases/stripeConfig.ts ein, um Abos zu aktivieren.",
  },

  tourPreview: {
    getMeToStart: "Bring mich zum Start",
    buyTour: "Tour kaufen — {{price}}",
    startsAt: "Start: {{label}}",
    paymentsNotSetTitle: "Zahlungen noch nicht eingerichtet",
    paymentsNotSetBody: "Füge deine Stripe-Payment-Link-URL in src/purchases/stripeConfig.ts ein, um Käufe zu aktivieren.",
    areaNotFound: "Tour nicht gefunden",
  },

  getToStart: {
    title: "Zum Startpunkt",
    permissionDenied: "Standortzugriff wurde verweigert — aktiviere ihn in den Einstellungen für Live-Wegbeschreibungen.",
    findingYou: "Standort wird ermittelt…",
    directions: "Noch etwa {{distance}} m, Richtung {{bearing}}.",
    openInMaps: "In Google Maps öffnen",
    startButton: "Ich bin angekommen — Tour starten",
    starting: "Wird gestartet…",
    areaNotFound: "Tour nicht gefunden",
  },

  activeTour: {
    stopOf: "Station {{current}} von {{total}}",
    walkingToFirst: "Unterwegs zur ersten Station…",
    back: "Zurück",
    skip: "Weiter",
    scanLandmarks: "Sehenswürdigkeiten scannen",
    replayLink: "Diesen Abschnitt wiederholen",
    offRoute: "Sieht so aus, als hättest du die Route verlassen — geh zurück Richtung {{waypoint}}, sobald du kannst.",
    offRouteFallback: "zur letzten Station",
    tourComplete: "Tour abgeschlossen",
    tourCompleteBody: "Du hast ganz {{area}} erwandert. Wir hoffen, es hat dir gefallen.",
    backToAreas: "Zurück zu den Touren",
    areaNotFound: "Tour nicht gefunden",
  },

  camera: {
    permissionTitle: "Kamerazugriff erforderlich",
    permissionBody: "Richte dein Handy auf eine Sehenswürdigkeit, und StoryStep versucht, sie zu erkennen. Dafür wird zunächst Kamerazugriff benötigt.",
    allowCamera: "Kamera erlauben",
    back: "Zurück",
    close: "Schließen",
    noKey: "Kein Vision-API-Schlüssel konfiguriert — extra.googleVisionApiKey in app.json setzen.",
    hint: "Hier konnte nichts erkannt werden — versuche, das ganze Gebäude zu zentrieren und ruhig zu halten.",
    matchPercent: "{{percent}} % Übereinstimmung",
    noScriptFallback: "Über Googles Datenbank für Sehenswürdigkeiten erkannt — dafür gibt es noch keinen eigenen Text.",
    scanButton: "Scannen, was ich sehe",
    errorCouldntCapture: "Foto konnte nicht aufgenommen werden.",
    errorGeneric: "Etwas ist schiefgelaufen.",
  },

  help: {
    title: "Hilfe",
    subtitle: "Häufige Fragen zu Spaziergangstouren.",
    faqs: [
      {
        q: "Woher weiß die Erzählung, wo ich bin?",
        a: "StoryStep verfolgt deinen GPS-Standort während des Gehens und spielt automatisch den nächsten Abschnitt ab, sobald du in die Nähe einer Station kommst — ohne dass du etwas tippen musst.",
      },
      {
        q: "Die Erzählung hat nicht ausgelöst — was tun?",
        a: "Tippe auf „Weiter“ oder „Wiederholen“ auf dem Tour-Bildschirm. Hohe Gebäude in der Londoner Innenstadt können GPS-Ungenauigkeiten verursachen, daher ist es normal, wenn ein Abschnitt etwas früher oder später startet.",
      },
      {
        q: "Funktioniert es bei gesperrtem Handy?",
        a: "Ja — die Audiowiedergabe läuft im Hintergrund weiter, und Standortaktualisierungen lösen Abschnitte auch bei ausgeschaltetem Display aus, solange du „Immer“ als Standortzugriff erlaubt hast.",
      },
      {
        q: "Brauche ich während des ganzen Spaziergangs Netz?",
        a: "Nein. Die Erzählung wird vorab heruntergeladen und läuft daher auch bei schlechter Verbindung weiter — unterwegs wird nur GPS benötigt.",
      },
      {
        q: "Wofür braucht „Sehenswürdigkeit scannen“ eine Berechtigung?",
        a: "Für den Kamerazugriff, damit die App sehen kann, worauf du zeigst, und es zu erkennen versucht. Es wird nichts gespeichert — das Foto wird nur für diese eine Abfrage genutzt.",
      },
    ],
    stillStuck: "Noch Fragen?",
    stillStuckBody: "Schreib uns eine Nachricht, wir melden uns bei dir.",
    contactUs: "Kontakt",
    privacyPolicy: "Datenschutz",
  },

  errorBoundary: {
    title: "Etwas ist schiefgelaufen",
    body: "Entschuldigung — bei diesem Bildschirm ist ein unerwarteter Fehler aufgetreten. Versuch es erneut, und falls es weiter passiert, melde dich bei uns.",
    tryAgain: "Erneut versuchen",
  },

  comingSoonScreen: {
    title: "{{city}} — demnächst",
    body: "Wir arbeiten noch an der StoryStep-Tour für {{city}}. Schau bald wieder vorbei — in der Zwischenzeit warten London, Paris und Oxford darauf, entdeckt zu werden.",
    browseAvailable: "Verfügbare Touren ansehen",
    back: "Zurück",
  },

  contact: {
    title: "Kontaktiere uns",
    subtitle: "Sag uns, was los ist, wir melden uns bei dir.",
    messagePlaceholder: "Was ist los?",
    sendButton: "Nachricht senden",
    errorEmptyMessage: "Bitte schreib eine Nachricht, bevor du sendest.",
    errorBody: "Senden fehlgeschlagen — prüfe deine Verbindung und versuch es erneut.",
    successBody: "Danke — deine Nachricht wurde gesendet. Wir melden uns bald.",
    notConfigured: "Das Kontaktformular ist noch nicht eingerichtet — schreib uns direkt eine E-Mail.",
  },

  legal: {
    englishOnlyNote:
      "Dieses rechtliche Dokument ist derzeit nur auf Englisch verfügbar, um die Genauigkeit zu gewährleisten — der Rest der App ist übersetzt.",
  },

  purchase: {
    completeTitle: "Kauf abgeschlossen",
    completeBody: "Du hast jetzt vollen Zugriff auf {{name}}.",
    thisTour: "diese Tour",
    subscriptionActiveTitle: "Abo aktiv",
    weeklyActiveBody: "Unbegrenzte Touren für die nächsten 7 Tage.",
    monthlyActiveBody: "Unbegrenzte Touren für die nächsten 30 Tage.",
  },
};

export default de;

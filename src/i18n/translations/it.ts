import type { TranslationDict } from "./en";

const it: TranslationDict = {
  nav: { home: "Home", map: "Mappa 3D", tours: "Tour", account: "Account", help: "Aiuto" },

  common: {
    free: "Gratis",
    min: "min",
    km: "km",
    stops: "tappe",
    from: "da",
    easy: "facile",
    moderate: "moderato",
    hard: "difficile",
    comingSoon: "Prossimamente",
    start: "Partenza",
    you: "Tu",
  },

  language: {
    picker: "Lingua",
    title: "Scegli una lingua",
  },

  landing: {
    exploreButton: "Esplora",
  },

  home: {
    heroSubtitle: "La tua guida a piedi narrata dall'IA a Londra, Parigi, Oxford e oltre — cuffie e via, esplora il mondo.",
    statsTours: "tour",
    statsCities: "città",
    statsFrom: "da",
    browseTours: "Sfoglia i tour",
    exploreIn3D: "Esplora in 3D →",
    whoWeAreTitle: "Chi siamo",
    whoWeAreBody:
      "Siamo un piccolo team ossessionato dalle storie nascoste dietro le strade di ogni giorno. StoryStep esiste per farti camminare in una città e capire davvero cosa stai guardando — la guida in tasca, non la faccia in una guida turistica.",
    whyTitle: "Perché StoryStep",
    featureGpsTitle: "Narrazione attivata dal GPS",
    featureGpsBody: "Nessun tocco mentre cammini. Il telefono sa quando raggiungi una tappa e riproduce automaticamente il segmento successivo.",
    featureNarratorTitle: "Un vero narratore, non un robot",
    featureNarratorBody: "Ogni tour è narrato dall'inizio alla fine da un'unica voce britannica naturale — non è sintesi vocale.",
    featureScanTitle: "Scansiona un monumento",
    featureScanBody: "Punta la fotocamera su un edificio che non riconosci e StoryStep proverà a identificarlo sul momento.",
    featureOfflineTitle: "Funziona offline durante la passeggiata",
    featureOfflineBody: "L'audio della narrazione si scarica in anticipo, così una connessione debole sotto un ponte non ti lascerà senza audio.",
    scanCardTitle: "Scansiona un monumento",
    scanCardBody: "Punta la fotocamera su un edificio e StoryStep proverà a dirti di cosa si tratta.",
    featuredToursTitle: "Tour in evidenza",
    howItWorksTitle: "Come funziona",
    step1: "Scegli un tour dalla scheda Tour.",
    step2: "Cammina fino al punto di partenza indicato.",
    step3: "Cammina e basta — la narrazione si attiva da sola a ogni tappa.",
    pricingTitle: "Prezzi",
    singleTourTitle: "Tour singolo",
    singleTourBody: "Possiedi un tour per sempre. Nessun abbonamento.",
    weeklyBadge: "PIÙ FLESSIBILE",
    weeklyTitle: "Illimitato settimanale",
    weeklyBody: "Tutti i tour, illimitati, per 7 giorni.",
    monthlyTitle: "Illimitato mensile",
    monthlyBody: "Tutti i tour, illimitati, per 30 giorni.",
    ctaTitle: "Pronto a vederla in modo diverso?",
    ctaBody: "Scegli una strada. Metti le cuffie. Cammina e basta.",
    ctaButton: "Sfoglia i tour →",
    footerPrivacy: "Informativa sulla privacy",
    footerTerms: "Termini di servizio",
    footerHelp: "Aiuto",
    footerCopy: "© 2026 StoryStep. Tutti i diritti riservati.",
  },

  tours: {
    title: "Tour",
    subtitle: "Scegli un quartiere. Metti le cuffie, cammina e lasciati guidare.",
    moreCitiesTitle: "Altre città",
  },

  map: {
    title: "Esplora in 3D",
    subtitle: "Strade e edifici reali — trascina per spostarti, scorri per zoomare, tasto destro e trascina per inclinare",
    loadIssueTitle: "Le immagini della mappa non si caricano",
    loadIssueBody: "Controlla la connessione — i tour funzionano comunque senza la mappa 3D.",
  },

  account: {
    title: "Account",
    darkMode: "Modalità scura",
    unlimitedTours: "Tour illimitati",
    planActive: "Piano {{plan}} attivo — si rinnova o scade il {{date}}.",
    planWeekly: "settimanale",
    planMonthly: "mensile",
    skipPaying: "Niente più pagamenti per singolo tour — accesso illimitato finché il piano è attivo.",
    weekly: "Settimanale",
    monthly: "Mensile",
    manageOrCancel: "Gestisci o annulla l'abbonamento",
    cancelFallback: "Per annullare, scrivici dall'indirizzo con cui ti sei abbonato.",
    createAccountTitle: "Crea un account",
    storedLocally: "Per ora salvato solo su questo dispositivo — non c'è ancora un server, quindi non si sincronizza tra telefoni.",
    namePlaceholder: "Nome",
    emailPlaceholder: "Email",
    passwordPlaceholder: "Password",
    errorFillIn: "Inserisci nome, email e una password.",
    errorInvalidEmail: "Questo indirizzo email non sembra valido.",
    createAccountButton: "Crea account",
    signOut: "Esci",
    downloadedTours: "Tour scaricati",
    downloadedToursBody: "Mayfair — narrazione inclusa nell'app",
    aboutTitle: "Informazioni",
    aboutBody: "StoryStep · versione 1.0.0 (prototipo)",
    paymentsNotSetTitle: "Pagamenti non ancora configurati",
    paymentsNotSetBodySub: "Aggiungi l'URL del tuo Stripe Payment Link in src/purchases/stripeConfig.ts per attivare gli abbonamenti.",
  },

  tourPreview: {
    useScanner: "Usa il nostro scanner di monumenti",
    scannerFree: "Gratis: non serve acquistare il tour",
    getMeToStart: "Portami alla partenza",
    buyTour: "Acquista il tour — {{price}}",
    startsAt: "Si parte da {{label}}",
    paymentsNotSetTitle: "Pagamenti non ancora configurati",
    paymentsNotSetBody: "Aggiungi l'URL del tuo Stripe Payment Link in src/purchases/stripeConfig.ts per attivare gli acquisti.",
    areaNotFound: "Tour non trovato",
  },

  getToStart: {
    title: "Vai al punto di partenza",
    permissionDenied: "Autorizzazione alla posizione negata — attivala nelle Impostazioni per vedere le indicazioni in tempo reale.",
    findingYou: "Ti sto localizzando…",
    directions: "Mancano circa {{distance}} m, direzione {{bearing}}.",
    openInMaps: "Apri in Google Maps",
    startButton: "Sono arrivato — inizia il tour",
    starting: "Avvio…",
    areaNotFound: "Tour non trovato",
  },

  activeTour: {
    stopOf: "Tappa {{current}} di {{total}}",
    walkingToFirst: "In cammino verso la prima tappa…",
    back: "Indietro",
    skip: "Salta",
    scanLandmarks: "Scansiona monumenti",
    replayLink: "Riascolta questo segmento",
    offRoute: "Sembra che tu ti sia allontanato dal percorso — torna verso {{waypoint}} appena puoi.",
    offRouteFallback: "l'ultima tappa",
    tourComplete: "Tour completato",
    tourCompleteBody: "Hai percorso tutto {{area}}. Speriamo ti sia piaciuto.",
    backToAreas: "Torna ai tour",
    areaNotFound: "Tour non trovato",
  },

  camera: {
    permissionTitle: "Accesso alla fotocamera necessario",
    permissionBody: "Punta il telefono verso un monumento e StoryStep proverà a identificarlo. Prima serve l'accesso alla fotocamera.",
    allowCamera: "Consenti fotocamera",
    back: "Indietro",
    close: "Chiudi",
    noKey: "Nessuna chiave API Vision configurata — imposta extra.googleVisionApiKey in app.json.",
    hint: "Non è stato possibile riconoscere nulla — prova a centrare l'intero edificio e a tenere fermo il telefono.",
    matchPercent: "{{percent}}% di corrispondenza",
    noScriptFallback: "Riconosciuto tramite il database dei monumenti di Google — non c'è ancora un testo locale per questo.",
    scanButton: "Scansiona ciò che sto guardando",
    errorCouldntCapture: "Impossibile scattare la foto.",
    errorGeneric: "Qualcosa è andato storto.",
  },

  help: {
    title: "Aiuto",
    subtitle: "Domande frequenti su come fare un tour a piedi.",
    faqs: [
      {
        q: "Come fa la narrazione a sapere dove mi trovo?",
        a: "StoryStep monitora la tua posizione GPS mentre cammini e riproduce automaticamente il segmento successivo quando ti avvicini a una tappa — senza bisogno di toccare nulla.",
      },
      {
        q: "La narrazione non si è attivata — cosa faccio?",
        a: "Tocca Salta o Riascolta nella schermata del tour attivo. Gli edifici alti nel centro di Londra possono causare interferenze al GPS, quindi è normale che un segmento parta un po' prima o dopo.",
      },
      {
        q: "Funziona con il telefono bloccato?",
        a: "Sì — l'audio in background continua a riprodursi e gli aggiornamenti di posizione continuano ad attivare i segmenti anche a schermo spento, purché tu abbia concesso l'accesso alla posizione \"Sempre\".",
      },
      {
        q: "Serve il segnale per tutta la passeggiata?",
        a: "No. L'audio della narrazione viene scaricato in anticipo, quindi continua a funzionare con una connessione debole — durante la camminata serve solo il GPS.",
      },
      {
        q: "Perché \"Scansiona un monumento\" richiede un'autorizzazione?",
        a: "Serve l'accesso alla fotocamera per vedere cosa stai inquadrando e provare a riconoscerlo. Non viene salvato nulla — la foto è usata solo per quella ricerca.",
      },
    ],
    stillStuck: "Hai ancora dubbi?",
    stillStuckBody: "Mandaci un messaggio e ti risponderemo.",
    contactUs: "Contattaci",
    privacyPolicy: "Informativa sulla privacy",
  },

  errorBoundary: {
    title: "Qualcosa è andato storto",
    body: "Ci dispiace — questa schermata ha riscontrato un errore imprevisto. Riprova, e se continua a succedere scrivici.",
    tryAgain: "Riprova",
  },

  comingSoonScreen: {
    title: "{{city}} — prossimamente",
    body: "Stiamo ancora preparando il tour a piedi di StoryStep per {{city}}. Torna presto — nel frattempo Londra, Parigi e Oxford sono pronte da esplorare.",
    browseAvailable: "Sfoglia i tour disponibili",
    back: "Indietro",
  },

  contact: {
    title: "Contattaci",
    subtitle: "Dicci cosa succede e ti risponderemo.",
    messagePlaceholder: "Cosa succede?",
    sendButton: "Invia messaggio",
    errorEmptyMessage: "Scrivi un messaggio prima di inviare.",
    errorBody: "Impossibile inviare — controlla la connessione e riprova.",
    successBody: "Grazie — il tuo messaggio è stato inviato. Ti risponderemo presto.",
    notConfigured: "Il modulo di contatto non è ancora configurato — scrivici direttamente via email.",
  },

  legal: {
    englishOnlyNote:
      "Questo documento legale è disponibile solo in inglese per ora, per garantirne l'accuratezza — il resto dell'app è tradotto.",
  },

  purchase: {
    completeTitle: "Acquisto completato",
    completeBody: "Ora hai accesso completo a {{name}}.",
    thisTour: "questo tour",
    subscriptionActiveTitle: "Abbonamento attivo",
    weeklyActiveBody: "Tour illimitati per i prossimi 7 giorni.",
    monthlyActiveBody: "Tour illimitati per i prossimi 30 giorni.",
  },
};

export default it;

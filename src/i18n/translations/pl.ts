import type { TranslationDict } from "./en";

const pl: TranslationDict = {
  nav: { home: "Start", map: "Mapa 3D", tours: "Wycieczki", account: "Konto", help: "Pomoc" },

  common: {
    min: "min",
    km: "km",
    stops: "przystanków",
    from: "od",
    easy: "łatwa",
    moderate: "średnia",
    hard: "trudna",
    comingSoon: "Wkrótce",
    start: "Start",
    you: "Ty",
  },

  language: {
    picker: "Język",
    title: "Wybierz język",
  },

  landing: {
    exploreButton: "Odkrywaj",
  },

  home: {
    heroSubtitle: "Twój przewodnik spacerowy z narracją AI po Londynie, Paryżu, Oksfordzie i innych miastach — załóż słuchawki i odkrywaj świat.",
    statsTours: "wycieczek",
    statsCities: "miasta",
    statsFrom: "od",
    browseTours: "Przeglądaj wycieczki",
    exploreIn3D: "Odkrywaj w 3D →",
    whoWeAreTitle: "Kim jesteśmy",
    whoWeAreBody:
      "Jesteśmy małym zespołem zafascynowanym historiami ukrytymi za zwykłymi ulicami. StoryStep powstał, żebyś mógł spacerować po mieście i naprawdę rozumieć to, na co patrzysz — przewodnik w kieszeni, a nie nos w przewodniku turystycznym.",
    whyTitle: "Dlaczego StoryStep",
    featureGpsTitle: "Narracja uruchamiana przez GPS",
    featureGpsBody: "Bez dotykania ekranu w trakcie spaceru. Twój telefon wie, kiedy dotarłeś do przystanku, i automatycznie odtwarza kolejny fragment.",
    featureNarratorTitle: "Prawdziwy narrator, nie robot",
    featureNarratorBody: "Każda wycieczka jest opowiedziana od początku do końca przez jeden naturalny brytyjski głos — bez syntezatora mowy.",
    featureScanTitle: "Zeskanuj zabytek",
    featureScanBody: "Skieruj aparat na nierozpoznany budynek, a StoryStep spróbuje go od razu zidentyfikować.",
    featureOfflineTitle: "Działa offline w trakcie spaceru",
    featureOfflineBody: "Narracja audio jest pobierana z wyprzedzeniem, więc słaby zasięg pod mostem cię nie zatrzyma.",
    scanCardTitle: "Zeskanuj zabytek",
    scanCardBody: "Skieruj aparat na budynek, a StoryStep spróbuje powiedzieć ci, co to jest.",
    featuredToursTitle: "Polecane wycieczki",
    howItWorksTitle: "Jak to działa",
    step1: "Wybierz wycieczkę w zakładce Wycieczki.",
    step2: "Dojdź do zaznaczonego punktu startowego.",
    step3: "Po prostu idź — narracja uruchamia się sama przy każdym przystanku.",
    pricingTitle: "Cennik",
    singleTourTitle: "Pojedyncza wycieczka",
    singleTourBody: "Zdobądź jedną wycieczkę na zawsze. Bez subskrypcji.",
    weeklyBadge: "NAJBARDZIEJ ELASTYCZNE",
    weeklyTitle: "Tygodniowy bez limitu",
    weeklyBody: "Wszystkie wycieczki bez limitu przez 7 dni.",
    monthlyTitle: "Miesięczny bez limitu",
    monthlyBody: "Wszystkie wycieczki bez limitu przez 30 dni.",
    ctaTitle: "Gotowy zobaczyć miasto inaczej?",
    ctaBody: "Wybierz ulicę. Załóż słuchawki. Po prostu idź.",
    ctaButton: "Przeglądaj wycieczki →",
    footerPrivacy: "Polityka prywatności",
    footerTerms: "Warunki korzystania",
    footerHelp: "Pomoc",
    footerCopy: "© 2026 StoryStep. Wszelkie prawa zastrzeżone.",
  },

  tours: {
    title: "Wycieczki",
    subtitle: "Wybierz dzielnicę. Załóż słuchawki, idź i daj się poprowadzić.",
    moreCitiesTitle: "Więcej miast",
  },

  map: {
    title: "Odkrywaj w 3D",
    subtitle: "Prawdziwe ulice, prawdziwe budynki — przeciągaj, aby przesuwać, przewijaj, aby powiększać, przeciągnij prawym przyciskiem, aby pochylić",
    loadIssueTitle: "Obrazy mapy się nie ładują",
    loadIssueBody: "Sprawdź swoje połączenie — wycieczki nadal działają bez mapy 3D.",
  },

  account: {
    title: "Konto",
    darkMode: "Tryb ciemny",
    unlimitedTours: "Nielimitowane wycieczki",
    planActive: "Plan {{plan}} aktywny — odnowi się lub wygaśnie {{date}}.",
    planWeekly: "tygodniowy",
    planMonthly: "miesięczny",
    skipPaying: "Bez płacenia za każdą wycieczkę — nielimitowany dostęp, dopóki plan jest aktywny.",
    weekly: "Tygodniowy",
    monthly: "Miesięczny",
    manageOrCancel: "Zarządzaj subskrypcją lub anuluj",
    cancelFallback: "Aby anulować, napisz do nas z adresu, którym się subskrybowałeś.",
    createAccountTitle: "Utwórz konto",
    storedLocally: "Na razie zapisywane tylko na tym urządzeniu — nie ma jeszcze serwera, więc nie synchronizuje się między telefonami.",
    namePlaceholder: "Imię",
    emailPlaceholder: "E-mail",
    passwordPlaceholder: "Hasło",
    errorFillIn: "Podaj imię, e-mail i hasło.",
    errorInvalidEmail: "To nie wygląda na prawidłowy adres e-mail.",
    createAccountButton: "Utwórz konto",
    signOut: "Wyloguj się",
    downloadedTours: "Pobrane wycieczki",
    downloadedToursBody: "Mayfair — narracja dołączona do aplikacji",
    aboutTitle: "O aplikacji",
    aboutBody: "StoryStep · wersja 1.0.0 (prototyp)",
    paymentsNotSetTitle: "Płatności nie są jeszcze skonfigurowane",
    paymentsNotSetBodySub: "Dodaj adres URL Stripe Payment Link w src/purchases/stripeConfig.ts, aby włączyć subskrypcje.",
  },

  tourPreview: {
    useScanner: "Użyj naszego skanera zabytków",
    scannerFree: "Za darmo — bez kupowania wycieczki",
    getMeToStart: "Zaprowadź mnie na start",
    buyTour: "Kup wycieczkę — {{price}}",
    startsAt: "Start: {{label}}",
    paymentsNotSetTitle: "Płatności nie są jeszcze skonfigurowane",
    paymentsNotSetBody: "Dodaj adres URL Stripe Payment Link w src/purchases/stripeConfig.ts, aby włączyć zakupy.",
    areaNotFound: "Nie znaleziono wycieczki",
  },

  getToStart: {
    title: "Dotrzyj do startu",
    permissionDenied: "Odmówiono dostępu do lokalizacji — włącz go w Ustawieniach, aby zobaczyć wskazówki na żywo.",
    findingYou: "Ustalanie Twojej lokalizacji…",
    directions: "Zostało około {{distance}} m, kierunek {{bearing}}.",
    openInMaps: "Otwórz w Mapach Google",
    startButton: "Dotarłem — rozpocznij wycieczkę",
    starting: "Uruchamianie…",
    areaNotFound: "Nie znaleziono wycieczki",
  },

  activeTour: {
    stopOf: "Przystanek {{current}} z {{total}}",
    walkingToFirst: "W drodze do pierwszego przystanku…",
    back: "Wstecz",
    skip: "Pomiń",
    scanLandmarks: "Skanuj zabytki",
    replayLink: "Odtwórz ten fragment ponownie",
    offRoute: "Wygląda na to, że zboczyłeś z trasy — wróć w kierunku {{waypoint}}, gdy tylko będziesz mógł.",
    offRouteFallback: "ostatniego przystanku",
    tourComplete: "Wycieczka zakończona",
    tourCompleteBody: "Przeszedłeś całą trasę {{area}}. Mamy nadzieję, że Ci się podobało.",
    backToAreas: "Wróć do wycieczek",
    areaNotFound: "Nie znaleziono wycieczki",
  },

  camera: {
    permissionTitle: "Wymagany dostęp do aparatu",
    permissionBody: "Skieruj telefon na zabytek, a StoryStep spróbuje go zidentyfikować. Najpierw potrzebny jest dostęp do aparatu.",
    allowCamera: "Zezwól na aparat",
    back: "Wstecz",
    close: "Zamknij",
    noKey: "Nie skonfigurowano klucza Vision API — ustaw extra.googleVisionApiKey w app.json.",
    hint: "Nie udało się nic rozpoznać — spróbuj wykadrować cały budynek i trzymać telefon nieruchomo.",
    matchPercent: "Dopasowanie {{percent}}%",
    noScriptFallback: "Rozpoznano dzięki bazie zabytków Google — nie ma jeszcze dla niego własnego opisu.",
    scanButton: "Skanuj to, na co patrzę",
    errorCouldntCapture: "Nie udało się zrobić zdjęcia.",
    errorGeneric: "Coś poszło nie tak.",
  },

  help: {
    title: "Pomoc",
    subtitle: "Najczęstsze pytania dotyczące spacerowych wycieczek.",
    faqs: [
      {
        q: "Skąd narracja wie, gdzie jestem?",
        a: "StoryStep śledzi Twoją lokalizację GPS podczas spaceru i automatycznie odtwarza kolejny fragment, gdy zbliżysz się do przystanku — nie musisz niczego dotykać.",
      },
      {
        q: "Narracja się nie uruchomiła — co robić?",
        a: "Dotknij Pomiń lub Odtwórz ponownie na ekranie aktywnej wycieczki. Wysokie budynki w centrum Londynu mogą powodować zakłócenia GPS, więc to normalne, że fragment uruchomi się trochę wcześniej lub później.",
      },
      {
        q: "Czy działa przy zablokowanym telefonie?",
        a: "Tak — dźwięk w tle nadal gra, a aktualizacje lokalizacji nadal uruchamiają fragmenty nawet przy wyłączonym ekranie, o ile udzieliłeś dostępu do lokalizacji \"Zawsze\".",
      },
      {
        q: "Czy potrzebuję zasięgu przez cały spacer?",
        a: "Nie. Dźwięk narracji jest pobierany z wyprzedzeniem, więc działa nawet przy słabym połączeniu — podczas spaceru potrzebny jest tylko GPS.",
      },
      {
        q: "Dlaczego \"Zeskanuj zabytek\" wymaga uprawnień?",
        a: "Potrzebny jest dostęp do aparatu, aby zobaczyć, na co jest skierowany, i spróbować to rozpoznać. Nic nie jest zapisywane — zdjęcie służy tylko do tego jednego wyszukania.",
      },
    ],
    stillStuck: "Nadal masz problem?",
    stillStuckBody: "Wyślij nam wiadomość, a odpowiemy.",
    contactUs: "Skontaktuj się z nami",
    privacyPolicy: "Polityka prywatności",
  },

  errorBoundary: {
    title: "Coś poszło nie tak",
    body: "Przepraszamy — na tym ekranie wystąpił nieoczekiwany błąd. Spróbuj ponownie, a jeśli problem się powtarza, daj nam znać.",
    tryAgain: "Spróbuj ponownie",
  },

  comingSoonScreen: {
    title: "{{city}} — wkrótce",
    body: "Wciąż przygotowujemy pieszą wycieczkę StoryStep po mieście {{city}}. Zajrzyj wkrótce ponownie — tymczasem Londyn, Paryż i Oksford czekają na odkrycie.",
    browseAvailable: "Przeglądaj dostępne wycieczki",
    back: "Wstecz",
  },

  contact: {
    title: "Skontaktuj się z nami",
    subtitle: "Napisz, co się dzieje, a odpowiemy.",
    messagePlaceholder: "Co się dzieje?",
    sendButton: "Wyślij wiadomość",
    errorEmptyMessage: "Napisz wiadomość przed wysłaniem.",
    errorBody: "Nie udało się wysłać — sprawdź połączenie i spróbuj ponownie.",
    successBody: "Dzięki — Twoja wiadomość została wysłana. Odezwiemy się wkrótce.",
    notConfigured: "Formularz kontaktowy nie jest jeszcze skonfigurowany — napisz do nas bezpośrednio.",
  },

  legal: {
    englishOnlyNote:
      "Ten dokument prawny jest na razie dostępny tylko w języku angielskim, aby zachować dokładność — reszta aplikacji jest przetłumaczona.",
  },

  purchase: {
    completeTitle: "Zakup zakończony",
    completeBody: "Masz teraz pełny dostęp do {{name}}.",
    thisTour: "tej wycieczki",
    subscriptionActiveTitle: "Subskrypcja aktywna",
    weeklyActiveBody: "Nielimitowane wycieczki przez najbliższe 7 dni.",
    monthlyActiveBody: "Nielimitowane wycieczki przez najbliższe 30 dni.",
  },
};

export default pl;

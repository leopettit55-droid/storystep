import type { TranslationDict } from "./en";

const es: TranslationDict = {
  nav: { home: "Inicio", map: "Mapa 3D", tours: "Recorridos", account: "Cuenta", help: "Ayuda" },

  common: {
    free: "Gratis",
    min: "min",
    km: "km",
    stops: "paradas",
    from: "desde",
    easy: "fácil",
    moderate: "moderado",
    hard: "difícil",
    comingSoon: "Próximamente",
    start: "Inicio",
    you: "Tú",
  },

  language: {
    picker: "Idioma",
    title: "Elige un idioma",
  },

  landing: {
    exploreButton: "Explorar",
  },

  home: {
    heroSubtitle: "Tu guía de recorridos a pie narrada por IA en Londres, París, Oxford y más — ponte los auriculares y explora el mundo.",
    statsTours: "recorridos",
    statsCities: "ciudades",
    statsFrom: "desde",
    browseTours: "Ver recorridos",
    exploreIn3D: "Explorar en 3D →",
    whoWeAreTitle: "Quiénes somos",
    whoWeAreBody:
      "Somos un equipo pequeño obsesionado con las historias que se esconden detrás de las calles comunes. StoryStep existe para que puedas caminar por una ciudad y entender de verdad lo que estás viendo — la guía en tu bolsillo, no tu cara pegada a una guía turística.",
    whyTitle: "Por qué StoryStep",
    featureGpsTitle: "Narración activada por GPS",
    featureGpsBody: "Sin necesidad de tocar nada mientras caminas. Tu teléfono sabe cuándo llegas a una parada y reproduce el siguiente segmento automáticamente.",
    featureNarratorTitle: "Un solo narrador",
    featureNarratorBody: "Cada recorrido lo narra de principio a fin la misma voz británica de sonido natural.",
    featureScanTitle: "Escanea un monumento",
    featureScanBody: "Apunta tu cámara a un edificio que no reconozcas y StoryStep intentará identificarlo al instante.",
    featureOfflineTitle: "Consume pocos datos",
    featureOfflineBody: "La narración de cada parada ocupa alrededor de 1 MB y se carga al llegar, así que basta con datos móviles normales.",
    scanCardTitle: "Escanea un monumento",
    scanCardBody: "Apunta tu cámara a un edificio y StoryStep intentará decirte qué es.",
    featuredToursTitle: "Recorridos destacados",
    howItWorksTitle: "Cómo funciona",
    step1: "Elige un recorrido en la pestaña Recorridos.",
    step2: "Camina hasta el punto de partida marcado.",
    step3: "Simplemente camina — la narración se activa sola al pasar cada parada.",
    pricingTitle: "Precios",
    singleTourTitle: "Recorrido individual",
    singleTourBody: "Consigue un recorrido para siempre. Sin suscripción.",
    weeklyBadge: "MÁS FLEXIBLE",
    weeklyTitle: "Semanal ilimitado",
    weeklyBody: "Todos los recorridos, ilimitados, durante 7 días.",
    monthlyTitle: "Mensual ilimitado",
    monthlyBody: "Todos los recorridos, ilimitados, durante 30 días.",
    ctaTitle: "¿Listo para verlo de otra manera?",
    ctaBody: "Elige una calle. Ponte los auriculares. Simplemente camina.",
    ctaButton: "Ver recorridos →",
    footerPrivacy: "Política de privacidad",
    footerTerms: "Términos de servicio",
    footerHelp: "Ayuda",
    footerCopy: "© 2026 StoryStep. Todos los derechos reservados.",
  },

  tours: {
    title: "Recorridos",
    subtitle: "Elige un barrio. Ponte los auriculares, camina y deja que te guíe.",
    moreCitiesTitle: "Más ciudades",
  },

  map: {
    title: "Explorar en 3D",
    subtitle: "Calles y edificios reales en 3D. Arrastra para explorar y luego elige un recorrido.",
    loadIssueTitle: "Las imágenes del mapa no cargan",
    loadIssueBody: "Comprueba tu conexión — los recorridos siguen funcionando sin el mapa 3D.",
  },

  account: {
    title: "Cuenta",
    darkMode: "Modo oscuro",
    unlimitedTours: "Recorridos ilimitados",
    planActive: "Plan {{plan}} activo — se renueva o vence el {{date}}.",
    planWeekly: "Semanal",
    planMonthly: "Mensual",
    skipPaying: "Olvídate de pagar por cada recorrido — acceso ilimitado mientras tu plan esté activo.",
    weekly: "Semanal",
    monthly: "Mensual",
    manageOrCancel: "Gestionar o cancelar suscripción",
    cancelFallback: "Para cancelar, escríbenos desde el correo con el que te suscribiste.",
    createAccountTitle: "Crear una cuenta",
    storedLocally: "Opcional. Se guarda solo en este teléfono, así que no se sincroniza entre dispositivos.",
    namePlaceholder: "Nombre",
    emailPlaceholder: "Correo electrónico",
    passwordPlaceholder: "Contraseña",
    errorFillIn: "Completa tu nombre, correo electrónico y una contraseña.",
    errorInvalidEmail: "Esa dirección de correo no parece válida.",
    createAccountButton: "Crear cuenta",
    signOut: "Cerrar sesión",
    downloadedTours: "Recorridos descargados",
    downloadedToursBody: "Mayfair — narración incluida con la app",
    aboutTitle: "Acerca de",
    aboutBody: "StoryStep · versión 1.0.0",
    paymentsNotSetTitle: "Los pagos aún no están configurados",
    paymentsNotSetBodySub: "Añade tu URL de Stripe Payment Link en src/purchases/stripeConfig.ts para activar las suscripciones.",
  },

  tourPreview: {
    useScanner: "Usa nuestro escáner de monumentos",
    scannerFree: "Apunta la cámara a un edificio para escuchar su historia",
    getMeToStart: "Llévame al punto de partida",
    buyTour: "Comprar recorrido — {{price}}",
    startsAt: "Empieza en {{label}}",
    paymentsNotSetTitle: "Los pagos aún no están configurados",
    paymentsNotSetBody: "Añade tu URL de Stripe Payment Link en src/purchases/stripeConfig.ts para activar las compras.",
    areaNotFound: "Recorrido no encontrado",
  },

  getToStart: {
    title: "Llegar al punto de partida",
    permissionDenied: "Se denegó el permiso de ubicación — actívalo en Ajustes para ver indicaciones en vivo.",
    findingYou: "Localizándote…",
    directions: "Quedan unos {{distance}} m, dirección {{bearing}}.",
    openInMaps: "Abrir en Google Maps",
    startButton: "He llegado — empezar el recorrido",
    starting: "Empezando…",
    areaNotFound: "Recorrido no encontrado",
  },

  activeTour: {
    stopOf: "Parada {{current}} de {{total}}",
    walkingToFirst: "Caminando hacia la primera parada…",
    back: "Atrás",
    skip: "Saltar",
    scanLandmarks: "Escanear monumentos",
    replayLink: "Repetir este segmento",
    offRoute: "Parece que te has desviado de la ruta — vuelve hacia {{waypoint}} cuando puedas.",
    offRouteFallback: "la última parada",
    tourComplete: "Recorrido completado",
    tourCompleteBody: "Has recorrido todo {{area}}. Esperamos que lo hayas disfrutado.",
    backToAreas: "Volver a los recorridos",
    areaNotFound: "Recorrido no encontrado",
  },

  camera: {
    permissionTitle: "Se necesita acceso a la cámara",
    permissionBody: "Apunta tu teléfono a un monumento y StoryStep intentará identificarlo. Primero necesita acceso a la cámara.",
    allowCamera: "Permitir cámara",
    back: "Atrás",
    close: "Cerrar",
    noKey: "No hay clave de la API de Vision configurada — define extra.googleVisionApiKey en app.json.",
    hint: "No se pudo reconocer nada ahí — intenta centrar todo el edificio y mantener el pulso firme.",
    matchPercent: "{{percent}}% de coincidencia",
    noScriptFallback: "Reconocido por la base de datos de monumentos de Google — todavía no hay contenido local para este.",
    scanButton: "Escanear lo que estoy mirando",
    errorCouldntCapture: "No se pudo tomar la foto.",
    errorGeneric: "Algo salió mal.",
  },

  help: {
    title: "Ayuda",
    subtitle: "Preguntas frecuentes sobre cómo hacer un recorrido a pie.",
    faqs: [
      {
        q: "¿Cómo sabe la narración dónde estoy?",
        a: "StoryStep vigila tu ubicación GPS mientras caminas y reproduce automáticamente el siguiente segmento al acercarte a un punto de la ruta — no hace falta tocar nada.",
      },
      {
        q: "La narración no se activó — ¿qué hago?",
        a: "Toca Saltar o Repetir en la pantalla del recorrido activo. Los edificios altos del centro de Londres pueden causar interferencias de GPS, así que es normal que un segmento se active un poco antes o después.",
      },
      {
        q: "¿Funciona con el teléfono bloqueado?",
        a: "Mantén la pantalla encendida mientras caminas. Los navegadores pausan la ubicación cuando el teléfono está bloqueado, así que la siguiente parada no empezará hasta que lo desbloquees.",
      },
      {
        q: "¿Necesito señal durante todo el paseo?",
        a: "Sí, necesitarás datos móviles. La narración de cada parada se carga al llegar a ella (alrededor de 1 MB por parada), así que con poca cobertura una parada puede tardar unos segundos en empezar.",
      },
      {
        q: "¿Para qué necesita permiso \"Escanear un monumento\"?",
        a: "Necesita acceso a la cámara para ver lo que estás enfocando e intentar identificarlo. No se guarda nada — la foto solo se usa para esa consulta.",
      },
    ],
    stillStuck: "¿Sigues con dudas?",
    stillStuckBody: "Envíanos un mensaje y te responderemos.",
    contactUs: "Contáctanos",
    privacyPolicy: "Política de privacidad",
  },

  errorBoundary: {
    title: "Algo salió mal",
    body: "Lo sentimos — esta pantalla tuvo un error inesperado. Inténtalo de nuevo, y si sigue ocurriendo, avísanos.",
    tryAgain: "Intentar de nuevo",
  },

  comingSoonScreen: {
    title: "{{city}} — próximamente",
    body: "Todavía estamos preparando el recorrido a pie de StoryStep para {{city}}. Vuelve pronto — mientras tanto, Londres, París y Oxford ya están listos para explorar.",
    browseAvailable: "Ver recorridos disponibles",
    back: "Atrás",
  },

  contact: {
    title: "Contáctanos",
    subtitle: "Cuéntanos qué pasa y te responderemos.",
    messagePlaceholder: "¿Qué está pasando?",
    sendButton: "Enviar mensaje",
    errorEmptyMessage: "Escribe un mensaje antes de enviarlo.",
    errorBody: "No se pudo enviar — revisa tu conexión e inténtalo de nuevo.",
    successBody: "Gracias — tu mensaje ha sido enviado. Te responderemos pronto.",
    notConfigured: "El formulario de contacto aún no está configurado — escríbenos directamente.",
  },

  legal: {
    englishOnlyNote:
      "Por ahora, este documento legal solo está disponible en inglés para garantizar su precisión — el resto de la app está traducido.",
  },

  purchase: {
    completeTitle: "Compra completada",
    completeBody: "Ahora tienes acceso completo a {{name}}.",
    thisTour: "este recorrido",
    subscriptionActiveTitle: "Suscripción activa",
    weeklyActiveBody: "Recorridos ilimitados durante los próximos 7 días.",
    monthlyActiveBody: "Recorridos ilimitados durante los próximos 30 días.",
  },
};

export default es;

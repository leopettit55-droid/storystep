import type { TranslationDict } from "./en";

const pt: TranslationDict = {
  nav: { home: "Início", map: "Mapa 3D", tours: "Passeios", account: "Conta", help: "Ajuda" },

  common: {
    free: "Grátis",
    min: "min",
    km: "km",
    stops: "paragens",
    from: "desde",
    easy: "fácil",
    moderate: "moderado",
    hard: "difícil",
    comingSoon: "Brevemente",
    start: "Início",
    you: "Você",
  },

  language: {
    picker: "Idioma",
    title: "Escolher um idioma",
  },

  landing: {
    exploreButton: "Explorar",
  },

  home: {
    heroSubtitle: "O seu guia de passeios a pé narrado por IA em Londres, Paris, Oxford e muito mais — auscultadores postos, explore o mundo.",
    statsTours: "passeios",
    statsCities: "cidades",
    statsFrom: "desde",
    browseTours: "Ver passeios",
    exploreIn3D: "Explorar em 3D →",
    whoWeAreTitle: "Quem somos",
    whoWeAreBody:
      "Somos uma pequena equipa obcecada pelas histórias escondidas atrás de ruas comuns. O StoryStep existe para que possa caminhar por uma cidade e compreender de verdade o que está a ver — o guia no seu bolso, não a cara enfiada num guia turístico.",
    whyTitle: "Porquê o StoryStep",
    featureGpsTitle: "Narração ativada por GPS",
    featureGpsBody: "Sem tocar em nada enquanto caminha. O telemóvel sabe quando chega a uma paragem e reproduz automaticamente o segmento seguinte.",
    featureNarratorTitle: "Um narrador de verdade, não um robô",
    featureNarratorBody: "Cada passeio é narrado do início ao fim por uma única voz britânica natural — não é voz sintetizada.",
    featureScanTitle: "Digitalizar um monumento",
    featureScanBody: "Aponte a câmara a um edifício que não reconhece e o StoryStep tentará identificá-lo na hora.",
    featureOfflineTitle: "Funciona offline durante o passeio",
    featureOfflineBody: "O áudio da narração é descarregado antecipadamente, para que uma ligação fraca debaixo de uma ponte não o deixe sem som.",
    scanCardTitle: "Digitalizar um monumento",
    scanCardBody: "Aponte a câmara a um edifício e o StoryStep tentará dizer-lhe o que é.",
    featuredToursTitle: "Passeios em destaque",
    howItWorksTitle: "Como funciona",
    step1: "Escolha um passeio no separador Passeios.",
    step2: "Caminhe até ao ponto de partida indicado.",
    step3: "Basta caminhar — a narração ativa-se sozinha em cada paragem.",
    pricingTitle: "Preços",
    singleTourTitle: "Passeio único",
    singleTourBody: "Tenha um passeio para sempre. Sem subscrição.",
    weeklyBadge: "MAIS FLEXÍVEL",
    weeklyTitle: "Semanal ilimitado",
    weeklyBody: "Todos os passeios, ilimitados, durante 7 dias.",
    monthlyTitle: "Mensal ilimitado",
    monthlyBody: "Todos os passeios, ilimitados, durante 30 dias.",
    ctaTitle: "Pronto para ver a cidade de outra forma?",
    ctaBody: "Escolha uma rua. Ponha os auscultadores. Basta caminhar.",
    ctaButton: "Ver passeios →",
    footerPrivacy: "Política de Privacidade",
    footerTerms: "Termos de Serviço",
    footerHelp: "Ajuda",
    footerCopy: "© 2026 StoryStep. Todos os direitos reservados.",
  },

  tours: {
    title: "Passeios",
    subtitle: "Escolha um bairro. Ponha os auscultadores, caminhe e deixe-se guiar.",
    moreCitiesTitle: "Mais cidades",
  },

  map: {
    title: "Explorar em 3D",
    subtitle: "Ruas e edifícios reais — arraste para mover, deslize para ampliar, clique direito e arraste para inclinar",
    loadIssueTitle: "As imagens do mapa não estão a carregar",
    loadIssueBody: "Verifique a sua ligação — os passeios continuam a funcionar sem o mapa 3D.",
  },

  account: {
    title: "Conta",
    darkMode: "Modo escuro",
    unlimitedTours: "Passeios ilimitados",
    planActive: "Plano {{plan}} ativo — renova ou expira a {{date}}.",
    planWeekly: "semanal",
    planMonthly: "mensal",
    skipPaying: "Sem pagar por passeio — acesso ilimitado enquanto o plano estiver ativo.",
    weekly: "Semanal",
    monthly: "Mensal",
    manageOrCancel: "Gerir ou cancelar subscrição",
    cancelFallback: "Para cancelar, envie-nos um email a partir do endereço com que subscreveu.",
    createAccountTitle: "Criar conta",
    storedLocally: "Por agora só é guardado neste dispositivo — ainda não há servidor, por isso não sincroniza entre telemóveis.",
    namePlaceholder: "Nome",
    emailPlaceholder: "Email",
    passwordPlaceholder: "Palavra-passe",
    errorFillIn: "Preencha o nome, o email e uma palavra-passe.",
    errorInvalidEmail: "Este endereço de email não parece válido.",
    createAccountButton: "Criar conta",
    signOut: "Terminar sessão",
    downloadedTours: "Passeios transferidos",
    downloadedToursBody: "Mayfair — narração incluída na aplicação",
    aboutTitle: "Sobre",
    aboutBody: "StoryStep · versão 1.0.0 (protótipo)",
    paymentsNotSetTitle: "Pagamentos ainda não configurados",
    paymentsNotSetBodySub: "Adicione o URL do seu Stripe Payment Link em src/purchases/stripeConfig.ts para ativar as subscrições.",
  },

  tourPreview: {
    useScanner: "Usar o nosso scanner de marcos",
    scannerFree: "Grátis — sem precisar comprar o tour",
    getMeToStart: "Leve-me à partida",
    buyTour: "Comprar passeio — {{price}}",
    startsAt: "Início em {{label}}",
    paymentsNotSetTitle: "Pagamentos ainda não configurados",
    paymentsNotSetBody: "Adicione o URL do seu Stripe Payment Link em src/purchases/stripeConfig.ts para ativar as compras.",
    areaNotFound: "Passeio não encontrado",
  },

  getToStart: {
    title: "Ir para a partida",
    permissionDenied: "A permissão de localização foi negada — ative-a nas Definições para ver indicações em tempo real.",
    findingYou: "A localizar-te…",
    directions: "Faltam cerca de {{distance}} m, direção {{bearing}}.",
    openInMaps: "Abrir no Google Maps",
    startButton: "Cheguei — começar o passeio",
    starting: "A iniciar…",
    areaNotFound: "Passeio não encontrado",
  },

  activeTour: {
    stopOf: "Paragem {{current}} de {{total}}",
    walkingToFirst: "A caminho da primeira paragem…",
    back: "Voltar",
    skip: "Saltar",
    scanLandmarks: "Digitalizar monumentos",
    replayLink: "Repetir este segmento",
    offRoute: "Parece que se desviou do percurso — regresse em direção a {{waypoint}} assim que puder.",
    offRouteFallback: "à última paragem",
    tourComplete: "Passeio concluído",
    tourCompleteBody: "Percorreu todo o {{area}}. Esperamos que tenha gostado.",
    backToAreas: "Voltar aos passeios",
    areaNotFound: "Passeio não encontrado",
  },

  camera: {
    permissionTitle: "Acesso à câmara necessário",
    permissionBody: "Aponte o telemóvel a um monumento e o StoryStep tentará identificá-lo. Primeiro é preciso acesso à câmara.",
    allowCamera: "Permitir câmara",
    back: "Voltar",
    close: "Fechar",
    noKey: "Nenhuma chave da API Vision configurada — defina extra.googleVisionApiKey em app.json.",
    hint: "Não foi possível reconhecer nada aí — tente centrar todo o edifício e manter o telemóvel firme.",
    matchPercent: "{{percent}}% de correspondência",
    noScriptFallback: "Reconhecido através da base de dados de monumentos da Google — ainda não há texto local para este.",
    scanButton: "Digitalizar o que estou a ver",
    errorCouldntCapture: "Não foi possível tirar a fotografia.",
    errorGeneric: "Algo correu mal.",
  },

  help: {
    title: "Ajuda",
    subtitle: "Perguntas frequentes sobre como fazer um passeio a pé.",
    faqs: [
      {
        q: "Como é que a narração sabe onde estou?",
        a: "O StoryStep segue a sua localização GPS enquanto caminha e reproduz automaticamente o segmento seguinte quando se aproxima de uma paragem — sem ser preciso tocar em nada.",
      },
      {
        q: "A narração não foi ativada — o que faço?",
        a: "Toque em Saltar ou Repetir no ecrã do passeio ativo. Edifícios altos no centro de Londres podem causar interferência no GPS, por isso é normal um segmento começar um pouco antes ou depois.",
      },
      {
        q: "Funciona com o telemóvel bloqueado?",
        a: "Mantenha o ecrã ligado enquanto caminha. Os navegadores suspendem a localização quando o telemóvel está bloqueado, por isso a paragem seguinte só começa quando o desbloquear.",
      },
      {
        q: "Preciso de rede durante todo o passeio?",
        a: "Sim, vai precisar de dados móveis. A narração de cada paragem é carregada quando lá chega (cerca de 1 MB por paragem), por isso com rede fraca uma paragem pode começar alguns segundos mais tarde.",
      },
      {
        q: "Para que precisa de permissão \"Digitalizar um monumento\"?",
        a: "Precisa de acesso à câmara para ver o que está a apontar e tentar identificá-lo. Nada é guardado — a fotografia só é usada para essa pesquisa.",
      },
    ],
    stillStuck: "Ainda com dúvidas?",
    stillStuckBody: "Envie-nos uma mensagem e responderemos.",
    contactUs: "Contactar",
    privacyPolicy: "Política de Privacidade",
  },

  errorBoundary: {
    title: "Algo correu mal",
    body: "Desculpe — este ecrã teve um erro inesperado. Tente novamente e, se continuar a acontecer, avise-nos.",
    tryAgain: "Tentar novamente",
  },

  comingSoonScreen: {
    title: "{{city}} — brevemente",
    body: "Ainda estamos a preparar o passeio a pé do StoryStep para {{city}}. Volte em breve — entretanto, Londres, Paris e Oxford já estão prontas a explorar.",
    browseAvailable: "Ver passeios disponíveis",
    back: "Voltar",
  },

  contact: {
    title: "Fale connosco",
    subtitle: "Diga-nos o que se passa e entraremos em contacto.",
    messagePlaceholder: "O que se passa?",
    sendButton: "Enviar mensagem",
    errorEmptyMessage: "Escreva uma mensagem antes de enviar.",
    errorBody: "Não foi possível enviar — verifique a sua ligação e tente novamente.",
    successBody: "Obrigado — a sua mensagem foi enviada. Entraremos em contacto em breve.",
    notConfigured: "O formulário de contacto ainda não está configurado — envie-nos um email diretamente.",
  },

  legal: {
    englishOnlyNote:
      "Este documento legal está disponível apenas em inglês por agora, para garantir rigor — o resto da aplicação está traduzido.",
  },

  purchase: {
    completeTitle: "Compra concluída",
    completeBody: "Agora tem acesso total a {{name}}.",
    thisTour: "este passeio",
    subscriptionActiveTitle: "Subscrição ativa",
    weeklyActiveBody: "Passeios ilimitados durante os próximos 7 dias.",
    monthlyActiveBody: "Passeios ilimitados durante os próximos 30 dias.",
  },
};

export default pt;

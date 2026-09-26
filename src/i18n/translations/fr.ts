import type { TranslationDict } from "./en";

const fr: TranslationDict = {
  nav: { home: "Accueil", map: "Carte 3D", tours: "Parcours", account: "Compte", help: "Aide" },

  common: {
    free: "Gratuit",
    min: "min",
    km: "km",
    stops: "étapes",
    from: "dès",
    easy: "facile",
    moderate: "modéré",
    hard: "difficile",
    comingSoon: "Bientôt disponible",
    start: "Départ",
    you: "Vous",
  },

  language: {
    picker: "Langue",
    title: "Choisir une langue",
  },

  landing: {
    exploreButton: "Explorer",
  },

  home: {
    heroSubtitle: "Votre guide de balades narré par IA à Londres, Paris, Oxford et plus encore — écouteurs branchés, partez explorer le monde.",
    statsTours: "parcours",
    statsCities: "villes",
    statsFrom: "dès",
    browseTours: "Voir les parcours",
    exploreIn3D: "Explorer en 3D →",
    whoWeAreTitle: "Qui sommes-nous",
    whoWeAreBody:
      "Nous sommes une petite équipe fascinée par les histoires cachées derrière les rues ordinaires. StoryStep existe pour que vous puissiez traverser une ville et vraiment comprendre ce que vous regardez — le guide dans votre poche, pas le nez dans un guide papier.",
    whyTitle: "Pourquoi StoryStep",
    featureGpsTitle: "Narration déclenchée par GPS",
    featureGpsBody: "Aucun geste à faire en marchant. Votre téléphone sait quand vous atteignez une étape et lance le segment suivant automatiquement.",
    featureNarratorTitle: "Un vrai narrateur, pas un robot",
    featureNarratorBody: "Chaque parcours est raconté d'un bout à l'autre par une seule voix britannique naturelle — pas de synthèse vocale.",
    featureScanTitle: "Scanner un monument",
    featureScanBody: "Pointez votre appareil photo vers un bâtiment que vous ne reconnaissez pas et StoryStep tentera de l'identifier sur-le-champ.",
    featureOfflineTitle: "Fonctionne hors ligne pendant la marche",
    featureOfflineBody: "L'audio de narration est téléchargé à l'avance, donc une connexion capricieuse sous un pont ne vous coupera pas la parole.",
    scanCardTitle: "Scanner un monument",
    scanCardBody: "Pointez votre appareil photo vers un bâtiment et StoryStep tentera de vous dire ce que c'est.",
    featuredToursTitle: "Parcours à la une",
    howItWorksTitle: "Comment ça marche",
    step1: "Choisissez un parcours dans l'onglet Parcours.",
    step2: "Marchez jusqu'au point de départ indiqué.",
    step3: "Marchez, tout simplement — la narration se déclenche seule à chaque étape.",
    pricingTitle: "Tarifs",
    singleTourTitle: "Parcours à l'unité",
    singleTourBody: "Un parcours à vous pour toujours. Sans abonnement.",
    weeklyBadge: "LE PLUS FLEXIBLE",
    weeklyTitle: "Illimité hebdomadaire",
    weeklyBody: "Tous les parcours, en illimité, pendant 7 jours.",
    monthlyTitle: "Illimité mensuel",
    monthlyBody: "Tous les parcours, en illimité, pendant 30 jours.",
    ctaTitle: "Prêt à voir la ville autrement ?",
    ctaBody: "Choisissez une rue. Mettez vos écouteurs. Marchez.",
    ctaButton: "Voir les parcours →",
    footerPrivacy: "Politique de confidentialité",
    footerTerms: "Conditions d'utilisation",
    footerHelp: "Aide",
    footerCopy: "© 2026 StoryStep. Tous droits réservés.",
  },

  tours: {
    title: "Parcours",
    subtitle: "Choisissez un quartier. Mettez vos écouteurs, marchez, et laissez-vous guider.",
    moreCitiesTitle: "Plus de villes",
  },

  map: {
    title: "Explorer en 3D",
    subtitle: "Vraies rues, vrais bâtiments — glissez pour déplacer, molette pour zoomer, clic droit + glisser pour incliner",
    loadIssueTitle: "Les images de la carte ne chargent pas",
    loadIssueBody: "Vérifiez votre connexion — les parcours fonctionnent quand même sans la carte 3D.",
  },

  account: {
    title: "Compte",
    darkMode: "Mode sombre",
    unlimitedTours: "Parcours illimités",
    planActive: "Forfait {{plan}} actif — se renouvelle ou expire le {{date}}.",
    planWeekly: "hebdomadaire",
    planMonthly: "mensuel",
    skipPaying: "Ne payez plus parcours par parcours — accès illimité tant que votre forfait est actif.",
    weekly: "Hebdomadaire",
    monthly: "Mensuel",
    manageOrCancel: "Gérer ou résilier l'abonnement",
    cancelFallback: "Pour résilier, écrivez-nous depuis l'adresse utilisée lors de l'abonnement.",
    createAccountTitle: "Créer un compte",
    storedLocally: "Pour l'instant, tout reste sur cet appareil — il n'y a pas encore de serveur, donc rien ne se synchronise entre téléphones.",
    namePlaceholder: "Nom",
    emailPlaceholder: "E-mail",
    passwordPlaceholder: "Mot de passe",
    errorFillIn: "Renseignez votre nom, votre e-mail et un mot de passe.",
    errorInvalidEmail: "Cette adresse e-mail ne semble pas valide.",
    createAccountButton: "Créer le compte",
    signOut: "Se déconnecter",
    downloadedTours: "Parcours téléchargés",
    downloadedToursBody: "Mayfair — narration intégrée à l'application",
    aboutTitle: "À propos",
    aboutBody: "StoryStep · version 1.0.0 (prototype)",
    paymentsNotSetTitle: "Les paiements ne sont pas encore configurés",
    paymentsNotSetBodySub: "Ajoutez votre lien de paiement Stripe dans src/purchases/stripeConfig.ts pour activer les abonnements.",
  },

  tourPreview: {
    useScanner: "Utiliser notre scanner de monuments",
    scannerFree: "Gratuit — aucun achat de visite nécessaire",
    getMeToStart: "Emmenez-moi au départ",
    buyTour: "Acheter le parcours — {{price}}",
    startsAt: "Départ : {{label}}",
    paymentsNotSetTitle: "Les paiements ne sont pas encore configurés",
    paymentsNotSetBody: "Ajoutez votre lien de paiement Stripe dans src/purchases/stripeConfig.ts pour activer les achats.",
    areaNotFound: "Parcours introuvable",
  },

  getToStart: {
    title: "Rejoindre le départ",
    permissionDenied: "L'autorisation de localisation a été refusée — activez-la dans les réglages pour voir l'itinéraire en direct.",
    findingYou: "Localisation en cours…",
    directions: "Encore environ {{distance}} m, direction {{bearing}}.",
    openInMaps: "Ouvrir dans Google Maps",
    startButton: "Je suis arrivé — démarrer le parcours",
    starting: "Démarrage…",
    areaNotFound: "Parcours introuvable",
  },

  activeTour: {
    stopOf: "Étape {{current}} sur {{total}}",
    walkingToFirst: "En chemin vers la première étape…",
    back: "Précédent",
    skip: "Suivant",
    scanLandmarks: "Scanner des monuments",
    replayLink: "Réécouter ce segment",
    offRoute: "On dirait que vous vous êtes écarté du parcours — revenez vers {{waypoint}} dès que possible.",
    offRouteFallback: "la dernière étape",
    tourComplete: "Parcours terminé",
    tourCompleteBody: "Vous avez parcouru tout {{area}}. En espérant que ça vous a plu.",
    backToAreas: "Retour aux parcours",
    areaNotFound: "Parcours introuvable",
  },

  camera: {
    permissionTitle: "Accès à l'appareil photo requis",
    permissionBody: "Pointez votre téléphone vers un monument et StoryStep tentera de l'identifier. L'accès à l'appareil photo est nécessaire au préalable.",
    allowCamera: "Autoriser l'appareil photo",
    back: "Retour",
    close: "Fermer",
    noKey: "Aucune clé API Vision configurée — définissez extra.googleVisionApiKey dans app.json.",
    hint: "Impossible de reconnaître quoi que ce soit ici — essayez de bien centrer le bâtiment et de rester immobile.",
    matchPercent: "{{percent}} % de correspondance",
    noScriptFallback: "Reconnu grâce à la base de données de monuments de Google — pas encore de contenu local pour celui-ci.",
    scanButton: "Scanner ce que je regarde",
    errorCouldntCapture: "Impossible de prendre la photo.",
    errorGeneric: "Une erreur s'est produite.",
  },

  help: {
    title: "Aide",
    subtitle: "Questions fréquentes sur les parcours à pied.",
    faqs: [
      {
        q: "Comment la narration sait-elle où je suis ?",
        a: "StoryStep suit votre position GPS pendant que vous marchez et lance automatiquement le segment suivant lorsque vous approchez d'une étape — aucun geste requis.",
      },
      {
        q: "La narration ne s'est pas déclenchée, que faire ?",
        a: "Appuyez sur Suivant ou Réécouter sur l'écran du parcours en cours. Les immeubles élevés du centre de Londres peuvent perturber le GPS, il est donc normal qu'un segment se déclenche un peu tôt ou tard.",
      },
      {
        q: "Est-ce que ça marche téléphone verrouillé ?",
        a: "Gardez l'écran allumé pendant la marche. Les navigateurs suspendent la localisation lorsque le téléphone est verrouillé, donc l'étape suivante ne démarrera qu'après le déverrouillage.",
      },
      {
        q: "Ai-je besoin de réseau pendant toute la marche ?",
        a: "Oui, il vous faut des données mobiles. La narration de chaque étape se charge quand vous y arrivez (environ 1 Mo par étape) : avec un signal faible, une étape peut démarrer avec quelques secondes de retard.",
      },
      {
        q: "Pourquoi « Scanner un monument » demande-t-il une autorisation ?",
        a: "Il faut l'accès à l'appareil photo pour observer ce que vous visez et tenter de l'identifier. Rien n'est conservé — la photo ne sert qu'à cette seule recherche.",
      },
    ],
    stillStuck: "Toujours bloqué ?",
    stillStuckBody: "Envoyez-nous un message, nous vous répondrons.",
    contactUs: "Nous contacter",
    privacyPolicy: "Politique de confidentialité",
  },

  errorBoundary: {
    title: "Une erreur est survenue",
    body: "Désolé — cet écran a rencontré une erreur inattendue. Réessayez, et si le problème persiste, contactez-nous.",
    tryAgain: "Réessayer",
  },

  comingSoonScreen: {
    title: "{{city}} — bientôt disponible",
    body: "Le parcours à pied StoryStep pour {{city}} est encore en préparation. Revenez bientôt — en attendant, Londres, Paris et Oxford sont prêts à explorer.",
    browseAvailable: "Voir les parcours disponibles",
    back: "Retour",
  },

  contact: {
    title: "Contactez-nous",
    subtitle: "Dites-nous ce qui ne va pas, nous vous répondrons.",
    messagePlaceholder: "Que se passe-t-il ?",
    sendButton: "Envoyer le message",
    errorEmptyMessage: "Veuillez écrire un message avant d'envoyer.",
    errorBody: "Impossible d'envoyer — vérifiez votre connexion et réessayez.",
    successBody: "Merci — votre message a été envoyé. Nous vous répondrons bientôt.",
    notConfigured: "Le formulaire de contact n'est pas encore configuré — écrivez-nous directement.",
  },

  legal: {
    englishOnlyNote:
      "Ce document juridique n'est disponible qu'en anglais pour l'instant, par souci d'exactitude — le reste de l'application est traduit.",
  },

  purchase: {
    completeTitle: "Achat effectué",
    completeBody: "Vous avez maintenant un accès complet à {{name}}.",
    thisTour: "ce parcours",
    subscriptionActiveTitle: "Abonnement actif",
    weeklyActiveBody: "Parcours illimités pendant les 7 prochains jours.",
    monthlyActiveBody: "Parcours illimités pendant les 30 prochains jours.",
  },
};

export default fr;

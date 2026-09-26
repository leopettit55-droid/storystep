import type { TranslationDict } from "./en";

const ar: TranslationDict = {
  nav: { home: "الرئيسية", map: "خريطة ثلاثية الأبعاد", tours: "الجولات", account: "الحساب", help: "المساعدة" },

  common: {
    free: "مجاني",
    min: "دقيقة",
    km: "كم",
    stops: "محطات",
    from: "من",
    easy: "سهل",
    moderate: "متوسط",
    hard: "صعب",
    comingSoon: "قريبًا",
    start: "البداية",
    you: "أنت",
  },

  language: {
    picker: "اللغة",
    title: "اختر لغة",
  },

  landing: {
    exploreButton: "استكشف",
  },

  home: {
    heroSubtitle: "دليلك للمشي مع سرد بالذكاء الاصطناعي في لندن وباريس وأكسفورد وأكثر — ضع سماعاتك واستكشف العالم.",
    statsTours: "جولة",
    statsCities: "مدينة",
    statsFrom: "من",
    browseTours: "تصفح الجولات",
    exploreIn3D: "استكشف بتقنية ثلاثية الأبعاد ←",
    whoWeAreTitle: "من نحن",
    whoWeAreBody:
      "نحن فريق صغير مهووس بالقصص المخفية خلف الشوارع العادية. أنشأنا StoryStep لتتمكن من المشي في المدينة وفهم ما تراه فعليًا — دليل في جيبك، لا وجه مطمور في كتيب سياحي.",
    whyTitle: "لماذا StoryStep",
    featureGpsTitle: "سرد يعمل بنظام GPS",
    featureGpsBody: "لا حاجة للمس الشاشة أثناء المشي. يعرف هاتفك متى تصل إلى محطة ويشغّل المقطع التالي تلقائيًا.",
    featureNarratorTitle: "راوٍ حقيقي، لا روبوت",
    featureNarratorBody: "كل جولة يرويها من البداية إلى النهاية صوت بريطاني طبيعي واحد — وليس صوتًا اصطناعيًا.",
    featureScanTitle: "امسح معلمًا",
    featureScanBody: "وجّه كاميرتك نحو مبنى لا تعرفه وسيحاول StoryStep التعرف عليه فورًا.",
    featureOfflineTitle: "يعمل دون اتصال أثناء المشي",
    featureOfflineBody: "يتم تنزيل ملفات السرد الصوتية مسبقًا، لذا لن ينقطع بك اتصال ضعيف تحت جسر.",
    scanCardTitle: "امسح معلمًا",
    scanCardBody: "وجّه كاميرتك نحو مبنى وسيحاول StoryStep إخبارك بما هو.",
    featuredToursTitle: "جولات مميزة",
    howItWorksTitle: "كيف يعمل",
    step1: "اختر جولة من تبويب الجولات.",
    step2: "امشِ إلى نقطة البداية المحددة.",
    step3: "فقط امشِ — يبدأ السرد تلقائيًا عند كل محطة.",
    pricingTitle: "الأسعار",
    singleTourTitle: "جولة واحدة",
    singleTourBody: "امتلك جولة واحدة إلى الأبد. بلا اشتراك.",
    weeklyBadge: "الأكثر مرونة",
    weeklyTitle: "اشتراك أسبوعي غير محدود",
    weeklyBody: "جميع الجولات، بلا حدود، لمدة 7 أيام.",
    monthlyTitle: "اشتراك شهري غير محدود",
    monthlyBody: "جميع الجولات، بلا حدود، لمدة 30 يومًا.",
    ctaTitle: "هل أنت مستعد لرؤية المدينة بشكل مختلف؟",
    ctaBody: "اختر شارعًا. ضع سماعاتك. وامشِ فقط.",
    ctaButton: "تصفح الجولات ←",
    footerPrivacy: "سياسة الخصوصية",
    footerTerms: "شروط الخدمة",
    footerHelp: "المساعدة",
    footerCopy: "© 2026 StoryStep. جميع الحقوق محفوظة.",
  },

  tours: {
    title: "الجولات",
    subtitle: "اختر حيًا. ضع سماعاتك، وامشِ، ودع التطبيق يرشدك.",
    moreCitiesTitle: "المزيد من المدن",
  },

  map: {
    title: "استكشف بتقنية ثلاثية الأبعاد",
    subtitle: "شوارع ومبانٍ حقيقية — اسحب للتحريك، مرّر للتكبير، اسحب بالزر الأيمن للإمالة",
    loadIssueTitle: "تعذّر تحميل صور الخريطة",
    loadIssueBody: "تحقق من اتصالك — لا تزال الجولات تعمل بدون الخريطة ثلاثية الأبعاد.",
  },

  account: {
    title: "الحساب",
    darkMode: "الوضع الداكن",
    unlimitedTours: "جولات غير محدودة",
    planActive: "خطة {{plan}} نشطة — تتجدد أو تنتهي في {{date}}.",
    planWeekly: "الأسبوعية",
    planMonthly: "الشهرية",
    skipPaying: "لا حاجة للدفع لكل جولة — وصول غير محدود لجميع الجولات طوال فترة اشتراكك.",
    weekly: "أسبوعي",
    monthly: "شهري",
    manageOrCancel: "إدارة الاشتراك أو إلغاؤه",
    cancelFallback: "للإلغاء، راسلنا من البريد الإلكتروني الذي استخدمته للاشتراك.",
    createAccountTitle: "إنشاء حساب",
    storedLocally: "يُحفظ حاليًا على هذا الجهاز فقط — لا يوجد خادم بعد، لذا لن تتم المزامنة بين الأجهزة.",
    namePlaceholder: "الاسم",
    emailPlaceholder: "البريد الإلكتروني",
    passwordPlaceholder: "كلمة المرور",
    errorFillIn: "يرجى إدخال اسمك وبريدك الإلكتروني وكلمة مرور.",
    errorInvalidEmail: "لا يبدو هذا عنوان بريد إلكتروني صالحًا.",
    createAccountButton: "إنشاء الحساب",
    signOut: "تسجيل الخروج",
    downloadedTours: "الجولات التي تم تنزيلها",
    downloadedToursBody: "مايفير — السرد مضمّن في التطبيق",
    aboutTitle: "حول التطبيق",
    aboutBody: "StoryStep · الإصدار 1.0.0 (نموذج أولي)",
    paymentsNotSetTitle: "لم تُعدّ المدفوعات بعد",
    paymentsNotSetBodySub: "أضف رابط الدفع من Stripe في src/purchases/stripeConfig.ts لتفعيل الاشتراكات.",
  },

  tourPreview: {
    useScanner: "استخدم ماسح المعالم لدينا",
    scannerFree: "مجاني — لا حاجة لشراء الجولة",
    getMeToStart: "خذني إلى نقطة البداية",
    buyTour: "شراء الجولة — {{price}}",
    startsAt: "تبدأ من {{label}}",
    paymentsNotSetTitle: "لم تُعدّ المدفوعات بعد",
    paymentsNotSetBody: "أضف رابط الدفع من Stripe في src/purchases/stripeConfig.ts لتفعيل عمليات الشراء.",
    areaNotFound: "الجولة غير موجودة",
  },

  getToStart: {
    title: "التوجّه إلى نقطة البداية",
    permissionDenied: "تم رفض إذن الموقع — فعّله من الإعدادات لرؤية الاتجاهات المباشرة.",
    findingYou: "جارٍ تحديد موقعك…",
    directions: "يتبقى حوالي {{distance}} متر، باتجاه {{bearing}}.",
    openInMaps: "افتح في خرائط جوجل",
    startButton: "لقد وصلت — ابدأ الجولة",
    starting: "جارٍ البدء…",
    areaNotFound: "الجولة غير موجودة",
  },

  activeTour: {
    stopOf: "المحطة {{current}} من {{total}}",
    walkingToFirst: "في الطريق إلى المحطة الأولى…",
    back: "السابق",
    skip: "تخطٍّ",
    scanLandmarks: "امسح المعالم",
    replayLink: "إعادة تشغيل هذا المقطع",
    offRoute: "يبدو أنك ابتعدت عن المسار — عد باتجاه {{waypoint}} حين تستطيع.",
    offRouteFallback: "المحطة الأخيرة",
    tourComplete: "اكتملت الجولة",
    tourCompleteBody: "لقد مشيت جولة {{area}} بالكامل. نأمل أنك استمتعت بها.",
    backToAreas: "العودة إلى الجولات",
    areaNotFound: "الجولة غير موجودة",
  },

  camera: {
    permissionTitle: "الوصول إلى الكاميرا مطلوب",
    permissionBody: "وجّه هاتفك نحو معلم وسيحاول StoryStep التعرف عليه. يتطلب هذا الوصول إلى الكاميرا أولًا.",
    allowCamera: "السماح باستخدام الكاميرا",
    back: "السابق",
    close: "إغلاق",
    noKey: "لم يتم إعداد مفتاح Vision API — عيّن extra.googleVisionApiKey في app.json.",
    hint: "تعذّر التعرف على أي شيء هنا — حاول توسيط المبنى بالكامل والحفاظ على ثبات الهاتف.",
    matchPercent: "تطابق بنسبة {{percent}}٪",
    noScriptFallback: "تم التعرف عليه عبر قاعدة بيانات المعالم من Google — لا يوجد وصف محلي لهذا المعلم بعد.",
    scanButton: "امسح ما أنظر إليه",
    errorCouldntCapture: "تعذّر التقاط الصورة.",
    errorGeneric: "حدث خطأ ما.",
  },

  help: {
    title: "المساعدة",
    subtitle: "أسئلة شائعة حول المشي في جولة.",
    faqs: [
      {
        q: "كيف يعرف السرد مكاني؟",
        a: "يراقب StoryStep موقعك عبر GPS أثناء مشيك، ويشغّل المقطع التالي تلقائيًا عند اقترابك من محطة — دون الحاجة للمس أي شيء.",
      },
      {
        q: "لم يبدأ السرد — ماذا أفعل؟",
        a: "اضغط على تخطٍّ أو إعادة تشغيل في شاشة الجولة النشطة. قد تسبب المباني الشاهقة في وسط لندن انحرافًا في GPS، لذا من الطبيعي أن يبدأ مقطع ما مبكرًا أو متأخرًا قليلًا.",
      },
      {
        q: "هل يعمل مع قفل الهاتف؟",
        a: "أبقِ الشاشة مضاءة أثناء المشي. توقف المتصفحات تحديد الموقع عندما يكون الهاتف مقفلاً، لذلك لن تبدأ المحطة التالية حتى تفتح القفل.",
      },
      {
        q: "هل أحتاج إلى إشارة طوال المشي؟",
        a: "نعم، ستحتاج إلى بيانات الجوال. يُحمَّل سرد كل محطة عند وصولك إليها (نحو 1 ميغابايت لكل محطة)، لذا قد تبدأ المحطة متأخرة بضع ثوانٍ إذا كانت الإشارة ضعيفة.",
      },
      {
        q: "لماذا تحتاج ميزة \"امسح معلمًا\" إلى إذن؟",
        a: "تحتاج إلى إذن الكاميرا لترى ما توجهه إليه وتحاول التعرف عليه. لا يتم حفظ أي شيء — تُستخدم الصورة فقط لعملية البحث تلك.",
      },
    ],
    stillStuck: "ما زلت بحاجة إلى مساعدة؟",
    stillStuckBody: "أرسل لنا رسالة وسنرد عليك.",
    contactUs: "تواصل معنا",
    privacyPolicy: "سياسة الخصوصية",
  },

  errorBoundary: {
    title: "حدث خطأ ما",
    body: "نأسف لذلك — واجهت هذه الشاشة خطأً غير متوقع. حاول مرة أخرى، وإذا استمر حدوثه، أخبرنا.",
    tryAgain: "حاول مرة أخرى",
  },

  comingSoonScreen: {
    title: "{{city}} — قريبًا",
    body: "لا نزال نعمل على جولة StoryStep للمشي في {{city}}. تحقق مرة أخرى قريبًا — في هذه الأثناء، لندن وباريس وأكسفورد جاهزة للاستكشاف.",
    browseAvailable: "تصفح الجولات المتاحة",
    back: "السابق",
  },

  contact: {
    title: "تواصل معنا",
    subtitle: "أخبرنا بما يحدث وسنعاود التواصل معك.",
    messagePlaceholder: "ما الذي يحدث؟",
    sendButton: "إرسال الرسالة",
    errorEmptyMessage: "يرجى كتابة رسالة قبل الإرسال.",
    errorBody: "تعذّر الإرسال — تحقق من اتصالك وحاول مرة أخرى.",
    successBody: "شكرًا — تم إرسال رسالتك. سنعاود التواصل معك قريبًا.",
    notConfigured: "نموذج التواصل غير مُفعّل بعد — راسلنا مباشرة بدلاً من ذلك.",
  },

  legal: {
    englishOnlyNote:
      "هذه الوثيقة القانونية متاحة باللغة الإنجليزية فقط حاليًا للحفاظ على دقتها — بقية التطبيق مترجمة.",
  },

  purchase: {
    completeTitle: "اكتمل الشراء",
    completeBody: "أصبح لديك الآن وصول كامل إلى {{name}}.",
    thisTour: "هذه الجولة",
    subscriptionActiveTitle: "الاشتراك نشط",
    weeklyActiveBody: "جولات غير محدودة للأيام السبعة القادمة.",
    monthlyActiveBody: "جولات غير محدودة للثلاثين يومًا القادمة.",
  },
};

export default ar;

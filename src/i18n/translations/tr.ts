import type { TranslationDict } from "./en";

const tr: TranslationDict = {
  nav: { home: "Ana Sayfa", map: "3D Harita", tours: "Turlar", account: "Hesap", help: "Yardım" },

  common: {
    min: "dk",
    km: "km",
    stops: "durak",
    from: "başlangıç",
    easy: "kolay",
    moderate: "orta",
    hard: "zor",
    comingSoon: "Yakında",
    start: "Başlangıç",
    you: "Sen",
  },

  language: {
    picker: "Dil",
    title: "Bir dil seçin",
  },

  landing: {
    exploreButton: "Keşfet",
  },

  home: {
    heroSubtitle: "Londra, Paris, Oxford ve daha fazlası için yapay zekâ anlatımlı yürüyüş rehberiniz — kulaklığı tak, dünyayı keşfet.",
    statsTours: "tur",
    statsCities: "şehir",
    statsFrom: "başlangıç",
    browseTours: "Turlara göz at",
    exploreIn3D: "3D'de keşfet →",
    whoWeAreTitle: "Biz kimiz",
    whoWeAreBody:
      "Sıradan sokakların arkasındaki hikâyelere takıntılı küçük bir ekibiz. StoryStep, bir şehirde yürürken gördüklerinizi gerçekten anlayabilmeniz için var — cebinizdeki rehber, yüzünüzü gömdüğünüz bir gezi kitabı değil.",
    whyTitle: "Neden StoryStep",
    featureGpsTitle: "GPS ile tetiklenen anlatım",
    featureGpsBody: "Yürürken hiçbir şeye dokunmanıza gerek yok. Telefonunuz bir durağa ulaştığınızı anlar ve sıradaki bölümü otomatik oynatır.",
    featureNarratorTitle: "Robot değil, gerçek bir anlatıcı",
    featureNarratorBody: "Her tur, baştan sona tek ve doğal bir İngiliz sesiyle anlatılır — sentetik seslendirme değil.",
    featureScanTitle: "Bir yapıyı tara",
    featureScanBody: "Tanımadığınız bir binaya kamerayı tutun, StoryStep anında tanımayı dener.",
    featureOfflineTitle: "Yürüyüş sırasında çevrimdışı da çalışır",
    featureOfflineBody: "Anlatım sesleri önceden indirilir, böylece bir köprünün altındaki zayıf sinyal sizi yarıda bırakmaz.",
    scanCardTitle: "Bir yapıyı tara",
    scanCardBody: "Kamerayı bir binaya tutun, StoryStep ne olduğunu söylemeye çalışsın.",
    featuredToursTitle: "Öne çıkan turlar",
    howItWorksTitle: "Nasıl çalışır",
    step1: "Turlar sekmesinden bir tur seçin.",
    step2: "İşaretlenen başlangıç noktasına yürüyün.",
    step3: "Sadece yürüyün — her durakta anlatım kendiliğinden başlar.",
    pricingTitle: "Fiyatlar",
    singleTourTitle: "Tekli tur",
    singleTourBody: "Bir turu sonsuza kadar sahiplenin. Abonelik yok.",
    weeklyBadge: "EN ESNEK",
    weeklyTitle: "Haftalık sınırsız",
    weeklyBody: "7 gün boyunca tüm turlar sınırsız.",
    monthlyTitle: "Aylık sınırsız",
    monthlyBody: "30 gün boyunca tüm turlar sınırsız.",
    ctaTitle: "Şehri farklı görmeye hazır mısınız?",
    ctaBody: "Bir sokak seçin. Kulaklığı takın. Sadece yürüyün.",
    ctaButton: "Turlara göz at →",
    footerPrivacy: "Gizlilik Politikası",
    footerTerms: "Kullanım Şartları",
    footerHelp: "Yardım",
    footerCopy: "© 2026 StoryStep. Tüm hakları saklıdır.",
  },

  tours: {
    title: "Turlar",
    subtitle: "Bir semt seçin. Kulaklığı takın, yürüyün ve size rehberlik etsin.",
    moreCitiesTitle: "Daha fazla şehir",
  },

  map: {
    title: "3D'de keşfet",
    subtitle: "Gerçek sokaklar, gerçek binalar — kaydırmak için sürükleyin, yakınlaştırmak için kaydırın, eğmek için sağ tıklayıp sürükleyin",
    loadIssueTitle: "Harita görselleri yüklenmiyor",
    loadIssueBody: "Bağlantınızı kontrol edin — turlar 3D harita olmadan da çalışır.",
  },

  account: {
    title: "Hesap",
    darkMode: "Karanlık mod",
    unlimitedTours: "Sınırsız tur",
    planActive: "{{plan}} plan aktif — {{date}} tarihinde yenilenecek veya sona erecek.",
    planWeekly: "Haftalık",
    planMonthly: "Aylık",
    skipPaying: "Tur başına ödeme yapmayın — plan aktif olduğu sürece tüm turlara sınırsız erişim.",
    weekly: "Haftalık",
    monthly: "Aylık",
    manageOrCancel: "Aboneliği yönet veya iptal et",
    cancelFallback: "İptal etmek için abone olurken kullandığınız adresten bize yazın.",
    createAccountTitle: "Hesap oluştur",
    storedLocally: "Şimdilik yalnızca bu cihazda saklanır — henüz sunucu yok, bu yüzden telefonlar arasında senkronize olmaz.",
    namePlaceholder: "Ad",
    emailPlaceholder: "E-posta",
    passwordPlaceholder: "Şifre",
    errorFillIn: "Adınızı, e-postanızı ve bir şifre girin.",
    errorInvalidEmail: "Bu geçerli bir e-posta adresine benzemiyor.",
    createAccountButton: "Hesap oluştur",
    signOut: "Çıkış yap",
    downloadedTours: "İndirilen turlar",
    downloadedToursBody: "Mayfair — anlatım uygulamayla birlikte geliyor",
    aboutTitle: "Hakkında",
    aboutBody: "StoryStep · sürüm 1.0.0 (prototip)",
    paymentsNotSetTitle: "Ödemeler henüz ayarlanmadı",
    paymentsNotSetBodySub: "Abonelikleri etkinleştirmek için src/purchases/stripeConfig.ts dosyasına Stripe Payment Link URL'nizi ekleyin.",
  },

  tourPreview: {
    useScanner: "Yapı tarayıcımızı kullan",
    scannerFree: "Ücretsiz — tur satın almak gerekmez",
    getMeToStart: "Beni başlangıca götür",
    buyTour: "Turu satın al — {{price}}",
    startsAt: "Başlangıç: {{label}}",
    paymentsNotSetTitle: "Ödemeler henüz ayarlanmadı",
    paymentsNotSetBody: "Satın almaları etkinleştirmek için src/purchases/stripeConfig.ts dosyasına Stripe Payment Link URL'nizi ekleyin.",
    areaNotFound: "Tur bulunamadı",
  },

  getToStart: {
    title: "Başlangıç noktasına git",
    permissionDenied: "Konum izni reddedildi — canlı yol tarifi görmek için Ayarlar'dan etkinleştirin.",
    findingYou: "Konumunuz bulunuyor…",
    directions: "Yaklaşık {{distance}} m kaldı, yön {{bearing}}.",
    openInMaps: "Google Haritalar'da Aç",
    startButton: "Vardım — turu başlat",
    starting: "Başlatılıyor…",
    areaNotFound: "Tur bulunamadı",
  },

  activeTour: {
    stopOf: "Durak {{current}} / {{total}}",
    walkingToFirst: "İlk durağa doğru yürünüyor…",
    back: "Geri",
    skip: "Atla",
    scanLandmarks: "Yapıları tara",
    replayLink: "Bu bölümü tekrar oynat",
    offRoute: "Rotadan sapmış görünüyorsunuz — mümkün olduğunda {{waypoint}} yönüne dönün.",
    offRouteFallback: "son durağa",
    tourComplete: "Tur tamamlandı",
    tourCompleteBody: "{{area}} turunun tamamını yürüdünüz. Umarız keyif almışsınızdır.",
    backToAreas: "Turlara dön",
    areaNotFound: "Tur bulunamadı",
  },

  camera: {
    permissionTitle: "Kamera erişimi gerekli",
    permissionBody: "Telefonunuzu bir yapıya tutun, StoryStep tanımayı dener. Bunun için önce kamera erişimi gerekir.",
    allowCamera: "Kameraya izin ver",
    back: "Geri",
    close: "Kapat",
    noKey: "Vision API anahtarı yapılandırılmadı — app.json içinde extra.googleVisionApiKey ayarlayın.",
    hint: "Burada bir şey tanınamadı — tüm binayı ortalamayı ve telefonu sabit tutmayı deneyin.",
    matchPercent: "%{{percent}} eşleşme",
    noScriptFallback: "Google'ın yapı veritabanı üzerinden tanındı — bunun için henüz yerel bir metin yok.",
    scanButton: "Baktığım şeyi tara",
    errorCouldntCapture: "Fotoğraf çekilemedi.",
    errorGeneric: "Bir şeyler ters gitti.",
  },

  help: {
    title: "Yardım",
    subtitle: "Yürüyüş turları hakkında sık sorulan sorular.",
    faqs: [
      {
        q: "Anlatım nerede olduğumu nasıl biliyor?",
        a: "StoryStep yürürken GPS konumunuzu izler ve bir durağa yaklaştığınızda sıradaki bölümü otomatik olarak oynatır — hiçbir şeye dokunmanıza gerek yoktur.",
      },
      {
        q: "Anlatım başlamadı — ne yapmalıyım?",
        a: "Aktif tur ekranında Atla veya Tekrar Oynat'a dokunun. Londra merkezindeki yüksek binalar GPS sapmasına neden olabilir, bu yüzden bir bölümün biraz erken veya geç başlaması normaldir.",
      },
      {
        q: "Telefon kilitliyken çalışır mı?",
        a: "Evet — \"Her Zaman\" konum izni verdiyseniz, ekran kapalıyken de arka plan sesi çalmaya ve konum güncellemeleri bölümleri tetiklemeye devam eder.",
      },
      {
        q: "Yürüyüş boyunca sinyale ihtiyacım var mı?",
        a: "Hayır. Anlatım sesi önceden indirilir, bu yüzden zayıf bağlantıda da çalmaya devam eder — yürüyüş sırasında yalnızca GPS gerekir.",
      },
      {
        q: "\"Bir yapıyı tara\" neden izin istiyor?",
        a: "Neye baktığınızı görüp tanımayı deneyebilmesi için kamera erişimi gerekir. Hiçbir şey saklanmaz — fotoğraf yalnızca o tek arama için kullanılır.",
      },
    ],
    stillStuck: "Hâlâ takıldınız mı?",
    stillStuckBody: "Bize bir mesaj gönderin, size dönüş yapalım.",
    contactUs: "Bize ulaşın",
    privacyPolicy: "Gizlilik Politikası",
  },

  errorBoundary: {
    title: "Bir şeyler ters gitti",
    body: "Üzgünüz — bu ekranda beklenmedik bir hata oluştu. Tekrar deneyin, sorun devam ederse bize bildirin.",
    tryAgain: "Tekrar dene",
  },

  comingSoonScreen: {
    title: "{{city}} — yakında",
    body: "{{city}} için StoryStep yürüyüş turunu hâlâ hazırlıyoruz. Yakında tekrar bakın — bu arada Londra, Paris ve Oxford keşfetmeye hazır.",
    browseAvailable: "Mevcut turlara göz at",
    back: "Geri",
  },

  contact: {
    title: "Bize ulaşın",
    subtitle: "Neler olduğunu bize anlatın, size geri dönelim.",
    messagePlaceholder: "Neler oluyor?",
    sendButton: "Mesaj gönder",
    errorEmptyMessage: "Göndermeden önce lütfen bir mesaj yazın.",
    errorBody: "Gönderilemedi — bağlantınızı kontrol edip tekrar deneyin.",
    successBody: "Teşekkürler — mesajınız gönderildi. Yakında size dönüş yapacağız.",
    notConfigured: "İletişim formu henüz ayarlanmadı — bunun yerine doğrudan bize e-posta gönderin.",
  },

  legal: {
    englishOnlyNote:
      "Doğruluğunu korumak için bu yasal belge şimdilik yalnızca İngilizce olarak sunulmaktadır — uygulamanın geri kalanı çevrilmiştir.",
  },

  purchase: {
    completeTitle: "Satın alma tamamlandı",
    completeBody: "Artık {{name}} turuna tam erişiminiz var.",
    thisTour: "bu tur",
    subscriptionActiveTitle: "Abonelik aktif",
    weeklyActiveBody: "Önümüzdeki 7 gün boyunca sınırsız tur.",
    monthlyActiveBody: "Önümüzdeki 30 gün boyunca sınırsız tur.",
  },
};

export default tr;

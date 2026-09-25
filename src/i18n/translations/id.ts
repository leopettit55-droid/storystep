import type { TranslationDict } from "./en";

const id: TranslationDict = {
  nav: { home: "Beranda", map: "Peta 3D", tours: "Tur", account: "Akun", help: "Bantuan" },

  common: {
    min: "mnt",
    km: "km",
    stops: "perhentian",
    from: "mulai",
    easy: "mudah",
    moderate: "sedang",
    hard: "sulit",
    comingSoon: "Segera hadir",
    start: "Mulai",
    you: "Anda",
  },

  language: {
    picker: "Bahasa",
    title: "Pilih bahasa",
  },

  landing: {
    exploreButton: "Jelajahi",
  },

  home: {
    heroSubtitle: "Panduan jalan kaki dengan narasi AI di London, Paris, Oxford, dan lainnya — pasang headphone-mu, jelajahi dunia.",
    statsTours: "tur",
    statsCities: "kota",
    statsFrom: "mulai",
    browseTours: "Lihat tur",
    exploreIn3D: "Jelajahi dalam 3D →",
    whoWeAreTitle: "Tentang kami",
    whoWeAreBody:
      "Kami adalah tim kecil yang terobsesi dengan kisah-kisah tersembunyi di balik jalanan biasa. StoryStep hadir agar kamu bisa berjalan menyusuri kota dan benar-benar memahami apa yang kamu lihat — pemandu di sakumu, bukan wajahmu yang tertunduk ke buku panduan.",
    whyTitle: "Mengapa StoryStep",
    featureGpsTitle: "Narasi otomatis dengan GPS",
    featureGpsBody: "Tidak perlu menyentuh layar saat berjalan. Ponselmu tahu kapan kamu tiba di sebuah titik dan otomatis memutar bagian berikutnya.",
    featureNarratorTitle: "Narator asli, bukan robot",
    featureNarratorBody: "Setiap tur dinarasikan dari awal hingga akhir oleh satu suara Inggris yang alami — bukan suara sintetis.",
    featureScanTitle: "Pindai sebuah landmark",
    featureScanBody: "Arahkan kameramu ke bangunan yang tidak kamu kenali, dan StoryStep akan mencoba mengenalinya saat itu juga.",
    featureOfflineTitle: "Tetap berfungsi offline saat berjalan",
    featureOfflineBody: "Audio narasi diunduh terlebih dahulu, jadi koneksi lemah di bawah jembatan tidak akan memutus kamu.",
    scanCardTitle: "Pindai sebuah landmark",
    scanCardBody: "Arahkan kameramu ke bangunan, dan StoryStep akan mencoba memberi tahumu apa itu.",
    featuredToursTitle: "Tur unggulan",
    howItWorksTitle: "Cara kerjanya",
    step1: "Pilih tur di tab Tur.",
    step2: "Berjalanlah ke titik awal yang ditandai.",
    step3: "Tinggal berjalan — narasi akan otomatis diputar di setiap titik.",
    pricingTitle: "Harga",
    singleTourTitle: "Tur tunggal",
    singleTourBody: "Miliki satu tur selamanya. Tanpa langganan.",
    weeklyBadge: "PALING FLEKSIBEL",
    weeklyTitle: "Tak terbatas mingguan",
    weeklyBody: "Semua tur, tanpa batas, selama 7 hari.",
    monthlyTitle: "Tak terbatas bulanan",
    monthlyBody: "Semua tur, tanpa batas, selama 30 hari.",
    ctaTitle: "Siap melihat kota dengan cara yang berbeda?",
    ctaBody: "Pilih satu jalan. Pasang headphone-mu. Tinggal berjalan.",
    ctaButton: "Lihat tur →",
    footerPrivacy: "Kebijakan Privasi",
    footerTerms: "Ketentuan Layanan",
    footerHelp: "Bantuan",
    footerCopy: "© 2026 StoryStep. Hak cipta dilindungi.",
  },

  tours: {
    title: "Tur",
    subtitle: "Pilih sebuah kawasan. Pasang headphone-mu, berjalanlah, dan biarkan dipandu.",
    moreCitiesTitle: "Kota lainnya",
  },

  map: {
    title: "Jelajahi dalam 3D",
    subtitle: "Jalan dan bangunan sungguhan — seret untuk menggeser, gulir untuk memperbesar, klik kanan-seret untuk memiringkan",
    loadIssueTitle: "Gambar peta tidak dapat dimuat",
    loadIssueBody: "Periksa koneksimu — tur tetap berfungsi tanpa peta 3D.",
  },

  account: {
    title: "Akun",
    darkMode: "Mode gelap",
    unlimitedTours: "Tur tak terbatas",
    planActive: "Paket {{plan}} aktif — akan diperpanjang atau berakhir pada {{date}}.",
    planWeekly: "Mingguan",
    planMonthly: "Bulanan",
    skipPaying: "Tak perlu membayar per tur — akses tak terbatas ke semua tur selama paketmu aktif.",
    weekly: "Mingguan",
    monthly: "Bulanan",
    manageOrCancel: "Kelola atau batalkan langganan",
    cancelFallback: "Untuk membatalkan, kirim email kepada kami dari alamat yang kamu gunakan untuk berlangganan.",
    createAccountTitle: "Buat akun",
    storedLocally: "Untuk saat ini hanya disimpan di perangkat ini — belum ada server, jadi tidak akan tersinkron antar ponsel.",
    namePlaceholder: "Nama",
    emailPlaceholder: "Email",
    passwordPlaceholder: "Kata sandi",
    errorFillIn: "Isi nama, email, dan kata sandi.",
    errorInvalidEmail: "Alamat email ini sepertinya tidak valid.",
    createAccountButton: "Buat akun",
    signOut: "Keluar",
    downloadedTours: "Tur yang diunduh",
    downloadedToursBody: "Mayfair — narasi sudah disertakan dalam aplikasi",
    aboutTitle: "Tentang",
    aboutBody: "StoryStep · versi 1.0.0 (prototipe)",
    paymentsNotSetTitle: "Pembayaran belum diatur",
    paymentsNotSetBodySub: "Tambahkan URL Stripe Payment Link-mu di src/purchases/stripeConfig.ts untuk mengaktifkan langganan.",
  },

  tourPreview: {
    useScanner: "Gunakan pemindai landmark kami",
    scannerFree: "Gratis — tanpa perlu membeli tur",
    getMeToStart: "Antar aku ke titik awal",
    buyTour: "Beli tur — {{price}}",
    startsAt: "Mulai di {{label}}",
    paymentsNotSetTitle: "Pembayaran belum diatur",
    paymentsNotSetBody: "Tambahkan URL Stripe Payment Link-mu di src/purchases/stripeConfig.ts untuk mengaktifkan pembelian.",
    areaNotFound: "Tur tidak ditemukan",
  },

  getToStart: {
    title: "Menuju titik awal",
    permissionDenied: "Izin lokasi ditolak — aktifkan di Pengaturan untuk melihat arah secara langsung.",
    findingYou: "Mencari lokasimu…",
    directions: "Sekitar {{distance}} m lagi, arah {{bearing}}.",
    openInMaps: "Buka di Google Maps",
    startButton: "Aku sudah sampai — mulai tur",
    starting: "Memulai…",
    areaNotFound: "Tur tidak ditemukan",
  },

  activeTour: {
    stopOf: "Titik {{current}} dari {{total}}",
    walkingToFirst: "Berjalan menuju titik pertama…",
    back: "Kembali",
    skip: "Lewati",
    scanLandmarks: "Pindai landmark",
    replayLink: "Putar ulang bagian ini",
    offRoute: "Sepertinya kamu keluar dari rute — kembalilah ke arah {{waypoint}} saat kamu bisa.",
    offRouteFallback: "titik terakhir",
    tourComplete: "Tur selesai",
    tourCompleteBody: "Kamu telah menyelesaikan seluruh tur {{area}}. Semoga kamu menikmatinya.",
    backToAreas: "Kembali ke daftar tur",
    areaNotFound: "Tur tidak ditemukan",
  },

  camera: {
    permissionTitle: "Diperlukan akses kamera",
    permissionBody: "Arahkan ponselmu ke sebuah landmark, dan StoryStep akan mencoba mengenalinya. Ini memerlukan akses kamera terlebih dahulu.",
    allowCamera: "Izinkan kamera",
    back: "Kembali",
    close: "Tutup",
    noKey: "Kunci Vision API belum dikonfigurasi — atur extra.googleVisionApiKey di app.json.",
    hint: "Tidak dapat mengenali apa pun di sini — coba posisikan seluruh bangunan di tengah dan pegang ponsel dengan stabil.",
    matchPercent: "Kecocokan {{percent}}%",
    noScriptFallback: "Dikenali melalui basis data landmark Google — belum ada narasi khusus untuk ini.",
    scanButton: "Pindai apa yang aku lihat",
    errorCouldntCapture: "Tidak dapat mengambil foto.",
    errorGeneric: "Ada yang tidak beres.",
  },

  help: {
    title: "Bantuan",
    subtitle: "Pertanyaan umum seputar mengikuti tur jalan kaki.",
    faqs: [
      {
        q: "Bagaimana narasi tahu di mana aku berada?",
        a: "StoryStep memantau lokasi GPS-mu saat berjalan dan otomatis memutar bagian berikutnya saat kamu mendekati sebuah titik — tanpa perlu menyentuh apa pun.",
      },
      {
        q: "Narasi tidak diputar — apa yang harus kulakukan?",
        a: "Ketuk Lewati atau Putar Ulang di layar tur aktif. Gedung tinggi di pusat kota London bisa menyebabkan GPS melenceng, jadi wajar jika sebuah bagian diputar sedikit lebih awal atau terlambat.",
      },
      {
        q: "Apakah berfungsi saat ponsel terkunci?",
        a: "Ya — audio latar terus diputar dan pembaruan lokasi terus memicu bagian-bagian narasi bahkan saat layar mati, selama kamu memberikan izin lokasi \"Selalu\".",
      },
      {
        q: "Apakah aku butuh sinyal sepanjang perjalanan?",
        a: "Tidak. Audio narasi diunduh terlebih dahulu, jadi tetap diputar meski koneksi lemah — hanya GPS yang dibutuhkan selama berjalan.",
      },
      {
        q: "Mengapa \"Pindai landmark\" memerlukan izin?",
        a: "Akses kamera diperlukan agar aplikasi bisa melihat apa yang kamu arahkan dan mencoba mengenalinya. Tidak ada yang disimpan — foto hanya digunakan untuk pencarian itu saja.",
      },
    ],
    stillStuck: "Masih mengalami kendala?",
    stillStuckBody: "Kirim pesan kepada kami, dan kami akan menghubungimu kembali.",
    contactUs: "Hubungi kami",
    privacyPolicy: "Kebijakan Privasi",
  },

  errorBoundary: {
    title: "Ada yang tidak beres",
    body: "Maaf — layar ini mengalami kesalahan tak terduga. Coba lagi, dan jika terus terjadi, beri tahu kami.",
    tryAgain: "Coba lagi",
  },

  comingSoonScreen: {
    title: "{{city}} — segera hadir",
    body: "Kami masih menyiapkan tur jalan kaki StoryStep untuk {{city}}. Kunjungi lagi nanti — sementara itu, London, Paris, dan Oxford siap dijelajahi.",
    browseAvailable: "Lihat tur yang tersedia",
    back: "Kembali",
  },

  contact: {
    title: "Hubungi kami",
    subtitle: "Beri tahu kami apa yang terjadi dan kami akan menghubungi Anda kembali.",
    messagePlaceholder: "Ada apa?",
    sendButton: "Kirim pesan",
    errorEmptyMessage: "Silakan tulis pesan sebelum mengirim.",
    errorBody: "Tidak dapat mengirim — periksa koneksi Anda dan coba lagi.",
    successBody: "Terima kasih — pesan Anda telah terkirim. Kami akan segera menghubungi Anda.",
    notConfigured: "Formulir kontak belum diatur — email kami langsung sebagai gantinya.",
  },

  legal: {
    englishOnlyNote:
      "Dokumen hukum ini untuk saat ini hanya tersedia dalam bahasa Inggris demi menjaga keakuratannya — bagian lain aplikasi sudah diterjemahkan.",
  },

  purchase: {
    completeTitle: "Pembelian selesai",
    completeBody: "Kamu sekarang memiliki akses penuh ke {{name}}.",
    thisTour: "tur ini",
    subscriptionActiveTitle: "Langganan aktif",
    weeklyActiveBody: "Tur tak terbatas untuk 7 hari ke depan.",
    monthlyActiveBody: "Tur tak terbatas untuk 30 hari ke depan.",
  },
};

export default id;

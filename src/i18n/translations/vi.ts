import type { TranslationDict } from "./en";

const vi: TranslationDict = {
  nav: { home: "Trang chủ", map: "Bản đồ 3D", tours: "Tour", account: "Tài khoản", help: "Trợ giúp" },

  common: {
    free: "Miễn phí",
    min: "phút",
    km: "km",
    stops: "điểm dừng",
    from: "từ",
    easy: "dễ",
    moderate: "trung bình",
    hard: "khó",
    comingSoon: "Sắp ra mắt",
    start: "Điểm bắt đầu",
    you: "Bạn",
  },

  language: {
    picker: "Ngôn ngữ",
    title: "Chọn ngôn ngữ",
  },

  landing: {
    exploreButton: "Khám phá",
  },

  home: {
    heroSubtitle: "Hướng dẫn viên đi bộ thuyết minh bằng AI của bạn tại London, Paris, Oxford và nhiều nơi khác — đeo tai nghe vào và khám phá thế giới.",
    statsTours: "tour",
    statsCities: "thành phố",
    statsFrom: "từ",
    browseTours: "Xem các tour",
    exploreIn3D: "Khám phá ở chế độ 3D →",
    whoWeAreTitle: "Chúng tôi là ai",
    whoWeAreBody:
      "Chúng tôi là một đội ngũ nhỏ đam mê những câu chuyện ẩn sau những con phố bình thường. StoryStep ra đời để bạn có thể đi bộ khắp thành phố và thực sự hiểu những gì mình đang nhìn thấy — người hướng dẫn trong túi bạn, chứ không phải khuôn mặt cắm vào cuốn sách hướng dẫn.",
    whyTitle: "Vì sao chọn StoryStep",
    featureGpsTitle: "Thuyết minh kích hoạt bằng GPS",
    featureGpsBody: "Không cần chạm màn hình khi đang đi. Điện thoại của bạn biết khi nào bạn đến một điểm dừng và tự động phát đoạn tiếp theo.",
    featureNarratorTitle: "Người thuyết minh thật, không phải robot",
    featureNarratorBody: "Mỗi tour được một giọng đọc tiếng Anh-Anh tự nhiên thuyết minh từ đầu đến cuối — không phải giọng tổng hợp.",
    featureScanTitle: "Quét một địa danh",
    featureScanBody: "Hướng camera vào một tòa nhà bạn không nhận ra, StoryStep sẽ cố nhận diện ngay tại chỗ.",
    featureOfflineTitle: "Hoạt động ngoại tuyến khi đang đi bộ",
    featureOfflineBody: "Âm thanh thuyết minh được tải trước, nên kết nối yếu dưới gầm cầu cũng không làm gián đoạn bạn.",
    scanCardTitle: "Quét một địa danh",
    scanCardBody: "Hướng camera vào một tòa nhà, StoryStep sẽ cố cho bạn biết đó là gì.",
    featuredToursTitle: "Tour nổi bật",
    howItWorksTitle: "Cách hoạt động",
    step1: "Chọn một tour trong tab Tour.",
    step2: "Đi bộ đến điểm xuất phát đã đánh dấu.",
    step3: "Chỉ cần đi bộ — thuyết minh sẽ tự động phát ở mỗi điểm dừng.",
    pricingTitle: "Giá",
    singleTourTitle: "Một tour lẻ",
    singleTourBody: "Sở hữu một tour vĩnh viễn. Không cần đăng ký.",
    weeklyBadge: "LINH HOẠT NHẤT",
    weeklyTitle: "Không giới hạn theo tuần",
    weeklyBody: "Tất cả các tour, không giới hạn, trong 7 ngày.",
    monthlyTitle: "Không giới hạn theo tháng",
    monthlyBody: "Tất cả các tour, không giới hạn, trong 30 ngày.",
    ctaTitle: "Sẵn sàng nhìn thành phố theo cách khác?",
    ctaBody: "Chọn một con phố. Đeo tai nghe vào. Chỉ cần đi bộ.",
    ctaButton: "Xem các tour →",
    footerPrivacy: "Chính sách quyền riêng tư",
    footerTerms: "Điều khoản dịch vụ",
    footerHelp: "Trợ giúp",
    footerCopy: "© 2026 StoryStep. Đã đăng ký bản quyền.",
  },

  tours: {
    title: "Tour",
    subtitle: "Chọn một khu vực. Đeo tai nghe, đi bộ, và để ứng dụng dẫn đường cho bạn.",
    moreCitiesTitle: "Thêm thành phố",
  },

  map: {
    title: "Khám phá ở chế độ 3D",
    subtitle: "Đường phố và tòa nhà thật — kéo để di chuyển, cuộn để phóng to, giữ chuột phải và kéo để nghiêng",
    loadIssueTitle: "Hình ảnh bản đồ không tải được",
    loadIssueBody: "Hãy kiểm tra kết nối của bạn — các tour vẫn hoạt động dù không có bản đồ 3D.",
  },

  account: {
    title: "Tài khoản",
    darkMode: "Chế độ tối",
    unlimitedTours: "Tour không giới hạn",
    planActive: "Gói {{plan}} đang hoạt động — sẽ gia hạn hoặc hết hạn vào {{date}}.",
    planWeekly: "Theo tuần",
    planMonthly: "Theo tháng",
    skipPaying: "Không cần trả tiền theo từng tour — truy cập không giới hạn khi gói còn hiệu lực.",
    weekly: "Theo tuần",
    monthly: "Theo tháng",
    manageOrCancel: "Quản lý hoặc hủy gói đăng ký",
    cancelFallback: "Để hủy, hãy gửi email cho chúng tôi từ địa chỉ bạn đã dùng để đăng ký.",
    createAccountTitle: "Tạo tài khoản",
    storedLocally: "Hiện chỉ được lưu trên thiết bị này — chưa có máy chủ, nên sẽ không đồng bộ giữa các điện thoại.",
    namePlaceholder: "Tên",
    emailPlaceholder: "Email",
    passwordPlaceholder: "Mật khẩu",
    errorFillIn: "Vui lòng nhập tên, email và mật khẩu.",
    errorInvalidEmail: "Địa chỉ email này có vẻ không hợp lệ.",
    createAccountButton: "Tạo tài khoản",
    signOut: "Đăng xuất",
    downloadedTours: "Tour đã tải xuống",
    downloadedToursBody: "Mayfair — thuyết minh đã có sẵn trong ứng dụng",
    aboutTitle: "Giới thiệu",
    aboutBody: "StoryStep · phiên bản 1.0.0 (bản dùng thử)",
    paymentsNotSetTitle: "Thanh toán chưa được thiết lập",
    paymentsNotSetBodySub: "Thêm URL Stripe Payment Link của bạn vào src/purchases/stripeConfig.ts để kích hoạt gói đăng ký.",
  },

  tourPreview: {
    useScanner: "Dùng trình quét địa danh của chúng tôi",
    scannerFree: "Miễn phí — không cần mua tour",
    getMeToStart: "Đưa tôi đến điểm bắt đầu",
    buyTour: "Mua tour — {{price}}",
    startsAt: "Bắt đầu tại {{label}}",
    paymentsNotSetTitle: "Thanh toán chưa được thiết lập",
    paymentsNotSetBody: "Thêm URL Stripe Payment Link của bạn vào src/purchases/stripeConfig.ts để kích hoạt mua hàng.",
    areaNotFound: "Không tìm thấy tour",
  },

  getToStart: {
    title: "Đến điểm bắt đầu",
    permissionDenied: "Quyền truy cập vị trí đã bị từ chối — hãy bật trong Cài đặt để xem chỉ đường trực tiếp.",
    findingYou: "Đang xác định vị trí của bạn…",
    directions: "Còn khoảng {{distance}} m, hướng {{bearing}}.",
    openInMaps: "Mở trong Google Maps",
    startButton: "Tôi đã đến — bắt đầu tour",
    starting: "Đang bắt đầu…",
    areaNotFound: "Không tìm thấy tour",
  },

  activeTour: {
    stopOf: "Điểm dừng {{current}} / {{total}}",
    walkingToFirst: "Đang đi đến điểm dừng đầu tiên…",
    back: "Quay lại",
    skip: "Bỏ qua",
    scanLandmarks: "Quét địa danh",
    replayLink: "Phát lại đoạn này",
    offRoute: "Có vẻ bạn đã đi lệch tuyến đường — hãy quay lại hướng {{waypoint}} khi có thể.",
    offRouteFallback: "điểm dừng trước",
    tourComplete: "Đã hoàn thành tour",
    tourCompleteBody: "Bạn đã đi hết toàn bộ {{area}}. Hy vọng bạn đã có trải nghiệm thú vị.",
    backToAreas: "Quay lại danh sách tour",
    areaNotFound: "Không tìm thấy tour",
  },

  camera: {
    permissionTitle: "Cần quyền truy cập camera",
    permissionBody: "Hướng điện thoại vào một địa danh, StoryStep sẽ cố nhận diện nó. Trước tiên cần có quyền truy cập camera.",
    allowCamera: "Cho phép dùng camera",
    back: "Quay lại",
    close: "Đóng",
    noKey: "Chưa cấu hình khóa Vision API — thiết lập extra.googleVisionApiKey trong app.json.",
    hint: "Không nhận diện được gì ở đây — hãy thử canh giữa toàn bộ tòa nhà và giữ máy ổn định.",
    matchPercent: "Khớp {{percent}}%",
    noScriptFallback: "Được nhận diện qua cơ sở dữ liệu địa danh của Google — chưa có nội dung riêng cho địa danh này.",
    scanButton: "Quét những gì tôi đang nhìn",
    errorCouldntCapture: "Không thể chụp ảnh.",
    errorGeneric: "Đã xảy ra lỗi.",
  },

  help: {
    title: "Trợ giúp",
    subtitle: "Các câu hỏi thường gặp về việc đi tour bộ hành.",
    faqs: [
      {
        q: "Làm sao thuyết minh biết tôi đang ở đâu?",
        a: "StoryStep theo dõi vị trí GPS của bạn khi bạn đi bộ và tự động phát đoạn tiếp theo khi bạn đến gần một điểm dừng — không cần chạm vào bất cứ thứ gì.",
      },
      {
        q: "Thuyết minh không phát — tôi phải làm gì?",
        a: "Nhấn Bỏ qua hoặc Phát lại trên màn hình tour đang diễn ra. Các tòa nhà cao ở trung tâm London có thể gây trôi GPS, nên việc một đoạn phát sớm hoặc muộn một chút là bình thường.",
      },
      {
        q: "Có hoạt động khi điện thoại bị khóa không?",
        a: "Có — âm thanh nền vẫn tiếp tục phát và các cập nhật vị trí vẫn kích hoạt các đoạn ngay cả khi tắt màn hình, miễn là bạn đã cấp quyền vị trí \"Luôn cho phép\".",
      },
      {
        q: "Tôi có cần sóng suốt cả chuyến đi bộ không?",
        a: "Không. Âm thanh thuyết minh được tải trước, nên vẫn phát khi kết nối yếu — trong lúc đi bộ chỉ cần GPS.",
      },
      {
        q: "Vì sao \"Quét một địa danh\" cần quyền truy cập?",
        a: "Cần quyền truy cập camera để xem bạn đang hướng vào đâu và cố nhận diện nó. Không có gì được lưu lại — ảnh chỉ được dùng cho lần tra cứu đó.",
      },
    ],
    stillStuck: "Vẫn còn thắc mắc?",
    stillStuckBody: "Gửi tin nhắn cho chúng tôi, chúng tôi sẽ phản hồi bạn.",
    contactUs: "Liên hệ với chúng tôi",
    privacyPolicy: "Chính sách quyền riêng tư",
  },

  errorBoundary: {
    title: "Đã xảy ra lỗi",
    body: "Rất tiếc — màn hình này gặp lỗi không mong muốn. Hãy thử lại, và nếu vẫn tiếp diễn, hãy cho chúng tôi biết.",
    tryAgain: "Thử lại",
  },

  comingSoonScreen: {
    title: "{{city}} — sắp ra mắt",
    body: "Chúng tôi vẫn đang xây dựng tour đi bộ StoryStep cho {{city}}. Hãy quay lại sớm — trong lúc chờ đợi, London, Paris và Oxford đã sẵn sàng để khám phá.",
    browseAvailable: "Xem các tour hiện có",
    back: "Quay lại",
  },

  contact: {
    title: "Liên hệ với chúng tôi",
    subtitle: "Cho chúng tôi biết vấn đề, chúng tôi sẽ phản hồi bạn.",
    messagePlaceholder: "Bạn gặp vấn đề gì?",
    sendButton: "Gửi tin nhắn",
    errorEmptyMessage: "Vui lòng viết tin nhắn trước khi gửi.",
    errorBody: "Không thể gửi — hãy kiểm tra kết nối và thử lại.",
    successBody: "Cảm ơn — tin nhắn của bạn đã được gửi. Chúng tôi sẽ phản hồi sớm.",
    notConfigured: "Biểu mẫu liên hệ chưa được thiết lập — hãy gửi email trực tiếp cho chúng tôi.",
  },

  legal: {
    englishOnlyNote:
      "Tài liệu pháp lý này hiện chỉ có bằng tiếng Anh để đảm bảo tính chính xác — phần còn lại của ứng dụng đã được dịch.",
  },

  purchase: {
    completeTitle: "Đã hoàn tất mua hàng",
    completeBody: "Giờ bạn đã có toàn quyền truy cập {{name}}.",
    thisTour: "tour này",
    subscriptionActiveTitle: "Gói đăng ký đang hoạt động",
    weeklyActiveBody: "Tour không giới hạn trong 7 ngày tới.",
    monthlyActiveBody: "Tour không giới hạn trong 30 ngày tới.",
  },
};

export default vi;

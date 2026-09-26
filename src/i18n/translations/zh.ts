import type { TranslationDict } from "./en";

const zh: TranslationDict = {
  nav: { home: "首页", map: "3D 地图", tours: "行程", account: "账户", help: "帮助" },

  common: {
    free: "免费",
    min: "分钟",
    km: "公里",
    stops: "个站点",
    from: "起",
    easy: "轻松",
    moderate: "中等",
    hard: "较难",
    comingSoon: "即将推出",
    start: "起点",
    you: "你",
  },

  language: {
    picker: "语言",
    title: "选择语言",
  },

  landing: {
    exploreButton: "探索",
  },

  home: {
    heroSubtitle: "由 AI 讲解的伦敦、巴黎、牛津及更多城市步行导览——戴上耳机，探索世界。",
    statsTours: "条行程",
    statsCities: "座城市",
    statsFrom: "起价",
    browseTours: "浏览行程",
    exploreIn3D: "3D 探索 →",
    whoWeAreTitle: "关于我们",
    whoWeAreBody:
      "我们是一支痴迷于挖掘平凡街道背后故事的小团队。StoryStep 让你走在城市里，真正看懂眼前的一切——它是揣在口袋里的导游，而不是举在面前的攻略书。",
    whyTitle: "为什么选择 StoryStep",
    featureGpsTitle: "GPS 自动触发讲解",
    featureGpsBody: "走路时无需点按。手机会自动识别你到达的站点，并播放下一段讲解。",
    featureNarratorTitle: "始终如一的讲述者",
    featureNarratorBody: "每条路线从头到尾都由同一位自然流畅的英式声音讲述。",
    featureScanTitle: "扫描地标",
    featureScanBody: "把镜头对准不认识的建筑，StoryStep 会尝试当场为你识别。",
    featureOfflineTitle: "省流量",
    featureOfflineBody: "每一站的讲解约 1 MB，到达时才加载，普通移动数据就足够了。",
    scanCardTitle: "扫描地标",
    scanCardBody: "把镜头对准一座建筑，StoryStep 会尝试告诉你它是什么。",
    featuredToursTitle: "精选行程",
    howItWorksTitle: "使用方法",
    step1: "在「行程」页选择一条路线。",
    step2: "步行到标记的起点。",
    step3: "只管走——经过每个站点时会自动播放讲解。",
    pricingTitle: "价格",
    singleTourTitle: "单条行程",
    singleTourBody: "永久拥有一条行程，无需订阅。",
    weeklyBadge: "最灵活",
    weeklyTitle: "每周无限畅游",
    weeklyBody: "7 天内畅玩所有行程。",
    monthlyTitle: "每月无限畅游",
    monthlyBody: "30 天内畅玩所有行程。",
    ctaTitle: "准备好换个方式看世界了吗？",
    ctaBody: "选一条街，戴上耳机，出发就好。",
    ctaButton: "浏览行程 →",
    footerPrivacy: "隐私政策",
    footerTerms: "服务条款",
    footerHelp: "帮助",
    footerCopy: "© 2026 StoryStep. 保留所有权利。",
  },

  tours: {
    title: "行程",
    subtitle: "选择一个街区，戴上耳机走起来，剩下的交给它来引导你。",
    moreCitiesTitle: "更多城市",
  },

  map: {
    title: "3D 探索",
    subtitle: "真实的街道和建筑 3D 呈现。拖动地图四处看看，然后选择一条路线。",
    loadIssueTitle: "地图影像加载失败",
    loadIssueBody: "请检查网络连接——没有 3D 地图，行程依然可以正常使用。",
  },

  account: {
    title: "账户",
    darkMode: "深色模式",
    unlimitedTours: "无限畅游",
    planActive: "{{plan}}套餐已激活——将于 {{date}} 续订或到期。",
    planWeekly: "每周",
    planMonthly: "每月",
    skipPaying: "无需单独付费——套餐有效期内可畅玩所有行程。",
    weekly: "每周",
    monthly: "每月",
    manageOrCancel: "管理或取消订阅",
    cancelFallback: "如需取消，请用订阅时使用的邮箱给我们发送邮件。",
    createAccountTitle: "创建账户",
    storedLocally: "可选。仅保存在这部手机上，不会在设备之间同步。",
    namePlaceholder: "姓名",
    emailPlaceholder: "邮箱",
    passwordPlaceholder: "密码",
    errorFillIn: "请填写姓名、邮箱和密码。",
    errorInvalidEmail: "邮箱地址格式不正确。",
    createAccountButton: "创建账户",
    signOut: "退出登录",
    downloadedTours: "已下载的行程",
    downloadedToursBody: "梅费尔（Mayfair）——讲解已随应用内置",
    aboutTitle: "关于",
    aboutBody: "StoryStep · 版本 1.0.0",
    paymentsNotSetTitle: "支付功能尚未配置",
    paymentsNotSetBodySub: "请在 src/purchases/stripeConfig.ts 中添加 Stripe 付款链接以启用订阅。",
  },

  tourPreview: {
    useScanner: "使用我们的地标扫描器",
    scannerFree: "将相机对准建筑，聆听它的故事",
    getMeToStart: "带我去起点",
    buyTour: "购买行程 — {{price}}",
    startsAt: "起点：{{label}}",
    paymentsNotSetTitle: "支付功能尚未配置",
    paymentsNotSetBody: "请在 src/purchases/stripeConfig.ts 中添加 Stripe 付款链接以启用购买。",
    areaNotFound: "未找到该行程",
  },

  getToStart: {
    title: "前往起点",
    permissionDenied: "定位权限被拒绝——请在系统设置中开启，以查看实时路线指引。",
    findingYou: "正在定位…",
    directions: "距起点约 {{distance}} 米，方向为{{bearing}}。",
    openInMaps: "在谷歌地图中打开",
    startButton: "我已到达——开始行程",
    starting: "启动中…",
    areaNotFound: "未找到该行程",
  },

  activeTour: {
    stopOf: "第 {{current}} / {{total}} 站",
    walkingToFirst: "正在前往第一站…",
    back: "上一段",
    skip: "跳过",
    scanLandmarks: "扫描地标",
    replayLink: "重播本段讲解",
    offRoute: "你似乎偏离了路线——请尽快返回 {{waypoint}} 附近。",
    offRouteFallback: "上一站",
    tourComplete: "行程完成",
    tourCompleteBody: "你已走完 {{area}} 的全部行程，希望你玩得开心。",
    backToAreas: "返回行程列表",
    areaNotFound: "未找到该行程",
  },

  camera: {
    permissionTitle: "需要相机权限",
    permissionBody: "把手机对准地标，StoryStep 会尝试识别它。需要先获取相机权限。",
    allowCamera: "允许使用相机",
    back: "返回",
    close: "关闭",
    noKey: "尚未配置 Vision API 密钥——请在 app.json 中设置 extra.googleVisionApiKey。",
    hint: "没能识别出这里的建筑——试着把整座建筑居中并保持稳定。",
    matchPercent: "匹配度 {{percent}}%",
    noScriptFallback: "已通过谷歌地标数据库识别，但暂无本地讲解内容。",
    scanButton: "扫描我正在看的建筑",
    errorCouldntCapture: "拍照失败。",
    errorGeneric: "出了点问题。",
  },

  help: {
    title: "帮助",
    subtitle: "关于步行行程的常见问题。",
    faqs: [
      {
        q: "讲解是怎么知道我在哪里的？",
        a: "StoryStep 会在你行走时监测 GPS 位置，靠近某个站点时自动播放下一段讲解——无需任何操作。",
      },
      {
        q: "讲解没有触发，该怎么办？",
        a: "在行程进行页面点击「跳过」或「重播」。伦敦市中心的高楼可能导致 GPS 漂移，讲解稍早或稍晚触发都是正常现象。",
      },
      {
        q: "锁屏后还能用吗？",
        a: "步行时请保持屏幕常亮。手机锁屏时，浏览器会暂停位置更新，因此在您解锁之前，下一站不会开始播放。",
      },
      {
        q: "全程都需要网络信号吗？",
        a: "需要，您需要移动数据。每一站的讲解会在您到达时加载（每站约 1 MB），信号较弱时可能会延迟几秒开始。",
      },
      {
        q: "「扫描地标」为什么需要权限？",
        a: "需要相机权限，才能查看你正对准的物体并尝试识别。不会保存任何内容——照片仅用于这一次识别。",
      },
    ],
    stillStuck: "还有问题？",
    stillStuckBody: "给我们留言，我们会尽快回复你。",
    contactUs: "联系我们",
    privacyPolicy: "隐私政策",
  },

  errorBoundary: {
    title: "出了点问题",
    body: "抱歉，此页面遇到了意外错误。请重试；如果问题持续出现，请联系我们。",
    tryAgain: "重试",
  },

  comingSoonScreen: {
    title: "{{city}} · 即将推出",
    body: "StoryStep 的{{city}}步行行程仍在制作中，敬请期待——与此同时，伦敦、巴黎和牛津的行程已经可以体验了。",
    browseAvailable: "浏览现有行程",
    back: "返回",
  },

  contact: {
    title: "联系我们",
    subtitle: "告诉我们发生了什么，我们会尽快回复你。",
    messagePlaceholder: "发生了什么？",
    sendButton: "发送消息",
    errorEmptyMessage: "发送前请先填写消息内容。",
    errorBody: "发送失败——请检查网络连接后重试。",
    successBody: "谢谢——你的消息已发送。我们会尽快回复你。",
    notConfigured: "联系表单尚未设置——请直接给我们发邮件。",
  },

  legal: {
    englishOnlyNote: "为确保准确性，本法律文件目前仅提供英文版本——应用的其余部分均已翻译。",
  },

  purchase: {
    completeTitle: "购买成功",
    completeBody: "你现在已解锁 {{name}} 的完整内容。",
    thisTour: "这条行程",
    subscriptionActiveTitle: "订阅已激活",
    weeklyActiveBody: "未来 7 天内可畅玩所有行程。",
    monthlyActiveBody: "未来 30 天内可畅玩所有行程。",
  },
};

export default zh;

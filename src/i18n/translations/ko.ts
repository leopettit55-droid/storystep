import type { TranslationDict } from "./en";

const ko: TranslationDict = {
  nav: { home: "홈", map: "3D 지도", tours: "투어", account: "계정", help: "도움말" },

  common: {
    free: "무료",
    min: "분",
    km: "km",
    stops: "개 정류장",
    from: "부터",
    easy: "쉬움",
    moderate: "보통",
    hard: "어려움",
    comingSoon: "출시 예정",
    start: "출발",
    you: "나",
  },

  language: {
    picker: "언어",
    title: "언어 선택",
  },

  landing: {
    exploreButton: "탐험하기",
  },

  home: {
    heroSubtitle: "런던, 파리, 옥스퍼드 등을 위한 AI 내레이션 도보 가이드 — 헤드폰을 끼고 세상을 탐험하세요.",
    statsTours: "투어",
    statsCities: "도시",
    statsFrom: "부터",
    browseTours: "투어 둘러보기",
    exploreIn3D: "3D로 탐험하기 →",
    whoWeAreTitle: "우리 소개",
    whoWeAreBody:
      "저희는 평범한 거리 뒤에 숨겨진 이야기에 푹 빠진 작은 팀입니다. StoryStep은 도시를 걸으며 눈앞의 풍경을 실제로 이해할 수 있도록 만들어졌습니다 — 가이드북에 얼굴을 파묻는 대신, 주머니 속의 가이드가 되어드립니다.",
    whyTitle: "StoryStep을 선택해야 하는 이유",
    featureGpsTitle: "GPS 기반 자동 내레이션",
    featureGpsBody: "걷는 동안 따로 탭할 필요가 없습니다. 정류장에 도착하면 휴대폰이 자동으로 다음 구간을 재생합니다.",
    featureNarratorTitle: "로봇이 아닌 진짜 내레이터",
    featureNarratorBody: "모든 투어는 합성 음성이 아닌, 자연스러운 영국인 내레이터 한 명이 처음부터 끝까지 들려줍니다.",
    featureScanTitle: "랜드마크 스캔",
    featureScanBody: "잘 모르는 건물에 카메라를 비추면 StoryStep이 즉시 식별을 시도합니다.",
    featureOfflineTitle: "도보 중 오프라인에서도 작동",
    featureOfflineBody: "내레이션 오디오는 미리 다운로드되므로, 다리 밑처럼 통신이 불안정한 곳에서도 끊기지 않습니다.",
    scanCardTitle: "랜드마크 스캔",
    scanCardBody: "건물에 카메라를 비추면 StoryStep이 그것이 무엇인지 알려드립니다.",
    featuredToursTitle: "추천 투어",
    howItWorksTitle: "이용 방법",
    step1: "투어 탭에서 투어를 선택하세요.",
    step2: "표시된 출발 지점까지 걸어가세요.",
    step3: "그냥 걸으세요 — 각 정류장을 지날 때마다 내레이션이 자동으로 재생됩니다.",
    pricingTitle: "요금제",
    singleTourTitle: "단일 투어",
    singleTourBody: "투어 하나를 영구 소장하세요. 구독 불필요.",
    weeklyBadge: "가장 유연함",
    weeklyTitle: "주간 무제한",
    weeklyBody: "7일간 모든 투어를 무제한으로 이용하세요.",
    monthlyTitle: "월간 무제한",
    monthlyBody: "30일간 모든 투어를 무제한으로 이용하세요.",
    ctaTitle: "새로운 시각으로 도시를 만날 준비가 되셨나요?",
    ctaBody: "거리를 선택하고, 헤드폰을 끼고, 그냥 걸으세요.",
    ctaButton: "투어 둘러보기 →",
    footerPrivacy: "개인정보처리방침",
    footerTerms: "이용약관",
    footerHelp: "도움말",
    footerCopy: "© 2026 StoryStep. All rights reserved.",
  },

  tours: {
    title: "투어",
    subtitle: "동네를 선택하고, 헤드폰을 끼고 걸으며 안내를 따라가세요.",
    moreCitiesTitle: "더 많은 도시",
  },

  map: {
    title: "3D로 탐험",
    subtitle: "실제 거리와 건물 — 드래그로 이동, 스크롤로 확대/축소, 우클릭 드래그로 기울이기",
    loadIssueTitle: "지도 이미지를 불러올 수 없습니다",
    loadIssueBody: "연결 상태를 확인해 주세요 — 3D 지도가 없어도 투어는 정상적으로 이용할 수 있습니다.",
  },

  account: {
    title: "계정",
    darkMode: "다크 모드",
    unlimitedTours: "투어 무제한 이용",
    planActive: "{{plan}} 요금제 활성화됨 — {{date}}에 갱신되거나 만료됩니다.",
    planWeekly: "주간",
    planMonthly: "월간",
    skipPaying: "투어별로 결제할 필요 없이 — 요금제가 활성화된 동안 모든 투어를 무제한 이용할 수 있습니다.",
    weekly: "주간",
    monthly: "월간",
    manageOrCancel: "구독 관리 또는 취소",
    cancelFallback: "취소하려면 구독할 때 사용한 이메일 주소로 저희에게 연락해 주세요.",
    createAccountTitle: "계정 만들기",
    storedLocally: "현재는 이 기기에만 저장됩니다 — 아직 서버가 없어 다른 기기와 동기화되지 않습니다.",
    namePlaceholder: "이름",
    emailPlaceholder: "이메일",
    passwordPlaceholder: "비밀번호",
    errorFillIn: "이름, 이메일, 비밀번호를 입력해 주세요.",
    errorInvalidEmail: "올바른 이메일 주소가 아닌 것 같습니다.",
    createAccountButton: "계정 만들기",
    signOut: "로그아웃",
    downloadedTours: "다운로드한 투어",
    downloadedToursBody: "메이페어 — 내레이션이 앱에 포함되어 있습니다",
    aboutTitle: "정보",
    aboutBody: "StoryStep · 버전 1.0.0 (프로토타입)",
    paymentsNotSetTitle: "결제가 아직 설정되지 않았습니다",
    paymentsNotSetBodySub: "구독을 활성화하려면 src/purchases/stripeConfig.ts에 Stripe 결제 링크 URL을 추가하세요.",
  },

  tourPreview: {
    useScanner: "랜드마크 스캐너 사용하기",
    scannerFree: "무료 — 투어 구매 불필요",
    getMeToStart: "출발 지점으로 안내",
    buyTour: "투어 구매 — {{price}}",
    startsAt: "출발지: {{label}}",
    paymentsNotSetTitle: "결제가 아직 설정되지 않았습니다",
    paymentsNotSetBody: "구매를 활성화하려면 src/purchases/stripeConfig.ts에 Stripe 결제 링크 URL을 추가하세요.",
    areaNotFound: "투어를 찾을 수 없습니다",
  },

  getToStart: {
    title: "출발 지점으로 이동",
    permissionDenied: "위치 권한이 거부되었습니다 — 실시간 경로 안내를 보려면 설정에서 활성화해 주세요.",
    findingYou: "위치 확인 중…",
    directions: "약 {{distance}}m 남았습니다, {{bearing}} 방향.",
    openInMaps: "Google 지도에서 열기",
    startButton: "도착했어요 — 투어 시작",
    starting: "시작하는 중…",
    areaNotFound: "투어를 찾을 수 없습니다",
  },

  activeTour: {
    stopOf: "{{total}}개 중 {{current}}번째 정류장",
    walkingToFirst: "첫 번째 정류장으로 이동 중…",
    back: "이전",
    skip: "건너뛰기",
    scanLandmarks: "랜드마크 스캔",
    replayLink: "이 구간 다시 재생",
    offRoute: "경로를 벗어난 것 같습니다 — 가능한 한 빨리 {{waypoint}} 방향으로 돌아가세요.",
    offRouteFallback: "마지막 정류장",
    tourComplete: "투어 완료",
    tourCompleteBody: "{{area}} 투어를 모두 마쳤습니다. 즐거운 시간이었기를 바랍니다.",
    backToAreas: "투어 목록으로 돌아가기",
    areaNotFound: "투어를 찾을 수 없습니다",
  },

  camera: {
    permissionTitle: "카메라 접근이 필요합니다",
    permissionBody: "휴대폰을 랜드마크에 비추면 StoryStep이 식별을 시도합니다. 먼저 카메라 접근 권한이 필요합니다.",
    allowCamera: "카메라 허용",
    back: "이전",
    close: "닫기",
    noKey: "Vision API 키가 설정되지 않았습니다 — app.json에서 extra.googleVisionApiKey를 설정하세요.",
    hint: "아무것도 인식하지 못했습니다 — 건물 전체가 화면 중앙에 오도록 하고 흔들리지 않게 잡아보세요.",
    matchPercent: "일치율 {{percent}}%",
    noScriptFallback: "Google의 랜드마크 데이터베이스로 인식되었지만 아직 자체 설명은 없습니다.",
    scanButton: "보고 있는 것 스캔하기",
    errorCouldntCapture: "사진을 촬영하지 못했습니다.",
    errorGeneric: "문제가 발생했습니다.",
  },

  help: {
    title: "도움말",
    subtitle: "도보 투어에 대한 자주 묻는 질문.",
    faqs: [
      {
        q: "내레이션이 제 위치를 어떻게 아나요?",
        a: "StoryStep은 걷는 동안 GPS 위치를 확인하여, 정류장에 가까워지면 자동으로 다음 구간을 재생합니다 — 아무것도 탭할 필요가 없습니다.",
      },
      {
        q: "내레이션이 재생되지 않았어요. 어떻게 해야 하나요?",
        a: "활성 투어 화면에서 건너뛰기 또는 다시 재생을 탭하세요. 런던 도심의 고층 건물은 GPS 오차를 일으킬 수 있으므로, 구간이 조금 일찍 또는 늦게 시작되는 것은 정상입니다.",
      },
      {
        q: "휴대폰이 잠겨 있어도 작동하나요?",
        a: "걷는 동안 화면을 켜 두세요. 휴대폰이 잠겨 있으면 브라우저가 위치 업데이트를 멈추기 때문에, 잠금을 해제할 때까지 다음 정류장이 시작되지 않습니다.",
      },
      {
        q: "걷는 내내 통신 신호가 필요한가요?",
        a: "네, 모바일 데이터가 필요합니다. 각 정류장의 내레이션은 그곳에 도착할 때 불러옵니다(정류장당 약 1MB). 신호가 약하면 몇 초 늦게 시작될 수 있습니다.",
      },
      {
        q: "\"랜드마크 스캔\"에는 왜 권한이 필요한가요?",
        a: "카메라 접근이 필요한 이유는 사용자가 향하고 있는 대상을 보고 식별을 시도하기 위해서입니다. 아무것도 저장되지 않으며, 사진은 해당 조회에만 사용됩니다.",
      },
    ],
    stillStuck: "아직 해결되지 않았나요?",
    stillStuckBody: "메시지를 보내주시면 답변드리겠습니다.",
    contactUs: "문의하기",
    privacyPolicy: "개인정보처리방침",
  },

  errorBoundary: {
    title: "문제가 발생했습니다",
    body: "죄송합니다 — 이 화면에서 예상치 못한 오류가 발생했습니다. 다시 시도해 주세요. 계속 발생하면 저희에게 알려주세요.",
    tryAgain: "다시 시도",
  },

  comingSoonScreen: {
    title: "{{city}} — 출시 예정",
    body: "{{city}}의 StoryStep 도보 투어를 아직 준비 중입니다. 곧 다시 확인해 주세요 — 그동안 런던, 파리, 옥스퍼드 투어를 이용하실 수 있습니다.",
    browseAvailable: "이용 가능한 투어 보기",
    back: "이전",
  },

  contact: {
    title: "문의하기",
    subtitle: "무슨 일인지 알려주시면 답변드리겠습니다.",
    messagePlaceholder: "무슨 일인가요?",
    sendButton: "메시지 보내기",
    errorEmptyMessage: "보내기 전에 메시지를 작성해 주세요.",
    errorBody: "전송하지 못했습니다 — 연결 상태를 확인하고 다시 시도해 주세요.",
    successBody: "감사합니다 — 메시지가 전송되었습니다. 곧 답변드리겠습니다.",
    notConfigured: "문의 양식이 아직 설정되지 않았습니다 — 대신 직접 이메일을 보내주세요.",
  },

  legal: {
    englishOnlyNote:
      "정확성을 위해 이 법적 문서는 현재 영어로만 제공됩니다 — 앱의 나머지 부분은 번역되어 있습니다.",
  },

  purchase: {
    completeTitle: "구매 완료",
    completeBody: "이제 {{name}}에 대한 전체 접근 권한이 있습니다.",
    thisTour: "이 투어",
    subscriptionActiveTitle: "구독 활성화됨",
    weeklyActiveBody: "앞으로 7일간 투어를 무제한으로 이용할 수 있습니다.",
    monthlyActiveBody: "앞으로 30일간 투어를 무제한으로 이용할 수 있습니다.",
  },
};

export default ko;

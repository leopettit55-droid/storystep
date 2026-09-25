import type { TranslationDict } from "./en";

const ja: TranslationDict = {
  nav: { home: "ホーム", map: "3Dマップ", tours: "ツアー", account: "アカウント", help: "ヘルプ" },

  common: {
    min: "分",
    km: "km",
    stops: "ストップ",
    from: "〜",
    easy: "かんたん",
    moderate: "ふつう",
    hard: "むずかしい",
    comingSoon: "近日公開",
    start: "スタート",
    you: "あなた",
  },

  language: {
    picker: "言語",
    title: "言語を選択",
  },

  landing: {
    exploreButton: "探索する",
  },

  home: {
    heroSubtitle: "AIナレーション付きのロンドン、パリ、オックスフォードなどの徒歩ツアーガイド——ヘッドホンをつけて、世界を探索しよう。",
    statsTours: "ツアー",
    statsCities: "都市",
    statsFrom: "〜",
    browseTours: "ツアーを見る",
    exploreIn3D: "3Dで探索 →",
    whoWeAreTitle: "私たちについて",
    whoWeAreBody:
      "私たちは、なんでもない通りに隠された物語に夢中な小さなチームです。StoryStepは、街を歩きながら目の前にあるものを本当に理解できるように——ガイドブックに顔を埋めるのではなく、ポケットの中のガイドとして存在します。",
    whyTitle: "StoryStepの特長",
    featureGpsTitle: "GPS連動ナレーション",
    featureGpsBody: "歩きながらタップする必要はありません。スポットに到着すると、スマホが自動的に次のナレーションを再生します。",
    featureNarratorTitle: "ロボットではなく本物のナレーター",
    featureNarratorBody: "すべてのツアーは、合成音声ではなく、一人の自然なイギリス人ナレーターが最初から最後まで語ります。",
    featureScanTitle: "ランドマークをスキャン",
    featureScanBody: "見覚えのない建物にカメラを向けると、StoryStepがその場で識別を試みます。",
    featureOfflineTitle: "歩行中はオフラインでも利用可能",
    featureOfflineBody: "ナレーション音声は事前にダウンロードされるので、橋の下などで通信が不安定でも途切れません。",
    scanCardTitle: "ランドマークをスキャン",
    scanCardBody: "建物にカメラを向けると、StoryStepがそれが何かを教えてくれます。",
    featuredToursTitle: "おすすめツアー",
    howItWorksTitle: "使い方",
    step1: "「ツアー」タブでツアーを選ぶ。",
    step2: "指定された出発地点まで歩く。",
    step3: "あとは歩くだけ——各スポットを通過すると自動でナレーションが再生されます。",
    pricingTitle: "料金",
    singleTourTitle: "シングルツアー",
    singleTourBody: "1つのツアーを永久に所有。サブスクリプション不要。",
    weeklyBadge: "最も柔軟",
    weeklyTitle: "週間乗り放題",
    weeklyBody: "7日間、すべてのツアーが乗り放題。",
    monthlyTitle: "月間乗り放題",
    monthlyBody: "30日間、すべてのツアーが乗り放題。",
    ctaTitle: "新しい視点で街を見る準備はできましたか？",
    ctaBody: "通りを選んで、ヘッドホンをつけて、あとは歩くだけ。",
    ctaButton: "ツアーを見る →",
    footerPrivacy: "プライバシーポリシー",
    footerTerms: "利用規約",
    footerHelp: "ヘルプ",
    footerCopy: "© 2026 StoryStep. All rights reserved.",
  },

  tours: {
    title: "ツアー",
    subtitle: "エリアを選んで、ヘッドホンをつけて歩くだけ。あとは案内にお任せください。",
    moreCitiesTitle: "その他の都市",
  },

  map: {
    title: "3Dで探索",
    subtitle: "実際の通りと建物——ドラッグで移動、スクロールでズーム、右クリックドラッグで傾き調整",
    loadIssueTitle: "マップの画像が読み込めません",
    loadIssueBody: "通信状況をご確認ください——3Dマップがなくてもツアーは利用できます。",
  },

  account: {
    title: "アカウント",
    darkMode: "ダークモード",
    unlimitedTours: "ツアー乗り放題",
    planActive: "{{plan}}プランが有効です——{{date}}に更新または終了します。",
    planWeekly: "週間",
    planMonthly: "月間",
    skipPaying: "ツアーごとの支払いは不要——プラン有効中はすべてのツアーにアクセスできます。",
    weekly: "週間",
    monthly: "月間",
    manageOrCancel: "サブスクリプションを管理・解約",
    cancelFallback: "解約するには、登録時のメールアドレスからサポートまでご連絡ください。",
    createAccountTitle: "アカウントを作成",
    storedLocally: "現在はこの端末にのみ保存されます——まだサーバーがないため、他の端末とは同期されません。",
    namePlaceholder: "名前",
    emailPlaceholder: "メールアドレス",
    passwordPlaceholder: "パスワード",
    errorFillIn: "名前、メールアドレス、パスワードを入力してください。",
    errorInvalidEmail: "有効なメールアドレスではないようです。",
    createAccountButton: "アカウントを作成",
    signOut: "サインアウト",
    downloadedTours: "ダウンロード済みツアー",
    downloadedToursBody: "メイフェア——ナレーションはアプリに同梱済み",
    aboutTitle: "アプリについて",
    aboutBody: "StoryStep · バージョン 1.0.0（プロトタイプ）",
    paymentsNotSetTitle: "決済が未設定です",
    paymentsNotSetBodySub: "src/purchases/stripeConfig.ts にStripe Payment LinkのURLを追加してサブスクリプションを有効にしてください。",
  },

  tourPreview: {
    useScanner: "ランドマークスキャナーを使う",
    scannerFree: "無料 — ツアーの購入は不要",
    getMeToStart: "出発地点まで案内する",
    buyTour: "ツアーを購入 — {{price}}",
    startsAt: "出発地点：{{label}}",
    paymentsNotSetTitle: "決済が未設定です",
    paymentsNotSetBody: "src/purchases/stripeConfig.ts にStripe Payment LinkのURLを追加して購入を有効にしてください。",
    areaNotFound: "ツアーが見つかりません",
  },

  getToStart: {
    title: "出発地点へ向かう",
    permissionDenied: "位置情報の許可が拒否されました——設定でオンにするとリアルタイムのルート案内が表示されます。",
    findingYou: "現在地を確認中…",
    directions: "あと約{{distance}}m、{{bearing}}方向です。",
    openInMaps: "Google マップで開く",
    startButton: "到着しました——ツアーを開始",
    starting: "開始しています…",
    areaNotFound: "ツアーが見つかりません",
  },

  activeTour: {
    stopOf: "{{total}}か所中{{current}}か所目",
    walkingToFirst: "最初のスポットへ向かっています…",
    back: "戻る",
    skip: "スキップ",
    scanLandmarks: "ランドマークをスキャン",
    replayLink: "この区間をもう一度再生",
    offRoute: "ルートから外れているようです——{{waypoint}}方面に戻ってください。",
    offRouteFallback: "直前のスポット",
    tourComplete: "ツアー完了",
    tourCompleteBody: "{{area}}のツアーをすべて歩き終えました。楽しんでいただけたなら幸いです。",
    backToAreas: "ツアー一覧に戻る",
    areaNotFound: "ツアーが見つかりません",
  },

  camera: {
    permissionTitle: "カメラへのアクセスが必要です",
    permissionBody: "スマホをランドマークに向けると、StoryStepが識別を試みます。まずカメラへのアクセスが必要です。",
    allowCamera: "カメラを許可",
    back: "戻る",
    close: "閉じる",
    noKey: "Vision APIキーが設定されていません——app.jsonにextra.googleVisionApiKeyを設定してください。",
    hint: "何も認識できませんでした——建物全体が画面中央に入るようにして、しっかり構えてみてください。",
    matchPercent: "一致度 {{percent}}%",
    noScriptFallback: "Googleのランドマークデータベースで認識されましたが、まだ独自の解説はありません。",
    scanButton: "見ているものをスキャン",
    errorCouldntCapture: "写真を撮影できませんでした。",
    errorGeneric: "問題が発生しました。",
  },

  help: {
    title: "ヘルプ",
    subtitle: "徒歩ツアーに関するよくある質問。",
    faqs: [
      {
        q: "ナレーションはどうやって現在地を把握しているのですか？",
        a: "StoryStepは歩行中にGPS位置を監視し、スポットに近づくと自動的に次の区間を再生します——何もタップする必要はありません。",
      },
      {
        q: "ナレーションが再生されませんでした。どうすればいいですか？",
        a: "アクティブツアー画面の「スキップ」または「もう一度再生」をタップしてください。ロンドン中心部の高層ビルはGPSのずれを引き起こすことがあるため、区間が少し早めや遅めに始まるのは正常です。",
      },
      {
        q: "スマホがロックされていても動作しますか？",
        a: "はい——「常に」位置情報アクセスを許可していれば、画面オフでもバックグラウンド音声の再生と位置情報による区間の切り替えは続きます。",
      },
      {
        q: "散歩の間ずっと通信は必要ですか？",
        a: "いいえ。ナレーション音声は事前にダウンロードされるため、通信が不安定でも再生され続けます——歩行中はGPSのみ必要です。",
      },
      {
        q: "「ランドマークをスキャン」にはなぜ許可が必要なのですか？",
        a: "カメラへのアクセスが必要なのは、あなたが向けているものを見て識別を試みるためです。何も保存されません——写真はその1回の検索にのみ使用されます。",
      },
    ],
    stillStuck: "まだ解決しませんか？",
    stillStuckBody: "メッセージをお送りください。折り返しご連絡します。",
    contactUs: "お問い合わせ",
    privacyPolicy: "プライバシーポリシー",
  },

  errorBoundary: {
    title: "問題が発生しました",
    body: "申し訳ございません——この画面で予期しないエラーが発生しました。もう一度お試しください。繰り返し発生する場合はサポートまでご連絡ください。",
    tryAgain: "再試行",
  },

  comingSoonScreen: {
    title: "{{city}} — 近日公開",
    body: "{{city}}のStoryStepウォーキングツアーは現在準備中です。またのご確認をお待ちしております——その間、ロンドン、パリ、オックスフォードのツアーをお楽しみいただけます。",
    browseAvailable: "利用可能なツアーを見る",
    back: "戻る",
  },

  contact: {
    title: "お問い合わせ",
    subtitle: "状況を教えていただければ、こちらからご連絡します。",
    messagePlaceholder: "どうされましたか？",
    sendButton: "メッセージを送信",
    errorEmptyMessage: "送信する前にメッセージを入力してください。",
    errorBody: "送信できませんでした——接続を確認して再度お試しください。",
    successBody: "ありがとうございます——メッセージが送信されました。まもなくご連絡します。",
    notConfigured: "お問い合わせフォームはまだ設定されていません——直接メールでご連絡ください。",
  },

  legal: {
    englishOnlyNote:
      "正確性を保つため、この法的文書は現在英語のみでご利用いただけます——アプリの他の部分は翻訳済みです。",
  },

  purchase: {
    completeTitle: "購入完了",
    completeBody: "{{name}}にフルアクセスできるようになりました。",
    thisTour: "このツアー",
    subscriptionActiveTitle: "サブスクリプション有効",
    weeklyActiveBody: "今後7日間、ツアーが乗り放題です。",
    monthlyActiveBody: "今後30日間、ツアーが乗り放題です。",
  },
};

export default ja;

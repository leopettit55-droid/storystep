const CITY_NAMES: Record<string, Partial<Record<"zh" | "es" | "fr", string>>> = {
  // Live cities
  London: { zh: "伦敦", es: "Londres", fr: "Londres" },
  Paris: { zh: "巴黎", es: "París", fr: "Paris" },
  Oxford: { zh: "牛津", es: "Oxford", fr: "Oxford" },

  // Coming soon — Europe
  Rome: { zh: "罗马", es: "Roma", fr: "Rome" },
  Venice: { zh: "威尼斯", es: "Venecia", fr: "Venise" },
  Florence: { zh: "佛罗伦萨", es: "Florencia", fr: "Florence" },
  Milan: { zh: "米兰", es: "Milán", fr: "Milan" },
  Barcelona: { zh: "巴塞罗那", es: "Barcelona", fr: "Barcelone" },
  Madrid: { zh: "马德里", es: "Madrid", fr: "Madrid" },
  Lisbon: { zh: "里斯本", es: "Lisboa", fr: "Lisbonne" },
  Berlin: { zh: "柏林", es: "Berlín", fr: "Berlin" },
  Munich: { zh: "慕尼黑", es: "Múnich", fr: "Munich" },
  Amsterdam: { zh: "阿姆斯特丹", es: "Ámsterdam", fr: "Amsterdam" },
  Brussels: { zh: "布鲁塞尔", es: "Bruselas", fr: "Bruxelles" },
  Vienna: { zh: "维也纳", es: "Viena", fr: "Vienne" },
  Zurich: { zh: "苏黎世", es: "Zúrich", fr: "Zurich" },
  Prague: { zh: "布拉格", es: "Praga", fr: "Prague" },
  Budapest: { zh: "布达佩斯", es: "Budapest", fr: "Budapest" },
  Warsaw: { zh: "华沙", es: "Varsovia", fr: "Varsovie" },
  Copenhagen: { zh: "哥本哈根", es: "Copenhague", fr: "Copenhague" },
  Stockholm: { zh: "斯德哥尔摩", es: "Estocolmo", fr: "Stockholm" },
  Oslo: { zh: "奥斯陆", es: "Oslo", fr: "Oslo" },
  Dublin: { zh: "都柏林", es: "Dublín", fr: "Dublin" },
  Edinburgh: { zh: "爱丁堡", es: "Edimburgo", fr: "Édimbourg" },
  Athens: { zh: "雅典", es: "Atenas", fr: "Athènes" },
  Istanbul: { zh: "伊斯坦布尔", es: "Estambul", fr: "Istanbul" },
  Moscow: { zh: "莫斯科", es: "Moscú", fr: "Moscou" },

  // Coming soon — Americas
  "New York": { zh: "纽约", es: "Nueva York", fr: "New York" },
  "Washington, D.C.": { zh: "华盛顿特区", es: "Washington, D.C.", fr: "Washington, D.C." },
  "San Francisco": { zh: "旧金山", es: "San Francisco", fr: "San Francisco" },
  "Los Angeles": { zh: "洛杉矶", es: "Los Ángeles", fr: "Los Angeles" },
  Chicago: { zh: "芝加哥", es: "Chicago", fr: "Chicago" },
  Toronto: { zh: "多伦多", es: "Toronto", fr: "Toronto" },
  "Mexico City": { zh: "墨西哥城", es: "Ciudad de México", fr: "Mexico" },
  "Rio de Janeiro": { zh: "里约热内卢", es: "Río de Janeiro", fr: "Rio de Janeiro" },
  "Buenos Aires": { zh: "布宜诺斯艾利斯", es: "Buenos Aires", fr: "Buenos Aires" },
  Lima: { zh: "利马", es: "Lima", fr: "Lima" },

  // Coming soon — Asia
  Tokyo: { zh: "东京", es: "Tokio", fr: "Tokyo" },
  Kyoto: { zh: "京都", es: "Kioto", fr: "Kyoto" },
  Seoul: { zh: "首尔", es: "Seúl", fr: "Séoul" },
  Beijing: { zh: "北京", es: "Pekín", fr: "Pékin" },
  Shanghai: { zh: "上海", es: "Shanghái", fr: "Shanghai" },
  "Hong Kong": { zh: "香港", es: "Hong Kong", fr: "Hong Kong" },
  Singapore: { zh: "新加坡", es: "Singapur", fr: "Singapour" },
  Bangkok: { zh: "曼谷", es: "Bangkok", fr: "Bangkok" },
  Dubai: { zh: "迪拜", es: "Dubái", fr: "Dubaï" },
  Mumbai: { zh: "孟买", es: "Bombay", fr: "Bombay" },
  Delhi: { zh: "德里", es: "Delhi", fr: "Delhi" },

  // Coming soon — Africa & Oceania
  Cairo: { zh: "开罗", es: "El Cairo", fr: "Le Caire" },
  Marrakech: { zh: "马拉喀什", es: "Marrakech", fr: "Marrakech" },
  "Cape Town": { zh: "开普敦", es: "Ciudad del Cabo", fr: "Le Cap" },
  Sydney: { zh: "悉尼", es: "Sídney", fr: "Sydney" },
  Melbourne: { zh: "墨尔本", es: "Melbourne", fr: "Melbourne" },
  Auckland: { zh: "奥克兰", es: "Auckland", fr: "Auckland" },
};

export function localizedCityName(city: string, language: string): string {
  return CITY_NAMES[city]?.[language as "zh" | "es" | "fr"] ?? city;
}

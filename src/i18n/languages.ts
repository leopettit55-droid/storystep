export interface LanguageOption {
  code: string;
  /** Name shown in that language's own script — how real language pickers list themselves. */
  nativeName: string;
  englishName: string;
}

/**
 * English, then Chinese/Mandarin, Spanish, French — required first four —
 * followed by the rest of the common languages you'd see in a real app's
 * language picker. Only en/zh/es/fr have full translations today; any other
 * code falls back to English string-by-string (see LanguageContext).
 */
export const LANGUAGES: LanguageOption[] = [
  { code: "en", nativeName: "English", englishName: "English" },
  { code: "zh", nativeName: "中文（普通话）", englishName: "Chinese (Mandarin)" },
  { code: "es", nativeName: "Español", englishName: "Spanish" },
  { code: "fr", nativeName: "Français", englishName: "French" },
  { code: "de", nativeName: "Deutsch", englishName: "German" },
  { code: "it", nativeName: "Italiano", englishName: "Italian" },
  { code: "pt", nativeName: "Português", englishName: "Portuguese" },
  { code: "ja", nativeName: "日本語", englishName: "Japanese" },
  { code: "ko", nativeName: "한국어", englishName: "Korean" },
  { code: "ar", nativeName: "العربية", englishName: "Arabic" },
  { code: "ru", nativeName: "Русский", englishName: "Russian" },
  { code: "hi", nativeName: "हिन्दी", englishName: "Hindi" },
  { code: "nl", nativeName: "Nederlands", englishName: "Dutch" },
  { code: "tr", nativeName: "Türkçe", englishName: "Turkish" },
  { code: "pl", nativeName: "Polski", englishName: "Polish" },
  { code: "sv", nativeName: "Svenska", englishName: "Swedish" },
  { code: "vi", nativeName: "Tiếng Việt", englishName: "Vietnamese" },
  { code: "th", nativeName: "ไทย", englishName: "Thai" },
  { code: "id", nativeName: "Bahasa Indonesia", englishName: "Indonesian" },
];

export const DEFAULT_LANGUAGE = "en";

import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Easing, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { tapLight } from "../haptics";
import { DEFAULT_LANGUAGE, LANGUAGES, type LanguageOption } from "../i18n/languages";
import { useTheme } from "../ThemeContext";
import type { ThemeColors } from "../theme";

/** "Choose your language" in each language, so the heading greets people in
 * their own language before anything has been picked. */
const HEADINGS: Record<string, string> = {
  en: "Choose your language",
  zh: "选择您的语言",
  es: "Elige tu idioma",
  fr: "Choisissez votre langue",
  de: "Wähle deine Sprache",
  it: "Scegli la tua lingua",
  pt: "Escolha o seu idioma",
  ja: "言語を選択してください",
  ko: "언어를 선택하세요",
  ar: "اختر لغتك",
  ru: "Выберите язык",
  hi: "अपनी भाषा चुनें",
  nl: "Kies je taal",
  tr: "Dilinizi seçin",
  pl: "Wybierz język",
  sv: "Välj ditt språk",
  vi: "Chọn ngôn ngữ của bạn",
  th: "เลือกภาษาของคุณ",
  id: "Pilih bahasa Anda",
};

/** The first of the browser's preferred languages that StoryStep offers. */
function browserLanguage(): string | null {
  if (typeof navigator === "undefined") return null;
  const preferred = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const tag of preferred) {
    const base = tag?.toLowerCase().split("-")[0];
    if (base && LANGUAGES.some((l) => l.code === base)) return base;
  }
  return null;
}

/** First page on web (shown by LanguageGate): a calm list of every language
 * the app speaks, each in its own script, with the browser's language first.
 * One tap picks it. */
export default function FirstLanguagePicker({
  current,
  onSelect,
}: {
  current: string;
  onSelect: (code: string) => void;
}) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { width } = useWindowDimensions();
  const twoColumns = width >= 600;

  // A language picked on an earlier visit wins; otherwise the browser's.
  const suggested = useMemo(
    () => (current !== DEFAULT_LANGUAGE ? current : browserLanguage() ?? DEFAULT_LANGUAGE),
    [current]
  );
  const ordered = useMemo(
    () => [...LANGUAGES].sort((a, b) => (a.code === suggested ? -1 : b.code === suggested ? 1 : 0)),
    [suggested]
  );
  const heading = HEADINGS[suggested] ?? HEADINGS.en;

  const [chosen, setChosen] = useState<string | null>(null);
  const appear = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(appear, {
      toValue: 1,
      duration: 320,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [appear]);

  const pick = (code: string) => {
    if (chosen) return;
    tapLight();
    setChosen(code);
    // A brief beat so the tick registers before the page fades away.
    setTimeout(() => onSelect(code), 180);
  };

  const selected = chosen ?? suggested;

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
      <Animated.View
        style={[
          styles.panel,
          {
            opacity: appear,
            transform: [{ translateY: appear.interpolate({ inputRange: [0, 1], outputRange: [8, 0] }) }],
          },
        ]}
      >
        <View style={styles.brand}>
          <View style={styles.logoMark}>
            <Text style={styles.logoMarkText}>S</Text>
          </View>
          <Text style={styles.logoText}>StoryStep</Text>
        </View>

        <Text style={styles.heading} role="heading">
          {heading}
        </Text>
        {heading !== HEADINGS.en && <Text style={styles.subheading}>{HEADINGS.en}</Text>}

        <View style={[styles.list, twoColumns && styles.listTwoColumns]} role="radiogroup">
          {ordered.map((option) => (
            <LanguageRow
              key={option.code}
              option={option}
              selected={selected === option.code}
              twoColumns={twoColumns}
              styles={styles}
              colors={colors}
              onPress={() => pick(option.code)}
            />
          ))}
        </View>
      </Animated.View>
    </ScrollView>
  );
}

function LanguageRow({
  option,
  selected,
  twoColumns,
  styles,
  colors,
  onPress,
}: {
  option: LanguageOption;
  selected: boolean;
  twoColumns: boolean;
  styles: ReturnType<typeof createStyles>;
  colors: ThemeColors;
  onPress: () => void;
}) {
  const showEnglish = option.englishName !== option.nativeName;
  return (
    <Pressable
      onPress={onPress}
      role="radio"
      aria-checked={selected}
      aria-label={showEnglish ? `${option.nativeName} (${option.englishName})` : option.nativeName}
      style={({ hovered, focused }: { hovered?: boolean; focused?: boolean; pressed: boolean }) => [
        styles.row,
        twoColumns && styles.rowTwoColumns,
        (hovered || focused) && styles.rowHover,
        selected && styles.rowSelected,
      ]}
    >
      <View style={styles.rowText}>
        <Text style={styles.nativeName} numberOfLines={1}>
          {option.nativeName}
        </Text>
        {showEnglish && (
          <Text style={styles.englishName} numberOfLines={1}>
            {option.englishName}
          </Text>
        )}
      </View>
      {selected && <Ionicons name="checkmark" size={20} color={colors.primary} />}
    </Pressable>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    scroll: { flex: 1, width: "100%" },
    scrollContent: { flexGrow: 1, justifyContent: "center", paddingHorizontal: 16, paddingVertical: 40 },
    panel: { width: "100%", maxWidth: 640, alignSelf: "center" },
    brand: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 32 },
    logoMark: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.primary,
      alignItems: "center",
      justifyContent: "center",
    },
    logoMarkText: { color: colors.onPrimary, fontSize: 16, fontWeight: "800" },
    logoText: { fontSize: 19, fontWeight: "800", color: colors.text },
    heading: { fontSize: 28, fontWeight: "700", color: colors.text, letterSpacing: -0.3 },
    subheading: { fontSize: 15, color: colors.textDim, marginTop: 6 },
    list: { marginTop: 28, gap: 8 },
    listTwoColumns: { flexDirection: "row", flexWrap: "wrap" },
    row: {
      flexDirection: "row",
      alignItems: "center",
      minHeight: 56,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      // @ts-expect-error web-only CSS
      transitionProperty: "border-color, background-color",
      transitionDuration: "150ms",
      cursor: "pointer",
      outlineStyle: "none",
    },
    // Two per row, with the 8px gap between them.
    rowTwoColumns: { width: "calc(50% - 4px)" as unknown as number },
    rowHover: { borderColor: colors.textFaint, backgroundColor: colors.surfaceRaised },
    rowSelected: { borderColor: colors.primary },
    rowText: { flex: 1, minWidth: 0 },
    // Left-aligned even for right-to-left scripts, so every row lines up.
    nativeName: { fontSize: 16, fontWeight: "600", color: colors.text, textAlign: "left" },
    englishName: { fontSize: 13, color: colors.textDim, marginTop: 2 },
  });
}

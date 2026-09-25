import { useMemo } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import BackButton from "../components/BackButton";
import {
  PRIVACY_POLICY_EFFECTIVE_DATE,
  PRIVACY_POLICY_INTRO,
  PRIVACY_POLICY_SECTIONS,
} from "../content/privacyPolicy";
import { useLanguage } from "../i18n/LanguageContext";
import { useTheme } from "../ThemeContext";
import type { ThemeColors } from "../theme";

export default function PrivacyPolicyScreen() {
  const { t, language } = useLanguage();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <BackButton variant="inline" style={styles.backButton} />
        <Text style={styles.title}>{t("home.footerPrivacy")}</Text>
        {language !== "en" && <Text style={styles.translationNote}>{t("legal.englishOnlyNote")}</Text>}
        <Text style={styles.effectiveDate}>
          Effective {PRIVACY_POLICY_EFFECTIVE_DATE}
        </Text>
        <Text style={styles.intro}>{PRIVACY_POLICY_INTRO}</Text>

        {PRIVACY_POLICY_SECTIONS.map((section) => (
          <View key={section.heading} style={styles.section}>
            <Text style={styles.heading}>{section.heading}</Text>
            <Text style={styles.body}>{section.body}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    scroll: { padding: 20, paddingTop: 24, paddingBottom: 40 },
    backButton: { marginBottom: 12 },
    title: { fontSize: 28, fontWeight: "700", color: colors.primary },
    translationNote: {
      fontSize: 12,
      color: colors.textDim,
      marginTop: 8,
      backgroundColor: colors.surfaceRaised,
      padding: 10,
      borderRadius: 10,
    },
    effectiveDate: { fontSize: 12, color: colors.textDim, marginTop: 4 },
    intro: { fontSize: 14, color: colors.textMid, marginTop: 16, lineHeight: 21 },
    section: { marginTop: 22 },
    heading: { fontSize: 16, fontWeight: "700", color: colors.text },
    body: { fontSize: 13, color: colors.textMid, marginTop: 8, lineHeight: 20 },
  });
}

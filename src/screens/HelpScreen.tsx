import { useNavigation } from "@react-navigation/native";
import { useMemo } from "react";
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import FadeInItem from "../components/FadeInItem";
import PressScale from "../components/PressScale";
import { useLanguage } from "../i18n/LanguageContext";
import type { TabScreenNav } from "../navigation/types";
import { useTheme } from "../ThemeContext";
import type { ThemeColors } from "../theme";

export default function HelpScreen() {
  const navigation = useNavigation<TabScreenNav<"Help">>();
  const { t, dict } = useLanguage();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const faqs = dict.help.faqs;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>{t("help.title")}</Text>
        <Text style={styles.subtitle}>{t("help.subtitle")}</Text>

        {faqs.map((item, index) => (
          <FadeInItem key={item.q} index={index}>
            <View style={styles.card}>
              <Text style={styles.question}>{item.q}</Text>
              <Text style={styles.answer}>{item.a}</Text>
            </View>
          </FadeInItem>
        ))}

        <View style={styles.contactCard}>
          <Text style={styles.contactTitle}>{t("help.stillStuck")}</Text>
          <Text style={styles.contactBody}>{t("help.stillStuckBody")}</Text>
          <PressScale
            style={styles.contactButton}
            scaleTo={0.95}
            onPress={() => navigation.navigate("ContactUs")}
          >
            <Text style={styles.contactButtonText}>{t("help.contactUs")}</Text>
          </PressScale>
        </View>

        <Pressable
          style={styles.legalLink}
          onPress={() => navigation.navigate("PrivacyPolicy")}
        >
          <Text style={styles.legalLinkText}>{t("help.privacyPolicy")}</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: 20, paddingTop: 24, gap: 12 },
  title: { fontSize: 32, fontWeight: "700", color: colors.primary },
  subtitle: { fontSize: 14, color: colors.textMid, marginTop: -6, marginBottom: 6 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  question: { fontSize: 15, fontWeight: "700", color: colors.text },
  answer: { fontSize: 13, color: colors.textMid, marginTop: 6, lineHeight: 19 },
  contactCard: {
    backgroundColor: colors.surfaceRaised,
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
    alignItems: "flex-start",
  },
  contactTitle: { fontSize: 17, fontWeight: "700", color: colors.text },
  contactBody: { fontSize: 13, color: colors.textMid, marginTop: 4, marginBottom: 14 },
  contactButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 22,
  },
  contactButtonText: { color: colors.onPrimary, fontSize: 14, fontWeight: "700" },
  legalLink: { alignSelf: "center", marginTop: 20, padding: 8 },
  legalLinkText: { fontSize: 13, color: colors.textDim, textDecorationLine: "underline" },
  });
}

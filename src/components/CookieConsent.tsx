import { Pressable, StyleSheet, Text, View } from "react-native";
import { analyticsConfigured } from "../analytics";
import { useConsentStore } from "../analytics/consent";
import { useLanguage } from "../i18n/LanguageContext";
import { useTheme } from "../ThemeContext";

/** Asks once whether StoryStep may collect usage stats. Nothing is tracked
 * until the visitor taps Accept. */
export default function CookieConsent({ onOpenPrivacy }: { onOpenPrivacy: () => void }) {
  const { t } = useLanguage();
  const { colors } = useTheme();
  const { loaded, status, setConsent } = useConsentStore();

  if (!analyticsConfigured || !loaded || status !== "unknown") return null;

  return (
    <View
      style={styles.wrap}
      pointerEvents="box-none"
      role="dialog"
      aria-label={t("consent.title")}
    >
      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.text }]}>{t("consent.title")}</Text>
        <Text style={[styles.body, { color: colors.text }]}>
          {t("consent.body")}{" "}
          <Text style={[styles.link, { color: colors.primary }]} onPress={onOpenPrivacy} role="link">
            {t("consent.privacyLink")}
          </Text>
        </Text>
        <View style={styles.row}>
          <Pressable style={[styles.button, styles.secondary, { borderColor: colors.border }]} onPress={() => setConsent(false)}>
            <Text style={[styles.buttonText, { color: colors.text }]}>{t("consent.decline")}</Text>
          </Pressable>
          <Pressable style={[styles.button, { backgroundColor: colors.primary }]} onPress={() => setConsent(true)}>
            <Text style={[styles.buttonText, styles.primaryText]}>{t("consent.accept")}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: "absolute", left: 0, right: 0, bottom: 0, paddingHorizontal: 16, paddingBottom: 32, alignItems: "center" },
  card: { width: "100%", maxWidth: 520, borderRadius: 16, borderWidth: 1, padding: 18, gap: 10, shadowColor: "#000", shadowOpacity: 0.15, shadowRadius: 16, shadowOffset: { width: 0, height: 4 }, elevation: 6 },
  title: { fontSize: 16, fontWeight: "700" },
  body: { fontSize: 14, lineHeight: 20 },
  link: { textDecorationLine: "underline" },
  row: { flexDirection: "row", gap: 10, justifyContent: "flex-end", flexWrap: "wrap" },
  button: { paddingVertical: 10, paddingHorizontal: 18, borderRadius: 999 },
  secondary: { borderWidth: 1 },
  buttonText: { fontSize: 14, fontWeight: "600" },
  primaryText: { color: "#fff" },
});

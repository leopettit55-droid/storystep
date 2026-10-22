import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";
import { useLanguage } from "../i18n/LanguageContext";

/** The small "BETA" pill shown next to the StoryStep name during the trial period. */
export default function BetaBadge({ style }: { style?: StyleProp<ViewStyle> }) {
  const { t } = useLanguage();
  return (
    <View style={[styles.pill, style]} aria-label={t("beta.label")}>
      <Text style={styles.text}>{t("beta.label").toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    backgroundColor: "#F2A93B",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: "center",
  },
  text: { color: "#2B1A00", fontSize: 11, fontWeight: "800", letterSpacing: 0.8 },
});

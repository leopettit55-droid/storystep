import { useNavigation } from "@react-navigation/native";
import { useMemo } from "react";
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { areas } from "../content";
import { COMING_SOON_CITIES } from "../content/comingSoonCities";
import { localizedAreaText } from "../i18n/areaTranslations";
import { localizedCityName } from "../i18n/cityNames";
import { useLanguage } from "../i18n/LanguageContext";
import type { TabScreenNav } from "../navigation/types";
import { useTheme } from "../ThemeContext";
import type { ThemeColors } from "../theme";

type Nav = TabScreenNav<"Map">;

export default function ExploreMapScreen() {
  const navigation = useNavigation<Nav>();
  const { language, t } = useLanguage();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const featured = areas.filter((a) => a.isContentComplete);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>{t("map.title")}</Text>
        <Text style={styles.subtitle}>
          The full interactive 3D map is on the web version — here's every tour at a glance.
        </Text>
        <View style={styles.grid}>
          {featured.map((area) => {
            const text = localizedAreaText(area.id, language, area);
            return (
              <Pressable
                key={area.id}
                style={styles.card}
                onPress={() => navigation.navigate("TourPreview", { areaId: area.id })}
              >
                {area.image && <Image source={area.image} style={styles.image} />}
                <View style={styles.overlay}>
                  <Text style={styles.city}>{localizedCityName(area.city, language)}</Text>
                  <Text style={styles.name}>{text.name}</Text>
                  <Text style={styles.meta}>
                    {area.scannerOnly
                      ? t("tourPreview.useScanner")
                      : t("common.free")}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.sectionLabel}>{t("tours.moreCitiesTitle")}</Text>
        <View style={styles.soonRow}>
          {COMING_SOON_CITIES.map((c) => (
            <Pressable
              key={c.id}
              style={styles.soonChip}
              onPress={() => navigation.navigate("ComingSoon", { cityName: c.name })}
            >
              <Text style={styles.soonChipText}>{localizedCityName(c.name, language)}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: 20, paddingTop: 24, paddingBottom: 32 },
  title: { fontSize: 32, fontWeight: "700", color: colors.primary },
  subtitle: { fontSize: 13, color: colors.textMid, marginTop: 6, marginBottom: 16 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  card: {
    width: "47%",
    height: 160,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: colors.surfaceRaised,
  },
  image: { width: "100%", height: "100%", position: "absolute" },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 10,
    backgroundColor: "rgba(32,22,19,0.35)",
  },
  city: { fontSize: 9, fontWeight: "700", color: "#FFFFFF", textTransform: "uppercase", opacity: 0.9 },
  sectionLabel: { fontSize: 18, fontWeight: "800", color: colors.text, marginTop: 24, marginBottom: 10 },
  soonRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  soonChip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.textFaint,
  },
  soonChipText: { fontSize: 12.5, fontWeight: "600", color: colors.textFaint },
  name: { fontSize: 14, fontWeight: "700", color: "#FFFFFF", marginTop: 2 },
  meta: { fontSize: 10, color: "#FFFFFF", marginTop: 2, opacity: 0.9 },
  });
}

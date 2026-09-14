import { useNavigation } from "@react-navigation/native";
import { useMemo } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { areas } from "../content";
import type { Area } from "../content";
import { COMING_SOON_CITIES, type ComingSoonCity } from "../content/comingSoonCities";
import { localizedAreaText } from "../i18n/areaTranslations";
import { localizedCityName } from "../i18n/cityNames";
import { useLanguage } from "../i18n/LanguageContext";
import type { TabScreenNav } from "../navigation/types";
import { useTheme } from "../ThemeContext";
import type { ThemeColors } from "../theme";

type Nav = TabScreenNav<"Tours">;

const CITIES: Area["city"][] = ["London", "Paris", "Oxford"];

const DIFFICULTY_KEYS: Record<Area["difficulty"], string> = {
  easy: "common.easy",
  moderate: "common.moderate",
  hard: "common.hard",
};

type ListItem = { kind: "area"; area: Area } | { kind: "city"; city: ComingSoonCity };

export default function AreaSelectScreen() {
  const navigation = useNavigation<Nav>();
  const { language, t } = useLanguage();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const citySections = CITIES.map((city) => ({
    title: localizedCityName(city, language),
    data: areas.filter((a) => a.city === city).map((area): ListItem => ({ kind: "area", area })),
  })).filter((section) => section.data.length > 0);

  const moreCitiesSection = {
    title: t("tours.moreCitiesTitle"),
    data: COMING_SOON_CITIES.map((city): ListItem => ({ kind: "city", city })),
  };

  const sections = [...citySections, moreCitiesSection];

  const renderAreaItem = (item: Area) => {
    const disabled = !item.isContentComplete;
    const text = localizedAreaText(item.id, language, item);
    return (
      <Pressable
        disabled={disabled}
        onPress={() =>
          navigation.navigate("TourPreview", { areaId: item.id })
        }
        style={({ pressed }) => [
          styles.card,
          disabled && styles.cardDisabled,
          pressed && !disabled && styles.cardPressed,
        ]}
      >
        {item.image ? (
          <Image source={item.image} style={styles.thumb} />
        ) : (
          <View style={styles.thumbPlaceholder}>
            <Text style={styles.thumbPlaceholderText}>{text.name[0]}</Text>
          </View>
        )}

        <View style={styles.cardBody}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>{text.name}</Text>
            {disabled && <Text style={styles.badge}>{t("common.comingSoon")}</Text>}
          </View>
          <Text style={styles.cardDescription} numberOfLines={2}>
            {text.description}
          </Text>
          {!disabled && (
            <View style={styles.metaRow}>
              <Text style={styles.cardMeta}>
                {item.estimatedDurationMin} {t("common.min")} · {item.estimatedDistanceKm}{" "}
                {t("common.km")} · {t(DIFFICULTY_KEYS[item.difficulty])}
              </Text>
              <Text style={styles.cardPrice}>
                {t("common.from")} £{item.price.singleTour.toFixed(2)}
              </Text>
            </View>
          )}
        </View>
      </Pressable>
    );
  };

  const renderCityItem = (city: ComingSoonCity) => (
    <Pressable
      onPress={() => navigation.navigate("ComingSoon", { cityName: city.name })}
      style={({ pressed }) => [styles.card, styles.cityCard, pressed && styles.cardPressed]}
    >
      <View style={styles.thumbPlaceholder}>
        <Text style={styles.thumbPlaceholderText}>{localizedCityName(city.name, language)[0]}</Text>
      </View>
      <View style={styles.cardBody}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.cardTitle}>{localizedCityName(city.name, language)}</Text>
          <Text style={styles.badge}>{t("common.comingSoon")}</Text>
        </View>
        <Text style={styles.cardDescription}>{city.country}</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t("tours.title")}</Text>
        <Text style={styles.subtitle}>{t("tours.subtitle")}</Text>
      </View>
      <SectionList
        sections={sections}
        keyExtractor={(item) => (item.kind === "area" ? item.area.id : item.city.id)}
        renderItem={({ item }) =>
          item.kind === "area" ? renderAreaItem(item.area) : renderCityItem(item.city)
        }
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        contentContainerStyle={styles.list}
        stickySectionHeadersEnabled={false}
      />
    </SafeAreaView>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 4 },
    title: { fontSize: 32, fontWeight: "700", color: colors.primary },
    subtitle: { fontSize: 14, color: colors.textMid, marginTop: 4 },
    list: { padding: 16, paddingBottom: 32, gap: 12 },
    sectionHeader: {
      fontSize: 13,
      fontWeight: "700",
      color: colors.primary,
      textTransform: "uppercase",
      letterSpacing: 0.6,
      marginTop: 12,
      marginBottom: 8,
    },
    card: {
      flexDirection: "row",
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 10,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 12,
      gap: 12,
    },
    cardPressed: { opacity: 0.7 },
    cardDisabled: { opacity: 0.5 },
    cityCard: { backgroundColor: colors.surfaceRaised },
    thumb: {
      width: 76,
      height: 76,
      borderRadius: 12,
      backgroundColor: colors.surfaceRaised,
    },
    thumbPlaceholder: {
      width: 76,
      height: 76,
      borderRadius: 12,
      backgroundColor: colors.surfaceRaised,
      alignItems: "center",
      justifyContent: "center",
    },
    thumbPlaceholderText: { fontSize: 26, fontWeight: "700", color: colors.primary },
    cardBody: { flex: 1, justifyContent: "center" },
    cardHeaderRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    cardTitle: { fontSize: 17, fontWeight: "700", color: colors.text, flexShrink: 1 },
    badge: {
      fontSize: 10,
      color: colors.primary,
      borderWidth: 1,
      borderColor: colors.primary,
      borderRadius: 8,
      paddingHorizontal: 6,
      paddingVertical: 2,
    },
    cardDescription: { fontSize: 12.5, color: colors.textMid, marginTop: 3, lineHeight: 17 },
    metaRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 8,
    },
    cardMeta: { fontSize: 11, color: colors.textDim, flexShrink: 1 },
    cardPrice: { fontSize: 12, fontWeight: "700", color: colors.primary },
  });
}

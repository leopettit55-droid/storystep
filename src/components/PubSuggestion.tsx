import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import { Linking, StyleSheet, Text, View } from "react-native";
import type { Area } from "../content";
import { distanceMeters } from "../geofencing/proximityTracker";
import { useLanguage } from "../i18n/LanguageContext";
import { useTheme } from "../ThemeContext";
import type { ThemeColors } from "../theme";
import PressScale from "./PressScale";

/** Straight-line distance understates a walk through streets; this is a
 * typical city allowance. Walking pace is taken as 80 m a minute. */
const STREET_FACTOR = 1.3;
const METRES_PER_MINUTE = 80;

/** "Feeling thirsty?" card on the tour-complete screen: a historic pub near
 * where the tour ends, with walking time and directions. */
export default function PubSuggestion({ area }: { area: Area }) {
  const { t } = useLanguage();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const pub = area.nearbyPub;
  if (!pub) return null;

  const end = area.route[area.route.length - 1]?.coordinates ?? area.startingPoint;
  const walkMetres = distanceMeters(end, pub.coordinates) * STREET_FACTOR;
  const minutes = Math.max(1, Math.round(walkMetres / METRES_PER_MINUTE));
  const nextDoor = walkMetres < 100;

  const openDirections = () => {
    const { lat, lng } = pub.coordinates;
    void Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=walking`
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Ionicons name="beer-outline" size={20} color={colors.primary} />
        <Text style={styles.title}>{t("pub.title")}</Text>
      </View>
      <Text style={styles.blurb}>{pub.blurb}</Text>
      <View style={styles.footer}>
        <Text style={styles.walk}>
          {nextDoor ? t("pub.nextDoor") : t("pub.walk", { minutes })}
        </Text>
        <PressScale style={styles.directions} scaleTo={0.95} onPress={openDirections} role="link">
          <Ionicons name="navigate-outline" size={15} color={colors.primary} />
          <Text style={styles.directionsText}>{t("pub.directions")}</Text>
        </PressScale>
      </View>
    </View>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    card: {
      alignSelf: "stretch",
      maxWidth: 420,
      width: "100%",
      marginTop: 20,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 16,
      padding: 16,
    },
    header: { flexDirection: "row", alignItems: "center", gap: 8 },
    title: { color: colors.text, fontSize: 16, fontWeight: "700" },
    blurb: { color: colors.textMid, fontSize: 14, lineHeight: 20, marginTop: 8 },
    footer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 12,
      gap: 12,
    },
    walk: { color: colors.textDim, fontSize: 13, flexShrink: 1 },
    directions: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      borderWidth: 1,
      borderColor: colors.primary,
      borderRadius: 10,
      paddingVertical: 8,
      paddingHorizontal: 12,
    },
    directionsText: { color: colors.primary, fontSize: 13, fontWeight: "600" },
  });
}

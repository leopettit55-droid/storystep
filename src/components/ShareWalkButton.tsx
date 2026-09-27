import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import type { Area } from "../content";
import { localizedAreaText } from "../i18n/areaTranslations";
import { localizedCityName } from "../i18n/cityNames";
import { useLanguage } from "../i18n/LanguageContext";
import { prepareWalkShare, shareWalk, type PreparedShare, type ShareOutcome } from "../share/shareWalk";
import { useTheme } from "../ThemeContext";
import type { ThemeColors } from "../theme";
import PressScale from "./PressScale";

const MESSAGE_KEYS: Partial<Record<ShareOutcome, string>> = {
  "downloaded-copied": "share.downloadedCopied",
  downloaded: "share.downloaded",
  copied: "share.copied",
  failed: "share.failed",
};

/** "Share your walk" on the tour-complete screen: an Instagram-story-sized
 * "I walked it" card on the web, text and link on native. */
export default function ShareWalkButton({ area }: { area: Area }) {
  const { language, t } = useLanguage();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [prepared, setPrepared] = useState<PreparedShare | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const messageTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Build the card as soon as the screen shows, so the tap can share it at once.
  useEffect(() => {
    let cancelled = false;
    const tourName = localizedAreaText(area.id, language, area).name;
    const city = localizedCityName(area.city, language);
    void prepareWalkShare({
      area,
      tourName,
      city,
      iWalkedLabel: t("share.iWalked"),
      stopsLabel: t("share.stops", { count: area.route.length }),
      distanceLabel: t("share.distance", { km: area.estimatedDistanceKm }),
      // British date order for English ("27 September 2026"), matching the brand.
      dateLabel: new Date().toLocaleDateString(language === "en" ? "en-GB" : language, {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      tagline: t("share.tagline"),
      shareText: t("share.shareText", { tour: tourName, city }),
    }).then((p) => {
      if (!cancelled) setPrepared(p);
    });
    return () => {
      cancelled = true;
      if (messageTimer.current) clearTimeout(messageTimer.current);
    };
  }, [area, language, t]);

  const handleShare = async () => {
    if (!prepared || busy) return;
    setBusy(true);
    const outcome = await shareWalk(prepared);
    setBusy(false);
    const key = MESSAGE_KEYS[outcome];
    setMessage(key ? t(key) : null);
    if (messageTimer.current) clearTimeout(messageTimer.current);
    if (key) messageTimer.current = setTimeout(() => setMessage(null), 4000);
  };

  return (
    <View style={styles.wrap}>
      <PressScale style={styles.button} scaleTo={0.96} onPress={handleShare} disabled={!prepared || busy}>
        {!prepared || busy ? (
          <ActivityIndicator color={colors.primary} />
        ) : (
          <>
            <Ionicons name="share-outline" size={18} color={colors.primary} />
            <Text style={styles.buttonText}>{t("share.button")}</Text>
          </>
        )}
      </PressScale>
      {message && (
        <Text style={styles.message} role="status">
          {message}
        </Text>
      )}
    </View>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    wrap: { alignItems: "center", gap: 10, marginTop: 12 },
    button: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      minWidth: 220,
      minHeight: 52,
      borderRadius: 14,
      borderWidth: 1.5,
      borderColor: colors.primary,
      paddingVertical: 14,
      paddingHorizontal: 28,
    },
    buttonText: { color: colors.primary, fontSize: 16, fontWeight: "600" },
    message: { color: colors.textMid, fontSize: 13, textAlign: "center" },
  });
}

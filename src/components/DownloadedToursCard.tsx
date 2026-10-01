import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getAreaById } from "../content";
import { localizedAreaText } from "../i18n/areaTranslations";
import { useLanguage } from "../i18n/LanguageContext";
import { formatBytes, useOfflineStore } from "../offline/offlineStore";
import { offlineDownloadsSupported } from "../offline/tourFiles";
import { useTheme } from "../ThemeContext";
import type { ThemeColors } from "../theme";
import PressScale from "./PressScale";

/** Account page: every tour saved on this device, its size, and a way to remove it. */
export default function DownloadedToursCard() {
  const { language, t } = useLanguage();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const tours = useOfflineStore((s) => s.tours);
  const remove = useOfflineStore((s) => s.remove);

  if (!offlineDownloadsSupported()) return null;
  const saved = Object.entries(tours).filter(([, tour]) => !tour.bundled && tour.sizeBytes > 0);
  const total = saved.reduce((sum, [, tour]) => sum + tour.sizeBytes, 0);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{t("offline.accountTitle")}</Text>
      {saved.length === 0 ? (
        <Text style={styles.body}>{t("offline.accountEmpty")}</Text>
      ) : (
        <>
          <Text style={styles.body}>{t("offline.accountTotal", { size: formatBytes(total) })}</Text>
          {saved.map(([id, tour]) => {
            const area = getAreaById(id);
            if (!area) return null;
            const ready = tour.status === "ready";
            return (
              <View key={id} style={styles.row}>
                <Ionicons
                  name={ready ? "cloud-done" : "cloud-download-outline"}
                  size={18}
                  color={ready ? colors.success : colors.textDim}
                />
                <View style={styles.rowText}>
                  <Text style={styles.name} numberOfLines={1}>
                    {localizedAreaText(area.id, language, area).name}
                  </Text>
                  <Text style={styles.meta}>
                    {formatBytes(tour.sizeBytes)}
                    {ready ? "" : ` · ${t(tour.status === "paused" ? "offline.statusPaused" : "offline.statusIncomplete")}`}
                  </Text>
                </View>
                <PressScale style={styles.remove} scaleTo={0.95} onPress={() => void remove(id)}>
                  <Text style={styles.removeText}>{t("offline.remove")}</Text>
                </PressScale>
              </View>
            );
          })}
        </>
      )}
    </View>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    card: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 18,
      borderWidth: 1,
      borderColor: colors.border,
    },
    title: { fontSize: 16, fontWeight: "700", color: colors.text },
    body: { fontSize: 13, color: colors.textMid, marginTop: 6, lineHeight: 19 },
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginTop: 12,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    rowText: { flex: 1, minWidth: 0 },
    name: { fontSize: 14, fontWeight: "600", color: colors.text },
    meta: { fontSize: 12, color: colors.textDim, marginTop: 2 },
    remove: { paddingVertical: 6, paddingHorizontal: 8 },
    removeText: { color: colors.primary, fontSize: 13, fontWeight: "600" },
  });
}

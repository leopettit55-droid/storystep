import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import type { Area } from "../content";
import { useLanguage } from "../i18n/LanguageContext";
import { useOnline } from "../offline/connectivity";
import { formatBytes, useOfflineStore } from "../offline/offlineStore";
import { isBundledTour, offlineDownloadsSupported } from "../offline/tourFiles";
import { useTheme } from "../ThemeContext";
import type { ThemeColors } from "../theme";
import PressScale from "./PressScale";

function formatSecondsLeft(seconds: number | null, t: (k: string, v?: Record<string, string | number>) => string) {
  if (seconds == null) return null;
  if (seconds < 60) return t("offline.secondsLeft", { seconds: Math.max(1, Math.round(seconds)) });
  return t("offline.minutesLeft", { minutes: Math.round(seconds / 60) });
}

/** The tour page's offline section: download, progress, pause/resume, remove. */
export default function OfflineTourCard({ area }: { area: Area }) {
  const { t } = useLanguage();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const online = useOnline();
  const tour = useOfflineStore((s) => s.tours[area.id]);
  const progress = useOfflineStore((s) => s.progress[area.id]);
  const { download, pause, remove } = useOfflineStore.getState();

  if (!offlineDownloadsSupported()) return null;
  const bundled = isBundledTour(area);
  const status = bundled ? "ready" : tour?.status;

  if (status === "ready") {
    return (
      <View style={[styles.card, styles.cardReady]}>
        <Ionicons name="cloud-done" size={20} color={colors.success} />
        <View style={styles.text}>
          <Text style={styles.title}>{t(bundled ? "offline.bundledTitle" : "offline.readyTitle")}</Text>
          <Text style={styles.body}>
            {bundled ? t("offline.bundledBody") : t("offline.readyBody", { size: formatBytes(tour?.sizeBytes ?? 0) })}
          </Text>
        </View>
        {!bundled && (
          <PressScale style={styles.linkButton} scaleTo={0.95} onPress={() => void remove(area.id)}>
            <Text style={styles.linkText}>{t("offline.remove")}</Text>
          </PressScale>
        )}
      </View>
    );
  }

  if (status === "downloading") {
    const pct = Math.round((progress?.fraction ?? 0) * 100);
    const sizes =
      progress && progress.bytesTotal > 0
        ? t("offline.sizeOf", { done: formatBytes(progress.bytesDone), total: formatBytes(progress.bytesTotal) })
        : null;
    const left = formatSecondsLeft(progress?.secondsLeft ?? null, t);
    return (
      <View style={styles.cardColumn}>
        <View style={styles.row}>
          <Ionicons name="cloud-download-outline" size={20} color={colors.primary} />
          <Text style={[styles.title, styles.grow]}>{t("offline.downloading", { percent: pct })}</Text>
          <PressScale style={styles.linkButton} scaleTo={0.95} onPress={() => pause(area.id)}>
            <Text style={styles.linkText}>{t("offline.pause")}</Text>
          </PressScale>
        </View>
        <View style={styles.track} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <View style={[styles.fill, { width: `${pct}%` }]} />
        </View>
        <Text style={styles.body}>{[sizes, left].filter(Boolean).join(" · ") || t("offline.preparing")}</Text>
      </View>
    );
  }

  if (status === "paused" || status === "incomplete") {
    return (
      <View style={styles.card}>
        <Ionicons name={status === "paused" ? "pause-circle-outline" : "alert-circle-outline"} size={20} color={colors.primary} />
        <View style={styles.text}>
          <Text style={styles.title}>{t(status === "paused" ? "offline.pausedTitle" : "offline.incompleteTitle")}</Text>
          <Text style={styles.body}>
            {online ? t("offline.resumeBody") : t("offline.needConnection")}
          </Text>
        </View>
        <PressScale
          style={[styles.button, !online && styles.buttonDisabled]}
          scaleTo={0.95}
          disabled={!online}
          onPress={() => void download(area.id)}
        >
          <Text style={styles.buttonText}>{t(status === "paused" ? "offline.resume" : "offline.tryAgain")}</Text>
        </PressScale>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Ionicons name="cloud-download-outline" size={20} color={colors.primary} />
      <View style={styles.text}>
        <Text style={styles.title}>{t("offline.downloadTitle")}</Text>
        <Text style={styles.body}>{online ? t("offline.downloadBody") : t("offline.needConnection")}</Text>
      </View>
      <PressScale
        style={[styles.button, !online && styles.buttonDisabled]}
        scaleTo={0.95}
        disabled={!online}
        onPress={() => void download(area.id)}
      >
        <Text style={styles.buttonText}>{t("offline.download")}</Text>
      </PressScale>
    </View>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    card: {
      marginTop: 12,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 14,
      padding: 12,
      backgroundColor: colors.background,
    },
    cardReady: { borderColor: colors.success },
    cardColumn: {
      marginTop: 12,
      gap: 8,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 14,
      padding: 12,
      backgroundColor: colors.background,
    },
    row: { flexDirection: "row", alignItems: "center", gap: 12 },
    grow: { flex: 1 },
    text: { flex: 1, minWidth: 0 },
    title: { color: colors.text, fontSize: 14, fontWeight: "700" },
    body: { color: colors.textDim, fontSize: 12, lineHeight: 17, marginTop: 2 },
    button: { backgroundColor: colors.primary, borderRadius: 10, paddingVertical: 9, paddingHorizontal: 14 },
    buttonDisabled: { opacity: 0.4 },
    buttonText: { color: colors.onPrimary, fontSize: 13, fontWeight: "700" },
    linkButton: { paddingVertical: 8, paddingHorizontal: 6 },
    linkText: { color: colors.primary, fontSize: 13, fontWeight: "600" },
    track: { height: 6, borderRadius: 3, backgroundColor: colors.border, overflow: "hidden" },
    fill: { height: "100%", borderRadius: 3, backgroundColor: colors.primary },
  });
}

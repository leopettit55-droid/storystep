import { Ionicons } from "@expo/vector-icons";
import { Platform, StyleSheet, Text, View } from "react-native";
import { DUO_COLORS } from "../../duo/colors";
import { useLanguage } from "../../i18n/LanguageContext";
import PressScale from "../PressScale";

export type SyncState = "synced" | "drift" | "waiting" | "offline";

interface Props {
  friendName: string;
  sync: SyncState;
  /** How far apart (m), when known. */
  meters: number | null;
  anon: boolean;
  onToggleAnon: () => void;
  onResync: () => void;
  /** Waiting for one of you at a stop. */
  waiting: { mine: boolean; name: string; stop: number; minutesLeft: number; stuck: boolean; canPlay: boolean } | null;
  onPlayNow: () => void;
  /** The friend has lost connection (how long, in ms), or null. */
  friendOffline: number | null;
  onContinueSolo: () => void;
}

/** After this long without the friend, carrying on alone is offered. */
const SOLO_AFTER_MS = 5 * 60_000;

export const formatMeters = (m: number) => (m >= 1000 ? `${(m / 1000).toFixed(m >= 10_000 ? 0 : 1)} km` : `${Math.round(m)} m`);

/** "Walking with Sam": sync status, distance apart, and what to do if one of you is behind or offline. */
export default function DuoStatusBar(props: Props) {
  const { t } = useLanguage();
  const { friendName, sync, meters, anon, waiting, friendOffline } = props;
  const dot = { synced: "#3DDC84", drift: "#FFC83D", waiting: "#FFC83D", offline: "#FF6B5B" }[sync];
  const label = { synced: t("duo.synced"), drift: t("duo.drift"), waiting: t("duo.synced"), offline: t("duo.reconnecting") }[sync];

  return (
    <View style={styles.column}>
      <View style={styles.bar} role="status">
        <View style={[styles.avatar, { backgroundColor: DUO_COLORS.friend }]}>
          <Text style={styles.avatarText}>{friendName.slice(0, 1).toUpperCase()}</Text>
        </View>
        <View style={styles.middle}>
          <Text style={styles.name} numberOfLines={1}>
            {t("duo.walkingWith", { name: friendName })}
          </Text>
          <View style={styles.statusRow}>
            <View style={[styles.dot, { backgroundColor: dot }]} />
            <Text style={styles.status}>{label}</Text>
            {meters != null && <Text style={styles.status}>· {t("duo.apart", { distance: formatMeters(meters) })}</Text>}
          </View>
        </View>
        {sync === "drift" ? (
          <PressScale style={styles.action} scaleTo={0.94} onPress={props.onResync}>
            <Ionicons name="sync" size={14} color="#201613" />
            <Text style={styles.actionText}>{t("duo.resync")}</Text>
          </PressScale>
        ) : (
          <PressScale
            style={styles.iconButton}
            scaleTo={0.9}
            onPress={props.onToggleAnon}
            aria-label={t(anon ? "duo.shareExact" : "duo.shareDistance")}
          >
            <Ionicons name={anon ? "eye-off" : "location"} size={16} color="#FFFFFF" />
          </PressScale>
        )}
      </View>

      {waiting && (
        <View style={styles.banner}>
          <Ionicons name="hourglass-outline" size={18} color="#9A5B12" />
          <View style={styles.bannerText}>
            <Text style={styles.bannerTitle}>
              {t(waiting.mine ? "duo.waitingAtStop" : "duo.friendAhead", { name: waiting.name, stop: waiting.stop })}
            </Text>
            <Text style={styles.bannerBody}>
              {waiting.stuck && meters != null
                ? t("duo.friendStuck", { name: waiting.name, distance: formatMeters(meters) })
                : t("duo.autoPlay", { minutes: Math.max(1, waiting.minutesLeft) })}
            </Text>
          </View>
          {waiting.canPlay && (
            <PressScale style={styles.action} scaleTo={0.94} onPress={props.onPlayNow}>
              <Text style={styles.actionText}>{t("duo.playNow")}</Text>
            </PressScale>
          )}
        </View>
      )}

      {friendOffline != null && (
        <View style={styles.banner}>
          <Ionicons name="cloud-offline-outline" size={18} color="#9A5B12" />
          <Text style={[styles.bannerTitle, styles.bannerText]}>{t("duo.friendOffline", { name: friendName })}</Text>
          {friendOffline >= SOLO_AFTER_MS && (
            <PressScale style={styles.action} scaleTo={0.94} onPress={props.onContinueSolo}>
              <Text style={styles.actionText}>{t("duo.continueSolo")}</Text>
            </PressScale>
          )}
        </View>
      )}
    </View>
  );
}

/**
 * The status bar's small form, shown while a stop's story fills the screen:
 * who you're with, whether you're in sync (with Re-sync), or who's waiting.
 */
export function DuoPill({
  friendName,
  sync,
  waiting,
  onResync,
  friendOffline,
}: Pick<Props, "friendName" | "sync" | "waiting" | "onResync" | "friendOffline">) {
  const { t } = useLanguage();
  const dot = friendOffline != null ? "#FF6B5B" : { synced: "#3DDC84", drift: "#FFC83D", waiting: "#FFC83D", offline: "#FF6B5B" }[sync];
  const text =
    sync === "offline"
      ? t("duo.reconnecting")
      : friendOffline != null
        ? t("duo.pillOffline", { name: friendName })
        : waiting
        ? t(waiting.mine ? "duo.pillWaiting" : "duo.pillAhead", { name: waiting.name })
        : t("duo.walkingWith", { name: friendName });
  return (
    <View style={styles.pill} role="status">
      <View style={[styles.dot, { backgroundColor: dot }]} />
      <Text style={styles.pillText} numberOfLines={1}>
        {text}
      </Text>
      {sync === "drift" && (
        <PressScale style={styles.action} scaleTo={0.94} onPress={onResync}>
          <Ionicons name="sync" size={14} color="#201613" />
          <Text style={styles.actionText}>{t("duo.resync")}</Text>
        </PressScale>
      )}
    </View>
  );
}

const glass = Platform.OS === "web" ? ({ backdropFilter: "blur(8px)" } as object) : {};

const styles = StyleSheet.create({
  column: { gap: 8 },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    alignSelf: "flex-start",
    maxWidth: "70%",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    ...(Platform.OS === "web" ? ({ backdropFilter: "blur(8px)" } as object) : {}),
  },
  pillText: { color: "#FFFFFF", fontSize: 13, fontWeight: "700", flexShrink: 1 },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 10,
    ...glass,
  },
  avatar: { width: 30, height: 30, borderRadius: 15, alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "#FFFFFF" },
  avatarText: { color: "#FFFFFF", fontWeight: "800", fontSize: 13 },
  middle: { flex: 1, minWidth: 0 },
  name: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },
  statusRow: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 1 },
  dot: { width: 7, height: 7, borderRadius: 4 },
  status: { color: "rgba(255,255,255,0.85)", fontSize: 12 },
  iconButton: { width: 32, height: 32, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.18)", alignItems: "center", justifyContent: "center" },
  action: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FFC83D",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  actionText: { color: "#201613", fontSize: 12, fontWeight: "800" },
  banner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#FFF0DC",
    borderRadius: 12,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  bannerText: { flex: 1, minWidth: 0 },
  bannerTitle: { color: "#5C3A0E", fontSize: 13, fontWeight: "700" },
  bannerBody: { color: "#9A5B12", fontSize: 12, marginTop: 1 },
});

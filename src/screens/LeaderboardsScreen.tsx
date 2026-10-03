import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useMemo, useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useAccountStore } from "../account/accountStore";
import BackButton from "../components/BackButton";
import PressScale from "../components/PressScale";
import { areas } from "../content";
import { localizedAreaText } from "../i18n/areaTranslations";
import { useLanguage } from "../i18n/LanguageContext";
import { useOnline } from "../offline/connectivity";
import { cachedBoard, fetchBoard, formatDuration, type Board, type BoardResult, type BoardRow, type Period } from "../social/leaderboard";
import { useTheme } from "../ThemeContext";
import { CONTENT_MAX_WIDTH, type ThemeColors } from "../theme";

const BOARDS: { id: Board; key: string }[] = [
  { id: "overall", key: "leaderboards.overall" },
  { id: "tour", key: "leaderboards.perTour" },
  { id: "most", key: "leaderboards.most" },
  { id: "duo", key: "leaderboards.duos" },
];
const PERIODS: { id: Period; key: string }[] = [
  { id: "week", key: "leaderboards.week" },
  { id: "month", key: "leaderboards.month" },
  { id: "all", key: "leaderboards.all" },
];
/** New finishes appear within this long while the board is open. */
const REFRESH_MS = 30_000;

export default function LeaderboardsScreen() {
  const { language, t } = useLanguage();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const online = useOnline();
  const signedIn = useAccountStore((s) => !!s.account);
  const tours = useMemo(() => areas.filter((a) => a.isContentComplete && !a.scannerOnly), []);
  const [board, setBoard] = useState<Board>("overall");
  const [period, setPeriod] = useState<Period>("all");
  const [tour, setTour] = useState(tours[0]?.id ?? "");
  const [result, setResult] = useState<BoardResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  const tourId = board === "tour" ? tour : null;

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      setLoading(true);
      setFailed(false);
      void cachedBoard(board, period, tourId).then((cached) => {
        if (!cancelled && cached) setResult(cached);
      });
      const load = () =>
        fetchBoard(board, period, tourId)
          .then((r) => {
            if (!cancelled) {
              setResult(r);
              setFailed(false);
            }
          })
          .catch(() => {
            if (!cancelled) setFailed(true);
          })
          .finally(() => {
            if (!cancelled) setLoading(false);
          });
      void load();
      const timer = setInterval(load, REFRESH_MS);
      return () => {
        cancelled = true;
        clearInterval(timer);
      };
    }, [board, period, tourId])
  );

  const shown = result && result.board === board && result.period === period && result.tour === tourId ? result : null;

  const valueText = (row: BoardRow) => {
    if (board === "most") return row.value === 1 ? t("leaderboards.toursCountOne") : t("leaderboards.toursCount", { count: row.value });
    return formatDuration(row.value);
  };
  const detailText = (row: BoardRow) => {
    if ((board !== "overall" && board !== "duo") || !row.tour || row.secondsPerKm == null) return null;
    const area = areas.find((a) => a.id === row.tour);
    const name = area ? localizedAreaText(area.id, language, area).name : row.tourName;
    return t("leaderboards.paceOn", { pace: formatDuration(row.secondsPerKm), tour: name ?? "" });
  };

  const renderRow = (row: BoardRow, highlight: boolean) => (
    <View key={`${row.uid}-${row.rank}`} style={[styles.row, highlight && styles.rowMe]}>
      <Text style={[styles.rank, row.rank <= 3 && styles.rankTop]}>{row.rank}</Text>
      <View style={styles.rowText}>
        <Text style={styles.name} numberOfLines={1}>
          {row.name}
          {highlight ? ` · ${t("leaderboards.you")}` : ""}
        </Text>
        {detailText(row) && <Text style={styles.detail}>{detailText(row)}</Text>}
      </View>
      <Text style={styles.value}>{valueText(row)}</Text>
    </View>
  );

  const myId = shown?.myId;
  const isMe = (row: BoardRow) => !!myId && (row.uid === myId || !!row.uids?.includes(myId));
  const meInList = !!shown?.rows.some(isMe);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <BackButton variant="inline" />
        <Text style={styles.title}>{t("leaderboards.title")}</Text>
        <Text style={styles.subtitle}>{t(`leaderboards.${board}Explain`)}</Text>

        <View style={styles.tabs} role="tablist">
          {BOARDS.map((b) => (
            <PressScale
              key={b.id}
              style={[styles.tab, board === b.id && styles.tabOn]}
              scaleTo={0.97}
              onPress={() => setBoard(b.id)}
              role="tab"
              aria-selected={board === b.id}
            >
              <Text style={[styles.tabText, board === b.id && styles.tabTextOn]}>{t(b.key)}</Text>
            </PressScale>
          ))}
        </View>

        <View style={styles.chips}>
          {PERIODS.map((p) => (
            <PressScale
              key={p.id}
              style={[styles.chip, period === p.id && styles.chipOn]}
              scaleTo={0.96}
              onPress={() => setPeriod(p.id)}
              aria-pressed={period === p.id}
            >
              <Text style={[styles.chipText, period === p.id && styles.chipTextOn]}>{t(p.key)}</Text>
            </PressScale>
          ))}
        </View>

        {board === "tour" && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
            {tours.map((a) => (
              <PressScale
                key={a.id}
                style={[styles.chip, tour === a.id && styles.chipOn]}
                scaleTo={0.96}
                onPress={() => setTour(a.id)}
                aria-pressed={tour === a.id}
              >
                <Text style={[styles.chipText, tour === a.id && styles.chipTextOn]} numberOfLines={1}>
                  {localizedAreaText(a.id, language, a).name}
                </Text>
              </PressScale>
            ))}
          </ScrollView>
        )}

        {!signedIn && (
          <View style={styles.note}>
            <Ionicons name="person-circle-outline" size={18} color={colors.primary} />
            <Text style={styles.noteText}>{t("leaderboards.joinNote")}</Text>
          </View>
        )}

        <View style={styles.list}>
          {!shown && loading ? (
            <ActivityIndicator color={colors.primary} style={styles.loading} />
          ) : !shown && failed ? (
            <Text style={styles.empty}>{t(online ? "leaderboards.loadFailed" : "leaderboards.offline")}</Text>
          ) : shown && shown.rows.length === 0 ? (
            <Text style={styles.empty}>{t("leaderboards.empty")}</Text>
          ) : (
            shown?.rows.map((row) => renderRow(row, isMe(row)))
          )}
          {shown?.me && !meInList && (
            <>
              <Text style={styles.yourPlace}>{t("leaderboards.yourPosition")}</Text>
              {renderRow(shown.me, true)}
            </>
          )}
        </View>
        {shown && shown.total > shown.rows.length && (
          <Text style={styles.footnote}>{t("leaderboards.topOf", { shown: shown.rows.length, total: shown.total })}</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    scroll: { padding: 20, paddingTop: 16, gap: 12, width: "100%", maxWidth: CONTENT_MAX_WIDTH, alignSelf: "center" },
    title: { fontSize: 32, fontWeight: "700", color: colors.primary, marginTop: 4 },
    subtitle: { fontSize: 14, color: colors.textMid, lineHeight: 20 },
    tabs: { flexDirection: "row", borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 3, gap: 3, marginTop: 4 },
    tab: { flex: 1, alignItems: "center", paddingVertical: 9, borderRadius: 9 },
    tabOn: { backgroundColor: colors.primary },
    tabText: { color: colors.textMid, fontSize: 14, fontWeight: "600" },
    tabTextOn: { color: colors.onPrimary },
    chips: { flexDirection: "row", gap: 8, flexWrap: "wrap" },
    chip: { borderWidth: 1, borderColor: colors.border, borderRadius: 16, paddingVertical: 6, paddingHorizontal: 12, maxWidth: 240 },
    chipOn: { borderColor: colors.primary, backgroundColor: colors.surface },
    chipText: { color: colors.textMid, fontSize: 13 },
    chipTextOn: { color: colors.primary, fontWeight: "700" },
    note: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: colors.surface, borderRadius: 12, padding: 12 },
    noteText: { color: colors.textMid, fontSize: 13, flex: 1, lineHeight: 18 },
    list: { backgroundColor: colors.surface, borderRadius: 16, borderWidth: 1, borderColor: colors.border, overflow: "hidden" },
    loading: { padding: 30 },
    empty: { color: colors.textDim, fontSize: 14, padding: 20, textAlign: "center", lineHeight: 20 },
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      marginTop: -1,
    },
    rowMe: { backgroundColor: colors.surfaceRaised, borderLeftWidth: 3, borderLeftColor: colors.primary },
    rank: { width: 32, color: colors.textDim, fontSize: 15, fontWeight: "700", textAlign: "center" },
    rankTop: { color: colors.primary },
    rowText: { flex: 1, minWidth: 0 },
    name: { color: colors.text, fontSize: 15, fontWeight: "600" },
    detail: { color: colors.textDim, fontSize: 12, marginTop: 2 },
    value: { color: colors.text, fontSize: 15, fontWeight: "700" },
    yourPlace: { color: colors.textDim, fontSize: 12, fontWeight: "700", paddingHorizontal: 16, paddingTop: 12, paddingBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 },
    footnote: { color: colors.textDim, fontSize: 12, textAlign: "center" },
  });
}

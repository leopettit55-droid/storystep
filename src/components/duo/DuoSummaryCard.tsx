import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DUO_COLORS } from "../../duo/colors";
import { duoPeople, useDuoStore } from "../../duo/duoStore";
import { useLanguage } from "../../i18n/LanguageContext";
import type { RootStackParamList } from "../../navigation/types";
import { formatDuration } from "../../social/leaderboard";
import { useTheme } from "../../ThemeContext";
import type { ThemeColors } from "../../theme";
import PressScale from "../PressScale";
import { formatMeters } from "./DuoStatusBar";

const BADGES = [
  { at: 5, key: "duo.badgeBestFriends", icon: "heart" as const },
  { at: 10, key: "duo.badgeLegends", icon: "trophy" as const },
];
/** Further apart than this on average means you walked from different places. */
const TOGETHER_METERS = 2_000;

/** Walk with a friend, at the end: the walk in numbers, badges, and a rating. */
export default function DuoSummaryCard() {
  const { t } = useLanguage();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const state = useDuoStore((s) => s.state);
  const myId = useDuoStore((s) => s.myId);
  const send = useDuoStore((s) => s.send);
  const { friend } = duoPeople(state, myId);
  const summary = state?.summary;
  if (!summary || !friend) return null;

  const myRating = myId ? summary.ratings[myId] : undefined;
  const earned = BADGES.filter((b) => summary.toursTogether >= b.at);
  const next = BADGES.find((b) => summary.toursTogether < b.at);

  const lines: { icon: keyof typeof Ionicons.glyphMap; text: string }[] = [];
  if (summary.avgMeters != null) {
    lines.push({
      icon: "people",
      text: t(summary.avgMeters <= TOGETHER_METERS ? "duo.avgApart" : "duo.farApart", { distance: formatMeters(summary.avgMeters) }),
    });
  }
  if (summary.closest && summary.closest.meters <= TOGETHER_METERS) {
    lines.push({ icon: "magnet", text: t("duo.closest", { distance: formatMeters(summary.closest.meters), stop: summary.closest.stop }) });
  }
  if (summary.laughs > 0) {
    lines.push({ icon: "happy", text: summary.laughs === 1 ? t("duo.laughsOne") : t("duo.laughs", { count: summary.laughs }) });
  }
  if (summary.reactions + summary.messages > 0) {
    const count = (n: number, one: string, many: string) => (n === 1 ? t(one) : t(many, { count: n }));
    lines.push({
      icon: "chatbubbles",
      text: t("duo.reactionsCount", {
        reactions: count(summary.reactions, "duo.reactionOne", "duo.reactionMany"),
        messages: count(summary.messages, "duo.messageOne", "duo.messageMany"),
      }),
    });
  }
  if (summary.points > 0) lines.push({ icon: "star", text: t("duo.points", { points: summary.points }) });
  lines.push({
    icon: "footsteps",
    text: summary.toursTogether === 1 ? t("duo.toursTogetherOne") : t("duo.toursTogether", { count: summary.toursTogether }),
  });

  return (
    <View style={styles.card}>
      <View style={styles.pair}>
        <View style={[styles.avatar, { backgroundColor: DUO_COLORS.me }]}>
          <Ionicons name="person" size={18} color="#FFFFFF" />
        </View>
        <View style={[styles.avatar, styles.overlap, { backgroundColor: DUO_COLORS.friend }]}>
          <Text style={styles.avatarText}>{friend.name.slice(0, 1).toUpperCase()}</Text>
        </View>
      </View>
      <Text style={styles.title}>{t("duo.togetherTitle")}</Text>
      <Text style={styles.time}>
        {summary.seconds != null ? `${t("duo.summaryTime")}: ${formatDuration(summary.seconds)}` : t("duo.summaryUnranked")}
      </Text>

      <View style={styles.lines}>
        {lines.map((line) => (
          <View key={line.text} style={styles.line}>
            <Ionicons name={line.icon} size={16} color={colors.primary} />
            <Text style={styles.lineText}>{line.text}</Text>
          </View>
        ))}
      </View>

      {earned.map((b) => (
        <View key={b.key} style={styles.badge}>
          <Ionicons name={b.icon} size={16} color="#FFFFFF" />
          <Text style={styles.badgeText}>{t(b.key)}</Text>
        </View>
      ))}
      {next && <Text style={styles.hint}>{t("duo.nextBadge", { left: next.at - summary.toursTogether, badge: t(next.key).split(":")[0] })}</Text>}

      <Text style={styles.rateLabel}>{myRating ? t("duo.rated") : t("duo.rate")}</Text>
      <View style={styles.stars} role="radiogroup" aria-label={t("duo.rate")}>
        {[1, 2, 3, 4, 5].map((n) => (
          <PressScale
            key={n}
            scaleTo={0.85}
            onPress={() => send({ t: "rate", stars: n })}
            role="radio"
            aria-checked={myRating === n}
            aria-label={`${n}`}
            hitSlop={4}
          >
            <Ionicons name={myRating && n <= myRating ? "star" : "star-outline"} size={30} color="#F5B301" />
          </PressScale>
        ))}
      </View>

      <PressScale style={styles.link} scaleTo={0.97} onPress={() => navigation.navigate("Leaderboards")}>
        <Ionicons name="trophy-outline" size={16} color={colors.primary} />
        <Text style={styles.linkText}>{t("duo.duoBoard")}</Text>
      </PressScale>
    </View>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    card: {
      alignSelf: "stretch",
      backgroundColor: colors.surface,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 18,
      gap: 10,
      alignItems: "center",
    },
    pair: { flexDirection: "row" },
    avatar: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center", borderWidth: 3, borderColor: colors.surface },
    overlap: { marginLeft: -10 },
    avatarText: { color: "#FFFFFF", fontWeight: "800", fontSize: 16 },
    title: { fontSize: 20, fontWeight: "800", color: colors.text },
    time: { fontSize: 15, fontWeight: "600", color: colors.textMid, textAlign: "center" },
    lines: { alignSelf: "stretch", gap: 8, marginTop: 4 },
    line: { flexDirection: "row", alignItems: "center", gap: 10 },
    lineText: { flex: 1, fontSize: 14, color: colors.text, lineHeight: 19 },
    badge: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: colors.primary, borderRadius: 14, paddingHorizontal: 12, paddingVertical: 6 },
    badgeText: { color: "#FFFFFF", fontWeight: "700", fontSize: 13 },
    hint: { fontSize: 12, color: colors.textDim, textAlign: "center" },
    rateLabel: { fontSize: 14, fontWeight: "600", color: colors.textMid, marginTop: 6 },
    stars: { flexDirection: "row", gap: 6 },
    link: { flexDirection: "row", alignItems: "center", gap: 6, paddingVertical: 6 },
    linkText: { color: colors.primary, fontWeight: "600", fontSize: 14 },
  });
}

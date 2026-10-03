import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, Platform, SafeAreaView, ScrollView, Share, StyleSheet, Text, TextInput, View } from "react-native";
import { useAccountStore } from "../account/accountStore";
import { unlockSpeech } from "../audio/speakPrompt";
import BackButton from "../components/BackButton";
import PressScale from "../components/PressScale";
import QRCode from "../components/QRCode";
import { getAreaById } from "../content";
import { DUO_COLORS } from "../duo/colors";
import { acceptInvite, createInvite, getInvite, inviteLink, isValidCode, normalizeCode, type DuoInvite } from "../duo/duoApi";
import { duoPeople, useDuoStore } from "../duo/duoStore";
import { requestLocationPermissions } from "../geofencing/geofenceManager";
import { loadGuide } from "../guides/guidePreference";
import { tapMedium } from "../haptics";
import { localizedAreaText } from "../i18n/areaTranslations";
import { useLanguage } from "../i18n/LanguageContext";
import type { RootStackParamList } from "../navigation/types";
import { useOnline } from "../offline/connectivity";
import { useTourStore } from "../state/tourStore";
import { ApiError, savedIdentity } from "../social/api";
import { useTheme } from "../ThemeContext";
import { CONTENT_MAX_WIDTH, type ThemeColors } from "../theme";

type Nav = NativeStackNavigationProp<RootStackParamList, "DuoLobby">;

/**
 * Walk with a friend, before the walk: make an invite (code, QR code, share
 * link) or accept one, then both press Ready. When both are ready the room
 * starts the countdown and both phones open the tour together.
 */
export default function DuoLobbyScreen() {
  const navigation = useNavigation<Nav>();
  const { params } = useRoute() as unknown as { params: RootStackParamList["DuoLobby"] };
  const { language, t } = useLanguage();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const online = useOnline();
  const signedIn = useAccountStore((s) => !!s.account);

  const [code, setCode] = useState<string | null>(null);
  const [invite, setInvite] = useState<DuoInvite | null>(null);
  const [typed, setTyped] = useState("");
  const [problem, setProblem] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  const state = useDuoStore((s) => s.state);
  const myId = useDuoStore((s) => s.myId);
  const connect = useDuoStore((s) => s.connect);
  const send = useDuoStore((s) => s.send);
  const { me, friend } = duoPeople(state, myId);

  const tourId = state?.tour ?? invite?.tour ?? params?.areaId;
  const area = tourId ? getAreaById(tourId) : undefined;
  const tourName = area ? localizedAreaText(area.id, language, area).name : "";

  // Leaving the lobby any way other than into the walk closes the connection.
  const toTour = useRef(false);
  useEffect(
    () => () => {
      if (!toTour.current) useDuoStore.getState().disconnect();
    },
    []
  );

  // Opened from an invite link: look the invite up.
  useEffect(() => {
    const linked = params?.code ? normalizeCode(params.code) : null;
    if (!linked) return;
    setTyped(linked);
    void lookUp(linked);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.code]);

  // Both ready: the room has set the start time; open the tour on this phone.
  useEffect(() => {
    if (state?.status === "active" && code && area) {
      toTour.current = true;
      // As the tour page's Start button does: this tour, from the start.
      useTourStore.getState().selectArea(area.id);
      useTourStore.getState().arrivedAtStart();
      navigation.replace("ActiveTour", { areaId: area.id, duo: code });
    }
  }, [state?.status, code, area, navigation]);

  const fail = (e: unknown) => {
    if (e instanceof Error && e.message === "account") setProblem("needAccount");
    else if (e instanceof ApiError && (e.status === 404 || e.status === 409)) setProblem("expired");
    else setProblem(online ? "loadFailed" : "offline");
  };

  async function lookUp(c: string) {
    setProblem(null);
    setBusy(true);
    try {
      const found = await getInvite(c);
      setInvite(found);
      // Already part of it (e.g. reopened the link): straight back in.
      const id = (await savedIdentity())?.userId;
      if (id && (found.hostId === id || found.guestId === id)) await enter(c);
    } catch (e) {
      fail(e);
    } finally {
      setBusy(false);
    }
  }

  async function enter(c: string) {
    setCode(c);
    await connect(c);
  }

  const handleInvite = async () => {
    if (!area) return;
    setBusy(true);
    setProblem(null);
    try {
      const made = await createInvite(area.id, await loadGuide(area.id));
      setInvite(made);
      await enter(made.code);
    } catch (e) {
      fail(e);
    } finally {
      setBusy(false);
    }
  };

  const handleAccept = async () => {
    if (!invite) return;
    setBusy(true);
    setProblem(null);
    try {
      await acceptInvite(invite.code);
      await enter(invite.code);
    } catch (e) {
      fail(e);
    } finally {
      setBusy(false);
    }
  };

  const handleCode = () => {
    const c = normalizeCode(typed);
    if (!isValidCode(c)) {
      setProblem("codeInvalid");
      return;
    }
    void lookUp(c);
  };

  // Everything that needs a tap (sound, location permission) happens here, before the walk.
  const handleReady = () => {
    tapMedium();
    unlockSpeech();
    void requestLocationPermissions().catch(() => null);
    send({ t: "ready" });
  };

  const handleShare = async () => {
    if (!code) return;
    const link = inviteLink(code);
    const message = `${t("duo.shareText", { tour: tourName, code })} ${link}`;
    if (Platform.OS !== "web") {
      await Share.share({ message }).catch(() => null);
      return;
    }
    const nav = typeof navigator !== "undefined" ? navigator : null;
    if (nav?.share) {
      await nav.share({ text: message, url: link }).catch(() => null);
    } else if (nav?.clipboard) {
      await nav.clipboard.writeText(message).catch(() => null);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const goToAccount = () => navigation.navigate("MainTabs", { screen: "Account" } as never);

  const iAmHost = !!state && state.host.uid === myId;
  const showChoice = !code && !invite && !params?.code;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <BackButton variant="inline" />
        <Text style={styles.title}>{t("duo.title")}</Text>
        {!!tourName && <Text style={styles.tour}>{tourName}</Text>}

        {!signedIn ? (
          <View style={styles.card}>
            <Text style={styles.body}>{t("duo.needAccount")}</Text>
            <PressScale style={styles.secondary} scaleTo={0.97} onPress={goToAccount}>
              <Text style={styles.secondaryText}>{t("duo.goToAccount")}</Text>
            </PressScale>
          </View>
        ) : showChoice ? (
          <>
            <Text style={styles.body}>{t("duo.intro")}</Text>
            {area && (
              <PressScale style={styles.cta} scaleTo={0.97} onPress={handleInvite} disabled={busy}>
                <Ionicons name="people" size={20} color={colors.onPrimary} />
                <Text style={styles.ctaText}>{t("duo.invite")}</Text>
              </PressScale>
            )}
            <View style={styles.card}>
              <Text style={styles.label}>{t("duo.enterCode")}</Text>
              <View style={styles.codeRow}>
                <TextInput
                  style={styles.codeInput}
                  value={typed}
                  onChangeText={(v) => setTyped(normalizeCode(v))}
                  placeholder={t("duo.codePlaceholder")}
                  placeholderTextColor={colors.textFaint}
                  autoCapitalize="characters"
                  autoCorrect={false}
                  maxLength={6}
                  onSubmitEditing={handleCode}
                  aria-label={t("duo.enterCode")}
                />
                <PressScale style={styles.joinButton} scaleTo={0.96} onPress={handleCode} disabled={busy}>
                  <Text style={styles.ctaText}>{t("duo.join")}</Text>
                </PressScale>
              </View>
            </View>
          </>
        ) : !code && invite ? (
          // Someone else's invite: say who and what, then accept.
          <View style={styles.card}>
            <Text style={styles.body}>{t("duo.invitedYou", { name: invite.host })}</Text>
            <Text style={styles.inviteTour}>{tourName}</Text>
            <PressScale style={styles.cta} scaleTo={0.97} onPress={handleAccept} disabled={busy}>
              <Text style={styles.ctaText}>{t("duo.accept")}</Text>
            </PressScale>
          </View>
        ) : code && state?.status === "waiting" ? (
          <View style={styles.card}>
            <Text style={styles.label}>{t("duo.yourCode")}</Text>
            <Text style={styles.code} selectable aria-label={code.split("").join(" ")}>
              {code}
            </Text>
            <View style={styles.qr}>
              <QRCode value={inviteLink(code)} size={196} />
            </View>
            <Text style={styles.hint}>{t("duo.scanHint")}</Text>
            <PressScale style={styles.cta} scaleTo={0.97} onPress={handleShare}>
              <Ionicons name="share-outline" size={20} color={colors.onPrimary} />
              <Text style={styles.ctaText}>{copied ? t("duo.copied") : t("duo.shareInvite")}</Text>
            </PressScale>
            <View style={styles.waitingRow}>
              <ActivityIndicator color={colors.primary} />
              <Text style={styles.hint}>{t("duo.waitingForFriend")}</Text>
            </View>
          </View>
        ) : code && state?.status === "lobby" && me && friend ? (
          <View style={styles.card}>
            {iAmHost && <Text style={styles.joined}>{t("duo.joined", { name: friend.name })}</Text>}
            {[me, friend].map((m) => (
              <View key={m.uid} style={styles.memberRow}>
                <View style={[styles.avatar, m === me ? styles.avatarMe : styles.avatarFriend]}>
                  <Text style={styles.avatarText}>{m.name.slice(0, 1).toUpperCase()}</Text>
                </View>
                <Text style={styles.memberName}>{m === me ? `${m.name} (${t("duo.you")})` : m.name}</Text>
                <View style={styles.readyChip}>
                  <Ionicons
                    name={m.ready ? "checkmark-circle" : "ellipse-outline"}
                    size={18}
                    color={m.ready ? colors.success : colors.textDim}
                  />
                  <Text style={[styles.readyText, m.ready && { color: colors.success }]}>
                    {t(m.ready ? "duo.ready" : "duo.notReady")}
                  </Text>
                </View>
              </View>
            ))}
            {me.ready ? (
              <View style={styles.waitingRow}>
                <ActivityIndicator color={colors.primary} />
                <Text style={styles.hint}>{t("duo.waitingForReady", { name: friend.name })}</Text>
              </View>
            ) : (
              <>
                <Text style={styles.hint}>{t("duo.readyHint")}</Text>
                <PressScale style={styles.cta} scaleTo={0.97} onPress={handleReady}>
                  <Ionicons name="walk" size={20} color={colors.onPrimary} />
                  <Text style={styles.ctaText}>{t("duo.readyButton")}</Text>
                </PressScale>
              </>
            )}
          </View>
        ) : code && (state?.status === "ended" || state?.status === "complete") ? (
          <Text style={styles.problem}>{t("duo.expired")}</Text>
        ) : (
          (busy || (code && !state)) && <ActivityIndicator color={colors.primary} style={styles.loading} />
        )}

        {problem && (
          <View style={styles.card}>
            <Text style={styles.problem} role="alert">
              {t(`duo.${problem}`)}
            </Text>
            {problem === "needAccount" && (
              <PressScale style={styles.secondary} scaleTo={0.97} onPress={goToAccount}>
                <Text style={styles.secondaryText}>{t("duo.goToAccount")}</Text>
              </PressScale>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    scroll: { padding: 20, paddingTop: 16, gap: 14, width: "100%", maxWidth: CONTENT_MAX_WIDTH, alignSelf: "center" },
    title: { fontSize: 32, fontWeight: "700", color: colors.primary, marginTop: 4 },
    tour: { fontSize: 16, fontWeight: "600", color: colors.text },
    body: { fontSize: 15, color: colors.textMid, lineHeight: 22 },
    card: { backgroundColor: colors.surface, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: 18, gap: 12 },
    label: { fontSize: 13, fontWeight: "700", color: colors.textDim, textTransform: "uppercase", letterSpacing: 0.5 },
    hint: { fontSize: 13, color: colors.textMid, lineHeight: 19, flexShrink: 1 },
    cta: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      backgroundColor: colors.primary,
      borderRadius: 14,
      paddingVertical: 15,
      paddingHorizontal: 24,
    },
    ctaText: { color: colors.onPrimary, fontSize: 16, fontWeight: "700" },
    secondary: { borderWidth: 1, borderColor: colors.primary, borderRadius: 12, paddingVertical: 11, alignItems: "center" },
    secondaryText: { color: colors.primary, fontSize: 15, fontWeight: "600" },
    codeRow: { flexDirection: "row", gap: 10 },
    codeInput: {
      flex: 1,
      minWidth: 0,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.background,
      borderRadius: 12,
      paddingHorizontal: 14,
      paddingVertical: 12,
      fontSize: 22,
      fontWeight: "700",
      letterSpacing: 4,
      color: colors.text,
    },
    joinButton: { backgroundColor: colors.primary, borderRadius: 12, paddingHorizontal: 22, justifyContent: "center" },
    code: { fontSize: 44, fontWeight: "800", letterSpacing: 8, color: colors.text, textAlign: "center" },
    qr: { alignSelf: "center", padding: 8, backgroundColor: "#FFFFFF", borderRadius: 12 },
    waitingRow: { flexDirection: "row", alignItems: "center", gap: 10, justifyContent: "center" },
    inviteTour: { fontSize: 20, fontWeight: "700", color: colors.text },
    joined: { fontSize: 18, fontWeight: "700", color: colors.success },
    memberRow: { flexDirection: "row", alignItems: "center", gap: 12 },
    avatar: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center" },
    avatarMe: { backgroundColor: DUO_COLORS.me },
    avatarFriend: { backgroundColor: DUO_COLORS.friend },
    avatarText: { color: "#FFFFFF", fontWeight: "800", fontSize: 16 },
    memberName: { flex: 1, fontSize: 16, fontWeight: "600", color: colors.text },
    readyChip: { flexDirection: "row", alignItems: "center", gap: 4 },
    readyText: { fontSize: 13, color: colors.textDim, fontWeight: "600" },
    problem: { fontSize: 14, color: colors.warnText, lineHeight: 20 },
    loading: { padding: 30 },
  });
}

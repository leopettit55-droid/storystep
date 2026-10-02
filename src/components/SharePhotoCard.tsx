import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useAccountStore } from "../account/accountStore";
import type { Area } from "../content";
import { useLanguage } from "../i18n/LanguageContext";
import type { RootStackParamList } from "../navigation/types";
import { getLastFinish } from "../social/completions";
import { pickPhoto, type PickedPhoto } from "../social/pickPhoto";
import { sharePhoto } from "../social/photos";
import { useTheme } from "../ThemeContext";
import type { ThemeColors } from "../theme";
import PressScale from "./PressScale";

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Step = "idle" | "picked" | "sharing" | "shared";

/**
 * "Share a photo" on the tour-complete screen: pick or take a photo, choose
 * which stop it's from (the last stop by default; the photo is tagged with
 * that stop's location), public or private, then share it to the tour's
 * gallery along with the walk's time and date.
 */
export default function SharePhotoCard({ area }: { area: Area }) {
  const navigation = useNavigation<Nav>();
  const { t } = useLanguage();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const account = useAccountStore((s) => s.account);
  const [step, setStep] = useState<Step>("idle");
  const [photo, setPhoto] = useState<PickedPhoto | null>(null);
  const [stopId, setStopId] = useState(area.route[area.route.length - 1]?.id ?? "");
  const [isPublic, setIsPublic] = useState(true);
  const [problem, setProblem] = useState<string | null>(null);

  if (!account) {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>{t("photos.shareTitle")}</Text>
        <Text style={styles.body}>{t("photos.needAccount")}</Text>
        <PressScale
          style={styles.secondary}
          scaleTo={0.96}
          onPress={() => navigation.navigate("MainTabs", { screen: "Account" } as never)}
        >
          <Text style={styles.secondaryText}>{t("photos.goToAccount")}</Text>
        </PressScale>
      </View>
    );
  }

  const choose = async () => {
    setProblem(null);
    const picked = await pickPhoto();
    if (picked) {
      setPhoto(picked);
      setStep("picked");
    }
  };

  const share = async () => {
    if (!photo) return;
    setStep("sharing");
    setProblem(null);
    const finish = getLastFinish(area.id);
    try {
      await sharePhoto({
        tourId: area.id,
        stopId,
        isPublic,
        seconds: finish?.seconds ?? null,
        completedAt: finish?.completedAt ?? Date.now(),
        base64: photo.base64,
      });
      setStep("shared");
    } catch (e) {
      setProblem((e as Error).message || t("photos.shareFailed"));
      setStep("picked");
    }
  };

  if (step === "shared") {
    return (
      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons name="checkmark-circle" size={20} color={colors.success} />
          <Text style={styles.title}>{t(isPublic ? "photos.sharedPublic" : "photos.sharedPrivate")}</Text>
        </View>
        <PressScale
          style={styles.secondary}
          scaleTo={0.96}
          onPress={() => navigation.navigate("TourGallery", { areaId: area.id })}
        >
          <Text style={styles.secondaryText}>{t("photos.viewGallery")}</Text>
        </PressScale>
      </View>
    );
  }

  if (step === "idle") {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>{t("photos.shareTitle")}</Text>
        <Text style={styles.body}>{t("photos.shareBody")}</Text>
        <PressScale style={styles.secondary} scaleTo={0.96} onPress={choose}>
          <Ionicons name="camera-outline" size={17} color={colors.primary} />
          <Text style={styles.secondaryText}>{t("photos.choose")}</Text>
        </PressScale>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        {photo && <Image source={{ uri: photo.previewUri }} style={styles.preview} />}
        <View style={styles.grow}>
          <Text style={styles.label}>{t("photos.whichStop")}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
            {area.route.map((stop) => (
              <PressScale
                key={stop.id}
                style={[styles.chip, stopId === stop.id && styles.chipOn]}
                scaleTo={0.95}
                onPress={() => setStopId(stop.id)}
                aria-pressed={stopId === stop.id}
              >
                <Text style={[styles.chipText, stopId === stop.id && styles.chipTextOn]} numberOfLines={1}>
                  {stop.order}. {stop.name}
                </Text>
              </PressScale>
            ))}
          </ScrollView>
        </View>
      </View>

      <View style={styles.toggle} role="radiogroup">
        {[true, false].map((value) => (
          <PressScale
            key={String(value)}
            style={[styles.toggleOption, isPublic === value && styles.toggleOn]}
            scaleTo={0.97}
            onPress={() => setIsPublic(value)}
            role="radio"
            aria-checked={isPublic === value}
          >
            <Ionicons name={value ? "earth-outline" : "lock-closed-outline"} size={15} color={isPublic === value ? colors.onPrimary : colors.textMid} />
            <Text style={[styles.toggleText, isPublic === value && styles.toggleTextOn]}>
              {t(value ? "photos.public" : "photos.private")}
            </Text>
          </PressScale>
        ))}
      </View>
      <Text style={styles.hint}>{t(isPublic ? "photos.publicHint" : "photos.privateHint")}</Text>

      {problem && <Text style={styles.problem}>{problem}</Text>}

      <View style={styles.actions}>
        <PressScale style={styles.primary} scaleTo={0.96} onPress={share} disabled={step === "sharing"}>
          {step === "sharing" ? (
            <ActivityIndicator color={colors.onPrimary} />
          ) : (
            <Text style={styles.primaryText}>{t("photos.share")}</Text>
          )}
        </PressScale>
        <PressScale style={styles.textButton} scaleTo={0.96} onPress={() => setStep("idle")} disabled={step === "sharing"}>
          <Text style={styles.textButtonText}>{t("photos.cancel")}</Text>
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
      marginTop: 16,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 16,
      padding: 16,
      gap: 10,
    },
    row: { flexDirection: "row", alignItems: "center", gap: 10 },
    grow: { flex: 1, minWidth: 0 },
    title: { color: colors.text, fontSize: 16, fontWeight: "700" },
    body: { color: colors.textMid, fontSize: 14, lineHeight: 20 },
    label: { color: colors.textDim, fontSize: 12, fontWeight: "600", marginBottom: 6 },
    preview: { width: 72, height: 72, borderRadius: 10, backgroundColor: colors.surfaceRaised },
    chips: { gap: 6 },
    chip: { borderWidth: 1, borderColor: colors.border, borderRadius: 16, paddingVertical: 6, paddingHorizontal: 10, maxWidth: 200 },
    chipOn: { borderColor: colors.primary, backgroundColor: colors.background },
    chipText: { color: colors.textMid, fontSize: 12 },
    chipTextOn: { color: colors.primary, fontWeight: "700" },
    toggle: { flexDirection: "row", borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 3, gap: 3 },
    toggleOption: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, paddingVertical: 8, borderRadius: 9 },
    toggleOn: { backgroundColor: colors.primary },
    toggleText: { color: colors.textMid, fontSize: 14, fontWeight: "600" },
    toggleTextOn: { color: colors.onPrimary },
    hint: { color: colors.textDim, fontSize: 12, lineHeight: 17 },
    problem: { color: colors.warnText, fontSize: 13 },
    actions: { flexDirection: "row", alignItems: "center", gap: 12 },
    primary: { flex: 1, backgroundColor: colors.primary, borderRadius: 12, paddingVertical: 12, alignItems: "center", minHeight: 46, justifyContent: "center" },
    primaryText: { color: colors.onPrimary, fontSize: 15, fontWeight: "700" },
    secondary: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      borderWidth: 1.5,
      borderColor: colors.primary,
      borderRadius: 12,
      paddingVertical: 11,
    },
    secondaryText: { color: colors.primary, fontSize: 15, fontWeight: "600" },
    textButton: { paddingVertical: 10, paddingHorizontal: 8 },
    textButtonText: { color: colors.textMid, fontSize: 14, fontWeight: "600" },
  });
}

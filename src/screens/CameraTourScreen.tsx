import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import LandmarkResultCard from "../components/LandmarkResultCard";
import PressScale from "../components/PressScale";
import type { Coordinates } from "../content";
import { notifyError, notifySuccess } from "../haptics";
import { useLanguage } from "../i18n/LanguageContext";
import { primeLandmarkAudio, stopLandmarkSpeech, useLandmarkSpeech } from "../landmark/landmarkSpeech";
import { GOOGLE_VISION_API_KEY } from "../landmark/recognize";
import { describeMatch, scanLandmark, speakMatch, type ScanOutcome } from "../landmark/scan";
import type { RootStackParamList } from "../navigation/types";
import { useTourStore } from "../state/tourStore";
import { colors } from "../theme";

type Nav = NativeStackNavigationProp<RootStackParamList, "CameraTour">;

/** Position for the scan: the running tour's latest fix, else a one-off reading. */
async function currentPosition(): Promise<Coordinates | null> {
  const fromTour = useTourStore.getState().lastKnownLocation;
  if (fromTour) return fromTour;
  try {
    const perm = await Location.getForegroundPermissionsAsync();
    if (!perm.granted) return null;
    const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
    return { lat: loc.coords.latitude, lng: loc.coords.longitude };
  } catch {
    return null;
  }
}

/** The camera scanner for native devices (the web build uses the richer
 * ARCamera screen, which also knows the compass heading). Same recognise →
 * pause the tour → speak → resume flow. */
export default function CameraTourScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute();
  const areaId = (route.params as { areaId?: string } | undefined)?.areaId;
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const { t } = useLanguage();
  const speaking = useLandmarkSpeech((s) => s.speaking);

  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [outcome, setOutcome] = useState<ScanOutcome | null>(null);

  useEffect(() => {
    // Never leave the tour paused if the visitor leaves mid-narration.
    return () => stopLandmarkSpeech();
  }, []);

  const handleScan = async () => {
    primeLandmarkAudio();
    if (!cameraRef.current || scanning) return;
    setScanning(true);
    setError(null);
    setOutcome(null);
    try {
      const photo = await cameraRef.current.takePictureAsync({
        base64: true,
        quality: 0.5,
      });
      if (!photo?.base64) throw new Error(t("camera.errorCouldntCapture"));
      // On web, expo-camera returns a full "data:image/jpeg;base64,..." data URI
      // instead of raw base64 — strip the prefix or the Vision API rejects it.
      const rawBase64 = photo.base64.includes(",")
        ? photo.base64.slice(photo.base64.indexOf(",") + 1)
        : photo.base64;
      const result = await scanLandmark({
        base64: rawBase64,
        areaId,
        user: await currentPosition(),
        headingDeg: null,
      });
      setOutcome(result);
      if (result.shown) notifySuccess();
      else notifyError();
    } catch (e) {
      notifyError();
      setError(e instanceof Error ? e.message : t("camera.errorGeneric"));
    } finally {
      setScanning(false);
    }
  };

  const handlePickAlternative = (id: string) => {
    if (!outcome) return;
    const { best, alternatives } = outcome.recognition;
    const picked = alternatives.find((a) => a.landmark.id === id);
    if (!picked) return;
    const rest = alternatives.filter((a) => a.landmark.id !== id);
    setOutcome({
      ...outcome,
      recognition: { ...outcome.recognition, best: picked, alternatives: best ? [best, ...rest] : rest },
      shown: describeMatch(picked),
    });
    void speakMatch(picked);
  };

  if (!permission) {
    return <SafeAreaView style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionWrap}>
          <Text style={styles.permissionTitle}>{t("camera.permissionTitle")}</Text>
          <Text style={styles.permissionBody}>{t("camera.permissionBody")}</Text>
          <Pressable style={styles.cta} onPress={requestPermission}>
            <Text style={styles.ctaText}>{t("camera.allowCamera")}</Text>
          </Pressable>
          <Pressable style={styles.backLink} onPress={() => navigation.goBack()}>
            <Text style={styles.backLinkText}>{t("camera.back")}</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const rec = outcome?.recognition;
  const hint = outcome?.visionError
    ? "Couldn't read the picture, so this is based on where you're standing."
    : outcome && !rec?.usedPosition
      ? "No GPS fix — with location on, this gets more accurate."
      : undefined;

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={StyleSheet.absoluteFill} facing="back" />

      <SafeAreaView style={styles.overlay} pointerEvents="box-none">
        <Pressable style={styles.closeButton} onPress={() => navigation.goBack()}>
          <Text style={styles.closeButtonText}>{t("camera.close")}</Text>
        </Pressable>

        <View style={styles.bottomSheet}>
          {!GOOGLE_VISION_API_KEY && <Text style={styles.error}>{t("camera.noKey")}</Text>}

          {error && <Text style={styles.error}>{error}</Text>}

          {outcome?.shown && (
            <LandmarkResultCard
              title={outcome.shown.title}
              body={outcome.shown.body}
              note={outcome.shown.note}
              speaking={speaking}
              onStop={stopLandmarkSpeech}
              alternatives={(rec?.alternatives ?? []).map((a) => ({ id: a.landmark.id, name: a.landmark.name }))}
              onPickAlternative={handlePickAlternative}
              hint={hint}
            />
          )}
          {outcome && !outcome.shown && !error && <Text style={styles.hint}>{t("camera.hint")}</Text>}

          <PressScale
            style={[styles.scanButton, scanning && styles.scanButtonDisabled]}
            scaleTo={0.96}
            onPress={handleScan}
            disabled={scanning}
          >
            {scanning ? (
              <ActivityIndicator color={colors.onPrimary} />
            ) : (
              <Text style={styles.scanButtonText}>{t("camera.scanButton")}</Text>
            )}
          </PressScale>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  overlay: {
    flex: 1,
    justifyContent: "space-between",
  },
  closeButton: {
    alignSelf: "flex-end",
    margin: 16,
    backgroundColor: "rgba(0,0,0,0.55)",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  closeButtonText: { color: "#fff", fontSize: 14, fontWeight: "600" },
  bottomSheet: {
    backgroundColor: "rgba(255,255,255,0.96)",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    gap: 12,
  },
  hint: { color: colors.textMid, fontSize: 14, textAlign: "center" },
  error: { color: colors.warnText, fontSize: 13, textAlign: "center" },
  scanButton: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  scanButtonDisabled: { opacity: 0.7 },
  scanButtonText: { color: colors.onPrimary, fontSize: 16, fontWeight: "700" },
  // The permission screen sits directly on the black `container` (there's no
  // camera feed or light bottomSheet behind it yet), so its text needs its
  // own light colors rather than the theme's — colors.text is dark-on-light
  // and would be nearly invisible here.
  permissionWrap: { flex: 1, alignItems: "center", justifyContent: "center", padding: 32, gap: 12 },
  permissionTitle: { fontSize: 22, fontWeight: "700", color: "#FFFFFF", textAlign: "center" },
  permissionBody: { fontSize: 14, color: "rgba(255,255,255,0.75)", textAlign: "center" },
  cta: {
    marginTop: 12,
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 32,
  },
  ctaText: { color: colors.onPrimary, fontSize: 16, fontWeight: "700" },
  backLink: { marginTop: 8, padding: 8 },
  backLinkText: { color: "rgba(255,255,255,0.6)", fontSize: 14, textDecorationLine: "underline" },
});

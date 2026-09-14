import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import PressScale from "../components/PressScale";
import { notifyError, notifySuccess } from "../haptics";
import { useLanguage } from "../i18n/LanguageContext";
import { GOOGLE_VISION_API_KEY, identifyLandmark, type LandmarkResult } from "../landmark/identifyLandmark";
import type { RootStackParamList } from "../navigation/types";
import { colors } from "../theme";

type Nav = NativeStackNavigationProp<RootStackParamList, "CameraTour">;

export default function CameraTourScreen() {
  const navigation = useNavigation<Nav>();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const { t } = useLanguage();

  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<LandmarkResult[] | null>(null);

  const handleScan = async () => {
    if (!cameraRef.current || scanning) return;
    setScanning(true);
    setError(null);
    setResults(null);
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
      const landmarks = await identifyLandmark(rawBase64);
      setResults(landmarks);
      if (landmarks.length > 0) {
        notifySuccess();
      } else {
        notifyError();
      }
    } catch (e) {
      notifyError();
      setError(e instanceof Error ? e.message : t("camera.errorGeneric"));
    } finally {
      setScanning(false);
    }
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

          {results && results.length === 0 && !error && (
            <Text style={styles.hint}>{t("camera.hint")}</Text>
          )}

          {results && results.length > 0 && (
            <View style={styles.resultCard}>
              <Text style={styles.resultName}>{results[0].name}</Text>
              <Text style={styles.resultScore}>
                {t("camera.matchPercent", { percent: Math.round(results[0].score * 100) })}
              </Text>
              <Text style={styles.resultBody} numberOfLines={6}>
                {results[0].ourScript ?? t("camera.noScriptFallback")}
              </Text>
            </View>
          )}

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
  resultCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  resultName: { fontSize: 20, fontWeight: "700", color: colors.text },
  resultScore: { fontSize: 12, color: colors.textDim, marginTop: 2 },
  resultBody: { fontSize: 14, color: colors.textMid, marginTop: 8, lineHeight: 20 },
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

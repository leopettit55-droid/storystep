import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert, Platform, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import BackButton from "../components/BackButton";
import PressScale from "../components/PressScale";
import RouteMap from "../components/RouteMap";
import Skeleton from "../components/Skeleton";
import { getAreaById } from "../content";
import { requestOrientationPermission } from "../landmark/orientationPermission";
import { localizedAreaText } from "../i18n/areaTranslations";
import { useLanguage } from "../i18n/LanguageContext";
import type { RootStackParamList } from "../navigation/types";
import { hasTourAccess } from "../purchases/entitlements";
import { openTourCheckout, stripeIsConfigured } from "../purchases/stripeConfig";
import OfflineTourCard from "../components/OfflineTourCard";
import { useOnline } from "../offline/connectivity";
import { useOfflineStore } from "../offline/offlineStore";
import { isBundledTour, offlineDownloadsSupported } from "../offline/tourFiles";
import { clearTourProgress, loadTourProgress, type SavedProgress } from "../state/tourProgress";
import { useTourStore } from "../state/tourStore";
import { useTheme } from "../ThemeContext";
import { CONTENT_MAX_WIDTH, type ThemeColors } from "../theme";
import { unlockSpeech } from "../audio/speakPrompt";
import { duoCount } from "../duo/duoApi";

type Nav = NativeStackNavigationProp<RootStackParamList, "TourPreview">;
type RouteProp = { params: { areaId: string } };

export default function TourPreviewScreen() {
  const navigation = useNavigation<Nav>();
  const { params } = useRoute() as unknown as RouteProp;
  const area = getAreaById(params.areaId);
  const selectArea = useTourStore((s) => s.selectArea);
  const [owned, setOwned] = useState<boolean | null>(null);
  /** Unfinished progress on this device (under 7 days old), offered as "Continue". */
  const [saved, setSaved] = useState<SavedProgress | null>(null);
  /** Set while "Download before you go?" is showing: what to do once answered. */
  const [downloadOffer, setDownloadOffer] = useState<{ go: () => void } | null>(null);
  /** How many pairs have walked this tour together (shown once there are some). */
  const [duos, setDuos] = useState(0);
  useEffect(() => {
    if (!area || area.scannerOnly) return;
    let cancelled = false;
    duoCount(area.id)
      .then((n) => !cancelled && setDuos(n))
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [area]);
  const online = useOnline();
  const offlineStatus = useOfflineStore((s) => (area ? s.tours[area.id]?.status : undefined));
  const { language, t } = useLanguage();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  useFocusEffect(
    useCallback(() => {
      if (!area) return;
      let cancelled = false;
      setOwned(null);
      hasTourAccess(area.id).then((result) => {
        if (!cancelled) setOwned(result);
      });
      loadTourProgress(area.id).then((progress) => {
        if (!cancelled) setSaved(progress);
      });
      return () => {
        cancelled = true;
      };
    }, [area?.id])
  );

  if (!area) {
    return (
      <SafeAreaView style={styles.container}>
        <BackButton variant="inline" style={styles.notFoundBack} />
        <Text style={styles.title}>{t("tourPreview.areaNotFound")}</Text>
      </SafeAreaView>
    );
  }

  const text = localizedAreaText(area.id, language, area);
  const scannerOnly = !!area.scannerOnly;

  // Before walking off, offer to save a tour that isn't downloaded yet, so a
  // lost signal on the way doesn't stop the narration. Only while online.
  const offerDownloadFirst = (go: () => void) => () => {
    const worthOffering =
      offlineDownloadsSupported() && !isBundledTour(area) && offlineStatus !== "ready" && online;
    if (worthOffering) setDownloadOffer({ go });
    else go();
  };

  const handleDownloadThenStart = async () => {
    const go = downloadOffer?.go;
    setDownloadOffer(null);
    await useOfflineStore.getState().download(area.id);
    go?.();
  };

  const handleStartWithoutDownload = () => {
    const go = downloadOffer?.go;
    setDownloadOffer(null);
    go?.();
  };

  const handleStartTour = () => {
    selectArea(area.id);
    navigation.navigate("ActiveTour", { areaId: area.id });
  };

  // Straight back into the tour at the saved stop — no "Get to the start",
  // and stop 1 doesn't replay.
  const handleContinue = () => {
    if (!saved) return;
    unlockSpeech();
    selectArea(area.id);
    useTourStore.getState().resumeAt(saved.currentIndex, saved.visitedIds);
    navigation.navigate("ActiveTour", { areaId: area.id, resume: true });
  };

  const handleStartAgain = () => {
    setSaved(null);
    void clearTourProgress(area.id);
    handleStartTour();
  };

  // Free for everyone, no purchase needed. On the web it opens the camera
  // scanner (asking for compass access first, straight from this tap); on
  // native it opens the standard landmark camera.
  const handleOpenScanner = async () => {
    if (Platform.OS === 'web') {
      const orientationGranted = await requestOrientationPermission();
      navigation.navigate('ARCamera', { areaId: area.id, orientationGranted, mode: 'scanner' });
    } else {
      navigation.navigate('CameraTour', { areaId: area.id });
    }
  };

  const handleBuy = async () => {
    if (!stripeIsConfigured.singleTour) {
      Alert.alert(t("tourPreview.paymentsNotSetTitle"), t("tourPreview.paymentsNotSetBody"));
      return;
    }
    await openTourCheckout(area.id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <RouteMap
        style={styles.map}
        region={{
          lat: area.startingPoint.lat,
          lng: area.startingPoint.lng,
          latDelta: 0.012,
          lngDelta: 0.012,
        }}
        pins={[
          {
            id: "start",
            lat: area.startingPoint.lat,
            lng: area.startingPoint.lng,
            color: colors.primary,
            title: t("common.start"),
          },
          ...(scannerOnly
            ? (area.landmarks ?? []).map((l) => ({
                id: l.id,
                lat: l.coordinates.lat,
                lng: l.coordinates.lng,
                color: colors.mapPinNeutral,
                title: l.name,
              }))
            : area.route.map((w) => ({
                id: w.id,
                lat: w.coordinates.lat,
                lng: w.coordinates.lng,
                color: colors.mapPinNeutral,
                title: `${w.order}. ${w.name}`,
              }))),
        ]}
        polyline={
          scannerOnly
            ? undefined
            : area.path ?? area.route.map((w) => ({ lat: w.coordinates.lat, lng: w.coordinates.lng }))
        }
      />

      <View style={styles.sheet}>
        <View style={styles.sheetInner}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{text.name}</Text>
          {!scannerOnly && <Text style={styles.price}>{t("common.free")}</Text>}
        </View>
        {!scannerOnly && (
          <>
            <Text style={styles.meta}>
              {area.estimatedDurationMin} {t("common.min")} · {area.estimatedDistanceKm} {t("common.km")} ·{" "}
              {area.route.length} {t("common.stops")}
            </Text>
            <Text style={styles.startLabel}>
              {t("tourPreview.startsAt", { label: area.startingPoint.label })}
            </Text>

            {/* The stops, in walking order, so people can see what the tour
                covers before they head to the start. Scrolls if a tour is long,
                so the map above always keeps most of the screen. */}
            {area.route.length > 0 && (
              <ScrollView style={styles.stopList} nestedScrollEnabled>
                {area.route.map((w) => (
                  <View key={w.id} style={styles.stopRow}>
                    <View style={styles.stopNumber}>
                      <Text style={styles.stopNumberText}>{w.order}</Text>
                    </View>
                    <Text style={styles.stopName} numberOfLines={2}>
                      {w.name}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            )}
          </>
        )}

        {area.accessNote && <Text style={styles.accessNote}>{area.accessNote}</Text>}

        {!scannerOnly && downloadOffer ? (
          <View style={styles.offer}>
            <Text style={styles.offerTitle}>{t("offline.offerTitle")}</Text>
            <Text style={styles.offerBody}>{t("offline.offerBody")}</Text>
            <PressScale style={styles.cta} scaleTo={0.96} onPress={handleDownloadThenStart}>
              <Text style={styles.ctaText}>{t("offline.offerDownload")}</Text>
            </PressScale>
            <PressScale style={styles.startAgain} scaleTo={0.96} onPress={handleStartWithoutDownload}>
              <Text style={styles.startAgainText}>{t("offline.offerSkip")}</Text>
            </PressScale>
          </View>
        ) : null}

        {!scannerOnly && !downloadOffer &&
          (owned === null ? (
            <Skeleton style={[styles.cta, styles.ctaSkeleton]} borderRadius={14} />
          ) : owned && saved ? (
            <>
              <PressScale style={styles.cta} scaleTo={0.96} onPress={offerDownloadFirst(handleContinue)}>
                <Text style={styles.ctaText}>
                  {t("tourPreview.continueFromStop", { number: saved.currentIndex + 1 })}
                </Text>
              </PressScale>
              <PressScale style={styles.startAgain} scaleTo={0.96} onPress={handleStartAgain}>
                <Text style={styles.startAgainText}>{t("tourPreview.startAgain")}</Text>
              </PressScale>
            </>
          ) : owned ? (
            <PressScale style={styles.cta} scaleTo={0.96} onPress={offerDownloadFirst(handleStartTour)}>
              <Text style={styles.ctaText}>{t("activeTour.startTour")}</Text>
            </PressScale>
          ) : (
            <PressScale style={styles.cta} scaleTo={0.96} onPress={handleBuy}>
              <Text style={styles.ctaText}>
                {t("tourPreview.buyTour", { price: `£${area.price.singleTour.toFixed(2)}` })}
              </Text>
            </PressScale>
          ))}

        {!scannerOnly && !downloadOffer && owned && (
          <PressScale
            style={styles.duoButton}
            scaleTo={0.97}
            onPress={() => navigation.navigate("DuoLobby", { areaId: area.id })}
          >
            <View style={styles.duoIcon}>
              <Ionicons name="people" size={20} color={colors.onPrimary} />
            </View>
            <View style={styles.duoText}>
              <Text style={styles.duoTitle}>{t("duo.walkWithFriend")}</Text>
              <Text style={styles.duoBody}>
                {duos > 0 ? (duos === 1 ? t("duo.duosCountOne") : t("duo.duosCount", { count: duos })) : t("duo.walkWithFriendBody")}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textDim} />
          </PressScale>
        )}

        {!scannerOnly && <OfflineTourCard area={area} />}

        {!scannerOnly && (
          <PressScale
            style={styles.galleryLink}
            scaleTo={0.97}
            onPress={() => navigation.navigate("TourGallery", { areaId: area.id })}
          >
            <Ionicons name="images-outline" size={17} color={colors.primary} />
            <Text style={styles.galleryLinkText}>{t("photos.galleryLink")}</Text>
          </PressScale>
        )}

        {area.freeLandmarkScanner && (
          <PressScale style={styles.scannerButton} scaleTo={0.96} onPress={handleOpenScanner}>
            <Ionicons name="scan" size={18} color={colors.primary} />
            <View>
              <Text style={styles.scannerButtonText}>{t('tourPreview.useScanner')}</Text>
              {!scannerOnly && <Text style={styles.scannerButtonSub}>{t('tourPreview.scannerFree')}</Text>}
            </View>
          </PressScale>
        )}
        </View>
      </View>
    </SafeAreaView>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  notFoundBack: { margin: 16 },
  map: { flex: 1 },
  sheet: {
    padding: 20,
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 1,
    borderColor: colors.border,
  },
  // Keeps the details and buttons at a readable width on desktop.
  sheetInner: { width: "100%", maxWidth: CONTENT_MAX_WIDTH, alignSelf: "center" },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 24, fontWeight: "700", color: colors.text },
  price: { fontSize: 18, fontWeight: "700", color: colors.primary },
  meta: { fontSize: 14, color: colors.textMid, marginTop: 6 },
  startLabel: { fontSize: 13, color: colors.textDim, marginTop: 4 },
  stopList: { maxHeight: 150, marginTop: 12 },
  stopRow: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 5 },
  stopNumber: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  stopNumberText: { color: colors.primary, fontSize: 11, fontWeight: "700" },
  stopName: { flex: 1, fontSize: 14, color: colors.text },
  cta: {
    marginTop: 16,
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  ctaText: { color: colors.onPrimary, fontSize: 16, fontWeight: "600" },
  ctaSkeleton: { height: 52 },
  duoButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 12,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  duoIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center" },
  duoText: { flex: 1, gap: 2 },
  duoTitle: { color: colors.text, fontSize: 16, fontWeight: "700" },
  duoBody: { color: colors.textMid, fontSize: 13, lineHeight: 18 },
  galleryLink: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 10, paddingVertical: 10 },
  galleryLinkText: { color: colors.primary, fontSize: 14, fontWeight: "600" },
  offer: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 14,
    padding: 14,
  },
  offerTitle: { color: colors.text, fontSize: 16, fontWeight: "700" },
  offerBody: { color: colors.textMid, fontSize: 13, lineHeight: 19, marginTop: 4 },
  startAgain: { marginTop: 8, paddingVertical: 10, alignItems: "center" },
  startAgainText: { color: colors.textMid, fontSize: 14, fontWeight: "600", textDecorationLine: "underline" },
  accessNote: {
    fontSize: 12,
    lineHeight: 17,
    color: colors.textMid,
    marginTop: 12,
    backgroundColor: colors.warnBg,
    borderRadius: 10,
    padding: 10,
  },
  scannerButton: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 12,
  },
  scannerButtonText: { color: colors.primary, fontSize: 15, fontWeight: '700' },
  scannerButtonSub: { color: colors.textDim, fontSize: 11, marginTop: 1 },
  });
}

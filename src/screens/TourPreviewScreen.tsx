import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useMemo, useState } from "react";
import { Alert, Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";
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
import { useTourStore } from "../state/tourStore";
import { useTheme } from "../ThemeContext";
import { CONTENT_MAX_WIDTH, type ThemeColors } from "../theme";

type Nav = NativeStackNavigationProp<RootStackParamList, "TourPreview">;
type RouteProp = { params: { areaId: string } };

export default function TourPreviewScreen() {
  const navigation = useNavigation<Nav>();
  const { params } = useRoute() as unknown as RouteProp;
  const area = getAreaById(params.areaId);
  const selectArea = useTourStore((s) => s.selectArea);
  const [owned, setOwned] = useState<boolean | null>(null);
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

  const handleGetToStart = () => {
    selectArea(area.id);
    navigation.navigate("GetToStart", { areaId: area.id });
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
          </>
        )}

        {area.accessNote && <Text style={styles.accessNote}>{area.accessNote}</Text>}

        {!scannerOnly &&
          (owned === null ? (
            <Skeleton style={[styles.cta, styles.ctaSkeleton]} borderRadius={14} />
          ) : owned ? (
            <PressScale style={styles.cta} scaleTo={0.96} onPress={handleGetToStart}>
              <Text style={styles.ctaText}>{t("tourPreview.getMeToStart")}</Text>
            </PressScale>
          ) : (
            <PressScale style={styles.cta} scaleTo={0.96} onPress={handleBuy}>
              <Text style={styles.ctaText}>
                {t("tourPreview.buyTour", { price: `£${area.price.singleTour.toFixed(2)}` })}
              </Text>
            </PressScale>
          ))}

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
  cta: {
    marginTop: 16,
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  ctaText: { color: colors.onPrimary, fontSize: 16, fontWeight: "600" },
  ctaSkeleton: { height: 52 },
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

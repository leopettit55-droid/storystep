import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useMemo, useState } from "react";
import { Alert, SafeAreaView, StyleSheet, Text, View } from "react-native";
import BackButton from "../components/BackButton";
import PressScale from "../components/PressScale";
import RouteMap from "../components/RouteMap";
import Skeleton from "../components/Skeleton";
import { getAreaById } from "../content";
import { localizedAreaText } from "../i18n/areaTranslations";
import { useLanguage } from "../i18n/LanguageContext";
import type { RootStackParamList } from "../navigation/types";
import { hasTourAccess } from "../purchases/entitlements";
import { openTourCheckout, stripeIsConfigured } from "../purchases/stripeConfig";
import { useTourStore } from "../state/tourStore";
import { useTheme } from "../ThemeContext";
import type { ThemeColors } from "../theme";

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

  const handleGetToStart = () => {
    selectArea(area.id);
    navigation.navigate("GetToStart", { areaId: area.id });
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
          ...area.route.map((w) => ({
            id: w.id,
            lat: w.coordinates.lat,
            lng: w.coordinates.lng,
            color: colors.mapPinNeutral,
            title: `${w.order}. ${w.name}`,
          })),
        ]}
        polyline={
          area.path ?? area.route.map((w) => ({ lat: w.coordinates.lat, lng: w.coordinates.lng }))
        }
      />

      <View style={styles.sheet}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{text.name}</Text>
          <Text style={styles.price}>£{area.price.singleTour.toFixed(2)}</Text>
        </View>
        <Text style={styles.meta}>
          {area.estimatedDurationMin} {t("common.min")} · {area.estimatedDistanceKm} {t("common.km")} ·{" "}
          {area.route.length} {t("common.stops")}
        </Text>
        <Text style={styles.startLabel}>
          {t("tourPreview.startsAt", { label: area.startingPoint.label })}
        </Text>

        {owned === null ? (
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
        )}
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
  });
}

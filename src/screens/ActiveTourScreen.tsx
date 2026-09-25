import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useMemo, useRef } from "react";
import { Platform, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import PressScale from "../components/PressScale";
import { notifySuccess } from "../haptics";
import {
  isNarrationPlaying,
  pauseNarration,
  playWaypointNarration,
  replayCurrentNarration,
  resumeNarration,
  setNarrationEndedHandler,
  setupAudioPlayback,
  stopNarration,
} from "../audio/narrationPlayer";
import { getAreaById } from "../content";
import {
  setGeofenceEnterHandler,
  startWaypointGeofencing,
  stopWaypointGeofencing,
} from "../geofencing/geofenceManager";
import { ProximityTracker } from "../geofencing/proximityTracker";
import { requestOrientationPermission } from "../landmark/orientationPermission";
import { localizedAreaText } from "../i18n/areaTranslations";
import { useLanguage } from "../i18n/LanguageContext";
import type { RootStackParamList } from "../navigation/types";
import {
  selectCurrentWaypoint,
  selectNextWaypoint,
  selectProgress,
  useTourStore,
} from "../state/tourStore";
import { useTheme } from "../ThemeContext";
import type { ThemeColors } from "../theme";
import CharacterGuide from "../components/CharacterGuide";

type Nav = NativeStackNavigationProp<RootStackParamList, "ActiveTour">;
type RouteProp = { params: { areaId: string } };

export default function ActiveTourScreen() {
  const navigation = useNavigation<Nav>();
  const { params } = useRoute() as unknown as RouteProp;
  const area = getAreaById(params.areaId);
  const { language, t } = useLanguage();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const status = useTourStore((s) => s.status);
  const isOffRoute = useTourStore((s) => s.isOffRoute);
  const currentWaypoint = useTourStore(selectCurrentWaypoint);
  const nextWaypoint = useTourStore(selectNextWaypoint);
  const progress = useTourStore(selectProgress);
  const enterWaypoint = useTourStore((s) => s.enterWaypoint);
  const pause = useTourStore((s) => s.pause);
  const resume = useTourStore((s) => s.resume);
  const skipToNext = useTourStore((s) => s.skipToNext);
  const skipToPrevious = useTourStore((s) => s.skipToPrevious);
  const setOffRoute = useTourStore((s) => s.setOffRoute);
  const setLastKnownLocation = useTourStore((s) => s.setLastKnownLocation);
  const completeTour = useTourStore((s) => s.completeTour);

  const trackerRef = useRef<ProximityTracker | null>(null);
  const visitedRef = useRef(new Set<string>());
  /** A stop that fired while the previous narration was still playing (sequential tours only). */
  const queuedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!area) return;

    let cancelled = false;

    // The stop the walker should reach next: the one after the last stop whose
    // narration started (or the first stop, before anything has played).
    const expectedIndex = () => {
      const s = useTourStore.getState();
      const cur = s.area?.route[s.currentWaypointIndex];
      return cur && s.visitedWaypointIds.includes(cur.id) ? s.currentWaypointIndex + 1 : Math.max(0, s.currentWaypointIndex);
    };

    const handleWaypointEnter = (waypointId: string) => {
      if (visitedRef.current.has(waypointId)) return;
      const waypoint = area.route.find((w) => w.id === waypointId);
      if (!waypoint) return;

      // Compact routes (a college's courtyards sit closer together than GPS
      // can separate) fire stops strictly in order and never talk over the
      // narration still playing. A stop that arrives early is parked and
      // played as soon as the current one finishes; the tracker is re-armed
      // so a stop that fired too soon or out of order can fire again later.
      if (area.sequentialStops) {
        const idx = area.route.indexOf(waypoint);
        if (idx !== expectedIndex()) {
          trackerRef.current?.resetTriggeredWaypoint(waypointId);
          return;
        }
        if (isNarrationPlaying()) {
          queuedRef.current = waypointId;
          trackerRef.current?.resetTriggeredWaypoint(waypointId);
          return;
        }
      }

      queuedRef.current = null;
      visitedRef.current.add(waypointId);
      enterWaypoint(waypointId);
      void playWaypointNarration(waypoint);
    };

    const handleNarrationEnded = () => {
      if (queuedRef.current) {
        handleWaypointEnter(queuedRef.current);
        return;
      }
      const current = selectCurrentWaypoint(useTourStore.getState());
      if (!current) return;
      const isLast = current.id === area.route[area.route.length - 1]?.id;
      if (isLast) {
        notifySuccess();
        completeTour();
      }
    };

    (async () => {
      await setupAudioPlayback();
      if (cancelled) return;

      setGeofenceEnterHandler(handleWaypointEnter);
      setNarrationEndedHandler(handleNarrationEnded);

      // Each of these depends on platform capabilities that can be partial
      // (e.g. no OS geofencing on web) — isolate failures so one missing
      // capability never blocks narration from playing at all.
      try {
        await startWaypointGeofencing(area.route);
      } catch (e) {
        console.warn("[ActiveTourScreen] geofencing unavailable:", e);
      }

      try {
        trackerRef.current = new ProximityTracker(area.route, {
          onNearWaypoint: (waypoint) => handleWaypointEnter(waypoint.id),
          onOffRoute: setOffRoute,
          onLocationUpdate: setLastKnownLocation,
        });
        await trackerRef.current.start();
      } catch (e) {
        console.warn("[ActiveTourScreen] location tracking unavailable:", e);
      }

      // First waypoint is usually right at the starting point — trigger it
      // immediately rather than waiting for the next GPS fix.
      if (area.route[0]) handleWaypointEnter(area.route[0].id);
    })();

    return () => {
      cancelled = true;
      setGeofenceEnterHandler(null);
      setNarrationEndedHandler(null);
      void stopWaypointGeofencing();
      trackerRef.current?.stop();
      stopNarration();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [area?.id]);

  if (!area) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.waypointName}>{t("activeTour.areaNotFound")}</Text>
      </SafeAreaView>
    );
  }

  const areaText = localizedAreaText(area.id, language, area);

  if (status === "complete") {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.completeTitle}>{t("activeTour.tourComplete")}</Text>
          <Text style={styles.completeSubtitle}>
            {t("activeTour.tourCompleteBody", { area: areaText.name })}
          </Text>
          <Pressable
            style={styles.cta}
            onPress={() => navigation.popToTop()}
          >
            <Text style={styles.ctaText}>{t("activeTour.backToAreas")}</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const isPlaying = status === "touring";

  const handleTogglePlay = () => {
    if (isPlaying) {
      pause();
      pauseNarration();
    } else {
      resume();
      resumeNarration();
    }
  };

  const handleReplay = () => {
    replayCurrentNarration();
  };

  const handleSkipNext = () => {
    if (!nextWaypoint) return;
    visitedRef.current.delete(nextWaypoint.id);
    skipToNext();
    void playWaypointNarration(nextWaypoint);
  };

  const handleSkipPrevious = () => {
    skipToPrevious();
    const wp = useTourStore.getState().area
      ? selectCurrentWaypoint(useTourStore.getState())
      : null;
    if (wp) {
      trackerRef.current?.resetTriggeredWaypoint(wp.id);
      void playWaypointNarration(wp);
    }
  };

  // iOS Safari requires DeviceOrientationEvent.requestPermission() to be
  // called essentially synchronously from within the original tap — calling
  // it after any other awaits (e.g. after a screen transition) causes it to
  // fail silently with no prompt at all. So it's requested here, first,
  // directly in this button's press handler, before navigating to the AR
  // camera screen — the narration keeps playing underneath either way, since
  // this screen stays mounted while ARCamera sits on top of it.
  const handleOpenARGuide = async () => {
    const orientationGranted = await requestOrientationPermission();
    navigation.navigate("ARCamera", { areaId: area.id, orientationGranted, mode: "tour" });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
      </View>

      <View style={styles.scanRow}>
        <PressScale style={styles.exitButton} scaleTo={0.9} onPress={() => navigation.goBack()} hitSlop={8}>
          <Ionicons name="close" size={20} color={colors.textMid} />
        </PressScale>
        <PressScale style={styles.scanButton} scaleTo={0.94} onPress={() => navigation.navigate("CameraTour", { areaId: area.id })}>
          <Ionicons name="camera" size={16} color={colors.onPrimary} />
          <Text style={styles.scanButtonText}>{t("activeTour.scanLandmarks")}</Text>
        </PressScale>
      </View>

      {isOffRoute && (
        <View style={styles.offRouteBanner}>
          <Text style={styles.offRouteText}>
            {t("activeTour.offRoute", {
              waypoint: currentWaypoint?.name ?? t("activeTour.offRouteFallback"),
            })}
          </Text>
        </View>
      )}

      <View style={styles.centered}>
        <CharacterGuide isTalking={isPlaying} size={110} />
        <Text style={styles.stopLabel}>
          {t("activeTour.stopOf", { current: currentWaypoint?.order ?? 0, total: area.route.length })}
        </Text>
        <Text style={styles.waypointName}>
          {currentWaypoint?.name ?? t("activeTour.walkingToFirst")}
        </Text>
      </View>

      {Platform.OS === "web" && (
        <PressScale style={styles.arGuideButton} scaleTo={0.96} onPress={handleOpenARGuide}>
          <Ionicons name="camera" size={18} color={colors.onPrimary} />
          <Text style={styles.arGuideButtonText}>Open AR camera guide</Text>
        </PressScale>
      )}

      <View style={styles.controls}>
        <PressScale style={styles.secondaryButton} scaleTo={0.9} onPress={handleSkipPrevious}>
          <Text style={styles.secondaryButtonText}>{t("activeTour.back")}</Text>
        </PressScale>

        <PressScale style={styles.playButton} scaleTo={0.92} onPress={handleTogglePlay}>
          <Text style={styles.playButtonText}>{isPlaying ? "II" : "▶"}</Text>
        </PressScale>

        <PressScale style={styles.secondaryButton} scaleTo={0.9} onPress={handleSkipNext}>
          <Text style={styles.secondaryButtonText}>{t("activeTour.skip")}</Text>
        </PressScale>
      </View>

      <Pressable style={styles.replayLink} onPress={handleReplay}>
        <Text style={styles.replayLinkText}>{t("activeTour.replayLink")}</Text>
      </Pressable>
    </SafeAreaView>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, justifyContent: "space-between" },
  progressTrack: {
    height: 4,
    backgroundColor: colors.border,
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 2,
  },
  progressFill: { height: 4, backgroundColor: colors.primary, borderRadius: 2 },
  scanRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 12,
  },
  exitButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  arGuideButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    alignSelf: "center",
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  arGuideButtonText: { color: colors.onPrimary, fontSize: 14, fontWeight: "700" },
  scanButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  scanButtonText: { color: colors.onPrimary, fontSize: 13, fontWeight: "700" },
  offRouteBanner: {
    marginHorizontal: 20,
    marginTop: 16,
    backgroundColor: colors.warnBg,
    borderRadius: 12,
    padding: 12,
  },
  offRouteText: { color: colors.warnText, fontSize: 13 },
  centered: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 24, gap: 16 },
  stopLabel: { color: colors.textDim, fontSize: 14 },
  waypointName: { color: colors.text, fontSize: 32, fontWeight: "700", textAlign: "center" },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
    paddingBottom: 8,
  },
  secondaryButton: {
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  secondaryButtonText: { color: colors.textMid, fontSize: 15, fontWeight: "600" },
  playButton: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  playButtonText: { color: colors.onPrimary, fontSize: 30, fontWeight: "700" },
  replayLink: { alignItems: "center", paddingBottom: 24, paddingTop: 4 },
  replayLinkText: { color: colors.textDim, fontSize: 13, textDecorationLine: "underline" },
  completeTitle: { color: colors.text, fontSize: 28, fontWeight: "700" },
  completeSubtitle: { color: colors.textMid, fontSize: 15, marginTop: 8, textAlign: "center" },
  cta: {
    marginTop: 24,
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  ctaText: { color: colors.onPrimary, fontSize: 16, fontWeight: "600" },
  });
}

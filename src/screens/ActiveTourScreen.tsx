import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useRef } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import {
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
import type { RootStackParamList } from "../navigation/types";
import {
  selectCurrentWaypoint,
  selectNextWaypoint,
  selectProgress,
  useTourStore,
} from "../state/tourStore";

type Nav = NativeStackNavigationProp<RootStackParamList, "ActiveTour">;
type RouteProp = { params: { areaId: string } };

export default function ActiveTourScreen() {
  const navigation = useNavigation<Nav>();
  const { params } = useRoute() as unknown as RouteProp;
  const area = getAreaById(params.areaId);

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

  useEffect(() => {
    if (!area) return;

    let cancelled = false;

    const handleWaypointEnter = (waypointId: string) => {
      if (visitedRef.current.has(waypointId)) return;
      visitedRef.current.add(waypointId);
      const waypoint = area.route.find((w) => w.id === waypointId);
      if (!waypoint) return;
      enterWaypoint(waypointId);
      void playWaypointNarration(waypoint);
    };

    const handleNarrationEnded = () => {
      const current = selectCurrentWaypoint(useTourStore.getState());
      if (!current) return;
      const isLast = current.id === area.route[area.route.length - 1]?.id;
      if (isLast) completeTour();
    };

    (async () => {
      await setupAudioPlayback();
      if (cancelled) return;

      setGeofenceEnterHandler(handleWaypointEnter);
      setNarrationEndedHandler(handleNarrationEnded);
      await startWaypointGeofencing(area.route);

      trackerRef.current = new ProximityTracker(area.route, {
        onNearWaypoint: (waypoint) => handleWaypointEnter(waypoint.id),
        onOffRoute: setOffRoute,
        onLocationUpdate: setLastKnownLocation,
      });
      await trackerRef.current.start();

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
        <Text style={styles.waypointName}>Area not found</Text>
      </SafeAreaView>
    );
  }

  if (status === "complete") {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.completeTitle}>Tour complete</Text>
          <Text style={styles.completeSubtitle}>
            You've walked all of {area.name}. Hope you enjoyed it.
          </Text>
          <Pressable
            style={styles.cta}
            onPress={() => navigation.popToTop()}
          >
            <Text style={styles.ctaText}>Back to areas</Text>
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
      </View>

      {isOffRoute && (
        <View style={styles.offRouteBanner}>
          <Text style={styles.offRouteText}>
            Looks like you've wandered off the route — head back toward{" "}
            {currentWaypoint?.name ?? "the last stop"} when you can.
          </Text>
        </View>
      )}

      <View style={styles.centered}>
        <Text style={styles.stopLabel}>
          Stop {(currentWaypoint?.order ?? 0)} of {area.route.length}
        </Text>
        <Text style={styles.waypointName}>
          {currentWaypoint?.name ?? "Walking to the first stop…"}
        </Text>
      </View>

      <View style={styles.controls}>
        <Pressable style={styles.secondaryButton} onPress={handleSkipPrevious}>
          <Text style={styles.secondaryButtonText}>Back</Text>
        </Pressable>

        <Pressable style={styles.playButton} onPress={handleTogglePlay}>
          <Text style={styles.playButtonText}>{isPlaying ? "II" : "▶"}</Text>
        </Pressable>

        <Pressable style={styles.secondaryButton} onPress={handleSkipNext}>
          <Text style={styles.secondaryButtonText}>Skip</Text>
        </Pressable>
      </View>

      <Pressable style={styles.replayLink} onPress={handleReplay}>
        <Text style={styles.replayLinkText}>Replay this segment</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F1115", justifyContent: "space-between" },
  progressTrack: {
    height: 4,
    backgroundColor: "#2A2E37",
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 2,
  },
  progressFill: { height: 4, backgroundColor: "#4F8CFF", borderRadius: 2 },
  offRouteBanner: {
    marginHorizontal: 20,
    marginTop: 16,
    backgroundColor: "#3A2A1A",
    borderRadius: 12,
    padding: 12,
  },
  offRouteText: { color: "#FFB877", fontSize: 13 },
  centered: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 24 },
  stopLabel: { color: "#7B8798", fontSize: 14, marginBottom: 8 },
  waypointName: { color: "#fff", fontSize: 32, fontWeight: "700", textAlign: "center" },
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
  secondaryButtonText: { color: "#9AA1AC", fontSize: 15, fontWeight: "600" },
  playButton: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: "#4F8CFF",
    alignItems: "center",
    justifyContent: "center",
  },
  playButtonText: { color: "#fff", fontSize: 30, fontWeight: "700" },
  replayLink: { alignItems: "center", paddingBottom: 24, paddingTop: 4 },
  replayLinkText: { color: "#7B8798", fontSize: 13, textDecorationLine: "underline" },
  completeTitle: { color: "#fff", fontSize: 28, fontWeight: "700" },
  completeSubtitle: { color: "#9AA1AC", fontSize: 15, marginTop: 8, textAlign: "center" },
  cta: {
    marginTop: 24,
    backgroundColor: "#4F8CFF",
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  ctaText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});

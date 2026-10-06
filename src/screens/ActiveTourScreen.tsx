import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as Location from "expo-location";
import { Animated, Easing, Linking, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PressScale from "../components/PressScale";
import { notifySuccess, tapMedium } from "../haptics";
import {
  isNarrationPlaying,
  loadedNarration,
  narrationPosition,
  pauseNarration,
  playWaypointNarration,
  resumeNarration,
  setNarrationEndedHandler,
  setNarrationGuide,
  setupAudioPlayback,
  stopNarration,
  subscribeNarrationErrors,
  syncNarration,
  type NarrationProblem,
} from "../audio/narrationPlayer";
import DuoChat from "../components/duo/DuoChat";
import DuoStatusBar, { DuoPill, type SyncState } from "../components/duo/DuoStatusBar";
import DuoSummaryCard from "../components/duo/DuoSummaryCard";
import { duoPeople, FRIEND_SILENT_MS, serverNow, toLocal, useDuoStore } from "../duo/duoStore";
import { useOnline } from "../offline/connectivity";
import { useOfflineStore } from "../offline/offlineStore";
import { isBundledTour } from "../offline/tourFiles";
import { speakPrompt, stopSpeaking, unlockSpeech } from "../audio/speakPrompt";
import { getAreaById } from "../content";
import {
  requestLocationPermissions,
  setGeofenceEnterHandler,
  startWaypointGeofencing,
  stopWaypointGeofencing,
} from "../geofencing/geofenceManager";
import { bearingDegrees, distanceMeters, ProximityTracker } from "../geofencing/proximityTracker";
import { demoSpeed, isDemoWalk } from "../demo/demoWalk";
import { requestOrientationPermission } from "../landmark/orientationPermission";
import { localizedAreaText } from "../i18n/areaTranslations";
import { useLanguage } from "../i18n/LanguageContext";
import type { RootStackParamList } from "../navigation/types";
import { clearTourProgress, saveTourProgress } from "../state/tourProgress";
import { useAccountStore } from "../account/accountStore";
import {
  finishRun,
  markRunResumed,
  markRunSkipped,
  startRun,
  submitCompletion,
  trackRunPosition,
  type Finish,
} from "../social/completions";
import {
  selectCurrentWaypoint,
  selectNextWaypoint,
  selectProgress,
  useTourStore,
} from "../state/tourStore";
import { useTheme } from "../ThemeContext";
import type { ThemeColors } from "../theme";
import ShareWalkButton from "../components/ShareWalkButton";
import PubSuggestion from "../components/PubSuggestion";
import SharePhotoCard from "../components/SharePhotoCard";
import NarrationSubtitle from "../components/NarrationSubtitle";
import StopDetail, { type StopDetailMode } from "../components/StopDetail";
import TourIntro from "../components/TourIntro";
import type { NarrationSample } from "../audio/guidePreview";
import { NARRATION_CUES } from "../content/narration/cues";
import AskGuideModal from "../components/AskGuideModal";
import TourMap, { type AvatarLine } from "../components/TourMap";
import { DEFAULT_GUIDE, type GuideId } from "../guides/guides";
import { loadGuide, saveGuide } from "../guides/guidePreference";
import type { Area, Waypoint } from "../content";

type Nav = NativeStackNavigationProp<RootStackParamList, "ActiveTour">;
type RouteProp = { params: RootStackParamList["ActiveTour"] };

/** Remember where the walker is, so the tour page can offer "Continue from stop N". */
function persistProgress() {
  const s = useTourStore.getState();
  if (!s.area || s.status === "complete") return;
  void saveTourProgress(s.area.id, s.currentWaypointIndex, s.visitedWaypointIds);
}

export default function ActiveTourScreen() {
  const navigation = useNavigation<Nav>();
  const { params } = useRoute() as unknown as RouteProp;
  const area = getAreaById(params.areaId);
  const resuming = params.resume === true;
  // Walk with a friend: the walk's code, until it ends and this phone carries on solo.
  const [duoSolo, setDuoSolo] = useState(false);
  const duoCode = params.duo && !duoSolo ? params.duo : null;
  const duoRef = useRef(duoCode);
  duoRef.current = duoCode;
  const duoState = useDuoStore((s) => (params.duo ? s.state : null));
  const duoConnected = useDuoStore((s) => s.connected);
  const duoMyId = useDuoStore((s) => s.myId);
  const duoFriendPos = useDuoStore((s) => s.friend);
  const duoAnon = useDuoStore((s) => s.anon);
  const duoSend = useDuoStore((s) => s.send);
  const { friend: duoFriend } = duoPeople(duoState, duoMyId);
  /** Something to tell the walker when the duo walk ends early (the friend left, or time ran out). */
  const [duoNotice, setDuoNotice] = useState<string | null>(null);
  // A continued walk's clock kept running while away: not a fair time.
  useEffect(() => {
    if (resuming && area) void markRunResumed(area.id);
  }, [resuming, area]);
  const { language, t } = useLanguage();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const status = useTourStore((s) => s.status);
  const isOffRoute = useTourStore((s) => s.isOffRoute);
  const online = useOnline();
  const savedOffline = useOfflineStore((s) => (area ? s.tours[area.id]?.status === "ready" : false));
  const worksOffline = !!area && (savedOffline || isBundledTour(area));
  /** A stop whose narration couldn't play: shown briefly while the tour carries on. */
  const [narrationIssue, setNarrationIssue] = useState<{ stop: string; problem: NarrationProblem } | null>(null);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    const unsubscribe = subscribeNarrationErrors((waypoint, problem) => {
      setNarrationIssue({ stop: waypoint.name, problem });
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => setNarrationIssue(null), 7000);
    });
    return () => {
      unsubscribe();
      if (timer) clearTimeout(timer);
    };
  }, []);
  const currentWaypoint = useTourStore(selectCurrentWaypoint);
  const nextWaypoint = useTourStore(selectNextWaypoint);
  const progress = useTourStore(selectProgress);
  const enterWaypoint = useTourStore((s) => s.enterWaypoint);
  const pause = useTourStore((s) => s.pause);
  const resume = useTourStore((s) => s.resume);
  const skipToPrevious = useTourStore((s) => s.skipToPrevious);
  const setOffRoute = useTourStore((s) => s.setOffRoute);
  const setLastKnownLocation = useTourStore((s) => s.setLastKnownLocation);
  const completeTour = useTourStore((s) => s.completeTour);
  const currentWaypointIndex = useTourStore((s) => s.currentWaypointIndex);
  const visitedWaypointIds = useTourStore((s) => s.visitedWaypointIds);
  const lastKnownLocation = useTourStore((s) => s.lastKnownLocation);

  const insets = useSafeAreaInsets();

  // A fresh tour opens on the cinematic intro; the tour itself (GPS,
  // narration) only starts once Start is tapped. Continuing skips the intro.
  // A duo walk skips the intro: both pressed Ready in the lobby, and the countdown is shared.
  const [started, setStarted] = useState(resuming || !!params.duo);
  const [introShowing, setIntroShowing] = useState(!resuming && !params.duo);
  const [distanceToStart, setDistanceToStart] = useState<number | null>(null);
  /** 0 → 1 as the in-tour controls slide in. */
  const chrome = useRef(new Animated.Value(resuming || params.duo ? 1 : 0)).current;

  // The walker's tour guide: chosen in the intro, remembered per tour.
  const [guide, setGuide] = useState<GuideId>(DEFAULT_GUIDE);
  useEffect(() => {
    if (!area) return;
    let cancelled = false;
    void loadGuide(area.id).then((saved) => {
      if (saved && !cancelled) setGuide(saved);
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [area?.id]);
  // A duo walk uses the guide the invite was made with: both phones must play the same recordings.
  useEffect(() => {
    if (duoState?.guide) setGuide(duoState.guide as GuideId);
  }, [duoState?.guide]);
  // Stops the guide has recorded play in their own voice.
  useEffect(() => setNarrationGuide(guide), [guide]);
  const handleGuideChange = (next: GuideId) => {
    setGuide(next);
    if (area) saveGuide(area.id, next);
  };

  // The street-level stop view: open on arrival, or when a stop marker is tapped.
  const [detail, setDetail] = useState<{ waypoint: Waypoint; mode: StopDetailMode } | null>(null);
  /** "Ask your guide" is open, and whether opening it paused the story. */
  const [asking, setAsking] = useState(false);
  const askPausedRef = useRef(false);
  const detailRef = useRef(detail);
  detailRef.current = detail;
  /** 0 → 1 as the stop view takes over (the map HUD fades out). */
  const detailAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(detailAnim, { toValue: detail ? 1 : 0, duration: 350, useNativeDriver: true }).start();
  }, [detail, detailAnim]);

  const trackerRef = useRef<ProximityTracker | null>(null);
  /** The finished walk's distance and steps, for the completion screen. */
  const [finish, setFinish] = useState<Finish | null>(null);
  /** Plays a stop on this phone (set while the tour is running). */
  const playStopRef = useRef<((waypoint: Waypoint, startAt?: number) => void) | null>(null);
  /** Narration and location are set up, so the duo room's instructions can be followed. */
  const [audioReady, setAudioReady] = useState(false);
  const visitedRef = useRef(new Set<string>());
  /** A stop that fired while the previous narration was still playing (sequential tours only). */
  const queuedRef = useRef<string | null>(null);
  /** Stops reached while another stop's story was playing (other tours), in route order. */
  const waitingRef = useRef<string[]>([]);
  /** The stop whose story has started and not yet finished (set before the audio has loaded). */
  const storyRef = useRef<string | null>(null);

  // Latest language/t for callbacks created once when the tour starts.
  const tRef = useRef(t);
  tRef.current = t;
  const languageRef = useRef(language);
  languageRef.current = language;

  // The guide's speech bubbles, shown one after another.
  const [speech, setSpeech] = useState<AvatarLine | null>(null);
  const speechQueue = useRef<{ text: string; durationMs: number }[]>([]);
  const speechTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const say = useCallback((text: string, durationMs = 3000) => {
    const showNext = () => {
      const next = speechQueue.current.shift();
      if (!next) {
        speechTimer.current = null;
        return;
      }
      setSpeech({ id: Date.now(), ...next });
      speechTimer.current = setTimeout(showNext, next.durationMs + 150);
    };
    speechQueue.current.push({ text, durationMs });
    if (!speechTimer.current) showNext();
  }, []);

  // "Proceed to stop N" card shown after a stop's narration ends.
  const [transition, setTransition] = useState<{ number: number; name: string; distance: number } | null>(null);
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [faceBearing, setFaceBearing] = useState<number | null>(null);

  const announceNextStop = useCallback(
    (current: Waypoint, next: Waypoint) => {
      const from = useTourStore.getState().lastKnownLocation ?? current.coordinates;
      const distance = Math.max(5, Math.round(distanceMeters(from, next.coordinates) / 5) * 5);
      setFaceBearing(bearingDegrees(from, next.coordinates));
      setTransition({ number: next.order, name: next.name, distance });
      if (transitionTimer.current) clearTimeout(transitionTimer.current);
      transitionTimer.current = setTimeout(() => setTransition(null), 6000);
      say(tRef.current("activeTour.guideHeadTo", { stop: next.name }), 3000);
      speakPrompt(
        tRef.current("activeTour.proceedSpoken", { number: next.order, stop: next.name }),
        languageRef.current
      );
    },
    [say]
  );

  useEffect(
    () => () => {
      if (speechTimer.current) clearTimeout(speechTimer.current);
      if (transitionTimer.current) clearTimeout(transitionTimer.current);
      stopSpeaking();
    },
    []
  );

  useEffect(() => {
    if (area && status === "complete") {
      void clearTourProgress(area.id);
      void useAccountStore.getState().markTourCompleted(area.id);
      const together = !!duoRef.current;
      // Finished together: the room records it for the duo leaderboard (not the solo speed boards).
      if (together) duoSend({ t: "complete" });
      // This walk's time (if it counts), distance and steps for the leaderboards.
      void finishRun(area.id).then((finish) => {
        setFinish(finish);
        return submitCompletion(area.id, finish, { duo: together });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [area, status]);

  // During the intro, one quick location check: if the walker isn't at the
  // start yet, the intro offers walking directions (replacing the old
  // "Get to the start" page). Skipped in the demo walk, which needs no GPS.
  useEffect(() => {
    if (!area || resuming || isDemoWalk()) return;
    let cancelled = false;
    const report = (lat: number, lng: number) => {
      if (!cancelled) setDistanceToStart(distanceMeters({ lat, lng }, area.startingPoint));
    };
    if (Platform.OS === "web") {
      navigator.geolocation?.getCurrentPosition(
        (pos) => report(pos.coords.latitude, pos.coords.longitude),
        () => {},
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } else {
      (async () => {
        const { status: perm } = await Location.requestForegroundPermissionsAsync();
        if (perm !== "granted") return;
        const pos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
        report(pos.coords.latitude, pos.coords.longitude);
      })().catch(() => {});
    }
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [area?.id]);

  useEffect(() => {
    if (!area || !started) return;

    let cancelled = false;

    // Continuing a saved tour: stops already heard count as done, so they
    // neither replay nor block a sequential tour's next stop.
    const resumedVisited = resuming ? useTourStore.getState().visitedWaypointIds : [];
    for (const id of resumedVisited) visitedRef.current.add(id);

    // The stop the walker should reach next: the first one along the route that
    // hasn't been heard. (Going back with Skip replays an earlier stop without
    // un-hearing the later ones, so "the one after the current stop" would be a
    // stop already heard, and an in-order tour would never move on.)
    const expectedIndex = () => {
      const i = area.route.findIndex((w) => !visitedRef.current.has(w.id));
      return i === -1 ? area.route.length : i;
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
      } else {
        const idx = area.route.indexOf(waypoint);
        // The last stop ends the tour, so it only counts once the others have
        // been heard: on a loop it sits right by stop 1, and would otherwise
        // finish the tour before the walk has begun. (Skip still gets there.)
        if (idx === area.route.length - 1 && area.route.slice(0, idx).some((w) => !visitedRef.current.has(w.id))) {
          trackerRef.current?.resetTriggeredWaypoint(waypointId);
          return;
        }
        // Two stops close together can both be in range at once: never cut a
        // story off. The new stop plays as soon as the current one finishes.
        if (storyRef.current && useTourStore.getState().status !== "paused") {
          if (!waitingRef.current.includes(waypointId)) {
            waitingRef.current = [...waitingRef.current, waypointId].sort(
              (a, b) => area.route.findIndex((w) => w.id === a) - area.route.findIndex((w) => w.id === b)
            );
          }
          return;
        }
      }

      queuedRef.current = null;
      waitingRef.current = waitingRef.current.filter((id) => id !== waypointId);
      // Walking with a friend: tell the room; it starts the stop on both phones together.
      if (duoRef.current) {
        useDuoStore.getState().send({ t: "arrive", i: area.route.indexOf(waypoint) });
        return;
      }
      playStop(waypoint);
    };

    /** Plays a stop here: now, or (duo) so that it starts at `startAt` on both phones. */
    const playStop = (waypoint: Waypoint, startAt?: number) => {
      // On an in-order tour, reaching a stop (e.g. a friend skipped ahead) means the ones before it are passed.
      if (area.sequentialStops) {
        for (const w of area.route.slice(0, area.route.indexOf(waypoint))) {
          visitedRef.current.add(w.id);
          trackerRef.current?.markTriggered([w.id]);
        }
      }
      visitedRef.current.add(waypoint.id);
      storyRef.current = waypoint.id;
      enterWaypoint(waypoint.id);
      setTransition(null);
      setDetail({ waypoint, mode: "arrival" });
      persistProgress();
      void playWaypointNarration(waypoint, { startAt });
    };
    playStopRef.current = playStop;

    const handleNarrationEnded = () => {
      storyRef.current = null;
      if (queuedRef.current) {
        handleWaypointEnter(queuedRef.current);
        return;
      }
      const waiting = waitingRef.current.find((id) => !visitedRef.current.has(id));
      if (waiting) {
        handleWaypointEnter(waiting);
        return;
      }
      const current = selectCurrentWaypoint(useTourStore.getState());
      if (!current) return;
      const isLast = current.id === area.route[area.route.length - 1]?.id;
      if (isLast) {
        notifySuccess();
        completeTour();
        return;
      }
      // The story's over: back up to the map to head for the next stop
      // (unless the walker is peeking at a different stop).
      if (detailRef.current?.mode !== "preview") setDetail(null);
      const next = area.route[area.route.indexOf(current) + 1];
      if (next) announceNextStop(current, next);
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
        trackerRef.current = new ProximityTracker(
          area.route,
          {
            onNearWaypoint: (waypoint) => handleWaypointEnter(waypoint.id),
            onOffRoute: setOffRoute,
            onLocationUpdate: setLastKnownLocation,
          },
          area.path
        );
        if (resuming) {
          trackerRef.current.markTriggered(resumedVisited);
          const current = selectCurrentWaypoint(useTourStore.getState());
          if (current) trackerRef.current.setDemoStart(current.coordinates);
        }
      } catch (e) {
        console.warn("[ActiveTourScreen] location tracking unavailable:", e);
      }

      // First waypoint is usually right at the starting point — trigger it
      // immediately rather than waiting for the next GPS fix. Not when
      // continuing: the walker is mid-tour, and stop 1 was heard already.
      // A duo walk's first stop comes from the room, at the shared start time.
      // Before GPS starts, so a stop next door to the start can't play first.
      if (!resuming && !duoRef.current && area.route[0]) handleWaypointEnter(area.route[0].id);

      try {
        await trackerRef.current?.start();
      } catch (e) {
        console.warn("[ActiveTourScreen] location tracking unavailable:", e);
      }
      setAudioReady(true);
    })();

    return () => {
      cancelled = true;
      playStopRef.current = null;
      setAudioReady(false);
      setGeofenceEnterHandler(null);
      setNarrationEndedHandler(null);
      void stopWaypointGeofencing();
      trackerRef.current?.stop();
      stopNarration();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [area?.id, started]);

  // --- Walk with a friend ----------------------------------------------------------

  // The lobby already connected; reconnect if the page was reloaded. Leaving the tour closes it.
  useEffect(() => {
    if (!params.duo) return;
    void useDuoStore.getState().connect(params.duo);
    if (area) startRun(area.id);
    return () => useDuoStore.getState().disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.duo]);

  // Follow the room: each new play/pause instruction (seq) starts, pauses or lines up the stop.
  const handledSeq = useRef(0);
  const duoStop = duoCode ? duoState?.stop ?? null : null;
  useEffect(() => {
    if (!area || !duoStop || !audioReady || duoStop.seq === handledSeq.current) return;
    const previous = handledSeq.current;
    handledSeq.current = duoStop.seq;
    const waypoint = area.route[duoStop.i];
    if (!waypoint) return;
    if (duoStop.paused) {
      pauseNarration();
      if (useTourStore.getState().status === "touring") pause();
      return;
    }
    if (useTourStore.getState().status === "paused") resume();
    const startAt = toLocal(duoStop.at);
    const sameStop = loadedNarration()?.waypointId === waypoint.id && useTourStore.getState().currentWaypointIndex === duoStop.i;
    // A resume (or reconnect) of the stop already loaded just lines it up; anything else plays the stop.
    if (sameStop && previous !== 0) syncNarration(startAt);
    else playStopRef.current?.(waypoint, startAt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duoStop?.seq, audioReady, area?.id]);

  // My position for my friend's map, at most every 5 seconds (the store throttles).
  useEffect(() => {
    if (duoCode && lastKnownLocation) useDuoStore.getState().shareLocation(lastKnownLocation.lat, lastKnownLocation.lng);
  }, [duoCode, lastKnownLocation, duoAnon]);

  // Distance walked, for the Distance and Steps leaderboards.
  useEffect(() => {
    if (area && started && lastKnownLocation && useTourStore.getState().status !== "complete") trackRunPosition(area.id, lastKnownLocation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastKnownLocation, started]);

  // The walk ended early (friend left, or the 4-hour limit): carry on solo.
  useEffect(() => {
    if (!duoCode || duoState?.status !== "ended") return;
    const left = duoState.endedBy && duoState.endedBy !== duoMyId;
    if (duoState.endedBy !== duoMyId) {
      setDuoNotice(left ? t("duo.leftWalk", { name: duoFriend?.name ?? "" }) : t("duo.sessionEnded"));
      setTimeout(() => setDuoNotice(null), 8000);
    }
    setDuoSolo(true);
    useDuoStore.getState().disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duoState?.status]);

  // A clock for the countdown, the wait timer and how long the friend has been away.
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!duoCode) return;
    const timer = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(timer);
  }, [duoCode]);

  // Drift: compare where the narration is with where the shared clock says it should be.
  const [drifting, setDrifting] = useState(false);
  useEffect(() => {
    if (!duoCode || !area) return;
    const timer = setInterval(() => {
      const stop = useDuoStore.getState().state?.stop;
      const waypoint = stop ? area.route[stop.i] : null;
      const playing = loadedNarration();
      if (!stop || stop.paused || !waypoint || playing?.waypointId !== waypoint.id || !isNarrationPlaying()) {
        setDrifting(false);
        return;
      }
      const { seconds, duration, loaded } = narrationPosition();
      const expected = (Date.now() - toLocal(stop.at)) / 1000;
      if (!loaded || expected < 1 || expected > duration - 1) return;
      setDrifting(Math.abs(seconds - expected) > DRIFT_LIMIT_S);
    }, 2000);
    return () => clearInterval(timer);
  }, [duoCode, area]);

  /** The friend's dot on the map (not shown in their distance-only mode). */
  const friendOnMap = useMemo(
    () =>
      duoCode && duoFriend && duoFriendPos?.lat != null && duoFriendPos.lng != null
        ? { location: { lat: duoFriendPos.lat, lng: duoFriendPos.lng }, name: duoFriend.name }
        : null,
    [duoCode, duoFriend?.name, duoFriendPos]
  );

  const handleResync = () => {
    const stop = useDuoStore.getState().state?.stop;
    if (stop && !stop.paused) syncNarration(toLocal(stop.at));
    setDrifting(false);
  };

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
        {/* Scrolls: with the share, photo and pub cards it can be taller than a phone. */}
        <ScrollView contentContainerStyle={[styles.centered, styles.completeScroll]}>
          <Text style={styles.completeTitle}>{t("activeTour.tourComplete")}</Text>
          <Text style={styles.completeSubtitle}>
            {t("activeTour.tourCompleteBody", { area: areaText.name })}
          </Text>
          {finish && finish.activity.meters > 0 && (
            <View style={styles.walkStats}>
              <View style={styles.walkStat}>
                <Ionicons name="map-outline" size={18} color={colors.primary} />
                <Text style={styles.walkStatValue}>{formatKm(finish.activity.meters)}</Text>
                <Text style={styles.walkStatLabel}>{t("activeTour.walked")}</Text>
              </View>
              <View style={styles.walkStat}>
                <Ionicons name="footsteps-outline" size={18} color={colors.primary} />
                <Text style={styles.walkStatValue}>{finish.activity.steps.toLocaleString()}</Text>
                <Text style={styles.walkStatLabel}>
                  {t(finish.activity.source === "health" ? "activeTour.stepsHealth" : "activeTour.stepsEstimated")}
                </Text>
              </View>
            </View>
          )}
          {params.duo && duoState?.summary && !duoSolo ? <DuoSummaryCard /> : null}
          <ShareWalkButton area={area} />
          <SharePhotoCard area={area} />
          <PubSuggestion area={area} />
          <Pressable
            style={styles.cta}
            role="button"
            onPress={() => navigation.popToTop()}
          >
            <Text style={styles.ctaText}>{t("activeTour.backToAreas")}</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const isPlaying = status === "touring";

  // "Ask your guide": website only, tours that switch it on, and
  // not on a duo walk, where pausing here would put the two phones out of step.
  const canAsk = Platform.OS === "web" && !!area.enableInteractiveGuide && !duoCode;
  const openAsk = () => {
    // The story pauses while the guide answers, and carries on afterwards.
    askPausedRef.current = isPlaying;
    if (isPlaying) {
      pause();
      pauseNarration();
    }
    setAsking(true);
  };
  const closeAsk = () => {
    setAsking(false);
    if (askPausedRef.current) {
      resume();
      resumeNarration();
    }
    askPausedRef.current = false;
  };

  const handleTogglePlay = () => {
    // Duo: pausing pauses both phones; resuming restarts both from the same second.
    if (duoCode) {
      if (isPlaying) {
        pause();
        pauseNarration();
        duoSend({ t: "pause", pos: narrationPosition().seconds });
      } else {
        duoSend({ t: "resume", pos: narrationPosition().seconds });
      }
      return;
    }
    if (isPlaying) {
      pause();
      pauseNarration();
    } else {
      resume();
      resumeNarration();
    }
  };

  const handleSkipNext = () => {
    void markRunSkipped(area.id);
    if (!nextWaypoint) return;
    if (duoCode) {
      duoSend({ t: "goto", i: area.route.indexOf(nextWaypoint), skip: true });
      return;
    }
    // Skipping to a stop counts as reaching it: it's marked heard (so the map
    // points on to the stop after it, and walking past it later doesn't replay
    // it) and everything before it counts as passed.
    const skipTo = area.route.indexOf(nextWaypoint);
    for (const w of area.route.slice(0, skipTo + 1)) {
      visitedRef.current.add(w.id);
      trackerRef.current?.markTriggered([w.id]);
    }
    queuedRef.current = null;
    enterWaypoint(nextWaypoint.id);
    persistProgress();
    setTransition(null);
    setDetail({ waypoint: nextWaypoint, mode: "arrival" });
    storyRef.current = nextWaypoint.id;
    void playWaypointNarration(nextWaypoint);
  };

  const handleSkipPrevious = () => {
    void markRunSkipped(area.id);
    if (duoCode) {
      duoSend({ t: "goto", i: Math.max(0, currentWaypointIndex - 1), skip: true });
      return;
    }
    skipToPrevious();
    persistProgress();
    const wp = useTourStore.getState().area
      ? selectCurrentWaypoint(useTourStore.getState())
      : null;
    if (wp) {
      trackerRef.current?.resetTriggeredWaypoint(wp.id);
      setDetail({ waypoint: wp, mode: "arrival" });
      storyRef.current = wp.id;
      void playWaypointNarration(wp);
    }
  };

  // Tapping a stop marker opens its stop view: a stop already reached
  // replays its story; one still ahead is just a look.
  const handleMapStopPress = (waypoint: Waypoint) => {
    if (!visitedWaypointIds.includes(waypoint.id)) {
      setDetail({ waypoint, mode: "preview" });
      return;
    }
    if (status === "paused") resume();
    setDetail({ waypoint, mode: "replay" });
    void playWaypointNarration(waypoint);
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

  // Everything that needs a user gesture (speech unlock, audio) runs in this tap.
  const handleStart = async () => {
    tapMedium();
    unlockSpeech();
    Animated.timing(chrome, { toValue: 1, duration: 700, delay: 250, easing: Easing.out(Easing.back(1.2)), useNativeDriver: true }).start();
    const { background } = await requestLocationPermissions().catch(() => ({ background: false }));
    if (!background) {
      // Same as before: without "Always" location, narration only triggers
      // while the app is open.
      console.warn("[ActiveTourScreen] background location not granted; foreground tracking only");
    }
    useTourStore.getState().arrivedAtStart();
    startRun(area.id);
    setStarted(true);
  };

  const handleDirections = () => {
    const start = area.startingPoint;
    void Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${start.lat},${start.lng}&travelmode=walking`);
  };

  // Walk with a friend: what the status bar, countdown and chat show.
  const duoActive = !!duoCode && duoState?.status === "active" && !!duoFriend;
  const countdown =
    duoActive && duoState!.startAt && toLocal(duoState!.startAt) > now ? Math.ceil((toLocal(duoState!.startAt) - now) / 1000) : null;
  const pending = duoActive ? duoState!.pending : null;
  const waiting =
    pending && duoFriend
      ? {
          mine: pending.by === duoMyId,
          name: duoFriend.name,
          stop: pending.i + 1,
          minutesLeft: Math.ceil((toLocal(pending.deadline) - now) / 60_000),
          stuck: pending.by === duoMyId && (duoFriendPos?.meters ?? 0) > STUCK_METERS,
          canPlay: true,
        }
      : null;
  // Away: the room says so, or their phone has gone quiet (a dropped signal often isn't noticed by the server for a while).
  const friendSeenAt = useDuoStore.getState().friendSeenAt;
  const friendAway = !duoActive || !duoFriend
    ? null
    : !duoFriend.online
      ? Math.max(0, serverNow() - duoFriend.since)
      : duoConnected && now - friendSeenAt > FRIEND_SILENT_MS
        ? now - friendSeenAt
        : null;
  const sync: SyncState = !duoConnected ? "offline" : drifting ? "drift" : waiting ? "waiting" : "synced";

  const hudStyle = {
    opacity: Animated.multiply(chrome, detailAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] })),
    transform: [{ translateY: chrome.interpolate({ inputRange: [0, 1], outputRange: [-120, 0] }) }],
  };
  const controlsStyle = {
    opacity: chrome,
    transform: [{ translateY: chrome.interpolate({ inputRange: [0, 1], outputRange: [140, 0] }) }],
  };

  return (
    <View style={styles.fullscreen}>
      <TourMap
        style={StyleSheet.absoluteFill}
        area={area}
        currentWaypointIndex={currentWaypointIndex}
        visitedWaypointIds={visitedWaypointIds}
        userLocation={lastKnownLocation}
        friend={friendOnMap}
        onWaypointPress={handleMapStopPress}
        speech={speech}
        faceBearing={faceBearing}
        flyIn={!resuming}
        focusStop={detail?.waypoint ?? null}
        guide={guide}
      />

      {introShowing && (
        <TourIntro
          title={areaText.name}
          distanceToStart={distanceToStart}
          onDirections={handleDirections}
          onStart={handleStart}
          onDone={() => setIntroShowing(false)}
          guide={guide}
          onGuideChange={handleGuideChange}
          voiceSample={openingSample(area)}
        />
      )}

      <Animated.View
        style={[styles.hudColumn, { top: insets.top + 10 }, hudStyle]}
        pointerEvents={started && !detail ? "box-none" : "none"}
      >
        <View style={styles.hudRow}>
          <PressScale
            style={styles.closeButton}
            scaleTo={0.9}
            onPress={() => navigation.goBack()}
            hitSlop={8}
            aria-label={t("camera.close")}
          >
            <Ionicons name="close" size={22} color="#FFFFFF" />
          </PressScale>
          <View style={styles.hud}>
            <View style={styles.hudTop}>
              <Text style={styles.hudLabel}>
                {t("activeTour.stopOf", { current: currentWaypoint?.order ?? 0, total: area.route.length })}
              </Text>
              <View style={styles.hudChips}>
              <View
                style={[styles.connectionChip, !online && styles.connectionChipOffline]}
                role="status"
                aria-label={t(online ? "offline.online" : "offline.offline")}
              >
                <View style={[styles.connectionDot, { backgroundColor: online ? colors.success : "#FFB020" }]} />
                <Text style={styles.connectionText}>{t(online ? "offline.online" : "offline.offline")}</Text>
              </View>
              {isDemoWalk() && (
                <Text style={styles.demoChip}>
                  DEMO{demoSpeed() !== 1 ? ` ${demoSpeed()}×` : ""}
                </Text>
              )}
              </View>
            </View>
            <Text style={styles.hudName} numberOfLines={1}>
              {currentWaypoint?.name ?? t("activeTour.walkingToFirst")}
            </Text>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
            </View>
          </View>
        </View>

        {duoActive && duoFriend && (
          <DuoStatusBar
            friendName={duoFriend.name}
            sync={sync}
            meters={duoFriendPos?.meters ?? null}
            anon={duoAnon}
            onToggleAnon={() => useDuoStore.getState().setAnon(!duoAnon)}
            onResync={handleResync}
            waiting={waiting}
            onPlayNow={() => pending && duoSend({ t: "goto", i: pending.i, skip: false })}
            friendOffline={friendAway}
            onContinueSolo={() => duoSend({ t: "leave" })}
          />
        )}

        {duoNotice && (
          <View style={styles.offRouteBanner} role="alert">
            <Text style={styles.offRouteText}>{duoNotice}</Text>
          </View>
        )}

        {!online && !worksOffline && (
          <View style={styles.offRouteBanner}>
            <Text style={styles.offRouteText}>{t("offline.notDownloadedBanner")}</Text>
          </View>
        )}

        {narrationIssue && (
          <View style={styles.offRouteBanner} role="alert">
            <Text style={styles.offRouteText}>
              {t(narrationIssue.problem === "offline" ? "offline.narrationOffline" : "offline.narrationBroken", {
                stop: narrationIssue.stop,
              })}
            </Text>
          </View>
        )}

        {isOffRoute && (
          <View style={styles.offRouteBanner}>
            <Text style={styles.offRouteText}>
              {t("activeTour.offRoute", {
                waypoint: currentWaypoint?.name ?? t("activeTour.offRouteFallback"),
              })}
            </Text>
          </View>
        )}

        {transition && (
          <View style={styles.transitionCard}>
            <View style={styles.transitionIcon}>
              <Ionicons name="walk" size={20} color="#FFFFFF" />
            </View>
            <View style={styles.transitionText}>
              <Text style={styles.transitionLabel}>{t("activeTour.nextStopLabel", { number: transition.number })}</Text>
              <Text style={styles.transitionName} numberOfLines={1}>{transition.name}</Text>
            </View>
            <Text style={styles.transitionDistance}>{t("activeTour.distanceAway", { distance: transition.distance })}</Text>
          </View>
        )}
      </Animated.View>

      {detail && (
        <StopDetail
          waypoint={detail.waypoint}
          totalStops={area.route.length}
          mode={detail.mode}
          isTalking={isPlaying && detail.mode !== "preview"}
          onExit={() => setDetail(null)}
          topInset={insets.top}
          bottomClearance={insets.bottom + CONTROLS_BOTTOM + 70 + 16 + SUBTITLE_SPACE}
          guide={guide}
          onAsk={canAsk ? openAsk : undefined}
        />
      )}

      {asking && detail && (
        <AskGuideModal tourId={area.id} stop={detail.waypoint} guide={guide} onClose={closeAsk} />
      )}

      {detail && duoActive && duoFriend && (
        <View style={[styles.duoPill, { top: insets.top + 14 }]} pointerEvents="box-none">
          <DuoPill friendName={duoFriend.name} sync={sync} waiting={waiting} onResync={handleResync} friendOffline={friendAway} />
        </View>
      )}

      {started && (
        <NarrationSubtitle area={area} bottom={insets.bottom + CONTROLS_BOTTOM + 70 + 14} paused={!isPlaying} />
      )}

      <Animated.View
        style={[styles.controls, { bottom: insets.bottom + CONTROLS_BOTTOM }, controlsStyle]}
        pointerEvents={started ? "box-none" : "none"}
      >
        {Platform.OS === "web" && (
          <PressScale style={styles.smallControl} scaleTo={0.9} onPress={handleOpenARGuide} aria-label={t("activeTour.openArGuide")}>
            <Ionicons name="camera" size={20} color={PLAY_COLOR} />
          </PressScale>
        )}
        <PressScale style={styles.smallControl} scaleTo={0.9} onPress={handleSkipPrevious} aria-label={t("activeTour.back")}>
          <Ionicons name="play-skip-back" size={18} color={PLAY_COLOR} />
        </PressScale>
        <PressScale
          style={styles.playButton}
          scaleTo={0.92}
          onPress={handleTogglePlay}
          aria-label={t(isPlaying ? "activeTour.pauseNarration" : "activeTour.playNarration")}
        >
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={32}
            color="#FFFFFF"
            // Nudges the play triangle right so it looks centred in the circle.
            style={isPlaying ? undefined : styles.playIconNudge}
          />
        </PressScale>
        <PressScale style={styles.smallControl} scaleTo={0.9} onPress={handleSkipNext} aria-label={t("activeTour.skip")}>
          <Ionicons name="play-skip-forward" size={18} color={PLAY_COLOR} />
        </PressScale>
      </Animated.View>

      {/* After the controls, so the open chat sheet covers them. */}
      {duoActive && duoFriend && <DuoChat friendName={duoFriend.name} bottom={insets.bottom + 4} />}

      {/* Last, so it covers everything until both phones start together. */}
      {countdown !== null && (
        <View style={styles.countdown} role="timer" aria-label={t("duo.startingIn", { seconds: countdown })}>
          <Text style={styles.countdownLabel}>{t("duo.getReady")}</Text>
          <Text style={styles.countdownNumber}>{countdown}</Text>
        </View>
      )}
    </View>
  );
}

const PLAY_COLOR = "#2E9E6B";
const formatKm = (meters: number) => `${(meters / 1000).toFixed(meters < 10_000 ? 2 : 1)} km`;
/** Walk with a friend: narration this far (seconds) from the shared clock offers a re-sync. */
const DRIFT_LIMIT_S = 2;
/** A friend this far away while you wait for them "seems stuck". */
const STUCK_METERS = 500;
/** Gap between the bottom of the screen (above the safe area) and the play controls. */
const CONTROLS_BOTTOM = 40;
/** Room kept above the controls for the narration subtitles (about 4 lines). */
const SUBTITLE_SPACE = 110;

function createStyles(colors: ThemeColors) {
  const floating = {
    shadowColor: "#000",
    shadowOpacity: 0.22,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  };
  return StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, justifyContent: "space-between" },
  fullscreen: { flex: 1, backgroundColor: "#A6E6A0", overflow: "hidden" },
  hudColumn: { position: "absolute", left: 12, right: 12, gap: 8 },
  hudRow: { flexDirection: "row", alignItems: "stretch", gap: 8 },
  closeButton: {
    width: 44,
    borderRadius: 14,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
    ...(Platform.OS === "web" ? ({ backdropFilter: "blur(8px)" } as object) : {}),
  },
  hud: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    gap: 2,
    ...(Platform.OS === "web" ? ({ backdropFilter: "blur(8px)" } as object) : {}),
  },
  hudTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  hudLabel: { color: "#FFFFFF", fontSize: 13, opacity: 0.85 },
  hudName: { color: "#FFFFFF", fontSize: 18, fontWeight: "700" },
  hudChips: { flexDirection: "row", alignItems: "center", gap: 6 },
  connectionChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  connectionChipOffline: { backgroundColor: "rgba(255,176,32,0.25)" },
  connectionDot: { width: 7, height: 7, borderRadius: 4 },
  connectionText: { color: "#FFFFFF", fontSize: 10, fontWeight: "800", letterSpacing: 0.5 },
  demoChip: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.5,
    backgroundColor: "rgba(255,255,255,0.22)",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    overflow: "hidden",
  },
  progressTrack: {
    height: 4,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 2,
    marginTop: 8,
    overflow: "hidden",
  },
  progressFill: { height: 4, backgroundColor: "#7BE0A6", borderRadius: 2 },
  offRouteBanner: {
    backgroundColor: colors.warnBg,
    borderRadius: 12,
    padding: 12,
    ...floating,
  },
  offRouteText: { color: colors.warnText, fontSize: 13 },
  transitionCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderLeftWidth: 4,
    borderLeftColor: "#2F9BFF",
    paddingVertical: 8,
    paddingHorizontal: 10,
    ...floating,
  },
  transitionIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#2F9BFF",
    alignItems: "center",
    justifyContent: "center",
  },
  transitionText: { flex: 1, gap: 2 },
  transitionLabel: { color: "#8C7B72", fontSize: 12, fontWeight: "600" },
  transitionName: { color: "#201613", fontSize: 15, fontWeight: "700" },
  transitionDistance: { color: "#2F9BFF", fontSize: 13, fontWeight: "700" },
  controls: {
    position: "absolute",
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  smallControl: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    ...floating,
  },
  playButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#4ECDC4",
    ...(Platform.OS === "web"
      ? ({ backgroundImage: "linear-gradient(135deg, #76C893, #4ECDC4)" } as object)
      : { experimental_backgroundImage: "linear-gradient(135deg, #76C893, #4ECDC4)" }),
    alignItems: "center",
    justifyContent: "center",
    ...floating,
  },
  playIconNudge: { marginLeft: 3 },
  duoPill: { position: "absolute", left: 14, right: 110 },
  countdown: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(20,14,12,0.72)",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  countdownNumber: { color: "#FFFFFF", fontSize: 96, fontWeight: "800" },
  countdownLabel: { color: "#FFFFFF", fontSize: 17, fontWeight: "600", opacity: 0.9 },
  centered: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 24, gap: 16 },
  waypointName: { color: colors.text, fontSize: 32, fontWeight: "700", textAlign: "center" },
  completeScroll: { flexGrow: 1, paddingVertical: 32 },
  completeTitle: { color: colors.text, fontSize: 28, fontWeight: "700" },
  walkStats: { flexDirection: "row", gap: 12, marginTop: 4 },
  walkStat: {
    alignItems: "center",
    gap: 2,
    minWidth: 120,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  walkStatValue: { color: colors.text, fontSize: 20, fontWeight: "800" },
  walkStatLabel: { color: colors.textDim, fontSize: 12 },
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

/** The tour's first sentence or two in its own narration voice, for the guide picker's preview. */
function openingSample(area: Area): NarrationSample | null {
  const first = area.route[0];
  const source = first?.narration.audioSource;
  if (source == null) return null;
  // End on a sentence break, a few seconds in.
  const starts = NARRATION_CUES[first.id] ?? [];
  const endAt = starts.find((t) => t >= 2.5 && t <= 12) ?? 6;
  return { source, endAt };
}

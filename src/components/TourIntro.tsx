import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Easing, PanResponder, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getGuide, GUIDES, type GuideId } from "../guides/guides";
import { useLanguage } from "../i18n/LanguageContext";
import Mascot from "./Mascot";
import PressScale from "./PressScale";

export interface TourIntroProps {
  title: string;
  /** Metres from the tour's start, once known. Only mentioned when the walker is clearly elsewhere. */
  distanceToStart: number | null;
  onDirections: () => void;
  /** Called straight from the Start tap, so anything that needs a user gesture (audio, speech) can run in it. */
  onStart: () => void;
  /** Called once the exit animation has finished. */
  onDone: () => void;
  /** The chosen tour guide, picked here first — before the guide says anything. */
  guide: GuideId;
  onGuideChange: (guide: GuideId) => void;
}

/** Timeline (ms). The map's fly-in runs underneath for the first ~3s. From mount: */
const PANEL_IN_AT = 1800;
const MASCOT_AT = 2200;
/** From the guide being chosen: */
const GREETING_AT = 600;
const GREETING_MS = 3500;
const HEADPHONES_AT = GREETING_AT + GREETING_MS + 300;
const HEADPHONES_MS = 3200;
/** Farther than this from the start, offer walking directions. */
const FAR_FROM_START_M = 80;

const GRADIENT_TOP = "rgba(118,200,147,0)";
const GREEN = "#5FC08A";
const TEAL = "#3FBFB6";

/**
 * The tour's cinematic entry: while the map flies in from above, a panel
 * rises with the guides to choose from (swipe, arrows or dots). Once one is
 * chosen, that guide greets the walker by name and suggests headphones, then
 * the Start button appears. Tapping the panel early skips ahead.
 */
type Phase = "arrive" | "choose" | "greet" | "ready";

export default function TourIntro({
  title,
  distanceToStart,
  onDirections,
  onStart,
  onDone,
  guide,
  onGuideChange,
}: TourIntroProps) {
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();

  const panel = useRef(new Animated.Value(0)).current;
  const mascot = useRef(new Animated.Value(0)).current;
  const bob = useRef(new Animated.Value(0)).current;
  const picker = useRef(new Animated.Value(0)).current;
  const button = useRef(new Animated.Value(0)).current;
  const exit = useRef(new Animated.Value(0)).current;

  const [bubble, setBubble] = useState<string | null>(null);
  const bubbleAnim = useRef(new Animated.Value(0)).current;
  const [phase, setPhase] = useState<Phase>("arrive");
  const phaseRef = useRef(phase);
  phaseRef.current = phase;
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const at = (ms: number, fn: () => void) => timers.current.push(setTimeout(fn, ms));

  const showBubble = (text: string, ms: number) => {
    setBubble(text);
    bubbleAnim.setValue(0);
    Animated.timing(bubbleAnim, { toValue: 1, duration: 350, easing: Easing.out(Easing.back(1.4)), useNativeDriver: true }).start();
    at(ms - 300, () =>
      Animated.timing(bubbleAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start()
    );
  };

  const popMascot = () => {
    Animated.spring(mascot, { toValue: 1, friction: 5, tension: 70, useNativeDriver: true }).start(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(bob, { toValue: 1, duration: 1100, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
          Animated.timing(bob, { toValue: 0, duration: 1100, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
        ])
      ).start();
    });
  };

  const fadeIn = (value: Animated.Value) =>
    Animated.timing(value, { toValue: 1, duration: 600, delay: 200, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();

  // First the guides to choose from, with the "Choose" button.
  const openChooser = () => {
    if (phaseRef.current !== "arrive") return;
    setPhase("choose");
    fadeIn(picker);
    fadeIn(button);
  };

  // Then the Start button, once the chosen guide has said hello.
  const revealStart = () => {
    if (phaseRef.current === "ready") return;
    setPhase("ready");
    fadeIn(button);
  };

  useEffect(() => {
    at(PANEL_IN_AT, () =>
      Animated.timing(panel, { toValue: 1, duration: 700, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start()
    );
    at(MASCOT_AT, () => {
      popMascot();
      openChooser();
    });
    return () => timers.current.forEach(clearTimeout);
    // Runs once: the intro is a fixed timeline.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The guide is chosen: they greet the walker by name, suggest headphones, and Start appears.
  const confirmGuide = () => {
    if (phaseRef.current !== "choose") return;
    setPhase("greet");
    picker.setValue(0);
    button.setValue(0);
    mascot.setValue(0.55);
    Animated.spring(mascot, { toValue: 1, friction: 5, tension: 90, useNativeDriver: true }).start();
    at(GREETING_AT, () =>
      showBubble(t("activeTour.introGreeting", { area: title, guide: getGuide(guide).name }), GREETING_MS)
    );
    at(HEADPHONES_AT, () => {
      showBubble(t("activeTour.introHeadphones"), HEADPHONES_MS);
      revealStart();
    });
  };

  // Tapping the panel early skips ahead: to the guides while it rises, to Start while the guide talks.
  const skipAhead = () => {
    if (phase === "arrive") {
      panel.setValue(1);
      mascot.setValue(1);
      openChooser();
    } else if (phase === "greet") {
      revealStart();
    }
  };

  // Choosing a guide: swipe the character, or tap the arrows/dots.
  const index = Math.max(0, GUIDES.findIndex((g) => g.id === guide));
  const choose = (next: number) => {
    const wrapped = (next + GUIDES.length) % GUIDES.length;
    if (wrapped === index) return;
    onGuideChange(GUIDES[wrapped].id);
    // Each new guide pops in.
    mascot.setValue(0.55);
    Animated.spring(mascot, { toValue: 1, friction: 5, tension: 90, useNativeDriver: true }).start();
  };
  const chooseRef = useRef(choose);
  chooseRef.current = choose;
  const indexRef = useRef(index);
  indexRef.current = index;
  const swipe = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_e, g) => Math.abs(g.dx) > 12 && Math.abs(g.dx) > Math.abs(g.dy),
        onPanResponderRelease: (_e, g) => {
          if (g.dx <= -40) chooseRef.current(indexRef.current + 1);
          else if (g.dx >= 40) chooseRef.current(indexRef.current - 1);
        },
      }),
    []
  );
  const current = getGuide(guide);

  const handleStart = () => {
    onStart();
    Animated.timing(exit, { toValue: 1, duration: 600, easing: Easing.in(Easing.cubic), useNativeDriver: true }).start(onDone);
  };

  const panelStyle = {
    opacity: Animated.multiply(panel, exit.interpolate({ inputRange: [0, 1], outputRange: [1, 0] })),
    transform: [
      { translateY: panel.interpolate({ inputRange: [0, 1], outputRange: [80, 0] }) },
      { translateY: exit.interpolate({ inputRange: [0, 1], outputRange: [0, 120] }) },
    ],
  };
  const mascotStyle = {
    opacity: mascot.interpolate({ inputRange: [0, 0.3, 1], outputRange: [0, 1, 1] }),
    transform: [
      { translateY: bob.interpolate({ inputRange: [0, 1], outputRange: [0, -8] }) },
      { scale: mascot.interpolate({ inputRange: [0, 1], outputRange: [0.4, 1] }) },
      { rotate: mascot.interpolate({ inputRange: [0, 1], outputRange: ["-12deg", "0deg"] }) },
    ],
  };
  const bubbleStyle = {
    opacity: bubbleAnim,
    transform: [{ translateY: bubbleAnim.interpolate({ inputRange: [0, 1], outputRange: [10, 0] }) }],
  };
  const pickerStyle = {
    opacity: picker,
    transform: [{ translateY: picker.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }],
  };
  const buttonStyle = {
    opacity: button,
    transform: [{ translateY: button.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }],
  };

  const farFromStart = distanceToStart != null && distanceToStart > FAR_FROM_START_M;
  const choosing = phase === "choose";
  const picking = phase === "arrive" || choosing;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      <Animated.View style={[styles.panelWrap, panelStyle]}>
        <Pressable style={[styles.panel, { paddingBottom: 28 + insets.bottom }]} onPress={skipAhead}>
          <View style={styles.bubbleSlot}>
            {bubble && (
              <Animated.View style={[styles.bubble, bubbleStyle]}>
                <Text style={styles.bubbleText}>{bubble}</Text>
                <View style={styles.bubbleTail} />
              </Animated.View>
            )}
          </View>
          <View style={styles.stage} {...(choosing ? swipe.panHandlers : {})}>
            {choosing && (
              <Pressable style={styles.arrow} onPress={() => choose(index - 1)} aria-label={t("guides.previous")} hitSlop={8}>
                <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
              </Pressable>
            )}
            <Animated.View style={mascotStyle}>
              <Mascot size={120} guide={guide} />
            </Animated.View>
            {choosing && (
              <Pressable style={styles.arrow} onPress={() => choose(index + 1)} aria-label={t("guides.next")} hitSlop={8}>
                <Ionicons name="chevron-forward" size={22} color="#FFFFFF" />
              </Pressable>
            )}
          </View>
          {picking ? (
            <Animated.View style={[styles.guideInfo, pickerStyle]} pointerEvents={choosing ? "auto" : "none"}>
              <Text style={styles.chooseLabel}>{t("guides.chooseTitle")}</Text>
              <Text style={styles.guideName}>{current.name}</Text>
              <Text style={styles.guideDescription}>{t(current.descriptionKey)}</Text>
              <View style={styles.dots}>
                {GUIDES.map((g, i) => (
                  <Pressable
                    key={g.id}
                    onPress={() => choose(i)}
                    style={[styles.dot, i === index && styles.dotActive]}
                    aria-label={g.name}
                    hitSlop={6}
                  />
                ))}
              </View>
            </Animated.View>
          ) : (
            <>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.subtitle}>{t("activeTour.introSubtitle")}</Text>
            </>
          )}

          <Animated.View
            style={[styles.buttonArea, buttonStyle]}
            pointerEvents={choosing || phase === "ready" ? "auto" : "none"}
          >
            {picking ? (
              <PressScale style={styles.startButton} scaleTo={0.96} onPress={confirmGuide}>
                <Text style={styles.startButtonText}>{t("guides.chooseButton", { guide: current.name })}</Text>
              </PressScale>
            ) : (
              <PressScale style={styles.startButton} scaleTo={0.96} onPress={handleStart}>
                <Text style={styles.startButtonText}>{t("activeTour.startTour")}</Text>
              </PressScale>
            )}
            {phase === "ready" && farFromStart && (
              <Pressable style={styles.directions} onPress={onDirections} role="link">
                <Ionicons name="navigate" size={14} color="#FFFFFF" />
                <Text style={styles.directionsText}>
                  {t("activeTour.distanceToStart", { distance: Math.round(distanceToStart / 10) * 10 })} ·{" "}
                  <Text style={styles.directionsLink}>{t("activeTour.directions")}</Text>
                </Text>
              </Pressable>
            )}
          </Animated.View>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  panelWrap: { position: "absolute", left: 0, right: 0, bottom: 0 },
  panel: {
    alignItems: "center",
    paddingTop: 12,
    paddingHorizontal: 24,
    ...(Platform.OS === "web"
      ? ({ backgroundImage: `linear-gradient(180deg, ${GRADIENT_TOP} 0%, ${GREEN}F2 28%, ${TEAL} 100%)` } as object)
      : { experimental_backgroundImage: `linear-gradient(180deg, ${GRADIENT_TOP} 0%, ${GREEN}F2 28%, ${TEAL} 100%)` }),
  },
  bubbleSlot: { minHeight: 92, justifyContent: "flex-end", alignItems: "center", marginBottom: 6, alignSelf: "stretch" },
  bubble: {
    maxWidth: 300,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#2F9BFF",
    paddingVertical: 10,
    paddingHorizontal: 14,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  bubbleText: { color: "#201613", fontSize: 15, fontWeight: "600", textAlign: "center", lineHeight: 21 },
  bubbleTail: {
    position: "absolute",
    bottom: -10,
    alignSelf: "center",
    width: 0,
    height: 0,
    borderLeftWidth: 9,
    borderRightWidth: 9,
    borderTopWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#2F9BFF",
  },
  title: {
    marginTop: 14,
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "800",
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowRadius: 8,
    textShadowOffset: { width: 0, height: 2 },
  },
  subtitle: { marginTop: 6, color: "#FFFFFF", fontSize: 17, opacity: 0.95, textAlign: "center" },
  buttonArea: { alignItems: "center", marginTop: 20, gap: 14, minHeight: 90 },
  stage: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 18, alignSelf: "stretch" },
  arrow: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  guideInfo: { alignItems: "center", marginTop: 10 },
  chooseLabel: { color: "#FFFFFF", fontSize: 13, fontWeight: "700", opacity: 0.85, textTransform: "uppercase", letterSpacing: 0.6 },
  guideName: {
    marginTop: 4,
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "800",
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowRadius: 8,
    textShadowOffset: { width: 0, height: 2 },
  },
  guideDescription: { marginTop: 4, color: "#FFFFFF", fontSize: 15, opacity: 0.95, textAlign: "center", maxWidth: 300 },
  dots: { flexDirection: "row", gap: 8, marginTop: 14 },
  dot: { width: 9, height: 9, borderRadius: 5, backgroundColor: "rgba(255,255,255,0.45)" },
  dotActive: { width: 26, backgroundColor: "#FFFFFF" },
  startButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    paddingVertical: 16,
    paddingHorizontal: 52,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
  },
  startButtonText: { color: "#2E9E6B", fontSize: 18, fontWeight: "800" },
  directions: { flexDirection: "row", alignItems: "center", gap: 6 },
  directionsText: { color: "#FFFFFF", fontSize: 13, opacity: 0.95 },
  directionsLink: { fontWeight: "700", textDecorationLine: "underline" },
});

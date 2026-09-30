import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { Animated, Easing, Platform, StyleSheet, Text, View } from "react-native";
import type { Waypoint } from "../content";
import { useLanguage } from "../i18n/LanguageContext";
import Mascot from "./Mascot";
import PressScale from "./PressScale";

/** Why the stop view opened: walked in (or skipped to), re-listening, or peeking ahead. */
export type StopDetailMode = "arrival" | "replay" | "preview";

export interface StopDetailProps {
  waypoint: Waypoint;
  totalStops: number;
  mode: StopDetailMode;
  /** Narration is playing — the mascot bobs along. */
  isTalking: boolean;
  onExit: () => void;
  topInset: number;
  /** Space kept clear at the bottom for the tour's play controls. */
  bottomClearance: number;
}

const BUBBLE_MS = 3200;

function gradient(css: string): object {
  return Platform.OS === "web" ? { backgroundImage: css } : { experimental_backgroundImage: css };
}

/**
 * The immersive stop view, layered over the tour map while the map dives to
 * street level and circles the stop (TourMap's `focusStop`). A dark flash
 * sells the "drop in"; the mascot stands centre stage and speaks; the stop's
 * name sits in a panel at the bottom, above the tour's play controls.
 */
export default function StopDetail({
  waypoint,
  totalStops,
  mode,
  isTalking,
  onExit,
  topInset,
  bottomClearance,
}: StopDetailProps) {
  const { t } = useLanguage();
  const enter = useRef(new Animated.Value(0)).current;
  const flash = useRef(new Animated.Value(0)).current;
  const mascot = useRef(new Animated.Value(0)).current;
  const bob = useRef(new Animated.Value(0)).current;
  const bubbleAnim = useRef(new Animated.Value(0)).current;
  const [bubble, setBubble] = useState<string | null>(null);

  // Fade the frame in once; each new stop replays the drop-in flash and mascot entrance.
  useEffect(() => {
    Animated.timing(enter, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, [enter]);

  useEffect(() => {
    flash.setValue(0);
    mascot.setValue(0);
    Animated.sequence([
      Animated.timing(flash, { toValue: 0.85, duration: 250, easing: Easing.in(Easing.quad), useNativeDriver: true }),
      Animated.timing(flash, { toValue: 0, duration: 650, easing: Easing.out(Easing.quad), useNativeDriver: true }),
    ]).start();
    Animated.sequence([
      Animated.delay(700),
      Animated.spring(mascot, { toValue: 1, friction: 5, tension: 70, useNativeDriver: true }),
    ]).start();

    const line =
      mode === "arrival"
        ? t("activeTour.guideArrived", { stop: waypoint.name })
        : mode === "replay"
          ? t("activeTour.guideReplay")
          : t("activeTour.guideLater");
    const show = setTimeout(() => {
      setBubble(line);
      bubbleAnim.setValue(0);
      Animated.timing(bubbleAnim, { toValue: 1, duration: 350, easing: Easing.out(Easing.back(1.4)), useNativeDriver: true }).start();
    }, 1100);
    const hide = setTimeout(
      () => Animated.timing(bubbleAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start(),
      1100 + BUBBLE_MS
    );
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
    // New stop or new reason → replay the entrance.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waypoint.id, mode]);

  // Bob gently while the story plays.
  useEffect(() => {
    if (!isTalking) {
      Animated.timing(bob, { toValue: 0, duration: 200, useNativeDriver: true }).start();
      return;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(bob, { toValue: 1, duration: 420, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.timing(bob, { toValue: 0, duration: 420, easing: Easing.in(Easing.quad), useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [isTalking, bob]);

  const handleExit = () => {
    Animated.timing(enter, { toValue: 0, duration: 350, useNativeDriver: true }).start(onExit);
  };

  const mascotStyle = {
    opacity: mascot.interpolate({ inputRange: [0, 0.3, 1], outputRange: [0, 1, 1] }),
    transform: [
      { translateY: mascot.interpolate({ inputRange: [0, 1], outputRange: [40, 0] }) },
      { translateY: bob.interpolate({ inputRange: [0, 1], outputRange: [0, -10] }) },
      { scale: mascot.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] }) },
    ],
  };
  const panelStyle = {
    transform: [{ translateY: enter.interpolate({ inputRange: [0, 1], outputRange: [160, 0] }) }],
  };

  return (
    <Animated.View style={[StyleSheet.absoluteFill, { opacity: enter }]} pointerEvents="box-none">
      <View style={[styles.topShade, gradient("linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 100%)")]} pointerEvents="none" />

      <PressScale
        style={[styles.exitButton, { top: topInset + 12 }]}
        scaleTo={0.92}
        onPress={handleExit}
        aria-label={t("activeTour.backToMap")}
      >
        <Ionicons name="map" size={18} color="#FFFFFF" />
        <Text style={styles.exitText}>{t("activeTour.backToMap")}</Text>
      </PressScale>

      <View style={styles.stage} pointerEvents="box-none">
        <View style={styles.bubbleSlot} pointerEvents="none">
          {bubble && (
            <Animated.View
              style={[
                styles.bubble,
                {
                  opacity: bubbleAnim,
                  transform: [{ translateY: bubbleAnim.interpolate({ inputRange: [0, 1], outputRange: [10, 0] }) }],
                },
              ]}
            >
              <Text style={styles.bubbleText}>{bubble}</Text>
              <View style={styles.bubbleTail} />
            </Animated.View>
          )}
        </View>
        <Animated.View style={mascotStyle} pointerEvents="none">
          <Mascot size={130} />
        </Animated.View>
        <View style={styles.groundShadow} pointerEvents="none" />

        <Animated.View
          style={[styles.panel, gradient("linear-gradient(0deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0) 100%)"), { paddingBottom: bottomClearance }, panelStyle]}
          pointerEvents="none"
        >
          <Text style={styles.stopNumber}>{t("activeTour.stopOf", { current: waypoint.order, total: totalStops })}</Text>
          <Text style={styles.title}>{waypoint.name}</Text>
        </Animated.View>
      </View>

      <Animated.View style={[StyleSheet.absoluteFill, styles.flash, { opacity: flash }]} pointerEvents="none" />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  topShade: { position: "absolute", top: 0, left: 0, right: 0, height: 140 },
  exitButton: {
    position: "absolute",
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.4)",
    ...(Platform.OS === "web" ? ({ backdropFilter: "blur(8px)" } as object) : {}),
  },
  exitText: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },
  stage: { position: "absolute", left: 0, right: 0, bottom: 0, alignItems: "center" },
  bubbleSlot: { minHeight: 80, justifyContent: "flex-end", alignItems: "center", marginBottom: 8, alignSelf: "stretch" },
  bubble: {
    maxWidth: 280,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#2F9BFF",
    paddingVertical: 10,
    paddingHorizontal: 14,
    shadowColor: "#000",
    shadowOpacity: 0.2,
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
  groundShadow: {
    width: 110,
    height: 18,
    borderRadius: 55,
    marginTop: -10,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  panel: {
    alignSelf: "stretch",
    alignItems: "center",
    paddingTop: 36,
    paddingHorizontal: 20,
    marginTop: 8,
  },
  stopNumber: { color: "#FFFFFF", fontSize: 14, opacity: 0.8 },
  title: { color: "#FFFFFF", fontSize: 28, fontWeight: "800", textAlign: "center", marginTop: 4 },
  flash: { backgroundColor: "#000000" },
});

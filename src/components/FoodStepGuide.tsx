import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { Animated, Easing, Pressable, StyleSheet, Text, View } from "react-native";
import type { FoodStepCity, FoodStepCuisine } from "../content/foodStep";
import { FOODSTEP_GREEN } from "../content/sisterProducts";
import { getGuide, type GuideId } from "../guides/guides";
import { useLanguage } from "../i18n/LanguageContext";
import { apiUrl } from "../social/api";
import AskGuideModal from "./AskGuideModal";
import Mascot from "./Mascot";
import PressScale from "./PressScale";

/** FoodStep's guides so far; the others can join later. */
const FOODSTEP_GUIDES: GuideId[] = ["scout"];

interface Props {
  city: FoodStepCity;
  cuisine: FoodStepCuisine;
  /** Smaller on a phone, so more of the map shows. */
  compact: boolean;
}

/**
 * Scout on the FoodStep map: welcomes the visitor to the city and cuisine in a
 * speech bubble (styled like the tour stops'), saying it out loud in his tour
 * voice, with "Ask your guide" below.
 * Floats over the bottom of the map; the map still pans, tilts and zooms
 * around it, and it can be tucked away to a small button.
 */
export default function FoodStepGuide({ city, cuisine, compact }: Props) {
  const { t } = useLanguage();
  const guide = getGuide(FOODSTEP_GUIDES[0]);
  const [hidden, setHidden] = useState(false);
  const [asking, setAsking] = useState(false);
  const enter = useRef(new Animated.Value(0)).current;
  const bubble = useRef(new Animated.Value(0)).current;
  const voice = useRef<HTMLAudioElement | null>(null);
  const hiddenRef = useRef(hidden);
  hiddenRef.current = hidden;
  const [voiced, setVoiced] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    const player = new Audio();
    player.onplay = () => setSpeaking(true);
    player.onpause = () => setSpeaking(false);
    player.onended = () => setSpeaking(false);
    voice.current = player;
    return () => {
      player.pause();
      player.removeAttribute("src");
    };
  }, []);

  // Scout says the welcome out loud: again for each new city or cuisine.
  useEffect(() => {
    const player = voice.current;
    if (!player) return;
    player.pause();
    setVoiced(false);
    const request = new AbortController();
    fetch(apiUrl("/api/foodstep-intro"), {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ cityId: city.id, cuisineId: cuisine.id }),
      signal: request.signal,
    })
      .then((res) => (res.ok ? (res.json() as Promise<{ audioUrl: string | null }>) : null))
      .then((data) => {
        if (!data?.audioUrl) return;
        player.src = data.audioUrl;
        setVoiced(true);
        // Browsers only start sound by itself once the visitor has tapped the
        // page (picking the cuisine does it); otherwise it waits for the button.
        if (!hiddenRef.current) player.play().catch(() => {});
      })
      .catch(() => {});
    return () => request.abort();
  }, [city.id, cuisine.id]);

  const toggleVoice = () => {
    const player = voice.current;
    if (!player) return;
    if (!player.paused) return player.pause();
    if (player.ended) player.currentTime = 0;
    player.play().catch(() => {});
  };
  const hide = () => {
    voice.current?.pause();
    setHidden(true);
  };
  const ask = () => {
    voice.current?.pause();
    setAsking(true);
  };

  // Scout springs in, then the welcome pops up; again for each new city or cuisine.
  useEffect(() => {
    if (hidden) return;
    enter.setValue(0);
    bubble.setValue(0);
    Animated.sequence([
      Animated.delay(300),
      Animated.spring(enter, { toValue: 1, friction: 5, tension: 70, useNativeDriver: true }),
      Animated.timing(bubble, { toValue: 1, duration: 350, easing: Easing.out(Easing.back(1.4)), useNativeDriver: true }),
    ]).start();
  }, [city.id, cuisine.id, hidden, enter, bubble]);

  if (hidden) {
    return (
      <View style={styles.layer} pointerEvents="box-none">
        <PressScale
          style={styles.showButton}
          scaleTo={0.92}
          onPress={() => setHidden(false)}
          aria-label={t("foodStep.showGuide", { guide: guide.name })}
        >
          <Mascot size={80} guide={guide.id} />
        </PressScale>
      </View>
    );
  }

  return (
    <View style={styles.layer} pointerEvents="box-none">
      <View style={styles.stage} pointerEvents="box-none">
        <Animated.View
          pointerEvents="none"
          style={{
            opacity: enter,
            transform: [
              { translateY: enter.interpolate({ inputRange: [0, 1], outputRange: [30, 0] }) },
              { scale: enter.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] }) },
            ],
          }}
        >
          <Mascot size={compact ? 76 : 104} guide={guide.id} />
        </Animated.View>
        <View style={[styles.groundShadow, compact && styles.groundShadowCompact]} pointerEvents="none" />

        <Animated.View
          style={[
            styles.bubble,
            {
              opacity: bubble,
              transform: [{ translateY: bubble.interpolate({ inputRange: [0, 1], outputRange: [-8, 0] }) }],
            },
          ]}
        >
          <View style={styles.bubbleTail} />
          <Pressable
            style={styles.hideButton}
            onPress={hide}
            hitSlop={10}
            aria-label={t("foodStep.hideGuide", { guide: guide.name })}
          >
            <Ionicons name="close" size={16} color="#6B605A" />
          </Pressable>
          <View style={styles.bubbleRow}>
            {voiced && (
              <Pressable
                style={styles.voiceButton}
                onPress={toggleVoice}
                hitSlop={8}
                aria-label={speaking ? t("foodStep.pauseGuide", { guide: guide.name }) : t("foodStep.playGuide", { guide: guide.name })}
              >
                <Ionicons name={speaking ? "pause" : "volume-high"} size={15} color="#FFFFFF" />
              </Pressable>
            )}
            <Text style={[styles.bubbleText, compact && styles.bubbleTextCompact]}>
              {t("foodStep.welcome", { city: city.name, cuisine: cuisine.name })}
            </Text>
          </View>
        </Animated.View>

        <PressScale style={styles.askButton} scaleTo={0.94} onPress={ask}>
          <Ionicons name="chatbubble-ellipses" size={18} color="#FFFFFF" />
          <Text style={styles.askText}>{t("askGuide.button")}</Text>
        </PressScale>
      </View>

      {asking && (
        <AskGuideModal
          foodStep={{ city, cuisine }}
          guide={guide.id}
          guideIds={FOODSTEP_GUIDES}
          onClose={() => setAsking(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  layer: { position: "absolute", top: 0, right: 0, bottom: 0, left: 0, justifyContent: "flex-end", alignItems: "center" },
  stage: { alignItems: "center", paddingHorizontal: 16, paddingBottom: 26, maxWidth: 360 },
  groundShadow: { width: 88, height: 14, borderRadius: 44, marginTop: -8, backgroundColor: "rgba(0,0,0,0.3)" },
  groundShadowCompact: { width: 64, height: 10 },
  // The tour stops' bubble, with its tail pointing up at Scout.
  bubble: {
    marginTop: 14,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#2F9BFF",
    paddingVertical: 10,
    paddingLeft: 14,
    paddingRight: 28,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  bubbleTail: {
    position: "absolute",
    top: -10,
    alignSelf: "center",
    width: 0,
    height: 0,
    borderLeftWidth: 9,
    borderRightWidth: 9,
    borderBottomWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#2F9BFF",
  },
  hideButton: { position: "absolute", top: 6, right: 6 },
  bubbleRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  voiceButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: FOODSTEP_GREEN,
    alignItems: "center",
    justifyContent: "center",
  },
  bubbleText: { flexShrink: 1, color: "#201613", fontSize: 15, fontWeight: "600", textAlign: "center", lineHeight: 21 },
  bubbleTextCompact: { fontSize: 13.5, lineHeight: 19 },
  askButton: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    height: 44,
    paddingHorizontal: 18,
    borderRadius: 22,
    backgroundColor: FOODSTEP_GREEN,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  askText: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },
  showButton: {
    position: "absolute",
    left: 14,
    bottom: 22,
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: FOODSTEP_GREEN,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
});

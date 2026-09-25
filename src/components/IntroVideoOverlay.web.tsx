import { useNavigation } from "@react-navigation/native";
import { useMemo, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { useLanguage } from "../i18n/LanguageContext";
import type { TabScreenNav } from "../navigation/types";
import { useTheme } from "../ThemeContext";
import type { ThemeColors } from "../theme";

const SESSION_KEY = "storystep.introSeen";
const VIDEO_SRC = require("../../assets/video/globe-explore.mp4");

/** Landing page shown once per session on Home: a looping, silent background
 * video with a single "Explore" call to action that takes the visitor
 * straight into the Tours list — this is the front door, not a skippable
 * splash screen, so there's no timer and no dismiss-without-choosing. */
export default function IntroVideoOverlay() {
  const navigation = useNavigation<TabScreenNav<"Home">>();
  const { t } = useLanguage();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const alreadySeen = typeof window !== "undefined" && sessionStorage.getItem(SESSION_KEY) === "1";
  const [dismissed, setDismissed] = useState(alreadySeen);
  const opacity = useRef(new Animated.Value(1)).current;

  const handleExplore = () => {
    sessionStorage.setItem(SESSION_KEY, "1");
    Animated.timing(opacity, { toValue: 0, duration: 400, useNativeDriver: true }).start(() => {
      setDismissed(true);
      navigation.navigate("Tours");
    });
  };

  if (dismissed) return null;

  return (
    <Animated.View style={[styles.overlay, { opacity }]} pointerEvents={dismissed ? "none" : "auto"}>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        src={VIDEO_SRC}
      />
      <View style={styles.scrim} pointerEvents="none" />

      <View style={styles.ctaWrap}>
        <Text style={styles.brand}>StoryStep</Text>
        <Pressable style={styles.exploreButton} onPress={handleExplore}>
          <Text style={styles.exploreButtonText}>{t("landing.exploreButton")}</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#000000",
    zIndex: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  scrim: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(10,6,5,0.25)",
  },
  ctaWrap: {
    position: "absolute",
    bottom: "14%",
    alignItems: "center",
    gap: 18,
  },
  brand: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 0.5,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  exploreButton: {
    backgroundColor: colors.primary,
    borderRadius: 28,
    paddingVertical: 16,
    paddingHorizontal: 48,
  },
  exploreButtonText: { color: colors.onPrimary, fontSize: 17, fontWeight: "800" },
  });
}

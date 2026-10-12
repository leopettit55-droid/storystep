import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { useLanguage } from "../i18n/LanguageContext";
import type { MainTabParamList, TabScreenNav } from "../navigation/types";
import { useTheme } from "../ThemeContext";
import type { ThemeColors } from "../theme";

const SESSION_KEY = "storystep.introSeen";
const VIDEO_SRC = require("../../assets/video/globe-explore.mp4");

/** Landing page shown once per session on Home: a looping, silent background
 * video with a single "Explore" call to action that takes the visitor
 * straight into the Tours list — this is the front door, not a skippable
 * splash screen, so there's no timer and no dismiss-without-choosing.
 * The video starts by itself. */
export default function IntroVideoOverlay() {
  const navigation = useNavigation<TabScreenNav<"Home">>();
  const route = useRoute<RouteProp<MainTabParamList, "Home">>();
  const { t } = useLanguage();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const alreadySeen = typeof window !== "undefined" && sessionStorage.getItem(SESSION_KEY) === "1";
  const [dismissed, setDismissed] = useState(alreadySeen);
  const opacity = useRef(new Animated.Value(1)).current;

  // Coming back from FoodStep's back button shows this landing page again,
  // even though it's already been seen this visit.
  const reopen = route.params?.intro;
  useEffect(() => {
    if (!reopen) return;
    opacity.setValue(1);
    setDismissed(false);
    navigation.setParams({ intro: undefined });
  }, [reopen, navigation, opacity]);

  const leaveTo = (tab: "Tours") => {
    sessionStorage.setItem(SESSION_KEY, "1");
    Animated.timing(opacity, { toValue: 0, duration: 400, useNativeDriver: true }).start(() => {
      setDismissed(true);
      navigation.navigate(tab);
    });
  };
  const handleExplore = () => leaveTo("Tours");

  // Phones only autoplay a video that is silent *as an HTML attribute*, which
  // React doesn't write for `muted`, so set it by hand and start playback
  // ourselves. If the phone still refuses (Low Power Mode, data saver), the
  // first touch anywhere starts it, so nobody has to find a play button.
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video || dismissed) return;
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    const events = ["touchstart", "pointerdown", "click", "keydown"];
    const start = () => video.play().then(() => true, () => false);
    const unlock = () => {
      void start().then((ok) => {
        if (ok) removeUnlock();
      });
    };
    const removeUnlock = () => events.forEach((e) => window.removeEventListener(e, unlock));
    void start().then((ok) => {
      if (!ok) events.forEach((e) => window.addEventListener(e, unlock, { passive: true }));
    });
    return removeUnlock;
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <Animated.View style={[styles.overlay, { opacity }]} pointerEvents={dismissed ? "none" : "auto"}>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        controls={false}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        src={VIDEO_SRC}
      />
      <View style={styles.scrim} pointerEvents="none" />

      {/* StoryStep and a single "Explore" button. */}
      <View style={styles.ctaWrap}>
        <Pressable onPress={handleExplore}>
          <Text style={styles.brand}>StoryStep</Text>
        </Pressable>
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
    top: "38%",
    left: 16,
    right: 16,
    alignItems: "center",
    gap: 18,
  },
  brand: {
    color: "#FFFFFF",
    fontSize: 30,
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

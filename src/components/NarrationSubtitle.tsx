import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Platform, StyleSheet, Text } from "react-native";
import { subscribeNarrationProgress } from "../audio/narrationPlayer";
import type { Area } from "../content";
import { subtitleIndexAt, subtitleTrack } from "../content/narration";
import { useLanguage } from "../i18n/LanguageContext";

export interface NarrationSubtitleProps {
  area: Area;
  /** Distance from the bottom of the screen. */
  bottom: number;
  paused: boolean;
}

/**
 * Subtitles for the narrator: the sentence being spoken, in the walker's
 * language (English where there's no translation), timed to the recording.
 * Changing language mid-sentence re-captions it straight away.
 */
export default function NarrationSubtitle({ area, bottom, paused }: NarrationSubtitleProps) {
  const { language } = useLanguage();
  const tracks = useMemo(
    () => new Map(area.route.map((w) => [w.id, subtitleTrack(w, language)])),
    [area, language]
  );
  const [line, setLine] = useState<{ waypointId: string; index: number } | null>(null);
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(
    () =>
      subscribeNarrationProgress((waypointId, seconds) => {
        const track = waypointId ? tracks.get(waypointId) : null;
        if (!waypointId || !track) {
          setLine(null);
          return;
        }
        const index = subtitleIndexAt(track, seconds);
        setLine((prev) => (prev?.waypointId === waypointId && prev.index === index ? prev : { waypointId, index }));
      }),
    [tracks]
  );

  // Each new line fades in.
  useEffect(() => {
    fade.setValue(0);
    Animated.timing(fade, { toValue: 1, duration: 250, useNativeDriver: true }).start();
  }, [line, fade]);

  const text = line ? tracks.get(line.waypointId)?.lines[line.index] : null;
  if (!text) return null;

  return (
    <Animated.View
      style={[styles.wrap, { bottom, opacity: Animated.multiply(fade, paused ? 0.6 : 1) }]}
      pointerEvents="none"
      aria-live="polite"
    >
      <Text style={styles.box}>{text}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: "absolute", left: 16, right: 16, alignItems: "center" },
  box: {
    maxWidth: 560,
    backgroundColor: "rgba(0,0,0,0.72)",
    color: "#FFFFFF",
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "500",
    textAlign: "center",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    overflow: "hidden",
    ...(Platform.OS === "web" ? ({ backdropFilter: "blur(8px)" } as object) : {}),
  },
});

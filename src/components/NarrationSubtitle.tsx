import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Platform, StyleSheet, Text } from "react-native";
import { subscribeNarrationProgress } from "../audio/narrationPlayer";
import type { Area } from "../content";
import { subtitleIndexAt, subtitleTrack, type SubtitleTrack } from "../content/narration";
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
  // Tracks per recording (a stop's standard one, or a guide's own), built as they play.
  const tracks = useMemo(() => {
    const cache = new Map<string, SubtitleTrack | null>();
    return (waypointId: string, recording: string) => {
      if (!cache.has(recording)) {
        const waypoint = area.route.find((w) => w.id === waypointId);
        cache.set(recording, waypoint ? subtitleTrack(waypoint, language, recording) : null);
      }
      return cache.get(recording) ?? null;
    };
  }, [area, language]);
  const [line, setLine] = useState<{ recording: string; track: SubtitleTrack; index: number } | null>(null);
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(
    () =>
      subscribeNarrationProgress((playing, seconds) => {
        const track = playing ? tracks(playing.waypointId, playing.recording) : null;
        if (!playing || !track) {
          setLine(null);
          return;
        }
        const index = subtitleIndexAt(track, seconds);
        setLine((prev) =>
          prev?.recording === playing.recording && prev.track === track && prev.index === index
            ? prev
            : { recording: playing.recording, track, index }
        );
      }),
    [tracks]
  );

  // Each new line fades in.
  useEffect(() => {
    fade.setValue(0);
    Animated.timing(fade, { toValue: 1, duration: 250, useNativeDriver: true }).start();
  }, [line, fade]);

  const text = line?.track.lines[line.index];
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

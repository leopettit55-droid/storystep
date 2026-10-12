import { useEffect, useRef, useState } from "react";
import { Animated, Easing, Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { useLanguage } from "../i18n/LanguageContext";
import { useTheme } from "../ThemeContext";

const AUTO_DISMISS_MS = 4000;
/** Kept here too, for the app (no sessionStorage) and blocked browser storage. */
const seenInMemory = new Set<string>();

function seenThisSession(key: string): boolean {
  if (seenInMemory.has(key)) return true;
  try {
    return sessionStorage.getItem(key) === "1";
  } catch {
    return false;
  }
}

function markSeen(key: string) {
  seenInMemory.add(key);
  try {
    sessionStorage.setItem(key, "1");
  } catch {
    // Private mode or blocked storage: remembered until the page reloads.
  }
}

/**
 * Shown once per visit in each place it's used (the tour's intro, and the AR
 * camera), each with its own `sessionKey`. The first time: a phone outline tilting up
 * from flat to upright, on a see-through scrim over the live camera, saying to
 * hold the phone up and look around (the guide is drawn into the camera view,
 * so it's only seen with the phone raised). Gone on a tap anywhere, or after
 * four seconds. The phone sits in the middle of the top half with the words
 * below it, clear of the AR buttons and cards in the bottom third.
 */
interface Props {
  /** Time to show it (e.g. the camera is up and running). */
  show: boolean;
  /** Remembers it's been seen this visit, separately for each place it's used. */
  sessionKey?: string;
  /** Told when the hint is on screen or gone, so the AR screen can hold back
   * anything that would sit under it (the turn arrow). */
  onVisibleChange?: (visible: boolean) => void;
}

export default function ARPhoneHint({ show, sessionKey = "storystep.arHintSeen", onVisibleChange }: Props) {
  const { t } = useLanguage();
  const { colors } = useTheme();
  const { width, height } = useWindowDimensions();
  const [visible, setVisible] = useState(() => !seenThisSession(sessionKey));
  const fade = useRef(new Animated.Value(0)).current;
  const tilt = useRef(new Animated.Value(0)).current;

  const active = visible && show;
  useEffect(() => onVisibleChange?.(active), [active, onVisibleChange]);

  useEffect(() => {
    if (!active) return;
    markSeen(sessionKey);
    Animated.timing(fade, { toValue: 1, duration: 250, useNativeDriver: true }).start();
    // Flat → upright, a pause, back down, on a loop.
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(tilt, { toValue: 1, duration: 900, easing: Easing.inOut(Easing.cubic), useNativeDriver: true }),
        Animated.delay(700),
        Animated.timing(tilt, { toValue: 0, duration: 600, easing: Easing.inOut(Easing.cubic), useNativeDriver: true }),
        Animated.delay(300),
      ])
    );
    loop.start();
    const timer = setTimeout(dismiss, AUTO_DISMISS_MS);
    return () => {
      loop.stop();
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  function dismiss() {
    Animated.timing(fade, { toValue: 0, duration: 250, useNativeDriver: true }).start(() => setVisible(false));
  }

  if (!active) return null;

  // Bigger on a tablet, within reason.
  const phone = Math.min(Math.max(Math.min(width, height) * 0.16, 56), 96);

  return (
    <Animated.View style={[StyleSheet.absoluteFill, styles.scrim, { opacity: fade }]}>
      <Pressable style={StyleSheet.absoluteFill} onPress={dismiss} accessibilityRole="button" accessibilityLabel={t("arCamera.hintTitle")}>
        <View style={styles.upper} pointerEvents="none">
          <View style={[styles.stage, { height: phone * 2.1, marginTop: -phone * 1.05 }]}>
            <Animated.View
              style={[
                styles.phone,
                {
                  width: phone,
                  height: phone * 1.8,
                  borderRadius: phone * 0.2,
                  borderColor: colors.primary,
                  transform: [
                    { perspective: 600 },
                    { rotateX: tilt.interpolate({ inputRange: [0, 1], outputRange: ["72deg", "0deg"] }) },
                  ],
                },
              ]}
            >
              <View style={[styles.speaker, { backgroundColor: colors.primary, width: phone * 0.3 }]} />
              <View style={[styles.button, { borderColor: colors.primary, width: phone * 0.18, height: phone * 0.18, borderRadius: phone * 0.09 }]} />
            </Animated.View>
          </View>
          <View style={styles.words}>
            <Text style={styles.title}>{t("arCamera.hintTitle")}</Text>
            <Text style={styles.subtitle}>{t("arCamera.hintBody")}</Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  scrim: { backgroundColor: "rgba(10,6,5,0.55)", zIndex: 30 },
  // The phone's middle sits in the middle of the top half (stage pulled up by
  // half its height), the words straight below.
  upper: { position: "absolute", top: "25%", left: 0, right: 0, alignItems: "center", paddingHorizontal: 24 },
  stage: { justifyContent: "center", alignItems: "center", marginBottom: 6 },
  phone: { borderWidth: 3, alignItems: "center", justifyContent: "space-between", paddingVertical: 8 },
  speaker: { height: 3, borderRadius: 2 },
  button: { borderWidth: 2 },
  // Its own darker backing, so the words stay clear over anything bright behind (map labels, sky).
  words: { backgroundColor: "rgba(10,6,5,0.82)", borderRadius: 16, paddingVertical: 14, paddingHorizontal: 20, gap: 6, maxWidth: 460 },
  title: { color: "#FFFFFF", fontSize: 22, fontWeight: "800", textAlign: "center", maxWidth: 420 },
  subtitle: { color: "rgba(255,255,255,0.85)", fontSize: 15, textAlign: "center", maxWidth: 420 },
});

import { useRef, useState } from "react";
import { Animated, StyleSheet } from "react-native";
import { useLanguage } from "../i18n/LanguageContext";
import FlagLanguagePicker from "./FlagLanguagePicker.web";

const SESSION_KEY = "storystep.languageChosen";

/** First page on web (the page a QR code opens): a white page of flags to
 * pick a language. Sits above the whole app, so once a flag is chosen it
 * fades away to reveal the usual app underneath. Shown once per session. */
export default function LanguageGate() {
  const { language, setLanguage } = useLanguage();
  const alreadyChosen = typeof window !== "undefined" && sessionStorage.getItem(SESSION_KEY) === "1";
  const [done, setDone] = useState(alreadyChosen);
  const opacity = useRef(new Animated.Value(1)).current;

  if (done) return null;

  const handleSelect = (code: string) => {
    setLanguage(code);
    sessionStorage.setItem(SESSION_KEY, "1");
    Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true }).start(() => setDone(true));
  };

  return (
    <Animated.View style={[styles.page, { opacity }]}>
      <FlagLanguagePicker current={language} onSelect={handleSelect} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  page: {
    // Pinned to the browser window, not the app's root view, so it also
    // covers the tab bar.
    // @ts-expect-error "fixed" is web-only
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    zIndex: 1000,
    alignItems: "center",
    justifyContent: "center",
  },
});

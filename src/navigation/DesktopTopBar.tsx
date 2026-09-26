import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import LanguagePicker from "../components/LanguagePicker";
import { useLanguage } from "../i18n/LanguageContext";
import { useTheme } from "../ThemeContext";
import type { ThemeColors } from "../theme";

const LABEL_KEYS: Record<string, string> = {
  Home: "nav.home",
  Map: "nav.map",
  Tours: "nav.tours",
  Account: "nav.account",
  Help: "nav.help",
};

export default function DesktopTopBar({ state, navigation }: BottomTabBarProps) {
  const { t } = useLanguage();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  return (
    <View style={styles.bar}>
      <View style={styles.inner}>
        <Pressable
          style={styles.logoWrap}
          onPress={() => navigation.navigate(state.routes[0].name)}
        >
          <View style={styles.logoMark}>
            <Text style={styles.logoMarkText}>S</Text>
          </View>
          <Text style={styles.logoText}>StoryStep</Text>
        </Pressable>

        <View style={styles.links}>
          {state.routes.map((route, index) => {
            const focused = state.index === index;
            return (
              <Pressable
                key={route.key}
                style={styles.link}
                onPress={() => navigation.navigate(route.name)}
              >
                <Text style={[styles.linkText, focused && styles.linkTextActive]}>
                  {t(LABEL_KEYS[route.name] ?? route.name)}
                </Text>
                {focused && <View style={styles.linkUnderline} />}
              </Pressable>
            );
          })}
          <LanguagePicker />
        </View>
      </View>
    </View>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    bar: {
      backgroundColor: colors.background,
      borderBottomWidth: 1,
      borderColor: colors.border,
    },
    inner: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      maxWidth: 1100,
      width: "100%",
      alignSelf: "center",
      paddingHorizontal: 32,
      paddingVertical: 14,
    },
    logoWrap: { flexDirection: "row", alignItems: "center", gap: 10 },
    logoMark: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: colors.primary,
      alignItems: "center",
      justifyContent: "center",
    },
    logoMarkText: { color: colors.onPrimary, fontSize: 15, fontWeight: "800" },
    logoText: { fontSize: 18, fontWeight: "800", color: colors.text },
    links: { flexDirection: "row", alignItems: "center", gap: 28 },
    link: { paddingVertical: 4 },
    linkText: { fontSize: 14, fontWeight: "600", color: colors.textDim },
    linkTextActive: { color: colors.primary },
    // Overlaid, so the active link doesn't sit higher than the others.
    linkUnderline: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: -6,
      height: 2,
      borderRadius: 1,
      backgroundColor: colors.primary,
    },
  });
}

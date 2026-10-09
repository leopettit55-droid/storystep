import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMemo } from "react";
import { Platform, Pressable, StyleSheet, type StyleProp, type ViewStyle } from "react-native";
import { useTheme } from "../ThemeContext";
import type { RootStackParamList } from "../navigation/types";
import type { ThemeColors } from "../theme";

interface Props {
  /** "floating" = circular, semi-transparent, for sitting over a map/photo
   * (top-left, absolute). "inline" = plain button for a normal content flow
   * (e.g. above a scrollable page's title). */
  variant?: "floating" | "inline";
  style?: StyleProp<ViewStyle>;
  /** Instead of going back a screen. */
  onPress?: () => void;
  /** Back to the landing podium (StoryStep, FoodStep, BeerStep). Web only —
   * the app has no podium, so there it goes back a screen as usual. */
  toPodium?: boolean;
}

/** Every stack screen pushed with headerShown:false needs its own way back —
 * there's no native header chevron to fall back on. */
export default function BackButton({ variant = "floating", style, onPress, toPodium }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <Pressable
      style={[variant === "floating" ? styles.floating : styles.inline, style]}
      onPress={
        onPress ??
        (toPodium && Platform.OS === "web"
          ? () => navigation.navigate("MainTabs", { screen: "Home", params: { intro: true } })
          : () => navigation.goBack())
      }
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={toPodium ? "Back to podium" : "Back"}
    >
      <Ionicons
        name="chevron-back"
        size={variant === "floating" ? 22 : 18}
        color={variant === "floating" ? "#FFFFFF" : colors.text}
      />
    </Pressable>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    floating: {
      position: "absolute",
      top: 16,
      left: 16,
      zIndex: 10,
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "rgba(0,0,0,0.45)",
      alignItems: "center",
      justifyContent: "center",
    },
    inline: {
      width: 34,
      height: 34,
      borderRadius: 17,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: "center",
      justifyContent: "center",
    },
  });
}

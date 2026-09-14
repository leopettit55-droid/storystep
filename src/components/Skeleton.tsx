import { useEffect, useRef } from "react";
import { Animated, type StyleProp, type ViewStyle } from "react-native";
import { useTheme } from "../ThemeContext";

interface SkeletonProps {
  style?: StyleProp<ViewStyle>;
  borderRadius?: number;
}

/** A shimmering placeholder block — pulses opacity in a slow loop. Compose a
 * few of these to match the shape of the real content that's about to load,
 * so the swap from placeholder to content doesn't jump around the layout. */
export default function Skeleton({ style, borderRadius = 8 }: SkeletonProps) {
  const { colors } = useTheme();
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 700, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  const opacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1] });

  return (
    <Animated.View
      style={[{ backgroundColor: colors.surfaceRaised, borderRadius, opacity }, style]}
    />
  );
}

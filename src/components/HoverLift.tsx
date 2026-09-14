import { useRef } from "react";
import { Animated, Pressable, type StyleProp, type ViewStyle } from "react-native";
import { tapLight } from "../haptics";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface HoverLiftProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/** Subtle lift-and-scale on hover (web), plus a quick scale-down on press so
 * touch devices — which never see the hover state — still get tactile
 * feedback when tapped. Animates the Pressable itself (via
 * Animated.createAnimatedComponent) rather than wrapping it in an extra View,
 * so layout props in `style` — percentage widths, flex — resolve exactly as
 * if this were a plain Pressable. */
export default function HoverLift({ children, onPress, style }: HoverLiftProps) {
  const lift = useRef(new Animated.Value(0)).current;
  const press = useRef(new Animated.Value(0)).current;

  const animateTo = (anim: Animated.Value, toValue: number, duration: number) => {
    Animated.timing(anim, { toValue, duration, useNativeDriver: true }).start();
  };

  const translateY = lift.interpolate({ inputRange: [0, 1], outputRange: [0, -6] });
  const hoverScale = lift.interpolate({ inputRange: [0, 1], outputRange: [1, 1.03] });
  const pressScale = press.interpolate({ inputRange: [0, 1], outputRange: [1, 0.97] });

  return (
    <AnimatedPressable
      style={[style, { transform: [{ translateY }, { scale: hoverScale }, { scale: pressScale }] }]}
      onPress={onPress}
      onHoverIn={() => animateTo(lift, 1, 160)}
      onHoverOut={() => animateTo(lift, 0, 160)}
      onPressIn={() => {
        animateTo(press, 1, 120);
        tapLight();
      }}
      onPressOut={() => animateTo(press, 0, 120)}
    >
      {children}
    </AnimatedPressable>
  );
}

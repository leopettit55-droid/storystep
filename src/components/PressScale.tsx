import { useRef } from "react";
import {
  Animated,
  Pressable,
  type GestureResponderEvent,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { tapLight } from "../haptics";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface PressScaleProps extends Omit<PressableProps, "style"> {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  /** How far to scale down on press. 0.96 is a subtle tap; use 0.92-0.94 for bigger/primary buttons. */
  scaleTo?: number;
}

/** Wraps any Pressable content with a fast, native-driven scale-down-on-press —
 * the standard "this button is alive" tactile cue, used across primary CTAs
 * and list cards instead of the flat opacity dimming Pressable gives for free.
 * Animates the Pressable itself (via Animated.createAnimatedComponent) rather
 * than wrapping it in an extra View, so layout props in `style` — flex,
 * percentage widths, flexDirection for icon+text rows — resolve exactly as
 * if this were a plain Pressable. */
export default function PressScale({
  children,
  style,
  scaleTo = 0.96,
  onPressIn,
  onPressOut,
  disabled,
  ...rest
}: PressScaleProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const animateTo = (toValue: number) => {
    Animated.timing(scale, { toValue, duration: 120, useNativeDriver: true }).start();
  };

  const handlePressIn = (e: GestureResponderEvent) => {
    if (!disabled) {
      animateTo(scaleTo);
      tapLight();
    }
    onPressIn?.(e);
  };

  const handlePressOut = (e: GestureResponderEvent) => {
    animateTo(1);
    onPressOut?.(e);
  };

  return (
    <AnimatedPressable
      style={[style, { transform: [{ scale }] }]}
      disabled={disabled}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      {...rest}
    >
      {children}
    </AnimatedPressable>
  );
}

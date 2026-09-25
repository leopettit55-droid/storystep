import { useEffect, useRef } from "react";
import { Animated, type StyleProp, type ViewStyle } from "react-native";

interface FadeInItemProps {
  children: React.ReactNode;
  /** Index within the list — used to stagger entrance so items cascade in
   * rather than popping together. Capped internally so long lists don't make
   * the last item wait ages to appear. */
  index?: number;
  style?: StyleProp<ViewStyle>;
}

const STAGGER_MS = 40;
const MAX_DELAY_MS = 240;
const DURATION_MS = 220;

/** Fades + slides a list item in on mount, staggered by its index. Purely a
 * mount animation — it doesn't re-run on re-renders, so scrolling or state
 * updates elsewhere in the list won't re-trigger it. */
export default function FadeInItem({ children, index = 0, style }: FadeInItemProps) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const delay = Math.min(index * STAGGER_MS, MAX_DELAY_MS);
    Animated.timing(progress, {
      toValue: 1,
      duration: DURATION_MS,
      delay,
      useNativeDriver: true,
    }).start();
    // Mount-only: intentionally not depending on `index` so this never restarts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const opacity = progress;
  const translateY = progress.interpolate({ inputRange: [0, 1], outputRange: [10, 0] });

  return (
    <Animated.View style={[style, { opacity, transform: [{ translateY }] }]}>
      {children}
    </Animated.View>
  );
}

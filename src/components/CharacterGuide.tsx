import { useEffect, useRef } from "react";
import { Animated, Easing, Image, StyleSheet } from "react-native";

export interface CharacterGuideProps {
  /** True while narration audio is actively playing. */
  isTalking: boolean;
  size?: number;
}

/**
 * A lightweight stand-in for a "real-time AI character": no video/streaming
 * dependency, so it keeps working offline mid-tour. Bounces while narration
 * plays, holds still otherwise — enough to read as "alive" without the cost
 * or connectivity requirements of a live-rendered avatar.
 */
export default function CharacterGuide({ isTalking, size = 96 }: CharacterGuideProps) {
  const bounce = useRef(new Animated.Value(0)).current;
  const loopRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    loopRef.current?.stop();

    if (isTalking) {
      loopRef.current = Animated.loop(
        Animated.sequence([
          Animated.timing(bounce, {
            toValue: 1,
            duration: 260,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(bounce, {
            toValue: 0,
            duration: 260,
            easing: Easing.in(Easing.quad),
            useNativeDriver: true,
          }),
        ])
      );
      loopRef.current.start();
    } else {
      Animated.timing(bounce, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }

    return () => loopRef.current?.stop();
  }, [isTalking, bounce]);

  const translateY = bounce.interpolate({ inputRange: [0, 1], outputRange: [0, -10] });
  const scale = bounce.interpolate({ inputRange: [0, 1], outputRange: [1, 1.04] });

  return (
    <Animated.View style={{ transform: [{ translateY }, { scale }] }}>
      <Image
        source={require("../../assets/character/guide-idle.png")}
        style={[styles.image, { width: size, height: size }]}
        resizeMode="contain"
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  image: {},
});

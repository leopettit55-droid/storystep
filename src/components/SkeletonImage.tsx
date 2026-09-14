import { useState } from "react";
import { Image, type ImageProps, StyleSheet, View } from "react-native";
import Skeleton from "./Skeleton";

interface SkeletonImageProps extends ImageProps {
  borderRadius?: number;
}

/** An Image that shows a shimmering placeholder in its own place until the
 * real image has finished loading, instead of popping in over blank space. */
export default function SkeletonImage({ style, borderRadius = 0, onLoad, ...rest }: SkeletonImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <View style={style}>
      {!loaded && <Skeleton style={StyleSheet.absoluteFill} borderRadius={borderRadius} />}
      <Image
        {...rest}
        style={[StyleSheet.absoluteFill, { opacity: loaded ? 1 : 0 }, { borderRadius }]}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
      />
    </View>
  );
}

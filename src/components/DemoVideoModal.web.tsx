import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { track } from "../analytics";

/** A short demo video over the tour page. Opened by a tap, so it can start with
 * sound straight away. Tap outside the video, the close button or Escape to leave. */
export default function DemoVideoModal({
  src,
  poster,
  tourId,
  closeLabel,
  onClose,
}: {
  src: string;
  poster: string;
  tourId: string;
  closeLabel: string;
  onClose: () => void;
}) {
  useEffect(() => {
    track("demo_video_opened", { tour_id: tourId });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.backdrop} role="dialog" aria-modal aria-label="Demo video">
      <Pressable style={StyleSheet.absoluteFill} onPress={onClose} aria-label={closeLabel} />
      <View style={styles.center} pointerEvents="box-none">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          src={src}
          poster={poster}
          controls
          autoPlay
          playsInline
          preload="auto"
          onEnded={() => track("demo_video_completed", { tour_id: tourId })}
          style={{
            width: "min(92vw, calc(82vh * 9 / 16))",
            aspectRatio: "9 / 16",
            objectFit: "contain",
            borderRadius: 20,
            backgroundColor: "#000",
            display: "block",
          }}
        />
      </View>
      <Pressable style={styles.close} onPress={onClose} aria-label={closeLabel} role="button">
        <Ionicons name="close" size={26} color="#fff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 300,
    backgroundColor: "rgba(10,6,5,0.86)",
  },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  close: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.18)",
  },
});

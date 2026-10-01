import { Image } from "react-native";
import type { GuideId } from "../guides/guides";

/** A tour guide character. Native has no SVG renderer yet, so every guide
 * shows the illustrated StoryStep mascot; web draws each guide (Mascot.web.tsx). */
export default function Mascot({ size }: { size: number; guide?: GuideId }) {
  return (
    <Image
      source={require("../../assets/character/guide-idle.png")}
      style={{ width: size, height: size, borderRadius: size / 2 }}
      resizeMode="contain"
    />
  );
}

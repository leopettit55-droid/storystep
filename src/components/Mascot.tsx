import { Image } from "react-native";

/** The StoryStep mascot. Native uses the illustrated PNG; web draws the SVG (Mascot.web.tsx). */
export default function Mascot({ size }: { size: number }) {
  return (
    <Image
      source={require("../../assets/character/guide-idle.png")}
      style={{ width: size, height: size, borderRadius: size / 2 }}
      resizeMode="contain"
    />
  );
}

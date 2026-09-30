import { mascotSvg } from "./mascotSvg";

/** The StoryStep mascot, drawn crisp at any size (same artwork as the map avatar). */
export default function Mascot({ size }: { size: number }) {
  return (
    <div
      style={{ width: size, height: Math.round((size * 120) / 100), filter: "drop-shadow(0 10px 24px rgba(0,0,0,0.22))" }}
      dangerouslySetInnerHTML={{ __html: mascotSvg(size) }}
    />
  );
}

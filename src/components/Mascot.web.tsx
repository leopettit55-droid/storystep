import { DEFAULT_GUIDE, guideSvg, type GuideId } from "../guides/guides";

/** A tour guide character, drawn crisp at any size (same artwork as the map avatar). */
export default function Mascot({ size, guide = DEFAULT_GUIDE }: { size: number; guide?: GuideId }) {
  return (
    <div
      style={{ width: size, height: Math.round((size * 120) / 100), filter: "drop-shadow(0 10px 24px rgba(0,0,0,0.22))" }}
      dangerouslySetInnerHTML={{ __html: guideSvg(guide, size) }}
    />
  );
}

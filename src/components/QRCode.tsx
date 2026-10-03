import qrcode from "qrcode-generator";
import { useMemo } from "react";
import { View } from "react-native";

interface Props {
  value: string;
  /** Width and height in points, quiet zone included. */
  size: number;
  color?: string;
  background?: string;
}

/**
 * A QR code drawn with plain views (no SVG library), so it looks the same on
 * the web and in the apps. Each row's dark squares are merged into strips to
 * keep the number of views small.
 */
export default function QRCode({ value, size, color = "#111111", background = "#FFFFFF" }: Props) {
  const { count, strips } = useMemo(() => {
    const qr = qrcode(0, "M");
    qr.addData(value);
    qr.make();
    const n = qr.getModuleCount();
    const out: { row: number; col: number; length: number }[] = [];
    for (let row = 0; row < n; row++) {
      let col = 0;
      while (col < n) {
        if (!qr.isDark(row, col)) {
          col++;
          continue;
        }
        const start = col;
        while (col < n && qr.isDark(row, col)) col++;
        out.push({ row, col: start, length: col - start });
      }
    }
    return { count: n, strips: out };
  }, [value]);

  // A quiet zone of 2 modules on each side, as scanners expect.
  const cell = size / (count + 4);
  return (
    <View style={{ width: size, height: size, backgroundColor: background }} role="img" aria-label={value}>
      {strips.map((s) => (
        <View
          key={`${s.row}-${s.col}`}
          style={{
            position: "absolute",
            left: (s.col + 2) * cell,
            top: (s.row + 2) * cell,
            width: s.length * cell + 0.5,
            height: cell + 0.5,
            backgroundColor: color,
          }}
        />
      ))}
    </View>
  );
}

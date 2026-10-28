import type { CSSProperties } from "react";
import { useTheme } from "../ThemeContext";

/**
 * Halloween over the home hero: a vignette, low drifting fog, a moon with a
 * few bats, and a cobweb in one corner. Purely decorative: it ignores the
 * pointer, is hidden from screen readers, and holds still for anyone who has
 * asked their device to reduce motion.
 */
export default function SeasonalDecor() {
  const { season } = useTheme();
  if (season !== "halloween") return null;
  return (
    <div aria-hidden="true" style={layer}>
      <style>{CSS}</style>
      <div style={vignette} />
      <div className="ss-fog ss-fog-a" />
      <div className="ss-fog ss-fog-b" />
      <div className="ss-moon" />
      <svg className="ss-bats" viewBox="0 0 120 60" width="120" height="60">
        <Bat x={10} y={30} scale={0.9} delay="0s" />
        <Bat x={52} y={12} scale={0.6} delay="0.35s" />
        <Bat x={88} y={34} scale={0.45} delay="0.7s" />
      </svg>
      <svg className="ss-web" viewBox="0 0 100 100" width="110" height="110">
        <g fill="none" stroke="#F6EDE6" strokeWidth="0.6">
          {[0, 15, 30, 45, 60, 75, 90].map((angle) => {
            const r = (angle * Math.PI) / 180;
            return <line key={angle} x1="0" y1="0" x2={100 * Math.cos(r)} y2={100 * Math.sin(r)} />;
          })}
          {[22, 40, 58, 76].map((radius) => (
            <path key={radius} d={webArc(radius)} />
          ))}
        </g>
      </svg>
    </div>
  );
}

function Bat({ x, y, scale, delay }: { x: number; y: number; scale: number; delay: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path
        className="ss-bat"
        style={{ animationDelay: delay }}
        fill="#0D0B0A"
        d="M0 0c3-6 9-8 14-6-2 2-2 4 0 6 2-3 5-4 7-3l1-3 1 3c2-1 5 0 7 3 2-2 2-4 0-6 5-2 11 0 14 6-5-2-9-1-11 3-2-2-5-2-7 0-1-1-3-1-4 0-2-2-5-2-7 0C9-1 5-2 0 0z"
      />
    </g>
  );
}

/** One sagging ring of the cobweb, between each pair of spokes. */
function webArc(radius: number): string {
  const points = [0, 15, 30, 45, 60, 75, 90].map((angle) => {
    const r = (angle * Math.PI) / 180;
    return [radius * Math.cos(r), radius * Math.sin(r)];
  });
  let d = `M${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)}`;
  for (let i = 1; i < points.length; i++) {
    const [px, py] = points[i - 1];
    const [x, y] = points[i];
    // Pull the middle of each strand slightly towards the corner, so it sags.
    const cx = ((px + x) / 2) * 0.86;
    const cy = ((py + y) / 2) * 0.86;
    d += ` Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
}

const layer: CSSProperties = { position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" };

const vignette: CSSProperties = {
  position: "absolute",
  inset: 0,
  background: "radial-gradient(ellipse at 50% 40%, rgba(13,11,10,0) 35%, rgba(13,11,10,0.75) 100%)",
};

const CSS = `
.ss-moon {
  position: absolute; top: 28px; right: 8%;
  width: 64px; height: 64px; border-radius: 50%;
  background: radial-gradient(circle at 38% 36%, #FFF4DC 0%, #F3DDB0 55%, #E2BF84 100%);
  box-shadow: 0 0 40px 10px rgba(240,116,51,0.35), 0 0 90px 30px rgba(240,116,51,0.15);
  opacity: 0.92;
}
.ss-bats { position: absolute; top: 34px; right: calc(8% + 58px); opacity: 0.9; }
.ss-bat { transform-box: fill-box; transform-origin: center; animation: ss-flap 1.4s ease-in-out infinite; }
.ss-web { position: absolute; top: 0; left: 0; opacity: 0.22; }
.ss-fog {
  position: absolute; left: -20%; right: -20%; height: 140px; bottom: -40px;
  background: radial-gradient(ellipse at center, rgba(230,220,210,0.16) 0%, rgba(230,220,210,0) 70%);
  filter: blur(8px);
}
.ss-fog-a { animation: ss-drift 26s ease-in-out infinite alternate; }
.ss-fog-b { bottom: -10px; opacity: 0.7; animation: ss-drift 34s ease-in-out infinite alternate-reverse; }
@keyframes ss-flap { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(0.55); } }
@keyframes ss-drift { from { transform: translateX(-6%); } to { transform: translateX(6%); } }
@media (max-width: 600px) {
  .ss-moon { width: 48px; height: 48px; top: 20px; right: 20px; }
  .ss-bats { top: 22px; right: 74px; transform: scale(0.8); transform-origin: right top; }
  .ss-web { width: 80px; height: 80px; }
}
@media (prefers-reduced-motion: reduce) {
  .ss-bat, .ss-fog-a, .ss-fog-b { animation: none; }
}
`;

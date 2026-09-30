/** The StoryStep mascot as SVG markup (web), split into legs and body groups
 * so the map avatar can animate a walk. `width` in px; height follows. */
export function mascotSvg(width: number): string {
  return `<svg viewBox="0 0 100 120" width="${width}" height="${Math.round((width * 120) / 100)}" aria-hidden="true">
  <g class="ss-leg ss-leg-l"><rect x="34" y="92" width="11" height="18" rx="4" fill="#E4533A" stroke="#6B1410" stroke-width="3"/><ellipse cx="37" cy="111" rx="9" ry="4.5" fill="#E4533A" stroke="#6B1410" stroke-width="3"/></g>
  <g class="ss-leg ss-leg-r"><rect x="55" y="92" width="11" height="18" rx="4" fill="#E4533A" stroke="#6B1410" stroke-width="3"/><ellipse cx="63" cy="111" rx="9" ry="4.5" fill="#E4533A" stroke="#6B1410" stroke-width="3"/></g>
  <g class="ss-body">
    <ellipse cx="17" cy="70" rx="7" ry="15" transform="rotate(18 17 70)" fill="#E4533A" stroke="#6B1410" stroke-width="3"/>
    <ellipse cx="83" cy="70" rx="7" ry="15" transform="rotate(-18 83 70)" fill="#E4533A" stroke="#6B1410" stroke-width="3"/>
    <ellipse cx="50" cy="58" rx="33" ry="42" fill="#EE5A40" stroke="#6B1410" stroke-width="3"/>
    <ellipse cx="37" cy="24" rx="6" ry="3.5" transform="rotate(-30 37 24)" fill="#FFFFFF" opacity="0.5"/>
    <circle cx="38" cy="44" r="14" fill="#FFFFFF"/>
    <circle cx="62" cy="44" r="14" fill="#FFFFFF"/>
    <ellipse cx="50" cy="52" rx="24" ry="13" fill="#FFFFFF"/>
    <circle cx="40" cy="43" r="5" fill="#5A0F0A"/><circle cx="41.6" cy="41.4" r="1.7" fill="#FFFFFF"/>
    <circle cx="60" cy="43" r="5" fill="#5A0F0A"/><circle cx="61.6" cy="41.4" r="1.7" fill="#FFFFFF"/>
    <path d="M42 53 Q50 64 58 53 Z" fill="#5A0F0A"/>
    <ellipse cx="50" cy="58" rx="4.5" ry="2.4" fill="#F28A8A"/>
    <ellipse cx="50" cy="80" rx="17" ry="14" fill="#FFFFFF"/>
  </g>
</svg>`;
}

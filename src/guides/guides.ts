/**
 * The tour guides a walker can choose from. All original StoryStep
 * characters — don't add characters from films or books here; they belong to
 * their owners and can't be used as guides without a licence.
 *
 * Each is drawn as SVG markup (web) in a 100×120 box with the same named
 * parts — `ss-leg-l`, `ss-leg-r` and `ss-body` — which the map avatar's
 * walking animation moves. Feet rest on the bottom edge.
 */

export type GuideId = "scout" | "pip" | "hoot" | "ollie";

export interface Guide {
  id: GuideId;
  name: string;
  /** Translation keys: a one-line description, and what the guide says on reaching a stop ({{stop}}). */
  descriptionKey: string;
  arrivalKey: string;
  svg: string;
}

const OUTLINE = 'stroke-linejoin="round"';

const SCOUT = `
  <g class="ss-leg ss-leg-l"><rect x="34" y="92" width="11" height="18" rx="4" fill="#E4533A" stroke="#6B1410" stroke-width="3"/><ellipse cx="37" cy="111" rx="9" ry="4.5" fill="#E4533A" stroke="#6B1410" stroke-width="3"/></g>
  <g class="ss-leg ss-leg-r"><rect x="55" y="92" width="11" height="18" rx="4" fill="#E4533A" stroke="#6B1410" stroke-width="3"/><ellipse cx="63" cy="111" rx="9" ry="4.5" fill="#E4533A" stroke="#6B1410" stroke-width="3"/></g>
  <g class="ss-body">
    <ellipse cx="17" cy="70" rx="7" ry="15" transform="rotate(18 17 70)" fill="#E4533A" stroke="#6B1410" stroke-width="3"/>
    <ellipse cx="83" cy="70" rx="7" ry="15" transform="rotate(-18 83 70)" fill="#E4533A" stroke="#6B1410" stroke-width="3"/>
    <ellipse cx="50" cy="58" rx="33" ry="42" fill="#EE5A40" stroke="#6B1410" stroke-width="3"/>
    <circle cx="38" cy="44" r="14" fill="#FFFFFF"/>
    <circle cx="62" cy="44" r="14" fill="#FFFFFF"/>
    <ellipse cx="50" cy="52" rx="24" ry="13" fill="#FFFFFF"/>
    <circle cx="40" cy="43" r="5" fill="#5A0F0A"/><circle cx="41.6" cy="41.4" r="1.7" fill="#FFFFFF"/>
    <circle cx="60" cy="43" r="5" fill="#5A0F0A"/><circle cx="61.6" cy="41.4" r="1.7" fill="#FFFFFF"/>
    <path d="M42 53 Q50 64 58 53 Z" fill="#5A0F0A"/>
    <ellipse cx="50" cy="58" rx="4.5" ry="2.4" fill="#F28A8A"/>
    <ellipse cx="50" cy="80" rx="17" ry="14" fill="#FFFFFF"/>
    <path d="M22 50 Q27 70 35 88" stroke="#E07A3C" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M78 50 Q73 70 65 88" stroke="#E07A3C" stroke-width="5" fill="none" stroke-linecap="round"/>
    <circle cx="27" cy="66" r="2.5" fill="#F4C430" stroke="#7A3A12" stroke-width="1.2"/>
    <circle cx="73" cy="66" r="2.5" fill="#F4C430" stroke="#7A3A12" stroke-width="1.2"/>
    <path d="M30 22 Q31 4 50 4 Q69 4 70 22 Z" fill="#D8B87A" stroke="#6B4A22" stroke-width="2.5" ${OUTLINE}/>
    <path d="M30.5 17 Q50 12 69.5 17 L70 22 Q50 17 30 22 Z" fill="#2E9E8F"/>
    <ellipse cx="50" cy="22" rx="33" ry="6" fill="#C9A66B" stroke="#6B4A22" stroke-width="2.5"/>
    <path d="M38 9 Q44 6 50 6" stroke="#FFFFFF" stroke-width="2" fill="none" opacity="0.5" stroke-linecap="round"/>
  </g>`;

const PIP = `
  <g class="ss-leg ss-leg-l"><rect x="37" y="96" width="8" height="10" rx="3" fill="#F39C34"/><ellipse cx="38" cy="110" rx="10" ry="4.5" fill="#F7A440" stroke="#9A5512" stroke-width="2.5"/></g>
  <g class="ss-leg ss-leg-r"><rect x="55" y="96" width="8" height="10" rx="3" fill="#F39C34"/><ellipse cx="62" cy="110" rx="10" ry="4.5" fill="#F7A440" stroke="#9A5512" stroke-width="2.5"/></g>
  <g class="ss-body">
    <ellipse cx="17" cy="66" rx="7" ry="18" transform="rotate(22 17 66)" fill="#24324A" stroke="#111827" stroke-width="3"/>
    <ellipse cx="83" cy="62" rx="7" ry="17" transform="rotate(-40 83 62)" fill="#24324A" stroke="#111827" stroke-width="3"/>
    <ellipse cx="50" cy="60" rx="32" ry="40" fill="#2B3A55" stroke="#111827" stroke-width="3"/>
    <ellipse cx="50" cy="73" rx="21" ry="25" fill="#FFFFFF"/>
    <path d="M28 43 Q30 25 50 25 Q70 25 72 43 Q72 57 50 59 Q28 57 28 43 Z" fill="#FFFFFF"/>
    <ellipse cx="38" cy="27" rx="6" ry="3" transform="rotate(-25 38 27)" fill="#FFFFFF" opacity="0.35"/>
    <circle cx="41" cy="41" r="4.5" fill="#111827"/><circle cx="42.4" cy="39.6" r="1.5" fill="#FFFFFF"/>
    <circle cx="59" cy="41" r="4.5" fill="#111827"/><circle cx="60.4" cy="39.6" r="1.5" fill="#FFFFFF"/>
    <ellipse cx="34" cy="50" rx="4" ry="2.5" fill="#FF9AA2" opacity="0.7"/>
    <ellipse cx="66" cy="50" rx="4" ry="2.5" fill="#FF9AA2" opacity="0.7"/>
    <path d="M44 47 L56 47 L50 55 Z" fill="#F7A440" stroke="#9A5512" stroke-width="2" ${OUTLINE}/>
    <path d="M33 54 Q41 66 43 68 M67 54 Q59 66 57 68" stroke="#1F2933" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <rect x="39" y="66" width="22" height="15" rx="3.5" fill="#3A3F47" stroke="#111827" stroke-width="2"/>
    <rect x="42" y="63.5" width="7" height="4" rx="1.5" fill="#3A3F47" stroke="#111827" stroke-width="1.6"/>
    <circle cx="50" cy="73.5" r="5" fill="#8FD3FF" stroke="#111827" stroke-width="2"/>
    <circle cx="48.5" cy="72" r="1.4" fill="#FFFFFF"/>
    <circle cx="57" cy="69.5" r="1.3" fill="#F4C430"/>
    <path d="M89 26 L89 86" stroke="#6B4A22" stroke-width="3" stroke-linecap="round"/>
    <path d="M89 25 L100 30.5 L89 36 Z" fill="#2E9E8F" stroke="#14524A" stroke-width="1.8" ${OUTLINE}/>
    <circle cx="93" cy="30.5" r="1.6" fill="#FFFFFF"/>
  </g>`;

const HOOT = `
  <g class="ss-leg ss-leg-l"><rect x="38" y="96" width="7" height="10" rx="3" fill="#E6A23C"/><ellipse cx="39" cy="110" rx="9" ry="4" fill="#E6A23C" stroke="#8A5A12" stroke-width="2.5"/></g>
  <g class="ss-leg ss-leg-r"><rect x="55" y="96" width="7" height="10" rx="3" fill="#E6A23C"/><ellipse cx="61" cy="110" rx="9" ry="4" fill="#E6A23C" stroke="#8A5A12" stroke-width="2.5"/></g>
  <g class="ss-body">
    <path d="M22 52 Q8 72 21 94 Q30 82 27 58 Z" fill="#7A4E2D" stroke="#3E2414" stroke-width="3" ${OUTLINE}/>
    <path d="M78 52 Q92 72 79 94 Q70 82 73 58 Z" fill="#7A4E2D" stroke="#3E2414" stroke-width="3" ${OUTLINE}/>
    <ellipse cx="50" cy="63" rx="31" ry="38" fill="#9A6A43" stroke="#3E2414" stroke-width="3"/>
    <ellipse cx="50" cy="76" rx="19" ry="21" fill="#F1D9B5"/>
    <path d="M41 70 q4 4 8 0 M51 70 q4 4 8 0 M45 78 q5 4 10 0 M41 86 q4 4 8 0 M51 86 q4 4 8 0" stroke="#C9A57A" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M24 40 L20 24 L34 34 Z" fill="#7A4E2D" stroke="#3E2414" stroke-width="2.5" ${OUTLINE}/>
    <path d="M76 40 L80 24 L66 34 Z" fill="#7A4E2D" stroke="#3E2414" stroke-width="2.5" ${OUTLINE}/>
    <circle cx="39" cy="47" r="12" fill="#F1D9B5"/>
    <circle cx="61" cy="47" r="12" fill="#F1D9B5"/>
    <circle cx="39" cy="47" r="7.5" fill="#FFFFFF" stroke="#3E2414" stroke-width="2"/><circle cx="40" cy="47" r="4.2" fill="#111827"/><circle cx="41.4" cy="45.6" r="1.4" fill="#FFFFFF"/>
    <circle cx="61" cy="47" r="7.5" fill="#FFFFFF" stroke="#3E2414" stroke-width="2"/><circle cx="60" cy="47" r="4.2" fill="#111827"/><circle cx="61.4" cy="45.6" r="1.4" fill="#FFFFFF"/>
    <circle cx="39" cy="47" r="10" fill="none" stroke="#3E2414" stroke-width="1.6"/>
    <circle cx="61" cy="47" r="10" fill="none" stroke="#3E2414" stroke-width="1.6"/>
    <path d="M49 46 Q50 44 51 46" stroke="#3E2414" stroke-width="1.6" fill="none"/>
    <path d="M46 55 L54 55 L50 63 Z" fill="#E6A23C" stroke="#8A5A12" stroke-width="2" ${OUTLINE}/>
    <path d="M33 30 Q50 25 67 30 L67 36 Q50 32 33 36 Z" fill="#1F2933"/>
    <path d="M20 23 L50 12 L80 23 L50 33 Z" fill="#1F2933" stroke="#0B1015" stroke-width="2" ${OUTLINE}/>
    <path d="M50 22 L73 26 L73 39" stroke="#F4C430" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <circle cx="73" cy="40" r="3" fill="#F4C430"/>
  </g>`;

const OLLIE = `
  <g class="ss-leg ss-leg-l"><rect x="37" y="96" width="8" height="10" rx="3" fill="#7A4D31"/><ellipse cx="38" cy="110" rx="10" ry="4.5" fill="#7A4D31" stroke="#3B2414" stroke-width="2.5"/></g>
  <g class="ss-leg ss-leg-r"><rect x="55" y="96" width="8" height="10" rx="3" fill="#7A4D31"/><ellipse cx="62" cy="110" rx="10" ry="4.5" fill="#7A4D31" stroke="#3B2414" stroke-width="2.5"/></g>
  <g class="ss-body">
    <path d="M70 84 Q90 92 95 74 Q89 80 73 76 Z" fill="#7A4D31" stroke="#3B2414" stroke-width="3" ${OUTLINE}/>
    <circle cx="27" cy="28" r="7" fill="#8A5A3B" stroke="#3B2414" stroke-width="3"/><circle cx="27" cy="28" r="3.2" fill="#F3DDBE"/>
    <circle cx="73" cy="28" r="7" fill="#8A5A3B" stroke="#3B2414" stroke-width="3"/><circle cx="73" cy="28" r="3.2" fill="#F3DDBE"/>
    <ellipse cx="17" cy="70" rx="7" ry="16" transform="rotate(20 17 70)" fill="#7A4D31" stroke="#3B2414" stroke-width="3"/>
    <ellipse cx="83" cy="58" rx="7" ry="16" transform="rotate(38 83 58)" fill="#7A4D31" stroke="#3B2414" stroke-width="3"/>
    <ellipse cx="50" cy="60" rx="32" ry="40" fill="#9A6644" stroke="#3B2414" stroke-width="3"/>
    <ellipse cx="50" cy="80" rx="20" ry="19" fill="#F3DDBE"/>
    <ellipse cx="50" cy="51" rx="19" ry="12" fill="#F3DDBE"/>
    <ellipse cx="38" cy="26" rx="6" ry="3" transform="rotate(-25 38 26)" fill="#FFFFFF" opacity="0.3"/>
    <path d="M35 34 Q40 31 45 34" stroke="#3B2414" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <path d="M55 32 Q60 29 65 31" stroke="#3B2414" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <circle cx="40" cy="41" r="4.5" fill="#1B120C"/><circle cx="41.4" cy="39.6" r="1.5" fill="#FFFFFF"/>
    <circle cx="60" cy="41" r="4.5" fill="#1B120C"/><circle cx="61.4" cy="39.6" r="1.5" fill="#FFFFFF"/>
    <ellipse cx="50" cy="47.5" rx="5.5" ry="3.8" fill="#2B1A10"/><ellipse cx="48.5" cy="46.4" rx="1.8" ry="1" fill="#FFFFFF" opacity="0.6"/>
    <path d="M44 53.5 Q47 58 50 53.5 Q53 58 56 53.5" stroke="#2B1A10" stroke-width="2" fill="none" stroke-linecap="round" ${OUTLINE}/>
    <path d="M34 49 L24 47 M34 53 L24 55 M66 49 L76 47 M66 53 L76 55" stroke="#3B2414" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M29 63 Q50 72 71 63 L68 70 Q50 78 32 70 Z" fill="#2E9E8F" stroke="#14524A" stroke-width="2" ${OUTLINE}/>
    <path d="M45 72 L55 72 L50 83 Z" fill="#2E9E8F" stroke="#14524A" stroke-width="2" ${OUTLINE}/>
    <circle cx="50" cy="72.5" r="2.6" fill="#24806F" stroke="#14524A" stroke-width="1.4"/>
    <g transform="rotate(24 93 37)">
      <rect x="89" y="25" width="9" height="24" rx="3" fill="#F6E7C8" stroke="#6B4A22" stroke-width="2"/>
      <path d="M89 35 L98 35 L98 39 L89 39 Z" fill="#E4533A"/>
      <ellipse cx="93.5" cy="25.5" rx="4.5" ry="2" fill="#E8D2A6" stroke="#6B4A22" stroke-width="1.6"/>
    </g>
    <circle cx="92.5" cy="47" r="5" fill="#7A4D31" stroke="#3B2414" stroke-width="2.5"/>
  </g>`;

/** In picker order: Professor Hoot first — he narrates in the original recorded voice. */
export const GUIDES: Guide[] = [
  { id: "hoot", name: "Professor Hoot", descriptionKey: "guides.hootDescription", arrivalKey: "guides.hootArrived", svg: HOOT },
  { id: "scout", name: "Scout", descriptionKey: "guides.scoutDescription", arrivalKey: "guides.scoutArrived", svg: SCOUT },
  { id: "pip", name: "Pip", descriptionKey: "guides.pipDescription", arrivalKey: "guides.pipArrived", svg: PIP },
  { id: "ollie", name: "Ollie", descriptionKey: "guides.ollieDescription", arrivalKey: "guides.ollieArrived", svg: OLLIE },
];

export const DEFAULT_GUIDE: GuideId = "hoot";

export function getGuide(id: string | null | undefined): Guide {
  return GUIDES.find((g) => g.id === id) ?? GUIDES[0];
}

/** The guide as SVG markup, `width` px wide (height follows the 100×120 box). */
export function guideSvg(id: GuideId, width: number): string {
  const height = Math.round((width * 120) / 100);
  return `<svg viewBox="0 0 100 120" width="${width}" height="${height}" aria-hidden="true">${getGuide(id).svg}</svg>`;
}

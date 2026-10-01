/**
 * The tour guides a walker can choose from. All original StoryStep
 * characters — don't add characters from films or books here; they belong to
 * their owners and can't be used as guides without a licence.
 *
 * Each is drawn as SVG markup (web) in a 100×120 box with the same named
 * parts — `ss-leg-l`, `ss-leg-r` and `ss-body` — which the map avatar's
 * walking animation moves. Feet rest on the bottom edge.
 */

export type GuideId = "scout" | "pip" | "hoot" | "gus";

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
    <ellipse cx="37" cy="24" rx="6" ry="3.5" transform="rotate(-30 37 24)" fill="#FFFFFF" opacity="0.5"/>
    <circle cx="38" cy="44" r="14" fill="#FFFFFF"/>
    <circle cx="62" cy="44" r="14" fill="#FFFFFF"/>
    <ellipse cx="50" cy="52" rx="24" ry="13" fill="#FFFFFF"/>
    <circle cx="40" cy="43" r="5" fill="#5A0F0A"/><circle cx="41.6" cy="41.4" r="1.7" fill="#FFFFFF"/>
    <circle cx="60" cy="43" r="5" fill="#5A0F0A"/><circle cx="61.6" cy="41.4" r="1.7" fill="#FFFFFF"/>
    <path d="M42 53 Q50 64 58 53 Z" fill="#5A0F0A"/>
    <ellipse cx="50" cy="58" rx="4.5" ry="2.4" fill="#F28A8A"/>
    <ellipse cx="50" cy="80" rx="17" ry="14" fill="#FFFFFF"/>
  </g>`;

const PIP = `
  <g class="ss-leg ss-leg-l"><rect x="37" y="96" width="8" height="10" rx="3" fill="#F39C34"/><ellipse cx="38" cy="110" rx="10" ry="4.5" fill="#F7A440" stroke="#9A5512" stroke-width="2.5"/></g>
  <g class="ss-leg ss-leg-r"><rect x="55" y="96" width="8" height="10" rx="3" fill="#F39C34"/><ellipse cx="62" cy="110" rx="10" ry="4.5" fill="#F7A440" stroke="#9A5512" stroke-width="2.5"/></g>
  <g class="ss-body">
    <ellipse cx="17" cy="66" rx="7" ry="18" transform="rotate(22 17 66)" fill="#24324A" stroke="#111827" stroke-width="3"/>
    <ellipse cx="83" cy="66" rx="7" ry="18" transform="rotate(-22 83 66)" fill="#24324A" stroke="#111827" stroke-width="3"/>
    <ellipse cx="50" cy="60" rx="32" ry="40" fill="#2B3A55" stroke="#111827" stroke-width="3"/>
    <ellipse cx="50" cy="73" rx="21" ry="25" fill="#FFFFFF"/>
    <path d="M28 43 Q30 25 50 25 Q70 25 72 43 Q72 57 50 59 Q28 57 28 43 Z" fill="#FFFFFF"/>
    <ellipse cx="38" cy="27" rx="6" ry="3" transform="rotate(-25 38 27)" fill="#FFFFFF" opacity="0.35"/>
    <circle cx="41" cy="41" r="4.5" fill="#111827"/><circle cx="42.4" cy="39.6" r="1.5" fill="#FFFFFF"/>
    <circle cx="59" cy="41" r="4.5" fill="#111827"/><circle cx="60.4" cy="39.6" r="1.5" fill="#FFFFFF"/>
    <ellipse cx="34" cy="50" rx="4" ry="2.5" fill="#FF9AA2" opacity="0.7"/>
    <ellipse cx="66" cy="50" rx="4" ry="2.5" fill="#FF9AA2" opacity="0.7"/>
    <path d="M44 47 L56 47 L50 55 Z" fill="#F7A440" stroke="#9A5512" stroke-width="2" ${OUTLINE}/>
    <path d="M25 61 Q50 72 75 61 L75 67 Q50 78 25 67 Z" fill="#4ECDC4" stroke="#1F8F88" stroke-width="2" ${OUTLINE}/>
    <rect x="60" y="66" width="8" height="17" rx="3" fill="#4ECDC4" stroke="#1F8F88" stroke-width="2"/>
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

const GUS = `
  <g class="ss-leg ss-leg-l"><rect x="36" y="94" width="10" height="13" rx="3" fill="#8A939A" stroke="#4B5358" stroke-width="2.5"/><path d="M28 112 L31 106 L47 106 L48 112 Z" fill="#8A939A" stroke="#4B5358" stroke-width="2.5" ${OUTLINE}/></g>
  <g class="ss-leg ss-leg-r"><rect x="54" y="94" width="10" height="13" rx="3" fill="#8A939A" stroke="#4B5358" stroke-width="2.5"/><path d="M52 112 L53 106 L69 106 L72 112 Z" fill="#8A939A" stroke="#4B5358" stroke-width="2.5" ${OUTLINE}/></g>
  <g class="ss-body">
    <path d="M24 54 L4 42 L10 60 L2 66 L14 72 L10 82 L26 76 Z" fill="#6E777D" stroke="#3D4448" stroke-width="2.5" ${OUTLINE}/>
    <path d="M76 54 L96 42 L90 60 L98 66 L86 72 L90 82 L74 76 Z" fill="#6E777D" stroke="#3D4448" stroke-width="2.5" ${OUTLINE}/>
    <ellipse cx="50" cy="65" rx="29" ry="35" fill="#9AA3A8" stroke="#4B5358" stroke-width="3"/>
    <ellipse cx="50" cy="78" rx="16" ry="17" fill="#B8C0C4"/>
    <path d="M66 74 l4 6 l-3 5 M31 82 l-3 5" stroke="#7D868B" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <path d="M34 36 Q25 20 33 12 Q34 25 41 31 Z" fill="#D9CBA3" stroke="#6B5E3E" stroke-width="2" ${OUTLINE}/>
    <path d="M66 36 Q75 20 67 12 Q66 25 59 31 Z" fill="#D9CBA3" stroke="#6B5E3E" stroke-width="2" ${OUTLINE}/>
    <path d="M23 46 L31 39 L31 52 Z" fill="#9AA3A8" stroke="#4B5358" stroke-width="2.5" ${OUTLINE}/>
    <path d="M77 46 L69 39 L69 52 Z" fill="#9AA3A8" stroke="#4B5358" stroke-width="2.5" ${OUTLINE}/>
    <path d="M35 42 L46 40 M65 42 L54 40" stroke="#4B5358" stroke-width="3" stroke-linecap="round"/>
    <circle cx="41" cy="48" r="5" fill="#FFD45A" stroke="#4B5358" stroke-width="2"/><circle cx="41.5" cy="48.5" r="2.2" fill="#222222"/>
    <circle cx="59" cy="48" r="5" fill="#FFD45A" stroke="#4B5358" stroke-width="2"/><circle cx="58.5" cy="48.5" r="2.2" fill="#222222"/>
    <circle cx="47" cy="54" r="1.3" fill="#4B5358"/><circle cx="53" cy="54" r="1.3" fill="#4B5358"/>
    <path d="M36 58 Q50 71 64 58 Q50 64 36 58 Z" fill="#3D2A2A" stroke="#4B5358" stroke-width="2" ${OUTLINE}/>
    <path d="M42 60 L44 64.5 L46.5 61 Z M53.5 61 L56 64.5 L58 60 Z" fill="#FFFFFF"/>
  </g>`;

export const GUIDES: Guide[] = [
  { id: "scout", name: "Scout", descriptionKey: "guides.scoutDescription", arrivalKey: "activeTour.guideArrived", svg: SCOUT },
  { id: "pip", name: "Pip", descriptionKey: "guides.pipDescription", arrivalKey: "guides.pipArrived", svg: PIP },
  { id: "hoot", name: "Professor Hoot", descriptionKey: "guides.hootDescription", arrivalKey: "guides.hootArrived", svg: HOOT },
  { id: "gus", name: "Gus", descriptionKey: "guides.gusDescription", arrivalKey: "guides.gusArrived", svg: GUS },
];

export const DEFAULT_GUIDE: GuideId = "scout";

export function getGuide(id: string | null | undefined): Guide {
  return GUIDES.find((g) => g.id === id) ?? GUIDES[0];
}

/** The guide as SVG markup, `width` px wide (height follows the 100×120 box). */
export function guideSvg(id: GuideId, width: number): string {
  const height = Math.round((width * 120) / 100);
  return `<svg viewBox="0 0 100 120" width="${width}" height="${height}" aria-hidden="true">${getGuide(id).svg}</svg>`;
}

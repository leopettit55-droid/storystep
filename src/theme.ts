export interface ThemeColors {
  background: string;
  surface: string;
  surfaceRaised: string;
  primary: string;
  primaryPressed: string;
  onPrimary: string;
  text: string;
  textMid: string;
  textDim: string;
  textFaint: string;
  border: string;
  warnBg: string;
  warnText: string;
  mapStreet: string;
  mapStreetLine: string;
  mapPinNeutral: string;
  success: string;
  /** Display font for big headings; undefined uses the normal system font. */
  headingFont?: string;
  /** Soft glow behind the brand name and seasonal accents; undefined for none. */
  glow?: string;
}

export const lightColors: ThemeColors = {
  background: "#FFFFFF",
  surface: "#FFF3EC",
  surfaceRaised: "#FFE4D1",
  primary: "#D85A30",
  primaryPressed: "#A8431F",
  onPrimary: "#FFFFFF",
  text: "#201613",
  textMid: "#5C4B44",
  textDim: "#8C7B72",
  textFaint: "#A89A90",
  border: "#F3DCC9",
  warnBg: "#FFF0DC",
  warnText: "#9A5B12",
  mapStreet: "#FBF0E8",
  mapStreetLine: "#EFDCC9",
  mapPinNeutral: "#3A2C2B",
  success: "#2E7D46",
};

export const darkColors: ThemeColors = {
  background: "#17110E",
  surface: "#241B16",
  surfaceRaised: "#2F241D",
  primary: "#E2653A",
  primaryPressed: "#C24F27",
  onPrimary: "#FFFFFF",
  text: "#F3EAE4",
  textMid: "#C9B9AF",
  textDim: "#9C8B81",
  textFaint: "#7A6B62",
  border: "#3A2E27",
  warnBg: "#3A2A16",
  warnText: "#FFB74D",
  mapStreet: "#241B16",
  mapStreetLine: "#3A2E27",
  mapPinNeutral: "#F3EAE4",
  success: "#4CAF6D",
};

/** Halloween (season.ts): near-black with pumpkin orange. Text on orange is
 * dark rather than white, which reads far better against this brighter orange. */
export const halloweenColors: ThemeColors = {
  background: "#0D0B0A",
  surface: "#171311",
  surfaceRaised: "#221B17",
  primary: "#F07433",
  primaryPressed: "#C95A22",
  onPrimary: "#160E0A",
  text: "#F6EDE6",
  textMid: "#CFC1B6",
  textDim: "#A09289",
  textFaint: "#948780",
  border: "#2E2621",
  warnBg: "#3A2A16",
  warnText: "#FFB74D",
  mapStreet: "#171311",
  mapStreetLine: "#2E2621",
  mapPinNeutral: "#F6EDE6",
  success: "#4CAF6D",
  headingFont: "CinzelDecorative-Bold",
  glow: "rgba(240,116,51,0.55)",
};

/** Static light palette — kept for the handful of call sites (e.g. modules
 * without a component tree to read context from) that genuinely can't use
 * useTheme(). Prefer useTheme().colors everywhere else so screens actually
 * respond to dark mode. */
export const colors = lightColors;

/** Viewport width at which the tab layout switches from mobile bottom-tabs
 * to the desktop top navbar. */
export const DESKTOP_BREAKPOINT = 900;

/** Reading width for list and text pages on wide screens, so lines and cards
 * don't stretch across the whole desktop window. */
export const CONTENT_MAX_WIDTH = 760;

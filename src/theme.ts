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

/** Static light palette — kept for the handful of call sites (e.g. modules
 * without a component tree to read context from) that genuinely can't use
 * useTheme(). Prefer useTheme().colors everywhere else so screens actually
 * respond to dark mode. */
export const colors = lightColors;

/** Viewport width at which the tab layout switches from mobile bottom-tabs
 * to the desktop top navbar. */
export const DESKTOP_BREAKPOINT = 900;

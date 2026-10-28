import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { loadAsync } from "expo-font";
import { useColorScheme } from "react-native";
import { activeSeason, type SeasonId } from "./season";
import { darkColors, halloweenColors, lightColors, type ThemeColors } from "./theme";

const SEASON_COLORS: Record<SeasonId, ThemeColors> = { halloween: halloweenColors };

const STORAGE_KEY = "storystep.themeMode";

type Mode = "light" | "dark";

interface ThemeContextValue {
  mode: Mode;
  colors: ThemeColors;
  isDark: boolean;
  /** The seasonal look in force (season.ts), which overrides light/dark. */
  season: SeasonId | null;
  /** Explicitly sets and persists a mode, overriding the system preference
   * from then on. */
  setMode: (mode: Mode) => void;
  /** Toggles between light and dark, persisting the result. */
  toggleMode: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();
  // null = no manual override yet — the app follows the system preference
  // (and keeps following it live if the OS setting changes) until the user
  // explicitly picks a mode via the Account screen toggle.
  const [override, setOverride] = useState<Mode | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((saved) => {
      if (saved === "light" || saved === "dark") setOverride(saved);
    });
  }, []);

  const [season] = useState(() => activeSeason());
  // Headings switch to the seasonal font only once it has loaded, so they
  // never sit blank while it downloads.
  const [fontReady, setFontReady] = useState(false);
  useEffect(() => {
    if (!season) return;
    loadAsync({ "CinzelDecorative-Bold": require("../assets/fonts/CinzelDecorative-Bold.ttf") })
      .then(() => setFontReady(true))
      .catch((e) => console.warn("[season] heading font:", e));
  }, [season]);

  const mode: Mode = season ? "dark" : override ?? (systemScheme === "dark" ? "dark" : "light");

  const setMode = (next: Mode) => {
    setOverride(next);
    void AsyncStorage.setItem(STORAGE_KEY, next);
  };

  const toggleMode = () => setMode(mode === "dark" ? "light" : "dark");

  const value = useMemo<ThemeContextValue>(() => {
    let colors = mode === "dark" ? darkColors : lightColors;
    if (season) {
      colors = SEASON_COLORS[season];
      if (!fontReady) colors = { ...colors, headingFont: undefined };
    }
    return { mode, colors, isDark: mode === "dark", season, setMode, toggleMode };
  }, [mode, season, fontReady]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}

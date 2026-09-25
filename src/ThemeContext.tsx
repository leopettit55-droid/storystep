import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useColorScheme } from "react-native";
import { darkColors, lightColors, type ThemeColors } from "./theme";

const STORAGE_KEY = "storystep.themeMode";

type Mode = "light" | "dark";

interface ThemeContextValue {
  mode: Mode;
  colors: ThemeColors;
  isDark: boolean;
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

  const mode: Mode = override ?? (systemScheme === "dark" ? "dark" : "light");

  const setMode = (next: Mode) => {
    setOverride(next);
    void AsyncStorage.setItem(STORAGE_KEY, next);
  };

  const toggleMode = () => setMode(mode === "dark" ? "light" : "dark");

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      colors: mode === "dark" ? darkColors : lightColors,
      isDark: mode === "dark",
      setMode,
      toggleMode,
    }),
    [mode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}

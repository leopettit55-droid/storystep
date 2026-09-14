import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { DEFAULT_LANGUAGE } from "./languages";
import en, { type TranslationDict } from "./translations/en";
import es from "./translations/es";
import fr from "./translations/fr";
import zh from "./translations/zh";
import de from "./translations/de";
import it from "./translations/it";
import pt from "./translations/pt";
import ja from "./translations/ja";
import ko from "./translations/ko";
import ar from "./translations/ar";
import ru from "./translations/ru";
import hi from "./translations/hi";
import nl from "./translations/nl";
import tr from "./translations/tr";
import pl from "./translations/pl";
import sv from "./translations/sv";
import vi from "./translations/vi";
import th from "./translations/th";
import id from "./translations/id";

const STORAGE_KEY = "storystep.language";

const DICTS: Record<string, TranslationDict> = {
  en, zh, es, fr, de, it, pt, ja, ko, ar, ru, hi, nl, tr, pl, sv, vi, th, id,
};

type Primitive = string | number;

function getByPath(dict: unknown, path: string[]): unknown {
  return path.reduce<unknown>((node, key) => {
    if (node && typeof node === "object" && key in (node as Record<string, unknown>)) {
      return (node as Record<string, unknown>)[key];
    }
    return undefined;
  }, dict);
}

function interpolate(template: string, vars?: Record<string, Primitive>): string {
  if (!vars) return template;
  return template.replace(/\{\{(\w+)\}\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match
  );
}

interface LanguageContextValue {
  language: string;
  setLanguage: (code: string) => void;
  /** Translates a dot-path key (e.g. "home.browseTours"), optionally
   * interpolating {{vars}}. Falls back to English, then to the key itself,
   * so a missing translation never crashes the app or renders "undefined". */
  t: (key: string, vars?: Record<string, Primitive>) => string;
  dict: TranslationDict;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState(DEFAULT_LANGUAGE);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((saved) => {
      if (saved && DICTS[saved]) setLanguageState(saved);
    });
  }, []);

  const setLanguage = (code: string) => {
    setLanguageState(code);
    void AsyncStorage.setItem(STORAGE_KEY, code);
  };

  const dict = DICTS[language] ?? en;

  const t = useMemo(() => {
    return (key: string, vars?: Record<string, Primitive>) => {
      const path = key.split(".");
      const value = getByPath(dict, path) ?? getByPath(en, path);
      if (typeof value !== "string") return key;
      return interpolate(value, vars);
    };
  }, [dict]);

  const value: LanguageContextValue = { language, setLanguage, t, dict };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}

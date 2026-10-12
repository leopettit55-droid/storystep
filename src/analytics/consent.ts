import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

/** The visitor's answer to the tracking banner, kept on this device. */
export type ConsentStatus = "unknown" | "granted" | "denied";

const CONSENT_KEY = "storystep.analyticsConsent";

interface ConsentState {
  status: ConsentStatus;
  loaded: boolean;
  load: () => Promise<void>;
  setConsent: (granted: boolean) => void;
}

export const useConsentStore = create<ConsentState>((set) => ({
  status: "unknown",
  loaded: false,
  load: async () => {
    const saved = await AsyncStorage.getItem(CONSENT_KEY).catch(() => null);
    set({ loaded: true, status: saved === "granted" || saved === "denied" ? saved : "unknown" });
  },
  setConsent: (granted) => {
    const status: ConsentStatus = granted ? "granted" : "denied";
    set({ status });
    void AsyncStorage.setItem(CONSENT_KEY, status).catch(() => {});
  },
}));

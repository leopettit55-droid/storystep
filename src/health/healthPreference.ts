import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { connectHealth, healthAvailable } from "./appleHealth";

const KEY = "storystep.health.connected";

interface HealthStore {
  /** This iPhone can use Apple Health (always false on the website and Android). */
  available: boolean;
  connected: boolean;
  /** Asked about it already (the offer after creating an account shows once). */
  asked: boolean;
  load: () => Promise<void>;
  connect: () => Promise<boolean>;
  disconnect: () => Promise<void>;
  dismiss: () => Promise<void>;
}

/** Whether to use Apple Health for steps and distance, remembered on this device. */
export const useHealthStore = create<HealthStore>((set) => ({
  available: healthAvailable(),
  connected: false,
  asked: false,

  load: async () => {
    try {
      const saved = JSON.parse((await AsyncStorage.getItem(KEY)) ?? "null") as { connected: boolean } | null;
      set({ connected: !!saved?.connected, asked: saved !== null });
    } catch {
      // nothing saved
    }
  },

  connect: async () => {
    const ok = await connectHealth();
    set({ connected: ok, asked: true });
    await AsyncStorage.setItem(KEY, JSON.stringify({ connected: ok })).catch(() => {});
    return ok;
  },

  disconnect: async () => {
    set({ connected: false, asked: true });
    await AsyncStorage.setItem(KEY, JSON.stringify({ connected: false })).catch(() => {});
  },

  dismiss: async () => {
    set({ asked: true });
    await AsyncStorage.setItem(KEY, JSON.stringify({ connected: false })).catch(() => {});
  },
}));

import { useEffect, useState } from "react";
import { Platform } from "react-native";

/**
 * Whether the device can reach the internet right now.
 *
 * Web: the browser's own online/offline events. Native: no network-info
 * module is installed, so a tiny request to the site is checked every 30
 * seconds (and the result shared by every screen that asks).
 */

type Listener = (online: boolean) => void;
const listeners = new Set<Listener>();
let online = Platform.OS === "web" && typeof navigator !== "undefined" ? navigator.onLine !== false : true;
let started = false;

const PROBE_URL = "https://storystep.site/robots.txt";
const PROBE_EVERY_MS = 30_000;
const PROBE_TIMEOUT_MS = 6_000;

function set(next: boolean) {
  if (next === online) return;
  online = next;
  listeners.forEach((l) => l(online));
}

async function probe() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), PROBE_TIMEOUT_MS);
  try {
    const res = await fetch(PROBE_URL, { method: "HEAD", cache: "no-store", signal: controller.signal });
    set(res.ok || res.status < 500);
  } catch {
    set(false);
  } finally {
    clearTimeout(timer);
  }
}

function start() {
  if (started) return;
  started = true;
  if (Platform.OS === "web") {
    if (typeof window === "undefined") return;
    window.addEventListener("online", () => set(true));
    window.addEventListener("offline", () => set(false));
  } else {
    void probe();
    setInterval(() => void probe(), PROBE_EVERY_MS);
  }
}

export function isOnline(): boolean {
  start();
  return online;
}

export function subscribeOnline(listener: Listener): () => void {
  start();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Re-renders when the connection comes or goes. */
export function useOnline(): boolean {
  const [value, setValue] = useState(isOnline);
  useEffect(() => subscribeOnline(setValue), []);
  return value;
}

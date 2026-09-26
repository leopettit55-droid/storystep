import { Platform } from "react-native";
import { isNarrationPlaying } from "../audio/narrationPlayer";
import type { Coordinates } from "../content";
import { useTourStore } from "../state/tourStore";

/**
 * Demo walk: lets anyone watch a tour's AR guide (penguin, ribbon, turn
 * prompts, narration) without being there. Opening the site with
 * `?demo=walk` (optionally `&speed=2`) swaps real GPS for a simulated walker
 * that follows the tour's real path at walking pace, with realistic GPS
 * wobble, and waits at each stop while its narration plays — like a visitor
 * would. It lasts for the browser tab (sessionStorage), so it survives
 * navigating around the site, and is web-only.
 *
 * Example: https://storystep.site/tour/oxford-magdalen?demo=walk
 */

const STORAGE_KEY = "storystep.demoWalk";
const WALKING_SPEED_MS = 1.4;
const FIX_INTERVAL_MS = 1000;
/** Typical outdoor phone GPS: a few metres of slowly drifting error. */
const GPS_NOISE_M = 4;
const GPS_ACCURACY_M = 6;
/** Narrations run about a minute. If audio is blocked or stuck, stop waiting
 * after this long rather than freezing the demo at a stop. */
const MAX_STOP_WAIT_S = 150;

interface DemoSettings {
  speed: number;
}

function readSettings(): DemoSettings | null {
  if (Platform.OS !== "web" || typeof window === "undefined") return null;
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get("demo") === "off") {
      window.sessionStorage.removeItem(STORAGE_KEY);
      return null;
    }
    if (params.get("demo") === "walk") {
      const speed = Math.min(8, Math.max(0.5, Number(params.get("speed")) || 1));
      const settings = { speed };
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      return settings;
    }
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as DemoSettings) : null;
  } catch {
    return null;
  }
}

// Read once at load: react-navigation rewrites the address bar as you move
// around, so the query string won't still be there later.
const settings = readSettings();

export function isDemoWalk(): boolean {
  return settings != null;
}

export function demoSpeed(): number {
  return settings?.speed ?? 1;
}

type FixHandler = (coords: Coordinates, accuracyM: number, timestampMs: number) => void;

/** Walks `path` and reports a GPS-like fix every second until stopped. */
export class DemoWalker {
  private timer: ReturnType<typeof setInterval> | null = null;
  private xy: Array<[number, number]>;
  private cumulative: number[] = [0];
  private along = 0;
  private waitedS = 0;
  private errX = 0;
  private errY = 0;
  private lat0: number;
  private lng0: number;
  private mPerDegLng: number;

  constructor(path: Coordinates[], private onFix: FixHandler) {
    this.lat0 = path[0].lat;
    this.lng0 = path[0].lng;
    this.mPerDegLng = 111320 * Math.cos((this.lat0 * Math.PI) / 180);
    this.xy = path.map((p) => [(p.lng - this.lng0) * this.mPerDegLng, (p.lat - this.lat0) * 111320]);
    for (let i = 1; i < this.xy.length; i++) {
      const [ax, ay] = this.xy[i - 1];
      const [bx, by] = this.xy[i];
      this.cumulative.push(this.cumulative[i - 1] + Math.hypot(bx - ax, by - ay));
    }
  }

  start(): void {
    this.emit();
    this.timer = setInterval(() => {
      const { status } = useTourStore.getState();
      // Stand still while a stop is being narrated or the tour is paused.
      const narrating = isNarrationPlaying() && this.waitedS < MAX_STOP_WAIT_S;
      this.waitedS = isNarrationPlaying() ? this.waitedS + FIX_INTERVAL_MS / 1000 : 0;
      if (status === "touring" && !narrating) {
        const total = this.cumulative[this.cumulative.length - 1];
        this.along = Math.min(total, this.along + (WALKING_SPEED_MS * demoSpeed() * FIX_INTERVAL_MS) / 1000);
      }
      this.emit();
    }, FIX_INTERVAL_MS);
  }

  stop(): void {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  }

  private emit(): void {
    const [x, y] = this.pointAt(this.along);
    // Slowly drifting error, like a real phone's — not independent jumps.
    const gauss = () => Math.sqrt(-2 * Math.log(Math.random() + 1e-12)) * Math.cos(2 * Math.PI * Math.random());
    this.errX = 0.9 * this.errX + 0.44 * GPS_NOISE_M * gauss();
    this.errY = 0.9 * this.errY + 0.44 * GPS_NOISE_M * gauss();
    this.onFix(
      { lat: this.lat0 + (y + this.errY) / 111320, lng: this.lng0 + (x + this.errX) / this.mPerDegLng },
      GPS_ACCURACY_M,
      Date.now()
    );
  }

  private pointAt(along: number): [number, number] {
    let i = 1;
    while (i < this.cumulative.length - 1 && this.cumulative[i] < along) i++;
    const segLen = this.cumulative[i] - this.cumulative[i - 1];
    const t = segLen > 0 ? (along - this.cumulative[i - 1]) / segLen : 0;
    const [ax, ay] = this.xy[i - 1];
    const [bx, by] = this.xy[i];
    return [ax + (bx - ax) * t, ay + (by - ay) * t];
  }
}

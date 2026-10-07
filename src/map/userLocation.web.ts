import { useEffect, useState } from "react";

export interface UserLocation {
  latitude: number;
  longitude: number;
  /** Direction of travel in degrees from north; only known while moving. */
  heading?: number;
}

/** The visitor's live position from the browser's GPS, while `enabled`.
 * The browser asks permission the first time. */
export function useUserLocation(enabled: boolean): { location: UserLocation | null; error: string | null } {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, heading } = position.coords;
        setLocation({ latitude, longitude, heading: heading != null && !Number.isNaN(heading) ? heading : undefined });
        setError(null);
      },
      (e) => {
        setError(e.message);
        console.warn("Geolocation error:", e);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, [enabled]);

  return { location, error };
}

/** Straight-line distance in km (haversine). */
export function distanceKm(a: { latitude: number; longitude: number }, b: { latitude: number; longitude: number }): number {
  const R = 6371;
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(b.latitude - a.latitude);
  const dLon = rad(b.longitude - a.longitude);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.latitude)) * Math.cos(rad(b.latitude)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

let pulseStyleAdded = false;

/** "You are here": a blue dot with a soft pulse, and an arrow on top
 * pointing the way you're walking (shown once the heading is known). The
 * marker itself is rotated to the heading, so `arrow` just shows or hides. */
export function makeUserMarker(): { root: HTMLDivElement; arrow: HTMLDivElement } {
  if (!pulseStyleAdded) {
    pulseStyleAdded = true;
    const style = document.createElement("style");
    style.textContent =
      "@keyframes foodstep-pulse{0%{transform:scale(.6);opacity:.55}100%{transform:scale(2.2);opacity:0}}";
    document.head.appendChild(style);
  }
  const root = document.createElement("div");
  root.style.width = "44px";
  root.style.height = "44px";
  root.style.position = "relative";
  root.style.pointerEvents = "none";
  root.setAttribute("aria-label", "You are here");

  const pulse = document.createElement("div");
  Object.assign(pulse.style, {
    position: "absolute",
    left: "11px",
    top: "11px",
    width: "22px",
    height: "22px",
    borderRadius: "50%",
    background: "#0084FF",
    animation: "foodstep-pulse 1.8s ease-out infinite",
  });
  const dot = document.createElement("div");
  Object.assign(dot.style, {
    position: "absolute",
    left: "13px",
    top: "13px",
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    background: "#0084FF",
    border: "3px solid #FFFFFF",
    boxSizing: "border-box",
    boxShadow: "0 1px 5px rgba(0,0,0,0.4)",
  });
  const arrow = document.createElement("div");
  Object.assign(arrow.style, {
    position: "absolute",
    left: "15px",
    top: "0px",
    width: "0",
    height: "0",
    borderLeft: "7px solid transparent",
    borderRight: "7px solid transparent",
    borderBottom: "12px solid #0084FF",
    filter: "drop-shadow(0 0 1.5px #FFFFFF)",
    display: "none",
  });
  root.append(pulse, dot, arrow);
  return { root, arrow };
}

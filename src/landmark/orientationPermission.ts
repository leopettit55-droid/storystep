/**
 * iOS Safari only grants device-orientation (compass) access to a call made
 * essentially synchronously from inside a tap — any await before it (or a
 * screen transition) makes it fail silently with no prompt. So every button
 * that opens a camera view calls this first, straight from its press handler,
 * and passes the answer along. Other browsers have no such prompt and
 * simply report true.
 */
export async function requestOrientationPermission(): Promise<boolean> {
  if (typeof window === "undefined") return true;
  try {
    const DOEvent = (window as any).DeviceOrientationEvent;
    if (DOEvent && typeof DOEvent.requestPermission === "function") {
      return (await DOEvent.requestPermission()) === "granted";
    }
    return true;
  } catch {
    return false;
  }
}

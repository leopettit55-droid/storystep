import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

const isNative = Platform.OS === "ios" || Platform.OS === "android";

/** Light tap feedback for routine interactions — button presses, list taps,
 * toggles. No-ops on web, where there's no haptics hardware. */
export function tapLight(): void {
  if (!isNative) return;
  void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
}

/** Medium feedback for a deliberate, slightly bigger step — starting a tour,
 * confirming a swipe action. */
export function tapMedium(): void {
  if (!isNative) return;
  void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
}

/** Success feedback for completing something significant — a purchase, a
 * booking, finishing a tour. */
export function notifySuccess(): void {
  if (!isNative) return;
  void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
}

/** Error feedback for a failed action — a form validation error, a failed
 * scan, a declined payment. */
export function notifyError(): void {
  if (!isNative) return;
  void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
}

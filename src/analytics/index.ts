import PostHog from "posthog-react-native";
import { POSTHOG_HOST, POSTHOG_KEY, type EventProps } from "./config";

/** Phone app analytics: PostHog only. The website version is index.web.ts. */

let posthog: PostHog | null = null;

export const analyticsConfigured = POSTHOG_KEY !== "";

/** Called once the visitor accepts tracking. */
export function startAnalytics() {
  if (!analyticsConfigured) return;
  if (!posthog) posthog = new PostHog(POSTHOG_KEY, { host: POSTHOG_HOST });
  else posthog.optIn();
}

/** Called if the visitor declines or later turns tracking off. */
export function stopAnalytics() {
  posthog?.optOut();
}

export function track(event: string, props?: EventProps) {
  posthog?.capture(event, props ?? undefined);
}

export function trackScreen(name: string, props?: EventProps) {
  posthog?.screen(name, props ?? undefined);
}

export function identify(id: string, props: EventProps) {
  posthog?.identify(id, props);
}

export function resetIdentity() {
  posthog?.reset();
}

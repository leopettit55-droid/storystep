import posthog from "posthog-js";
import { GA_MEASUREMENT_IDS, POSTHOG_HOST, POSTHOG_KEY, type EventProps } from "./config";

/** Website analytics: PostHog plus Google Analytics 4. Both load only after
 * the visitor accepts tracking, and both count page changes on their own. */

type Gtag = (...args: unknown[]) => void;
type GaWindow = Window & { dataLayer?: unknown[]; gtag?: Gtag } & Record<string, unknown>;

let posthogStarted = false;
let gaStarted = false;

export const analyticsConfigured = POSTHOG_KEY !== "" || GA_MEASUREMENT_IDS.length > 0;

function startPostHog() {
  if (!POSTHOG_KEY) return;
  if (posthogStarted) {
    posthog.opt_in_capturing();
    return;
  }
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    capture_pageview: "history_change",
    person_profiles: "identified_only",
  });
  posthogStarted = true;
}

function startGoogleAnalytics() {
  if (GA_MEASUREMENT_IDS.length === 0 || typeof document === "undefined") return;
  const w = window as unknown as GaWindow;
  for (const id of GA_MEASUREMENT_IDS) w[`ga-disable-${id}`] = false;
  if (gaStarted) return;
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_IDS[0]}`;
  document.head.appendChild(script);
  w.dataLayer = w.dataLayer ?? [];
  w.gtag = function gtag() {
    // gtag.js expects the arguments object itself, not an array.
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer!.push(arguments);
  };
  w.gtag("js", new Date());
  // One tag, every property: page views and events go to each.
  for (const id of GA_MEASUREMENT_IDS) w.gtag("config", id);
  gaStarted = true;
}

function gtag(...args: unknown[]) {
  if (!gaStarted) return;
  (window as unknown as GaWindow).gtag?.(...args);
}

/** Called once the visitor accepts tracking. */
export function startAnalytics() {
  startPostHog();
  startGoogleAnalytics();
}

/** Called if the visitor declines or later turns tracking off. */
export function stopAnalytics() {
  if (posthogStarted) posthog.opt_out_capturing();
  if (typeof window !== "undefined") {
    for (const id of GA_MEASUREMENT_IDS) (window as unknown as GaWindow)[`ga-disable-${id}`] = true;
  }
}

export function track(event: string, props?: EventProps) {
  if (posthogStarted) posthog.capture(event, props);
  gtag("event", event, props ?? {});
}

/** The website counts page views from the address bar, so nothing to do here. */
export function trackScreen(_name: string, _props?: EventProps) {}

export function identify(id: string, props: EventProps) {
  if (posthogStarted) posthog.identify(id, props);
}

export function resetIdentity() {
  if (posthogStarted) posthog.reset();
}

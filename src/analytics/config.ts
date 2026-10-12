/** Analytics keys, read from .env at build time. Leave a key empty to turn
 * that service off; nothing is sent until the visitor accepts tracking. */
export const POSTHOG_KEY = process.env.EXPO_PUBLIC_POSTHOG_KEY ?? "";
export const POSTHOG_HOST = process.env.EXPO_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com";
/** Google Analytics 4 measurement ids ("G-XXXXXXX"), website only: every
 * visit is sent to each. StoryStep's own property is built in (measurement
 * ids aren't secret: they're in every page's source), so every build reports
 * to it; .env can add another. */
const STORYSTEP_GA_ID = "G-XGJKFKTE91";
export const GA_MEASUREMENT_IDS = [...new Set([STORYSTEP_GA_ID, process.env.EXPO_PUBLIC_GA_MEASUREMENT_ID ?? ""])].filter(Boolean);

export type EventProps = Record<string, string | number | boolean | null>;

/** Analytics keys, read from .env at build time. Leave a key empty to turn
 * that service off; nothing is sent until the visitor accepts tracking. */
export const POSTHOG_KEY = process.env.EXPO_PUBLIC_POSTHOG_KEY ?? "";
export const POSTHOG_HOST = process.env.EXPO_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com";
/** Google Analytics 4 measurement id ("G-XXXXXXX"). Website only. */
export const GA_MEASUREMENT_ID = process.env.EXPO_PUBLIC_GA_MEASUREMENT_ID ?? "";

export type EventProps = Record<string, string | number | boolean | null>;

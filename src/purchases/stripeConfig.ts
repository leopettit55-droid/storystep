import { Linking, Platform } from "react-native";
import { api, ApiError } from "../social/api";
import { setPendingPurchase } from "./entitlements";

/**
 * Paste your Stripe Payment Link URLs here (Stripe Dashboard → Payment links).
 * These are public checkout URLs, not secret keys — safe to keep in the app.
 *
 * You need three:
 *  1. A one-off £0.99 "Single tour" price → its Payment Link
 *  2. A recurring £14.99/week "Weekly unlimited" price → its Payment Link
 *  3. A recurring £19.99/month "Monthly unlimited" price → its Payment Link
 *
 * For each Payment Link, set "After payment" → "Redirect customers to a
 * website" to this app's URL with the matching query param, e.g.
 *   https://<your-app-url>/?purchase=tour&session_id={CHECKOUT_SESSION_ID}
 *   https://<your-app-url>/?purchase=weekly
 *   https://<your-app-url>/?purchase=monthly
 *
 * The single-tour link must charge the same as `price.singleTour` in the tour
 * files (£0.99). It replaced the old £4.99 link (buy.stripe.com/28E9AT2nkfdS3eD6UQ6Vq00).
 */
export const STRIPE_LINKS = {
  singleTour: "https://buy.stripe.com/fZueVd3ro9Ty3eD4MI6Vq03",
  weekly: "https://buy.stripe.com/dRmdR99PM3vaaH51Aw6Vq01",
  monthly: "https://buy.stripe.com/cNi3cvd1Y5Di4iH0ws6Vq02",
};

/**
 * Stripe's no-code Customer Portal link (Dashboard → Settings → Billing →
 * Customer portal → "Create link"). Lets a subscriber look themselves up by
 * email and cancel on their own — without this, weekly/monthly subscribers
 * have no way to stop being billed short of emailing support.
 */
export const STRIPE_CUSTOMER_PORTAL_URL = "";

function isConfigured(url: string): boolean {
  return url.trim().length > 0;
}

export const stripeIsConfigured = {
  singleTour: isConfigured(STRIPE_LINKS.singleTour),
  weekly: isConfigured(STRIPE_LINKS.weekly),
  monthly: isConfigured(STRIPE_LINKS.monthly),
  customerPortal: isConfigured(STRIPE_CUSTOMER_PORTAL_URL),
};

export function openCustomerPortal(): void {
  if (!stripeIsConfigured.customerPortal) return;
  Linking.openURL(STRIPE_CUSTOMER_PORTAL_URL);
}

export async function openTourCheckout(tourId: string): Promise<void> {
  if (!stripeIsConfigured.singleTour) return;
  await setPendingPurchase(tourId);
  // Stripe keeps this on the checkout session, so the tour can be read back
  // from the payment itself even if the buyer returns in a different browser.
  Linking.openURL(`${STRIPE_LINKS.singleTour}?client_reference_id=${encodeURIComponent(tourId)}`);
}

export type PaymentCheck =
  | { status: "paid"; tourId: string | null }
  | { status: "unpaid" }
  | { status: "unknown" };

/** Asks the server whether Stripe has this checkout as paid (server/purchases.ts).
 * "unknown" means it couldn't say: offline, or no Stripe key on the server. */
export async function checkTourPayment(sessionId: string): Promise<PaymentCheck> {
  try {
    const { tourId } = await api<{ tourId: string | null }>(
      `/api/purchase?session_id=${encodeURIComponent(sessionId)}`
    );
    return { status: "paid", tourId };
  } catch (e) {
    if (e instanceof ApiError && [400, 402, 404].includes(e.status)) return { status: "unpaid" };
    return { status: "unknown" };
  }
}

export async function openSubscriptionCheckout(plan: "weekly" | "monthly"): Promise<void> {
  const url = plan === "weekly" ? STRIPE_LINKS.weekly : STRIPE_LINKS.monthly;
  if (!isConfigured(url)) return;
  Linking.openURL(url);
}

export type PurchaseReturn =
  | { kind: "tour"; sessionId: string | null }
  | { kind: "weekly" }
  | { kind: "monthly" }
  | null;

/** Reads the `?purchase=` param Stripe redirects back with (web only) and
 * strips it from the URL so it isn't reprocessed on refresh. A single-tour
 * return also carries `session_id` when the Payment Link's redirect includes
 * {CHECKOUT_SESSION_ID}. */
export function consumePurchaseReturnParam(): PurchaseReturn {
  if (Platform.OS !== "web" || typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const purchase = params.get("purchase");
  if (purchase !== "tour" && purchase !== "weekly" && purchase !== "monthly") return null;

  const sessionId = params.get("session_id");
  params.delete("purchase");
  params.delete("session_id");
  const newSearch = params.toString();
  const newUrl =
    window.location.pathname + (newSearch ? `?${newSearch}` : "") + window.location.hash;
  window.history.replaceState({}, "", newUrl);

  return purchase === "tour" ? { kind: "tour", sessionId } : { kind: purchase };
}

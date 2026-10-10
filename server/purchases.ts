/**
 * GET /api/purchase?session_id=cs_...  →  { tourId }
 *
 * Confirms with Stripe that a single-tour checkout was paid, and says which tour
 * it was for. The app adds `client_reference_id=<tour id>` to the Payment Link,
 * and the link's "After payment" redirect brings back
 * `?purchase=tour&session_id={CHECKOUT_SESSION_ID}`, so the tour comes from
 * Stripe itself rather than from whatever the buyer's browser remembered.
 *
 * Secret (wrangler pages secret put …): STRIPE_SECRET_KEY. A restricted key with
 * only "Checkout Sessions: Read" is enough.
 */
import { error, json, type Env } from "./social";

interface CheckoutSession {
  mode: string;
  payment_status: string;
  client_reference_id: string | null;
}

export async function confirmPurchase(env: Env, req: Request): Promise<Response> {
  const sessionId = new URL(req.url).searchParams.get("session_id") ?? "";
  if (!/^cs_(live|test)_[A-Za-z0-9]+$/.test(sessionId)) return error(400, "A checkout session id is needed");
  if (!env.STRIPE_SECRET_KEY) return error(503, "Payments can't be checked right now");

  const res = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
    headers: { authorization: `Bearer ${env.STRIPE_SECRET_KEY}` },
  });
  if (res.status === 404) return error(404, "No such payment");
  if (!res.ok) {
    console.error("[purchase] Stripe", res.status, await res.text().catch(() => ""));
    return error(502, "Couldn't reach Stripe");
  }
  const session = await res.json<CheckoutSession>();
  if (session.mode !== "payment" || session.payment_status !== "paid") {
    return error(402, "This payment hasn't gone through");
  }
  return json({ tourId: session.client_reference_id });
}

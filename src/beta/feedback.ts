/**
 * Sends the after-tour feedback straight to the StoryStep inbox using
 * FormSubmit (formsubmit.co) — free, no account, no backend needed.
 *
 * One-time setup: the very first submission makes FormSubmit email
 * FEEDBACK_EMAIL an "Activate form" link. Click it once and every review
 * after that lands in the inbox. (After activating, FormSubmit also offers a
 * random alias you can paste below instead of the address, to keep it out
 * of the page source.)
 */
export const FEEDBACK_EMAIL = "leopettit55@gmail.com";

interface Feedback {
  tourName: string;
  rating: number;
  message: string;
  email: string;
}

/** Throws on failure — callers show their own error state. */
export async function sendFeedback({ tourName, rating, message, email }: Feedback): Promise<void> {
  const response = await fetch(`https://formsubmit.co/ajax/${FEEDBACK_EMAIL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      _subject: `StoryStep review: ${tourName} (${rating}/5)`,
      _template: "table",
      _captcha: "false",
      tour: tourName,
      rating: `${"★".repeat(rating)}${"☆".repeat(5 - rating)} (${rating}/5)`,
      review: message.trim() || "(no comment)",
      ...(email.trim() ? { email: email.trim(), _replyto: email.trim() } : {}),
    }),
  });

  const body = await response.json().catch(() => null);
  if (!response.ok || (body && String(body.success) === "false")) {
    throw new Error(`Feedback request failed (${response.status}): ${body?.message ?? ""}`);
  }
}

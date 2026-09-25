/**
 * Sends the "Contact us" form straight to your inbox using EmailJS
 * (emailjs.com) — a service built exactly for this: delivering email from a
 * client-only app with no backend server involved.
 *
 * One-time setup (free tier is plenty for a contact form):
 *  1. Sign up at emailjs.com and add leopettit55@gmail.com as an Email Service
 *     (Gmail) — this gives you a Service ID.
 *  2. Create an Email Template with variables {{from_name}}, {{from_email}},
 *     {{message}} in the body — this gives you a Template ID. Set the
 *     template's "To email" to leopettit55@gmail.com and "Reply to" to
 *     {{from_email}} so you can just hit reply.
 *  3. Account → General → copy your Public Key.
 *  4. Paste all three below. These are public-safe identifiers (not secrets)
 *     — EmailJS is designed to have this key live in client code.
 */
export const EMAILJS_SERVICE_ID = "";
export const EMAILJS_TEMPLATE_ID = "";
export const EMAILJS_PUBLIC_KEY = "";

export const emailIsConfigured =
  EMAILJS_SERVICE_ID.trim().length > 0 &&
  EMAILJS_TEMPLATE_ID.trim().length > 0 &&
  EMAILJS_PUBLIC_KEY.trim().length > 0;

interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

/** Throws on failure — callers show their own error state. */
export async function sendContactMessage({ name, email, message }: ContactMessage): Promise<void> {
  const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: EMAILJS_SERVICE_ID,
      template_id: EMAILJS_TEMPLATE_ID,
      user_id: EMAILJS_PUBLIC_KEY,
      template_params: {
        from_name: name.trim() || "StoryStep visitor",
        from_email: email.trim() || "not provided",
        message: message.trim(),
      },
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`EmailJS request failed (${response.status}): ${body}`);
  }
}

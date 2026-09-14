import type { PolicySection } from "./privacyPolicy";

export const TERMS_EFFECTIVE_DATE = "3 September 2026";

export const TERMS_INTRO =
  "These terms govern your use of the StoryStep app and website. By creating an account, buying a tour, " +
  "or using StoryStep, you agree to them.";

export const TERMS_SECTIONS: PolicySection[] = [
  {
    heading: "Who you're agreeing with",
    body:
      "StoryStep is operated by [YOUR LEGAL NAME OR COMPANY NAME — e.g. \"Jane Doe, trading as StoryStep\" " +
      "or \"StoryStep Ltd, company number 00000000\"], based in [YOUR COUNTRY — e.g. the United Kingdom]. " +
      "Contact: use the Contact form in the Help section of the app.",
  },
  {
    heading: "What StoryStep is",
    body:
      "StoryStep sells self-guided, GPS-triggered audio walking tours of real streets and public spaces in " +
      "London, Paris, and Oxford. Tours are pre-recorded narration only — StoryStep is not a licensed tour " +
      "guide service, travel agency, or emergency service, and does not accompany you in person.",
  },
  {
    heading: "Your safety while walking a tour",
    body:
      "You use StoryStep entirely at your own risk. Walking tours involve real streets, traffic, uneven " +
      "pavement, crowds, and weather. You're responsible for staying aware of your surroundings, following " +
      "local traffic laws and pedestrian signals, and using headphones at a volume that lets you hear traffic " +
      "around you. Stop and check your phone somewhere safe rather than while crossing a road. StoryStep is " +
      "not liable for injury, loss, or accidents that happen while you're using the app or following a route " +
      "it suggests. If a route ever seems unsafe (roadworks, closures, an unfamiliar shortcut), use your own " +
      "judgement and take a safer path — narration will still trigger once you reach the next stop.",
  },
  {
    heading: "Accounts",
    body:
      "The account you create is stored locally on your device — see the Privacy Policy for details. You're " +
      "responsible for anything that happens through your device while it's in your possession. You can delete " +
      "your local account at any time from Account → Sign out.",
  },
  {
    heading: "Purchases, pricing, and access",
    body:
      "Single tours are a one-time purchase that unlocks that tour permanently on the device where you bought " +
      "it. Weekly and monthly plans are recurring subscriptions billed automatically by Stripe until you cancel " +
      "— see \"Subscriptions and cancellation\" below. Prices are shown in GBP and may change; a price change " +
      "doesn't affect a tour you've already bought. All payments are processed by Stripe; StoryStep never " +
      "receives or stores your card details.",
  },
  {
    heading: "Subscriptions and cancellation",
    body:
      "Weekly (£14.99) and monthly (£19.99) plans renew automatically until cancelled. You can cancel any time " +
      "— cancelling stops future renewals but doesn't refund the current billing period. [ADD YOUR STRIPE " +
      "CUSTOMER PORTAL / MANAGE-SUBSCRIPTION LINK HERE once configured].",
  },
  {
    heading: "Refunds",
    body:
      "Single-tour purchases: if a tour's narration or route is broken or clearly not as described, contact " +
      "us via the Help section within 14 days for a refund. We don't offer refunds simply because you changed " +
      "your mind after completing a tour. Subscriptions: cancel before the next renewal date to avoid being " +
      "charged again; we don't refund partial billing periods except where required by law.",
  },
  {
    heading: "Acceptable use",
    body:
      "Don't reverse-engineer, scrape, or redistribute StoryStep's narration audio, route data, or app code. " +
      "Don't use the camera-scan or map features to harass, surveil, or endanger others. Don't attempt to " +
      "circumvent purchase checks. We may suspend access for accounts that abuse the service.",
  },
  {
    heading: "Intellectual property",
    body:
      "All narration scripts, audio, route content, and the StoryStep name and app are owned by us or licensed " +
      "to us. Buying a tour gives you a personal, non-transferable licence to use it for your own walking tours " +
      "— not to copy, resell, or publish the content elsewhere.",
  },
  {
    heading: "Third-party services",
    body:
      "StoryStep relies on Stripe for payments, Google Maps for map display, and Google Cloud Vision for the " +
      "camera-scan feature. Your use of those features is also subject to those providers' own terms.",
  },
  {
    heading: "Disclaimers",
    body:
      "StoryStep is provided \"as is.\" Historical facts, opening hours, and points of interest in narration " +
      "are believed accurate at time of writing but may change or contain errors — don't rely on StoryStep as " +
      "your only source for anything safety-critical (venue hours, accessibility, road closures). GPS accuracy " +
      "varies by device and location, so narration may occasionally trigger a little early, late, or not at " +
      "all — this doesn't entitle you to a refund on its own unless it makes the tour unusable.",
  },
  {
    heading: "Limitation of liability",
    body:
      "To the fullest extent permitted by law, StoryStep isn't liable for indirect, incidental, or " +
      "consequential damages arising from your use of the app, including injury sustained while walking a " +
      "route. Nothing in these terms limits liability that can't legally be limited, such as liability for " +
      "death or personal injury caused by our negligence, where applicable under your local law.",
  },
  {
    heading: "Termination",
    body:
      "You can stop using StoryStep at any time by deleting the app and your local account. We may suspend or " +
      "end access for accounts that violate these terms.",
  },
  {
    heading: "Changes to these terms",
    body:
      "We may update these terms as StoryStep changes. Significant changes will be flagged in the app, and the " +
      "effective date below will be updated.",
  },
  {
    heading: "Governing law",
    body:
      "These terms are governed by the laws of [YOUR COUNTRY/JURISDICTION], without regard to conflict-of-law " +
      "rules.",
  },
  {
    heading: "Contact us",
    body: "Questions about these terms: use the Contact form in the Help section of the app.",
  },
];

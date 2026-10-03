export interface PolicySection {
  heading: string;
  body: string;
}

export const PRIVACY_POLICY_EFFECTIVE_DATE = "3 October 2026";

export const PRIVACY_POLICY_INTRO =
  "This policy explains what information StoryStep collects, why, and what control you have over it. " +
  "Most of what StoryStep knows about you stays on your device. If you have an account and use the " +
  "leaderboards or share tour photos, some information is stored on our server, as described below.";

export const PRIVACY_POLICY_SECTIONS: PolicySection[] = [
  {
    heading: "Who this policy covers",
    body:
      // TODO: add the registered company name, number and country once confirmed.
      "StoryStep is a walking-tour service operated from the United Kingdom. " +
      "You can reach us via the Contact form in the app's Help section with any question about this policy or your data.",
  },
  {
    heading: "Information we collect",
    body:
      "Account details (optional): if you create a StoryStep account, we ask for your name and email address. " +
      "Your email and password stay on your device and are never sent to us (the password is kept only as a " +
      "scrambled hash).\n\n" +
      "Leaderboards and tour photos (only if you have an account and use them): your account name; each tour you " +
      "finish, with its start-to-finish time and the date; photos you choose to share, with the tour, the stop you " +
      "tag them to (the stop's location, not your own GPS position), the date, and whether they're public or " +
      "private; and any reports you make about other people's photos. Photos are shrunk before upload, which also " +
      "removes the location and camera details stored inside the original picture file.\n\n" +
      "Walk with a friend (only if you use it): while you walk a tour with a friend, your position is sent every few " +
      "seconds through our server to your friend, and only to them, so it shows on their map. In \"distance only\" mode " +
      "they see how far apart you are, not where you are. Positions are passed on, never stored. Chat messages and " +
      "emoji reactions are kept only while the walk is going, so a phone that loses signal can catch up, and are " +
      "deleted when the walk ends. When you finish, the tour, both names, your time and any star rating are kept for " +
      "the duo leaderboard. The rest of the walk's record, including its summary (for example how far apart you were " +
      "on average), is deleted 24 hours after the walk ends; a walk that's never finished closes 4 hours after the " +
      "invite was made.\n\n" +
      "Location data: while you're on an active tour, StoryStep reads your GPS position to detect when you've " +
      "reached a waypoint and trigger the next narration segment automatically. This runs on your device. If you " +
      "grant \"Always\" location access, this continues while the app is backgrounded so narration still triggers " +
      "with the screen off; if you grant \"While Using\" access, it only runs while the app is open.\n\n" +
      "Camera images: the \"Scan a landmark\" feature uses your camera to photograph a building. That photo is sent " +
      "to Google's Cloud Vision API for one-time landmark identification and is not stored by StoryStep afterwards.\n\n" +
      "Purchase and subscription status: when you buy a tour or subscription, checkout happens entirely on Stripe's " +
      "own hosted payment page — StoryStep never sees or stores your card number. We keep a local record on your " +
      "device of which tours you've unlocked and whether a subscription is active, so the app knows what to let you play.\n\n" +
      "We do not currently use analytics, advertising, or tracking SDKs of any kind — we don't collect usage " +
      "statistics, crash reports, or device identifiers beyond what the operating system requires to run the app.",
  },
  {
    heading: "How we use this information",
    body:
      "To trigger narration automatically as you walk a route.\n" +
      "To identify a landmark when you use the camera-scan feature.\n" +
      "To remember your name/email locally so you don't have to re-enter them.\n" +
      "To unlock the tours and subscription plans you've purchased.\n" +
      "To show the leaderboards and tour photo galleries, and to review photos that people report.\n" +
      "To reply if you contact us for support.\n\n" +
      "We do not sell, rent, or use your information for advertising.",
  },
  {
    heading: "Who we share data with",
    body:
      "We use a small number of third-party services to make the app work, and each only receives the minimum " +
      "data needed for its job:\n\n" +
      "Google Cloud Vision API — receives the single photo you take when using \"Scan a landmark\", to identify " +
      "what's in it. Governed by Google's Privacy Policy: policies.google.com/privacy\n\n" +
      "Google Maps Platform — powers the map shown on tour screens; receives map-tile and location requests needed " +
      "to render the map. Governed by Google's Privacy Policy: policies.google.com/privacy\n\n" +
      "Stripe — processes all payments via its own hosted checkout page. Stripe receives your payment details " +
      "directly; we do not. Governed by Stripe's Privacy Policy: stripe.com/privacy\n\n" +
      "Cloudflare — hosts the StoryStep website and stores the leaderboard and tour photo data described above. " +
      "Governed by Cloudflare's Privacy Policy: cloudflare.com/privacypolicy\n\n" +
      "Other StoryStep users — the leaderboards show your account name and your tour times and counts, and public " +
      "photos show your name, the tour, the stop and the date. Private photos are visible only to you. When you walk " +
      "with a friend, they see your name, your live position (or only the distance between you), your messages and " +
      "reactions, and the duo leaderboard shows your two names together.\n\n" +
      "We do not share your information with anyone else, and we do not sell it.",
  },
  {
    heading: "Where your data lives",
    body:
      "Your account details (name, email, password hash), tour progress, downloaded tours, purchase records and " +
      "subscription status are stored only on your device. Uninstalling the app, or clearing the website's data " +
      "in your browser, deletes them.\n\n" +
      "Leaderboard entries and shared photos are stored on our server, hosted by Cloudflare. They stay there until you " +
      "delete them (photos) or ask us to remove them (see below).",
  },
  {
    heading: "Your choices and rights",
    body:
      "Your account on this device: Account → Sign out logs you out but keeps the account so you can log back in; " +
      "to remove it completely, uninstall the app or clear the website's data in your browser.\n" +
      "Your photos: delete any photo you've shared at any time from Tours → Tour photos.\n" +
      "Leaderboards and photos aren't required: without an account, or if you don't share a photo, nothing about " +
      "your walks is sent to us. To have your leaderboard entries removed, contact us.\n" +
      "Revoke permissions: turn off Location or Camera access for StoryStep any time in your phone's system settings.\n" +
      "Access or delete what we hold: since account and purchase data lives only on your device, you already have " +
      "direct control over it. If you're in the UK or EU, you also have rights under UK/EU GDPR to request a copy " +
      "of, correct, or ask us to erase any information we do hold about you (for example, emails you've sent us) " +
      "— contact us via the Help section of the app to exercise these.\n" +
      "We do not sell personal information, so there is nothing to opt out of under CCPA or similar laws.",
  },
  {
    heading: "Children's privacy",
    body:
      "StoryStep is not directed at children, and we don't knowingly collect information from anyone under 13. " +
      "If you believe a child has provided us information (for example, via a support email), contact us and " +
      "we'll delete it.",
  },
  {
    heading: "Security",
    body:
      "Account and purchase data stays on your device rather than on a central server. The leaderboard and photo " +
      "data on our server is tied to a random ID and a secret key kept on your device (stored on the server only as " +
      "a hash), not to your email address. Payment processing security is handled by Stripe, which is PCI-DSS " +
      "compliant. As with any device, keeping your phone's own lock screen and OS up to date is the best " +
      "protection for locally-stored app data.",
  },
  {
    heading: "International data transfers",
    body:
      "Google, Stripe and Cloudflare are US-headquartered companies that may process data outside your country. They maintain " +
      "their own safeguards for international transfers (including standard contractual clauses where applicable) " +
      "— see their respective privacy policies linked above for details.",
  },
  {
    heading: "Changes to this policy",
    body:
      "If we change what data we collect or how we use it — for example, if we add a backend server or cloud " +
      "sync — we'll update this page and change the effective date below. Significant changes will be flagged in " +
      "the app.",
  },
  {
    heading: "Contact us",
    body:
      "Questions about this policy or your data: use the Contact form in the app's Help section.",
  },
];

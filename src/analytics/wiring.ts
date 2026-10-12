import { useAccountStore, type AccountProfile } from "../account/accountStore";
import { sha256Hex } from "../account/sha256";
import { useTourStore } from "../state/tourStore";
import { identify, resetIdentity, startAnalytics, stopAnalytics, track } from "./index";
import { useConsentStore } from "./consent";

/** Connects the app's stores to analytics: follows the visitor's consent
 * choice, records tours started and finished, and links events to an
 * account when someone signs in. Returns a function that stops listening. */
/** Links events to an account by its name and a scrambled code made from
 * the email, so the email address itself never leaves the device. */
function identifyAccount(account: AccountProfile) {
  identify(sha256Hex(`storystep:${account.email}`), { name: account.name });
}

export function startAnalyticsWiring(): () => void {
  const applyConsent = (status: string) => {
    if (status === "granted") {
      startAnalytics();
      const account = useAccountStore.getState().account;
      if (account) identifyAccount(account);
    } else if (status === "denied") {
      stopAnalytics();
    }
  };

  void useConsentStore.getState().load();
  const unsubConsent = useConsentStore.subscribe((s, prev) => {
    if (s.status !== prev.status) applyConsent(s.status);
  });

  const unsubTour = useTourStore.subscribe((s, prev) => {
    if (s.status === prev.status || !s.area) return;
    const props = { tour_id: s.area.id, tour_name: s.area.name, city: s.area.city };
    const started =
      (s.status === "navigating-to-start" && prev.status === "idle") ||
      (s.status === "touring" && prev.status === "idle");
    if (started) track("tour_started", props);
    if (s.status === "complete") track("tour_completed", { ...props, stops: s.area.route.length });
  });

  const unsubAccount = useAccountStore.subscribe((s, prev) => {
    if (s.account?.email === prev.account?.email) return;
    if (s.account) {
      identifyAccount(s.account);
      track(prev.ready ? "signed_in" : "returning_user");
    } else if (prev.account) {
      track("signed_out");
      resetIdentity();
    }
  });

  return () => {
    unsubConsent();
    unsubTour();
    unsubAccount();
  };
}

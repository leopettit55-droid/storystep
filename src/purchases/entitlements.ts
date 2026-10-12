import AsyncStorage from "@react-native-async-storage/async-storage";

const PURCHASES_KEY = "storystep.purchasedTours";
const SUBSCRIPTION_KEY = "storystep.subscription";
const PENDING_KEY = "storystep.pendingPurchase";

export type SubscriptionPlan = "weekly" | "monthly";

interface StoredSubscription {
  plan: SubscriptionPlan;
  expiresAt: number;
}

const PLAN_DURATION_MS: Record<SubscriptionPlan, number> = {
  weekly: 7 * 24 * 60 * 60 * 1000,
  monthly: 30 * 24 * 60 * 60 * 1000,
};

async function getPurchasedTourIds(): Promise<string[]> {
  const raw = await AsyncStorage.getItem(PURCHASES_KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function getSubscription(): Promise<StoredSubscription | null> {
  const raw = await AsyncStorage.getItem(SUBSCRIPTION_KEY);
  if (!raw) return null;
  const sub: StoredSubscription = JSON.parse(raw);
  if (sub.expiresAt < Date.now()) {
    await AsyncStorage.removeItem(SUBSCRIPTION_KEY);
    return null;
  }
  return sub;
}

export async function hasActiveSubscription(): Promise<boolean> {
  return (await getSubscription()) !== null;
}

/** Every tour is free for everyone. The purchase and subscription code in this
 * file is kept so paid tours can be switched back on by restoring the checks here. */
export async function hasTourAccess(_tourId: string): Promise<boolean> {
  return true;
}

export async function grantTourPurchase(tourId: string): Promise<void> {
  const purchased = await getPurchasedTourIds();
  if (!purchased.includes(tourId)) {
    purchased.push(tourId);
    await AsyncStorage.setItem(PURCHASES_KEY, JSON.stringify(purchased));
  }
}

export async function grantSubscription(plan: SubscriptionPlan): Promise<void> {
  const sub: StoredSubscription = { plan, expiresAt: Date.now() + PLAN_DURATION_MS[plan] };
  await AsyncStorage.setItem(SUBSCRIPTION_KEY, JSON.stringify(sub));
}

/** Remembers which tour the user was trying to buy right before we send them to
 * Stripe Checkout, since the checkout redirect back can't carry that context itself. */
export async function setPendingPurchase(tourId: string): Promise<void> {
  await AsyncStorage.setItem(PENDING_KEY, tourId);
}

export async function consumePendingPurchase(): Promise<string | null> {
  const tourId = await AsyncStorage.getItem(PENDING_KEY);
  if (tourId) await AsyncStorage.removeItem(PENDING_KEY);
  return tourId;
}

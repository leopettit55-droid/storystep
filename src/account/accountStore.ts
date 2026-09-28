import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { randomSalt, sha256Hex } from "./sha256";

/**
 * Customer accounts and finished tours, kept on this device (StoryStep has no
 * server yet). An account can be logged into again any time on the same
 * phone or browser; it doesn't sync between devices.
 *
 * Passwords are never stored: only a salted SHA-256 hash.
 */

const ACCOUNTS_KEY = "storystep.accounts";
const SESSION_KEY = "storystep.session";
/** Tours finished while nobody was logged in. */
const GUEST_COMPLETED_KEY = "storystep.completedTours";
/** The previous single-account format (name + email, no password). */
const LEGACY_ACCOUNT_KEY = "storystep.localAccount";

const MIN_PASSWORD_LENGTH = 6;

interface StoredAccount {
  name: string;
  email: string;
  salt: string;
  /** null for an account carried over from before passwords were saved; the
   * first password used to log in to it becomes its password. */
  passwordHash: string | null;
  completedTourIds: string[];
  createdAt: number;
}

export interface AccountProfile {
  name: string;
  email: string;
}

export type AccountError =
  | "fillIn"
  | "invalidEmail"
  | "passwordTooShort"
  | "accountExists"
  | "noAccount"
  | "wrongPassword";

interface AccountState {
  ready: boolean;
  account: AccountProfile | null;
  /** Finished tours for whoever is using the app right now. */
  completedTourIds: string[];
  load: () => Promise<void>;
  createAccount: (name: string, email: string, password: string) => Promise<AccountError | null>;
  logIn: (email: string, password: string) => Promise<AccountError | null>;
  signOut: () => Promise<void>;
  markTourCompleted: (areaId: string) => Promise<void>;
}

const normalise = (email: string) => email.trim().toLowerCase();
const hashPassword = (salt: string, password: string) => sha256Hex(`${salt}:${password}`);
const isEmail = (email: string) => /^\S+@\S+\.\S+$/.test(email);

async function readJson<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

const readAccounts = () => readJson<Record<string, StoredAccount>>(ACCOUNTS_KEY, {});
const writeAccounts = (accounts: Record<string, StoredAccount>) =>
  AsyncStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
const readGuestCompleted = () => readJson<string[]>(GUEST_COMPLETED_KEY, []);

const merge = (a: string[], b: string[]) => Array.from(new Set([...a, ...b]));

export const useAccountStore = create<AccountState>((set, get) => ({
  ready: false,
  account: null,
  completedTourIds: [],

  load: async () => {
    const accounts = await readAccounts();

    // Carry over an account made with the old version, and keep it logged in.
    const legacy = await readJson<{ name: string; email: string } | null>(LEGACY_ACCOUNT_KEY, null);
    if (legacy?.email) {
      const email = normalise(legacy.email);
      if (!accounts[email]) {
        accounts[email] = {
          name: legacy.name,
          email,
          salt: randomSalt(),
          passwordHash: null,
          completedTourIds: [],
          createdAt: Date.now(),
        };
        await writeAccounts(accounts);
        await AsyncStorage.setItem(SESSION_KEY, email);
      }
      await AsyncStorage.removeItem(LEGACY_ACCOUNT_KEY);
    }

    const sessionEmail = await AsyncStorage.getItem(SESSION_KEY);
    const current = sessionEmail ? accounts[sessionEmail] : undefined;
    if (current) {
      set({ ready: true, account: { name: current.name, email: current.email }, completedTourIds: current.completedTourIds });
    } else {
      set({ ready: true, account: null, completedTourIds: await readGuestCompleted() });
    }
  },

  createAccount: async (name, emailInput, password) => {
    const email = normalise(emailInput);
    if (!name.trim() || !email || !password) return "fillIn";
    if (!isEmail(email)) return "invalidEmail";
    if (password.length < MIN_PASSWORD_LENGTH) return "passwordTooShort";
    const accounts = await readAccounts();
    if (accounts[email]) return "accountExists";

    // Tours finished before signing up count towards the new account.
    const guestCompleted = await readGuestCompleted();
    const salt = randomSalt();
    accounts[email] = {
      name: name.trim(),
      email,
      salt,
      passwordHash: hashPassword(salt, password),
      completedTourIds: guestCompleted,
      createdAt: Date.now(),
    };
    await writeAccounts(accounts);
    await AsyncStorage.setItem(SESSION_KEY, email);
    await AsyncStorage.removeItem(GUEST_COMPLETED_KEY);
    set({ account: { name: name.trim(), email }, completedTourIds: guestCompleted });
    return null;
  },

  logIn: async (emailInput, password) => {
    const email = normalise(emailInput);
    if (!email || !password) return "fillIn";
    const accounts = await readAccounts();
    const stored = accounts[email];
    if (!stored) return "noAccount";
    if (stored.passwordHash === null) {
      if (password.length < MIN_PASSWORD_LENGTH) return "passwordTooShort";
      stored.passwordHash = hashPassword(stored.salt, password);
    } else if (stored.passwordHash !== hashPassword(stored.salt, password)) {
      return "wrongPassword";
    }

    stored.completedTourIds = merge(stored.completedTourIds, await readGuestCompleted());
    await writeAccounts(accounts);
    await AsyncStorage.setItem(SESSION_KEY, email);
    await AsyncStorage.removeItem(GUEST_COMPLETED_KEY);
    set({ account: { name: stored.name, email }, completedTourIds: stored.completedTourIds });
    return null;
  },

  /** Logs out; the account stays on this device to log back into. */
  signOut: async () => {
    await AsyncStorage.removeItem(SESSION_KEY);
    set({ account: null, completedTourIds: await readGuestCompleted() });
  },

  markTourCompleted: async (areaId) => {
    const { account, completedTourIds } = get();
    if (completedTourIds.includes(areaId)) return;
    const next = [...completedTourIds, areaId];
    set({ completedTourIds: next });
    if (account) {
      const accounts = await readAccounts();
      const stored = accounts[account.email];
      if (stored) {
        stored.completedTourIds = merge(stored.completedTourIds, [areaId]);
        await writeAccounts(accounts);
      }
    } else {
      await AsyncStorage.setItem(GUEST_COMPLETED_KEY, JSON.stringify(next));
    }
  },
}));

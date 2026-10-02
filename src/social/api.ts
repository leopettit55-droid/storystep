import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { useAccountStore } from "../account/accountStore";

/**
 * Talks to StoryStep's social server (netlify/functions): leaderboards and
 * tour photos. The live website calls its own /api; the dev server and the
 * phone apps call storystep.site.
 */
export const API_BASE =
  process.env.EXPO_PUBLIC_API_BASE ??
  (Platform.OS === "web" && !__DEV__ ? "" : "https://storystep.site");

export const apiUrl = (path: string) => `${API_BASE}${path}`;

export interface Identity {
  userId: string;
  key: string;
}

const identityKey = (email: string) => `storystep.social.${email}`;

/**
 * The signed-in account's identity on the server, registering it the first
 * time it's needed. Null for guests: the leaderboard and photo galleries
 * show names, so they need an account.
 */
export async function getIdentity(): Promise<Identity | null> {
  const account = useAccountStore.getState().account;
  if (!account) return null;
  try {
    const saved = await AsyncStorage.getItem(identityKey(account.email));
    if (saved) return JSON.parse(saved) as Identity;
    const res = await fetch(apiUrl("/api/register"), {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: account.name }),
    });
    if (!res.ok) return null;
    const identity = (await res.json()) as Identity;
    await AsyncStorage.setItem(identityKey(account.email), JSON.stringify(identity));
    return identity;
  } catch {
    return null;
  }
}

/** The saved identity only (no registering), e.g. to highlight "you" on a board. */
export async function savedIdentity(): Promise<Identity | null> {
  const account = useAccountStore.getState().account;
  if (!account) return null;
  try {
    const saved = await AsyncStorage.getItem(identityKey(account.email));
    return saved ? (JSON.parse(saved) as Identity) : null;
  } catch {
    return null;
  }
}

export const authHeader = (identity: Identity) => ({ authorization: `Bearer ${identity.userId}.${identity.key}` });

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export async function api<T>(path: string, init: RequestInit = {}, identity?: Identity | null): Promise<T> {
  const res = await fetch(apiUrl(path), {
    ...init,
    headers: {
      ...(init.body ? { "content-type": "application/json" } : {}),
      ...(identity ? authHeader(identity) : {}),
      ...(init.headers ?? {}),
    },
  });
  const body = await res.json().catch(() => null);
  if (!res.ok) throw new ApiError(res.status, body?.error ?? `Request failed (${res.status})`);
  return body as T;
}

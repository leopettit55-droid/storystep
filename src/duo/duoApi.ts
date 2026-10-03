import { api, API_BASE, getIdentity, type Identity } from "../social/api";

/** An invite as anyone with the code sees it. */
export interface DuoInvite {
  code: string;
  tour: string;
  host: string;
  hostId: string;
  guest: string | null;
  guestId: string | null;
  status: string;
}

/** Codes use no 0/O or 1/I/L; people type them in any case. */
export const normalizeCode = (code: string) => code.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
export const isValidCode = (code: string) => /^[A-HJKMNP-Z2-9]{6}$/.test(code);

/** The link a friend opens to join (also what the QR code holds). */
export const inviteLink = (code: string) => `https://storystep.site/walk-together/${code}`;

async function identityOrThrow(): Promise<Identity> {
  const identity = await getIdentity();
  if (!identity) throw new Error("account");
  return identity;
}

export async function createInvite(tourId: string, guide: string | null): Promise<DuoInvite> {
  return api<DuoInvite>("/api/duo", { method: "POST", body: JSON.stringify({ tourId, guide }) }, await identityOrThrow());
}

export async function getInvite(code: string): Promise<DuoInvite> {
  return api<DuoInvite>(`/api/duo/${code}`);
}

export async function acceptInvite(code: string): Promise<DuoInvite> {
  return api<DuoInvite>(`/api/duo/${code}/join`, { method: "POST", body: "{}" }, await identityOrThrow());
}

/** How many pairs have finished a tour together. */
export async function duoCount(tourId: string): Promise<number> {
  const { duos } = await api<{ duos: number }>(`/api/duo/stats?tour=${encodeURIComponent(tourId)}`);
  return duos;
}

/** The walk's live connection. Sign-in goes in the address: browsers can't add headers to a WebSocket. */
export function socketUrl(code: string, identity: Identity): string {
  const base =
    API_BASE || (typeof window !== "undefined" && window.location ? window.location.origin : "https://storystep.site");
  return `${base.replace(/^http/, "ws")}/api/duo/${code}/socket?auth=${identity.userId}.${identity.key}`;
}

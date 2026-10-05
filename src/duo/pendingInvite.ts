/**
 * Walk with a friend, signed out: someone who opens an invite (or starts one)
 * is sent to Account to create an account first. This remembers where they
 * were, so they land back on the invite as soon as they're signed in.
 */
let pending: { code?: string; areaId?: string } | null = null;

export function rememberInvite(target: { code?: string; areaId?: string }): void {
  pending = target.code || target.areaId ? target : null;
}

/** The invite to go back to (once), if any. */
export function takePendingInvite(): { code?: string; areaId?: string } | null {
  const target = pending;
  pending = null;
  return target;
}

import type { Area } from "../content";

/** Everything the "I walked it" share needs, already translated. */
export interface WalkShareInput {
  area: Area;
  /** Tour name in the viewer's language. */
  tourName: string;
  /** City name in the viewer's language. */
  city: string;
  /** "I walked {{tour}}" line, split so the tour name can be drawn large. */
  iWalkedLabel: string;
  stopsLabel: string;
  distanceLabel: string;
  dateLabel: string;
  tagline: string;
  /** Message sent with the share (the link is added separately). */
  shareText: string;
}

export const BRAND = {
  orange: "#D85A30",
  cream: "#F5EDE3",
  nearBlack: "#1B1A17",
};

/** The page a share links to. utm_source lets visits from shares be counted later.
 * The trailing slash is the tour page's real address (no redirect on the way). */
export function tourShareUrl(areaId: string): string {
  return `https://storystep.site/tour/${areaId}/?utm_source=share`;
}

/** The same link as printed on the card: short, no tracking parameter. */
export function tourDisplayUrl(areaId: string): string {
  return `storystep.site/tour/${areaId}`;
}

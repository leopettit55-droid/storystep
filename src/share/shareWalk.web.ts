import { Asset } from "expo-asset";
import { BRAND, tourDisplayUrl, tourShareUrl, type WalkShareInput } from "./walkCard";

export type ShareOutcome = "shared" | "downloaded" | "downloaded-copied" | "copied" | "cancelled" | "failed";

export interface PreparedShare {
  input: WalkShareInput;
  file: File | null;
}

const WIDTH = 1080;
const HEIGHT = 1920;
const PAD = 96;
const FONT = `system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("image failed to load"));
    img.src = src;
  });
}

/** Draws `img` to fill the canvas, cropping the overflow (like CSS cover). */
function drawCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement) {
  const scale = Math.max(WIDTH / img.width, HEIGHT / img.height);
  const w = img.width * scale;
  const h = img.height * scale;
  ctx.drawImage(img, (WIDTH - w) / 2, (HEIGHT - h) / 2, w, h);
}

/** Splits `text` into lines no wider than `maxWidth` at the current font. */
function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (ctx.measureText(next).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

async function drawCard(input: WalkShareInput): Promise<Blob | null> {
  const canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // Background: the tour's photo under a dark fade, or plain near-black.
  ctx.fillStyle = BRAND.nearBlack;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  if (input.area.image != null) {
    try {
      const uri = Asset.fromModule(input.area.image).uri;
      drawCover(ctx, await loadImage(uri));
    } catch {
      // Keep the plain background.
    }
  }
  const fade = ctx.createLinearGradient(0, 0, 0, HEIGHT);
  fade.addColorStop(0, "rgba(27,26,23,0.55)");
  fade.addColorStop(0.35, "rgba(27,26,23,0.25)");
  fade.addColorStop(0.62, "rgba(27,26,23,0.85)");
  fade.addColorStop(1, "rgba(27,26,23,0.97)");
  ctx.fillStyle = fade;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Brand mark, top left.
  ctx.fillStyle = BRAND.orange;
  ctx.beginPath();
  ctx.arc(PAD + 34, PAD + 50, 34, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#FFFFFF";
  ctx.font = `800 38px ${FONT}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("S", PAD + 34, PAD + 52);
  ctx.textAlign = "left";
  ctx.fillStyle = BRAND.cream;
  ctx.font = `800 48px ${FONT}`;
  ctx.fillText("StoryStep", PAD + 88, PAD + 52);

  // Text block, laid out from the bottom up so long tour names push it upward.
  ctx.textBaseline = "alphabetic";
  const maxWidth = WIDTH - PAD * 2;

  ctx.font = `800 104px ${FONT}`;
  const nameLines = wrap(ctx, input.tourName, maxWidth).slice(0, 4);
  const nameLineHeight = 116;

  const linkY = HEIGHT - PAD - 40;
  const statsY = linkY - 210;
  const cityY = statsY - 110;
  const nameBottomY = cityY - 70;
  const nameTopY = nameBottomY - (nameLines.length - 1) * nameLineHeight;
  const walkedY = nameTopY - nameLineHeight - 10;

  ctx.fillStyle = BRAND.cream;
  ctx.font = `600 56px ${FONT}`;
  ctx.fillText(input.iWalkedLabel, PAD, walkedY);

  ctx.fillStyle = "#FFFFFF";
  ctx.font = `800 104px ${FONT}`;
  nameLines.forEach((l, i) => ctx.fillText(l, PAD, nameTopY + i * nameLineHeight));

  ctx.fillStyle = BRAND.orange;
  ctx.font = `800 44px ${FONT}`;
  ctx.fillText(input.city.toUpperCase().split("").join(String.fromCharCode(8202)), PAD, cityY);

  ctx.fillStyle = BRAND.cream;
  ctx.font = `500 46px ${FONT}`;
  ctx.fillText([input.stopsLabel, input.distanceLabel, input.dateLabel].join("  ·  "), PAD, statsY);

  // Link pill.
  const link = tourDisplayUrl(input.area.id);
  ctx.font = `700 42px ${FONT}`;
  const pillW = Math.min(maxWidth, ctx.measureText(link).width + 80);
  const pillH = 96;
  const pillY = linkY - pillH + 26;
  ctx.fillStyle = BRAND.orange;
  ctx.beginPath();
  if (typeof ctx.roundRect === "function") {
    ctx.roundRect(PAD, pillY, pillW, pillH, pillH / 2);
  } else {
    // Older Safari: build the pill from two half-circles.
    const r = pillH / 2;
    ctx.arc(PAD + r, pillY + r, r, Math.PI / 2, (Math.PI * 3) / 2);
    ctx.arc(PAD + pillW - r, pillY + r, r, (Math.PI * 3) / 2, Math.PI / 2);
    ctx.closePath();
  }
  ctx.fill();
  ctx.fillStyle = BRAND.nearBlack;
  ctx.textBaseline = "middle";
  ctx.fillText(link, PAD + 40, pillY + pillH / 2 + 2);

  ctx.fillStyle = "rgba(245,237,227,0.7)";
  ctx.font = `500 34px ${FONT}`;
  ctx.textBaseline = "alphabetic";
  ctx.fillText(input.tagline, PAD, pillY - 36);

  return new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
}

/** Builds the card ahead of time: sharing must happen straight from the tap,
 * and Safari won't allow it after waiting for the photo to load. */
export async function prepareWalkShare(input: WalkShareInput): Promise<PreparedShare> {
  try {
    if (typeof document !== "undefined" && document.fonts?.ready) await document.fonts.ready;
    const blob = await drawCard(input);
    const file = blob ? new File([blob], `storystep-${input.area.id}.png`, { type: "image/png" }) : null;
    return { input, file };
  } catch (e) {
    console.warn("[shareWalk] couldn't draw the share card:", e);
    return { input, file: null };
  }
}

async function copyLink(url: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(url);
    return true;
  } catch {
    return false;
  }
}

export async function shareWalk({ input, file }: PreparedShare): Promise<ShareOutcome> {
  const url = tourShareUrl(input.area.id);
  const nav = navigator as Navigator & { canShare?: (data: ShareData) => boolean };

  if (file && nav.canShare?.({ files: [file] }) && nav.share) {
    try {
      await nav.share({ files: [file], title: "StoryStep", text: `${input.shareText} ${url}` });
      return "shared";
    } catch (e) {
      if ((e as Error)?.name === "AbortError") return "cancelled";
      // Fall through to the download below (e.g. the tap's permission ran out).
    }
  }

  if (!file) {
    // No image to save: share or copy just the link.
    if (nav.share) {
      try {
        await nav.share({ title: "StoryStep", text: input.shareText, url });
        return "shared";
      } catch (e) {
        if ((e as Error)?.name === "AbortError") return "cancelled";
      }
    }
    return (await copyLink(url)) ? "copied" : "failed";
  }

  const href = URL.createObjectURL(file);
  const a = document.createElement("a");
  a.href = href;
  a.download = file.name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(href), 10_000);
  return (await copyLink(url)) ? "downloaded-copied" : "downloaded";
}

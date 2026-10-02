/** A photo chosen for sharing: a JPEG as base64, plus a preview link. */
export interface PickedPhoto {
  base64: string;
  previewUri: string;
}

/** Longest side, in pixels: plenty for a gallery and keeps uploads small. */
const MAX_SIDE = 1600;
const QUALITY = 0.82;

/**
 * Opens the browser's picker. On phones it offers the camera or the photo
 * library. The picture is shrunk and re-encoded as JPEG before upload, which
 * also drops any location or camera details stored inside the original file.
 */
export function pickPhoto(): Promise<PickedPhoto | null> {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.style.display = "none";
    document.body.appendChild(input);
    let settled = false;
    const done = (value: PickedPhoto | null) => {
      if (settled) return;
      settled = true;
      input.remove();
      resolve(value);
    };
    input.addEventListener("change", async () => {
      const file = input.files?.[0];
      if (!file) return done(null);
      try {
        done(await shrink(file));
      } catch {
        done(null);
      }
    });
    // Picker closed without choosing.
    input.addEventListener("cancel", () => done(null));
    input.click();
  });
}

async function shrink(file: File): Promise<PickedPhoto> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const dataUrl = canvas.toDataURL("image/jpeg", QUALITY);
  return { base64: dataUrl.slice(dataUrl.indexOf(",") + 1), previewUri: dataUrl };
}

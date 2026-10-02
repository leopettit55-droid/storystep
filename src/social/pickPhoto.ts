/** A photo chosen for sharing: a JPEG as base64, plus a preview link. */
export interface PickedPhoto {
  base64: string;
  previewUri: string;
}

/**
 * Native: the photo library via expo-image-picker. It's loaded only when
 * needed, so an app build made before it was added doesn't crash at start
 * (it just can't pick photos until the app is rebuilt).
 */
export async function pickPhoto(): Promise<PickedPhoto | null> {
  let ImagePicker: typeof import("expo-image-picker");
  try {
    ImagePicker = require("expo-image-picker");
  } catch {
    return null;
  }
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) return null;
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    quality: 0.6,
    base64: true,
    exif: false,
  });
  const asset = result.canceled ? null : result.assets[0];
  if (!asset?.base64) return null;
  return { base64: asset.base64, previewUri: asset.uri };
}

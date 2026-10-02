import { Platform } from "react-native";
import { api, apiUrl, authHeader, getIdentity, savedIdentity } from "./api";

/** A tour photo as the server describes it. */
export interface TourPhoto {
  id: string;
  name: string;
  tour: string;
  tourName: string;
  stop: string;
  stopName: string;
  lat: number;
  lng: number;
  isPublic: boolean;
  seconds: number | null;
  completedAt: number;
  createdAt: number;
  mine: boolean;
  /** Only for your own photos: hidden from galleries after reports. */
  hidden?: boolean;
  imageUrl: string;
}

export async function sharePhoto(input: {
  tourId: string;
  stopId: string;
  isPublic: boolean;
  seconds: number | null;
  completedAt: number;
  base64: string;
}): Promise<TourPhoto> {
  const identity = await getIdentity();
  if (!identity) throw new Error("Create an account to share photos");
  const { photo } = await api<{ photo: TourPhoto }>(
    "/api/photos",
    {
      method: "POST",
      body: JSON.stringify({
        tourId: input.tourId,
        stopId: input.stopId,
        isPublic: input.isPublic,
        seconds: input.seconds,
        completedAt: input.completedAt,
        image: input.base64,
      }),
    },
    identity
  );
  return photo;
}

export async function tourGallery(tourId: string): Promise<TourPhoto[]> {
  const identity = await savedIdentity();
  return (await api<{ photos: TourPhoto[] }>(`/api/photos?tour=${encodeURIComponent(tourId)}`, {}, identity)).photos;
}

export async function myPhotos(): Promise<TourPhoto[]> {
  const identity = await getIdentity();
  if (!identity) return [];
  return (await api<{ photos: TourPhoto[] }>("/api/photos?mine=1", {}, identity)).photos;
}

export async function reportPhoto(id: string, reason: string): Promise<void> {
  const identity = await getIdentity();
  if (!identity) throw new Error("Create an account to report photos");
  await api(`/api/photos/${id}/report`, { method: "POST", body: JSON.stringify({ reason }) }, identity);
}

export async function deletePhoto(id: string): Promise<void> {
  const identity = await getIdentity();
  if (!identity) throw new Error("Sign in first");
  await api(`/api/photos/${id}`, { method: "DELETE" }, identity);
}

/**
 * Something an <Image> can show. Public photos load straight from their
 * address; private ones need the owner's key, so they're fetched first.
 */
export async function photoSource(photo: TourPhoto): Promise<string> {
  const url = apiUrl(photo.imageUrl);
  if (photo.isPublic && !photo.hidden) return url;
  const identity = await savedIdentity();
  if (!identity) return url;
  if (Platform.OS === "web") {
    const res = await fetch(url, { headers: authHeader(identity) });
    return URL.createObjectURL(await res.blob());
  }
  // Native <Image> can send headers itself; see PhotoImage.
  return url;
}

export const photoHeaders = async (photo: TourPhoto): Promise<Record<string, string> | undefined> => {
  if (photo.isPublic && !photo.hidden) return undefined;
  const identity = await savedIdentity();
  return identity ? authHeader(identity) : undefined;
};

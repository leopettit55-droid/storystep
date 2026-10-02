import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import { Image, Modal, Pressable, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { useLanguage } from "../i18n/LanguageContext";
import { deletePhoto, photoHeaders, photoSource, reportPhoto, type TourPhoto } from "../social/photos";
import { useTheme } from "../ThemeContext";
import type { ThemeColors } from "../theme";
import PressScale from "./PressScale";

function formatDate(ms: number, language: string) {
  return new Date(ms).toLocaleDateString(language === "en" ? "en-GB" : language, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** Shows a tour photo; private ones are loaded with the owner's key. */
function PhotoImage({ photo, style }: { photo: TourPhoto; style: object }) {
  const [source, setSource] = useState<{ uri: string; headers?: Record<string, string> } | null>(null);
  useEffect(() => {
    let cancelled = false;
    void Promise.all([photoSource(photo), photoHeaders(photo)]).then(([uri, headers]) => {
      if (!cancelled) setSource({ uri, headers });
    });
    return () => {
      cancelled = true;
    };
  }, [photo]);
  return source ? <Image source={source} style={style} resizeMode="cover" /> : <View style={style} />;
}

/**
 * A grid of tour photos. Tapping one opens it full size with who took it,
 * the tour, the stop and the date, and Report (others' photos) or Delete
 * (your own).
 */
export default function PhotoGrid({
  photos,
  showTour,
  onChanged,
}: {
  photos: TourPhoto[];
  /** Show the tour name on each photo (for "my photos", across tours). */
  showTour?: boolean;
  onChanged?: () => void;
}) {
  const { language, t } = useLanguage();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { width } = useWindowDimensions();
  const columns = width >= 900 ? 4 : width >= 600 ? 3 : 2;
  const tile = Math.floor((Math.min(width, 900) - 40 - (columns - 1) * 10) / columns);
  const [open, setOpen] = useState<TourPhoto | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const close = () => {
    setOpen(null);
    setNotice(null);
  };

  const handleReport = async () => {
    if (!open || busy) return;
    setBusy(true);
    try {
      await reportPhoto(open.id, "inappropriate");
      setNotice(t("photos.reported"));
    } catch (e) {
      setNotice((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    if (!open || busy) return;
    setBusy(true);
    try {
      await deletePhoto(open.id);
      close();
      onChanged?.();
    } catch (e) {
      setNotice((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <View style={styles.grid}>
        {photos.map((photo) => (
          <Pressable key={photo.id} onPress={() => setOpen(photo)} style={{ width: tile }} aria-label={photo.stopName}>
            <PhotoImage photo={photo} style={[styles.image, { width: tile, height: tile }]} />
            {!photo.isPublic && (
              <View style={styles.badge}>
                <Ionicons name="lock-closed" size={11} color="#FFFFFF" />
                <Text style={styles.badgeText}>{t("photos.private")}</Text>
              </View>
            )}
            {photo.hidden && (
              <View style={[styles.badge, styles.badgeWarn]}>
                <Text style={styles.badgeText}>{t("photos.hidden")}</Text>
              </View>
            )}
            <Text style={styles.caption} numberOfLines={1}>
              {showTour ? photo.tourName : photo.name}
            </Text>
            <Text style={styles.meta} numberOfLines={1}>
              {photo.stopName} · {formatDate(photo.createdAt, language)}
            </Text>
          </Pressable>
        ))}
      </View>

      <Modal visible={!!open} transparent animationType="fade" onRequestClose={close}>
        {open && (
          <View style={styles.viewer}>
            <Pressable style={styles.viewerClose} onPress={close} aria-label={t("camera.close")}>
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </Pressable>
            <PhotoImage photo={open} style={styles.viewerImage} />
            <View style={styles.viewerInfo}>
              <Text style={styles.viewerTitle}>{open.mine ? t("photos.yourPhoto") : open.name}</Text>
              <Text style={styles.viewerMeta}>
                {open.tourName} · {open.stopName}
              </Text>
              <Text style={styles.viewerMeta}>{formatDate(open.createdAt, language)}</Text>
              {notice && <Text style={styles.viewerNotice}>{notice}</Text>}
              <View style={styles.viewerActions}>
                {open.mine ? (
                  <PressScale style={styles.action} scaleTo={0.95} onPress={handleDelete} disabled={busy}>
                    <Ionicons name="trash-outline" size={16} color="#FFFFFF" />
                    <Text style={styles.actionText}>{t("photos.delete")}</Text>
                  </PressScale>
                ) : (
                  <PressScale style={styles.action} scaleTo={0.95} onPress={handleReport} disabled={busy}>
                    <Ionicons name="flag-outline" size={16} color="#FFFFFF" />
                    <Text style={styles.actionText}>{t("photos.report")}</Text>
                  </PressScale>
                )}
              </View>
            </View>
          </View>
        )}
      </Modal>
    </>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    grid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
    image: { borderRadius: 12, backgroundColor: colors.surfaceRaised },
    badge: {
      position: "absolute",
      top: 8,
      left: 8,
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      backgroundColor: "rgba(0,0,0,0.55)",
      borderRadius: 8,
      paddingHorizontal: 7,
      paddingVertical: 3,
    },
    badgeWarn: { top: 34, backgroundColor: "rgba(200,80,40,0.9)" },
    badgeText: { color: "#FFFFFF", fontSize: 11, fontWeight: "700" },
    caption: { color: colors.text, fontSize: 13, fontWeight: "600", marginTop: 6 },
    meta: { color: colors.textDim, fontSize: 12, marginTop: 1 },
    viewer: { flex: 1, backgroundColor: "rgba(10,8,6,0.94)", justifyContent: "center", padding: 16 },
    viewerClose: { position: "absolute", top: 20, right: 16, zIndex: 2, padding: 8 },
    viewerImage: { width: "100%", aspectRatio: 1, maxHeight: "65%", borderRadius: 12, alignSelf: "center" },
    viewerInfo: { marginTop: 16, alignSelf: "center", width: "100%", maxWidth: 560 },
    viewerTitle: { color: "#FFFFFF", fontSize: 17, fontWeight: "700" },
    viewerMeta: { color: "rgba(255,255,255,0.75)", fontSize: 14, marginTop: 3 },
    viewerNotice: { color: "#FFD9A8", fontSize: 13, marginTop: 10 },
    viewerActions: { flexDirection: "row", gap: 10, marginTop: 14 },
    action: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.4)",
      borderRadius: 10,
      paddingVertical: 9,
      paddingHorizontal: 14,
    },
    actionText: { color: "#FFFFFF", fontSize: 14, fontWeight: "600" },
  });
}

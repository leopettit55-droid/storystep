import { useFocusEffect, useRoute } from "@react-navigation/native";
import { useCallback, useMemo, useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import BackButton from "../components/BackButton";
import PhotoGrid from "../components/PhotoGrid";
import { getAreaById } from "../content";
import { localizedAreaText } from "../i18n/areaTranslations";
import { useLanguage } from "../i18n/LanguageContext";
import type { RootStackParamList } from "../navigation/types";
import { useOnline } from "../offline/connectivity";
import { tourGallery, type TourPhoto } from "../social/photos";
import { useTheme } from "../ThemeContext";
import type { ThemeColors } from "../theme";

/** A tour's gallery: the public photos people have shared from it, newest first. */
export default function TourGalleryScreen() {
  const { params } = useRoute() as unknown as { params: RootStackParamList["TourGallery"] };
  const area = getAreaById(params.areaId);
  const { language, t } = useLanguage();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const online = useOnline();
  const [photos, setPhotos] = useState<TourPhoto[] | null>(null);
  const [failed, setFailed] = useState(false);

  const load = useCallback(() => {
    if (!area) return;
    setFailed(false);
    tourGallery(area.id).then(setPhotos).catch(() => setFailed(true));
  }, [area]);
  useFocusEffect(load);

  if (!area) return null;
  const name = localizedAreaText(area.id, language, area).name;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <BackButton variant="inline" />
        <Text style={styles.title}>{t("photos.galleryTitle")}</Text>
        <Text style={styles.subtitle}>{name}</Text>
        {photos === null && !failed ? (
          <ActivityIndicator color={colors.primary} style={styles.loading} />
        ) : failed ? (
          <Text style={styles.empty}>{t(online ? "photos.loadFailed" : "photos.offline")}</Text>
        ) : photos!.length === 0 ? (
          <Text style={styles.empty}>{t("photos.galleryEmpty")}</Text>
        ) : (
          <PhotoGrid photos={photos!} onChanged={load} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    scroll: { padding: 20, paddingTop: 16, gap: 12, width: "100%", maxWidth: 900, alignSelf: "center" },
    title: { fontSize: 32, fontWeight: "700", color: colors.primary, marginTop: 4 },
    subtitle: { fontSize: 15, color: colors.textMid, marginTop: -6, marginBottom: 6 },
    loading: { padding: 30 },
    empty: { color: colors.textDim, fontSize: 14, lineHeight: 20, paddingVertical: 20 },
  });
}

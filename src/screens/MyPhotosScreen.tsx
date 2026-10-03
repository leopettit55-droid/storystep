import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useMemo, useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import { useAccountStore } from "../account/accountStore";
import BackButton from "../components/BackButton";
import PhotoGrid from "../components/PhotoGrid";
import { useLanguage } from "../i18n/LanguageContext";
import { useOnline } from "../offline/connectivity";
import { myPhotos, type TourPhoto } from "../social/photos";
import { useTheme } from "../ThemeContext";
import type { ThemeColors } from "../theme";

/** Tours tab → "Tour photos": every photo you've shared, public and private, with tour and date. */
export default function MyPhotosScreen() {
  const { t } = useLanguage();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const online = useOnline();
  const signedIn = useAccountStore((s) => !!s.account);
  const [photos, setPhotos] = useState<TourPhoto[] | null>(null);
  const [failed, setFailed] = useState(false);

  const load = useCallback(() => {
    if (!signedIn) return;
    setFailed(false);
    myPhotos().then(setPhotos).catch(() => setFailed(true));
  }, [signedIn]);
  useFocusEffect(load);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <BackButton variant="inline" />
        <Text style={styles.title}>{t("photos.myTitle")}</Text>
        <Text style={styles.subtitle}>{t("photos.mySubtitle")}</Text>
        {!signedIn ? (
          <Text style={styles.empty}>{t("photos.needAccount")}</Text>
        ) : photos === null && !failed ? (
          <ActivityIndicator color={colors.primary} style={styles.loading} />
        ) : failed ? (
          <Text style={styles.empty}>{t(online ? "photos.loadFailed" : "photos.offline")}</Text>
        ) : photos!.length === 0 ? (
          <Text style={styles.empty}>{t("photos.myEmpty")}</Text>
        ) : (
          <PhotoGrid photos={photos!} showTour onChanged={load} />
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
    subtitle: { fontSize: 14, color: colors.textMid, marginTop: -6, marginBottom: 6, lineHeight: 20 },
    loading: { padding: 30 },
    empty: { color: colors.textDim, fontSize: 14, lineHeight: 20, paddingVertical: 20 },
  });
}

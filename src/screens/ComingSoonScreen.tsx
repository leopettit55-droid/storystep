import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMemo } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import PressScale from "../components/PressScale";
import { useLanguage } from "../i18n/LanguageContext";
import { localizedCityName } from "../i18n/cityNames";
import type { RootStackParamList } from "../navigation/types";
import { useTheme } from "../ThemeContext";
import type { ThemeColors } from "../theme";

type Nav = NativeStackNavigationProp<RootStackParamList, "ComingSoon">;
type RouteProp = { params: { cityName: string } };

export default function ComingSoonScreen() {
  const navigation = useNavigation<Nav>();
  const { params } = useRoute() as unknown as RouteProp;
  const { language, t } = useLanguage();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const city = localizedCityName(params.cityName, language);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centered}>
        <Text style={styles.pin}>📍</Text>
        <Text style={styles.title}>{t("comingSoonScreen.title", { city })}</Text>
        <Text style={styles.body}>{t("comingSoonScreen.body", { city })}</Text>

        <PressScale
          style={styles.cta}
          scaleTo={0.95}
          onPress={() => navigation.navigate("MainTabs", { screen: "Tours" } as never)}
        >
          <Text style={styles.ctaText}>{t("comingSoonScreen.browseAvailable")}</Text>
        </PressScale>

        <Pressable style={styles.backLink} onPress={() => navigation.goBack()}>
          <Text style={styles.backLinkText}>{t("comingSoonScreen.back")}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  centered: { flex: 1, alignItems: "center", justifyContent: "center", padding: 32, gap: 10 },
  pin: { fontSize: 40 },
  title: { fontSize: 24, fontWeight: "700", color: colors.text, textAlign: "center" },
  body: {
    fontSize: 14,
    color: colors.textMid,
    textAlign: "center",
    lineHeight: 20,
    maxWidth: 360,
    marginTop: 2,
  },
  cta: {
    marginTop: 18,
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: 28,
  },
  ctaText: { color: colors.onPrimary, fontSize: 15, fontWeight: "700" },
  backLink: { marginTop: 6, padding: 8 },
  backLinkText: { color: colors.textDim, fontSize: 13, textDecorationLine: "underline" },
  });
}

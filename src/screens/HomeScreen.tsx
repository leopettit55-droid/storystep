import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useMemo, useState } from "react";
import {
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import CharacterGuide from "../components/CharacterGuide";
import FadeInItem from "../components/FadeInItem";
import HoverLift from "../components/HoverLift";
import IntroVideoOverlay from "../components/IntroVideoOverlay";
import LanguagePicker from "../components/LanguagePicker";
import PressScale from "../components/PressScale";
import Skeleton from "../components/Skeleton";
import { areas } from "../content";
import { localizedAreaText } from "../i18n/areaTranslations";
import { localizedCityName } from "../i18n/cityNames";
import { useLanguage } from "../i18n/LanguageContext";
import type { TabScreenNav } from "../navigation/types";
import { useTheme } from "../ThemeContext";
import { DESKTOP_BREAKPOINT, type ThemeColors } from "../theme";

type Nav = TabScreenNav<"Home">;

const HERO_IMAGE = require("../../assets/tours/westminster.jpg");

export default function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const { width } = useWindowDimensions();
  const isDesktop = width >= DESKTOP_BREAKPOINT;
  const { t } = useLanguage();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const featured = areas.filter((a) => a.isContentComplete);
  const cityCount = new Set(featured.map((a) => a.city)).size;
  const paidTours = featured.filter((a) => !a.scannerOnly);

  const FEATURES = [
    { title: t("home.featureGpsTitle"), body: t("home.featureGpsBody"), icon: "location" as const },
    { title: t("home.featureNarratorTitle"), body: t("home.featureNarratorBody"), icon: "mic" as const },
    // Scanning has its own card just below, so it isn't repeated here.
    { title: t("home.featureOfflineTitle"), body: t("home.featureOfflineBody"), icon: "cellular" as const },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.stage}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <ImageBackground
            source={HERO_IMAGE}
            style={styles.hero}
            // Fill the full width on wide screens instead of the photo's natural 1024px.
            imageStyle={styles.heroImage}
            resizeMode="cover"
          >
            <View style={styles.heroScrim} />
            <View style={[styles.heroInner, isDesktop && styles.heroInnerDesktop]}>
              <View style={styles.heroTextCol}>
                <Text style={[styles.title, isDesktop && styles.titleDesktop]}>StoryStep</Text>
                <Text style={[styles.subtitle, isDesktop && styles.subtitleDesktop]}>
                  {t("home.heroSubtitle")}
                </Text>

                <View style={styles.statRow}>
                  <View style={styles.stat}>
                    <Text style={styles.statNumber}>{paidTours.length}</Text>
                    <Text style={styles.statLabel}>{t("home.statsTours")}</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.stat}>
                    <Text style={styles.statNumber}>{cityCount}</Text>
                    <Text style={styles.statLabel}>{t("home.statsCities")}</Text>
                  </View>
                </View>

                <View style={styles.heroActions}>
                  <PressScale
                    style={styles.heroPrimaryButton}
                    scaleTo={0.94}
                    onPress={() => navigation.navigate("Tours")}
                  >
                    <Text style={styles.heroPrimaryButtonText}>{t("home.browseTours")}</Text>
                  </PressScale>
                  <PressScale
                    style={styles.heroSecondaryButton}
                    scaleTo={0.94}
                    onPress={() => navigation.navigate("Map")}
                  >
                    <Text style={styles.heroSecondaryButtonText}>{t("home.exploreIn3D")}</Text>
                  </PressScale>
                  {/* Desktop already has the language picker in the top bar. */}
                  {!isDesktop && <LanguagePicker tone="light" />}
                </View>
              </View>
              {isDesktop && (
                <View style={styles.heroCharacterWrap}>
                  <CharacterGuide isTalking size={140} />
                </View>
              )}
            </View>
          </ImageBackground>

          <View style={[styles.band, styles.bandCream]}>
            <View style={[styles.page, isDesktop && styles.pageDesktop]}>
              <Text style={styles.sectionLabel}>{t("home.featuredToursTitle")}</Text>
              {isDesktop ? (
                <View style={styles.featuredGridDesktop}>
                  {featured.map((area, index) => (
                    <FadeInItem key={area.id} index={index} style={styles.featuredCardWide}>
                      <FeaturedCard
                        area={area}
                        onPress={() => navigation.navigate("TourPreview", { areaId: area.id })}
                      />
                    </FadeInItem>
                  ))}
                </View>
              ) : (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.carousel}
                >
                  {featured.map((area, index) => (
                    <FadeInItem key={area.id} index={index} style={styles.featuredCard}>
                      <FeaturedCard
                        area={area}
                        onPress={() => navigation.navigate("TourPreview", { areaId: area.id })}
                      />
                    </FadeInItem>
                  ))}
                </ScrollView>
              )}
            </View>
          </View>

          <View style={[styles.band, styles.bandWhite]}>
            <View style={[styles.page, isDesktop && styles.pageDesktop]}>
              <View style={styles.aboutRow}>
                {!isDesktop && <CharacterGuide isTalking size={64} />}
                <View style={styles.aboutTextCol}>
                  <Text style={styles.aboutTitle}>{t("home.whoWeAreTitle")}</Text>
                  <Text style={styles.aboutBody}>{t("home.whoWeAreBody")}</Text>
                </View>
              </View>

              <Text style={[styles.sectionLabel, { marginTop: 28 }]}>{t("home.whyTitle")}</Text>
              <View style={[styles.featuresGrid, isDesktop && styles.featuresGridDesktop]}>
                {FEATURES.map((f) => (
                  <HoverLift
                    key={f.title}
                    style={[styles.featureCard, isDesktop && styles.featureCardDesktop]}
                  >
                    <Ionicons name={f.icon} size={22} color={colors.primary} />
                    <Text style={styles.featureTitle}>{f.title}</Text>
                    <Text style={styles.featureBody}>{f.body}</Text>
                  </HoverLift>
                ))}
              </View>

              <HoverLift
                style={styles.cameraCard}
                onPress={() => navigation.navigate("CameraTour")}
              >
                <Text style={styles.cameraCardTitle}>{t("home.scanCardTitle")}</Text>
                <Text style={styles.cameraCardBody}>{t("home.scanCardBody")}</Text>
              </HoverLift>
            </View>
          </View>

          <View style={[styles.band, styles.bandCream]}>
            <View style={[styles.page, isDesktop && styles.pageDesktop]}>
              <View style={styles.stepsCard}>
                <Text style={styles.stepsTitle}>{t("home.howItWorksTitle")}</Text>
                <View style={styles.step}>
                  <Text style={styles.stepNumber}>1</Text>
                  <Text style={styles.stepText}>{t("home.step1")}</Text>
                </View>
                <View style={styles.step}>
                  <Text style={styles.stepNumber}>2</Text>
                  <Text style={styles.stepText}>{t("home.step2")}</Text>
                </View>
                <View style={styles.step}>
                  <Text style={styles.stepNumber}>3</Text>
                  <Text style={styles.stepText}>{t("home.step3")}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.ctaBand}>
            <Text style={styles.ctaTitle}>{t("home.ctaTitle")}</Text>
            <Text style={styles.ctaBody}>{t("home.ctaBody")}</Text>
            <PressScale style={styles.ctaButton} scaleTo={0.94} onPress={() => navigation.navigate("Tours")}>
              <Text style={styles.ctaButtonText}>{t("home.ctaButton")}</Text>
            </PressScale>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerBrand}>StoryStep</Text>
            <View style={styles.footerLinks}>
              <Pressable onPress={() => navigation.navigate("PrivacyPolicy")}>
                <Text style={styles.footerLink}>{t("home.footerPrivacy")}</Text>
              </Pressable>
              <Pressable onPress={() => navigation.navigate("TermsOfService")}>
                <Text style={styles.footerLink}>{t("home.footerTerms")}</Text>
              </Pressable>
              <Pressable onPress={() => navigation.navigate("Help")}>
                <Text style={styles.footerLink}>{t("home.footerHelp")}</Text>
              </Pressable>
              <Pressable onPress={() => navigation.navigate("ContactUs")}>
                <Text style={styles.footerLink}>{t("help.contactUs")}</Text>
              </Pressable>
            </View>
            <Text style={styles.footerCopy}>{t("home.footerCopy")}</Text>
          </View>
        </ScrollView>

        <IntroVideoOverlay />
      </View>
    </SafeAreaView>
  );
}

function FeaturedCard({
  area,
  onPress,
}: {
  area: (typeof areas)[number];
  onPress: () => void;
}) {
  const { language, t } = useLanguage();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const text = localizedAreaText(area.id, language, area);
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <HoverLift style={styles.featuredCardFill} onPress={onPress}>
      {area.image && (
        <View style={styles.featuredImage}>
          {!imageLoaded && <Skeleton style={StyleSheet.absoluteFill} borderRadius={0} />}
          <ImageBackground
            source={area.image}
            style={[styles.featuredImage, { opacity: imageLoaded ? 1 : 0 }]}
            resizeMode="cover"
            onLoad={() => setImageLoaded(true)}
          >
            <View style={styles.featuredOverlay}>
              <Text style={styles.featuredCity}>{localizedCityName(area.city, language)}</Text>
              <Text style={styles.featuredTitle}>{text.name}</Text>
              <Text style={styles.featuredMeta}>
                {area.scannerOnly
                  ? t("tourPreview.useScanner")
                  : `${area.estimatedDurationMin} ${t("common.min")} · ${t("common.free")}`}
              </Text>
            </View>
          </ImageBackground>
        </View>
      )}
    </HoverLift>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  stage: { flex: 1, position: "relative" },
  scroll: { paddingBottom: 0 },

  hero: { minHeight: 420, justifyContent: "flex-end" },
  heroImage: { width: "100%", height: "100%" },
  heroScrim: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(20,12,10,0.6)",
  },
  heroInner: { padding: 24, paddingBottom: 36 },
  heroInnerDesktop: {
    maxWidth: 1100,
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: 32,
    paddingBottom: 56,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  heroTextCol: { maxWidth: 560 },
  heroCharacterWrap: { paddingBottom: 8 },
  title: { fontSize: 36, fontWeight: "800", color: "#FFFFFF" },
  titleDesktop: { fontSize: 58 },
  subtitle: { fontSize: 14, color: "#F3E6DE", marginTop: 6 },
  subtitleDesktop: { fontSize: 19, lineHeight: 27, marginTop: 10 },
  statRow: { flexDirection: "row", alignItems: "center", marginTop: 22, gap: 18 },
  stat: { alignItems: "flex-start" },
  statNumber: { fontSize: 22, fontWeight: "800", color: "#FFFFFF" },
  statLabel: { fontSize: 11, color: "#F3E6DE", marginTop: 2, textTransform: "uppercase", letterSpacing: 0.5 },
  statDivider: { width: 1, height: 26, backgroundColor: "rgba(255,255,255,0.3)" },
  heroActions: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 24 },
  heroPrimaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 13,
    paddingHorizontal: 22,
  },
  heroPrimaryButtonText: { color: colors.onPrimary, fontSize: 14, fontWeight: "700" },
  heroSecondaryButton: {
    borderRadius: 12,
    paddingVertical: 13,
    paddingHorizontal: 22,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.6)",
  },
  heroSecondaryButtonText: { color: "#FFFFFF", fontSize: 14, fontWeight: "700" },

  band: { width: "100%" },
  bandCream: { backgroundColor: colors.surface },
  bandWhite: { backgroundColor: colors.background },
  page: { padding: 20, paddingVertical: 32, gap: 16 },
  pageDesktop: { maxWidth: 1100, width: "100%", alignSelf: "center", paddingHorizontal: 32 },

  aboutRow: { flexDirection: "row", alignItems: "center", gap: 16 },
  aboutTextCol: { flex: 1 },
  aboutTitle: { fontSize: 15, fontWeight: "700", color: colors.text },
  aboutBody: { fontSize: 13.5, color: colors.textMid, marginTop: 6, lineHeight: 20 },

  sectionLabel: { fontSize: 20, fontWeight: "800", color: colors.text },
  featuresGrid: { gap: 12, marginTop: 4 },
  featuresGridDesktop: { flexDirection: "row", flexWrap: "wrap" },
  featureCard: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  featureCardDesktop: { width: "23.5%", marginRight: "2%" },
  featureTitle: { fontSize: 14, fontWeight: "700", color: colors.text, marginTop: 8 },
  featureBody: { fontSize: 12, color: colors.textMid, marginTop: 4, lineHeight: 17 },

  cameraCard: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 18,
    marginTop: 8,
  },
  cameraCardTitle: { color: colors.onPrimary, fontSize: 18, fontWeight: "700" },
  cameraCardBody: { color: colors.onPrimary, fontSize: 13, marginTop: 4, opacity: 0.9 },

  carousel: { gap: 12, paddingRight: 8, paddingVertical: 4 },
  featuredGridDesktop: { flexDirection: "row", flexWrap: "wrap", gap: 16 },
  featuredCard: {
    width: 180,
    height: 220,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: colors.surfaceRaised,
  },
  featuredCardWide: { width: "23%", height: 240 },
  // FeaturedCard itself fills whichever box its FadeInItem wrapper is sized
  // to (featuredCard or featuredCardWide) — it doesn't set its own width/
  // height, since a nested percentage would resolve against that already-
  // percentage-sized wrapper and compound (23% of 23%) instead of the grid.
  featuredCardFill: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: colors.surfaceRaised,
  },
  featuredImage: { width: "100%", height: "100%" },
  featuredOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 12,
    backgroundColor: "rgba(32,22,19,0.35)",
  },
  featuredCity: {
    fontSize: 10,
    fontWeight: "700",
    color: "#FFFFFF",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    opacity: 0.9,
  },
  featuredTitle: { fontSize: 17, fontWeight: "700", color: "#FFFFFF", marginTop: 2 },
  featuredMeta: { fontSize: 11, color: "#FFFFFF", marginTop: 4, opacity: 0.9 },

  stepsCard: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  stepsTitle: { fontSize: 16, fontWeight: "700", color: colors.text },
  step: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
  stepNumber: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.onPrimary,
    backgroundColor: colors.primary,
    width: 22,
    height: 22,
    borderRadius: 11,
    textAlign: "center",
    lineHeight: 22,
    overflow: "hidden",
  },
  stepText: { flex: 1, fontSize: 14, color: colors.textMid, lineHeight: 20 },

  pricingGrid: { gap: 12 },
  pricingGridDesktop: { flexDirection: "row" },
  priceCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  priceCardHighlighted: { backgroundColor: colors.surfaceRaised, borderColor: colors.primary },
  priceCardBadge: {
    fontSize: 10,
    fontWeight: "800",
    color: colors.primary,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  priceCardTitle: { fontSize: 14, fontWeight: "700", color: colors.text },
  priceCardAmount: { fontSize: 26, fontWeight: "800", color: colors.primary, marginTop: 6 },
  priceCardBody: { fontSize: 12, color: colors.textMid, marginTop: 6, lineHeight: 17 },

  ctaBand: {
    backgroundColor: colors.primary,
    paddingVertical: 44,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  ctaTitle: { fontSize: 24, fontWeight: "800", color: colors.onPrimary, textAlign: "center" },
  ctaBody: { fontSize: 14, color: colors.onPrimary, opacity: 0.9, marginTop: 6, textAlign: "center" },
  ctaButton: {
    marginTop: 18,
    backgroundColor: colors.onPrimary,
    borderRadius: 12,
    paddingVertical: 13,
    paddingHorizontal: 24,
  },
  ctaButtonText: { color: colors.primary, fontSize: 14, fontWeight: "800" },

  footer: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: "center",
    gap: 10,
    backgroundColor: colors.background,
  },
  footerBrand: { fontSize: 16, fontWeight: "800", color: colors.primary },
  footerLinks: { flexDirection: "row", gap: 18, flexWrap: "wrap", justifyContent: "center" },
  footerLink: { fontSize: 12.5, color: colors.textDim, textDecorationLine: "underline" },
  footerCopy: { fontSize: 11, color: colors.textFaint, marginTop: 4 },
  });
}

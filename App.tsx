import {
  DarkTheme as NavDarkTheme,
  DefaultTheme as NavDefaultTheme,
  NavigationContainer,
  createNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Alert, Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ErrorBoundary from "./src/components/ErrorBoundary";
import LanguageGate from "./src/components/LanguageGate";
import { LanguageProvider, useLanguage } from "./src/i18n/LanguageContext";
import { ThemeProvider, useTheme } from "./src/ThemeContext";
import MainTabNavigator from "./src/navigation/MainTabNavigator";
import TourPreviewScreen from "./src/screens/TourPreviewScreen";
import ActiveTourScreen from "./src/screens/ActiveTourScreen";
import CameraTourScreen from "./src/screens/CameraTourScreen";
import ARCameraScreen from "./src/screens/ARCameraScreen";
import PrivacyPolicyScreen from "./src/screens/PrivacyPolicyScreen";
import TermsOfServiceScreen from "./src/screens/TermsOfServiceScreen";
import ComingSoonScreen from "./src/screens/ComingSoonScreen";
import ContactUsScreen from "./src/screens/ContactUsScreen";
import LeaderboardsScreen from "./src/screens/LeaderboardsScreen";
import MyPhotosScreen from "./src/screens/MyPhotosScreen";
import TourGalleryScreen from "./src/screens/TourGalleryScreen";
import DuoLobbyScreen from "./src/screens/DuoLobbyScreen";
import type { RootStackParamList } from "./src/navigation/types";
import { getAreaById } from "./src/content";
import { useAccountStore } from "./src/account/accountStore";
import { isOnline } from "./src/offline/connectivity";
import { startCompletionSync } from "./src/social/completions";
import { useHealthStore } from "./src/health/healthPreference";
import { isTourOffline, useOfflineStore } from "./src/offline/offlineStore";
import { saveAppShell } from "./src/offline/tourFiles";
import { useTourStore } from "./src/state/tourStore";
import { localizedAreaText } from "./src/i18n/areaTranslations";
import { localizedCityName } from "./src/i18n/cityNames";
import { notifySuccess } from "./src/haptics";
import { consumePendingPurchase, grantSubscription, grantTourPurchase } from "./src/purchases/entitlements";
import { consumePurchaseReturnParam } from "./src/purchases/stripeConfig";

const Stack = createNativeStackNavigator<RootStackParamList>();
const navigationRef = createNavigationContainerRef<RootStackParamList>();

async function handlePurchaseReturn(t: (key: string, vars?: Record<string, string | number>) => string) {
  const result = consumePurchaseReturnParam();
  if (!result) return;

  if (result.kind === "tour") {
    const tourId = await consumePendingPurchase();
    if (!tourId) return;
    await grantTourPurchase(tourId);
    notifySuccess();
    const area = getAreaById(tourId);
    Alert.alert(
      t("purchase.completeTitle"),
      t("purchase.completeBody", { name: area?.name ?? t("purchase.thisTour") })
    );
    if (navigationRef.isReady()) {
      navigationRef.navigate("TourPreview", { areaId: tourId });
    }
    return;
  }

  await grantSubscription(result.kind);
  notifySuccess();
  Alert.alert(
    t("purchase.subscriptionActiveTitle"),
    result.kind === "weekly" ? t("purchase.weeklyActiveBody") : t("purchase.monthlyActiveBody")
  );
}

/** Offline tours: the service worker (live web build only, so the dev server
 * never serves stale files), the downloads list, and, when any tour is
 * downloaded and there's a connection, a fresh saved copy of the app so an
 * offline visit always opens the current version. */
async function startOffline() {
  if (Platform.OS === "web" && !__DEV__ && typeof navigator !== "undefined" && "serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js").catch((e) => console.warn("[offline] service worker:", e));
  }
  await useOfflineStore.getState().load();
  const anyDownloaded = Object.values(useOfflineStore.getState().tours).some((t) => isTourOffline(t) && !t.bundled);
  if (anyDownloaded && isOnline()) void saveAppShell();
}

type Translate = ReturnType<typeof useLanguage>["t"];

const SECTION_TITLE_KEYS: Record<string, string> = {
  Map: "nav.map",
  Tours: "nav.tours",
  Account: "nav.account",
  Help: "nav.help",
  FoodStep: "foodStep.title",
  FoodStepCity: "foodStep.title",
  FoodStepMap: "foodStep.title",
  PrivacyPolicy: "home.footerPrivacy",
  TermsOfService: "home.footerTerms",
  ContactUs: "help.contactUs",
  Leaderboards: "leaderboards.title",
  MyPhotos: "photos.myTitle",
  DuoLobby: "duo.title",
};

/** The browser tab title for a screen (web only). Tour screens match the
 * static tour pages written by scripts/build-tour-pages.ts. */
function pageTitle(routeName: string | undefined, params: unknown, t: Translate, language: string): string {
  const areaId = (params as { areaId?: string } | undefined)?.areaId;
  const area = areaId ? getAreaById(areaId) : undefined;
  if (area) {
    return t("pageTitle.tour", {
      tour: localizedAreaText(area.id, language, area).name,
      city: localizedCityName(area.city, language),
    });
  }
  const key = routeName ? SECTION_TITLE_KEYS[routeName] : undefined;
  return key ? t("pageTitle.section", { section: t(key) }) : t("pageTitle.home");
}

function AppInner() {
  const { language, t } = useLanguage();
  useEffect(() => {
    void useAccountStore.getState().load();
    void useTourStore.getState().restoreLastLocation();
    void startOffline();
    // Finished tours made offline or before signing in get sent when possible.
    startCompletionSync();
    void useHealthStore.getState().load();
  }, []);
  const { colors, isDark } = useTheme();
  const navTheme = isDark ? NavDarkTheme : NavDefaultTheme;
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <NavigationContainer
        ref={navigationRef}
        documentTitle={{
          enabled: Platform.OS === "web",
          formatter: (_options, route) => pageTitle(route?.name, route?.params, t, language),
        }}
        linking={{
          // Real web addresses, so a printed QR code can open a specific page:
          //   /tours                    -> the Tours tab (Oxford is listed first)
          //   /tour/oxford-magdalen     -> straight to a tour's page
          // Anything unrecognised falls back to the home page as before.
          enabled: Platform.OS === "web",
          prefixes: [],
          config: {
            screens: {
              MainTabs: {
                path: "",
                screens: {
                  Home: "",
                  Map: "map",
                  Tours: "tours",
                  Account: "account",
                  Help: "help",
                  FoodStep: "foodstep",
                  FoodStepCity: "foodstep/:cityId",
                  FoodStepMap: "foodstep/:cityId/:cuisineId",
                },
              },
              TourPreview: "tour/:areaId",
              TourGallery: "tour/:areaId/gallery",
              Leaderboards: "leaderboards",
              MyPhotos: "tour-photos",
              // An invite link: storystep.site/walk-together/ABC123 (also what the QR code holds).
              DuoLobby: "walk-together/:code?",
            },
          },
        }}
        onReady={() => handlePurchaseReturn(t)}
        theme={{
          ...navTheme,
          colors: { ...navTheme.colors, background: colors.background, card: colors.surface, text: colors.text, border: colors.border, primary: colors.primary },
        }}
      >
        <Stack.Navigator
          initialRouteName="MainTabs"
          screenOptions={{ headerShown: false, animation: "fade", animationDuration: 200 }}
        >
          <Stack.Screen name="MainTabs" component={MainTabNavigator} />
          <Stack.Screen name="TourPreview" component={TourPreviewScreen} />
          <Stack.Screen name="ActiveTour" component={ActiveTourScreen} />
          <Stack.Screen
            name="CameraTour"
            component={CameraTourScreen}
            options={{ presentation: "fullScreenModal" }}
          />
          <Stack.Screen
            name="ARCamera"
            component={ARCameraScreen}
            options={{ presentation: "fullScreenModal" }}
          />
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
          <Stack.Screen name="TermsOfService" component={TermsOfServiceScreen} />
          <Stack.Screen name="ComingSoon" component={ComingSoonScreen} />
          <Stack.Screen name="ContactUs" component={ContactUsScreen} />
          <Stack.Screen name="Leaderboards" component={LeaderboardsScreen} />
          <Stack.Screen name="MyPhotos" component={MyPhotosScreen} />
          <Stack.Screen name="TourGallery" component={TourGalleryScreen} />
          <Stack.Screen name="DuoLobby" component={DuoLobbyScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <LanguageGate />
    </GestureHandlerRootView>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <LanguageProvider>
          <AppInner />
        </LanguageProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

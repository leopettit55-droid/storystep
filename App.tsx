import {
  DarkTheme as NavDarkTheme,
  DefaultTheme as NavDefaultTheme,
  NavigationContainer,
  createNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Alert } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ErrorBoundary from "./src/components/ErrorBoundary";
import { LanguageProvider, useLanguage } from "./src/i18n/LanguageContext";
import { ThemeProvider, useTheme } from "./src/ThemeContext";
import MainTabNavigator from "./src/navigation/MainTabNavigator";
import TourPreviewScreen from "./src/screens/TourPreviewScreen";
import GetToStartScreen from "./src/screens/GetToStartScreen";
import ActiveTourScreen from "./src/screens/ActiveTourScreen";
import CameraTourScreen from "./src/screens/CameraTourScreen";
import ARCameraScreen from "./src/screens/ARCameraScreen";
import PrivacyPolicyScreen from "./src/screens/PrivacyPolicyScreen";
import TermsOfServiceScreen from "./src/screens/TermsOfServiceScreen";
import ComingSoonScreen from "./src/screens/ComingSoonScreen";
import ContactUsScreen from "./src/screens/ContactUsScreen";
import type { RootStackParamList } from "./src/navigation/types";
import { getAreaById } from "./src/content";
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

function AppInner() {
  const { t } = useLanguage();
  const { colors, isDark } = useTheme();
  const navTheme = isDark ? NavDarkTheme : NavDefaultTheme;
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <NavigationContainer
        ref={navigationRef}
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
          <Stack.Screen name="GetToStart" component={GetToStartScreen} />
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
        </Stack.Navigator>
      </NavigationContainer>
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

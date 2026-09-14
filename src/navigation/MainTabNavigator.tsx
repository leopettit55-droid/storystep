import { Ionicons } from "@expo/vector-icons";
import { BottomTabBar, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useWindowDimensions } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import ExploreMapScreen from "../screens/ExploreMapScreen";
import AreaSelectScreen from "../screens/AreaSelectScreen";
import AccountScreen from "../screens/AccountScreen";
import HelpScreen from "../screens/HelpScreen";
import { useLanguage } from "../i18n/LanguageContext";
import { useTheme } from "../ThemeContext";
import { DESKTOP_BREAKPOINT } from "../theme";
import DesktopTopBar from "./DesktopTopBar";
import type { MainTabParamList } from "./types";

const Tab = createBottomTabNavigator<MainTabParamList>();

const ICONS: Record<keyof MainTabParamList, keyof typeof Ionicons.glyphMap> = {
  Home: "home",
  Map: "globe",
  Tours: "list",
  Account: "person",
  Help: "help-circle",
};

const LABEL_KEYS: Record<keyof MainTabParamList, string> = {
  Home: "nav.home",
  Map: "nav.map",
  Tours: "nav.tours",
  Account: "nav.account",
  Help: "nav.help",
};

export default function MainTabNavigator() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= DESKTOP_BREAKPOINT;
  const { t } = useLanguage();
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textFaint,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
        },
        tabBarLabel: t(LABEL_KEYS[route.name as keyof MainTabParamList]),
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons
            name={focused ? ICONS[route.name] : (`${ICONS[route.name]}-outline` as keyof typeof Ionicons.glyphMap)}
            color={color}
            size={size}
          />
        ),
      })}
      tabBar={(props) => (isDesktop ? <DesktopTopBar {...props} /> : <BottomTabBar {...props} />)}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Map" component={ExploreMapScreen} />
      <Tab.Screen name="Tours" component={AreaSelectScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
      <Tab.Screen name="Help" component={HelpScreen} />
    </Tab.Navigator>
  );
}

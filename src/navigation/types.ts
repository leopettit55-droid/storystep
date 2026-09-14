import type { CompositeNavigationProp } from "@react-navigation/native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type MainTabParamList = {
  Home: undefined;
  Map: undefined;
  Tours: undefined;
  Account: undefined;
  Help: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
  TourPreview: { areaId: string };
  GetToStart: { areaId: string };
  ActiveTour: { areaId: string };
  CameraTour: undefined;
  ARCamera: { areaId: string; orientationGranted: boolean };
  PrivacyPolicy: undefined;
  TermsOfService: undefined;
  ComingSoon: { cityName: string };
  ContactUs: undefined;
};

/** Navigation prop for a screen living inside a MainTabs tab that also needs
 * to push root-level screens (TourPreview, CameraTour, etc). */
export type TabScreenNav<T extends keyof MainTabParamList> = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, T>,
  NativeStackNavigationProp<RootStackParamList>
>;

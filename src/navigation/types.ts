import type { CompositeNavigationProp } from "@react-navigation/native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type MainTabParamList = {
  /** intro: show the landing podium again, even if it was already seen this visit. */
  Home: { intro?: boolean } | undefined;
  Map: undefined;
  Tours: undefined;
  Account: undefined;
  Help: undefined;
  /** FoodStep's city picker. Hidden from the tab bars; reached from the landing podium. */
  FoodStep: undefined;
  /** A FoodStep city's cuisines. */
  FoodStepCity: { cityId: string };
  /** A cuisine in a FoodStep city, on the 3D map. */
  /** demo: "1" puts "you" at a fixed spot in the city, for testing GPS from elsewhere. */
  FoodStepMap: { cityId: string; cuisineId: string; demo?: string };
};

export type RootStackParamList = {
  MainTabs: undefined;
  TourPreview: { areaId: string };
  /** resume: continue from progress already loaded into the tour store. */
  ActiveTour: { areaId: string; resume?: boolean; duo?: string };
  CameraTour: { areaId?: string } | undefined;
  ARCamera: { areaId: string; orientationGranted: boolean; mode?: "tour" | "scanner" };
  PrivacyPolicy: undefined;
  TermsOfService: undefined;
  ComingSoon: { cityName: string };
  ContactUs: undefined;
  /** Account tab → Leaderboards. */
  Leaderboards: undefined;
  /** Tours tab → Tour photos: your own shared photos. */
  MyPhotos: undefined;
  /** A tour's public photo gallery. */
  TourGallery: { areaId: string };
  /** Walk with a friend: invite (from a tour, areaId) or join (an invite link, code). */
  DuoLobby: { areaId?: string; code?: string } | undefined;
};

/** Navigation prop for a screen living inside a MainTabs tab that also needs
 * to push root-level screens (TourPreview, CameraTour, etc). */
export type TabScreenNav<T extends keyof MainTabParamList> = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, T>,
  NativeStackNavigationProp<RootStackParamList>
>;

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AreaSelectScreen from "./src/screens/AreaSelectScreen";
import TourPreviewScreen from "./src/screens/TourPreviewScreen";
import GetToStartScreen from "./src/screens/GetToStartScreen";
import ActiveTourScreen from "./src/screens/ActiveTourScreen";
import type { RootStackParamList } from "./src/navigation/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="AreaSelect"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="AreaSelect" component={AreaSelectScreen} />
          <Stack.Screen name="TourPreview" component={TourPreviewScreen} />
          <Stack.Screen name="GetToStart" component={GetToStartScreen} />
          <Stack.Screen name="ActiveTour" component={ActiveTourScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

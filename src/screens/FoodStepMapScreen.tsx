import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import FoodStepList from "../components/FoodStepList";
import { getFoodStepCity, getFoodStepCuisine } from "../content/foodStep";
import { useLanguage } from "../i18n/LanguageContext";
import type { MainTabParamList, TabScreenNav } from "../navigation/types";

type Nav = TabScreenNav<"FoodStepMap">;

/** The 3D map is web-only (like StoryStep's Explore Map), so the app just
 * says what's coming, with the way back. */
export default function FoodStepMapScreen() {
  const navigation = useNavigation<Nav>();
  const { params } = useRoute<RouteProp<MainTabParamList, "FoodStepMap">>();
  const { t } = useLanguage();
  const city = getFoodStepCity(params.cityId);
  const cuisine = city && getFoodStepCuisine(city, params.cuisineId);

  return (
    <FoodStepList
      title={city && cuisine ? t("foodStep.mapTitle", { cuisine: cuisine.name, city: city.name }) : t("foodStep.title")}
      subtitle={t("foodStep.mapAppOnly")}
      sectionTitle=""
      items={[]}
      onBack={() => navigation.navigate("Home", { intro: true })}
    />
  );
}

import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import FoodStepList from "../components/FoodStepList";
import { cuisinesFor, getFoodStepCity } from "../content/foodStep";
import { useLanguage } from "../i18n/LanguageContext";
import type { MainTabParamList, TabScreenNav } from "../navigation/types";

type Nav = TabScreenNav<"FoodStepCity">;

/** A FoodStep city: pick a cuisine to explore. */
export default function FoodStepCityScreen() {
  const navigation = useNavigation<Nav>();
  const { params } = useRoute<RouteProp<MainTabParamList, "FoodStepCity">>();
  const { t } = useLanguage();
  const city = getFoodStepCity(params.cityId);
  const backToCities = () => navigation.navigate("FoodStep");

  // A mistyped address: show the empty list, with the way back.
  if (!city) {
    return (
      <FoodStepList
        title={t("foodStep.title")}
        subtitle={t("foodStep.cityNotFound")}
        sectionTitle=""
        items={[]}
        onBack={backToCities}
      />
    );
  }

  return (
    <FoodStepList
      title={t("foodStep.cuisinesTitle", { city: city.name })}
      subtitle={t("foodStep.cuisinesSubtitle")}
      sectionTitle={t("foodStep.cuisinesSection")}
      onBack={backToCities}
      items={cuisinesFor(city).map((cuisine) => ({
        id: cuisine.id,
        title: cuisine.name,
        description: cuisine.description,
        onPress: () => navigation.navigate("FoodStepMap", { cityId: city.id, cuisineId: cuisine.id }),
      }))}
    />
  );
}

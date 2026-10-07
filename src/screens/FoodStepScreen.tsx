import { useNavigation } from "@react-navigation/native";
import FoodStepList from "../components/FoodStepList";
import { FOODSTEP_CITIES } from "../content/foodStep";
import { useLanguage } from "../i18n/LanguageContext";
import type { TabScreenNav } from "../navigation/types";

type Nav = TabScreenNav<"FoodStep">;

/** FoodStep's front page: pick a city. */
export default function FoodStepScreen() {
  const navigation = useNavigation<Nav>();
  const { t } = useLanguage();

  return (
    <FoodStepList
      title={t("foodStep.title")}
      subtitle={t("foodStep.subtitle")}
      sectionTitle={t("foodStep.citiesTitle")}
      // Back to the landing podium, where FoodStep was picked.
      onBack={() => navigation.navigate("Home", { intro: true })}
      items={FOODSTEP_CITIES.map((city) => ({
        id: city.id,
        title: city.name,
        description: city.description,
        onPress: () => navigation.navigate("FoodStepCity", { cityId: city.id }),
      }))}
    />
  );
}

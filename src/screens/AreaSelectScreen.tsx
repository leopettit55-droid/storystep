import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { areas } from "../content";
import type { Area } from "../content";
import type { RootStackParamList } from "../navigation/types";

type Nav = NativeStackNavigationProp<RootStackParamList, "AreaSelect">;

export default function AreaSelectScreen() {
  const navigation = useNavigation<Nav>();

  const renderItem = ({ item }: { item: Area }) => {
    const disabled = !item.isContentComplete;
    return (
      <Pressable
        disabled={disabled}
        onPress={() =>
          navigation.navigate("TourPreview", { areaId: item.id })
        }
        style={({ pressed }) => [
          styles.card,
          disabled && styles.cardDisabled,
          pressed && !disabled && styles.cardPressed,
        ]}
      >
        <View style={styles.cardHeaderRow}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          {disabled && <Text style={styles.badge}>Coming soon</Text>}
        </View>
        <Text style={styles.cardDescription}>{item.description}</Text>
        {!disabled && (
          <Text style={styles.cardMeta}>
            {item.estimatedDurationMin} min · {item.estimatedDistanceKm} km ·{" "}
            {item.difficulty}
          </Text>
        )}
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>StoryStep</Text>
        <Text style={styles.subtitle}>
          Pick a neighbourhood. Put your headphones in, walk, and let it
          guide you.
        </Text>
      </View>
      <FlatList
        data={areas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F1115" },
  header: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 4 },
  title: { fontSize: 32, fontWeight: "700", color: "#fff" },
  subtitle: { fontSize: 14, color: "#9AA1AC", marginTop: 4 },
  list: { padding: 16, gap: 12 },
  card: {
    backgroundColor: "#1A1D24",
    borderRadius: 16,
    padding: 16,
  },
  cardPressed: { opacity: 0.7 },
  cardDisabled: { opacity: 0.4 },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: { fontSize: 20, fontWeight: "600", color: "#fff" },
  badge: {
    fontSize: 11,
    color: "#9AA1AC",
    borderWidth: 1,
    borderColor: "#3A3F4B",
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  cardDescription: { fontSize: 14, color: "#C4C9D2", marginTop: 6 },
  cardMeta: { fontSize: 12, color: "#7B8798", marginTop: 8 },
});

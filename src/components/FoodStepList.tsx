import { useMemo } from "react";
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { FOODSTEP_GREEN } from "../content/sisterProducts";
import { useTheme } from "../ThemeContext";
import { CONTENT_MAX_WIDTH, DESKTOP_BREAKPOINT, type ThemeColors } from "../theme";
import BackButton from "./BackButton";

export interface FoodStepListItem {
  id: string;
  title: string;
  description: string;
  onPress: () => void;
}

interface Props {
  title: string;
  subtitle: string;
  sectionTitle: string;
  items: FoodStepListItem[];
  onBack: () => void;
}

/** The layout every FoodStep list page shares (cities, then a city's
 * cuisines): StoryStep's Tours list, in FoodStep green. One column on a phone,
 * two on desktop. */
export default function FoodStepList({ title, subtitle, sectionTitle, items, onBack }: Props) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const columns = useWindowDimensions().width >= DESKTOP_BREAKPOINT ? 2 : 1;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton variant="inline" style={styles.back} onPress={onBack} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <FlatList
        // FlatList can't change its column count in place.
        key={columns}
        numColumns={columns}
        columnWrapperStyle={columns > 1 ? styles.row : undefined}
        data={items}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<Text style={styles.sectionHeader}>{sectionTitle}</Text>}
        renderItem={({ item }) => (
          <Pressable
            onPress={item.onPress}
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
          >
            <View style={styles.thumb}>
              <Text style={styles.thumbText}>{item.title[0]}</Text>
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription} numberOfLines={2}>
                {item.description}
              </Text>
            </View>
          </Pressable>
        )}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

// Sizes and spacing match AreaSelectScreen, so the two products line up.
function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 4, width: "100%", maxWidth: CONTENT_MAX_WIDTH, alignSelf: "center" },
    back: { marginBottom: 12 },
    title: { fontSize: 32, fontWeight: "700", color: FOODSTEP_GREEN },
    subtitle: { fontSize: 14, color: colors.textMid, marginTop: 4 },
    list: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 32, width: "100%", maxWidth: CONTENT_MAX_WIDTH, alignSelf: "center" },
    row: { gap: 12 },
    sectionHeader: {
      fontSize: 13,
      fontWeight: "700",
      color: FOODSTEP_GREEN,
      textTransform: "uppercase",
      letterSpacing: 0.6,
      marginTop: 12,
      marginBottom: 8,
    },
    // A see-through green tint, so it reads as pale green in light and dark mode alike.
    card: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: "rgba(60,185,79,0.08)",
      borderRadius: 16,
      padding: 10,
      borderWidth: 1,
      borderColor: "rgba(60,185,79,0.35)",
      marginBottom: 12,
      gap: 12,
    },
    cardPressed: { opacity: 0.7 },
    thumb: {
      width: 76,
      height: 76,
      borderRadius: 12,
      backgroundColor: FOODSTEP_GREEN,
      alignItems: "center",
      justifyContent: "center",
    },
    thumbText: { fontSize: 26, fontWeight: "700", color: "#FFFFFF" },
    cardBody: { flex: 1, justifyContent: "center" },
    cardTitle: { fontSize: 17, fontWeight: "700", color: colors.text, flexShrink: 1 },
    cardDescription: { fontSize: 12.5, color: colors.textMid, marginTop: 3, lineHeight: 17 },
  });
}

import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  title: string;
  body: string;
  note?: string;
  /** True while the narrator is speaking this landmark. */
  speaking: boolean;
  onStop: () => void;
  /** Other candidates, in case the top guess was wrong. */
  alternatives: { id: string; name: string }[];
  onPickAlternative: (id: string) => void;
  /** Explains a weaker result (no GPS, picture unreadable…). */
  hint?: string;
}

/** The scanner's answer card, shown over the camera view. */
export default function LandmarkResultCard({
  title,
  body,
  note,
  speaking,
  onStop,
  alternatives,
  onPickAlternative,
  hint,
}: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        {speaking && (
          <Pressable style={styles.stopButton} onPress={onStop} hitSlop={8} accessibilityLabel="Stop speaking">
            <Ionicons name="stop" size={14} color="#fff" />
            <Text style={styles.stopText}>Stop</Text>
          </Pressable>
        )}
      </View>
      {speaking && <Text style={styles.speaking}>Speaking — your tour is paused and resumes afterwards</Text>}
      {note && <Text style={styles.note}>{note}</Text>}
      <Text style={styles.body} numberOfLines={5}>
        {body}
      </Text>
      {hint && <Text style={styles.hint}>{hint}</Text>}
      {alternatives.length > 0 && (
        <View style={styles.altSection}>
          <Text style={styles.altLabel}>Not right? Did you mean</Text>
          <View style={styles.altRow}>
            {alternatives.map((alt) => (
              <Pressable key={alt.id} style={styles.altChip} onPress={() => onPickAlternative(alt.id)}>
                <Text style={styles.altChipText} numberOfLines={1}>
                  {alt.name}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignSelf: "stretch",
    backgroundColor: "rgba(10,10,10,0.8)",
    borderRadius: 16,
    padding: 14,
    gap: 6,
  },
  headerRow: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 10 },
  title: { flex: 1, color: "#fff", fontSize: 17, fontWeight: "700" },
  stopButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 14,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  stopText: { color: "#fff", fontSize: 12, fontWeight: "700" },
  speaking: { color: "#ffd9a8", fontSize: 11 },
  note: { color: "#ffb3a0", fontSize: 12, fontWeight: "600" },
  body: { color: "rgba(255,255,255,0.85)", fontSize: 13, lineHeight: 18 },
  hint: { color: "rgba(255,255,255,0.55)", fontSize: 11 },
  altSection: { marginTop: 4, gap: 6 },
  altLabel: { color: "rgba(255,255,255,0.6)", fontSize: 11 },
  altRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  altChip: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 14,
    paddingVertical: 6,
    paddingHorizontal: 12,
    maxWidth: "100%",
  },
  altChipText: { color: "#fff", fontSize: 12, fontWeight: "600" },
});

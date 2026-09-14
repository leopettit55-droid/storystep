import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Pressable, SafeAreaView, StyleSheet, Text } from "react-native";
import type { RootStackParamList } from "../navigation/types";

type Nav = NativeStackNavigationProp<RootStackParamList, "ARCamera">;

/** The AR camera guide (getUserMedia + device orientation + WebGL camera
 * passthrough) is web-only for now — no native equivalent yet. */
export default function ARCameraScreen() {
  const navigation = useNavigation<Nav>();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>AR camera guide isn't available on this device yet.</Text>
      <Text style={styles.body}>The narration keeps playing — head back to continue the tour.</Text>
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back to tour</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", alignItems: "center", justifyContent: "center", padding: 32, gap: 12 },
  title: { color: "#fff", fontSize: 18, fontWeight: "700", textAlign: "center" },
  body: { color: "rgba(255,255,255,0.7)", fontSize: 14, textAlign: "center" },
  backButton: { marginTop: 16, backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 14, paddingVertical: 14, paddingHorizontal: 28 },
  backButtonText: { color: "#fff", fontSize: 15, fontWeight: "600" },
});

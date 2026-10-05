import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { useHealthStore } from "../health/healthPreference";
import { useLanguage } from "../i18n/LanguageContext";
import { useTheme } from "../ThemeContext";
import type { ThemeColors } from "../theme";
import PressScale from "./PressScale";

/**
 * Account → Apple Health (iPhone app only): connect so each tour's steps and
 * distance come from Health and the walk is saved there as a workout. Right
 * after creating an account it's offered with a Connect / Not now choice;
 * after that it's a switch.
 */
export default function AppleHealthCard() {
  const { t } = useLanguage();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const available = useHealthStore((s) => s.available);
  const connected = useHealthStore((s) => s.connected);
  const asked = useHealthStore((s) => s.asked);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    void useHealthStore.getState().load();
  }, []);

  if (!available) return null;

  const connect = async () => {
    setBusy(true);
    await useHealthStore.getState().connect();
    setBusy(false);
  };

  return (
    <View style={[styles.card, !asked && styles.offer]}>
      <View style={styles.row}>
        <View style={styles.icon}>
          <Ionicons name="heart" size={18} color="#FFFFFF" />
        </View>
        <View style={styles.text}>
          <Text style={styles.title}>{t("health.title")}</Text>
          <Text style={styles.body}>{t(connected ? "health.connectedBody" : "health.body")}</Text>
        </View>
        {asked && (
          <Switch
            value={connected}
            disabled={busy}
            onValueChange={(on) => (on ? void connect() : void useHealthStore.getState().disconnect())}
            trackColor={{ false: colors.border, true: "#FF2D55" }}
            thumbColor="#FFFFFF"
            aria-label={t("health.title")}
          />
        )}
      </View>
      {!asked && (
        <View style={styles.buttons}>
          <PressScale style={styles.connect} scaleTo={0.96} onPress={connect} disabled={busy}>
            <Text style={styles.connectText}>{t("health.connect")}</Text>
          </PressScale>
          <PressScale style={styles.later} scaleTo={0.96} onPress={() => void useHealthStore.getState().dismiss()}>
            <Text style={styles.laterText}>{t("health.notNow")}</Text>
          </PressScale>
        </View>
      )}
    </View>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    card: { backgroundColor: colors.surface, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: 16, gap: 12 },
    offer: { borderColor: "#FF2D55" },
    row: { flexDirection: "row", alignItems: "center", gap: 12 },
    icon: { width: 36, height: 36, borderRadius: 10, backgroundColor: "#FF2D55", alignItems: "center", justifyContent: "center" },
    text: { flex: 1, gap: 2 },
    title: { color: colors.text, fontSize: 16, fontWeight: "700" },
    body: { color: colors.textMid, fontSize: 13, lineHeight: 18 },
    buttons: { flexDirection: "row", gap: 10 },
    connect: { flex: 1, backgroundColor: "#FF2D55", borderRadius: 12, paddingVertical: 12, alignItems: "center" },
    connectText: { color: "#FFFFFF", fontWeight: "700", fontSize: 15 },
    later: { paddingVertical: 12, paddingHorizontal: 16, alignItems: "center" },
    laterText: { color: colors.textMid, fontWeight: "600", fontSize: 15 },
  });
}

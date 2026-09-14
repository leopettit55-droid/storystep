import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";
import { tapLight } from "../haptics";
import { useLanguage } from "../i18n/LanguageContext";
import { LANGUAGES } from "../i18n/languages";
import { useTheme } from "../ThemeContext";
import type { ThemeColors } from "../theme";

interface Props {
  /** "compact" shows just a globe icon + code (fits a top bar); "full" shows
   * the language name too (fits a settings-style row on the Account screen). */
  variant?: "compact" | "full";
  /** Use "light" over a dark/photo background (e.g. the homepage hero) so the
   * trigger stays readable — swaps the border/text/icon to white. */
  tone?: "default" | "light";
  style?: StyleProp<ViewStyle>;
}

export default function LanguagePicker({ variant = "compact", tone = "default", style }: Props) {
  const { language, setLanguage, t } = useLanguage();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [open, setOpen] = useState(false);

  const current = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];
  const isLight = tone === "light";

  return (
    <>
      <Pressable style={[styles.trigger, isLight && styles.triggerLight, style]} onPress={() => setOpen(true)}>
        <Ionicons name="globe-outline" size={16} color={isLight ? "#FFFFFF" : colors.textMid} />
        {variant === "full" ? (
          <Text style={[styles.triggerLabelFull, isLight && styles.triggerTextLight]}>
            {current.nativeName}
          </Text>
        ) : (
          <Text style={[styles.triggerLabel, isLight && styles.triggerTextLight]}>
            {current.code.toUpperCase()}
          </Text>
        )}
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.sheetTitle}>{t("language.title")}</Text>
            <FlatList
              data={LANGUAGES}
              keyExtractor={(item) => item.code}
              style={styles.list}
              renderItem={({ item }) => {
                const active = item.code === language;
                return (
                  <Pressable
                    style={[styles.row, active && styles.rowActive]}
                    onPress={() => {
                      tapLight();
                      setLanguage(item.code);
                      setOpen(false);
                    }}
                  >
                    <Text style={[styles.rowNative, active && styles.rowTextActive]}>
                      {item.nativeName}
                    </Text>
                    <Text style={[styles.rowEnglish, active && styles.rowTextActive]}>
                      {item.englishName}
                    </Text>
                    {active && <Ionicons name="checkmark" size={18} color={colors.primary} />}
                  </Pressable>
                );
              }}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    trigger: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    triggerLight: { borderColor: "rgba(255,255,255,0.6)" },
    triggerTextLight: { color: "#FFFFFF" },
    triggerLabel: { fontSize: 12, fontWeight: "700", color: colors.textMid },
    triggerLabelFull: { fontSize: 13, fontWeight: "600", color: colors.text },
    backdrop: {
      flex: 1,
      backgroundColor: "rgba(20,12,10,0.5)",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
    },
    sheet: {
      backgroundColor: colors.background,
      borderRadius: 16,
      padding: 16,
      width: "100%",
      maxWidth: 380,
      maxHeight: "80%",
    },
    sheetTitle: { fontSize: 16, fontWeight: "700", color: colors.text, marginBottom: 8 },
    list: { flexGrow: 0 },
    row: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderRadius: 10,
      gap: 10,
    },
    rowActive: { backgroundColor: colors.surfaceRaised },
    rowNative: { fontSize: 15, fontWeight: "600", color: colors.text },
    rowEnglish: { fontSize: 12, color: colors.textDim, flex: 1 },
    rowTextActive: { color: colors.primary },
  });
}

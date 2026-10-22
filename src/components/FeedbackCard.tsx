import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { sendFeedback } from "../beta/feedback";
import { notifyError, notifySuccess, tapLight } from "../haptics";
import { useLanguage } from "../i18n/LanguageContext";
import { useTheme } from "../ThemeContext";
import type { ThemeColors } from "../theme";
import PressScale from "./PressScale";

/** "Leave feedback" on the tour-complete screen: a star rating and a few
 * words, emailed straight to us (src/beta/feedback.ts). */
export default function FeedbackCard({ tourName }: { tourName: string }) {
  const { t } = useLanguage();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (sent) {
    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <Ionicons name="heart" size={20} color={colors.primary} />
          <Text style={styles.title}>{t("feedback.thanksTitle")}</Text>
        </View>
        <Text style={styles.body}>{t("feedback.thanksBody")}</Text>
      </View>
    );
  }

  if (!open) {
    return (
      <PressScale style={styles.openButton} scaleTo={0.96} onPress={() => setOpen(true)}>
        <Ionicons name="chatbubble-ellipses-outline" size={18} color={colors.primary} />
        <Text style={styles.openButtonText}>{t("feedback.button")}</Text>
      </PressScale>
    );
  }

  const handleSend = async () => {
    if (rating === 0) {
      notifyError();
      setError(t("feedback.errorNoRating"));
      return;
    }
    setError(null);
    setSending(true);
    try {
      await sendFeedback({ tourName, rating, message, email });
      notifySuccess();
      setSent(true);
    } catch {
      notifyError();
      setError(t("feedback.errorSend"));
    } finally {
      setSending(false);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Ionicons name="chatbubble-ellipses-outline" size={20} color={colors.primary} />
        <Text style={styles.title}>{t("feedback.title")}</Text>
      </View>
      <Text style={styles.body}>{t("feedback.body")}</Text>

      <View style={styles.stars} role="radiogroup" aria-label={t("feedback.ratingLabel")}>
        {[1, 2, 3, 4, 5].map((n) => (
          <Pressable
            key={n}
            role="radio"
            aria-checked={rating === n}
            aria-label={`${n}/5`}
            hitSlop={6}
            onPress={() => {
              tapLight();
              setRating(n);
            }}
          >
            <Ionicons name={n <= rating ? "star" : "star-outline"} size={30} color={colors.primary} />
          </Pressable>
        ))}
      </View>

      <TextInput
        style={[styles.input, styles.messageInput]}
        placeholder={t("feedback.messagePlaceholder")}
        placeholderTextColor={colors.textFaint}
        value={message}
        onChangeText={setMessage}
        multiline
        textAlignVertical="top"
      />
      <TextInput
        style={styles.input}
        placeholder={t("feedback.emailPlaceholder")}
        placeholderTextColor={colors.textFaint}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      {error && <Text style={styles.error}>{error}</Text>}

      <PressScale
        style={[styles.sendButton, sending && styles.sendButtonDisabled]}
        scaleTo={0.96}
        onPress={sending ? undefined : handleSend}
      >
        {sending ? (
          <ActivityIndicator color={colors.onPrimary} />
        ) : (
          <Text style={styles.sendButtonText}>{t("feedback.send")}</Text>
        )}
      </PressScale>
    </View>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    openButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      marginTop: 20,
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderRadius: 14,
      borderWidth: 1.5,
      borderColor: colors.primary,
    },
    openButtonText: { color: colors.primary, fontSize: 16, fontWeight: "700" },
    card: {
      alignSelf: "stretch",
      maxWidth: 420,
      width: "100%",
      marginTop: 20,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 16,
      padding: 16,
      gap: 12,
    },
    header: { flexDirection: "row", alignItems: "center", gap: 8 },
    title: { color: colors.text, fontSize: 16, fontWeight: "700" },
    body: { color: colors.textMid, fontSize: 14, lineHeight: 20 },
    stars: { flexDirection: "row", justifyContent: "center", gap: 8 },
    input: {
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      paddingHorizontal: 14,
      paddingVertical: 12,
      fontSize: 14,
      color: colors.text,
    },
    messageInput: { height: 110, paddingTop: 12 },
    error: { color: colors.warnText, fontSize: 12 },
    sendButton: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      paddingVertical: 14,
      alignItems: "center",
    },
    sendButtonDisabled: { opacity: 0.7 },
    sendButtonText: { color: colors.onPrimary, fontSize: 14, fontWeight: "700" },
  });
}

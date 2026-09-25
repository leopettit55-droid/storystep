import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import BackButton from "../components/BackButton";
import PressScale from "../components/PressScale";
import { emailIsConfigured, sendContactMessage } from "../contact/emailConfig";
import { notifyError, notifySuccess } from "../haptics";
import { useLanguage } from "../i18n/LanguageContext";
import { useTheme } from "../ThemeContext";
import type { ThemeColors } from "../theme";

const SUPPORT_EMAIL = "leopettit55@gmail.com";

export default function ContactUsScreen() {
  const { t } = useLanguage();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async () => {
    if (!message.trim()) {
      notifyError();
      setError(t("contact.errorEmptyMessage"));
      return;
    }
    setError(null);
    setSending(true);
    try {
      await sendContactMessage({ name, email, message });
      notifySuccess();
      setSent(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      notifyError();
      setError(t("contact.errorBody"));
    } finally {
      setSending(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <BackButton variant="inline" style={styles.backButton} />
          <Text style={styles.title}>{t("contact.title")}</Text>
          <Text style={styles.subtitle}>{t("contact.subtitle")}</Text>

          {!emailIsConfigured ? (
            <View style={styles.card}>
              <Text style={styles.notConfigured}>{t("contact.notConfigured")}</Text>
              <PressScale
                style={styles.mailtoButton}
                scaleTo={0.96}
                onPress={() => Linking.openURL(`mailto:${SUPPORT_EMAIL}`)}
              >
                <Text style={styles.sendButtonText}>{t("help.contactUs")}</Text>
              </PressScale>
            </View>
          ) : sent ? (
            <View style={styles.card}>
              <Text style={styles.successBody}>{t("contact.successBody")}</Text>
              <PressScale style={styles.sendButton} scaleTo={0.96} onPress={() => setSent(false)}>
                <Text style={styles.sendButtonText}>{t("contact.sendButton")}</Text>
              </PressScale>
            </View>
          ) : (
            <View style={styles.card}>
              <TextInput
                style={styles.input}
                placeholder={t("account.namePlaceholder")}
                placeholderTextColor={colors.textFaint}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
              <TextInput
                style={styles.input}
                placeholder={t("account.emailPlaceholder")}
                placeholderTextColor={colors.textFaint}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              <TextInput
                style={[styles.input, styles.messageInput]}
                placeholder={t("contact.messagePlaceholder")}
                placeholderTextColor={colors.textFaint}
                value={message}
                onChangeText={setMessage}
                multiline
                textAlignVertical="top"
              />

              {error && <Text style={styles.error}>{error}</Text>}

              <PressScale
                style={[styles.sendButton, sending && styles.sendButtonDisabled]}
                scaleTo={0.96}
                disabled={sending}
                onPress={handleSend}
              >
                {sending ? (
                  <ActivityIndicator color={colors.onPrimary} />
                ) : (
                  <Text style={styles.sendButtonText}>{t("contact.sendButton")}</Text>
                )}
              </PressScale>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    scroll: { padding: 20, paddingTop: 24, paddingBottom: 40 },
    backButton: { marginBottom: 12 },
    title: { fontSize: 28, fontWeight: "700", color: colors.primary },
    subtitle: { fontSize: 14, color: colors.textMid, marginTop: 6, marginBottom: 20 },
    card: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 18,
      borderWidth: 1,
      borderColor: colors.border,
      gap: 12,
    },
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
    messageInput: { height: 140, paddingTop: 12 },
    error: { color: colors.warnText, fontSize: 12 },
    sendButton: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      paddingVertical: 14,
      alignItems: "center",
    },
    sendButtonDisabled: { opacity: 0.7 },
    sendButtonText: { color: colors.onPrimary, fontSize: 14, fontWeight: "700" },
    mailtoButton: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      paddingVertical: 14,
      alignItems: "center",
    },
    notConfigured: { color: colors.textMid, fontSize: 13, lineHeight: 19 },
    successBody: { color: colors.textMid, fontSize: 14, lineHeight: 20 },
  });
}

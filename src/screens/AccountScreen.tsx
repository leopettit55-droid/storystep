import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import LanguagePicker from "../components/LanguagePicker";
import PressScale from "../components/PressScale";
import Skeleton from "../components/Skeleton";
import { notifyError, notifySuccess, tapLight } from "../haptics";
import { useLanguage } from "../i18n/LanguageContext";
import { getSubscription, type SubscriptionPlan } from "../purchases/entitlements";
import { openCustomerPortal, openSubscriptionCheckout, stripeIsConfigured } from "../purchases/stripeConfig";
import { useTheme } from "../ThemeContext";
import { CONTENT_MAX_WIDTH, type ThemeColors } from "../theme";

const STORAGE_KEY = "storystep.localAccount";

interface LocalAccount {
  name: string;
  email: string;
}

export default function AccountScreen() {
  const { t } = useLanguage();
  const { colors, isDark, toggleMode } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState<LocalAccount | null>(null);
  const [subscription, setSubscription] = useState<{ plan: SubscriptionPlan; expiresAt: number } | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) setAccount(JSON.parse(raw));
      setLoading(false);
    })();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getSubscription().then(setSubscription);
    }, [])
  );

  const handleSubscribe = async (plan: SubscriptionPlan) => {
    if (!stripeIsConfigured[plan]) {
      Alert.alert(t("account.paymentsNotSetTitle"), t("account.paymentsNotSetBodySub"));
      return;
    }
    await openSubscriptionCheckout(plan);
  };

  const handleToggleTheme = () => {
    tapLight();
    toggleMode();
  };

  const handleCreateAccount = async () => {
    setError(null);
    if (!name.trim() || !email.trim() || !password) {
      notifyError();
      setError(t("account.errorFillIn"));
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      notifyError();
      setError(t("account.errorInvalidEmail"));
      return;
    }
    const newAccount: LocalAccount = { name: name.trim(), email: email.trim() };
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newAccount));
    notifySuccess();
    setAccount(newAccount);
  };

  const handleSignOut = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    setAccount(null);
    setName("");
    setEmail("");
    setPassword("");
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.scroll}>
          <Skeleton style={styles.skeletonTitle} />
          <View style={styles.card}>
            <Skeleton style={styles.skeletonRowTitle} />
            <Skeleton style={styles.skeletonLine} />
            <Skeleton style={[styles.skeletonLine, { width: "60%" }]} />
          </View>
          <View style={styles.card}>
            <Skeleton style={styles.skeletonAvatar} borderRadius={28} />
            <Skeleton style={[styles.skeletonRowTitle, { width: "40%" }]} />
            <Skeleton style={[styles.skeletonLine, { width: "70%" }]} />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>{t("account.title")}</Text>

        <View style={styles.card}>
          <Text style={styles.rowTitle}>{t("language.picker")}</Text>
          <View style={{ marginTop: 10, alignSelf: "flex-start" }}>
            <LanguagePicker variant="full" />
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.themeRow}>
            <Text style={styles.rowTitle}>{t("account.darkMode")}</Text>
            <Switch
              value={isDark}
              onValueChange={handleToggleTheme}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="#FFFFFF"
              // The web Switch ignores thumbColor when on and draws a teal knob.
              {...({ activeThumbColor: "#FFFFFF" } as object)}
            />
          </View>
        </View>

        {account ? (
          <>
            <View style={styles.card}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{account.name[0]?.toUpperCase()}</Text>
              </View>
              <Text style={styles.name}>{account.name}</Text>
              <Text style={styles.body}>{account.email}</Text>
              <PressScale style={styles.signOutButton} scaleTo={0.95} onPress={handleSignOut}>
                <Text style={styles.signOutButtonText}>{t("account.signOut")}</Text>
              </PressScale>
            </View>

            <View style={styles.card}>
              <Text style={styles.rowTitle}>{t("account.downloadedTours")}</Text>
              <Text style={styles.rowBody}>{t("account.downloadedToursBody")}</Text>
            </View>
          </>
        ) : (
          <View style={styles.card}>
            <Text style={styles.rowTitle}>{t("account.createAccountTitle")}</Text>
            <Text style={styles.body}>{t("account.storedLocally")}</Text>

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
              style={styles.input}
              placeholder={t("account.passwordPlaceholder")}
              placeholderTextColor={colors.textFaint}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            {error && <Text style={styles.error}>{error}</Text>}

            <PressScale style={styles.createButton} scaleTo={0.96} onPress={handleCreateAccount}>
              <Text style={styles.createButtonText}>{t("account.createAccountButton")}</Text>
            </PressScale>
          </View>
        )}

        <View style={styles.card}>
          <Text style={styles.rowTitle}>{t("account.aboutTitle")}</Text>
          <Text style={styles.rowBody}>{t("account.aboutBody")}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    scroll: { padding: 20, paddingTop: 24, gap: 16, width: "100%", maxWidth: CONTENT_MAX_WIDTH, alignSelf: "center" },
    skeletonTitle: { width: 140, height: 34, borderRadius: 8 },
    skeletonRowTitle: { width: "50%", height: 16, borderRadius: 6, marginBottom: 10 },
    skeletonLine: { width: "90%", height: 12, borderRadius: 6, marginTop: 6 },
    skeletonAvatar: { width: 56, height: 56, marginBottom: 12 },
    title: { fontSize: 32, fontWeight: "700", color: colors.primary },
    card: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 18,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: "flex-start",
    },
    themeRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      alignSelf: "stretch",
    },
    avatar: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: colors.surfaceRaised,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 12,
    },
    avatarText: { fontSize: 22, fontWeight: "700", color: colors.primary },
    name: { fontSize: 17, fontWeight: "700", color: colors.text },
    body: { fontSize: 14, color: colors.textMid, marginTop: 6, lineHeight: 20 },
    rowTitle: { fontSize: 15, fontWeight: "700", color: colors.text },
    rowBody: { fontSize: 13, color: colors.textMid, marginTop: 4 },
    planRow: { flexDirection: "row", gap: 10, marginTop: 14, alignSelf: "stretch" },
    planButton: {
      flex: 1,
      backgroundColor: colors.primary,
      borderRadius: 12,
      paddingVertical: 12,
      alignItems: "center",
    },
    planButtonLabel: { color: colors.onPrimary, fontSize: 13, fontWeight: "600" },
    planButtonPrice: { color: colors.onPrimary, fontSize: 15, fontWeight: "700", marginTop: 2 },
    manageButton: {
      marginTop: 14,
      borderWidth: 1,
      borderColor: colors.primary,
      borderRadius: 12,
      paddingVertical: 11,
      paddingHorizontal: 18,
      alignSelf: "stretch",
      alignItems: "center",
    },
    manageButtonText: { color: colors.primary, fontSize: 13, fontWeight: "700" },
    manageFallback: { fontSize: 12, color: colors.textDim, marginTop: 12, lineHeight: 17 },
    input: {
      width: "100%",
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      paddingHorizontal: 14,
      paddingVertical: 12,
      fontSize: 14,
      color: colors.text,
      marginTop: 12,
    },
    error: { color: colors.warnText, fontSize: 12, marginTop: 10 },
    createButton: {
      marginTop: 16,
      backgroundColor: colors.primary,
      borderRadius: 12,
      paddingVertical: 13,
      alignSelf: "stretch",
      alignItems: "center",
    },
    createButtonText: { color: colors.onPrimary, fontSize: 14, fontWeight: "700" },
    signOutButton: {
      marginTop: 14,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      paddingVertical: 10,
      paddingHorizontal: 18,
    },
    signOutButtonText: { color: colors.textMid, fontSize: 13, fontWeight: "600" },
  });
}

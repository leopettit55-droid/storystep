import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  KeyboardAvoidingView,
  PanResponder,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { DUO_COLORS } from "../../duo/colors";
import { useDuoStore } from "../../duo/duoStore";
import { REACTION_EMOJI } from "../../duo/protocol";
import { tapLight } from "../../haptics";
import { useLanguage } from "../../i18n/LanguageContext";
import PressScale from "../PressScale";

interface Props {
  friendName: string;
  /** Distance from the bottom of the screen for the reaction row. */
  bottom: number;
}

/**
 * Walk with a friend, during the walk: a row of quick reactions with a chat
 * button (tap or swipe up to open the chat), the chat sheet itself, and a
 * pop-up whenever either of you reacts.
 */
export default function DuoChat({ friendName, bottom }: Props) {
  const { t } = useLanguage();
  const chat = useDuoStore((s) => s.chat);
  const myId = useDuoStore((s) => s.myId);
  const unread = useDuoStore((s) => s.unread);
  const open = useDuoStore((s) => s.chatOpen);
  const setOpen = useDuoStore((s) => s.setChatOpen);
  const sendChat = useDuoStore((s) => s.sendChat);
  const react = useDuoStore((s) => s.react);
  const lastReaction = useDuoStore((s) => s.lastReaction);
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<ScrollView>(null);

  // Swipe up on the chat button to open; swipe down on the sheet's handle to close.
  const swipeUp = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => g.dy < -12 && Math.abs(g.dy) > Math.abs(g.dx),
      onPanResponderRelease: (_, g) => {
        if (g.dy < -30) setOpen(true);
      },
    })
  ).current;
  const swipeDown = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => g.dy > 12 && Math.abs(g.dy) > Math.abs(g.dx),
      onPanResponderRelease: (_, g) => {
        if (g.dy > 30) setOpen(false);
      },
    })
  ).current;

  useEffect(() => {
    if (open) setTimeout(() => scrollRef.current?.scrollToEnd({ animated: false }), 50);
  }, [open, chat.length]);

  // The reaction pop-up: rises and fades.
  const pop = useRef(new Animated.Value(0)).current;
  const [shown, setShown] = useState(lastReaction);
  useEffect(() => {
    if (!lastReaction) return;
    setShown(lastReaction);
    pop.setValue(0);
    Animated.sequence([
      Animated.spring(pop, { toValue: 1, useNativeDriver: true, friction: 5 }),
      Animated.delay(1600),
      Animated.timing(pop, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start();
  }, [lastReaction, pop]);

  const send = () => {
    if (!draft.trim()) return;
    sendChat(draft);
    setDraft("");
  };

  return (
    <>
      {shown && (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.pop,
            { opacity: pop, transform: [{ translateY: pop.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }, { scale: pop }] },
          ]}
        >
          <Text style={styles.popEmoji}>{shown.emoji}</Text>
          <Text style={styles.popName}>{shown.uid === myId ? t("duo.you") : shown.name}</Text>
        </Animated.View>
      )}

      <View style={[styles.row, { bottom }]} {...swipeUp.panHandlers}>
        <PressScale
          style={styles.chatButton}
          scaleTo={0.92}
          onPress={() => setOpen(true)}
          aria-label={t("duo.chatWith", { name: friendName })}
        >
          <Ionicons name="chatbubble-ellipses" size={16} color="#FFFFFF" />
          <Text style={styles.chatButtonText}>{t("duo.chat")}</Text>
          {unread > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unread}</Text>
            </View>
          )}
        </PressScale>
        {REACTION_EMOJI.map((emoji) => (
          <PressScale
            key={emoji}
            style={styles.emojiButton}
            scaleTo={0.85}
            onPress={() => {
              tapLight();
              react(emoji);
            }}
            aria-label={emoji}
          >
            <Text style={styles.emoji}>{emoji}</Text>
          </PressScale>
        ))}
      </View>

      {open && (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.sheetWrap}>
          <View style={styles.sheet}>
            <View style={styles.handleArea} {...swipeDown.panHandlers}>
              <View style={styles.handle} />
              <View style={styles.sheetHeader}>
                <Text style={styles.sheetTitle}>{t("duo.chatWith", { name: friendName })}</Text>
                <PressScale onPress={() => setOpen(false)} scaleTo={0.9} hitSlop={10} aria-label={t("duo.closeChat")}>
                  <Ionicons name="chevron-down" size={24} color="#5C4B44" />
                </PressScale>
              </View>
            </View>
            <ScrollView ref={scrollRef} style={styles.messages} contentContainerStyle={styles.messagesContent}>
              {chat.length === 0 && <Text style={styles.empty}>{t("duo.noMessages")}</Text>}
              {chat.map((m) => {
                const mine = m.uid === myId;
                return (
                  <View key={m.id} style={[styles.bubble, mine ? styles.bubbleMine : styles.bubbleTheirs]}>
                    <Text style={[styles.bubbleText, mine && styles.bubbleTextMine]}>{m.text}</Text>
                    {m.pending && <Text style={styles.pending}>{t("duo.sending")}</Text>}
                  </View>
                );
              })}
            </ScrollView>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                value={draft}
                onChangeText={setDraft}
                placeholder={t("duo.messagePlaceholder")}
                placeholderTextColor="#A89A90"
                onSubmitEditing={send}
                returnKeyType="send"
                maxLength={500}
                aria-label={t("duo.messagePlaceholder")}
              />
              <PressScale style={styles.sendButton} scaleTo={0.9} onPress={send} aria-label={t("duo.send")}>
                <Ionicons name="send" size={18} color="#FFFFFF" />
              </PressScale>
            </View>
          </View>
        </KeyboardAvoidingView>
      )}
    </>
  );
}

const shadow = {
  shadowColor: "#000",
  shadowOpacity: 0.22,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 3 },
  elevation: 5,
};

const styles = StyleSheet.create({
  row: { position: "absolute", left: 0, right: 0, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 6 },
  chatButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    height: 34,
    paddingHorizontal: 12,
    borderRadius: 17,
    backgroundColor: DUO_COLORS.friend,
    ...shadow,
  },
  chatButtonText: { color: "#FFFFFF", fontWeight: "800", fontSize: 13 },
  badge: { minWidth: 18, height: 18, borderRadius: 9, backgroundColor: "#FFFFFF", alignItems: "center", justifyContent: "center", paddingHorizontal: 4 },
  badgeText: { color: DUO_COLORS.friend, fontSize: 11, fontWeight: "800" },
  emojiButton: { width: 34, height: 34, borderRadius: 17, backgroundColor: "#FFFFFF", alignItems: "center", justifyContent: "center", ...shadow },
  emoji: { fontSize: 18 },
  pop: { position: "absolute", top: "38%", alignSelf: "center", alignItems: "center" },
  popEmoji: { fontSize: 64 },
  popName: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 14,
    backgroundColor: "rgba(0,0,0,0.45)",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
    overflow: "hidden",
  },
  sheetWrap: { position: "absolute", left: 0, right: 0, bottom: 0, height: "62%" },
  sheet: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    ...shadow,
    shadowOpacity: 0.3,
  },
  handleArea: { paddingTop: 8, paddingHorizontal: 16 },
  handle: { alignSelf: "center", width: 40, height: 5, borderRadius: 3, backgroundColor: "#E5D6CB" },
  sheetHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 8 },
  sheetTitle: { fontSize: 17, fontWeight: "800", color: "#201613" },
  messages: { flex: 1 },
  messagesContent: { padding: 16, gap: 8 },
  empty: { color: "#8C7B72", textAlign: "center", marginTop: 20, fontSize: 14 },
  bubble: { maxWidth: "80%", borderRadius: 16, paddingVertical: 8, paddingHorizontal: 12 },
  bubbleMine: { alignSelf: "flex-end", backgroundColor: DUO_COLORS.me },
  bubbleTheirs: { alignSelf: "flex-start", backgroundColor: "#FFF0E3" },
  bubbleText: { fontSize: 15, color: "#201613", lineHeight: 20 },
  bubbleTextMine: { color: "#FFFFFF" },
  pending: { fontSize: 10, color: "rgba(255,255,255,0.8)", marginTop: 2 },
  inputRow: { flexDirection: "row", gap: 8, padding: 12, paddingBottom: 18, borderTopWidth: 1, borderTopColor: "#F3DCC9" },
  input: {
    flex: 1,
    minWidth: 0,
    backgroundColor: "#FFF3EC",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    color: "#201613",
  },
  sendButton: { width: 42, height: 42, borderRadius: 21, backgroundColor: DUO_COLORS.me, alignItems: "center", justifyContent: "center" },
});

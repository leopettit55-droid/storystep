import { Ionicons } from "@expo/vector-icons";
import { createAudioPlayer, type AudioPlayer, type AudioStatus } from "expo-audio";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import type { Waypoint } from "../content";
import { getGuide, GUIDES, type GuideId } from "../guides/guides";
import { useLanguage } from "../i18n/LanguageContext";
import { apiUrl } from "../social/api";
import Mascot from "./Mascot";
import PressScale from "./PressScale";

/** Questions per stop, per visit (the server also limits by visitor). */
const PER_STOP_LIMIT = 5;
const askedAt = new Map<string, number>();

interface Answer {
  audioUrl: string | null;
  transcript: string;
  duration: number;
}

export interface AskGuideModalProps {
  tourId: string;
  stop: Waypoint;
  /** The walker's tour guide, picked first; another can be asked instead. */
  guide: GuideId;
  onClose: () => void;
}

/**
 * "Ask your guide" (test feature, see server/guideAnswer.ts): type a question
 * at a stop and hear the guide answer it. The answer plays as soon as it's
 * ready, with its transcript below, and the sheet closes when it finishes.
 */
export default function AskGuideModal({ tourId, stop, guide: tourGuide, onClose }: AskGuideModalProps) {
  const { t } = useLanguage();
  const [guide, setGuide] = useState<GuideId>(tourGuide);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [problem, setProblem] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [asked, setAsked] = useState(askedAt.get(stop.id) ?? 0);
  const player = useRef<AudioPlayer | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const name = getGuide(guide).name;
  const left = PER_STOP_LIMIT - asked;

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
      player.current?.remove();
    },
    []
  );

  const play = (url: string) => {
    if (!player.current) {
      player.current = createAudioPlayer(url);
      player.current.addListener("playbackStatusUpdate", (status: AudioStatus) => {
        setPlaying(status.playing);
        // Done listening: close a moment after the answer ends.
        if (status.didJustFinish) closeTimer.current = setTimeout(onClose, 1200);
      });
    } else {
      player.current.replace(url);
    }
    player.current.play();
  };

  const togglePlay = () => {
    const p = player.current;
    if (!p) return;
    if (p.playing) p.pause();
    else {
      if (closeTimer.current) clearTimeout(closeTimer.current);
      if (p.currentTime >= p.duration - 0.1) void p.seekTo(0);
      p.play();
    }
  };

  const ask = async () => {
    const q = question.trim();
    if (q.length < 3 || loading || left <= 0) return;
    if (closeTimer.current) clearTimeout(closeTimer.current);
    player.current?.pause();
    setLoading(true);
    setProblem(null);
    setAnswer(null);
    try {
      const res = await fetch(apiUrl("/api/guide-answer"), {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ question: q, currentStop: stop.order, tourId, guideId: guide }),
      });
      const data = (await res.json().catch(() => null)) as (Answer & { error?: string; code?: string }) | null;
      if (res.status === 429 || data?.code === "limit") {
        askedAt.set(stop.id, PER_STOP_LIMIT);
        setAsked(PER_STOP_LIMIT);
        setProblem(t("askGuide.limit"));
        return;
      }
      if (!res.ok || !data?.transcript) throw new Error(data?.error ?? `HTTP ${res.status}`);
      const count = (askedAt.get(stop.id) ?? 0) + 1;
      askedAt.set(stop.id, count);
      setAsked(count);
      setAnswer(data);
      setQuestion("");
      if (data.audioUrl) play(data.audioUrl);
      else setProblem(t("askGuide.noAudio"));
    } catch (e) {
      console.warn("[askGuide] couldn't get an answer", e);
      setProblem(t("askGuide.error", { guide: name }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} aria-label={t("askGuide.close")} />
      <View style={styles.sheet} pointerEvents="box-none">
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>{t("askGuide.title")}</Text>
            <Pressable onPress={onClose} hitSlop={10} aria-label={t("askGuide.close")}>
              <Ionicons name="close" size={24} color="#201613" />
            </Pressable>
          </View>

          <View style={styles.guides}>
            {GUIDES.map((g) => (
              <Pressable
                key={g.id}
                onPress={() => setGuide(g.id)}
                style={[styles.guideChip, g.id === guide && styles.guideChipActive]}
                aria-label={g.name}
                aria-selected={g.id === guide}
                disabled={loading}
              >
                <Mascot size={34} guide={g.id} />
                <Text style={[styles.guideChipName, g.id === guide && styles.guideChipNameActive]} numberOfLines={1}>
                  {g.name}
                </Text>
              </Pressable>
            ))}
          </View>

          <TextInput
            style={styles.input}
            value={question}
            onChangeText={setQuestion}
            placeholder={t("askGuide.placeholder", { stop: stop.name })}
            placeholderTextColor="#8A7F79"
            multiline
            maxLength={300}
            editable={!loading && left > 0}
            onSubmitEditing={ask}
            blurOnSubmit
            returnKeyType="send"
          />

          <PressScale
            style={[styles.askButton, (question.trim().length < 3 || loading || left <= 0) && styles.askButtonDisabled]}
            scaleTo={0.96}
            onPress={ask}
            disabled={question.trim().length < 3 || loading || left <= 0}
          >
            <Text style={styles.askButtonText}>{t("askGuide.ask", { guide: name })}</Text>
          </PressScale>
          {left > 0 && <Text style={styles.small}>{t("askGuide.remaining", { count: left })}</Text>}

          {loading && (
            <View style={styles.loading} role="status">
              <ActivityIndicator color="#2E9E6B" />
              <Text style={styles.loadingText}>{t("askGuide.thinking", { guide: name })}</Text>
            </View>
          )}

          {problem && (
            <Text style={styles.problem} role="alert">
              {problem}
            </Text>
          )}

          {answer && (
            <View style={styles.answer}>
              {answer.audioUrl && (
                <Pressable
                  style={styles.playButton}
                  onPress={togglePlay}
                  aria-label={t(playing ? "askGuide.pause" : "askGuide.play")}
                >
                  <Ionicons name={playing ? "pause" : "play"} size={22} color="#FFFFFF" />
                </Pressable>
              )}
              <Text style={styles.transcript}>{answer.transcript}</Text>
            </View>
          )}

          <Text style={styles.notice}>{t("askGuide.aiNotice")}</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { position: "absolute", top: 0, right: 0, bottom: 0, left: 0, backgroundColor: "rgba(0,0,0,0.45)" },
  sheet: { position: "absolute", top: 0, right: 0, bottom: 0, left: 0, justifyContent: "flex-end", alignItems: "center" },
  card: {
    width: "100%",
    maxWidth: 480,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    padding: 20,
    paddingBottom: 28,
    gap: 12,
  },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  title: { fontSize: 20, fontWeight: "800", color: "#201613" },
  guides: { flexDirection: "row", gap: 8 },
  guideChip: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#EEE7E2",
  },
  guideChipActive: { borderColor: "#2E9E6B", backgroundColor: "#EAF7F0" },
  guideChipName: { marginTop: 2, fontSize: 11, color: "#6B605A", fontWeight: "600" },
  guideChipNameActive: { color: "#1F7A50" },
  input: {
    minHeight: 72,
    borderWidth: 1.5,
    borderColor: "#DDD3CC",
    borderRadius: 14,
    padding: 12,
    fontSize: 16,
    color: "#201613",
    textAlignVertical: "top",
  },
  askButton: { backgroundColor: "#2E9E6B", borderRadius: 50, paddingVertical: 14, alignItems: "center" },
  askButtonDisabled: { opacity: 0.45 },
  askButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "800" },
  small: { fontSize: 12, color: "#8A7F79", textAlign: "center" },
  loading: { flexDirection: "row", alignItems: "center", gap: 10, justifyContent: "center" },
  loadingText: { color: "#4A403B", fontSize: 14 },
  problem: { color: "#B42318", fontSize: 14, textAlign: "center" },
  answer: { flexDirection: "row", gap: 12, alignItems: "flex-start", backgroundColor: "#F6F2EF", borderRadius: 14, padding: 12 },
  playButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#2E9E6B",
    alignItems: "center",
    justifyContent: "center",
  },
  transcript: { flex: 1, fontSize: 15, lineHeight: 21, color: "#201613" },
  notice: { fontSize: 11, color: "#8A7F79", textAlign: "center" },
});

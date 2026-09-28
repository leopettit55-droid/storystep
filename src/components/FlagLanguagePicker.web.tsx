import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { Animated, Easing, Pressable, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { tapLight } from "../haptics";

interface FlagOption {
  code: string;
  label: string;
  Flag: () => React.ReactElement;
}

const HEADLINES = ["Choose your language", "Elige tu idioma", "Choisissez votre langue", "选择语言"];
const ACCENT = "#D85A30";
const TEXT = "#201613";
const BORDER = "#EFE6DF";

/** Language select shown by LanguageGate as the first page on web: four flag
 * cards under a heading that cycles through the four languages. Flags are
 * inline SVG rather than emoji, which don't render as flags on Windows.
 * Calls onSelect once the pick animation ends. */
export default function FlagLanguagePicker({
  current,
  onSelect,
}: {
  current: string;
  onSelect: (code: string) => void;
}) {
  const { width } = useWindowDimensions();
  const compact = width < 640;
  // On phones: two cards per row inside a 20px gutter, with a 14px gap.
  const tileWidth = compact ? Math.min(160, (width - 40 - 14) / 2) : 176;

  const [headline, setHeadline] = useState(0);
  const [chosen, setChosen] = useState<string | null>(null);
  const panel = useRef(new Animated.Value(0)).current;
  const headlineOpacity = useRef(new Animated.Value(1)).current;
  const tiles = useRef(FLAGS.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    const ease = Easing.out(Easing.cubic);
    Animated.parallel([
      Animated.timing(panel, { toValue: 1, duration: 420, easing: ease, useNativeDriver: false }),
      Animated.stagger(
        70,
        tiles.map((v) =>
          Animated.timing(v, { toValue: 1, duration: 420, delay: 120, easing: ease, useNativeDriver: false })
        )
      ),
    ]).start();

    // Cross-fade the heading between the four languages.
    const id = setInterval(() => {
      Animated.timing(headlineOpacity, { toValue: 0, duration: 220, useNativeDriver: false }).start(() => {
        setHeadline((i) => (i + 1) % HEADLINES.length);
        Animated.timing(headlineOpacity, { toValue: 1, duration: 260, useNativeDriver: false }).start();
      });
    }, 2400);
    return () => clearInterval(id);
  }, [panel, tiles, headlineOpacity]);

  const pick = (code: string) => {
    if (chosen) return;
    tapLight();
    setChosen(code);
    Animated.timing(panel, {
      toValue: 0,
      duration: 260,
      delay: 260,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: false,
    }).start(() => onSelect(code));
  };

  return (
    <Animated.View
      style={[
        styles.panel,
        compact && styles.panelCompact,
        {
          opacity: panel,
          transform: [{ translateY: panel.interpolate({ inputRange: [0, 1], outputRange: [12, 0] }) }],
        },
      ]}
    >
      <View style={styles.brand}>
        <View style={styles.logoMark}>
          <Text style={styles.logoMarkText}>S</Text>
        </View>
        <Text style={styles.logoText}>StoryStep</Text>
      </View>

      <Animated.Text
        style={[styles.headerText, compact && styles.headerTextCompact, { opacity: headlineOpacity }]}
        numberOfLines={1}
        role="heading"
      >
        {HEADLINES[headline]}
      </Animated.Text>
      <View style={styles.headerRule} />

      <View style={[styles.grid, { maxWidth: compact ? tileWidth * 2 + 14 : undefined }]}>
        {FLAGS.map((opt, i) => (
          <Animated.View
            key={opt.code}
            style={{
              opacity: tiles[i],
              transform: [{ translateY: tiles[i].interpolate({ inputRange: [0, 1], outputRange: [16, 0] }) }],
            }}
          >
            <FlagTile
              option={opt}
              width={tileWidth}
              active={chosen ? chosen === opt.code : current === opt.code}
              dimmed={!!chosen && chosen !== opt.code}
              onPress={() => pick(opt.code)}
            />
          </Animated.View>
        ))}
      </View>
    </Animated.View>
  );
}

function FlagTile({
  option,
  width,
  active,
  dimmed,
  onPress,
}: {
  option: FlagOption;
  width: number;
  active: boolean;
  dimmed: boolean;
  onPress: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const lift = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(lift, {
      toValue: hovered ? 1 : 0,
      duration: 180,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();
  }, [hovered, lift]);

  const { Flag } = option;
  return (
    <Pressable
      onPress={onPress}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      role="button"
      aria-label={option.label}
      aria-pressed={active}
    >
      <Animated.View
        style={[
          styles.tile,
          { width, opacity: dimmed ? 0.4 : 1 },
          hovered && styles.tileHover,
          active && styles.tileActive,
          { transform: [{ translateY: lift.interpolate({ inputRange: [0, 1], outputRange: [0, -4] }) }] },
        ]}
      >
        <View style={[styles.flagWrap, { height: Math.round((width - 20) * (2 / 3)) }]}>
          <Flag />
        </View>
        <View style={styles.labelRow}>
          <Text style={styles.label} numberOfLines={1}>
            {option.label}
          </Text>
          {active && <Ionicons name="checkmark-circle" size={18} color={ACCENT} />}
        </View>
      </Animated.View>
    </Pressable>
  );
}

const svgProps = {
  width: "100%",
  height: "100%",
  preserveAspectRatio: "xMidYMid slice",
  style: { display: "block" },
} as const;

function UkFlag() {
  return (
    <svg viewBox="0 0 60 30" {...svgProps}>
      <clipPath id="uk-flag-t">
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFFFFF" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#uk-flag-t)" stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0 v30 M0,15 h60" stroke="#FFFFFF" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

function SpainFlag() {
  return (
    <svg viewBox="0 0 750 500" {...svgProps}>
      <rect width="750" height="500" fill="#AA151B" />
      <rect y="125" width="750" height="250" fill="#F1BF00" />
    </svg>
  );
}

function FranceFlag() {
  return (
    <svg viewBox="0 0 3 2" {...svgProps}>
      <rect width="1" height="2" fill="#002654" />
      <rect x="1" width="1" height="2" fill="#FFFFFF" />
      <rect x="2" width="1" height="2" fill="#CE1126" />
    </svg>
  );
}

const STAR = "0,-1 0.2245,-0.309 0.951,-0.309 0.363,0.118 0.588,0.809 0,0.382 -0.588,0.809 -0.363,0.118 -0.951,-0.309 -0.2245,-0.309";

function ChinaFlag() {
  // Each small star is rotated so one point aims at the big star's centre.
  const small: [number, number, number][] = [
    [10, 2, -120.96],
    [12, 4, -98.13],
    [12, 7, -74.05],
    [10, 9, -51.34],
  ];
  return (
    <svg viewBox="0 0 30 20" {...svgProps}>
      <rect width="30" height="20" fill="#EE1C25" />
      <polygon points={STAR} fill="#FFFF00" transform="translate(5,5) scale(3)" />
      {small.map(([x, y, r]) => (
        <polygon key={`${x}-${y}`} points={STAR} fill="#FFFF00" transform={`translate(${x},${y}) rotate(${r})`} />
      ))}
    </svg>
  );
}

const FLAGS: FlagOption[] = [
  { code: "en", label: "English", Flag: UkFlag },
  { code: "es", label: "Español", Flag: SpainFlag },
  { code: "fr", label: "Français", Flag: FranceFlag },
  { code: "zh", label: "中文", Flag: ChinaFlag },
];

const styles = StyleSheet.create({
  panel: {
    paddingVertical: 32,
    paddingHorizontal: 32,
    alignItems: "center",
  },
  panelCompact: { paddingHorizontal: 20 },
  brand: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 36 },
  logoMark: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: ACCENT,
    alignItems: "center",
    justifyContent: "center",
  },
  logoMarkText: { color: "#FFFFFF", fontSize: 16, fontWeight: "800" },
  logoText: { color: TEXT, fontSize: 20, fontWeight: "800", letterSpacing: -0.2 },
  headerText: {
    color: TEXT,
    fontSize: 30,
    fontWeight: "700",
    letterSpacing: -0.4,
    textAlign: "center",
  },
  headerTextCompact: { fontSize: 24 },
  headerRule: { width: 36, height: 3, borderRadius: 2, backgroundColor: ACCENT, marginTop: 14, marginBottom: 32 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 14,
  },
  tile: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 10,
    shadowColor: TEXT,
    shadowOpacity: 0.06,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 4 },
    cursor: "pointer",
    // Web-only CSS: ease the border and shadow on hover.
    ...({ transitionProperty: "border-color, box-shadow, opacity", transitionDuration: "180ms" } as object),
  },
  tileHover: {
    borderColor: "#E3D3C8",
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
  },
  tileActive: {
    borderColor: ACCENT,
  },
  flagWrap: {
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
    // A hairline edge so white parts of a flag (France) don't melt into the card.
    borderWidth: 1,
    borderColor: "rgba(32,22,19,0.08)",
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingTop: 12,
    paddingBottom: 4,
    minHeight: 38,
  },
  label: {
    color: TEXT,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

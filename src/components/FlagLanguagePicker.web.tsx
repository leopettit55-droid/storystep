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
const BORDER = "#F3DCC9";

/** FIFA-menu-style language select, shown by LanguageGate as the first page
 * on web. Flags are inline SVG rather than emoji, which don't render as flags
 * on Windows. Calls onSelect once the pick animation ends. */
export default function FlagLanguagePicker({
  current,
  onSelect,
}: {
  current: string;
  onSelect: (code: string) => void;
}) {
  const { width } = useWindowDimensions();
  const compact = width < 640;
  // On phones: panel spans the screen minus a 16px gutter each side, with two
  // tiles per row inside its own 16px padding and a 16px gap between them.
  const panelWidth = compact ? width - 32 : undefined;
  const tileWidth = compact ? Math.min(150, (width - 32 - 32 - 16) / 2) : 170;

  const [headline, setHeadline] = useState(0);
  const [chosen, setChosen] = useState<string | null>(null);
  const panel = useRef(new Animated.Value(0)).current;
  const tiles = useRef(FLAGS.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(panel, { toValue: 1, friction: 7, tension: 60, useNativeDriver: true }),
      Animated.stagger(
        90,
        tiles.map((v) => Animated.spring(v, { toValue: 1, friction: 6, tension: 70, useNativeDriver: true }))
      ),
    ]).start();
    const id = setInterval(() => setHeadline((i) => (i + 1) % HEADLINES.length), 1800);
    return () => clearInterval(id);
  }, [panel, tiles]);

  const pick = (code: string) => {
    if (chosen) return;
    tapLight();
    setChosen(code);
    Animated.timing(panel, {
      toValue: 0,
      duration: 320,
      delay: 380,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(() => onSelect(code));
  };

  return (
    <Animated.View
      style={[
        styles.panel,
        compact && [styles.panelCompact, { width: panelWidth }],
        {
          opacity: panel,
          transform: [{ scale: panel.interpolate({ inputRange: [0, 1], outputRange: [0.85, 1] }) }],
        },
      ]}
    >
      <Text style={styles.brand}>StoryStep</Text>
      <View style={styles.header}>
        <View style={styles.headerStripe} />
        <Text style={[styles.headerText, compact && styles.headerTextCompact]} numberOfLines={1}>
          {HEADLINES[headline]}
        </Text>
      </View>

      <View style={[styles.grid, { maxWidth: compact ? tileWidth * 2 + 16 : undefined }]}>
        {FLAGS.map((opt, i) => (
          <Animated.View
            key={opt.code}
            style={{
              opacity: tiles[i],
              transform: [{ translateY: tiles[i].interpolate({ inputRange: [0, 1], outputRange: [40, 0] }) }],
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
  const lit = hovered || active;

  useEffect(() => {
    Animated.spring(lift, { toValue: lit ? 1 : 0, friction: 6, tension: 120, useNativeDriver: true }).start();
  }, [lit, lift]);

  const { Flag } = option;
  return (
    <Pressable
      onPress={onPress}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      accessibilityRole="button"
      accessibilityLabel={option.label}
    >
      <Animated.View
        style={[
          styles.tile,
          { width, opacity: dimmed ? 0.35 : 1 },
          lit && styles.tileLit,
          {
            transform: [
              { skewX: "-8deg" },
              { scale: lift.interpolate({ inputRange: [0, 1], outputRange: [1, 1.08] }) },
            ],
          },
        ]}
      >
        <View style={[styles.flagWrap, { height: width * 0.62 }]}>
          <Flag />
          <View style={styles.shine} pointerEvents="none" />
        </View>
        <View style={[styles.labelBar, lit && styles.labelBarLit]}>
          <Text style={[styles.label, lit && styles.labelLit]} numberOfLines={1}>
            {option.label}
          </Text>
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
    paddingVertical: 28,
    paddingHorizontal: 28,
    alignItems: "center",
    gap: 22,
  },
  brand: {
    color: ACCENT,
    fontSize: 30,
    fontWeight: "900",
    fontStyle: "italic",
    letterSpacing: 0.5,
  },
  panelCompact: { paddingHorizontal: 16 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  headerStripe: { width: 6, height: 26, backgroundColor: ACCENT, transform: [{ skewX: "-12deg" }] },
  headerText: {
    color: TEXT,
    fontSize: 22,
    fontWeight: "900",
    fontStyle: "italic",
    textTransform: "uppercase",
    letterSpacing: 1,
    flexShrink: 1,
  },
  headerTextCompact: { fontSize: 17 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
  },
  tile: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: BORDER,
    overflow: "hidden",
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  tileLit: {
    borderColor: ACCENT,
    shadowColor: ACCENT,
    shadowOpacity: 0.45,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 0 },
  },
  flagWrap: { width: "100%", overflow: "hidden" },
  shine: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "45%",
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  labelBar: {
    backgroundColor: "#FFF3EC",
    paddingVertical: 9,
    paddingHorizontal: 10,
  },
  labelBarLit: { backgroundColor: ACCENT },
  label: {
    color: TEXT,
    fontSize: 15,
    fontWeight: "900",
    fontStyle: "italic",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    textAlign: "center",
  },
  labelLit: { color: "#FFFFFF" },
});

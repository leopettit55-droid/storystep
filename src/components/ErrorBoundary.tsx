import { Component, type ErrorInfo, type ReactNode } from "react";
import type React from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "../ThemeContext";
import { lightColors, type ThemeColors } from "../theme";

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

/** Catches render-time errors anywhere below it so a bug in one screen shows a
 * recoverable message instead of a blank white page (the default React/web behavior). */
export default class ErrorBoundary extends Component<Props, State> {
  static contextType = ThemeContext;

  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // eslint-disable-next-line no-console
    console.error("[ErrorBoundary] caught:", error, info.componentStack);
  }

  handleReload = (): void => {
    this.setState({ error: null });
  };

  render() {
    if (this.state.error) {
      // Falls back to the light palette if this ever renders outside a
      // ThemeProvider (e.g. the provider itself threw) — better than crashing
      // the one screen whose job is to survive a crash.
      const themeCtx = this.context as React.ContextType<typeof ThemeContext>;
      const colors = themeCtx?.colors ?? lightColors;
      const styles = createStyles(colors);
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.body}>
            Sorry about that — this screen hit an unexpected error. Try again, and if it
            keeps happening, let us know.
          </Text>
          <Pressable style={styles.button} onPress={this.handleReload}>
            <Text style={styles.buttonText}>Try again</Text>
          </Pressable>
          <Pressable onPress={() => Linking.openURL("mailto:leopettit55@gmail.com?subject=StoryStep%20error")}>
            <Text style={styles.contactLink}>Contact support</Text>
          </Pressable>
        </View>
      );
    }
    return this.props.children;
  }
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 32,
      backgroundColor: colors.background,
    },
    title: { fontSize: 20, fontWeight: "700", color: colors.text, textAlign: "center" },
    body: {
      fontSize: 14,
      color: colors.textMid,
      textAlign: "center",
      marginTop: 10,
      lineHeight: 20,
      maxWidth: 340,
    },
    button: {
      marginTop: 20,
      backgroundColor: colors.primary,
      borderRadius: 12,
      paddingVertical: 12,
      paddingHorizontal: 24,
    },
    buttonText: { color: colors.onPrimary, fontSize: 14, fontWeight: "700" },
    contactLink: { marginTop: 16, fontSize: 13, color: colors.textDim, textDecorationLine: "underline" },
  });
}

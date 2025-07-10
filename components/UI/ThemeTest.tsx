import { useTheme } from "@/components/ThemeProvider";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ThemeToggle from "./ThemeToggle";

const ThemeTest = () => {
  const { theme, isDark, mode, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Theme Test Component
      </Text>
      
      <View style={styles.infoContainer}>
        <Text style={[styles.info, { color: theme.colors.textSecondary }]}>
          Current Mode: {mode}
        </Text>
        <Text style={[styles.info, { color: theme.colors.textSecondary }]}>
          Is Dark: {isDark ? "Yes" : "No"}
        </Text>
        <Text style={[styles.info, { color: theme.colors.textSecondary }]}>
          Background: {theme.colors.background}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          onPress={toggleTheme}
        >
          <Text style={[styles.buttonText, { color: theme.colors.background }]}>
            Toggle Theme
          </Text>
        </Pressable>
        
        <ThemeToggle variant="switch" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  info: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ThemeTest; 
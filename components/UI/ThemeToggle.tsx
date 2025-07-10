import { useTheme } from "@/components/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

interface ThemeToggleProps {
  size?: "small" | "medium" | "large";
  variant?: "icon" | "switch";
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  size = "medium", 
  variant = "icon" 
}) => {
  const { isDark, toggleTheme, theme } = useTheme();

  const sizeMap = {
    small: 20,
    medium: 24,
    large: 28,
  };

  const iconSize = sizeMap[size];

  const handleToggle = () => {
    console.log('Theme toggle pressed. Current isDark:', isDark);
    toggleTheme();
  };

  if (variant === "switch") {
    return (
      <Pressable
        style={[
          styles.switch,
          {
            backgroundColor: isDark ? theme.colors.primary : theme.colors.greyscale[300],
          },
        ]}
        onPress={handleToggle}
      >
        <View
          style={[
            styles.switchThumb,
            {
              backgroundColor: theme.colors.background,
              transform: [{ translateX: isDark ? 20 : 2 }],
            },
          ]}
        />
      </Pressable>
    );
  }

  return (
    <Pressable
      style={[
        styles.iconButton,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
        },
      ]}
      onPress={handleToggle}
    >
      <Ionicons
        name={isDark ? "sunny" : "moon"}
        size={iconSize}
        color={isDark ? theme.colors.secondary : theme.colors.primary}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  switch: {
    width: 44,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  switchThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});

export default ThemeToggle; 
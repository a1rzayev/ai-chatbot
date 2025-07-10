import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { useTheme } from "@/components/ThemeProvider";

interface IButton {
  onPress: () => void;
  text: string;
  rounded?: "full" | "lg" | "md" | "sm";
  icon?: React.ReactNode;
  variant?: "primary" | "secondary" | "white";
  disabled?: boolean;
  loading?: boolean;
}
const Button = ({
  onPress,
  text,
  variant = "primary",
  icon,
  rounded = "full",
  disabled,
  loading,
}: IButton) => {
  const { theme } = useTheme();
  
  return (
    <Pressable
      style={[
        styles.button,
        variant === "primary" && [styles.buttonPrimary, { backgroundColor: theme.colors.primary }],
        variant === "secondary" && [styles.buttonSecondary, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }],
        variant === "white" && [styles.buttonWhite, { backgroundColor: theme.colors.background, borderColor: theme.colors.border }],
        rounded === "full" && styles.roundedFull,
        rounded === "lg" && styles.roundedLg,
        disabled && { opacity: 0.5 },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {icon ? icon : null}
      <Text
        style={[
          styles.buttonText,
          { color: variant === "white" ? theme.colors.text : theme.colors.background },
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  roundedFull: {
    borderRadius: 100,
  },
  roundedLg: {
    borderRadius: 16,
  },
  roundedMd: {
    borderRadius: 16,
  },
  buttonPrimary: {
    borderWidth: 1,
    borderColor: "transparent",
  },
  buttonSecondary: {
    borderWidth: 1,
  },
  buttonWhite: {
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});

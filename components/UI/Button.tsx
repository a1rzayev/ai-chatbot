import { colors } from "@/constants";
import { theme } from "@/constants/theme";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

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
  return (
    <Pressable
      style={[
        styles.button,
        variant === "primary" && styles.buttonOrange,
        variant === "secondary" && styles.buttonSecondary,
        variant === "white" && styles.buttonWhite,
        rounded === "full" && styles.roundedFull,
        rounded === "lg" && styles.roundedLg,
      ]}
      onPress={onPress}
    >
      {icon ? icon : null}
      <Text
        style={[
          styles.buttonText,
          variant === "white" && { color: colors.Black },
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
  buttonOrange: {
    boxShadow: "4px 8px 24px",
    backgroundColor: colors.Primary,
  },
  buttonSecondary: {
    boxShadow: "4px 8px 24px",
    backgroundColor: colors.Dark3,
  },
  buttonWhite: {
    borderWidth: 1,
    borderColor: colors.Greyscale[200],
    boxShadow: "4px 8px 24px",
    backgroundColor: colors.White,
  },
  buttonText: {
    fontFamily: theme.font.bold,
    fontSize: 16,
    color: colors.White,
  },
});

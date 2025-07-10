import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

type CheckboxProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  size?: number;
  color?: string;
};

export const Checkbox = ({
  value,
  onValueChange,
  size = 24,
  color = "#6A53E7",
}: CheckboxProps) => {
  return (
    <TouchableOpacity
      onPress={() => onValueChange(!value)}
      style={[styles.container, { width: size, height: size }]}
    >
      {value ? (
        <Ionicons name="checkbox" size={size} color={color} />
      ) : (
        <Ionicons name="square-outline" size={size} color="#aaa" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

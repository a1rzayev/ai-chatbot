import { useTheme } from "@/components/ThemeProvider";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type DividerProps = {
  text?: string;
};

const Divider = ({ text }: DividerProps) => {
  const { theme } = useTheme();
  
  return (
    <View style={styles.wrapper}>
      <View style={[styles.divider, { backgroundColor: theme.colors.divider }]} />
      <Text style={[styles.text, { color: theme.colors.textSecondary }]}>{text}</Text>
      <View style={[styles.divider, { backgroundColor: theme.colors.divider }]} />
    </View>
  );
};

export default Divider;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginVertical: 16,
  },
  divider: {
    height: 1,
    flex: 1,
  },
  text: {
    fontSize: 14,
  },
});

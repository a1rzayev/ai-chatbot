import { colors } from "@/constants";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type DividerProps = {
  text?: string;
};

const Divider = ({ text }: DividerProps) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.divider} />
      <Text style={styles.text}>{text}</Text>
      <View style={styles.divider} />
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
    backgroundColor: colors.Greyscale[200],
    flex: 1,
  },
  text: {
    fontSize: 14,
    color: "#9E9E9E",
  },
});

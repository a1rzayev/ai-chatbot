import { Slot, Stack, usePathname } from "expo-router";
import React from "react";
import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const IntroLayout = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Slot />
      <StatusBar barStyle={"dark-content"} />
    </SafeAreaView>
  );
};

export default IntroLayout;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    paddingBottom: Platform.OS === "ios" ? 0 : 24,
  },
});
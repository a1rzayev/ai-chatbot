import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

const AuthScreen = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="register"
        options={{
          animation: "slide_from_left",
        }}
      />
      <Stack.Screen name="login" />
    </Stack>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({});
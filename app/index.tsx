import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/components/ThemeProvider";

export default function Index() {
  const { theme } = useTheme();
  const [index, setIndex] = useState(0);

  const handlePress = () => {
    if (index < 2) {
      setIndex((prev) => prev + 1);
    } else {
      router.push("/(auth)/register");
    }
  };

  const renderDots = () => (
    <View style={styles.dotsWrapper}>
      {[0, 1, 2].map((_, idx) => (
        <View
          key={idx}
          style={[
            styles.dot,
            idx === index 
              ? [styles.activeDot, { backgroundColor: theme.colors.primary }]
              : [styles.inactiveDot, { backgroundColor: theme.colors.textTertiary }],
          ]}
        />
      ))}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/image.png")}
          style={{ width: 293, height: 358 }}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Your One-Stop Name</Text>
        <Text style={[styles.title, { color: theme.colors.text }]}>Solution</Text>
        <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
          Simplify the process of finding the perfect and professional name.
        </Text>
      </View>

      <View>
        {renderDots()}
        <Pressable style={[styles.button, { backgroundColor: theme.colors.primary }]} onPress={handlePress}>
          <Text style={[styles.buttonText, { color: theme.colors.background }]}>
            {index < 2 ? "Next" : "Let's Go"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "space-between",
  },
  imageContainer: {
    width: "100%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    alignItems: "center",
    gap: 10,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 16,
  },
  dotsWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    marginBottom: 16,
  },
  dot: {
    height: 5,
    borderRadius: 16,
  },
  activeDot: {
    width: 28,
  },
  inactiveDot: {
    width: 8,
  },
  buttonWrapper: {
    paddingBottom: 24,
    borderRadius: 30,
  },
  button: {
    borderRadius: 15,
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});

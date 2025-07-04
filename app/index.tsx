import { theme } from "@/constants/theme";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
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
            idx === index ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/image.png")}
          style={{ width: 293, height: 358 }}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>Your One-Stop Name</Text>
        <Text style={styles.title}>Solution</Text>
        <Text style={styles.description}>
          Simplify the process of finding the perfect and professional name.
        </Text>
      </View>

      <View>
        {renderDots()}
        <Pressable style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>
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
    fontFamily: theme.font.bold,
    fontSize: 28,
  },
  description: {
    fontFamily: theme.font.bold,
    fontSize: 16,
    color: "#7D7C82",
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
    backgroundColor: "#8C53E7",
  },
  inactiveDot: {
    width: 8,
    backgroundColor: "#8C8BA7",
  },
  buttonWrapper: {
    paddingBottom: 24,
    backgroundColor: "#6A53E7",
    borderRadius: 30,
    color: "white",
  },
  button: {
    backgroundColor: "#6A53E7",
    borderRadius: 15,
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: theme.font.bold,
  },
});

import MessageInput from "@/components/UI/MessageInput";
import { Image } from "expo-image";
import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Message = {
  text: string;
  sender: "user" | "bot";
};

const Chatbot = () => {
  const timeoutIdRef = useRef<number | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isThinking, setIsThinking] = useState(false);

  const scrollRef = useRef<ScrollView>(null);

  const handleButtonPress = (category: any) => {
    console.log(`Pressed: ${category}`);
  };

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  useEffect(() => {
    return () => {
      if (timeoutIdRef.current !== null) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        ref={scrollRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.robotContainer}>
          <Image
            source={require("../../assets/images/robot.png")}
            style={styles.robotImage}
          />
        </View>

        <View style={styles.contentContainer}>
          {messages.map((msg, index) => (
            <View
              key={index}
              style={[
                styles.messageContainer,
                msg.sender === "user" && {
                  alignSelf: "flex-end",
                  backgroundColor: "#E8EAF6",
                },
              ]}
            >
              <Text style={styles.starIcon}>✦</Text>
              <Text style={styles.messageText}>{msg.text}</Text>
            </View>
          ))}
          {isThinking && (
            <View style={styles.messageContainer}>
              <Text style={styles.starIcon}>✦</Text>
              <Text style={styles.messageText}>Thinking...</Text>
            </View>
          )}

          {showSuggestions && (
            <View style={styles.messageContainer}>
              <Text style={styles.starIcon}>✦</Text>
              <Text style={styles.messageText}>
                Hi, you can ask me anything about names
              </Text>
            </View>
          )}

          {showSuggestions && (
            <View style={styles.messageContainer}>
              <Text style={styles.starIcon}>✦</Text>
              <View style={styles.suggestionContent}>
                <Text style={styles.messageText}>
                  I suggest you some names you can ask me...
                </Text>
                <View style={styles.buttonsGrid}>
                  <View style={styles.buttonRow}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => handleButtonPress("Business names")}
                    >
                      <Text style={styles.buttonText}>Business names</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => handleButtonPress("Human names")}
                    >
                      <Text style={styles.buttonText}>Human names</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => handleButtonPress("Games name")}
                    >
                      <Text style={styles.buttonText}>Games name</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.buttonRow}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => handleButtonPress("Pet names")}
                    >
                      <Text style={styles.buttonText}>Pet names</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => handleButtonPress("Dish names")}
                    >
                      <Text style={styles.buttonText}>Dish names</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => handleButtonPress("Character names")}
                    >
                      <Text style={styles.buttonText}>Character names</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      <MessageInput
        placeholder="Generate a name of ...."
        onSend={(message) => {
          setIsThinking(true);
          setMessages((prev) => [...prev, { text: message, sender: "user" }]);
          setShowSuggestions(false);

          timeoutIdRef.current = setTimeout(() => {
            setIsThinking(false);
            setMessages((prev) => [
              ...prev,
              {
                text: `Got it! Here's a result for "${message}"`,
                sender: "bot",
              },
            ]);
          }, 2000);
        }}
        onMicPress={() => console.log("Mic pressed")}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  robotContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
  robotImage: {
    width: 100,
    height: 153,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  suggestionContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  starIcon: {
    fontSize: 20,
    marginRight: 10,
    color: "#7E57C2",
  },
  messageText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 12,
    lineHeight: 22,
  },
  buttonsGrid: {
    width: "110%",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    gap: 10,
  },
  button: {
    minWidth: "30%",
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#6A53E7",
    backgroundColor: "white",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    fontSize: 14,
    color: "#555",
    fontWeight: "500",
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingTop: 20,
  },
});

export default Chatbot;

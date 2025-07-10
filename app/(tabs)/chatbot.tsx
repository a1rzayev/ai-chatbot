import { Checkbox } from "@/components/UI/Checkbox";
import { useTheme } from "@/components/ThemeProvider";
import MessageInput from "@/components/UI/MessageInput";
import { AiModels } from "@/models/ai-models";
import { useAiStore } from "@/store/ai-store";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { markdownToTxt } from "markdown-to-txt";
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
  const { generateContent, extract } = useAiStore();

  const { theme } = useTheme();
  const timeoutIdRef = useRef<number | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isThinking, setIsThinking] = useState(false);

  const [selectedModel, setSelectedModel] = useState(AiModels.default);
  const [showModelSelector, setShowModelSelector] = useState(false);

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
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
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
                { backgroundColor: theme.colors.card },
                msg.sender === "user" && {
                  alignSelf: "flex-end",
                  backgroundColor: theme.colors.primary + "20",
                },
              ]}
            >
              <Text style={[styles.starIcon, { color: theme.colors.primary }]}>✦</Text>
              <Text style={[styles.messageText, { color: theme.colors.text }]}>{msg.text}</Text>
            </View>
          ))}
          {isThinking && (
            <View style={[styles.messageContainer, { backgroundColor: theme.colors.card }]}>
              <Text style={[styles.starIcon, { color: theme.colors.primary }]}>✦</Text>
              <Text style={[styles.messageText, { color: theme.colors.text }]}>Thinking...</Text>
            </View>
          )}

          {showSuggestions && (
            <View style={[styles.messageContainer, { backgroundColor: theme.colors.card }]}>
              <Text style={[styles.starIcon, { color: theme.colors.primary }]}>✦</Text>
              <Text style={[styles.messageText, { color: theme.colors.text }]}>
                Hi, you can ask me anything about names
              </Text>
            </View>
          )}

          {showSuggestions && (
            <View style={[styles.messageContainer, { backgroundColor: theme.colors.card }]}>
              <Text style={[styles.starIcon, { color: theme.colors.primary }]}>✦</Text>
              <View style={styles.suggestionContent}>
                <Text style={[styles.messageText, { color: theme.colors.text }]}>
                  I suggest you some names you can ask me...
                </Text>
                <View style={styles.buttonsGrid}>
                  <View style={styles.buttonRow}>
                    <TouchableOpacity
                      style={[styles.button, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
                      onPress={() => handleButtonPress("Business names")}
                    >
                      <Text style={[styles.buttonText, { color: theme.colors.text }]}>Business names</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
                      onPress={() => handleButtonPress("Human names")}
                    >
                      <Text style={[styles.buttonText, { color: theme.colors.text }]}>Human names</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
                      onPress={() => handleButtonPress("Games name")}
                    >
                      <Text style={[styles.buttonText, { color: theme.colors.text }]}>Games name</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.buttonRow}>
                    <TouchableOpacity
                      style={[styles.button, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
                      onPress={() => handleButtonPress("Pet names")}
                    >
                      <Text style={[styles.buttonText, { color: theme.colors.text }]}>Pet names</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
                      onPress={() => handleButtonPress("Dish names")}
                    >
                      <Text style={[styles.buttonText, { color: theme.colors.text }]}>Dish names</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
                      onPress={() => handleButtonPress("Character names")}
                    >
                      <Text style={[styles.buttonText, { color: theme.colors.text }]}>Character names</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      <View style={{ alignItems: "flex-start", paddingLeft: 20}}>
        <Text style={{ textAlign: "center", padding: 10, color: "#888" }}>
          model used:{" "}
          {AiModels.models.find((m) => m.id === selectedModel)?.name ??
            selectedModel}
        </Text>
      </View>
      <MessageInput
        placeholder="Generate a name of ...."
        onSend={async (message) => {
          setIsThinking(true);
          setMessages((prev) => [...prev, { text: message, sender: "user" }]);
          setShowSuggestions(false);

          const response = await generateContent(message, selectedModel);
          const text = extract(response);

          setIsThinking(false);
          setMessages((prev) => [
            ...prev,
            {
              text: text
                ? markdownToTxt(text)
                : "An error occurred. Please, try again...",
              sender: "bot",
            },
          ]);
        }}
        onMicPress={() => console.log("Mic pressed")}
        additionalControls={
          <>
            <TouchableOpacity
              onPress={() => setShowModelSelector(!showModelSelector)}
              style={styles.modelButton}
            >
              <Ionicons name="options" size={24} color="#6A53E7" />
            </TouchableOpacity>

            {showModelSelector && (
              <View style={styles.modelSelector}>
                {AiModels.models.map((model) => (
                  <TouchableOpacity
                    key={model.id}
                    style={styles.modelOption}
                    onPress={() => {
                      setSelectedModel(model.id);
                      setShowModelSelector(false);
                    }}
                  >
                    <Checkbox
                      value={selectedModel === model.id}
                      onValueChange={() => setSelectedModel(model.id)}
                    />
                    <View style={styles.modelInfo}>
                      <Text style={styles.modelName}>{model.name}</Text>
                      <Text style={styles.modelDesc}>{model.description}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </>
        }
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
    flexWrap: "wrap",
    alignItems: "flex-start",
    marginBottom: 20,
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
  },
  messageText: {
    fontSize: 16,
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
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingTop: 20,
  },
  modelButton: {
    padding: 8,
    marginRight: 10,
  },
  modelSelector: {
    position: "absolute",
    bottom: 70,
    right: 20,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 100,
    width: 250,
  },
  modelOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  modelInfo: {
    marginLeft: 12,
  },
  modelName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  modelDesc: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
});

export default Chatbot;

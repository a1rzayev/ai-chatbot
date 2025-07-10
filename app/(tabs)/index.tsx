import { useTheme } from "@/components/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const messages = [
  {
    id: 1,
    userMessage: "Give me random names..",
    botResponse:
      'How about the name "Seraphina Grace"?\nIt exudes elegance and',
  },
  {
    id: 2,
    userMessage: "Give me random names..",
    botResponse:
      'How about the name "Seraphina Grace"?\nIt exudes elegance and..',
  },
  {
    id: 3,
    userMessage: "Give me random names..",
    botResponse:
      'How about the name "Seraphina Grace"?\nIt exudes elegance and',
  },
  {
    id: 4,
    userMessage: "Give me random names..",
    botResponse:
      'How about the name "Seraphina Grace"?\nIt exudes elegance and',
  },
  {
    id: 5,
    userMessage: "Give me random names..",
    botResponse:
      'How about the name "Seraphina Grace"?\nIt exudes elegance and',
  },
  {
    id: 6,
    userMessage: "Give me random names..",
    botResponse:
      'How about the name "Seraphina Grace"?\nIt exudes elegance and',
  },
  {
    id: 7,
    userMessage: "Give me random names..",
    botResponse: 'How about the name "Seraphina Grace"?',
  },
];

const Home = () => {
  const { theme } = useTheme();
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setModalVisible(true);
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message, index) => (
          <View key={message.id} style={[styles.messageGroup, { backgroundColor: theme.colors.card, borderColor: theme.colors.border }]}>
            <View style={styles.userMessageContainer}>
              <Text style={[styles.userMessage, { color: theme.colors.text }]}>{message.userMessage}</Text>
              <TouchableOpacity style={styles.menuButton}>
                <Ionicons name="ellipsis-vertical" size={16} color={theme.colors.textTertiary} />
              </TouchableOpacity>
            </View>

            <View>
              <Text style={[styles.botMessage, { color: theme.colors.textSecondary }]}>{message.botResponse}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messagesContainer: {},
  messagesContent: {
    padding: 20,
    gap: 22,
  },
  messageGroup: {
    gap: 16,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 2,
    paddingVertical: 10,
  },
  userMessageContainer: {
    flexDirection: "row",
  },
  userMessage: {
    fontSize: 16,
    flex: 1,
    marginRight: 12,
  },
  botMessage: {
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
    marginRight: 12,
  },
  menuButton: {
    padding: 4,
    marginTop: -4,
  },
});

export default Home;

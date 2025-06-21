import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

interface MessageInputProps {
  placeholder?: string;
  onSend?: (message: string) => void;
  onMicPress?: () => void;
}

const MessageInput = ({
  placeholder = "Generate a name of ....",
  onSend,
  onMicPress,
}: MessageInputProps) => {
  const [message, setMessage] = useState("");
  const [focused, setFocused] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      onSend?.(message.trim());
      setMessage("");
    }
  };

  const handleMicPress = () => {
    onMicPress?.();
  };

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, focused && styles.inputFocused]}>
        <TextInput
          style={styles.textInput}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={message}
          onChangeText={setMessage}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          multiline
          maxLength={500}
        />

        <TouchableOpacity
          style={styles.micButton}
          onPress={handleMicPress}
          activeOpacity={0.7}
        >
          <Ionicons name="mic" size={20} color="#6366F1" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[
          styles.sendButton,
          message.trim() ? styles.sendButtonActive : styles.sendButtonInactive,
        ]}
        onPress={handleSend}
        disabled={!message.trim()}
        activeOpacity={0.8}
      >
        <Ionicons name="send" size={20} color="white" style={styles.sendIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 12,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 48,
    maxHeight: 120,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  inputFocused: {
    borderColor: "#6366F1",
    shadowColor: "#6366F1",
    shadowOpacity: 0.2,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 20,
    color: "#111827",
    paddingRight: 8,
    textAlignVertical: "center",
  },
  micButton: {
    padding: 4,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    width: 32,
    height: 32,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sendButtonActive: {
    backgroundColor: "#6366F1",
  },
  sendButtonInactive: {
    backgroundColor: "#6A53E7",
  },
  sendIcon: {
    marginLeft: 2,
  },
});

export default MessageInput;

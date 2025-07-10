import { useTheme } from "@/components/ThemeProvider";
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
  const { theme } = useTheme();
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
      <View style={[
        styles.inputContainer, 
        { backgroundColor: theme.colors.card, borderColor: theme.colors.border },
        focused && [styles.inputFocused, { borderColor: theme.colors.primary }]
      ]}>
        <TextInput
          style={[styles.textInput, { color: theme.colors.text }]}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textTertiary}
          value={message}
          onChangeText={setMessage}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          multiline
          maxLength={500}
        />

        <TouchableOpacity
          style={[styles.micButton, { backgroundColor: theme.colors.surface }]}
          onPress={handleMicPress}
          activeOpacity={0.7}
        >
          <Ionicons name="mic" size={20} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[
          styles.sendButton,
          message.trim() 
            ? [styles.sendButtonActive, { backgroundColor: theme.colors.primary }]
            : [styles.sendButtonInactive, { backgroundColor: theme.colors.primary }],
        ]}
        onPress={handleSend}
        disabled={!message.trim()}
        activeOpacity={0.8}
      >
        <Ionicons name="send" size={20} color={theme.colors.background} style={styles.sendIcon} />
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
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 48,
    maxHeight: 120,
    borderWidth: 1,
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
    shadowOpacity: 0.2,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 20,
    paddingRight: 8,
    textAlignVertical: "center",
  },
  micButton: {
    padding: 4,
    borderRadius: 16,
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
  sendButtonActive: {},
  sendButtonInactive: {},
  sendIcon: {
    marginLeft: 2,
  },
});

export default MessageInput;

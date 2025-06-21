import { colors } from "@/constants";
import { theme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface SelectOption {
  value: string;
  label: string;
  icon?: string;
}

interface IInput {
  placeholder?: string;
  type?: "text" | "password" | "select";
  icon?: React.ReactNode;
  hasIcon?: boolean;
  rightIcon?: React.ReactNode;
  options?: SelectOption[];
  onSelectChange?: (value: string) => void;
  value?: string;
  onChangeText?: (text: string) => void;
}

const Input = ({
  placeholder = "",
  icon,
  type = "text",
  hasIcon = true,
  options = [],
  onSelectChange,
  rightIcon,
  value,
  onChangeText,
}: IInput) => {
  const [focused, setFocused] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
    options.find((opt) => opt.value === value) || null
  );

  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);
  const styles = getStyles(hasIcon);

  const handleSelectOption = (option: SelectOption) => {
    setSelectedOption(option);
    setModalVisible(false);
    onSelectChange?.(option.value);
  };

  if (type === "select") {
    return (
      <>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={[
            styles.wrapper,
            focused
              ? { borderColor: colors.Primary }
              : { borderColor: "transparent" },
          ]}
        >
          {hasIcon && icon}
          <View style={styles.selectContainer}>
            <Text
              style={[
                styles.selectText,
                selectedOption
                  ? { color: colors.Greyscale[500] }
                  : { color: colors.Greyscale[300] },
              ]}
            >
              {selectedOption ? selectedOption.label : placeholder}
            </Text>
          </View>
          <Ionicons
            name="chevron-down"
            size={20}
            color={colors.Greyscale[500]}
            style={styles.chevron}
          />
        </TouchableOpacity>

        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
          >
            <View style={styles.modalContent}>
              <FlatList
                data={options}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.optionItem}
                    onPress={() => handleSelectOption(item)}
                  >
                    {item.icon && (
                      <Ionicons
                        name={item.icon as any}
                        size={22}
                        color={colors.Greyscale[500]}
                        style={styles.optionIcon}
                      />
                    )}
                    <Text style={styles.optionText}>{item.label}</Text>
                    {selectedOption?.value === item.value && (
                      <Ionicons
                        name="checkmark"
                        size={20}
                        color={colors.Primary}
                      />
                    )}
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </>
    );
  }

  return (
    <View
      style={[
        styles.wrapper,
        focused
          ? { borderColor: colors.Primary }
          : { borderColor: "transparent" },
      ]}
    >
      {hasIcon && icon}

      <TextInput
        onFocus={handleFocus}
        placeholderTextColor={focused ? colors.Primary : colors.Greyscale[300]}
        onBlur={handleBlur}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={type === "password"}
        placeholder={placeholder}
        style={[styles.input]}
        value={value}
        onChangeText={onChangeText}
      />

      {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
    </View>
  );
};

export default Input;

const getStyles = (hasIcon: boolean) =>
  StyleSheet.create({
    wrapper: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      width: "100%",
      position: "relative",
      height: 56,
      borderRadius: 12,
      backgroundColor: colors.Greyscale[50],
      paddingHorizontal: 20,
      overflow: "hidden",
      paddingLeft: hasIcon ? 52 : 20,
    },
    rightIcon: {
      position: "absolute",
      right: 18,
    },
    input: {
      fontSize: 14,
      fontFamily: theme.font.bold,
      color: colors.Greyscale[500],
      height: "100%",
      width: "100%",
    },
    selectContainer: {
      flex: 1,
      justifyContent: "center",
      height: "100%",
    },
    selectText: {
      fontSize: 14,
      fontFamily: theme.font.bold,
    },
    chevron: {
      position: "absolute",
      right: 20,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      backgroundColor: "white",
      borderRadius: 12,
      width: "80%",
      maxHeight: "50%",
      elevation: 5,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    optionItem: {
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: "#F0F0F0",
    },
    optionIcon: {
      marginRight: 12,
    },
    optionText: {
      fontSize: 16,
      flex: 1,
      fontFamily: theme.font.bold,
    },
  });

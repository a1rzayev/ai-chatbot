import Button from "@/components/UI/Button";
import Divider from "@/components/UI/Divider";
import Input from "@/components/UI/Input";
import { colors } from "@/constants";
import { FacebookIcon, GoogleIcon } from "@/constants/icons";
import { theme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Key, Lock1 } from "iconsax-react-nativejs";
import { KeyboardAvoidingView, Pressable, StyleSheet, Text, View } from "react-native";

const Register = () => {
  return (
    <KeyboardAvoidingView
      style={{
        width: "100%",
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          width: "100%",
          height: "10%",
          alignItems: "center",
          paddingTop: 10,
          gap: 10,
        }}
      >
        <Image
          source={require("../../assets/images/purple.png")}
          style={{ width: 125, height: 125 }}
        />
        <Text style={{ fontFamily: theme.font.bold, fontSize: 28 }}>
          Register
        </Text>
        <Text
          style={{
            fontFamily: theme.font.bold,
            fontSize: 16,
            color: "#7D7C82",
          }}
        >
          Enter your register details
        </Text>
      </View>
      <View style={{ gap: 19 }}>
        <Input
          placeholder="Enter Email"
          type="text"
          icon={
            <Ionicons
              name="person"
              style={{
                position: "absolute",
                left: 18,
                top: "46%",
                transform: [{ translateY: "-50%" }],
              }}
              size={22}
              color={colors.Greyscale[500]}
            />
          }
        />
        <Input
          placeholder="Enter Email"
          type="text"
          icon={
            <Ionicons
              name="mail"
              style={{
                position: "absolute",
                left: 18,
                top: "46%",
                transform: [{ translateY: "-50%" }],
              }}
              size={22}
              color={colors.Greyscale[500]}
            />
          }
        />
        <Input
          placeholder="Enter Password"
          type="password"
          icon={
            <Lock1
              variant="Bold"
              style={{
                position: "absolute",
                left: 18,
                top: "50%",
                transform: [{ translateY: "-50%" }],
              }}
              size={24}
              color={colors.Greyscale[500]}
            />
          }
        />
         <Input
          placeholder="Confirm Password"
          type="password"
          icon={
            <Lock1
              variant="Bold"
              style={{
                position: "absolute",
                left: 18,
                top: "50%",
                transform: [{ translateY: "-50%" }],
              }}
              size={24}
              color={colors.Greyscale[500]}
            />
          }
        />
        <Pressable
          style={styles.button}
          onPress={() => {
            router.push("/(tabs)/chatbot");
          }}
        >
          <Text style={styles.buttonText}>Register</Text>
        </Pressable>
      </View>
      <View
        style={{
          paddingBottom: 15,
          flexDirection: "row",
          gap: 5,
          justifyContent: "center",
        }}
      >
        <Text style={{ fontFamily: theme.font.bold, fontSize: 14 }}>
          Already have an account?
        </Text>
        <Pressable onPress={() => router.push("/(auth)/login")}>
          <Text
            style={{
              color: "#8C53E7",
              fontFamily: theme.font.bold,
              fontSize: 14,
            }}
          >
            Login
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
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
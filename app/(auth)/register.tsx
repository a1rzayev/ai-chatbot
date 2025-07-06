import Input from "@/components/UI/Input";
import { colors } from "@/constants";
import { theme } from "@/constants/theme";
import { useAuthStore } from "@/store/auth-store";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Lock1 } from "iconsax-react-nativejs";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const { register, loading, error, clearError } = useAuthStore();

  const handleRegister = async () => {
    console.log("Registering user:", {
      username,
      email,
      password,
      confirmPassword,
      termsAccepted,
    });
    if (!username || !email || !password || !confirmPassword) {
      return;
    }

    if (password !== confirmPassword) {
      clearError();
      return;
    }

    if (!termsAccepted) {
      clearError();
      return;
    }

    const success = await register(username, email, password, confirmPassword);
    if (success) {
      router.replace("/(auth)/login");
    }
  };
  
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

      <View style={{ gap: 15 }}>
        {error && (
          <Text
            style={{
              color: "red",
              textAlign: "center",
              fontFamily: theme.font.bold,
            }}
          >
            {error}
          </Text>
        )}

        <Input
          placeholder="Enter Username"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
            if (error) clearError();
          }}
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
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (error) clearError();
          }}
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
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (error) clearError();
          }}
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
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            if (error) clearError();
          }}
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
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
        >
          <Switch
            value={termsAccepted}
            onValueChange={setTermsAccepted}
            trackColor={{
              false: colors.Greyscale[200],
              true: colors.Primary[500],
            }}
          />
          <Text style={{ marginLeft: 8, fontFamily: theme.font.bold }}>
            I accept the Terms and Conditions
          </Text>
        </View>

        <Pressable
          style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={handleRegister}
          disabled={loading || !termsAccepted}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Register</Text>
          )}
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
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: theme.font.bold,
  },
});

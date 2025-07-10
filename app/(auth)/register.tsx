import { useTheme } from "@/components/ThemeProvider";
import Input from "@/components/UI/Input";
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
  const { theme } = useTheme();
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
      style={[
        {
          width: "100%",
          flex: 1,
          justifyContent: "space-between",
        },
        { backgroundColor: theme.colors.background }
      ]}
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
        <Text style={[{ fontSize: 28, fontWeight: "700" }, { color: theme.colors.text }]}>
          Register
        </Text>
        <Text
          style={[
            {
              fontSize: 16,
            },
            { color: theme.colors.textSecondary }
          ]}
        >
          Enter your register details
        </Text>
      </View>

      <View style={{ gap: 15 }}>
        {error && (
          <Text
            style={[
              {
                textAlign: "center",
                fontSize: 14,
                fontWeight: "600",
              },
              { color: theme.colors.error }
            ]}
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
              color={theme.colors.textSecondary}
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
              color={theme.colors.textSecondary}
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
              color={theme.colors.textSecondary}
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
              color={theme.colors.textSecondary}
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
              false: theme.colors.greyscale[200],
              true: theme.colors.primary,
            }}
          />
          <Text style={[{ marginLeft: 8, fontSize: 14, fontWeight: "600" }, { color: theme.colors.text }]}>
            I accept the Terms and Conditions
          </Text>
        </View>

        <Pressable
          style={[
            styles.button, 
            { backgroundColor: theme.colors.primary },
            loading && { opacity: 0.7 }
          ]}
          onPress={handleRegister}
          disabled={loading || !termsAccepted}
        >
          {loading ? (
            <ActivityIndicator color={theme.colors.background} />
          ) : (
            <Text style={[styles.buttonText, { color: theme.colors.background }]}>Register</Text>
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
        <Text style={[{ fontSize: 14, fontWeight: "600" }, { color: theme.colors.textSecondary }]}>
          Already have an account?
        </Text>
        <Pressable onPress={() => router.push("/(auth)/login")}>
          <Text
            style={[
              {
                fontSize: 14,
                fontWeight: "600",
              },
              { color: theme.colors.primary }
            ]}
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
    borderRadius: 15,
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});

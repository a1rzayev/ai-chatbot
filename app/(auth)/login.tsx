import { useTheme } from "@/components/ThemeProvider";
import Button from "@/components/UI/Button";
import Divider from "@/components/UI/Divider";
import Input from "@/components/UI/Input";
import { FacebookIcon, GoogleIcon } from "@/constants/icons";
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
    Text,
    View
} from "react-native";

const Login = () => {
  const { theme } = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { login, loading, error, clearError } = useAuthStore();

  const handleLogin = async () => {
    if (!username || !password) {
      return;
    }

    const success = await login(username, password, rememberMe);
    if (success) {
      router.replace("/(tabs)/chatbot");
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
          height: "30%",
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
          Welcome Back!
        </Text>
        <Text
          style={[
            {
              fontSize: 16,
            },
            { color: theme.colors.textSecondary }
          ]}
        >
          Enter your login details
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
                top: "48%",
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

        <Pressable
          style={[
            styles.button, 
            { backgroundColor: theme.colors.primary },
            loading && { opacity: 0.7 }
          ]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={theme.colors.background} />
          ) : (
            <Text style={[styles.buttonText, { color: theme.colors.background }]}>Login</Text>
          )}
        </Pressable>

        <Divider text="Or" />
      </View>

      <View style={{ gap: 15 }}>
        <Button
          variant="white"
          rounded="lg"
          icon={<GoogleIcon />}
          text="Login with Google"
          onPress={() => console.log()}
        />
        <Button
          variant="white"
          rounded="lg"
          icon={<FacebookIcon />}
          text="Login with Facebook"
          onPress={() => console.log()}
        />
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
          Don't have an account yet?
        </Text>
        <Pressable onPress={() => router.push("/(auth)/register")}>
          <Text
            style={[
              {
                fontSize: 14,
                fontWeight: "600",
              },
              { color: theme.colors.primary }
            ]}
          >
            Register
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  button: {
    borderRadius: 15,
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});

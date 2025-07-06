import Button from "@/components/UI/Button";
import Divider from "@/components/UI/Divider";
import Input from "@/components/UI/Input";
import { colors } from "@/constants";
import { FacebookIcon, GoogleIcon } from "@/constants/icons";
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

const Login = () => {
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
      style={{
        width: "100%",
        flex: 1,
        justifyContent: "space-between",
      }}
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
        <Text style={{ fontFamily: theme.font.bold, fontSize: 28 }}>
          Welcome Back!
        </Text>
        <Text
          style={{
            fontFamily: theme.font.bold,
            fontSize: 16,
            color: "#7D7C82",
          }}
        >
          Enter your login details
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
                top: "48%",
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

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Switch
            value={rememberMe}
            onValueChange={setRememberMe}
            trackColor={{
              false: colors.Greyscale[200],
              true: colors.Primary[500],
            }}
          />
          <Text style={{ marginLeft: 8, fontFamily: theme.font.bold }}>
            Remember me
          </Text>
        </View>

        <Pressable
          style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
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
        <Text style={{ fontFamily: theme.font.bold, fontSize: 14 }}>
          Don't have an account yet?
        </Text>
        <Pressable onPress={() => router.push("/(auth)/register")}>
          <Text
            style={{
              color: "#8C53E7",
              fontFamily: theme.font.bold,
              fontSize: 14,
            }}
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

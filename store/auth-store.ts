import { loginApi, registerApi } from "@/services/auth-api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type User = {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role?: string;
};

type AuthStore = {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
  login: (
    username: string,
    password: string,
    rememberMe: boolean
  ) => Promise<boolean>;
  register: (
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      loading: false,
      error: null,
      login: async (username, password, rememberMe) => {
        set({ loading: true, error: null });
        try {
          const { token, user } = await loginApi(
            username,
            password,
            rememberMe
          );
          set({
            token,
            user,
            loading: false,
            refreshToken: rememberMe ? token : null, // Пример - в реальности refreshToken может быть другим
          });
          return true;
        } catch (e: any) {
          const errorMessage = e.response?.data?.message || "Login failed";
          set({
            loading: false,
            error: errorMessage,
          });
          return false;
        }
      },
      register: async (username, email, password, confirmPassword) => {
        set({ loading: true, error: null });
        try {
          const { token, user } = await registerApi(
            username,
            email,
            password,
            confirmPassword
          );
          set({ token, user, loading: false });
          return true;
        } catch (e: any) {
          const errorMessage =
            e.response?.data?.message || "Registration failed";
          console.log(errorMessage)
          set({
            loading: false,
            error: errorMessage,
          });
          return false;
        }
      },
      logout: () => {
        set({ user: null, token: null, refreshToken: null });
      },
      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        token: state.token,
        refreshToken: state.refreshToken,
        user: state.user,
      }),
    }
  )
);

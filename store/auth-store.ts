import { loginApi, registerApi } from "@/services/auth-api";
import { googleAuthService } from "@/services/google-auth";
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
  picture?: string;
  provider?: 'email' | 'google';
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
  loginWithGoogle: () => Promise<boolean>;
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
    (set, get) => ({
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
      loginWithGoogle: async () => {
        set({ loading: true, error: null });
        try {
          const { user: googleUser, accessToken, idToken } = await googleAuthService.signIn();
          
          // Convert Google user to our User type
          const user: User = {
            id: googleUser.id,
            username: googleUser.email, // Use email as username for Google users
            email: googleUser.email,
            firstName: googleUser.given_name,
            lastName: googleUser.family_name,
            picture: googleUser.picture,
            provider: 'google',
            role: 'user', // Default role
          };

          set({
            token: accessToken,
            user,
            loading: false,
            refreshToken: accessToken, // For Google, we might handle refresh differently
          });
          return true;
        } catch (e: any) {
          const errorMessage = e.message || "Google login failed";
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
          set({
            loading: false,
            error: errorMessage,
          });
          return false;
        }
      },
      logout: async () => {
        // If user was logged in with Google, sign out from Google as well
        const currentUser = get().user;
        if (currentUser?.provider === 'google') {
          try {
            await googleAuthService.signOut(get().token || undefined);
          } catch (error) {
            console.error('Failed to sign out from Google:', error);
          }
        }
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

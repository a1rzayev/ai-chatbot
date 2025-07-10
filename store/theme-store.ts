import { darkTheme, lightTheme } from "@/constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ThemeMode = "light" | "dark" | "system";

type ThemeStore = {
  mode: ThemeMode;
  isDark: boolean;
  theme: typeof lightTheme;
  setMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      mode: "system",
      isDark: false,
      theme: lightTheme,
      
      setMode: (mode: ThemeMode) => {
        const isDark = mode === "dark";
        console.log('Theme mode set:', { mode, isDark });
        set({
          mode,
          isDark,
          theme: isDark ? darkTheme : lightTheme,
        });
      },
      
      toggleTheme: () => {
        const currentMode = get().mode;
        const newMode = currentMode === "light" ? "dark" : "light";
        const isDark = newMode === "dark";
        
        console.log('Theme toggle called:', { currentMode, newMode, isDark });
        
        set({
          mode: newMode,
          isDark,
          theme: isDark ? darkTheme : lightTheme,
        });
      },
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        mode: state.mode,
        isDark: state.isDark,
      }),
      onRehydrateStorage: () => (state) => {
        // Ensure theme is properly set after rehydration
        if (state) {
          const isDark = state.isDark;
          state.theme = isDark ? darkTheme : lightTheme;
        }
      },
    }
  )
); 
import { useThemeStore } from "@/store/theme-store";
import React, { createContext, useContext, useEffect } from "react";
import { useColorScheme } from "react-native";
import { lightTheme, darkTheme } from "@/constants/theme";

type ThemeContextType = {
  theme: ReturnType<typeof useThemeStore>["theme"];
  isDark: boolean;
  mode: "light" | "dark" | "system";
  toggleTheme: () => void;
  setMode: (mode: "light" | "dark" | "system") => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

type ThemeProviderProps = {
  children: React.ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const colorScheme = useColorScheme();
  const { theme, isDark, mode, toggleTheme, setMode } = useThemeStore();

  // Update theme when system color scheme changes
  useEffect(() => {
    if (mode === "system" && colorScheme) {
      const isDarkMode = colorScheme === "dark";
      useThemeStore.setState({
        isDark: isDarkMode,
        theme: isDarkMode ? darkTheme : lightTheme,
      });
    } else if (mode === "system" && !colorScheme) {
      // Fallback to light theme if colorScheme is null
      useThemeStore.setState({
        isDark: false,
        theme: lightTheme,
      });
    }
  }, [colorScheme, mode]);

  const value: ThemeContextType = {
    theme,
    isDark,
    mode,
    toggleTheme,
    setMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}; 
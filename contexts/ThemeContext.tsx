import React, { createContext, useContext, useState, useEffect } from "react";
import {
  MD3LightTheme,
  MD3DarkTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Use built-in presets
const lightTheme = MD3LightTheme;
const darkTheme = MD3DarkTheme;

interface ThemeContextType {
  isDark: boolean;
  theme: typeof lightTheme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Load theme from storage
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("theme");
        if (savedTheme !== null) {
          setIsDark(savedTheme === "dark");
        }
      } catch (error) {
        console.error("Failed to load theme from storage", error);
      }
    };

    loadTheme();
  }, []);

  const theme = isDark ? darkTheme : lightTheme;

  const toggleTheme = async () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    try {
      await AsyncStorage.setItem("theme", newIsDark ? "dark" : "light");
    } catch (error) {
      console.error("Failed to save theme to storage", error);
    }
  };

  return (
    <ThemeContext.Provider value={{ isDark, theme, toggleTheme }}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

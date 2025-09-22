import React, { createContext, useContext, useState } from 'react';
import { MD3LightTheme, MD3DarkTheme, Provider as PaperProvider } from 'react-native-paper';

// Use built-in presets
const lightTheme = MD3LightTheme;
const darkTheme = MD3DarkTheme;

interface ThemeContextType {
  isDark: boolean;
  theme: typeof lightTheme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  
  const theme = isDark ? darkTheme : lightTheme;
  
  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ isDark, theme, toggleTheme }}>
      <PaperProvider theme={theme}>
        {children}
      </PaperProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

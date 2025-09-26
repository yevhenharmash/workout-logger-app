import React from "react";
import { Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SettingsProvider } from "./contexts/SettingsContext";
import { WorkoutProvider } from "./contexts/WorkoutContext";
import { HomePage } from "./screens/HomePage";

// Conditional import for toast - only import on mobile platforms
let ToastMessage: any = null;
if (Platform.OS !== "web") {
  try {
    ToastMessage = require("react-native-simple-toast").default;
  } catch (error) {
    console.log("Toast library not available:", error);
  }
}

const Main = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <SettingsProvider>
          <WorkoutProvider>
            <HomePage />
          </WorkoutProvider>
        </SettingsProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

// App component - just exports Main
export function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <Main />
    </SafeAreaProvider>
  );
}

import React, { useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  BottomNavigation,
  useTheme as usePaperTheme,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../contexts/ThemeContext";
import { HomeScreen } from "../screens/HomeScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import { DayScreen } from "../screens/DayScreen";
import {
  BottomSheetModal,
  BottomSheetModalRef,
} from "../components/BottomSheetModal";
import { LogActivityModal } from "../components/LogActivityModal";

// Navigation state type
type NavigationState = {
  index: number;
  routes: Array<{
    key: string;
    title: string;
    focusedIcon: string;
    unfocusedIcon: string;
  }>;
};

const AppNavigator = () => {
  const { theme } = useTheme();
  const paperTheme = usePaperTheme();
  const logModalRef = useRef<BottomSheetModalRef>(null);
  const [navigationState, setNavigationState] = useState<NavigationState>({
    index: 0,
    routes: [
      {
        key: "home",
        title: "Home",
        focusedIcon: "home",
        unfocusedIcon: "home-outline",
      },
      {
        key: "quick-workout",
        title: "Quick Workout",
        focusedIcon: "dumbbell",
        unfocusedIcon: "dumbbell",
      },
      {
        key: "settings",
        title: "Settings & Info",
        focusedIcon: "cog",
        unfocusedIcon: "cog-outline",
      },
    ],
  });

  const handleIndexChange = (index: number) => {
    if (index === 1) {
      // Quick Workout tab - open modal instead of navigating
      handleQuickWorkoutPress();
      return;
    }
    setNavigationState({ ...navigationState, index });
  };

  const handleQuickWorkoutPress = () => {
    logModalRef.current?.expand();
  };

  const handleCloseModal = () => {
    logModalRef.current?.close();
  };

  const renderScene = () => {
    switch (navigationState.routes[navigationState.index].key) {
      case "home":
        return <HomeScreen navigation={{ navigate: () => {} }} />;
      case "settings":
        return <SettingsScreen />;
      default:
        return <HomeScreen navigation={{ navigate: () => {} }} />;
    }
  };

  return (
    <View style={styles.container}>
      <BottomNavigation
        navigationState={navigationState}
        onIndexChange={handleIndexChange}
        renderScene={renderScene}
        renderIcon={({ route, focused, color }) => (
          <MaterialCommunityIcons
            name={
              focused
                ? (route.focusedIcon as any)
                : (route.unfocusedIcon as any)
            }
            size={24}
            color={color}
          />
        )}
        barStyle={{
          backgroundColor: paperTheme.colors.surface,
        }}
      />

      <BottomSheetModal ref={logModalRef} onClose={handleCloseModal}>
        <LogActivityModal onClose={handleCloseModal} theme={theme} />
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export { AppNavigator };

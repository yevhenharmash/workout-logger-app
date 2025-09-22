import React from "react";
import { IconButton } from "react-native-paper";
import { useTheme } from "../contexts/ThemeContext";

export const Logo = () => {
  const { theme } = useTheme();

  return (
    <IconButton
      icon="dumbbell"
      size={28}
      iconColor={theme.colors.secondary}
      style={{ margin: 0 }}
    />
  );
};

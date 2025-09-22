import React from 'react';
import { IconButton } from 'react-native-paper';
import { useTheme } from '../contexts/ThemeContext';

const Logo = () => {
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

export default Logo;

import React, { useState, useRef, useEffect } from 'react';
import { Text, View, TouchableOpacity, Animated, Platform, PanResponder } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { ThemeProvider } from './contexts/ThemeContext';
import HomePage from './screens/HomePage';

// Conditional import for toast - only import on mobile platforms
let ToastMessage: any = null;
if (Platform.OS !== 'web') {
  try {
    ToastMessage = require('react-native-simple-toast').default;
  } catch (error) {
    console.log('Toast library not available:', error);
  }
}

const Main = () => {
  return (
    <ThemeProvider>
      <HomePage />
    </ThemeProvider>
  );
};

// App component - just exports Main
export default function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <Main />
    </SafeAreaProvider>
  );
}

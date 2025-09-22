import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Card, Title, Paragraph, Button, IconButton, BottomNavigation } from 'react-native-paper';
import { useTheme } from '../contexts/ThemeContext';
import Logo from '../components/Logo';
import Heatmap from '../components/Heatmap';

const HomePage = () => {
  const [index, setIndex] = useState(0);
  const { theme, toggleTheme } = useTheme();

  const [routes] = useState([
    { key: 'home', title: 'Home', icon: 'home-outline', focusedIcon: 'home' },
    { key: 'log', title: 'Log Activity', icon: 'plus-circle-outline', focusedIcon: 'plus-circle' },
    { key: 'settings', title: 'Settings', icon: 'cog-outline', focusedIcon: 'cog' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    log: LogScreen,
    settings: SettingsScreen,
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header style={styles.contentContainer}>
        <Logo />
        <Appbar.Content title="" />
        <Appbar.Action 
          icon="theme-light-dark" 
          onPress={toggleTheme}
          iconColor="#333333"
        />
        <Button 
          mode="contained" 
          buttonColor={theme.colors.secondary}
          textColor={theme.colors.onSecondary}
        >
          Pro
        </Button>
      </Appbar.Header>

      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        barStyle={{ backgroundColor: theme.colors.surface }}
        activeColor={theme.colors.primary}
        inactiveColor={theme.colors.onSurfaceVariant}
        labeled={true}
        shifting={false}
      />
    </View>
  );
};

const HomeScreen = () => (
  <View style={[styles.contentContainer, { flex: 1 }]}>
    <Card style={styles.card}>
      <Card.Content>
        <Title>Today - {new Date().toLocaleDateString()}</Title>
        <Paragraph>No workout logged for today.</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button>Log Workout</Button>
      </Card.Actions>
    </Card>

    <Heatmap />
  </View>
);

const LogScreen = () => (
  <View style={styles.center}>
    <Title>Log Activity Screen</Title>
  </View>
);
const SettingsScreen = () => (
  <View style={styles.center}>
    <Title>Settings Screen</Title>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  card: {
    marginBottom: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomePage;

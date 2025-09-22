import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Appbar, Card, Title, Paragraph, Button, IconButton, BottomNavigation } from 'react-native-paper';
import { useTheme } from '../contexts/ThemeContext';
import Logo from '../components/Logo';
import Heatmap from '../components/Heatmap';
import BottomSheetModal from '../components/BottomSheetModal';
import ProModal from '../components/ProModal';
import LogActivityModal from '../components/LogActivityModal';

const HomePage = () => {
  const [index, setIndex] = useState(0);
  const [showLogModal, setShowLogModal] = useState(false);
  const [showProModal, setShowProModal] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const [routes] = useState([
    { key: 'home', title: 'Home', icon: 'home-outline', focusedIcon: 'home' },
    { key: 'log', title: 'Log Activity', icon: 'plus-circle-outline', focusedIcon: 'plus-circle' },
    { key: 'settings', title: 'Settings', icon: 'cog-outline', focusedIcon: 'cog' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    log: () => null, // We'll handle this with modal
    settings: SettingsScreen,
  });

  const handleIndexChange = (newIndex: number) => {
    const route = routes[newIndex];
    if (route.key === 'log') {
      setShowLogModal(true);
      // Don't change the index, stay on current tab
      return;
    }
    setIndex(newIndex);
  };

  const handleCloseModal = () => {
    setShowLogModal(false);
  };

  const handleCloseProModal = () => {
    setShowProModal(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header 
        style={[
          styles.contentContainer,
          { backgroundColor: theme.colors.surface }
        ]}
      >
        <Logo />
        <Appbar.Content title="" />
        <Appbar.Action 
          icon="theme-light-dark" 
          onPress={toggleTheme}
          iconColor={theme.colors.secondary}
        />
        <Button 
          mode="contained" 
          buttonColor={theme.colors.secondary}
          textColor={theme.colors.onSecondary}
          onPress={() => setShowProModal(true)}
          icon="crown"
        >
          Pro
        </Button>
      </Appbar.Header>

      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={handleIndexChange}
        renderScene={renderScene}
        barStyle={[
          styles.bottomNavigation,
          { 
            backgroundColor: theme.colors.surface
          }
        ]}
        activeColor={theme.colors.primary}
        inactiveColor={theme.colors.onSurfaceVariant}
        labeled={true}
        shifting={false}
      />

      <BottomSheetModal
        visible={showLogModal}
        onDismiss={handleCloseModal}
        maxHeight={0.8}
        backgroundColor={theme.colors.surface}
      >
        <LogActivityModal 
          onClose={handleCloseModal}
          theme={theme}
        />
      </BottomSheetModal>

      <BottomSheetModal
        visible={showProModal}
        onDismiss={handleCloseProModal}
        maxHeight={0.9}
        backgroundColor={theme.colors.surface}
      >
        <ProModal 
          onClose={handleCloseProModal}
          theme={theme}
        />
      </BottomSheetModal>
    </View>
  );
};

const HomeScreen = () => (
  <ScrollView style={[styles.contentContainer, { flex: 1 }]} showsVerticalScrollIndicator={false}>
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
  </ScrollView>
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
  bottomNavigation: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
});

export default HomePage;

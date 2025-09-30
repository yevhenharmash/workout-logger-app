import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  Appbar,
  Card,
  Title,
  Paragraph,
  Button,
  FAB,
} from "react-native-paper";
import { useTheme } from "../contexts/ThemeContext";
import { Logo } from "../components/Logo";

interface DayScreenProps {
  navigation: any;
  route: any;
}

export const DayScreen: React.FC<DayScreenProps> = ({ navigation, route }) => {
  const date = route.params?.date || new Date();
  const { theme } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Appbar.Header
        style={[
          styles.contentContainer,
          { backgroundColor: theme.colors.surface },
        ]}
      >
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={date.toLocaleDateString()} />
      </Appbar.Header>

      <ScrollView
        style={[styles.contentContainer, { flex: 1 }]}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.card}>
          <Card.Content>
            <Title>Today's Workout</Title>
            <Paragraph>No workout logged for this day.</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button
              mode="contained"
              onPress={() => navigation.navigate("Log")}
              buttonColor={theme.colors.primary}
              textColor={theme.colors.onPrimary}
            >
              Add Activity
            </Button>
          </Card.Actions>
        </Card>
      </ScrollView>

      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => navigation.navigate("Log")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  card: {
    marginTop: 16,
    marginBottom: 16,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

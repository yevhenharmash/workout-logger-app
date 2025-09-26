import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  Text,
  Card,
  Switch,
  List,
  Divider,
  useTheme,
} from "react-native-paper";
import { useSettings } from "../contexts/SettingsContext";

export const SettingsScreen: React.FC = () => {
  const theme = useTheme();
  const { weightUnit, setWeightUnit, isLoading } = useSettings();

  if (isLoading) {
    return (
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <View style={styles.contentContainer}>
          <Text variant="bodyLarge">Loading settings...</Text>
        </View>
      </View>
    );
  }

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          <Text variant="headlineSmall" style={styles.title}>
            Settings
          </Text>

          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Settings
              </Text>

              <List.Item
                title="Weight Unit"
                // description={`Currently using ${weightUnit.toUpperCase()}`}
                right={() => (
                  <View style={styles.switchContainer}>
                    <Text variant="bodyMedium" style={styles.unitLabel}>
                      lbs
                    </Text>
                    <Switch
                      value={weightUnit === "kg"}
                      onValueChange={(isKg) =>
                        setWeightUnit(isKg ? "kg" : "lbs")
                      }
                      color={theme.colors.primary}
                    />
                    <Text variant="bodyMedium" style={styles.unitLabel}>
                      kg
                    </Text>
                  </View>
                )}
                style={styles.listItem}
              />
            </Card.Content>
          </Card>

          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                About
              </Text>

              <List.Item
                title="Version"
                // description="1.0.0"
                right={() => <Text variant="bodyMedium">1.0.0</Text>}
                style={styles.listItem}
              />

              <Divider style={styles.divider} />

              <List.Item
                title="Developer"
                // description="Yevhen Harmash"
                right={() => <Text variant="bodyMedium">Yevhen Harmash</Text>}
                style={styles.listItem}
              />
              {/* <Divider style={styles.divider} />
              <List.Item
                title="Privacy Policy"
                onPress={() => Linking.openURL("https://www.google.com")}
                style={styles.listItem}
              />
              <Divider style={styles.divider} /> */}
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    marginBottom: 24,
    fontWeight: "bold",
  },
  card: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 16,
    fontWeight: "600",
  },
  listItem: {
    paddingVertical: 8,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  unitLabel: {
    minWidth: 30,
    textAlign: "center",
  },
  divider: {
    marginVertical: 8,
  },
});

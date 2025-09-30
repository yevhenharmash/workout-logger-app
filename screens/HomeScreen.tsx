import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  Appbar,
  Card,
  Text,
  Paragraph,
  Button,
  TextInput,
} from "react-native-paper";
import { useTheme } from "../contexts/ThemeContext";
import { Logo } from "../components/Logo";
import { Heatmap } from "../components/Heatmap";
import {
  BottomSheetModal,
  BottomSheetModalRef,
} from "../components/BottomSheetModal";
import { ProModal } from "../components/ProModal";
import { HistoryModal } from "../components/HistoryModal";

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { theme, toggleTheme } = useTheme();
  const proModalRef = useRef<BottomSheetModalRef>(null);
  const historyModalRef = useRef<BottomSheetModalRef>(null);

  const handleShowProModal = () => {
    proModalRef.current?.expand();
  };

  const handleCloseProModal = () => {
    proModalRef.current?.close();
  };

  const handleShowHistoryModal = () => {
    historyModalRef.current?.expand();
  };

  const handleCloseHistoryModal = () => {
    historyModalRef.current?.close();
  };

  const handleLogWorkout = () => {
    navigation.navigate("Day", { date: new Date() });
  };

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
          onPress={handleShowProModal}
          icon="crown"
        >
          Pro
        </Button>
      </Appbar.Header>

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          style={[styles.contentContainer, { flex: 1 }]}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="headlineSmall">
                Today - {new Date().toLocaleDateString()}
              </Text>
              <Paragraph>No workout logged for today.</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button onPress={handleLogWorkout}>Log for Today</Button>
            </Card.Actions>
          </Card>

          <Heatmap onHistoryPress={handleShowHistoryModal} />

          <TextInput
            placeholder="Type here to test keyboard"
            style={{ marginTop: 16 }}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      <BottomSheetModal
        snapPoints={["80%", "90%"]}
        ref={proModalRef}
        onClose={handleCloseProModal}
      >
        <ProModal onClose={handleCloseProModal} theme={theme} />
      </BottomSheetModal>

      <BottomSheetModal
        ref={historyModalRef}
        snapPoints={["70%", "90%"]}
        onClose={handleCloseHistoryModal}
      >
        <HistoryModal onClose={handleCloseHistoryModal} theme={theme} />
      </BottomSheetModal>
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
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  card: {
    marginBottom: 16,
  },
});

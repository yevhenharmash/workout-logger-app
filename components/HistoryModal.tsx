import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Text, Button, IconButton, Divider } from "react-native-paper";
import { CalendarModalContent } from "./Calendar";

interface HistoryModalProps {
  onClose: () => void;
  theme: any;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  onClose,
  theme,
}) => {
  return (
    <View
      style={[styles.modalContent, { backgroundColor: theme.colors.surface }]}
    >
      <View style={styles.modalHeader}>
        <Text variant="titleLarge">Workout History</Text>
        <IconButton
          icon="close"
          onPress={onClose}
          iconColor={theme.colors.onSurface}
        />
      </View>

      <Divider style={{ marginBottom: 16 }} />

      <CalendarModalContent
        onDateSelect={(date) => {
          console.log("Selected date:", date);
          // You can add logic here to show workout history for the selected date
        }}
        workoutDates={[
          // Same workout data as Heatmap component
          "2025-09-15",
          "2025-09-16",
          "2025-09-18",
          "2025-09-20",
          "2025-09-21",
        ]}
      />
    </View>
  );
};

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  modalContent: {
    width: screenWidth,
    height: screenHeight,
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 16,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
});

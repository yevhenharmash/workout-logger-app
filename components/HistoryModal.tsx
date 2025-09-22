import React from "react";
import { View, StyleSheet } from "react-native";
import { Title, Button, IconButton, Divider } from "react-native-paper";
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
    <View style={styles.modalContent}>
      <View style={styles.modalHeader}>
        <Title>Workout History</Title>
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
});

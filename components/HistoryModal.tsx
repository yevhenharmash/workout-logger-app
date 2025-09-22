import React from "react";
import { View, StyleSheet } from "react-native";
import { Title, Button, IconButton, Divider } from "react-native-paper";

interface HistoryModalProps {
  onClose: () => void;
  theme: any;
}

const HistoryModal: React.FC<HistoryModalProps> = ({ onClose, theme }) => {
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

      <View style={styles.emptyContent}>
        <Title style={styles.emptyTitle}>History Coming Soon</Title>
        <Button mode="outlined" onPress={onClose}>
          Close
        </Button>
      </View>
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
  emptyContent: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyTitle: {
    textAlign: "center",
    marginBottom: 20,
    opacity: 0.7,
  },
});

export default HistoryModal;

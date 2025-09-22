import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  Title,
  Paragraph,
  Button,
  IconButton,
  TextInput,
  Divider,
} from "react-native-paper";

interface LogActivityModalProps {
  onClose: () => void;
  theme: any;
}

export const LogActivityModal: React.FC<LogActivityModalProps> = ({
  onClose,
  theme,
}) => {
  const [activityName, setActivityName] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    // TODO: Implement save logic
    console.log("Saving activity:", { activityName, duration, notes });
    onClose();
  };

  return (
    <View style={styles.modalContent}>
      <View style={styles.modalHeader}>
        <Title>Log Activity</Title>
        <IconButton
          icon="close"
          onPress={onClose}
          iconColor={theme.colors.onSurface}
        />
      </View>

      <Divider style={{ marginBottom: 16 }} />

      <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
        <TextInput
          label="Activity Name"
          value={activityName}
          onChangeText={setActivityName}
          mode="outlined"
          style={styles.input}
        />

        <TextInput
          label="Duration (minutes)"
          value={duration}
          onChangeText={setDuration}
          mode="outlined"
          keyboardType="numeric"
          style={styles.input}
        />

        <TextInput
          label="Notes (optional)"
          value={notes}
          onChangeText={setNotes}
          mode="outlined"
          multiline
          numberOfLines={3}
          style={styles.input}
        />
      </ScrollView>

      <View style={styles.modalActions}>
        <Button
          mode="contained"
          onPress={handleSave}
          buttonColor={theme.colors.primary}
          textColor={theme.colors.onPrimary}
          style={styles.button}
        >
          Save Activity
        </Button>
        <Button mode="outlined" onPress={onClose} style={styles.button}>
          Cancel
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
  modalBody: {
    paddingVertical: 8,
  },
  input: {
    marginBottom: 16,
  },
  modalActions: {
    flexDirection: "column",
    paddingVertical: 16,
    paddingBottom: 32, // Extra padding for safe area
  },
  button: {
    marginBottom: 8,
  },
});

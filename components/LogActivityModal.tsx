import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  Text,
  Paragraph,
  Button,
  IconButton,
  TextInput,
  Divider,
  Card,
  Chip,
} from "react-native-paper";
import { useSettings } from "../contexts/SettingsContext";

interface Set {
  reps: number;
  weight: number;
  unit: "kg" | "lbs" | "bodyweight";
}

interface Exercise {
  id: string;
  name: string;
  sets: Set[];
}

interface Workout {
  name: string;
  date: string;
  exercises: Exercise[];
  notes?: string;
}

interface LogActivityModalProps {
  onClose: () => void;
  theme: any;
}

export const LogActivityModal: React.FC<LogActivityModalProps> = ({
  onClose,
  theme,
}) => {
  const { weightUnit: globalWeightUnit } = useSettings();
  const [workoutName, setWorkoutName] = useState("");
  const [notes, setNotes] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">("kg");

  // Update local weight unit when global setting changes
  useEffect(() => {
    setWeightUnit(globalWeightUnit);
  }, [globalWeightUnit]);

  const addExercise = () => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: "",
      sets: [{ reps: 0, weight: 0, unit: weightUnit }],
    };
    setExercises([...exercises, newExercise]);
  };

  const removeExercise = (exerciseId: string) => {
    setExercises(exercises.filter((ex) => ex.id !== exerciseId));
  };

  const updateExerciseName = (exerciseId: string, name: string) => {
    setExercises(
      exercises.map((ex) => (ex.id === exerciseId ? { ...ex, name } : ex))
    );
  };

  const addSet = (exerciseId: string) => {
    setExercises(
      exercises.map((ex) =>
        ex.id === exerciseId
          ? {
              ...ex,
              sets: [...ex.sets, { reps: 0, weight: 0, unit: weightUnit }],
            }
          : ex
      )
    );
  };

  const removeSet = (exerciseId: string, setIndex: number) => {
    setExercises(
      exercises.map((ex) =>
        ex.id === exerciseId
          ? { ...ex, sets: ex.sets.filter((_, index) => index !== setIndex) }
          : ex
      )
    );
  };

  const updateSet = (
    exerciseId: string,
    setIndex: number,
    field: keyof Set,
    value: number | string
  ) => {
    setExercises(
      exercises.map((ex) =>
        ex.id === exerciseId
          ? {
              ...ex,
              sets: ex.sets.map((set, index) =>
                index === setIndex ? { ...set, [field]: value } : set
              ),
            }
          : ex
      )
    );
  };

  const handleSave = () => {
    const workout: Workout = {
      name: workoutName,
      date: new Date().toISOString().split("T")[0],
      exercises: exercises.filter((ex) => ex.name.trim() !== ""),
      notes: notes.trim() || undefined,
    };

    console.log("Saving workout:", workout);
    onClose();
  };

  return (
    <View style={styles.modalContent}>
      <View style={styles.modalHeader}>
        <Text variant="titleLarge">Add Workout to Today</Text>
        <IconButton
          icon="close"
          onPress={onClose}
          iconColor={theme.colors.onSurface}
        />
      </View>

      <Divider style={{ marginBottom: 16 }} />

      <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
        <TextInput
          label="Workout Name"
          value={workoutName}
          onChangeText={setWorkoutName}
          mode="outlined"
          style={styles.input}
          placeholder="e.g., Push Day, Morning Run"
        />

        <View style={styles.weightUnitContainer}>
          <Text variant="bodyMedium" style={styles.weightUnitLabel}>
            Weight Unit:
          </Text>
          <View style={styles.weightUnitChips}>
            <Chip
              selected={weightUnit === "kg"}
              onPress={() => setWeightUnit("kg")}
              style={styles.weightUnitChip}
            >
              kg
            </Chip>
            <Chip
              selected={weightUnit === "lbs"}
              onPress={() => setWeightUnit("lbs")}
              style={styles.weightUnitChip}
            >
              lbs
            </Chip>
          </View>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.exercisesHeader}>
          <Text variant="titleMedium">Exercises</Text>
          <Button mode="outlined" onPress={addExercise} icon="plus">
            Add Exercise
          </Button>
        </View>

        {exercises.map((exercise) => (
          <Card key={exercise.id} style={styles.exerciseCard}>
            <Card.Content>
              <View style={styles.exerciseHeader}>
                <TextInput
                  label="Exercise Name"
                  value={exercise.name}
                  onChangeText={(name) => updateExerciseName(exercise.id, name)}
                  mode="outlined"
                  style={styles.exerciseNameInput}
                  placeholder="e.g., Bench Press, Squat"
                />
                <IconButton
                  icon="delete"
                  onPress={() => removeExercise(exercise.id)}
                  iconColor={theme.colors.error}
                />
              </View>

              <View style={styles.setsHeader}>
                <Text variant="bodyMedium">Sets</Text>
                <Button
                  mode="text"
                  onPress={() => addSet(exercise.id)}
                  icon="plus"
                  compact
                >
                  Add Set
                </Button>
              </View>

              {exercise.sets.map((set, setIndex) => (
                <View key={setIndex} style={styles.setRow}>
                  <Text variant="bodySmall" style={styles.setNumber}>
                    Set {setIndex + 1}
                  </Text>

                  <TextInput
                    label="Reps"
                    value={set.reps.toString()}
                    onChangeText={(value) =>
                      updateSet(
                        exercise.id,
                        setIndex,
                        "reps",
                        parseInt(value) || 0
                      )
                    }
                    mode="outlined"
                    keyboardType="numeric"
                    style={styles.setInput}
                    dense
                  />

                  <TextInput
                    label="Weight"
                    value={set.weight.toString()}
                    onChangeText={(value) =>
                      updateSet(
                        exercise.id,
                        setIndex,
                        "weight",
                        parseFloat(value) || 0
                      )
                    }
                    mode="outlined"
                    keyboardType="numeric"
                    style={styles.setInput}
                    dense
                  />

                  <View style={styles.unitContainer}>
                    <Button
                      mode="outlined"
                      onPress={() => {
                        const units: ("kg" | "lbs" | "bodyweight")[] = [
                          "kg",
                          "lbs",
                          "bodyweight",
                        ];
                        const currentIndex = units.indexOf(set.unit);
                        const nextUnit =
                          units[(currentIndex + 1) % units.length];
                        updateSet(exercise.id, setIndex, "unit", nextUnit);
                      }}
                      style={styles.unitButton}
                      compact
                    >
                      {set.unit}
                    </Button>
                  </View>

                  <IconButton
                    icon="delete"
                    onPress={() => removeSet(exercise.id, setIndex)}
                    iconColor={theme.colors.error}
                    size={20}
                  />
                </View>
              ))}
            </Card.Content>
          </Card>
        ))}

        <TextInput
          label="Notes (optional)"
          value={notes}
          onChangeText={setNotes}
          mode="outlined"
          multiline
          numberOfLines={3}
          style={styles.input}
          placeholder="Any additional notes about your workout..."
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
  weightUnitContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  weightUnitLabel: {
    marginRight: 12,
  },
  weightUnitChips: {
    flexDirection: "row",
    gap: 8,
  },
  weightUnitChip: {
    marginRight: 4,
  },
  divider: {
    marginVertical: 16,
  },
  exercisesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  exerciseCard: {
    marginBottom: 12,
  },
  exerciseHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  exerciseNameInput: {
    flex: 1,
    marginRight: 8,
  },
  setsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  setRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  setNumber: {
    width: 50,
    textAlign: "center",
  },
  setInput: {
    flex: 1,
  },
  unitContainer: {
    minWidth: 80,
  },
  unitButton: {
    minWidth: 80,
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

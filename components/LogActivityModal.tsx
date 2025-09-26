import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  Text,
  Paragraph,
  Button,
  IconButton,
  TextInput,
  Divider,
  Card,
  Menu,
  Searchbar,
} from "react-native-paper";
import { useSettings } from "../contexts/SettingsContext";

// Predefined list of common exercises
const EXERCISES = [
  // Upper Body
  "Bench Press",
  "Incline Bench Press",
  "Decline Bench Press",
  "Overhead Press",
  "Shoulder Press",
  "Lateral Raises",
  "Front Raises",
  "Pull-ups",
  "Chin-ups",
  "Lat Pulldown",
  "Bent-over Rows",
  "Cable Rows",
  "Bicep Curls",
  "Hammer Curls",
  "Tricep Dips",
  "Tricep Extensions",
  "Push-ups",
  "Diamond Push-ups",
  "Pike Push-ups",

  // Lower Body
  "Squats",
  "Front Squats",
  "Back Squats",
  "Bulgarian Split Squats",
  "Lunges",
  "Walking Lunges",
  "Deadlifts",
  "Romanian Deadlifts",
  "Leg Press",
  "Leg Curls",
  "Leg Extensions",
  "Calf Raises",
  "Hip Thrusts",
  "Glute Bridges",
  "Step-ups",

  // Core
  "Plank",
  "Side Plank",
  "Russian Twists",
  "Mountain Climbers",
  "Crunches",
  "Sit-ups",
  "Leg Raises",
  "Bicycle Crunches",
  "Dead Bug",
  "Bird Dog",
  "Hollow Hold",

  // Cardio
  "Running",
  "Walking",
  "Cycling",
  "Rowing",
  "Swimming",
  "Jump Rope",
  "Burpees",
  "High Knees",
  "Jumping Jacks",
  "Elliptical",
  "Stair Climbing",

  // Functional
  "Kettlebell Swings",
  "Turkish Get-ups",
  "Farmer's Walk",
  "Battle Ropes",
  "Box Jumps",
  "Medicine Ball Slams",

  // Yoga/Stretching
  "Yoga",
  "Pilates",
  "Stretching",
  "Foam Rolling",
];

interface Set {
  reps: number;
  weight: number;
  unit: "kg" | "lbs" | "bodyw";
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
  const [exerciseSearch, setExerciseSearch] = useState("");
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  // Filter exercises based on search
  const filteredExercises = EXERCISES.filter((exercise) =>
    exercise.toLowerCase().includes(exerciseSearch.toLowerCase())
  );

  // Toggle menu visibility for a specific exercise
  const toggleMenu = (exerciseId: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [exerciseId]: !prev[exerciseId],
    }));
  };

  // Close all menus
  const closeAllMenus = () => {
    setOpenMenus({});
  };

  // Select an exercise
  const selectExercise = (exerciseId: string, exerciseName: string) => {
    updateExerciseName(exerciseId, exerciseName);
    closeAllMenus();
  };

  const addExercise = () => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: "",
      sets: [{ reps: 0, weight: 0, unit: globalWeightUnit }],
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
              sets: [
                ...ex.sets,
                { reps: 0, weight: 0, unit: globalWeightUnit },
              ],
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

        <Text variant="bodySmall" style={styles.disclaimerText}>
          💡 You can change weight units (kg/lbs) in Settings
        </Text>

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
                <Menu
                  visible={openMenus[exercise.id] || false}
                  onDismiss={closeAllMenus}
                  anchor={
                    <Button
                      mode="outlined"
                      onPress={() => toggleMenu(exercise.id)}
                      style={styles.exerciseSelectButton}
                      contentStyle={styles.exerciseSelectContent}
                    >
                      {exercise.name || "Select Exercise"}
                    </Button>
                  }
                  style={styles.exerciseMenu}
                >
                  <View style={styles.exerciseSearchContainer}>
                    <Searchbar
                      placeholder="Search exercises..."
                      value={exerciseSearch}
                      onChangeText={setExerciseSearch}
                      style={styles.exerciseSearch}
                    />
                  </View>
                  <ScrollView style={styles.exerciseList}>
                    {filteredExercises.map((exerciseName) => (
                      <Menu.Item
                        key={exerciseName}
                        onPress={() =>
                          selectExercise(exercise.id, exerciseName)
                        }
                        title={exerciseName}
                        style={styles.exerciseMenuItem}
                      />
                    ))}
                  </ScrollView>
                </Menu>
                <IconButton
                  icon="delete"
                  onPress={() => removeExercise(exercise.id)}
                  iconColor={theme.colors.error}
                />
              </View>

              <View style={styles.setsHeader}>
                <Text variant="bodyMedium" style={styles.setsHeaderText}>
                  Sets
                </Text>
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
                    {setIndex + 1}
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

                  {set.unit !== "bodyw" && (
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
                  )}

                  <View style={styles.unitContainer}>
                    <Button
                      mode="outlined"
                      onPress={() => {
                        // Toggle between the global weight unit and bodyweight
                        const nextUnit =
                          set.unit === globalWeightUnit
                            ? "bodyw"
                            : globalWeightUnit;
                        updateSet(exercise.id, setIndex, "unit", nextUnit);
                      }}
                      style={styles.unitButton}
                      compact
                      icon="swap-horizontal"
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
          Save Workout
        </Button>
        <Button mode="outlined" onPress={onClose} style={styles.button}>
          Cancel
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {},
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  modalBody: {
    paddingVertical: 12,
  },
  input: {
    marginBottom: 20,
  },
  disclaimerText: {
    textAlign: "center",
    fontStyle: "italic",
    marginBottom: 16,
    opacity: 0.7,
  },
  divider: {
    marginVertical: 16,
  },
  exercisesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 8,
  },
  exerciseCard: {
    marginBottom: 20,
  },
  exerciseHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  exerciseSelectButton: {
    flex: 1,
    marginRight: 12,
    justifyContent: "flex-start",
    minHeight: 48,
  },
  exerciseSelectContent: {
    justifyContent: "flex-start",
  },
  exerciseMenu: {
    maxHeight: 300,
  },
  exerciseSearchContainer: {
    padding: 8,
  },
  exerciseSearch: {
    marginBottom: 8,
  },
  exerciseList: {
    maxHeight: 200,
  },
  exerciseMenuItem: {
    paddingVertical: 4,
  },
  setsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  setsHeaderText: {
    marginLeft: 0,
  },
  setRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 16,
    gap: 6,
    paddingVertical: 4,
  },
  setNumber: {
    width: 30,
    textAlign: "center",
    marginRight: 4,
  },
  setInput: {
    width: 60,
    marginRight: 8,
  },
  unitContainer: {
    minWidth: 70,
  },
  unitButton: {
    minWidth: 70,
    minHeight: 36,
    paddingHorizontal: 8,
  },
  modalActions: {
    flexDirection: "column",
    paddingVertical: 20,
    paddingBottom: 32, // Extra padding for safe area
  },
  button: {
    marginBottom: 12,
    minHeight: 48,
  },
});

import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Set {
  reps: number;
  weight: number;
  unit: "kg" | "lbs" | "bodyw";
}

export interface Exercise {
  id: string;
  name: string;
  sets: Set[];
}

export interface Workout {
  id: string;
  name: string;
  date: string;
  exercises: Exercise[];
  notes?: string;
}

const WORKOUTS_KEY = "workouts";

export class WorkoutStorage {
  // Save a workout to storage
  static async saveWorkout(workout: Workout): Promise<void> {
    try {
      const existingWorkouts = await this.getWorkouts();
      const updatedWorkouts = [...existingWorkouts, workout];
      await AsyncStorage.setItem(WORKOUTS_KEY, JSON.stringify(updatedWorkouts));
    } catch (error) {
      console.error("Error saving workout:", error);
      throw error;
    }
  }

  // Get all workouts from storage
  static async getWorkouts(): Promise<Workout[]> {
    try {
      const workoutsJson = await AsyncStorage.getItem(WORKOUTS_KEY);
      return workoutsJson ? JSON.parse(workoutsJson) : [];
    } catch (error) {
      console.error("Error loading workouts:", error);
      return [];
    }
  }

  // Get workouts for a specific date
  static async getWorkoutsForDate(date: string): Promise<Workout[]> {
    try {
      const allWorkouts = await this.getWorkouts();
      return allWorkouts.filter((workout) => workout.date === date);
    } catch (error) {
      console.error("Error loading workouts for date:", error);
      return [];
    }
  }

  // Get workout dates (for heatmap)
  static async getWorkoutDates(): Promise<string[]> {
    try {
      const allWorkouts = await this.getWorkouts();
      return [...new Set(allWorkouts.map((workout) => workout.date))];
    } catch (error) {
      console.error("Error loading workout dates:", error);
      return [];
    }
  }

  // Delete a workout
  static async deleteWorkout(workoutId: string): Promise<void> {
    try {
      const existingWorkouts = await this.getWorkouts();
      const updatedWorkouts = existingWorkouts.filter(
        (workout) => workout.id !== workoutId
      );
      await AsyncStorage.setItem(WORKOUTS_KEY, JSON.stringify(updatedWorkouts));
    } catch (error) {
      console.error("Error deleting workout:", error);
      throw error;
    }
  }

  // Update a workout
  static async updateWorkout(
    workoutId: string,
    updatedWorkout: Workout
  ): Promise<void> {
    try {
      const existingWorkouts = await this.getWorkouts();
      const updatedWorkouts = existingWorkouts.map((workout) =>
        workout.id === workoutId ? updatedWorkout : workout
      );
      await AsyncStorage.setItem(WORKOUTS_KEY, JSON.stringify(updatedWorkouts));
    } catch (error) {
      console.error("Error updating workout:", error);
      throw error;
    }
  }

  // Clear all workouts (for testing)
  static async clearAllWorkouts(): Promise<void> {
    try {
      await AsyncStorage.removeItem(WORKOUTS_KEY);
    } catch (error) {
      console.error("Error clearing workouts:", error);
      throw error;
    }
  }
}

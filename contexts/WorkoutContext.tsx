import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { WorkoutStorage, Workout } from "../services/WorkoutStorage";

interface WorkoutContextType {
  workouts: Workout[];
  workoutDates: string[];
  isLoading: boolean;
  refreshWorkouts: () => Promise<void>;
  addWorkout: (workout: Workout) => Promise<void>;
  deleteWorkout: (workoutId: string) => Promise<void>;
  updateWorkout: (workoutId: string, workout: Workout) => Promise<void>;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [workoutDates, setWorkoutDates] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load workouts from storage
  const loadWorkouts = async () => {
    try {
      const [loadedWorkouts, loadedDates] = await Promise.all([
        WorkoutStorage.getWorkouts(),
        WorkoutStorage.getWorkoutDates(),
      ]);
      setWorkouts(loadedWorkouts);
      setWorkoutDates(loadedDates);
    } catch (error) {
      console.error("Error loading workouts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh workouts
  const refreshWorkouts = async () => {
    setIsLoading(true);
    await loadWorkouts();
  };

  // Add a new workout
  const addWorkout = async (workout: Workout) => {
    try {
      await WorkoutStorage.saveWorkout(workout);
      await refreshWorkouts();
    } catch (error) {
      console.error("Error adding workout:", error);
      throw error;
    }
  };

  // Delete a workout
  const deleteWorkout = async (workoutId: string) => {
    try {
      await WorkoutStorage.deleteWorkout(workoutId);
      await refreshWorkouts();
    } catch (error) {
      console.error("Error deleting workout:", error);
      throw error;
    }
  };

  // Update a workout
  const updateWorkout = async (workoutId: string, workout: Workout) => {
    try {
      await WorkoutStorage.updateWorkout(workoutId, workout);
      await refreshWorkouts();
    } catch (error) {
      console.error("Error updating workout:", error);
      throw error;
    }
  };

  // Load workouts on mount
  useEffect(() => {
    loadWorkouts();
  }, []);

  return (
    <WorkoutContext.Provider
      value={{
        workouts,
        workoutDates,
        isLoading,
        refreshWorkouts,
        addWorkout,
        deleteWorkout,
        updateWorkout,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkouts = (): WorkoutContextType => {
  const context = useContext(WorkoutContext);
  if (context === undefined) {
    throw new Error("useWorkouts must be used within a WorkoutProvider");
  }
  return context;
};

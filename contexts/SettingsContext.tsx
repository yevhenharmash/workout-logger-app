import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type WeightUnit = "kg" | "lbs";

interface SettingsContextType {
  weightUnit: WeightUnit;
  setWeightUnit: (unit: WeightUnit) => void;
  isLoading: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

const WEIGHT_UNIT_KEY = "weight_unit";

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [weightUnit, setWeightUnitState] = useState<WeightUnit>("kg");
  const [isLoading, setIsLoading] = useState(true);

  // Load weight unit from storage on mount
  useEffect(() => {
    const loadWeightUnit = async () => {
      try {
        const storedUnit = await AsyncStorage.getItem(WEIGHT_UNIT_KEY);
        if (storedUnit && (storedUnit === "kg" || storedUnit === "lbs")) {
          setWeightUnitState(storedUnit as WeightUnit);
        }
      } catch (error) {
        console.error("Error loading weight unit:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadWeightUnit();
  }, []);

  const setWeightUnit = async (unit: WeightUnit) => {
    try {
      await AsyncStorage.setItem(WEIGHT_UNIT_KEY, unit);
      setWeightUnitState(unit);
    } catch (error) {
      console.error("Error saving weight unit:", error);
    }
  };

  return (
    <SettingsContext.Provider value={{ weightUnit, setWeightUnit, isLoading }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};

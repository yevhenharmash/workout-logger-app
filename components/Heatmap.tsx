import React, { useRef, useEffect } from "react";
import { Card, Text, Button } from "react-native-paper";
import { View, StyleSheet, ScrollView } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

interface HeatmapProps {
  onHistoryPress?: () => void;
}

export const Heatmap: React.FC<HeatmapProps> = ({ onHistoryPress }) => {
  const { theme } = useTheme();
  const scrollViewRef = useRef<ScrollView>(null);

  // Calculate weeks passed since January 1st, 2025
  const startDate = new Date("2025-01-01");
  const currentDate = new Date();

  // Calculate the number of weeks that have passed
  const timeDiff = currentDate.getTime() - startDate.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
  const weeksPassed = Math.max(1, Math.ceil(daysDiff / 7)); // At least 1 week

  const daysPerWeek = 7;

  // Dummy workout data for September 2025
  const workoutData = {
    "2025-09-15": { logged: true, intensity: 3 }, // Sunday - High intensity
    "2025-09-16": { logged: true, intensity: 2 }, // Monday - Medium intensity
    "2025-09-18": { logged: true, intensity: 4 }, // Wednesday - Very high intensity
    "2025-09-20": { logged: true, intensity: 1 }, // Friday - Light workout
    "2025-09-21": { logged: true, intensity: 2 }, // Saturday - Medium intensity
  };

  // Helper function to check if a date has workout data
  const getWorkoutData = (date: Date) => {
    const dateString = date.toISOString().split("T")[0];
    return (
      workoutData[dateString as keyof typeof workoutData] || {
        logged: false,
        intensity: 0,
      }
    );
  };

  // Helper function to check if a date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Generate data for each week that has passed (each week is a column)
  const weekData = Array.from({ length: weeksPassed }, (_, weekIndex) => {
    const weekStart = new Date(startDate);
    // Adjust to start on Monday (if startDate is not Monday, go back to previous Monday)
    const dayOfWeek = weekStart.getDay();
    const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Sunday = 0, Monday = 1
    weekStart.setDate(weekStart.getDate() + daysToMonday);
    weekStart.setDate(weekStart.getDate() + weekIndex * 7);

    // Generate 7 days for this week (Monday to Sunday)
    const days = Array.from({ length: daysPerWeek }, (_, dayIndex) => {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + dayIndex);

      const workout = getWorkoutData(date);

      return {
        date: date,
        day: dayIndex, // 0 = Monday, 1 = Tuesday, etc.
        logged: workout.logged,
        intensity: workout.intensity,
        isToday: isToday(date),
      };
    });

    return {
      weekNumber: weekIndex + 1,
      weekStart: weekStart,
      days: days,
    };
  });

  const dayLabels = ["M", "T", "W", "T", "F", "S", "S"]; // Monday first for calendar view

  // Scroll to the end on first render
  useEffect(() => {
    if (scrollViewRef.current) {
      // Use setTimeout to ensure the component is fully rendered
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, []);

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <Text variant="titleLarge">Weekly Activity</Text>
          <Button mode="outlined" onPress={onHistoryPress} icon="history">
            History
          </Button>
        </View>

        <View style={styles.heatmapWrapper}>
          {/* Day labels - fixed, don't scroll */}
          <View style={styles.dayLabels}>
            {dayLabels.map((label, index) => (
              <View key={index} style={styles.dayLabel}>
                <Text variant="bodySmall" style={styles.dayLabelText}>
                  {label}
                </Text>
              </View>
            ))}
          </View>

          {/* Scrollable heatmap grid */}
          <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.heatmapContainer}
          >
            <View style={[styles.heatmapGrid, { minWidth: weeksPassed * 22 }]}>
              {weekData.map((week, weekIndex) => (
                <View key={weekIndex} style={styles.column}>
                  {week.days.map((day, dayIndex) => (
                    <View
                      key={`${weekIndex}-${dayIndex}-${day.date.getDate()}`}
                      style={[
                        styles.daySquare,
                        {
                          backgroundColor: day.logged
                            ? theme.colors.secondary // Solid secondary color for any workout
                            : theme.colors.surfaceVariant, // Themed color for no workout
                        },
                        day.isToday && {
                          borderWidth: 2,
                          borderColor: theme.colors.primary,
                          transform: [{ scale: 1.1 }], // Slightly larger to make it stand out
                        }, // Apply today highlighting
                      ]}
                    />
                  ))}
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {},
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  heatmapWrapper: {
    flexDirection: "row",
  },
  dayLabels: {
    marginRight: 8,
    width: 20,
  },
  heatmapContainer: {
    flex: 1,
  },
  dayLabel: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 2,
  },
  dayLabelText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  heatmapGrid: {
    flexDirection: "row",
    minWidth: 30, // Will be calculated dynamically based on weeks passed
  },
  column: {
    width: 20,
    marginHorizontal: 1,
  },
  daySquare: {
    width: 20,
    height: 20,
    marginBottom: 2,
    borderRadius: 3,
  },
});

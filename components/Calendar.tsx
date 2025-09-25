import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Card, useTheme, Text, Button, IconButton } from "react-native-paper";

export const CalendarModalContent = ({
  onDateSelect,
  workoutDates = [],
}: {
  onDateSelect?: (date: string) => void;
  workoutDates?: string[]; // Array of dates in YYYY-MM-DD format
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const theme = useTheme();

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    // Adjust for Monday start: Sunday = 0, Monday = 1, etc.
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7; // Convert to Monday = 0

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    onDateSelect?.(date.toISOString().split("T")[0]);
  };

  const isWorkoutDay = (date: Date) => {
    const dateString = date.toISOString().split("T")[0];
    return workoutDates.includes(dateString);
  };

  const isCurrentDay = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelectedDay = (date: Date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  const isFutureDate = (date: Date) => {
    const today = new Date();
    today.setHours(23, 59, 59, 999); // End of today
    return date > today;
  };

  const isNextMonthDisabled = () => {
    const today = new Date();
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    // Disable if next month is in the future
    return (
      nextMonth.getMonth() > today.getMonth() ||
      nextMonth.getFullYear() > today.getFullYear()
    );
  };

  const navigateMonth = (direction: "prev" | "next") => {
    const newMonth = new Date(currentMonth);
    if (direction === "prev") {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  const days = getDaysInMonth(currentMonth);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <Card style={styles.calendarWrapper}>
      <Card.Content>
        {/* Header */}
        <View style={styles.header}>
          <IconButton
            icon="chevron-left"
            onPress={() => navigateMonth("prev")}
            iconColor={theme.colors.onSurface}
          />
          <Text variant="titleMedium" style={{ color: theme.colors.onSurface }}>
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </Text>
          <IconButton
            icon="chevron-right"
            onPress={
              isNextMonthDisabled() ? undefined : () => navigateMonth("next")
            }
            disabled={isNextMonthDisabled()}
            iconColor={
              isNextMonthDisabled()
                ? theme.colors.onSurfaceDisabled
                : theme.colors.onSurface
            }
          />
        </View>

        {/* Day names */}
        <View style={styles.dayNamesRow}>
          {dayNames.map((day) => (
            <Text
              key={day}
              variant="bodySmall"
              style={[styles.dayName, { color: theme.colors.onSurfaceVariant }]}
            >
              {day}
            </Text>
          ))}
        </View>

        {/* Calendar grid */}
        <View style={styles.calendarGrid}>
          {days.map((day, index) => (
            <View key={index} style={styles.dayCell}>
              {day ? (
                <Button
                  mode={isSelectedDay(day) ? "contained" : "text"}
                  onPress={
                    isFutureDate(day) ? undefined : () => handleDateSelect(day)
                  }
                  disabled={isFutureDate(day)}
                  style={[
                    styles.dayButton,
                    isWorkoutDay(day) &&
                      !isFutureDate(day) && {
                        backgroundColor: theme.colors.secondary,
                      },
                    isCurrentDay(day) && {
                      borderWidth: 2,
                      borderColor: theme.colors.primary,
                    },
                    isSelectedDay(day) && {
                      backgroundColor: theme.colors.primary,
                    },
                    isFutureDate(day) && {
                      opacity: 0.4,
                    },
                  ]}
                  labelStyle={{
                    color: isFutureDate(day)
                      ? theme.colors.onSurfaceDisabled
                      : isWorkoutDay(day) && !isFutureDate(day)
                      ? theme.colors.onSecondary
                      : isSelectedDay(day)
                      ? theme.colors.onPrimary
                      : theme.colors.onSurface,
                    fontWeight: isCurrentDay(day) ? "bold" : "normal",
                  }}
                >
                  {day.getDate().toString()}
                </Button>
              ) : (
                <View style={styles.emptyDay} />
              )}
            </View>
          ))}
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  calendarWrapper: {
    borderRadius: 8,
    marginVertical: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  dayNamesRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  dayName: {
    textAlign: "center",
    fontWeight: "500",
    width: 40,
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayCell: {
    width: "14.28%", // 100% / 7 days
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 2,
  },
  dayButton: {
    minWidth: 32,
    minHeight: 32,
    borderRadius: 16,
  },
  emptyDay: {
    width: 32,
    height: 32,
  },
});

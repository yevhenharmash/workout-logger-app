import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Card, useTheme, Text } from "react-native-paper";
import { Calendar } from "react-native-calendars";

export const CalendarModalContent = ({
  onDateSelect,
}: {
  onDateSelect?: (date: string) => void;
}) => {
  const [selectedDate, setSelectedDate] = useState("");
  const theme = useTheme();

  const calendarTheme = {
    // backgroundColor: theme.colors.surface,
    // calendarBackground: theme.colors.surface,
    // textSectionTitleColor: theme.colors.onSurfaceVariant,
    // selectedDayBackgroundColor: theme.colors.primary,
    // selectedDayTextColor: theme.colors.onPrimary,
    // todayTextColor: theme.colors.primary,
    // dayTextColor: theme.colors.onSurface,
    // textDisabledColor: theme.colors.onSurfaceDisabled,
    // dotColor: theme.colors.primary,
    // selectedDotColor: theme.colors.onPrimary,
    // arrowColor: theme.colors.primary,
    // monthTextColor: theme.colors.onSurface,
    indicatorColor: theme.colors.primary,
    textDayFontFamily: theme.fonts?.bodyLarge?.fontFamily,
    textMonthFontFamily: theme.fonts?.headlineSmall?.fontFamily,
    textDayHeaderFontFamily: theme.fonts?.bodyMedium?.fontFamily,
    textDayFontWeight: "400" as const,
    textMonthFontWeight: "bold" as const,
    textDayHeaderFontWeight: "500" as const,
    textDayFontSize: 16,
    textMonthFontSize: 18,
    textDayHeaderFontSize: 14,
  };

  return (
    <Calendar
      onDayPress={(day) => {
        setSelectedDate(day.dateString);
        onDateSelect?.(day.dateString);
      }}
      markedDates={{
        [selectedDate]: {
          selected: true,
          marked: true,
          selectedColor: theme.colors.primary,
        },
      }}
      theme={calendarTheme}
      style={styles.modalCalendar}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  calendar: {
    borderRadius: 8,
  },
  modalCalendar: {
    borderRadius: 8,
  },
  selectedText: {
    marginTop: 16,
    textAlign: "center",
    fontSize: 18,
  },
});

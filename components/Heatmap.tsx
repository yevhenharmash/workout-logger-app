import React, { useRef, useEffect } from 'react';
import { Card, Title, Button } from 'react-native-paper';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

const Heatmap = () => {
  const { theme } = useTheme();
  const scrollViewRef = useRef(null);
  
  // Calculate weeks passed since January 1st, 2025
  const startDate = new Date('2025-01-01');
  const currentDate = new Date();
  
  // Calculate the number of weeks that have passed
  const timeDiff = currentDate.getTime() - startDate.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
  const weeksPassed = Math.max(1, Math.ceil(daysDiff / 7)); // At least 1 week
  
  const daysPerWeek = 7;
  
  // Dummy workout data for September 2025
  const workoutData = {
    '2025-09-15': { logged: true, intensity: 3 }, // Sunday - High intensity
    '2025-09-16': { logged: true, intensity: 2 }, // Monday - Medium intensity
    '2025-09-18': { logged: true, intensity: 4 }, // Wednesday - Very high intensity
    '2025-09-20': { logged: true, intensity: 1 }, // Friday - Light workout
    '2025-09-21': { logged: true, intensity: 2 }, // Saturday - Medium intensity
  };
  
  // Helper function to check if a date has workout data
  const getWorkoutData = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return workoutData[dateString] || { logged: false, intensity: 0 };
  };
  
  // Generate data for each week that has passed (each week is a column)
  const weekData = Array.from({ length: weeksPassed }, (_, weekIndex) => {
    const weekStart = new Date(startDate);
    weekStart.setDate(startDate.getDate() + (weekIndex * 7));
    
    // Generate 7 days for this week
    const days = Array.from({ length: daysPerWeek }, (_, dayIndex) => {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + dayIndex);
      
      const workout = getWorkoutData(date);
      
      return {
        date: date,
        day: dayIndex, // 0 = Sunday, 1 = Monday, etc.
        logged: workout.logged,
        intensity: workout.intensity,
      };
    });
    
    return {
      weekNumber: weekIndex + 1,
      weekStart: weekStart,
      days: days,
    };
  });

  const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S']; // Sunday first for calendar view

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
          <Title>Weekly Activity</Title>
          <Button mode="outlined">
            History
          </Button>
        </View>
        
        <ScrollView 
          ref={scrollViewRef}
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.heatmapContainer}
        >
          {/* Day labels */}
          <View style={styles.dayLabels}>
            {dayLabels.map((label, index) => (
              <View key={index} style={styles.dayLabel}>
                <Title style={styles.dayLabelText}>{label}</Title>
              </View>
            ))}
          </View>
          
          {/* Heatmap grid - dynamic weeks as columns */}
          <View style={[styles.heatmapGrid, { minWidth: weeksPassed * 32 }]}>
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
                    ]}
                  />
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  heatmapContainer: {
    flexDirection: 'row',
  },
  dayLabels: {
    marginRight: 8,
    minWidth: 20,
  },
  dayLabel: {
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  dayLabelText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  heatmapGrid: {
    flexDirection: 'row',
    minWidth: 30, // Will be calculated dynamically based on weeks passed
  },
  column: {
    width: 30,
    marginHorizontal: 1,
  },
  daySquare: {
    width: '100%',
    aspectRatio: 1,
    marginBottom: 2,
    borderRadius: 3,
  },
});

export default Heatmap;

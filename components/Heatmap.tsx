import React from 'react';
import { Card, Title } from 'react-native-paper';
import { View } from 'react-native';

// You would use a library like 'react-native-calendars' for a real heatmap.
// Let's create a placeholder for now.

const Heatmap = () => {
  const data = Array.from({ length: 31 }, (_, i) => ({
    date: `2024-07-${String(i + 1).padStart(2, '0')}`,
    count: Math.floor(Math.random() * 5),
  }));

  return (
    <Card style={{ margin: 16 }}>
      <Card.Content>
        <Title>Monthly Activity</Title>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
          {data.map((day) => (
            <View
              key={day.date}
              style={{
                width: 30,
                height: 30,
                backgroundColor:
                  day.count > 0 ? `rgba(3, 169, 244, ${day.count / 4})` : '#f0f0f0',
                margin: 2,
                borderRadius: 5,
              }}
            />
          ))}
        </View>
      </Card.Content>
    </Card>
  );
};

export default Heatmap;

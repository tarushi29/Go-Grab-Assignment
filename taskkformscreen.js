import React, { useEffect, useState } from 'react';
import { View, Button, FlatList, Text } from 'react-native';
import { getTasks } from '../db';

export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks(setTasks);
  }, []);

  return (
    <View>
      <Button title="Add Task" onPress={() => navigation.navigate('TaskForm')} />
      <FlatList
        data={tasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Button
              title="View Details"
              onPress={() => navigation.navigate('TaskDetail', { taskId: item.id })}
            />
          </View>
        )}
      />
    </View>
  );
}

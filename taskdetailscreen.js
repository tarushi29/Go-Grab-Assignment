import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { deleteTask, getTasks } from '../db';

export default function TaskDetailScreen({ route, navigation }) {
  const { taskId } = route.params;
  const [task, setTask] = useState(null);

  useEffect(() => {
    getTasks(tasks => {
      const foundTask = tasks.find(t => t.id === taskId);
      setTask(foundTask);
    });
  }, [taskId]);

  const handleDelete = () => {
    deleteTask(taskId, () => {
      navigation.goBack();
    });
  };

  if (!task) return null;

  return (
    <View>
      <Text>{task.title}</Text>
      <Text>{task.description}</Text>
      <Button title="Delete Task" onPress={handleDelete} />
    </View>
  );
}

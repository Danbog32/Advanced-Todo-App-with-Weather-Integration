import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { fetchWeather } from "../utils/weather";

interface Task {
  id: number;
  name: string;
  description: string;
  location: string;
  completed: boolean;
}

interface TaskDetailProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
  onComplete: (taskId: number) => void;
  onBack: () => void;
  user: { username: string; role: string };
}

const TaskDetail: React.FC<TaskDetailProps> = ({
  task,
  onEdit,
  onDelete,
  onComplete,
  onBack,
  user,
}) => {
  const [weather, setWeather] = useState({
    temperature: "N/A",
    description: "N/A",
  });

  useEffect(() => {
    const getWeather = async () => {
      const weatherData = await fetchWeather(task.location || "Tallinn");
      setWeather({
        temperature: String(weatherData.temperature),
        description: weatherData.description,
      });
    };

    getWeather();
  }, [task.location]);

  return (
    <View style={styles.container}>
      <Button title="Back" onPress={onBack} />
      <Text style={styles.title}>{task.name}</Text>
      <Text style={styles.description}>{task.description}</Text>
      <Text style={styles.location}>Location: {task.location}</Text>
      <Text style={styles.weather}>
        Weather: {weather.temperature}°C, {weather.description}
      </Text>
      {user.role === "admin" && (
        <View style={styles.adminControls}>
          <Button title="Edit Task" onPress={() => onEdit(task)} />
          <Button
            title="Delete Task"
            onPress={() => onDelete(task.id)}
            color="red"
          />
        </View>
      )}
      <Button
        title={task.completed ? "Completed" : "Mark as Completed"}
        onPress={() => onComplete(task.id)}
        disabled={task.completed}
        color={task.completed ? "green" : undefined}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    maxWidth: 600,
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
  },
  location: {
    fontSize: 14,
    marginBottom: 10,
  },
  weather: {
    fontSize: 14,
    marginBottom: 20,
  },
  adminControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
});

export default TaskDetail;

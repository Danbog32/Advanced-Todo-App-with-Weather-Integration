import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

interface Task {
  id: number;
  name: string;
  description: string;
  location: string;
  completed: boolean;
}

interface TaskFormProps {
  task?: Task;
  onSubmit: (task: Task) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, onCancel }) => {
  const [name, setName] = useState(task ? task.name : "");
  const [description, setDescription] = useState(task ? task.description : "");
  const [location, setLocation] = useState(task ? task.location : "Tallinn");

  const handleSubmit = () => {
    const newTask = {
      id: task ? task.id : Date.now(), // Generate unique ID for new task
      name,
      description,
      location,
      completed: task ? task.completed : false,
    };
    onSubmit(newTask);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Task Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Task Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <Button title="Save Task" onPress={handleSubmit} />
      <Button title="Cancel" onPress={onCancel} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default TaskForm;

// src/App.tsx

import React, { useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import TaskList from "./src/components/TaskList";
import TaskDetail from "./src/components/TaskDetail";
import TaskForm from "./src/components/TaskForm";
import Login from "./src/components/Login";

interface Task {
  id: number;
  name: string;
  description: string;
  location: string;
  completed: boolean;
}

const initialTasks: Task[] = [
  {
    id: 1,
    name: "Task 1",
    description: "Description 1",
    location: "Tallinn",
    completed: false,
  },
  {
    id: 2,
    name: "Task 2",
    description: "Description 2",
    location: "Tallinn",
    completed: true,
  },
  // Add more initial tasks here
];

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showCompleted, setShowCompleted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [user, setUser] = useState<{ username: string; role: string } | null>(
    null
  );

  const handleSelectTask = (task: Task) => {
    setSelectedTask(task);
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleToggleComplete = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );

    setSelectedTask(null);
  };

  const handleEditTask = (updatedTask: Task) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setSelectedTask(null);
  };

  const handleAddTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
    setShowForm(false);
  };

  const handleLogin = (username: string, role: string) => {
    setUser({ username, role });
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <View style={styles.container}>
      {!showForm && !selectedTask && (
        <>
          {user.role === "admin" && (
            <Button title="Add Task" onPress={() => setShowForm(true)} />
          )}
          <Button
            title={showCompleted ? "Hide Completed" : "Show Completed"}
            onPress={() => setShowCompleted(!showCompleted)}
          />
          <TaskList
            tasks={tasks}
            onSelectTask={handleSelectTask}
            onDeleteTask={handleDeleteTask}
            showCompleted={showCompleted}
          />
        </>
      )}
      {selectedTask && (
        <TaskDetail
          task={selectedTask}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onComplete={handleToggleComplete}
          onBack={() => setSelectedTask(null)}
          user={user}
        />
      )}
      {showForm && (
        <TaskForm
          onSubmit={handleAddTask}
          onCancel={() => setShowForm(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: "auto",
    padding: 10,
    maxWidth: 800,
    alignSelf: "center",
    width: "100%",
  },
});

export default App;

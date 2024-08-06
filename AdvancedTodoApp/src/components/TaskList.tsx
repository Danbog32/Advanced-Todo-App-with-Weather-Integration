import React from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Button,
} from "react-native";

interface Task {
  id: number;
  name: string;
  description: string;
  location: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onSelectTask: (task: Task) => void;
  onDeleteTask: (taskId: number) => void;
  showCompleted: boolean;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onSelectTask,
  onDeleteTask,
  showCompleted,
}) => {
  const filteredTasks = tasks.filter(
    (task) => showCompleted || !task.completed
  );

  const renderItem = ({ item }: { item: Task }) => (
    <View style={styles.taskItem}>
      <TouchableOpacity
        onPress={() => onSelectTask(item)}
        style={styles.taskTextContainer}
      >
        <Text style={[styles.taskName, item.completed && styles.completed]}>
          {item.name}
        </Text>
        <Text style={styles.taskDescription}>{item.description}</Text>
      </TouchableOpacity>
      <Button
        title="Delete"
        onPress={() => onDeleteTask(item.id)}
        color="red"
      />
    </View>
  );

  return (
    <FlatList
      data={filteredTasks}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  taskItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  taskName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  taskDescription: {
    fontSize: 14,
    color: "#555",
  },
  completed: {
    textDecorationLine: "line-through",
    color: "#aaa",
  },
});

export default TaskList;

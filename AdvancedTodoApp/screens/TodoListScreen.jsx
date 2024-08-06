import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { initialTodos } from '../src/data';

const TodoListScreen = ({ user, navigation }) => {
  const [todos, setTodos] = useState(initialTodos);
  const [showCompleted, setShowCompleted] = useState(false);

  const toggleCompleted = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = showCompleted
    ? todos
    : todos.filter((todo) => !todo.completed);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <Button
        title={`Show ${showCompleted ? 'Incomplete' : 'All'} Tasks`}
        onPress={() => setShowCompleted(!showCompleted)}
      />
      <FlatList
        data={filteredTodos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text style={styles.todoText}>{item.name}</Text>
            <TouchableOpacity onPress={() => toggleCompleted(item.id)}>
              <Text style={styles.actionText}>
                {item.completed ? 'Mark Incomplete' : 'Mark Complete'}
              </Text>
            </TouchableOpacity>
            {user.role === 'admin' && (
              <>
                <TouchableOpacity onPress={() => navigation.navigate('EditTodo', { todo: item })}>
                  <Text style={styles.actionText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeTodo(item.id)}>
                  <Text style={styles.actionText}>Remove</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}
      />
      {user.role === 'admin' && (
        <Button title="Add Task" onPress={() => navigation.navigate('EditTodo')} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  todoText: {
    flex: 1,
    fontSize: 16,
  },
  actionText: {
    color: 'blue',
    marginLeft: 12,
  },
});

export default TodoListScreen;

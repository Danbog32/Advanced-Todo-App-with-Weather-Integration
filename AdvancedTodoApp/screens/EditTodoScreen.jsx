import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { fetchWeather } from '../src/utils/weather';

const EditTodoScreen = ({ route, navigation }) => {
  const { todo } = route.params || {};
  const [name, setName] = useState(todo ? todo.name : '');
  const [description, setDescription] = useState(todo ? todo.description : '');
  const [location, setLocation] = useState(todo ? todo.location : 'Estonia');
  const [date, setDate] = useState(todo ? todo.date : '');
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const getWeather = async () => {
      const weatherData = await fetchWeather(location);
      setWeather(weatherData);
    };
    getWeather();
  }, [location]);

  const handleSubmit = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{todo ? 'Edit Task' : 'Add Task'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Task Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="Date"
        value={date}
        onChangeText={setDate}
      />
      {weather && (
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherText}>Weather in {location}:</Text>
          <Text style={styles.weatherText}>Temperature: {weather.temperature} °C</Text>
          <Text style={styles.weatherText}>Description: {weather.description}</Text>
        </View>
      )}
      <Button title="Save Task" onPress={handleSubmit} />
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  weatherContainer: {
    marginBottom: 16,
  },
  weatherText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default EditTodoScreen;

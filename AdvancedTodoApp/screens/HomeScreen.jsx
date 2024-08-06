import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ user, navigation, setUser }) => {
  useEffect(() => {
    navigation.navigate('TodoList');
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user.role === 'admin' ? 'Admin' : 'User'}!</Text>
      <Text style={styles.subtitle}>Username: {user.username}</Text>
      <Button
        title="Logout"
        onPress={() => {
          setUser(null); // Reset the user state to null
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
});

export default HomeScreen;

// Create Task screen UI layout

import React, { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, View, Button } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function CreateTaskScreen() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: '',
  });

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    // I will add Firestore logic later here
    console.log('Task form submitted:', form);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <ThemedText type="title" style={styles.title}>📝 Create New Task</ThemedText>

        <TextInput
          style={styles.input}
          placeholder="Task Title"
          placeholderTextColor="#888"
          value={form.title}
          onChangeText={(text) => handleChange('title', text)}
        />

        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Description"
          placeholderTextColor="#888"
          multiline
          value={form.description}
          onChangeText={(text) => handleChange('description', text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Due Date (DD/MM/YYYY)"
          placeholderTextColor="#888"
          value={form.dueDate}
          onChangeText={(text) => handleChange('dueDate', text)}
        />

        <View style={styles.buttonContainer}>
          <Button title="Create Task" color="#4f8cff" onPress={handleSubmit} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f6f8fa',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 28,
    width: '95%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 7,
    gap: 16,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#f2f6fc',
    padding: 14,
    borderRadius: 8,
    fontSize: 16,
    borderColor: '#dbeafe',
    borderWidth: 1,
    color: '#222',
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
});

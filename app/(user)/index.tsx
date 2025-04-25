import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import MoodSelection from '@/components/MoodSelection';
import JournalCard from '@/components/JournalCard';

// Get greeting based on current time
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  else if (hour < 18) return 'Good Afternoon';
  else return 'Good Evening';
}

export default function UserIndex() {
  const greeting = getGreeting();

  return (
    <ScrollView className="bg-white flex-1 px-4 pt-6" style={styles.container}>
      <StatusBar style="dark" />
      <View className="mb-6 mt-6 gap-3 ">
        <Text className="text-indigo-600 text-3xl font-bold">{greeting} 👋</Text>
        <Text className="text-violet-600 text-3xl font-semibold mt-1">Krishna!</Text>
        <Text className="text-gray-500 mt-1">Hope you're having a great day!</Text>
      </View>

      <MoodSelection />

      <JournalCard
        title='Peace mind helps you to grow'
        description={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry' s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`}
      />

    </ScrollView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3730a3",
  }
})


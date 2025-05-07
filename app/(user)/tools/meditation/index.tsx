import { Ionicons } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Pressable } from "react-native";

// Sample data with 3 items
const data = [
  {
    id: 1,
    title: "Mindful Breathing",
    description:
      "Learn how to focus on your breath to calm the mind and improve awareness. This is a foundational meditation technique useful for stress reduction.",
    steps: ["Inhale slowly", "Hold for 4 seconds", "Exhale gently"],
  },
  {
    id: 2,
    title: "Body Scan",
    description:
      "Bring attention to each part of your body from head to toe. This helps in relaxing muscles and releasing tension stored in the body.",
    steps: ["Focus on head", "Relax shoulders", "Scan down to feet"],
  },
  {
    id: 3,
    title: "Loving-Kindness",
    description:
      "Practice compassion by sending thoughts of love and kindness to yourself and others. A powerful way to improve emotional well-being.",
    steps: ["Repeat kind phrases", "Think of a loved one", "Extend to all beings"],
  },
];

const MeditationScreen = () => {
  const navigation = useNavigation()
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Meditations</Text>

      {data.map((item) => (
        <TouchableOpacity
          key={item.id} style={styles.card}
          onPress={() => router.push(`/tools/meditation/${item.id}` as any)}
        >
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <View style={styles.cardDescriptionRow}>
              <Text style={styles.cardDescription} numberOfLines={3}>
                {item.description}
              </Text>
              <Ionicons name="chevron-forward-outline" size={18} color="#4f46e5" />
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default MeditationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4f46e5",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#f0f4ff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  cardContent: {
    flexDirection: "column",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 6,
  },
  cardDescriptionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardDescription: {
    fontSize: 14,
    color: "#4b5563",
    flex: 1,
    marginRight: 8,
  },
});

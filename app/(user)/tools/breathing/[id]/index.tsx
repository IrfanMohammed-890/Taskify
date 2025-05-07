import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function MeditationDetailsScreen() {
  const { id } = useLocalSearchParams(); // 👈 Get the ID from the URL
  const navigation = useNavigation();
  return (
    <ScrollView className="flex-1 bg-white px-4 py-6">
      <View className="mb-4">
        <TouchableOpacity onPress={() => router.push('/tools/meditation')}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text className="text-2xl font-bold text-indigo-700 mb-4">
        Breathing Guide title
      </Text>
      <View className="text-justify pb-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, in nemo qui, consequatur velit, quae possimus natus esse incidunt ab tempore aut inventore architecto adipisci perferendis expedita. A impedit nesciunt corporis eum accusantium ut, fugiat excepturi iusto dolorum neque unde odit architecto eveniet optio deleniti vitae accusamus explicabo molestiae non laborum, deserunt libero fuga consequatur? Qui blanditiis aut et.
      </View>
      <View className="space-y-4">
        <Text className="text-base text-gray-700">
          1. Find a quiet and comfortable place to sit.
        </Text>
        <Text className="text-base text-gray-700">
          2. Sit with your spine straight and shoulders relaxed.
        </Text>
        <Text className="text-base text-gray-700">
          3. Close your eyes gently.
        </Text>
        <Text className="text-base text-gray-700">
          4. Take a few deep breaths — inhale slowly through your nose, hold for a second, and exhale through your mouth.
        </Text>
        <Text className="text-base text-gray-700">
          5. Bring your attention to your breath. If your mind wanders, gently bring it back to your breath.
        </Text>
        <Text className="text-base text-gray-700">
          6. Continue this for 5–10 minutes, or as long as you feel comfortable.
        </Text>
        <Text className="text-base text-gray-700">
          7. When you're ready, slowly open your eyes and return to the moment.
        </Text>
      </View>
    </ScrollView>
  );
}

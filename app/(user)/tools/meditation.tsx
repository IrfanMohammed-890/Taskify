import { View, Text, ScrollView } from "react-native";
import React from "react";

const MeditationScreen = () => {
  return (
    <ScrollView className="flex-1 bg-white px-4 py-6">
      <Text className="text-2xl font-bold text-indigo-700 mb-4">Meditation Guide</Text>

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
};

export default MeditationScreen;

import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { getMeditationById } from "@/service/meditation";

export default function MeditationDetailsScreen() {
  const [meditationData, setMeditationData] = useState<any>(null);
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);

  const getMeditationDetails = async (id: string) => {
    setLoading(true);
    const data = await getMeditationById(id);
    setMeditationData(data);
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      getMeditationDetails(id as string);
    }
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text className="mt-4 text-gray-500">Loading meditation...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white px-4 py-6">
      {/* Back button */}
      <View className="mb-6">
        <TouchableOpacity
          onPress={() => router.push("/tools/meditation")}
          className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
        >
          <Ionicons name="arrow-back" size={20} color="#4B5563" />
        </TouchableOpacity>
      </View>

      {/* Meditation Title */}
      <Text className="text-3xl font-bold text-indigo-700 mb-4">
        {meditationData?.meditationName}
      </Text>

      {/* Description */}
      <View className=" rounded-xl p-4 mb-6">
        <Text className="text-base text-gray-700 leading-relaxed">
          {meditationData?.description}
        </Text>
      </View>

      {/* Steps */}
      <Text className="text-xl font-semibold text-indigo-600 mb-2">Steps</Text>
      <View className="space-y-3">
        {meditationData?.steps?.map((step: string, index: number) => (
          <View
            key={index}
            className="flex-row items-start bg-indigo-50 rounded-lg p-3"
          >
            <Text className="font-bold text-indigo-700 mr-2">{index + 1}.</Text>
            <Text className="text-gray-700 flex-1">{step}</Text>
          </View>
        ))}
      </View>
    </ScrollView>

  );
}

import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { getBreathingById } from "@/service/breathing";

export default function BreathingDetailsScreen() {
  const [breathingData, setBreathingData] = useState<any>(null);
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);

  const getBreathingDetails = async (id: string) => {
    setLoading(true);
    const data = await getBreathingById(id);
    setBreathingData(data);
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      getBreathingDetails(id as string);
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
      <View className="mb-4" style={{ marginTop: 12 }}>
        <TouchableOpacity onPress={() => router.push("/tools/breathing")}>
          <Ionicons name="arrow-back" size={24} color="black" /> 
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text className="text-3xl font-bold text-indigo-700 mb-4">
        {breathingData?.breathingName}
      </Text>

      {/* Description Box */}
      <View className=" rounded-xl p-4 mb-6">
        <Text className="text-base text-gray-700 leading-relaxed">
          {breathingData?.description}
        </Text>
      </View>

      {/* Steps */}
      <Text className="text-xl font-semibold text-indigo-600 mb-2">Steps</Text>
      <View className="space-y-3">
        {breathingData?.steps?.map((step: string, index: number) => (
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

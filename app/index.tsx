import React, { useEffect } from 'react';
import { View, Text, Pressable, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeIn } from 'react-native-reanimated';
// import { ArrowRight } from 'lucide-react-native';
import "../firebase"

const { width } = Dimensions.get('window');
import { LinearGradient } from "expo-linear-gradient";
export default function Index() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#3b82f6', '#8b5cf6']} // Blue to Violet
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1 justify-center items-center px-6"
    >
      <View className="flex-1 mt-[70%] justify-top items-center px-6 relative">
        <StatusBar style="dark" />

        <Animated.View entering={FadeIn.duration(800)} className="items-center">

          <Text className="text-3xl font-bold text-center text-white ">
            Welcome to SafeSpace
          </Text>
          <Text className="text-base text-center text-white mt-6 px-2">
            The journey of a thousand miles begins with a single step.
          </Text>
        </Animated.View>

        <Animated.View entering={FadeIn.delay(300).duration(1000)} className="absolute bottom-14 w-full px-4">
          <Pressable
            onPress={() => router.push('/login')}
            className="bg-blue-600 flex-row items-center justify-center py-4 px-6 rounded-full shadow-md active:opacity-80"
          >
            <Text className="text-white text-lg font-semibold mr-2">Get Started</Text>
            {/* <ArrowRight color="white" size={22} /> */}
          </Pressable>
        </Animated.View>
    </View>
    </LinearGradient>
  );
}

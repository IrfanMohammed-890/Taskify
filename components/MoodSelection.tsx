import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import { createMood } from '@/service/mood';
import { useUserAuth } from '@/context/UserAuthContext';
import Toast from 'react-native-toast-message';

export default function MoodSelection({ checkIsMoodSelected }: {
  checkIsMoodSelected: () => void;
}) {

  const { loginData } = useUserAuth();

  const moodIcons = [
    { id: 'happy', icon: <Entypo name="emoji-happy" size={50} color="green" />, label: 'Happy' },
    { id: 'sad', icon: <Entypo name="emoji-sad" size={50} color="indigo" />, label: 'Sad' },
    { id: 'angry', icon: <FontAwesome5 name="angry" size={50} color="red" />, label: 'Angry' },
    { id: 'neutral', icon: <Entypo name="emoji-neutral" size={50} color="blue" />, label: 'Neutral' },
  ];

  const handleMoodSelect = async (mood: string) => {
    try {
      await createMood({ userId: loginData.uid, mood });
      checkIsMoodSelected();
      Toast.show({
        type: 'success',
        text2: `You're ${mood} today.`,
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Login mood selection',
        text2: 'Something went wrong.',
      });
    }
  };

  return (
    <View className="flex-1 mt-4 rounded-xl border items-center  py-4">
      <Text style={{
        alignSelf: "flex-start",
        paddingLeft: 30,
        color: 'blue'
      }} className="text-lg  font-semibold text-black  mb-6">
        How is your mood?
      </Text>
      <View className="flex flex-row  ">
        {moodIcons.map((mood) => (
          <TouchableOpacity
            key={mood.id}
            onPress={() => handleMoodSelect(mood.id)}
            className={`flex-col p-4 items-center justify-center  
              transition-transform duration-300 ease-in-out `}
          >
            {mood.icon}
            <Text className={`mt-2 text-xl font-medium `}>
              {mood.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

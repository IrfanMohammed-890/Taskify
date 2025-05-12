import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import MoodSelection from '@/components/MoodSelection';
import JournalCard from '@/components/JournalCard';
import CustomMap from '@/components/CustomMap';
import { getMeditationLocationNamesList } from '@/service/meditation-location';
import { useUserAuth } from '@/context/UserAuthContext';
import { getTodayMood } from '@/service/mood';
import ContactConsultantCard from '@/components/ContactConsultantCard';

// Get greeting based on current time
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  else if (hour < 18) return 'Good Afternoon';
  else return 'Good Evening';
}

export default function UserIndex() {
  const greeting = getGreeting();
  const { user, loading, loginData } = useUserAuth();
  const [locations, setLocations] = useState<any>([]);
  const [isMoodSelectionAvailable, setIsMoodSelectionAvailable] = useState(true);
  const [isMoodSelectionLoading, setIsMoodSelectionLoading] = useState(false);
  const loadMeditationLocations = async () => {
    const data = await getMeditationLocationNamesList();
    setLocations(data);
  };

  const checkIsMoodSelected = async () => {
    setIsMoodSelectionLoading(true);
    const isMoodSelected = await getTodayMood(loginData.uid);
    setIsMoodSelectionAvailable(isMoodSelected.moodSelection);
    setIsMoodSelectionLoading(false);
  };

  useEffect(() => {
    loadMeditationLocations();
    checkIsMoodSelected();
  }, []);

  return (
    <ScrollView className="bg-white flex-1 px-4 mt-10" style={styles.container}>
      <StatusBar style="dark" />
      <View className="mb-6 mt-6 gap-3 ">
        <Text className="text-indigo-600 text-3xl font-bold">{greeting} 👋</Text>
        <Text className="text-violet-600 text-3xl font-semibold mt-1 ">{user?.firstName
          ? user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)
          : ''}!</Text>
        <Text className="text-gray-500 mt-1">Hope you're having a great day!</Text>
      </View>

      {!isMoodSelectionLoading && isMoodSelectionAvailable && <MoodSelection
        checkIsMoodSelected={checkIsMoodSelected}
      />}

      <Text className='text-indigo-600 text-xl font-bold py-4'>Meditations Location</Text>

      <View style={{ flex: 1 }} className='min-h-[250px]'>
        <CustomMap
          locations={locations || []}
        />
      </View>

      <View style={{ marginTop: 20 }}>
        <ContactConsultantCard />
      </View>
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


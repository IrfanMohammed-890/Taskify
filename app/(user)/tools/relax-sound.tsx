import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import Sound from 'react-native-sound';
import { Ionicons } from '@expo/vector-icons';

export default function RelaxSoundScreen() {
  // List of sounds with their names and file paths
  const sounds = [
    { id: '1', name: 'Ocean Waves', file: 'ocean_waves.mp3' },
    { id: '2', name: 'Rain Sounds', file: 'rain_sounds.mp3' },
    { id: '3', name: 'Forest Ambience', file: 'forest_ambience.mp3' },
    { id: '4', name: 'Wind Sounds', file: 'wind_sounds.mp3' },
  ];

  const [soundPlaying, setSoundPlaying] = useState<Sound >();

  // Function to handle sound play
  const playSound = (file: string) => {
    // Stop the previous sound if any is playing
    if (soundPlaying) {
      soundPlaying.stop();
    }

    // Create a new sound instance
    const newSound = new Sound(file, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Sound loading error:', error);
        return;
      }
      newSound.play();
      setSoundPlaying(newSound); // Set the sound as playing
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Relaxing Sounds</Text>
      <FlatList
        data={sounds}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.soundItem}>
            <Text style={styles.soundName}>{item.name}</Text>
            <TouchableOpacity onPress={() => playSound(item.file)}>
              <Ionicons
                name="play-circle-outline"
                size={32}
                color="#4f46e5"
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4f46e5',
    marginBottom: 16,
  },
  soundItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  soundName: {
    fontSize: 18,
    color: '#333',
  },
});


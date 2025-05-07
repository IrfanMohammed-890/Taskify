import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import { Audio } from "expo-av"; // For audio playback

const data = [
  {
    id: 1,
    title: "Relax",
    description:
      "Learn how to focus on your breath to calm the mind and improve awareness. This is a foundational meditation technique useful for stress reduction. Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia aliquam ipsa, facere explicabo cupiditate pariatur neque modi excepturi ut cum veniam officiis quisquam facilis eveniet iusto praesentium eum minus perferendis. Magnam autem atque voluptatum nesciunt sequi rerum vitae laborum vero eos, cupiditate, amet aspernatur eligendi. Quidem distinctio atque alias consectetur.",
    isPaid: true,
    track: "../assets/ocean.mp3", // Replace with your actual file path
  },
];


export default function RelaxSoundScreen() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  async function handlePlayPause(track: any) {
    if (sound) {
      await sound.unloadAsync(); // Stop previous sound
      setSound(null);
    }

    if (isPlaying) {
      setIsPlaying(false);
    } else {
      const { sound: newSound } = await Audio.Sound.createAsync(track);
      setSound(newSound);
      await newSound.playAsync();
      setIsPlaying(true);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Relax Sounds</Text>

      {data.map((item) => {
        const isExpanded = expandedId === item.id;

        return (
          <TouchableOpacity key={item.id} style={styles.card} activeOpacity={1}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>

              <View style={styles.cardDescriptionRow}>
                <Text style={styles.cardDescription} numberOfLines={isExpanded ? undefined : 3}>
                  {item.description}
                </Text>

                <Pressable onPress={() => setExpandedId(isExpanded ? null : item.id)}>
                  <Ionicons
                    name={isExpanded ? "chevron-up-outline" : "chevron-down-outline"}
                    size={20}
                    color="#4f46e5"
                  />
                </Pressable>
              </View>


              <View style={styles.playerContainer}>
                <TouchableOpacity
                  style={styles.playButton}
                  onPress={() => handlePlayPause(item.track)}
                >
                  <Ionicons
                    name={isPlaying ? "pause" : "play"}
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
                <Text style={styles.trackLabel}>Now Playing: Ocean Sound</Text>
              </View>

            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

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
  playerContainer: {
    marginTop: 12,
    backgroundColor: "#4f46e5",
    borderRadius: 8,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  playButton: {
    width: 40,
    height: 40,
    backgroundColor: "#1f2937",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  trackLabel: {
    color: "white",
    fontSize: 14,
  },
});

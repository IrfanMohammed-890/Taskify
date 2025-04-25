import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, SafeAreaView, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router"; // For routing

export default function ToolsIndex() {
  const router = useRouter();

  const tools = [
    {
      id: "1",
      name: "Meditation",
      description: "A guided meditation tool to relax your mind.",
      route: "/(user)/tools/meditation",
    },
    {
      id: "2",
      name: "Breathing",
      description: "A breathing exercise to help calm your nerves.",
      route: "/(user)/tools/breathing",
    },
    {
      id: "3",
      name: "Relaxing Sound",
      description: "Soothing sounds to help you unwind and relax.",
      route: "/(user)/tools/relax-sound",
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 40 }}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Safe Care Tools</Text>
        {tools.map((tool) => (
          <View key={tool.id} style={styles.card}>
            <Text style={styles.cardTitle}>{tool.name}</Text>
            <Text style={styles.cardDescription}>{tool.description}</Text>


            <TouchableOpacity
              onPress={() => router.push(tool.route as any)}
              style={{
                backgroundColor: "purple",
                paddingHorizontal: 20,
                paddingVertical: 10,
                alignSelf: "flex-start",
                borderRadius: 8,
              }}
            >
              <Text style={{ color: "white", fontWeight: "medium" }}>Start</Text>
            </TouchableOpacity>

          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 90,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3730a3",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // for Android shadow
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3730a3",
  },
  cardDescription: {
    fontSize: 14,
    color: "#555",
    marginVertical: 8,
  },
});

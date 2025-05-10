import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, SafeAreaView, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router"; // For routing
import { ChevronRight } from "lucide-react-native";

export default function FeatureScreen() {
  const router = useRouter();

  const tools = [
    {
      id: "1",
      name: "Pricing Plans",
      description: "A guided meditation tool to relax your mind.",
      route: "/(admin)/pricing-plans",
    },
    {
      id: "2",
      name: "Users",
      description: "A breathing exercise to help calm your nerves.",
      route: "/(admin)/users",
    },
    {
      id: "3",
      name: "Journals",
      description: "Soothing sounds to help you unwind and relax.",
      route: "/(admin)/journals",
    },
    {
      id: "4",
      name: "Relaxing Sound",
      description: "Soothing sounds to help you unwind and relax.",
      route: "/(admin)/relax-sound",
    },
    {
      id: "5",
      name: "Breathing",
      description: "Soothing sounds to help you unwind and relax.",
      route: "/(admin)/breathing",
    },
    {
      id: "6",
      name: "Meditation",
      description: "Soothing sounds to help you unwind and relax.",
      route: "/(admin)/meditation",
    },
    {
      id: "7",
      name: "Meditation Location",
      description: "Soothing sounds to help you unwind and relax.",
      route: "/(admin)/meditation-location",
    },
    {
      id: "8",
      name: "Consultants",
      description: "Soothing sounds to help you unwind and relax.",
      route: "/(admin)/consultant",
    },
    {
      id: "9",
      name: "Payment",
      description: "Soothing sounds to help you unwind and relax.",
      route: "/(admin)/payment",
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 40 }}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Manage Features</Text>
        {tools.map((tool) => (
          <View key={tool.id} style={styles.card}>
            <TouchableOpacity
              onPress={() => router.push(tool.route as any)}
              style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
                // alignSelf: "flex-start",
                borderRadius: 8,
              }}
            >
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ fontSize: 16, fontWeight: "600", color: "#1F2937" }}>
                  {tool.name}
                </Text>
                <ChevronRight size={20} color="#6366F1" />
              </View>
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

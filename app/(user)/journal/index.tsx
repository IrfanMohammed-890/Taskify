import JournalCard from "@/components/JournalCard";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, SafeAreaView } from "react-native";

export default function JournalScreen() {
  return (
    <SafeAreaView style={{ flex: 1, marginTop: 40 }}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Journals</Text>

        {[...Array(10)].map((_, index) => (
          <JournalCard
            key={index}
            id={`$index`}
            title="Peace mind helps you to grow"
            description={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text since the 1500s. It has survived centuries, including the leap into electronic typesetting.`}
            // onPress={() => console.log('clicked')}
          />
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 90, // Padding to stay above the tab bar
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3730a3",
    marginBottom: 12,
  },
});

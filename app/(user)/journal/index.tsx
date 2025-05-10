import JournalCard from "@/components/JournalCard";
import { fetchJournalList } from "@/service/journal";
import { StatusBar } from "expo-status-bar";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { StyleSheet, Text, SafeAreaView, TouchableOpacity, ActivityIndicator, FlatList, View } from "react-native";

export default function JournalScreen() {
  const [journals, setJournals] = useState([]);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const PAGE_SIZE = 10;

  const loadJournals = async (reset = false) => {
    try {
      setLoading(true);
      const response = await fetchJournalList(
        PAGE_SIZE,
        reset ? null : lastDoc,
      );

      if (reset) {
        setJournals(response.data as any);
      } else {
        setJournals(prev => [...prev, ...response.data] as any);
      }

      setLastDoc(response.lastDoc);
      setHasMore(response.data.length === PAGE_SIZE);
    } catch (error) {
      console.error("Error loading journals", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJournals();
  }, []);

  const renderItem = ({ item }: { item: any; }) => (
    <JournalCard
      id={item.id}
      title={item.name}
      description={item.description}
      isPaid={item.isPaid || false}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 40, padding: 10 }}>
      <StatusBar style="dark" />
      <Text style={styles.title}>Journals</Text>
      <FlatList
        data={journals}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={
          <>
            {loading && (
              <ActivityIndicator
                size="small"
                color="#6366F1"
                style={{ marginTop: 10 }}
              />
            )}
            {!loading && hasMore && (
              <TouchableOpacity
                style={styles.loadMoreButton}
                onPress={() => loadJournals()}
              >
                <Text style={styles.loadMoreText}>Load More</Text>
              </TouchableOpacity>
            )}
            {!loading && journals.length === 0 && (
              <Text style={styles.noResults}>No data found.</Text>
            )}
          </>
        }
        contentContainerStyle={{ padding: 10 }}
      />
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
  loading: {
    alignItems: 'center',
    marginVertical: 10,
  },
  noData: {
    textAlign: 'center',
    color: '#9CA3AF',
    marginVertical: 20,
  },
  noResults: {
    textAlign: "center",
    color: "#9CA3AF",
    marginTop: 20,
  },
  loadMoreButton: {
    backgroundColor: "#4F46E5",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  loadMoreText: {
    color: "#FFF",
  },
});

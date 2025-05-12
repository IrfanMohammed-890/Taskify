import { useUserAuth } from "@/context/UserAuthContext";
import { fetchMeditationList } from "@/service/meditation";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { Lock } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Toast from "react-native-toast-message";

const PAGE_SIZE = 20;

const MeditationScreen = () => {
  const { user } = useUserAuth()
  const [meditations, setMeditations] = useState<any[]>([]);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMeditations = async (reset = false) => {
    if (loading) return;
    try {
      setLoading(true);
      const response = await fetchMeditationList(PAGE_SIZE, reset ? null : lastDoc);

      if (reset) {
        setMeditations(response.data || []);
      } else {
        setMeditations(prev => [...prev, ...(response.data || [])]);
      }

      setLastDoc(response.lastDoc);
      setHasMore((response.data || []).length === PAGE_SIZE);
    } catch (error) {
      console.error("Error loading meditations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMeditations(true);
  }, []);

  const renderItem = ({ item }: { item: any; }) => (
    <TouchableOpacity
      key={item.id}
      style={styles.card}
      onPress={() => {
        if (!user?.isMember && item.isPaid) {
          router.push('/(user)/pricing');
          return Toast.show({
            type: 'error',
            text1: 'Need subscription',
            text2: 'Subscription is required for premium.',
          });
        } else {
          router.push(`/tools/meditation/${item.id}`);
        }
      }}
    >
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.meditationName}</Text>
        <View style={styles.cardDescriptionRow}>
          <Text style={styles.cardDescription} numberOfLines={3}>
            {item.description}
          </Text>
          {!user?.isMember && item.isPaid ? (
            <Lock size={24} color="#9ca3af" />
          ) : (
              <Ionicons name="chevron-forward-outline" size={18} color="#4f46e5" />
          )}

        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Meditations</Text>

      <FlatList
        data={meditations}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id || index.toString()}
        ListFooterComponent={
          <View style={{ marginTop: 16, marginBottom: 32, alignItems: "center" }}>
            {loading ? (
              <ActivityIndicator size="small" color="#4f46e5" />
            ) : hasMore ? (
              <TouchableOpacity
                onPress={() => loadMeditations()}
                style={styles.loadMoreButton}
              >
                <Text style={styles.loadMoreText}>Load More</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        }
      />
    </View>
  );
};

export default MeditationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 24,
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
  loadMoreButton: {
    backgroundColor: "#4f46e5",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  loadMoreText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});

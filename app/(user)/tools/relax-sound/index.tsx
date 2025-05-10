import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { fetchRelaxSoundList } from "@/service/relax-sound";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import YoutubePlayer from "react-native-youtube-iframe";

export default function RelaxSoundScreen() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [relaxSounds, setRelaxSounds] = useState([]);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const PAGE_SIZE = 20;

  const loadRelaxSounds = async (reset = false) => {
    try {
      setLoading(true);
      const response = await fetchRelaxSoundList(PAGE_SIZE, reset ? null : lastDoc);

      if (reset) {
        setRelaxSounds(response.data as any);
      } else {
        setRelaxSounds((prev) => [...prev, ...response.data] as any);
      }

      setLastDoc(response.lastDoc);
      setHasMore(response.data.length === PAGE_SIZE);
    } catch (error) {
      console.error("Error loading sounds", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRelaxSounds();
  }, []);

  const extractVideoId = (url: string) => {
    const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url?.match(regex);
    return match ? match[1] : null; // Return video ID or null if not found
  };


  const renderItem = ({ item }: { item: any; }) => {
    const isExpanded = expandedId === item.id;

    const handlePress = () => {
      if (expandedId === item.id) {
        setExpandedId(null);  // Collapse the item if it's already expanded
      } else {
        setExpandedId(item.id);  // Expand the clicked item
      }
    };

    const videoId = extractVideoId(item.link)

    return (
      <TouchableOpacity
        key={item.id}
        style={styles.card}
        activeOpacity={1}

      >
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.name}</Text>

          <TouchableOpacity onPress={handlePress} style={styles.cardDescriptionRow}>
            <Text style={styles.cardDescription} numberOfLines={isExpanded ? undefined : 3}>
              {item.description}
            </Text>
          </TouchableOpacity>

          <View style={styles.youtubeContainer}>
            <YoutubePlayer
              height={200}
              play={false}
              videoId={videoId as any}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Relax Sounds</Text>
      <FlatList
        data={relaxSounds}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 10 }}
        ListFooterComponent={
          <>
            {loading && (
              <ActivityIndicator size="small" color="#6366F1" style={{ marginTop: 10 }} />
            )}
            {!loading && hasMore && (
              <TouchableOpacity style={styles.loadMoreButton} onPress={() => loadRelaxSounds()}>
                <Text style={styles.loadMoreText}>Load More</Text>
              </TouchableOpacity>
            )}
            {!loading && relaxSounds.length === 0 && (
              <Text style={styles.noResults}>No data found.</Text>
            )}
          </>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 24,
    marginTop: 20
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
    backgroundColor: "#4F46E5",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  loadMoreText: {
    color: "#FFF",
  },
  noResults: {
    textAlign: "center",
    color: "#9CA3AF",
    marginTop: 20,
  },
  youtubeContainer: {
    marginTop: 12,
    borderRadius: 8,
    overflow: "hidden",
  }
});

import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import ConsultantList from '@/components/ConsultantList';
import { fetchConsultantList } from '@/service/consultant';


export default function ConsultantScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [consultants, setConsultants] = useState([]);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const PAGE_SIZE = 10;

  const loadConsultants = async (reset = false) => {
    try {
      setLoading(true);
      const response = await fetchConsultantList(
        PAGE_SIZE,
        reset ? null : lastDoc,
        searchText.trim()
      );

      if (reset) {
        setConsultants(response.data as any);
      } else {
        setConsultants(prev => [...prev, ...response.data] as any);
      }

      setLastDoc(response.lastDoc);
      setHasMore(response.data.length === PAGE_SIZE);
    } catch (error) {
      console.error("Error loading locations", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLastDoc(null);
    setHasMore(true);
    loadConsultants(true);
  }, [searchText]);

  const renderItem = ({ item }: { item: any; }) => {
    return (
      <View key={item.id} style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.name}>{item.name}</Text>
        </View>

        <Text style={styles.detail}>Education: {item.education}</Text>
        <Text style={styles.detail}>Email: {item.email}</Text>
        <Text style={styles.detail}>Contact: {item.contact}</Text>

        <View style={styles.dayContainer}>
          {item.days.map((d: string, index: number) => (
            <View key={index} style={styles.dayBadge}>
              <Text style={styles.dayText}>{d}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 40, padding: 10 }}>
      <StatusBar backgroundColor={'dark'} />
      <Text style={styles.title}>Consultants</Text>
      <View style={styles.container}>

        <TextInput
          style={styles.searchBar}
          placeholder="Search by consultant name"
          value={searchText}
          onChangeText={setSearchText}
        />

        <FlatList
          data={consultants}
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
                  onPress={() => loadConsultants()}
                >
                  <Text style={styles.loadMoreText}>Load More</Text>
                </TouchableOpacity>
              )}
              {!loading && consultants.length === 0 && (
                <Text style={styles.noResults}>No consultant found.</Text>
              )}
            </>
          }
          contentContainerStyle={{ padding: 10 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  detail: {
    fontSize: 14,
    color: '#4B5563',
    marginTop: 2,
  },
  searchBar: {
    height: 40,
    borderColor: "#E5E7EB",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    margin: 10,
    backgroundColor: "#F9FAFB",
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  description: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 8,
  },
  stepsContainer: {
    marginTop: 8,
  },
  stepItem: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
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

  dayContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  dayBadge: {
    backgroundColor: '#E0E7FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  dayText: {
    color: '#3730A3',
    fontWeight: '500',
  },
});
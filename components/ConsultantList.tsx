import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { Trash2, Pencil } from 'lucide-react-native';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import ConfirmDialog from './ui/ConfirmDialog';
import { deleteConsultant } from '@/service/consultant';

interface ConsultantListProps {
  consultants: any[];
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  searchText: string;
  loadConsultant: (reset?: boolean) => void;
  loading: boolean;
  hasMore: boolean;
  onEdit: (data: any) => void;
}

const ConsultantList: React.FC<ConsultantListProps> = ({
  consultants,
  setSearchText,
  searchText,
  loadConsultant,
  loading,
  hasMore,
  onEdit,
}) => {

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!selectedId) return;
    setShowConfirm(false);
    try {
      await deleteConsultant(selectedId);
      Toast.show({
        type: "success",
        text1: "Deleted",
        text2: "Consultant deleted successfully!",
      });
      loadConsultant(true);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to delete consultant.",
      });
    } finally {
      setShowConfirm(false);
      setSelectedId(null);
    }
  };


  const renderItem = ({ item }: { item: any; }) => {
    return (
      <View key={item.id} style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.name} textBreakStrategy="balanced" ellipsizeMode="tail">{item.name}</Text>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => onEdit(item)} style={{ marginRight: 8 }}>
              <Pencil size={20} color="#3B82F6" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelectedId(item.id);
                setShowConfirm(true);
              }}
            >
              <Trash2 size={20} color="#EF4444" />
            </TouchableOpacity>
          </View>
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
                onPress={() => loadConsultant()}
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

      <ConfirmDialog
        visible={showConfirm}
        message="Do you really want to delete this consultant?"
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        loading={loading}
      />

    </View>
  );
};

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
    marginBottom: 8,
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

export default ConsultantList;

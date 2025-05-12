import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, FlatList } from 'react-native';
import { Pencil, Trash2 } from 'lucide-react-native';
import { deleteBreathing } from '@/service/breathing';
import Toast from 'react-native-toast-message';
import ConfirmDialog from './ui/ConfirmDialog';


interface BreathingListProps {
  breathings: any[];
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  searchText: string;
  loadBreathings: (reset?: boolean) => void;
  loading: boolean;
  hasMore: boolean;
  onEdit: (meditation: any) => void;
}

const BreathingList: React.FC<BreathingListProps> = ({
  breathings,
  setSearchText,
  searchText,
  loadBreathings,
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
      await deleteBreathing(selectedId);
      Toast.show({
        type: "success",
        text1: "Deleted",
        text2: "Breathing deleted successfully!",
      });
      loadBreathings(true);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to delete breathing.",
      });
    } finally {
      setShowConfirm(false);
      setSelectedId(null);
    }
  };

  const renderItem = ({ item }: { item: any; }) => (
    <View key={item.id} style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.name} textBreakStrategy="balanced" ellipsizeMode="tail">{item.breathingName}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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

      <Text style={styles.description}>{item.description}</Text>

      <View style={styles.stepsContainer}>
        {item?.steps?.map((step: any, index: number) => (
          <Text key={index} style={styles.stepItem}>• {step}</Text>
        ))}
      </View>
    </View>
  );


  return (
    <View style={styles.container}>

      <TextInput
        style={styles.searchBar}
        placeholder="Search by breathing name"
        value={searchText}
        onChangeText={setSearchText}
      />

      <FlatList
        data={breathings}
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
                onPress={() => loadBreathings()}
              >
                <Text style={styles.loadMoreText}>Load More</Text>
              </TouchableOpacity>
            )}
            {!loading && breathings.length === 0 && (
              <Text style={styles.noResults}>No breathing found.</Text>
            )}
          </>
        }
        contentContainerStyle={{ padding: 10 }}
      />

      <ConfirmDialog
        visible={showConfirm}
        message="Do you really want to delete this breathing?"
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        loading={loading}
      />

    </View>
  );
}

export default BreathingList

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    height: 40,
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#F9FAFB',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
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
  noResults: {
    textAlign: 'center',
    color: '#9CA3AF',
    marginTop: 20,
  },
  stepItem: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  pageButton: {
    padding: 10,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
  },
  pageNumber: {
    fontSize: 16,
    color: '#374151',
  },
  disabled: {
    opacity: 0.4,
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

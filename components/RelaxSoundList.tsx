import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { Trash2, Pencil } from 'lucide-react-native';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import ConfirmDialog from './ui/ConfirmDialog';
import { deleteRelaxSound } from '@/service/relax-sound';

interface RelaxSoundListProps {
  relaxSounds: any[];
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  searchText: string;
  loadRelaxSounds: (reset?: boolean) => void;
  loading: boolean;
  hasMore: boolean;
  onEdit: (data: any) => void;
}

const RelaxSoundList: React.FC<RelaxSoundListProps> = ({
  relaxSounds,
  setSearchText,
  searchText,
  loadRelaxSounds,
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
      await deleteRelaxSound(selectedId);
      Toast.show({
        type: "success",
        text1: "Deleted",
        text2: "Relax sound deleted successfully!",
      });
      loadRelaxSounds(true);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to delete relax sound.",
      });
    } finally {
      setShowConfirm(false);
      setSelectedId(null);
    }
  };


  const renderItem = ({ item }: { item: any; }) => (
    <View key={item.id} style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.title} textBreakStrategy="balanced" ellipsizeMode="tail">{item.name}</Text>
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

      <Text style={styles.description} numberOfLines={6} ellipsizeMode="tail">{item.description}</Text>
      <Text style={styles.description}>Link: {item.link}</Text>

    </View>
  );

  return (
    <View style={styles.container}>

      <TextInput
        style={styles.searchBar}
        placeholder="Search by meditation name"
        value={searchText}
        onChangeText={setSearchText}
      />

      <FlatList
        data={relaxSounds}
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
                onPress={() => loadRelaxSounds()}
              >
                <Text style={styles.loadMoreText}>Load More</Text>
              </TouchableOpacity>
            )}
            {!loading && relaxSounds.length === 0 && (
              <Text style={styles.noResults}>No data found.</Text>
            )}
          </>
        }
        contentContainerStyle={{ padding: 10 }}
      />

      <ConfirmDialog
        visible={showConfirm}
        message="Do you really want to delete this sound?"
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
    justifyContent: 'space-between', // changed from space-around
    alignItems: 'center',
    marginBottom: 12,
  },

  title: {
    flex: 1, // allows it to take remaining space
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
});

export default RelaxSoundList;

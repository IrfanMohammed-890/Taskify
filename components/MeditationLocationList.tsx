import { Trash2, Pencil } from "lucide-react-native";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ConfirmDialog from "./ui/ConfirmDialog";
import { deleteMeditationLocation } from "@/service/meditation-location";
import Toast from "react-native-toast-message";

export default function MeditationLocationList({
  meditations,
  searchText,
  setSearchText,
  loadMeditations,
  loading,
  hasMore,
  onEdit
}: {
  meditations: any[];
  searchText: string;
  setSearchText: (text: string) => void;
  loadMeditations: (reset?: boolean) => void;
  loading: boolean;
  hasMore: boolean;
  onEdit: (location: any) => void;
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!selectedId) return;
    setShowConfirm(false);
    try {
      await deleteMeditationLocation(selectedId);
      Toast.show({
        type: "success",
        text1: "Deleted",
        text2: "Location deleted successfully!",
      });
      loadMeditations(true);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to delete location.",
      });
    } finally {
      setShowConfirm(false);
      setSelectedId(null);
    }
  };

  const renderItem = ({ item }: { item: any; }) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.name} textBreakStrategy="balanced" >{item.location_name}</Text>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <TouchableOpacity
              onPress={() => {
                onEdit(item);
              }}
            >
              <Pencil size={20} color="#6366F1" />
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
        <Text style={styles.detail}>Latitude: {item.lat}</Text>
        <Text style={styles.detail}>Longitude: {item.long}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by location name"
        value={searchText}
        onChangeText={setSearchText}
      />

      <FlatList
        data={meditations}
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
                onPress={() => loadMeditations()}
              >
                <Text style={styles.loadMoreText}>Load More</Text>
              </TouchableOpacity>
            )}
            {!loading && meditations.length === 0 && (
              <Text style={styles.noResults}>No location found.</Text>
            )}
          </>
        }
        contentContainerStyle={{ padding: 10 }}
      />

      <ConfirmDialog
        visible={showConfirm}
        message="Do you really want to delete this location?"
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    position: "relative"
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    color: "#1F2937",
  },
  detail: {
    fontSize: 14,
    color: "#4B5563",
    marginTop: 2,
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

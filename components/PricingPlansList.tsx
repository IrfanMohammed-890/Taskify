import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList, TextInput } from 'react-native';
import { Trash2, Pencil } from 'lucide-react-native';
import { deletePricingPlans } from '@/service/pricing-plans';
import Toast from 'react-native-toast-message';
import { useState } from 'react';
import ConfirmDialog from './ui/ConfirmDialog';

export default function PricingPlansList({
  pricingPlans,
  searchText,
  setSearchText,
  loadPricingPlans,
  loading,
  hasMore,
  onEdit
}: {
  pricingPlans: any[];
  searchText: string;
  setSearchText: (text: string) => void;
  loadPricingPlans: (reset?: boolean) => void;
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
      await deletePricingPlans(selectedId);
      Toast.show({
        type: "success",
        text1: "Deleted",
        text2: "Pricing deleted successfully!",
      });
      loadPricingPlans(true);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to delete pricing plans.",
      });
    } finally {
      setShowConfirm(false);
      setSelectedId(null);
    }
  };

  const renderItem = ({ item }: { item: any; }) => (
    <View key={item.id} style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.planName} textBreakStrategy="balanced">{item.planName}</Text>
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
      <Text style={styles.price}>${item.price} / {item.duration}</Text>
      <Text style={styles.price} className='my-2 text-sm'>{item.description}</Text>
      <View style={styles.stepsContainer}>
        {item?.features?.map((feature: any, index: number) => (
          <Text key={index} style={styles.stepItem}>• {feature}</Text>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by pricing title"
        value={searchText}
        onChangeText={setSearchText}
      />

      <FlatList
        data={pricingPlans}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.id.toString()}
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
                onPress={() => loadPricingPlans()}
              >
                <Text style={styles.loadMoreText}>Load More</Text>
              </TouchableOpacity>
            )}
            {!loading && pricingPlans?.length === 0 && (
              <Text style={styles.noResults}>No pricing plans found.</Text>
            )}
          </>
        }
        contentContainerStyle={{ padding: 10 }}
      />

      <ConfirmDialog
        visible={showConfirm}
        message="Do you really want to delete this pricing plans?"
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
    elevation: 2, // Android shadow
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  planName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  price: {
    fontSize: 18,
    color: '#4B5563',
    marginBottom: 4,
  },
  expiry: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  expiryDate: {
    fontWeight: '600',
    color: '#4F46E5',
  },
  featuresContainer: {
    marginTop: 8,
  },
  featureItem: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
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
  stepsContainer: {
    marginTop: 8,
  },
  stepItem: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
});

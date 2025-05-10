import { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { fetchPricingPlansList } from '@/service/pricing-plans';
import { router } from 'expo-router';

export default function PricingPlansScreen() {
  const [pricingPlans, setPricingPlans] = useState([]);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const PAGE_SIZE = 10;

  const loadPricingPlans = async (reset = false) => {
    try {
      setLoading(true);
      const response = await fetchPricingPlansList(
        PAGE_SIZE,
        reset ? null : lastDoc,
      );

      if (reset) {
        setPricingPlans(response.data as any);
      } else {
        setPricingPlans(prev => [...prev, ...response.data] as any);
      }

      setLastDoc(response.lastDoc);
      setHasMore(response.data.length === PAGE_SIZE);
    } catch (error) {
      console.error("Error loading pricing plans", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPricingPlans();
  }, []);

  const renderItem = ({ item }: { item: any; }) => (
    <View key={item.id} style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.planName}>{item.planName}</Text>
        <Text style={styles.price}>${item.price} / {item.duration}</Text>
      </View>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.featuresContainer}>
        {item?.features?.map((feature: any, index: number) => (
          <Text key={index} style={styles.featureItem}>• {feature}</Text>
        ))}
      </View>
      <TouchableOpacity
        onPress={() => router.push(`/(user)/payment/${item.id}` as any)}
        style={styles.subscribeButton}>
        <Text style={styles.subscribeText}>Subscribe Now</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#4F46E5'} />
      <Text style={styles.title}>Pricing Plans</Text>

      <FlatList
        data={pricingPlans}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.id.toString()}
        ListFooterComponent={
          <>
            {loading && (
              <ActivityIndicator size="small" color="#6366F1" style={styles.loadingIndicator} />
            )}
            {!loading && hasMore && (
              <TouchableOpacity style={styles.loadMoreButton} onPress={() => loadPricingPlans()}>
                <Text style={styles.loadMoreText}>Load More</Text>
              </TouchableOpacity>
            )}
            {!loading && pricingPlans?.length === 0 && (
              <Text style={styles.noResults}>No pricing plans found.</Text>
            )}
          </>
        }
        contentContainerStyle={styles.flatListContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    paddingHorizontal: 16,
    backgroundColor: '#F9FAFB',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 20,
    textAlign: 'left',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  planName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#374151',
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4F46E5',
  },
  description: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 16,
  },
  featuresContainer: {
    marginBottom: 16,
  },
  featureItem: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 4,
  },
  subscribeButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  subscribeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  loadMoreButton: {
    backgroundColor: '#6366F1',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  loadMoreText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  noResults: {
    textAlign: 'center',
    color: '#9CA3AF',
    marginTop: 20,
  },
  loadingIndicator: {
    marginTop: 20,
  },
  flatListContainer: {
    paddingBottom: 80,
  },
});

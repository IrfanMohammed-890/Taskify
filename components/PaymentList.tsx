import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, FlatList } from 'react-native';
import { Trash2 } from 'lucide-react-native';
import Toast from 'react-native-toast-message';
import ConfirmDialog from './ui/ConfirmDialog';
import { deletePayment } from '@/service/payment';
import { updateUserPaymentStatus } from '@/service/user';

export default function PaymentList({
  payments,
  searchText,
  setSearchText,
  loadPayments,
  loading,
  hasMore,
}: {
  payments: any[];
  searchText: string;
  setSearchText: (text: string) => void;
  loadPayments: (reset?: boolean) => void;
  loading: boolean;
  hasMore: boolean;
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState<any>(null);

  const handleDelete = async () => {
    if (!selectedId) return;
    setShowConfirm(false);
    try {
      console.log('selected id', selectedId);

      await deletePayment(selectedId.id);
      await updateUserPaymentStatus(selectedId.userId as string, false)
      Toast.show({
        type: "success",
        text1: "Deleted",
        text2: "Payment deleted successfully!",
      });
      loadPayments(true);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to delete payment.",
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
          <Text style={styles.name}>{item.firstName} {item.lastName}</Text>
          <TouchableOpacity
            onPress={() => {
              setSelectedId(item);
              setShowConfirm(true);
            }}
          >
            <Trash2 size={20} color="#EF4444" />
          </TouchableOpacity>
        </View>
        <Text style={styles.detail}>Email: {item.email}</Text>
        <Text style={styles.detail}>Plan: {item.planName}</Text>
        <Text style={styles.detail}>Amount: {item.amount}</Text>

      </View>
    );
  };


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by name or email"
        value={searchText}
        onChangeText={setSearchText}
      />
      <FlatList
        data={payments}
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
                onPress={() => loadPayments()}
              >
                <Text style={styles.loadMoreText}>Load More</Text>
              </TouchableOpacity>
            )}
            {!loading && payments?.length === 0 && (
              <Text style={styles.noResults}>No payment found.</Text>
            )}
          </>
        }
        contentContainerStyle={{ padding: 10 }}
      />

      <ConfirmDialog
        visible={showConfirm}
        message="Do you really want to delete this payment?"
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
  detail: {
    fontSize: 14,
    color: '#4B5563',
    marginTop: 2,
  },
  noResults: {
    textAlign: 'center',
    color: '#9CA3AF',
    marginTop: 20,
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

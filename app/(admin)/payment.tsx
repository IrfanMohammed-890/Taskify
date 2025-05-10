import PaymentList from '@/components/PaymentList';
import { fetchPaymentList } from '@/service/payment';
import { StatusBar } from 'expo-status-bar';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

const PaymentScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [payments, setPayments] = useState([]);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const PAGE_SIZE = 10;

  const loadPayments = async (reset = false) => {
    try {
      setLoading(true);
      const response = await fetchPaymentList(
        PAGE_SIZE,
        reset ? null : lastDoc,
        searchText.trim()
      );

      if (reset) {
        setPayments(response.data as any);
      } else {
        setPayments(prev => [...prev, ...response.data] as any);
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
    loadPayments(true);
  }, [searchText]);



  return (
    <SafeAreaView style={{ flex: 1, marginTop: 40, padding: 10 }}>
      <StatusBar style="dark" />

      <Text style={styles.title}> Manage Payments</Text>
      <PaymentList
        payments={payments}
        setSearchText={setSearchText}
        searchText={searchText}
        loadPayments={loadPayments}
        loading={loading}
        hasMore={hasMore}
      />

    </SafeAreaView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 90,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3730a3",
    marginBottom: 12,
  }
});
import UserList from '@/components/UsersList';
import { fetchUsers } from '@/service/user';
import { StatusBar } from 'expo-status-bar';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

const UserScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [users, setUsers] = useState([]);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const PAGE_SIZE = 10;

  const loadMeditations = async (reset = false) => {
    try {
      setLoading(true);
      const response = await fetchUsers(
        PAGE_SIZE,
        reset ? null : lastDoc,
        searchText.trim()
      );

      if (reset) {
        setUsers(response.data as any);
      } else {
        setUsers(prev => [...prev, ...response.data] as any);
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
    loadMeditations(true);
  }, [searchText]);



  return (
    <SafeAreaView style={{ flex: 1, marginTop: 40, padding: 10 }}>
      <StatusBar style="dark" />

        <Text style={styles.title}>Manage Users</Text>
        <UserList
          users={users}
          setSearchText={setSearchText}
          searchText={searchText}
          loadMeditations={loadMeditations}
          loading={loading}
          hasMore={hasMore}
      />

    </SafeAreaView>
  );
};

export default UserScreen;

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
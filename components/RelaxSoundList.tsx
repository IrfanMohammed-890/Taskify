import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Trash2 } from 'lucide-react-native';

export default function RelaxSoundList() {
  const sound = [
    { id: 1, name: 'Relaxing body', isPaid: true, description: 'this is ' },
  ];

  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  // const USERS_PER_PAGE = 4;

  // Filtered users based on search
  const filteredSound = useMemo(() => {
    return sound.filter(data =>
      data.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText]);

  // Pagination logic
  // const totalPages = Math.ceil(filteredSound.length / USERS_PER_PAGE);
  const paginatedSound = useMemo(() => {
    // const start = (currentPage - 1) * USERS_PER_PAGE;
    // return filteredSound.slice(start, start + USERS_PER_PAGE);
    return filteredSound;
  }, [filteredSound, currentPage]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by name or email"
        value={searchText}
        onChangeText={(text) => {
          setSearchText(text);
          setCurrentPage(1); // reset to first page when searching
        }}
      />
      <ScrollView contentContainerStyle={{ padding: 5 }}>
        {paginatedSound?.map((sound) => (
          <View key={sound.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.name}>{sound.name}</Text>
              <TouchableOpacity onPress={() => console.log('Delete sound', sound.id)}>
                <Trash2 size={20} color="#EF4444" />
              </TouchableOpacity>
            </View>
            <Text style={styles.detail}>Description: {sound.description}</Text>
          </View>
        ))}
        {paginatedSound?.length === 0 && (
          <Text style={styles.noResults}>No data found.</Text>
        )}
      </ScrollView>

      {/* Pagination Controls */}
      {/* <View style={styles.pagination}>
        <TouchableOpacity
          onPress={() => setCurrentPage(p => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          style={[styles.pageButton, currentPage === 1 && styles.disabled]}
        >
          <Text>Previous</Text>
        </TouchableOpacity>
        <Text style={styles.pageNumber}>Page {currentPage} of {totalPages}</Text>
        <TouchableOpacity
          onPress={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          style={[styles.pageButton, currentPage === totalPages && styles.disabled]}
        >
          <Text>Next</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
});

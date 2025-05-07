import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Trash2, Pencil } from 'lucide-react-native';
import { useState } from 'react';

export default function JournalList() {
  const [searchQuery, setSearchQuery] = useState('');
  const journals = [
    {
      id: 1,
      title: 'Starter Plan',
      description: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum quaerat quas consequatur minima eveniet, nesciunt reprehenderit modi ex, voluptatum quia ut eum veritatis inventore quidem commodi. Perferendis aliquid officia nisi numquam in maiores reprehenderit maxime minima esse, blanditiis illum odio unde atque deserunt. Itaque fugit labore laudantium mollitia nemo hic?',
      pdf: 'Monthly',
    },
    {
      id: 2,
      title: 'Starter Plan',
      description: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum quaerat quas consequatur minima eveniet, nesciunt reprehenderit modi ex, voluptatum quia ut eum veritatis inventore quidem commodi. Perferendis aliquid officia nisi numquam in maiores reprehenderit maxime minima esse, blanditiis illum odio unde atque deserunt. Itaque fugit labore laudantium mollitia nemo hic?',
      pdf: 'Monthly',
    },
    {
      id: 3,
      title: 'Starter Plan',
      description: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum quaerat quas consequatur minima eveniet, nesciunt reprehenderit modi ex, voluptatum quia ut eum veritatis inventore quidem commodi. Perferendis aliquid officia nisi numquam in maiores reprehenderit maxime minima esse, blanditiis illum odio unde atque deserunt. Itaque fugit labore laudantium mollitia nemo hic?',
      pdf: 'Monthly',
    },
  ];

  const filterJournals = journals.filter((journal) =>
    journal.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search by title..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <ScrollView contentContainerStyle={{ padding: 5 }}>
        {filterJournals?.map((journal) => {
          const maxLength = 160;
          const shouldTruncate = journal.description.length > maxLength;
          const shortText = shouldTruncate ? journal.description.slice(0, maxLength).trim() : journal.description;
          return (
            <View key={journal.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.title}>{journal.title}</Text>
                  <Text style={styles.description}>{shortText}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => console.log('Edit journal', journal.id)} style={{ marginRight: 8 }}>
                    <Pencil size={20} color="#3B82F6" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => console.log('Delete journal', journal.id)}>
                    <Trash2 size={20} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              </View>

            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput: {
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    margin: 10,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    fontSize: 16,
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
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  description: {
    fontSize: 12,
    maxWidth: 250
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
});

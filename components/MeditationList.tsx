import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Trash2, Pencil } from 'lucide-react-native';

export default function MeditationList() {
  const pricingPlans = [
    {
      id: 1,
      title: "Lorem ipshum",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum quaerat quas consequatur minima eveniet, nesciunt reprehenderit modi ex, voluptatum quia ut eum veritatis inventore quidem commodi. Perferendis aliquid officia nisi numquam in maiores reprehenderit maxime minima esse, blanditiis illum odio unde atque deserunt. Itaque fugit labore laudantium mollitia nemo hic?",
      steps: ['Access to basic tools', '5 projects', 'Email support'],
      isPaid: true
    },
    {
      id: 2,
      title: "Lorem ipshum",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum quaerat quas consequatur minima eveniet, nesciunt reprehenderit modi ex, voluptatum quia ut eum veritatis inventore quidem commodi. Perferendis aliquid officia nisi numquam in maiores reprehenderit maxime minima esse, blanditiis illum odio unde atque deserunt. Itaque fugit labore laudantium mollitia nemo hic?",
      steps: ['Unlimited projects', 'Priority support', 'Team collaboration'],
      isTrue: false
    },
    {
      id: 3,
      title: "Lorem ipshum",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum quaerat quas consequatur minima eveniet, nesciunt reprehenderit modi ex, voluptatum quia ut eum veritatis inventore quidem commodi. Perferendis aliquid officia nisi numquam in maiores reprehenderit maxime minima esse, blanditiis illum odio unde atque deserunt. Itaque fugit labore laudantium mollitia nemo hic?",
      steps: ['Dedicated manager', 'Custom solutions', '24/7 Support'],
      isPaid: true
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 5 }}>
        {pricingPlans.map((plan) => (
          <View key={plan.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.title}>{plan.title}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => console.log('Edit plan', plan.id)} style={{ marginRight: 8 }}>
                  <Pencil size={20} color="#3B82F6" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log('Delete plan', plan.id)}>
                  <Trash2 size={20} color="#EF4444" />
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.stepsContainer}>
              {plan.steps.map((step, index) => (
                <Text key={index} style={styles.stepItem}>• {step}</Text>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  stepsContainer: {
    marginTop: 8,
  },
  stepItem: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
});

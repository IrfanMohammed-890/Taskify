import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Trash2, Pencil } from 'lucide-react-native';

export default function PricingPlansList() {
  const pricingPlans = [
    {
      id: 1,
      planName: 'Starter Plan',
      price: '19',
      duration: 'Monthly',
      expiryDate: '2025-05-27',
      features: ['Access to basic tools', '5 projects', 'Email support'],
    },
    {
      id: 2,
      planName: 'Pro Plan',
      price: '49',
      duration: 'Three Month',
      expiryDate: '2025-07-27',
      features: ['Unlimited projects', 'Priority support', 'Team collaboration'],
    },
    {
      id: 3,
      planName: 'Enterprise Plan',
      price: '99',
      duration: 'Yearly',
      expiryDate: '2026-04-27',
      features: ['Dedicated manager', 'Custom solutions', '24/7 Support'],
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {pricingPlans.map((plan) => (
          <View key={plan.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.planName}>{plan.planName}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => console.log('Edit plan', plan.id)} style={{ marginRight: 8 }}>
                  <Pencil size={20} color="#3B82F6" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log('Delete plan', plan.id)}>
                  <Trash2 size={20} color="#EF4444" />
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.price}>${plan.price} / {plan.duration}</Text>
            <Text style={styles.expiry}>Expires on: <Text style={styles.expiryDate}>{plan.expiryDate}</Text></Text>

            <View style={styles.featuresContainer}>
              {plan.features.map((feature, index) => (
                <Text key={index} style={styles.featureItem}>• {feature}</Text>
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
    backgroundColor: '#F9FAFB',
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
});

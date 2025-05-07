import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function PricingPlansCard() {

  
  return (
    <View style={styles.card}>
      {/* Plan Title */}
      <Text style={styles.planTitle}>Pro Plan</Text>

      {/* Plan Price */}
      <Text style={styles.price}>
        $29
        <Text style={styles.perMonth}>/month</Text>
      </Text>

      {/* Plan Features */}
      <View style={styles.features}>
        <Text style={styles.featureItem}>✅ Unlimited Access</Text>
        <Text style={styles.featureItem}>✅ Priority Support</Text>
        <Text style={styles.featureItem}>✅ New Features Included</Text>
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Choose Plan</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 16,
    width: '100%',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4, // for Android shadow
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937', // gray-900
    marginBottom: 8,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6366F1', // indigo-500
    marginBottom: 16,
  },
  perMonth: {
    fontSize: 16,
    color: '#6B7280', // gray-500
  },
  features: {
    marginBottom: 24,
  },
  featureItem: {
    color: '#6B7280', // gray-600
    marginBottom: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#6366F1', // indigo-500
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

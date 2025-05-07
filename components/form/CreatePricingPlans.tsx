import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Make sure to install this package!

export default function CreatePricingPlanForm() {
  const [planName, setPlanName] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('Monthly');
  const [expiryDate, setExpiryDate] = useState('');
  const [features, setFeatures] = useState(['']);

  const handleAddFeature = () => {
    setFeatures([...features, '']);
  };

  const handleFeatureChange = (text: string, index: number) => {
    const newFeatures = [...features];
    newFeatures[index] = text;
    setFeatures(newFeatures);
  };

  const handleDurationChange = (value: string) => {
    setDuration(value);
    const today = new Date();

    if (value === 'Monthly') {
      today.setMonth(today.getMonth() + 1);
    } else if (value === 'Three Month') {
      today.setMonth(today.getMonth() + 3);
    } else if (value === 'Yearly') {
      today.setFullYear(today.getFullYear() + 1);
    }

    const formattedDate = today.toISOString().split('T')[0]; // YYYY-MM-DD format
    setExpiryDate(formattedDate);
  };

  const handleSubmit = () => {
    const newPlan = {
      planName,
      price,
      duration,
      expiryDate,
      features: features.filter(f => f.trim() !== ''),
    };
    console.log('Created Plan:', newPlan);
    // You can send this newPlan to your backend
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Create New Pricing Plan</Text>

      {/* Plan Name */}
      <TextInput
        style={styles.input}
        placeholder="Plan Name"
        value={planName}
        onChangeText={setPlanName}
      />

      {/* Plan Price */}
      <TextInput
        style={styles.input}
        placeholder="Price (e.g., 29)"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      {/* Plan Duration */}
      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={duration}
          onValueChange={(itemValue) => handleDurationChange(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Monthly" value="Monthly" />
          <Picker.Item label="Three Month" value="Three Month" />
          <Picker.Item label="Yearly" value="Yearly" />
        </Picker>
      </View>

      {/* Show Expiry Date */}
      {expiryDate !== '' && (
        <Text style={styles.expiryText}>
          Plan Expiry Date: <Text style={{ fontWeight: 'bold' }}>{expiryDate}</Text>
        </Text>
      )}

      {/* Features */}
      <Text style={styles.subheading}>Features</Text>
      {features.map((feature, index) => (
        <TextInput
          key={index}
          style={styles.input}
          placeholder={`Feature ${index + 1}`}
          value={feature}
          onChangeText={(text) => handleFeatureChange(text, index)}
        />
      ))}

      {/* Add another feature */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddFeature}>
        <Text style={styles.addButtonText}>+ Add Feature</Text>
      </TouchableOpacity>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Create Plan</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9FAFB',
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 24,
  },
  subheading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  dropdownContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 12,
    overflow: 'hidden',
  },
  picker: {
    height: 55,
    width: '100%',
  },
  expiryText: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 16,
  },
  addButton: {
    alignItems: 'center',
    marginBottom: 24,
  },
  addButtonText: {
    color: '#6366F1',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#6366F1',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

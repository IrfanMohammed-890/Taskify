import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Make sure to install this package!
import { PlusCircle, Trash2 } from 'lucide-react-native';
import Toast from 'react-native-toast-message';
import { createPricingPlans, updatePricingPlans } from '@/service/pricing-plans';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

type FormData = {
  planName: string;
  duration: string;
  features: { feature: string; }[];
  price: string | number;
  description: string;
};


export default function CreatePricingPlanForm({
  setIsModalVisible,
  reloadPricingPlans,
  editingPricingPlans,
}: {
  setIsModalVisible: (visible: boolean) => void;
  reloadPricingPlans: () => void;
  editingPricingPlans: any | null;
}) {

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      planName: '',
      description: '',
      price: '',
      duration: 'Monthly',
      features: [{ feature: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'features',
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);

      editingPricingPlans ? await updatePricingPlans(editingPricingPlans.id, data) : await createPricingPlans(data);
      setIsModalVisible(false);
      reset();
      Toast.show({
        type: 'success',
        text1: editingPricingPlans ? 'Pricing plans updated' : 'Pricing plans saved',
      });
      reloadPricingPlans();
    } catch (error: any) {
      console.error("Error:", error.message);
      Toast.show({
        type: 'error',
        text1: 'Error Saving pricing plans',
        text2: error.message || 'Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (editingPricingPlans) {
      reset({
        planName: editingPricingPlans.planName || '',
        duration: editingPricingPlans.duration || 'monthly',
        features: Array.isArray(editingPricingPlans.features) && editingPricingPlans.features.length > 0
          ? editingPricingPlans.features.map((feature: string) => ({ feature }))
          : [{ feature: '' }],
        price: editingPricingPlans.price,
        description: editingPricingPlans.description || '',
      });
    }
  }, [editingPricingPlans, reset]);


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Plan Name</Text>
      <Controller
        control={control}
        name="planName"
        rules={{ required: 'Plan name is required' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            className={`w-full border ${errors.planName ? 'border-red-500' : 'border-gray-300'} p-3 pr-12 rounded-xl bg-gray-50 text-gray-800`}
            placeholder="Enter plan name"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {/* Description */}
      <Text style={styles.label}>Description</Text>
      <Controller
        control={control}
        name="description"
        rules={{ required: 'Description name is required' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter pricing plan description"
            value={value}
            onChangeText={onChange}
            multiline
          />
        )}
      />
      <Text style={styles.label}>Price</Text>
      <Controller
        control={control}
        name="price"
        rules={{
          required: 'Price is required',
          pattern: {
            value: /^[0-9]*$/,
            message: 'Only numbers are allowed',
          }
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            className={`w-full border ${errors.price ? 'border-red-500' : 'border-gray-300'} p-3 pr-12 rounded-xl bg-gray-50 text-gray-800`}
            placeholder="Enter amount"
            value={value as any}
            keyboardType="numeric"
            onChangeText={(text) => {
              const numericText = text.replace(/[^0-9]/g, '');
              onChange(numericText);
            }}
          />
        )}
      />

      <Text style={styles.label}>Duration</Text>
      <Controller
        control={control}
        name="duration"
        rules={{ required: 'Duration is required' }}
        render={({ field: { onChange, value } }) => (
          <View style={styles.dropdownContainer}>
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              style={styles.picker}
            >
              <Picker.Item label="Monthly" value="Monthly" />
              <Picker.Item label="Three Month" value="Three Month" />
              <Picker.Item label="Yearly" value="Yearly" />
            </Picker>
          </View>
        )}
      />



      {/* Features */}
      <View style={styles.stepsContainer}>
        <Text style={styles.label}>Features</Text>
        <TouchableOpacity onPress={() => append({ feature: '' })}>
          <PlusCircle size={28} color="#4F46E5" />
        </TouchableOpacity>
      </View>

      {fields.map((field, index) => (
        <View key={field.id} style={styles.stepContainer}>
          <Controller
            control={control}
            name={`features.${index}.feature`}
            rules={{ required: 'Step is required' }}
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  style={[
                    styles.stepInput,
                    errors.features?.[index]?.feature && { borderColor: '#ef4444' },
                  ]}
                  placeholder={`Feature ${index + 1}`}
                  value={value}
                  onChangeText={onChange}
                />
                {errors.features?.[index]?.feature && (
                  <Text style={{ color: '#ef4444', marginTop: 4, fontSize: 12 }}>
                    {errors.features[index].feature?.message}
                  </Text>
                )}
              </>
            )}
          />
          <TouchableOpacity onPress={() => remove(index)}>
            <Trash2 size={24} color="#ef4444" />
          </TouchableOpacity>
        </View>
      ))}



      {/* Submit Button */}
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={[styles.submitButton, (!isValid || isLoading) && { opacity: 0.5 }]}
        disabled={!isValid || isLoading}
      >
        <Text style={styles.submitText}>
          {isLoading ? 'Submitting...' : editingPricingPlans ? 'Update pricing plan' : 'Save pricing plan'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4F46E5',
    marginBottom: 8,
  },
  textArea: {
    height: 128,
    textAlignVertical: 'top',
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
    marginBottom: 10,
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
    backgroundColor: '#4F46E5',
    borderRadius: 16,
    paddingVertical: 12,
    marginTop: 24,
    alignItems: 'center',
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  deleteButton: {
    marginLeft: 8,
    padding: 8,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 12,
  },
});

import { View, Text, TextInput, TouchableOpacity, ScrollView, Switch, StyleSheet } from 'react-native';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { PlusCircle, Trash2 } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { createMeditation, updateMeditation } from '@/service/meditation';


type FormData = {
  meditationName: string;
  description: string;
  steps: { step: string; }[];
  isPaid: boolean;
};


export default function CreateMeditationForm({
  setIsModalVisible,
  reloadMeditations,
  editingMeditation,
}: {
  setIsModalVisible: (visible: boolean) => void;
  reloadMeditations: () => void;
  editingMeditation: any | null;
}) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      meditationName: '',
      description: '',
      steps: [{ step: '' }],
      isPaid: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'steps',
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);

      editingMeditation ? await updateMeditation(editingMeditation.id, data) : await createMeditation(data);
      setIsModalVisible(false);
      reset();
      Toast.show({
        type: 'success',
        text1: editingMeditation ? 'Meditation updated' : 'Meditation saved',
      });
      reloadMeditations();
    } catch (error: any) {
      console.error("Error:", error.message);
      Toast.show({
        type: 'error',
        text1: 'Error Saving Meditation',
        text2: error.message || 'Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (editingMeditation) {
      reset({
        meditationName: editingMeditation.meditationName || '',
        description: editingMeditation.description || '',
        steps: Array.isArray(editingMeditation.steps) && editingMeditation.steps.length > 0
          ? editingMeditation.steps.map((step: string) => ({ step }))
          : [{ step: '' }],
        isPaid: editingMeditation.isPaid ?? false,
      });
    }
  }, [editingMeditation, reset]);




  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {/* Meditation Name */}
      <Text style={styles.label}>Meditation Name</Text>
      <Controller
        control={control}
        name="meditationName"
        rules={{ required: 'Meditation name is required' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            className={`w-full border ${errors.meditationName ? 'border-red-500' : 'border-gray-300'} p-3 pr-12 rounded-xl bg-gray-50 text-gray-800`}
            placeholder="Enter meditation name"
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
        rules={{ required: 'Description is required' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, styles.textArea]}
            className={`w-full border ${errors.description ? 'border-red-500' : 'border-gray-300'} p-3 pr-12 rounded-xl bg-gray-50 text-gray-800`}
            placeholder="Enter meditation description"
            value={value}
            onChangeText={onChange}
            multiline
          />
        )}
      />

      {/* Steps */}
      <View style={styles.stepsContainer}>
        <Text style={styles.label}>Steps</Text>
        <TouchableOpacity onPress={() => append({ step: '' })}>
          <PlusCircle size={28} color="#4F46E5" />
        </TouchableOpacity>
      </View>

      {fields.map((field, index) => (
        <View key={field.id} style={styles.stepContainer}>
          <Controller
            control={control}
            name={`steps.${index}.step`}
            rules={{ required: 'Step is required' }}
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  style={[
                    styles.stepInput,
                    errors.steps?.[index]?.step && { borderColor: '#ef4444' },
                  ]}
                  placeholder={`Step ${index + 1}`}
                  value={value}
                  onChangeText={onChange}
                />
                {errors.steps?.[index]?.step && (
                  <Text style={{ color: '#ef4444', marginTop: 4, fontSize: 12 }}>
                    {errors.steps[index].step?.message}
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


      {/* Paid Option */}
      <View style={styles.paidContainer}>
        <Text style={styles.label}>Paid Meditation</Text>
        <Controller
          control={control}
          name="isPaid"
          render={({ field: { onChange, value } }) => (
            <Switch
              value={value}
              onValueChange={onChange}
              trackColor={{ false: '#767577', true: '#4F46E5' }}
              thumbColor={value ? '#fff' : '#f4f3f4'}
            />
          )}
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={[styles.submitButton, (!isValid || isLoading) && { opacity: 0.5 }]}
        disabled={!isValid || isLoading}
      >
        <Text style={styles.submitText}>
          {isLoading ? 'Submitting...' : editingMeditation ? 'Update Meditation' : 'Save Meditation'}
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4F46E5',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  textArea: {
    height: 128,
    textAlignVertical: 'top',
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
  paidContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
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
});

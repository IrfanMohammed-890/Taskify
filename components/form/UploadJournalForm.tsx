import { View, Text, TextInput, TouchableOpacity, ScrollView, Switch, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { createJournals, updateJournals } from '@/service/journal';


type FormData = {
  name: string;
  description: string;
  isPaid?: boolean;
  link: string;
};


export default function CreateJournalForm({
  setIsModalVisible,
  reloadJournal,
  editingJournal,
}: {
  setIsModalVisible: (visible: boolean) => void;
  reloadJournal: () => void;
  editingJournal: any | null;
}) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      description: '',
      isPaid: false,
      link: ''
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);

      editingJournal ? await updateJournals(editingJournal.id, data) : await createJournals(data);
      setIsModalVisible(false);
      reset();
      Toast.show({
        type: 'success',
        text1: editingJournal ? 'Journal updated' : 'Journal saved',
      });
      reloadJournal();
    } catch (error: any) {
      console.error("Error:", error.message);
      Toast.show({
        type: 'error',
        text1: 'Error Saving Relax sound',
        text2: error.message || 'Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (editingJournal) {
      reset({
        name: editingJournal.name || '',
        description: editingJournal.description || '',
        isPaid: editingJournal.isPaid ?? false,
        link: editingJournal.link || ''
      });
    }
  }, [editingJournal, reset]);




  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {/* Meditation Name */}
      <Text style={styles.label}>Journal title</Text>
      <Controller
        control={control}
        name="name"
        rules={{ required: 'Journal name is required' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} p-3 pr-12 rounded-xl bg-gray-50 text-gray-800`}
            placeholder="Enter journal name"
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
            placeholder="Enter journal description"
            value={value}
            onChangeText={onChange}
            multiline
          />
        )}
      />


      <Text style={styles.label}>Pdf Link</Text>
      <Controller
        control={control}
        name="link"
        rules={{ required: 'Link is required' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            className={`w-full border ${errors.link ? 'border-red-500' : 'border-gray-300'} p-3 pr-12 rounded-xl bg-gray-50 text-gray-800`}
            placeholder="Enter pdf link"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      {/* Paid Option */}
      <View style={styles.paidContainer}>
        <Text style={styles.label}>Paid Journal</Text>
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
          {isLoading ? 'Submitting...' : editingJournal ? 'Update Journal' : 'Save Journal'}
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

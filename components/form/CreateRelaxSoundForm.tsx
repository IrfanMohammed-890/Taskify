import { View, Text, TextInput, TouchableOpacity, ScrollView, Switch, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { createRelaxSound, updateRelaxSound } from '@/service/relax-sound';


type FormData = {
  name: string;
  description: string;
  isPaid?: boolean;
  link: string;
};


export default function CreateRelaxSoundForm({
  setIsModalVisible,
  reloadRelaxSounds,
  editingRelaxSound,
}: {
  setIsModalVisible: (visible: boolean) => void;
  reloadRelaxSounds: () => void;
  editingRelaxSound: any | null;
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

      editingRelaxSound ? await updateRelaxSound(editingRelaxSound.id, data) : await createRelaxSound(data);
      setIsModalVisible(false);
      reset();
      Toast.show({
        type: 'success',
        text1: editingRelaxSound ? 'Relax sound updated' : 'Relax sound saved',
      });
      reloadRelaxSounds();
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
    if (editingRelaxSound) {
      reset({
        name: editingRelaxSound.name || '',
        description: editingRelaxSound.description || '',
        isPaid: editingRelaxSound.isPaid ?? false,
        link: editingRelaxSound.link || ''
      });
    }
  }, [editingRelaxSound, reset]);




  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {/* Meditation Name */}
      <Text style={styles.label}>Sound Name</Text>
      <Controller
        control={control}
        name="name"
        rules={{ required: 'Sound name is required' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} p-3 pr-12 rounded-xl bg-gray-50 text-gray-800`}
            placeholder="Enter sound name"
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
            placeholder="Enter sound description"
            value={value}
            onChangeText={onChange}
            multiline
          />
        )}
      />


      <Text style={styles.label}>Youtube Link</Text>
      <Controller
        control={control}
        name="link"
        rules={{ required: 'Link is required' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            className={`w-full border ${errors.link ? 'border-red-500' : 'border-gray-300'} p-3 pr-12 rounded-xl bg-gray-50 text-gray-800`}
            placeholder="Enter youtube link"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      {/* Paid Option */}
      <View style={styles.paidContainer}>
        <Text style={styles.label}>Paid Sound</Text>
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
          {isLoading ? 'Submitting...' : editingRelaxSound ? 'Update sound' : 'Save sound'}
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

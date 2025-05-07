import { Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import { createMeditationLocation, updateMeditationLocation } from '@/service/meditation-location';
import { useEffect, useState } from 'react';

type FormData = {
  title: string;
  latitude: string;
  longitude: string;
};


export default function CreateMeditationLocationForm({
  setIsModalVisible,
  reloadMeditations,
  editingLocation,
}: {
  setIsModalVisible: (visible: boolean) => void;
  reloadMeditations: () => void;
  editingLocation: any | null;
}) {
  const { control, handleSubmit, reset, formState: { errors, isValid } } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      latitude: '',
      longitude: '',
    },
  });

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      editingLocation ? await updateMeditationLocation(editingLocation.id, data) : await createMeditationLocation(data);
      reset();
      setIsModalVisible(false);
      reloadMeditations();
      Toast.show({
        type: 'success',
        text1: editingLocation ? 'Mediation location updated' : 'Meditation location saved',
      });
      setIsLoading(false)
    } catch (error: any) {
      setIsLoading(false);
      console.error("Error:", error.message);
      Toast.show({
        type: 'error',
        text1: 'Error Saving Location',
        text2: error.message || 'Please try again.',
      });
    }
  };

  useEffect(() => {
    if (editingLocation) {
      reset({
        title: editingLocation.location_name,
        latitude: editingLocation.lat.toString(),
        longitude: editingLocation.long.toString(),
      });
    }
  }, [editingLocation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Create Meditation Place</Text>

      {/* Title */}
      <Controller
        control={control}
        name="title"
        rules={{ required: 'Title is required' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter title"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.title && <Text style={styles.errorText}>{errors.title.message}</Text>}

      {/* Latitude */}
      <Controller
        control={control}
        name="latitude"
        rules={{
          required: 'Latitude is required',
          pattern: {
            value: /^-?\d+(\.\d+)?$/,
            message: 'Latitude must be a number',
          },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter latitude"
            keyboardType="numeric"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.latitude && <Text style={styles.errorText}>{errors.latitude.message}</Text>}

      {/* Longitude */}
      <Controller
        control={control}
        name="longitude"
        rules={{
          required: 'Longitude is required',
          pattern: {
            value: /^-?\d+(\.\d+)?$/,
            message: 'Longitude must be a number',
          },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter longitude"
            keyboardType="numeric"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.longitude && <Text style={styles.errorText}>{errors.longitude.message}</Text>}

      {/* Submit Button */}
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={[styles.submitButton, (!isValid || isLoading) && { opacity: 0.5 }]}
        disabled={!isValid || isLoading}
      >
        <Text style={styles.submitText}>
          {isLoading ? 'Submitting...' : editingLocation ? 'Update Location' : 'Save Location'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 24,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginBottom: 8,
  },
  submitButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  // submitButtonText: {
  //   color: 'white',
  //   fontSize: 16,
  //   fontWeight: '600',
  // },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

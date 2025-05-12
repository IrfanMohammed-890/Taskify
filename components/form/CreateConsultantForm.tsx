import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { createConsultant, updateConsultant } from '@/service/consultant';

type FormData = {
  name: string;
  education: string;
  contact: string;
  email: string;
  days: { day: string; }[];
};

const allDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CreateConsultantForm({
  setIsModalVisible,
  reloadConsultants,
  editingConsultant,
}: {
  setIsModalVisible: (visible: boolean) => void;
  reloadConsultants: () => void;
  editingConsultant: any | null;
}) {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      education: '',
      contact: '',
      email: '',
      days: [],
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const selectedDays = watch('days');

  const isDaySelected = (day: string) =>
    selectedDays.some((d) => d.day === day);

  const toggleDay = (day: string) => {
    const updated = isDaySelected(day)
      ? selectedDays.filter((d) => d.day !== day)
      : [...selectedDays, { day }];
    setValue('days', updated, { shouldValidate: true });
  };

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);

      editingConsultant ? await updateConsultant(editingConsultant.id, data) : await createConsultant(data);
      setIsModalVisible(false);
      reset();
      Toast.show({
        type: 'success',
        text1: editingConsultant ? 'Consultant updated' : 'Consultant saved',
      });
      reloadConsultants();
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
    if (editingConsultant) {
      reset({
        name: editingConsultant.name || '',
        education: editingConsultant.education || '',
        contact: editingConsultant.contact || '',
        email: editingConsultant.email || '',
        days: Array.isArray(editingConsultant.days) && editingConsultant.days.length > 0
          ? editingConsultant.days.map((day: string) => ({ day }))
          : [{ day: '' }],
      });
    }
  }, [editingConsultant, reset]);


  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {/* Name */}
      <Text style={styles.label}>Name</Text>
      <Controller
        control={control}
        name="name"
        rules={{ required: 'Name is required' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.name && { borderColor: '#ef4444' }]}
            placeholder="Enter name"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      {/* Education */}
      <Text style={styles.label}>Education</Text>
      <Controller
        control={control}
        name="education"
        rules={{ required: 'Education is required' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.education && { borderColor: '#ef4444' }]}
            placeholder="Enter education"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      {/* Contact */}
      <Text style={styles.label}>Contact</Text>
      <Controller
        control={control}
        name="contact"
        rules={{
          required: 'Contact is required',
          minLength: {
            value: 4,
            message: 'Contact must be at least 4 digits',
          },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.contact && { borderColor: '#ef4444' }]}
            placeholder="Enter contact"
            value={value}
            onChangeText={onChange}
            keyboardType="phone-pad"
          />
        )}
      />

      {/* Email */}
      <Text style={styles.label}>Email</Text>
      <Controller
        control={control}
        name="email"
        rules={{
          required: 'Email is required',
          pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.email && { borderColor: '#ef4444' }]}
            placeholder="Enter email"
            value={value}
            onChangeText={onChange}
            keyboardType="email-address"
          />
        )}
      />

      {/* Days */}
      <Text style={styles.label}>Available Days</Text>
      <View style={styles.daysContainer}>
        {allDays.map((day) => {
          const selected = isDaySelected(day);
          return (
            <TouchableOpacity
              key={day}
              onPress={() => toggleDay(day)}
              style={[
                styles.dayButton,
                selected ? styles.daySelected : styles.dayUnselected,
              ]}
            >
              <Text
                style={selected ? styles.dayTextSelected : styles.dayTextUnselected}
              >
                {day}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Submit */}
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={[styles.submitButton, (!isValid) && { opacity: 0.5 }]}
        disabled={!isValid || isLoading}
      >
        <Text style={styles.submitText}>
          {isLoading ? 'Submitting' : editingConsultant ? 'Update Consultant' : 'Save Consultant'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4F46E5',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  dayButton: {
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginRight: 8,
    marginBottom: 8,
  },
  daySelected: {
    backgroundColor: '#3B82F6',
  },
  dayUnselected: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#3B82F6',
  },
  dayTextSelected: {
    color: 'white',
    fontWeight: '600',
  },
  dayTextUnselected: {
    color: '#1F2937',
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 16,
    paddingVertical: 12,
    marginTop: 20,
    alignItems: 'center',
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

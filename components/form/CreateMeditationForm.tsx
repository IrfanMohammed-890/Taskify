import { View, Text, TextInput, TouchableOpacity, ScrollView, Switch, StyleSheet } from 'react-native';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { PlusCircle, Trash2 } from 'lucide-react-native'; // You can use any icons you like

export default function CreateMeditationForm() {
  const { control, handleSubmit } = useForm({
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

  const onSubmit = (data: any) => {
    console.log('Meditation Data:', data);
  };

  return (
    <ScrollView>
      {/* Meditation Name */}
      <Text style={styles.label}>Meditation Name</Text>
      <Controller
        control={control}
        name="meditationName"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
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
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, styles.textArea]}
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
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.stepInput}
                placeholder={`Step ${index + 1}`}
                value={value}
                onChangeText={onChange}
              />
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
        style={styles.submitButton}
      >
        <Text style={styles.submitText}>Save Meditation</Text>
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

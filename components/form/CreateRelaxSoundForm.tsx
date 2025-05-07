import { View, Text, TextInput, TouchableOpacity, ScrollView, Switch, StyleSheet } from 'react-native';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { PlusCircle, Trash2 } from 'lucide-react-native'; // You can use any icons you like

export default function CreateRelaxSoundForm() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      soundName: '',
      description: '',
      file: '',
      isPaid: false,
    },
  });


  const onSubmit = (data: any) => {
    console.log('Sound Data:', data);
  };

  return (
    <ScrollView>
      <Text style={styles.label}>Sound Name</Text>
      <Controller
        control={control}
        name="soundName"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
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

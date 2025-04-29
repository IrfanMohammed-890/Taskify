import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as DocumentPicker from 'expo-document-picker';

export default function UploadJournalForm() {
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      title: '',
      description: '',
      pdf: null,
    },
  });

  const selectedPdf: any = watch('pdf');

  const handlePickPdf = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
      copyToCacheDirectory: true,
    });

    // if (result.type  === 'success') {
    //   setValue('pdf', result);
    // }
  };

  const onSubmit = (data: any) => {
    console.log('Form Data:', data);
    // You can send this data to your backend
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.heading}>Upload Journal</Text> */}

      {/* Title Input */}
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Title"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      {/* Description TextArea */}
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, { height: 120, textAlignVertical: 'top' }]}
            placeholder="Description"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            multiline
            numberOfLines={6}
          />
        )}
      />

      {/* PDF Picker */}
      <TouchableOpacity style={styles.pdfButton} onPress={handlePickPdf}>
        <Text style={styles.pdfButtonText}>
          {selectedPdf ? selectedPdf.name : 'Select PDF'}
        </Text>
      </TouchableOpacity>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
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
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  pdfButton: {
    backgroundColor: '#E0E7FF',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  pdfButtonText: {
    color: '#4F46E5',
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

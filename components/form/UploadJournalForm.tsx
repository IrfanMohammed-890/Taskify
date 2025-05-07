import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Platform } from 'react-native';

export default function UploadJournalForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<any>(null); // Store only one PDF file

  // Fallback function using alternative document picker approach
  const handleSelectPdfAlternative = async () => {
    try {
      // For iOS, sometimes a different approach works better
      if (Platform.OS === 'ios') {
        // Try legacy method first
        const pickerResult: any = await DocumentPicker.getDocumentAsync({
          type: 'application/pdf',
        });

        console.log('iOS picker result:', JSON.stringify(pickerResult));

        if (pickerResult.type === 'success') {
          const fileObj = {
            name: pickerResult.name,
            uri: pickerResult.uri,
            size: pickerResult.size || 500000,
            type: 'application/pdf'
          };
          setFile(fileObj as any);
          Alert.alert('Success', 'PDF file selected successfully');
          return;
        }
      }


      const result = await DocumentPicker.getDocumentAsync();

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];

        // Validate file type for PDF
        const fileType = asset.mimeType || '';
        if (!fileType.includes('pdf')) {
          Alert.alert('Invalid File', 'Please select a PDF file');
          return;
        }

        const fileObject = {
          name: asset.name,
          uri: asset.uri,
          size: asset.size || 500000,
          type: 'application/pdf'
        };

        setFile(fileObject as any);
      } else {
        console.log('Alternative picking cancelled');
      }
    } catch (error) {
      console.error('Error in alternative picker:', error);
      Alert.alert('Error', 'Failed to select PDF file. Please try again.');
    }
  };

  const handleSelectPdf = async () => {
    try {
      // Using the newer API with getDocumentAsync options
      const result: any = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf'],
        copyToCacheDirectory: true,
        multiple: false
      });


      // Check for success based on canceled property or type property
      if (!result.canceled && result.assets && result.assets.length > 0) {
        // New API format returns assets array
        const selectedFile = result.assets[0];
        console.log('Selected PDF:', selectedFile);

        // Format the file object to match our expected structure
        const fileObject = {
          name: selectedFile.name,
          uri: selectedFile.uri,
          size: selectedFile.size || 500000, // Use actual size or default
          type: 'application/pdf',
        };

        setFile(fileObject as any);
      }
      else if (result.type === 'success') {
        // Old API format returns direct object
        console.log('Selected PDF (old API):', result);

        // If size isn't included, add a default
        if (!result.size) {
          result.size = result.uri.includes('file://') ? 500000 : 1000000;
        }

        setFile(result);
      }
      else {
        console.log('Document picking cancelled');
      }
    } catch (error: any) {
      console.error('Error picking document:', error);
      Alert.alert('Error', 'Failed to select PDF file: ' + error.message);
    }
  };

  const handleDeletePdf = () => {
    setFile(null);
  };

  const handleSubmit = () => {
    // Validate inputs
    if (!title.trim()) {
      Alert.alert('Required', 'Please enter a journal title');
      return;
    }

    if (!file) {
      Alert.alert('Required', 'Please upload a PDF file');
      return;
    }

    const journal = {
      title,
      description,
      file: file ? { name: file.name, uri: file.uri } : null,
    };

    console.log('Created journal:', journal);
    // You can send this journal object to your backend

    // Reset form after successful submission (optional)
    // setTitle('');
    // setDescription('');
    // setFile(null);

    Alert.alert('Success', 'Journal created successfully');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Create Journal</Text>

      {/* Journal title */}
      <TextInput
        style={styles.input}
        placeholder="Enter journal title"
        value={title}
        onChangeText={setTitle}
      />

      {/* Journal description */}
      <TextInput
        style={[styles.input, { height: 120, textAlignVertical: 'top' }]}
        placeholder="Enter journal description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {/* PDF Upload Section */}
      <View style={styles.uploadSection}>
        <Text style={styles.sectionTitle}>PDF Upload</Text>
        <Text style={styles.sectionSubtitle}>Upload a single PDF file</Text>

        {!file ? (
          <TouchableOpacity style={styles.uploadButton} onPress={() => {
            // Try both methods - the primary and fallback
            handleSelectPdf().catch(error => {
              console.error('Primary method failed:', error);
              handleSelectPdfAlternative().catch(e =>
                console.error('Both document picker methods failed:', e)
              );
            });
          }}>
            <View style={styles.uploadContent}>
              <View style={styles.uploadIconContainer}>
                <Text style={styles.uploadIcon}>+</Text>
              </View>
              <Text style={styles.uploadButtonText}>Select PDF</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.fileContainer}>
            <View style={styles.fileItem}>
              <View style={styles.fileIconContainer}>
                <Text style={styles.fileIcon}>PDF</Text>
              </View>
              <View style={styles.fileDetailsContainer}>
                <Text style={styles.fileName} numberOfLines={1} ellipsizeMode="middle">
                  {file.name}
                </Text>
                <Text style={styles.fileSize}>
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </Text>
                </View>
                <TouchableOpacity onPress={handleDeletePdf} style={styles.deleteButton}>
                  <Text style={styles.deleteButtonText}>✕</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.replaceButton} onPress={() => {
              // Try both methods for replacing too
              handleSelectPdf().catch(error => {
                console.error('Primary replace method failed:', error);
                handleSelectPdfAlternative().catch(e =>
                  console.error('Both document picker methods failed for replace:', e)
                );
              });
            }}>
              <Text style={styles.replaceButtonText}>Replace PDF</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.submitButton, (!title.trim() || !file) ? styles.submitButtonDisabled : null]}
        onPress={handleSubmit}
        disabled={!title.trim() || !file}
      >
        <Text style={styles.submitButtonText}>Create Journal</Text>
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
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  uploadSection: {
    marginTop: 8,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  uploadButton: {
    backgroundColor: '#E0E7FF',
    borderWidth: 1,
    borderColor: '#C7D2FE',
    borderRadius: 12,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
  },
  uploadContent: {
    alignItems: 'center',
  },
  uploadIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#C7D2FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  uploadIcon: {
    fontSize: 24,
    color: '#4F46E5',
    fontWeight: 'bold',
  },
  uploadButtonText: {
    color: '#4F46E5',
    fontSize: 16,
    fontWeight: '600',
  },
  fileContainer: {
    marginBottom: 8,
  },
  fileItem: {
    backgroundColor: '#E0E7FF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 6,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  fileIcon: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  fileDetailsContainer: {
    flex: 1,
  },
  fileName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 2,
  },
  fileSize: {
    fontSize: 12,
    color: '#6B7280',
  },
  deleteButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#C7D2FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: '#4338CA',
    fontSize: 12,
    fontWeight: 'bold',
  },
  replaceButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#EEF2FF',
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 4,
  },
  replaceButtonText: {
    color: '#4F46E5',
    fontSize: 14,
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#6366F1',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonDisabled: {
    backgroundColor: '#A5B4FC',
    opacity: 0.7,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
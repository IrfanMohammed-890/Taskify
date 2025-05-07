import { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import RelaxSoundList from '@/components/RelaxSoundList';
import CreateRelaxSoundForm from '@/components/form/CreateRelaxSoundForm';

export default function RelaxSoundScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleUpdateMeditation = () => {
    // Update logic here
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 40 }}>
      <StatusBar backgroundColor={'dark'} />
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Manage Sounds</Text>

        {/* Create Pricing Plan Button */}
        <TouchableOpacity style={styles.button} onPress={handleOpenModal}>
          <Text style={styles.buttonText} className=''>Create relax sound</Text>
        </TouchableOpacity>

        <RelaxSoundList />
      </ScrollView>

      {/* Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <CreateRelaxSoundForm />
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 90,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3730a3",
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#4F46E5',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: '90%',
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: '#EF4444',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});

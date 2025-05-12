import { useUserAuth } from '@/context/UserAuthContext';
import React, { useEffect, useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const AIMessageDisplay = () => {
  const { aiMessage } = useUserAuth(); // Access aiMessage from context
  const [visible, setVisible] = useState(false);

  // Show modal when aiMessage is not empty
  useEffect(() => {
    if (aiMessage) {
      setVisible(true); // Show the modal when there's a message
    }
  }, [aiMessage]);

  // Close the modal
  const closeModal = () => {
    setVisible(false);
  };

  return (
    <Modal
      animationType="slide" // You can choose other animations like fade, slide, etc.
      transparent={true}
      visible={visible}
      onRequestClose={closeModal} // Close on hardware back button or press escape
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeButtonText}>x</Text>
          </TouchableOpacity>
          <Text style={styles.modalText}>{aiMessage}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%', // Adjust modal width as needed
    position: 'relative', // Make sure the close button can be positioned absolutely
  },
  modalText: {
    fontSize: 16,
    color: '#333', // Text color for the message
    marginBottom: 20,
    textAlign: 'center', // Center align the message text
  },
  closeButton: {
    position: 'absolute',
    top: -10,
    right: 0,
    backgroundColor: 'red',
    width: 30,
    height: 30,
    borderRadius: 15, // Circular button
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AIMessageDisplay;

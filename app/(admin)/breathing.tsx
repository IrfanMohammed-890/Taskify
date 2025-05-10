import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import CreateBreathingForm from '@/components/form/CreateBreathingForm';
import BreathingList from '@/components/BreathingList';
import { fetchBreathingList } from '@/service/breathing';
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';

export default function BreathingScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [breathings, setBreathings] = useState([]);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [editingBreathing, setEditingBreathing] = useState<any | null>(null);

  const PAGE_SIZE = 10;

  const loadBreathings = async (reset = false) => {
    try {
      setLoading(true);
      const response = await fetchBreathingList(
        PAGE_SIZE,
        reset ? null : lastDoc,
        searchText.trim()
      );

      if (reset) {
        setBreathings(response.data as any);
      } else {
        setBreathings(prev => [...prev, ...response.data] as any);
      }

      setLastDoc(response.lastDoc);
      setHasMore(response.data.length === PAGE_SIZE);
    } catch (error) {
      console.error("Error loading locations", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLastDoc(null);
    setHasMore(true);
    loadBreathings(true);
  }, [searchText]);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setEditingBreathing(null);
  };

  useEffect(() => {
    if (!isModalVisible) {
      handleCloseModal();
    }
  }, [isModalVisible])

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 40, padding: 10 }}>
      <StatusBar backgroundColor={'dark'} />

        <Text style={styles.title}>Manage Breathing</Text>

        {/* Create Pricing Plan Button */}
        <TouchableOpacity style={styles.button} onPress={handleOpenModal}>
          <Text style={styles.buttonText} className=''>Create Breathing</Text>
        </TouchableOpacity>

        <BreathingList
          breathings={breathings}
          setSearchText={setSearchText}
          searchText={searchText}
          loadBreathings={loadBreathings}
          loading={loading}
          hasMore={hasMore}
          onEdit={(breathing) => {
            setEditingBreathing(breathing);
            setIsModalVisible(true);
          }}
      />

      {/* Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <CreateBreathingForm
              setIsModalVisible={setIsModalVisible}
              reloadBreathings={() => loadBreathings(true)}
              editingBreathing={editingBreathing}
            />
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
              <Text style={styles.closeButtonText}>x</Text>
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
    position: 'absolute',
    top: -10,
    right: -10,
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});

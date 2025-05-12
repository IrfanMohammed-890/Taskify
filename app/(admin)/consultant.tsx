import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal
} from 'react-native';
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import ConsultantList from '@/components/ConsultantList';
import CreateConsultantForm from '@/components/form/CreateConsultantForm';
import { fetchConsultantList } from '@/service/consultant';
export interface Meditation {
  id: string;
  title: string;
  description: string;
  steps: string[];
}

export default function ConsultantScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [consultants, setConsultants] = useState([]);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [editingConsultant, setEditingConsultant] = useState<any | null>(null);

  const PAGE_SIZE = 10;

  const loadConsultants = async (reset = false) => {
    try {
      setLoading(true);
      const response = await fetchConsultantList(
        PAGE_SIZE,
        reset ? null : lastDoc,
        searchText.trim()
      );

      if (reset) {
        setConsultants(response.data as any);
      } else {
        setConsultants(prev => [...prev, ...response.data] as any);
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
    loadConsultants(true);
  }, [searchText]);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setEditingConsultant(null);
  };

  useEffect(() => {
    if (!isModalVisible) {
      handleCloseModal();
    }
  }, [isModalVisible]);

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 40, padding: 10 }}>
      <StatusBar backgroundColor={'dark'} />
      <Text style={styles.title}>Manage Consultants</Text>

      <TouchableOpacity style={styles.button} onPress={handleOpenModal}>
        <Text style={styles.buttonText}>Create consultant</Text>
      </TouchableOpacity>

      <ConsultantList
        consultants={consultants}
        setSearchText={setSearchText}
        searchText={searchText}
        loadConsultant={loadConsultants}
        loading={loading}
        hasMore={hasMore}
        onEdit={(meditation) => {
          setEditingConsultant(meditation);
          setIsModalVisible(true);
        }}
      />
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <CreateConsultantForm
              setIsModalVisible={setIsModalVisible}
              reloadConsultants={() => loadConsultants(true)}
              editingConsultant={editingConsultant}
            />
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
              <Text style={styles.closeButtonText}>x</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

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
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 10,
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

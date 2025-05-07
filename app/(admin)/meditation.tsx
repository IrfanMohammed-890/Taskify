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
import CreateMeditationForm from '@/components/form/CreateMeditationForm';
import MeditationList from '@/components/MeditationList';
import { fetchMeditationList } from '@/service/meditation'; // <-- you must implement this
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
export interface Meditation {
  id: string;
  title: string;
  description: string;
  steps: string[];
}

export default function MeditationScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [meditations, setMeditations] = useState([]);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [editingMeditation, setEditingMeditation] = useState<any | null>(null);

  const PAGE_SIZE = 10;

  const loadMeditations = async (reset = false) => {
    try {
      setLoading(true);
      const response = await fetchMeditationList(
        PAGE_SIZE,
        reset ? null : lastDoc,
        searchText.trim()
      );

      if (reset) {
        setMeditations(response.data as any);
      } else {
        setMeditations(prev => [...prev, ...response.data] as any);
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
    loadMeditations(true);
  }, [searchText]);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setEditingMeditation(null);
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 40 }}>
      <StatusBar backgroundColor={'dark'} />
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Manage Meditations</Text>

        <TouchableOpacity style={styles.button} onPress={handleOpenModal}>
          <Text style={styles.buttonText}>Create Meditation</Text>
        </TouchableOpacity>

        <MeditationList
          meditations={meditations}
          setSearchText={setSearchText}
          searchText={searchText}
          loadMeditations={loadMeditations}
          loading={loading}
          hasMore={hasMore}
          onEdit={(meditation) => {
            setEditingMeditation(meditation);
            setIsModalVisible(true);
          }}
        />
      </ScrollView>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <CreateMeditationForm
              setIsModalVisible={setIsModalVisible}
              reloadMeditations={() => loadMeditations(true)}
              editingMeditation={editingMeditation}
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

import { getJournalById } from '@/service/journal';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, ActivityIndicator, Text } from 'react-native';
import { WebView } from 'react-native-webview';

export default function SingleJournal() {
  const [journalData, setJournalData] = useState<any>(null);
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);

  const getJournal = async (id: string) => {
    setLoading(true);
    const data = await getJournalById(id);
    setJournalData(data);
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      getJournal(id as string);
    }
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text className="mt-4 text-gray-500">Loading journal...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {journalData && <WebView
        source={{ uri: `https://docs.google.com/gview?embedded=true&url=${journalData?.link}` }}
        style={styles.pdf}
        originWhitelist={['*']}
        startInLoadingState
      />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

import UserList from '@/components/UsersList';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

const UserScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, marginTop: 40 }}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Manage Users</Text>
        <UserList />
      </ScrollView>

    </SafeAreaView>
  );
};

export default UserScreen;

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
  }
});
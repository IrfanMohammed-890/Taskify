import { StyleSheet, View, Pressable, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <ThemedText type="title" style={styles.title}>
          👋 Welcome to Taskify
        </ThemedText>

        <ThemedText style={styles.subtitle}>
          Plan smart. Work hard. Conquer your day.
        </ThemedText>

        <View style={styles.divider} />

        <ThemedText style={styles.sectionTitle}>🚀 New to Taskify?</ThemedText>
        <ThemedText style={styles.sectionText}>
          Create an account to start managing your tasks with ease.
        </ThemedText>

        <Link href="/signup" asChild>
          <Pressable style={styles.button}>
            <ThemedText style={styles.buttonText}>Sign Up</ThemedText>
          </Pressable>
        </Link>

        <ThemedText style={styles.bottomLink}>
          Already registered? <Link href="/login" style={styles.linkText}>Login</Link>
        </ThemedText>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f6f8fa',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 28,
    width: '95%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 7,
    gap: 16,
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    color: '#333',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    color: '#777',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  sectionText: {
    fontSize: 14,
    color: '#555',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#2e86de',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  bottomLink: {
    marginTop: 16,
    textAlign: 'center',
    fontSize: 15,
    color: '#888',
  },
  linkText: {
    color: '#4f8cff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

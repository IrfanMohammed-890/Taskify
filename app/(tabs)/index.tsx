import { StyleSheet, View, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      
      {/* Greeting title */}
      <ThemedText type="title" style={styles.title}>
        Welcome to Taskify 🎯
      </ThemedText>

      {/* Quote or short description */}
      <ThemedText style={styles.subtitle}>
        Organize your day, boost your productivity 🚀
      </ThemedText>

      {/* Card container */}
      <View style={styles.card}>
        <ThemedText style={styles.cardTitle}>New here?</ThemedText>
        <ThemedText style={styles.cardText}>Create your free account to get started.</ThemedText>

        <Link href="/signup" asChild>
          <Pressable style={styles.button}>
            <ThemedText style={styles.buttonText}>Sign Up</ThemedText>
          </Pressable>
        </Link>
      </View>

      {/* Already registered */}
      <ThemedText style={styles.loginLink}>
        Already have an account? <Link href="/login">Login</Link>
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    justifyContent: 'center',
    gap: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
  },
  card: {
    backgroundColor: '#eee',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    gap: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  cardText: {
    fontSize: 14,
    opacity: 0.7,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#2e86de',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  loginLink: {
    textAlign: 'center',
    marginTop: 16,
  },
});


import React, { useState } from 'react';
import { TextInput, Button, ScrollView, StyleSheet, View, Alert, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { Link } from 'expo-router';
import { auth } from '@/firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace('/');
      Alert.alert('Login successful! but need to add dashboard screen next');
    } catch (error: any) {
      Alert.alert('Login Failed', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <ThemedText type="title" style={styles.title}>
          Log in
        </ThemedText>

        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Log in" color="#4f8cff" onPress={handleLogin} />
        </View>

        <ThemedText style={styles.signupText}>
          Don't have an account?
          <Link href="/signup" style={styles.signupLink}> Sign Up</Link>
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
  },
  title: {
    textAlign: 'center',
    marginBottom: 25,
    fontSize: 28,
    color: '#333',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  inputGroup: {
    gap: 14,
  },
  input: {
    backgroundColor: '#f2f6fc',
    padding: 14,
    borderRadius: 8,
    fontSize: 16,
    borderColor: '#dbeafe',
    borderWidth: 1,
    color: '#222',
  },
  buttonContainer: {
    marginTop: 22,
    marginBottom: 18,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#4f8cff',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 3,
  },
  signupText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 15,
  },
  signupLink: {
    color: '#4f8cff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginLeft: 4,
  },
});


import { ScrollView, StyleSheet, View, Button, TextInput, Platform } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import React, { useState } from 'react';
import { Link } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/firebaseConfig';

export default function SignupScreen() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    DateOfBirth: '',
    contact: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSignup = async () => {
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;
      console.log("Signup successfully!");
    } catch (error: any) {
      console.error("Signup error:", error.message);
      alert("Error creating account:" + error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <ThemedText type="title" style={styles.title}>
          Create Account
        </ThemedText>

        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor="#888"
            value={form.firstName}
            onChangeText={(text) => handleChange('firstName', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor="#888"
            value={form.lastName}
            onChangeText={(text) => handleChange('lastName', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={(text) => handleChange('email', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Date of Birth (DD/MM/YYYY)"
            placeholderTextColor="#888"
            value={form.DateOfBirth}
            onChangeText={(text) => handleChange('DateOfBirth', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Contact Number"
            placeholderTextColor="#888"
            keyboardType="phone-pad"
            value={form.contact}
            onChangeText={(text) => handleChange('contact', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry
            value={form.password}
            onChangeText={(text) => handleChange('password', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#888"
            secureTextEntry
            value={form.confirmPassword}
            onChangeText={(text) => handleChange('confirmPassword', text)}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Sign Up" color="#4f8cff" onPress={handleSignup} />
        </View>

        <ThemedText style={styles.loginText}>
          Already have an account?
          <Link href="/login" style={styles.loginLink}> Login </Link>
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
    paddingVertical: 40,
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
    marginBottom: 0,
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
  loginText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 15,
  },
  loginLink: {
    color: '#4f8cff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginLeft: 4,
  },
});

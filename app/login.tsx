import React, {useState} from 'react';
import {TextInput, Button, ScrollView, StyleSheet, View} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import {Link} from 'expo-router';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] =useState('');

    return (
        <ScrollView contentContainerStyle={StyleSheet.container}>
        <ThemedText type="title">Login</ThemedText>
        
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail} />
              
          <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword} />

          <View style={styles.button}>
           <Button title="Login" onPress={() =>{}} />
           </View>

           <ThemedText>
           Don't have an account?
           <Link href="/signup"> Sign Up</Link>
           </ThemedText>
        </ScrollView>
    );
} 


const styles = StyleSheet.create({
    container:{
        padding: 20,
        gap:10,
    },
    input:{
        backgroundColor: '#eee',
        padding:10,
        borderRadius: 6,
    },
    button: {
        marginVertical:10,
    },
});
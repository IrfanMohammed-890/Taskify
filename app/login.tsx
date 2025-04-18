//Login screen

import React, {useState} from 'react';
import {TextInput, Button, ScrollView, StyleSheet, View} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import {Link} from 'expo-router';

export default function LoginScreen() {
    // Email and password 
    const [email, setEmail] = useState('');
    const [password, setPassword] =useState('');

    return (
        <ScrollView contentContainerStyle={styles.container}>
        <ThemedText type="title">Log in</ThemedText>

        <View style={{margin:20}}></View> 
        <TextInput
          style={styles.input}
          placeholder="Email" // Email address 
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail} />
              
          <TextInput
          style={styles.input}
          placeholder="Password" //password
          secureTextEntry
          value={password}
          onChangeText={setPassword} />

          <View style={styles.button}>
           <Button title="Log in" onPress={() =>{}} /> 
           </View>

           <ThemedText>
           Don't have an account?
           <Link href="/signup"> Sign Up</Link>  {/*Link to signup screen*/}
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
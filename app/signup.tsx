import {ScrollView, StyleSheet, View, Button, TextInput} from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import React, {useState} from 'react';
import {Link} from 'expo-router';


    export default function SignupScreen() {
        const [form, setForm] = useState({
            firstName:'',
            lastName:'',
            email:'',
            DateOfBirth:'',
            contact:'',
            password:'',
            confirmPassword:'',
        });

     const handleChange = (field:string, value:string) => {
        setForm({...form,[field]:value});
     };

    return (
        <ScrollView contentContainerStyle={styles.container}>
        <ThemedText type="title">Create Account</ThemedText>

        <TextInput
        style={styles.input}
         placeholder="First Name"
         value={form.firstName}
         onChangeText={(text)=>handleChange('firstName', text)} />
         
        <TextInput
         style={styles.input}
         placeholder="Last Name"
         value={form.lastName}
         onChangeText={(text)=>handleChange('lastName', text)} />

        <TextInput
        style={styles.input}
         placeholder="Email"
         keyboardType="email-address"
         value={form.email}
         onChangeText={(text)=>handleChange('email', text)} />

        <TextInput
        style={styles.input}
         placeholder="Date of Birth(DD/MM/YYYY)"
         value={form.DateOfBirth}
         onChangeText={(text)=>handleChange('DateofBirth', text)} />

        <TextInput
        style={styles.input}
         placeholder="Contact Number"
         keyboardType="phone-pad"
         value={form.contact}
         onChangeText={(text)=>handleChange('contact', text)} />

        <TextInput
        style={styles.input}
         placeholder="Password"
         secureTextEntry
         value={form.password}
         onChangeText={(text)=>handleChange('password', text)} />

        <TextInput
        style={styles.input}
         placeholder="Confirm Password"
         secureTextEntry
         value={form.confirmPassword}
         onChangeText={(text)=>handleChange('confirmPassword', text)} />
      
        <View style={styles.button}>
            <Button title="Sign Up" onPress={() =>{}}/>
        </View>
  
        <ThemedText>
            Already have an account? <Link href="/login"> Login </Link>
        </ThemedText>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        padding:20,
        gap:10,
    },
    input:{
        backgroundColor:"#eee",
        padding:10,
        borderRadius:6,
    },
    button:{
        marginVertical:10,
    },
});
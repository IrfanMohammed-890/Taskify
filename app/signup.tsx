//Sigup screen for new user registration
import {ScrollView, StyleSheet, View, Button, TextInput} from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import React, {useState} from 'react';
import {Link} from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from '@/firebase/firebaseConfig';

    export default function SignupScreen() {
        //This part handle the input values 
        const [form, setForm] = useState({
            firstName:'',
            lastName:'',
            email:'',
            DateOfBirth:'',
            contact:'',
            password:'',
            confirmPassword:'',
        });
        //update individual inputs
     const handleChange = (field:string, value:string) => {
        setForm({...form,[field]:value});
     };
     // adding the signup function 
     const handleSignup = async () => {
        if (form.password!==form.confirmPassword){
            alert("Passwords do not match");
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
            const user = userCredential.user;
            console.log("Signup successfully!");
        } catch(error:any){
            console.error("Signup error:", error.message);
            alert("Error creating account:" +error.message);
        }
     };

    return (
        <ScrollView contentContainerStyle={styles.container}>
        <ThemedText type="title">Create Account</ThemedText> 
        <View style={{margin:15}}></View>
        {/*All inputs*/}

        <TextInput
        style={styles.input}
         placeholder="First Name" //customer can type first name
         value={form.firstName}
         onChangeText={(text)=>handleChange('firstName', text)} />
         
        <TextInput
         style={styles.input}
         placeholder="Last Name" //customer can type last name 
         value={form.lastName}
         onChangeText={(text)=>handleChange('lastName', text)} />

        <TextInput
        style={styles.input}
         placeholder="Email"
         keyboardType="email-address" //email address
         value={form.email}
         onChangeText={(text)=>handleChange('email', text)} />

        <TextInput
        style={styles.input}
         placeholder="Date of Birth(DD/MM/YYYY)" //  date of birth
         value={form.DateOfBirth}
         onChangeText={(text)=>handleChange('DateofBirth', text)} />

        <TextInput
        style={styles.input}
         placeholder="Contact Number" //contact or phone number
         keyboardType="phone-pad"
         value={form.contact}
         onChangeText={(text)=>handleChange('contact', text)} />

        <TextInput
        style={styles.input}
         placeholder="Password" //unique password
         secureTextEntry
         value={form.password}
         onChangeText={(text)=>handleChange('password', text)} />

        <TextInput
        style={styles.input}
         placeholder="Confirm Password"  //retype the password to confirm
         secureTextEntry
         value={form.confirmPassword}
         onChangeText={(text)=>handleChange('confirmPassword', text)} />
      
        <View style={styles.button}>
            <Button title="Sign Up" onPress={handleSignup}/> 
        </View>
  
        <ThemedText>
            Already have an account? <Link href="/login"> Login </Link>  {/* Link to login page*/}
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
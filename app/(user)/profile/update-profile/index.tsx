import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';

type FormData = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

const UpdateProfileScreen = () => {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '1234567890',
    },
  });

  const email = 'john@example.com'; // read-only field

  const onSubmit = (data: FormData) => {
    console.log('Updated profile:', { ...data, email });
    Alert.alert('Success', 'Profile updated successfully!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Update Profile</Text>
      </View>


      <Controller
        control={control}
        name="firstName"
        rules={{ required: 'First name is required' }}
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              placeholder="First Name"
            />
            {errors.firstName && (
              <Text style={styles.errorText}>{errors.firstName.message}</Text>
            )}
          </>
        )}
      />

      <Controller
        control={control}
        name="lastName"
        rules={{ required: 'Last name is required' }}
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              placeholder="Last Name"
            />
            {errors.lastName && (
              <Text style={styles.errorText}>{errors.lastName.message}</Text>
            )}
          </>
        )}
      />

      <TextInput
        style={[styles.input, { backgroundColor: '#e5e7eb' }]}
        value={email}
        editable={false}
        placeholder="Email"
      />

      <Controller
        control={control}
        name="phoneNumber"
        rules={{
          required: 'Phone number is required',
          pattern: {
            value: /^[0-9]{10}$/,
            message: 'Phone number must be 10 digits',
          },
        }}
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              placeholder="Phone Number"
              keyboardType="phone-pad"
            />
            {errors.phoneNumber && (
              <Text style={styles.errorText}>{errors.phoneNumber.message}</Text>
            )}
          </>
        )}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UpdateProfileScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    marginTop: 20,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
    fontSize: 12,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

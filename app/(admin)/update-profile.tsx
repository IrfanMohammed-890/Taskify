import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useUserAuth } from '@/context/UserAuthContext';
import { updateUser } from '@/service/user';
import Toast from 'react-native-toast-message';
import { getUserDataFromFirestore } from '@/service/authService';

type FormData = {
  firstName: string;
  lastName: string;
  contactNumber: string;
};

const UpdateProfileScreen = () => {

  const { user, loginData, setUser } = useUserAuth();
  const navigation = useNavigation();
  const { control, handleSubmit, formState: { errors, isValid }, reset } = useForm<FormData>();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (formData: FormData) => {
    try {
      if (!loginData?.uid) throw new Error('User ID missing');
      setIsLoading(true);
      await updateUser(loginData.uid, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        contactNumber: formData.contactNumber,
      });
      const userData = await getUserDataFromFirestore(loginData.uid);
      setUser(userData);
      Toast.show({
        type: 'success',
        text2: `Profile updated successfully!`,
      });
      navigation.goBack();
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Error updating profile',
        text2: 'Something went wrong.',
      });
    }
  };


  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        contactNumber: user.contactNumber || '',
      });
    }
  }, [user, reset]);


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
        value={user?.email}
        editable={false}
        readOnly
        placeholder="Email"
      />

      <Controller
        control={control}
        name="contactNumber"
        rules={{
          required: 'Phone number is required',
          minLength: {
            value: 6,
            message: 'Provide valid number',
          },
          pattern: {
            value: /^\+?[0-9]+$/,
            message: 'Phone number must contain only digits and may start with +',
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
            {errors.contactNumber && (
              <Text style={styles.errorText}>{errors.contactNumber.message}</Text>
            )}
          </>
        )}
      />

      <TouchableOpacity
        disabled={isLoading || !isValid}
        style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>{isLoading ? 'Updating...' : 'Update Profile'}</Text>
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

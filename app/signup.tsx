import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Logo from '@/components/Logo';
import { checkUser, signUp } from '@/service/authService';
import Toast from 'react-native-toast-message';
import { createUser } from '@/service/user';
import { FirebaseError } from 'firebase/app';
import { sendEmailVerification, signOut } from 'firebase/auth';
import { auth } from '@/firebase';


type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  // dob: string;
  password: string;
  phoneNumber: string;
  confirmPassword: string;
};

export default function SignupScreen() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>();
  const [isLoading, setIsLoading] = useState(false)
  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      const userData = await checkUser(data.email);
      if (!userData) {
        await signUp(data.email, data.password).then(async (response) => {
          await createUser({
            uid: response.uid,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            contactNumber: data.phoneNumber,
          });
          Toast.show({
            type: 'success',
            text1: 'Signup Successful',
            text2: 'Welcome to safe space 👋',
          });

          await sendEmailVerification(response);
          await signOut(auth);
          Toast.show({
            type: 'success',
            text1: 'Please check your email and verify account.',
          });

          setIsLoading(false);
          router.push('/login');

        });
      } else {
        setIsLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Signup Error',
          text2: "Account already register with given email.",
        });
      }
    } catch (error: any) {
      setIsLoading(false);
      let message = 'Something went wrong.';

      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            message = 'This email is already registered.';
            break;
          case 'auth/invalid-email':
            message = 'Invalid email format.';
            break;
          case 'auth/weak-password':
            message = 'Password must be at least 6 characters.';
            break;
        }
      }

      Toast.show({
        type: 'error',
        text1: 'Signup Failed',
        text2: message,
      });
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-white pt-10"
    >
      <StatusBar style="dark" />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="mb-4">
          <Logo />
        </View>

        <View className="mb-5">
          <Text className="text-3xl font-bold text-gray-800">Create Account</Text>
          <Text className="text-base text-gray-500 mt-2">Sign up to get started</Text>
        </View>

        <View className="flex flex-col gap-4">
          <Controller
            control={control}
            name="firstName"
            rules={{
              required: 'First Name is required',
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="First Name"
                placeholderTextColor="#9ca3af"
                className={`w-full border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} p-3 rounded-xl bg-gray-50 text-gray-800`}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                autoCapitalize="none"
              />
            )}
          />
          <Controller
            control={control}
            name="lastName"
            rules={{
              required: 'Last Name is required',
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Last Name"
                placeholderTextColor="#9ca3af"
                className={`w-full border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} p-3 rounded-xl bg-gray-50 text-gray-800`}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                autoCapitalize="none"
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Enter a valid email address',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Email"
                placeholderTextColor="#9ca3af"
                keyboardType="email-address"
                className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} p-3 rounded-xl bg-gray-50 text-gray-800`}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                autoCapitalize="none"
              />
            )}
          />

          <Controller
            control={control}
            name="phoneNumber"
            rules={{
              required: 'Phone number is required',
              pattern: {
                value: /^[0-9]{10}$/, // Only allows exactly 10 digits
                message: 'Enter a valid 10-digit contact number',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Contact Number"
                placeholderTextColor="#9ca3af"
                keyboardType="phone-pad" // phone pad 
                className={`w-full border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} p-3 rounded-xl bg-gray-50 text-gray-800`}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
          />


          <Controller
            control={control}
            name="password"
            rules={{
              required: 'Password is required',
              pattern: {
                value: passwordRegex,
                message: 'Password must contain at least 8 characters, an uppercase letter, a lowercase letter, and a symbol.',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="relative">
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#9ca3af"
                  secureTextEntry={!showPassword}
                  className={`w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'} p-3 pr-12 rounded-xl bg-gray-50 text-gray-800`}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(prev => !prev)}
                  className="absolute right-3 top-3"
                >
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={22}
                    color="#3b82f6"
                  />
                </TouchableOpacity>
              </View>
            )}
          />
          {errors.password && (
            <Text className="text-red-500 mt-1 text-sm">{errors.password.message}</Text>
          )}

          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: 'Confirm password is required',
              validate: value =>
                value === watch('password') || 'Passwords do not match',
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="relative">
                <TextInput
                  placeholder="Confirm Password"
                  placeholderTextColor="#9ca3af"
                  secureTextEntry={!showConfirmPassword}
                  className={`w-full border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} p-3 pr-12 rounded-xl bg-gray-50 text-gray-800`}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(prev => !prev)}
                  className="absolute right-3 top-3"
                >
                  <Ionicons
                    name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={22}
                    color="#3b82f6"
                  />
                </TouchableOpacity>
              </View>
            )}
          />
          {errors.confirmPassword && (
            <Text className="text-red-500 mt-1 text-sm">{errors.confirmPassword.message}</Text>
          )}
        </View>

        {/* <TouchableOpacity
          className="bg-blue-600 mt-6 p-4 rounded-xl shadow-md active:opacity-80"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-white text-center font-semibold text-base">Sign Up</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={[styles.submitButton, (isLoading) && { opacity: 0.5 }]}
          disabled={isLoading}
        >
          <Text style={styles.submitText}>
            {isLoading ? 'Submitting...' : 'Sign Up'}
          </Text>
        </TouchableOpacity>

        <Pressable onPress={() => router.push('/login')} className="mt-4">
          <Text className="text-center text-blue-500 text-sm">
            Already have an account? <Text className="underline">Login</Text>
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: 'blue',
    borderRadius: 16,
    paddingVertical: 12,
    marginTop: 24,
    alignItems: 'center',
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
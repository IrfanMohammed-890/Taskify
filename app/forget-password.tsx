import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Pressable, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Controller, useForm } from 'react-hook-form';
import Logo from '@/components/Logo';
import { router } from 'expo-router';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/firebase';
import Toast from 'react-native-toast-message';
import { checkUser } from '@/service/authService';

export default function ForgetPasswordScreen() {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false); // Track loading state

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const userData = await checkUser(data.email);
      // Send the reset email
      if (userData) {
        await sendPasswordResetEmail(auth, data.email);
        Toast.show({
          type: 'success',
          text1: 'Password reset',
          text2: `Check your email to change password!`,
        });
        router.push('/login');
      } else {
        setLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Password reset',
          text2: "No account found with this email.",
        });
      }
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Password reset fail',
        text2: `Something went wrong try again`,
      });
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-white px-6 pt-10"
    >
      <StatusBar style="dark" />

      <View className="mb-4">
        <Logo />
      </View>

      <View className="mb-10">
        <Text className="text-3xl font-bold text-gray-800">Forget Password</Text>
        <Text className="text-base text-gray-500 mt-2">Reset your password with email</Text>
      </View>

      <View className="flex flex-col gap-6">
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
      </View>

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        disabled={loading} // Disable the button while loading
        className={`bg-blue-600 mt-6 p-4 rounded-xl shadow-md active:opacity-80 ${loading ? 'opacity-50' : ''}`}
      >
        <Text className="text-white text-center font-semibold text-base">{loading ? 'Sending...' : 'Forget password'}</Text>
      </TouchableOpacity>

      <Pressable onPress={() => router.replace('/login')} className="mt-4">
        <Text className="text-center text-blue-500 text-sm">
          Already have an account? <Text className="underline">Login</Text>
        </Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Controller, useForm } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import Logo from '@/components/Logo';

export default function ForgetPasswordScreen() {
  const router = useRouter();
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: any) => {
    console.log('Login Data:', data);
    router.push('/reset-password');
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
        className="bg-blue-600 mt-6 p-4 rounded-xl shadow-md active:opacity-80"
      >
        <Text className="text-white text-center font-semibold text-base">Forget password</Text>
      </TouchableOpacity>

      <Pressable onPress={() => router.push('/login')} className="mt-4">
        <Text className="text-center text-blue-500 text-sm">
          Already have an account? <Text className="underline">Login</Text>
        </Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

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
import { checkUser, login } from '@/service/authService';
import Toast from 'react-native-toast-message';

export default function AdminLoginScreen() {
  const router = useRouter();
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const userData = await checkUser(data.email);
    if (userData) {
      if (userData?.isAdmin) {
        await login(data.email, data.password);
        router.push('/(admin)');
      } else {
        setIsLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: "No account found with this email.",
        });
      }
    } else {
      setIsLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: "No account found with this email.",
      });
    }

  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-white px-6 pt-10 "
    >
      <StatusBar style="dark" />
      <Logo />

      <View className="my-10">
        <Text className="text-3xl font-bold text-gray-800">Welcome Back Admin</Text>
        <Text className="text-base text-gray-500 mt-2">Login to your account</Text>
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
        <Controller
          control={control}
          name="password"
          rules={{ required: 'Password is required' }}
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
      </View>
      <Pressable onPress={() => router.push('/forget-password')} className="mt-4">
        <Text className=" text-blue-500 text-sm text-right">
          Forget password?
        </Text>
      </Pressable>

      <TouchableOpacity
        disabled={isLoading}
        onPress={handleSubmit(onSubmit)}
        className={`bg-blue-600 mt-6 p-4 rounded-xl shadow-md ${isLoading ? "opacity-50" : 'active:opacity-80'}`}
      >
        <Text className="text-white text-center font-semibold text-base">{isLoading ? "Logging in" : "Login"}</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Logo from '@/components/Logo';


type FormData = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function ResetPasswordScreen() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log('Form Data:', data);
    // TODO: Firebase auth + Firestore
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


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
          <Text className="text-3xl font-bold text-gray-800">Reset password</Text>
        </View>

        <View className="flex flex-col gap-4">
          <Controller
            control={control}
            name="oldPassword"
            rules={{ required: 'Old Password is required' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="relative">
                <TextInput
                  placeholder="Old Password"
                  placeholderTextColor="#9ca3af"
                  secureTextEntry={!showOldPassword}
                  className={`w-full border ${errors.oldPassword ? 'border-red-500' : 'border-gray-300'} p-3 pr-12 rounded-xl bg-gray-50 text-gray-800`}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
                <TouchableOpacity
                  onPress={() => setShowOldPassword(prev => !prev)}
                  className="absolute right-3 top-3"
                >
                  <Ionicons
                    name={showOldPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={22}
                    color="#3b82f6"
                  />
                </TouchableOpacity>
              </View>
            )}
          />
          <Controller
            control={control}
            name="newPassword"
            rules={{ required: 'New Password is required' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="relative">
                <TextInput
                  placeholder="New Password"
                  placeholderTextColor="#9ca3af"
                  secureTextEntry={!showPassword}
                  className={`w-full border ${errors.newPassword ? 'border-red-500' : 'border-gray-300'} p-3 pr-12 rounded-xl bg-gray-50 text-gray-800`}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
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
          <Controller
            control={control}
            name="confirmPassword"
            rules={{ required: 'Confirm password is required' }}
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
        </View>

        <TouchableOpacity
          className="bg-blue-600 mt-6 p-4 rounded-xl shadow-md active:opacity-80"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-white text-center font-semibold text-base">Reset password</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from 'expo-router';
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
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';
import Toast from 'react-native-toast-message';
import { FirebaseError } from 'firebase/app';
import { useUserAuth } from '@/context/UserAuthContext';


type FormData = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function ChangePasswordScreen() {
  const navigation = useNavigation();
  const { logout } = useUserAuth();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const [isLoading, setIsLoading] = useState(false);


  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user || !user.email) {
      setIsLoading(false);

      Toast.show({ type: 'error', text1: 'No user is currently logged in.' });
      return;
    }

    if (data.newPassword !== data.confirmPassword) {
      setIsLoading(false);

      Toast.show({ type: 'error', text1: 'Passwords do not match.' });
      return;
    }

    const credential = EmailAuthProvider.credential(user.email, data.oldPassword);

    try {
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, data.newPassword);
      Toast.show({ type: 'success', text1: 'Password changed successfully.' });
      logout();
    } catch (error: any) {
      setIsLoading(false);
      let message = 'Failed to change password.';
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/user-not-found':
            message = 'No account found with this email.';
            break;
          case 'auth/invalid-credential':
            message = 'Wrong old password';
            break;
          case 'auth/wrong-password':
            message = 'Incorrect password.';
            break;
          case 'auth/invalid-email':
            message = 'Invalid email format.';
            break;
          case 'auth/too-many-requests':
            message = 'Too many attempts. Try again later.';
            break;
          case 'auth/weak-password':
            message = 'Password should be at least 6 characters.';
            break;
          default:
            message = message;
        }
      }
      Toast.show({ type: 'error', text1: message });
    }
  };



  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);

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
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View className="mb-5">
          <Text className="text-3xl font-bold text-gray-800">Change password</Text>
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
            rules={{
              required: 'New password is required',
              pattern: {
                value: passwordRegex,
                message: 'Password must contain at least 8 characters, an uppercase letter, a lowercase letter, and a symbol.',
              },
            }}
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
          {errors.newPassword && (
            <Text className="text-red-500 mt-1 text-sm">{errors.newPassword.message}</Text>
          )}
          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: 'Confirm password is required',
              validate: value =>
                value === watch('newPassword') || 'Passwords do not match',
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

        <TouchableOpacity
          className="bg-blue-600 mt-6 p-4 rounded-xl shadow-md active:opacity-80"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-white text-center font-semibold text-base">Change password</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

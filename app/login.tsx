import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
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
import { FirebaseError } from 'firebase/app';
import { useUserAuth } from '@/context/UserAuthContext';
import { LogOut } from 'lucide-react-native';

export default function LoginScreen() {
  const { user, setIsLoggedIn } = useUserAuth();
  const router = useRouter();
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  });
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const userData = await checkUser(data.email);
      if (userData) {
        if (!userData?.isAdmin) {
          const user = await login(data.email, data.password);
          if (!user.emailVerified) {
            setIsLoading(false);
            Toast.show({
              type: 'error',
              text1: 'Email Not Verified',
              text2: 'Please verify your email before logging in.',
            });
            return;
          } else {
            Toast.show({
              type: 'success',
              text1: 'Login Successful',
              text2: `Welcome back!`,
            });
            setIsLoading(false);
            setIsLoggedIn(true);
            router.replace('/(user)');
          }
        } else {
          const user = await login(data.email, data.password);
          if (!user.emailVerified) {
            setIsLoading(false);
            Toast.show({
              type: 'error',
              text1: 'Email Not Verified',
              text2: 'Please verify your email before logging in.',
            });
            return;
          } else {
            setIsLoading(false);
            Toast.show({
              type: 'success',
              text1: 'Login Successful',
              text2: `Welcome back!`,
            });
            setIsLoggedIn(true);
            router.replace('/(admin)');
          }
        }
      } else {
        setIsLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: "No account found with this email.",
        });
      }
    } catch (error: any) {
      setIsLoading(false)
      let message = 'Something went wrong. Please try again.';

      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/user-not-found':
            message = 'No account found with this email.';
            break;
          case 'auth/invalid-credential':
            message = 'Invalid credentials.';
            break;
          case 'auth/wrong-password':
            message = 'Incorrect password.';
            break;
          case 'auth/invalid-email':
            message = 'Invalid email format.';
            break;
          case 'auth/too-many-requests':
            message = 'Too many login attempts. Please try again later.';
            break;
        }
      }

      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: message,
      });
    }
  };

  useEffect(() => {
    if (user && user?.isAdmin) {
      router.push('/(admin)');
    }
    if (user && !user.isAdmin) {
      router.push('/(user)');
    }
  }, [user])  

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-white px-6 pt-10 "
    >
      <StatusBar style="dark" />
      <Logo />

      <View className="my-10">
        <Text className="text-3xl font-bold text-gray-800">Welcome Back</Text>
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
        className={`bg-blue-600 mt-6 p-4 rounded-xl shadow-md  ${isLoading ? "opacity-40" : "active:opacity-80"}`}
      >
        <Text className="text-white text-center font-semibold text-base">{isLoading ? "Logging in..." : 'Login'}</Text>
      </TouchableOpacity>

      {/* <Pressable onPress={() => router.push('/signup')} className="mt-4"> */}
      <Text className="text-center text-blue-500 text-sm mt-8">
        Don't have an account?
      </Text>
      {/* </Pressable> */}

      <Pressable
        onPress={() => router.push('/signup')}
        className="bg-green-600 mt-6 p-4 rounded-xl shadow-md active:opacity-80"
      >
        <Text className="text-white text-center font-semibold text-base">Create Account</Text>
      </Pressable>


      {/* <Pressable onPress={() => router.push(`/admin-login` as any)} className="mt-4">
        <Text className="text-center text-blue-500 text-sm">
          <Text className="">Admin Login</Text>
        </Text>
      </Pressable> */}
    </KeyboardAvoidingView>
  );
}

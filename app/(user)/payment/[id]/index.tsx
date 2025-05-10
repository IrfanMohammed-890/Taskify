import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { router, useLocalSearchParams } from 'expo-router';
import { getPricingPlansById } from '@/service/pricing-plans';
import { createPayment } from '@/service/payment';
import { useUserAuth } from '@/context/UserAuthContext';
import { updateUserPaymentStatus } from '@/service/user';
import Toast from 'react-native-toast-message';
import { getUserDataFromFirestore } from '@/service/authService';

export default function PaymentScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { id } = useLocalSearchParams();

  const { loginData, setUser, user } = useUserAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [pricingData, setPricingData] = useState<any>(null);
  const [isLoadingPayment, setIsLoadingPayment] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      setIsLoadingPayment(true);
      const data = {
        planId: pricingData.id,
        userId: loginData.uid,
        duration: pricingData.duration,
        price: pricingData.price,
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        planName: pricingData?.planName
      };
      await createPayment(data);
      await updateUserPaymentStatus(loginData.uid as string, true);
      const userData = await getUserDataFromFirestore(loginData.uid);
      setUser(userData);
      Toast.show({
        type: 'success',
        text2: `Payment has been successfully!`,
      });
      router.replace('/(user)');
    } catch (error) {
      setIsLoadingPayment(false);
      Toast.show({
        type: 'error',
        text1: '',
        text2: 'Something went wrong.',
      });
    }
  };

  const getPriceDetails = async () => {
    setIsLoading(true);
    const data = await getPricingPlansById(id as string);
    setPricingData(data);
    setIsLoading(false);
  };

  useEffect(() => {
    id && getPriceDetails();
  }, [id]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Complete Your Payment</Text>
      <View style={styles.amountContainer}>
        <Text style={styles.amount}>{pricingData?.planName}</Text>
      </View>
      <View style={styles.card}>
        {/* Cardholder Name */}
        <Text style={styles.label}>Cardholder Name</Text>
        <Controller
          control={control}
          name="cardName"
          rules={{ required: 'Cardholder name is required' }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="John Doe"
              style={styles.input}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.cardName?.message && <Text style={styles.error}>{errors.cardName.message as any}</Text>}

        {/* Card Number */}
        <Text style={styles.label}>Card Number</Text>
        <Controller
          control={control}
          name="cardNumber"
          rules={{
            required: 'Card number is required',
            pattern: {
              value: /^\d{16}$/,
              message: 'Card number must be 16 digits',
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="1234567890123456"
              style={styles.input}
              keyboardType="numeric"
              value={value}
              onChangeText={(text) => onChange(text.replace(/\s/g, ''))}
            />
          )}
        />
        {errors.cardNumber?.message && <Text style={styles.error}>{errors.cardNumber.message as any}</Text>}


        {/* Expiry Date */}
        <View>
          <Text style={styles.label}>Expiry</Text>
          <Controller
            control={control}
            name="expiry"
            rules={{
              required: 'Expiry date is required',
              pattern: {
                value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                message: 'Use MM/YY format',
              },
              validate: (value) => {
                const [mm, yy] = value.split('/').map(Number);
                if (!mm || !yy) return 'Invalid expiry date';

                const now = new Date();
                const currentMonth = now.getMonth() + 1; // JS months are 0-indexed
                const currentYear = now.getFullYear() % 100; // get last 2 digits of year

                if (yy < currentYear || (yy === currentYear && mm < currentMonth)) {
                  return 'Expiry date cannot be in the past';
                }

                return true;
              }
            }}

            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="MM/YY"
                style={styles.input}
                keyboardType="numeric"
                maxLength={5}
                value={value}
                onChangeText={(text) => {
                  const cleaned = text.replace(/[^\d]/g, '');
                  let formatted = cleaned;
                  if (cleaned.length >= 3) {
                    formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
                  } else {
                    formatted = cleaned;
                  }
                  onChange(formatted);
                }}
              />
            )}
          />
          {errors.expiry?.message && <Text style={styles.error}>{errors.expiry.message as any}</Text>}

        </View>

        {/* CVV */}
        <View >
          <Text style={styles.label}>CVV</Text>
          <Controller
            control={control}
            name="cvv"
            rules={{
              required: 'CVV is required',
              pattern: {
                value: /^\d{3}$/,
                message: 'CVV must be 3 digits',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="123"
                style={styles.input}
                secureTextEntry
                keyboardType="numeric"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.cvv?.message && <Text style={styles.error}>{errors.cvv.message as any}</Text>}
        </View>


        {/* Amount Section */}

        <View style={styles.amountContainer}>
          <Text style={styles.amountLabel}>Amount</Text>
          <Text style={styles.amount}>${pricingData?.price}</Text>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          disabled={isLoading || isLoadingPayment}
          style={styles.payButton} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.payButtonText}>{isLoadingPayment ? "Submitting " : "Pay Now"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 20,
    textAlign: 'left',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  label: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#F9FAFB',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10
  },
  inputGroup: {
    flex: 1,
  },
  amountContainer: {
    marginVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amountLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  amount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4F46E5',
  },
  payButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    color: 'red',
    marginBottom: 8,
    fontSize: 12,
  },
});

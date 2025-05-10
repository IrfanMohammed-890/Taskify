import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Lock, ArrowRight } from 'lucide-react-native';
import { useUserAuth } from '@/context/UserAuthContext';
import { useRouter } from 'expo-router'; // or useNavigation from React Navigation

const ContactConsultantCard = () => {
  const { user } = useUserAuth();
  const router = useRouter(); // change to useNavigation() if using React Navigation stack

  const handlePress = () => {
    if (user?.isMember) {
      router.push('/(user)/consultant'); // or useNavigation().navigate('Consultant')
    } else {
      router.push('/(user)/pricing'); // or navigate to your Pricing screen
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      <View style={styles.card}>
        <View style={styles.content}>
          <Text style={styles.title}>Contact Consultant</Text>
          <Text style={styles.description}>
            Speak directly with a mental wellness consultant for personalized support. Get guidance, clarity, and tools to manage stress and emotions effectively.
          </Text>
        </View>
        <View style={styles.iconWrapper}>
          {user?.isMember ? (
            <ArrowRight size={24} color="#6366f1" />
          ) : (
            <Lock size={24} color="#9ca3af" />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#E0E7FF', // indigo-100
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4338CA', // indigo-700
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#4B5563', // gray-600
    textAlign: 'justify'
  },
  iconWrapper: {
    justifyContent: 'flex-start',
    paddingTop: 2,
  },
});

export default ContactConsultantCard;

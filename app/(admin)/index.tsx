import { View, Text, ScrollView, Image, TextInput } from 'react-native';
import { Smile, Heart, Flag, MessageCircle } from 'lucide-react-native';
import { useUserAuth } from '@/context/UserAuthContext';
import { useEffect, useState } from 'react';
import { fetchUserStats, fetchTotalPaymentAmount, totalConsultantCount } from '@/service/dashboard';

export default function AdminIndex() {
  const { user } = useUserAuth();

  const [userStats, setUserStats] = useState({
    totalUsers: 0,
    paidUsers: 0,
    unpaidUsers: 0,
  });
  const [totalPayment, setTotalPayment] = useState(0);
  const [consultantCount, setConsultantCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const loadDashboard = async () => {
    setIsLoading(true);
    try {
      const [userStatsRes, totalPaymentRes, consultantCountRes] = await Promise.all([
        fetchUserStats(),
        fetchTotalPaymentAmount(),
        totalConsultantCount(),
      ]);
      setUserStats(userStatsRes);
      setTotalPayment(totalPaymentRes);
      setConsultantCount(consultantCountRes);
    } catch (error) {
      console.error("Error loading dashboard:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  // Example rendering conditionally
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg text-gray-500">Loading dashboard...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100 px-4 pt-10">
      {/* Top Header */}
      <View className="flex-row justify-between items-center mb-6">
        <View>
          <Text className="text-gray-400 text-xs">WELCOME BACK</Text>
          <Text className="text-2xl font-bold ">{user?.firstName}</Text>
        </View>
        {/* <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
          className="w-12 h-12 rounded-full"
        /> */}
      </View>

      <View>
        <Text className='text-3xl text-indigo-500 font-semibold'>Dashboard</Text>
      </View>

      {/* Dropdown / Select */}
      <View className="mb-6">
        {/* <View className="bg-white rounded-lg p-3">
          <Text className="text-gray-500">{selectedRange}</Text>
        </View> */}
      </View>

      {/* Stats Cards */}
      <View className="flex-row flex-wrap justify-between mb-6">

        <View className="w-[48%] bg-white rounded-xl p-4 mb-4 shadow-sm">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-gray-600 font-semibold">Total Users</Text>
            <Smile className="text-green-400" size={20} />
          </View>
          <Text className="text-2xl font-bold">{userStats.totalUsers}</Text>
        </View>

        {/* Followers */}
        <View className="w-[48%] bg-white rounded-xl p-4 mb-4 shadow-sm">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-gray-600 font-semibold">Paid Users</Text>
            <Smile className="text-green-400" size={20} />
          </View>
          <Text className="text-2xl font-bold">{userStats.paidUsers}</Text>
        </View>

        {/* Reactions */}
        <View className="w-[48%] bg-white rounded-xl p-4 mb-4 shadow-sm">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-gray-600 font-semibold">Unpaid Users</Text>
            <Heart className="text-red-400" size={20} />
          </View>
          <Text className="text-2xl font-bold">{userStats.unpaidUsers}</Text>
        </View>

        {/* Reach */}
        <View className="w-[48%] bg-white rounded-xl p-4 mb-4 shadow-sm">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-gray-600 font-semibold">Total Amount</Text>
            <Flag className="text-yellow-400" size={20} />
          </View>
          <Text className="text-2xl font-bold"> $ {totalPayment}</Text>
        </View>

        {/* Comments */}
        <View className="w-[48%] bg-white rounded-xl p-4 mb-4 shadow-sm">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-gray-600 font-semibold">Total Consultant</Text>
            <MessageCircle className="text-blue-400" size={20} />
          </View>
          <Text className="text-2xl font-bold">{consultantCount}</Text>
        </View>
      </View>

      {/* Referrals Section */}

    </View>
  );
}

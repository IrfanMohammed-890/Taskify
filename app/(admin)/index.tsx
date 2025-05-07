import { View, Text, ScrollView, Image, TextInput } from 'react-native';
import { Smile, Heart, Flag, MessageCircle } from 'lucide-react-native';
import { useState } from 'react';
import UserList from '@/components/UsersList';

export default function AdminIndex() {
  const [selectedRange, setSelectedRange] = useState('Last 7 Days');

  return (
    <ScrollView className="flex-1 bg-gray-100 px-4 pt-10">
      {/* Top Header */}
      <View className="flex-row justify-between items-center mb-6">
        <View>
          <Text className="text-gray-400 text-xs">WELCOME BACK</Text>
          <Text className="text-2xl font-bold ">RAVI</Text>
        </View>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
          className="w-12 h-12 rounded-full"
        />
      </View>

      {/* Dropdown / Select */}
      <View className="mb-6">
        <View className="bg-white rounded-lg p-3">
          <Text className="text-gray-500">{selectedRange}</Text>
        </View>
      </View>

      {/* Stats Cards */}
      <View className="flex-row flex-wrap justify-between mb-6">
        {/* Followers */}
        <View className="w-[48%] bg-white rounded-xl p-4 mb-4 shadow-sm">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-gray-600 font-semibold">Paid Users</Text>
            <Smile className="text-green-400" size={20} />
          </View>
          <Text className="text-2xl font-bold">2.531</Text>
        </View>

        {/* Reactions */}
        <View className="w-[48%] bg-white rounded-xl p-4 mb-4 shadow-sm">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-gray-600 font-semibold">Unpaid Users</Text>
            <Heart className="text-red-400" size={20} />
          </View>
          <Text className="text-2xl font-bold">25.351</Text>
        </View>

        {/* Reach */}
        <View className="w-[48%] bg-white rounded-xl p-4 mb-4 shadow-sm">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-gray-600 font-semibold">Total Amount</Text>
            <Flag className="text-yellow-400" size={20} />
          </View>
          <Text className="text-2xl font-bold">351.12k</Text>
        </View>

        {/* Comments */}
        <View className="w-[48%] bg-white rounded-xl p-4 mb-4 shadow-sm">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-gray-600 font-semibold">Comments</Text>
            <MessageCircle className="text-blue-400" size={20} />
          </View>
          <Text className="text-2xl font-bold">1.351</Text>
          <Text className="text-blue-500 text-xs mt-1">0% vs last 7 days</Text>
        </View>
      </View>

      {/* Referrals Section */}
      <View className="bg-white rounded-xl p-4 shadow-sm mb-10">
        <Text className="text-gray-400 font-semibold mb-4">ACQUISITION</Text>
        <Text className="text-lg font-bold mb-4">Referrals</Text>

        {/* Facebook */}
        <View className="flex-row justify-between items-center mb-4">
          <View className="flex-row items-center">
            <View className="bg-blue-500 p-2 rounded-full mr-3">
              <Text className="text-white font-bold text-xs">f</Text>
            </View>
            <View>
              <Text className="font-semibold">Facebook</Text>
              <Text className="text-gray-400 text-xs">Organic Users</Text>
            </View>
          </View>
          <View className="items-end">
            <Text className="text-green-500 font-semibold">$53.15</Text>
            <Text className="text-gray-400 text-xs">Up by 24.5%</Text>
          </View>
        </View>

        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <View className="bg-red-400 p-2 rounded-full mr-3">
              <Text className="text-white font-bold text-xs">G</Text>
            </View>
            <View>
              <Text className="font-semibold">Google</Text>
              <Text className="text-gray-400 text-xs">Sponsored Ads</Text>
            </View>
          </View>
          <View className="items-end">
            <Text className="text-blue-500 font-semibold">25.30%</Text>
            <Text className="text-gray-400 text-xs">Up by 0.3%</Text>
          </View>
        </View>
      </View>
      <UserList />
    </ScrollView>
  );
}

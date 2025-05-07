import { Ionicons } from "@expo/vector-icons";
import { Slot, useRouter, usePathname } from "expo-router";
import { SafeAreaView, View, TouchableOpacity } from "react-native";

export default function AdminLayout() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { name: 'Home', icon: 'home', link: '/(admin)' },
    { name: 'Features', icon: 'star', link: '/(admin)/features' },
    // { name: 'Mood', icon: 'happy', link: '/(user)/mood' },
    // { name: 'Tools', icon: 'construct', link: '/(user)/tools' },
    { name: 'Profile', icon: 'person', link: '/(admin)/profile' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1 }}>
        <Slot />
      </View>

      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#4f46e5',
        paddingVertical: 10,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
      }}>
        {tabs.map(tab => {
          const isActive = pathname === tab.link || pathname.startsWith(tab.link + '/');
          console.log('pathname', pathname);
          return (
            <TouchableOpacity
              key={tab.link}
              onPress={() => router.push(tab.link as any)}
            >
              <Ionicons
                name={(isActive ? tab.icon : `${tab.icon}-outline`) as any}
                size={28}
                color={isActive ? '#ef4444' : '#ffffff'}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

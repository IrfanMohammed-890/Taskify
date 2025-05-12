import { Stack } from "expo-router";
import "./globals.css";
import { UserAuthProvider } from "@/context/UserAuthContext";
import Toast from "react-native-toast-message";
import AIMessageDisplay from "@/components/ui/AiMessageBox";


export default function RootLayout() {

  return (
    <UserAuthProvider>
      <>
        <AIMessageDisplay />
        <Stack screenOptions={{ headerShown: false }} />
        <Toast />
      </>
    </UserAuthProvider>
  );
}

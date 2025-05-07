import { Stack } from "expo-router";
import "./globals.css";
import { UserAuthProvider } from "@/context/UserAuthContext";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  return (
    <UserAuthProvider>
      <>
        <Stack screenOptions={{ headerShown: false }} />
        <Toast />
      </>
    </UserAuthProvider>
  );
}

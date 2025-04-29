import { Stack } from "expo-router";
import "./globals.css";
import { UserAuthProvider } from "@/context/UserAuthContext";

export default function RootLayout() {
  return (
    <UserAuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </UserAuthProvider>
  );
}

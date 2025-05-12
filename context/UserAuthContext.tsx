import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { getUserDataFromFirestore } from '@/service/authService'; // create this to fetch user profile from Firestore
import { auth } from '@/firebase';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';
import { Alert } from 'react-native';

interface User {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  isMember?: boolean;
  contactNumber: string;
  isAdmin?: boolean;
}

interface UserAuthContextType {
  user: User | null;
  loading: boolean;
  loginData: any;
  logout: () => void;
  setLoginData: (data: any) => void;
  setUser: (data: any) => void;
  isAuthenticated?: any,
  getAISuggestion: (mood: string) => void;
  aiMessage?: string,

}

const UserAuthContext = createContext<UserAuthContextType | undefined>(undefined);

export const UserAuthProvider = ({ children }: { children: ReactNode; }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loginData, setLoginData] = useState<any>(null);
  const [aiMessage, setAiMessage] = useState('');

  const OPENAI_API_KEY = `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`;

  const getAISuggestion = async (mood: any) => {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
          "HTTP-Referer": "com.safespace.app",
          "X-Title": "safespace",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "deepseek/deepseek-r1:free",
          "messages": [
            {
              "role": "user",
              "content": `A user is feeling ${mood}. Suggest a kind and helpful tip or activity they can do in one sentence.`
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = await response.json();
      const message = data.choices[0].message.content;
      setAiMessage(message);
    } catch (error) {
      console.error('Error:', error);
    }
  };



  const logout = async () => {
    Toast.show({
      type: 'success',
      text1: '',
      text2: 'Logout successfully!',
    });
    router.replace('/login'); 
    setUser(null);
    setLoginData(null);
    await signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        if (!firebaseUser.emailVerified) {
          router.push('/login')
          setLoading(false);
          return;
        }
        setLoginData(firebaseUser);
        try {
          const userData = await getUserDataFromFirestore(firebaseUser.uid);
          setUser(userData as any);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          router.push('/login')
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);


  return (
    <UserAuthContext.Provider value={{ user, loading, loginData, setLoginData, logout, setUser, isAuthenticated: !!user, getAISuggestion, aiMessage }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  const context = useContext(UserAuthContext);
  if (!context) throw new Error('useUserAuth must be used within UserAuthProvider');
  return context;
};

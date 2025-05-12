import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { getUserDataFromFirestore } from '@/service/authService'; // create this to fetch user profile from Firestore
import { auth } from '@/firebase';
import { router } from 'expo-router';
import { useUserAuth } from './UserAuthContext';

interface Admin {
  uid: string;
  email: string;
  firstName?: string;
  lastName?: string;
  isMember?: boolean;
  contactNumber?: string;
  isAdmin: boolean;
}

interface AdminAuthContextType {
  admin: Admin | null;
  adminLoading: boolean;
  adminLoginData: any;
  logoutAdmin: () => void;
  setAdminLoginData: (data: any) => void;
  setAdmin: (data: any) => void;
  isAuthenticated?: any;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider = ({ children }: { children: ReactNode; }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [adminLoading, setAdminLoading] = useState(true);
  const [adminLoginData, setAdminLoginData] = useState<any>(null);

  const logoutAdmin = async () => {
    await signOut(auth);
    router.push('/admin-login');
    setAdmin(null);
    setAdminLoginData(null);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setAdminLoginData(firebaseUser);
        try {
          const userData = await getUserDataFromFirestore(firebaseUser.uid);
          setAdmin(userData as any);
        } catch (error) {
          await logoutAdmin(); // Force logout on error
        }
      } else {
        setAdmin(null);
      }
      setAdminLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AdminAuthContext.Provider value={{ admin, adminLoading, adminLoginData, setAdminLoginData, logoutAdmin, setAdmin, isAuthenticated: !!admin }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return context;
};

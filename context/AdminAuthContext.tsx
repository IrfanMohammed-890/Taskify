import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  isMember: boolean;
}

interface AdminAuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider = ({ children }: { children: ReactNode; }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AdminAuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useUserAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) throw new Error('adminAuthContext must be used within AdminAuthProvider');
  return context;
};

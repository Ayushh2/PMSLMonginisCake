import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  addresses: Address[];
  orders: Order[];
  wishlist: string[];
  loyaltyPoints: number;
}

export interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  name: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  date: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
  items: { name: string; quantity: number; price: number; image: string }[];
  total: number;
  address: Address;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  authModalView: AuthModalView;
  login: (user: User) => void;
  logout: () => void;
  openAuthModal: (view?: AuthModalView) => void;
  closeAuthModal: () => void;
  setAuthModalView: (view: AuthModalView) => void;
  updateUser: (updates: Partial<User>) => void;
  addAddress: (address: Address) => void;
  removeAddress: (id: string) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
}

export type AuthModalView = 
  | 'login-options' 
  | 'login-phone' 
  | 'login-email' 
  | 'login-otp' 
  | 'login-password'
  | 'signup' 
  | 'signup-otp' 
  | 'signup-password'
  | 'forgot-password'
  | 'reset-otp'
  | 'new-password';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState<AuthModalView>('login-options');

  const login = (userData: User) => {
    setUser(userData);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
  };

  const openAuthModal = (view: AuthModalView = 'login-options') => {
    setAuthModalView(view);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setTimeout(() => setAuthModalView('login-options'), 300);
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  const addAddress = (address: Address) => {
    if (user) {
      setUser({ ...user, addresses: [...user.addresses, address] });
    }
  };

  const removeAddress = (id: string) => {
    if (user) {
      setUser({ ...user, addresses: user.addresses.filter(a => a.id !== id) });
    }
  };

  const updateAddress = (id: string, updates: Partial<Address>) => {
    if (user) {
      setUser({
        ...user,
        addresses: user.addresses.map(a => a.id === id ? { ...a, ...updates } : a)
      });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isAuthModalOpen,
      authModalView,
      login,
      logout,
      openAuthModal,
      closeAuthModal,
      setAuthModalView,
      updateUser,
      addAddress,
      removeAddress,
      updateAddress
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

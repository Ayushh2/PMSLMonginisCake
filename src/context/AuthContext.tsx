import React, { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';

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
  const [authModalView, setAuthModalViewState] = useState<AuthModalView>('login-options');

  const login = useCallback((userData: User) => {
    setUser(userData);
    setIsAuthModalOpen(false);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const openAuthModal = useCallback((view: AuthModalView = 'login-options') => {
    setAuthModalViewState(view);
    setIsAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
    setTimeout(() => setAuthModalViewState('login-options'), 300);
  }, []);

  const setAuthModalView = useCallback((view: AuthModalView) => {
    setAuthModalViewState(view);
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  }, []);

  const addAddress = useCallback((address: Address) => {
    setUser(prev => prev ? { ...prev, addresses: [...prev.addresses, address] } : null);
  }, []);

  const removeAddress = useCallback((id: string) => {
    setUser(prev => prev ? { ...prev, addresses: prev.addresses.filter(a => a.id !== id) } : null);
  }, []);

  const updateAddress = useCallback((id: string, updates: Partial<Address>) => {
    setUser(prev => prev ? {
      ...prev,
      addresses: prev.addresses.map(a => a.id === id ? { ...a, ...updates } : a)
    } : null);
  }, []);

  const isAuthenticated = useMemo(() => !!user, [user]);

  const value = useMemo(() => ({
    user,
    isAuthenticated,
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
  }), [user, isAuthenticated, isAuthModalOpen, authModalView, login, logout, openAuthModal, closeAuthModal, setAuthModalView, updateUser, addAddress, removeAddress, updateAddress]);

  return (
    <AuthContext.Provider value={value}>
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

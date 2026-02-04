import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import Header from './components/Header';
import { Footer } from './components/Footer';
import { CartSidebar } from './components/CartSidebar';
import WishlistSidebar from './components/WishlistSidebar';
import { LazyChatBot } from './components/ChatBot';
import { LazyCakeRecommender } from './components/CakeRecommender';
import AuthModal from './components/AuthModal';

// Lazy load page components for route-based code splitting
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const ShopPage = lazy(() => import('./pages/ShopPage').then(m => ({ default: m.ShopPage })));
const ProductPage = lazy(() => import('./pages/ProductPage').then(m => ({ default: m.ProductPage })));
const EventPage = lazy(() => import('./pages/EventPage').then(m => ({ default: m.EventPage })));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage').then(m => ({ default: m.CheckoutPage })));
const CorporatePage = lazy(() => import('./pages/CorporatePage').then(m => ({ default: m.CorporatePage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const ProfilePage = lazy(() => import('./pages/ProfilePage').then(m => ({ default: m.ProfilePage })));
const GiftFinderPage = lazy(() => import('./pages/GiftFinderPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const CustomizeCake = lazy(() => import('./pages/CustomizeCake'));

export function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <BrowserRouter>
              <div className="min-h-screen bg-white">
                <Header />
                <CartSidebar />
                <WishlistSidebar />
                <AuthModal />
                <main>
                  <Suspense fallback={null}>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/shop" element={<ShopPage />} />
                      <Route path="/shop/:category" element={<ShopPage />} />
                      <Route path="/product/:id" element={<ProductPage />} />
                      <Route path="/events/:occasion" element={<EventPage />} />
                      <Route path="/checkout" element={<CheckoutPage />} />
                      <Route path="/corporate" element={<CorporatePage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/profile" element={<ProfilePage />} />
                      <Route path="/gift-finder" element={<GiftFinderPage />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/customize-cake" element={<CustomizeCake />} />
                    </Routes>
                  </Suspense>
                </main>
                <Footer />
                <LazyChatBot />
                <LazyCakeRecommender />
              </div>
            </BrowserRouter>
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

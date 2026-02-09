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

// Eager load: Components needed immediately on first paint
import { HomePage } from './pages/HomePage';

// Lazy load: Heavy components that may not be used immediately
const AuthModal = lazy(() => import('./components/AuthModal'));
const ChatBot = lazy(() => import('./components/ChatBot').then(m => ({ default: m.ChatBot })));
const CakeRecommender = lazy(() => import('./components/CakeRecommender').then(m => ({ default: m.CakeRecommender })));

// Lazy load: Route components for code splitting
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

// Lightweight loading fallback (invisible, prevents layout shift)
const PageFallback = () => <div className="min-h-screen" />;

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
                <Suspense fallback={null}>
                  <AuthModal />
                </Suspense>
                <main>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route 
                      path="/shop" 
                      element={
                        <Suspense fallback={<PageFallback />}>
                          <ShopPage />
                        </Suspense>
                      } 
                    />
                    <Route 
                      path="/shop/:category" 
                      element={
                        <Suspense fallback={<PageFallback />}>
                          <ShopPage />
                        </Suspense>
                      } 
                    />
                    <Route 
                      path="/product/:id" 
                      element={
                        <Suspense fallback={<PageFallback />}>
                          <ProductPage />
                        </Suspense>
                      } 
                    />
                    <Route 
                      path="/events/:occasion" 
                      element={
                        <Suspense fallback={<PageFallback />}>
                          <EventPage />
                        </Suspense>
                      } 
                    />
                    <Route 
                      path="/checkout" 
                      element={
                        <Suspense fallback={<PageFallback />}>
                          <CheckoutPage />
                        </Suspense>
                      } 
                    />
                    <Route 
                      path="/corporate" 
                      element={
                        <Suspense fallback={<PageFallback />}>
                          <CorporatePage />
                        </Suspense>
                      } 
                    />
                    <Route 
                      path="/contact" 
                      element={
                        <Suspense fallback={<PageFallback />}>
                          <ContactPage />
                        </Suspense>
                      } 
                    />
                    <Route 
                      path="/profile" 
                      element={
                        <Suspense fallback={<PageFallback />}>
                          <ProfilePage />
                        </Suspense>
                      } 
                    />
                    <Route 
                      path="/gift-finder" 
                      element={
                        <Suspense fallback={<PageFallback />}>
                          <GiftFinderPage />
                        </Suspense>
                      } 
                    />
                    <Route 
                      path="/about" 
                      element={
                        <Suspense fallback={<PageFallback />}>
                          <AboutPage />
                        </Suspense>
                      } 
                    />
                    <Route 
                      path="/customize-cake" 
                      element={
                        <Suspense fallback={<PageFallback />}>
                          <CustomizeCake />
                        </Suspense>
                      } 
                    />
                  </Routes>
                </main>
                <Footer />
                <Suspense fallback={null}>
                  <ChatBot />
                  <CakeRecommender />
                </Suspense>
              </div>
            </BrowserRouter>
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
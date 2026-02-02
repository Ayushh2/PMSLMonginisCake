import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, ShoppingBag, Heart, User, MapPin, ChevronDown,
  Menu, X, Phone, Globe, Loader2, Cake
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useLanguage } from '../context/LanguageContext';
import Logo from './Logo';
import ConfettiEffect from './ConfettiEffect';

const shopCategories = [
  { nameKey: 'cakes', path: '/shop?category=cakes' },
  { nameKey: 'pastries', path: '/shop?category=pastries' },
  { nameKey: 'chocolates', path: '/shop?category=chocolates' },
  { nameKey: 'breads', path: '/shop?category=breads' },
  { nameKey: 'donuts', path: '/shop?category=donuts' },
  { nameKey: 'hampers', path: '/shop?category=gift-hampers' },
];

const events = [
  { nameKey: 'birthday', path: '/events/birthday' },
  { nameKey: 'wedding', path: '/events/wedding' },
  { nameKey: 'anniversary', path: '/events/anniversary' },
  { nameKey: 'valentine', path: '/events/valentine' },
  { nameKey: 'corporate', path: '/events/corporate' },
  { nameKey: 'events', path: '/events/festivals' },
];

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
];

const cities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 
  'Kolkata', 'Pune', 'Hyderabad', 'Ahmedabad',
  'Surat', 'Jaipur', 'Lucknow', 'Nagpur'
];

// Z-INDEX HIERARCHY:
// Header: 100 (lowered to allow modals to appear above)
// Header Dropdowns: 101
// Cart Sidebar: 200
// Wishlist Modal: 200
// Auth Modal: 250
// Location Popup: 300
// Mobile Menu: 150

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdown, setShopDropdown] = useState(false);
  const [eventsDropdown, setEventsDropdown] = useState(false);
  const [locationPopup, setLocationPopup] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(true);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [pincodeInput, setPincodeInput] = useState('');
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(140);

  const { totalItems, toggleCart } = useCart();
  const { isAuthenticated, user, openAuthModal } = useAuth();
  const { wishlistItems, openWishlist } = useWishlist();
  const { language, setLanguage, t } = useLanguage();

  const navigate = useNavigate();
  const headerRef = useRef<HTMLElement>(null);
  const shopRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  // Check if location was already selected
  useEffect(() => {
    const savedCity = localStorage.getItem('monginis_selected_city');
    const hasVisited = localStorage.getItem('monginis_has_visited');
    
    if (savedCity) {
      setSelectedCity(savedCity);
    }
    
    if (!hasVisited) {
      const timer = setTimeout(() => {
        setLocationPopup(true);
        localStorage.setItem('monginis_has_visited', 'true');
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  // Load saved language
  useEffect(() => {
    const savedLang = localStorage.getItem('monginis_language');
    if (savedLang && (savedLang === 'en' || savedLang === 'hi' || savedLang === 'mr')) {
      setLanguage(savedLang);
    }
  }, [setLanguage]);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 5000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen || locationPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, locationPopup]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shopRef.current && !shopRef.current.contains(event.target as Node)) {
        setShopDropdown(false);
      }
      if (eventsRef.current && !eventsRef.current.contains(event.target as Node)) {
        setEventsDropdown(false);
      }
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShopDropdown(false);
      setEventsDropdown(false);
      setLangDropdown(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setMobileSearchOpen(false);
      setMobileMenuOpen(false);
      setSearchQuery('');
    }
  };

  const handleMobileMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setMobileMenuOpen(true);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    localStorage.setItem('monginis_selected_city', city);
    setLocationPopup(false);
  };

  const handlePincodeSubmit = () => {
    if (pincodeInput.length === 6) {
      const pincodeMap: { [key: string]: string } = {
        '400001': 'Mumbai', '400002': 'Mumbai', '400003': 'Mumbai',
        '110001': 'Delhi', '110002': 'Delhi',
        '560001': 'Bangalore', '560002': 'Bangalore',
        '600001': 'Chennai',
        '700001': 'Kolkata',
        '411001': 'Pune',
        '500001': 'Hyderabad',
        '380001': 'Ahmedabad',
      };
      const city = pincodeMap[pincodeInput] || 'Mumbai';
      handleCitySelect(city);
      setPincodeInput('');
    }
  };

  const handleDetectLocation = () => {
    setIsDetectingLocation(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setTimeout(() => {
            handleCitySelect('Mumbai');
            setIsDetectingLocation(false);
          }, 1500);
        },
        () => {
          setIsDetectingLocation(false);
          alert('Unable to detect location. Please select manually.');
        }
      );
    } else {
      setIsDetectingLocation(false);
      alert('Geolocation is not supported by your browser.');
    }
  };

  const handleLanguageChange = (langCode: 'en' | 'hi' | 'mr') => {
    setLanguage(langCode);
    localStorage.setItem('monginis_language', langCode);
    setLangDropdown(false);
    document.documentElement.lang = langCode;
  };

  // Handle logo click - navigate to home
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    closeMobileMenu();
    navigate('/');
  };

  return (
    <>
      <ConfettiEffect isActive={showConfetti} />
      
      {/* Main Header - Lower z-index to allow modals above */}
      <header 
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-lg' : 'bg-white/98 backdrop-blur-md'
        }`}
        style={{ zIndex: 100 }}
      >
        {/* Top Bar */}
        <div className="bg-gradient-to-r from-magenta-700 via-magenta-600 to-pink-600 text-white py-2">
          <div className="container mx-auto px-4 flex justify-between items-center text-sm">
            <div className="flex items-center gap-4">
              <a href="tel:1800-123-4567" className="flex items-center gap-1 hover:text-pink-200 transition-colors">
                <Phone className="w-3 h-3" />
                <span className="hidden sm:inline">1800-123-4567</span>
              </a>
              <span className="hidden md:inline text-pink-200">|</span>
              <span className="hidden md:inline text-pink-200">{t('freeDelivery') || 'Free Delivery on orders over ₹500'}</span>
            </div>

            <div className="flex items-center gap-4">
              {/* Language Selector - Desktop */}
              <div ref={langRef} className="relative hidden sm:block">
                <button
                  onClick={() => setLangDropdown(!langDropdown)}
                  className="flex items-center gap-1 hover:text-pink-200 transition-colors"
                  type="button"
                >
                  <Globe className="w-3 h-3" />
                  <span>{languages.find(l => l.code === language)?.name}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${langDropdown ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {langDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-xl py-2 min-w-[150px] border border-pink-100"
                      style={{ zIndex: 101 }}
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageChange(lang.code as 'en' | 'hi' | 'mr')}
                          className={`w-full text-left px-4 py-2.5 hover:bg-pink-50 transition-colors flex items-center gap-3 ${
                            language === lang.code ? 'text-magenta-600 font-semibold bg-pink-50' : 'text-gray-700'
                          }`}
                          type="button"
                        >
                          <span className="text-lg">{lang.flag}</span>
                          <span>{lang.name}</span>
                          {language === lang.code && (
                            <span className="ml-auto w-2 h-2 bg-magenta-600 rounded-full"></span>
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Location */}
              <button
                onClick={() => setLocationPopup(true)}
                className="flex items-center gap-1 hover:text-pink-200 transition-colors"
                type="button"
              >
                <MapPin className="w-3 h-3" />
                <span className="hidden sm:inline">{t('deliverTo') || 'Deliver to'}:</span>
                <span className="font-medium truncate max-w-[80px]">
                  {selectedCity || t('select') || 'Select'}
                </span>
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-3 md:gap-6">
            {/* Left Section */}
            <div className="flex items-center gap-2 md:gap-4 flex-shrink-0 md:flex-1 md:max-w-md">
              <button
                onClick={handleMobileMenuToggle}
                className="md:hidden p-2.5 hover:bg-pink-50 rounded-lg transition-colors flex-shrink-0 active:scale-95"
                aria-label="Open menu"
                type="button"
              >
                <Menu className="w-6 h-6 text-magenta-700" />
              </button>

              <form onSubmit={handleSearch} className="hidden md:flex flex-1">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder={t('search') || 'Search cakes, pastries...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 rounded-full border-2 border-pink-200 focus:border-magenta-500 focus:outline-none focus:ring-2 focus:ring-magenta-100 transition-all bg-pink-50/50 text-sm"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-magenta-400" />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-pink-100 rounded-full"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Center Section - Logo */}
            <div className="flex-shrink-0">
              <button
                onClick={handleLogoClick}
                className="block cursor-pointer"
                id="header-logo"
                type="button"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center"
                >
                  <Logo size="md" />
                </motion.div>
              </button>
            </div>

            {/* Right Section - Icons */}
            <div className="flex items-center justify-end gap-1 sm:gap-2 md:gap-3 flex-shrink-0 md:flex-1 md:max-w-md">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileSearchOpen(true)}
                className="md:hidden p-2 hover:bg-pink-50 rounded-full transition-colors"
                aria-label="Search"
                type="button"
              >
                <Search className="w-5 h-5 text-magenta-700" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={openWishlist}
                className="relative p-2 hover:bg-pink-50 rounded-full transition-colors"
                aria-label="Wishlist"
                type="button"
              >
                <Heart className={`w-5 h-5 sm:w-6 sm:h-6 ${wishlistItems.length > 0 ? 'fill-magenta-500 text-magenta-500' : 'text-magenta-700'}`} />
                {wishlistItems.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-magenta-600 text-white text-[10px] sm:text-xs rounded-full flex items-center justify-center font-medium"
                  >
                    {wishlistItems.length}
                  </motion.span>
                )}
              </motion.button>

              {isAuthenticated ? (
                <button
                  onClick={() => navigate('/profile')}
                  type="button"
                  className="flex items-center gap-2 p-2 hover:bg-pink-50 rounded-full transition-colors"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-magenta-500 to-pink-500 rounded-full flex items-center justify-center text-white font-medium text-sm shadow-sm">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                    <span className="hidden lg:block text-sm font-medium text-gray-700 max-w-[80px] truncate">
                      {user?.name?.split(' ')[0]}
                    </span>
                  </motion.div>
                </button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => openAuthModal('login-options')}
                  className="p-2 hover:bg-pink-50 rounded-full transition-colors"
                  aria-label="Login"
                  type="button"
                >
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-magenta-700" />
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleCart}
                className="relative p-2 hover:bg-pink-50 rounded-full transition-colors"
                aria-label="Cart"
                type="button"
              >
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-magenta-700" />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-magenta-600 text-white text-[10px] sm:text-xs rounded-full flex items-center justify-center font-medium"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:block border-t border-pink-100 bg-gradient-to-r from-pink-50/50 to-white">
          <div className="container mx-auto px-4">
            <ul className="flex items-center justify-center gap-6 lg:gap-8 py-3">
              <li>
                <Link to="/" className="text-gray-700 hover:text-magenta-600 font-medium transition-colors py-2">
                  {t('home')}
                </Link>
              </li>

              {/* Shop Dropdown */}
              <li className="relative" ref={shopRef}>
                <button
                  onClick={() => {
                    setShopDropdown(!shopDropdown);
                    setEventsDropdown(false);
                  }}
                  className="flex items-center gap-1 text-gray-700 hover:text-magenta-600 font-medium transition-colors py-2"
                  type="button"
                >
                  {t('shop')}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${shopDropdown ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {shopDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-white rounded-xl shadow-2xl py-3 min-w-[220px] border border-pink-100"
                      style={{ zIndex: 101 }}
                    >
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-pink-100 rotate-45" />
                      <div className="relative bg-white rounded-xl">
                        {shopCategories.map((category) => (
                          <Link
                            key={category.path}
                            to={category.path}
                            onClick={() => setShopDropdown(false)}
                            className="block px-5 py-2.5 hover:bg-pink-50 hover:text-magenta-600 transition-colors text-gray-700"
                          >
                            {t(category.nameKey)}
                          </Link>
                        ))}
                        <div className="border-t border-pink-100 mt-2 pt-2">
                          <Link
                            to="/shop"
                            onClick={() => setShopDropdown(false)}
                            className="block px-5 py-2.5 text-magenta-600 font-medium hover:bg-pink-50 transition-colors"
                          >
                            {t('viewAll') || 'View All'} →
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>

              {/* Events Dropdown */}
              <li className="relative" ref={eventsRef}>
                <button
                  onClick={() => {
                    setEventsDropdown(!eventsDropdown);
                    setShopDropdown(false);
                  }}
                  className="flex items-center gap-1 text-gray-700 hover:text-magenta-600 font-medium transition-colors py-2"
                  type="button"
                >
                  {t('events')}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${eventsDropdown ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {eventsDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-white rounded-xl shadow-2xl py-3 min-w-[220px] border border-pink-100"
                      style={{ zIndex: 101 }}
                    >
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-pink-100 rotate-45" />
                      <div className="relative bg-white rounded-xl">
                        {events.map((event) => (
                          <Link
                            key={event.path}
                            to={event.path}
                            onClick={() => setEventsDropdown(false)}
                            className="block px-5 py-2.5 hover:bg-pink-50 hover:text-magenta-600 transition-colors text-gray-700"
                          >
                            {t(event.nameKey)}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>

              {/* Customize Cake */}
              <li>
                <Link
                  to="/customize-cake"
                  className="flex items-center gap-1.5 text-gray-700 hover:text-magenta-600 font-medium transition-colors py-2"
                >
                  <Cake className="w-4 h-4" />
                  {t('customizeCake') || 'Customize Cake'}
                </Link>
              </li>

              <li>
                <Link to="/corporate" className="text-gray-700 hover:text-magenta-600 font-medium transition-colors py-2">
                  {t('corporate')}
                </Link>
              </li>

              <li>
                <Link to="/gift-finder" className="text-gray-700 hover:text-magenta-600 font-medium transition-colors py-2">
                  {t('giftFinder') || 'Gift Finder'}
                </Link>
              </li>

              <li>
                <Link to="/about" className="text-gray-700 hover:text-magenta-600 font-medium transition-colors py-2">
                  {t('aboutUs') || 'About Us'}
                </Link>
              </li>

              <li>
                <Link to="/contact" className="text-gray-700 hover:text-magenta-600 font-medium transition-colors py-2">
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {mobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden"
            style={{ zIndex: 160 }}
            onClick={() => setMobileSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-4 shadow-2xl"
            >
              <form onSubmit={handleSearch} className="flex gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder={t('search') || 'Search cakes, pastries...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="w-full pl-11 pr-4 py-3.5 border-2 border-pink-200 rounded-full focus:border-magenta-500 focus:outline-none focus:ring-2 focus:ring-magenta-100 text-base"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-magenta-400" />
                </div>
                <button
                  type="button"
                  onClick={() => setMobileSearchOpen(false)}
                  className="p-3 hover:bg-pink-50 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Location Popup - Highest z-index */}
      <AnimatePresence>
        {locationPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            style={{ zIndex: 300 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-magenta-600 via-magenta-500 to-pink-500 p-6 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
                </div>
                
                <div className="relative">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <MapPin className="w-10 h-10" />
                  </motion.div>
                  <h2 className="text-2xl font-bold mb-2">{t('welcomeToMonginis') || 'Welcome to Monginis!'}</h2>
                  <p className="text-pink-100">{t('selectLocationSubtitle') || 'Select your delivery location'}</p>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('enterPincode') || 'Enter Pincode'}
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder={t('enterPincodePlaceholder') || 'Enter 6-digit pincode'}
                        value={pincodeInput}
                        onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        maxLength={6}
                        className="w-full pl-11 pr-4 py-3.5 border-2 border-pink-200 rounded-xl focus:border-magenta-500 focus:outline-none focus:ring-2 focus:ring-magenta-100 text-base"
                      />
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-magenta-400" />
                    </div>
                    <button
                      onClick={handlePincodeSubmit}
                      disabled={pincodeInput.length !== 6}
                      className="px-6 py-3.5 bg-gradient-to-r from-magenta-600 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      type="button"
                    >
                      {t('submit') || 'Submit'}
                    </button>
                  </div>
                </div>
                
                <button 
                  onClick={handleDetectLocation}
                  disabled={isDetectingLocation}
                  className="w-full py-3.5 bg-gradient-to-r from-pink-50 to-magenta-50 text-magenta-600 rounded-xl font-medium hover:from-pink-100 hover:to-magenta-100 transition-all flex items-center justify-center gap-2 border-2 border-dashed border-pink-300 mb-6 disabled:opacity-70"
                  type="button"
                >
                  {isDetectingLocation ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {t('detectingLocation') || 'Detecting Location...'}
                    </>
                  ) : (
                    <>
                      <MapPin className="w-5 h-5" />
                      {t('useCurrentLocation') || 'Use Current Location'}
                    </>
                  )}
                </button>
                
                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-4 bg-white text-sm text-gray-500">{t('orSelectCity') || 'or select a city'}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-[200px] overflow-y-auto pr-1">
                  {cities.map((city) => (
                    <motion.button
                      key={city}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleCitySelect(city)}
                      className={`py-3 px-3 rounded-xl text-sm font-medium transition-all ${
                        selectedCity === city
                          ? 'bg-gradient-to-r from-magenta-600 to-pink-500 text-white shadow-lg'
                          : 'bg-pink-50 text-gray-700 hover:bg-pink-100 hover:text-magenta-600 border border-pink-100'
                      }`}
                      type="button"
                    >
                      {city}
                    </motion.button>
                  ))}
                </div>
                
                <button
                  onClick={() => handleCitySelect('Mumbai')}
                  className="w-full mt-4 py-2 text-gray-500 text-sm hover:text-magenta-600 transition-colors"
                  type="button"
                >
                  {t('skipForNow') || 'Skip for now (Default: Mumbai)'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden"
            style={{ zIndex: 150 }}
            onClick={closeMobileMenu}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="absolute left-0 top-0 bottom-0 w-[85%] max-w-[320px] bg-white shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="flex-shrink-0 p-4 border-b border-pink-100 flex justify-between items-center bg-gradient-to-r from-pink-50 to-white">
                <button
                  onClick={handleLogoClick}
                  type="button"
                  className="cursor-pointer"
                >
                  <Logo size="sm" />
                </button>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 hover:bg-pink-100 rounded-full transition-colors"
                  type="button"
                >
                  <X className="w-6 h-6 text-gray-700" />
                </button>
              </div>
              
              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto">
                {/* Search */}
                <div className="p-4 border-b border-pink-100">
                  <form onSubmit={handleSearch}>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder={t('search') || 'Search...'}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border-2 border-pink-200 rounded-full focus:border-magenta-500 focus:outline-none text-sm"
                      />
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-magenta-400" />
                    </div>
                  </form>
                </div>
                
                {/* User Section */}
                <div className="p-4 border-b border-pink-100 bg-gradient-to-r from-pink-50/50 to-white">
                  {isAuthenticated ? (
                    <button
                      onClick={() => {
                        closeMobileMenu();
                        navigate('/profile');
                      }}
                      type="button"
                      className="flex items-center gap-3 w-full text-left"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-magenta-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                        {user?.name?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{user?.name}</p>
                        <p className="text-sm text-magenta-600">{t('viewProfile') || 'View Profile'} →</p>
                      </div>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        closeMobileMenu();
                        openAuthModal('login-options');
                      }}
                      className="w-full py-3.5 bg-gradient-to-r from-magenta-600 to-pink-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
                      type="button"
                    >
                      {t('loginSignup') || 'Login / Sign Up'}
                    </button>
                  )}
                </div>
                
                {/* Navigation */}
                <nav className="p-4">
                  <ul className="space-y-1">
                    <li>
                      <button
                        onClick={() => {
                          closeMobileMenu();
                          navigate('/');
                        }}
                        type="button"
                        className="flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-pink-50 font-medium text-gray-700 transition-colors w-full text-left"
                      >
                        <span className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center text-lg">🏠</span>
                        {t('home')}
                      </button>
                    </li>
                    
                    <li>
                      <details className="group">
                        <summary className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-pink-50 font-medium text-gray-700 cursor-pointer list-none transition-colors">
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center text-lg">🛍️</span>
                            {t('shop')}
                          </div>
                          <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform duration-200" />
                        </summary>
                        <ul className="mt-1 ml-11 space-y-1 border-l-2 border-pink-200">
                          {shopCategories.map((category) => (
                            <li key={category.path}>
                              <button
                                onClick={() => {
                                  closeMobileMenu();
                                  navigate(category.path);
                                }}
                                type="button"
                                className="block py-2.5 px-4 text-gray-600 hover:text-magenta-600 hover:bg-pink-50 rounded-r-lg transition-colors w-full text-left"
                              >
                                {t(category.nameKey)}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </details>
                    </li>
                    
                    <li>
                      <details className="group">
                        <summary className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-pink-50 font-medium text-gray-700 cursor-pointer list-none transition-colors">
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center text-lg">🎉</span>
                            {t('events')}
                          </div>
                          <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform duration-200" />
                        </summary>
                        <ul className="mt-1 ml-11 space-y-1 border-l-2 border-pink-200">
                          {events.map((event) => (
                            <li key={event.path}>
                              <button
                                onClick={() => {
                                  closeMobileMenu();
                                  navigate(event.path);
                                }}
                                type="button"
                                className="block py-2.5 px-4 text-gray-600 hover:text-magenta-600 hover:bg-pink-50 rounded-r-lg transition-colors w-full text-left"
                              >
                                {t(event.nameKey)}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </details>
                    </li>

                    {/* Customize Cake */}
                    <li>
                      <button
                        onClick={() => {
                          closeMobileMenu();
                          navigate('/customize-cake');
                        }}
                        type="button"
                        className="flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-pink-50 font-medium text-gray-700 transition-colors w-full text-left"
                      >
                        <span className="w-8 h-8 bg-gradient-to-br from-magenta-100 to-pink-100 rounded-lg flex items-center justify-center">
                          <Cake className="w-5 h-5 text-magenta-600" />
                        </span>
                        {t('customizeCake') || 'Customize Cake'}
                      </button>
                    </li>
                    
                    <li>
                      <button
                        onClick={() => {
                          closeMobileMenu();
                          navigate('/corporate');
                        }}
                        type="button"
                        className="flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-pink-50 font-medium text-gray-700 transition-colors w-full text-left"
                      >
                        <span className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center text-lg">🏢</span>
                        {t('corporate')}
                      </button>
                    </li>
                    
                    <li>
                      <button
                        onClick={() => {
                          closeMobileMenu();
                          navigate('/gift-finder');
                        }}
                        type="button"
                        className="flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-pink-50 font-medium text-gray-700 transition-colors w-full text-left"
                      >
                        <span className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center text-lg">🎁</span>
                        {t('giftFinder') || 'Gift Finder'}
                      </button>
                    </li>
                    
                    <li>
                      <button
                        onClick={() => {
                          closeMobileMenu();
                          navigate('/about');
                        }}
                        type="button"
                        className="flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-pink-50 font-medium text-gray-700 transition-colors w-full text-left"
                      >
                        <span className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center text-lg">ℹ️</span>
                        {t('aboutUs') || 'About Us'}
                      </button>
                    </li>
                    
                    <li>
                      <button
                        onClick={() => {
                          closeMobileMenu();
                          navigate('/contact');
                        }}
                        type="button"
                        className="flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-pink-50 font-medium text-gray-700 transition-colors w-full text-left"
                      >
                        <span className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center text-lg">📞</span>
                        {t('contact')}
                      </button>
                    </li>

                    {/* Language Selection */}
                    <li className="pt-4 border-t border-pink-100 mt-4">
                      <p className="px-4 text-sm text-gray-500 mb-3 flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        {t('language') || 'Language'}
                      </p>
                      <div className="flex gap-2 px-4">
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => handleLanguageChange(lang.code as 'en' | 'hi' | 'mr')}
                            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-1.5 ${
                              language === lang.code
                                ? 'bg-gradient-to-r from-magenta-600 to-pink-500 text-white shadow-md'
                                : 'bg-pink-50 text-gray-700 hover:bg-pink-100 border border-pink-100'
                            }`}
                            type="button"
                          >
                            <span>{lang.flag}</span>
                            <span className="hidden xs:inline">{lang.name}</span>
                          </button>
                        ))}
                      </div>
                    </li>
                  </ul>
                </nav>
              </div>
              
              {/* Bottom Section */}
              <div className="flex-shrink-0 border-t border-pink-100 bg-white">
                <div className="p-4 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      closeMobileMenu();
                      openWishlist();
                    }}
                    className="flex items-center justify-center gap-2 py-3 bg-pink-50 text-magenta-600 rounded-xl font-medium hover:bg-pink-100 transition-colors"
                    type="button"
                  >
                    <Heart className="w-5 h-5" />
                    {t('wishlist') || 'Wishlist'}
                    {wishlistItems.length > 0 && (
                      <span className="bg-magenta-600 text-white text-xs px-2 py-0.5 rounded-full">
                        {wishlistItems.length}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      closeMobileMenu();
                      toggleCart();
                    }}
                    className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-magenta-600 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg transition-shadow"
                    type="button"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    {t('cart') || 'Cart'}
                    {totalItems > 0 && (
                      <span className="bg-white text-magenta-600 text-xs px-2 py-0.5 rounded-full font-bold">
                        {totalItems}
                      </span>
                    )}
                  </button>
                </div>
                
                <div className="px-4 pb-4">
                  <button
                    onClick={() => {
                      closeMobileMenu();
                      setTimeout(() => setLocationPopup(true), 300);
                    }}
                    className="w-full flex items-center justify-between py-3 px-4 bg-gradient-to-r from-pink-50 to-magenta-50 rounded-xl border border-pink-200"
                    type="button"
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-magenta-600" />
                      <div className="text-left">
                        <p className="text-xs text-gray-500">{t('deliverTo') || 'Deliver to'}</p>
                        <p className="font-medium text-gray-800">{selectedCity || t('selectLocation') || 'Select Location'}</p>
                      </div>
                    </div>
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Header Spacer */}
      <div style={{ height: `${headerHeight}px` }} />
    </>
  );
}
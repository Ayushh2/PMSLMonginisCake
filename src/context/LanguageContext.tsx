import { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';

type Language = 'en' | 'hi' | 'mr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    home: 'Home',
    shop: 'Shop',
    cakes: 'Cakes',
    pastries: 'Pastries',
    chocolates: 'Chocolates',
    breads: 'Breads',
    donuts: 'Donuts',
    hampers: 'Gift Hampers',
    events: 'Events',
    birthday: 'Birthday',
    wedding: 'Wedding',
    anniversary: 'Anniversary',
    valentine: 'Valentine',
    corporate: 'Corporate',
    contact: 'Contact',
    cart: 'Cart',
    search: 'Search for cakes, pastries...',
    deliverTo: 'Deliver to',
    addToCart: 'Add to Cart',
    buyNow: 'Buy Now',
    viewDetails: 'View Details',
    shopNow: 'Shop Now',
    orderNow: 'Order Now',
    freeDelivery: 'Free Delivery',
    sameDayDelivery: 'Same Day Delivery',
    quality: '100% Quality',
    madeWithLove: 'Made with Love',
    since1956: 'Since 1956',
    bestSellers: 'Best Sellers',
    valentineSpecial: "Valentine's Day Special",
    findPerfectGift: 'Find the Perfect Gift',
    shopByMenu: 'Shop by Menu',
    browseCategory: 'Browse by Category',
    shopByCelebration: 'Shop by Celebration',
    eggless: 'Eggless',
    vegan: 'Vegan'
  },
  hi: {
    home: 'होम',
    shop: 'शॉप',
    cakes: 'केक',
    pastries: 'पेस्ट्री',
    chocolates: 'चॉकलेट',
    breads: 'ब्रेड',
    donuts: 'डोनट्स',
    hampers: 'गिफ्ट हैम्पर',
    events: 'इवेंट्स',
    birthday: 'जन्मदिन',
    wedding: 'शादी',
    anniversary: 'सालगिरह',
    valentine: 'वैलेंटाइन',
    corporate: 'कॉर्पोरेट',
    contact: 'संपर्क',
    cart: 'कार्ट',
    search: 'केक, पेस्ट्री खोजें...',
    deliverTo: 'डिलीवरी पता',
    addToCart: 'कार्ट में जोड़ें',
    buyNow: 'अभी खरीदें',
    viewDetails: 'विवरण देखें',
    shopNow: 'अभी खरीदें',
    orderNow: 'ऑर्डर करें',
    freeDelivery: 'मुफ्त डिलीवरी',
    sameDayDelivery: 'उसी दिन डिलीवरी',
    quality: '100% गुणवत्ता',
    madeWithLove: 'प्यार से बनाया',
    since1956: '1956 से',
    bestSellers: 'बेस्ट सेलर्स',
    valentineSpecial: 'वैलेंटाइन डे स्पेशल',
    findPerfectGift: 'सही उपहार खोजें',
    shopByMenu: 'मेनू से खरीदें',
    browseCategory: 'श्रेणी से ब्राउज़ करें',
    shopByCelebration: 'अवसर से खरीदें',
    eggless: 'एगलेस',
    vegan: 'वेगन'
  },
  mr: {
    home: 'होम',
    shop: 'खरेदी',
    cakes: 'केक',
    pastries: 'पेस्ट्री',
    chocolates: 'चॉकलेट',
    breads: 'ब्रेड',
    donuts: 'डोनट्स',
    hampers: 'गिफ्ट हॅम्पर',
    events: 'इव्हेंट्स',
    birthday: 'वाढदिवस',
    wedding: 'लग्न',
    anniversary: 'वर्धापनदिन',
    valentine: 'व्हॅलेंटाइन',
    corporate: 'कॉर्पोरेट',
    contact: 'संपर्क',
    cart: 'कार्ट',
    search: 'केक, पेस्ट्री शोधा...',
    deliverTo: 'डिलिव्हरी पत्ता',
    addToCart: 'कार्टमध्ये जोडा',
    buyNow: 'आता खरेदी करा',
    viewDetails: 'तपशील पहा',
    shopNow: 'आता खरेदी करा',
    orderNow: 'ऑर्डर करा',
    freeDelivery: 'मोफत डिलिव्हरी',
    sameDayDelivery: 'त्याच दिवशी डिलिव्हरी',
    quality: '100% गुणवत्ता',
    madeWithLove: 'प्रेमाने बनवलेले',
    since1956: '1956 पासून',
    bestSellers: 'बेस्ट सेलर्स',
    valentineSpecial: 'व्हॅलेंटाइन डे स्पेशल',
    findPerfectGift: 'योग्य भेट शोधा',
    shopByMenu: 'मेनूमधून खरेदी करा',
    browseCategory: 'श्रेणीनुसार ब्राउझ करा',
    shopByCelebration: 'प्रसंगानुसार खरेदी करा',
    eggless: 'एगलेस',
    vegan: 'व्हेगन'
  }
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('en');

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const t = useCallback((key: string): string => {
    return translations[language][key] || key;
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

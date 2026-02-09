import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Cake, Palette, Type, Image, Upload, Sparkles, 
  ChevronRight, ChevronLeft, Check, ShoppingBag,
  Heart, Star, Clock, Truck, Shield, RefreshCw, X
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

// Cake customization options
const cakeShapes = [
  { id: 'round', name: 'Round', icon: '⭕', price: 0 },
  { id: 'square', name: 'Square', icon: '⬜', price: 50 },
  { id: 'heart', name: 'Heart', icon: '❤️', price: 100 },
  { id: 'rectangle', name: 'Rectangle', icon: '▭', price: 75 },
  { id: 'number', name: 'Number Shape', icon: '🔢', price: 150 },
  { id: 'letter', name: 'Letter Shape', icon: '🔤', price: 150 },
];

const cakeSizes = [
  { id: '0.5kg', name: '0.5 Kg', serves: '4-6', price: 500 },
  { id: '1kg', name: '1 Kg', serves: '8-10', price: 900 },
  { id: '1.5kg', name: '1.5 Kg', serves: '12-15', price: 1300 },
  { id: '2kg', name: '2 Kg', serves: '18-20', price: 1700 },
  { id: '3kg', name: '3 Kg', serves: '25-30', price: 2500 },
  { id: '5kg', name: '5 Kg', serves: '40-50', price: 4000 },
];

const cakeFlavors = [
  { id: 'chocolate', name: 'Chocolate', color: '#4A2C2A', price: 0 },
  { id: 'vanilla', name: 'Vanilla', color: '#F5F5DC', price: 0 },
  { id: 'strawberry', name: 'Strawberry', color: '#FF6B6B', price: 50 },
  { id: 'butterscotch', name: 'Butterscotch', color: '#E4A639', price: 50 },
  { id: 'red-velvet', name: 'Red Velvet', color: '#C41E3A', price: 100 },
  { id: 'black-forest', name: 'Black Forest', color: '#2C1810', price: 100 },
  { id: 'pineapple', name: 'Pineapple', color: '#FFD93D', price: 50 },
  { id: 'mango', name: 'Mango', color: '#FF9F1C', price: 75 },
  { id: 'blueberry', name: 'Blueberry', color: '#4169E1', price: 100 },
  { id: 'coffee', name: 'Coffee', color: '#6F4E37', price: 75 },
];

const frostingTypes = [
  { id: 'buttercream', name: 'Buttercream', price: 0 },
  { id: 'fondant', name: 'Fondant', price: 200 },
  { id: 'whipped-cream', name: 'Whipped Cream', price: 50 },
  { id: 'cream-cheese', name: 'Cream Cheese', price: 100 },
  { id: 'ganache', name: 'Chocolate Ganache', price: 150 },
];

const decorations = [
  { id: 'sprinkles', name: 'Sprinkles', price: 50, icon: '✨' },
  { id: 'flowers', name: 'Edible Flowers', price: 150, icon: '🌸' },
  { id: 'fruits', name: 'Fresh Fruits', price: 200, icon: '🍓' },
  { id: 'chocolate-drip', name: 'Chocolate Drip', price: 100, icon: '🍫' },
  { id: 'macarons', name: 'Macarons', price: 250, icon: '🍪' },
  { id: 'gold-leaf', name: 'Gold Leaf', price: 300, icon: '✨' },
  { id: 'candles', name: 'Candles', price: 50, icon: '🕯️' },
  { id: 'toppers', name: 'Cake Topper', price: 150, icon: '🎂' },
];

const themes = [
  { id: 'birthday', name: 'Birthday', icon: '🎂' },
  { id: 'wedding', name: 'Wedding', icon: '💒' },
  { id: 'anniversary', name: 'Anniversary', icon: '💕' },
  { id: 'baby-shower', name: 'Baby Shower', icon: '👶' },
  { id: 'graduation', name: 'Graduation', icon: '🎓' },
  { id: 'valentines', name: "Valentine's", icon: '❤️' },
  { id: 'christmas', name: 'Christmas', icon: '🎄' },
  { id: 'custom', name: 'Custom Theme', icon: '✨' },
];

const steps = [
  { id: 1, title: 'Shape & Size', icon: Cake },
  { id: 2, title: 'Flavor', icon: Palette },
  { id: 3, title: 'Frosting & Decor', icon: Sparkles },
  { id: 4, title: 'Message & Photo', icon: Type },
  { id: 5, title: 'Review', icon: Check },
];

// Past Custom Cakes Gallery
const pastCustomCakes = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400',
    name: 'Princess Theme Birthday Cake',
    customer: 'Priya S.',
    rating: 5,
    occasion: 'Birthday',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=400',
    name: 'Elegant Wedding Cake',
    customer: 'Rahul & Anita',
    rating: 5,
    occasion: 'Wedding',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1562440499-64c9a111f713?w=400',
    name: 'Photo Cake with Fondant',
    customer: 'Amit K.',
    rating: 4,
    occasion: 'Anniversary',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
    name: 'Chocolate Drip Cake',
    customer: 'Sneha M.',
    rating: 5,
    occasion: 'Birthday',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400',
    name: 'Unicorn Theme Cake',
    customer: 'Riya P.',
    rating: 5,
    occasion: 'Kids Birthday',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=400',
    name: 'Floral Garden Cake',
    customer: 'Meera J.',
    rating: 5,
    occasion: 'Baby Shower',
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400',
    name: 'Heart Shaped Red Velvet',
    customer: 'Vikram & Pooja',
    rating: 5,
    occasion: 'Valentine',
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400',
    name: 'Corporate Logo Cake',
    customer: 'TechCorp Ltd.',
    rating: 4,
    occasion: 'Corporate',
  },
];

export default function CustomizeCake() {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isEggless, setIsEggless] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<typeof pastCustomCakes[0] | null>(null);
  
  // Customization state
  const [customization, setCustomization] = useState({
    shape: 'round',
    size: '1kg',
    flavor: 'chocolate',
    frosting: 'buttercream',
    decorations: [] as string[],
    theme: '',
    message: '',
    messageColor: '#C41679',
    specialInstructions: '',
  });

  // Calculate total price
  const calculatePrice = () => {
    let total = 0;
    
    const size = cakeSizes.find(s => s.id === customization.size);
    total += size?.price || 0;
    
    const shape = cakeShapes.find(s => s.id === customization.shape);
    total += shape?.price || 0;
    
    const flavor = cakeFlavors.find(f => f.id === customization.flavor);
    total += flavor?.price || 0;
    
    const frosting = frostingTypes.find(f => f.id === customization.frosting);
    total += frosting?.price || 0;
    
    customization.decorations.forEach(decId => {
      const dec = decorations.find(d => d.id === decId);
      total += dec?.price || 0;
    });
    
    if (isEggless) total += 100;
    if (uploadedImage) total += 150;
    
    return total;
  };

  const handleDecorationToggle = (decorationId: string) => {
    setCustomization(prev => ({
      ...prev,
      decorations: prev.decorations.includes(decorationId)
        ? prev.decorations.filter(id => id !== decorationId)
        : [...prev.decorations, decorationId]
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddToCart = () => {
    const customCake = {
      id: `custom-${Date.now()}`,
      name: `Custom ${cakeFlavors.find(f => f.id === customization.flavor)?.name} Cake`,
      price: calculatePrice(),
      image: uploadedImage || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
      quantity: 1,
      customization: {
        ...customization,
        isEggless,
        uploadedImage,
      },
    };
    
    addToCart(customCake as any, customization.size, customization.flavor, 1);
    setShowSuccess(true);
  };

  const handleViewCart = () => {
    setShowSuccess(false);
    navigate('/cart');
  };

  const handleContinue = () => {
    setShowSuccess(false);
  };

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-magenta-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-magenta-600 via-pink-600 to-rose-500 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
              <Cake className="w-5 h-5" />
              <span className="font-medium">{t('customizeCake') || 'Customize Your Cake'}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('designDreamCake') || 'Design Your Dream Cake'}
            </h1>
            <p className="text-lg text-pink-100">
              {t('customCakeSubtitle') || 'Create a personalized masterpiece for your special occasion!'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Progress Steps */}
      <div className="bg-white shadow-md sticky top-[140px] z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4 overflow-x-auto gap-2">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => setCurrentStep(step.id)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full transition-all whitespace-nowrap text-sm ${
                    currentStep === step.id
                      ? 'bg-gradient-to-r from-magenta-600 to-pink-500 text-white shadow-lg'
                      : currentStep > step.id
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                  type="button"
                >
                  <step.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline font-medium">{step.title}</span>
                  <span className="sm:hidden font-medium">{step.id}</span>
                </button>
                {index < steps.length - 1 && (
                  <div className={`hidden sm:block w-8 lg:w-12 h-1 rounded ${
                    currentStep > step.id ? 'bg-green-400' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Customization Panel */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Step 1: Shape & Size */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <Cake className="w-6 h-6 text-magenta-600" />
                      {t('selectShape') || 'Select Cake Shape'}
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {cakeShapes.map((shape) => (
                        <button
                          key={shape.id}
                          onClick={() => setCustomization({ ...customization, shape: shape.id })}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            customization.shape === shape.id
                              ? 'border-magenta-500 bg-magenta-50 shadow-lg'
                              : 'border-gray-200 hover:border-pink-300 hover:bg-pink-50'
                          }`}
                          type="button"
                        >
                          <span className="text-4xl block mb-2">{shape.icon}</span>
                          <p className="font-medium text-gray-800">{shape.name}</p>
                          {shape.price > 0 && (
                            <p className="text-sm text-magenta-600">+₹{shape.price}</p>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                      {t('selectSize') || 'Select Cake Size'}
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {cakeSizes.map((size) => (
                        <button
                          key={size.id}
                          onClick={() => setCustomization({ ...customization, size: size.id })}
                          className={`p-4 rounded-xl border-2 transition-all text-left ${
                            customization.size === size.id
                              ? 'border-magenta-500 bg-magenta-50 shadow-lg'
                              : 'border-gray-200 hover:border-pink-300 hover:bg-pink-50'
                          }`}
                          type="button"
                        >
                          <p className="text-2xl font-bold text-gray-800">{size.name}</p>
                          <p className="text-sm text-gray-500">Serves {size.serves}</p>
                          <p className="text-lg font-semibold text-magenta-600 mt-2">₹{size.price}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <button
                      onClick={() => setIsEggless(!isEggless)}
                      className="flex items-center justify-between w-full"
                      type="button"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🥬</span>
                        <div className="text-left">
                          <p className="font-medium text-gray-800">{t('egglessCake') || 'Eggless Cake'}</p>
                          <p className="text-sm text-gray-500">+₹100</p>
                        </div>
                      </div>
                      <div className={`w-14 h-8 rounded-full transition-colors flex items-center px-1 ${
                        isEggless ? 'bg-green-500' : 'bg-gray-300'
                      }`}>
                        <motion.div
                          animate={{ x: isEggless ? 24 : 0 }}
                          className="w-6 h-6 bg-white rounded-full shadow"
                        />
                      </div>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Flavor */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <Palette className="w-6 h-6 text-magenta-600" />
                      {t('selectFlavor') || 'Select Cake Flavor'}
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                      {cakeFlavors.map((flavor) => (
                        <button
                          key={flavor.id}
                          onClick={() => setCustomization({ ...customization, flavor: flavor.id })}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            customization.flavor === flavor.id
                              ? 'border-magenta-500 bg-magenta-50 shadow-lg'
                              : 'border-gray-200 hover:border-pink-300 hover:bg-pink-50'
                          }`}
                          type="button"
                        >
                          <div
                            className="w-12 h-12 rounded-full mx-auto mb-2 shadow-inner border-2 border-white"
                            style={{ backgroundColor: flavor.color }}
                          />
                          <p className="font-medium text-gray-800 text-sm">{flavor.name}</p>
                          {flavor.price > 0 && (
                            <p className="text-xs text-magenta-600">+₹{flavor.price}</p>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                      {t('selectTheme') || 'Select Theme (Optional)'}
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {themes.map((theme) => (
                        <button
                          key={theme.id}
                          onClick={() => setCustomization({ ...customization, theme: theme.id })}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            customization.theme === theme.id
                              ? 'border-magenta-500 bg-magenta-50 shadow-lg'
                              : 'border-gray-200 hover:border-pink-300 hover:bg-pink-50'
                          }`}
                          type="button"
                        >
                          <span className="text-3xl block mb-2">{theme.icon}</span>
                          <p className="font-medium text-gray-800 text-sm">{theme.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Frosting & Decor */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <Sparkles className="w-6 h-6 text-magenta-600" />
                      {t('selectFrosting') || 'Select Frosting'}
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {frostingTypes.map((frosting) => (
                        <button
                          key={frosting.id}
                          onClick={() => setCustomization({ ...customization, frosting: frosting.id })}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            customization.frosting === frosting.id
                              ? 'border-magenta-500 bg-magenta-50 shadow-lg'
                              : 'border-gray-200 hover:border-pink-300 hover:bg-pink-50'
                          }`}
                          type="button"
                        >
                          <p className="font-medium text-gray-800">{frosting.name}</p>
                          {frosting.price > 0 && (
                            <p className="text-sm text-magenta-600">+₹{frosting.price}</p>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                      {t('addDecorations') || 'Add Decorations'}
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {decorations.map((decoration) => (
                        <button
                          key={decoration.id}
                          onClick={() => handleDecorationToggle(decoration.id)}
                          className={`p-4 rounded-xl border-2 transition-all relative ${
                            customization.decorations.includes(decoration.id)
                              ? 'border-magenta-500 bg-magenta-50 shadow-lg'
                              : 'border-gray-200 hover:border-pink-300 hover:bg-pink-50'
                          }`}
                          type="button"
                        >
                          <span className="text-2xl block mb-2">{decoration.icon}</span>
                          <p className="font-medium text-gray-800 text-sm">{decoration.name}</p>
                          <p className="text-xs text-magenta-600">+₹{decoration.price}</p>
                          {customization.decorations.includes(decoration.id) && (
                            <div className="absolute top-2 right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Message & Photo */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <Type className="w-6 h-6 text-magenta-600" />
                      {t('cakeMessage') || 'Cake Message'}
                    </h2>
                    <input
                      type="text"
                      value={customization.message}
                      onChange={(e) => setCustomization({ ...customization, message: e.target.value })}
                      placeholder="e.g., Happy Birthday John!"
                      maxLength={50}
                      className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:border-magenta-500 focus:outline-none mb-4"
                    />
                    <div className="flex items-center gap-4 flex-wrap">
                      <span className="text-sm text-gray-600">{t('textColor') || 'Text Color'}:</span>
                      <div className="flex gap-2">
                        {['#C41679', '#D4AF37', '#2E7D32', '#1565C0', '#6A1B9A', '#000000'].map((color) => (
                          <button
                            key={color}
                            onClick={() => setCustomization({ ...customization, messageColor: color })}
                            className={`w-8 h-8 rounded-full border-2 transition-transform ${
                              customization.messageColor === color ? 'border-gray-800 scale-125' : 'border-gray-300'
                            }`}
                            style={{ backgroundColor: color }}
                            type="button"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <Image className="w-6 h-6 text-magenta-600" />
                      {t('uploadPhoto') || 'Upload Photo (Optional)'}
                      <span className="text-sm font-normal text-magenta-600 ml-2">+₹150</span>
                    </h2>
                    
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    
                    {uploadedImage ? (
                      <div className="relative inline-block">
                        <img
                          src={uploadedImage}
                          alt="Uploaded"
                          className="w-full max-w-xs h-48 object-cover rounded-xl"
                        />
                        <button
                          onClick={() => setUploadedImage(null)}
                          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                          type="button"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full h-48 border-2 border-dashed border-pink-300 rounded-xl flex flex-col items-center justify-center gap-3 hover:bg-pink-50 transition-colors"
                        type="button"
                      >
                        <Upload className="w-12 h-12 text-pink-400" />
                        <span className="text-gray-600">{t('clickToUpload') || 'Click to upload image'}</span>
                        <span className="text-sm text-gray-400">PNG, JPG up to 5MB</span>
                      </button>
                    )}
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                      {t('specialInstructions') || 'Special Instructions'}
                    </h2>
                    <textarea
                      value={customization.specialInstructions}
                      onChange={(e) => setCustomization({ ...customization, specialInstructions: e.target.value })}
                      placeholder="Any special requests or dietary requirements..."
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:border-magenta-500 focus:outline-none resize-none"
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 5: Review */}
              {currentStep === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                      <Check className="w-6 h-6 text-green-500" />
                      {t('reviewOrder') || 'Review Your Custom Cake'}
                    </h2>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between py-3 border-b">
                        <span className="text-gray-600">Shape</span>
                        <span className="font-medium">{cakeShapes.find(s => s.id === customization.shape)?.name}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b">
                        <span className="text-gray-600">Size</span>
                        <span className="font-medium">{cakeSizes.find(s => s.id === customization.size)?.name}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b">
                        <span className="text-gray-600">Flavor</span>
                        <span className="font-medium">{cakeFlavors.find(f => f.id === customization.flavor)?.name}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b">
                        <span className="text-gray-600">Frosting</span>
                        <span className="font-medium">{frostingTypes.find(f => f.id === customization.frosting)?.name}</span>
                      </div>
                      {customization.decorations.length > 0 && (
                        <div className="flex justify-between py-3 border-b">
                          <span className="text-gray-600">Decorations</span>
                          <span className="font-medium text-right max-w-[200px]">
                            {customization.decorations.map(id => decorations.find(d => d.id === id)?.name).join(', ')}
                          </span>
                        </div>
                      )}
                      {customization.message && (
                        <div className="flex justify-between py-3 border-b">
                          <span className="text-gray-600">Message</span>
                          <span className="font-medium" style={{ color: customization.messageColor }}>
                            "{customization.message}"
                          </span>
                        </div>
                      )}
                      {isEggless && (
                        <div className="flex justify-between py-3 border-b">
                          <span className="text-gray-600">Eggless</span>
                          <span className="font-medium text-green-600">Yes (+₹100)</span>
                        </div>
                      )}
                      {uploadedImage && (
                        <div className="flex justify-between py-3 border-b">
                          <span className="text-gray-600">Photo on Cake</span>
                          <span className="font-medium text-magenta-600">Yes (+₹150)</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { icon: Truck, text: 'Free Delivery' },
                      { icon: Clock, text: '24hr Delivery' },
                      { icon: Shield, text: '100% Fresh' },
                      { icon: RefreshCw, text: 'Easy Returns' },
                    ].map((item, i) => (
                      <div key={i} className="bg-white rounded-xl p-4 text-center shadow">
                        <item.icon className="w-6 h-6 text-magenta-600 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-700">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white border-2 border-pink-200 text-gray-700 hover:bg-pink-50'
                }`}
                type="button"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>
              
              {currentStep < 5 ? (
                <button
                  onClick={nextStep}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-magenta-600 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg transition-all"
                  type="button"
                >
                  Next
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-medium hover:shadow-lg transition-all"
                  type="button"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Add to Cart
                </button>
              )}
            </div>
          </div>

          {/* Price Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-[220px]">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h3>
              
              <div className="bg-gradient-to-br from-pink-100 to-magenta-100 rounded-xl p-4 mb-6">
                <div className="aspect-square bg-white rounded-lg flex items-center justify-center mb-3 overflow-hidden">
                  {uploadedImage ? (
                    <img src={uploadedImage} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <Cake className="w-24 h-24 text-magenta-300" />
                  )}
                </div>
                <p className="text-center font-medium text-gray-800">
                  {cakeFlavors.find(f => f.id === customization.flavor)?.name} Cake
                </p>
                <p className="text-center text-sm text-gray-500">
                  {cakeSizes.find(s => s.id === customization.size)?.name} • {cakeShapes.find(s => s.id === customization.shape)?.name}
                </p>
              </div>

              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Base Price</span>
                  <span>₹{cakeSizes.find(s => s.id === customization.size)?.price}</span>
                </div>
                {(cakeShapes.find(s => s.id === customization.shape)?.price || 0) > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shape</span>
                    <span>+₹{cakeShapes.find(s => s.id === customization.shape)?.price}</span>
                  </div>
                )}
                {(cakeFlavors.find(f => f.id === customization.flavor)?.price || 0) > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Flavor</span>
                    <span>+₹{cakeFlavors.find(f => f.id === customization.flavor)?.price}</span>
                  </div>
                )}
                {(frostingTypes.find(f => f.id === customization.frosting)?.price || 0) > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Frosting</span>
                    <span>+₹{frostingTypes.find(f => f.id === customization.frosting)?.price}</span>
                  </div>
                )}
                {customization.decorations.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Decorations</span>
                    <span>+₹{customization.decorations.reduce((sum, id) => sum + (decorations.find(d => d.id === id)?.price || 0), 0)}</span>
                  </div>
                )}
                {isEggless && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Eggless</span>
                    <span>+₹100</span>
                  </div>
                )}
                {uploadedImage && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Photo Print</span>
                    <span>+₹150</span>
                  </div>
                )}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-800">Total</span>
                  <span className="text-2xl font-bold text-magenta-600">₹{calculatePrice()}</span>
                </div>
              </div>

              <div className="mt-6">
                <button 
                  className="w-full flex items-center justify-center gap-2 py-3 bg-pink-50 text-magenta-600 rounded-xl font-medium hover:bg-pink-100 transition-colors"
                  type="button"
                >
                  <Heart className="w-5 h-5" />
                  Save Design
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Past Custom Cakes Gallery */}
        <section className="mt-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              🎂 {t('pastCustomCakes') || 'Past Custom Cakes Gallery'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get inspired by our customers' beautiful custom creations
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {pastCustomCakes.map((cake, index) => (
              <motion.div
                key={cake.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedGalleryImage(cake)}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={cake.image}
                    alt={cake.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform">
                    <p className="font-semibold text-sm">{cake.name}</p>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    <span className="text-xs font-medium text-magenta-600">{cake.occasion}</span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-medium text-gray-800 text-sm line-clamp-1">{cake.name}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">by {cake.customer}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium">{cake.rating}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              className="px-8 py-3 bg-gradient-to-r from-magenta-600 to-pink-500 text-white rounded-full font-semibold hover:shadow-lg transition-all"
              type="button"
            >
              View More Creations
            </button>
          </div>
        </section>
      </div>

      {/* Gallery Image Modal */}
      <AnimatePresence>
        {selectedGalleryImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedGalleryImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden"
            >
              <div className="relative">
                <img
                  src={selectedGalleryImage.image}
                  alt={selectedGalleryImage.name}
                  className="w-full h-64 sm:h-80 object-cover"
                />
                <button
                  onClick={() => setSelectedGalleryImage(null)}
                  className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white"
                  type="button"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-magenta-100 text-magenta-600 rounded-full text-sm font-medium">
                    {selectedGalleryImage.occasion}
                  </span>
                  <div className="flex items-center gap-1">
                    {[...Array(selectedGalleryImage.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedGalleryImage.name}</h3>
                <p className="text-gray-600 mb-4">Created for {selectedGalleryImage.customer}</p>
                <button
                  onClick={() => {
                    setSelectedGalleryImage(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-3 bg-gradient-to-r from-magenta-600 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  type="button"
                >
                  Create Similar Cake
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal - Fixed navigation */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Check className="w-10 h-10 text-green-500" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Added to Cart!</h3>
              <p className="text-gray-600 mb-6">Your custom cake has been added to your cart.</p>
              <div className="flex gap-3">
                <button
                  onClick={handleContinue}
                  className="flex-1 py-3 border-2 border-pink-200 text-gray-700 rounded-xl font-medium hover:bg-pink-50"
                  type="button"
                >
                  Continue
                </button>
                <button
                  onClick={handleViewCart}
                  className="flex-1 py-3 bg-gradient-to-r from-magenta-600 to-pink-500 text-white rounded-xl font-medium"
                  type="button"
                >
                  View Cart
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
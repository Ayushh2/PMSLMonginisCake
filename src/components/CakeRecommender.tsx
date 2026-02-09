import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { products, Product } from '../data/products';

interface Preferences {
  occasion: string;
  budget: string;
  flavor: string;
  dietary: string;
}

export const CakeRecommender = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [preferences, setPreferences] = useState<Preferences>({
    occasion: '',
    budget: '',
    flavor: '',
    dietary: ''
  });
  const [recommendations, setRecommendations] = useState<Product[]>([]);

  const questions = [
    {
      title: "What's the occasion?",
      key: 'occasion',
      options: [
        { value: 'birthday', label: '🎂 Birthday' },
        { value: 'wedding', label: '💒 Wedding' },
        { value: 'anniversary', label: '💕 Anniversary' },
        { value: 'valentine', label: '❤️ Valentine' },
        { value: 'corporate', label: '💼 Corporate' },
        { value: 'everyday', label: '🍰 Just Because' }
      ]
    },
    {
      title: "What's your budget?",
      key: 'budget',
      options: [
        { value: '0-500', label: 'Under ₹500', emoji: '💰' },
        { value: '500-1000', label: '₹500 - ₹1,000', emoji: '💵' },
        { value: '1000-2000', label: '₹1,000 - ₹2,000', emoji: '💎' },
        { value: '2000+', label: 'Above ₹2,000', emoji: '👑' }
      ]
    },
    {
      title: 'Preferred flavor?',
      key: 'flavor',
      options: [
        { value: 'chocolate', label: '🍫 Chocolate', emoji: '🍫' },
        { value: 'vanilla', label: '🍦 Vanilla', emoji: '🍦' },
        { value: 'fruit', label: '🍓 Fruity', emoji: '🍓' },
        { value: 'any', label: '🌈 Surprise Me', emoji: '🌈' }
      ]
    },
    {
      title: 'Dietary preferences?',
      key: 'dietary',
      options: [
        { value: 'any', label: '🍰 No Preference', emoji: '🍰' },
        { value: 'eggless', label: '🥚 Eggless', emoji: '🥚' },
        { value: 'vegan', label: '🌱 Vegan', emoji: '🌱' }
      ]
    }
  ];

  const handleSelect = (key: string, value: string) => {
    const newPreferences = { ...preferences, [key]: value };
    setPreferences(newPreferences);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Generate recommendations
      const filtered = products.filter(p => {
        let match = true;
        if (newPreferences.occasion !== 'everyday') {
          match = match && p.occasion.includes(newPreferences.occasion);
        }
        if (newPreferences.dietary === 'eggless') {
          match = match && p.isEggless;
        }
        if (newPreferences.dietary === 'vegan') {
          match = match && p.isVegan === true;
        }
        const [min, max] = newPreferences.budget.split('-').map(s => parseInt(s.replace('+', '')));
        if (max) {
          match = match && p.price >= min && p.price <= max;
        } else if (min) {
          match = match && p.price >= min;
        }
        return match;
      }).slice(0, 3);

      setRecommendations(filtered.length > 0 ? filtered : products.slice(0, 3));
      setStep(questions.length);
    }
  };

  const reset = () => {
    setStep(0);
    setPreferences({ occasion: '', budget: '', flavor: '', dietary: '' });
    setRecommendations([]);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 px-6 py-3 bg-gradient-to-r from-magenta-600 to-pink-600 rounded-full shadow-2xl text-white font-semibold flex items-center gap-2"
        style={{ boxShadow: '0 10px 40px rgba(219, 39, 119, 0.4)' }}
      >
        <span className="text-xl">🧠</span>
        <span className="hidden sm:inline">AI Cake Finder</span>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">🧠</span>
                  <div>
                    <h3 className="font-playfair text-2xl text-magenta-800 font-bold">Smart Cake Finder</h3>
                    <p className="text-magenta-600 text-sm">AI-powered recommendations</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-magenta-100 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6 text-magenta-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Progress */}
              <div className="flex gap-2 mb-8">
                {questions.map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-2 rounded-full ${
                      i <= step ? 'bg-magenta-500' : 'bg-magenta-100'
                    }`}
                  />
                ))}
              </div>

              {/* Question or Results */}
              <AnimatePresence mode="wait">
                {step < questions.length ? (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h4 className="text-xl font-semibold text-magenta-800 mb-6 text-center">
                      {questions[step].title}
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {questions[step].options.map((option) => (
                        <motion.button
                          key={option.value}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleSelect(questions[step].key, option.value)}
                          className="p-4 border-2 border-magenta-200 rounded-2xl hover:border-magenta-500 hover:bg-magenta-50 transition-all text-center"
                        >
                          <span className="text-3xl mb-2 block">{option.emoji}</span>
                          <span className="text-magenta-800 font-medium">{option.label.split(' ').slice(1).join(' ')}</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="text-center mb-6">
                      <span className="text-5xl mb-4 block">✨</span>
                      <h4 className="text-xl font-semibold text-magenta-800">
                        Perfect Matches For You!
                      </h4>
                    </div>
                    <div className="space-y-4 mb-6">
                      {recommendations.map((product) => (
                        <Link
                          key={product.id}
                          to={`/product/${product.id}`}
                          onClick={() => setIsOpen(false)}
                        >
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="flex gap-4 p-4 bg-magenta-50 rounded-2xl"
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-20 h-20 rounded-xl object-cover"
                            />
                            <div className="flex-1">
                              <h5 className="font-semibold text-magenta-800">{product.name}</h5>
                              <div className="flex items-center gap-2 text-sm text-magenta-600">
                                <span>₹{product.price}</span>
                                {product.isEggless && <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">Eggless</span>}
                              </div>
                              <div className="flex items-center gap-1 mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <svg
                                    key={i}
                                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-magenta-500' : 'text-gray-300'}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        </Link>
                      ))}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={reset}
                      className="w-full py-3 border-2 border-magenta-500 text-magenta-600 rounded-full font-semibold hover:bg-magenta-50 transition-colors"
                    >
                      Start Over
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products, occasions } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useState } from 'react';

export const EventPage = () => {
  const { occasion } = useParams();
  const [activeCategory, setActiveCategory] = useState('all');
  
  const currentOccasion = occasions.find(o => o.id === occasion);
  
  const filteredProducts = products.filter(p => {
    const matchesOccasion = p.occasion.includes(occasion || '');
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    return matchesOccasion && matchesCategory;
  });

  const eventCategories = [
    { id: 'all', name: 'All', icon: '✨' },
    { id: 'cakes', name: 'Cakes', icon: '🎂' },
    { id: 'pastries', name: 'Pastries', icon: '🥐' },
    { id: 'chocolates', name: 'Chocolates', icon: '🍫' },
    { id: 'breads', name: 'Breads', icon: '🍞' },
    { id: 'donuts', name: 'Donuts', icon: '🍩' }
  ];

  const eventThemes: Record<string, { gradient: string; emoji: string; tagline: string }> = {
    birthday: {
      gradient: 'from-magenta-600 via-pink-500 to-rose-500',
      emoji: '🎂',
      tagline: 'Make Every Birthday Unforgettable'
    },
    wedding: {
      gradient: 'from-magenta-600 via-rose-500 to-pink-500',
      emoji: '💒',
      tagline: 'Begin Your Forever with Sweetness'
    },
    anniversary: {
      gradient: 'from-magenta-700 via-pink-600 to-rose-600',
      emoji: '💕',
      tagline: 'Celebrate Years of Love'
    },
    valentine: {
      gradient: 'from-rose-600 via-pink-600 to-magenta-600',
      emoji: '❤️',
      tagline: 'Express Your Love Sweetly'
    },
    corporate: {
      gradient: 'from-magenta-700 via-magenta-600 to-pink-600',
      emoji: '💼',
      tagline: 'Professional Events, Perfect Treats'
    },
    festival: {
      gradient: 'from-magenta-600 via-pink-500 to-magenta-500',
      emoji: '🪔',
      tagline: 'Celebrate Traditions with Joy'
    }
  };

  const theme = eventThemes[occasion || 'birthday'] || eventThemes.birthday;

  // Floating decorations based on event
  const getDecorations = () => {
    switch (occasion) {
      case 'valentine':
        return ['❤️', '💕', '💖', '💗', '💝'];
      case 'birthday':
        return ['🎈', '🎉', '🎁', '🎊', '✨'];
      case 'wedding':
        return ['💍', '💐', '🕊️', '✨', '💝'];
      default:
        return ['✨', '💫', '🌟', '⭐', '💖'];
    }
  };

  const decorations = getDecorations();

  return (
    <div className="min-h-screen bg-gradient-to-b from-magenta-50 to-white">
      {/* Hero */}
      <div className={`relative bg-gradient-to-r ${theme.gradient} py-20 overflow-hidden`}>
        {/* Floating decorations */}
        {decorations.map((deco, i) => (
          <motion.span
            key={i}
            className="absolute text-4xl opacity-30"
            style={{
              left: `${10 + i * 18}%`,
              top: `${20 + (i % 3) * 20}%`
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            {deco}
          </motion.span>
        ))}

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-7xl mb-6 block"
            >
              {currentOccasion?.icon || theme.emoji}
            </motion.span>
            <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-4">
              {currentOccasion?.name || 'Special'} Collection
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {theme.tagline}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="sticky top-[140px] z-30 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto py-4 gap-4 scrollbar-hide">
            {eventCategories.map(cat => (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full whitespace-nowrap font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-magenta-600 text-white shadow-lg'
                    : 'bg-magenta-100 text-magenta-700 hover:bg-magenta-200'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <span className="text-6xl mb-4 block">🔍</span>
            <h3 className="text-xl font-semibold text-magenta-800 mb-2">No products found</h3>
            <p className="text-magenta-600">Try a different category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Special Offers Banner */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`bg-gradient-to-r ${theme.gradient} rounded-3xl p-8 md:p-12 text-white text-center`}
        >
          <h3 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
            {occasion === 'valentine' ? '💝 Valentine Special Offer' : '🎉 Special Bundle Offer'}
          </h3>
          <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
            Get 20% off when you order 2 or more items from our {currentOccasion?.name} collection!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-magenta-700 rounded-full font-semibold text-lg shadow-xl"
          >
            Shop Now & Save
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

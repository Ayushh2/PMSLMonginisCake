import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Search, Heart, Star, Sparkles } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const filters = {
  gender: ['For Him', 'For Her', 'Unisex', 'For Kids'],
  age: ['0-5', '6-12', '13-18', '19-30', '31-50', '50+'],
  occasion: ['Birthday', 'Anniversary', 'Wedding', 'Valentine', 'Congratulations', 'Thank You'],
  giftType: ['Cakes', 'Chocolates', 'Gift Hampers', 'Flowers', 'Combos'],
  priceRange: ['Under ₹500', '₹500-₹1000', '₹1000-₹2000', '₹2000-₹5000', 'Above ₹5000'],
};

export default function GiftFinderPage() {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleFilterSelect = (category: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category] === value ? '' : value
    }));
  };

  const filteredProducts = products.slice(0, 8);

  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-magenta-600 via-pink-500 to-rose-400 py-16">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0.3, 0.7, 0.3], 
                scale: [1, 1.2, 1],
                y: [0, -20, 0]
              }}
              transition={{ 
                duration: 3 + Math.random() * 2, 
                repeat: Infinity,
                delay: Math.random() * 2 
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              {i % 3 === 0 ? (
                <Gift className="w-6 h-6 text-white/30" />
              ) : i % 3 === 1 ? (
                <Sparkles className="w-5 h-5 text-pink-200/40" />
              ) : (
                <Star className="w-4 h-4 text-white/25" />
              )}
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <div className="flex justify-center mb-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Gift className="w-16 h-16" />
              </motion.div>
            </div>
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
              Find the Perfect Gift
            </h1>
            <p className="text-xl text-pink-100 max-w-2xl mx-auto">
              Use our smart gift finder to discover the ideal sweet surprise for your loved ones
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gift Finder Section */}
      <section className="py-16 bg-gradient-to-b from-pink-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Gender */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-magenta-500" />
                Who is this gift for?
              </h3>
              <div className="flex flex-wrap gap-3">
                {filters.gender.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleFilterSelect('gender', option)}
                    className={`px-6 py-3 rounded-full font-medium transition-all ${
                      selectedFilters.gender === option
                        ? 'bg-magenta-600 text-white shadow-lg shadow-magenta-300'
                        : 'bg-white border-2 border-pink-200 text-gray-700 hover:border-magenta-400'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Age */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Age Group</h3>
              <div className="flex flex-wrap gap-3">
                {filters.age.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleFilterSelect('age', option)}
                    className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                      selectedFilters.age === option
                        ? 'bg-magenta-600 text-white shadow-lg shadow-magenta-300'
                        : 'bg-white border-2 border-pink-200 text-gray-700 hover:border-magenta-400'
                    }`}
                  >
                    {option} years
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Occasion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Occasion</h3>
              <div className="flex flex-wrap gap-3">
                {filters.occasion.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleFilterSelect('occasion', option)}
                    className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                      selectedFilters.occasion === option
                        ? 'bg-magenta-600 text-white shadow-lg shadow-magenta-300'
                        : 'bg-white border-2 border-pink-200 text-gray-700 hover:border-magenta-400'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Gift Type */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Gift Type</h3>
              <div className="flex flex-wrap gap-3">
                {filters.giftType.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleFilterSelect('giftType', option)}
                    className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                      selectedFilters.giftType === option
                        ? 'bg-magenta-600 text-white shadow-lg shadow-magenta-300'
                        : 'bg-white border-2 border-pink-200 text-gray-700 hover:border-magenta-400'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Price Range */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mb-12"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Budget</h3>
              <div className="flex flex-wrap gap-3">
                {filters.priceRange.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleFilterSelect('priceRange', option)}
                    className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                      selectedFilters.priceRange === option
                        ? 'bg-magenta-600 text-white shadow-lg shadow-magenta-300'
                        : 'bg-white border-2 border-pink-200 text-gray-700 hover:border-magenta-400'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Find Gifts Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowResults(true)}
                className="px-12 py-4 bg-gradient-to-r from-magenta-600 to-pink-500 text-white text-lg font-semibold rounded-full shadow-xl shadow-magenta-300/50 hover:shadow-2xl transition-shadow flex items-center gap-3 mx-auto"
              >
                <Search className="w-5 h-5" />
                Find Perfect Gifts
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {showResults && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-playfair font-bold text-gray-800 mb-4">
                Perfect Gifts for You
              </h2>
              <p className="text-gray-600">
                Based on your preferences, we found {filteredProducts.length} amazing gift options
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

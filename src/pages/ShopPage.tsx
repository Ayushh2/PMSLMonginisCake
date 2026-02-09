import { useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products, categories } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const ShopPage = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  
  const [filters, setFilters] = useState({
    category: category || '',
    occasion: '',
    priceRange: '',
    isEggless: false,
    isVegan: false,
    sortBy: 'popular'
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (filters.category) {
      result = result.filter(p => p.category === filters.category);
    }

    // Occasion filter
    if (filters.occasion) {
      result = result.filter(p => p.occasion.includes(filters.occasion));
    }

    // Price filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (max) {
        result = result.filter(p => p.price >= min && p.price <= max);
      } else {
        result = result.filter(p => p.price >= min);
      }
    }

    // Dietary filters
    if (filters.isEggless) {
      result = result.filter(p => p.isEggless);
    }
    if (filters.isVegan) {
      result = result.filter(p => p.isVegan);
    }

    // Sort
    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result = result.filter(p => p.isNew).concat(result.filter(p => !p.isNew));
        break;
      default:
        result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }

    return result;
  }, [filters, searchQuery]);

  const currentCategory = categories.find(c => c.id === category);

  return (
    <div className="min-h-screen bg-gradient-to-b from-magenta-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-magenta-700 via-magenta-600 to-pink-600 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
              {currentCategory ? currentCategory.name : searchQuery ? `Search: "${searchQuery}"` : 'All Products'}
            </h1>
            <p className="text-magenta-100 text-lg">
              {filteredProducts.length} products found
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="w-full py-3 bg-magenta-100 text-magenta-700 rounded-xl font-medium flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
              </button>
            </div>

            <motion.div
              initial={false}
              animate={{ height: isFilterOpen || window.innerWidth >= 1024 ? 'auto' : 0 }}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden lg:!h-auto ${!isFilterOpen && 'lg:block hidden'}`}
            >
              <div className="p-6 space-y-6">
                {/* Category */}
                <div>
                  <h4 className="font-semibold text-magenta-800 mb-3">Category</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={!filters.category}
                        onChange={() => setFilters({ ...filters, category: '' })}
                        className="text-magenta-600 focus:ring-magenta-500"
                      />
                      <span className="text-sm text-gray-700">All Categories</span>
                    </label>
                    {categories.map(cat => (
                      <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          checked={filters.category === cat.id}
                          onChange={() => setFilters({ ...filters, category: cat.id })}
                          className="text-magenta-600 focus:ring-magenta-500"
                        />
                        <span className="text-sm text-gray-700">{cat.icon} {cat.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="font-semibold text-magenta-800 mb-3">Price Range</h4>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border-2 border-magenta-200 focus:border-magenta-500 focus:outline-none text-sm"
                  >
                    <option value="">Any Price</option>
                    <option value="0-500">Under ₹500</option>
                    <option value="500-1000">₹500 - ₹1,000</option>
                    <option value="1000-2000">₹1,000 - ₹2,000</option>
                    <option value="2000-99999">Above ₹2,000</option>
                  </select>
                </div>

                {/* Occasion */}
                <div>
                  <h4 className="font-semibold text-magenta-800 mb-3">Occasion</h4>
                  <select
                    value={filters.occasion}
                    onChange={(e) => setFilters({ ...filters, occasion: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border-2 border-magenta-200 focus:border-magenta-500 focus:outline-none text-sm"
                  >
                    <option value="">Any Occasion</option>
                    <option value="birthday">Birthday</option>
                    <option value="wedding">Wedding</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="valentine">Valentine's Day</option>
                    <option value="corporate">Corporate</option>
                  </select>
                </div>

                {/* Dietary */}
                <div>
                  <h4 className="font-semibold text-magenta-800 mb-3">Dietary</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.isEggless}
                        onChange={(e) => setFilters({ ...filters, isEggless: e.target.checked })}
                        className="rounded text-magenta-600 focus:ring-magenta-500"
                      />
                      <span className="text-sm text-gray-700">🥚 Eggless Only</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.isVegan}
                        onChange={(e) => setFilters({ ...filters, isVegan: e.target.checked })}
                        className="rounded text-magenta-600 focus:ring-magenta-500"
                      />
                      <span className="text-sm text-gray-700">🌱 Vegan Only</span>
                    </label>
                  </div>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={() => setFilters({
                    category: '',
                    occasion: '',
                    priceRange: '',
                    isEggless: false,
                    isVegan: false,
                    sortBy: 'popular'
                  })}
                  className="w-full py-2 text-magenta-600 hover:text-magenta-800 text-sm font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            </motion.div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-magenta-600">
                Showing <strong>{filteredProducts.length}</strong> products
              </p>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                className="px-4 py-2 rounded-xl border-2 border-magenta-200 focus:border-magenta-500 focus:outline-none text-sm"
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
              </select>
            </div>

            {/* Products */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <span className="text-6xl mb-4 block">🔍</span>
                <h3 className="text-xl font-semibold text-magenta-800 mb-2">No products found</h3>
                <p className="text-magenta-600">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

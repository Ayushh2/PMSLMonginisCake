import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const GiftFinder = () => {
  const [filters, setFilters] = useState({
    gender: '',
    age: '',
    occasion: '',
    giftType: '',
    location: '',
    priceRange: ''
  });

  // Confetti/celebration pattern
  const confetti = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 4 + Math.random() * 8,
    color: ['#db2777', '#ec4899', '#f472b6', '#be185d', '#fce7f3'][Math.floor(Math.random() * 5)]
  }));

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Celebration background */}
      <div className="absolute inset-0 bg-gradient-to-br from-magenta-50 via-white to-pink-50" />
      
      {/* Confetti pattern */}
      {confetti.map((c) => (
        <motion.div
          key={c.id}
          className="absolute rounded-full"
          style={{
            left: `${c.x}%`,
            top: `${c.y}%`,
            width: c.size,
            height: c.size,
            backgroundColor: c.color
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}

      {/* Gift boxes decoration */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-20 left-10 text-6xl hidden lg:block"
      >
        🎁
      </motion.div>
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-20 right-10 text-5xl hidden lg:block"
      >
        🎀
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-5xl mb-4 block">🎁</span>
          <h2 className="text-4xl md:text-5xl text-magenta-800 font-bold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Find the <span style={{ fontFamily: "'Great Vibes', cursive" }} className="text-magenta-600">Perfect</span> Gift
          </h2>
          <p className="text-magenta-600 text-lg max-w-2xl mx-auto">
            Tell us about the recipient and we'll help you find the ideal sweet surprise
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-2xl p-8 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-magenta-700 mb-2">Gender</label>
              <select
                value={filters.gender}
                onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-magenta-200 focus:border-magenta-500 focus:outline-none bg-magenta-50/50"
              >
                <option value="">Any</option>
                <option value="male">For Him</option>
                <option value="female">For Her</option>
                <option value="other">Anyone</option>
              </select>
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-magenta-700 mb-2">Age Group</label>
              <select
                value={filters.age}
                onChange={(e) => setFilters({ ...filters, age: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-magenta-200 focus:border-magenta-500 focus:outline-none bg-magenta-50/50"
              >
                <option value="">Any</option>
                <option value="kids">Kids (1-12)</option>
                <option value="teens">Teens (13-19)</option>
                <option value="adults">Adults (20-50)</option>
                <option value="seniors">Seniors (50+)</option>
              </select>
            </div>

            {/* Occasion */}
            <div>
              <label className="block text-sm font-medium text-magenta-700 mb-2">Occasion</label>
              <select
                value={filters.occasion}
                onChange={(e) => setFilters({ ...filters, occasion: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-magenta-200 focus:border-magenta-500 focus:outline-none bg-magenta-50/50"
              >
                <option value="">Any</option>
                <option value="birthday">Birthday</option>
                <option value="anniversary">Anniversary</option>
                <option value="valentine">Valentine's Day</option>
                <option value="wedding">Wedding</option>
                <option value="corporate">Corporate</option>
              </select>
            </div>

            {/* Gift Type */}
            <div>
              <label className="block text-sm font-medium text-magenta-700 mb-2">Gift Type</label>
              <select
                value={filters.giftType}
                onChange={(e) => setFilters({ ...filters, giftType: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-magenta-200 focus:border-magenta-500 focus:outline-none bg-magenta-50/50"
              >
                <option value="">Any</option>
                <option value="cakes">Cakes</option>
                <option value="chocolates">Chocolates</option>
                <option value="hampers">Gift Hampers</option>
                <option value="pastries">Pastries</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-magenta-700 mb-2">Delivery City</label>
              <select
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-magenta-200 focus:border-magenta-500 focus:outline-none bg-magenta-50/50"
              >
                <option value="">Any</option>
                <option value="mumbai">Mumbai</option>
                <option value="delhi">Delhi</option>
                <option value="bangalore">Bangalore</option>
                <option value="chennai">Chennai</option>
                <option value="pune">Pune</option>
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-magenta-700 mb-2">Price Range</label>
              <select
                value={filters.priceRange}
                onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-magenta-200 focus:border-magenta-500 focus:outline-none bg-magenta-50/50"
              >
                <option value="">Any</option>
                <option value="0-500">Under ₹500</option>
                <option value="500-1000">₹500 - ₹1,000</option>
                <option value="1000-2000">₹1,000 - ₹2,000</option>
                <option value="2000+">Above ₹2,000</option>
              </select>
            </div>
          </div>

          <div className="text-center">
            <Link to={`/shop?occasion=${filters.occasion}&type=${filters.giftType}`}>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(219, 39, 119, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-4 bg-gradient-to-r from-magenta-600 to-pink-600 text-white rounded-full font-semibold text-lg shadow-xl inline-flex items-center gap-3"
              >
                <span>Find Perfect Gifts</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

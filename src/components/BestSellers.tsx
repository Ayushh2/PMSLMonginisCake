import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { ProductCard } from './ProductCard';

export const BestSellers = React.memo(() => {
  // Memoize filtered products to avoid recalculation
  const bestSellers = useMemo(() => products.filter(p => p.isBestSeller).slice(0, 8), []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block text-5xl mb-4"
          >
            ⭐
          </motion.span>
          <h2 className="text-4xl md:text-5xl text-magenta-800 font-bold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            <span style={{ fontFamily: "'Great Vibes', cursive" }} className="text-magenta-600">Best</span> Sellers
          </h2>
          <p className="text-magenta-600 text-lg max-w-2xl mx-auto">
            Our most loved cakes, handpicked by thousands of happy customers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {bestSellers.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/shop?sort=bestseller">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 border-2 border-magenta-600 text-magenta-600 rounded-full font-semibold text-lg hover:bg-magenta-50 transition-colors inline-flex items-center gap-2"
            >
              View All Best Sellers
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
});

BestSellers.displayName = 'BestSellers';

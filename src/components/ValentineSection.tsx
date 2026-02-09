import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { ProductCard } from './ProductCard';

export const ValentineSection = () => {
  const valentineProducts = products.filter(p => p.occasion.includes('valentine')).slice(0, 4);

  // Floating hearts
  const hearts = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4,
    size: 10 + Math.random() * 20
  }));

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Love-themed background */}
      <div className="absolute inset-0 bg-gradient-to-br from-magenta-100 via-pink-50 to-rose-100" />
      
      {/* Heart pattern overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 24 24' fill='%23db2777'%3E%3Cpath d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px'
      }} />

      {/* Floating hearts animation */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-magenta-400 pointer-events-none"
          style={{ left: `${heart.x}%`, bottom: -50 }}
          animate={{
            y: [0, -800],
            x: [0, Math.sin(heart.id) * 50],
            opacity: [0, 1, 1, 0],
            rotate: [0, 360]
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          <svg width={heart.size} height={heart.size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}

      <div className="relative max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <span className="text-6xl">💕</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl text-magenta-800 font-bold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            <span className="font-script text-5xl md:text-6xl text-magenta-600" style={{ fontFamily: "'Great Vibes', cursive" }}>Valentine's</span>
            {' '}Day Special
          </h2>
          <p className="text-magenta-600 text-lg max-w-2xl mx-auto">
            Express your love with our romantic collection of cakes, chocolates, and sweet surprises
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {valentineProducts.map((product, index) => (
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
          <Link to="/events/valentine">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(219, 39, 119, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-gradient-to-r from-magenta-600 to-pink-600 text-white rounded-full font-semibold text-lg shadow-xl inline-flex items-center gap-3"
            >
              <span>View Valentine Collection</span>
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                ❤️
              </motion.span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

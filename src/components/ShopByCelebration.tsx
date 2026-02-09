import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { occasions } from '../data/products';

export const ShopByCelebration = () => {
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
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block text-5xl mb-4"
          >
            🎉
          </motion.span>
          <h2 className="text-4xl md:text-5xl text-magenta-800 font-bold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Shop by <span style={{ fontFamily: "'Great Vibes', cursive" }} className="text-magenta-600">Celebration</span>
          </h2>
          <p className="text-magenta-600 text-lg max-w-2xl mx-auto">
            Make every occasion memorable with our specially curated collections
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {occasions.map((occasion, index) => (
            <motion.div
              key={occasion.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/events/${occasion.id}`}>
                <motion.div
                  whileHover={{ y: -10 }}
                  whileTap={{ scale: 0.95 }}
                  className="group text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    className="relative w-24 h-24 md:w-28 md:h-28 mx-auto mb-4 rounded-full overflow-hidden shadow-lg"
                  >
                    <img
                      src={occasion.image}
                      alt={occasion.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-magenta-600/30 group-hover:bg-magenta-600/10 transition-colors" />
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center text-4xl"
                      whileHover={{ scale: 1.2 }}
                    >
                      {occasion.icon}
                    </motion.div>
                  </motion.div>
                  <h3 className="font-semibold text-magenta-800 group-hover:text-magenta-600 transition-colors">
                    {occasion.name}
                  </h3>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

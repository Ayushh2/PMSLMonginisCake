import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { categories } from '../data/products';

export const BrowseCategory = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-magenta-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl text-magenta-800 font-bold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Browse by <span style={{ fontFamily: "'Great Vibes', cursive" }} className="text-magenta-600">Category</span>
          </h2>
          <p className="text-magenta-600 text-lg">
            Find exactly what you're craving
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/shop/${category.id}`}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer shadow-xl"
                >
                  <motion.img
                    src={category.image}
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-magenta-900/80 via-magenta-800/40 to-transparent" />
                  
                  {/* Icon */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl opacity-20 group-hover:opacity-30 transition-opacity"
                  >
                    {category.icon}
                  </motion.div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <span className="text-3xl mb-2 block">{category.icon}</span>
                        <h3 className="text-2xl font-bold text-white font-playfair">
                          {category.name}
                        </h3>
                      </div>
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white group-hover:bg-white group-hover:text-magenta-600 transition-colors"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Hover border */}
                  <div className="absolute inset-0 border-4 border-white/0 group-hover:border-white/50 rounded-3xl transition-colors" />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

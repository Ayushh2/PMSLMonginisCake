import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { categories } from '../data/products';

export const ShopByMenu = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-magenta-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl text-magenta-800 font-bold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            <span style={{ fontFamily: "'Great Vibes', cursive" }} className="text-magenta-600">Shop</span> by Menu
          </h2>
          <p className="text-magenta-600 text-lg">Explore our delicious categories</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/shop/${category.id}`}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer"
                >
                  <div className="aspect-square relative overflow-hidden">
                    <motion.img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-magenta-900/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <span className="text-3xl mb-2 block">{category.icon}</span>
                      <h3 className="font-semibold text-lg">{category.name}</h3>
                    </div>
                  </div>
                  <motion.div
                    className="absolute inset-0 border-4 border-magenta-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

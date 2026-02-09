import { useState } from 'react';
import { motion } from 'framer-motion';

export const CorporatePage = () => {
  const [activeTab, setActiveTab] = useState('bulk');
  
  const features = [
    { icon: '📦', title: 'Bulk Orders', desc: 'Order 50+ items with special corporate pricing' },
    { icon: '🎨', title: 'Custom Branding', desc: 'Your logo printed on cakes and packaging' },
    { icon: '📄', title: 'GST Invoice', desc: 'Proper invoicing for business expenses' },
    { icon: '📅', title: 'Subscription Plans', desc: 'Monthly/quarterly sweet subscriptions' },
    { icon: '🚚', title: 'Pan-India Delivery', desc: 'Deliver to multiple office locations' },
    { icon: '💼', title: 'Dedicated Manager', desc: 'Personal account manager for large orders' }
  ];

  const testimonials = [
    { company: 'Tech Corp India', text: 'Monginis has been our go-to for all office celebrations!', person: 'HR Manager' },
    { company: 'Finance Plus', text: 'The branded cakes for our annual event were a huge hit.', person: 'Admin Head' },
    { company: 'StartUp Hub', text: 'Their subscription plan saves us so much time every month.', person: 'Office Manager' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-magenta-50 to-white">
      {/* Hero */}
      <div className="bg-gradient-to-r from-magenta-800 via-magenta-700 to-pink-700 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <span className="text-6xl mb-6 block">💼</span>
            <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-4">
              Corporate Solutions
            </h1>
            <p className="text-xl text-magenta-100 max-w-2xl mx-auto">
              Sweeten your corporate events with Monginis. From office parties to client gifts, we've got you covered.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-playfair text-3xl md:text-4xl text-magenta-800 font-bold text-center mb-12"
        >
          Why Choose Monginis for Business?
        </motion.h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <span className="text-4xl mb-4 block">{feature.icon}</span>
              <h3 className="font-semibold text-xl text-magenta-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tabs Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center gap-4 mb-12">
            {[
              { id: 'bulk', label: '📦 Bulk Orders' },
              { id: 'subscription', label: '📅 Subscriptions' },
              { id: 'custom', label: '🎨 Custom Cakes' }
            ].map(tab => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-magenta-600 text-white shadow-lg'
                    : 'bg-magenta-100 text-magenta-700 hover:bg-magenta-200'
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>

          {activeTab === 'bulk' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid md:grid-cols-2 gap-8 items-center"
            >
              <div>
                <h3 className="font-playfair text-3xl text-magenta-800 font-bold mb-4">
                  Bulk Order Benefits
                </h3>
                <ul className="space-y-3">
                  {[
                    'Minimum 50 items for corporate pricing',
                    'Up to 30% discount on large orders',
                    'Dedicated delivery coordination',
                    'Custom packaging available',
                    'Flexible payment terms',
                    'Priority production scheduling'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700">
                      <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-8 px-8 py-4 bg-gradient-to-r from-magenta-600 to-pink-600 text-white rounded-full font-semibold shadow-lg"
                >
                  Request Quote
                </motion.button>
              </div>
              <div className="bg-magenta-50 rounded-3xl p-8">
                <h4 className="font-semibold text-magenta-800 mb-4">Quick Quote Calculator</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-magenta-700 mb-1">Product Type</label>
                    <select className="w-full px-4 py-2 rounded-xl border-2 border-magenta-200 focus:border-magenta-500">
                      <option>Cakes</option>
                      <option>Pastries</option>
                      <option>Chocolates</option>
                      <option>Gift Hampers</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-magenta-700 mb-1">Quantity</label>
                    <input type="number" placeholder="Min 50" className="w-full px-4 py-2 rounded-xl border-2 border-magenta-200 focus:border-magenta-500" />
                  </div>
                  <div>
                    <label className="block text-sm text-magenta-700 mb-1">Delivery Date</label>
                    <input type="date" className="w-full px-4 py-2 rounded-xl border-2 border-magenta-200 focus:border-magenta-500" />
                  </div>
                  <button className="w-full py-3 bg-magenta-600 text-white rounded-xl font-semibold">
                    Get Estimated Price
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'subscription' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid md:grid-cols-3 gap-6"
            >
              {[
                { name: 'Starter', price: '₹9,999', items: ['20 cakes/month', 'Birthday reminders', 'Basic customization', 'Email support'], popular: false },
                { name: 'Business', price: '₹24,999', items: ['50 cakes/month', 'Festival specials', 'Logo branding', 'Priority support', 'Dedicated manager'], popular: true },
                { name: 'Enterprise', price: 'Custom', items: ['Unlimited orders', 'Multi-location delivery', 'Full customization', '24/7 support', 'Dedicated team'], popular: false }
              ].map((plan, i) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative bg-white rounded-2xl p-6 shadow-lg ${plan.popular ? 'ring-2 ring-magenta-500' : ''}`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-magenta-600 text-white text-sm font-semibold rounded-full">
                      Most Popular
                    </span>
                  )}
                  <h3 className="font-playfair text-2xl text-magenta-800 font-bold mb-2">{plan.name}</h3>
                  <p className="text-3xl font-bold text-magenta-700 mb-4">{plan.price}<span className="text-sm font-normal text-gray-500">/month</span></p>
                  <ul className="space-y-2 mb-6">
                    {plan.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-gray-600 text-sm">
                        <span className="text-green-500">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 rounded-xl font-semibold ${
                    plan.popular
                      ? 'bg-magenta-600 text-white'
                      : 'border-2 border-magenta-600 text-magenta-600'
                  }`}>
                    Get Started
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'custom' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid md:grid-cols-2 gap-8 items-center"
            >
              <div className="bg-gradient-to-br from-magenta-100 to-pink-100 rounded-3xl p-8 aspect-square flex items-center justify-center">
                <div className="text-center">
                  <span className="text-8xl mb-4 block">🎂</span>
                  <p className="text-magenta-700 font-medium">Your Logo Here</p>
                  <div className="mt-4 inline-block px-4 py-2 bg-white rounded-lg shadow">
                    <span className="text-magenta-800 font-bold">COMPANY NAME</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-playfair text-3xl text-magenta-800 font-bold mb-4">
                  Logo Branded Cakes
                </h3>
                <p className="text-gray-600 mb-6">
                  Make your corporate events memorable with cakes featuring your company logo. Perfect for:
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    'Product launches',
                    'Company anniversaries',
                    'Award ceremonies',
                    'Client appreciation events',
                    'Team celebrations'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700">
                      <span className="text-magenta-500">🎯</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-magenta-600 to-pink-600 text-white rounded-full font-semibold shadow-lg"
                  >
                    Upload Logo
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 border-2 border-magenta-600 text-magenta-600 rounded-full font-semibold"
                  >
                    View Gallery
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="font-playfair text-3xl text-magenta-800 font-bold text-center mb-12">
          Trusted by Leading Companies
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <p className="text-gray-600 mb-4">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-magenta-100 rounded-full flex items-center justify-center text-magenta-600 font-bold">
                  {t.company[0]}
                </div>
                <div>
                  <h4 className="font-semibold text-magenta-800">{t.company}</h4>
                  <p className="text-sm text-gray-500">{t.person}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-magenta-700 to-pink-700 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
            Ready to Partner with Monginis?
          </h2>
          <p className="text-magenta-100 mb-8">
            Get in touch with our corporate team for exclusive offers and personalized solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-magenta-700 rounded-full font-semibold shadow-lg"
            >
              📞 Call: 1800-123-4567
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold"
            >
              ✉️ corporate@monginis.com
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

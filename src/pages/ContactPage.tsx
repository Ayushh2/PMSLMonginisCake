import { useState } from 'react';
import { motion } from 'framer-motion';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const contactInfo = [
    { icon: '📍', title: 'Visit Us', info: 'Monginis House, Mumbai, Maharashtra 400001' },
    { icon: '📞', title: 'Call Us', info: '1800-123-4567 (Toll Free)' },
    { icon: '✉️', title: 'Email Us', info: 'hello@monginis.com' },
    { icon: '⏰', title: 'Working Hours', info: 'Mon-Sun: 9:00 AM - 10:00 PM' }
  ];

  const faqItems = [
    { q: 'How do I track my order?', a: 'You can track your order using the tracking link sent to your email or by calling our customer service.' },
    { q: 'Can I cancel my order?', a: 'Orders can be cancelled up to 6 hours before the scheduled delivery time for a full refund.' },
    { q: 'Do you deliver on Sundays?', a: 'Yes! We deliver 7 days a week, including holidays.' },
    { q: 'Is customization available?', a: 'Absolutely! You can add custom messages, choose flavors, and request special decorations.' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-magenta-50 to-white">
      {/* Hero */}
      <div className="bg-gradient-to-r from-magenta-700 via-magenta-600 to-pink-600 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <span className="text-5xl mb-4 block">💌</span>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
              Get in Touch
            </h1>
            <p className="text-magenta-100 text-lg max-w-2xl mx-auto">
              Have questions or feedback? We'd love to hear from you!
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl shadow-xl p-8"
          >
            {submitted ? (
              <div className="text-center py-12">
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: 2 }}
                  className="text-6xl mb-4 block"
                >
                  ✅
                </motion.span>
                <h3 className="font-playfair text-2xl text-magenta-800 font-bold mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-600 mb-6">
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-magenta-600 hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h2 className="font-playfair text-2xl text-magenta-800 font-bold mb-6">
                  Send us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-magenta-700 mb-2">Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-magenta-200 focus:border-magenta-500 focus:outline-none"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-magenta-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-magenta-200 focus:border-magenta-500 focus:outline-none"
                        placeholder="+91 9876543210"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-magenta-700 mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-magenta-200 focus:border-magenta-500 focus:outline-none"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-magenta-700 mb-2">Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-magenta-200 focus:border-magenta-500 focus:outline-none"
                    >
                      <option value="">Select a topic</option>
                      <option value="order">Order Inquiry</option>
                      <option value="delivery">Delivery Issue</option>
                      <option value="feedback">Feedback</option>
                      <option value="complaint">Complaint</option>
                      <option value="corporate">Corporate Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-magenta-700 mb-2">Message *</label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border-2 border-magenta-200 focus:border-magenta-500 focus:outline-none resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-magenta-600 to-pink-600 text-white rounded-xl font-semibold text-lg shadow-lg"
                  >
                    Send Message
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="grid grid-cols-2 gap-4">
              {contactInfo.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-5 shadow-lg"
                >
                  <span className="text-3xl mb-3 block">{item.icon}</span>
                  <h4 className="font-semibold text-magenta-800 mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.info}</p>
                </motion.div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="bg-gradient-to-br from-magenta-100 to-pink-100 rounded-2xl h-64 flex items-center justify-center">
              <div className="text-center">
                <span className="text-5xl mb-2 block">📍</span>
                <p className="text-magenta-700 font-medium">Monginis HQ, Mumbai</p>
                <button className="mt-3 px-4 py-2 bg-magenta-600 text-white rounded-full text-sm">
                  Open in Maps
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="font-semibold text-magenta-800 mb-4">Follow Us</h4>
              <div className="flex gap-4">
                {[
                  { name: 'Facebook', icon: '📘', color: 'bg-blue-500' },
                  { name: 'Instagram', icon: '📸', color: 'bg-pink-500' },
                  { name: 'Twitter', icon: '🐦', color: 'bg-sky-500' },
                  { name: 'YouTube', icon: '▶️', color: 'bg-red-500' }
                ].map(social => (
                  <motion.a
                    key={social.name}
                    href="#"
                    whileHover={{ scale: 1.1, y: -3 }}
                    className={`w-12 h-12 ${social.color} rounded-full flex items-center justify-center text-xl shadow-lg`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="font-playfair text-3xl text-magenta-800 font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h4 className="font-semibold text-magenta-800 mb-2 flex items-start gap-2">
                  <span className="text-magenta-500">❓</span>
                  {item.q}
                </h4>
                <p className="text-gray-600 text-sm pl-6">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

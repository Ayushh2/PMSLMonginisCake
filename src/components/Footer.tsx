import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { BRAND_NAME } from '../constants/brand';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-magenta-900 to-magenta-950 text-white">
      {/* Newsletter */}
      <div className="border-b border-magenta-800">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-playfair text-2xl font-bold mb-2">Subscribe to our Newsletter</h3>
              <p className="text-magenta-300">Get exclusive offers, new arrivals & sweet surprises!</p>
            </div>
            <div className="flex w-full md:w-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-80 px-6 py-3 rounded-full bg-white/10 border border-magenta-600 focus:border-magenta-400 focus:outline-none placeholder-magenta-300"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-magenta-700 rounded-full font-semibold hover:bg-magenta-100 transition-colors"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <div className="bg-white/10 p-3 rounded-xl inline-block mb-2">
                <Logo size="lg" />
              </div>
              <p className="text-magenta-400 text-sm">{BRAND_NAME} - Since 1956</p>
            </Link>
            <p className="text-magenta-300 text-sm mb-4">
              India's favorite bakery, serving happiness through our handcrafted cakes, pastries, and chocolates for over 65 years.
            </p>
            <div className="flex gap-3">
              {['facebook', 'instagram', 'twitter', 'youtube'].map((social) => (
                <motion.a
                  key={social}
                  href={`https://${social}.com/monginis`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -3 }}
                  className="w-10 h-10 bg-magenta-800 rounded-full flex items-center justify-center hover:bg-magenta-700 transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  {social === 'facebook' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/></svg>
                  )}
                  {social === 'instagram' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12,2.16c3.2,0,3.58,0,4.85.07,3.25.15,4.77,1.69,4.92,4.92.06,1.27.07,1.65.07,4.85s0,3.58-.07,4.85c-.15,3.23-1.66,4.77-4.92,4.92-1.27.06-1.65.07-4.85.07s-3.58,0-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s0-3.58.07-4.85C2.38,3.92,3.9,2.38,7.15,2.23,8.42,2.18,8.8,2.16,12,2.16ZM12,0C8.74,0,8.33,0,7.05.07c-4.27.2-6.78,2.71-7,7C0,8.33,0,8.74,0,12s0,3.67.07,4.95c.2,4.27,2.71,6.78,7,7C8.33,24,8.74,24,12,24s3.67,0,4.95-.07c4.27-.2,6.78-2.71,7-7C24,15.67,24,15.26,24,12s0-3.67-.07-4.95c-.2-4.27-2.71-6.78-7-7C15.67,0,15.26,0,12,0Zm0,5.84A6.16,6.16,0,1,0,18.16,12,6.16,6.16,0,0,0,12,5.84ZM12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16ZM18.41,4.15a1.44,1.44,0,1,0,1.44,1.44A1.44,1.44,0,0,0,18.41,4.15Z"/></svg>
                  )}
                  {social === 'twitter' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.95,4.57a10,10,0,0,1-2.82.77,4.96,4.96,0,0,0,2.16-2.72,9.9,9.9,0,0,1-3.12,1.19,4.92,4.92,0,0,0-8.39,4.49A14,14,0,0,1,1.64,3.16,4.92,4.92,0,0,0,3.16,9.72,4.86,4.86,0,0,1,.96,9.11v.06a4.93,4.93,0,0,0,3.95,4.83,4.86,4.86,0,0,1-2.22.08,4.93,4.93,0,0,0,4.6,3.42A9.87,9.87,0,0,1,0,19.54a13.94,13.94,0,0,0,7.55,2.21A13.9,13.9,0,0,0,21.56,7.7c0-.21,0-.42,0-.63A10,10,0,0,0,24,4.59Z"/></svg>
                  )}
                  {social === 'youtube' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.5,6.19a3.02,3.02,0,0,0-2.12-2.14C19.5,3.5,12,3.5,12,3.5s-7.5,0-9.38.55A3.02,3.02,0,0,0,.5,6.19,31.67,31.67,0,0,0,0,12a31.67,31.67,0,0,0,.5,5.81,3.02,3.02,0,0,0,2.12,2.14c1.88.55,9.38.55,9.38.55s7.5,0,9.38-.55a3.02,3.02,0,0,0,2.12-2.14A31.67,31.67,0,0,0,24,12,31.67,31.67,0,0,0,23.5,6.19ZM9.55,15.57V8.43L15.82,12Z"/></svg>
                  )}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['About Us', 'Our Story', 'Franchise', 'Careers', 'Blog'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-magenta-300 hover:text-white transition-colors text-sm">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Shop</h4>
            <ul className="space-y-2">
              {[
                { name: 'Cakes', path: '/shop/cakes' },
                { name: 'Pastries', path: '/shop/pastries' },
                { name: 'Chocolates', path: '/shop/chocolates' },
                { name: 'Breads', path: '/shop/breads' },
                { name: 'Gift Hampers', path: '/shop/hampers' }
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-magenta-300 hover:text-white transition-colors text-sm">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Celebrations */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Celebrations</h4>
            <ul className="space-y-2">
              {[
                { name: 'Birthday', path: '/events/birthday' },
                { name: 'Wedding', path: '/events/wedding' },
                { name: 'Anniversary', path: '/events/anniversary' },
                { name: 'Valentine', path: '/events/valentine' },
                { name: 'Corporate', path: '/events/corporate' }
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-magenta-300 hover:text-white transition-colors text-sm">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-magenta-300">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Monginis House, Mumbai, Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>1800-123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>hello@monginis.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Payment & Trust */}
      <div className="border-t border-magenta-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-magenta-400">We Accept:</span>
              <div className="flex gap-2">
                {['💳', '🏦', '📱'].map((icon, i) => (
                  <span key={i} className="text-2xl">{icon}</span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-magenta-400">
              <span>🔒 Secure Payments</span>
              <span>•</span>
              <span>✓ FSSAI Certified</span>
              <span>•</span>
              <span>⭐ 4.8/5 Rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-magenta-950 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-magenta-400">
          <p>© {new Date().getFullYear()} Monginis. All rights reserved. Made with ❤️ in India</p>
        </div>
      </div>
    </footer>
  );
};

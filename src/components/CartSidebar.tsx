import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const CartSidebar = () => {
  const { state, toggleCart, removeFromCart, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    toggleCart();
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    toggleCart();
    navigate('/shop');
  };

  return (
    <AnimatePresence>
      {state.isOpen && (
        <>
          {/* Backdrop - z-index 200 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            style={{ zIndex: 200 }}
          />

          {/* Sidebar - z-index 201 */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
            style={{ zIndex: 201 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-magenta-100">
              <h2 className="font-playfair text-2xl text-magenta-800 font-bold">Your Cart</h2>
              <button
                onClick={toggleCart}
                className="p-2 hover:bg-magenta-100 rounded-full transition-colors"
                type="button"
              >
                <svg className="w-6 h-6 text-magenta-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {state.items.length === 0 ? (
                <div className="text-center py-12">
                  <span className="text-6xl mb-4 block">🛒</span>
                  <h3 className="text-xl font-semibold text-magenta-800 mb-2">Your cart is empty</h3>
                  <p className="text-magenta-600 mb-6">Add some delicious treats!</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleContinueShopping}
                    className="px-6 py-3 bg-magenta-600 text-white rounded-full font-semibold"
                    type="button"
                  >
                    Start Shopping
                  </motion.button>
                </div>
              ) : (
                <div className="space-y-4">
                  {state.items.map((item) => (
                    <motion.div
                      key={`${item.product.id}-${item.weight}-${item.flavor}`}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className="flex gap-4 p-4 bg-magenta-50 rounded-2xl"
                    >
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 cake-image-container">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-magenta-800 text-sm">{item.product.name}</h4>
                        <p className="text-xs text-magenta-500">{item.weight} • {item.flavor}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-magenta-600 hover:bg-magenta-100 transition-colors"
                              type="button"
                            >
                              -
                            </button>
                            <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-7 h-7 bg-white rounded-full flex items-center justify-center text-magenta-600 hover:bg-magenta-100 transition-colors"
                              type="button"
                            >
                              +
                            </button>
                          </div>
                          <span className="font-bold text-magenta-700">₹{item.product.price * item.quantity}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1 text-magenta-400 hover:text-magenta-600 self-start"
                        type="button"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {state.items.length > 0 && (
              <div className="border-t border-magenta-100 p-6 space-y-4">
                {/* Coupon */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    className="flex-1 px-4 py-2 rounded-full border-2 border-magenta-200 focus:border-magenta-500 focus:outline-none text-sm"
                  />
                  <button 
                    className="px-4 py-2 bg-magenta-100 text-magenta-700 rounded-full font-medium text-sm hover:bg-magenta-200 transition-colors"
                    type="button"
                  >
                    Apply
                  </button>
                </div>

                {/* Summary */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-magenta-600">
                    <span>Subtotal</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-magenta-600">
                    <span>Delivery</span>
                    <span className="text-green-600">{totalPrice >= 500 ? 'FREE' : '₹50'}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-magenta-800 pt-2 border-t border-magenta-100">
                    <span>Total</span>
                    <span>₹{totalPrice + (totalPrice >= 500 ? 0 : 50)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  className="w-full py-4 bg-gradient-to-r from-magenta-600 to-pink-600 text-white rounded-full font-semibold text-lg shadow-lg"
                  type="button"
                >
                  Proceed to Checkout
                </motion.button>

                <button 
                  onClick={handleContinueShopping}
                  className="block w-full text-center text-magenta-600 hover:text-magenta-800 text-sm"
                  type="button"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
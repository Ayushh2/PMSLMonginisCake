import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const CheckoutPage = () => {
  const { state, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: 'Mumbai',
    pincode: '',
    deliveryDate: '',
    deliveryTime: '',
    message: '',
    paymentMethod: ''
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const deliverySlots = [
    '9:00 AM - 12:00 PM',
    '12:00 PM - 3:00 PM',
    '3:00 PM - 6:00 PM',
    '6:00 PM - 9:00 PM',
    'Midnight (11:45 PM - 12:15 AM)'
  ];

  const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: '📱', desc: 'Google Pay, PhonePe, Paytm' },
    { id: 'card', name: 'Credit/Debit Card', icon: '💳', desc: 'Visa, Mastercard, Rupay' },
    { id: 'wallet', name: 'Wallet', icon: '👛', desc: 'Paytm, Amazon Pay, MobiKwik' },
    { id: 'cod', name: 'Cash on Delivery', icon: '💵', desc: 'Pay when you receive' },
    { id: 'emi', name: 'EMI', icon: '📊', desc: 'Easy monthly installments' },
    { id: 'paylater', name: 'Pay Later', icon: '⏰', desc: 'Simpl, LazyPay, ZestMoney' }
  ];

  const handleSubmit = () => {
    setOrderPlaced(true);
    clearCart();
  };

  const deliveryCharge = totalPrice >= 500 ? 0 : 50;
  const finalTotal = totalPrice + deliveryCharge;

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-magenta-50 to-white flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center max-w-lg"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: 3 }}
            className="text-8xl mb-6"
          >
            🎉
          </motion.div>
          <h1 className="font-playfair text-3xl md:text-4xl text-magenta-800 font-bold mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-magenta-600 mb-6">
            Thank you for your order. We'll send you a confirmation email shortly.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Order ID: #MNG{Date.now().toString().slice(-8)}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-magenta-600 text-white rounded-full font-semibold"
              >
                Continue Shopping
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 border-magenta-600 text-magenta-600 rounded-full font-semibold"
            >
              Track Order
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-magenta-50 to-white flex items-center justify-center p-4">
        <div className="text-center">
          <span className="text-6xl mb-4 block">🛒</span>
          <h2 className="text-2xl font-bold text-magenta-800 mb-4">Your cart is empty</h2>
          <Link to="/shop" className="text-magenta-600 hover:underline">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-magenta-50 to-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="font-playfair text-3xl md:text-4xl text-magenta-800 font-bold text-center mb-8">
          Checkout
        </h1>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          {['Delivery', 'Payment', 'Confirm'].map((label, i) => (
            <div key={label} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                step > i + 1 ? 'bg-green-500 text-white' :
                step === i + 1 ? 'bg-magenta-600 text-white' :
                'bg-magenta-200 text-magenta-600'
              }`}>
                {step > i + 1 ? '✓' : i + 1}
              </div>
              <span className={`ml-2 font-medium ${step >= i + 1 ? 'text-magenta-700' : 'text-gray-400'}`}>
                {label}
              </span>
              {i < 2 && (
                <div className={`w-16 md:w-24 h-1 mx-4 rounded ${step > i + 1 ? 'bg-green-500' : 'bg-magenta-200'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
            >
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="font-playfair text-2xl text-magenta-800 font-bold mb-6">
                    Delivery Details
                  </h2>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-magenta-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-magenta-200 focus:border-magenta-500 focus:outline-none"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-magenta-700 mb-2">Phone *</label>
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
                    <label className="block text-sm font-medium text-magenta-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-magenta-200 focus:border-magenta-500 focus:outline-none"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-magenta-700 mb-2">Delivery Address *</label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-magenta-200 focus:border-magenta-500 focus:outline-none"
                      rows={3}
                      placeholder="House/Flat No., Building, Street, Area"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-magenta-700 mb-2">City</label>
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-magenta-200 focus:border-magenta-500 focus:outline-none"
                      >
                        <option>Mumbai</option>
                        <option>Delhi</option>
                        <option>Bangalore</option>
                        <option>Chennai</option>
                        <option>Pune</option>
                        <option>Hyderabad</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-magenta-700 mb-2">Pincode *</label>
                      <input
                        type="text"
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-magenta-200 focus:border-magenta-500 focus:outline-none"
                        placeholder="400001"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-magenta-700 mb-2">Delivery Date *</label>
                      <input
                        type="date"
                        value={formData.deliveryDate}
                        onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 rounded-xl border-2 border-magenta-200 focus:border-magenta-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-magenta-700 mb-2">Delivery Time Slot *</label>
                      <select
                        value={formData.deliveryTime}
                        onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-magenta-200 focus:border-magenta-500 focus:outline-none"
                      >
                        <option value="">Select Time Slot</option>
                        {deliverySlots.map(slot => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-magenta-700 mb-2">Message on Cake (Optional)</label>
                    <input
                      type="text"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-magenta-200 focus:border-magenta-500 focus:outline-none"
                      placeholder="Happy Birthday John!"
                      maxLength={30}
                    />
                    <p className="text-xs text-gray-500 mt-1">Max 30 characters</p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep(2)}
                    className="w-full py-4 bg-gradient-to-r from-magenta-600 to-pink-600 text-white rounded-xl font-semibold text-lg"
                  >
                    Continue to Payment
                  </motion.button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="font-playfair text-2xl text-magenta-800 font-bold mb-6">
                    Payment Method
                  </h2>

                  <div className="grid gap-4">
                    {paymentMethods.map(method => (
                      <motion.button
                        key={method.id}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                        className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                          formData.paymentMethod === method.id
                            ? 'border-magenta-600 bg-magenta-50'
                            : 'border-gray-200 hover:border-magenta-300'
                        }`}
                      >
                        <span className="text-3xl">{method.icon}</span>
                        <div className="flex-1">
                          <h4 className="font-semibold text-magenta-800">{method.name}</h4>
                          <p className="text-sm text-gray-500">{method.desc}</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 ${
                          formData.paymentMethod === method.id
                            ? 'border-magenta-600 bg-magenta-600'
                            : 'border-gray-300'
                        }`}>
                          {formData.paymentMethod === method.id && (
                            <svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 py-4 border-2 border-magenta-600 text-magenta-600 rounded-xl font-semibold"
                    >
                      Back
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setStep(3)}
                      disabled={!formData.paymentMethod}
                      className="flex-1 py-4 bg-gradient-to-r from-magenta-600 to-pink-600 text-white rounded-xl font-semibold disabled:opacity-50"
                    >
                      Review Order
                    </motion.button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="font-playfair text-2xl text-magenta-800 font-bold mb-6">
                    Order Summary
                  </h2>

                  {/* Delivery Info */}
                  <div className="bg-magenta-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-magenta-800">Delivery Details</h4>
                      <button onClick={() => setStep(1)} className="text-sm text-magenta-600 hover:underline">Edit</button>
                    </div>
                    <p className="text-gray-700">{formData.name}</p>
                    <p className="text-gray-600 text-sm">{formData.address}</p>
                    <p className="text-gray-600 text-sm">{formData.city} - {formData.pincode}</p>
                    <p className="text-gray-600 text-sm">📅 {formData.deliveryDate} | ⏰ {formData.deliveryTime}</p>
                  </div>

                  {/* Payment Info */}
                  <div className="bg-magenta-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-magenta-800">Payment Method</h4>
                      <button onClick={() => setStep(2)} className="text-sm text-magenta-600 hover:underline">Edit</button>
                    </div>
                    <p className="text-gray-700">
                      {paymentMethods.find(m => m.id === formData.paymentMethod)?.icon}{' '}
                      {paymentMethods.find(m => m.id === formData.paymentMethod)?.name}
                    </p>
                  </div>

                  {/* Items */}
                  <div className="space-y-3">
                    {state.items.map(item => (
                      <div key={item.product.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                        <img src={item.product.image} alt={item.product.name} className="w-16 h-16 rounded-lg object-cover" />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">{item.product.name}</h4>
                          <p className="text-sm text-gray-500">{item.weight} × {item.quantity}</p>
                        </div>
                        <span className="font-semibold text-magenta-700">₹{item.product.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep(2)}
                      className="flex-1 py-4 border-2 border-magenta-600 text-magenta-600 rounded-xl font-semibold"
                    >
                      Back
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSubmit}
                      className="flex-1 py-4 bg-gradient-to-r from-magenta-600 to-pink-600 text-white rounded-xl font-semibold"
                    >
                      Place Order - ₹{finalTotal}
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
              <h3 className="font-playfair text-xl text-magenta-800 font-bold mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                {state.items.map(item => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.product.name} × {item.quantity}</span>
                    <span className="font-medium">₹{item.product.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-magenta-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery</span>
                  <span className={deliveryCharge === 0 ? 'text-green-600' : ''}>
                    {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold text-magenta-800 pt-2 border-t border-magenta-100">
                  <span>Total</span>
                  <span>₹{finalTotal}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 rounded-xl text-center">
                <span className="text-green-700 text-sm">🎁 You're saving ₹{state.items.reduce((acc, item) => acc + ((item.product.originalPrice || item.product.price) - item.product.price) * item.quantity, 0)}!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

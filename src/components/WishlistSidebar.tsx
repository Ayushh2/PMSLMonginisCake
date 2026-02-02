import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag, Trash2, Share2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const WishlistSidebar: React.FC = () => {
  const { wishlistItems, isWishlistOpen, closeWishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (item: typeof wishlistItems[0]) => {
    addToCart(item, item.weights[0] || '500g', item.flavors[0] || 'Regular', 1);
    removeFromWishlist(item.id);
  };

  const handleShare = async () => {
    const shareText = `Check out my wishlist on Monginis!\n\n${wishlistItems.map(item => `• ${item.name} - ₹${item.price}`).join('\n')}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Monginis Wishlist',
          text: shareText,
          url: window.location.origin,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Wishlist copied to clipboard!');
    }
  };

  const handleExploreCakes = () => {
    closeWishlist();
    navigate('/shop');
  };

  const handleContinueShopping = () => {
    closeWishlist();
    navigate('/shop');
  };

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <>
          {/* Backdrop - z-index 200 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeWishlist}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            style={{ zIndex: 200 }}
          />

          {/* Sidebar - z-index 201 */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
            style={{ zIndex: 201 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-pink-600 to-rose-500 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <Heart className="w-6 h-6 fill-white" />
                  </motion.div>
                  <div>
                    <h2 className="text-xl font-bold">My Wishlist</h2>
                    <p className="text-sm text-pink-100">{wishlistItems.length} items saved</p>
                  </div>
                </div>
                <button
                  onClick={closeWishlist}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  type="button"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            {wishlistItems.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="w-32 h-32 bg-pink-100 rounded-full flex items-center justify-center mb-6"
                >
                  <Heart className="w-16 h-16 text-pink-300" />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Your wishlist is empty</h3>
                <p className="text-gray-500 text-center mb-6">
                  Start adding your favorite cakes and treats to your wishlist!
                </p>
                <button
                  onClick={handleExploreCakes}
                  className="flex items-center gap-2 bg-gradient-to-r from-pink-600 to-rose-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-shadow"
                  type="button"
                >
                  Explore Cakes
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <>
                {/* Actions Bar */}
                <div className="flex items-center justify-between p-4 border-b bg-gray-50">
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium"
                    type="button"
                  >
                    <Share2 className="w-4 h-4" />
                    Share Wishlist
                  </button>
                  <button
                    onClick={clearWishlist}
                    className="flex items-center gap-2 text-gray-500 hover:text-red-500 font-medium"
                    type="button"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear All
                  </button>
                </div>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  <AnimatePresence>
                    {wishlistItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50, height: 0, marginBottom: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex">
                          {/* Image */}
                          <div className="relative w-28 h-28 flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                            {item.isEggless && (
                              <span className="absolute top-1 left-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded">
                                Eggless
                              </span>
                            )}
                            {/* Monginis Watermark */}
                            <div className="absolute bottom-1 right-1 bg-white/80 backdrop-blur-sm rounded px-1 py-0.5">
                              <span className="text-[8px] font-bold text-pink-600">MONGINIS</span>
                            </div>
                          </div>

                          {/* Details */}
                          <div className="flex-1 p-3 flex flex-col">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-semibold text-gray-800 line-clamp-1">{item.name}</h4>
                                {item.weights && item.weights.length > 0 && (
                                  <span className="text-xs text-gray-500">{item.weights[0]}</span>
                                )}
                                {item.rating && (
                                  <div className="flex items-center gap-1 mt-1">
                                    <span className="text-yellow-400">★</span>
                                    <span className="text-xs text-gray-600">{item.rating}</span>
                                  </div>
                                )}
                              </div>
                              <button
                                onClick={() => removeFromWishlist(item.id)}
                                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                type="button"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="mt-auto flex items-center justify-between">
                              <div>
                                <span className="text-lg font-bold text-pink-600">₹{item.price}</span>
                                {item.originalPrice && (
                                  <span className="text-sm text-gray-400 line-through ml-2">
                                    ₹{item.originalPrice}
                                  </span>
                                )}
                              </div>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleAddToCart(item)}
                                className="flex items-center gap-1.5 bg-gradient-to-r from-pink-600 to-rose-500 text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-shadow"
                                type="button"
                              >
                                <ShoppingBag className="w-4 h-4" />
                                Add
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Footer */}
                <div className="border-t bg-gray-50 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-600">Total Value:</span>
                    <span className="text-xl font-bold text-pink-600">
                      ₹{wishlistItems.reduce((sum, item) => sum + item.price, 0).toLocaleString()}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      wishlistItems.forEach(item => handleAddToCart(item));
                    }}
                    className="w-full bg-gradient-to-r from-pink-600 to-rose-500 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
                    type="button"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Add All to Cart
                  </motion.button>
                  <button
                    onClick={handleContinueShopping}
                    className="block w-full text-center text-pink-600 font-medium mt-3 hover:underline"
                    type="button"
                  >
                    Continue Shopping
                  </button>
                </div>
              </>
            )}

            {/* Decorative Hearts */}
            <div className="absolute top-20 left-4 opacity-10 pointer-events-none">
              <Heart className="w-16 h-16 text-pink-600 fill-pink-600" />
            </div>
            <div className="absolute bottom-32 right-4 opacity-10 pointer-events-none">
              <Heart className="w-12 h-12 text-pink-600 fill-pink-600" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WishlistSidebar;
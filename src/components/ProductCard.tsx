import React, { useState, useEffect, useCallback, memo, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Clock, Plus, Minus, Check } from 'lucide-react';
import { Product } from '../data/products';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import LogoWatermark from './LogoWatermark';

interface ProductCardProps {
  product: Product;
  index?: number;
}

// Memoize ProductCard to prevent unnecessary rerenders from parent lists
export const ProductCard: React.FC<ProductCardProps> = memo(({ product, index = 0 }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart, updateQuantity, removeFromCart, state } = useCart();
  const cartItems = state.items;
  const isWishlisted = isInWishlist(product.id);
  
  const [showControls, setShowControls] = useState(false);
  const [showAddedFeedback, setShowAddedFeedback] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Get current quantity from cart
  const getCartQuantity = useCallback(() => {
    const item = cartItems?.find((cartItem) => cartItem.product.id === product.id);
    return item?.quantity || 0;
  }, [cartItems, product.id]);

  const [localQuantity, setLocalQuantity] = useState(getCartQuantity());

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Sync local quantity with cart whenever cartItems changes
  useEffect(() => {
    const cartQty = getCartQuantity();
    setLocalQuantity(cartQty);
    
    // Show controls if there's quantity
    if (cartQty > 0) {
      setShowControls(true);
    }
  }, [cartItems, getCartQuantity]);

  // Handle mouse/touch events for showing controls
  const handleMouseEnter = () => {
    if (!isMobile) {
      setShowControls(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && localQuantity === 0) {
      setShowControls(false);
    }
  };

  const handleTouchStart = () => {
    if (isMobile) {
      setShowControls(true);
    }
  };

  const handleWishlistToggle = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const defaultWeight = product.weights?.[0] || '500g';
    const defaultFlavor = product.flavors?.[0] || 'Regular';
    
    addToCart(product, defaultWeight, defaultFlavor, 1);
    setLocalQuantity(1);
    
    setShowAddedFeedback(true);
    setTimeout(() => setShowAddedFeedback(false), 1500);
  };

  const handleIncrement = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const newQty = localQuantity + 1;
    setLocalQuantity(newQty);
    
    if (localQuantity === 0) {
      const defaultWeight = product.weights?.[0] || '500g';
      const defaultFlavor = product.flavors?.[0] || 'Regular';
      addToCart(product, defaultWeight, defaultFlavor, 1);
    } else if (updateQuantity) {
      updateQuantity(product.id, newQty);
    }
  };

  const handleDecrement = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (localQuantity > 0) {
      const newQty = localQuantity - 1;
      setLocalQuantity(newQty);
      
      if (newQty === 0) {
        if (removeFromCart) {
          removeFromCart(product.id);
        }
        if (!isMobile) {
          setShowControls(false);
        }
      } else if (updateQuantity) {
        updateQuantity(product.id, newQty);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 relative"
    >
      <Link to={`/product/${product.id}`}>
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-pink-50 to-white">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {product.isEggless && (
              <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-lg">
                🥬 Eggless
              </span>
            )}
            {product.isVegan && (
              <span className="bg-emerald-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-lg">
                🌱 Vegan
              </span>
            )}
            {product.isBestSeller && (
              <span className="bg-gradient-to-r from-pink-600 to-rose-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-lg">
                ⭐ Best Seller
              </span>
            )}
            {product.isNew && (
              <span className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-lg">
                ✨ New
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleWishlistToggle}
            onTouchEnd={handleWishlistToggle}
            className={`absolute top-3 right-3 p-2.5 rounded-full shadow-lg transition-all duration-300 z-10 ${
              isWishlisted 
                ? 'bg-pink-600 text-white' 
                : 'bg-white/90 backdrop-blur-sm text-gray-600 hover:text-pink-600 hover:bg-white'
            }`}
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-white' : ''}`} />
          </motion.button>

          {/* 24h Delivery Badge */}
          {product.deliveryIn24h && localQuantity === 0 && !showControls && (
            <div className="absolute bottom-3 left-3 z-10">
              <span className="flex items-center gap-1 bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-lg">
                <Clock className="w-3 h-3" />
                24hr Delivery
              </span>
            </div>
          )}

          {/* Quantity Controls Overlay */}
          <AnimatePresence>
            {(showControls || localQuantity > 0) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-3 left-3 right-3 z-20"
              >
                <div className="bg-white/95 backdrop-blur-md rounded-full shadow-xl p-1.5 flex items-center justify-center border border-pink-200">
                  {localQuantity > 0 ? (
                    <div className="flex items-center w-full justify-between px-1">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleDecrement}
                        onTouchEnd={handleDecrement}
                        className="w-10 h-10 rounded-full bg-pink-100 hover:bg-pink-200 active:bg-pink-300 flex items-center justify-center text-magenta-600 transition-colors"
                      >
                        <Minus className="w-5 h-5" />
                      </motion.button>
                      
                      <motion.span
                        key={localQuantity}
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        className="text-lg font-bold text-magenta-700 min-w-[40px] text-center"
                      >
                        {localQuantity}
                      </motion.span>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleIncrement}
                        onTouchEnd={handleIncrement}
                        className="w-10 h-10 rounded-full bg-gradient-to-r from-magenta-600 to-pink-500 flex items-center justify-center text-white shadow-md transition-colors active:opacity-80"
                      >
                        <Plus className="w-5 h-5" />
                      </motion.button>
                    </div>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddToCart}
                      onTouchEnd={handleAddToCart}
                      className="w-full bg-gradient-to-r from-magenta-600 to-pink-500 text-white py-2.5 rounded-full font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:opacity-90 transition-all"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Add to Cart
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Added Feedback */}
          <AnimatePresence>
            {showAddedFeedback && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="absolute inset-0 bg-green-500/90 flex items-center justify-center z-30"
              >
                <div className="text-center text-white">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: 'spring' }}
                    className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2"
                  >
                    <Check className="w-8 h-8" />
                  </motion.div>
                  <p className="font-semibold">Added to Cart!</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Logo Watermark */}
          <LogoWatermark position="bottom-right" size="28px" />
        </div>

        {/* Content */}
        <div className="p-4">
          <span className="text-xs text-pink-500 font-medium uppercase tracking-wider">
            {product.category}
          </span>

          <h3 className="font-semibold text-gray-800 mt-1 line-clamp-2 group-hover:text-pink-700 transition-colors min-h-[2.5rem]">
            {product.name}
          </h3>

          <div className="flex items-center gap-1 mt-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-200'}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm text-gray-500">({product.reviews})</span>
          </div>

          {/* Price & Quantity */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex flex-col">
              <span className="text-xl font-bold text-pink-600">₹{product.price}</span>
              {product.originalPrice && (
                <div className="flex items-center gap-1 flex-wrap">
                  <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
                  <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-semibold">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                </div>
              )}
            </div>

            {/* Always visible quantity controls */}
            <div className="flex-shrink-0">
              {localQuantity > 0 ? (
                <div className="flex items-center bg-gradient-to-r from-pink-50 to-magenta-50 rounded-full border border-pink-200 p-0.5">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleDecrement}
                    onTouchEnd={handleDecrement}
                    className="w-8 h-8 rounded-full bg-white hover:bg-pink-100 active:bg-pink-200 flex items-center justify-center text-magenta-600 transition-colors shadow-sm"
                  >
                    <Minus className="w-4 h-4" />
                  </motion.button>
                  <motion.span
                    key={localQuantity}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className="w-8 text-center text-sm font-bold text-magenta-700"
                  >
                    {localQuantity}
                  </motion.span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleIncrement}
                    onTouchEnd={handleIncrement}
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-magenta-600 to-pink-500 flex items-center justify-center text-white shadow-md transition-colors active:opacity-80"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddToCart}
                  onTouchEnd={handleAddToCart}
                  className="w-10 h-10 bg-gradient-to-r from-magenta-600 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl active:opacity-90 transition-all"
                >
                  <Plus className="w-5 h-5" />
                </motion.button>
              )}
            </div>
          </div>

          {/* Weights */}
          {product.weights && product.weights.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {product.weights.slice(0, 3).map((weight) => (
                <span key={weight} className="text-xs bg-pink-50 text-pink-600 px-2 py-1 rounded-full border border-pink-100">
                  {weight}
                </span>
              ))}
              {product.weights.length > 3 && (
                <span className="text-xs bg-gray-50 text-gray-500 px-2 py-1 rounded-full">
                  +{product.weights.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;

import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Box, Heart, Share2 } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/ProductCard';
import { Cake3DViewer } from '../components/Cake3DViewer';
import LogoWatermark from '../components/LogoWatermark';

export const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const product = products.find(p => p.id === id);
  
  const [selectedWeight, setSelectedWeight] = useState(product?.weights[0] || '');
  const [selectedFlavor, setSelectedFlavor] = useState(product?.flavors[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [show3DViewer, setShow3DViewer] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <div className="text-center">
          <span className="text-6xl mb-4 block">🎂</span>
          <h2 className="text-2xl font-bold text-magenta-800 mb-4">Product not found</h2>
          <Link to="/shop" className="text-magenta-600 hover:underline">Back to Shop</Link>
        </div>
      </div>
    );
  }

  // Generate multiple images for gallery
  const productImages = [
    product.image,
    product.image,
    product.image,
  ];

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedWeight, selectedFlavor, quantity);
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  // Determine cake type for 3D viewer based on flavor
  const getCakeType = () => {
    const flavor = selectedFlavor.toLowerCase();
    if (flavor.includes('chocolate')) return 'chocolate';
    if (flavor.includes('vanilla')) return 'vanilla';
    if (flavor.includes('strawberry')) return 'strawberry';
    if (flavor.includes('red velvet')) return 'redvelvet';
    if (flavor.includes('butterscotch')) return 'butterscotch';
    return 'chocolate';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-magenta-50 to-white pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-magenta-600 mb-6">
          <Link to="/" className="hover:text-magenta-800">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-magenta-800">Shop</Link>
          <span>/</span>
          <Link to={`/shop?category=${product.category}`} className="hover:text-magenta-800 capitalize">{product.category}</Link>
          <span>/</span>
          <span className="text-magenta-800">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 mb-16">
          {/* Product Images */}
          <div>
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-xl mb-4"
            >
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <LogoWatermark />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isBestSeller && (
                  <span className="px-3 py-1 bg-magenta-600 text-white text-xs font-semibold rounded-full">Best Seller</span>
                )}
                {product.isEggless && (
                  <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">🥚 Eggless</span>
                )}
                {product.deliveryIn24h && (
                  <span className="px-3 py-1 bg-magenta-700 text-white text-xs font-semibold rounded-full">⚡ 24h Delivery</span>
                )}
              </div>

              {/* 3D View Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShow3DViewer(true)}
                className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-magenta-600 to-pink-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow"
              >
                <Box className="w-5 h-5" />
                <span>View in 3D</span>
              </motion.button>
            </motion.div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-3">
              {productImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === i ? 'border-magenta-500 ring-2 ring-magenta-200' : 'border-gray-200 hover:border-magenta-300'
                  }`}
                >
                  <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
              {/* 3D Preview Thumbnail */}
              <button
                onClick={() => setShow3DViewer(true)}
                className="w-20 h-20 rounded-lg border-2 border-dashed border-magenta-300 flex flex-col items-center justify-center bg-gradient-to-br from-magenta-50 to-pink-50 hover:border-magenta-500 transition-colors group"
              >
                <Box className="w-6 h-6 text-magenta-500 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] text-magenta-600 font-medium mt-1">3D View</span>
              </button>
            </div>
          </div>

          {/* Product Details */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="font-playfair text-3xl md:text-4xl text-magenta-800 font-bold mb-3">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-magenta-500' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-magenta-600 text-sm">{product.rating} ({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-magenta-700">₹{product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-gray-400 line-through">₹{product.originalPrice}</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Weight Selection */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-magenta-800 mb-2">Select Weight</label>
                <div className="flex flex-wrap gap-2">
                  {product.weights.map(weight => (
                    <button
                      key={weight}
                      onClick={() => setSelectedWeight(weight)}
                      className={`px-5 py-2.5 rounded-xl border-2 font-medium transition-all text-sm ${
                        selectedWeight === weight
                          ? 'border-magenta-600 bg-magenta-600 text-white'
                          : 'border-magenta-200 hover:border-magenta-400 text-magenta-700'
                      }`}
                    >
                      {weight}
                    </button>
                  ))}
                </div>
              </div>

              {/* Flavor Selection */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-magenta-800 mb-2">Select Flavor</label>
                <div className="flex flex-wrap gap-2">
                  {product.flavors.map(flavor => (
                    <button
                      key={flavor}
                      onClick={() => setSelectedFlavor(flavor)}
                      className={`px-5 py-2.5 rounded-xl border-2 font-medium transition-all text-sm ${
                        selectedFlavor === flavor
                          ? 'border-magenta-600 bg-magenta-600 text-white'
                          : 'border-magenta-200 hover:border-magenta-400 text-magenta-700'
                      }`}
                    >
                      {flavor}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-magenta-800 mb-2">Quantity</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-magenta-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 hover:bg-magenta-100 transition-colors text-magenta-700 font-bold"
                    >
                      -
                    </button>
                    <span className="px-5 py-2 font-semibold text-magenta-800">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 hover:bg-magenta-100 transition-colors text-magenta-700 font-bold"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-magenta-600 font-medium">Total: ₹{product.price * quantity}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mb-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 bg-gradient-to-r from-magenta-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Add to Cart
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleWishlistToggle}
                  className={`p-3.5 border-2 rounded-xl transition-colors ${
                    isInWishlist(product.id) 
                      ? 'border-magenta-500 bg-magenta-50 text-magenta-600' 
                      : 'border-magenta-300 text-magenta-600 hover:bg-magenta-50'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3.5 border-2 border-magenta-300 rounded-xl text-magenta-600 hover:bg-magenta-50"
                >
                  <Share2 className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-2.5 bg-magenta-50 rounded-xl">
                  <span className="text-xl">🚚</span>
                  <span className="text-xs text-magenta-700">Free Delivery Above ₹500</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 bg-magenta-50 rounded-xl">
                  <span className="text-xl">⚡</span>
                  <span className="text-xs text-magenta-700">Same Day Delivery</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 bg-magenta-50 rounded-xl">
                  <span className="text-xl">✨</span>
                  <span className="text-xs text-magenta-700">100% Fresh & Quality</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 bg-magenta-50 rounded-xl">
                  <span className="text-xl">💝</span>
                  <span className="text-xs text-magenta-700">Gift Wrapping Available</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
          <div className="flex border-b border-magenta-100 mb-6">
            {['description', 'reviews', 'delivery'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 font-medium capitalize transition-colors text-sm ${
                  activeTab === tab
                    ? 'text-magenta-700 border-b-2 border-magenta-600'
                    : 'text-gray-500 hover:text-magenta-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'description' && (
            <div className="prose max-w-none text-gray-700">
              <p className="text-base">{product.description}</p>
              <h4 className="text-magenta-800 font-semibold mt-5 mb-2">Ingredients</h4>
              <p className="text-sm">Premium flour, fresh eggs (or egg substitute for eggless), sugar, butter, cocoa powder, vanilla extract, fresh cream, and love.</p>
              <h4 className="text-magenta-800 font-semibold mt-5 mb-2">Storage Instructions</h4>
              <p className="text-sm">Store in refrigerator at 2-4°C. Best consumed within 2-3 days of delivery.</p>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-5">
              {[
                { name: 'Priya S.', rating: 5, comment: 'Absolutely delicious! The cake was fresh and beautifully decorated.', date: '2 days ago' },
                { name: 'Rahul M.', rating: 5, comment: 'Ordered for my mom\'s birthday. She loved it!', date: '1 week ago' },
                { name: 'Anita K.', rating: 4, comment: 'Great taste, timely delivery. Will order again.', date: '2 weeks ago' }
              ].map((review, i) => (
                <div key={i} className="border-b border-magenta-100 pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-magenta-800">{review.name}</span>
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className={`w-4 h-4 ${j < review.rating ? 'text-magenta-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm">{review.comment}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'delivery' && (
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start gap-3">
                <span className="text-xl">🚚</span>
                <div>
                  <h4 className="font-semibold text-magenta-800 text-sm">Standard Delivery</h4>
                  <p className="text-sm">2-3 hours in metro cities, same-day in most locations.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">⚡</span>
                <div>
                  <h4 className="font-semibold text-magenta-800 text-sm">Express Delivery</h4>
                  <p className="text-sm">Get it within 2 hours! Available in select areas.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">📦</span>
                <div>
                  <h4 className="font-semibold text-magenta-800 text-sm">Midnight Delivery</h4>
                  <p className="text-sm">Surprise your loved ones at midnight! Order before 8 PM.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="font-playfair text-2xl text-magenta-800 font-bold mb-6 text-center">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 3D Cake Viewer Modal */}
      <Cake3DViewer 
        isOpen={show3DViewer} 
        onClose={() => setShow3DViewer(false)}
        cakeName={product.name}
        cakeType={getCakeType()}
      />
    </div>
  );
};

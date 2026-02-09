import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, Phone, MapPin, Heart, ShoppingBag, 
  Gift, Settings, LogOut, Edit2, Plus, Trash2, 
  Package, Clock, CheckCircle, Truck, Star,
  CreditCard, Bell, Shield, ChevronRight, Camera
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

type TabType = 'profile' | 'orders' | 'addresses' | 'wishlist' | 'rewards' | 'settings';

export const ProfilePage: React.FC = () => {
  const { user, logout, updateUser, addAddress, removeAddress, openAuthModal } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    type: 'home' as 'home' | 'work' | 'other',
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!user) {
      openAuthModal('login-options');
      navigate('/');
    }
  }, [user, navigate, openAuthModal]);

  if (!user) return null;

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'rewards', label: 'Rewards', icon: Gift },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Mock orders
  const mockOrders = [
    {
      id: 'ORD001',
      date: '2024-01-15',
      status: 'delivered',
      items: [
        { name: 'Black Forest Cake', quantity: 1, price: 699, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=100' },
        { name: 'Chocolate Truffle Pastry', quantity: 2, price: 150, image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=100' }
      ],
      total: 999
    },
    {
      id: 'ORD002',
      date: '2024-01-20',
      status: 'out_for_delivery',
      items: [
        { name: 'Red Velvet Cake', quantity: 1, price: 899, image: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=100' }
      ],
      total: 899
    },
    {
      id: 'ORD003',
      date: '2024-01-22',
      status: 'preparing',
      items: [
        { name: 'Valentine Heart Cake', quantity: 1, price: 1299, image: 'https://images.unsplash.com/photo-1602351447937-745cb720612f?w=100' }
      ],
      total: 1299
    }
  ];

  // Mock wishlist
  const mockWishlist = [
    { id: '1', name: 'Strawberry Delight Cake', price: 799, image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=200' },
    { id: '2', name: 'Chocolate Ganache Cake', price: 899, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200' },
    { id: '3', name: 'Pineapple Fresh Cream', price: 649, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'confirmed': return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case 'preparing': return <Package className="w-5 h-5 text-orange-500" />;
      case 'out_for_delivery': return <Truck className="w-5 h-5 text-pink-500" />;
      case 'delivered': return <CheckCircle className="w-5 h-5 text-green-500" />;
      default: return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Order Pending';
      case 'confirmed': return 'Order Confirmed';
      case 'preparing': return 'Preparing';
      case 'out_for_delivery': return 'Out for Delivery';
      case 'delivered': return 'Delivered';
      default: return status;
    }
  };

  const handleSaveProfile = () => {
    updateUser({ name: editName, email: editEmail });
    setIsEditingProfile(false);
  };

  const handleAddAddress = () => {
    addAddress({
      id: Date.now().toString(),
      ...newAddress,
      isDefault: user.addresses.length === 0
    });
    setShowAddAddress(false);
    setNewAddress({ type: 'home', name: '', phone: '', address: '', city: '', pincode: '' });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-pink-600 to-pink-700 rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
              </div>
              
              <div className="relative flex items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-white text-pink-600 rounded-full flex items-center justify-center shadow-lg">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <h1 className="text-2xl font-bold font-playfair">{user.name}</h1>
                  <p className="text-pink-100">{user.email}</p>
                  <p className="text-pink-100">{user.phone}</p>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="bg-white rounded-2xl border border-pink-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Personal Information</h2>
                <button
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  className="flex items-center gap-2 text-pink-600 hover:text-pink-700"
                >
                  <Edit2 className="w-4 h-4" />
                  {isEditingProfile ? 'Cancel' : 'Edit'}
                </button>
              </div>

              {isEditingProfile ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:border-pink-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:border-pink-500 outline-none"
                    />
                  </div>
                  <button
                    onClick={handleSaveProfile}
                    className="px-6 py-3 bg-pink-600 text-white rounded-xl font-medium hover:bg-pink-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                      <User className="w-6 h-6 text-pink-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium text-gray-800">{user.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-pink-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email Address</p>
                      <p className="font-medium text-gray-800">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                      <Phone className="w-6 h-6 text-pink-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone Number</p>
                      <p className="font-medium text-gray-800">{user.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                      <Gift className="w-6 h-6 text-pink-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Loyalty Points</p>
                      <p className="font-medium text-gray-800">{user.loyaltyPoints} pts</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-pink-50 rounded-2xl p-4 text-center">
                <ShoppingBag className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">{mockOrders.length}</p>
                <p className="text-sm text-gray-500">Total Orders</p>
              </div>
              <div className="bg-pink-50 rounded-2xl p-4 text-center">
                <Heart className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">{mockWishlist.length}</p>
                <p className="text-sm text-gray-500">Wishlist Items</p>
              </div>
              <div className="bg-pink-50 rounded-2xl p-4 text-center">
                <MapPin className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">{user.addresses.length}</p>
                <p className="text-sm text-gray-500">Addresses</p>
              </div>
              <div className="bg-pink-50 rounded-2xl p-4 text-center">
                <Star className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">{user.loyaltyPoints}</p>
                <p className="text-sm text-gray-500">Reward Points</p>
              </div>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 font-playfair">My Orders</h2>
            
            {mockOrders.length > 0 ? (
              <div className="space-y-4">
                {mockOrders.map((order) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl border border-pink-100 p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="font-medium text-gray-800">Order #{order.id}</p>
                        <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString('en-IN', { dateStyle: 'long' })}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        <span className={`text-sm font-medium ${
                          order.status === 'delivered' ? 'text-green-600' :
                          order.status === 'out_for_delivery' ? 'text-pink-600' :
                          'text-orange-600'
                        }`}>
                          {getStatusText(order.status)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded-xl object-cover"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-800">{item.name}</p>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-medium text-gray-800">₹{item.price}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-pink-100">
                      <p className="text-lg font-bold text-gray-800">Total: ₹{order.total}</p>
                      <div className="flex gap-3">
                        <button className="px-4 py-2 text-pink-600 border border-pink-200 rounded-xl hover:bg-pink-50 transition-colors">
                          Track Order
                        </button>
                        <button className="px-4 py-2 bg-pink-600 text-white rounded-xl hover:bg-pink-700 transition-colors">
                          Reorder
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 text-pink-300 mx-auto mb-4" />
                <p className="text-gray-500">No orders yet</p>
                <button
                  onClick={() => navigate('/shop')}
                  className="mt-4 px-6 py-3 bg-pink-600 text-white rounded-xl hover:bg-pink-700 transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            )}
          </div>
        );

      case 'addresses':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800 font-playfair">My Addresses</h2>
              <button
                onClick={() => setShowAddAddress(true)}
                className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-xl hover:bg-pink-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Address
              </button>
            </div>

            {/* Add Address Form */}
            <AnimatePresence>
              {showAddAddress && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-pink-50 rounded-2xl p-6 overflow-hidden"
                >
                  <h3 className="font-medium text-gray-800 mb-4">Add New Address</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Address Type</label>
                      <select
                        value={newAddress.type}
                        onChange={(e) => setNewAddress({ ...newAddress, type: e.target.value as 'home' | 'work' | 'other' })}
                        className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:border-pink-500 outline-none bg-white"
                      >
                        <option value="home">Home</option>
                        <option value="work">Work</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={newAddress.name}
                        onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:border-pink-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={newAddress.phone}
                        onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:border-pink-500 outline-none"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm text-gray-600 mb-1">Address</label>
                      <textarea
                        value={newAddress.address}
                        onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                        rows={2}
                        className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:border-pink-500 outline-none resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">City</label>
                      <input
                        type="text"
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:border-pink-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Pincode</label>
                      <input
                        type="text"
                        value={newAddress.pincode}
                        onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:border-pink-500 outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => setShowAddAddress(false)}
                      className="px-4 py-2 text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddAddress}
                      className="px-4 py-2 bg-pink-600 text-white rounded-xl hover:bg-pink-700 transition-colors"
                    >
                      Save Address
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Address List */}
            <div className="grid md:grid-cols-2 gap-4">
              {user.addresses.map((address) => (
                <div
                  key={address.id}
                  className="bg-white rounded-2xl border border-pink-100 p-6 relative"
                >
                  {address.isDefault && (
                    <span className="absolute top-4 right-4 px-2 py-1 bg-pink-100 text-pink-600 text-xs font-medium rounded-full">
                      Default
                    </span>
                  )}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-pink-600" />
                    </div>
                    <span className="font-medium text-gray-800 capitalize">{address.type}</span>
                  </div>
                  <p className="font-medium text-gray-800">{address.name}</p>
                  <p className="text-gray-600 text-sm mt-1">{address.address}</p>
                  <p className="text-gray-600 text-sm">{address.city} - {address.pincode}</p>
                  <p className="text-gray-600 text-sm">{address.phone}</p>
                  <div className="flex gap-3 mt-4">
                    <button className="text-pink-600 text-sm font-medium hover:text-pink-700">
                      Edit
                    </button>
                    <button
                      onClick={() => removeAddress(address.id)}
                      className="text-red-500 text-sm font-medium hover:text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {user.addresses.length === 0 && !showAddAddress && (
              <div className="text-center py-12">
                <MapPin className="w-16 h-16 text-pink-300 mx-auto mb-4" />
                <p className="text-gray-500">No addresses saved</p>
              </div>
            )}
          </div>
        );

      case 'wishlist':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 font-playfair">My Wishlist</h2>
            
            <div className="grid md:grid-cols-3 gap-4">
              {mockWishlist.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl border border-pink-100 overflow-hidden group"
                >
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                    <button className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-red-500 hover:bg-red-50 transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                    <p className="text-pink-600 font-bold mt-1">₹{item.price}</p>
                    <button className="w-full mt-3 py-2 bg-pink-600 text-white rounded-xl hover:bg-pink-700 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {mockWishlist.length === 0 && (
              <div className="text-center py-12">
                <Heart className="w-16 h-16 text-pink-300 mx-auto mb-4" />
                <p className="text-gray-500">Your wishlist is empty</p>
                <button
                  onClick={() => navigate('/shop')}
                  className="mt-4 px-6 py-3 bg-pink-600 text-white rounded-xl hover:bg-pink-700 transition-colors"
                >
                  Explore Cakes
                </button>
              </div>
            )}
          </div>
        );

      case 'rewards':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 font-playfair">Rewards & Loyalty</h2>
            
            {/* Points Card */}
            <div className="bg-gradient-to-r from-pink-600 to-pink-700 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-100">Available Points</p>
                  <p className="text-4xl font-bold">{user.loyaltyPoints}</p>
                </div>
                <Gift className="w-16 h-16 text-white/30" />
              </div>
              <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress to next reward</span>
                  <span>{user.loyaltyPoints}/500</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white rounded-full transition-all"
                    style={{ width: `${(user.loyaltyPoints / 500) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* How to earn */}
            <div className="bg-white rounded-2xl border border-pink-100 p-6">
              <h3 className="font-bold text-gray-800 mb-4">How to Earn Points</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Shop & Earn</p>
                    <p className="text-sm text-gray-500">Earn 1 point for every ₹10 spent</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Write Reviews</p>
                    <p className="text-sm text-gray-500">Get 10 points per review with photo</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                    <User className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Refer Friends</p>
                    <p className="text-sm text-gray-500">Earn 100 points per successful referral</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Available Rewards */}
            <div className="bg-white rounded-2xl border border-pink-100 p-6">
              <h3 className="font-bold text-gray-800 mb-4">Available Rewards</h3>
              <div className="space-y-4">
                {[
                  { points: 100, reward: '₹50 Off on next order', available: true },
                  { points: 250, reward: 'Free Delivery on any order', available: true },
                  { points: 500, reward: 'Free Pastry with any cake', available: false },
                  { points: 1000, reward: '₹500 Off on orders above ₹1500', available: false },
                ].map((item, idx) => (
                  <div key={idx} className={`flex items-center justify-between p-4 rounded-xl ${item.available ? 'bg-pink-50' : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.available ? 'bg-pink-200 text-pink-600' : 'bg-gray-200 text-gray-400'}`}>
                        <Gift className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{item.reward}</p>
                        <p className="text-sm text-gray-500">{item.points} points</p>
                      </div>
                    </div>
                    <button
                      disabled={!item.available}
                      className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                        item.available 
                          ? 'bg-pink-600 text-white hover:bg-pink-700' 
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Redeem
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 font-playfair">Settings</h2>
            
            <div className="bg-white rounded-2xl border border-pink-100 overflow-hidden">
              {/* Notification Settings */}
              <div className="p-6 border-b border-pink-100">
                <div className="flex items-center gap-4 mb-4">
                  <Bell className="w-5 h-5 text-pink-600" />
                  <h3 className="font-medium text-gray-800">Notifications</h3>
                </div>
                <div className="space-y-4 ml-9">
                  {[
                    { label: 'Order Updates', enabled: true },
                    { label: 'Promotional Emails', enabled: false },
                    { label: 'SMS Notifications', enabled: true },
                    { label: 'Push Notifications', enabled: true },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-gray-600">{item.label}</span>
                      <button className={`w-12 h-6 rounded-full transition-colors ${item.enabled ? 'bg-pink-600' : 'bg-gray-200'}`}>
                        <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${item.enabled ? 'translate-x-6' : 'translate-x-0.5'}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Methods */}
              <div className="p-6 border-b border-pink-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <CreditCard className="w-5 h-5 text-pink-600" />
                    <h3 className="font-medium text-gray-800">Saved Payment Methods</h3>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Security */}
              <div className="p-6 border-b border-pink-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Shield className="w-5 h-5 text-pink-600" />
                    <h3 className="font-medium text-gray-800">Security & Privacy</h3>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Change Password */}
              <div className="p-6">
                <button className="flex items-center gap-4 w-full text-left">
                  <Edit2 className="w-5 h-5 text-pink-600" />
                  <span className="font-medium text-gray-800">Change Password</span>
                </button>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3 py-4 bg-red-50 text-red-600 rounded-2xl font-medium hover:bg-red-100 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-pink-50/30 pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 shrink-0">
            <div className="bg-white rounded-2xl border border-pink-100 p-4 sticky top-32">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      activeTab === tab.id
                        ? 'bg-pink-600 text-white'
                        : 'text-gray-600 hover:bg-pink-50'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {renderTabContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

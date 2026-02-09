import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Phone, Mail, Lock, User, Eye, EyeOff, ArrowLeft, 
  Cake, Gift, Heart, Sparkles, Shield
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, authModalView, setAuthModalView, login } = useAuth();
  
  // Form states
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpTimer, setOtpTimer] = useState(30);
  const [canResendOtp, setCanResendOtp] = useState(false);
  
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isAuthModalOpen) {
      setPhone('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setName('');
      setOtp(['', '', '', '', '', '']);
      setOtpTimer(30);
      setCanResendOtp(false);
    }
  }, [isAuthModalOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isAuthModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isAuthModalOpen]);

  // OTP Timer
  useEffect(() => {
    if ((authModalView === 'login-otp' || authModalView === 'signup-otp' || authModalView === 'reset-otp') && otpTimer > 0) {
      const timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else if (otpTimer === 0) {
      setCanResendOtp(true);
    }
  }, [authModalView, otpTimer]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOtp = () => {
    setOtpTimer(30);
    setCanResendOtp(false);
    setOtp(['', '', '', '', '', '']);
  };

  const simulateLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      login({
        id: '1',
        name: name || 'John Doe',
        email: email || 'john@example.com',
        phone: phone || '+91 9876543210',
        addresses: [
          {
            id: '1',
            type: 'home',
            name: 'John Doe',
            phone: '+91 9876543210',
            address: '123, Baker Street, Andheri West',
            city: 'Mumbai',
            pincode: '400058',
            isDefault: true
          }
        ],
        orders: [],
        wishlist: [],
        loyaltyPoints: 250
      });
      setIsLoading(false);
    }, 1500);
  };

  const validatePhone = (p: string) => /^[6-9]\d{9}$/.test(p);
  const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const validatePassword = (p: string) => p.length >= 8;

  const getTitle = () => {
    switch (authModalView) {
      case 'login-options': return 'Welcome Back!';
      case 'login-phone': return 'Login with Phone';
      case 'login-email': return 'Login with Email';
      case 'login-otp': return 'Verify OTP';
      case 'login-password': return 'Enter Password';
      case 'signup': return 'Create Account';
      case 'signup-otp': return 'Verify Phone';
      case 'signup-password': return 'Set Password';
      case 'forgot-password': return 'Forgot Password';
      case 'reset-otp': return 'Verify OTP';
      case 'new-password': return 'Create New Password';
      default: return 'Welcome';
    }
  };

  const getSubtitle = () => {
    switch (authModalView) {
      case 'login-options': return 'Sign in to continue your sweet journey';
      case 'login-phone': return 'We\'ll send you a one-time password';
      case 'login-email': return 'Enter your registered email address';
      case 'login-otp': return `OTP sent to ${phone ? `+91 ${phone}` : email}`;
      case 'login-password': return `Welcome back, let's log you in`;
      case 'signup': return 'Join our family of cake lovers';
      case 'signup-otp': return `Verify your phone number +91 ${phone}`;
      case 'signup-password': return 'Create a strong password for your account';
      case 'forgot-password': return 'Enter your phone or email to reset password';
      case 'reset-otp': return `OTP sent to ${phone ? `+91 ${phone}` : email}`;
      case 'new-password': return 'Create a new password for your account';
      default: return '';
    }
  };

  const goBack = () => {
    switch (authModalView) {
      case 'login-phone':
      case 'login-email':
        setAuthModalView('login-options');
        break;
      case 'login-otp':
        setAuthModalView(phone ? 'login-phone' : 'login-email');
        break;
      case 'login-password':
        setAuthModalView('login-email');
        break;
      case 'signup':
        setAuthModalView('login-options');
        break;
      case 'signup-otp':
        setAuthModalView('signup');
        break;
      case 'signup-password':
        setAuthModalView('signup-otp');
        break;
      case 'forgot-password':
        setAuthModalView('login-email');
        break;
      case 'reset-otp':
        setAuthModalView('forgot-password');
        break;
      case 'new-password':
        setAuthModalView('reset-otp');
        break;
      default:
        setAuthModalView('login-options');
    }
  };

  const renderContent = () => {
    switch (authModalView) {
      case 'login-options':
        return (
          <div className="space-y-4">
            {/* Phone Login */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setAuthModalView('login-phone')}
              className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              type="button"
            >
              <Phone className="w-5 h-5" />
              Continue with Phone
            </motion.button>

            {/* Email Login */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setAuthModalView('login-email')}
              className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-white border-2 border-pink-200 text-pink-700 rounded-xl font-semibold hover:bg-pink-50 transition-all"
              type="button"
            >
              <Mail className="w-5 h-5" />
              Continue with Email
            </motion.button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-pink-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-pink-400">or continue with</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-3 gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-pink-300 transition-all"
                type="button"
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-6 h-6" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-pink-300 transition-all"
                type="button"
              >
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-pink-300 transition-all"
                type="button"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              </motion.button>
            </div>

            {/* Signup Link */}
            <p className="text-center text-gray-600 mt-6">
              New to Monginis?{' '}
              <button 
                onClick={() => setAuthModalView('signup')}
                className="text-pink-600 font-semibold hover:text-pink-700"
                type="button"
              >
                Create Account
              </button>
            </p>
          </div>
        );

      case 'login-phone':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <span className="text-gray-500 font-medium">+91</span>
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="Enter 10-digit number"
                  className="w-full pl-14 pr-4 py-4 border-2 border-pink-200 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all text-lg"
                />
              </div>
              {phone && !validatePhone(phone) && (
                <p className="text-red-500 text-sm">Please enter a valid 10-digit phone number</p>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={!validatePhone(phone) || isLoading}
              onClick={() => {
                setOtpTimer(30);
                setCanResendOtp(false);
                setAuthModalView('login-otp');
              }}
              className="w-full py-4 bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
            >
              Send OTP
            </motion.button>

            <p className="text-center text-gray-600">
              Want to use password?{' '}
              <button 
                onClick={() => setAuthModalView('login-email')}
                className="text-pink-600 font-semibold hover:text-pink-700"
                type="button"
              >
                Login with Email
              </button>
            </p>
          </div>
        );

      case 'login-email':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 border-2 border-pink-200 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                />
              </div>
              {email && !validateEmail(email) && (
                <p className="text-red-500 text-sm">Please enter a valid email address</p>
              )}
            </div>

            {/* Login Method Selection */}
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={!validateEmail(email)}
                onClick={() => {
                  setOtpTimer(30);
                  setCanResendOtp(false);
                  setAuthModalView('login-otp');
                }}
                className="py-3 px-4 bg-pink-100 text-pink-700 rounded-xl font-medium hover:bg-pink-200 transition-all disabled:opacity-50"
                type="button"
              >
                Send OTP
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={!validateEmail(email)}
                onClick={() => setAuthModalView('login-password')}
                className="py-3 px-4 bg-pink-600 text-white rounded-xl font-medium hover:bg-pink-700 transition-all disabled:opacity-50"
                type="button"
              >
                Use Password
              </motion.button>
            </div>

            <p className="text-center text-gray-600">
              Prefer phone login?{' '}
              <button 
                onClick={() => setAuthModalView('login-phone')}
                className="text-pink-600 font-semibold hover:text-pink-700"
                type="button"
              >
                Use Phone Number
              </button>
            </p>
          </div>
        );

      case 'login-otp':
      case 'signup-otp':
      case 'reset-otp':
        return (
          <div className="space-y-6">
            {/* OTP Input */}
            <div className="space-y-4">
              <div className="flex justify-center gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => { otpRefs.current[index] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-12 h-14 text-center text-2xl font-bold border-2 border-pink-200 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                  />
                ))}
              </div>

              {/* Timer */}
              <div className="text-center">
                {canResendOtp ? (
                  <button 
                    onClick={handleResendOtp}
                    className="text-pink-600 font-semibold hover:text-pink-700"
                    type="button"
                  >
                    Resend OTP
                  </button>
                ) : (
                  <p className="text-gray-500">
                    Resend OTP in <span className="text-pink-600 font-semibold">{otpTimer}s</span>
                  </p>
                )}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={otp.join('').length !== 6 || isLoading}
              onClick={() => {
                if (authModalView === 'login-otp') {
                  simulateLogin();
                } else if (authModalView === 'signup-otp') {
                  setAuthModalView('signup-password');
                } else {
                  setAuthModalView('new-password');
                }
              }}
              className="w-full py-4 bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              type="button"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <>Verify OTP</>
              )}
            </motion.button>

            {/* Demo hint */}
            <p className="text-center text-gray-400 text-sm">
              For demo, enter any 6 digits
            </p>
          </div>
        );

      case 'login-password':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-4 border-2 border-pink-200 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-pink-300 text-pink-600 focus:ring-pink-500"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <button 
                onClick={() => setAuthModalView('forgot-password')}
                className="text-sm text-pink-600 font-medium hover:text-pink-700"
                type="button"
              >
                Forgot Password?
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={!password || isLoading}
              onClick={simulateLogin}
              className="w-full py-4 bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              type="button"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <>Login</>
              )}
            </motion.button>
          </div>
        );

      case 'signup':
        return (
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-pink-200 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <span className="text-gray-500 font-medium">+91</span>
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="10-digit number"
                  className="w-full pl-14 pr-4 py-3.5 border-2 border-pink-200 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-pink-200 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                />
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="w-4 h-4 mt-1 rounded border-pink-300 text-pink-600 focus:ring-pink-500"
              />
              <span className="text-sm text-gray-600">
                I agree to the{' '}
                <a href="#" className="text-pink-600 hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-pink-600 hover:underline">Privacy Policy</a>
              </span>
            </label>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={!name || !validatePhone(phone) || !validateEmail(email) || !acceptTerms}
              onClick={() => {
                setOtpTimer(30);
                setCanResendOtp(false);
                setAuthModalView('signup-otp');
              }}
              className="w-full py-4 bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
            >
              Continue
            </motion.button>

            <p className="text-center text-gray-600">
              Already have an account?{' '}
              <button 
                onClick={() => setAuthModalView('login-options')}
                className="text-pink-600 font-semibold hover:text-pink-700"
                type="button"
              >
                Login
              </button>
            </p>
          </div>
        );

      case 'signup-password':
      case 'new-password':
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {authModalView === 'new-password' ? 'New Password' : 'Create Password'}
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  className="w-full pl-12 pr-12 py-4 border-2 border-pink-200 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Password strength indicator */}
              <div className="space-y-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        password.length >= level * 3
                          ? password.length >= 12 ? 'bg-green-500' : password.length >= 8 ? 'bg-yellow-500' : 'bg-red-500'
                          : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500">
                  Use 8+ characters with letters, numbers & symbols
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full pl-12 pr-12 py-4 border-2 border-pink-200 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="text-red-500 text-sm">Passwords don't match</p>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={!validatePassword(password) || password !== confirmPassword || isLoading}
              onClick={simulateLogin}
              className="w-full py-4 bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              type="button"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <>{authModalView === 'new-password' ? 'Reset Password' : 'Create Account'}</>
              )}
            </motion.button>
          </div>
        );

      case 'forgot-password':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <span className="text-gray-500 font-medium">+91</span>
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value.replace(/\D/g, '').slice(0, 10));
                      setEmail('');
                    }}
                    placeholder="Enter 10-digit number"
                    className="w-full pl-14 pr-4 py-4 border-2 border-pink-200 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-pink-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-pink-400">or</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setPhone('');
                    }}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-4 border-2 border-pink-200 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={(!validatePhone(phone) && !validateEmail(email))}
              onClick={() => {
                setOtpTimer(30);
                setCanResendOtp(false);
                setAuthModalView('reset-otp');
              }}
              className="w-full py-4 bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
            >
              Send Reset OTP
            </motion.button>

            <p className="text-center text-gray-600">
              Remember your password?{' '}
              <button 
                onClick={() => setAuthModalView('login-options')}
                className="text-pink-600 font-semibold hover:text-pink-700"
                type="button"
              >
                Login
              </button>
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isAuthModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          style={{ zIndex: 250 }}
          onClick={closeAuthModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            style={{ zIndex: 251 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative Header */}
            <div className="relative bg-gradient-to-r from-pink-600 to-pink-700 px-6 py-8 text-white overflow-hidden">
              {/* Background decorations */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                  className="absolute -bottom-5 -left-5 w-24 h-24 bg-white/10 rounded-full"
                />
                <Cake className="absolute top-4 right-16 w-8 h-8 text-white/20" />
                <Gift className="absolute bottom-4 right-8 w-6 h-6 text-white/20" />
                <Heart className="absolute top-8 left-8 w-5 h-5 text-white/20" />
                <Sparkles className="absolute bottom-6 left-16 w-6 h-6 text-white/20" />
              </div>

              {/* Close button */}
              <button
                onClick={closeAuthModal}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                type="button"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Back button */}
              {authModalView !== 'login-options' && (
                <button
                  onClick={goBack}
                  className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  type="button"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}

              {/* Title */}
              <div className="relative text-center pt-4">
                <motion.div
                  key={authModalView}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <h2 className="text-2xl font-bold font-playfair">{getTitle()}</h2>
                  <p className="text-white/80 text-sm">{getSubtitle()}</p>
                </motion.div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <motion.div
                key={authModalView}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {renderContent()}
              </motion.div>
            </div>

            {/* Security badge */}
            <div className="px-6 pb-6 pt-2">
              <div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
                <Shield className="w-4 h-4" />
                <span>Your data is secured with 256-bit encryption</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
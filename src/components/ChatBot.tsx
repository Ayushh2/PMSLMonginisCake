import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  options?: string[];
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hello! I'm your Monginis assistant. How can I help you today?",
    isBot: true,
    options: ['Order Tracking', 'Cake Suggestions', 'Delivery Info', 'Custom Orders']
  }
];

const botResponses: Record<string, { text: string; options?: string[] }> = {
  'Order Tracking': {
    text: "I can help you track your order! Please enter your order ID or phone number.",
    options: ['Enter Order ID', 'Use Phone Number', 'Back to Menu']
  },
  'Cake Suggestions': {
    text: "Great! Let me help you find the perfect cake. What's the occasion?",
    options: ['Birthday', 'Wedding', 'Anniversary', 'Valentine', 'Just Because']
  },
  'Delivery Info': {
    text: "We offer same-day delivery in most cities! Delivery is FREE on orders above Rs.500. Orders placed before 6 PM are delivered the same day.",
    options: ['Check Delivery Areas', 'Delivery Charges', 'Back to Menu']
  },
  'Custom Orders': {
    text: "We love creating custom cakes! For custom orders, please share your design idea and preferred delivery date. Our team will get back to you within 2 hours.",
    options: ['Request Callback', 'Upload Design', 'Back to Menu']
  },
  'Birthday': {
    text: "For birthdays, I recommend our Rainbow Surprise Cake or the Royal Chocolate Truffle! Both are customer favorites.",
    options: ['View Birthday Cakes', 'Other Occasion', 'Back to Menu']
  },
  'Wedding': {
    text: "Our Wedding Elegance Tier cakes are stunning! We offer free consultation for wedding orders above Rs.5000.",
    options: ['View Wedding Cakes', 'Book Consultation', 'Back to Menu']
  },
  'Anniversary': {
    text: "For anniversaries, the Heart-Shaped Love Cake or Pink Velvet Dream would be perfect!",
    options: ['View Anniversary Cakes', 'Other Occasion', 'Back to Menu']
  },
  'Valentine': {
    text: "Make it special with our Valentine Rose Cake or Heart Chocolate Box! Order now for guaranteed delivery.",
    options: ['View Valentine Collection', 'Other Occasion', 'Back to Menu']
  },
  'Back to Menu': {
    text: "How else can I help you today?",
    options: ['Order Tracking', 'Cake Suggestions', 'Delivery Info', 'Custom Orders']
  }
};

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');

  const handleOptionClick = useCallback((option: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: option,
      isBot: false
    };
    setMessages(prev => [...prev, userMessage]);

    // Add bot response after a short delay
    setTimeout(() => {
      const response = botResponses[option] || {
        text: "I'm sorry, I didn't understand that. Let me connect you with our team.",
        options: ['Back to Menu']
      };
      const botMessage: Message = {
        id: Date.now() + 1,
        text: response.text,
        isBot: true,
        options: response.options
      };
      setMessages(prev => [...prev, botMessage]);
    }, 500);
  }, []);

  const handleSendMessage = useCallback(() => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      isBot: false
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: "Thank you for your message! Our team will respond shortly. Is there anything else I can help you with?",
        isBot: true,
        options: ['Order Tracking', 'Cake Suggestions', 'Back to Menu']
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  }, [inputValue]);

  return (
    <>
      {/* Chat Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-magenta-600 to-pink-600 rounded-full shadow-2xl flex items-center justify-center text-white"
        style={{ boxShadow: '0 10px 40px rgba(219, 39, 119, 0.4)' }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* 24/7 Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-[5.5rem] right-6 z-50 px-2 py-1 bg-magenta-700 text-white text-xs font-bold rounded-full"
      >
        24/7
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 w-[350px] max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-magenta-600 to-pink-600 p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  🎂
                </div>
                <div>
                  <h4 className="font-semibold">Monginis Assistant</h4>
                  <p className="text-sm text-magenta-100">Online • 24/7 Support</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-magenta-50/30">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[80%] ${message.isBot ? 'order-2' : ''}`}>
                    <div
                      className={`p-3 rounded-2xl ${
                        message.isBot
                          ? 'bg-white shadow-sm text-gray-800 rounded-tl-none'
                          : 'bg-magenta-600 text-white rounded-tr-none'
                      }`}
                    >
                      {message.text}
                    </div>
                    {message.options && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {message.options.map((option) => (
                          <motion.button
                            key={option}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleOptionClick(option)}
                            className="px-3 py-1.5 bg-magenta-100 text-magenta-700 rounded-full text-sm font-medium hover:bg-magenta-200 transition-colors"
                          >
                            {option}
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-magenta-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 rounded-full border-2 border-magenta-200 focus:border-magenta-500 focus:outline-none text-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSendMessage}
                  className="w-10 h-10 bg-magenta-600 rounded-full flex items-center justify-center text-white"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Lazy wrapper that only loads heavy parts after idle/interaction
export const LazyChatBot = () => {
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    // Load after idle or first user interaction
    const scheduleLoad = () => {
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(() => setShouldMount(true), { timeout: 3000 });
      } else {
        setTimeout(() => setShouldMount(true), 2000);
      }
    };

    // Also mount on first interaction
    const handleInteraction = () => {
      setShouldMount(true);
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
    };

    window.addEventListener('click', handleInteraction, { once: true, passive: true });
    window.addEventListener('touchstart', handleInteraction, { once: true, passive: true });
    window.addEventListener('scroll', handleInteraction, { once: true, passive: true });
    
    scheduleLoad();

    return cleanup;
  }, []);

  if (!shouldMount) return null;
  return <ChatBot />;
};

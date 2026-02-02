import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    image: '/First.jpg',
    title: 'Celebrate Every Moment',
    subtitle: 'With Our Premium Handcrafted Cakes',
    cta: 'Shop Cakes',
    link: '/shop/cakes'
  },
  {
    id: 2,
    image: '/Valentine.jpg',
    title: "Valentine's Special",
    subtitle: 'Express Your Love with Sweetness',
    cta: 'View Collection',
    link: '/events/valentine'
  },
  {
    id: 3,
    image: '/Second.png',
    title: 'Dream Wedding Cakes',
    subtitle: 'Make Your Special Day Unforgettable',
    cta: 'Explore Now',
    link: '/events/wedding'
  },
  {
    id: 4,
    image: '/Chocolate.jpg',
    title: 'Premium Chocolates',
    subtitle: 'Handcrafted Belgian Delights',
    cta: 'Shop Chocolates',
    link: '/shop/chocolates'
  }
];

// Preload images for smooth transitions
const preloadImages = (imageUrls: string[]) => {
  imageUrls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
};

// Optimized slide variants for GPU-accelerated animations
const slideVariants = {
  enter: {
    opacity: 0,
    scale: 1.05,
  },
  center: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 1,
  },
};

const contentVariants = {
  enter: {
    opacity: 0,
    y: 30,
  },
  center: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -20,
  },
};

export const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set([0]));

  // Preload all images on mount
  useEffect(() => {
    const imageUrls = slides.map((slide) => slide.image);
    preloadImages(imageUrls);
    
    // Mark as loaded after a brief delay to ensure first image is ready
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Preload next image
  useEffect(() => {
    const nextIndex = (current + 1) % slides.length;
    if (!imagesLoaded.has(nextIndex)) {
      const img = new Image();
      img.onload = () => {
        setImagesLoaded((prev) => new Set([...prev, nextIndex]));
      };
      img.src = slides[nextIndex].image;
    }
  }, [current, imagesLoaded]);

  // Auto-advance slides
  useEffect(() => {
    if (!isLoaded) return;
    
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [isLoaded]);

  const goToSlide = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const currentSlide = useMemo(() => slides[current], [current]);

  return (
    <section className="relative h-[85vh] md:h-[90vh] overflow-hidden pt-32 md:pt-36">
      {/* Background Images - Using img tags for better performance */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={currentSlide.id}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              opacity: { duration: 0.5, ease: 'easeInOut' },
              scale: { duration: 0.7, ease: 'easeOut' },
            }}
            className="absolute inset-0"
            style={{
              willChange: 'opacity, transform',
            }}
          >
            {/* Use img tag instead of background-image for better performance */}
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                willChange: 'transform',
                transform: 'translateZ(0)', // Force GPU acceleration
              }}
              loading="eager"
              decoding="async"
            />
            {/* Gradient Overlay */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-magenta-950/80 via-magenta-900/50 to-transparent"
              style={{ willChange: 'opacity' }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center pb-16">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentSlide.id}
            variants={contentVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuad
            }}
            className="max-w-2xl"
            style={{ willChange: 'opacity, transform' }}
          >
            <h2
              className="text-4xl md:text-6xl lg:text-7xl text-white font-bold mb-4 leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {currentSlide.title}
            </h2>
            <p className="text-xl md:text-2xl text-magenta-100 mb-8">
              {currentSlide.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to={currentSlide.link}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="px-8 py-4 bg-white text-magenta-700 rounded-full font-semibold text-lg shadow-xl hover:bg-magenta-50 transition-colors"
                >
                  {currentSlide.cta}
                </motion.button>
              </Link>
              <Link to="/shop">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-colors"
                >
                  View All Products
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group p-1"
            aria-label={`Go to slide ${index + 1}`}
            type="button"
          >
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                current === index 
                  ? 'w-12 bg-white' 
                  : 'w-2 bg-white/50 group-hover:bg-white/70'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors hidden md:flex items-center justify-center z-10"
        aria-label="Previous slide"
        type="button"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors hidden md:flex items-center justify-center z-10"
        aria-label="Next slide"
        type="button"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Preload hidden images for instant transitions */}
      <div className="hidden" aria-hidden="true">
        {slides.map((slide, index) => (
          <img
            key={slide.id}
            src={slide.image}
            alt=""
            loading={index === 0 ? 'eager' : 'lazy'}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
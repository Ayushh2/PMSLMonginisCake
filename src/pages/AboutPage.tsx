import { motion } from 'framer-motion';
import { Heart, Award, Users, Clock, MapPin, Sparkles } from 'lucide-react';
import Logo from '../components/Logo';
import { BRAND_NAME, BRAND_TAGLINE } from '../constants/brand';

const milestones = [
  { year: '1956', title: 'The Beginning', description: 'Monginis was founded with a vision to bring joy through delicious baked goods.' },
  { year: '1970', title: 'First Expansion', description: 'Opened our 10th store, becoming a household name in Mumbai.' },
  { year: '1990', title: 'Nationwide Reach', description: 'Expanded across India with 100+ outlets.' },
  { year: '2010', title: 'Digital Journey', description: 'Launched online ordering to serve customers better.' },
  { year: '2024', title: 'Today', description: '500+ stores, millions of happy customers, and counting!' },
];

const values = [
  { icon: Heart, title: 'Made with Love', description: 'Every product is crafted with passion and care.' },
  { icon: Award, title: 'Premium Quality', description: 'Only the finest ingredients make it to your plate.' },
  { icon: Users, title: 'Customer First', description: 'Your happiness is our top priority.' },
  { icon: Clock, title: 'Since 1956', description: 'Over 65 years of baking excellence.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-magenta-600 via-pink-500 to-rose-400 py-20">
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0.2, 0.5, 0.2], 
                y: [0, -30, 0]
              }}
              transition={{ 
                duration: 4 + Math.random() * 2, 
                repeat: Infinity,
                delay: Math.random() * 2 
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              <Sparkles className="w-6 h-6 text-white/30" />
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-white p-4 rounded-2xl shadow-xl">
                <Logo size="xl" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
              About {BRAND_NAME}
            </h1>
            <p className="text-xl text-pink-100 max-w-2xl mx-auto">
              {BRAND_TAGLINE} - A legacy of love, sweetness, and celebration
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-800 mb-6">
                Our Sweet Story
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                What started as a small bakery in Mumbai has grown into one of India's most loved 
                cake and confectionery brands. For over six decades, we've been a part of your 
                celebrations, making every moment sweeter with our handcrafted delicacies.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-8 items-center"
            >
              <div>
                <img
                  src="https://images.unsplash.com/photo-1556217477-d325251ece38?w=600"
                  alt="Bakery"
                  className="rounded-2xl shadow-xl"
                />
              </div>
              <div>
                <h3 className="text-2xl font-playfair font-bold text-gray-800 mb-4">
                  Baked with Passion
                </h3>
                <p className="text-gray-600 mb-4">
                  Every day, our master bakers wake up before dawn to create fresh, delicious 
                  treats for you. We source the finest ingredients and follow time-tested recipes 
                  passed down through generations.
                </p>
                <p className="text-gray-600">
                  From classic chocolate cakes to innovative fusion desserts, we continue to 
                  evolve while staying true to our roots of quality and taste.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-b from-pink-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-800 mb-4">
              Our Values
            </h2>
            <p className="text-gray-600">What makes us who we are</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-magenta-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-800 mb-4">
              Our Journey
            </h2>
            <p className="text-gray-600">Milestones that shaped us</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`flex items-center gap-8 mb-12 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
              >
                <div className={`flex-1 ${index % 2 === 1 ? 'text-right' : ''}`}>
                  <span className="text-3xl font-playfair font-bold text-magenta-600">
                    {milestone.year}
                  </span>
                  <h3 className="text-xl font-bold text-gray-800 mt-2">{milestone.title}</h3>
                  <p className="text-gray-600 mt-1">{milestone.description}</p>
                </div>
                <div className="w-4 h-4 bg-magenta-600 rounded-full flex-shrink-0 relative">
                  <div className="absolute inset-0 bg-magenta-400 rounded-full animate-ping" />
                </div>
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-magenta-600 to-pink-500 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: '500+', label: 'Stores Nationwide' },
              { number: '65+', label: 'Years of Excellence' },
              { number: '10M+', label: 'Happy Customers' },
              { number: '100+', label: 'Cake Varieties' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-5xl font-playfair font-bold mb-2">{stat.number}</div>
                <div className="text-pink-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-800 mb-4">
              Find Us Near You
            </h2>
            <p className="text-gray-600">We're present in major cities across India</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Pune', 'Hyderabad', 'Ahmedabad', 'Jaipur', 'Lucknow'].map((city, index) => (
              <motion.div
                key={city}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-2 px-4 py-2 bg-pink-50 rounded-full text-gray-700"
              >
                <MapPin className="w-4 h-4 text-magenta-500" />
                {city}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Check, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showScrollButton, setShowScrollButton] = useState(false);
  
  const carouselRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
      setShowScrollButton(position > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scroll = (direction) => {
    if (carouselRef.current) {
      const { current } = carouselRef;
      const scrollAmount = direction === 'left' ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
  return (
    <div className="font-sans text-gray-800 overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrollPosition > 20 ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <Leaf className={`h-8 w-8 ${scrollPosition > 20 ? 'text-green-600' : 'text-white'}`} />
                <span className={`ml-2 font-bold text-xl ${scrollPosition > 20 ? 'text-gray-800' : 'text-white'}`}>CropGuard</span>
              </Link>
            </div>
            
            {/* Simplified Navigation Bar */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className={`font-medium ${scrollPosition > 20 ? 'text-gray-600 hover:text-green-600' : 'text-white hover:text-green-200'} transition-colors`}>Home</Link>
              <Link to="/about" className={`font-medium ${scrollPosition > 20 ? 'text-gray-600 hover:text-green-600' : 'text-white hover:text-green-200'} transition-colors`}>About</Link>
              <Link to="/login" className={`font-medium ${scrollPosition > 20 ? 'text-gray-600 hover:text-green-600' : 'text-white hover:text-green-200'} transition-colors`}>Login</Link>
              <Link to="/dashboard" className={`font-medium ${scrollPosition > 20 ? 'text-gray-600 hover:text-green-600' : 'text-white hover:text-green-200'} transition-colors`}>Dashboard</Link>
              <Link to="/image-upload" className={`font-medium ${scrollPosition > 20 ? 'text-gray-600 hover:text-green-600' : 'text-white hover:text-green-200'} transition-colors`}>Upload Image</Link>
                <Link to="/disease-map" className={`font-medium ${scrollPosition > 20 ? 'text-gray-600 hover:text-green-600' : 'text-white hover:text-green-200'} transition-colors`}>
    Disease Map
  </Link>
              <Link to="/register" className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition duration-300">
                Register
              </Link>
            </div>
            
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`${scrollPosition > 20 ? 'text-gray-800' : 'text-white'}`}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <div className="px-2 pt-2 pb-4 space-y-1">
              <Link to="/" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-green-50 hover:text-green-600">Home</Link>
              <Link to="/about" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-green-50 hover:text-green-600">About</Link>
              <Link to="/login" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-green-50 hover:text-green-600">Login</Link>
              <Link to="/dashboard" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-green-50 hover:text-green-600">Dashboard</Link>
              <Link to="/register" className="block mt-2 px-3 py-2 rounded-md text-center bg-green-600 text-white hover:bg-green-700">
                Register
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section with Clear Purpose */}
      <header className="bg-gradient-to-b from-green-800 to-green-600 text-white min-h-screen flex items-center relative" style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.4)), url('/src/assets/crops-background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">Crop Disease Detection</h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-100">
              Identify plant diseases instantly with AI technology. Upload photos of your crops, 
              get accurate disease identification, and receive treatment recommendations to protect your yield.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-md transition duration-300 transform hover:-translate-y-1 hover:shadow-lg text-lg flex items-center justify-center gap-2">
                Get Started <ArrowRight size={20} />
              </Link>
              <Link to="/login" className="bg-transparent hover:bg-white hover:text-green-700 text-white font-bold py-4 px-8 rounded-md border-2 border-white transition duration-300 transform hover:-translate-y-1 hover:shadow-lg text-lg">
                Login
              </Link>
            </div>
            <div className="mt-16 flex flex-wrap justify-center gap-6">
              <div className="flex items-center">
                <div className="bg-white bg-opacity-20 p-3 rounded-full">
                  <Check className="h-6 w-6 text-green-300" />
                </div>
                <span className="ml-2 text-lg">99% Accuracy</span>
              </div>
              <div className="flex items-center">
                <div className="bg-white bg-opacity-20 p-3 rounded-full">
                  <Check className="h-6 w-6 text-green-300" />
                </div>
                <span className="ml-2 text-lg">Instant Results</span>
              </div>
              <div className="flex items-center">
                <div className="bg-white bg-opacity-20 p-3 rounded-full">
                  <Check className="h-6 w-6 text-green-300" />
                </div>
                <span className="ml-2 text-lg">Treatment Guidance</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#ffffff" fillOpacity="1" d="M0,192L48,186.7C96,181,192,171,288,181.3C384,192,480,224,576,218.7C672,213,768,171,864,176C960,181,1056,235,1152,240C1248,245,1344,203,1392,181.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="text-5xl mb-4 text-center">📷</div>
            <h3 className="text-xl font-semibold mb-2 text-green-600">Upload Image</h3>
            <p className="text-gray-600">Take a photo of your crop's affected area and upload it to our system</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="text-5xl mb-4 text-center">🔍</div>
            <h3 className="text-xl font-semibold mb-2 text-green-600">AI Analysis</h3>
            <p className="text-gray-600">Our deep learning model analyzes the image to identify diseases</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="text-5xl mb-4 text-center">📊</div>
            <h3 className="text-xl font-semibold mb-2 text-green-600">Get Results</h3>
            <p className="text-gray-600">Receive accurate disease identification and treatment recommendations</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="text-5xl mb-4 text-center">📝</div>
            <h3 className="text-xl font-semibold mb-2 text-green-600">Track Progress</h3>
            <p className="text-gray-600">Monitor your crops' health and treatment effectiveness over time</p>
          </div>
        </div>
      </section>

      {/* About Our Technology */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">About Our Technology</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <p className="mb-4 text-gray-700 leading-relaxed">
                Our Crop Disease Detection system uses state-of-the-art deep learning algorithms
                trained on thousands of plant disease images to provide accurate diagnoses.
              </p>
              <p className="mb-4 text-gray-700 leading-relaxed">
                Early detection of crop diseases can significantly reduce crop losses and
                increase agricultural productivity by enabling timely intervention and treatment.
              </p>
              <Link to="/about" className="text-green-600 font-semibold hover:underline">
                Learn more about our technology →
              </Link>
            </div>
            <div className="md:w-1/2 bg-gray-300 rounded-lg min-h-[250px] flex items-center justify-center">
              <span className="text-gray-500">Drone imagery and plant health visualization</span>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Crops */}
      <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center mb-10">Supported Crops</h2>
          
          <div className="relative">
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-green-600 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div
              ref={carouselRef}
              className="flex overflow-x-auto gap-4 py-4 px-2 scrollbar-hide snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {[
                { name: 'Tomato', icon: '🍅' },
                { name: 'Potato', icon: '🥔' },
                { name: 'Corn', icon: '🌽' },
                { name: 'Rice', icon: '🌾' },
                { name: 'Wheat', icon: '🌾' },
                { name: 'Cotton', icon: '🧶' },
                { name: 'Soybean', icon: '🫘' },
                { name: 'Apple', icon: '🍎' },
                { name: 'Grape', icon: '🍇' },
                { name: 'Strawberry', icon: '🍓' },
                { name: 'Pepper', icon: '🌶️' },
                { name: 'Cucumber', icon: '🥒' }
              ].map((crop, index) => (
                <motion.div
                  key={crop.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex-shrink-0 w-48 h-48 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 snap-center"
                >
                  <div className="p-6 flex flex-col items-center justify-center h-full">
                    <span className="text-4xl mb-4">{crop.icon}</span>
                    <h3 className="text-xl font-semibold text-gray-800">{crop.name}</h3>
                    <p className="text-sm text-gray-500 mt-2">Click to learn more</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-green-600 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>
      </section>

      {/* Add this new section for Crop Statistics */}
      <section className="py-16 px-4 bg-white">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Crop Health Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Diseases Detected', value: '10,000+', icon: '🔍' },
              { title: 'Farmers Helped', value: '5,000+', icon: '👨‍🌾' },
              { title: 'Success Rate', value: '99%', icon: '📈' }
            ].map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300"
              >
                <span className="text-4xl mb-4 block">{stat.icon}</span>
                <h3 className="text-2xl font-bold text-green-600 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.title}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Enhance the Call to Action section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-16 px-4 bg-gradient-to-r from-green-600 to-green-700 text-white text-center"
      >
        <div className="max-w-3xl mx-auto">
          <motion.h2
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-4"
          >
            Ready to protect your crops?
          </motion.h2>
          <motion.p
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 text-lg"
          >
            Join thousands of farmers using our technology to increase yield and reduce losses
          </motion.p>
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              to="/register"
              className="bg-white text-green-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-md transition duration-300 inline-block transform hover:-translate-y-1 hover:shadow-lg"
            >
              Get Started Today
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white pt-12 pb-6 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Crop Disease Detection</h3>
            <p className="text-gray-300 mb-4">
              Empowering farmers with AI technology to detect and treat crop diseases early.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-green-400">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-green-400">About</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-green-400">Contact</Link></li>
              <li><Link to="/login" className="text-gray-300 hover:text-green-400">Login</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="text-gray-300 mb-2">Email: info@cropdisease.ai</p>
            <p className="text-gray-300">Phone: +1 (555) 123-4567</p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; 2025 Crop Disease Detection. All rights reserved.</p>
        </div>
      </footer>
      
      {/* Scroll to top button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-colors z-50"
          aria-label="Scroll to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default Home;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let timeout;
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      setIsScrolling(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsScrolling(false), 150);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  const menuVariants = {
    closed: { 
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: { 
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrollPosition > 20 
          ? "bg-white shadow-md py-2" 
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Leaf className={`h-8 w-8 ${
                scrollPosition > 20 ? "text-green-600" : "text-white"
              }`} />
            </motion.div>
            <span className={`ml-2 font-bold text-xl ${
              scrollPosition > 20 ? "text-gray-800" : "text-white"
            }`}>
              CropGuard
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks scrollPosition={scrollPosition} />
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden ${
              scrollPosition > 20 ? "text-gray-800" : "text-white"
            }`}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="md:hidden bg-white shadow-lg"
          >
            <div className="px-2 pt-2 pb-4 space-y-1">
              <MobileNavLinks />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const NavLinks = ({ scrollPosition }) => (
  <>
    <NavLink to="/" scrollPosition={scrollPosition}>Home</NavLink>
    <NavLink to="/about" scrollPosition={scrollPosition}>About</NavLink>
    <NavLink to="/login" scrollPosition={scrollPosition}>Login</NavLink>
    <NavLink to="/dashboard" scrollPosition={scrollPosition}>Dashboard</NavLink>
    <NavLink to="/image-upload" scrollPosition={scrollPosition}>Upload Image</NavLink>
    <NavLink to="/disease-map" scrollPosition={scrollPosition}>Disease Map</NavLink>
    <Link
      to="/register"
      className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
    >
      Register
    </Link>
    

  </>
);

const NavLink = ({ to, children, scrollPosition }) => (
  <Link
    to={to}
    className={`font-medium ${
      scrollPosition > 20
        ? "text-gray-600 hover:text-green-600"
        : "text-white hover:text-green-200"
    } transition-colors`}
  >
    {children}
  </Link>
);

const MobileNavLinks = () => (
  <>
    <MobileNavLink to="/">Home</MobileNavLink>
    <MobileNavLink to="/about">About</MobileNavLink>
    <MobileNavLink to="/login">Login</MobileNavLink>
    <MobileNavLink to="/dashboard">Dashboard</MobileNavLink>
    <MobileNavLink to="/image-upload">Upload Image</MobileNavLink>
    <MobileNavLink to="/disease-map">Disease Map</MobileNavLink>

    <Link
      to="/register"
      className="block mt-2 px-3 py-2 rounded-md text-center bg-green-600 text-white hover:bg-green-700"
    >
      Register
    </Link>
  </>
);

const MobileNavLink = ({ to, children }) => (
  <Link
    to={to}
    className="block px-3 py-2 rounded-md text-gray-700 hover:bg-green-50 hover:text-green-600"
  >
    {children}
  </Link>
);

export default Navbar; 
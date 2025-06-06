import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Home,
  Lock, 
  CheckCircle,
  AlertCircle 
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    location: '',
    phoneNumber: '',
    farmName: '',
    farmSize: '',
    farmType: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  // Password strength checker
  useEffect(() => {
    if (formData.password) {
      let strength = 0;
      // Length check
      if (formData.password.length >= 6) strength += 1;
      // Capital letter check
      if (/[A-Z]/.test(formData.password)) strength += 1;
      // Special symbol check
      if (/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) strength += 1;
      // Digit check
      if (/\d/.test(formData.password)) strength += 1;
      
      setPasswordStrength(strength);
    } else {
      setPasswordStrength(0);
    }
  }, [formData.password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear specific error when field is being edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Valid email with @ symbol is required';
    }
    
    // Location validation
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    // Phone validation
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Contact number is required';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one capital letter';
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one special character';
    } else if (!/\d/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one digit';
    }
    
    // Confirm Password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) return;
  
    setLoading(true);
  
    try {
      const { confirmPassword, ...submitData } = formData;
  
      const response = await fetch('http://localhost:8080/registration', {
        method: 'POST',
        body: JSON.stringify(submitData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        toast.success('Registration successful!');
        navigate('/login');
      } else {
        const errorData = await response.json();
        setErrors({ form: errorData.message || 'Registration failed. Please try again.' });
      }
    } catch (err) {
      setErrors({
        form: err.message || 'Network error. Please try again later.'
      });
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl w-full space-y-6 bg-white p-8 rounded-xl shadow-lg"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Farmer Registration
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join our farming community today
          </p>
          <p className="text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-green-600 hover:text-green-500 transition duration-150">
              Sign in here
            </Link>
          </p>
        </motion.div>
        
        {errors.form && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center"
            role="alert"
          >
            <AlertCircle className="h-5 w-5 mr-2" />
            <span className="block sm:inline">{errors.form}</span>
          </motion.div>
        )}
        
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Personal Information Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="border-b border-gray-200 pb-4"
          >
            <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-green-600" />
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className={`appearance-none rounded-md relative block w-full pl-10 px-3 py-2 border ${
                      errors.firstName ? 'border-red-300' : 'border-gray-300'
                    } placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm transition-colors`}
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.firstName}
                  </p>
                )}
              </div>
              
              {/* Last Name */}
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    className={`appearance-none rounded-md relative block w-full pl-10 px-3 py-2 border ${
                      errors.lastName ? 'border-red-300' : 'border-gray-300'
                    } placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm transition-colors`}
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.lastName}
                  </p>
                )}
              </div>
              
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className={`appearance-none rounded-md relative block w-full pl-10 px-3 py-2 border ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    } placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm transition-colors`}
                    placeholder="john.doe@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>
              
              {/* Phone Number */}
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    required
                    className={`appearance-none rounded-md relative block w-full pl-10 px-3 py-2 border ${
                      errors.phoneNumber ? 'border-red-300' : 'border-gray-300'
                    } placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm transition-colors`}
                    placeholder="+1 (555) 123-4567"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                  <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                {errors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.phoneNumber}
                  </p>
                )}
              </div>
              
              {/* Location */}
              <div className="md:col-span-2">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="location"
                    name="location"
                    type="text"
                    required
                    className={`appearance-none rounded-md relative block w-full pl-10 px-3 py-2 border ${
                      errors.location ? 'border-red-300' : 'border-gray-300'
                    } placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm transition-colors`}
                    placeholder="City, State, Country"
                    value={formData.location}
                    onChange={handleChange}
                  />
                  <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                {errors.location && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.location}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
          
          {/* Farm Details Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="border-b border-gray-200 pb-4"
          >
            <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
              <Home className="h-5 w-5 mr-2 text-green-600" />
              Farm Details (Optional)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Farm Name */}
              <div>
                <label htmlFor="farmName" className="block text-sm font-medium text-gray-700 mb-1">
                  Farm Name
                </label>
                <input
                  id="farmName"
                  name="farmName"
                  type="text"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Green Acres Farm"
                  value={formData.farmName}
                  onChange={handleChange}
                />
              </div>
              
              {/* Farm Size */}
              <div>
                <label htmlFor="farmSize" className="block text-sm font-medium text-gray-700 mb-1">
                  Farm Size (acres)
                </label>
                <input
                  id="farmSize"
                  name="farmSize"
                  type="text"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="e.g., 10 acres"
                  value={formData.farmSize}
                  onChange={handleChange}
                />
              </div>
              
              {/* Farm Type */}
              <div className="md:col-span-2">
                <label htmlFor="farmType" className="block text-sm font-medium text-gray-700 mb-1">
                  Farm Type
                </label>
                <select
                  id="farmType"
                  name="farmType"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  value={formData.farmType}
                  onChange={handleChange}
                >
                  <option value="">Select farm type</option>
                  <option value="Crop">Crop Farming</option>
                  <option value="Livestock">Livestock</option>
                  <option value="Dairy">Dairy</option>
                  <option value="Poultry">Poultry</option>
                  <option value="Mixed">Mixed Farming</option>
                  <option value="Organic">Organic Farming</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </motion.div>
          
          {/* Password Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
              <Lock className="h-5 w-5 mr-2 text-green-600" />
              Account Security
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'} placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password ? (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                ) : (
                  <div className="mt-1">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            passwordStrength === 0 ? 'w-0' :
                            passwordStrength === 1 ? 'w-1/4 bg-red-500' :
                            passwordStrength === 2 ? 'w-2/4 bg-yellow-500' :
                            passwordStrength === 3 ? 'w-3/4 bg-blue-500' :
                            'w-full bg-green-500'
                          }`}
                        ></div>
                      </div>
                      <span className="ml-2 text-xs text-gray-500">
                        {passwordStrength === 0 ? 'Very Weak' :
                         passwordStrength === 1 ? 'Weak' :
                         passwordStrength === 2 ? 'Medium' :
                         passwordStrength === 3 ? 'Strong' :
                         'Very Strong'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Password must be at least 6 characters with 1 capital letter, 1 number, and 1 special character.
                    </p>
                  </div>
                )}
              </div>
              
              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm`}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>
            </div>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-300 transition duration-150"
          >
            {loading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </div>
            ) : (
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                Create Account
              </div>
            )}
          </motion.button>
          
          <p className="text-xs text-center text-gray-500">
            By registering, you agree to our{' '}
            <Link to="/terms" className="text-green-600 hover:text-green-500">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-green-600 hover:text-green-500">
              Privacy Policy
            </Link>
            .
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust path as needed
import { 
  Search, 
  Filter, 
  Droplets, 
  Leaf, 
  Sun, 
  Thermometer, 
  AlertTriangle, 
  Star, 
  ChevronRight, 
  RefreshCw,
  X 
} from 'lucide-react';

/**
 * Crop Disease Treatments page component
 * Displays available treatments for crop diseases with filtering and search functionality
 */
const Treatments = () => {
  const [treatments, setTreatments] = useState([]);
  const [filteredTreatments, setFilteredTreatments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeCrop, setActiveCrop] = useState('all');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const { currentUser } = useAuth();

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Treatments', icon: <Leaf className="w-4 h-4 mr-1" /> },
    { id: 'chemical', name: 'Chemical', icon: <Droplets className="w-4 h-4 mr-1" /> },
    { id: 'biological', name: 'Biological', icon: <Leaf className="w-4 h-4 mr-1" /> },
    { id: 'cultural', name: 'Cultural', icon: <Sun className="w-4 h-4 mr-1" /> },
    { id: 'preventive', name: 'Preventive', icon: <AlertTriangle className="w-4 h-4 mr-1" /> }
  ];

  // Common crops for filtering
  const crops = [
    { id: 'all', name: 'All Crops' },
    { id: 'rice', name: 'Rice' },
    { id: 'wheat', name: 'Wheat' },
    { id: 'corn', name: 'Corn' },
    { id: 'potato', name: 'Potato' },
    { id: 'tomato', name: 'Tomato' },
    { id: 'cotton', name: 'Cotton' }
  ];

  // Fetch treatments data
  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        setIsLoading(true);
        // Replace with your actual API endpoint
        // const response = await fetch('/api/crop-treatments');
        
        // if (!response.ok) {
        //   throw new Error('Failed to fetch treatments');
        // }
        
        // const data = await response.json();
        // setTreatments(data);
        // setFilteredTreatments(data);

        // Using mock data instead of API call
        setTimeout(() => {
          setTreatments(mockTreatments);
          setFilteredTreatments(mockTreatments);
          setIsLoading(false);
        }, 800);
      } catch (err) {
        console.error('Error fetching treatments:', err);
        setError('Failed to load treatments. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchTreatments();
  }, []);

  // Mock treatment data for development
  const mockTreatments = [
    {
      id: 1,
      name: "Copper Fungicide Spray",
      category: "chemical",
      crops: ["tomato", "potato", "apple"],
      diseaseTargets: ["Late Blight", "Early Blight", "Bacterial Spot"],
      description: "A broad-spectrum fungicide that prevents infection by killing disease-causing fungi and bacteria on plant surfaces.",
      applicationMethod: "Foliar spray; apply every 7-10 days during disease-prone conditions.",
      effectiveness: 4.2,
      organicStatus: false,
      safetyLevel: "Moderate - Use proper protective equipment",
      imageUrl: "/images/fungicide.jpg"
    },
    {
      id: 2,
      name: "Bacillus subtilis Biological Control",
      category: "biological",
      crops: ["tomato", "rice", "corn", "wheat"],
      diseaseTargets: ["Powdery Mildew", "Downy Mildew", "Bacterial Spot"],
      description: "Beneficial bacteria that colonize plant roots and leaves, establishing a protective barrier against pathogens.",
      applicationMethod: "Apply as a soil drench or foliar spray every 2-4 weeks.",
      effectiveness: 3.8,
      organicStatus: true,
      safetyLevel: "High - Safe for humans and beneficial insects",
      imageUrl: "/images/bacillus.jpg"
    },
    {
      id: 3,
      name: "Crop Rotation System",
      category: "cultural",
      crops: ["all"],
      diseaseTargets: ["Soil-borne diseases", "Fungal pathogens", "Bacterial pathogens"],
      description: "Planned sequence of different crops in the same area to break disease cycles and reduce pathogen buildup in soil.",
      applicationMethod: "Plan a 3-4 year rotation of unrelated crops in the same field.",
      effectiveness: 4.5,
      organicStatus: true,
      safetyLevel: "Very High - No safety concerns",
      imageUrl: "/images/crop-rotation.jpg"
    },
    {
      id: 4,
      name: "Resistant Cultivar Selection",
      category: "preventive",
      crops: ["rice", "wheat", "potato", "cotton"],
      diseaseTargets: ["Blast", "Rust", "Late Blight", "Wilt"],
      description: "Using disease-resistant crop varieties as the first line of defense against common pathogens.",
      applicationMethod: "Select and plant disease-resistant seeds appropriate for your region.",
      effectiveness: 4.7,
      organicStatus: true,
      safetyLevel: "Very High - No safety concerns",
      imageUrl: "/images/resistant-seeds.jpg"
    },
    {
      id: 5,
      name: "Neem Oil Extract",
      category: "biological",
      crops: ["tomato", "cotton", "corn"],
      diseaseTargets: ["Powdery Mildew", "Anthracnose", "Leaf Spots"],
      description: "Natural fungicide and insecticide derived from the neem tree with multiple modes of action against pathogens.",
      applicationMethod: "Mix with water and apply as a foliar spray every 7-14 days.",
      effectiveness: 3.6,
      organicStatus: true,
      safetyLevel: "High - Safe for most beneficial insects when used correctly",
      imageUrl: "/images/neem-oil.jpg"
    },
    {
      id: 6,
      name: "Systemic Fungicide Treatment",
      category: "chemical",
      crops: ["wheat", "rice", "potato"],
      diseaseTargets: ["Rust", "Blight", "Powdery Mildew"],
      description: "Chemical treatment that moves through the plant's vascular system, protecting new growth and fighting existing infections.",
      applicationMethod: "Apply as foliar spray; typically 2-3 applications per growing season.",
      effectiveness: 4.6,
      organicStatus: false,
      safetyLevel: "Moderate - Follow safety guidelines carefully",
      imageUrl: "/images/systemic-fungicide.jpg"
    }
  ];

  // Filter treatments based on search term, active category, and crop
  useEffect(() => {
    let result = treatments;
    
    // Filter by category
    if (activeCategory !== 'all') {
      result = result.filter(treatment => treatment.category === activeCategory);
    }
    
    // Filter by crop type
    if (activeCrop !== 'all') {
      result = result.filter(treatment => 
        treatment.crops.includes(activeCrop) || treatment.crops.includes('all')
      );
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        treatment => 
          treatment.name.toLowerCase().includes(term) || 
          treatment.description.toLowerCase().includes(term) ||
          treatment.diseaseTargets.some(disease => disease.toLowerCase().includes(term))
      );
    }
    
    setFilteredTreatments(result);
  }, [searchTerm, activeCategory, activeCrop, treatments]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle category selection
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  // Handle crop selection
  const handleCropChange = (cropId) => {
    setActiveCrop(cropId);
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setActiveCategory('all');
    setActiveCrop('all');
  };

  // Get icon for treatment category
  const getCategoryIcon = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.icon : <Leaf className="w-4 h-4" />;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-green-50">
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-green-800 font-medium">Loading treatment options...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-red-50 rounded-lg border border-red-200">
        <h2 className="text-xl font-bold text-red-700 mb-2">Error</h2>
        <p className="text-red-600">{error}</p>
        <button 
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center"
          onClick={() => window.location.reload()}
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 pb-12">
      {/* Page Header */}
      <div className="bg-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold mb-4">Crop Disease Treatments</h1>
          <p className="text-green-100 max-w-3xl">
            Explore effective treatments for various crop diseases. Our recommendations are based on research and field tests to help you protect your yields and maintain healthy crops.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and filter section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start">
            {/* Search box */}
            <div className="w-full lg:w-1/3">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search Treatments
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="search"
                  placeholder="Search by name, description, or disease..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>

            {/* Desktop filters */}
            <div className="hidden lg:flex lg:flex-1 flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Treatment Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeCategory === category.id
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                      onClick={() => handleCategoryChange(category.id)}
                    >
                      {category.icon}
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Crop Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {crops.map(crop => (
                    <button
                      key={crop.id}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeCrop === crop.id
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                      onClick={() => handleCropChange(crop.id)}
                    >
                      {crop.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile filter toggle */}
            <div className="lg:hidden w-full flex justify-between">
              <button
                onClick={() => setShowMobileFilters(true)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </button>

              {(activeCategory !== 'all' || activeCrop !== 'all' || searchTerm) && (
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-red-600 bg-white hover:bg-red-50"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Active filters summary */}
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            {activeCategory !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {categories.find(cat => cat.id === activeCategory)?.name}
                <button onClick={() => setActiveCategory('all')} className="ml-1 text-green-600 hover:text-green-800">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {activeCrop !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {crops.find(c => c.id === activeCrop)?.name}
                <button onClick={() => setActiveCrop('all')} className="ml-1 text-green-600 hover:text-green-800">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {searchTerm && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Search: "{searchTerm}"
                <button onClick={() => setSearchTerm('')} className="ml-1 text-green-600 hover:text-green-800">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {(activeCategory !== 'all' || activeCrop !== 'all' || searchTerm) && (
              <button 
                onClick={resetFilters}
                className="text-sm text-green-600 hover:text-green-800 ml-2 hidden lg:inline-flex"
              >
                Reset all filters
              </button>
            )}
          </div>
        </div>

        {/* Mobile filters sidebar */}
        {showMobileFilters && (
          <div className="fixed inset-0 z-40 lg:hidden">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50" 
              onClick={() => setShowMobileFilters(false)}
            ></div>
            
            {/* Sidebar */}
            <div className="fixed right-0 top-0 bottom-0 w-full max-w-xs bg-white p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button 
                  onClick={() => setShowMobileFilters(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-md font-medium text-gray-900 mb-3">Treatment Type</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <button
                        key={category.id}
                        className={`flex items-center w-full px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          activeCategory === category.id
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                        onClick={() => handleCategoryChange(category.id)}
                      >
                        {category.icon}
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-md font-medium text-gray-900 mb-3">Crop Type</h3>
                  <div className="space-y-2">
                    {crops.map(crop => (
                      <button
                        key={crop.id}
                        className={`w-full px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          activeCrop === crop.id
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                        onClick={() => handleCropChange(crop.id)}
                      >
                        {crop.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button
                  onClick={resetFilters}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Reset
                </button>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="flex-1 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Treatment cards */}
        {filteredTreatments.length > 0 ? (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                Available Treatments 
                <span className="text-sm font-normal text-gray-500 ml-2">
                  ({filteredTreatments.length} results)
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTreatments.map(treatment => (
                <div key={treatment.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="h-48 bg-gray-200 relative">
                    {treatment.imageUrl ? (
                      <img 
                        src={treatment.imageUrl} 
                        alt={treatment.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gray-100">
                        <Leaf className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute top-0 left-0 w-full p-4 bg-gradient-to-b from-black/60 to-transparent">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 text-green-800">
                        {getCategoryIcon(treatment.category)}
                        {categories.find(cat => cat.id === treatment.category)?.name || treatment.category}
                      </span>
                      {treatment.organicStatus && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 ml-2">
                          Organic
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{treatment.name}</h3>
                    
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-1">Disease Targets:</p>
                      <div className="flex flex-wrap gap-1">
                        {treatment.diseaseTargets.slice(0, 3).map((disease, index) => (
                          <span key={index} className="px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded text-xs">
                            {disease}
                          </span>
                        ))}
                        {treatment.diseaseTargets.length > 3 && (
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded text-xs">
                            +{treatment.diseaseTargets.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-1">Suitable for:</p>
                      <div className="flex flex-wrap gap-1">
                        {treatment.crops.map((crop, index) => (
                          crop !== 'all' && index < 4 && (
                            <span key={index} className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs">
                              {crops.find(c => c.id === crop)?.name || crop}
                            </span>
                          )
                        ))}
                        {treatment.crops.includes('all') ? (
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs">All Crops</span>
                        ) : treatment.crops.length > 4 ? (
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded text-xs">
                            +{treatment.crops.length - 4} more
                          </span>
                        ) : null}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {treatment.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center bg-gray-100 px-2 py-1 rounded">
                        <div className="flex items-center text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < Math.floor(treatment.effectiveness) ? 'fill-amber-500' : 'fill-gray-200'}`} />
                          ))}
                        </div>
                        <span className="text-xs font-medium text-gray-700 ml-1">{treatment.effectiveness.toFixed(1)}</span>
                      </div>
                      
                      <Link 
                        to={`/treatments/${treatment.id}`}
                        className="inline-flex items-center px-3 py-1 text-sm font-medium text-green-700 hover:text-green-800 hover:bg-green-50 rounded-md transition-colors"
                      >
                        Details
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <div className="flex justify-center">
              <AlertTriangle className="h-12 w-12 text-yellow-500 mb-4" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No treatments found</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              We couldn't find any treatments matching your current filters. Try adjusting your search criteria or browse our full catalog.
            </p>
            <button 
              onClick={resetFilters}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors inline-flex items-center"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* Help section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-green-100 rounded-xl p-6 border border-green-200">
          <h2 className="text-xl font-semibold text-green-800 mb-2">Need Help Choosing a Treatment?</h2>
          <p className="text-green-700 mb-4">
            Not sure which treatment is best for your crop disease? Upload a photo of your affected crop for an AI-powered diagnosis and personalized treatment recommendations.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link 
              to="/disease-detection" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Diagnose Disease
            </Link>
            <Link 
              to="/consultation" 
              className="inline-flex items-center px-4 py-2 border border-green-600 text-sm font-medium rounded-md text-green-700 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Talk to an Agronomist
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Treatments;
import React, { useState } from 'react';

const MLServiceDashboard = () => {
  const [activePage, setActivePage] = useState('home');

  // Page content components
  const pages = {
    home: (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Disease Detection ML Service</h1>
        <p className="mb-4">Welcome to the disease detection machine learning service dashboard. This service provides AI-powered analysis of medical images to assist in disease detection.</p>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h2 className="text-xl font-semibold mb-2">Service Overview</h2>
          <p>Our system leverages state-of-the-art machine learning models to analyze medical images and detect potential disease indicators with high accuracy and efficiency.</p>
        </div>
      </div>
    ),
    
    models: (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">ML Models</h1>
        <p className="mb-6">Access and manage the trained machine learning models used for disease detection.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 shadow rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Lung Disease Model</h3>
            <p className="text-sm text-gray-600 mb-2">Version: 2.3.0</p>
            <p className="mb-2">Specialized in detecting pneumonia and tuberculosis markers.</p>
            <div className="flex justify-between items-center">
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
              <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">View Details</button>
            </div>
          </div>
          
          <div className="bg-white p-4 shadow rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Brain Tumor Classifier</h3>
            <p className="text-sm text-gray-600 mb-2">Version: 1.5.2</p>
            <p className="mb-2">CNN-based model for tumor detection and classification.</p>
            <div className="flex justify-between items-center">
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
              <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">View Details</button>
            </div>
          </div>
        </div>
      </div>
    ),
    
    preprocessing: (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Image Preprocessing</h1>
        <p className="mb-4">Tools and configurations for preparing images for analysis.</p>
        
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">Preprocessing Pipeline</h2>
          </div>
          <div className="p-4">
            <ol className="space-y-4">
              <li className="flex">
                <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">1</div>
                <div>
                  <h3 className="font-medium">Image Normalization</h3>
                  <p className="text-gray-600">Standardize image brightness and contrast</p>
                </div>
              </li>
              <li className="flex">
                <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">2</div>
                <div>
                  <h3 className="font-medium">Noise Reduction</h3>
                  <p className="text-gray-600">Apply Gaussian filter to reduce image noise</p>
                </div>
              </li>
              <li className="flex">
                <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">3</div>
                <div>
                  <h3 className="font-medium">Segmentation</h3>
                  <p className="text-gray-600">Isolate regions of interest in the image</p>
                </div>
              </li>
            </ol>
          </div>
          <div className="bg-gray-50 p-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Configure Preprocessing</button>
          </div>
        </div>
      </div>
    ),
    
    detection: (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Disease Detection</h1>
        <p className="mb-6">Algorithms and tools for detecting diseases from processed images.</p>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Upload New Image</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <div className="mb-3">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <p className="text-gray-600 mb-2">Drag and drop an image here, or click to browse</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Select Image</button>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">Detection Algorithms</h2>
          </div>
          <div className="divide-y">
            <div className="p-4 flex justify-between items-center">
              <div>
                <h3 className="font-medium">Pneumonia Detection</h3>
                <p className="text-sm text-gray-600">Accuracy: 94.2%</p>
              </div>
              <button className="bg-blue-500 text-white px-3 py-1 rounded">Run</button>
            </div>
            <div className="p-4 flex justify-between items-center">
              <div>
                <h3 className="font-medium">Tuberculosis Screening</h3>
                <p className="text-sm text-gray-600">Accuracy: 91.7%</p>
              </div>
              <button className="bg-blue-500 text-white px-3 py-1 rounded">Run</button>
            </div>
            <div className="p-4 flex justify-between items-center">
              <div>
                <h3 className="font-medium">Brain Tumor Detection</h3>
                <p className="text-sm text-gray-600">Accuracy: 89.5%</p>
              </div>
              <button className="bg-blue-500 text-white px-3 py-1 rounded">Run</button>
            </div>
          </div>
        </div>
      </div>
    ),
    
    api: (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">API Service</h1>
        <p className="mb-6">Information about the Flask/FastAPI service and how to interact with it.</p>
        
        <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">API Status</h2>
          </div>
          <div className="p-4">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span>Service is running</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Version:</p>
                <p className="font-medium">1.2.3</p>
              </div>
              <div>
                <p className="text-gray-600">Uptime:</p>
                <p className="font-medium">23 days, 4 hours</p>
              </div>
              <div>
                <p className="text-gray-600">Requests today:</p>
                <p className="font-medium">1,243</p>
              </div>
              <div>
                <p className="text-gray-600">Average response time:</p>
                <p className="font-medium">324 ms</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">API Documentation</h2>
          </div>
          <div className="p-4">
            <h3 className="font-medium mb-2">Endpoints</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center mb-1">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs mr-2">POST</span>
                  <code className="bg-gray-100 px-2 py-1 rounded">/api/v1/analyze</code>
                </div>
                <p className="text-sm text-gray-600">Upload and analyze a medical image</p>
              </div>
              <div>
                <div className="flex items-center mb-1">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs mr-2">GET</span>
                  <code className="bg-gray-100 px-2 py-1 rounded">/api/v1/models</code>
                </div>
                <p className="text-sm text-gray-600">List available ML models</p>
              </div>
              <div>
                <div className="flex items-center mb-1">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs mr-2">GET</span>
                  <code className="bg-gray-100 px-2 py-1 rounded">/api/v1/results/:result_id</code>
                </div>
                <p className="text-sm text-gray-600">Retrieve analysis results by ID</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    
    dependencies: (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Dependencies</h1>
        <p className="mb-6">Python packages required for the ML service.</p>
        
        <div className="bg-white shadow rounded-lg">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-semibold">Requirements.txt</h2>
            <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">Update All</button>
          </div>
          <div className="p-0">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Version</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">tensorflow</td>
                  <td className="px-6 py-4 whitespace-nowrap">2.9.0</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Up to date</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">opencv-python</td>
                  <td className="px-6 py-4 whitespace-nowrap">4.5.5</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Update available</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">fastapi</td>
                  <td className="px-6 py-4 whitespace-nowrap">0.78.0</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Up to date</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">numpy</td>
                  <td className="px-6 py-4 whitespace-nowrap">1.22.3</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Up to date</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">scikit-learn</td>
                  <td className="px-6 py-4 whitespace-nowrap">1.0.2</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Update available</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold">ML Service</h1>
        </div>
        <nav className="p-2">
          <ul>
            <li>
              <button 
                className={`w-full text-left px-4 py-2 rounded ${activePage === 'home' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                onClick={() => setActivePage('home')}
              >
                Dashboard
              </button>
            </li>
            <li>
              <button 
                className={`w-full text-left px-4 py-2 rounded ${activePage === 'models' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                onClick={() => setActivePage('models')}
              >
                Models
              </button>
            </li>
            <li>
              <button 
                className={`w-full text-left px-4 py-2 rounded ${activePage === 'preprocessing' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                onClick={() => setActivePage('preprocessing')}
              >
                Preprocessing
              </button>
            </li>
            <li>
              <button 
                className={`w-full text-left px-4 py-2 rounded ${activePage === 'detection' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                onClick={() => setActivePage('detection')}
              >
                Disease Detection
              </button>
            </li>
            <li>
              <button 
                className={`w-full text-left px-4 py-2 rounded ${activePage === 'api' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                onClick={() => setActivePage('api')}
              >
                API Service
              </button>
            </li>
            <li>
              <button 
                className={`w-full text-left px-4 py-2 rounded ${activePage === 'dependencies' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                onClick={() => setActivePage('dependencies')}
              >
                Dependencies
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {pages[activePage]}
      </div>
    </div>
  );
};

export default MLServiceDashboard;
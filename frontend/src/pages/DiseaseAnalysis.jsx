



// src/pages/DiseaseAnalysis.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
// Removed IotDashboard import
import Dashboard from './Dashboard.jsx';
import Reports from './Reports.jsx';
import Treatments from './Treatments.jsx';

const DiseaseAnalysis = () => {
  const { id } = useParams();
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchAnalysisData = async () => {
      try {
        // Fixed string template for API call
        const response = await axios.get(`/api/diseases/analysis/${id}`);
        setAnalysisData(response.data);
        // Set a default if no data is available for demo/testing
        if (!response.data) {
          setAnalysisData({
            cropType: 'Wheat',
            detectionDate: new Date().toISOString(),
            fieldName: 'North Field',
            fieldSize: '12.5 acres',
            detectedDiseases: [
              { name: 'Wheat Rust', severity: 'High', affectedArea: '32%' },
              { name: 'Powdery Mildew', severity: 'Medium', affectedArea: '18%' }
            ],
            diseaseStats: {
              healthy: 50,
              infected: 50,
              severityDistribution: { high: 32, medium: 18, low: 0 }
            },
            heatmapData: { /* Sample heatmap data */ }
          });
        }
      } catch (err) {
        setError('Failed to fetch analysis data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysisData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500 border-solid mx-auto"></div>
          <p className="mt-6 text-2xl font-semibold text-gray-800">Analyzing drone images...</p>
          <p className="mt-2 text-gray-600">We're processing your field data for accurate disease detection</p>
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-green-500 h-2.5 rounded-full animate-pulse" style={{ width: '70%' }}></div>
          </div>
          <p className="mt-4 text-sm text-gray-500">This typically takes 30-60 seconds</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
          <div className="text-red-600 mb-6">
            <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h2 className="text-2xl font-bold mt-4">{error}</h2>
            <p className="mt-2 text-gray-600">We couldn't retrieve the analysis data for this field.</p>
          </div>
          <div className="flex space-x-4 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
            >
              Try Again
            </button>
            <Link
              to="/dashboard"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-lg transition duration-200"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // For simplified rendering of disease severity badges
  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg border border-gray-200 p-4 h-full shadow-sm">
                  <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                    <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    Field Visualization
                  </h2>
                  <Dashboard fieldData={analysisData?.heatmapData} />
                </div>
              </div>
              
              <div>
                <div className="bg-white rounded-lg border border-gray-200 p-4 h-full shadow-sm">
                  <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                    <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                    Disease Distribution
                  </h2>
                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700">Healthy plants</span>
                      <span className="text-green-600 font-semibold">{analysisData?.diseaseStats?.healthy || 0}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${analysisData?.diseaseStats?.healthy || 0}%` }}></div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700">Infected plants</span>
                      <span className="text-red-600 font-semibold">{analysisData?.diseaseStats?.infected || 0}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-red-500 h-2.5 rounded-full" style={{ width: `${analysisData?.diseaseStats?.infected || 0}%` }}></div>
                    </div>
                  </div>
                  
                  {/* Replaced IotDashboard with direct severity distribution visualization */}
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-3 text-gray-700">Severity Distribution</h3>
                    <div className="space-y-3">
                      {analysisData?.diseaseStats?.severityDistribution && (
                        <>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-gray-700">High Severity</span>
                              <span className="text-sm font-medium text-red-600">{analysisData.diseaseStats.severityDistribution.high || 0}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-red-500 h-2 rounded-full" style={{ width: `${analysisData.diseaseStats.severityDistribution.high || 0}%` }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-gray-700">Medium Severity</span>
                              <span className="text-sm font-medium text-yellow-600">{analysisData.diseaseStats.severityDistribution.medium || 0}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${analysisData.diseaseStats.severityDistribution.medium || 0}%` }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-gray-700">Low Severity</span>
                              <span className="text-sm font-medium text-green-600">{analysisData.diseaseStats.severityDistribution.low || 0}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: `${analysisData.diseaseStats.severityDistribution.low || 0}%` }}></div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm mb-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
                <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                Detected Diseases
              </h2>
              <div className="space-y-4">
                {analysisData?.detectedDiseases?.map((disease, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex flex-wrap justify-between items-center mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{disease.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(disease.severity)}`}>
                        {disease.severity} Severity
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">Affected area: {disease.affectedArea}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full" 
                        style={{ width: disease.affectedArea }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        );
      case 'treatments':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
              <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              Treatment Recommendations
            </h2>
            <Treatments 
              diseases={analysisData?.detectedDiseases}
              cropType={analysisData?.cropType}
            />
          </div>
        );
      case 'reports':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
              <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Report Generation
            </h2>
            <Reports analysisId={id} analysisData={analysisData} />
          </div>
        );
      default:
        return <div>Select a tab to view content</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Disease Analysis Results</h1>
          <div className="mt-2 flex flex-wrap gap-4 items-center">
            <div className="bg-white/20 px-3 py-1 rounded-full text-sm">ID: {id}</div>
            <div className="bg-white/20 px-3 py-1 rounded-full text-sm">Crop: {analysisData?.cropType || 'Unknown'}</div>
            <div className="bg-white/20 px-3 py-1 rounded-full text-sm">Field: {analysisData?.fieldName || 'Unknown'}</div>
            <div className="bg-white/20 px-3 py-1 rounded-full text-sm">Size: {analysisData?.fieldSize || 'Unknown'}</div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 -mt-6">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center mb-6">
            <div className="rounded-full bg-green-100 p-3 mr-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Analysis Complete</h2>
              <p className="text-gray-600">
                Analyzed on: {new Date(analysisData?.detectionDate || Date.now()).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric'
                })}
              </p>
            </div>
            
            <div className="ml-auto">
              <button
                onClick={() => window.print()}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center transition duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print Report
              </button>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('treatments')}
                className={`py-4 px-1 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'treatments'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Treatment Plan
              </button>
              <button
                onClick={() => setActiveTab('reports')}
                className={`py-4 px-1 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'reports'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Reports & Export
              </button>
            </nav>
          </div>
          
          {/* Tab Content */}
          {renderTabContent()}
        </div>
        
        <div className="flex justify-between items-center">
          <Link
            to="/dashboard" 
            className="flex items-center bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </Link>
          
          <div className="text-gray-600 text-sm">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseAnalysis;
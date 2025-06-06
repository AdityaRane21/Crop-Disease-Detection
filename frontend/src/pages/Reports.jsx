//  




import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Download, Eye, Filter, LogOut, PieChart, Plus, RefreshCw } from 'lucide-react';

function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');
  const [dateRange, setDateRange] = useState('week');
  const [searchQuery, setSearchQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  useEffect(() => {
    // This would normally be an API call to fetch reports
    // For demonstration, we'll use mock data
    const mockReports = [
      { 
        id: 1, 
        title: 'Monthly Energy Usage', 
        type: 'energy',
        date: '2025-03-01', 
        summary: 'Total energy consumption reduced by 12% compared to previous month' 
      },
      { 
        id: 2, 
        title: 'Temperature Anomalies', 
        type: 'temperature',
        date: '2025-03-03', 
        summary: 'Detected 3 temperature spikes during non-operational hours' 
      },
      { 
        id: 3, 
        title: 'Device Health Status', 
        type: 'maintenance',
        date: '2025-03-05', 
        summary: '2 devices require maintenance, 1 device battery low' 
      },
      { 
        id: 4, 
        title: 'Security Alerts', 
        type: 'security',
        date: '2025-03-06', 
        summary: '1 unauthorized access attempt detected and blocked' 
      }
    ];
    
    // Simulate API call delay
    setTimeout(() => {
      setReports(mockReports);
      setLoading(false);
    }, 800);
  }, []);

  // Filter reports based on type, date range, and search query
  const filteredReports = reports.filter(report => {
    const matchesType = filterType === 'all' || report.type === filterType;
    const matchesSearch = searchQuery === '' || 
                         report.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         report.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
    // In a real application, you would also filter by date range here
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const generateReport = () => {
    setIsGenerating(true);
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      const newReport = {
        id: reports.length + 1,
        title: `New ${filterType !== 'all' ? filterType.charAt(0).toUpperCase() + filterType.slice(1) : 'Custom'} Report`,
        type: filterType !== 'all' ? filterType : 'custom',
        date: new Date().toISOString().split('T')[0],
        summary: 'Newly generated report based on current filter settings'
      };
      setReports([newReport, ...reports]);
    }, 2000);
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'energy': return 'bg-green-100 text-green-800 border-green-200';
      case 'temperature': return 'bg-red-100 text-red-800 border-red-200';
      case 'maintenance': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'security': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'energy': return <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white">E</div>;
      case 'temperature': return <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white">T</div>;
      case 'maintenance': return <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white">M</div>;
      case 'security': return <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-white">S</div>;
      default: return <div className="w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center text-white">C</div>;
    }
  };

  const refreshReports = () => {
    setLoading(true);
    // Simulate a refresh
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Smart IoT Platform</h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex items-center space-x-4">
              <Link to="/iot-dashboard" className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100">Dashboard</Link>
              <Link to="/reports" className="px-3 py-2 rounded-md text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100">Reports</Link>
              <Link to="/profile" className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100">Profile</Link>
              <button onClick={handleLogout} className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </button>
            </div>
            <div className="flex sm:hidden items-center">
              {/* Mobile menu button */}
              <button className="p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page header */}
        <div className="md:flex md:items-center md:justify-between mb-6">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Reports</h2>
            <p className="mt-1 text-sm text-gray-500">
              View and generate reports for your IoT devices and sensors
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button 
              onClick={refreshReports}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </button>
            <button
              onClick={generateReport}
              disabled={isGenerating}
              className={`ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isGenerating ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Generate Report
                </>
              )}
            </button>
            <button 
              onClick={() => setShowFiltersMobile(!showFiltersMobile)} 
              className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 md:hidden"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters - Desktop */}
          <div className={`hidden md:block bg-white rounded-lg shadow p-6 h-fit`}>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Filters</h3>
            
            {/* Search */}
            <div className="mb-4">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search Reports</label>
              <input
                type="text"
                id="search"
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Search by title or content"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Report Type Filter */}
            <div className="mb-4">
              <label htmlFor="filter-type" className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
              <select 
                id="filter-type" 
                value={filterType} 
                onChange={(e) => setFilterType(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="all">All Types</option>
                <option value="energy">Energy</option>
                <option value="temperature">Temperature</option>
                <option value="maintenance">Maintenance</option>
                <option value="security">Security</option>
              </select>
            </div>
            
            {/* Date Range Filter */}
            <div className="mb-4">
              <label htmlFor="date-range" className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-gray-400" />
                <select 
                  id="date-range" 
                  value={dateRange} 
                  onChange={(e) => setDateRange(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="day">Last 24 Hours</option>
                  <option value="week">Last Week</option>
                  <option value="month">Last Month</option>
                  <option value="quarter">Last Quarter</option>
                </select>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              <button 
                onClick={() => {
                  setFilterType('all');
                  setDateRange('week');
                  setSearchQuery('');
                }}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Reset all filters
              </button>
            </div>
          </div>
          
          {/* Filters - Mobile (conditionally shown) */}
          {showFiltersMobile && (
            <div className="md:hidden bg-white rounded-lg shadow p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium text-gray-900">Filters</h3>
                <button 
                  onClick={() => setShowFiltersMobile(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Search */}
              <div className="mb-3">
                <label htmlFor="mobile-search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                <input
                  type="text"
                  id="mobile-search"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Search reports"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Report Type Filter */}
              <div className="mb-3">
                <label htmlFor="mobile-filter-type" className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
                <select 
                  id="mobile-filter-type" 
                  value={filterType} 
                  onChange={(e) => setFilterType(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="all">All Types</option>
                  <option value="energy">Energy</option>
                  <option value="temperature">Temperature</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="security">Security</option>
                </select>
              </div>
              
              {/* Date Range Filter */}
              <div className="mb-3">
                <label htmlFor="mobile-date-range" className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                <select 
                  id="mobile-date-range" 
                  value={dateRange} 
                  onChange={(e) => setDateRange(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="day">Last 24 Hours</option>
                  <option value="week">Last Week</option>
                  <option value="month">Last Month</option>
                  <option value="quarter">Last Quarter</option>
                </select>
              </div>
              
              <div className="flex justify-between">
                <button 
                  onClick={() => {
                    setFilterType('all');
                    setDateRange('week');
                    setSearchQuery('');
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Reset all
                </button>
                <button
                  onClick={() => setShowFiltersMobile(false)}
                  className="bg-blue-600 text-white text-sm font-medium rounded-md px-4 py-2"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
          
          {/* Reports List */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow">
                <div className="flex flex-col items-center">
                  <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="mt-2 text-gray-500">Loading reports...</p>
                </div>
              </div>
            ) : (
              <>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {filteredReports.length} Report{filteredReports.length !== 1 ? 's' : ''} 
                      {filterType !== 'all' ? ` (${filterType})` : ''} 
                      {dateRange !== 'all' ? ` - ${dateRange === 'day' ? 'Last 24 Hours' : dateRange === 'week' ? 'Last Week' : dateRange === 'month' ? 'Last Month' : 'Last Quarter'}` : ''}
                    </h3>
                  </div>
                  
                  {filteredReports.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                      {filteredReports.map(report => (
                        <li key={report.id} className="p-4 hover:bg-gray-50 transition-colors duration-150">
                          <div className="flex items-start space-x-4">
                            {getTypeIcon(report.type)}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4 className="text-lg font-medium text-gray-900 truncate">{report.title}</h4>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(report.type)}`}>
                                  {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                                </span>
                              </div>
                              <div className="mt-1">
                                <p className="text-sm text-gray-500">Generated on: {report.date}</p>
                                <p className="mt-2 text-sm text-gray-700">{report.summary}</p>
                              </div>
                              <div className="mt-3 flex space-x-2">
                                <button className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                  <Eye className="h-3 w-3 mr-1" />
                                  View Details
                                </button>
                                <button className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                  <Download className="h-3 w-3 mr-1" />
                                  Download PDF
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="px-4 py-12 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No reports found</h3>
                      <p className="mt-1 text-sm text-gray-500">No reports match your current filters</p>
                      <div className="mt-6">
                        <button 
                          onClick={() => {
                            setFilterType('all');
                            setDateRange('week');
                            setSearchQuery('');
                          }}
                          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Reset Filters
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              
                {/* Insights Section */}
                {filteredReports.length > 0 && (
                  <div className="mt-6 bg-white rounded-lg shadow">
                    <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Report Insights</h3>
                      <div className="text-sm text-gray-500 flex items-center">
                        <PieChart className="h-4 w-4 mr-1 text-blue-500" />
                        Data Visualization
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                        <div className="text-center">
                          <PieChart className="mx-auto h-12 w-12 text-gray-400" />
                          <h3 className="mt-2 text-sm font-medium text-gray-900">Visualize Report Data</h3>
                          <p className="mt-1 text-sm text-gray-500 max-w-sm mx-auto">
                            This would typically include interactive charts and graphs of key metrics from your selected reports.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Reports;
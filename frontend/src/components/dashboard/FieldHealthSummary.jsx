// src/components/dashboard/FieldHealthSummary.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FieldHealthSummary = () => {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFieldHealth = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/fields/health');
        setFields(response.data);
      } catch (err) {
        console.error('Failed to fetch field health data:', err);
        setError('Unable to load field health information');
      } finally {
        setLoading(false);
      }
    };

    fetchFieldHealth();
  }, []);

  // Function to determine health status color
  const getHealthColor = (healthScore) => {
    if (healthScore >= 80) return 'bg-green-500';
    if (healthScore >= 60) return 'bg-yellow-500';
    if (healthScore >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  // Function to get text label for health status
  const getHealthLabel = (healthScore) => {
    if (healthScore >= 80) return 'Healthy';
    if (healthScore >= 60) return 'Minor Issues';
    if (healthScore >= 40) return 'Attention Needed';
    return 'Critical';
  };

  if (loading) {
    return <div className="animate-pulse p-4 bg-white rounded-lg shadow-md h-64"></div>;
  }

  if (error) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-lg font-bold text-gray-800">Field Health Status</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Field Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Scanned
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Health Score
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Issues
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">View</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {fields.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                  No fields available
                </td>
              </tr>
            ) : (
              fields.map((field) => (
                <tr key={field.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{field.name}</div>
                    <div className="text-sm text-gray-500">{field.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(field.lastScan).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-300">
                      <div 
                        className={`${getHealthColor(field.healthScore)} h-2.5 rounded-full`} 
                        style={{ width: `${field.healthScore}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 mt-1 block">{field.healthScore}%</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      getHealthColor(field.healthScore).replace('bg-', 'bg-opacity-20 text-').replace('-500', '-800')
                    }`}>
                      {getHealthLabel(field.healthScore)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {field.issuesDetected ? field.issuesDetected.join(', ') : 'None detected'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={`/fields/${field.id}`} className="text-green-600 hover:text-green-900">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <div className="bg-gray-50 px-4 py-3 text-right border-t">
        <Link to="/fields" className="text-green-600 hover:text-green-700 font-medium text-sm">
          View All Fields →
        </Link>
      </div>
    </div>
  );
};

export default FieldHealthSummary;
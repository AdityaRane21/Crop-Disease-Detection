// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  LineChart, 
  PieChart,
  Bar,
  Line,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer 
} from 'recharts';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Calendar,
  Filter
} from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalFields: 0,
    totalImages: 0,
    pendingAnalyses: 0,
    healthyFields: 0
  });
  const [recentUploads, setRecentUploads] = useState([]);
  const [recentAnalyses, setRecentAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('week');
  const [selectedCrop, setSelectedCrop] = useState('all');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch multiple data sources in parallel
        const [statsRes, uploadsRes, analysesRes] = await Promise.all([
          axios.get('/api/dashboard/stats'),
          axios.get('/api/images/recent'),
          axios.get('/api/analyses/recent')
        ]);
        
        // Ensure stats always has numeric values
        const receivedStats = statsRes.data || {};
        setStats({
          totalFields: Number(receivedStats.totalFields) || 0,
          totalImages: Number(receivedStats.totalImages) || 0,
          pendingAnalyses: Number(receivedStats.pendingAnalyses) || 0,
          healthyFields: Number(receivedStats.healthyFields) || 0
        });
        
        // Ensure we're setting an array (even if the API returns null or a non-array)
        setRecentUploads(Array.isArray(uploadsRes.data) ? uploadsRes.data : []);
        setRecentAnalyses(Array.isArray(analysesRes.data) ? analysesRes.data : []);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setError('Failed to load dashboard data. Please refresh the page.');
        // Set empty arrays on error to prevent map errors
        setRecentUploads([]);
        setRecentAnalyses([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  // Helper function to format numbers with commas
  const formatNumber = (num) => {
    // Ensure the input is a number and convert to string safely
    const safeNum = Number(num) || 0;
    return safeNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Sample data - replace with real data
  const diseaseData = [
    { name: 'Tomato', healthy: 85, infected: 15 },
    { name: 'Potato', healthy: 92, infected: 8 },
    { name: 'Corn', healthy: 78, infected: 22 },
    { name: 'Rice', healthy: 88, infected: 12 },
  ];

  const timelineData = [
    { date: '2024-01', detections: 12 },
    { date: '2024-02', detections: 15 },
    { date: '2024-03', detections: 8 },
    { date: '2024-04', detections: 20 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">Monitor your crop health and disease detection results</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { title: 'Total Scans', value: '156', icon: TrendingUp, color: 'blue' },
            { title: 'Diseases Detected', value: '23', icon: AlertTriangle, color: 'red' },
            { title: 'Healthy Crops', value: '133', icon: CheckCircle, color: 'green' },
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Disease Distribution Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-lg font-medium text-gray-900 mb-4">Disease Distribution</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={diseaseData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="healthy" fill="#10B981" />
                  <Bar dataKey="infected" fill="#EF4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Timeline Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-lg font-medium text-gray-900 mb-4">Detection Timeline</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="detections" stroke="#3B82F6" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Recent Scans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-gray-900">Recent Scans</h2>
            <div className="flex space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="rounded-lg border-gray-300 text-sm"
              >
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="year">Last Year</option>
              </select>
              <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
                <Filter className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
          
          {/* Recent Scans List */}
          <div className="space-y-4">
            {/* Add your recent scans list here */}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Adjust this import based on your project structure

/**
 * PrivateRoute component that protects routes by checking authentication status
 * @param {Object} props - Component props
 * @returns {JSX.Element} - Either the protected route or redirect to login
 */
const PrivateRoute = () => {
  const { currentUser, isLoading } = useAuth();
  const location = useLocation();

  // Show loading state while authentication status is being determined
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login page with return URL
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

export default PrivateRoute;
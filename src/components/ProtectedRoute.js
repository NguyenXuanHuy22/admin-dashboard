import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  // Check if admin is logged in
  const adminUser = localStorage.getItem('adminUser');
  
  if (!adminUser) {
    // Redirect to login if not logged in
    return <Navigate to="/login" replace />;
  }

  try {
    const adminData = JSON.parse(adminUser);
    
    // Check if user is actually admin
    if (adminData.role !== 'admin') {
      // Clear invalid data and redirect to login
      localStorage.removeItem('adminUser');
      return <Navigate to="/login" replace />;
    }

    // User is admin, render the protected content
    return children;
  } catch (error) {
    // Invalid data in localStorage, clear it and redirect
    localStorage.removeItem('adminUser');
    return <Navigate to="/login" replace />;
  }
}

export default ProtectedRoute; 
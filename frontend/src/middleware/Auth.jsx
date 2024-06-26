import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';


const Auth = ({ component: Component }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const userRole = useSelector((state) => state.auth.role);
  const location = useLocation();
  
//   localStorage.clear();
  // If the user is not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/"/>;
  }

  // If the user is authenticated but not authorized, redirect to the unauthorized page
  if (!location.pathname.includes(userRole)) {
    return <Navigate to="/unauthorized" />;
  }
//   if user isauthenticated and authorized stop redirecting to login
  
  // If the user is authenticated and authorized, render the component
  return <Component />;
};

export default Auth;

import React, {useState} from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { getUserInfo } from "../features/auth/authThunks";

const Auth = ({ component: Component }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.role);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (isAuthenticated && token) {
      try {
        const decoded = jwtDecode(token);
        dispatch(getUserInfo(decoded["user_id"]));
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [isAuthenticated, dispatch]);

  // If the user is not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
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

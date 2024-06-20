import React from 'react'
import { useSelector } from 'react-redux';
import { redirect, useLocation } from 'react-router-dom';

const authMiddleware = (Component) => {
    const location = useLocation();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const role = useSelector((state) => state.auth.user.role);
      const AuthenticatedComponent = (props) => {
      // const isAuthenticated = /* logic to check if user is authenticated */;
      // const isPathAdmin = location.pathname.includes('admin');

      if (!isAuthenticated && location.pathname.includes(localStorage.getItem("role"))) {
        return redirect('/login');
      }
      // if (location.contains('/login') && isAuthenticated) {
      // return redirect (/${role}/dashboard)
      // }

      return <Component {...props} />;

    };
    return AuthenticatedComponent;
}

export default authMiddleware
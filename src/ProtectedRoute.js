import React from 'react'

import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const location = useLocation();
  const isAuthenticated = localStorage.getItem('username'); // or any other logic to validate auth
 
  if (!isAuthenticated) {
  
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
}

export default ProtectedRoute;

// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ component: Component }) => {
//   const isAuthenticated = localStorage.getItem('username');

//   return isAuthenticated ? (
//     <Component />
//   ) : (
//     <Navigate to="/" replace />
//   );
// };

// export default ProtectedRoute;


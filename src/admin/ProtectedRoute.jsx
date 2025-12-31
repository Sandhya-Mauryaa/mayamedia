import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  // Jab tak backend se checkAuth call chal rha hai
  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  // Agar login nahi hai to login page pe bhej do
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // Agar login hai to original component show karo
  return children;
};

export default ProtectedRoute;

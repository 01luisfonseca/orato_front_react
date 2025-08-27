// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router";
import { useAuthStore } from "../store/auth.store";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuthStore();

  if (!loading && !user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;

// src/admin/AdminRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./Login";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "./AdminLayout";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="login"
        element={
          <AdminLayout>
            <Login />
          </AdminLayout>
        }
      />

      <Route
        path="dashboard"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AdminRoutes;

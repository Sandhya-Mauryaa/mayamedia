// src/admin/AdminLayout.jsx
import React from "react";

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 text-black ">
      {/* Page content */}
      <main className="p-6">{children}</main>
    </div>
  );
};

export default AdminLayout;

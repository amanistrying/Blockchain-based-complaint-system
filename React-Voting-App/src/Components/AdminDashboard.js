// AdminDashboard.js
import React from 'react';

const AdminDashboard = ({ account }) => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Welcome, Admin {account}!</p>
      {/* Add admin-specific functionalities here, like managing complaints, users, etc. */}
    </div>
  );
};

export default AdminDashboard;

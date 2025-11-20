import React from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-container" style={{ backgroundImage: 'url(/bg/gamebg.jpg)' }}>
      <div className="admin-header">
        <h1>🛡️ Admin Dashboard</h1>
        <p>Welcome back, Admin!</p>
      </div>

      <div className="admin-grid">
        <div className="admin-card">
          <h3>👥 User Management</h3>
          <p>Manage users, roles, and permissions.</p>
          <button className="admin-btn">View Users</button>
        </div>

        <div className="admin-card">
          <h3>📊 Game Statistics</h3>
          <p>View global game stats and analytics.</p>
          <button className="admin-btn">View Stats</button>
        </div>

        <div className="admin-card">
          <h3>🔧 System Settings</h3>
          <p>Configure game settings and maintenance.</p>
          <button className="admin-btn">Settings</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

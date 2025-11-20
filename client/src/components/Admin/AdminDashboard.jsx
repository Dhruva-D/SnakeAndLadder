import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import adminService from '../../services/adminService';
import LoadingSpinner from '../Common/LoadingSpinner';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const data = await adminService.getAnalytics();
      setAnalytics(data);
    } catch (err) {
      setError(err.message);
      if (err.message.includes('Access Denied')) {
        setTimeout(() => navigate('/'), 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading Analytics..." />;

  if (error) return (
    <div className="admin-error">
      <h2>⚠️ Error</h2>
      <p>{error}</p>
    </div>
  );

  if (!analytics) return null;

  const { overview, regions, movement, loginsByDay } = analytics;

  return (
    <div className="admin-container" style={{ backgroundImage: 'url(/bg/gamebg.jpg)' }}>
      <div className="admin-header">
        <h1>🛡️ Admin Dashboard</h1>
        <p>Game Analytics & System Overview</p>
      </div>

      <div className="dashboard-grid">
        {/* Overview Cards */}
        <div className="stat-card total-users">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>Total Users</h3>
            <p className="stat-number">{overview.totalUsers}</p>
          </div>
        </div>

        <div className="stat-card total-games">
          <div className="stat-icon">🎮</div>
          <div className="stat-info">
            <h3>Games Played</h3>
            <p className="stat-number">{overview.totalGames}</p>
          </div>
        </div>

        <div className="stat-card active-regions">
          <div className="stat-icon">🌍</div>
          <div className="stat-info">
            <h3>Active Regions</h3>
            <p className="stat-number">{overview.activeRegions}</p>
          </div>
        </div>

        <div className="stat-card avg-moves">
          <div className="stat-icon">🎲</div>
          <div className="stat-info">
            <h3>Avg Moves/Win</h3>
            <p className="stat-number">{movement.avg_moves_win || '-'}</p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="dashboard-section region-section">
          <h2>🌍 Regional Distribution</h2>
          <div className="region-list">
            {Object.entries(regions).map(([region, count]) => (
              <div key={region} className="region-item">
                <span className="region-name">{region}</span>
                <div className="region-bar-container">
                  <div
                    className="region-bar"
                    style={{ width: `${(count / overview.totalUsers) * 100}%` }}
                  ></div>
                </div>
                <span className="region-count">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-section movement-section">
          <h2>🐍 Movement Patterns</h2>
          <div className="movement-stats">
            <div className="movement-item snake">
              <span className="movement-icon">🐍</span>
              <span className="movement-label">Snakes Hit</span>
              <span className="movement-value">{movement.total_snakes}</span>
            </div>
            <div className="movement-item ladder">
              <span className="movement-icon">🪜</span>
              <span className="movement-label">Ladders Climbed</span>
              <span className="movement-value">{movement.total_ladders}</span>
            </div>
          </div>
        </div>

        <div className="dashboard-section login-section">
          <h2>📅 Login Trends (Last 7 Days)</h2>
          <div className="login-chart">
            {Object.entries(loginsByDay).map(([date, count]) => (
              <div key={date} className="chart-bar-group">
                <div
                  className="chart-bar"
                  style={{ height: `${Math.min(count * 10, 100)}px` }}
                  title={`${count} logins`}
                >
                  {count}
                </div>
                <span className="chart-label">{date.split('/')[0]}/{date.split('/')[1]}</span>
              </div>
            ))}
            {Object.keys(loginsByDay).length === 0 && <p className="no-data">No login data yet</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

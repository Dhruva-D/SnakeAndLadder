import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import authService from '../../services/authService';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      authService.logout();
      navigate('/');
    }
  };

  return (
    <nav className="game-navbar">
      <div className="navbar-container">
        <div className="navbar-brand" onClick={() => navigate('/game')} style={{ cursor: 'pointer' }}>
          <span className="brand-icon">🎲</span>
          <span className="brand-text">Snake & Ladder</span>
        </div>

        <div className="navbar-menu">
          {user && (
            <>
              {user.role === 'admin' && (
                <button className="navbar-btn admin-btn" onClick={() => navigate('/admin')}>
                  <span className="btn-icon">🛡️</span>
                  Admin
                </button>
              )}
              <div className="navbar-user" onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }}>
                <span className="user-icon">👤</span>
                <span className="user-name">{user.username}</span>
              </div>
              <button className="navbar-btn logout-btn" onClick={handleLogout}>
                <span className="btn-icon">🚪</span>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

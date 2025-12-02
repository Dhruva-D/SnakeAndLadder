import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import './Login.css';

import LoadingSpinner from '../Common/LoadingSpinner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || email.trim() === '') {
      alert('Email cannot be empty! Please Enter Correct Email to Proceed.');
      return;
    }

    if (!password || password.trim() === '') {
      alert('Password cannot be empty! Please Enter Correct Password to Login.');
      return;
    }

    setLoading(true);

    try {
      await authService.login(email, password);
      navigate('/game1');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin(e);
    }
  };

  return (
    <div className="login-container" style={{ backgroundImage: 'url(/bg/loginbg.jpg)' }}>
      {loading && <LoadingSpinner message="Signing In..." />}

      <div className="login-content">
        <div className="login-box">
          <h5 className="login-title">LOGIN TO PLAY</h5>
          <form onSubmit={handleLogin}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

            </div>
            <div className="form-floating mb-4">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyUp={handleKeyPress}
              />

            </div>
            <div className="d-flex align-items-center justify-content-between mb-4">
              <button type="button" className="forgot-password" onClick={() => alert('Please contact support')}>Forgot Password</button>
            </div>
            <button type="submit" className="btn btn-login w-100 mb-4" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
            <p className="text-center mb-0 signup-text">
              Don't have an Account? <button type="button" className="signup-link" onClick={() => navigate('/signup')}>Sign Up</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

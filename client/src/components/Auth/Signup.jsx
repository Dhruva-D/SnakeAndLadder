import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import './Login.css'; // Reusing Login styles

import LoadingSpinner from '../Common/LoadingSpinner';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!username || username.trim() === '') {
      alert('Username cannot be empty!');
      return;
    }

    if (!email || email.trim() === '') {
      alert('Email cannot be empty!');
      return;
    }

    if (!password || password.trim() === '') {
      alert('Password cannot be empty!');
      return;
    }

    setLoading(true);

    try {
      await authService.register(username, email, password);
      alert('Registration successful! Please login.');
      navigate('/');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container" style={{ backgroundImage: 'url(/bg/loginbg.jpg)' }}>
      {loading && <LoadingSpinner message="Creating Account..." />}

      <div className="login-content">
        <div className="login-box">
          <h5 className="login-title">CREATE ACCOUNT</h5>
          <form onSubmit={handleSignup}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingUsername"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingEmail"
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
              />
            </div>
            <button type="submit" className="btn btn-login w-100 mb-4" disabled={loading}>
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
            <p className="text-center mb-0 signup-text">
              Already have an Account? <button type="button" className="signup-link" onClick={() => navigate('/')}>Sign In</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

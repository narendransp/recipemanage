import React, { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';
import '../index.css';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); 
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (isLogin) {
        // LOGIN
        const { data } = await API.post('/auth/login', { email, password });
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.name);
        navigate('/dashboard');
      } else {
        // REGISTER
        const { data } = await API.post('/auth/register', { name, email, password });
        alert('Registered successfully! You can now log in.');
        setIsLogin(true); // switch back to login
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error occurred');
    }
  };

  return (
    <>

      <div className="auth-container">

        <div className="auth-card">
          {/* Decorative Icon */}
          <div className="auth-decorative-icon">
            {isLogin ? '🍽️' : '👨‍🍳'}
          </div>

          <h2 className="auth-title">
            {isLogin ? 'Welcome Back' : 'Join Us'}
          </h2>

          <p className="auth-welcome-text">
            {isLogin 
              ? 'Sign in to access your delicious recipe collection' 
              : 'Create an account to start building your recipe library'
            }
          </p>

          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <div className="input-group">
                <span className="input-icon">👤</span>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="auth-input"
                  required
                />
              </div>
            )}

            <div className="input-group">
              <span className="input-icon">📧</span>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="auth-input"
                required
              />
            </div>

            <div className="input-group">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="auth-input"
                required
              />
            </div>

            <button type="submit" className="auth-submit-btn">
              {isLogin ? '🚀 Sign In' : '✨ Create Account'}
            </button>
          </form>

          <p className="auth-toggle-text">
            {isLogin ? (
              <>
                Don't have an account?{' '}
                <span
                  onClick={() => setIsLogin(false)}
                  className="auth-toggle-link"
                >
                  Register here
                </span>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <span
                  onClick={() => setIsLogin(true)}
                  className="auth-toggle-link"
                >
                  Sign in here
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </>
  );
}
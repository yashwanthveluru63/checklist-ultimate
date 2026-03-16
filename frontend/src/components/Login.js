import React, { useState } from 'react';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      console.log('Sign up:', { email, password });
      // TODO: Implement sign-up logic
    } else {
      console.log('Login:', { email, password });
      // TODO: Implement login logic
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">CheckList</h1>
        <p className="login-subtitle">
          {isSignUp ? 'Create your account' : 'Welcome back!'}
        </p>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button type="submit" className="login-button">
            {isSignUp ? 'Sign Up' : 'Login'}
          </button>
        </form>
        
        <div className="login-toggle">
          <p>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button 
              className="toggle-button"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? 'Login' : 'Sign Up'}
            </button>
          </p>
        </div>
        
        <div className="ott-platforms">
          <p className="platforms-text">Connect your OTT platforms:</p>
          <div className="platform-buttons">
            <button className="platform-btn netflix">Netflix</button>
            <button className="platform-btn amazon">Prime Video</button>
            <button className="platform-btn disney">Disney+</button>
            <button className="platform-btn hulu">Hulu</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

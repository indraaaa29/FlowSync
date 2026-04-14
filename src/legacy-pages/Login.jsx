import React from 'react';

const Login = () => {
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-visual gradient-bg">
          <div className="visual-content">
            <span className="logo-icon white-bg"></span>
            <h1 className="white-text">FlowSync</h1>
            <p className="white-text-low">The digital curator for modern event orchestration.</p>
          </div>
          <div className="abstract-blobs">
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
          </div>
        </div>
        <div className="login-form-side">
          <div className="form-content">
            <h2>Welcome Back</h2>
            <p>Enter your credentials to access the admin console.</p>
            
            <form className="auth-form">
              <div className="input-group">
                <label>Email Address</label>
                <input type="email" placeholder="admin@flowsync.com" />
              </div>
              <div className="input-group">
                <div className="label-row">
                  <label>Password</label>
                  <a href="#" className="forgot-link">Forgot?</a>
                </div>
                <input type="password" placeholder="••••••••" />
              </div>
              <div className="checkbox-group">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Keep me logged in</label>
              </div>
              <button type="submit" className="btn-primary gradient-bg w-full">Sign In</button>
            </form>
            
            <div className="form-footer">
              <p>Don't have an account? <a href="#">Request Access</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

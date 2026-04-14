import React, { useState } from 'react';
import './App.css';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import AttendeePortal from './pages/AttendeePortal';

const LandingPage = ({ setPage }) => (
  <div className="landing-container">
    <nav className="navbar glass">
      <div className="container nav-content">
        <div className="logo">
          <span className="logo-icon gradient-bg"></span>
          <span className="logo-text">FlowSync</span>
        </div>
        <div className="nav-links">
          <button className="btn-ghost" onClick={() => setPage('login')}>Admin Login</button>
          <button className="btn-primary gradient-bg" onClick={() => setPage('attendee')}>Attendee Demo</button>
        </div>
      </div>
    </nav>
    <section className="hero container">
      <div className="hero-content">
        <h1 className="display-lg">FlowSync: Orchestrating the <span className="text-gradient">Stadium Experience</span></h1>
        <p className="body-lg">Solving crowd movement and waiting times at large-scale sporting venues through real-time coordination and smart redirection.</p>
        <div className="hero-actions">
          <button className="btn-lg gradient-bg" onClick={() => setPage('dashboard')}>Admin Panel</button>
          <button className="btn-lg btn-ghost" onClick={() => setPage('attendee')}>Attendee View</button>
        </div>
      </div>
      <div className="hero-visual">
        <div className="abstract-shape shape-1 gradient-bg"></div>
        <div className="abstract-shape shape-2 glass"></div>
      </div>
    </section>
  </div>
);

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  const renderPage = () => {
    switch(currentPage) {
      case 'login': return <Login setPage={setCurrentPage} />;
      case 'dashboard': return <AdminDashboard setPage={setCurrentPage} />;
      case 'attendee': return <AttendeePortal setPage={setCurrentPage} />;
      default: return <LandingPage setPage={setCurrentPage} />;
    }
  };

  return (
    <div className="app">
      {renderPage()}
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import GateControl from './GateControl';
import QueueMonitor from './QueueMonitor';
import LogoutModal from '../components/LogoutModal';

const StatCard = ({ title, value, change, trend, icon }) => (
  <div className="card stat-card">
    <div className="stat-header">
      <div className="stat-icon-bg">{icon}</div>
      <span className={`stat-trend ${trend === 'up' ? 'trend-up' : 'trend-down'}`}>
        {trend === 'up' ? '↑' : '↓'} {change}
      </span>
    </div>
    <div className="stat-body">
      <h3>{value}</h3>
      <p>{title}</p>
    </div>
  </div>
);

const DashboardHome = () => (
  <>
    <section className="stats-grid">
      <StatCard title="Total Events" value="124" change="12%" trend="up" icon="🎪" />
      <StatCard title="Active Users" value="2.5k" change="5%" trend="up" icon="👥" />
      <StatCard title="Revenue" value="$45.2k" change="2%" trend="down" icon="💰" />
      <StatCard title="Avg Duration" value="4h 20m" change="18%" trend="up" icon="⏱️" />
    </section>

    <section className="dashboard-grid">
      <div className="card chart-container large">
        <div className="card-header">
          <h3>Attendance Flow</h3>
          <select className="pill-select">
            <option>Last 7 Days</option>
          </select>
        </div>
        <div className="chart-placeholder">
          <div className="fake-chart">
            {[40, 60, 45, 90, 65, 80, 50].map((h, i) => (
              <div key={i} className="chart-bar" style={{height: `${h}%`}}></div>
            ))}
          </div>
        </div>
      </div>

      <div className="card activity-container">
        <div className="card-header">
          <h3>Recent Alerts</h3>
          <a href="#" className="view-all">View All</a>
        </div>
        <div className="activity-list">
          {[
            { title: 'Gate 4 Overflow', time: '2m ago', level: 'error' },
            { title: 'New VIP Registration', time: '15m ago', level: 'success' },
            { title: 'System Maintenance', time: '1h ago', level: 'warning' },
          ].map((act, i) => (
            <div key={i} className="activity-item">
              <div className={`level-dot ${act.level}`}></div>
              <div className="activity-info">
                <p className="activity-title">{act.title}</p>
                <p className="activity-time">{act.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

const AdminDashboard = ({ setPage }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    setIsLogoutModalOpen(false);
    setPage('login');
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar glass">
        <div className="sidebar-header">
          <div className="logo" onClick={() => setPage('landing')} style={{cursor: 'pointer'}}>
            <span className="logo-icon gradient-bg"></span>
            <span className="logo-text">FlowSync</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          <button onClick={() => setActiveTab('dashboard')} className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}><span>📊</span> Dashboard</button>
          <button onClick={() => setActiveTab('gates')} className={`nav-item ${activeTab === 'gates' ? 'active' : ''}`}><span>🌉</span> Gate Control</button>
          <button onClick={() => setActiveTab('queue')} className={`nav-item ${activeTab === 'queue' ? 'active' : ''}`}><span>⌛</span> Queue Monitor</button>
          <button className="nav-item"><span>🔔</span> Notifications</button>
          <button className="nav-item"><span>⚙️</span> Settings</button>
        </nav>
        <div className="sidebar-footer">
          <button className="btn-ghost" onClick={() => setIsLogoutModalOpen(true)}>Logout 🚪</button>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="page-info">
            <h1>{activeTab === 'dashboard' ? 'Admin Dashboard' : activeTab === 'gates' ? 'Gate Control' : 'Queue Monitoring'}</h1>
            <p className="text-muted">Operations Center • Sporting Venue Phase 1</p>
          </div>
          <div className="topbar-actions">
            <button className="btn-primary gradient-bg">Live Action</button>
          </div>
        </header>

        {activeTab === 'dashboard' ? <DashboardHome /> : 
         activeTab === 'gates' ? <GateControl /> : 
         <QueueMonitor />}
      </main>

      <LogoutModal 
        isOpen={isLogoutModalOpen} 
        onConfirm={handleLogout} 
        onCancel={() => setIsLogoutModalOpen(false)} 
      />
    </div>
  );
};


export default AdminDashboard;

import React from 'react';

const GateCard = ({ name, status, capacity, level }) => (
  <div className="card gate-card">
    <div className="gate-header">
      <h4>{name}</h4>
      <span className={`pill ${status === 'Active' ? 'success-pill' : 'warning-pill'}`}>{status}</span>
    </div>
    <div className="gate-metrics">
      <div className="metric">
        <label>Capacity</label>
        <div className="progress-bar mini">
          <div className="progress-fill gradient-bg" style={{width: `${level}%`}}></div>
        </div>
      </div>
      <p className="capacity-text">{capacity} People</p>
    </div>
  </div>
);

const GateControl = () => {
  return (
    <div className="gate-control-container">
      <header className="page-header">
        <h2>Gate Control Panel</h2>
        <div className="header-actions">
          <button className="btn-icon">🔄</button>
          <button className="btn-primary gradient-bg">Lock All Gates</button>
        </div>
      </header>

      <div className="gate-grid">
        <div className="map-column">
          <div className="card map-card gradient-bg">
            <div className="map-overlay glass">
              <p>Live Heatmap Visual</p>
              <div className="sensor sensor-1 active"></div>
              <div className="sensor sensor-2 active"></div>
              <div className="sensor sensor-3 warning"></div>
            </div>
          </div>
        </div>
        
        <div className="list-column">
          <GateCard name="Main Entrance" status="Active" capacity="1,200/2,000" level={60} />
          <GateCard name="VIP South Gate" status="Active" capacity="450/500" level={90} />
          <GateCard name="Staff Exit 1" status="Standby" capacity="0/200" level={0} />
          <GateCard name="West Entrance" status="Active" capacity="800/1,500" level={53} />
        </div>
      </div>
    </div>
  );
};

export default GateControl;

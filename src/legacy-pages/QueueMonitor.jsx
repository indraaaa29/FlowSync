import React from 'react';

const QueueItem = ({ area, waitTime, status, load }) => (
  <div className="card queue-item">
    <div className="queue-info">
      <h4>{area}</h4>
      <p className="text-muted">Current Wait: <span className="highlight-text">{waitTime} min</span></p>
    </div>
    <div className="queue-visual">
      <div className="pace-indicator">
        {[1,2,3,4,5].map(i => (
          <div key={i} className={`pace-dot ${i <= load ? 'active' : ''}`}></div>
        ))}
      </div>
      <span className={`pill ${status === 'Fast' ? 'success-pill' : status === 'Moderate' ? 'warning-pill' : 'error-pill'}`}>
        {status}
      </span>
    </div>
  </div>
);

const QueueMonitor = () => {
  return (
    <div className="queue-monitor-container">
      <header className="section-header-row">
        <h3>Live Pace Monitoring</h3>
        <p>Real-time bottleneck detection across all venue zones.</p>
      </header>

      <div className="queue-stats-row">
        <div className="mini-stat glass">
          <label>Avg Wait Time</label>
          <h2>12m</h2>
        </div>
        <div className="mini-stat glass">
          <label>Peak Zone</label>
          <h2>North Concourse</h2>
        </div>
        <div className="mini-stat glass">
          <label>Staff Deployment</label>
          <h2>94%</h2>
        </div>
      </div>

      <div className="queue-sections">
        <div className="section-group">
          <h5>🎟️ Entry Gates</h5>
          <QueueItem area="Gate A (Executive)" waitTime={4} status="Fast" load={1} />
          <QueueItem area="Gate B (General)" waitTime={22} status="Heavy" load={5} />
          <QueueItem area="Gate C (General)" waitTime={12} status="Moderate" load={3} />
        </div>

        <div className="section-group">
          <h5>🍔 Concessions & Restrooms</h5>
          <QueueItem area="West End Food Court" waitTime={15} status="Moderate" load={3} />
          <QueueItem area="South Stand Restrooms" waitTime={2} status="Fast" load={1} />
          <QueueItem area="Merchandise Store" waitTime={35} status="Heavy" load={5} />
        </div>
      </div>
      
      <div className="action-panel glass">
        <h4>Bottleneck Detected: Gate B</h4>
        <p>850+ attendees arriving in the next 10 minutes. Suggesting redirection to Gate C.</p>
        <button className="btn-primary gradient-bg">Broadcast Redirection</button>
      </div>
    </div>
  );
};

export default QueueMonitor;

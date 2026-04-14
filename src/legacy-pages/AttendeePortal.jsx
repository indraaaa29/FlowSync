import React from 'react';

const NavigatorCard = ({ title, sub, icon, actionText, urgent }) => (
  <div className={`card nav-card ${urgent ? 'urgent-card' : ''}`}>
    <div className="nav-card-icon">{icon}</div>
    <div className="nav-card-text">
      <h4>{title}</h4>
      <p>{sub}</p>
    </div>
    <button className="nav-action-btn">{actionText}</button>
  </div>
);

const AttendeePortal = () => {
  return (
    <div className="mobile-app-shell">
      <div className="status-bar">
        <span>12:45 PM</span>
        <div className="status-icons">📶 🔋</div>
      </div>
      
      <header className="mobile-header">
        <div className="user-greeting">
          <p>Hello, Attendee</p>
          <h2>Match Day at stadium</h2>
        </div>
        <div className="ticket-mini-card gradient-bg">
          <div className="ticket-info">
            <label>Section</label>
            <h3>B42</h3>
          </div>
          <div className="ticket-qr">🔳</div>
        </div>
      </header>

      <main className="mobile-content">
        <h3>Smart Navigation</h3>
        <div className="nav-grid">
          <NavigatorCard 
            title="Gate C is Faster" 
            sub="Save 15 mins by entering via Gate C instead of B." 
            icon="🏃" 
            actionText="Guide Me"
            urgent={true}
          />
          <NavigatorCard 
            title="Pre-order Food" 
            sub="West Side Burger Co. is quiet right now." 
            icon="🍔" 
            actionText="Order Now"
          />
          <NavigatorCard 
            title="Exit Route" 
            sub="Fastest route to Parking A after the show." 
            icon="🚗" 
            actionText="View Map"
          />
        </div>

        <div className="live-update card glass">
          <div className="update-header">
            <span className="live-dot-pulse"></span>
            <h4>Live Feed</h4>
          </div>
          <p>"Halftime show starts in 10 minutes. Head to your seats!"</p>
        </div>
      </main>

      <nav className="mobile-bottom-nav glass">
        <div className="nav-tab active">🏠</div>
        <div className="nav-tab">🗺️</div>
        <div className="nav-tab">🎟️</div>
        <div className="nav-tab">👤</div>
      </nav>
    </div>
  );
};

export default AttendeePortal;

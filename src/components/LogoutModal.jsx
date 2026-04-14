import React from 'react';

const LogoutModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay glass">
      <div className="modal-content logout-modal card">
        <div className="modal-top-indicator"></div>
        <div className="logout-icon-container">
          <div className="logout-icon-bg">
            <span className="logout-icon">🚪</span>
          </div>
        </div>
        
        <div className="modal-text">
          <h3>Confirm Logout</h3>
          <p>Are you sure you want to log out?</p>
        </div>

        <div className="modal-actions">
          <button className="btn-logout" onClick={onConfirm}>Logout</button>
          <button className="btn-cancel" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;

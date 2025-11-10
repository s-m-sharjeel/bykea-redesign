import React from 'react';
import '../styles/Header.css';

const Header = ({ user, onMenuClick }) => {
  return (
    <header className="header">
      <div className="header-top">
        <div className="user-info">
          <h2 className="user-name">{user.name}</h2>
          <span className="user-location">📍 {user.location}</span>
        </div>
        <div className="header-actions">
          <button className="icon-btn" onClick={() => onMenuClick('wallet')}>
            <span className="icon">💳</span>
          </button>
          <button className="icon-btn" onClick={() => onMenuClick('notifications')}>
            <span className="icon">🔔</span>
          </button>
        </div>
      </div>
      
      <div className="quick-actions">
        <button className="action-btn" onClick={() => onMenuClick('bookings')}>
          <span className="action-icon">📋</span>
          Bookings
        </button>
        <button className="action-btn" onClick={() => onMenuClick('wallet')}>
          <span className="action-icon">💰</span>
          Wallet
        </button>
        <button className="action-btn" onClick={() => onMenuClick('contact')}>
          <span className="action-icon">📞</span>
          Contact
        </button>
      </div>
    </header>
  );
};

export default Header;
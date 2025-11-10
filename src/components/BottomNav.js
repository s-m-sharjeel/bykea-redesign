import React from 'react';
import '../styles/BottomNav.css';

const BottomNav = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'rides', label: 'Rides', icon: '🚗' },
    { id: 'shops', label: 'Shops', icon: '🛍️' },
    { id: 'rentals', label: 'Rentals', icon: '⏰' },
    { id: 'profile', label: 'Profile', icon: '👤' }
  ];

  return (
    <nav className="bottom-nav">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          <span className="nav-icon">{tab.icon}</span>
          <span className="nav-label">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
import React, { useState } from 'react';
import '../styles/LocationInput.css';

const LocationInput = ({ 
  pickupLocation, 
  dropoffLocation, 
  onPickupChange, 
  onDropoffChange,
  recentLocations 
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeInput, setActiveInput] = useState(null);

  const handleInputFocus = (inputType) => {
    setActiveInput(inputType);
    setShowSuggestions(true);
  };

  const handleLocationSelect = (location) => {
    if (activeInput === 'pickup') {
      onPickupChange(location);
    } else {
      onDropoffChange(location);
    }
    setShowSuggestions(false);
    setActiveInput(null);
  };

  return (
    <div className="location-input">
      <div className="input-group">
        <div className="input-with-icon">
          <span className="input-icon pickup">📍</span>
          <input
            type="text"
            placeholder="Enter pickup location"
            value={pickupLocation}
            onChange={(e) => onPickupChange(e.target.value)}
            onFocus={() => handleInputFocus('pickup')}
            className="location-field"
          />
        </div>
        
        <div className="input-with-icon">
          <span className="input-icon dropoff">🎯</span>
          <input
            type="text"
            placeholder="Where to?"
            value={dropoffLocation}
            onChange={(e) => onDropoffChange(e.target.value)}
            onFocus={() => handleInputFocus('dropoff')}
            className="location-field"
          />
        </div>
      </div>

      {showSuggestions && (
        <div className="suggestions-panel">
          <div className="suggestions-header">
            <h4>Recent Locations</h4>
            <button 
              className="close-btn"
              onClick={() => setShowSuggestions(false)}
            >
              ✕
            </button>
          </div>
          <div className="suggestions-list">
            {recentLocations.map((location, index) => (
              <div
                key={index}
                className="suggestion-item"
                onClick={() => handleLocationSelect(location)}
              >
                <span className="suggestion-icon">📌</span>
                <span className="suggestion-text">{location}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationInput;
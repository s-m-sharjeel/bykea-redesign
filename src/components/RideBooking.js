import React, { useState } from 'react';
import '../styles/RideBooking.css';

const RideBooking = ({ 
  vehicleTypes, 
  onRideConfirm, 
  onAddStop,
  pickupLocation,
  dropoffLocation 
}) => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  return (
    <div className="ride-booking">
      <div className="booking-header">
        <h3>Confirm Your Ride</h3>
        <div className="route-info">
          <div className="route-point pickup">
            <span className="point-marker">📍</span>
            <span className="point-text">{pickupLocation}</span>
          </div>
          <div className="route-line"></div>
          <div className="route-point dropoff">
            <span className="point-marker">🎯</span>
            <span className="point-text">{dropoffLocation}</span>
          </div>
        </div>
        
        <button className="add-stop-btn" onClick={onAddStop}>
          <span className="add-stop-icon">+</span>
          Add Stop
        </button>
      </div>

      <div className="vehicle-options">
        <h4>Choose your ride</h4>
        <div className="vehicle-list">
          {vehicleTypes.map(vehicle => (
            <div
              key={vehicle.id}
              className={`vehicle-option ${selectedVehicle?.id === vehicle.id ? 'selected' : ''}`}
              onClick={() => setSelectedVehicle(vehicle)}
            >
              <div className="vehicle-icon">{vehicle.icon}</div>
              <div className="vehicle-info">
                <div className="vehicle-name">{vehicle.name}</div>
                <div className="vehicle-details">
                  <span className="capacity">{vehicle.capacity}</span>
                  <span className="dot">•</span>
                  <span className="time">{vehicle.time}</span>
                </div>
              </div>
              <div className="vehicle-price">
                {vehicle.price}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="booking-actions">
        <button 
          className="confirm-ride-btn"
          disabled={!selectedVehicle}
          onClick={() => onRideConfirm(selectedVehicle)}
        >
          {selectedVehicle ? `Book ${selectedVehicle.name} - ${selectedVehicle.price}` : 'Select a vehicle'}
        </button>
      </div>
    </div>
  );
};

export default RideBooking;
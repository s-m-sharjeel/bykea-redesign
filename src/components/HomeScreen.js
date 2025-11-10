import React, { useState } from 'react';
import Header from './Header';
import LocationInput from './LocationInput';
import MapComponent from './MapComponent';
import ServicesGrid from './ServicesGrid';
import RideBooking from './RideBooking';
import BottomNav from './BottomNav';
import { mockUser, mockServices, mockRecentLocations, mockVehicleTypes } from '../data/mockData';
import '../styles/HomeScreen.css';

const HomeScreen = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedService, setSelectedService] = useState(null);
  const [pickupLocation, setPickupLocation] = useState(mockUser.address);
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [showRideBooking, setShowRideBooking] = useState(false);
  const [locationConfirmed, setLocationConfirmed] = useState(false);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    if (service.name === 'Ride') {
      setShowRideBooking(true);
    }
  };

  const handleLocationConfirm = (position) => {
    setLocationConfirmed(true);
    // In a real app, you would geocode the position to get an address
    setDropoffLocation(`Street ${Math.round(position.x/10)} - Askari IV`);
  };

  const handleRideConfirm = (vehicle) => {
    alert(`Booking confirmed! ${vehicle.name} is on the way.`);
    setShowRideBooking(false);
    setSelectedService(null);
    setDropoffLocation('');
    setLocationConfirmed(false);
  };

  const handleAddStop = () => {
    alert('Add Stop feature would open here with clear labeling');
  };

  const handleMenuClick = (menu) => {
    alert(`${menu} menu would open here`);
  };

  if (showRideBooking) {
    return (
      <div className="app-container">
        <div className="screen-content">
          <Header user={mockUser} onMenuClick={handleMenuClick} />
          
          {!locationConfirmed ? (
            <>
              <LocationInput
                pickupLocation={pickupLocation}
                dropoffLocation={dropoffLocation}
                onPickupChange={setPickupLocation}
                onDropoffChange={setDropoffLocation}
                recentLocations={mockRecentLocations}
              />
              <MapComponent
                pickupLocation={pickupLocation}
                dropoffLocation={dropoffLocation}
                onLocationConfirm={handleLocationConfirm}
              />
            </>
          ) : (
            <RideBooking
              vehicleTypes={mockVehicleTypes}
              onRideConfirm={handleRideConfirm}
              onAddStop={handleAddStop}
              pickupLocation={pickupLocation}
              dropoffLocation={dropoffLocation}
            />
          )}
        </div>
        <button 
          className="back-button"
          onClick={() => {
            setShowRideBooking(false);
            setSelectedService(null);
            setLocationConfirmed(false);
          }}
        >
          ← Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="screen-content">
        <Header user={mockUser} onMenuClick={handleMenuClick} />
        <LocationInput
          pickupLocation={pickupLocation}
          dropoffLocation={dropoffLocation}
          onPickupChange={setPickupLocation}
          onDropoffChange={setDropoffLocation}
          recentLocations={mockRecentLocations}
        />
        <ServicesGrid 
          services={mockServices} 
          onServiceSelect={handleServiceSelect} 
        />
        
        {/* Promotional Banner */}
        <div className="promo-banner">
          <div className="promo-content">
            <span className="promo-icon">🎉</span>
            <div className="promo-text">
              <strong>30% OFF</strong> on your next Car Ride!
            </div>
          </div>
          <button className="promo-button">Book Now</button>
        </div>
      </div>
      
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default HomeScreen;
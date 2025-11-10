import React, { useState, useRef } from 'react';
import '../styles/MapComponent.css';

const MapComponent = ({ 
  pickupLocation, 
  dropoffLocation, 
  onLocationConfirm 
}) => {
  const [pinPosition, setPinPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const mapRef = useRef(null);

  const handlePinDragStart = (e) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handlePinDrag = (e) => {
    if (!isDragging) return;
    
    const mapRect = mapRef.current.getBoundingClientRect();
    const x = ((e.clientX - mapRect.left) / mapRect.width) * 100;
    const y = ((e.clientY - mapRect.top) / mapRect.height) * 100;
    
    // Snap to road logic (simplified)
    const snappedX = Math.round(x / 5) * 5;
    const snappedY = Math.round(y / 5) * 5;
    
    setPinPosition({ 
      x: Math.max(0, Math.min(100, snappedX)), 
      y: Math.max(0, Math.min(100, snappedY)) 
    });
  };

  const handlePinDragEnd = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    const handleMouseMove = (e) => handlePinDrag(e);
    const handleMouseUp = () => handlePinDragEnd();

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="map-container">
      <div 
        ref={mapRef}
        className="map-area"
        onMouseMove={handlePinDrag}
      >
        {/* Simplified map representation */}
        <div className="map-background">
          <div className="map-roads">
            <div className="road horizontal" style={{ top: '25%' }}></div>
            <div className="road horizontal" style={{ top: '50%' }}></div>
            <div className="road horizontal" style={{ top: '75%' }}></div>
            <div className="road vertical" style={{ left: '25%' }}></div>
            <div className="road vertical" style={{ left: '50%' }}></div>
            <div className="road vertical" style={{ left: '75%' }}></div>
          </div>
          
          {/* Location markers */}
          {pickupLocation && (
            <div 
              className="location-marker pickup-marker"
              style={{ left: '20%', top: '30%' }}
            >
              📍
            </div>
          )}
          
          {/* Draggable pin for dropoff */}
          <div
            className={`location-pin ${isDragging ? 'dragging' : ''}`}
            style={{ 
              left: `${pinPosition.x}%`, 
              top: `${pinPosition.y}%`,
              transform: `translate(-50%, -50%) scale(${isDragging ? 1.2 : 1})`
            }}
            onMouseDown={handlePinDragStart}
          >
            🎯
            <div className="pin-pulse"></div>
          </div>
        </div>
      </div>
      
      <div className="map-controls">
        <button 
          className="confirm-location-btn"
          onClick={() => onLocationConfirm(pinPosition)}
        >
          ✅ Confirm Location
        </button>
        
        <div className="location-feedback">
          <span>Drag the pin to set your destination</span>
          <span>• Pin snaps to nearest road</span>
          <span>• Large tap target</span>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
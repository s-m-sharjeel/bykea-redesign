import React from 'react';
import '../styles/ServicesGrid.css';

const ServicesGrid = ({ services, onServiceSelect }) => {
  return (
    <div className="services-grid">
      <h3 className="section-title">What do you need?</h3>
      <div className="services-container">
        {services.map(service => (
          <div
            key={service.id}
            className="service-card"
            onClick={() => onServiceSelect(service)}
            style={{ '--service-color': service.color }}
          >
            <div className="service-icon" style={{ backgroundColor: service.color }}>
              {service.icon}
            </div>
            <div className="service-info">
              <h4 className="service-name">{service.name}</h4>
              <p className="service-desc">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesGrid;
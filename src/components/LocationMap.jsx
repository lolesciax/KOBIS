import React from 'react';
import '../styles/LocationMap.css';

const LocationMap = () => {
  // Google Maps embed URL
  const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3855.660826008816!2d120.96288807571485!3d14.76191660000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b3beacb0d5d5%3A0xd7232501ad5938b4!2sKudong%20Sizzling%20-%20Marilao!5e0!3m2!1sen!2sph!4v1741729370000!5m2!1sen!2sph";

  return (
    <section className="location-map" id="location">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">📍 Find Us</h2>
          <p className="section-subtitle">Visit Kudong Sizzling - Marilao</p>
        </div>
        
        <div className="map-wrapper">
          <iframe
            title="Kudong Sizzling Marilao Location"
            src={mapSrc}
            width="100%"
            height="450"
            style={{ border: 0, borderRadius: '12px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        
        <div className="location-info">
          <div className="info-item">
            <span className="info-icon">📌</span>
            <span>Lias, Marilao, Bulacan</span>
          </div>
          <div className="info-item">
            <span className="info-icon">🕒</span>
            <span><strong>Open Everyday</strong></span>
          </div>
          <a 
            href="https://www.google.com/maps/dir//Kudong+Sizzling+-+Marilao/@14.7619166,120.9628881,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3397b3beacb0d5d5:0xd7232501ad5938b4!2m2!1d120.965463!2d14.7619166?entry=ttu"
            target="_blank"
            rel="noopener noreferrer"
            className="direction-btn"
          >
            Get Directions
          </a>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;
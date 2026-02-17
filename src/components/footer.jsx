import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-logo">SIZZLING<span>🔥</span></h3>
          <p className="footer-description">
            Experience the perfect blend of sizzling flavors and warm hospitality at our restaurant.
          </p>
          <div className="social-links">
            <a href="#" className="social-link">📘</a>
            <a href="#" className="social-link">📸</a>
            <a href="#" className="social-link">🐦</a>
            <a href="#" className="social-link">📽️</a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="#menu" onClick={(e) => {
              e.preventDefault();
              document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
            }}>Menu</a></li>
            <li><a href="#about" onClick={(e) => {
              e.preventDefault();
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }}>About Us</a></li>
            <li><a href="#location" onClick={(e) => {
              e.preventDefault();
              document.getElementById('location')?.scrollIntoView({ behavior: 'smooth' });
            }}>Location</a></li>
            <li><a href="#contact" onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}>Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Info</h4>
          <div className="contact-info">
            <p>📍 123 Lias, Marilao</p>
            <p>📞 +1 (555) 123-SIZZ</p>
            <p>✉️ kudongs@sizzling.com</p>
          </div>
        </div>

        <div className="footer-section">
          <h4>Opening Hours</h4>
          <div className="opening-hours">
            <p><span>Mon - Thu:</span> 10:00 AM - 3:00 PM</p>
            <p><span>Fri - Sun:</span> 10:00 AM - 5:00 AM</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Kudong Bhel Sizzling. All rights reserved. | Made with ❤️</p>
      </div>
    </footer>
  );
};

export default Footer;
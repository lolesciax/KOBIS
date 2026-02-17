import React, { useState, useEffect } from 'react';
import '../styles/navbar.css';

const Navbar = ({ onSidebarToggle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const [cartItemCount, setCartItemCount] = useState(0);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }, // This will now scroll to location
  ];

  // Listen for cart updates
  React.useEffect(() => {
    const handleCartUpdate = (event) => {
      setCartItemCount(prevCount => prevCount + 1);
    };

    window.addEventListener('addToCart', handleCartUpdate);
    return () => window.removeEventListener('addToCart', handleCartUpdate);
  }, []);

  // Scroll spy effect to update active link based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Get all sections - including location for contact
      const sections = [
        document.getElementById('menu'),
        document.getElementById('about'),
        document.getElementById('location') // ADD THIS - Location section for contact
      ].filter(Boolean);
      
      // Check if at the top of page
      if (window.scrollY < 100) {
        setActiveLink('home');
        return;
      }
      
      // Find which section is currently in view
      let currentSection = 'home';
      
      sections.forEach(section => {
        if (section) {
          const rect = section.getBoundingClientRect();
          // If section is near the top of viewport (within 150px of top)
          if (rect.top <= 150 && rect.bottom >= 100) {
            if (section.id === 'location') {
              currentSection = 'contact'; // Map location id to contact nav link
            } else {
              currentSection = section.id;
            }
          }
        }
      });

      setActiveLink(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (linkId) => {
    setActiveLink(linkId);
    setIsMenuOpen(false);
    
    // Scroll to section
    if (linkId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (linkId === 'contact') {
      // Special case: contact goes to location section
      const locationSection = document.getElementById('location');
      if (locationSection) {
        locationSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      const section = document.getElementById(linkId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleCartClick = () => {
    window.dispatchEvent(new Event('toggleCart'));
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left: Brand */}
        <div className="navbar-brand">
          <button 
            className="menu-toggle" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
          <div className="brand-logo">
            <span className="brand-icon">🔥</span>
            <span className="brand-text">KUDONGS</span>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          {navLinks.map(link => (
            <a
              key={link.id}
              href={`#${link.id === 'contact' ? 'location' : link.id}`}
              className={`nav-link ${activeLink === link.id ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.id);
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="navbar-actions">
          <div className="contact-info">
          </div>
          
          <button 
            className="action-btn cart-btn" 
            onClick={handleCartClick}
          >
            <span className="action-icon">🛒</span>
            <span className="action-label">Order</span>
            {cartItemCount > 0 && (
              <span className="action-badge">{cartItemCount}</span>
            )}
          </button>
          
          <button className="user-btn" aria-label="User account">
            <span className="user-icon">👤</span>
          </button>
        </div>

        {isMenuOpen && (
          <div 
            className="mobile-overlay" 
            onClick={() => setIsMenuOpen(false)} 
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
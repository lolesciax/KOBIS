import React from 'react';
import '../styles/AboutSection.css';

const AboutSection = () => {
  return (
    <section className="about-section" id="about">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">About Us</h2>
          <p className="section-subtitle">The story behind the sizzle</p>
        </div>
        
        <div className="about-grid">
          <div className="about-content">
            <h3 className="about-subtitle">Our Journey</h3>
            <p className="about-text">
              Kudongs has become a local favorite for students, workers, and families seeking high-quality taste without the high price tag. We’ve built our reputation on generous "unli" offerings—serving up unlimited rice, soup, and savory gravy to keep you fueled.
            </p>
            <p className="about-text">
              We are best known for our signature sizzling plates. Our <strong>Liempo, Pork Chop, and Sisig</strong> remain our top three best-sellers, crafted to stand out through bold flavors and everyday affordability.
            </p>

            <div className="about-stats">
              <div className="stat">
                <span className="stat-icon">🔥</span>
                <span className="stat-number">17</span>
                <span className="stat-label">Dishes</span>
              </div>
              <div className="stat">
                <span className="stat-icon">♾️</span>
                <span className="stat-number">Unli</span>
                <span className="stat-label">Rice, Soup & Gravy</span>
              </div>
              <div className="stat">
                <span className="stat-icon">⏰</span>
                <span className="stat-number">10AM</span>
                <span className="stat-label">Opening Hours</span>
              </div>
            </div>

            <div className="about-highlight">
              <strong>Late-Night Cravings?</strong> We're open until 3:00 AM on mon - thurs and 5:00 AM on fri -sun to satisfy your midnight hunger!
            </div>
          </div>

          <div className="about-image">
            <div className="about-image-container">
              <img 
                src="/Products/No BG/cooking.jpg" 
                alt="Kudongs signature sizzling dishes" 
                className="about-img"
              />
              <div className="about-image-overlay">
                <span className="overlay-text">Budget • Family • Student Friendly</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
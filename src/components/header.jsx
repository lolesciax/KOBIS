import React from "react";
import "../styles/header.css";

const Header = () => {
  const handleMenuClick = () => {
    const menuSection = document.getElementById("menu");
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="hero">
      <img src="/Products/Sisig.png" alt="Sisig" className="bg-food food-1" />
      <img src="/Products/Liempo.png" alt="Liempo" className="bg-food food-2" />
      <img src="/Products/Pork Chop.png" alt="Pork Chop" className="bg-food food-3" />

      <div className="overlay"></div>

      <div className="hero-content">
        <div className="hero-text">
          <p className="hero-kudongs">KUDONGS</p>
          
          <h1 className="hero-title">
            KUDONG BHEL SIZZLING
          </h1>

          <p className="hero-subtitle">
            Unlimited rice, soup, and gravy
          </p>

          <button className="hero-btn" onClick={handleMenuClick}>
            View Our Menu
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
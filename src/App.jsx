import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/header';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import Footer from './components/footer';
import MenuSystem from './components/MenuSystem';
import FeaturedProducts from './components/featuredProducts';
import AboutSection from './components/AboutSection';
import Testimonials from './components/Testimonials';
import LocationMap from './components/LocationMap';

function App() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth <= 1200);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Listen for cart updates
    const handleCartUpdate = (event) => {
      setCartCount(prev => prev + 1);
    };
    
    window.addEventListener('addToCart', handleCartUpdate);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('addToCart', handleCartUpdate);
    };
  }, []);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="app">
      <Navbar onSidebarToggle={toggleMobileSidebar} />
      <main className={`main-content ${isMobileSidebarOpen ? 'mobile-sidebar-open' : ''}`}>
        <Header />
        <FeaturedProducts />
        <MenuSystem />
        <AboutSection />
        <Testimonials />
        <LocationMap />
      </main>
      
      {/* Sidebar - now controlled by cart state */}
      <Sidebar 
        isMobileOpen={isMobileSidebarOpen} 
        onMobileClose={() => setIsMobileSidebarOpen(false)} 
      />
      
      <Footer />
      
      {/* Mobile Sidebar Toggle Button */}
      {isMobileView && (
        <button 
          className="mobile-sidebar-toggle" 
          onClick={toggleMobileSidebar}
          aria-label="Toggle sidebar"
        >
          🛒
          {cartCount > 0 && (
            <span className="cart-count">{cartCount}</span>
          )}
        </button>
      )}
    </div>
  );
}

export default App;
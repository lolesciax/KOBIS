import React, { useState, useEffect } from 'react';
import '../styles/sidebar.css';

const Sidebar = ({ isMobileOpen, onMobileClose }) => {
  const [activeCategory, setActiveCategory] = useState('bestSellers');
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Check if mobile view and handle scroll
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 1200;
      setIsMobileView(mobile);
      
      // Only apply sticky effect on desktop
      if (!mobile && window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    const handleScroll = () => {
      if (window.innerWidth > 1200 && window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Listen for cart toggle events from navbar
  useEffect(() => {
    const handleCartToggle = () => {
      setIsCartOpen(!isCartOpen);
    };

    window.addEventListener('toggleCart', handleCartToggle);
    return () => window.removeEventListener('toggleCart', handleCartToggle);
  }, [isCartOpen]);

  // Listen for add to cart events
  useEffect(() => {
    const handleAddToCart = (event) => {
      const newItem = event.detail;
      setCartItems(prevItems => {
        const existingItem = prevItems.find(i => i.name === newItem.name);
        if (existingItem) {
          return prevItems.map(i => 
            i.name === newItem.name 
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
        } else {
          return [...prevItems, { 
            name: newItem.name, 
            price: newItem.price,
            quantity: 1 
          }];
        }
      });
      setIsCartOpen(true); // Open cart when item is added
    };

    window.addEventListener('addToCart', handleAddToCart);
    return () => window.removeEventListener('addToCart', handleAddToCart);
  }, []);

  const menuCategories = {
    bestSellers: [
      { name: 'Sisig with Egg', price: '₱70', description: 'Crispy pork sisig with egg' },
      { name: 'Liempo', price: '₱75', description: 'Grilled pork belly' },
      { name: 'Pork Chop', price: '₱70', description: 'Juicy pork chop with gravy' },
      { name: 'Lechon Kawali', price: '₱70', description: 'Crispy fried pork belly' },
    ],
    meals: [
      { name: 'Chicken Teriyaki', price: '₱55', description: 'Grilled chicken with teriyaki' },
      { name: 'Beef Tapa', price: '₱65', description: 'Marinated beef slices' },
      { name: 'Boneless Bangus', price: '₱55', description: 'Deboned milkfish' },
      { name: 'Tocino', price: '₱60', description: 'Sweet cured pork' },
    ],
    doubles: [
      { name: 'Double Liempo', price: '₱130', description: 'Double pork belly serving' },
      { name: 'Double Pork Chop', price: '₱120', description: 'Two pork chops' },
      { name: 'Double Hotdog', price: '₱55', description: 'Two hotdogs with sauce' },
      { name: 'Double Burger Steak', price: '₱50', description: 'Two burger patties' },
    ],
    drinks: [
      { name: 'Ice Tea', price: '₱35', description: 'Refreshing iced tea' },
      { name: 'Kasalo', price: '₱40', description: 'Local specialty drink' },
      { name: 'Coke/Sprite', price: '₱30', description: 'Canned soft drinks' },
    ],
  };

  // Add item to cart from quick menu
  const addToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.name === item.name);
      if (existingItem) {
        return prevItems.map(i => 
          i.name === item.name 
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      } else {
        return [...prevItems, { 
          name: item.name, 
          price: parseInt(item.price.replace('₱', '')),
          quantity: 1 
        }];
      }
    });
    setIsCartOpen(true);
  };

  // Update quantity
  const updateQuantity = (itemName, change) => {
    setCartItems(prevItems => {
      const newItems = prevItems.map(item => {
        if (item.name === itemName) {
          const newQuantity = item.quantity + change;
          if (newQuantity <= 0) return null;
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(Boolean);
      
      return newItems;
    });
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Determine sidebar classes
  const sidebarClasses = [
    'sidebar',
    isSticky && !isMobileView ? 'sticky' : '',
    isMobileOpen ? 'mobile-open' : '',
    (isCartOpen || cartItems.length > 0) ? 'cart-open' : ''
  ].filter(Boolean).join(' ');

  // Handle close
  const handleClose = () => {
    setIsCartOpen(false);
    if (onMobileClose) onMobileClose();
  };

  // Only render if cart is open or mobile menu is open or has items
  if (!isCartOpen && !isMobileOpen && cartItems.length === 0) {
    return null;
  }

  return (
    <>
      {/* Mobile overlay */}
      {isMobileView && isMobileOpen && (
        <div className="sidebar-overlay" onClick={handleClose} />
      )}
      
      <div className={sidebarClasses}>
        {/* Back/Close Button - Always visible when cart is open */}
        <button className="sidebar-back-btn" onClick={handleClose}>
          <span className="back-icon">←</span>
          <span className="back-text">Back to Menu</span>
        </button>

        {isMobileView && (
          <button className="sidebar-close" onClick={handleClose}>
            ✕
          </button>
        )}
        
        <div className="sidebar-header">
          <h3 className="sidebar-title">
            <span className="fire-icon">🔥</span> Kudong Sizzling
          </h3>
          <p className="sidebar-subtitle">Marilao Branch</p>
        </div>

        <div className="sidebar-section">
          <h4 className="sidebar-section-title">
            <span className="icon">⭐</span> Quick Menu
          </h4>
          <div className="category-tabs">
            {Object.keys(menuCategories).map(category => (
              <button
                key={category}
                className={`category-tab ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category === 'bestSellers' ? '🔥 Best' : 
                 category === 'meals' ? '🍽️ Meals' :
                 category === 'doubles' ? '⚡ Doubles' : '🥤 Drinks'}
              </button>
            ))}
          </div>
          <div className="menu-items">
            {menuCategories[activeCategory].map((item, index) => (
              <div key={index} className="menu-item">
                <div className="menu-item-header">
                  <h5>{item.name}</h5>
                  <span className="menu-price">{item.price}</span>
                </div>
                <p className="menu-description">{item.description}</p>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => addToCart(item)}
                >
                  + Add
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Section - Only shows if has items */}
        {cartItems.length > 0 && (
          <div className="sidebar-section">
            <h4 className="sidebar-section-title">
              <span className="cart-icon">🛒</span> Current Order
              <span className="item-count">({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</span>
            </h4>
            <div className="cart-items">
              {cartItems.map((item, index) => (
                <div key={index} className="cart-item">
                  <div className="cart-item-info">
                    <span className="cart-item-name">{item.name}</span>
                    <div className="cart-item-actions">
                      <button 
                        className="qty-btn"
                        onClick={() => updateQuantity(item.name, -1)}
                      >-</button>
                      <span className="cart-item-quantity">{item.quantity}</span>
                      <button 
                        className="qty-btn"
                        onClick={() => updateQuantity(item.name, 1)}
                      >+</button>
                    </div>
                  </div>
                  <span className="cart-item-price">
                    ₱{(item.price * item.quantity).toFixed(0)}
                  </span>
                </div>
              ))}
            </div>
            <div className="cart-total">
              <span>Total:</span>
              <span className="total-price">₱{total.toFixed(0)}</span>
            </div>
            <button className="checkout-btn">
              🔥 Checkout Now
            </button>
          </div>
        )}

        <div className="sidebar-section">
          <h4 className="sidebar-section-title">
            <span className="icon">📞</span> Quick Order
          </h4>
          <div className="quick-actions">
            <a href="tel:+639123456789" className="action-btn">
              <span>📞</span>
              Call for Delivery
            </a>
            <button className="action-btn">
              <span>📍</span>
              Our Location
            </button>
            <button className="action-btn">
              <span>⏰</span>
              Open: 10AM-10PM
            </button>
          </div>
        </div>

        <div className="sidebar-footer">
          <p className="discount-note">🎉 Order 3 meals, get 1 drink FREE!</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
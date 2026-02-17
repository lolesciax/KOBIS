import React, { useState } from 'react';
import '../styles/MenuSystem.css';

const MenuSystem = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeExtra, setActiveExtra] = useState(false);
  
  // Your actual menu data
  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'bestSellers', name: '🔥 Best Sellers' },
    { id: 'meals', name: 'Main Meals' },
    { id: 'doubles', name: 'Double Servings' },
    { id: 'drinks', name: 'Drinks' },
    { id: 'extras', name: 'Add-ons' }
  ];

  // Best sellers from your list
  const bestSellers = ['Liempo', 'Pork chop', 'Sisig with egg'];

  // Complete menu items from your list
  const allMenuItems = [
    // Best Sellers (marked)
    { id: 1, name: 'Sisig with egg', category: 'meals', price: 70, description: 'Crispy pork sisig with sunny side up egg', bestSeller: true, popular: true },
    { id: 2, name: 'Liempo', category: 'meals', price: 75, description: 'Grilled pork belly with special marinade', bestSeller: true, popular: true },
    { id: 3, name: 'Pork chop', category: 'meals', price: 70, description: 'Juicy pork chop with gravy', bestSeller: true, popular: true },
    
    // Other Main Meals
    { id: 4, name: 'Lechon kawali', category: 'meals', price: 70, description: 'Crispy deep-fried pork belly' },
    { id: 5, name: 'Chicken sisig', category: 'meals', price: 70, description: 'Chicken version of the classic sisig' },
    { id: 6, name: 'Fried chicken', category: 'meals', price: 70, description: 'Crispy fried chicken with dipping sauce' },
    { id: 7, name: 'Chicken teriyaki', category: 'meals', price: 55, description: 'Grilled chicken with teriyaki glaze' },
    { id: 8, name: 'Beef tapa', category: 'meals', price: 65, description: 'Marinated beef slices with garlic rice' },
    { id: 9, name: 'Pork bbq', category: 'meals', price: 65, description: 'Skewered grilled pork with sweet BBQ sauce' },
    { id: 10, name: 'Tocino', category: 'meals', price: 60, description: 'Sweet cured pork with garlic rice' },
    { id: 11, name: 'Boneless bangus', category: 'meals', price: 55, description: 'Deboned milkfish, grilled or fried' },
    { id: 12, name: 'Buttered chicken', category: 'meals', price: 70, description: 'Creamy butter chicken with sauce' },
    { id: 13, name: 'Sweet chili shrimp', category: 'meals', price: 70, description: 'Shrimp in sweet chili sauce' },
    
    // Double Servings
    { id: 14, name: 'Double Liempo', category: 'doubles', price: 130, description: 'Double serving of grilled pork belly' },
    { id: 15, name: 'Double Pork chop', category: 'doubles', price: 120, description: 'Two pork chops with extra gravy' },
    { id: 16, name: 'Double Hotdog', category: 'doubles', price: 55, description: 'Two hotdogs with special sauce' },
    { id: 17, name: 'Double Burger steak', category: 'doubles', price: 50, description: 'Two burger patties with mushroom gravy' },
    
    // Drinks
    { id: 18, name: 'Ice tea', category: 'drinks', price: 35, description: 'Refreshing iced tea' },
    { id: 19, name: 'Kasalo', category: 'drinks', price: 40, description: 'Local specialty drink' },
    
    // Extras
    { id: 20, name: 'Hotdog', category: 'extras', price: 15, description: 'Add a hotdog to any meal' },
    { id: 21, name: 'Egg', category: 'extras', price: 15, description: 'Add a sunny side up egg' }
  ];

  // Filter items based on selected category
  const getFilteredItems = () => {
    if (activeCategory === 'all') return allMenuItems;
    if (activeCategory === 'bestSellers') return allMenuItems.filter(item => item.bestSeller);
    if (activeCategory === 'extras') return allMenuItems.filter(item => item.category === 'extras');
    return allMenuItems.filter(item => item.category === activeCategory);
  };

  const filteredItems = getFilteredItems();

  // Handle add to cart
  const handleAddToCart = (item) => {
    const cartItem = {
      name: item.name,
      price: item.price,
      quantity: 1
    };
    
    // Dispatch custom event for sidebar
    window.dispatchEvent(new CustomEvent('addToCart', { detail: cartItem }));
  };

  return (
    <section className="menu-system" id="menu">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Kudong Sizzling Menu</h2>
          <p className="section-subtitle">Authentic Filipino sizzling dishes with our signature flavors</p>
          
          {/* Best Sellers Banner */}
          <div className="best-sellers-banner">
            <span className="banner-icon">🔥</span>
            <span className="banner-text">TOP SELLERS: Liempo • Pork Chop • Sisig with Egg</span>
            <span className="banner-icon">🔥</span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="menu-categories">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="menu-grid">
          {filteredItems.map(item => (
            <div key={item.id} className={`menu-item-card ${item.bestSeller ? 'best-seller' : ''}`}>
              <div className="menu-item-header">
                <div className="menu-item-title">
                  <h3>{item.name}</h3>
                  {item.bestSeller && <span className="best-seller-badge">🔥 BEST SELLER</span>}
                  {item.popular && <span className="popular-badge">⭐ POPULAR</span>}
                </div>
                <span className="menu-item-price">₱{item.price}</span>
              </div>
              <p className="menu-item-description">{item.description}</p>
              <div className="menu-item-footer">
                <span className="item-category">{item.category.toUpperCase()}</span>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(item)}
                >
                  <span>+</span> Add to Order
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Price Summary */}
        <div className="price-summary">
          <h3>💡 Menu Notes</h3>
          <div className="summary-grid">
            <div className="summary-item">
              <h4>Best Sellers</h4>
              <p>Liempo (₱75), Pork Chop (₱70), Sisig with Egg (₱70)</p>
            </div>
            <div className="summary-item">
              <h4>Most Affordable</h4>
              <p>Double Burger Steak (₱50), Chicken Teriyaki (₱55)</p>
            </div>
            <div className="summary-item">
              <h4>Add-ons</h4>
              <p>Hotdog (+₱15), Egg (+₱15)</p>
            </div>
            <div className="summary-item">
              <h4>Drinks</h4>
              <p>Ice Tea (₱35), Kasalo (₱40)</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="menu-cta">
          <div className="cta-content">
            <h3>Ready to Order?</h3>
            <p>Visit us at our Marilao branch or call for delivery!</p>
            <div className="cta-buttons">
              <button className="cta-btn primary">📞 Call to Order</button>
              <button className="cta-btn secondary">
                <a href="#location">📍 View Location</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuSystem;
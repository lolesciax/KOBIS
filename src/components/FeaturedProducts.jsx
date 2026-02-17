import React, { useState } from 'react';
import '../styles/FeaturedProducts.css';
import ProductModal from './ProductModal.jsx';

const FeaturedProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const featuredItems = [
    {
      id: 2,
      name: 'Liempo',
      description: 'Grilled pork belly with special marinade, tender and flavorful',
      price: '₱75',
      image: '/Products/Liempo.png', 
      badge: '🔥 Best Seller'
    },
    {
      id: 1,
      name: 'Sisig with Egg',
      description: 'Crispy pork sisig sizzling with sunny side up egg',
      price: '₱70',
      image: '/Products/Sisig.png', 
      badge: '🔥 Best Seller'
    },
    {
      id: 3,
      name: 'Pork Chop',
      description: 'Juicy pork chop with rich gravy, perfectly grilled',
      price: '₱70',
      image: '/Products/Pork%20Chop.png', 
      badge: '🔥 Best Seller'
    }
  ];

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <section className="featured-section" id="featured">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Top Sellers</h2>
          <p className="section-subtitle">Customer favorites you must try</p>
        </div>
        
        <div className="featured-grid">
          {featuredItems.map(item => (
            <div 
              key={item.id} 
              className="featured-card"
              onClick={() => handleProductClick(item)}
              style={{ cursor: 'pointer' }}
            >
              <div className="featured-image">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="product-image"
                />
                <span className="featured-badge">{item.badge}</span>
              </div>
              <div className="featured-content">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="featured-footer">
                  <span className="featured-price">{item.price}</span>
                  <button 
                    className="featured-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductClick(item);
                    }}
                  >
                    View in 3D
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProductModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
      />
    </section>
  );
};

export default FeaturedProducts;
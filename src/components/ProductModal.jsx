import React, { useState } from 'react';
import '../styles/ProductModal.css';
import Product3D from './Product3D.jsx';
import ARViewer from './ARViewer.jsx';

const ProductModal = ({ isOpen, onClose, product }) => {
  const [selectedRice, setSelectedRice] = useState('regular');
  const [selectedGravy, setSelectedGravy] = useState('regular');
  const [quantity, setQuantity] = useState(1);
  const [showAR, setShowAR] = useState(false);

  if (!isOpen) return null;

  const riceOptions = [
    { id: 'regular', name: 'Regular Rice', price: 0 },
    { id: 'java', name: 'Java Rice', price: 15 }
  ];

  const gravyOptions = [
    { id: 'none', name: 'No Gravy', price: 0 },
    { id: 'regular', name: 'Regular Gravy', price: 0 },
    { id: 'extra', name: 'Extra Gravy', price: 10 }
  ];

  const handleAddToCart = () => {
    const order = {
      product: product,
      rice: selectedRice,
      gravy: selectedGravy,
      quantity: quantity,
      totalPrice: (parseInt(product.price.replace('₱', '')) + 
        (selectedRice !== 'regular' ? 10 : 0) + 
        (selectedGravy === 'extra' ? 10 : 0)) * quantity
    };
    console.log('Added to cart:', order);
    onClose(); // This closes the main modal
  };

  const handleARClose = () => {
    setShowAR(false);
    // DON'T call onClose() here - this keeps the main modal open
  };

  const handleMainModalClose = (e) => {
    // Only close if clicking the overlay, not if AR is open
    if (!showAR) {
      onClose();
    }
  };

  return (
    <>
      <div className="modal-overlay" onClick={handleMainModalClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>×</button>
          
          <div className="modal-grid">
            {/* 3D Product View - Always visible */}
            <div className="modal-3d-view">
              <Product3D product={product} />
            </div>
            
            {/* Product Details & Customization */}
            <div className="modal-details">
              <h2>{product?.name}</h2>
              <p className="modal-description">{product?.description}</p>
              
              <div className="modal-price">
                <span className="price-label">Base Price:</span>
                <span className="price-value">{product?.price}</span>
              </div>
              
              {/* Rice Selection */}
              <div className="customization-section">
                <h3>Select Rice</h3>
                <div className="option-grid">
                  {riceOptions.map(option => (
                    <label key={option.id} className="option-card">
                      <input
                        type="radio"
                        name="rice"
                        value={option.id}
                        checked={selectedRice === option.id}
                        onChange={(e) => setSelectedRice(e.target.value)}
                      />
                      <span className="option-name">{option.name}</span>
                      {option.price > 0 && (
                        <span className="option-price">+₱{option.price}</span>
                      )}
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Gravy Selection */}
              <div className="customization-section">
                <h3>Gravy Options</h3>
                <div className="option-grid">
                  {gravyOptions.map(option => (
                    <label key={option.id} className="option-card">
                      <input
                        type="radio"
                        name="gravy"
                        value={option.id}
                        checked={selectedGravy === option.id}
                        onChange={(e) => setSelectedGravy(e.target.value)}
                      />
                      <span className="option-name">{option.name}</span>
                      {option.price > 0 && (
                        <span className="option-price">+₱{option.price}</span>
                      )}
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Quantity */}
              <div className="customization-section">
                <h3>Quantity</h3>
                <div className="quantity-selector">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="quantity-btn"
                  >−</button>
                  <span className="quantity-value">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="quantity-btn"
                  >+</button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="modal-actions">
                <button className="btn-primary" onClick={handleAddToCart}>
                  Add to Cart
                </button>
                <button className="btn-ar" onClick={() => setShowAR(true)}>
                  View in AR
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AR Modal - Separate from main modal */}
      {showAR && (
        <ARViewer 
          product={product} 
          onClose={handleARClose}
          modelPath="/assets/Sisig3D.glb"
        />
      )}
    </>
  );
};

export default ProductModal;
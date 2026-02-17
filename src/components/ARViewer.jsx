import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, useGLTF, OrbitControls, Html } from '@react-three/drei';
import '../styles/ARViewer.css';

// Loading component
const Loader = () => (
  <Html center>
    <div className="ar-loader">
      <div className="loader-spinner"></div>
      <p>Loading AR Model...</p>
    </div>
  </Html>
);

// Model component
const ARModel = ({ modelPath, scale = 1.5 }) => {
  const { scene } = useGLTF(modelPath);
  
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          
          if (child.material) {
            child.material.roughness = 0.3;
            child.material.metalness = 0.1;
            child.material.envMapIntensity = 1.5;
          }
        }
      });
    }
  }, [scene]);

  return (
    <primitive 
      object={scene} 
      scale={[scale, scale, scale]} 
      position={[0, 0, 0]} 
    />
  );
};

// Main AR Viewer Component
const ARViewer = ({ product, onClose, modelPath }) => {
  const [deviceType, setDeviceType] = useState('desktop');

  // Detect device type
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      setDeviceType('ios');
    } else if (/android/i.test(userAgent)) {
      setDeviceType('android');
    } else {
      setDeviceType('desktop');
    }
  }, []);

  // Handle AR button click based on device
  const handleARClick = () => {
    if (deviceType === 'android') {
      const intentUrl = `intent://arvr.google.com/scene-viewer/1.2?file=${window.location.origin}${modelPath}&title=${product?.name}&mode=ar_preferred#Intent;scheme=https;package=com.google.ar.core;action=android.intent.action.VIEW;end`;
      window.location.href = intentUrl;
    } else if (deviceType === 'ios') {
      alert('iOS AR coming soon! For now, please use the 3D viewer below.');
    }
  };

  // Stop propagation to prevent closing main modal
  const handleOverlayClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="ar-modal-overlay" onClick={onClose}>
      <div className="ar-modal-content" onClick={e => e.stopPropagation()}>
        {/* Exit Button */}
        <button className="ar-exit-btn" onClick={onClose}>
          <span className="exit-text">Close</span>
        </button>
        
        <div className="ar-container">
          {/* 3D View */}
          <div className="ar-view">
            <Canvas 
              camera={{ position: [3, 2, 5], fov: 50 }}
              style={{ background: '#0f0f0f' }}
            >
              <ambientLight intensity={0.8} />
              <directionalLight position={[5, 5, 5]} intensity={1.5} />
              <directionalLight position={[-5, 3, 5]} intensity={0.8} />
              
              <Suspense fallback={<Loader />}>
                <ARModel modelPath={modelPath} />
              </Suspense>
              
              <Environment preset="city" background={false} />
              <OrbitControls 
                enableZoom={true}
                enablePan={true}
                enableRotate={true}
                rotateSpeed={0.5}
              />
            </Canvas>
            
            {/* Device badge */}
            <div className="device-badge">
              {deviceType === 'android' && 'Android Device'}
              {deviceType === 'ios' && 'iOS Device'}
              {deviceType === 'desktop' && 'Desktop View'}
            </div>
          </div>

          {/* Controls */}
          <div className="ar-controls">
            <h3 className="ar-product-title">{product?.name}</h3>
            
            <div className="ar-device-message">
              {deviceType === 'android' && (
                <div className="success-message">
                  <span>AR is supported on your Android device!</span>
                </div>
              )}
              {deviceType === 'ios' && (
                <div className="warning-message">
                  <span>iOS AR requires USDZ format. Using 3D viewer instead.</span>
                </div>
              )}
              {deviceType === 'desktop' && (
                <div className="info-message">
                  <span>Using 3D viewer (AR requires mobile device)</span>
                </div>
              )}
            </div>
            
            <button 
              className={`ar-action-btn ${deviceType}`}
              onClick={handleARClick}
            >
              <span className="btn-text">
                {deviceType === 'android' ? 'Launch AR on Phone' :
                 deviceType === 'ios' ? 'View in 3D' :
                 'Rotate & Zoom in 3D'}
              </span>
            </button>

            {deviceType === 'android' && (
              <div className="android-instructions">
                <h4>Android AR Instructions:</h4>
                <ol>
                  <li>Make sure ARCore is installed (Google Play Services for AR)</li>
                  <li>Click the button above</li>
                  <li>Allow camera permissions</li>
                  <li>Move your phone to scan the area</li>
                  <li>Tap on a flat surface to place the object</li>
                </ol>
              </div>
            )}

            {deviceType === 'ios' && (
              <div className="ios-instructions">
                <h4>iOS Note:</h4>
                <p>For AR on iOS, we need to convert the model to USDZ format.</p>
                <button 
                  className="convert-btn"
                  onClick={() => window.open('https://www.creators3d.com/online-converter', '_blank')}
                >
                  Convert GLB to USDZ
                </button>
              </div>
            )}

            <div className="ar-instructions">
              <h4>3D Viewer Controls:</h4>
              <ul>
                <li><strong>Rotate:</strong> Click and drag (mobile: one finger)</li>
                <li><strong>Zoom:</strong> Scroll wheel (mobile: pinch)</li>
                <li><strong>Pan:</strong> Right-click and drag (mobile: two fingers)</li>
              </ul>
            </div>

            {/* Close button at bottom */}
            <button className="ar-close-bottom" onClick={onClose}>
              Close Viewer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ARViewer;
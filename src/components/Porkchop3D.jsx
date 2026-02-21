import React, { useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Center, useGLTF, Html, ContactShadows } from '@react-three/drei';

const Loader = () => (
  <Html center>
    <div style={{ color: 'white', fontSize: '14px', background: 'rgba(0,0,0,0.5)', padding: '8px 16px', borderRadius: '20px' }}>
      Loading 3D Model...
    </div>
  </Html>
);

const PorkchopModel = () => {
  const { scene } = useGLTF('/assets/Porkchop3D.glb');
  
  // Force high-quality texture settings
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          // CRITICAL: Force texture to show sharply
          if (child.material.map) {
            // Disable mipmapping and force sharp rendering
            child.material.map.minFilter = 1006; // LinearMipmapLinear (standard)
            child.material.map.magFilter = 1006; // Linear
            child.material.map.anisotropy = 16;  // Max anisotropy for sharpness
            child.material.map.generateMipmaps = true;
            child.material.map.needsUpdate = true; // Force texture update
          }
          
          // Ensure material renders sharply
          child.material.roughness = 0.3;
          child.material.metalness = 0.1;
          child.material.premultipliedAlpha = false;
          
          // Force material update
          child.material.needsUpdate = true;
          
          // Log texture info for debugging
          if (child.material.map) {
            console.log('Texture found:', child.material.map.image);
          }
        }
      });
    }
  }, [scene]);
  
  useFrame((state) => {
    if (scene) {
      scene.rotation.y += 0.001;
    }
  });

  return (
    <primitive 
      object={scene} 
      scale={[2, 2, 2]} 
      position={[0, -1, 0]} 
    />
  );
};

// Preload model
useGLTF.preload('/assets/Porkchop3D.glb');

const Porkchop3D = () => {
  return (
    <Canvas 
      camera={{ position: [4, 3, 8], fov: 45 }}
      shadows
      gl={{ 
        antialias: true,
        powerPreference: "high-performance",
        alpha: false,
        precision: "highp", // Force high precision
        premultipliedAlpha: false
      }}
      dpr={[1, 2]} // Set device pixel ratio (adjusts for retina displays)
    >
      {/* Better lighting setup */}
      <ambientLight intensity={0.6} />
      
      {/* Main key light */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048} // Higher resolution shadows
        shadow-mapSize-height={2048}
      />
      
      {/* Fill light */}
      <directionalLight
        position={[-5, 3, 5]}
        intensity={0.8}
      />
      
      {/* Back light */}
      <directionalLight
        position={[0, 5, -5]}
        intensity={0.5}
      />
      
      {/* Accent lights */}
      <pointLight position={[2, 3, 2]} intensity={0.4} />
      <pointLight position={[-2, 2, -2]} intensity={0.3} />
      
      <Center>
        <Suspense fallback={<Loader />}>
          <PorkchopModel />
        </Suspense>
      </Center>
      
      {/* Add subtle shadows on ground */}
      <ContactShadows
        opacity={0.4}
        scale={10}
        blur={1} // Less blur for sharper shadows
        far={4}
        resolution={512} // Higher resolution shadows
        color="#000000"
      />
      
      <OrbitControls 
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        rotateSpeed={0.5}
        zoomSpeed={1.2}
        minDistance={3}
        maxDistance={15}
        autoRotate={false}
      />
      
      <Environment 
        preset="city" 
        background={false}
        blur={0} // Remove environment blur
      />
    </Canvas>
  );
};

export default Porkchop3D;
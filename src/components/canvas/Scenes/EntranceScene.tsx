/**
 * Entrance Scene
 * 
 * Immersive WebGL experience for the home route.
 * Pure atmosphere, minimal UI elements.
 */

'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

export function EntranceScene() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      
      {/* Placeholder geometry - will be replaced with proper scene */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <torusKnotGeometry args={[1, 0.3, 100, 16]} />
        <meshStandardMaterial 
          color="#13161F" 
          wireframe 
          transparent 
          opacity={0.1}
        />
      </mesh>
    </>
  );
}

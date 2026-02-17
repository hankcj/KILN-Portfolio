/**
 * Entrance Scene
 * 
 * Immersive WebGL experience for the home route.
 * Pure atmosphere, minimal UI elements.
 * Dark mode with subtle accent lighting.
 */

'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Points } from 'three';

export function EntranceScene() {
  const meshRef = useRef<Mesh>(null);
  const particlesRef = useRef<Points>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.05;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <>
      {/* Central wireframe orb - represents the kiln/core */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial 
          color="#0036D8" 
          wireframe 
          transparent 
          opacity={0.15}
        />
      </mesh>

      {/* Outer wireframe shell */}
      <mesh ref={meshRef} position={[0, 0, 0]} scale={1.5}>
        <icosahedronGeometry args={[1.5, 0]} />
        <meshBasicMaterial 
          color="#FAF6F0" 
          wireframe 
          transparent 
          opacity={0.05}
        />
      </mesh>

      {/* Particle field for depth */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={200}
            array={new Float32Array(Array.from({ length: 600 }, () => (Math.random() - 0.5) * 20))}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color="#FAF6F0"
          transparent
          opacity={0.3}
          sizeAttenuation
        />
      </points>
    </>
  );
}

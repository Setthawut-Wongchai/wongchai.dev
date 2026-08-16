'use client';

import { Suspense, useRef, type RefObject } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import type { Mesh } from 'three';
import type { MotionValue } from 'framer-motion';

function GeminiBlob({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const { pointer } = state;
    mesh.rotation.y += 0.0015;
    mesh.rotation.x += (pointer.y * 0.35 - mesh.rotation.x) * 0.05;
    mesh.rotation.z += (pointer.x * 0.2 - mesh.rotation.z) * 0.05;

    const progress = scrollProgress.get();
    mesh.position.y = progress * -0.8;
    const scale = 1 - progress * 0.15;
    mesh.scale.setScalar(scale);
  });

  return (
    <Float speed={1.6} rotationIntensity={0.5} floatIntensity={1.1}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 8]} />
        <MeshDistortMaterial
          color="#4285f4"
          emissive="#9b72cb"
          emissiveIntensity={0.25}
          roughness={0.15}
          metalness={0.65}
          distort={0.42}
          speed={2.2}
        />
      </mesh>
    </Float>
  );
}

interface HeroSceneProps {
  scrollProgress: MotionValue<number>;
  eventSource: RefObject<HTMLElement | null>;
}

export function HeroScene({ scrollProgress, eventSource }: HeroSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 4.4], fov: 42 }}
      gl={{ alpha: true, antialias: true }}
      eventSource={eventSource as RefObject<HTMLElement>}
      eventPrefix="client"
      style={{ pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 3, 3]} intensity={1.4} color="#ffffff" />
      <directionalLight position={[-3, -2, -2]} intensity={0.6} color="#d96570" />
      <Suspense fallback={null}>
        <GeminiBlob scrollProgress={scrollProgress} />
      </Suspense>
    </Canvas>
  );
}

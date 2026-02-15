import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Box, Torus, Icosahedron, Octahedron, Dodecahedron, Stars } from '@react-three/drei';
import * as THREE from 'three';

function FloatingGeometry({ position, geometry, color, speed = 1, scale = 1 }: { 
  position: [number, number, number]; 
  geometry: 'sphere' | 'box' | 'torus' | 'icosahedron' | 'octahedron' | 'dodecahedron';
  color: string;
  speed?: number;
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
      // Add subtle floating motion
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.3;
    }
  });

  const GeometryComponent = {
    sphere: <Sphere args={[0.5 * scale, 32, 32]} />,
    box: <Box args={[0.7 * scale, 0.7 * scale, 0.7 * scale]} />,
    torus: <Torus args={[0.4 * scale, 0.15 * scale, 16, 32]} />,
    icosahedron: <Icosahedron args={[0.5 * scale, 0]} />,
    octahedron: <Octahedron args={[0.5 * scale, 0]} />,
    dodecahedron: <Dodecahedron args={[0.4 * scale, 0]} />,
  }[geometry];

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        {GeometryComponent}
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.7}
          distort={0.3}
          speed={2}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
    </Float>
  );
}

function GlowingSphere({ position, color, size = 0.3 }: {
  position: [number, number, number];
  color: string;
  size?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshBasicMaterial color={color} transparent opacity={0.8} />
    </mesh>
  );
}

function ParticleField() {
  const count = 300;
  const mesh = useRef<THREE.Points>(null);

  const [particlesPosition, particlesColor] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25;

      // Gradient colors from green to cyan
      const t = Math.random();
      colors[i * 3] = 0 + t * 0.2; // R
      colors[i * 3 + 1] = 0.8 + t * 0.2; // G
      colors[i * 3 + 2] = 0.5 + t * 0.5; // B
    }
    return [positions, colors];
  }, []);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.03;
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particlesColor}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        transparent
        opacity={0.8}
        sizeAttenuation
        vertexColors
      />
    </points>
  );
}

function FloatingRing({ position, rotation = [0, 0, 0], color, size = 2 }: {
  position: [number, number, number];
  rotation?: [number, number, number];
  color: string;
  size?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <torusGeometry args={[size, 0.02, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.5} />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
      <pointLight position={[-5, -5, -5]} intensity={0.4} color="#00ff88" />
      <pointLight position={[5, -5, 5]} intensity={0.3} color="#00ccff" />
      
      {/* Stars background */}
      <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
      
      <ParticleField />
      
      {/* Floating rings */}
      <FloatingRing position={[0, 0, -5]} color="#00ff88" size={3} />
      <FloatingRing position={[0, 0, -8]} rotation={[Math.PI / 4, 0, 0]} color="#00ccff" size={4} />
      
      {/* Glowing orbs */}
      <GlowingSphere position={[-6, 3, -5]} color="#00ff88" size={0.2} />
      <GlowingSphere position={[6, -2, -4]} color="#00ccff" size={0.15} />
      <GlowingSphere position={[4, 4, -6]} color="#00ff88" size={0.25} />
      
      {/* Floating geometry */}
      <FloatingGeometry position={[-5, 2, -4]} geometry="icosahedron" color="#00ff88" speed={0.8} scale={1.2} />
      <FloatingGeometry position={[5, -1, -5]} geometry="octahedron" color="#00ccff" speed={1.2} scale={1} />
      <FloatingGeometry position={[-4, -2, -6]} geometry="dodecahedron" color="#00ff88" speed={0.6} scale={0.9} />
      <FloatingGeometry position={[4, 3, -7]} geometry="torus" color="#00aa66" speed={1} scale={1.1} />
      <FloatingGeometry position={[0, -4, -5]} geometry="icosahedron" color="#00ccaa" speed={0.9} scale={0.8} />
      <FloatingGeometry position={[-3, 4, -8]} geometry="sphere" color="#00ff99" speed={0.7} scale={1.3} />
      <FloatingGeometry position={[6, 1, -9]} geometry="box" color="#00dd88" speed={0.5} scale={0.7} />
    </>
  );
}

interface Scene3DBackgroundProps {
  className?: string;
}

export default function Scene3DBackground({ className = '' }: Scene3DBackgroundProps) {
  return (
    <div className={`fixed inset-0 -z-10 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background pointer-events-none" />
    </div>
  );
}

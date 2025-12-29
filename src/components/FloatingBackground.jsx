import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';
import './FloatingBackground.css';

// Lotus/Rose Flower Geometry
function Flower({ position, color, scale = 1, rotationSpeed = 0.001 }) {
  const groupRef = useRef();
  const innerRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += rotationSpeed;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y -= rotationSpeed * 2;
    }
  });

  // Create petal shape
  const petalShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.15, 0.3, 0.4, 0.6, 0, 1);
    shape.bezierCurveTo(-0.4, 0.6, -0.15, 0.3, 0, 0);
    return shape;
  }, []);

  const petalGeometry = useMemo(() => {
    const extrudeSettings = {
      depth: 0.02,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 3,
    };
    return new THREE.ExtrudeGeometry(petalShape, extrudeSettings);
  }, [petalShape]);

  const petalCount = 8;
  const innerPetalCount = 6;

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
      <group ref={groupRef} position={position} scale={scale}>
        {/* Outer petals */}
        {Array.from({ length: petalCount }).map((_, i) => {
          const angle = (i / petalCount) * Math.PI * 2;
          return (
            <mesh
              key={`outer-${i}`}
              geometry={petalGeometry}
              position={[
                Math.cos(angle) * 0.15,
                0,
                Math.sin(angle) * 0.15
              ]}
              rotation={[
                -Math.PI * 0.35,
                angle + Math.PI / 2,
                0
              ]}
            >
              <meshStandardMaterial
                color={color}
                transparent
                opacity={0.85}
                side={THREE.DoubleSide}
                emissive={color}
                emissiveIntensity={0.2}
                metalness={0.1}
                roughness={0.6}
              />
            </mesh>
          );
        })}
        
        {/* Inner petals */}
        <group ref={innerRef}>
          {Array.from({ length: innerPetalCount }).map((_, i) => {
            const angle = (i / innerPetalCount) * Math.PI * 2 + Math.PI / innerPetalCount;
            return (
              <mesh
                key={`inner-${i}`}
                geometry={petalGeometry}
                position={[
                  Math.cos(angle) * 0.08,
                  0.05,
                  Math.sin(angle) * 0.08
                ]}
                rotation={[
                  -Math.PI * 0.25,
                  angle + Math.PI / 2,
                  0
                ]}
                scale={0.6}
              >
                <meshStandardMaterial
                  color={new THREE.Color(color).multiplyScalar(1.2)}
                  transparent
                  opacity={0.9}
                  side={THREE.DoubleSide}
                  emissive={color}
                  emissiveIntensity={0.3}
                  metalness={0.1}
                  roughness={0.5}
                />
              </mesh>
            );
          })}
        </group>
        
        {/* Center */}
        <mesh position={[0, 0.1, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color="#ffd700"
            emissive="#ffd700"
            emissiveIntensity={0.5}
            metalness={0.3}
            roughness={0.4}
          />
        </mesh>
      </group>
    </Float>
  );
}

// Floating Petal
function FloatingPetal({ position, color, delay = 0 }) {
  const meshRef = useRef();
  const initialY = position[1];
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime + delay;
      meshRef.current.position.y = initialY + Math.sin(time * 0.5) * 0.5;
      meshRef.current.position.x = position[0] + Math.sin(time * 0.3) * 0.3;
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.z += 0.003;
    }
  });

  const petalShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.1, 0.2, 0.25, 0.4, 0, 0.6);
    shape.bezierCurveTo(-0.25, 0.4, -0.1, 0.2, 0, 0);
    return shape;
  }, []);

  return (
    <mesh ref={meshRef} position={position}>
      <shapeGeometry args={[petalShape]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.7}
        side={THREE.DoubleSide}
        emissive={color}
        emissiveIntensity={0.15}
      />
    </mesh>
  );
}

// Sparkle Particles
function Sparkles() {
  const particlesRef = useRef();
  const count = 100;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  const colors = useMemo(() => {
    const col = new Float32Array(count * 3);
    const colorOptions = [
      new THREE.Color('#ffd700'),
      new THREE.Color('#ff69b4'),
      new THREE.Color('#ffb6c1'),
      new THREE.Color('#ffffff'),
    ];
    for (let i = 0; i < count; i++) {
      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return col;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      const positions = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < count; i++) {
        positions[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.001;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        transparent
        opacity={0.8}
        vertexColors
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Main Scene
function Scene() {
  const flowers = useMemo(() => [
    { position: [-4, 2, -3], color: '#ff69b4', scale: 1.2 },
    { position: [4, -1, -4], color: '#ffb6c1', scale: 0.9 },
    { position: [-3, -2, -2], color: '#c71585', scale: 1 },
    { position: [3, 2.5, -5], color: '#ff1493', scale: 1.1 },
    { position: [0, 3, -6], color: '#ff69b4', scale: 0.8 },
    { position: [-5, 0, -4], color: '#ffb6c1', scale: 0.7 },
    { position: [5, -2, -3], color: '#c71585', scale: 1 },
    { position: [1, -3, -4], color: '#ff69b4', scale: 0.85 },
  ], []);

  const petals = useMemo(() => {
    const petalArray = [];
    const colors = ['#ff69b4', '#ffb6c1', '#ffd700', '#ff1493', '#c71585'];
    for (let i = 0; i < 30; i++) {
      petalArray.push({
        position: [
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 8 - 2
        ],
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * Math.PI * 2
      });
    }
    return petalArray;
  }, []);

  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.4} />
      
      {/* Main directional light */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.8}
        color="#ffffff"
      />
      
      {/* Accent lights for romantic glow */}
      <pointLight position={[-5, 3, 2]} intensity={0.6} color="#ff69b4" />
      <pointLight position={[5, -3, 2]} intensity={0.5} color="#ffd700" />
      <pointLight position={[0, 0, 3]} intensity={0.3} color="#ffb6c1" />
      
      {/* Background stars */}
      <Stars
        radius={50}
        depth={50}
        count={500}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />
      
      {/* 3D Flowers */}
      {flowers.map((flower, i) => (
        <Flower
          key={`flower-${i}`}
          position={flower.position}
          color={flower.color}
          scale={flower.scale}
          rotationSpeed={0.002 + Math.random() * 0.002}
        />
      ))}
      
      {/* Floating Petals */}
      {petals.map((petal, i) => (
        <FloatingPetal
          key={`petal-${i}`}
          position={petal.position}
          color={petal.color}
          delay={petal.delay}
        />
      ))}
      
      {/* Sparkle particles */}
      <Sparkles />
    </>
  );
}

function FloatingBackground() {
  return (
    <div className="floating-background">
      {/* Wedding image as base background */}
      <div className="wedding-bg-image" />
      
      {/* Dark overlay for better contrast */}
      <div className="wedding-bg-overlay" />
      
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        {/* Transparent background to show wedding image behind */}
        <fog attach="fog" args={['rgba(45, 31, 61, 0.7)', 8, 25]} />
        <Scene />
      </Canvas>
      
      {/* CSS gradient overlay for depth */}
      <div className="gradient-overlay" />
    </div>
  );
}

export default FloatingBackground;

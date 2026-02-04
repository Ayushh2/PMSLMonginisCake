import { Suspense, useRef, useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { X, RotateCcw, Move3D, Sparkles } from 'lucide-react';
import * as THREE from 'three';

// Pre-computed deterministic sprinkle data to avoid Math.random in render
const SPRINKLE_DATA = Array.from({ length: 30 }, (_, i) => {
  // Use deterministic seed based on index
  const seed = (i * 137.5) % 1;
  const angle = seed * Math.PI * 2;
  const radius = ((i * 73) % 85) / 100;
  const rotX = ((i * 31) % 100) / 100 * Math.PI;
  const rotY = ((i * 47) % 100) / 100 * Math.PI;
  const rotZ = ((i * 61) % 100) / 100 * Math.PI;
  return { angle, radius, rotX, rotY, rotZ };
});

const SPRINKLE_COLORS = ['#ff1493', '#00bfff', '#ffd700', '#32cd32', '#ff6347'];

interface Cake3DViewerProps {
  isOpen: boolean;
  onClose: () => void;
  cakeName: string;
  cakeType?: 'chocolate' | 'vanilla' | 'strawberry' | 'redvelvet' | 'butterscotch';
}

// Pre-computed cake colors to avoid object recreation
const CAKE_COLORS = {
  chocolate: { base: '#4a2c1f', middle: '#6b3d2e', top: '#8b4513', frosting: '#d4a574' },
  vanilla: { base: '#f5deb3', middle: '#ffe4b5', top: '#fff8dc', frosting: '#ffffff' },
  strawberry: { base: '#c41e3a', middle: '#dc143c', top: '#ff69b4', frosting: '#ffb6c1' },
  redvelvet: { base: '#8b0000', middle: '#a52a2a', top: '#cd5c5c', frosting: '#fffaf0' },
  butterscotch: { base: '#d4a574', middle: '#deb887', top: '#f5deb3', frosting: '#8b4513' },
} as const;

// Pre-computed decoration angles
const DECO_ANGLES = Array.from({ length: 12 }, (_, i) => (i / 12) * Math.PI * 2);
const ROSE_ANGLES = Array.from({ length: 6 }, (_, i) => (i / 6) * Math.PI * 2);
const PETAL_ANGLES = Array.from({ length: 5 }, (_, j) => (j / 5) * Math.PI * 2);
const CANDLE_ANGLES = Array.from({ length: 5 }, (_, i) => (i / 5) * Math.PI * 2);

const CakeModel = ({ cakeType = 'chocolate' }: { cakeType: string }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { invalidate } = useThree();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      invalidate(); // Trigger render only when rotating
    }
  });

  const colors = useMemo(() => 
    CAKE_COLORS[cakeType as keyof typeof CAKE_COLORS] || CAKE_COLORS.chocolate,
    [cakeType]
  );

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Cake plate - reduced segments 64->32 */}
      <mesh position={[0, -0.15, 0]} receiveShadow>
        <cylinderGeometry args={[2.2, 2.2, 0.1, 32]} />
        <meshStandardMaterial color="#f0f0f0" metalness={0.3} roughness={0.2} />
      </mesh>

      {/* Bottom cake layer */}
      <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.8, 1.8, 0.7, 32]} />
        <meshStandardMaterial color={colors.base} roughness={0.6} />
      </mesh>

      {/* Bottom layer frosting ring */}
      <mesh position={[0, 0.65, 0]}>
        <torusGeometry args={[1.75, 0.08, 12, 32]} />
        <meshStandardMaterial color={colors.frosting} roughness={0.3} />
      </mesh>

      {/* Middle cake layer */}
      <mesh position={[0, 1.0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.4, 1.4, 0.6, 32]} />
        <meshStandardMaterial color={colors.middle} roughness={0.6} />
      </mesh>

      {/* Middle layer frosting ring */}
      <mesh position={[0, 1.3, 0]}>
        <torusGeometry args={[1.35, 0.07, 12, 32]} />
        <meshStandardMaterial color={colors.frosting} roughness={0.3} />
      </mesh>

      {/* Top cake layer */}
      <mesh position={[0, 1.6, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.0, 1.0, 0.5, 32]} />
        <meshStandardMaterial color={colors.top} roughness={0.5} />
      </mesh>

      {/* Top frosting swirl */}
      <mesh position={[0, 1.9, 0]}>
        <cylinderGeometry args={[0.9, 1.0, 0.1, 32]} />
        <meshStandardMaterial color={colors.frosting} roughness={0.2} />
      </mesh>

      {/* Frosting decorations on sides */}
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        return (
          <group key={`deco-${i}`}>
            {/* Bottom layer drips */}
            <mesh position={[Math.cos(angle) * 1.75, 0.3 + Math.sin(i) * 0.1, Math.sin(angle) * 1.75]}>
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshStandardMaterial color={colors.frosting} roughness={0.2} />
            </mesh>
            {/* Middle layer decorations */}
            <mesh position={[Math.cos(angle) * 1.35, 1.0, Math.sin(angle) * 1.35]}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial color="#db2777" roughness={0.3} />
            </mesh>
          </group>
        );
      })}

      {/* Top decorations - roses */}
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 0.5;
        return (
          <group key={`rose-${i}`} position={[Math.cos(angle) * radius, 2.0, Math.sin(angle) * radius]}>
            {/* Rose base */}
            <mesh>
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshStandardMaterial color="#db2777" roughness={0.3} />
            </mesh>
            {/* Rose petals */}
            {[...Array(5)].map((_, j) => {
              const petalAngle = (j / 5) * Math.PI * 2;
              return (
                <mesh 
                  key={`petal-${j}`} 
                  position={[Math.cos(petalAngle) * 0.08, 0.02, Math.sin(petalAngle) * 0.08]}
                  rotation={[0.3, petalAngle, 0]}
                >
                  <sphereGeometry args={[0.06, 8, 8]} />
                  <meshStandardMaterial color="#ec4899" roughness={0.2} />
                </mesh>
              );
            })}
          </group>
        );
      })}

      {/* Center cherry - reduced segments 32->16 */}
      <mesh position={[0, 2.15, 0]} castShadow>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color="#dc143c" roughness={0.2} metalness={0.1} />
      </mesh>

      {/* Cherry stem */}
      <mesh position={[0, 2.35, 0]} rotation={[0, 0, 0.2]}>
        <cylinderGeometry args={[0.02, 0.02, 0.25, 8]} />
        <meshStandardMaterial color="#228b22" roughness={0.5} />
      </mesh>

      {/* Candles */}
      {[...Array(5)].map((_, i) => {
        const angle = (i / 5) * Math.PI * 2;
        const radius = 0.7;
        return (
          <group key={`candle-${i}`} position={[Math.cos(angle) * radius, 1.85, Math.sin(angle) * radius]}>
            {/* Candle body */}
            <mesh>
              <cylinderGeometry args={[0.04, 0.04, 0.4, 16]} />
              <meshStandardMaterial color="#ffd700" roughness={0.3} />
            </mesh>
            {/* Wick */}
            <mesh position={[0, 0.22, 0]}>
              <cylinderGeometry args={[0.01, 0.01, 0.05, 8]} />
              <meshStandardMaterial color="#2d2d2d" roughness={0.8} />
            </mesh>
            {/* Flame */}
            <mesh position={[0, 0.28, 0]}>
              <coneGeometry args={[0.03, 0.08, 16]} />
              <meshStandardMaterial color="#ff6b00" emissive="#ff4500" emissiveIntensity={2} />
            </mesh>
          </group>
        );
      })}

      {/* Sprinkles scattered on top - using pre-computed deterministic data */}
      {SPRINKLE_DATA.map((sprinkle, i) => (
        <mesh 
          key={`sprinkle-${i}`} 
          position={[Math.cos(sprinkle.angle) * sprinkle.radius, 1.95, Math.sin(sprinkle.angle) * sprinkle.radius]}
          rotation={[sprinkle.rotX, sprinkle.rotY, sprinkle.rotZ]}
        >
          <capsuleGeometry args={[0.015, 0.04, 4, 8]} />
          <meshStandardMaterial color={SPRINKLE_COLORS[i % SPRINKLE_COLORS.length]} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
};

export const Cake3DViewer = ({ isOpen, onClose, cakeName, cakeType = 'chocolate' }: Cake3DViewerProps) => {
  const [autoRotate, setAutoRotate] = useState(true);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl h-[80vh] bg-gradient-to-b from-pink-50 via-white to-pink-100 rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-white/90 to-transparent p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-magenta-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Move3D className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-playfair text-xl font-bold text-magenta-800">{cakeName}</h3>
                    <p className="text-sm text-magenta-600">Interactive 3D View</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 bg-white rounded-full shadow-lg hover:bg-pink-50 transition-colors"
                >
                  <X className="w-6 h-6 text-magenta-700" />
                </button>
              </div>
            </div>

            {/* 3D Canvas */}
            <div className="w-full h-full">
              <Canvas
                shadows
                dpr={[1, 1.5]}
                frameloop="demand"
                camera={{ position: [5, 4, 5], fov: 45 }}
                gl={{ antialias: true }}
              >
                <Suspense fallback={null}>
                  <ambientLight intensity={0.4} />
                  <directionalLight 
                    position={[5, 10, 5]} 
                    intensity={1} 
                    castShadow 
                    shadow-mapSize={[1024, 1024]}
                  />
                  <directionalLight position={[-5, 5, -5]} intensity={0.5} />
                  <spotLight position={[0, 10, 0]} intensity={0.5} angle={0.5} penumbra={1} />
                  
                  <CakeModel cakeType={cakeType} />

                  <ContactShadows 
                    position={[0, -0.65, 0]} 
                    opacity={0.5} 
                    scale={10} 
                    blur={2.5} 
                    far={4}
                  />
                  
                  <OrbitControls 
                    enablePan={false}
                    enableZoom={true}
                    autoRotate={autoRotate}
                    autoRotateSpeed={1.5}
                    minDistance={4}
                    maxDistance={10}
                    minPolarAngle={Math.PI / 6}
                    maxPolarAngle={Math.PI / 2}
                  />
                  
                  <Environment preset="studio" />
                </Suspense>
              </Canvas>
            </div>

            {/* Controls */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  className={`p-2 rounded-full transition-colors ${autoRotate ? 'bg-magenta-100 text-magenta-600' : 'hover:bg-pink-50 text-gray-600'}`}
                  title={autoRotate ? 'Stop Rotation' : 'Auto Rotate'}
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
                <div className="w-px h-6 bg-pink-200"></div>
                <div className="flex items-center gap-1 text-sm text-magenta-700">
                  <Sparkles className="w-4 h-4" />
                  <span className="font-medium">Drag to rotate • Scroll to zoom</span>
                </div>
              </div>
            </div>

            {/* Cake Type Indicator */}
            <div className="absolute bottom-4 right-4 z-10">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
                <p className="text-xs text-magenta-500 uppercase tracking-wider">Flavor</p>
                <p className="font-semibold text-magenta-700 capitalize">{cakeType}</p>
              </div>
            </div>

            {/* Instructions overlay - shows briefly */}
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 3, duration: 1 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="bg-magenta-900/80 text-white px-6 py-4 rounded-2xl backdrop-blur-sm">
                <div className="flex items-center gap-3 text-lg">
                  <Move3D className="w-6 h-6" />
                  <span>Drag to rotate • Scroll to zoom</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Cake3DViewer;

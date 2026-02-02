import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  color: string;
  delay: number;
  duration: number;
  shape: 'circle' | 'square' | 'triangle' | 'star';
}

interface ConfettiEffectProps {
  isActive: boolean;
  particleCount?: number;
}

const colors = [
  '#be185d', // magenta-700
  '#db2777', // pink-600
  '#ec4899', // pink-500
  '#f472b6', // pink-400
  '#f9a8d4', // pink-300
  '#ffffff', // white
  '#fce7f3', // pink-100
];

const shapes = ['circle', 'square', 'triangle', 'star'] as const;

export default function ConfettiEffect({ isActive, particleCount = 80 }: ConfettiEffectProps) {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (isActive) {
      const pieces: ConfettiPiece[] = [];
      for (let i = 0; i < particleCount; i++) {
        pieces.push({
          id: i,
          x: Math.random() * 100,
          y: -20 - Math.random() * 30,
          rotation: Math.random() * 360,
          scale: 0.5 + Math.random() * 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 1,
          duration: 3 + Math.random() * 3,
          shape: shapes[Math.floor(Math.random() * shapes.length)],
        });
      }
      setConfetti(pieces);
    } else {
      setConfetti([]);
    }
  }, [isActive, particleCount]);

  const renderShape = (piece: ConfettiPiece) => {
    switch (piece.shape) {
      case 'circle':
        return (
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: piece.color }}
          />
        );
      case 'square':
        return (
          <div
            className="w-3 h-3"
            style={{ backgroundColor: piece.color }}
          />
        );
      case 'triangle':
        return (
          <div
            className="w-0 h-0"
            style={{
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderBottom: `10px solid ${piece.color}`,
            }}
          />
        );
      case 'star':
        return (
          <svg width="12" height="12" viewBox="0 0 24 24" fill={piece.color}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
    }
  };

  return (
    <AnimatePresence>
      {isActive && (
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
          {confetti.map((piece) => (
            <motion.div
              key={piece.id}
              initial={{
                left: `${piece.x}%`,
                top: `${piece.y}%`,
                rotate: 0,
                scale: 0,
                opacity: 1,
              }}
              animate={{
                top: '110%',
                rotate: piece.rotation + 720,
                scale: piece.scale,
                opacity: [1, 1, 1, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: piece.duration,
                delay: piece.delay,
                ease: 'linear',
              }}
              className="absolute"
            >
              {renderShape(piece)}
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

export const Confetti = () => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  const [isActive, setIsActive] = useState(true);

  const colors = [
    '#db2777', // magenta-600
    '#ec4899', // magenta-500
    '#f472b6', // magenta-400
    '#be185d', // magenta-700
    '#fce7f3', // magenta-100
    '#9d174d', // magenta-800
    '#fbcfe8', // magenta-200
    '#f9a8d4', // magenta-300
  ];

  useEffect(() => {
    const generatePieces = () => {
      const newPieces: ConfettiPiece[] = [];
      for (let i = 0; i < 80; i++) {
        newPieces.push({
          id: i,
          x: 30 + Math.random() * 40, // Center area (30% to 70%)
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 0.5,
          duration: 3 + Math.random() * 2,
          size: 6 + Math.random() * 10,
          rotation: Math.random() * 360
        });
      }
      setPieces(newPieces);
    };

    generatePieces();

    const timer = setTimeout(() => {
      setIsActive(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isActive && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {pieces.map((piece) => (
            <motion.div
              key={piece.id}
              initial={{ 
                x: `${piece.x}vw`, 
                y: -20,
                rotate: 0,
                opacity: 1
              }}
              animate={{ 
                y: '100vh',
                rotate: piece.rotation + 720,
                opacity: [1, 1, 1, 0]
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: piece.duration,
                delay: piece.delay,
                ease: 'linear'
              }}
              className="absolute"
              style={{
                width: piece.size,
                height: piece.size * 0.6,
                backgroundColor: piece.color,
                borderRadius: '2px',
                boxShadow: `0 0 ${piece.size / 2}px ${piece.color}40`
              }}
            />
          ))}
          {/* Sparkle particles */}
          {pieces.slice(0, 30).map((piece) => (
            <motion.div
              key={`sparkle-${piece.id}`}
              initial={{ 
                x: `${piece.x}vw`, 
                y: -10,
                scale: 0,
                opacity: 1
              }}
              animate={{ 
                y: '80vh',
                scale: [0, 1, 0.5, 0],
                opacity: [1, 1, 0.5, 0]
              }}
              transition={{
                duration: piece.duration * 0.8,
                delay: piece.delay + 0.2,
                ease: 'easeOut'
              }}
              className="absolute"
            >
              <svg width={piece.size * 1.5} height={piece.size * 1.5} viewBox="0 0 24 24">
                <path
                  fill={piece.color}
                  d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"
                />
              </svg>
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
};

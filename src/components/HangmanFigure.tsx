import React from 'react';
import { motion, type Variants } from 'framer-motion';

interface HangmanFigureProps {
  wrongCount: number;
}

const HangmanFigure: React.FC<HangmanFigureProps> = ({ wrongCount }) => {
  // Define visibility based on error count (0 to 6)
  const isShown = (index: number) => wrongCount > index;

  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", duration: 1.5, bounce: 0 },
        opacity: { duration: 0.01 }
      }
    }
  };

  return (
    <div className="relative">
      <svg height="250" width="200" className="stroke-marvel-gold fill-transparent stroke-[4px] drop-shadow-lg">
        {/* Gallows */}
        <line x1="60" y1="20" x2="140" y2="20" />
        <line x1="140" y1="20" x2="140" y2="60" />
        <line x1="60" y1="20" x2="60" y2="280" />
        <line x1="20" y1="250" x2="100" y2="250" />

        {/* Head */}
        {isShown(0) && (
          <motion.circle
            cx="140" cy="80" r="20"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          />
        )}

        {/* Body */}
        {isShown(1) && (
          <motion.line
            x1="140" y1="100" x2="140" y2="170"
            variants={draw}
            initial="hidden"
            animate="visible"
          />
        )}

        {/* Left Arm */}
        {isShown(2) && (
          <motion.line
            x1="120" y1="110" x2="140" y2="140"
            variants={draw}
            initial="hidden"
            animate="visible"
          />
        )}

        {/* Right Arm */}
        {isShown(3) && (
          <motion.line
            x1="140" y1="140" x2="160" y2="110"
            variants={draw}
            initial="hidden"
            animate="visible"
          />
        )}

        {/* Left Leg */}
        {isShown(4) && (
          <motion.line
            x1="140" y1="170" x2="110" y2="200"
            variants={draw}
            initial="hidden"
            animate="visible"
          />
        )}

        {/* Right Leg */}
        {isShown(5) && (
          <motion.line
            x1="140" y1="170" x2="170" y2="200"
            variants={draw}
            initial="hidden"
            animate="visible"
          />
        )}
      </svg>
    </div>
  );
};

export default HangmanFigure;
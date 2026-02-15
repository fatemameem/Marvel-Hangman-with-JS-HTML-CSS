import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameStatus } from '../../types';

interface ResultModalProps {
  status: GameStatus;
  selectedWord: string;
  onPlayAgain: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({ status, selectedWord, onPlayAgain }) => {
  const isWin = status === GameStatus.WON;
  
  if (status === GameStatus.PLAYING) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="bg-marvel-surface rounded-xl p-8 shadow-2xl border border-white/10 text-center max-w-md w-full relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className={`absolute top-0 left-0 w-full h-2 ${isWin ? 'bg-marvel-accent' : 'bg-marvel-red'}`} />

          <h2 className={`text-3xl font-display mb-4 ${isWin ? 'text-marvel-accent' : 'text-marvel-red'}`}>
            {isWin ? "Mission Accomplished!" : "Mission Failed"}
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            {isWin ? "Great work, hero." : <span>The word was <span className="text-marvel-gold font-bold">{selectedWord.toUpperCase()}</span></span>}
          </p>
          <button
            onClick={onPlayAgain}
            className={`
              font-bold py-3 px-8 rounded-lg text-lg transition-all shadow-lg
              ${isWin 
                ? 'bg-marvel-accent text-white hover:bg-blue-600' 
                : 'bg-marvel-red text-white hover:bg-red-600'}
            `}
          >
            Play Again
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ResultModal;
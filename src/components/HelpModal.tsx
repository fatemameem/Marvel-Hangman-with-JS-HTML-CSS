import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="absolute inset-0" onClick={onClose} aria-label="Close modal background"></div>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-marvel-surface p-6 rounded-xl border border-white/10 shadow-2xl w-full max-w-lg relative z-10"
          >
            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
              <h2 className="text-2xl font-display text-marvel-gold tracking-wide">How to Play</h2>
              <button 
                onClick={onClose} 
                className="text-gray-400 hover:text-white transition-colors p-1"
                aria-label="Close help"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div className="space-y-4 text-gray-300 text-sm md:text-base">
              <div>
                <h3 className="text-marvel-accent font-bold mb-1 uppercase text-xs tracking-wider">Objective</h3>
                <p>Guess the hidden Marvel character name before the hangman figure is complete.</p>
              </div>

              <div>
                <h3 className="text-marvel-accent font-bold mb-1 uppercase text-xs tracking-wider">Controls</h3>
                <p>Simply type letters <span className="text-white font-mono bg-white/10 px-1 rounded">A-Z</span> on your keyboard.</p>
              </div>

              <div>
                <h3 className="text-marvel-accent font-bold mb-1 uppercase text-xs tracking-wider">Rules of Engagement</h3>
                <ul className="list-disc list-inside space-y-1 ml-1 text-gray-400">
                  <li>You have <span className="text-marvel-red font-bold">6 lives</span> (body parts).</li>
                  <li>Each wrong letter reveals one part.</li>
                  <li>Completing the figure results in a loss.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-marvel-accent font-bold mb-1 uppercase text-xs tracking-wider">Strategic Option: Guess Word</h3>
                <ul className="list-disc list-inside space-y-1 ml-1 text-gray-400">
                  <li>Think you know the answer? Click "Guess Word".</li>
                  <li>You have <span className="text-white font-bold">2 attempts</span> per game.</li>
                  <li><span className="text-marvel-red font-bold">Caution:</span> A wrong full-word guess adds a penalty (reveals a part) and consumes an attempt!</li>
                </ul>
              </div>

              <div className="pt-4 border-t border-white/10 mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-xs text-gray-500 font-mono">
                  WIN: +1 PT <span className="mx-2">|</span> LOSS: -1 PT
                </div>
                <button 
                onClick={onClose}
                className="bg-marvel-accent text-white font-bold py-2 px-8 rounded hover:bg-blue-600 transition-colors shadow-lg w-full md:w-auto"
                >
                  Mission Accepted
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default HelpModal;
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GuessWordProps {
  onGuess: (word: string) => void;
  disabled: boolean;
  remainingGuesses: number;
}

const GuessWord: React.FC<GuessWordProps> = ({ onGuess, disabled, remainingGuesses }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    onGuess(inputVal.trim().toLowerCase());
    setInputVal('');
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex flex-col items-center mt-4">
        <button
          onClick={() => setIsOpen(true)}
          disabled={disabled}
          className={`
            bg-marvel-accent text-white font-bold py-2 px-6 rounded-full shadow-lg 
            transition-all hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed
            disabled:shadow-none border border-white/10
          `}
        >
          Guess Word <span className="text-xs font-normal opacity-80 ml-1">({remainingGuesses} left)</span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-marvel-surface p-6 rounded-xl border border-white/10 shadow-2xl w-full max-w-sm"
            >
              <h3 className="text-xl font-display text-marvel-gold mb-2 text-center tracking-wide">Take a Guess</h3>
              <p className="text-xs text-gray-400 text-center mb-6">Warning: Wrong guesses add to the hangman.</p>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Enter word..."
                  className="p-3 rounded bg-marvel-dark text-white font-bold uppercase text-center border border-gray-700 focus:outline-none focus:border-marvel-accent focus:ring-1 focus:ring-marvel-accent transition-all"
                  autoFocus
                />
                <div className="flex gap-3 justify-end mt-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors text-sm font-bold"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-marvel-gold text-marvel-dark font-bold rounded hover:bg-yellow-400 transition-colors shadow-md"
                  >
                    GUESS
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GuessWord;
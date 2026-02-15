import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WordDisplayProps {
  selectedWord: string;
  correctLetters: string[];
  revealAll?: boolean;
}

const WordDisplay: React.FC<WordDisplayProps> = ({ selectedWord, correctLetters, revealAll = false }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 my-8 px-4">
      {selectedWord.split('').map((letter, i) => {
        const isSpace = letter === ' ';
        const isRevealed = correctLetters.includes(letter) || revealAll;
        
        if (isSpace) {
          return <div key={i} className="w-4" />;
        }

        return (
          <div key={i} className="border-b-4 border-marvel-accent w-8 h-12 md:w-10 md:h-14 flex items-center justify-center relative overflow-hidden">
            <AnimatePresence>
              {isRevealed && (
                <motion.span
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className={`text-3xl md:text-4xl font-bold uppercase ${!correctLetters.includes(letter) && revealAll ? 'text-marvel-red' : 'text-white'}`}
                >
                  {letter}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default WordDisplay;
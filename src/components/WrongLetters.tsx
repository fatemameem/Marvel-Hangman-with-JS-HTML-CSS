import React from 'react';
import { motion } from 'framer-motion';

interface WrongLettersProps {
  wrongLetters: string[];
}

const WrongLetters: React.FC<WrongLettersProps> = ({ wrongLetters }) => {
  return (
    <div className="absolute top-0 right-0 p-4 text-right">
      {wrongLetters.length > 0 && (
        <motion.p 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-2 font-display text-lg text-marvel-gold/80"
        >
          Bad move...
        </motion.p>
      )}
      <div className="flex flex-wrap justify-end gap-2 max-w-[150px]">
        {wrongLetters.map((letter, i) => (
          <motion.span
            key={i}
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-2xl uppercase font-bold text-white/60 line-through decoration-marvel-red decoration-2"
          >
            {letter}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export default WrongLetters;
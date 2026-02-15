import React from 'react';
import { type ScoreState } from '../../types';

interface TopBarProps {
  score: ScoreState;
  onResetScore: () => void;
  onOpenHelp: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ score, onResetScore, onOpenHelp }) => {
  return (
    <div className="w-full max-w-3xl bg-marvel-surface rounded-b-2xl shadow-2xl border-b border-white/10 px-6 py-4 mb-6 relative z-30">
      <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-y-4">
        
        {/* Left: Current Score (Order 2 on mobile, 1 on desktop) */}
        <div className="flex flex-col items-start w-1/2 md:w-1/3 order-2 md:order-1 pl-2 md:pl-0">
          <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-0.5">Current</span>
          <span className="text-3xl font-display text-marvel-accent leading-none">{score.current}</span>
        </div>

        {/* Center: Title (Order 1 on mobile, 2 on desktop) */}
        <div className="flex flex-col items-center w-full md:w-1/3 order-1 md:order-2 text-center border-b border-white/5 md:border-none pb-4 md:pb-0 mb-2 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-display text-marvel-gold tracking-[0.2em] drop-shadow-md select-none">
            HANGMAN
          </h1>
          <button 
            onClick={onResetScore}
            className="text-[10px] text-gray-500 hover:text-marvel-red transition-colors underline decoration-dotted uppercase tracking-wider mt-1"
          >
            Reset Score
          </button>
        </div>

        {/* Right: Best Score & Help (Order 3 on mobile, 3 on desktop) */}
        <div className="flex items-center justify-end w-1/2 md:w-1/3 order-3 md:order-3 gap-4 pr-2 md:pr-0">
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-0.5">Best</span>
            <span className="text-3xl font-display text-marvel-gold leading-none">{score.best}</span>
          </div>
          
          <div className="h-8 w-px bg-white/10"></div>

          <button 
            onClick={onOpenHelp}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-marvel-dark/50 hover:bg-marvel-accent/20 text-marvel-gold border border-marvel-gold/30 hover:border-marvel-gold transition-all shadow-lg active:scale-95 group"
            aria-label="How to play"
            title="How to play"
          >
            <span className="font-display text-xl leading-none pt-1 group-hover:scale-110 transition-transform">?</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default TopBar;
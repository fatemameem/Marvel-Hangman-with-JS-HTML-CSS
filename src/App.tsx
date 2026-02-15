import { useState, useEffect, useCallback } from 'react';
import Confetti from 'react-confetti';
import TopBar from './components/TopBar';
import HangmanFigure from './components/HangmanFigure';
import WordDisplay from './components/WordDisplay';
import WrongLetters from './components/WrongLetters';
import Notification from './components/Notification';
import GuessWord from './components/GuessWord';
import ResultModal from './components/ResultModal';
import HelpModal from './components/HelpModal';
import wordsData from './data/words';
import { GameStatus, type ScoreState } from '../types';
import { useWindowSize } from './hooks/useWindowSize';

// Constants
const MAX_MISTAKES = 6;
const MAX_GUESS_WORD_ATTEMPTS = 2;

function App() {
  const { width, height } = useWindowSize();

  // Game State
  const [selectedWord, setSelectedWord] = useState<string>('');
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.PLAYING);
  const [notification, setNotification] = useState<{ show: boolean; msg: string }>({ show: false, msg: '' });
  
  // New Feature State
  const [score, setScore] = useState<ScoreState>({ current: 0, best: 0 });
  const [remainingGuesses, setRemainingGuesses] = useState<number>(MAX_GUESS_WORD_ATTEMPTS);
  // Track extra mistakes from failed word guesses to add to figure rendering
  const [penaltyCount, setPenaltyCount] = useState<number>(0);
  
  // UI State
  const [showHelp, setShowHelp] = useState<boolean>(false);

  // Initialize Word
  const pickWord = useCallback(() => {
    const words = wordsData.words;
    // Simple random pick; for production, could improve randomness to avoid immediate repeats
    const random = words[Math.floor(Math.random() * words.length)];
    return random.toLowerCase();
  }, []);

  // Initialize Game
  const startNewGame = useCallback(() => {
    setSelectedWord(pickWord());
    setCorrectLetters([]);
    setWrongLetters([]);
    setGameStatus(GameStatus.PLAYING);
    setRemainingGuesses(MAX_GUESS_WORD_ATTEMPTS);
    setPenaltyCount(0);
  }, [pickWord]);

  // Load initial score and start game
  useEffect(() => {
    const savedScore = localStorage.getItem('marvel-hangman-score');
    if (savedScore) {
      setScore(JSON.parse(savedScore));
    }
    startNewGame();
  }, [startNewGame]);

  // Persist score
  useEffect(() => {
    localStorage.setItem('marvel-hangman-score', JSON.stringify(score));
  }, [score]);

  const resetScore = useCallback(() => {
    setScore({ current: 0, best: 0 });
  }, []);

  // Derived Values
  const totalWrongCount = wrongLetters.length + penaltyCount;

  // Check Win/Loss conditions
  useEffect(() => {
    if (gameStatus !== GameStatus.PLAYING || !selectedWord) return;

    const uniqueLetters = [...new Set(selectedWord.split('').filter(c => c !== ' '))];
    const isWin = uniqueLetters.every(l => correctLetters.includes(l));
    const isLoss = totalWrongCount >= MAX_MISTAKES;

    if (isWin) {
      setGameStatus(GameStatus.WON);
      updateScore(true);
    } else if (isLoss) {
      setGameStatus(GameStatus.LOST);
      updateScore(false);
    }
  }, [correctLetters, totalWrongCount, selectedWord, gameStatus]);

  const updateScore = (win: boolean) => {
    setScore(prev => {
      const newCurrent = win ? prev.current + 1 : Math.max(0, prev.current - 1); // Prefer -1 logic but keeping floor at 0 is safer for UX
      const newBest = Math.max(newCurrent, prev.best);
      return { current: newCurrent, best: newBest };
    });
  };

  // Input Handling Helpers
  const showNotification = (msg: string) => {
    setNotification({ show: true, msg });
    setTimeout(() => setNotification({ show: false, msg: '' }), 2000);
  };

  const handleLetterInput = useCallback((letter: string) => {
    if (gameStatus !== GameStatus.PLAYING || showHelp) return;
    
    // Normalize
    letter = letter.toLowerCase();

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        setCorrectLetters(prev => [...prev, letter]);
      } else {
        showNotification('You already have entered this letter');
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        setWrongLetters(prev => [...prev, letter]);
      } else {
        showNotification('You already have entered this letter');
      }
    }
  }, [selectedWord, correctLetters, wrongLetters, gameStatus, showHelp]);

  // Keyboard Event Listener
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      // Only letters A-Z
      if (e.keyCode >= 65 && e.keyCode <= 90) {
        handleLetterInput(e.key);
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [handleLetterInput]);

  // Full Word Guess Logic
  const handleWordGuess = (guess: string) => {
    if (remainingGuesses <= 0 || gameStatus !== GameStatus.PLAYING) return;

    if (guess === selectedWord) {
      // Immediate Win
      setCorrectLetters(selectedWord.split('')); // Reveal all
    } else {
      // Penalty: Reveal one figure part (add to penaltyCount)
      setPenaltyCount(prev => prev + 1);
      setRemainingGuesses(prev => prev - 1);
      showNotification(`Wrong guess! -1 Attempt. Penalty applied.`);
    }
  };

  return (
    <div className="flex flex-col items-center h-full max-h-screen">
      {gameStatus === GameStatus.WON && (
        <Confetti
          width={width}
          height={height}
          recycle={true}
          numberOfPieces={300}
          gravity={0.2}
          style={{ position: 'fixed', top: 0, left: 0, zIndex: 50, pointerEvents: 'none' }}
        />
      )}
      <TopBar 
        score={score} 
        onResetScore={resetScore} 
        onOpenHelp={() => setShowHelp(true)}
      />
      
      <div className="relative flex flex-col items-center justify-center flex-grow w-full max-w-4xl p-4">
        
        {/* Game Container Area */}
        <div className="relative w-full max-w-[450px] h-[350px] md:h-[400px]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2">
            <HangmanFigure wrongCount={totalWrongCount} />
          </div>
          <WrongLetters wrongLetters={wrongLetters} />
        </div>

        <WordDisplay 
          selectedWord={selectedWord} 
          correctLetters={correctLetters} 
          revealAll={gameStatus === GameStatus.LOST}
        />

        <div className="mt-8 mb-4">
          <p className="text-gray-400 text-sm mb-2 text-center">Type letters on your keyboard</p>
          <GuessWord 
            onGuess={handleWordGuess} 
            disabled={remainingGuesses === 0 || gameStatus !== GameStatus.PLAYING}
            remainingGuesses={remainingGuesses}
          />
        </div>
      </div>

      <Notification show={notification.show} message={notification.msg} />

      <ResultModal 
        status={gameStatus} 
        selectedWord={selectedWord} 
        onPlayAgain={startNewGame} 
      />

      <HelpModal 
        isOpen={showHelp} 
        onClose={() => setShowHelp(false)} 
      />
    </div>
  );
}

export default App;
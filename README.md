# Marvel Hangman React

A modern React + TypeScript refactor of the classic Marvel-themed Hangman game. Guess your favorite Marvel characters and heroes in this interactive web game featuring smooth animations, score tracking, and multiple game modes.

## 🎮 Game Features

- **Marvel Characters**: Guess from a collection of popular Marvel superheroes and characters
- **Multiple Game Modes**: 
  - Letter-by-letter guessing (classic hangman)
  - Full word guessing (limited attempts)
- **Visual Hangman**: Animated hangman figure that builds with wrong guesses
- **Score System**: Track your current score and personal best
- **Smooth Animations**: Powered by Framer Motion
- **Celebration Effects**: React Confetti for victories
- **Responsive Design**: Works on desktop and mobile devices
- **Help System**: Built-in instructions and game rules

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Marvel-Hangman-with-JS-HTML-CSS
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production 
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## 🎯 How to Play

1. **Starting**: A random Marvel character name is selected
2. **Guessing Letters**: Click on letters to guess them one by one
3. **Word Guessing**: Use the "Guess Word" feature to guess the entire word (limited attempts)
4. **Winning**: Complete the word before the hangman figure is fully drawn
5. **Scoring**: Earn points for correct guesses and bonus points for quick wins

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── HangmanFigure.tsx   # Animated hangman drawing
│   ├── WordDisplay.tsx     # Word with guessed letters
│   ├── WrongLetters.tsx    # Display of incorrect guesses
│   ├── GuessWord.tsx       # Full word guessing input
│   ├── ResultModal.tsx     # Game over modal
│   ├── HelpModal.tsx       # Game instructions
│   ├── TopBar.tsx          # Score and game controls
│   └── Notification.tsx    # Toast notifications
├── data/
│   └── words.ts           # Marvel character word list
├── hooks/
│   └── useWindowSize.ts   # Responsive design hook
└── App.tsx               # Main game logic
```

## 🎨 Tech Stack

- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS 4 with custom Marvel theme
- **Build Tool**: Vite 7
- **Animations**: Framer Motion
- **Effects**: React Confetti
- **Code Quality**: ESLint with TypeScript support

## 🎨 Custom Styling

The game features a custom Marvel-themed color palette with:
- Dark backgrounds inspired by Marvel aesthetics
- Gold accent colors for highlights and selections
- Custom fonts (Bangers for headings, Roboto for body text)
- Responsive breakpoints for all screen sizes

## 🔧 Development

The project is built with modern React patterns:
- Functional components with hooks
- TypeScript for type safety
- Custom hooks for reusable logic
- Component composition for maintainable code
- ESLint configuration for code quality

## 📝 License

This project is open source and available under the MIT License.

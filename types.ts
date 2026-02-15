export const GameStatus = {
  PLAYING: 'PLAYING',
  WON: 'WON',
  LOST: 'LOST'
} as const;

export type GameStatus = typeof GameStatus[keyof typeof GameStatus];

export interface ScoreState {
  current: number;
  best: number;
}

export interface WordData {
  words: string[];
}
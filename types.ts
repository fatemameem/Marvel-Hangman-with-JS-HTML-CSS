export enum GameStatus {
  PLAYING = 'PLAYING',
  WON = 'WON',
  LOST = 'LOST'
}

export interface ScoreState {
  current: number;
  best: number;
}

export interface WordData {
  words: string[];
}
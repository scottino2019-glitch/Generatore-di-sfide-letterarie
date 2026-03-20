export type GameType = 'anagrams' | 'riddles' | 'wordchain' | 'synonyms' | 'twisters';

export interface GameContent {
  type: GameType;
  title: string;
  content: string;
  solution: string;
  hint?: string;
}

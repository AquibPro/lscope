export type Trait = 'confidence' | 'exposure' | 'initiative' | 'communication' | 'effort';

export interface Option {
  text: string;
  emoji: string;
  scores: Partial<Record<Trait, number>>;
}

export interface Question {
  id: number;
  text: string;
  options: [Option, Option, Option, Option];
}

export type Tier = 'Ghost Mode 👻' | 'NPC Energy 😭' | 'Potential Player 🤨' | 'Rising Star 👀' | 'Main Character 😎';

export interface TraitScore {
  trait: Trait;
  label: string;
  score: number;
  color: string;
}

export interface Result {
  score: number;
  tier: Tier;
  summary: string;
  tierDescription: string;
  traitScores: TraitScore[];
  insights: string[];
  tips: string[];
}

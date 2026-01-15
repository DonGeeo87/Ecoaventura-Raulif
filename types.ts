
export interface FaunaItem {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  funFact: string;
  imageUrl: string;
  magicImageUrl: string;
  caricatureUrl?: string; // New property for cartoon/caricature version
  videoUrl?: string;
  ecoTip: string;
  type: 'fauna' | 'flora';
}

export interface GameNode extends FaunaItem {
  order: number;
  unlocked: boolean;
  completed: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum GameState {
  HOME = 'HOME',
  MAP = 'MAP',
  EXPLORE = 'EXPLORE',
  CHAT = 'CHAT',
  CREATIVE = 'CREATIVE',
  STATION = 'STATION',
  CREDITS = 'CREDITS'
}

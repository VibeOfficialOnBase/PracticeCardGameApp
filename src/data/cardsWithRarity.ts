import { practiceCardsRaw } from './cards';
import { vibeCheckExclusiveCards } from './vibeCheckExclusiveCards';

export type CardRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface PracticeCard {
  id: number;
  affirmation: string;
  mission: string;
  inspiration: string;
  rarity: CardRarity;
  // Optional deeper content fields
  reflectionPrompt?: string;
  teaching?: string;
  breathwork?: string;
  integration?: string;
}

export const rarityConfig = {
  common: {
    label: 'Common',
    color: '#9CA3AF',
    glow: 'rgba(156, 163, 175, 0.3)',
    probability: 0.50,
  },
  uncommon: {
    label: 'Uncommon',
    color: '#10B981',
    glow: 'rgba(16, 185, 129, 0.4)',
    probability: 0.30,
  },
  rare: {
    label: 'Rare',
    color: '#3B82F6',
    glow: 'rgba(59, 130, 246, 0.5)',
    probability: 0.15,
  },
  epic: {
    label: 'Epic',
    color: '#A855F7',
    glow: 'rgba(168, 85, 247, 0.6)',
    probability: 0.04,
  },
  legendary: {
    label: 'Legendary',
    color: '#F59E0B',
    glow: 'rgba(245, 158, 11, 0.8)',
    probability: 0.01,
  },
} as const;

// Rarity assignment for base cards (1-365)
function getBaseCardRarity(cardId: number): CardRarity {
  if (cardId <= 183) return 'common';      // 50%
  if (cardId <= 292) return 'uncommon';    // 30%
  if (cardId <= 347) return 'rare';        // 15%
  if (cardId <= 362) return 'epic';        // 4%
  return 'legendary';                       // 1%
}

// Base PRACTICE cards (1-365) - FREE for everyone
export const practiceCards: PracticeCard[] = practiceCardsRaw.map(card => ({
  ...card,
  rarity: getBaseCardRarity(card.id),
}));

// Combined card pool - ALL 465 cards
export const allCards: PracticeCard[] = [
  ...practiceCards,
  ...vibeCheckExclusiveCards,
];

// Helper functions
export function getCardById(id: number): PracticeCard | undefined {
  return allCards.find(card => card.id === id);
}

export function getCardsByRarity(rarity: CardRarity): PracticeCard[] {
  return allCards.filter(card => card.rarity === rarity);
}

export function getCardsByPack(isHolder: boolean): PracticeCard[] {
  if (isHolder) {
    // Holders get ALL 465 cards
    return allCards;
  } else {
    // Non-holders get only the base 365 cards
    return practiceCards;
  }
}

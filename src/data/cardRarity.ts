/**
 * Card Rarity System
 * Implements rarity drops and collectibility mechanics
 */

export type CardRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic';

interface RarityConfig {
  name: CardRarity;
  dropRate: number;
  color: string;
  glow: string;
  multiplier: number;
}

export const RARITY_CONFIG: Record<CardRarity, RarityConfig> = {
  common: {
    name: 'common',
    dropRate: 0.6,
    color: '#94A3B8', // Gray
    glow: 'rgba(148, 163, 184, 0.3)',
    multiplier: 1.0,
  },
  uncommon: {
    name: 'uncommon',
    dropRate: 0.25,
    color: '#10B981', // Green
    glow: 'rgba(16, 185, 129, 0.4)',
    multiplier: 1.2,
  },
  rare: {
    name: 'rare',
    dropRate: 0.1,
    color: '#3B82F6', // Blue
    glow: 'rgba(59, 130, 246, 0.5)',
    multiplier: 1.5,
  },
  epic: {
    name: 'epic',
    dropRate: 0.04,
    color: '#A855F7', // Purple
    glow: 'rgba(168, 85, 247, 0.6)',
    multiplier: 2.0,
  },
  legendary: {
    name: 'legendary',
    dropRate: 0.009,
    color: '#F59E0B', // Orange/Gold
    glow: 'rgba(245, 158, 11, 0.7)',
    multiplier: 3.0,
  },
  mythic: {
    name: 'mythic',
    dropRate: 0.001,
    color: '#EF4444', // Red
    glow: 'rgba(239, 68, 68, 0.8)',
    multiplier: 5.0,
  },
};

/**
 * Determines rarity for a card pull
 */
export function determineCardRarity(
  username: string,
  pullCount: number,
  streakMultiplier: number = 1.0
): CardRarity {
  // Generate random number
  let random = Math.random();
  
  // Apply luck bonuses
  const streakBonus = Math.min(streakMultiplier * 0.01, 0.1); // Max 10% bonus
  const pullCountBonus = Math.min(pullCount * 0.0001, 0.05); // Max 5% bonus
  
  random -= (streakBonus + pullCountBonus);

  // Determine rarity based on drop rates
  let cumulative = 0;
  const rarities: CardRarity[] = ['mythic', 'legendary', 'epic', 'rare', 'uncommon', 'common'];
  
  for (const rarity of rarities) {
    cumulative += RARITY_CONFIG[rarity].dropRate;
    if (random < cumulative) {
      return rarity;
    }
  }

  return 'common';
}

/**
 * Checks if a card pull resulted in a rare drop
 */
export function isRareDrop(rarity: CardRarity): boolean {
  return ['rare', 'epic', 'legendary', 'mythic'].includes(rarity);
}

/**
 * Gets XP multiplier for rarity
 */
export function getRarityXPMultiplier(rarity: CardRarity): number {
  return RARITY_CONFIG[rarity].multiplier;
}

/**
 * Gets rarity display name
 */
export function getRarityDisplayName(rarity: CardRarity): string {
  return rarity.charAt(0).toUpperCase() + rarity.slice(1);
}

/**
 * Gets collection completion for each rarity
 */
export function getRarityCollectionStats(username: string): Record<CardRarity, {
  collected: number;
  total: number;
  percentage: number;
}> {
  // Get user's pulls from localStorage
  const pullsData = localStorage.getItem(`practice_pulls_${username}`);
  if (!pullsData) {
    return createEmptyStats();
  }

  try {
    const pulls = JSON.parse(pullsData);
    const rarityPulls: Record<CardRarity, Set<number>> = {
      common: new Set(),
      uncommon: new Set(),
      rare: new Set(),
      epic: new Set(),
      legendary: new Set(),
      mythic: new Set(),
    };

    // Count unique cards per rarity
    pulls.forEach((pull: any) => {
      // Simulate rarity assignment (in production, this would be stored)
      const rarity = determineCardRarity(username, pulls.length, 1);
      rarityPulls[rarity].add(pull.cardId);
    });

    // Calculate stats
    const stats: Record<CardRarity, {collected: number; total: number; percentage: number}> = {} as any;
    
    Object.keys(rarityPulls).forEach((rarity) => {
      const collected = rarityPulls[rarity as CardRarity].size;
      const total = Math.floor(365 * RARITY_CONFIG[rarity as CardRarity].dropRate);
      stats[rarity as CardRarity] = {
        collected,
        total,
        percentage: total > 0 ? Math.round((collected / total) * 100) : 0,
      };
    });

    return stats;
  } catch (error) {
    return createEmptyStats();
  }
}

function createEmptyStats(): Record<CardRarity, {collected: number; total: number; percentage: number}> {
  return {
    common: { collected: 0, total: 219, percentage: 0 },
    uncommon: { collected: 0, total: 91, percentage: 0 },
    rare: { collected: 0, total: 37, percentage: 0 },
    epic: { collected: 0, total: 15, percentage: 0 },
    legendary: { collected: 0, total: 3, percentage: 0 },
    mythic: { collected: 0, total: 1, percentage: 0 },
  };
}

/**
 * Generates rarity announcement message
 */
export function generateRarityAnnouncement(rarity: CardRarity, cardName: string): string {
  const messages: Record<CardRarity, string> = {
    common: `You pulled: ${cardName}`,
    uncommon: `✨ Uncommon pull: ${cardName}`,
    rare: `💎 Rare discovery: ${cardName}!`,
    epic: `🌟 EPIC PULL: ${cardName}!`,
    legendary: `🏆 LEGENDARY CARD: ${cardName}!!!`,
    mythic: `⚡ ✨ MYTHIC RARITY: ${cardName}!!! ✨ ⚡`,
  };

  return messages[rarity];
}

/**
 * Applies pity system for guaranteed rare drops
 */
export function checkPitySystem(username: string): {
  shouldTrigger: boolean;
  pullsSinceLastRare: number;
  pityThreshold: number;
} {
  const pityThreshold = 50; // Guaranteed rare every 50 pulls without one
  
  const pullsData = localStorage.getItem(`practice_pulls_${username}`);
  if (!pullsData) {
    return { shouldTrigger: false, pullsSinceLastRare: 0, pityThreshold };
  }

  try {
    const pulls = JSON.parse(pullsData);
    let pullsSinceLastRare = 0;

    // Count pulls since last rare
    for (let i = pulls.length - 1; i >= 0; i--) {
      const rarity = determineCardRarity(username, i, 1);
      if (isRareDrop(rarity)) {
        break;
      }
      pullsSinceLastRare++;
    }

    return {
      shouldTrigger: pullsSinceLastRare >= pityThreshold,
      pullsSinceLastRare,
      pityThreshold,
    };
  } catch (error) {
    return { shouldTrigger: false, pullsSinceLastRare: 0, pityThreshold };
  }
}

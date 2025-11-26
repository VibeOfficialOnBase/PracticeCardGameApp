// Giveaway tier definitions for VIBE token holders
export interface GiveawayTier {
  name: string;
  minTokens: number;
  color: string;
  bgGradient: string;
  icon: string;
  benefits: string[];
  entries: number;
}

export const GIVEAWAY_TIERS: GiveawayTier[] = [
  {
    name: 'Bronze Believer',
    minTokens: 1000,
    color: 'text-amber-600',
    bgGradient: 'from-amber-900/30 to-orange-900/30',
    icon: '🥉',
    benefits: [
      '1 entry per giveaway',
      'Bronze badge on your profile'
    ],
    entries: 1
  },
  {
    name: 'Silver Supporter',
    minTokens: 10000,
    color: 'text-slate-400',
    bgGradient: 'from-slate-800/40 to-slate-900/40',
    icon: '🥈',
    benefits: [
      '3 entries per giveaway',
      'Silver badge on your profile'
    ],
    entries: 3
  },
  {
    name: 'Gold Guardian',
    minTokens: 100000,
    color: 'text-yellow-400',
    bgGradient: 'from-yellow-900/40 to-amber-900/40',
    icon: '🥇',
    benefits: [
      '5 entries per giveaway',
      'Gold badge on your profile'
    ],
    entries: 5
  },
  {
    name: 'Platinum Pioneer',
    minTokens: 500000,
    color: 'text-cyan-300',
    bgGradient: 'from-cyan-900/40 to-teal-900/40',
    icon: '💎',
    benefits: [
      '10 entries per giveaway',
      'Platinum badge on your profile'
    ],
    entries: 10
  },
  {
    name: 'Diamond Luminary',
    minTokens: 1000000,
    color: 'text-blue-300',
    bgGradient: 'from-blue-900/40 to-purple-900/40',
    icon: '💠',
    benefits: [
      '20 entries per giveaway',
      'Diamond badge on your profile'
    ],
    entries: 20
  }
];

// Helper function to get tier for a given token balance
export function getTierForBalance(balance: number): GiveawayTier | null {
  return [...GIVEAWAY_TIERS]
    .reverse()
    .find(tier => balance >= tier.minTokens) || null;
}

// Helper function to get next tier for a given token balance
export function getNextTier(balance: number): GiveawayTier | null {
  return GIVEAWAY_TIERS.find(tier => balance < tier.minTokens) || null;
}

// Helper function to calculate total entries for a token balance
export function calculateEntries(balance: number): number {
  const tier = getTierForBalance(balance);
  return tier ? tier.entries : 0;
}

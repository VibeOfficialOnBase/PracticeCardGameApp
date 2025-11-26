export interface VibeCheckPack {
  id: string;
  name: string;
  emoji: string;
  theme: string;
  requiredVibeBalance: number;
  description: string;
  cardCount: number; // How many cards this pack provides access to
  gradient: string; // Tailwind gradient classes
  glowColor: string; // For glow effects
}

// Export all packs - References the actual 365+100 card system from cardsWithRarity.ts
export const VIBE_CHECK_PACKS: VibeCheckPack[] = [
  {
    id: 'practice_pack',
    name: 'PRACTICE',
    emoji: '✨',
    theme: 'Core self-awareness and intentional living',
    requiredVibeBalance: 0, // FREE for everyone!
    description: 'Your foundation for self-awareness. 365 daily cards covering affirmations, missions, and inspiration to cultivate excellence through patience, altruism, and consistent practice.',
    cardCount: 365, // Cards 1-365 from cardsWithRarity.ts
    gradient: 'from-purple-500 via-pink-500 to-rose-500',
    glowColor: 'rgba(168, 85, 247, 0.6)',
  },
  {
    id: 'vibe_check_exclusive',
    name: 'Vibe Check',
    emoji: '👑',
    theme: 'Exclusive frequency elevation for $VibeOfficial holders',
    requiredVibeBalance: 1000, // Requires 1,000+ $VIBE tokens
    description: 'Exclusive access for $VibeOfficial holders. Extends your PRACTICE deck with 100 additional legendary frequency cards (total 465 cards). Elevate your frequency, reclaim your power, and become the legend you\'re meant to be.',
    cardCount: 465, // ALL cards 1-465 from cardsWithRarity.ts (base 365 + exclusive 100)
    gradient: 'from-yellow-400 via-orange-500 to-pink-500',
    glowColor: 'rgba(251, 191, 36, 0.8)',
  },
];

// Helper functions
export function getPackById(packId: string): VibeCheckPack | undefined {
  return VIBE_CHECK_PACKS.find(pack => pack.id === packId);
}

export function getEligiblePacks(vibeBalance: number): VibeCheckPack[] {
  return VIBE_CHECK_PACKS.filter(pack => vibeBalance >= pack.requiredVibeBalance);
}

export function getPackByRequirement(requiredBalance: number): VibeCheckPack | undefined {
  return VIBE_CHECK_PACKS.find(pack => pack.requiredVibeBalance === requiredBalance);
}

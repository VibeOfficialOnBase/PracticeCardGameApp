export interface StreakBonus {
  multiplier: number;
  xpBonus: number;
  specialReward?: string;
  unlocked: boolean;
}

export interface StreakMilestone {
  day: number;
  name: string;
  description: string;
  reward: {
    xpMultiplier: number;
    bonusXP: number;
    specialEffect?: string;
  };
  icon: string;
  color: string;
}

export const STREAK_MILESTONES: StreakMilestone[] = [
  {
    day: 3,
    name: 'Momentum Builder',
    description: 'Your practice is taking root',
    reward: { xpMultiplier: 1.1, bonusXP: 20 },
    icon: '🌱',
    color: 'from-green-500 to-emerald-500'
  },
  {
    day: 7,
    name: 'Week Warrior',
    description: 'One full week of dedication',
    reward: { xpMultiplier: 1.25, bonusXP: 50, specialEffect: 'rare_card_boost' },
    icon: '🔥',
    color: 'from-orange-500 to-red-500'
  },
  {
    day: 14,
    name: 'Fortnight Champion',
    description: 'Two weeks of unwavering commitment',
    reward: { xpMultiplier: 1.5, bonusXP: 100 },
    icon: '⚡',
    color: 'from-yellow-500 to-amber-500'
  },
  {
    day: 21,
    name: 'Habit Master',
    description: 'You\'ve formed a lasting habit',
    reward: { xpMultiplier: 1.75, bonusXP: 150, specialEffect: 'epic_card_boost' },
    icon: '💫',
    color: 'from-purple-500 to-pink-500'
  },
  {
    day: 30,
    name: 'Monthly Legend',
    description: 'A full month of excellence',
    reward: { xpMultiplier: 2.0, bonusXP: 250, specialEffect: 'legendary_card_boost' },
    icon: '👑',
    color: 'from-indigo-500 to-purple-500'
  },
  {
    day: 50,
    name: 'Dedication Titan',
    description: 'Your commitment inspires others',
    reward: { xpMultiplier: 2.5, bonusXP: 400 },
    icon: '🌟',
    color: 'from-cyan-500 to-blue-500'
  },
  {
    day: 100,
    name: 'Century Master',
    description: '100 days of pure excellence',
    reward: { xpMultiplier: 3.0, bonusXP: 1000, specialEffect: 'mythic_card_boost' },
    icon: '💎',
    color: 'from-pink-500 to-rose-500'
  },
  {
    day: 365,
    name: 'Yearly Sage',
    description: 'A full year of transformation',
    reward: { xpMultiplier: 5.0, bonusXP: 5000, specialEffect: 'permanent_boost' },
    icon: '🏆',
    color: 'from-gold-500 to-yellow-500'
  }
];

const STREAK_BONUS_KEY = 'practice_streak_bonuses';

// Get current streak bonus multiplier
export function getStreakMultiplier(streak: number): number {
  if (streak < 3) return 1.0;
  
  // Find the highest milestone achieved
  const activeMilestones = STREAK_MILESTONES.filter((m) => streak >= m.day);
  if (activeMilestones.length === 0) return 1.0;
  
  const highestMilestone = activeMilestones[activeMilestones.length - 1];
  return highestMilestone.reward.xpMultiplier;
}

// Get special card rarity boost based on streak
export function getCardRarityBoost(streak: number): number {
  if (streak < 7) return 0;
  if (streak >= 365) return 0.25; // 25% boost for year-long streak
  if (streak >= 100) return 0.15; // 15% boost
  if (streak >= 30) return 0.10;  // 10% boost
  if (streak >= 21) return 0.07;  // 7% boost
  if (streak >= 7) return 0.05;   // 5% boost
  
  return 0;
}

// Get milestone reward for achieving a specific streak day
export function getMilestoneReward(streak: number): StreakMilestone | null {
  return STREAK_MILESTONES.find((m) => m.day === streak) || null;
}

// Get next milestone to achieve
export function getNextMilestone(streak: number): StreakMilestone | null {
  const upcoming = STREAK_MILESTONES.filter((m) => m.day > streak);
  return upcoming.length > 0 ? upcoming[0] : null;
}

// Calculate combo bonus (consecutive actions within a session)
export interface ComboAction {
  type: 'pull' | 'share' | 'favorite' | 'journal' | 'challenge';
  timestamp: number;
}

const COMBO_WINDOW = 5 * 60 * 1000; // 5 minutes
const COMBO_KEY = 'practice_combo_tracking';

export function recordComboAction(userId: string, action: ComboAction['type']): number {
  if (typeof window === 'undefined') return 0;
  
  try {
    const data = localStorage.getItem(COMBO_KEY);
    const allCombos: Record<string, ComboAction[]> = data ? JSON.parse(data) : {};
    
    const userActions = allCombos[userId] || [];
    const now = Date.now();
    
    // Filter out actions outside the combo window
    const recentActions = userActions.filter(
      (a) => now - a.timestamp < COMBO_WINDOW
    );
    
    // Add new action
    recentActions.push({ type: action, timestamp: now });
    allCombos[userId] = recentActions;
    
    localStorage.setItem(COMBO_KEY, JSON.stringify(allCombos));
    
    // Return combo count
    return recentActions.length;
  } catch (error) {
    console.error('Error recording combo action:', error);
    return 0;
  }
}

export function getComboBonus(comboCount: number): number {
  if (comboCount < 2) return 0;
  if (comboCount >= 5) return 50; // 5+ action combo
  if (comboCount >= 4) return 30; // 4 action combo
  if (comboCount >= 3) return 20; // 3 action combo
  return 10; // 2 action combo
}

export function getCurrentCombo(userId: string): number {
  if (typeof window === 'undefined') return 0;
  
  try {
    const data = localStorage.getItem(COMBO_KEY);
    if (!data) return 0;
    
    const allCombos: Record<string, ComboAction[]> = JSON.parse(data);
    const userActions = allCombos[userId] || [];
    const now = Date.now();
    
    // Count recent actions within combo window
    return userActions.filter((a) => now - a.timestamp < COMBO_WINDOW).length;
  } catch (error) {
    console.error('Error getting combo:', error);
    return 0;
  }
}

// Streak freeze/protection (power-up feature)
const STREAK_FREEZE_KEY = 'practice_streak_freezes';

export interface StreakFreeze {
  userId: string;
  usedDate: number;
}

export function hasStreakFreezeAvailable(userId: string): boolean {
  // Users get 1 freeze per 30-day streak milestone
  if (typeof window === 'undefined') return false;
  
  try {
    const data = localStorage.getItem(STREAK_FREEZE_KEY);
    const freezes: StreakFreeze[] = data ? JSON.parse(data) : [];
    
    // Check if user has used a freeze in the last 30 days
    const recentFreezes = freezes.filter(
      (f) => f.userId === userId && Date.now() - f.usedDate < 30 * 24 * 60 * 60 * 1000
    );
    
    return recentFreezes.length === 0;
  } catch (error) {
    console.error('Error checking streak freeze:', error);
    return false;
  }
}

export function useStreakFreeze(userId: string): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const data = localStorage.getItem(STREAK_FREEZE_KEY);
    const freezes: StreakFreeze[] = data ? JSON.parse(data) : [];
    
    freezes.push({ userId, usedDate: Date.now() });
    localStorage.setItem(STREAK_FREEZE_KEY, JSON.stringify(freezes));
    
    return true;
  } catch (error) {
    console.error('Error using streak freeze:', error);
    return false;
  }
}

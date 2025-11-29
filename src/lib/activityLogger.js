/**
 * Activity Logger for tracking user activities in Supabase
 * Logs various actions: card pulls, mood entries, VibeAGotchi activity, wins, streaks, achievements
 */

import { supabase } from '@/api/supabaseClient';

// Activity types
export const ACTIVITY_TYPES = {
  CARD_PULL: 'card_pull',
  MOOD_ENTRY: 'mood_entry',
  PRACTICE_COMPLETE: 'practice_complete',
  GAME_PLAY: 'game_play',
  GAME_WIN: 'game_win',
  STREAK_MILESTONE: 'streak_milestone',
  ACHIEVEMENT_UNLOCK: 'achievement_unlock',
  VIBEAGOTCHI_FEED: 'vibeagotchi_feed',
  VIBEAGOTCHI_CHECKIN: 'vibeagotchi_checkin',
  VIBEAGOTCHI_EVOLUTION: 'vibeagotchi_evolution',
  XP_GAINED: 'xp_gained',
  LEVEL_UP: 'level_up',
};

/**
 * Log an activity to the user_activity table
 * @param {string} userEmail - User's email
 * @param {string} activityType - Type of activity from ACTIVITY_TYPES
 * @param {object} metadata - Additional activity data
 * @returns {Promise<object|null>} - The created activity record or null on error
 */
export async function logActivity(userEmail, activityType, metadata = {}) {
  if (!userEmail) {
    console.warn('Cannot log activity: userEmail is required');
    return null;
  }

  try {
    // Note: created_at should use database default (NOW()) for consistency
    // If the table has a default value, omit created_at here
    const activityData = {
      user_email: userEmail,
      activity_type: activityType,
      metadata: metadata,
      // Let database set created_at with default value if available
      // Include client timestamp as fallback for tables without default
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('user_activity')
      .insert(activityData)
      .select()
      .single();

    if (error) {
      // Table might not exist yet - log warning but don't fail
      console.warn('Could not log activity to user_activity:', error.message);
      // TODO: DB migration needed - create user_activity table with columns:
      // id (uuid, primary key, default gen_random_uuid())
      // user_email (text, not null)
      // activity_type (text, not null)
      // metadata (jsonb, default '{}')
      // created_at (timestamptz, default now())
      return null;
    }

    return data;
  } catch (err) {
    console.error('Error logging activity:', err);
    return null;
  }
}

/**
 * Log a card pull activity
 */
export async function logCardPull(userEmail, cardId, cardTitle) {
  return logActivity(userEmail, ACTIVITY_TYPES.CARD_PULL, {
    card_id: cardId,
    card_title: cardTitle,
  });
}

/**
 * Log a mood entry
 */
export async function logMoodEntry(userEmail, mood, note = '') {
  return logActivity(userEmail, ACTIVITY_TYPES.MOOD_ENTRY, {
    mood,
    note,
  });
}

/**
 * Log practice completion
 */
export async function logPracticeComplete(userEmail, cardId, xpEarned, beforeMood, afterMood) {
  return logActivity(userEmail, ACTIVITY_TYPES.PRACTICE_COMPLETE, {
    card_id: cardId,
    xp_earned: xpEarned,
    before_mood: beforeMood,
    after_mood: afterMood,
  });
}

/**
 * Log a game play/win
 */
export async function logGameActivity(userEmail, gameType, score, isWin = false) {
  const type = isWin ? ACTIVITY_TYPES.GAME_WIN : ACTIVITY_TYPES.GAME_PLAY;
  return logActivity(userEmail, type, {
    game_type: gameType,
    score,
  });
}

/**
 * Log a streak milestone
 */
export async function logStreakMilestone(userEmail, streakCount) {
  return logActivity(userEmail, ACTIVITY_TYPES.STREAK_MILESTONE, {
    streak_count: streakCount,
  });
}

/**
 * Log an achievement unlock
 */
export async function logAchievementUnlock(userEmail, achievementId, achievementTitle) {
  return logActivity(userEmail, ACTIVITY_TYPES.ACHIEVEMENT_UNLOCK, {
    achievement_id: achievementId,
    achievement_title: achievementTitle,
  });
}

/**
 * Log VibeAGotchi feed
 */
export async function logVibeagotchiFeed(userEmail, petName, xpGained) {
  return logActivity(userEmail, ACTIVITY_TYPES.VIBEAGOTCHI_FEED, {
    pet_name: petName,
    xp_gained: xpGained,
  });
}

/**
 * Log VibeAGotchi check-in
 */
export async function logVibeagotchiCheckin(userEmail, petName, mood) {
  return logActivity(userEmail, ACTIVITY_TYPES.VIBEAGOTCHI_CHECKIN, {
    pet_name: petName,
    mood,
  });
}

/**
 * Log VibeAGotchi evolution
 */
export async function logVibeagotchiEvolution(userEmail, petName, stage, stageName) {
  return logActivity(userEmail, ACTIVITY_TYPES.VIBEAGOTCHI_EVOLUTION, {
    pet_name: petName,
    stage,
    stage_name: stageName,
  });
}

/**
 * Log XP gained
 */
export async function logXPGained(userEmail, xpAmount, source) {
  return logActivity(userEmail, ACTIVITY_TYPES.XP_GAINED, {
    xp_amount: xpAmount,
    source,
  });
}

/**
 * Log level up
 */
export async function logLevelUp(userEmail, newLevel) {
  return logActivity(userEmail, ACTIVITY_TYPES.LEVEL_UP, {
    new_level: newLevel,
  });
}

/**
 * Subscribe to real-time activity updates for a user
 * @param {string} userEmail - User's email to subscribe to
 * @param {function} callback - Callback function called when new activity is created
 * @returns {object} - Supabase subscription channel
 */
export function subscribeToUserActivity(userEmail, callback) {
  if (!userEmail) {
    console.warn('Cannot subscribe to activity: userEmail is required');
    return null;
  }

  const channel = supabase
    .channel(`user_activity_${userEmail}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'user_activity',
        filter: `user_email=eq.${userEmail}`,
      },
      (payload) => {
        callback(payload.new);
      }
    )
    .subscribe();

  return channel;
}

/**
 * Unsubscribe from activity updates
 * @param {object} channel - The subscription channel to unsubscribe from
 */
export async function unsubscribeFromActivity(channel) {
  if (channel) {
    await supabase.removeChannel(channel);
  }
}

/**
 * Get recent activity for a user
 * @param {string} userEmail - User's email
 * @param {number} limit - Number of activities to fetch
 * @returns {Promise<array>} - Array of activity records
 */
export async function getRecentActivity(userEmail, limit = 20) {
  if (!userEmail) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('user_activity')
      .select('*')
      .eq('user_email', userEmail)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.warn('Could not fetch recent activity:', error.message);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Error fetching recent activity:', err);
    return [];
  }
}

export default {
  ACTIVITY_TYPES,
  logActivity,
  logCardPull,
  logMoodEntry,
  logPracticeComplete,
  logGameActivity,
  logStreakMilestone,
  logAchievementUnlock,
  logVibeagotchiFeed,
  logVibeagotchiCheckin,
  logVibeagotchiEvolution,
  logXPGained,
  logLevelUp,
  subscribeToUserActivity,
  unsubscribeFromActivity,
  getRecentActivity,
};

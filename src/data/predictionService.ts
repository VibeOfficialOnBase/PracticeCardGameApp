/**
 * Prediction Service
 * AI-powered predictions for user behavior and engagement
 */

import { getUserPulls } from './pullTracking';

interface PredictionResult {
  prediction: string;
  confidence: number;
  data: any;
}

/**
 * Predicts the best time for user to pull their card
 */
export function predictOptimalPullTime(username: string): PredictionResult {
  const pulls = getUserPulls(username);
  
  if (pulls.length < 3) {
    return {
      prediction: '09:00',
      confidence: 0.3,
      data: { message: 'Not enough data yet. We suggest morning pulls.' },
    };
  }

  // Analyze pull times
  const pullHours = pulls.map(p => new Date(p.date).getHours());
  const hourFrequency: Record<number, number> = {};
  
  pullHours.forEach(hour => {
    hourFrequency[hour] = (hourFrequency[hour] || 0) + 1;
  });

  // Find most common hour
  const sortedHours = Object.entries(hourFrequency)
    .sort((a, b) => Number(b[1]) - Number(a[1]));
  
  const mostCommonHour = parseInt(sortedHours[0][0]);
  const frequency = sortedHours[0][1];
  const confidence = Math.min(frequency / pulls.length, 1.0);

  return {
    prediction: `${mostCommonHour.toString().padStart(2, '0')}:00`,
    confidence,
    data: {
      hourFrequency,
      totalPulls: pulls.length,
      consistency: confidence * 100,
    },
  };
}

/**
 * Predicts if user is at risk of breaking their streak
 */
export function predictStreakRisk(username: string): PredictionResult {
  const pulls = getUserPulls(username);
  
  if (pulls.length === 0) {
    return {
      prediction: 'low',
      confidence: 1.0,
      data: { message: 'No streak to lose yet!' },
    };
  }

  const lastPull = new Date(pulls[pulls.length - 1].date);
  const now = new Date();
  const hoursSinceLastPull = (now.getTime() - lastPull.getTime()) / (1000 * 60 * 60);

  let risk = 'low';
  let confidence = 0.8;

  if (hoursSinceLastPull > 20) {
    risk = 'high';
    confidence = 0.9;
  } else if (hoursSinceLastPull > 16) {
    risk = 'medium';
    confidence = 0.85;
  }

  return {
    prediction: risk,
    confidence,
    data: {
      hoursSinceLastPull,
      lastPullDate: lastPull.toISOString(),
      message: risk === 'high' 
        ? 'Pull your card soon to maintain your streak!' 
        : risk === 'medium'
        ? 'Don\'t forget to pull your card today!'
        : 'You\'re on track!',
    },
  };
}

/**
 * Predicts next achievement user is likely to unlock
 */
export function predictNextAchievement(username: string): PredictionResult {
  const pulls = getUserPulls(username);
  const pullCount = pulls.length;

  // Calculate current streak
  let streak = 0;
  if (pulls.length > 0) {
    streak = 1;
    for (let i = pulls.length - 1; i > 0; i--) {
      const current = new Date(pulls[i].date);
      const prev = new Date(pulls[i - 1].date);
      const diffTime = Math.abs(current.getTime() - prev.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        streak++;
      } else {
        break;
      }
    }
  }

  const predictions = [];

  // Streak predictions
  if (streak < 7) {
    predictions.push({
      name: 'Week Warrior',
      daysUntil: 7 - streak,
      type: 'streak',
      probability: 0.7,
    });
  } else if (streak < 30) {
    predictions.push({
      name: 'Month Master',
      daysUntil: 30 - streak,
      type: 'streak',
      probability: 0.6,
    });
  } else if (streak < 100) {
    predictions.push({
      name: 'Century Sage',
      daysUntil: 100 - streak,
      type: 'streak',
      probability: 0.5,
    });
  }

  // Pull count predictions
  if (pullCount < 50) {
    predictions.push({
      name: '50 Pulls',
      daysUntil: 50 - pullCount,
      type: 'pulls',
      probability: 0.8,
    });
  } else if (pullCount < 100) {
    predictions.push({
      name: '100 Pulls',
      daysUntil: 100 - pullCount,
      type: 'pulls',
      probability: 0.75,
    });
  }

  // Sort by closest
  predictions.sort((a, b) => a.daysUntil - b.daysUntil);

  const next = predictions[0] || {
    name: 'Keep Practicing!',
    daysUntil: 0,
    type: 'general',
    probability: 1.0,
  };

  return {
    prediction: next.name,
    confidence: next.probability,
    data: {
      achievement: next,
      allPredictions: predictions,
      currentStreak: streak,
      currentPulls: pullCount,
    },
  };
}

/**
 * Predicts user engagement level
 */
export function predictEngagementLevel(username: string): PredictionResult {
  const pulls = getUserPulls(username);
  
  if (pulls.length === 0) {
    return {
      prediction: 'new',
      confidence: 1.0,
      data: { message: 'Welcome! Start your journey today.' },
    };
  }

  const last7Days = pulls.slice(-7);
  const last30Days = pulls.slice(-30);

  const recentEngagement = last7Days.length;
  const monthlyEngagement = last30Days.length;

  let level = 'low';
  let confidence = 0.7;

  if (recentEngagement >= 6 && monthlyEngagement >= 20) {
    level = 'high';
    confidence = 0.9;
  } else if (recentEngagement >= 4 && monthlyEngagement >= 12) {
    level = 'medium';
    confidence = 0.85;
  }

  return {
    prediction: level,
    confidence,
    data: {
      recentEngagement,
      monthlyEngagement,
      totalPulls: pulls.length,
      message: level === 'high'
        ? 'You\'re a PRACTICE champion!'
        : level === 'medium'
        ? 'Great consistency! Keep it up!'
        : 'Try to pull more regularly for better results.',
    },
  };
}

/**
 * Generates personalized insights
 */
export function generatePersonalizedInsights(username: string): {
  optimalTime: PredictionResult;
  streakRisk: PredictionResult;
  nextAchievement: PredictionResult;
  engagement: PredictionResult;
} {
  return {
    optimalTime: predictOptimalPullTime(username),
    streakRisk: predictStreakRisk(username),
    nextAchievement: predictNextAchievement(username),
    engagement: predictEngagementLevel(username),
  };
}

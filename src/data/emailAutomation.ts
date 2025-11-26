/**
 * Email Automation Utilities
 * Handles automated email sequences for user retention
 */

interface EmailData {
  streakDays?: number;
  milestone?: string;
  achievement?: string;
  lastStreak?: number;
}

export async function sendEmail(
  email: string,
  username: string,
  type: 'welcome' | 'streak_risk' | 'milestone' | 'win_back',
  data?: EmailData
): Promise<boolean> {
  try {
    const response = await fetch('/api/email/retention', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        username,
        type,
        data,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

/**
 * Send welcome email to new users
 */
export function sendWelcomeEmail(email: string, username: string): void {
  // Send immediately
  sendEmail(email, username, 'welcome');
}

/**
 * Check if user should receive streak risk email
 */
export function checkStreakRiskEmail(
  username: string,
  email: string,
  lastPullDate: number,
  currentStreak: number
): void {
  if (typeof window === 'undefined') return;

  const now = Date.now();
  const hoursSinceLastPull = (now - lastPullDate) / (1000 * 60 * 60);

  // Send if they haven't pulled in 20 hours and have a streak of 3+ days
  if (hoursSinceLastPull >= 20 && hoursSinceLastPull < 23 && currentStreak >= 3) {
    const lastEmailKey = `practice_streak_email_${username}`;
    const lastEmailSent = localStorage.getItem(lastEmailKey);
    
    // Only send once per day
    if (!lastEmailSent || now - parseInt(lastEmailSent) > 24 * 60 * 60 * 1000) {
      sendEmail(email, username, 'streak_risk', { streakDays: currentStreak });
      localStorage.setItem(lastEmailKey, now.toString());
    }
  }
}

/**
 * Send milestone achievement email
 */
export function sendMilestoneEmail(
  email: string,
  username: string,
  milestone: string,
  achievement: string
): void {
  sendEmail(email, username, 'milestone', { milestone, achievement });
}

/**
 * Check if user should receive win-back email
 */
export function checkWinBackEmail(
  username: string,
  email: string,
  lastPullDate: number,
  lastStreak: number
): void {
  if (typeof window === 'undefined') return;

  const now = Date.now();
  const daysSinceLastPull = (now - lastPullDate) / (1000 * 60 * 60 * 24);

  // Send if they haven't pulled in 7 days
  if (daysSinceLastPull >= 7 && daysSinceLastPull < 8) {
    const lastEmailKey = `practice_winback_email_${username}`;
    const lastEmailSent = localStorage.getItem(lastEmailKey);
    
    // Only send once per 14 days
    if (!lastEmailSent || now - parseInt(lastEmailSent) > 14 * 24 * 60 * 60 * 1000) {
      sendEmail(email, username, 'win_back', { lastStreak });
      localStorage.setItem(lastEmailKey, now.toString());
    }
  }
}

/**
 * Schedule email automation checks
 */
export function initializeEmailAutomation(
  username: string,
  email: string,
  lastPullDate: number,
  currentStreak: number
): void {
  if (typeof window === 'undefined' || !email) return;

  // Check streak risk every hour
  const checkInterval = setInterval(() => {
    checkStreakRiskEmail(username, email, lastPullDate, currentStreak);
  }, 60 * 60 * 1000); // Every hour

  // Clean up on page unload
  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', () => {
      clearInterval(checkInterval);
    });
  }
}

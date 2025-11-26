import { toast } from 'sonner';

/**
 * Success toast notifications
 */
export const showSuccessToast = (message: string) => {
  toast.success(message, {
    duration: 3000,
    style: {
      background: 'rgba(16, 185, 129, 0.1)',
      border: '1px solid rgba(16, 185, 129, 0.3)',
      color: 'white',
      backdropFilter: 'blur(12px)',
    },
  });
};

/**
 * Error toast notifications
 */
export const showErrorToast = (message: string) => {
  toast.error(message, {
    duration: 4000,
    style: {
      background: 'rgba(239, 68, 68, 0.1)',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      color: 'white',
      backdropFilter: 'blur(12px)',
    },
  });
};

/**
 * Info toast notifications
 */
export const showInfoToast = (message: string) => {
  toast.info(message, {
    duration: 3000,
    style: {
      background: 'rgba(59, 130, 246, 0.1)',
      border: '1px solid rgba(59, 130, 246, 0.3)',
      color: 'white',
      backdropFilter: 'blur(12px)',
    },
  });
};

/**
 * Loading toast that can be dismissed
 */
export const showLoadingToast = (message: string) => {
  return toast.loading(message, {
    style: {
      background: 'rgba(168, 85, 247, 0.1)',
      border: '1px solid rgba(168, 85, 247, 0.3)',
      color: 'white',
      backdropFilter: 'blur(12px)',
    },
  });
};

/**
 * Update existing toast (use with loading toast)
 */
export const updateToast = (toastId: string | number, type: 'success' | 'error', message: string) => {
  if (type === 'success') {
    toast.success(message, { id: toastId });
  } else {
    toast.error(message, { id: toastId });
  }
};

/**
 * Achievement unlock toast with custom styling
 */
export const showAchievementToast = (achievementName: string) => {
  toast.success(`🏆 Achievement Unlocked: ${achievementName}!`, {
    duration: 5000,
    style: {
      background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2))',
      border: '2px solid rgba(168, 85, 247, 0.4)',
      color: 'white',
      backdropFilter: 'blur(12px)',
      fontWeight: 'bold',
    },
  });
};

/**
 * Streak milestone toast
 */
export const showStreakToast = (streak: number) => {
  toast.success(`🔥 ${streak} Day Streak! Keep it going!`, {
    duration: 4000,
    style: {
      background: 'linear-gradient(135deg, rgba(251, 146, 60, 0.2), rgba(239, 68, 68, 0.2))',
      border: '2px solid rgba(251, 146, 60, 0.4)',
      color: 'white',
      backdropFilter: 'blur(12px)',
      fontWeight: 'bold',
    },
  });
};

/**
 * Level up toast
 */
export const showLevelUpToast = (level: number) => {
  toast.success(`✨ Level ${level} Reached! Amazing progress!`, {
    duration: 5000,
    style: {
      background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.2), rgba(249, 115, 22, 0.2))',
      border: '2px solid rgba(234, 179, 8, 0.4)',
      color: 'white',
      backdropFilter: 'blur(12px)',
      fontWeight: 'bold',
    },
  });
};

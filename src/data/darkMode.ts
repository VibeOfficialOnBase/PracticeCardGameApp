const DARK_MODE_KEY = 'practice_dark_mode';

export function isDarkMode(): boolean {
  if (typeof window === 'undefined') return false;
  
  const saved = localStorage.getItem(DARK_MODE_KEY);
  if (saved !== null) {
    return saved === 'true';
  }
  
  // Default to system preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function setDarkMode(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem(DARK_MODE_KEY, String(enabled));
  
  if (enabled) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

export function toggleDarkMode(): boolean {
  const newMode = !isDarkMode();
  setDarkMode(newMode);
  return newMode;
}

export function initializeDarkMode(): void {
  if (typeof window === 'undefined') return;
  
  if (isDarkMode()) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

/**
 * Type-safe localStorage wrapper with error handling
 * 
 * Provides safe access to localStorage with proper error handling,
 * type safety, and fallback values. Prevents runtime errors from
 * quota exceeded, security restrictions, or parsing failures.
 * 
 * @module safeStorage
 */

/**
 * Safely retrieves and parses an item from localStorage
 * 
 * @template T - The expected type of the stored value
 * @param key - The localStorage key to retrieve
 * @param defaultValue - Fallback value if retrieval fails or key doesn't exist
 * @returns The parsed value or the default value
 * 
 * @example
 * ```typescript
 * const username = safeLocalStorage.getItem<string>('username', 'Guest');
 * const settings = safeLocalStorage.getItem<UserSettings>('settings', defaultSettings);
 * ```
 */
export const safeLocalStorage = {
  getItem<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') {
      return defaultValue;
    }
    
    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        return defaultValue;
      }
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error);
      return defaultValue;
    }
  },

  /**
   * Safely sets an item in localStorage with JSON serialization
   * 
   * @template T - The type of value being stored
   * @param key - The localStorage key
   * @param value - The value to store (will be JSON stringified)
   * @returns true if successful, false if failed
   * 
   * @example
   * ```typescript
   * safeLocalStorage.setItem('username', 'John');
   * safeLocalStorage.setItem('settings', { theme: 'dark', notifications: true });
   * ```
   */
  setItem<T>(key: string, value: T): boolean {
    if (typeof window === 'undefined') {
      return false;
    }
    
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        console.error(`localStorage quota exceeded when setting key "${key}"`);
      } else {
        console.error(`Error writing to localStorage key "${key}":`, error);
      }
      return false;
    }
  },

  /**
   * Safely removes an item from localStorage
   * 
   * @param key - The localStorage key to remove
   * @returns true if successful, false if failed
   */
  removeItem(key: string): boolean {
    if (typeof window === 'undefined') {
      return false;
    }
    
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
      return false;
    }
  },

  /**
   * Checks if a key exists in localStorage
   * 
   * @param key - The localStorage key to check
   * @returns true if the key exists, false otherwise
   */
  hasItem(key: string): boolean {
    if (typeof window === 'undefined') {
      return false;
    }
    
    try {
      return localStorage.getItem(key) !== null;
    } catch (error) {
      console.error(`Error checking localStorage key "${key}":`, error);
      return false;
    }
  },

  /**
   * Safely clears all items from localStorage
   * 
   * @returns true if successful, false if failed
   */
  clear(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }
    
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }
};

/**
 * Type-safe sessionStorage wrapper with error handling
 * 
 * Same interface as safeLocalStorage but for sessionStorage
 */
export const safeSessionStorage = {
  getItem<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') {
      return defaultValue;
    }
    
    try {
      const item = sessionStorage.getItem(key);
      if (item === null) {
        return defaultValue;
      }
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error reading from sessionStorage key "${key}":`, error);
      return defaultValue;
    }
  },

  setItem<T>(key: string, value: T): boolean {
    if (typeof window === 'undefined') {
      return false;
    }
    
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to sessionStorage key "${key}":`, error);
      return false;
    }
  },

  removeItem(key: string): boolean {
    if (typeof window === 'undefined') {
      return false;
    }
    
    try {
      sessionStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing sessionStorage key "${key}":`, error);
      return false;
    }
  },

  hasItem(key: string): boolean {
    if (typeof window === 'undefined') {
      return false;
    }
    
    try {
      return sessionStorage.getItem(key) !== null;
    } catch (error) {
      console.error(`Error checking sessionStorage key "${key}":`, error);
      return false;
    }
  },

  clear(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }
    
    try {
      sessionStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing sessionStorage:', error);
      return false;
    }
  }
};

/**
 * Design System Constants for PRACTICE App
 * 
 * This file defines the standard spacing, typography, colors, and layout values
 * used throughout the application to ensure visual consistency.
 */

export const DESIGN_TOKENS = {
  // Spacing scale (gap, margin, padding)
  spacing: {
    card: 'gap-3',           // Standard gap between card grid items
    section: 'gap-6',        // Gap between major sections
    component: 'gap-2',      // Small gap within components
    list: 'gap-4',           // Gap for list items
  },

  // Padding patterns
  padding: {
    card: 'p-4 sm:p-6',                    // Internal card padding
    cardHeader: 'px-4 sm:px-6',            // Card header horizontal padding
    container: 'px-4',                     // Container horizontal padding
    section: 'py-6',                       // Vertical section padding
    button: 'px-4 py-2',                   // Standard button padding
  },

  // Typography hierarchy
  typography: {
    // Page-level headings
    h1: 'text-4xl sm:text-5xl font-bold',           // Main page title
    h2: 'text-2xl sm:text-3xl font-bold',           // Section title
    h3: 'text-xl sm:text-2xl font-semibold',        // Card/subsection title
    
    // Body text
    body: 'text-sm sm:text-base',                   // Standard body text
    bodyLarge: 'text-base sm:text-lg',              // Emphasized body text
    caption: 'text-xs',                             // Small captions/labels
    captionLarge: 'text-xs sm:text-sm',             // Responsive captions
    
    // Utility
    uppercase: 'uppercase tracking-wider',          // Label style
  },

  // Max width constraints
  maxWidth: {
    card: 'max-w-md',                // Single card displays
    list: 'max-w-2xl',               // Lists, tables, leaderboards
    grid: 'max-w-4xl',               // Wide grids, collections
    page: 'max-w-6xl',               // Full page container
  },

  // Touch target sizes (accessibility)
  touchTarget: {
    min: 'min-w-[44px] min-h-[44px]',   // Minimum WCAG-compliant size
    icon: 'w-5 h-5',                     // Standard icon size
    iconLarge: 'w-6 h-6',                // Large icon size
  },

  // Color tokens (semantic)
  colors: {
    textPrimary: 'text-white',
    textSecondary: 'text-white/80',
    textTertiary: 'text-white/60',
    textMuted: 'text-white/50',
    
    // Status colors
    success: 'text-green-300',
    warning: 'text-yellow-300',
    error: 'text-red-300',
    info: 'text-blue-300',
  },

  // Border styles
  borders: {
    card: 'border border-white/20',
    cardEmphasized: 'border-2 border-white/30',
    glass: 'border border-white/10',
  },

  // Animation durations
  transitions: {
    fast: 'duration-200',
    normal: 'duration-300',
    slow: 'duration-500',
  },
} as const;

/**
 * Helper function to get responsive padding
 */
export function getResponsivePadding(type: keyof typeof DESIGN_TOKENS.padding): string {
  return DESIGN_TOKENS.padding[type];
}

/**
 * Helper function to get typography styles
 */
export function getTypography(level: keyof typeof DESIGN_TOKENS.typography): string {
  return DESIGN_TOKENS.typography[level];
}

/**
 * Helper function to get spacing
 */
export function getSpacing(type: keyof typeof DESIGN_TOKENS.spacing): string {
  return DESIGN_TOKENS.spacing[type];
}

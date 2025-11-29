/**
 * levelConfig.ts
 * 
 * Designer-friendly level configuration examples.
 * Defines spawn policies and level settings for easy/normal/hard difficulties.
 * 
 * Usage:
 *   import { LEVEL_CONFIGS, SPAWN_POLICIES } from './config/levelConfig';
 *   
 *   const config = LEVEL_CONFIGS.normal;
 *   const levelManager = new LevelManager({
 *     startDelay: config.startDelay,
 *     endDelay: config.endDelay,
 *   });
 *   spawnManager.setPolicy(config.spawnPolicy);
 * 
 * Tuning knobs:
 *   - Adjust ratePerSecond for spawn frequency
 *   - Modify wave times and counts for difficulty
 *   - Change startDelay/endDelay for pacing
 */

import type { SpawnPolicy, WaveConfig, ScheduleEntry } from '../SpawnManager';

// ============================================================================
// Spawn Policy Presets
// ============================================================================

/**
 * Pre-configured spawn policies for common scenarios.
 */
export const SPAWN_POLICIES = {
  /** Slow and steady enemy spawning */
  easyEnemies: {
    type: 'continuous' as const,
    ratePerSecond: 0.5,
    entityType: 'enemy',
  },

  /** Moderate enemy spawning */
  normalEnemies: {
    type: 'continuous' as const,
    ratePerSecond: 1.5,
    entityType: 'enemy',
  },

  /** Fast enemy spawning */
  hardEnemies: {
    type: 'continuous' as const,
    ratePerSecond: 3.0,
    entityType: 'enemy',
  },

  /** Continuous coin spawning for collection */
  coins: {
    type: 'continuous' as const,
    ratePerSecond: 2.0,
    entityType: 'coin',
  },

  /** Power-up spawning at scheduled times */
  powerUps: {
    type: 'schedule' as const,
    schedule: [
      { time: 10, count: 1, entityType: 'powerup_shield' },
      { time: 30, count: 1, entityType: 'powerup_speed' },
      { time: 60, count: 1, entityType: 'powerup_damage' },
      { time: 90, count: 1, entityType: 'powerup_shield' },
    ] as ScheduleEntry[],
  },
} satisfies Record<string, SpawnPolicy>;

// ============================================================================
// Wave Configurations
// ============================================================================

/**
 * Wave configurations for different difficulty levels.
 */
export const WAVE_CONFIGS = {
  easy: [
    { time: 5, count: 3, entityType: 'enemy_basic' },
    { time: 20, count: 5, entityType: 'enemy_basic' },
    { time: 40, count: 4, entityType: 'enemy_basic' },
    { time: 60, count: 6, entityType: 'enemy_basic' },
  ] as WaveConfig[],

  normal: [
    { time: 5, count: 5, entityType: 'enemy_basic' },
    { time: 15, count: 3, entityType: 'enemy_fast' },
    { time: 30, count: 8, entityType: 'enemy_basic' },
    { time: 45, count: 5, entityType: 'enemy_fast' },
    { time: 60, count: 10, entityType: 'enemy_basic' },
    { time: 75, count: 2, entityType: 'enemy_boss' },
  ] as WaveConfig[],

  hard: [
    { time: 3, count: 8, entityType: 'enemy_basic' },
    { time: 10, count: 5, entityType: 'enemy_fast' },
    { time: 20, count: 12, entityType: 'enemy_basic' },
    { time: 30, count: 8, entityType: 'enemy_fast' },
    { time: 40, count: 3, entityType: 'enemy_tank' },
    { time: 50, count: 15, entityType: 'enemy_basic' },
    { time: 60, count: 5, entityType: 'enemy_boss' },
  ] as WaveConfig[],
};

// ============================================================================
// Complete Level Configurations
// ============================================================================

export interface LevelConfig {
  /** Display name for the level */
  name: string;
  /** Delay before level starts running (seconds) */
  startDelay: number;
  /** Delay after level ends before completion (seconds) */
  endDelay: number;
  /** Spawn policy for this level */
  spawnPolicy: SpawnPolicy;
  /** Level duration in seconds (optional, for timed levels) */
  duration?: number;
  /** VIbagotchi decay multiplier (optional, higher = faster decay) */
  petDecayMultiplier?: number;
}

/**
 * Complete level configurations for different difficulties.
 */
export const LEVEL_CONFIGS: Record<string, LevelConfig> = {
  tutorial: {
    name: 'Tutorial',
    startDelay: 3.0,
    endDelay: 2.0,
    spawnPolicy: {
      type: 'schedule',
      schedule: [
        { time: 2, count: 1, entityType: 'tutorial_target' },
        { time: 8, count: 1, entityType: 'tutorial_target' },
        { time: 15, count: 2, entityType: 'tutorial_target' },
      ],
    },
    duration: 30,
    petDecayMultiplier: 0.5, // Slow decay for tutorial
  },

  easy: {
    name: 'Easy Mode',
    startDelay: 2.0,
    endDelay: 1.5,
    spawnPolicy: {
      type: 'wave',
      waves: WAVE_CONFIGS.easy,
    },
    duration: 90,
    petDecayMultiplier: 0.8,
  },

  normal: {
    name: 'Normal Mode',
    startDelay: 1.5,
    endDelay: 1.0,
    spawnPolicy: {
      type: 'wave',
      waves: WAVE_CONFIGS.normal,
    },
    duration: 120,
    petDecayMultiplier: 1.0,
  },

  hard: {
    name: 'Hard Mode',
    startDelay: 1.0,
    endDelay: 0.5,
    spawnPolicy: {
      type: 'wave',
      waves: WAVE_CONFIGS.hard,
    },
    duration: 90,
    petDecayMultiplier: 1.5,
  },

  endless: {
    name: 'Endless Mode',
    startDelay: 2.0,
    endDelay: 1.0,
    spawnPolicy: SPAWN_POLICIES.normalEnemies,
    // No duration - plays until game over
    petDecayMultiplier: 1.2,
  },

  survival: {
    name: 'Survival Mode',
    startDelay: 3.0,
    endDelay: 2.0,
    spawnPolicy: SPAWN_POLICIES.hardEnemies,
    duration: 180,
    petDecayMultiplier: 2.0, // Fast decay for challenge
  },
};

// ============================================================================
// VIbagotchi Presets
// ============================================================================

/**
 * VIbagotchi configuration presets.
 */
export const VIBAGOTCHI_PRESETS = {
  /** Relaxed pet with slow decay */
  relaxed: {
    decayRates: { hunger: 0.5, happiness: 0.4, energy: 0.3 },
    actionEffects: { feed: 40, play: 35, sleep: 50 },
  },

  /** Normal pet balance */
  normal: {
    decayRates: { hunger: 1.0, happiness: 0.8, energy: 0.5 },
    actionEffects: { feed: 30, play: 25, sleep: 40 },
  },

  /** Demanding pet with fast decay */
  demanding: {
    decayRates: { hunger: 2.0, happiness: 1.5, energy: 1.0 },
    actionEffects: { feed: 25, play: 20, sleep: 35 },
  },
};

// ============================================================================
// Spawn Manager Configuration Presets
// ============================================================================

/**
 * SpawnManager configuration presets for different scenarios.
 */
export const SPAWN_MANAGER_CONFIGS = {
  /** Standard configuration for most levels */
  standard: {
    maxSpawnsPerSecond: 20,
    maxBurstPerUpdate: 5,
  },

  /** Conservative configuration for performance-sensitive scenarios */
  conservative: {
    maxSpawnsPerSecond: 10,
    maxBurstPerUpdate: 2,
  },

  /** Aggressive configuration for action-heavy levels */
  aggressive: {
    maxSpawnsPerSecond: 50,
    maxBurstPerUpdate: 10,
  },
};

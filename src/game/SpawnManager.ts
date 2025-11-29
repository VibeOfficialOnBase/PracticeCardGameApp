/**
 * SpawnManager.ts
 * 
 * A deterministic spawn manager using dt-accumulation for consistent spawn pacing.
 * Supports three spawn policies: continuous, wave, and schedule.
 * Includes per-second rate limiting and burst smoothing.
 * 
 * Usage:
 *   const spawnManager = new SpawnManager({
 *     maxSpawnsPerSecond: 10,
 *     maxBurstPerUpdate: 3,
 *   });
 *   spawnManager.onSpawn((entityType, count) => {
 *     // Create entities here
 *   });
 *   spawnManager.setPolicy({
 *     type: 'continuous',
 *     ratePerSecond: 2, // 2 spawns per second
 *     entityType: 'enemy',
 *   });
 *   // In game loop:
 *   spawnManager.update(dt, levelTime);
 * 
 * Policies:
 *   - continuous: spawns at a fixed rate per second
 *   - wave: spawns a wave of entities at specified times
 *   - schedule: spawns at specific level times with specific counts
 * 
 * Tuning knobs:
 *   - maxSpawnsPerSecond: global rate cap
 *   - maxBurstPerUpdate: max spawns per single update call
 *   - policy.ratePerSecond: for continuous spawning
 *   - policy.waves: for wave-based spawning
 *   - policy.schedule: for scheduled spawning
 */

export type SpawnPolicyType = 'continuous' | 'wave' | 'schedule';

export interface ContinuousPolicy {
  type: 'continuous';
  /** Spawns per second */
  ratePerSecond: number;
  /** Type of entity to spawn */
  entityType: string;
}

export interface WaveConfig {
  /** Time in level (seconds) when wave should start */
  time: number;
  /** Number of entities in this wave */
  count: number;
  /** Type of entity to spawn */
  entityType: string;
}

export interface WavePolicy {
  type: 'wave';
  /** Array of wave configurations */
  waves: WaveConfig[];
}

export interface ScheduleEntry {
  /** Time in level (seconds) when spawn should occur */
  time: number;
  /** Number of entities to spawn */
  count: number;
  /** Type of entity to spawn */
  entityType: string;
}

export interface SchedulePolicy {
  type: 'schedule';
  /** Array of scheduled spawn entries */
  schedule: ScheduleEntry[];
}

export type SpawnPolicy = ContinuousPolicy | WavePolicy | SchedulePolicy | null;

export type SpawnCallback = (entityType: string, count: number) => void;

export interface SpawnManagerConfig {
  /** Maximum spawns allowed per second (rate limiting) */
  maxSpawnsPerSecond?: number;
  /** Maximum spawns per single update call (burst smoothing) */
  maxBurstPerUpdate?: number;
}

export class SpawnManager {
  private policy: SpawnPolicy = null;
  private maxSpawnsPerSecond: number;
  private maxBurstPerUpdate: number;
  
  // Continuous spawning state
  private accumulator: number = 0;
  
  // Wave/Schedule tracking
  private completedWaveIndices: Set<number> = new Set();
  private completedScheduleIndices: Set<number> = new Set();
  
  // Rate limiting
  private spawnsThisSecond: number = 0;
  private secondTimer: number = 0;
  
  // Callbacks
  private spawnCallbacks: SpawnCallback[] = [];

  constructor(config: SpawnManagerConfig = {}) {
    this.maxSpawnsPerSecond = config.maxSpawnsPerSecond ?? 100;
    this.maxBurstPerUpdate = config.maxBurstPerUpdate ?? 5;
  }

  /**
   * Set the current spawn policy.
   * Pass null to disable spawning.
   */
  public setPolicy(policy: SpawnPolicy): void {
    this.policy = policy;
    this.accumulator = 0;
    this.completedWaveIndices.clear();
    this.completedScheduleIndices.clear();
  }

  /**
   * Get the current spawn policy.
   */
  public getPolicy(): SpawnPolicy {
    return this.policy;
  }

  /**
   * Register a callback for spawn events.
   */
  public onSpawn(callback: SpawnCallback): void {
    this.spawnCallbacks.push(callback);
  }

  /**
   * Remove a spawn callback.
   */
  public offSpawn(callback: SpawnCallback): void {
    const index = this.spawnCallbacks.indexOf(callback);
    if (index !== -1) {
      this.spawnCallbacks.splice(index, 1);
    }
  }

  private notifySpawn(entityType: string, count: number): void {
    for (const callback of this.spawnCallbacks) {
      callback(entityType, count);
    }
  }

  /**
   * Attempt to spawn entities, respecting rate limits.
   * Returns the number actually spawned.
   */
  private doSpawn(entityType: string, requestedCount: number): number {
    const availableThisSecond = Math.max(0, this.maxSpawnsPerSecond - this.spawnsThisSecond);
    const actualCount = Math.min(requestedCount, this.maxBurstPerUpdate, availableThisSecond);
    
    if (actualCount > 0) {
      this.spawnsThisSecond += actualCount;
      this.notifySpawn(entityType, actualCount);
    }
    
    return actualCount;
  }

  /**
   * Update the spawn manager. Call every frame with delta time.
   * @param dt Delta time in seconds
   * @param levelTime Current level time in seconds (from LevelManager)
   */
  public update(dt: number, levelTime: number): void {
    // Reset per-second counter
    this.secondTimer += dt;
    if (this.secondTimer >= 1.0) {
      this.secondTimer = 0;
      this.spawnsThisSecond = 0;
    }

    if (!this.policy) return;

    switch (this.policy.type) {
      case 'continuous':
        this.updateContinuous(dt, this.policy);
        break;
      case 'wave':
        this.updateWave(levelTime, this.policy);
        break;
      case 'schedule':
        this.updateSchedule(levelTime, this.policy);
        break;
    }
  }

  private updateContinuous(dt: number, policy: ContinuousPolicy): void {
    const spawnInterval = 1.0 / policy.ratePerSecond;
    this.accumulator += dt;

    while (this.accumulator >= spawnInterval) {
      const spawned = this.doSpawn(policy.entityType, 1);
      if (spawned === 0) {
        // Rate limited, stop trying this frame
        break;
      }
      this.accumulator -= spawnInterval;
    }
  }

  private updateWave(levelTime: number, policy: WavePolicy): void {
    for (let i = 0; i < policy.waves.length; i++) {
      if (this.completedWaveIndices.has(i)) continue;

      const wave = policy.waves[i];
      if (levelTime >= wave.time) {
        this.doSpawn(wave.entityType, wave.count);
        this.completedWaveIndices.add(i);
      }
    }
  }

  private updateSchedule(levelTime: number, policy: SchedulePolicy): void {
    for (let i = 0; i < policy.schedule.length; i++) {
      if (this.completedScheduleIndices.has(i)) continue;

      const entry = policy.schedule[i];
      if (levelTime >= entry.time) {
        this.doSpawn(entry.entityType, entry.count);
        this.completedScheduleIndices.add(i);
      }
    }
  }

  /**
   * Reset the spawn manager state (for level restart).
   */
  public reset(): void {
    this.accumulator = 0;
    this.completedWaveIndices.clear();
    this.completedScheduleIndices.clear();
    this.spawnsThisSecond = 0;
    this.secondTimer = 0;
  }
}

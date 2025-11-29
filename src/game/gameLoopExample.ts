/**
 * gameLoopExample.ts
 * 
 * Example integration showing how to wire LevelManager, SpawnManager,
 * VIbagotchi, and ObjectPool together in a main game loop.
 * 
 * This example demonstrates:
 *   - Setting up the game systems
 *   - Using requestAnimationFrame for the game loop
 *   - Connecting spawn callbacks to entity factories via object pools
 *   - Pausing/resuming behavior
 *   - Level lifecycle management
 * 
 * Usage:
 *   import { createGameExample, runSimulation } from './gameLoopExample';
 *   
 *   // Browser environment with requestAnimationFrame:
 *   const game = createGameExample('normal');
 *   game.start();
 *   
 *   // Headless simulation for testing:
 *   runSimulation('easy', 60); // Simulate 60 seconds
 */

import { LevelManager, type LevelState } from './LevelManager';
import { SpawnManager, type SpawnPolicy } from './SpawnManager';
import { ObjectPool } from './ObjectPool';
import { VIbagotchi, type Mood } from './VIbagotchi';
import { LEVEL_CONFIGS, SPAWN_MANAGER_CONFIGS, VIBAGOTCHI_PRESETS } from './config/levelConfig';

// ============================================================================
// Entity Types (Example)
// ============================================================================

interface GameEntity {
  id: number;
  type: string;
  x: number;
  y: number;
  active: boolean;
  createdAt: number;
}

// ============================================================================
// Game State
// ============================================================================

interface GameState {
  levelManager: LevelManager;
  spawnManager: SpawnManager;
  pet: VIbagotchi;
  entityPool: ObjectPool<GameEntity>;
  activeEntities: GameEntity[];
  totalSpawns: number;
  lastFrameTime: number;
  entityIdCounter: number;
  isRunning: boolean;
  animationFrameId?: number;
}

// ============================================================================
// Entity Factory
// ============================================================================

let globalEntityId = 0;

function createEntity(): GameEntity {
  return {
    id: globalEntityId++,
    type: '',
    x: 0,
    y: 0,
    active: false,
    createdAt: 0,
  };
}

function resetEntity(entity: GameEntity): void {
  entity.type = '';
  entity.x = 0;
  entity.y = 0;
  entity.active = false;
  entity.createdAt = 0;
}

// ============================================================================
// Game Setup
// ============================================================================

/**
 * Create a game example with all systems wired together.
 * @param difficulty Level difficulty key from LEVEL_CONFIGS
 */
export function createGameExample(difficulty: keyof typeof LEVEL_CONFIGS = 'normal'): GameState {
  const config = LEVEL_CONFIGS[difficulty];

  // Create the level manager with configured delays
  const levelManager = new LevelManager({
    startDelay: config.startDelay,
    endDelay: config.endDelay,
  });

  // Create the spawn manager with standard configuration
  const spawnManager = new SpawnManager(SPAWN_MANAGER_CONFIGS.standard);

  // Create the VIbagotchi pet
  const petConfig = VIBAGOTCHI_PRESETS.normal;
  const pet = new VIbagotchi({
    name: 'GameVibe',
    decayRates: {
      hunger: petConfig.decayRates.hunger * (config.petDecayMultiplier ?? 1),
      happiness: petConfig.decayRates.happiness * (config.petDecayMultiplier ?? 1),
      energy: petConfig.decayRates.energy * (config.petDecayMultiplier ?? 1),
    },
    actionEffects: petConfig.actionEffects,
  });

  // Create the entity object pool
  const entityPool = new ObjectPool<GameEntity>({
    create: createEntity,
    reset: resetEntity,
    initialSize: 20,
    maxSize: 100,
  });

  // Initialize game state
  const state: GameState = {
    levelManager,
    spawnManager,
    pet,
    entityPool,
    activeEntities: [],
    totalSpawns: 0,
    lastFrameTime: 0,
    entityIdCounter: 0,
    isRunning: false,
  };

  // -------------------------------------------------------------------------
  // Wire up callbacks
  // -------------------------------------------------------------------------

  // Level state changes control spawning
  levelManager.onStateChange((levelState: LevelState) => {
    console.log(`[LevelManager] State changed to: ${levelState}`);

    switch (levelState) {
      case 'Running':
        // Set the spawn policy when level starts running
        spawnManager.setPolicy(config.spawnPolicy);
        console.log(`[SpawnManager] Policy set for ${config.name}`);
        break;

      case 'Paused':
        // Could optionally clear policy or just stop updating
        console.log('[SpawnManager] Spawning paused (no updates)');
        break;

      case 'Completed':
        // Clear spawn policy when level ends
        spawnManager.setPolicy(null);
        console.log('[SpawnManager] Policy cleared - level completed');
        break;
    }
  });

  // Spawn callbacks create entities via the object pool
  spawnManager.onSpawn((entityType: string, count: number) => {
    for (let i = 0; i < count; i++) {
      const entity = entityPool.get();
      if (entity) {
        entity.type = entityType;
        entity.active = true;
        entity.createdAt = levelManager.getLevelTime();
        // Random spawn position (example)
        entity.x = Math.random() * 800;
        entity.y = Math.random() * 600;
        state.activeEntities.push(entity);
        state.totalSpawns++;
      } else {
        console.warn('[ObjectPool] Pool exhausted, could not spawn entity');
      }
    }
    console.log(`[Spawn] Created ${count} ${entityType}(s) | Total active: ${state.activeEntities.length}`);
  });

  // Pet mood changes (for UI updates, sound effects, etc.)
  pet.onStateChange((mood: Mood, previousMood: Mood) => {
    console.log(`[VIbagotchi] Mood changed: ${previousMood} -> ${mood}`);
    if (mood === 'Critical') {
      console.warn('[VIbagotchi] Pet needs urgent attention!');
    }
  });

  return state;
}

// ============================================================================
// Game Loop
// ============================================================================

/**
 * Main update function called each frame.
 */
function gameUpdate(state: GameState, dt: number): void {
  const { levelManager, spawnManager, pet, entityPool, activeEntities } = state;

  // Always update level manager
  levelManager.update(dt);

  // Only update game systems when level is running
  if (levelManager.getState() === 'Running') {
    const levelTime = levelManager.getLevelTime();

    // Update spawn manager
    spawnManager.update(dt, levelTime);

    // Update pet
    pet.update(dt);

    // Example: Remove entities after 5 seconds (simulate destruction)
    for (let i = activeEntities.length - 1; i >= 0; i--) {
      const entity = activeEntities[i];
      if (entity.active && levelTime - entity.createdAt > 5) {
        entity.active = false;
        entityPool.release(entity);
        activeEntities.splice(i, 1);
      }
    }

    // Example: Auto-care for pet if critical
    if (pet.getMood() === 'Critical') {
      const urgent = pet.getMostUrgentNeed();
      switch (urgent) {
        case 'hunger':
          pet.feed();
          console.log('[VIbagotchi] Auto-fed pet!');
          break;
        case 'happiness':
          pet.play();
          console.log('[VIbagotchi] Auto-played with pet!');
          break;
        case 'energy':
          pet.sleep();
          console.log('[VIbagotchi] Auto-rested pet!');
          break;
      }
    }
  }
}

/**
 * Start the game loop using requestAnimationFrame.
 * Only works in browser environment.
 */
export function startGameLoop(state: GameState): void {
  if (state.isRunning) return;

  state.isRunning = true;
  state.lastFrameTime = performance.now();

  function loop(currentTime: number): void {
    if (!state.isRunning) return;

    const dt = (currentTime - state.lastFrameTime) / 1000; // Convert to seconds
    state.lastFrameTime = currentTime;

    gameUpdate(state, dt);

    state.animationFrameId = requestAnimationFrame(loop);
  }

  state.animationFrameId = requestAnimationFrame(loop);
  console.log('[GameLoop] Started');
}

/**
 * Stop the game loop.
 */
export function stopGameLoop(state: GameState): void {
  state.isRunning = false;
  if (state.animationFrameId !== undefined) {
    cancelAnimationFrame(state.animationFrameId);
    state.animationFrameId = undefined;
  }
  console.log('[GameLoop] Stopped');
}

// ============================================================================
// Simulation (Headless Testing)
// ============================================================================

/**
 * Run a headless simulation for testing purposes.
 * Simulates the game for a given duration with configurable timesteps.
 * 
 * @param difficulty Level difficulty
 * @param durationSeconds Total simulation duration
 * @param timestepMs Simulation timestep in milliseconds (default: 16ms ~60fps)
 * @param jitter Whether to add random jitter to timesteps (for testing dt variance)
 */
export function runSimulation(
  difficulty: keyof typeof LEVEL_CONFIGS = 'normal',
  durationSeconds: number = 60,
  timestepMs: number = 16,
  jitter: boolean = false
): {
  totalSpawns: number;
  finalEntityCount: number;
  petMood: Mood;
  levelState: LevelState;
  levelTime: number;
} {
  const state = createGameExample(difficulty);
  const { levelManager, pet } = state;

  // Start the level
  levelManager.start();

  let elapsed = 0;
  const targetMs = durationSeconds * 1000;

  while (elapsed < targetMs) {
    // Calculate dt with optional jitter
    let dt = timestepMs;
    if (jitter) {
      // Add random jitter: +/- 50% of timestep
      dt = timestepMs * (0.5 + Math.random());
    }

    gameUpdate(state, dt / 1000);
    elapsed += dt;

    // Check for timed level completion
    const config = LEVEL_CONFIGS[difficulty];
    if (config.duration && levelManager.getLevelTime() >= config.duration) {
      levelManager.end();
    }
  }

  return {
    totalSpawns: state.totalSpawns,
    finalEntityCount: state.activeEntities.length,
    petMood: pet.getMood(),
    levelState: levelManager.getState(),
    levelTime: levelManager.getLevelTime(),
  };
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Convenience function to pause the game.
 */
export function pauseGame(state: GameState): void {
  state.levelManager.pause();
}

/**
 * Convenience function to resume the game.
 */
export function resumeGame(state: GameState): void {
  state.levelManager.resume();
}

/**
 * Get current game stats.
 */
export function getGameStats(state: GameState): {
  levelState: LevelState;
  levelTime: number;
  activeEntities: number;
  totalSpawns: number;
  poolAvailable: number;
  petMood: Mood;
  petNeeds: { hunger: number; happiness: number; energy: number };
} {
  return {
    levelState: state.levelManager.getState(),
    levelTime: state.levelManager.getLevelTime(),
    activeEntities: state.activeEntities.length,
    totalSpawns: state.totalSpawns,
    poolAvailable: state.entityPool.getAvailableCount(),
    petMood: state.pet.getMood(),
    petNeeds: state.pet.getNeeds(),
  };
}

// ============================================================================
// Example Usage (Browser)
// ============================================================================

/**
 * Example of how to use this in a browser environment:
 * 
 * ```typescript
 * import { createGameExample, startGameLoop, stopGameLoop, pauseGame, resumeGame, getGameStats } from './gameLoopExample';
 * 
 * // Create and start the game
 * const game = createGameExample('normal');
 * game.levelManager.start();
 * startGameLoop(game);
 * 
 * // Pause/resume
 * document.getElementById('pauseBtn')?.addEventListener('click', () => pauseGame(game));
 * document.getElementById('resumeBtn')?.addEventListener('click', () => resumeGame(game));
 * 
 * // Pet interactions
 * document.getElementById('feedBtn')?.addEventListener('click', () => game.pet.feed());
 * document.getElementById('playBtn')?.addEventListener('click', () => game.pet.play());
 * document.getElementById('sleepBtn')?.addEventListener('click', () => game.pet.sleep());
 * 
 * // Display stats (call in render loop or interval)
 * setInterval(() => {
 *   const stats = getGameStats(game);
 *   console.log(stats);
 * }, 1000);
 * 
 * // End the game
 * document.getElementById('endBtn')?.addEventListener('click', () => {
 *   game.levelManager.end();
 *   setTimeout(() => stopGameLoop(game), 2000);
 * });
 * ```
 */

// Export for testing
export { type GameState, type GameEntity };

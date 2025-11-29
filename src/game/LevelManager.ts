/**
 * LevelManager.ts
 * 
 * An authoritative state machine for managing level lifecycle.
 * States: Idle, Starting, Running, Paused, Ending, Completed
 * 
 * Usage:
 *   const level = new LevelManager();
 *   level.onStateChange((state) => console.log('State:', state));
 *   level.start(); // Idle -> Starting -> Running
 *   // In game loop:
 *   level.update(dt);
 *   if (level.getState() === 'Running') {
 *     // spawn enemies, update game logic
 *   }
 *   level.pause(); // Running -> Paused
 *   level.resume(); // Paused -> Running
 *   level.end(); // -> Ending -> Completed
 * 
 * Tuning knobs:
 *   - startDelay: seconds to wait in Starting before Running (default 0)
 *   - endDelay: seconds to wait in Ending before Completed (default 0)
 */

export type LevelState = 'Idle' | 'Starting' | 'Running' | 'Paused' | 'Ending' | 'Completed';

export interface LevelManagerConfig {
  /** Delay in seconds before transitioning from Starting to Running */
  startDelay?: number;
  /** Delay in seconds before transitioning from Ending to Completed */
  endDelay?: number;
}

export type StateChangeListener = (state: LevelState) => void;

export class LevelManager {
  private state: LevelState = 'Idle';
  private levelTime: number = 0;
  private stateTimer: number = 0;
  private startDelay: number;
  private endDelay: number;
  private listeners: StateChangeListener[] = [];

  constructor(config: LevelManagerConfig = {}) {
    this.startDelay = config.startDelay ?? 0;
    this.endDelay = config.endDelay ?? 0;
  }

  /**
   * Get the current level state.
   */
  public getState(): LevelState {
    return this.state;
  }

  /**
   * Get the total time elapsed in Running state (in seconds).
   */
  public getLevelTime(): number {
    return this.levelTime;
  }

  /**
   * Register a callback for state changes.
   */
  public onStateChange(listener: StateChangeListener): void {
    this.listeners.push(listener);
  }

  /**
   * Remove a state change listener.
   */
  public offStateChange(listener: StateChangeListener): void {
    const index = this.listeners.indexOf(listener);
    if (index !== -1) {
      this.listeners.splice(index, 1);
    }
  }

  private notifyListeners(): void {
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }

  private setState(newState: LevelState): void {
    if (this.state !== newState) {
      this.state = newState;
      this.stateTimer = 0;
      this.notifyListeners();
    }
  }

  /**
   * Begin the level: Idle -> Starting (after startDelay) -> Running
   */
  public start(): void {
    if (this.state !== 'Idle') return;
    this.levelTime = 0;
    this.setState('Starting');
  }

  /**
   * Pause the level (only from Running state).
   */
  public pause(): void {
    if (this.state === 'Running') {
      this.setState('Paused');
    }
  }

  /**
   * Resume the level (only from Paused state).
   */
  public resume(): void {
    if (this.state === 'Paused') {
      this.setState('Running');
    }
  }

  /**
   * End the level: -> Ending (after endDelay) -> Completed
   * Can be called from Running or Paused states.
   */
  public end(): void {
    if (this.state === 'Running' || this.state === 'Paused') {
      this.setState('Ending');
    }
  }

  /**
   * Reset the level back to Idle state.
   */
  public reset(): void {
    this.levelTime = 0;
    this.stateTimer = 0;
    this.setState('Idle');
  }

  /**
   * Update the level manager. Call every frame with delta time in seconds.
   * @param dt Delta time in seconds
   */
  public update(dt: number): void {
    this.stateTimer += dt;

    switch (this.state) {
      case 'Starting':
        if (this.stateTimer >= this.startDelay) {
          this.setState('Running');
        }
        break;

      case 'Running':
        this.levelTime += dt;
        break;

      case 'Ending':
        if (this.stateTimer >= this.endDelay) {
          this.setState('Completed');
        }
        break;

      // Idle, Paused, Completed: no time progression
      default:
        break;
    }
  }
}

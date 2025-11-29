/**
 * ObjectPool.ts
 * 
 * A generic object pool for reusing frequently spawned entities.
 * Reduces garbage collection overhead by recycling objects.
 * 
 * Usage:
 *   interface Enemy {
 *     id: number;
 *     x: number;
 *     y: number;
 *     active: boolean;
 *   }
 *   
 *   const enemyPool = new ObjectPool<Enemy>({
 *     create: () => ({ id: 0, x: 0, y: 0, active: false }),
 *     reset: (enemy) => { enemy.x = 0; enemy.y = 0; enemy.active = false; },
 *     initialSize: 20,
 *     maxSize: 100,
 *   });
 *   
 *   const enemy = enemyPool.get();
 *   enemy.x = 100;
 *   enemy.active = true;
 *   
 *   // When enemy is destroyed:
 *   enemyPool.release(enemy);
 * 
 * Tuning knobs:
 *   - initialSize: pre-allocate this many objects on creation
 *   - maxSize: cap on total pool size to prevent memory bloat
 *   - create: factory function to create new objects
 *   - reset: optional function to reset object state when released
 */

export interface ObjectPoolConfig<T> {
  /** Factory function to create a new object */
  create: () => T;
  /** Optional function to reset object state when released back to pool */
  reset?: (obj: T) => void;
  /** Number of objects to pre-allocate (default: 10) */
  initialSize?: number;
  /** Maximum pool size, prevents unbounded growth (default: 100) */
  maxSize?: number;
}

export class ObjectPool<T> {
  private pool: T[] = [];
  private createFn: () => T;
  private resetFn: ((obj: T) => void) | undefined;
  private maxSize: number;
  private totalCreated: number = 0;

  constructor(config: ObjectPoolConfig<T>) {
    this.createFn = config.create;
    this.resetFn = config.reset;
    this.maxSize = config.maxSize ?? 100;

    const initialSize = config.initialSize ?? 10;
    for (let i = 0; i < initialSize; i++) {
      this.pool.push(this.createFn());
      this.totalCreated++;
    }
  }

  /**
   * Get an object from the pool (or create one if pool is empty).
   * Returns undefined if max size is reached and pool is empty.
   */
  public get(): T | undefined {
    if (this.pool.length > 0) {
      return this.pool.pop();
    }

    // Pool is empty, create a new object if under max size
    if (this.totalCreated < this.maxSize) {
      this.totalCreated++;
      return this.createFn();
    }

    // At max capacity, cannot provide object
    return undefined;
  }

  /**
   * Release an object back to the pool for reuse.
   */
  public release(obj: T): void {
    if (this.resetFn) {
      this.resetFn(obj);
    }
    // Only add back if we're under max size
    if (this.pool.length < this.maxSize) {
      this.pool.push(obj);
    }
  }

  /**
   * Get the number of available objects in the pool.
   */
  public getAvailableCount(): number {
    return this.pool.length;
  }

  /**
   * Get the total number of objects created by this pool.
   */
  public getTotalCreated(): number {
    return this.totalCreated;
  }

  /**
   * Clear all objects from the pool.
   */
  public clear(): void {
    this.pool.length = 0;
  }

  /**
   * Pre-warm the pool by creating objects up to a certain count.
   */
  public prewarm(count: number): void {
    const toCreate = Math.min(count, this.maxSize) - this.pool.length;
    for (let i = 0; i < toCreate && this.totalCreated < this.maxSize; i++) {
      this.pool.push(this.createFn());
      this.totalCreated++;
    }
  }
}

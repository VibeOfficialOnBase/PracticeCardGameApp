/**
 * VIbagotchi.ts
 * 
 * A virtual pet implementation with needs (hunger, happiness, energy),
 * continuous decay rates, actions, and hysteresis thresholds.
 * 
 * Usage:
 *   const pet = new VIbagotchi({ name: 'Vibe' });
 *   pet.onStateChange((state) => console.log('Mood:', state));
 *   
 *   // In game loop:
 *   pet.update(dt);
 *   
 *   // Player interactions:
 *   pet.feed();     // Increases hunger satisfaction
 *   pet.play();     // Increases happiness
 *   pet.sleep();    // Increases energy
 *   
 *   // Check current needs:
 *   console.log(pet.getNeeds()); // { hunger, happiness, energy }
 *   console.log(pet.getMood());  // 'Happy' | 'Okay' | 'Sad' | 'Critical'
 * 
 * Hysteresis:
 *   State changes use thresholds with hysteresis to prevent flickering.
 *   e.g., pet becomes 'Sad' when average need drops below 30, 
 *   but must rise above 40 to become 'Okay' again.
 * 
 * Tuning knobs:
 *   - decayRates: per-second decay for each need
 *   - actionEffects: how much each action increases a need
 *   - moodThresholds: thresholds for mood transitions
 */

export interface Needs {
  hunger: number;    // 0-100, 100 = full
  happiness: number; // 0-100, 100 = very happy
  energy: number;    // 0-100, 100 = fully rested
}

export type Mood = 'Happy' | 'Okay' | 'Sad' | 'Critical';

export interface VIbagotchiConfig {
  /** Name of the pet */
  name?: string;
  /** Decay rate per second for each need (default: { hunger: 1, happiness: 0.8, energy: 0.5 }) */
  decayRates?: Partial<Needs>;
  /** Effect of each action on needs */
  actionEffects?: {
    feed?: number;
    play?: number;
    sleep?: number;
  };
  /** Mood thresholds with hysteresis */
  moodThresholds?: {
    criticalLow: number;   // Below this = Critical
    criticalHigh: number;  // Above this = can leave Critical
    sadLow: number;        // Below this = Sad
    sadHigh: number;       // Above this = can leave Sad
    okayLow: number;       // Below this = Okay
    okayHigh: number;      // Above this = Happy
  };
}

export type MoodChangeListener = (mood: Mood, previousMood: Mood) => void;

export class VIbagotchi {
  private name: string;
  private needs: Needs;
  private mood: Mood = 'Happy';
  private decayRates: Needs;
  private actionEffects: { feed: number; play: number; sleep: number };
  private moodThresholds: {
    criticalLow: number;
    criticalHigh: number;
    sadLow: number;
    sadHigh: number;
    okayLow: number;
    okayHigh: number;
  };
  private listeners: MoodChangeListener[] = [];

  constructor(config: VIbagotchiConfig = {}) {
    this.name = config.name ?? 'VIbagotchi';
    
    // Initialize needs to full
    this.needs = {
      hunger: 100,
      happiness: 100,
      energy: 100,
    };

    // Default decay rates (per second)
    this.decayRates = {
      hunger: config.decayRates?.hunger ?? 1.0,
      happiness: config.decayRates?.happiness ?? 0.8,
      energy: config.decayRates?.energy ?? 0.5,
    };

    // Default action effects
    this.actionEffects = {
      feed: config.actionEffects?.feed ?? 30,
      play: config.actionEffects?.play ?? 25,
      sleep: config.actionEffects?.sleep ?? 40,
    };

    // Default mood thresholds with hysteresis
    this.moodThresholds = config.moodThresholds ?? {
      criticalLow: 15,
      criticalHigh: 25,
      sadLow: 30,
      sadHigh: 40,
      okayLow: 60,
      okayHigh: 70,
    };
  }

  /**
   * Get the pet's name.
   */
  public getName(): string {
    return this.name;
  }

  /**
   * Get current needs values.
   */
  public getNeeds(): Readonly<Needs> {
    return { ...this.needs };
  }

  /**
   * Get current mood state.
   */
  public getMood(): Mood {
    return this.mood;
  }

  /**
   * Register a callback for mood changes.
   */
  public onStateChange(listener: MoodChangeListener): void {
    this.listeners.push(listener);
  }

  /**
   * Remove a mood change listener.
   */
  public offStateChange(listener: MoodChangeListener): void {
    const index = this.listeners.indexOf(listener);
    if (index !== -1) {
      this.listeners.splice(index, 1);
    }
  }

  private notifyMoodChange(previousMood: Mood): void {
    for (const listener of this.listeners) {
      listener(this.mood, previousMood);
    }
  }

  /**
   * Calculate average need value.
   */
  private getAverageNeed(): number {
    return (this.needs.hunger + this.needs.happiness + this.needs.energy) / 3;
  }

  /**
   * Update mood based on current needs with hysteresis.
   */
  private updateMood(): void {
    const avg = this.getAverageNeed();
    const previousMood = this.mood;
    const t = this.moodThresholds;

    switch (this.mood) {
      case 'Critical':
        if (avg >= t.criticalHigh) {
          this.mood = avg >= t.sadHigh ? (avg >= t.okayHigh ? 'Happy' : 'Okay') : 'Sad';
        }
        break;

      case 'Sad':
        if (avg < t.criticalLow) {
          this.mood = 'Critical';
        } else if (avg >= t.sadHigh) {
          this.mood = avg >= t.okayHigh ? 'Happy' : 'Okay';
        }
        break;

      case 'Okay':
        if (avg < t.criticalLow) {
          this.mood = 'Critical';
        } else if (avg < t.sadLow) {
          this.mood = 'Sad';
        } else if (avg >= t.okayHigh) {
          this.mood = 'Happy';
        }
        break;

      case 'Happy':
        if (avg < t.criticalLow) {
          this.mood = 'Critical';
        } else if (avg < t.sadLow) {
          this.mood = 'Sad';
        } else if (avg < t.okayLow) {
          this.mood = 'Okay';
        }
        break;
    }

    if (this.mood !== previousMood) {
      this.notifyMoodChange(previousMood);
    }
  }

  /**
   * Clamp a value between 0 and 100.
   */
  private clamp(value: number): number {
    return Math.max(0, Math.min(100, value));
  }

  /**
   * Update the pet. Call every frame with delta time in seconds.
   * @param dt Delta time in seconds
   */
  public update(dt: number): void {
    // Apply decay to all needs
    this.needs.hunger = this.clamp(this.needs.hunger - this.decayRates.hunger * dt);
    this.needs.happiness = this.clamp(this.needs.happiness - this.decayRates.happiness * dt);
    this.needs.energy = this.clamp(this.needs.energy - this.decayRates.energy * dt);

    // Update mood based on new needs
    this.updateMood();
  }

  /**
   * Feed the pet (increases hunger satisfaction).
   */
  public feed(): void {
    this.needs.hunger = this.clamp(this.needs.hunger + this.actionEffects.feed);
    this.updateMood();
  }

  /**
   * Play with the pet (increases happiness).
   */
  public play(): void {
    this.needs.happiness = this.clamp(this.needs.happiness + this.actionEffects.play);
    // Playing uses a bit of energy
    this.needs.energy = this.clamp(this.needs.energy - 5);
    this.updateMood();
  }

  /**
   * Let the pet sleep (increases energy).
   */
  public sleep(): void {
    this.needs.energy = this.clamp(this.needs.energy + this.actionEffects.sleep);
    // Sleeping makes pet a bit hungry
    this.needs.hunger = this.clamp(this.needs.hunger - 5);
    this.updateMood();
  }

  /**
   * Get the most urgent need (lowest value).
   */
  public getMostUrgentNeed(): keyof Needs {
    const { hunger, happiness, energy } = this.needs;
    if (hunger <= happiness && hunger <= energy) return 'hunger';
    if (happiness <= energy) return 'happiness';
    return 'energy';
  }

  /**
   * Reset pet to full needs and Happy mood.
   */
  public reset(): void {
    this.needs = { hunger: 100, happiness: 100, energy: 100 };
    const previousMood = this.mood;
    this.mood = 'Happy';
    if (previousMood !== 'Happy') {
      this.notifyMoodChange(previousMood);
    }
  }
}

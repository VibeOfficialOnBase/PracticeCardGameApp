export type SoundEffect = 
  | 'card_flip'
  | 'card_pull'
  | 'achievement_unlock'
  | 'level_up'
  | 'button_click'
  | 'share'
  | 'favorite'
  | 'challenge_complete'
  | 'power_up_activate'
  | 'rare_card'
  | 'epic_card'
  | 'legendary_card'
  | 'mythic_card';

const SOUND_ENABLED_KEY = 'practice_sound_enabled';
const SOUND_VOLUME_KEY = 'practice_sound_volume';

// Sound effect URLs (using Web Audio API with oscillators for generated sounds)
class SoundPlayer {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;
  private volume: number = 0.5;

  constructor() {
    if (typeof window !== 'undefined') {
      this.enabled = localStorage.getItem(SOUND_ENABLED_KEY) !== 'false';
      const savedVolume = localStorage.getItem(SOUND_VOLUME_KEY);
      this.volume = savedVolume ? parseFloat(savedVolume) : 0.5;
    }
  }

  private getAudioContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.audioContext;
  }

  private playTone(frequency: number, duration: number, type: OscillatorType = 'sine'): void {
    if (!this.enabled || typeof window === 'undefined') return;

    try {
      const ctx = this.getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = type;

      gainNode.gain.setValueAtTime(this.volume * 0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }

  private playChord(frequencies: number[], duration: number, type: OscillatorType = 'sine'): void {
    frequencies.forEach((freq: number) => {
      setTimeout(() => this.playTone(freq, duration, type), 0);
    });
  }

  play(effect: SoundEffect): void {
    if (!this.enabled) return;

    switch (effect) {
      case 'card_flip':
        this.playTone(400, 0.1, 'sine');
        setTimeout(() => this.playTone(500, 0.1, 'sine'), 50);
        break;

      case 'card_pull':
        this.playChord([523, 659, 784], 0.3, 'sine');
        break;

      case 'achievement_unlock':
        this.playTone(523, 0.15, 'square');
        setTimeout(() => this.playTone(659, 0.15, 'square'), 100);
        setTimeout(() => this.playTone(784, 0.3, 'square'), 200);
        break;

      case 'level_up':
        this.playTone(392, 0.1, 'sine');
        setTimeout(() => this.playTone(523, 0.1, 'sine'), 80);
        setTimeout(() => this.playTone(659, 0.1, 'sine'), 160);
        setTimeout(() => this.playTone(784, 0.3, 'sine'), 240);
        break;

      case 'button_click':
        this.playTone(800, 0.05, 'sine');
        break;

      case 'share':
        this.playTone(600, 0.15, 'sine');
        setTimeout(() => this.playTone(700, 0.15, 'sine'), 80);
        break;

      case 'favorite':
        this.playChord([523, 659], 0.2, 'sine');
        break;

      case 'challenge_complete':
        this.playTone(440, 0.1, 'square');
        setTimeout(() => this.playTone(554, 0.1, 'square'), 100);
        setTimeout(() => this.playTone(659, 0.1, 'square'), 200);
        setTimeout(() => this.playTone(880, 0.4, 'square'), 300);
        break;

      case 'power_up_activate':
        this.playTone(300, 0.1, 'sawtooth');
        setTimeout(() => this.playTone(400, 0.1, 'sawtooth'), 50);
        setTimeout(() => this.playTone(500, 0.1, 'sawtooth'), 100);
        setTimeout(() => this.playTone(700, 0.3, 'sawtooth'), 150);
        break;

      case 'rare_card':
        this.playChord([523, 659, 784, 880], 0.5, 'sine');
        break;

      case 'epic_card':
        this.playChord([440, 554, 659, 880], 0.6, 'triangle');
        setTimeout(() => this.playChord([440, 554, 659, 880], 0.3, 'triangle'), 300);
        break;

      case 'legendary_card':
        this.playTone(392, 0.15, 'sine');
        setTimeout(() => this.playTone(523, 0.15, 'sine'), 100);
        setTimeout(() => this.playTone(659, 0.15, 'sine'), 200);
        setTimeout(() => this.playTone(784, 0.15, 'sine'), 300);
        setTimeout(() => this.playChord([392, 523, 659, 784, 1047], 0.8, 'sine'), 400);
        break;

      case 'mythic_card':
        // Epic ascending scale
        [262, 330, 392, 523, 659, 784, 1047].forEach((freq: number, i: number) => {
          setTimeout(() => this.playTone(freq, 0.15, 'sine'), i * 80);
        });
        setTimeout(() => this.playChord([262, 330, 392, 523, 659, 784, 1047], 1.5, 'triangle'), 600);
        break;

      default:
        this.playTone(440, 0.1, 'sine');
    }
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem(SOUND_ENABLED_KEY, String(enabled));
    }
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
    if (typeof window !== 'undefined') {
      localStorage.setItem(SOUND_VOLUME_KEY, String(this.volume));
    }
  }

  getVolume(): number {
    return this.volume;
  }
}

// Singleton instance
let soundPlayerInstance: SoundPlayer | null = null;

export function getSoundPlayer(): SoundPlayer {
  if (!soundPlayerInstance) {
    soundPlayerInstance = new SoundPlayer();
  }
  return soundPlayerInstance;
}

// Convenience function
export function playSound(effect: SoundEffect): void {
  getSoundPlayer().play(effect);
}

export function toggleSound(): boolean {
  const player = getSoundPlayer();
  const newState = !player.isEnabled();
  player.setEnabled(newState);
  return newState;
}

export function isSoundEnabled(): boolean {
  return getSoundPlayer().isEnabled();
}

export function setSoundVolume(volume: number): void {
  getSoundPlayer().setVolume(volume);
}

export function getSoundVolume(): number {
  return getSoundPlayer().getVolume();
}

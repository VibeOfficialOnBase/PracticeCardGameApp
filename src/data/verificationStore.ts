// Shared verification code store
// In production, replace with Redis or database

interface VerificationData {
  code: string;
  timestamp: number;
  username: string;
}

class VerificationStore {
  private store = new Map<string, VerificationData>();

  set(email: string, data: VerificationData): void {
    this.store.set(email, data);
  }

  get(email: string): VerificationData | undefined {
    return this.store.get(email);
  }

  delete(email: string): boolean {
    return this.store.delete(email);
  }

  cleanup(): void {
    const now = Date.now();
    const TEN_MINUTES = 10 * 60 * 1000;
    
    for (const [email, data] of this.store.entries()) {
      if (now - data.timestamp > TEN_MINUTES) {
        this.store.delete(email);
      }
    }
  }

  // For debugging
  size(): number {
    return this.store.size;
  }
}

// Export a singleton instance
export const verificationStore = new VerificationStore();

/**
 * Production Rate Limiter & Security Input Guards for PrepHub Auth
 * Mitigates brute-force credential stuffing and abusive rapid requests.
 */

interface RateLimitRecord {
  attempts: number;
  lastAttemptTime: number;
  lockedUntil: number;
}

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 30 * 1000; // 30 seconds cooldown
const ATTEMPT_WINDOW_MS = 5 * 60 * 1000; // 5 minutes window

const memoryStore = new Map<string, RateLimitRecord>();

export const rateLimiter = {
  /**
   * Check if an identifier (email / IP / action key) is currently locked out
   */
  isLockedOut(key: string): { locked: boolean; remainingSeconds: number } {
    const record = memoryStore.get(key);
    if (!record) return { locked: false, remainingSeconds: 0 };

    const now = Date.now();
    if (record.lockedUntil > now) {
      const remainingSeconds = Math.ceil((record.lockedUntil - now) / 1000);
      return { locked: true, remainingSeconds };
    }

    // Lockout expired, clean up if older than window
    if (now - record.lastAttemptTime > ATTEMPT_WINDOW_MS) {
      memoryStore.delete(key);
    }

    return { locked: false, remainingSeconds: 0 };
  },

  /**
   * Record a failed authentication attempt
   */
  recordFailedAttempt(key: string): { locked: boolean; remainingSeconds: number } {
    const now = Date.now();
    const record = memoryStore.get(key) || {
      attempts: 0,
      lastAttemptTime: now,
      lockedUntil: 0,
    };

    // Reset attempts if outside the window
    if (now - record.lastAttemptTime > ATTEMPT_WINDOW_MS) {
      record.attempts = 1;
    } else {
      record.attempts += 1;
    }

    record.lastAttemptTime = now;

    if (record.attempts >= MAX_FAILED_ATTEMPTS) {
      record.lockedUntil = now + LOCKOUT_DURATION_MS;
      memoryStore.set(key, record);
      return { locked: true, remainingSeconds: Math.ceil(LOCKOUT_DURATION_MS / 1000) };
    }

    memoryStore.set(key, record);
    return { locked: false, remainingSeconds: 0 };
  },

  /**
   * Reset tracking upon successful login
   */
  resetAttempts(key: string): void {
    memoryStore.delete(key);
  },
};

/**
 * Sanitize plain string input to remove dangerous HTML / control characters
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .trim()
    .replace(/[<>]/g, '') // Strip basic HTML tags
    .slice(0, 255); // Prevent buffer overflow / large payload attacks
}

/**
 * Validate password complexity:
 * Min 8 characters, must contain at least 1 letter and 1 number
 */
export function validatePasswordStrength(password: string): {
  isValid: boolean;
  error?: string;
} {
  if (!password || password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters long.' };
  }
  if (!/[a-zA-Z]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one letter.' };
  }
  if (!/[0-9]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one number.' };
  }
  return { isValid: true };
}

/**
 * Rate limiting hook to prevent excessive API calls
 * Implements simple throttling and debouncing mechanisms
 */

const requestCounts = new Map<string, { count: number; resetTime: number }>();

export const useRateLimit = (key: string, maxRequests: number = 5, windowMs: number = 60000) => {
  const now = Date.now();
  const entry = requestCounts.get(key);

  if (!entry || now > entry.resetTime) {
    // Reset window
    requestCounts.set(key, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  if (entry.count >= maxRequests) {
    const waitSeconds = Math.ceil((entry.resetTime - now) / 1000);
    return { allowed: false, remaining: 0, waitSeconds };
  }

  entry.count++;
  return { allowed: true, remaining: maxRequests - entry.count };
};

/**
 * Debounce function to limit function execution frequency
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle function to limit function execution to once per interval
 */
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;

  return function (...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

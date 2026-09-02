/**
 * Rate limiting utilities
 * Prevents excessive API calls
 */

const requestCounts = new Map<
  string,
  {
    count: number;
    resetTime: number;
  }
>();

export const rateLimit = (
  key: string,
  maxRequests: number = 5,
  windowMs: number = 60000
) => {
  const now = Date.now();
  const entry = requestCounts.get(key);

  // No existing window or window expired
  if (!entry || now > entry.resetTime) {
    requestCounts.set(key, {
      count: 1,
      resetTime: now + windowMs,
    });

    return {
      allowed: true,
      remaining: maxRequests - 1,
      waitSeconds: 0,
    };
  }

  // Limit reached
  if (entry.count >= maxRequests) {
    const waitSeconds = Math.ceil(
      (entry.resetTime - now) / 1000
    );

    return {
      allowed: false,
      remaining: 0,
      waitSeconds,
    };
  }

  // Increment request count
  entry.count++;

  return {
    allowed: true,
    remaining: maxRequests - entry.count,
    waitSeconds: 0,
  };
};

/**
 * Debounce function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
};

/**
 * Throttle function
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle = false;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};
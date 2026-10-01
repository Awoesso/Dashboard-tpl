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
export const debounce = <Args extends unknown[], Return>(
  func: (...args: Args) => Return,
  wait: number
): ((...args: Args) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Args) => {
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
export const throttle = <Args extends unknown[], Return>(
  func: (...args: Args) => Return,
  limit: number
): ((...args: Args) => void) => {
  let inThrottle = false;

  return (...args: Args) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};
/**
 * CSRF Protection utilities
 * Implements SameSite cookie policies and origin validation
 */

/**
 * Validate request origin to prevent CSRF attacks
 */
export const isValidOrigin = (origin: string | null, allowedOrigins?: string[]): boolean => {
  if (!origin) return false;

  const defaults = [
    typeof window !== 'undefined' ? window.location.origin : '',
    'http://localhost:5173',
    'http://localhost:3000',
  ].filter(Boolean);

  const allowed = allowedOrigins || defaults;
  return allowed.includes(origin);
};


export const generateCSRFToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Store CSRF token in session storage
 */
export const storeCSRFToken = (): string => {
  let token = sessionStorage.getItem('csrf-token');
  if (!token) {
    token = generateCSRFToken();
    sessionStorage.setItem('csrf-token', token);
  }
  return token;
};

/**
 * Get stored CSRF token
 */
export const getCSRFToken = (): string | null => {
  return sessionStorage.getItem('csrf-token');
};

/**
 * Validate CSRF token
 */
export const validateCSRFToken = (token: string): boolean => {
  const storedToken = getCSRFToken();
  return storedToken === token && token.length > 0;
};

/**
 * Configure secure cookie attributes
 * These headers should be set by the server
 */
export const getSecureCookieConfig = () => ({
  sameSite: 'Strict' as const,
  secure: true,
  httpOnly: true, // Server-side only
  maxAge: 3600000, // 1 hour
});

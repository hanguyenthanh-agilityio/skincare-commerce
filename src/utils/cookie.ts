export const COOKIE_NAME = 'cookie_consent';
export type CookieConsent = 'accepted' | 'rejected' | null;

// Client-side read
export function getClientConsent(): CookieConsent {
  if (typeof document === 'undefined') return null;

  const match = document.cookie.match(new RegExp(`(^| )${COOKIE_NAME}=([^;]+)`));

  return match ? (match[2] as CookieConsent) : null;
}

// Client-side write
export function setClientConsent(value: 'accepted' | 'rejected') {
  if (typeof document === 'undefined') return;

  const isProd = location.protocol === 'https:';

  document.cookie =
    `cookie_consent=${value}; ` +
    `Path=/; ` +
    `Max-Age=31536000; ` +
    `SameSite=Lax; ` +
    (isProd ? 'Secure;' : '');
}

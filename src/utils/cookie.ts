export type CookieConsent = 'accepted' | 'rejected' | null;

const COOKIE_NAME = 'cookie_consent';

export function getClientConsent(): CookieConsent {
  if (typeof document === 'undefined') return null;

  const match = document.cookie.split('; ').find((row) => row.startsWith(`${COOKIE_NAME}=`));

  return match ? (match.split('=')[1] as CookieConsent) : null;
}

export function setClientConsent(value: Exclude<CookieConsent, null>) {
  document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
}

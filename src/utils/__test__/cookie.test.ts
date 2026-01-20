import { describe, it, expect, beforeEach } from 'vitest';

// Utils
import { getClientConsent, setClientConsent } from '../cookie';

describe('cookie consent utils', () => {
  beforeEach(() => {
    document.cookie = 'cookie_consent=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  });

  describe('getClientConsent', () => {
    it('should return null when cookie does not exist', () => {
      expect(getClientConsent()).toBeNull();
    });

    it('should return "accepted" when cookie_consent=accepted', () => {
      document.cookie = 'cookie_consent=accepted; path=/';

      expect(getClientConsent()).toBe('accepted');
    });

    it('should return "rejected" when cookie_consent=rejected', () => {
      document.cookie = 'cookie_consent=rejected; path=/';

      expect(getClientConsent()).toBe('rejected');
    });

    it('should return null when cookie name exists but value is empty', () => {
      document.cookie = 'cookie_consent=; path=/';

      expect(getClientConsent()).toBeNull();
    });

    it('should ignore other cookies', () => {
      document.cookie = 'other_cookie=test; path=/';
      document.cookie = 'cookie_consent=accepted; path=/';

      expect(getClientConsent()).toBe('accepted');
    });
  });

  describe('setClientConsent', () => {
    it('should set cookie_consent=accepted', () => {
      setClientConsent('accepted');

      expect(document.cookie).toContain('cookie_consent=accepted');
    });

    it('should set cookie_consent=rejected', () => {
      setClientConsent('rejected');

      expect(document.cookie).toContain('cookie_consent=rejected');
    });

    it('should persist cookie with correct attributes', () => {
      setClientConsent('accepted');

      expect(document.cookie).toContain('cookie_consent=accepted');
    });

    it('should return null when document is undefined (SSR)', () => {
      const originalDocument = global.document;

      delete (globalThis as unknown as Record<string, unknown>).document;

      expect(getClientConsent()).toBeNull();

      (globalThis as typeof globalThis & { document?: typeof document }).document =
        originalDocument;
    });
  });
});

/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { googleAnalytics } from '@/services/googleAnalytics';

describe('googleAnalytics', () => {
  const GA_ID = 'GA-TEST-ID';

  beforeEach(() => {
    vi.restoreAllMocks();

    // reset DOM
    document.head.innerHTML = '';

    // reset global
    (window as any).dataLayer = undefined;
    (window as any).gtag = undefined;
  });

  it('should do nothing when GA_ID is empty', () => {
    googleAnalytics('');

    expect(document.head.querySelector('script')).toBeNull();
    expect(window.gtag).toBeUndefined();
  });

  it('should do nothing when gtag already exists', () => {
    window.gtag = vi.fn();

    googleAnalytics(GA_ID);

    expect(document.head.querySelector('script')).toBeNull();
  });

  it('should inject GA script when gtag does not exist', () => {
    googleAnalytics(GA_ID);

    const script = document.head.querySelector(
      'script[src*="googletagmanager.com/gtag/js"]',
    ) as HTMLScriptElement;

    expect(script).toBeTruthy();
    expect(script.async).toBe(true);
    expect(script.src).toContain(GA_ID);
  });

  it('should initialize dataLayer and call gtag correctly', () => {
    googleAnalytics(GA_ID);

    expect(Array.isArray(window.dataLayer)).toBe(true);

    // gtag should be defined
    expect(typeof window.gtag).toBe('function');

    // dataLayer should contain calls
    const calls = window.dataLayer as any[];

    expect(calls.length).toBeGreaterThanOrEqual(2);

    expect(calls[0][0]).toBe('js');
    expect(calls[1][0]).toBe('config');
    expect(calls[1][1]).toBe(GA_ID);
    expect(calls[1][2]).toEqual(
      expect.objectContaining({
        anonymize_ip: true,
      }),
    );
  });
});
